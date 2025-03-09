"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Economy = exports.Exp = void 0;
const Sequelize = __importStar(require("sequelize"));
const DB_1 = require("./DB");
const Xp = DB_1.sequelize.define('xp', {
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
const Eco = DB_1.sequelize.define('economy', {
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
});
Xp.sync();
Eco.sync();
class Exp {
    static Exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield Xp.findOne({ where: { userId: id } });
            if (row)
                return true;
            return false;
        });
    }
    static Fetch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.Exists(id)))
                return null;
            const row = yield Xp.findOne({ where: { userId: id } });
            return row;
        });
    }
    static Update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const level = data.level || 0;
            const xp = data.xp || 0;
            const requiredXp = data.requiredXp || 10;
            if (!(yield this.Exists(id)))
                yield this.Create(id, { level: level, xp: xp, requiredXp: requiredXp });
            const rows = yield Xp.update({
                level: data.level,
                xp: data.level,
                requiredXp: data.requiredXp,
            }, { where: { userId: id } });
            console.log(`[XP] Successfully updated ${rows} Records`);
        });
    }
    static Create(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Xp.create({
                id: id,
                level: data.level,
                xp: data.xp,
                requiredXp: data.requiredXp,
            });
            console.log(`[XP] Added Successfully`);
        });
    }
    static Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Xp.destroy({ where: { userId: id } });
        });
    }
}
exports.Exp = Exp;
class Economy {
    static Exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield Eco.findOne({ where: { userId: id } });
            if (row)
                return true;
            return false;
        });
    }
    static Fetch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.Exists(id)))
                return null;
            const row = yield Eco.findOne({ where: { userId: id } });
            return row;
        });
    }
    static Update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cash = data.cash || 0;
            const usedDaily = data.usedDaily || false;
            if (!(yield this.Exists(id)))
                yield this.Create(id, { cash: cash, usedDaily: usedDaily });
            const rows = yield Eco.update({
                cash: data.cash,
                usedDaily: data.usedDaily
            }, { where: { userId: id } });
            console.log(`[Economy] Successfully updated ${rows} Records`);
        });
    }
    static Create(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Eco.create({
                id: id,
                cash: data.cash,
                usedDaily: data.usedDaily,
            });
            console.log(`[Economy] Added Successfully`);
        });
    }
    static Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Eco.destroy({ where: { userId: id } });
        });
    }
}
exports.Economy = Economy;
