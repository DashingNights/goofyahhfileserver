import dbms from "../db/dbms";
import Logger from "../log/Logger";
const c = new Logger("Authentication", "red");


export default class Auth{
    public static authenticate(name: string, password: string) {
        c.log("Authenticating user " + name);
        if(dbms.checkCredentials(name, password)===true){
            c.log("User authenticated");
            return true;
        }
        else{
            c.error("User not authenticated");
            return false;
        }

      }
}




//deprecated
// export default class Auth {
//     public static getInfo(username: string, password: string) {
//         for (var i = 0; i < objPeople.length; i++) {
//             if (username == objPeople[i].username && password == objPeople[i].password) {
//                 console.log(username + " is logged in!!!")
//                 // authed(res)
//                 return {authedStatus: "true"}
//             }
//             else{
//                 console.log("incorrect username or password")
//                 return {authedStatus: "false"}
//             }
//         }
        
//     }
//     public static getInfoStatus(){
//         //get return value of getInfo
//         return this.getInfo
//     }
// }