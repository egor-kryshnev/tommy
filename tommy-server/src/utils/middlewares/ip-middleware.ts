import { Request, Response, NextFunction } from 'express';

export const IpMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip.split(':')[3];
    
    if (req.body.in) {
        req.body.in.z_ipaddress = ip;
    } else {
        req.body.chg.z_ipaddress = ip;
    }

    next();
};