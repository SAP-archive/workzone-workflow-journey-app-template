/*!
 * ${copyright}
 */
sap.ui.define([], function () {
    "use strict";

    function createDocument(cmisDest, file) {
        var formData = new FormData();

        formData.append('cmisAction', 'createDocument');
        formData.append('propertyId[0]', 'cmis:objectTypeId');
        formData.append('propertyValue[0]', 'cmis:document');
        formData.append('propertyId[1]', 'cmis:name');
        formData.append('propertyValue[1]', file.name);
        formData.append('file', new Blob([file.data]), file.name);

        var params = {
            method: "POST",
            body: formData,
            credentials: "include"
        };
        var url = cmisDest + "/root?succinct=true";

        return fetch(url, params).then((response) => {
            if (response.status === 201) {
                console.log("Successfully created document");
                return response.json();
            }
            if (response.status === 409) {
                throw new Exception("Unable to upload document as a copy already exists on the server");
            }
            throw new Error("Couldn't create document: response " + response.status);
        }).then((json) => {
            return json.succinctProperties["cmis:objectId"];
        });
    }

    function deleteDocument(cmisDest, id) {
        var formData = new FormData();

        formData.append('cmisAction', 'delete');
        formData.append('objectId', id);

        var params = {
            method: "POST",
            body: formData,
            credentials: "include"
        };
        var url = cmisDest + "/root?succinct=true";

        return fetch(url, params).then((response) => {
            if (response.status === 200) {
                return id;
            }
            throw new Error("Unable to delete document: response " + response.status);
        });
    }

    return {
        createDocument: createDocument,
        deleteDocument: deleteDocument
    }
});