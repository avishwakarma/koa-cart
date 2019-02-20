/**
 * fetch
 * 
 * Using node-fetch
 * @url https://www.npmjs.com/package/node-fetch
 */
import fetch from 'node-fetch';

/**
 * sharp
 * 
 * Using sharp
 * @url https://www.npmjs.com/package/sharp
 */
import sharp from 'sharp';

/**
 * fileType
 * 
 * Using file-type
 * @url https://www.npmjs.com/package/file-type
 */
import fileType from 'file-type';

/**
 * chuk
 * 
 * Using read-chunk
 * @url https://www.npmjs.com/package/read-chunk
 */
import chunk from 'read-chunk';

/**
 * GoogleStorage
 * 
 * Using @google-cloud/storage
 * @url https://www.npmjs.com/package/@google-cloud/storage
 */
import { Storage as GoogleStorage } from '@google-cloud/storage';

/**
 * join
 *
 * join method from default node module path
 */
import { join } from 'path';

/**
 * existsSync
 * 
 * existsSync from fs module
 */
import { existsSync } from 'fs';

/**
 * config
 *
 * application config
 */
import config from '../config';

/**
 * randomHash and to
 *
 * Utility helper methods
 */
import { randomHash, to } from './helper';

class Util{
  constructor(){
    return {
      type: this.type.bind(this),
      buffer: this.buffer.bind(this)
    }
  }

  async type(file){
    const part = await chunk.sync(file.path, 0, 4000);
    return fileType(part);
  }

  async buffer(file) {
    if(typeof file === 'string' && !existsSync(file)) {
      return await fetch(file).then(res => res.buffer());
    }

    return file;
  }
}

class Disk{
  constructor(){
    this.config = config.storage.file;
    this.util = new Util();

    return {
      save: this.save.bind(this),
      delete: this.delete.bind(this)
    }
  }

  async save(file){
    const hash = randomHash();
    const buff = await this.util.buffer(file);
    const sharpFile = sharp(buff);
    //const type = await sharpFile.metadata();

    console.log(join(this.config.path, 'avatar', 'full' ,`${hash}.jpg`));

    await sharpFile.toFile(join(this.config.path, 'avatar', 'full' ,`${hash}.jpg`));
    await sharp(buff).resize(128).toFile(join(this.config.path, 'avatar', '128', `${hash}.jpg`));

    return `${hash}.jpg`;
  }

  async delete(name){

  }
}

class Google {
  constructor(){
    this.config = config.storage.google;

    this.client = new GoogleStorage({
      projectId: 'endless-orb-217120',
      keyFilename: this.config.key
    });

    this.bucket = this.client.bucket(this.config.bucket);

    this.util = new Util();

    return {
      save: this.save.bind(this),
      delete: this.delete.bind(this)
    }
  }

  async save(file){
    const hash = randomHash();
    const buff = await this.util.buffer(file);
    const sharpFile = sharp(buff);

    const streamFull = this.bucket.file(`full/${hash}.jpg`).createWriteStream();
    const stream128 = this.bucket.file(`128/${hash}.jpg`).createWriteStream();

    await sharpFile.pipe(streamFull);
    await sharp(buff).resize(128).pipe(stream128);

    return `${hash}.jpg`;

    
  }

  async delete(key){
    return await to(this.client.deleteObjectAsync({
      Bucket: this.config.bucket,
      Key: key
    }));
  }
}

export default class Storage{
  constructor(type = config.storage.default){
    const storage = (type.toLowerCase() === "google") ? Google : Disk;
    return new storage();
  }
}