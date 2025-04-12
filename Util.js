"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandPermissionLevel = exports.Util = void 0;
class Util {
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static bubbleSort(array, levels = true) {
        if (!array)
            return;
        const n = array.length;
        if (levels) {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n - i; j++) {
                    if (!array[j + 1])
                        continue;
                    if (array[j].level > array[j].level) {
                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    }
                    else if (array[j].level === array[j + 1].level) {
                        if (array[j].xp > array[j + 1].xp) {
                            [array[j], array[j + 1]] = [array[j + 1], array[j]];
                        }
                    }
                }
            }
        }
        else {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n - i; j++) {
                    if (array[j] > array[j + 1]) {
                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    }
                }
            }
        }
        return array;
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
