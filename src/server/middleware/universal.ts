/**
 * universal
 *
 * middleware for angular server side rendering
 */

/**
 * Context
 * 
 * Koa context type
 */
import { Context } from 'koa';

import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

/**
 * getRootPath
 * 
 * Utility method to access root path
 */
import { getTemplate } from '../utility/helper';

/**
 * logger
 * 
 * application logger utility
 */
import logger from '../utility/logger';

/**
 * config
 * 
 * Global app config
 */
import config from '../config';

if(config.app.ENV !== 'development') {
  enableProdMode();
}

const _template = getTemplate();

export default async (ctx: Context, next: Function) => {
  /**
   * Static files are handled by koa-static
   */
  if(ctx.req.url.match(/.js|.css|.woff|.eot|.woff2|.ttf|.svg|.png|.jpg|.jpeg|.gif|.ico/i)) {
    return;
  }

  /**
   * no server side rendering for /admin URLs
   */
  if(ctx.req.url.indexOf('/admin') === 0) {
    return ctx.body = _template;
  }

  const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../../../build/main');

  try {
    const _html = await renderModuleFactory(AppServerModuleNgFactory, {
      document: _template,
      url: ctx.req.url,
      extraProviders: [
        provideModuleMap(LAZY_MODULE_MAP)
      ]
    });

    ctx.body = _html
  } catch (error) {
    logger.error(error);
  }
};