var scorm = {
    version: "1.2",
    handleCompletionStatus: true,
    initialized: false,
    api: null,
    init: function () {
        if (this.initialized) return true;
        this.api = this.getAPI();
        if (!this.api) return false;
        var result = this.api.LMSInitialize("");
        this.initialized = (result === "true");
        return this.initialized;
    },
    get: function (parameter) {
        if (!this.initialized) return null;
        return this.api.LMSGetValue(parameter);
    },
    set: function (parameter, value) {
        if (!this.initialized) return false;
        return this.api.LMSSetValue(parameter, value);
    },
    save: function () {
        if (!this.initialized) return false;
        return this.api.LMSCommit("");
    },
    quit: function () {
        if (!this.initialized) return false;
        this.save();
        var result = this.api.LMSFinish("");
        this.initialized = false;
        return result;
    },
    getAPI: function () {
        var win = window;
        while (win.API == null && win.parent != null && win.parent != win) {
            win = win.parent;
        }
        return win.API || null;
    }
};
