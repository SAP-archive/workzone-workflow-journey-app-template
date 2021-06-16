/*!
 * ${copyright}
 */
sap.ui.define([], function () {
    "use strict";

    var svcRoot = "/api/v1/OData";

    var DocumentProvider = function (destination) {
        this._destination = destination;
    }

    DocumentProvider.prototype._fetchCsrfToken = function () {
        var params = {
            headers: {
                "X-CSRF-Token": "fetch",
            },
            credentials: "include"
        }
        var url = this._destination + svcRoot;

        return fetch(url, params).then((response) => {
            return response.headers.get("X-Csrf-Token");
        });
    }

    DocumentProvider.prototype._deleteContentItem = function (id, csrfToken) {
        var params = {
            method: "DELETE",
            credentials: "include",
            headers: {
                "accept": "application/json",
                "x-csrf-token": csrfToken
            }
        };
        var url = this._destination + svcRoot + "/ContentItems(Id='"+id+"',ContentItemType='Document')";

        return fetch(url, params).then((response) => {
            if (response.status === 204) {
                console.log("Successfully deleted content type");
                return id;
            }
            console.log("Error deleting content type: " + response.status);
            throw new Error("Unexpected response: " + response.status + " ("+response.statusText+")");
        })
    }

    DocumentProvider.prototype._createContentItem = function (file, csrfToken) {
        var params = {
            method: "POST",
            body: "{\"Name\":\""+file.name+"\",\"ContentItemType\":\"Document\",\"FileName\":\""+file.name+"\"}",
            credentials: "include",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "Slug": file.name,
                "x-csrf-token": csrfToken
            }
        };
        var url = this._destination + svcRoot + "/ContentItems";

        return fetch(url, params).then((response) => {
            if (response.status === 201) {
                console.log("Successfully created content type");
                return response.json();
            }
            console.log("Error creating content type: " + response.status);
            throw new Error("Unexpected response: " + response.status + " ("+response.statusText+")");
        }).then((json) => ({
            id: json.d.results.Id,
            itemType: json.d.results.ContentItemType,
            csrfToken: csrfToken
        }));
    }

    DocumentProvider.prototype._uploadContent = function (file, content) {
        var params = {
            method: "PATCH",
            body: file.data,
            credentials: "include",
            headers: {
                "accept": "application/json",
                "content-type": file.type, 
                "Slug": file.name,
                "x-csrf-token": content.csrfToken
            }
        };
        var url = this._destination + svcRoot + "/ContentItems(Id='"+content.id+"',ContentItemType='"+content.itemType+"')/$value";

        return fetch(url, params).then((response) => {
            if (response.status === 204) {
                console.log("Successfully uploaded data with content ID: " + content.id);
                return content.id;
            }
            console.log("Error uploading content: " + response.status);
            throw new Error("Unexpected response: " + response.status + " ("+response.statusText+")");
        });
    }

    DocumentProvider.prototype.createDocument = function (file) {
        return Promise.resolve()
            .then(this._fetchCsrfToken.bind(this))
            .then(this._createContentItem.bind(this, file))
            .then(this._uploadContent.bind(this, file));
    }

    DocumentProvider.prototype.deleteDocument = function (id) {
        return Promise.resolve()
            .then(this._fetchCsrfToken.bind(this))
            .then(this._deleteContentItem.bind(this, id));
    }

    return DocumentProvider;
});