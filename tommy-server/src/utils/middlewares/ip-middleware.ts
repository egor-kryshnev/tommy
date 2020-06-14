import { Request, Response, NextFunction } from 'express';

export const IpMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip.split(':')[3];
    req.body.cr.z_ipaddress = ip;
    console.log(ip);
    next();
};