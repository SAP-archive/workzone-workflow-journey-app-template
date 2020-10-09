/*!
 * ${copyright}
 */
sap.ui.define([
    "sap/ui/unified/FileUploader"
], function (
    FileUploader
) {
    "use strict";

    var WFFileUploader = FileUploader.extend("com.sap.wz.journey.Example.ext.WFFileUploader", {
        metadata: {
            events: {
                readFilesystemFailed: {
                    parameters: {
                        msg : {
                            type: "string"
                        }
                    }
                },
                readFilesystemSucceeded: {
                    parameters: {
                        name: {
                            type: "string"
                        },
                        data: {
                            type: "object"
                        },
                        type: {
                            type: "string"
                        }
                    }
                }
            }
        }
    });

    WFFileUploader.prototype.readFromFilesystem = function () {
        this.fireChange({id:this.getId(), newValue:"xxx", files:{}});
        var fileElem = this.getDomRef("fu");
        if (fileElem.files.length === 0) {
            this.fireReadFilesystemFailed({
                "msg": "Unable to read the file from the file system - no files selected"
            });
            return;
        }

        var file = fileElem.files[0];
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            this.fireReadFilesystemSucceeded({
                "name": file.name,
                "data": fileReader.result,
                "type": file.type
            });
        }.bind(this);
        fileReader.onerror = function (event) {
            this.fireReadFilesystemFailed({
                "msg": fileReader.error.message
            });
        }
        fileReader.onabort = function (event) {
            this.fireReadFilesystemFailed({
                "msg": fileReader.error.message
            });
        }
        fileReader.readAsBinaryString(file);
    }

    return WFFileUploader;
});
