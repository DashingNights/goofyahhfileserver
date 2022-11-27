import sqlite3  from 'Sqlite3';
import dbms from "./dbmsSetup";
import Logger, { VerboseLevel } from '../log/Logger';
const c = new Logger("DBMS", "green");

let db= new sqlite3.Database('./credentials.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err && err.name === "SQLITE_CANTOPEN") {
        dbms.createDatabase();
        return;
        } else if (err) {
            c.error("Getting error " + err);
    }
    
});
