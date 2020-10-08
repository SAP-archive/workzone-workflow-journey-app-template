/*!
 * ${copyright}
 */
sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (
    JSONModel
) {
    "use strict";

    var WFModel = JSONModel.extend("com.sap.wz.journey.Example.ext.WFModel", {
        constructor: function(oData, bObserve, controller) {
            this._ctx = controller;
            JSONModel.call(this, oData, bObserve);
        }
    });

    WFModel.prototype.setProperty = function (sPath, oValue, oContext, bAsyncUpdate) {
        var path = oContext ? oContext.getPath() + '/' + sPath : sPath;
        var prefix = "/context/" + this._ctx._appContext + "/";
        if (path.startsWith(prefix)) {
            this._ctx._changeMap.set(path.substring(prefix.length), oValue);
        }

        return JSONModel.prototype.setProperty.apply(this, arguments);
    }

    return WFModel;
});  