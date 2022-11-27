import sqlite3  from 'Sqlite3';
import Logger, { VerboseLevel } from '../log/Logger';
const c = new Logger("DBMS", "green");

export default class dbms{
    static fetchUsername(username:string, password:string){
        let db= new sqlite3.Database('./credentials.db');
        db.all(`SELECT * FROM credentials WHERE username = '${username}' AND password = '${password}'`, (err, rows) => {
            if (err) {
                c.log(`${err}`);
            }
            if (rows.length === 0) {
                c.warn("No user found");
            } else {
                c.log("User found");
            }
        });

    }

}