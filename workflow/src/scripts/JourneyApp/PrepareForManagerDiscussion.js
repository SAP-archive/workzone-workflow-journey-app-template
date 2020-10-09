$.context.journeyApp.state = "waitForManagerDiscussionRequest";
$.context.journeyApp.readyForMessage = "wait_for_manager_discussion";
$.context.journeyApp.progress = "Waiting for manager discussion details";

$.context.journeyApp.discussLeave.hours = [];
$.context.journeyApp.discussLeave.durations = [];

for (var i = 7; i < 19; i++) {
    $.context.journeyApp.discussLeave.hours.push({
        text: i + ":00",
    });
    $.context.journeyApp.discussLeave.hours.push({
        text: i + ":30",
    });
    $.context.journeyApp.discussLeave.durations.push({
        text: i - 7 + "h",
    });
}

$.context.journeyApp.discussLeave.locations = [
    {
        text: "WDF03 IU.20 (Venice)"
    },
    {
        text: "WDF03 IU.25 (Your Office)"
    }
];

$.context.journeyApp.healthReminder.duereminder = [
    {
        text: "1 day after due date"
    },
    {
        text: "1 week after due date"
    },
    {
        text: "2 weeks after due date",
    },
    {
        text: "4 weeks after due date",
    }
]