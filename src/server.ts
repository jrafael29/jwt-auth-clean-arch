
import http from 'node:http'
import {app} from './application'

export const server = http.createServer(app);

