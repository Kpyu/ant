import * as Koa from 'koa';
import * as uid from 'uid-safe';
export declare interface ISessinOpitons {
    key?: string;
    /**
     * default is memory store;
     * @type {Store}
     * @memberOf ISessinOpitons
     */
    store?: Store;
    /**
     * a number representing the milliseconds from Date.now() for expiry
     */
    maxAge?: number;
    /**
     * a Date object indicating the cookie's expiration
     * date (expires at the end of session by default).
     */
    expires?: Date;
    /**
     * a string indicating the path of the cookie (/ by default).
     */
    path?: string;
    /**
     * a string indicating the domain of the cookie (no default).
     */
    domain?: string;
    /**
     * a boolean indicating whether the cookie is only to be sent
     * over HTTPS (false by default for HTTP, true by default for HTTPS).
     */
    secure?: boolean;
    /**
     * a boolean indicating whether the cookie is only to be sent
     * over HTTPS (use this if you handle SSL not in your node process).
     */
    secureProxy?: boolean;
    /**
     * a boolean indicating whether the cookie is only to be sent over HTTP(S),
     * and not made available to client JavaScript (true by default).
     */
    httpOnly?: boolean;
    /**
     * a boolean indicating whether the cookie is to be signed (false by default).
     * If this is true, another cookie of the same name with the .sig suffix
     * appended will also be sent, with a 27-byte url-safe base64 SHA1 value
     * representing the hash of cookie-name=cookie-value against the first Keygrip key.
     * This signature key is used to detect tampering the next time a cookie is received.
     */
    signed?: boolean;
    /**
     * a boolean indicating whether to overwrite previously set
     * cookies of the same name (false by default). If this is true,
     * all cookies set during the same request with the same
     * name (regardless of path or domain) are filtered out of
     * the Set-Cookie header when setting this cookie.
     */
    overwrite?: boolean;
}
export class Store {
    private session: any;
    constructor() {
        this.session = {};
    }
    decode(str: string): any {
        let session = '';
        if (!str) {
            return '';
        }
        try {
            session = new Buffer(str, 'base64').toString();
        } catch (e) {
            console.error(e);
        }
        return JSON.parse(session);
    }
    encode(obj: any): any {
        return new Buffer(obj).toString('base64');
    }
    getID(length: number) {
        return uid.sync(length);
    }
    async get(sessionId: string) {
        return this.decode(this.session[sessionId]);
    }
    async set(session: any, opts: any) {
        opts = opts || {};
        let sessionId = opts.sessionId;
        if (!sessionId) {
            sessionId = this.getID(24);
        }
        this.session[sessionId] = this.encode(JSON.stringify(session));
        return sessionId;
    }
    async destroy(sessionId: string) {
        delete this.session[sessionId];
    }
}

function sessionMiddleWare(opts: ISessinOpitons) {
    opts.key = opts.key || 'koa:sess';
    opts.store = opts.store || new Store();
    return async (ctx: Koa.Context | any, next: any) => {
        let id = ctx.cookies.get(opts.key, opts);
        console.log('进入session中间件', id);
        if (!id) {
            ctx.session = {};
        } else {
            ctx.session = await opts.store.get(id);
            // check session should be a no-null object
            console.log(ctx.session);
            if (typeof ctx.session !== 'object' || ctx.session == null) {
                ctx.session = {};
            }
        }
        let old = JSON.stringify(ctx.session);
        await next();

        if (old === JSON.stringify(ctx.session)) { return; };

        // clear old session if exists
        if (id) {
            await opts.store.destroy(id);
            id = null;
        }

        // set new session
        if (ctx.session && Object.keys(ctx.session).length) {
            let sid = await opts.store.set(ctx.session, Object.assign({}, opts, { sid: id }));
            ctx.cookies.set(opts.key, sid, opts);
        }
    };
};
export default sessionMiddleWare;
