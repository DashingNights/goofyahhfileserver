import express from 'express';
import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import fs from 'fs';
import path from 'path';
import { ParsedQs } from 'qs';
import {Port} from '../config.json'
import {Filedir} from '../config.json'
import dbms from './db/dbms';
var session = require('express-session');
import expressServer from './express/server/expressServer';
import routes from './express/routes/routes';
import Logger, { VerboseLevel } from './log/Logger';
const c = new Logger("MAIN", "cyan");

import Auth  from './auth/Auth'
const server = express()
const port = Port
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '/views/pages'));

dbms.initializeDatabase();
expressServer.listen(port);
routes.rootPath();