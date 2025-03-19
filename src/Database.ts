import * as sqlite3 from "sqlite3";
const db = new sqlite3.Database("db");

export function GetDB() {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS xp_data (user_id VARCHAR(255), level INT, xp INT, required_xp INT)");
        db.run("CREATE TABLE IF NOT EXISTS reports (author_id VARCHAR(255), ticket_id VARCHAR(255))");
    });

    return db;
}