export class Util {
    static random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static bubbleSort(array: any[], levels = true) {
        if (!array) return;
        const n = array.length;
        if (levels) {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n - i; j++) {
                    if (!array[j + 1]) continue;
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

export enum CommandPermissionLevel {
    Devs,
    ServerOwner,
    ServerAdmins,
    ServerMods,
    Anyone
}