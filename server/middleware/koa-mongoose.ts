import * as Koa from 'koa';
import * as glob from 'glob';
import * as fs from 'fs';
var config = require('../config').default;
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
async function MongooseMiddleware(ctx: Koa.Context | any, next: any) {
    let files = glob.sync(config.mongooseConfig.schemas + '/**/*.js');
    const schemas = config.mongooseConfig.schemas + ((config.mongooseConfig.schemas.lastIndexOf('/') === config.mongooseConfig.schemas.length - 1) ? '' : '/');
    ctx.models = {};
    files.map(file => {
        let modelName = file
            .replace(schemas, '')
            .replace(/\.js$/g, '')
            .replace(/\//g, '.')
            .toLowerCase()
        ctx.models[modelName] = require(file).default;
    });

    ctx.model = (modelName:string) => {
        try {
            let modelU = ctx.models[modelName];
            return modelU;
        } catch (err) {
            console.log(err)
            ctx.throw(400, err.message);
        }
    };
    await next();
}
export default MongooseMiddleware;