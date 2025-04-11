export class Util {
    static random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static bubbleSort(array: any[]) {
        const n = array.length;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i; j++) {
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
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