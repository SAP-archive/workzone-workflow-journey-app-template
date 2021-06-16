sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast",
        "../configuration/config",
        "../data/WFDataProvider",
        "../data/JAMDocumentProvider",
        "../data/CMISDocumentProvider",
        "../ext/WFModel",
        "../model/formatter"
    ],
    function (
        Controller,
        MessageToast,
        config,
        WFDataProvider,
        JAMDocumentProvider,
        CMISDocumentProvider,
        WFModel,
        formatter
    ) {
        "use strict";

        return Controller.extend("sap.wz.journey.template.card.controller.Main",
            {
                //=================================================================================//
                // Formatters                                                                      //
                //=================================================================================//
                formatter: formatter,

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
                        this._card.resolveDestination("myCMISDestination"),
                        this._card.resolveDestination("myWorkflowDestination")
                    ]).then((results) => {
                        // we have resolved destinations
                        this._jamDestination = results[0];
                        this._cmisDestination = results[1];
                        this._workflowDestination = results[2];

                        this._wfDataProvider = new WFDataProvider(this._workflowDestination);

                        this._cardParams = this._card.getCombinedParameters();

                        this._approver = this._cardParams.approver;
                        this._definitionId = this._cardParams.workflowDefinitionId;

                        if (this._cardParams.documentProvider === "JAM") {
                            this._documentProvider = new JAMDocumentProvider(this._jamDestination);
                        } else if (this._cardParams.documentProvider === "CMIS") {
                            this._documentProvider = new CMISDocumentProvider(this._cmisDestination);
                        } else {
                            throw new Error("Unknown Document Provider: " + this._cardParams.documentProvider);
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
                // Handle UI events and set app state                                              //
                //                                                                                 //
                // These event handlers are called when the user clicks on a substep control (e.g. //
                // a button).  Use them to enable/hide substeps in the current wizard step. Also   //
                // use them to trigger the workflow to move to a new state.                        //
                //                                                                                 //
                // Typically, an event handler either makes some state changes and persists them,  //
                // or makes state changes and triggers a workflow operation (by advancing it)      //
                // If the workflow is advanced, then set the sub-step status to inprocess so that  //
                // the UI can display this to the user.  Eventually the workflow will complete the //
                // step and the sub-step status will be set accordingly.  When this happens an     //
                // appStatusIsWF<XXX> event handler is called - this is used to update any local   //
                // state to reflect the current workflow state                                     //
                //                                                                                 //
                // When the user clicks on the 'Next step' button when a wizard step is complete   //
                // then a uiEventCleanupStep<n> event handler is called.  This can be used to      //
                // close/collapse any sub-steps, and ensure sub-steps for the next wizard are made //
                // visible.                                                                        //
                //=================================================================================//

                // set app state: Initial state
                appStatusIsWFPreinit: function () {
                    // re-create context object
                    var data = config.createContext(
                        this._definitionId,
                        this._businessKey,
                        this._userDetails,
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

                //====================//
                // Wizard Step 1      //
                //====================//

                // App status handler called when workflow initialises itself
                appStatusIsWFWaitForConsultation: function () {
                    this._setContextProperty("consultation/visible", true);
                },

                // UI event: user tapped signup now
                uiEventSignUpNow: function () {
                    this._setContextProperty("consultation/status", "inprocess");

                    // advance the workflow and place in state 'receivedConsultation'
                    this._advanceWorkflow("receivedConsultation");
                },

                appStatusIsWFWaitForLeaveRequest: function () {
                    this._setContextProperty("uploadDocuments/visible", true);
                },

                // UI Event: user tapped upload document
                uiEventUploadDocument: function (fileUploader) {
                    // get the file from the filesystem
                    // this will trigger some UI events
                    fileUploader.readFromFilesystem();

                    this._setContextProperty("uploadDocuments/status", "inprocess");

                    // update the workflow to keep track
                    this._updateWorkflow();
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
                    this._documentProvider.createDocument(
                        file
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
                //
                // ------------------------------------------
                // ------------------------------------------
                // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
                uiEventRequestLeave: function () {
                    // remember the date we requestsed the leave and set to inprocess
                    this._setContextProperty("leaveRequest/createDate", new Date().toISOString());
                    this._setContextProperty("leaveRequest/approver", this._approver);
                    this._setContextProperty("leaveRequest/status", "inprocess");

                    // move the workflow forward
                    this._advanceWorkflow("receivedLeaveRequest");
                },

                appStatusIsWFWaitForManagerDiscussionRequest: function () {
                    // mark this wizard step as validated - this enables the StepN Button to be displayed
                    this._setContextProperty("stepValidated", 1);
                },
                // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                // ------------------------------------------
                // ------------------------------------------

                // UI event: user tapped remind manager
                uiEventRemindManager: function () {
                    // note the time we reminded the manager
                    this._setContextProperty("leaveRequest/reminderDate", new Date().toISOString());

                    // persist this in the workflow
                    this._updateWorkflow();
                },

                // UI cleanup event: user clicked Next on wizard step - ensure all sub-steps in this step are closed and
                // relevant sub-steps in the next setp are visible
                uiEventCleanupStep1: function () {
                    // make sub-steps for the next wizard step visible
                    this._setContextProperty("discussLeave/visible", true);
                    this._setContextProperty("healthReminder/visible", true);
                },

                //====================//
                // Wizard Step 2      //
                //====================//

                // UI event: user sent leave request discussion details
                //
                // ------------------------------------------
                // ------------------------------------------
                // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
                uiEventSetupLeaveDiscussion: function () {
                    // set to inprocess
                    this._setContextProperty("discussLeave/status", "inprocess");

                    // move the workflow forward
                    this._advanceWorkflow("receivedManagerDiscussionMeetingRequest");
                },

                appStatusIsWFWaitForFeedback: function () {
                    // mark this wizard step as validated - this enables the StepN Button to be displayed
                    this._setContextProperty("stepValidated", 3);
                },
                // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                // ------------------------------------------
                // ------------------------------------------
                
                // UI event: user tapped health reminder
                uiEventSetHealthReminder: function () {
                    // immediately set to done
                    this._setContextProperty("healthReminder/status", "completed");

                    // persist this in the workflow
                    this._updateWorkflow();
                },

                // UI cleanup event: user clicked Next on wizard step - ensure all sub-steps in this step are closed and
                // relevant sub-steps in the next setp are visible
                uiEventCleanupStep2: function () {
                    // make sub-steps for the next wizard step visible
                    this._setContextProperty("stayCurrent/visible", true);
                    this._setContextProperty("notifyChanges/visible", true);

                    // mark all of sub-steps in the next wizard step as validated
                    this._setContextProperty("stepValidated", 3);
                },

                //====================//
                // Wizard Step 3      //
                //====================//

                // UI cleanup event: user clicked Next on wizard step - ensure all sub-steps in this step are closed and
                // relevant sub-steps in the next setp are visible
                uiEventCleanupStep3: function () {
                    // set all sub-step statuses to complete so they collapse
                    this._setContextProperty("stayCurrent/status", "completed");
                    this._setContextProperty("notifyChanges/status", "completed");

                    // make sub-steps for the next wizard step visible
                    this._setContextProperty("update401/visible", true);
                    this._setContextProperty("updateLife/visible", true);
                    this._setContextProperty("signupDayCare/visible", true);
                    this._setContextProperty("feedback/visible", true);
                },

                //====================//
                // Wizard Step 4      //
                //====================//

                // UI event: user tapped feedback
                //
                // ------------------------------------------
                // ------------------------------------------
                // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
                uiEventSendFeedback: function () {
                    // set to inprocess
                    this._setContextProperty("feedback/status", "inprocess");

                    // move the workflow forward
                    this._advanceWorkflow("receivedFeedback");
                },

                appStatusIsWFWaitForConfirmComplete: function () {
                    this._setContextProperty("stepValidated", 4);
                },
                // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                // ------------------------------------------
                // ------------------------------------------

                // UI cleanup event: user clicked Next on wizard step - ensure all sub-steps in this step are closed and
                // relevant sub-steps in the next setp are visible
                uiEventCleanupStep4: function () {
                    // set all sub-step statuses to complete so they collapse
                    this._setContextProperty("update401/status", "completed");
                    this._setContextProperty("updateLife/status", "completed");
                    this._setContextProperty("signupDayCare/status", "completed");
                },

                //=================================================================================//
                //=================================================================================//
                //              *** NO NEED TO CHANGE ANYTHING BELOW HERE ***                      //
                //=================================================================================//
                //=================================================================================//

                //=================================================================================//
                // Process UI events                                                               //
                //=================================================================================//

                // UI event: start the workflow
                _uiEventStartWorkflow: function () {
                    this._createWorkflow("started");
                },

                // UI event: workflow is dismissed
                _uiEventDismissWorkflow: function (docsList) {
                    // ASSERT: state is correct ...

                    // we need to work out what documents should be deleted
                    var docs = docsList.getSelectedItems();
                    var promises = [];
                    docs.forEach((docItem) => {
                        promises.push(this._documentProvider.deleteDocument(docItem.data("contentId")));
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
                _uiEventRestartWorkflow: function () {
                    // ASSERT: state is correct ...

                    // kill this workflow
                    this._restartWorkflow();
                },

                // UI Event: workflow terminated
                _uiEventTerminateWorkflow: function () {
                    // ASSERT: state is correct ...

                    // kill this workflow
                    this._terminateWorkflow();

                    // reset
                    this.appStatusIsWFPreinit();
                },

                _uiEventSetChosenInstance: function (oEvent) {
                    var oItem = oEvent.getSource().getSelectedItem();
                    var id = oItem ? oItem.data("contentId") : null;
                    this._contextModel.setProperty("/instance/chosen", id);
                },

                _uiEventChooseInstance: function (oList, terminate) {
                    var id = this._contextModel.getProperty("/instance/chosen");
                    var aInstances = this._contextModel.getProperty("/instance/instances");
                    var oInstanceData = null;
                    for (var i = 0; i < aInstances.length; i++) {
                        if (aInstances[i].instance.id === id) {
                            oInstanceData = aInstances[i];
                            break;
                        }
                    }
                    if (oInstanceData) {
                        if (terminate) {
                            this._terminateWorkflow(id);
                        } else {
                            this._onLoadWorkflowInstance(oInstanceData.instance, oInstanceData.context, oInstanceData.executionLogs);
                        }
                    } else {
                        MessageToast.show("Unable to locate the workflow instance.");
                    }
                },

                _uiEventWizardStepComplete: function (nStep) {
                    // ASSERT: state is correct ...

                    if (this._getContextProperty("currentStep") >= nStep) {
                        return;
                    }
                    // move to the next step
                    this._setContextProperty("currentStep", nStep);

                    // do any clean up for the step
                    this["uiEventCleanupStep" + nStep]();

                    var wizard = this._view.byId("JourneyAppWizard");
                    var steps = wizard.getSteps();
                    if (steps.length == nStep) {
                        // last step so we are done
                        this._advanceWorkflow("receivedConfirmComplete");
                    } else {
                        // else just persist these changes
                        this._updateWorkflow();
                    }
                },

                //=================================================================================//
                // Process network or async events                                                 //
                //=================================================================================//

                // handle load of workflow instance
                _onLoadWorkflowInstance: function (instance, context, executionLogs) {
                    if (Array.isArray(instance)) {
                        // we have an array of instances
                        var aInstances = instance;
                        if (aInstances.length == 0) {
                            instance = null;
                        } else if (aInstances.length === 1) {
                            instance = aInstances[0].instance;
                            context = aInstances[0].context;
                            executionLogs = aInstances[0].executionLogs;
                        } else {
                            // we have an array with multiple elements
                            this._contextModel.setProperty("/instance", {
                                status: "CHOOSE",
                                chosen: null,
                                instances: aInstances
                            });
                            return;
                        }
                    }

                    this._nextMessage = null;

                    // TODO: dismiss busy indicator
                    if (!instance || !context) {
                        // no workflow
                        this.appStatusIsWFPreinit();
                        return;
                    }

                    instance.instances = instance.instances || [];

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
                            if (appContext.currentStep < steps.length) {
                                wizard.setCurrentStep(steps[appContext.currentStep]);
                            }

                            this._nextMessage = appContext.readyForMessage;

                            // check to see if the app status is ready or not
                            if (appContext.readyForMessage === null) {
                                // if not, we keep polling
                                // our app will have updated any UI properties based on bindings
                                // we should not try and explicitly set status as this will be overwritten
                                // on the next refresh
                                setTimeout(this._queryWorkflow.bind(this), 5000);
                            } else {
                                // determine the app status update function to call
                                var wfState = appContext.state;
                                if (wfState !== "waitForFinalDismiss" && wfState !== "receivedFinalDismiss") {
                                    var appStatusFn = "appStatusIsWF" + wfState.charAt(0).toUpperCase() + wfState.slice(1);

                                    if (typeof this[appStatusFn] !== "function") {
                                        console.error("State does not map to a function");
                                        return;
                                    }

                                    // call app status function
                                    this[appStatusFn]();
                                }
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
                            break;

                        case "ERRONEOUS":
                            // make last error message easy to access
                            var lastError = executionLogs.length > 0 ? executionLogs[executionLogs.length - 1].error.message : "The workflow is in error";
                            this._contextModel.setProperty("/instance/lastErrorMessage", lastError);

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
                    this._wfDataProvider.createWorkflowInstandAndFetchContextWithCallback(
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
                    var instanceId = this._contextModel.getProperty("/instance/id");
                    if (!instanceId) {
                        // no instance ... find one
                        this._wfDataProvider.getMultipleContextsForBusinessKeyWithCallback(
                            this._definitionId,                 // definition ID of workflow
                            this._businessKey,                  // user id it is for
                            "RUNNING,ERRONEOUS,SUSPENDED",      // status (undefined means any status)
                            this._onLoadWorkflowInstance.bind(this),
                            this._onLoadWorkflowInstanceError.bind(this)
                        );
                    } else {
                        // we have an ID, look this up explicitly
                        this._wfDataProvider.retrieveWorkflowInstanceWithCallback(
                            instanceId,
                            this._onLoadWorkflowInstance.bind(this),
                            this._onLoadWorkflowInstanceError.bind(this)
                        );
                    }
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
                    this._wfDataProvider.advanceWorkflowInstanceWithCallback(
                        this._nextMessage,
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
                    this._wfDataProvider.updateWorkflowContextWithCallback(
                        this._contextModel.getProperty("/instance/id"),
                        context,
                        this._onLoadWorkflowInstance.bind(this),
                        this._onLoadWorkflowInstanceError.bind(this)
                    );
                },

                _restartWorkflow: function (id) {
                    // restart the workflow
                    this._wfDataProvider.restartWorkflowInstanceWithCallback(
                        id || this._contextModel.getProperty("/instance/id"),
                        this._onLoadWorkflowInstance.bind(this),
                        this._onLoadWorkflowInstanceError.bind(this)
                    );
                },

                _terminateWorkflow: function (id) {
                    // cancel the workflow
                    this._wfDataProvider.cancelWorkflowInstanceWithCallback(
                        id || this._contextModel.getProperty("/instance/id"),
                        this._onLoadWorkflowInstance.bind(this),
                        this._onLoadWorkflowInstanceError.bind(this)
                    );
                }
            }
        );
    }
);
