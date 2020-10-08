/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/sap/wz/journey/managerDiscussion/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
