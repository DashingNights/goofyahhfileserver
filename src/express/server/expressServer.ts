import express from 'express'
import routes from '../routes/routes'
import Logger, { VerboseLevel } from '../../log/Logger';
const c = new Logger("Express", "blue");

export default class expressServer{
    public static listen(port: any){
        const server = express()
        server.listen(port, () => {
            c.log(`New express server listening on port ${port}`)
        })
    }
}