import { Application, Request, Response } from "express";
import * as passport from 'passport';
import { Strategy } from 'passport-shraga';
import { config } from '../config';


export class AuthenticationHandler {
    public static users: any[] = [];

    static initialize(app: Application) {
        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser(AuthenticationHandler.serialize);
        passport.deserializeUser(AuthenticationHandler.deserialize);

        passport.use(new Strategy(config.auth, (profile, done) => {
            done(null, profile);
        }));

        return passport.initialize();
    }

    static authenticate() {
        return passport.authenticate('shraga', {
            failureRedirect: '/failed',
            failureFlash: true
        });
    }

    private static serialize(user: { id: string }, done: (err?: Error, id?: string) => void) {
        done(undefined, user.id);
    }

    private static async deserialize(id: string, done: (err?: Error, user?: any) => void) {
        try {
            const user = AuthenticationHandler.users.filter(user => user.id === id).length > 0 ? AuthenticationHandler.users.filter(user => user.id === id)[0] : {};
            done(undefined, user);
        } catch (err) {
            done(err, null);
        }
    }
}