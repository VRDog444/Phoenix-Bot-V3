"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandPermissionLevel = exports.Util = void 0;
class Util {
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
exports.Util = Util;
var CommandPermissionLevel;
(function (CommandPermissionLevel) {
    CommandPermissionLevel[CommandPermissionLevel["Devs"] = 0] = "Devs";
    CommandPermissionLevel[CommandPermissionLevel["ServerOwner"] = 1] = "ServerOwner";
    CommandPermissionLevel[CommandPermissionLevel["ServerAdmins"] = 2] = "ServerAdmins";
    CommandPermissionLevel[CommandPermissionLevel["ServerMods"] = 3] = "ServerMods";
    CommandPermissionLevel[CommandPermissionLevel["Anyone"] = 4] = "Anyone";
})(CommandPermissionLevel || (exports.CommandPermissionLevel = CommandPermissionLevel = {}));
