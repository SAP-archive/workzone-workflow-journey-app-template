if (!$.context.journeyApp.leaveRequest.date ||
    !$.context.journeyApp.leaveRequest.date.start ||
    !$.context.journeyApp.leaveRequest.date.end) {
    $.context.journeyApp.leaveRequest.status = "error";
    $.context.journeyApp.leaveRequest.errorMsg = "";
} else {
    // convert date strings to Dates
    $.context.journeyApp.leaveRequest.startDate = new Date($.context.journeyApp.leaveRequest.date.start);
    $.context.journeyApp.leaveRequest.endDate = new Date($.context.journeyApp.leaveRequest.date.end);
    if ($.context.journeyApp.leaveRequest.startDate.getMonth() === 7) {
        $.context.journeyApp.leaveRequest.status = "error";
        $.context.journeyApp.leaveRequest.errorMsg = "Sorry your leave request cannot start in August - please provide an alternative date";
    } else {
        $.context.journeyApp.leaveRequest.status = "inprocess";
    }
}

$.context.journeyApp.state = "receivedLeaveRequest";
$.context.journeyApp.readyForMessage = null;
$.context.journeyApp.progress = "Leave Request Details Supplied";