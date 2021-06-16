/*!
 * ${copyright}
 */
sap.ui.define([], function () {
    "use strict";

    var workflowApiVersion = "/rest/v1";

    var WFDataProvider = function (destination) {
        this._destination = destination;
        this._CSRFToken = "";
    }

    function encodeUrlWithQuery(url, query) {
        Object.keys(query || {}).forEach(function (key, index) {
            url += `${index ? "" : "?"}`;
            if (query[key]) {
                url += `${index ? "&" : ""}${key}=${encodeURIComponent(query[key])}`;
            }
        });

        return url;
    }

    WFDataProvider.prototype._getWorkflowBasePath = function () {
        return Promise.resolve(this._destination ? this._destination : env.WORKFLOW_URL);
    }

    WFDataProvider.prototype._makeAjaxRequest = function(url, method, body, headers, options) {
        var reqHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        };
        Object.assign(reqHeaders, headers || {});

        method = method || "get";
        body = body || {};

        return this._getWorkflowBasePath().then(function (basePath) {
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                url = basePath + workflowApiVersion + url;
            }

            var params = {
                method: method,
                headers: reqHeaders,
            };
            if (this._destination || !env.WORKFLOW_MOCK) {
                Object.assign(params, {
                    credentials: "include",
                });
                url = url.replace(".json", "");
            }
            Object.assign(params, options);

            if (method.toLowerCase() !== "get") {
                params.body = JSON.stringify(body);
            }

            return fetch(url, params).then(function (response) {
                if (response.ok) {
                    var contentType = response.headers.get("Content-Type");
                    if (contentType && contentType.includes("application/json")) {
                        var contentLen = response.headers.get("Content-Length");
                        if (contentLen == 0) {
                            // return a null JSON object
                            return Promise.resolve(null);
                        } else {
                            return response.json();
                        }
                    } else {
                        return response.text();
                    }
                }
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            });
        }.bind(this));
    }

    WFDataProvider.prototype._getCsrfToken = function () {
        return new Promise((resolve, reject) => {
            if (this._CSRFToken) {
                resolve(this._CSRFToken);
            } else {
                this._getWorkflowBasePath().then(function (basePath) {
                    return fetch(basePath + workflowApiVersion + "/xsrf-token", {
                        headers: {
                            "X-CSRF-Token": "fetch",
                        },
                        credentials: "include",
                    });
                }).then((response) => {
                    this._CSRFToken = response.headers.get("X-Csrf-Token");
                    resolve(this._CSRFToken);
                });
            }
        });
    }

    WFDataProvider.prototype.getWorkflowDefinitionList = function () {
        return this._makeAjaxRequest("/workflow-definitions.json");
    }

    WFDataProvider.prototype.getWorkflowDefinitionModel = function (workflowDefinitionId) {
        return this._makeAjaxRequest("/workflow-definitions/" + workflowDefinitionId + "/model.json");
    }

    WFDataProvider.prototype.getFormModel = function (formId, revisionId) {
        return this._getWorkflowBasePath().then((basePath) => {
            return this._makeAjaxRequest(
                basePath +
                "rest/internal/v1/forms/" +
                formId +
                "/revisions/" +
                revisionId +
                "/model.json"
            );
        });
    }

    WFDataProvider.prototype.getWorkflowInstanceList = function (query) {
        return this._makeAjaxRequest(encodeUrlWithQuery("/workflow-instances.json", query));
    }

    WFDataProvider.prototype.getWorkflowInstance = function (workflowInstanceId) {
        return this._makeAjaxRequest("/workflow-instances/" + workflowInstanceId);
    }

    WFDataProvider.prototype.getWorkflowInstanceContext = function (workflowInstanceId) {
        return this._makeAjaxRequest("/workflow-instances/" + workflowInstanceId + "/context.json");
    }

    WFDataProvider.prototype.getWorkflowInstanceExecutionLogs = function (workflowInstanceId) {
        return this._makeAjaxRequest("/workflow-instances/" + workflowInstanceId + "/execution-logs.json");
    }

    WFDataProvider.prototype.getWorkflowInstanceErrorMessages = function (workflowInstanceId) {
        return this._makeAjaxRequest("/workflow-instances/" + workflowInstanceId + "/error-messages.json");
    }

    WFDataProvider.prototype.getTaskInstanceList = function (workflowInstanceId) {
        return this._makeAjaxRequest("/task-instances.json" + "?workflowInstanceId=" + workflowInstanceId);
    }

    WFDataProvider.prototype.getTaskInstanceForm = function (taskInstanceId) {
        return this._makeAjaxRequest("/task-instances/" + taskInstanceId + "/form/model");
    }

    WFDataProvider.prototype.getTaskInstanceContext = function (taskInstanceId) {
        return this._makeAjaxRequest("/task-instances/" + taskInstanceId + "/context.json");
    }

    WFDataProvider.prototype.updateTaskInstance = function (taskInstanceId, content) {
        return this._getCsrfToken().then((csrfToken) => {
            return this._makeAjaxRequest(
                "/task-instances/" + taskInstanceId,
                "PATCH",
                content,
                {
                    "X-Csrf-Token": csrfToken,
                }
            );
        });
    }

    WFDataProvider.prototype.retrieveWorkflowInstance = function (instanceId) {
        return Promise.all([
            this.getWorkflowInstance(instanceId),
            this.getWorkflowInstanceContext(instanceId)
        ]).then((results) => ({
            "instance": results[0],
            "context": results[1]
        }));
    }

    WFDataProvider.prototype.retrieveWorkflowInstanceWithCallback = function (instanceId, callback, error) {
        this.retrieveWorkflowInstance(
            instanceId
        ).then((result) => {
            callback(result.instance, result.context);
        }).catch((err) => {
            console.error(err);
            error(err);
        });
    }

    WFDataProvider.prototype.updateWorkflowContext = function (instanceId, context) {
        return this._getCsrfToken().then((csrfToken) => {
            return this._makeAjaxRequest(
                "/workflow-instances/" + instanceId + "/context",
                "PATCH",
                context,
                {
                    "X-Csrf-Token": csrfToken,
                }
            );
        }).then(() =>
            Promise.all([
                this.getWorkflowInstance(instanceId),
                this.getWorkflowInstanceContext(instanceId)
            ])
        ).then((results) => ({
            "instance": results[0],
            "context": results[1]
        }));
    }

    WFDataProvider.prototype.updateWorkflowContextWithCallback = function (instanceId, context, callback, error) {
        this.updateWorkflowContext(
            instanceId,
            context
        ).then((result) => {
            callback(result.instance, result.context);
        }).catch((err) => {
            console.error(err);
            error(err);
        });
    }

    WFDataProvider.prototype.updateWorkflowInstance = function (instanceId, status) {
        return this._getCsrfToken().then((csrfToken) => {
            return this._makeAjaxRequest(
                "/workflow-instances/" + instanceId,
                "PATCH",
                { status: status },
                {
                    "X-Csrf-Token": csrfToken,
                }
            );
        }).then(() => {
            return Promise.all([
                new Promise((resolve, reject) => {
                    setTimeout(function () {
                        this.getWorkflowInstance(instanceId).then((result) => resolve(result));
                    }.bind(this), 1000);
                }), new Promise((resolve, reject) => {
                    setTimeout(function () {
                        this.getWorkflowInstanceContext(instanceId).then((result) => resolve(result));
                    }.bind(this), 1000);
                }), new Promise((resolve, reject) => {
                    setTimeout(function () {
                        this.getWorkflowInstanceExecutionLogs(instanceId).then((result) => resolve(result));
                    }.bind(this), 1000);
                })
            ]);
        }).then((results) => ({
            instance: results[0],
            context: results[1],
            executionLogs: results[2]
        }));
    }

    WFDataProvider.prototype.updateWorkflowInstanceWithCallback = function (instanceId, status, callback, error) {
        this.updateWorkflowInstance(
            instanceId,
            status
        ).then((result) => {
            callback(result.instance, result.context, result.executionLogs);
        }).catch((err) => {
            console.error(err);
            error(err);
        });
    }

    WFDataProvider.prototype.cancelWorkflowInstance = function (instanceId) {
        return this.updateWorkflowInstance(instanceId, "CANCELED");
    }

    WFDataProvider.prototype.cancelWorkflowInstanceWithCallback = function (instanceId, callback, error) {
        this.cancelWorkflowInstance(
            instanceId
        ).then((result) => {
            callback(result.instance, result.context, result.executionLogs);
        }).catch((err) => {
            error(err);
        });
    }

    WFDataProvider.prototype.restartWorkflowInstance = function (instanceId) {
        return this.updateWorkflowInstance(instanceId, "RUNNING");
    }

    WFDataProvider.prototype. estartWorkflowInstanceWithCallback = function (instanceId, callback, error) {
        this.restartWorkflowInstance(
            instanceId
        ).then((result) => {
            callback(result.instance, result.context, result.executionLogs);
        }).catch((err) => {
            error(err);
        });
    }

    WFDataProvider.prototype.sendWorkflowMessage = function (definitionId, workflowInstanceId, data) {
        return this._getCsrfToken().then((csrfToken) => {
            return this._makeAjaxRequest(
                "/messages/",
                "POST",
                {
                    definitionId,
                    workflowInstanceId,
                    context: data || {},
                },
                {
                    "X-Csrf-Token": csrfToken,
                }
            );
        });
    }

    WFDataProvider.prototype.advanceWorkflowInstance = function (messageId, instanceId, data) {
        return this.sendWorkflowMessage(
            messageId,
            instanceId,
            data
        ).then((instances) => {
            // TODO: verify the instances array contains our instance ID
            if (instances.some((e) => (e.id === instanceId))) {
                return Promise.all(
                    [new Promise((resolve, reject) => {
                        setTimeout(function () {
                            this.getWorkflowInstance(instanceId).then((result) => resolve(result));
                        }.bind(this), 1000);
                    }), new Promise((resolve, reject) => {
                        setTimeout(function () {
                            this.getWorkflowInstanceContext(instanceId).then((result) => resolve(result));
                        }.bind(this), 1000);
                    })]
                )
            }
            throw new Error("No matching workflow");
        }).then((results) => ({
            "instance": results[0],
            "context": results[1]
        }))
    }

    WFDataProvider.prototype.advanceWorkflowInstanceWithCallback = function (messageId, instanceId, data, callback, error) {
        this.advanceWorkflowInstance(
            messageId,
            instanceId,
            data
        ).then((result) => {
            callback(result.instance, result.context);
        }).catch((err) => {
            // TODO if the user did this too quickly, the task may still
            // be in transition, we can either pause & retry, or
            // tell the user to try again.
            // a 6 sec sleep/retry could be resonable
            // perhaps easier to put this in a "recursive promise" function
            console.error(err);
            error(err);
        });
    }

    WFDataProvider.prototype.createWorkflowInstance = function (workflowDefinitionId, context) {
        return this._getCsrfToken().then((csrfToken) => {
            return this._makeAjaxRequest(
                "/workflow-instances/",
                "POST",
                {
                    definitionId: workflowDefinitionId,
                    context: context || {},
                },
                {
                    "X-Csrf-Token": csrfToken,
                }
            );
        });
    }

    WFDataProvider.prototype.createWorkflowInstandAndFetchContext = function (definitionId, businessKey, context, status) {
        return this.createWorkflowInstance(
            definitionId,
            context
        ).then((result) => {
            console.log("=================== CREATED WORKFLOW INSTANCE ===================");
            console.log(result);
            return result;
        }).then(() => this.getSingleContextForBusinessKey(
            definitionId,
            businessKey,
            status
        ));
    }

    WFDataProvider.prototype.createWorkflowInstandAndFetchContextWithCallback = function (definitionId, businessKey, context, status, callback, error) {
        this.createWorkflowInstandAndFetchContext(
            definitionId,
            businessKey,
            context,
            status
        ).then((result) => {
            if (!result) {
                // sometimes we get nothing back - try again
                console.warn("Failed to get instance on first query");
                this.getSingleContextForBusinessKey(
                    definitionId,
                    businessKey,
                    status
                ).then((result) => {
                    if (!result) {
                        var err = new Error("No instance returned after creation");
                        console.error(err);
                        error(err);
                    } else {
                        callback(result.instance, result.context, result.executionLogs);
                    }
                });
            } else {
                callback(result.instance, result.context, result.executionLogs);
            }
        }).catch((err) => {
            //TODO hide busyindicator
            console.error(err);
            error(err);
        });
    }

    /**
     * Wait for a workflow instance to complete (status becomes *not* RUNNING).
     * The method repeatedly polls until the status reaches the correct value.
     * Returns a promise that resolves when the status reaches the correct value.
     * 
     * @param  {} instanceId
     */
    WFDataProvider.prototype.waitForInstanceComplete = function (instanceId) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                console.log("Polling instance...");
                this.getWorkflowInstance(instanceId).then(
                    function (instance) {
                        if (instance.status === "RUNNING") {
                            return this.waitForInstanceComplete(instanceId);
                        } else {
                            resolve();
                        }
                    }
                );
            }.bind(this), 3000);
        });
    }
    
    /**
     * Wait for a workflow instance to complete (status becomes *not* RUNNING).
     * The method repeatedly polls until the status reaches the correct value.
     * When the status reaches a non-RUNNING value, the callback is executed (else on error the error
     * handler is called).
     * 
     * @param  {} instanceId
     * @param  {} callback
     * @param  {} error
     */
    WFDataProvider.prototype.waitForInstanceCompleteWithCallback = function (instanceId, callback, error) {
        this.waitForInstanceComplete(instanceId)
            .then(callback)
            .catch((err) => {
                console.error(err);
                error(err)
            });
    }

    /**
     * Locate a single matching workflow instance that matches the supplied definition ID, business key and status.
     * Returns a promise that resolves successfully to the first matched instance, else rejects with an error.
     * 
     * @param  {} definitionId
     * @param  {} businessKey
     * @param  {} status
     */
    WFDataProvider.prototype.getSingleContextForBusinessKey = function (definitionId, businessKey, status) {
        // returns [ { instance, context}, ... ]
        var query = {
            definitionId,
            businessKey,
            $top: 1,
            [status && "status"]: status
        };
        return this.getWorkflowInstanceList(
            query
        ).then((instances) => {
            return Promise.all(
                instances.map((instance) => {
                    return Promise.all(
                        [this.getWorkflowInstanceContext(instance.id), this.getWorkflowInstanceExecutionLogs(instance.id)]
                    ).then((results) => {
                        return {
                            instance,
                            "context": results[0],
                            "executionLogs": results[1]
                        }
                    })
                })
            );
        }).then((results) => {
            // expect 1 entry
            if (!Array.isArray(results) || results.length == 0) {
                // nothing to do
                // TODO: ???
                return null;
            }

            console.log("=================== LOADED WORKFLOW INSTANCE ===================");
            console.log(results[0]);

            var instance = results[0].instance;
            var context = results[0].context;
            var executionLogs = results[0].executionLogs;

            // we expect a valid instance and context object
            if (!instance || !context) {
                // unexpected
                // TODO: ???
                var err = new Error("Unexpected result");
                console.error(err);
                throw err;
            }

            return {
                instance,
                context,
                executionLogs
            }
        });
    }

    /**
     * Locate a single matching workflow instance that matches the supplied definition ID, business key and status.
     * If multiple matches are found, return the first one.
     * If none are found, return null.
     * Execute callback function on success, else call error handler.
     * 
     * @param  {} definitionId
     * @param  {} businessKey
     * @param  {} status
     * @param  {} callback
     * @param  {} error
     */
    WFDataProvider.prototype.getSingleContextForBusinessKeyWithCallback = function (definitionId, businessKey, status, callback, error) {
        this.getSingleContextForBusinessKey(
            definitionId,
            businessKey,
            status,
            callback
        ).then((result) => {
            if (!result) {
                callback(null, null, null);
            } else {
                callback(result.instance, result.context, result.executionLogs);
            }
        }).catch((err) => {
            // TODO: hide busyindicator
            console.error(err);
            error(err);
        });
    }

    /**
     * Locate multiple matching workflow instances that matches the supplied definition ID, business key and status.
     * Returns a promise that resolves successfully to the array of instances, else rejects with an error.
     * 
     * @param  {} definitionId
     * @param  {} businessKey
     * @param  {} status
     */
    WFDataProvider.prototype.getMultipleContextsForBusinessKey = function (definitionId, businessKey, status) {
        // returns [ { instance, context}, ... ]
        var query = {
            definitionId,
            businessKey,
            [status && "status"]: status
        };
        return this.getWorkflowInstanceList(
            query
        ).then((instances) => {
            return Promise.all(
                instances.map((instance) => {
                    return Promise.all(
                        [this.getWorkflowInstanceContext(instance.id), this.getWorkflowInstanceExecutionLogs(instance.id)]
                    ).then((results) => {
                        return {
                            instance,
                            "context": results[0],
                            "executionLogs": results[1]
                        }
                    })
                })
            );
        }).then((results) => {
            console.log("=================== LOADED WORKFLOW INSTANCES ===================");

            return results;
        });
    }

    /**
     * Locate a multiple matching workflow instances that matche the supplied definition ID, business key and status.
     * If none are found, return null.
     * Execute callback function on success, else call error handler.
     * 
     * @param  {} definitionId
     * @param  {} businessKey
     * @param  {} status
     * @param  {} callback
     * @param  {} error
     */
    WFDataProvider.prototype.getMultipleContextsForBusinessKeyWithCallback = function (definitionId, businessKey, status, callback, error) {
        this.getMultipleContextsForBusinessKey(
            definitionId,
            businessKey,
            status,
            callback
        ).then((results) => {
            callback(results);
        }).catch((err) => {
            // TODO: hide busyindicator
            console.error(err);
            error(err);
        });
    }

    return WFDataProvider;
});
