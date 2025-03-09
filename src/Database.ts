import * as Sequelize from "sequelize";
import { sequelize } from "./DB";

const Xp = sequelize.define('xp', {
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    level: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    xp: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    requiredXp: {
        type: Sequelize.INTEGER,
        defaultValue: 10,
        allowNull: false,
    }
});

const Eco = sequelize.define('economy', {
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cash: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    usedDaily: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
})

Xp.sync();
Eco.sync();

interface XpRecordData {
    level?: number;
    xp?: number;
    requiredXp?: number;
}

interface EconomyRecordData {
    cash?: number;
    usedDaily?: boolean;
}

export class Exp {
    static async Exists(id: string): Promise<boolean> {
        const row = await Xp.findOne({ where: { userId: id } });

        if (row) return true;
        return false;
    }

    static async Fetch(id: string) {
        if (!await this.Exists(id)) return null;
        const row = await Xp.findOne({ where: { userId: id } });
        return row;
    }

    static async Update(id: string, data: XpRecordData) {
        const level = data.level || 0;
        const xp = data.xp || 0;
        const requiredXp = data.requiredXp || 10;

        if (!await this.Exists(id)) await this.Create(id, { level: level, xp: xp, requiredXp: requiredXp });

        const rows = await Xp.update({
            level: data.level,
            xp: data.level,
            requiredXp: data.requiredXp,
        }, { where: { userId: id } });

        console.log(`[XP] Successfully updated ${rows} Records`);
    }

    static async Create(id: string, data: XpRecordData) {
        await Xp.create({
            id: id,
            level: data.level,
            xp: data.xp,
            requiredXp: data.requiredXp,
        });

        console.log(`[XP] Added Successfully`);
    }

    static async Delete(id: string) {
        await Xp.destroy({ where: { userId: id } });
    }
}

export class Economy {
    static async Exists(id: string): Promise<boolean> {
        const row = await Eco.findOne({ where: { userId: id } });
        if (row) return true;
        return false;
    }

    static async Fetch(id: string) {
        if (!await this.Exists(id)) return null;
        const row = await Eco.findOne({ where: { userId: id } });
        return row;
    }

    static async Update(id: string, data: EconomyRecordData) {
        const cash = data.cash || 0;
        const usedDaily = data.usedDaily || false;

        if (!await this.Exists(id)) await this.Create(id, { cash: cash, usedDaily: usedDaily });

        const rows = await Eco.update({
            cash: data.cash,
            usedDaily: data.usedDaily
        }, { where: { userId: id } });

        console.log(`[Economy] Successfully updated ${rows} Records`);
    }

    static async Create(id: string, data: EconomyRecordData) {
        await Eco.create({
            id: id,
            cash: data.cash,
            usedDaily: data.usedDaily,
        });

        console.log(`[Economy] Added Successfully`);
    }

    static async Delete(id: string) {
        await Eco.destroy({ where: { userId: id } });
    }
}