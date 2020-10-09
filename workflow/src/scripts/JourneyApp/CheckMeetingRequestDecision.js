// check user task result
$.context.journeyApp.discussLeave.userTask = {
    "status": $.usertasks.usertask3.last.status,
    "decision": $.usertasks.usertask3.last.decision,
    "processor": $.usertasks.usertask3.last.processor
}

if ($.context.journeyApp.discussLeave.userTask.decision === "reject") {
    $.context.journeyApp.discussLeave.status = "error";
    $.context.journeyApp.discussLeave.errorMsg = $.context.journeyApp.discussLeave.comments;
} else {
    $.context.journeyApp.discussLeave.status = "completed";
}

$.context.journeyApp.state = "managerDiscussLeaveUserTaskCompleted";
$.context.journeyApp.readyForMessage = null;
$.context.journeyApp.progress = "Manager User Task Completed";
