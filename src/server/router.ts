import { Context } from 'koa';
import * as Router from 'koa-router';
import * as compose from 'koa-compose';

import { getTemplate } from './utility/helper';

const router = new Router();

const _template = getTemplate();

router
  .get('/', (ctx: Context, next: Function) => {
    ctx.body = _template;
  })
  .get('/admin', (ctx: Context, next: Function) => {
    ctx.body = _template;
  });

export default compose([
  router.routes(),
  router.allowedMethods()
]);