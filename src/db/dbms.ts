import sqlite3  from 'Sqlite3';
import dbmsSetup from "./dbmsSetup";
import Logger, { VerboseLevel } from '../log/Logger';
const c = new Logger("DBMS", "green");

export default class dbms{
    public static initializeDatabase(){
        dbmsSetup.createDatabase();
    }
    public static checkCredentials(username:string, password:string){
        let db= new sqlite3.Database('./credentials.db');
        db.all(`SELECT * FROM credentials WHERE username = '${username}' AND password = '${password}'`, (err, rows) => {
            if (err) {
                c.log(`${err}`);
            }
            if (rows.length === 0) {
                c.warn("User not found");
                return false;
            } else {
                c.log("User found");
                return true;
            }
        });
        return false;
    }

}