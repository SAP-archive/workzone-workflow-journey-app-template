/*!
 * ${copyright}
 */
sap.ui.define([], function () {
    "use strict";

    var workflowApiVersion = "rest/v1";
    var CSRFToken = "";

    function getWorkflowBasePath() {
        if (window.jamApp) {
            return window.jamApp
                .getPortalServiceRuntimeUrl()
                .then(function (baseUrl) {
                    return (
                        baseUrl +
                        "/comsapbpmworkflow.comsapbpmwusformplayer/bpmworkflowruntime/"
                    );
                });
        } else {
            return Promise.resolve(env.WORKFLOW_URL);
        }
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

    function makeAjaxRequest(url, method, body, headers, options) {
        var reqHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        };
        Object.assign(reqHeaders, headers || {});

        method = method || "get";
        body = body || {};

        return getWorkflowBasePath().then(function (basePath) {
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                url = basePath + workflowApiVersion + url;
            }

            var params = {
                method: method,
                headers: reqHeaders,
            };
            if (window.jamApp || !env.WORKFLOW_MOCK) {
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
        });
    }

    function getCsrfToken() {
        return new Promise((resolve, reject) => {
            if (CSRFToken || window.myCsrfToken) {
                resolve(CSRFToken || window.myCsrfToken);
            } else {
                getWorkflowBasePath().then(function (basePath) {
                    return fetch(basePath + workflowApiVersion + "/xsrf-token", {
                        headers: {
                            "X-CSRF-Token": "fetch",
                        },
                        credentials: "include",
                    });
                }).then((response) => {
                    CSRFToken = response.headers.get("X-Csrf-Token");
                    resolve(CSRFToken);
                });
            }
        });
    }

    function getWorkflowDefinitionList() {
        return makeAjaxRequest("/workflow-definitions.json");
    }

    function getWorkflowDefinitionModel(workflowDefinitionId) {
        return makeAjaxRequest("/workflow-definitions/" + workflowDefinitionId + "/model.json");
    }

    function getFormModel(formId, revisionId) {
        return getWorkflowBasePath().then((basePath) => {
            return makeAjaxRequest(
                basePath +
                "rest/internal/v1/forms/" +
                formId +
                "/revisions/" +
                revisionId +
                "/model.json"
            );
        });
    }

    function getWorkflowInstanceList(query) {
        return makeAjaxRequest(encodeUrlWithQuery("/workflow-instances.json", query));
    }

    function getWorkflowInstance(workflowInstanceId) {
        return makeAjaxRequest("/workflow-instances/" + workflowInstanceId);
    }

    function getWorkflowInstanceContext(workflowInstanceId) {
        return makeAjaxRequest("/workflow-instances/" + workflowInstanceId + "/context.json");
    }

    function getWorkflowInstanceExecutionLogs(workflowInstanceId) {
        return makeAjaxRequest("/workflow-instances/" + workflowInstanceId + "/execution-logs.json");
    }

    function getWorkflowInstanceErrorMessages(workflowInstanceId) {
        return makeAjaxRequest("/workflow-instances/" + workflowInstanceId + "/error-messages.json");
    }

    function getTaskInstanceList(workflowInstanceId) {
        return makeAjaxRequest("/task-instances.json" + "?workflowInstanceId=" + workflowInstanceId);
    }

    function getTaskInstanceForm(taskInstanceId) {
        return makeAjaxRequest("/task-instances/" + taskInstanceId + "/form/model");
    }

    function getTaskInstanceContext(taskInstanceId) {
        return makeAjaxRequest("/task-instances/" + taskInstanceId + "/context.json");
    }

    function updateTaskInstance(taskInstanceId, content) {
        return getCsrfToken().then((csrfToken) => {
            return makeAjaxRequest(
                "/task-instances/" + taskInstanceId,
                "PATCH",
                content,
                {
                    "X-Csrf-Token": csrfToken,
                }
            );
        });
    }

    function retrieveWorkflowInstance(instanceId) {
        Promise.all([
            getWorkflowInstance(instanceId),
            getWorkflowInstanceContext(instanceId)
        ]).then((results) => ({
            "instance": results[0],
            "context": results[1]
        }));
    }

    function retrieveWorkflowInstanceWithCallback(instanceId, callback, error) {
        retrieveWorkflowInstance(
            instanceId
        ).then((result) => {
            callback(result.instance, result.context);
        }).catch((err) => {
            console.error(err);
            error(err);
        });
    }

    function updateWorkflowContext(instanceId, context) {
        return getCsrfToken().then((csrfToken) => {
            return makeAjaxRequest(
                "/workflow-instances/" + instanceId + "/context",
                "PATCH",
                context,
                {
                    "X-Csrf-Token": csrfToken,
                }
            );
        }).then(() =>
            Promise.all([
                getWorkflowInstance(instanceId),
                getWorkflowInstanceContext(instanceId)
            ])
        ).then((results) => ({
            "instance": results[0],
            "context": results[1]
        }));
    }

    function updateWorkflowContextWithCallback(instanceId, context, callback, error) {
        updateWorkflowContext(
            instanceId,
            context
        ).then((result) => {
            callback(result.instance, result.context);
        }).catch((err) => {
            console.error(err);
            error(err);
        });
    }

    function updateWorkflowInstance(instanceId, status) {
        return getCsrfToken().then((csrfToken) => {
            return makeAjaxRequest(
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
                        getWorkflowInstance(instanceId).then((result) => resolve(result));
                    }, 1000);
                }), new Promise((resolve, reject) => {
                    setTimeout(function () {
                        getWorkflowInstanceContext(instanceId).then((result) => resolve(result));
                    }, 1000);
                }), new Promise((resolve, reject) => {
                    setTimeout(function () {
                        getWorkflowInstanceExecutionLogs(instanceId).then((result) => resolve(result));
                    }, 1000);
                })
            ]);
        }).then((results) => ({
            instance: results[0],
            context: results[1],
            executionLogs: results[2]
        }));
    }

    function updateWorkflowInstanceWithCallback(instanceId, status, callback, error) {
        updateWorkflowInstance(
            instanceId,
            status
        ).then((result) => {
            callback(result.instance, result.context, result.executionLogs);
        }).catch((err) => {
            console.error(err);
            error(err);
        });
    }

    function cancelWorkflowInstance(instanceId) {
        return updateWorkflowInstance(instanceId, "CANCELED");
    }

    function cancelWorkflowInstanceWithCallback(instanceId, callback, error) {
        cancelWorkflowInstance(
            instanceId
        ).then((result) => {
            callback(result.instance, result.context, result.executionLogs);
        }).catch((err) => {
            error(err);
        });
    }

    function restartWorkflowInstance(instanceId) {
        return updateWorkflowInstance(instanceId, "RUNNING");
    }

    function restartWorkflowInstanceWithCallback(instanceId, callback, error) {
        restartWorkflowInstance(
            instanceId
        ).then((result) => {
            callback(result.instance, result.context, result.executionLogs);
        }).catch((err) => {
            error(err);
        });
    }

    function sendWorkflowMessage(
        definitionId,
        workflowDefinitionId,
        businessKey,
        data
    ) {
        return getCsrfToken().then((csrfToken) => {
            return makeAjaxRequest(
                "/messages/",
                "POST",
                {
                    definitionId,
                    workflowDefinitionId,
                    businessKey,
                    context: data || {},
                },
                {
                    "X-Csrf-Token": csrfToken,
                }
            );
        });
    }

    function advanceWorkflowInstance(workflowDefinitionId, messageId, businessKey, instanceId, data) {
        return sendWorkflowMessage(
            messageId,
            workflowDefinitionId,
            businessKey,
            data
        ).then((instances) => {
            // TODO: verify the instances array contains our instance ID
            if (instances.some((e) => (e.id === instanceId))) {
                return Promise.all(
                    [new Promise((resolve, reject) => {
                        setTimeout(function () {
                            getWorkflowInstance(instanceId).then((result) => resolve(result));
                        }, 1000);
                    }), new Promise((resolve, reject) => {
                        setTimeout(function () {
                            getWorkflowInstanceContext(instanceId).then((result) => resolve(result));
                        }, 1000);
                    })]
                )
            }
            throw new Error("No matching workflow");
        }).then((results) => ({
            "instance": results[0],
            "context": results[1]
        }))
    }

    function advanceWorkflowInstanceWithCallback(workflowDefinitionId, messageId, businessKey, instanceId, data, callback, error) {
        advanceWorkflowInstance(
            workflowDefinitionId,
            messageId,
            businessKey,
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

    function createWorkflowInstance(workflowDefinitionId, context) {
        return getCsrfToken().then((csrfToken) => {
            return makeAjaxRequest(
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

    function createWorkflowInstandAndFetchContext(definitionId, businessKey, context, status) {
        return createWorkflowInstance(
            definitionId,
            context
        ).then((result) => {
            console.log("=================== CREATED WORKFLOW INSTANCE ===================");
            console.log(result);
            return result;
        }).then(() => getSingleContextForBusinessKey(
            definitionId,
            businessKey,
            status
        ));
    }

    function createWorkflowInstandAndFetchContextWithCallback(definitionId, businessKey, context, status, callback, error) {
        createWorkflowInstandAndFetchContext(
            definitionId,
            businessKey,
            context,
            status
        ).then((result) => {
            if (!result) {
                // sometimes we get nothing back - try again
                console.warn("Failed to get instance on first query");
                getSingleContextForBusinessKey(
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
    function waitForInstanceComplete(instanceId) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                console.log("Polling instance...");
                getWorkflowInstance(instanceId).then(
                    function (instance) {
                        if (instance.status === "RUNNING") {
                            return waitForInstanceComplete(instanceId);
                        } else {
                            resolve();
                        }
                    }
                );
            }, 3000);
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
    function waitForInstanceCompleteWithCallback(instanceId, callback, error) {
        waitForInstanceComplete(instanceId)
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
    function getSingleContextForBusinessKey(definitionId, businessKey, status) {
        // returns [ { instance, context}, ... ]
        var query = {
            definitionId,
            businessKey,
            $top: 1,
            [status && "status"]: status
        };
        return getWorkflowInstanceList(
            query
        ).then((instances) => {
            return Promise.all(
                instances.map((instance) => {
                    return Promise.all(
                        [getWorkflowInstanceContext(instance.id), getWorkflowInstanceExecutionLogs(instance.id)]
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
    function getSingleContextForBusinessKeyWithCallback(definitionId, businessKey, status, callback, error) {
        getSingleContextForBusinessKey(
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

    return {
        getWorkflowDefinitionModel: getWorkflowDefinitionModel,
        getFormModel: getFormModel,
        getWorkflowDefinitionList: getWorkflowDefinitionList,
        getWorkflowInstanceList: getWorkflowInstanceList,
        getWorkflowInstance: getWorkflowInstance,
        getWorkflowInstanceContext: getWorkflowInstanceContext,
        createWorkflowInstance: createWorkflowInstance,
        getTaskInstanceList: getTaskInstanceList,
        getTaskInstanceForm: getTaskInstanceForm,
        getTaskInstanceContext: getTaskInstanceContext,
        updateTaskInstance: updateTaskInstance,
        //
        sendWorkflowMessage: sendWorkflowMessage,
        //
        getSingleContextForBusinessKey: getSingleContextForBusinessKey,
        getSingleContextForBusinessKeyWithCallback: getSingleContextForBusinessKeyWithCallback,
        retrieveWorkflowInstance: retrieveWorkflowInstance,
        retrieveWorkflowInstanceWithCallback: retrieveWorkflowInstanceWithCallback,
        createWorkflowInstandAndFetchContext: createWorkflowInstandAndFetchContext,
        createWorkflowInstandAndFetchContextWithCallback: createWorkflowInstandAndFetchContextWithCallback,
        updateWorkflowInstance: updateWorkflowInstance,
        updateWorkflowInstanceWithCallback: updateWorkflowInstanceWithCallback,
        updateWorkflowContext: updateWorkflowContext,
        updateWorkflowContextWithCallback: updateWorkflowContextWithCallback,
        cancelWorkflowInstance: cancelWorkflowInstance,
        cancelWorkflowInstanceWithCallback: cancelWorkflowInstanceWithCallback,
        restartWorkflowInstance: restartWorkflowInstance,
        restartWorkflowInstanceWithCallback: restartWorkflowInstanceWithCallback,
        advanceWorkflowInstance: advanceWorkflowInstance,
        advanceWorkflowInstanceWithCallback: advanceWorkflowInstanceWithCallback,
        waitForInstanceComplete: waitForInstanceComplete,
        waitForInstanceCompleteWithCallback: waitForInstanceCompleteWithCallback,
    };
});
