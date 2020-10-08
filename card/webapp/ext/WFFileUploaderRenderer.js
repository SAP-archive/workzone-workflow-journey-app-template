/*!
 * ${copyright}
 */
sap.ui.define([
    "sap/ui/core/Renderer",
    "sap/ui/unified/FileUploaderRenderer"
], function (
    Renderer,
    FileUploaderRenderer
) {
    "use strict";

    var WFFileUploaderRenderer = Renderer.extend(FileUploaderRenderer);

    return WFFileUploaderRenderer;
}, /* bExport= */ true);
