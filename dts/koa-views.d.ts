/// <reference path="../typings/koa/koa.d.ts" />
declare module "koa-views" {
    import * as Koa from "koa";
    function viewsMiddleware(path: string, ref?:any): { (ctx: Koa.Context, next?: () => any): any };
    namespace viewsMiddleware { }
    export = viewsMiddleware;
}