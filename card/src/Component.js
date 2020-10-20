sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"./model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("sap.wz.journey.template.card.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		},
		onCardReady: function (oCard) {
            this.card = oCard;
            
            // Can get all parameters with method getCombinedParameters
            //oCard.getCombinedParameters();

            // Get any section of the card manifest with method getManifestEntry
            //oCard.getManifestEntry("/sap.card");
            
            // When in context of a Host, like in Work Zone you can use the following methods
            // oCard.getHostInstance();
            // oCard.resolveDestination("myDestination"); // check more in the destinations sample
		}
	});
});