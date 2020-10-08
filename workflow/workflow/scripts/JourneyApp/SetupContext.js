if (!$.context.journeyApp.consultation.dueDate) {
    $.context.journeyApp.consultation.status = "error";
    $.context.journeyApp.consultation.errorMsg = "You must provide a due date"
} else {
    var duedate = new Date($.context.journeyApp.consultation.dueDate);
    if (duedate.getMonth() === 7) { // dont allow month 7 (August, as January is 0)
        $.context.journeyApp.consultation.status = "error";
        $.context.journeyApp.consultation.errorMsg = "You cannot have a baby in August due to company policy"
    } else {
        $.context.journeyApp.consultation.status = "inprocess";
    }
}

$.context.journeyApp.state = "receivedConsultation";
$.context.journeyApp.readyForMessage = null;
$.context.journeyApp.progress = "Received Consultation Details";