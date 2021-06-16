sap.ui.define([
], function () {
    "use strict";

    return {
        createContext: function (definitionId, businessKey, userDetails, workspaceName) {
            // Define initial, default context
            return {
                definitionId: definitionId,
                instance: null,
                context: {
                    businessKey: businessKey,
                    journeyApp: {
                        //---
                        // State
                        //---
                        state: "preinit",
                        readyForMessage: null,
                        progress: "Pre Init",
                        currentStep: 0,
                        stepValidated: 0,
                        //---
                        // Documents
                        //---
                        documents: [],
                        //---
                        // User Context
                        //---
                        workspaceName: workspaceName,
                        user: {
                            id: userDetails.id,
                            email: userDetails.mail,
                            name: userDetails.name,
                            id: userDetails.id
                        },
                        //---
                        // Wizard step 1
                        //---
                        consultation: {
                            visible: false,
                            status: "open",
                            processor: null,
                            termsAccepted: false,
                            dueDate: null
                        },
                        uploadDocuments: {
                            visible: false,
                            status: "open",
                            docPath: null,
                            docId: null
                        },
                        leaveRequest: {
                            visible: false,
                            status: "open",
                            errorMsg: null,
                            workzoneApproval: false, // we're simulating approval in wz for this demo
                            reminderDate: null,
                            createDate: null,
                            approveDate: null,
                            date: {
                                start: null,
                                end: null
                            },
                            comment: "Parental Leave"
                        },
                        //---
                        // Wizard step 2
                        //---
                        discussLeave: {
                            visible: false,
                            status: "open",
                            date: null,
                            startTime: null,
                            duration: null,
                            location: null,
                            subject: null,
                            message: null,
                            hours: [],
                            durations: [],
                            locations: []
                        },
                        healthReminder: {
                            visible: false,
                            status: "open",
                            due: null,
                            duereminder: []
                        },
                        applyCADisabilities: {
                            visible: false,
                            status: "open"
                        },
                        delegateApprovals: {
                            visible: false,
                            status: "open"
                        },
                        //---
                        // Wizard step 3
                        //---
                        stayCurrent: {
                            visible: false,
                            status: "open"
                        },
                        notifyChanges: {
                            visible: false,
                            status: "open"
                        },
                        //---
                        // Wizard step 4
                        //---
                        update401: {
                            visible: false,
                            status: "open"
                        },
                        updateLife: {
                            visible: false,
                            status: "open"
                        },
                        signupDayCare: {
                            visible: false,
                            status: "open"
                        },
                        feedback: {
                            visible: false,
                            status: "open",
                            comment: null,
                            rating: null
                        }
                    }
                },
            };
        }
    };
});