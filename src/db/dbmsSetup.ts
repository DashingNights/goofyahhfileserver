import sqlite3  from 'Sqlite3';
import Logger, { VerboseLevel } from '../log/Logger';
const c = new Logger("DBMS", "green");

export default class dbmsSetup{
    static createDatabase() {
        var newdb = new sqlite3.Database('credentials.db', (err) => {
            if (err) {
                c.error("Getting error " + err);
            }
            this.createTables(newdb);
        });
    }
    
    static createTables(newdb: sqlite3.Database) {
        newdb.exec(`
        CREATE table credentials(
            username VARCHAR(255),
            password CHAR(60)
          )
            `, ()  => {
            c.log("CREDENTIALS Table created");
        });
    }
}




