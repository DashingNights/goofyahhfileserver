import express from 'express';
import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import fs from 'fs';
import path from 'path';
import { ParsedQs } from 'qs';
import {Port} from '../config.json'
import {Filedir} from '../config.json'
import dbms from './db/dbms';
var session = require('express-session');

import Logger, { VerboseLevel } from './log/Logger';
const c = new Logger("MAIN", "cyan");

import Auth  from './auth/Auth'
const server = express()
const port = Port
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '/views/pages'));

//unused, broken
// server.use(express.urlencoded({ extended: false }))
// server.use(session({
//   resave: false, 
//   saveUninitialized: false, 
//   secret: '1234567890'
// }));

// server.use(function(req, res, next){
//   var err = req.session.error;
//   var msg = req.session.success;
//   delete req.session.error;
//   delete req.session.success;
//   next();
// });


function sendIndexHtml(res: Response<any, Record<string, any>, number>) {
    let indexFile = 'src/html/index.html';
    fs.readFile(indexFile, (err, content) => {
        if(err){
            sendInvalidRequest(res)
        }
        res.write(content)
    })
}

function sendAuth(res: Response<any, Record<string, any>, number>) {
    res.render('auth')
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
    c.warn('Invalid Request')
}
function restrict(req: { body: { username: string; password: string; }; session: { error: string; }; }, res: { redirect: (arg0: string) => void; }, next: () => void) {
    if (Auth.authenticate(req.body.username, req.body.password)==true) {
      next();
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/login');
    }
  }

server.listen(port, () => {
    c.log(`New express server listening on port ${port}`)
})
server.all('/', (req, res) => {
    res.redirect('/login');
});
//broken
// server.all('/login', (req, res) =>{
//     sendAuth(res);
//     c.log('Initial page sent')
//     if(Auth.authenticate(req.body.username, req.body.password)==true){
//         req.session.regenerate(function(){
//             res.redirect('back');
//         });
//           c.log('A user logged in')
//     }else{
//         req.session.error = 'Authentication failed, please check your username and password.';
//         res.redirect('/login');
//         c.warn('A user failed to log in')
//     }
// })
//list soon to be deprecated
server.all('/list', (req, res) => {
    sendListOfUploadedFiles(res)
    c.log('List of files sent')
})

server.get(/\/download\/[^\/]+$/, (req, res) => {
    sendUploadedFile(req.url, res);
    c.log('File sent')
})
server.all(/\/upload\/[^\/]+$/, (req, res) => {
    saveUploadedFile(req, res)
    c.log('File uploaded')
})
server.get('/css/style.css', (req, res) => {
    let indexFile = path.join(__dirname, '/css/style.css');
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
// server.all('/plsauth', (req, res, err) => {
//     if(Auth.authenticate(req.body.username, req.body.password)==true){
//         req.session.regenerate(function(){
//             res.redirect('back');
//         });
//           c.log('A user logged in')
//     }else{
//         req.session.error = 'Authentication failed, please check your username and password.';
//         res.redirect('/login');
//         c.warn('A user failed to log in')
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

dbms.initializeDatabase();

