import {Router, Request, Response, NextFunction} from 'express'
const router = Router();

import { RegisterData } from './types/RegisterData';

router.get('/login', (req: Request, res: Response) => {

})

router.post('/register', (req: Request, res: Response) => {
    const requestBody: RegisterData = req.body;
    console.log("requestBody: ", requestBody);

    if(!requestBody.email || !requestBody.name || !requestBody.phone || !requestBody.stringPassword){
        return res.status(400).json({success: false, message: "invalid parameters"}).end();
    } 

    return res.json({success: true, data: requestBody}).end();

})


router.use((req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;

    if(!authorization) return res.status(401).json({msg: "unauthorized"}).end()
    console.log("authorization", authorization);
    next();
})

router.get('/', (req: Request, res: Response): Response => {
    return res.json({msg: "heheh"}).end();
})



export {router as routes}