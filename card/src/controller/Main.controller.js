sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/format/DateFormat",
        "sap/m/MessageToast",
        "../configuration/config",
        "../data/WFDataProvider",
        "../data/JAMDocumentProvider",
        "../data/CMISDocumentProvider",
        "../ext/WFModel"
    ],
    function (
        Controller,
        DateFormat,
        MessageToast,
        config,
        WFDataProvider,
        JAMDocumentProvider,
        CMISDocumentProvider,
        WFModel
    ) {
        "use strict";

        var DocumentProvider = null;

        return Controller.extend("com.sap.wz.journey.Example.controller.Main",
            {
                //=================================================================================//
                // App init                                                                        //
                //=================================================================================//

                // App start up: determine status
                onInit: function () {
                    this._view = this.getView();

                    this._ownerComponent = this.getOwnerComponent();
                    this._card = this._ownerComponent.card;

                    // resolve destinations
                    Promise.all([
                        this._card.resolveDestination("myJAMDestination"),
                        this._card.resolveDestination("myCMISDestination")
                    ]).then((results) => {
                        // we have resolved destinations
                        this._jamDest = results[0];
                        this._cmisDest = results[1];

                        this._cardParams = this._card.getCombinedParameters();

                        this._definitionId = this._cardParams.workflowDefinitionId;
                        this._documentProvider = this._cardParams.documentProvider;
                        this._approver = this._cardParams.approver;

                        if (this._documentProvider === "JAM") {
                            DocumentProvider = JAMDocumentProvider;
                            this._dpDest = this._jamDest;
                        } else if (this._documentProvider === "CMIS") {
                            DocumentProvider = CMISDocumentProvider;
                            this._dpDest = this._cmisDest;
                        } else {
                            throw new Error("Unknown Document Provider: " + this._documentProvider);
                        }

                        var userDetails = {
                            mail: this._cardParams.userEmail,
                            name: this._cardParams.userName,
                            id: this._cardParams.userId
                        }
                        this._userDetails = userDetails;

                        this._workspaceName = this._cardParams.workspaceName;
                        this._workspaceId = this._cardParams.workspaceId;

                        this._businessKey = userDetails.id;

                        this._nextMessage = null;
                        this._appContext = "journeyApp";

                        // to track JSON model changes
                        this._changeMap = new Map();

                        // create context object model
                        this._view.setModel(new WFModel({}, false, this));
                        this._contextModel = this._view.getModel();

                        // get the current workflow status
                        // this will set the context object (either to initial state if no workflow, or the workflow state)
                        this._queryWorkflow();
                    }).catch((err) => {
                        console.error("Unable to initialise application: " + err.message);
                        MessageToast.show("Unable to initialise application: " + err.message);
                    });
                },

                //=================================================================================//
                // Hande UI events                                                                 //
                //=================================================================================//

                // UI event: start the workflow
                uiEventStartWorkflow: function () {
                    this._createWorkflow("receivedConsultation");
                },

                // UI event: user tapped signup now
                uiEventSignUpNow: function () {
                    // ASSERT: state is correct ...

                    this._setContextProperty("consultation/status", "inprocess");

                    // advance the workflow and place in state 'receivedConsultation'
                    this._advanceWorkflow("receivedConsultation");
                },

                // UI Event: user tapped upload document
                uiEventUploadDocument: function (fileUploader) {
                    // get the file from the filesystem
                    // this will trigger some UI events
                    fileUploader.readFromFilesystem();

                    this._setContextProperty("uploadDocuments/status", "inprocess");
                },

                // UI Event: read from file system failed
                uiEventUploadDocumentReadFilesystemFailed: function (event) {
                    var msg = event.getParameter('msg');

                    this._setContextProperty("uploadDocuments/status", "error");
                    this._setContextProperty("uploadDocuments/errorMsg", msg);
                    this._setContextProperty("uploadDocuments/docPath", null);

                    // update the workflow to keep track
                    this._updateWorkflow();
                },

                // UI Event: read from file system succeeded
                uiEventUploadDocumentReadFilesystemSucceeded: function (event) {
                    var file = event.getParameters();

                    // create the document in JAM
                    DocumentProvider.createDocument(
                        this._dpDest, file
                    ).then((contentId) => {
                        // we uploaded to JAM OK
                        this._setContextProperty("uploadDocuments/status", "completed");
                        this._setContextProperty("uploadDocuments/errorMsg", null);
                        this._setContextProperty("uploadDocuments/docId", contentId);

                        // record this in the list of documents
                        var docs = this._getContextProperty("documents") || [];
                        // ensure we push back a new array ... if we simply update the existing array
                        // this wont trigger a rebinding of the UI
                        var newDocs = [...docs];
                        newDocs.push({
                            id: contentId,
                            name: file.name,
                            type: file.type
                        });
                        this._setContextProperty("documents", newDocs);

                        // enable leave request step
                        this._setContextProperty("leaveRequest/visible", true);
                    }).catch((err) => {
                        // we had an error
                        this._setContextProperty("uploadDocuments/status", "error");
                        this._setContextProperty("uploadDocuments/errorMsg", err.message);
                        this._setContextProperty("uploadDocuments/docPath", null);    
                    }).finally(()=>{
                        // always update the workflow
                        this._updateWorkflow();
                    });
                },

                // UI event: user requests leave
                uiEventRequestLeave: function () {
                    // ASSERT: state is correct ...

                    // remember the date we requestsed the leave and set to inprocess
                    this._setContextProperty("leaveRequest/createDate", new Date().toISOString());
                    this._setContextProperty("leaveRequest/approver", this._approver);
                    this._setContextProperty("leaveRequest/status", "inprocess");

                    // move the workflow forward
                    this._advanceWorkflow("receivedLeaveRequest");
                },

                // UI event: user tapped remind manager
                uiEventRemindManager: function () {
                    // ASSERT: state is correct ...

                    // note the time we reminded the manager
                    this._setContextProperty("leaveRequest/reminderDate", new Date().toISOString());

                    // persist this in the workflow
                    this._updateWorkflow();

                    MessageToast.show("A reminder was sent to your manager");
                },

                // UI event: user clicked Next on wizard step - move to the next step
                uiEventWizardStep1Complete: function () {
                    // ASSERT: state is correct ...

                    if (this._getContextProperty("currentStep") >= 1) {
                        return;
                    }
                    // move to the next step
                    this._setContextProperty("currentStep", 1);

                    this._setContextProperty("discussLeave/visible", true);
                    this._setContextProperty("healthReminder/visible", true);

                    // persis these changes
                    this._updateWorkflow();
                },

                // UI event: user sent leave request discussion details
                uiEventSetupLeaveDiscussion: function () {
                    // ASSERT: state is correct ...

                    // set to inprocess
                    this._setContextProperty("discussLeave/status", "inprocess");

                    // move the workflow forward
                    this._advanceWorkflow("receivedManagerDiscussionMeetingRequest");
                },

                // UI event: user tapped health reminder
                uiEventSetHealthReminder: function () {
                    // ASSERT: state is correct ...

                    // immediately set to done
                    this._setContextProperty("healthReminder/status", "completed");

                    // persist this in the workflow
                    this._updateWorkflow();
                },

                // UI event: user clicked Next on wizard step - move to the next step
                uiEventWizardStep2Complete: function () {
                    // ASSERT: state is correct ...

                    if (this._getContextProperty("currentStep") >= 2) {
                        return;
                    }
                    // move to the next step
                    this._setContextProperty("currentStep", 2);

                    this._setContextProperty("stayCurrent/visible", true);
                    this._setContextProperty("notifyChanges/visible", true);

                    // persist these changes
                    this._updateWorkflow();
                },

                // UI event: user clicked Next on wizard step - move to the next step
                uiEventWizardStep3Complete: function () {
                    // ASSERT: state is correct ...

                    if (this._getContextProperty("currentStep") >= 3) {
                        return;
                    }
                    // move to the next step
                    this._setContextProperty("currentStep", 3);

                    this._setContextProperty("stayCurrent/status", "completed");
                    this._setContextProperty("notifyChanges/status", "completed");

                    this._setContextProperty("update401/visible", true);
                    this._setContextProperty("updateLife/visible", true);
                    this._setContextProperty("signupDayCare/visible", true);
                    this._setContextProperty("feedback/visible", true);

                    // persist these changes
                    this._updateWorkflow();
                },

                // UI event: user tapped feedback
                uiEventSendFeedback: function () {
                    // ASSERT: state is correct ...

                    // set to inprocess
                    this._setContextProperty("feedback/status", "inprocess");

                    // move the workflow forward
                    this._advanceWorkflow("receivedFeedback");
                },

                // UI event: user clicked Final Next (Complete)
                uiEventWizardStep4Complete: function () {
                    // ASSERT: state is correct ...

                    // collapse the current substeps
                    this._setContextProperty("update401/status", "completed");
                    this._setContextProperty("updateLife/status", "completed");
                    this._setContextProperty("signupDayCare/status", "completed");

                    // move the workflow forward (no more wizard stepos, just complete)
                    this._advanceWorkflow("receivedConfirmComplete")
                },

                // UI event: workflow is dismissed
                uiEventDismissWorkflow: function (docsList) {
                    // ASSERT: state is correct ...

                    // we need to work out what documents should be deleted
                    var docs = docsList.getSelectedItems();
                    var promises = [];
                    docs.forEach((docItem) => {
                        promises.push(DocumentProvider.deleteDocument(this._dpDest, docItem.data("contentId")));
                    });

                    Promise.all(promises).then((items) => {
                        if (items.length > 0) {
                            MessageToast.show("Successfully deleted all the selected documents");
                        }
                        // finally push the workflow to closure
                        this._advanceWorkflow("receivedFinalDismiss");
                    }).catch((err) => {
                        MessageToast.show("Failed to delete documents: " + err.message);
                    });
                },

                // UI Event: workflow terminated
                uiEventRestartWorkflow: function () {
                    // ASSERT: state is correct ...

                    // kill this workflow
                    this._restartWorkflow();
                },

                // UI Event: workflow terminated
                uiEventTerminateWorkflow: function () {
                    // ASSERT: state is correct ...

                    // kill this workflow
                    this._terminateWorkflow();

                    // reset
                    this.appStatusIsWFPreinit();
                },

                //=================================================================================//
                // Set app status / reconfigure                                                    //
                //=================================================================================//

                // set app state: Initial state
                appStatusIsWFPreinit: function () {
                    // re-create context object
                    var data = config.createContext(
                        this._definitionId,
                        this._businessKey,
                        this._userDetails,
                        this._documentProvider,
                        this._dpDest,
                        this._workspaceName
                    );

                    this._contextModel.setProperty("/context", data.context);
                    this._contextModel.setProperty("/instance", data.instance);
                    this._contextModel.setProperty("/executionLogs", null);

                    var wizard = this._view.byId("JourneyAppWizard");
                    wizard.setCurrentStep(wizard.getSteps()[0]);
                    wizard.setShowNextButton(true);

                    this._setContextProperty("consultation/visible", true);
                },

                appStatusIsWFWaitForConsultation: function () {
                    this._setContextProperty("consultation/visible", true);
                },

                // set app state: we are ready to upload docs
                appStatusIsWFWaitForLeaveRequest: function () {
                    this._setContextProperty("uploadDocuments/visible", true);
                },

                appStatusIsWFWaitForManagerDiscussionRequest: function () {
                    this._setContextProperty("stepValidated", 1);
                },

                appStatusIsWFWaitForFeedback: function () {
                    this._setContextProperty("stepValidated", 3);
                },
                
                appStatusIsWFWaitForCloseCompleteAfterLeaveRejected: function () {
                },

                appStatusIsWFWaitForConfirmComplete: function () {
                    this._setContextProperty("stepValidated", 4);
                },

                appStatusIsWFWaitForFinalDismiss: function () {
                    // disable the next button
                    var wizard = this._view.byId("JourneyAppWizard");
                    wizard.setShowNextButton(false);
                },

                // set app state: in error
                appStatusIsWFInError: function () {
                },

                // set app state: is suspended
                appStatusIsWFSuspended: function () {
                },

                //=================================================================================//
                // Helpers / validaters / formatters                                               //
                //=================================================================================//

                // change handler for due date: validate the values
                checkAndSetDueDate: function (oEvent) {
                    var oSource = oEvent.getSource();
                    if (!oEvent.getParameters().valid) {
                        oSource.setValueState("Error");
                        oSource.setValueStateText("The due date needs to be between 30 days and 250 days in the future");
                        oSource.setDateValue(oSource.getDateValue());
                        return;
                    } else if (oEvent.getParameters().newValue) {
                        oSource.setValueState("Success");
                        oSource.setValueStateText("");
                    } else {
                        oSource.setValueState("None");
                        oSource.setValueStateText("");
                    }
                },

                // change handler for leave request dates: validate the values
                checkLR: function () {
                    setTimeout(
                        function () {
                            var oStartDate = this.byId("lrStart");
                            var oEndDate = this.byId("lrEnd");
                            this.byId("lrCreate").setEnabled(false);
                            this.byId("lrCreate").setType("Default");
                            this.byId("lrComment").setValueState("None");
                            this.byId("lrComment").setValueStateText("");
                            oEndDate.setValueState("None");
                            oStartDate.setValueState("None");
                            oEndDate.setValueStateText("");
                            oStartDate.setValueStateText("");
                            var bError = false;
                            var bValid = true;

                            if (!oEndDate.getDateValue() && oEndDate.getValue()) {
                                oEndDate.setValueState("Error");
                                oEndDate.setValueStateText("End date is not valid");
                                bError = true;
                            } else if (oEndDate.getValue()) {
                                oEndDate.setValueState("Success");
                                oEndDate.setValueStateText("");
                            } else {
                                bValid = false;
                            }
                            if (!oStartDate.getDateValue() && oStartDate.getValue()) {
                                oStartDate.setValueState("Error");
                                oStartDate.setValueStateText("Start date is not valid");
                                bError = true;
                            } else if (oStartDate.getValue()) {
                                oStartDate.setValueState("Success");
                                oStartDate.setValueStateText("");
                            } else {
                                bValid = false;
                            }
                            if (oEndDate.getDateValue() && oStartDate.getDateValue()) {
                                if (
                                    oStartDate.getDateValue().getTime() <= new Date().getTime()
                                ) {
                                    oStartDate.setValueState("Error");
                                    oStartDate.setValueStateText("Start date after todays date");
                                    bError = true;
                                }
                                if (
                                    oEndDate.getDateValue().getTime() + 1000 * 60 * 60 * 24 <=
                                    oStartDate.getDateValue().getTime()
                                ) {
                                    oEndDate.setValueState("Error");
                                    oEndDate.setValueStateText("End date must be after start date");
                                    bError = true;
                                }
                            }
                            if (!this.byId("lrComment").getValue()) {
                                this.byId("lrComment").setValueState("Error");
                                bError = true;
                                this.byId("lrComment").setValueStateText(
                                    "Please enter a comment"
                                );
                            } else {
                                this.byId("lrComment").setValueState("Success");
                                this.byId("lrComment").setValueStateText("");
                            }
                            if (!bError && bValid) {
                                this.byId("lrCreate").setEnabled(true);
                                this.byId("lrCreate").setType("Emphasized");
                            }
                        }.bind(this),
                        100
                    );
                },

                //formatter
                formatMinDueDate: function (vValue) {
                    var oToday = new Date();
                    var iMin = parseInt(30) * 1000 * 60 * 60 * 24;
                    oToday.setMilliseconds(oToday.getMilliseconds() + iMin);
                    return oToday;
                },

                // formatter
                formatMaxDueDate: function (vValue) {
                    var oToday = new Date();
                    var iMax = parseInt(250) * 1000 * 60 * 60 * 24;
                    oToday.setMilliseconds(oToday.getMilliseconds() + iMax);
                    return oToday;
                },

                // formatter
                formatReminderVisible: function (s) {
                    if (s) {
                        return true;
                    }
                    return false;
                },

                // formatter
                formatRelativeDate: function (s) {
                    if (!s) {
                        return "";
                    }
                    var oDate = Date.parse(s);
                    var oFormatter = DateFormat.getDateInstance({
                        relative: true,
                        style: "long",
                    });
                    return oFormatter.format(new Date(oDate));
                },

                //=================================================================================//
                //=================================================================================//
                //              *** NO NEED TO CHANGE ANYTHING BELOW HERE ***                      //
                //=================================================================================//
                //=================================================================================//

                //=================================================================================//
                // Process network or async events                                                 //
                //=================================================================================//

                // handle load of workflow instance
                _onLoadWorkflowInstance: function (instance, context, executionLogs) {
                    this._nextMessage = null;

                    // TODO: dismiss busy indicator
                    if (!instance || !context) {
                        // no workflow
                        this.appStatusIsWFPreinit();
                        return;
                    }

                    // update existing model directly - dont recreate the model as we
                    // lose the UI bindings
                    this._contextModel.setProperty("/context", context);
                    this._contextModel.setProperty("/instance", instance);
                    this._contextModel.setProperty("/executionLogs", executionLogs);

                    // clear our log
                    this._changeMap.clear();

                    var appContext = context[this._appContext];

                    // what to do?
                    // we expect a status of RUNNING
                    switch (instance.status) {
                        case "RUNNING":
                            // set the wizard step
                            var wizard = this._view.byId("JourneyAppWizard");
                            var steps = wizard.getSteps();
                            var wizardStep = steps[appContext.currentStep];
                            wizard.setCurrentStep(wizardStep);

                            this._nextMessage = appContext.readyForMessage;

                            // check to see if the app status is ready or not
                            if (appContext.readyForMessage === null) {
                                // if not, we keep polling
                                // our app will have updated any UI properties based on bindings
                                // we should not try and explicitly set status as this will be overwritten
                                // on the next refresh
                                setTimeout(this._queryWorkflow.bind(this), 5000);
                            } else {
                                // determione the app status update function to call
                                var wfState = appContext.state;
                                var appStatusFn = "appStatusIsWF" + wfState.charAt(0).toUpperCase() + wfState.slice(1);

                                if (typeof this[appStatusFn] !== "function") {
                                    console.error("State does not map to a function");
                                    return;
                                }

                                // call app status function
                                this[appStatusFn]();
                            }
                            break;

                        case "COMPLETED":
                        case "CANCELED":
                            // can happen after we push an instance into final step or terminate an instance
                            // force a refresh and set to initial
                            setTimeout(this._queryWorkflow.bind(this), 1000);

                            this.appStatusIsWFPreinit();
                            break;

                        case "SUSPENDED":
                            this.appStatusIsWFSuspended();
                            break;

                        case "ERRONEOUS":
                            // make last error message easy to access
                            var lastError = executionLogs.length > 0 ? executionLogs[executionLogs.length - 1].error.message : "The workflow is in error";
                            this._contextModel.setProperty("/instance/lastErrorMessage", lastError);

                            this.appStatusIsWFInError();
                            break;

                        default:
                            console.log("Unexpected state: " + instance.status);
                            break;
                        }
                },

                _onLoadWorkflowInstanceError: function (err) {
                    console.log("Error response from load workflow: " + err);
                },

                //=================================================================================//
                // Convenience APIs for accessing the context                                      //
                //=================================================================================//

                _getContextProperty: function (path) {
                    return this._contextModel.getProperty("/context/" + this._appContext + "/" + path);
                },

                _setContextProperty: function (path, value) {
                    return this._contextModel.setProperty("/context/" + this._appContext + "/" + path, value);
                },

                _setInstanceProperty: function (path, value) {
                    return this._contextModel.setProperty("/instance/" + path, value);
                },

                //=================================================================================//
                // Workflow APIs                                                                   //
                //=================================================================================//

                _createWorkflow: function (state) {
                    if (state) {
                        this._contextModel.setProperty("/context/" + this._appContext + "/state", state);
                    }

                    // Create a new workflow instance
                    // This returns a new instance and context
                    // TODO: show busy indicator
                    WFDataProvider.createWorkflowInstandAndFetchContextWithCallback(
                        this._definitionId,
                        this._businessKey,
                        this._contextModel.getData().context,
                        "RUNNING,ERRONEOUS,SUSPENDED",
                        this._onLoadWorkflowInstance.bind(this),
                        this._onLoadWorkflowInstanceError.bind(this)
                    );

                },

                _queryWorkflow: function () {
                    // Load the running workflow instance (if there is one running)
                    // This returns a new instance and context object
                    // TODO: show busyindicator
                    WFDataProvider.getSingleContextForBusinessKeyWithCallback(
                        this._definitionId,                 // definition ID of workflow
                        this._businessKey,                  // user id it is for
                        "RUNNING,ERRONEOUS,SUSPENDED",      // status (undefined means any status)
                        this._onLoadWorkflowInstance.bind(this),
                        this._onLoadWorkflowInstanceError.bind(this)
                    )
                },

                _advanceWorkflow: function (state) {
                    if (this._nextMessage === null) {
                        MessageToast.show("The workflow is not ready to be advanced to the next step.");

                        // re-query the workflow
                        this._queryWorkflow();

                        return;
                    }

                    this._contextModel.setProperty("/context/" + this._appContext + "/readyForMessage", null);
                    if (state) {
                        this._contextModel.setProperty("/context/" + this._appContext + "/state", state);
                    }

                    var data = this._contextModel.getData();

                    // Advance workflow
                    // TODO: show busy indicator
                    WFDataProvider.advanceWorkflowWithCallback(
                        this._definitionId,
                        this._nextMessage,
                        this._businessKey,
                        data.instance.id,
                        data.context[this._appContext],
                        this._onLoadWorkflowInstance.bind(this),
                        this._onLoadWorkflowInstanceError.bind(this)
                    )
                },

                _updateWorkflow: function () {
                    // create a context object that we PATCH
                    // it consists of the properties we have set and recorded in the change map
                    var context = {
                        [this._appContext]: {}
                    }

                    this._changeMap.forEach((value, key, map) => {
                        var property = context[this._appContext];

                        var aParts = key.split("/"),
                            iIndex = 0;
                        while (iIndex < aParts.length-1) {
                            property[aParts[iIndex]] = property[aParts[iIndex]] || {};
                            property = property[aParts[iIndex]];
                            iIndex++;
                        }
                        property[aParts[iIndex]] = value;
                    });

                    // Just update workflow with an updated context object
                    WFDataProvider.updateWorkflowContextWithCallback(
                        this._contextModel.getProperty("/instance/id"),
                        context,
                        this._onLoadWorkflowInstance.bind(this),
                        this._onLoadWorkflowInstanceError.bind(this)
                    );
                },

                _restartWorkflow: function () {
                    // restart the workflow
                    WFDataProvider.restartWorkflowInstanceWithCallback(
                        this._contextModel.getProperty("/instance/id"),
                        this._onLoadWorkflowInstance.bind(this),
                        this._onLoadWorkflowInstanceError.bind(this)
                    );
                },

                _terminateWorkflow: function () {
                    // cancel the workflow
                    WFDataProvider.cancelWorkflowInstanceWithCallback(
                        this._contextModel.getProperty("/instance/id"),
                        this._onLoadWorkflowInstance.bind(this),
                        this._onLoadWorkflowInstanceError.bind(this)
                    );
                }
            }
        );
    }
);
