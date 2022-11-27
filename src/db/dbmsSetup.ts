import sqlite3  from 'Sqlite3';

export default class dbmsSetup{
    static createDatabase() {
        var newdb = new sqlite3.Database('credentials.db', (err) => {
            if (err) {
                console.log("Getting error " + err);
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
            console.log("CREDENTIALS Table created");
        });
    }
}




