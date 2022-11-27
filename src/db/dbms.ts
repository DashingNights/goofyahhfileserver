import sqlite3  from 'Sqlite3';

export default class dbms{
    static fetchUsername(username:string, password:string){
        let db= new sqlite3.Database('./credentials.db');
        db.all(`SELECT * FROM credentials WHERE username = '${username}' AND password = '${password}'`, (err, rows) => {
            if (err) {
                console.log(err);
            }
            if (rows.length === 0) {
                console.log("No user found");
            } else {
                console.log("User found");
            }
        });

    }

}