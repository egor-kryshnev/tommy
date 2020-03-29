import { Request, Response, NextFunction } from 'express';
import { GetComputerName } from '../../reverse-dns/reverse-dns-client';

export const ComputerNameMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    req.body.cr.z_computer_name = await GetComputerName(req.ip.split(':')[3]);
    next();
};