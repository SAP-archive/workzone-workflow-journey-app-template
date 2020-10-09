// check user task result
$.context.journeyApp.leaveRequest.userTask = {
    "status": $.usertasks.usertask2.last.status,
    "decision": $.usertasks.usertask2.last.decision,
    "processor": $.usertasks.usertask2.last.processor
}

if ($.context.journeyApp.leaveRequest.userTask.decision === "reject") {
    $.context.journeyApp.leaveRequest.status = "error";
    $.context.journeyApp.leaveRequest.errorMsg = $.context.journeyApp.leaveRequest.comments;
} else {
    $.context.journeyApp.leaveRequest.approveDate = new Date().toISOString();
    $.context.journeyApp.leaveRequest.status = "completed";
}

$.context.journeyApp.state = "managerApprovalUserTaskCompleted";
$.context.journeyApp.readyForMessage = null;
$.context.journeyApp.progress = "Manager User Task Completed";
