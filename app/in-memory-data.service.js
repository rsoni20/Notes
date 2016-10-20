"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var notes = [
            { id: 1, writing: "First Note", date: new Date, archived: false, selected: false },
            { id: 2, writing: "Second Note", date: new Date, archived: false, selected: false },
            { id: 3, writing: "Third Note", date: new Date, archived: false, selected: false }
        ];
        return { notes: notes };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map