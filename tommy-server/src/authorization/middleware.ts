import { Request, Response, NextFunction } from 'express';
import { NotPermittedError } from "../utils/errors/user";

export class AuthorizationMiddleware {
    static postAuthorization(req: Request, res: Response, next: NextFunction) {
        const user: any = req.user;

        try {
            if (user.adfsId.split('@')[0] === req.body.cr.z_username) {
                next();
            } else {
                throw new NotPermittedError;
            }
        } catch (err) {
            throw new NotPermittedError;
        }
    }
}