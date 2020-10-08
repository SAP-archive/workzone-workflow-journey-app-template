sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/thirdparty/jquery",
    "com/sap/wz/journey/managerDiscussion/model/models"
], function (UIComponent, Device, jQuery, models) {
    "use strict";

    var WORKPLOW_API = "/managerDiscussion.comsapwzjourneymanagerDiscussion/bpmworkflowruntime";

    return UIComponent.extend("com.sap.wz.journey.managerDiscussion.Component", {

        metadata: {
            manifest: "json"
        },

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            var startupParameters = this.getComponentData().startupParameters;
            var taskModel = startupParameters.taskModel;
            var taskId = taskModel.getData().InstanceID;

            var contextModel = new sap.ui.model.json.JSONModel(WORKPLOW_API + "/v1/task-instances/" + taskId + "/context");
            contextModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
            this.setModel(contextModel);

            contextModel.dataLoaded().then(() => {
                var docProvider = contextModel.getProperty("/journeyApp/documentProvider");
                var docDest = contextModel.getProperty("/journeyApp/documentDestination");

                var docId = contextModel.getProperty("/journeyApp/uploadDocuments/docId");

                if (docProvider === "JAM") {
                    let documentInfo = new sap.ui.model.json.JSONModel(docDest + "/api/v1/OData/ContentItems(Id='" + docId + "',ContentItemType='Document')?$expand=Creator");
                    documentInfo.dataLoaded().then(() => {
                        let createdAt = documentInfo.getProperty("/d/results/CreatedAt");
                        if (createdAt && createdAt.startsWith("/Date(")) {
                            createdAt = createdAt.substring(createdAt.indexOf("(") + 1, createdAt.indexOf(")"));
                            let oDate = new Date(parseInt(createdAt));
                            createdAt = oDate.toDateString();
                        }
                        let documentModel = new sap.ui.model.json.JSONModel({
                            "Name": documentInfo.getProperty("/d/results/Name"),
                            "CreatedAt": createdAt,
                            "CreatedBy": documentInfo.getProperty("/d/results/Creator/FullName"),
                            "Size": documentInfo.getProperty("/d/results/DocumentSize"),
                            "Link": docDest + "/api/v1/OData/ContentItems(Id='" + docId + "',ContentItemType='Document')/$value"
                        });
                        this.setModel(documentModel, "doc");
                    });
                } else if (docProvider === "CMIS") {
                    let documentInfo = new sap.ui.model.json.JSONModel(docDest + "/root?objectId=" + docId + "&cmisselector=properties");
                    documentInfo.dataLoaded().then(() => {
                        let documentModel = new sap.ui.model.json.JSONModel({
                            "Name": documentInfo.getProperty("cmis:name"),
                            "CreatedAt": documentInfo.getProperty("cmis:creationDate"),
                            "CreatedBy": documentInfo.getProperty("cmis:createdBy"),
                            "Size": "unknown",
                            "Link": docDest + "/root?objectId=" + docId + "&cmisselector=content"
                        });
                        this.setModel(documentModel, "doc");
                    });
                }
            });

            // add decisions
            startupParameters.inboxAPI.addAction({
                action: "Reject",
                label: "Reject",
                type: "negative"
            }, function (button) {
                this._completeTask(taskId, false);
            }, this);

            startupParameters.inboxAPI.addAction({
                action: "Approve",
                label: "Approve",
                type: "positive"
            }, function (button) {
                this._completeTask(taskId, true);
            }, this);

        },

        // complete the task
        _completeTask: function (taskId, approvalStatus) {
            var token = this._fetchToken();
            jQuery.ajax({
                url: WORKPLOW_API + "/v1/task-instances/" + taskId,
                method: "PATCH",
                contentType: "application/json",
                async: false,
                data: "{\"status\": \"COMPLETED\", \"context\": {\"approved\":\"" + approvalStatus + "\"}}",
                headers: {
                    "X-CSRF-Token": token
                }
            });
            this._refreshTask(taskId);
        },

        // fetch token from API end point
        _fetchToken: function () {
            var token;
            jQuery.ajax({
                url: WORKPLOW_API + "/v1/xsrf-token",
                method: "GET",
                async: false,
                headers: {
                    "X-CSRF-Token": "Fetch"
                },
                success: function (result, xhr, data) {
                    token = data.getResponseHeader("X-CSRF-Token");
                }
            });
            return token;
        },

        _refreshTask: function (taskId) {
            this.getComponentData().startupParameters.inboxAPI.updateTask("NA", taskId);
        }
    });
});
