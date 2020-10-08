$.context.sfLeaveRequest = {
	"__metadata": {
		"uri": "http://apisalesdemo8.successfactors.com/odata/v2/EmployeeTime",
		"type": "SFOData.EmployeeTime"
	},
	"startDate": "/Date("+Date.parse($.context.journeyApp.leaveRequest.date.start)+")/",
	"endDate": "/Date("+Date.parse($.context.journeyApp.leaveRequest.date.end)+")/",
	"externalCode": $.info.workflowInstanceId.substring(0,32),
	"userIdNav": {
		"__metadata": {
			"uri": "https://apisalesdemo8.successfactors.com/odata/v2/User('sfadmin')",
			"type": "SFOData.User"
		}
	},
	"timeTypeNav": {
		"__metadata": {
			"uri": "https://apisalesdemo8.successfactors.com/odata/v2/TimeType('TT_VAC_REC')",
			"type": "SFOData.TimeType"
		}
	}
};

$.context.journeyApp.progress = "Waiting for SF";