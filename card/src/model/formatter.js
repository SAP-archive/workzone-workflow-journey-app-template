sap.ui.define([
    "sap/ui/core/format/DateFormat"
], function (
    DateFormat
) {
    "use strict";
    return {
        // change handler for due date: validate the values
        checkAndSetDueDate: function (oEvent) {
            var oSource = oEvent.getSource();
            if (!oEvent.getParameters().valid) {
                oSource.setValueState("Error");
                oSource.setValueStateText("The due date needs to be between 30 days and 250 days in the future");
                oSource.setDateValue(oSource.getDateValue());
                return;
            } else if (oEvent.getParameters().newValue) {
                oSource.setValueState("Success");
                oSource.setValueStateText("");
            } else {
                oSource.setValueState("None");
                oSource.setValueStateText("");
            }
        },

        // change handler for leave request dates: validate the values
        checkLR: function () {
            setTimeout(
                function () {
                    var oStartDate = this.byId("lrStart");
                    var oEndDate = this.byId("lrEnd");
                    this.byId("lrCreate").setEnabled(false);
                    this.byId("lrCreate").setType("Default");
                    this.byId("lrComment").setValueState("None");
                    this.byId("lrComment").setValueStateText("");
                    oEndDate.setValueState("None");
                    oStartDate.setValueState("None");
                    oEndDate.setValueStateText("");
                    oStartDate.setValueStateText("");
                    var bError = false;
                    var bValid = true;

                    if (!oEndDate.getDateValue() && oEndDate.getValue()) {
                        oEndDate.setValueState("Error");
                        oEndDate.setValueStateText("End date is not valid");
                        bError = true;
                    } else if (oEndDate.getValue()) {
                        oEndDate.setValueState("Success");
                        oEndDate.setValueStateText("");
                    } else {
                        bValid = false;
                    }
                    if (!oStartDate.getDateValue() && oStartDate.getValue()) {
                        oStartDate.setValueState("Error");
                        oStartDate.setValueStateText("Start date is not valid");
                        bError = true;
                    } else if (oStartDate.getValue()) {
                        oStartDate.setValueState("Success");
                        oStartDate.setValueStateText("");
                    } else {
                        bValid = false;
                    }
                    if (oEndDate.getDateValue() && oStartDate.getDateValue()) {
                        if (
                            oStartDate.getDateValue().getTime() <= new Date().getTime()
                        ) {
                            oStartDate.setValueState("Error");
                            oStartDate.setValueStateText("Start date after todays date");
                            bError = true;
                        }
                        if (
                            oEndDate.getDateValue().getTime() + 1000 * 60 * 60 * 24 <=
                            oStartDate.getDateValue().getTime()
                        ) {
                            oEndDate.setValueState("Error");
                            oEndDate.setValueStateText("End date must be after start date");
                            bError = true;
                        }
                    }
                    if (!this.byId("lrComment").getValue()) {
                        this.byId("lrComment").setValueState("Error");
                        bError = true;
                        this.byId("lrComment").setValueStateText(
                            "Please enter a comment"
                        );
                    } else {
                        this.byId("lrComment").setValueState("Success");
                        this.byId("lrComment").setValueStateText("");
                    }
                    if (!bError && bValid) {
                        this.byId("lrCreate").setEnabled(true);
                        this.byId("lrCreate").setType("Emphasized");
                    }
                }.bind(this),
                100
            );
        },

        //formatter
        formatMinDueDate: function (vValue) {
            var oToday = new Date();
            var iMin = parseInt(30) * 1000 * 60 * 60 * 24;
            oToday.setMilliseconds(oToday.getMilliseconds() + iMin);
            return oToday;
        },

        // formatter
        formatMaxDueDate: function (vValue) {
            var oToday = new Date();
            var iMax = parseInt(250) * 1000 * 60 * 60 * 24;
            oToday.setMilliseconds(oToday.getMilliseconds() + iMax);
            return oToday;
        },

        // formatter
        formatReminderVisible: function (s) {
            if (s) {
                return true;
            }
            return false;
        },

        // formatter
        formatRelativeDate: function (s) {
            if (!s) {
                return "";
            }
            var oDate = Date.parse(s);
            var oFormatter = DateFormat.getDateInstance({
                relative: true,
                style: "long",
            });
            return oFormatter.format(new Date(oDate));
        }
    };
});