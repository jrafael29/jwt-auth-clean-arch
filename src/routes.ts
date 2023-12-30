import {Router, Request, Response, NextFunction} from 'express'
const router = Router();



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