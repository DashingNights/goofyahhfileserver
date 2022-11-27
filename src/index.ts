import express from 'express';
import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import fs from 'fs';
import path from 'path';
import { ParsedQs } from 'qs';
import {Port} from '../config.json'
import {Filedir} from '../config.json'
import Auth  from './auth/Auth'
const server = express()
const port = Port

function sendIndexHtml(res: Response<any, Record<string, any>, number>) {
    let indexFile = 'src/html/index.html';
    fs.readFile(indexFile, (err, content) => {
        if(err){
            sendInvalidRequest(res)
        }
        res.write(content)
    })
}

function sendAuth(res: { status: (arg0: number, arg1: { "Content-Type": string; }) => void; write: (arg0: string | Buffer) => void; end: () => void; }) {
    let indexFile = 'src/html/authpage.html';
    fs.readFile(indexFile, (err, content) => {
        if (err) {
            res.status(404, {
                'Content-Type': 'text'
            });
            res.write('File Not Found!');
            res.end();
        } else {
            res.status(200, {
                'Content-Type': 'text/html'
            });
            res.write(content)
            res.end();
        }
    })
}

function sendListOfUploadedFiles(res: Response<any, Record<string, any>, number>) {
    let uploadDir = Filedir;
    fs.readdir(uploadDir, (err, files) => {Filedir
        if (err) {
            console.log(err);
            res.status(400);
            res.write(JSON.stringify(err.message));
            res.end();
        } else {
            res.status(200);
            res.write(JSON.stringify(files));
            res.end();
        }
    })
}

function sendUploadedFile(url: string, res: Response<any, Record<string, any>, number>) {
    let fileName = path.basename(url);
    let file = path.join(Filedir, fileName)
    fs.readFile(file, (err, content) => {
        if (err) {
            res.status(404);
            res.write('File Not Found!');
            res.end();
        } else {
            res.status(200);
            res.sendFile(`${String(fileName)}`, {
                root: Filedir
            })
            console.log('file sent: ' + String(file))
        }
    })
}

function saveUploadedFile(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) {
    console.log('saving uploaded file');
    let fileName = path.basename(req.url);
    let file = path.join(Filedir, fileName)
    req.pipe(fs.createWriteStream(file));
    req.on('end', () => {
        res.status(200);
        res.write('uploaded succesfully');
    })
}

function sendInvalidRequest(res: Response<any, Record<string, any>, number>) {
    res.status(400);
    res.write('Invalid Request');
    res.end();
}


server.listen(port, () => {
    console.log(`New express server listening on port ${port}`)
})
server.all('/', (req, res) => {
    sendIndexHtml(res) 
});
//list soon to be deprecated
server.all('/list', (req, res) => {
    sendListOfUploadedFiles(res)
})

server.get(/\/download\/[^\/]+$/, (req, res) => {
    sendUploadedFile(req.url, res);
})
server.all(/\/upload\/[^\/]+$/, (req, res) => {
    saveUploadedFile(req, res)
})
server.get('/css/style.css', (req, res) => {
    let indexFile = path.join('/css/style.css');
    fs.readFile(indexFile, (err, content) => {
        if (err) {
            res.status(404);
            res.write('File Not Found!');
            res.end();
        } else {
            res.status(200);
            res.write(content)
            res.end();
        }
    })
});
//deprecated
// server.get('/plsauth', (req, res, err) => {
//     var takenslash = req.url.split('/')
//             //console.log(req.url.split('/'))
//         var fin = takenslash[2]
//             //console.log(fin)
//         var lfin = fin.split('!')
//             //console.log(lfin)
//         var username = String(lfin[0])
//             //console.log(lfin[0])
//         var password = String(lfin[1])
//             //console.log(lfin[1])
//     for (var i = 0; i < 1; i++){
//         Auth.getInfo(username, password)
//         console.log(Auth.getInfoStatus)
//     }
// });


// server.get('/frfr', (req, res) => {
//     let username = req.query.usr
//     let password = req.query.pas
//     console.log(username)
//     console.log(password)
//     if(getInfo(username, password) === true ){
//         authed(res)
//     }
//     else{
        
//     }

// });
