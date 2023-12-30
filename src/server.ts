
import http from 'node:http'
import {app} from './application'

const server = http.createServer(app);

export { server }