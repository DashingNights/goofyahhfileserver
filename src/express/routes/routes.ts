const expressServer = '../server/server'
import express from 'express'
const server = express()
export default class routes{
    public static rootPath(){
        server.all('/', (req, res) => {
            
        })
        
    }
    
}