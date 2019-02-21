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
import * as sharp from 'sharp';

/**
 * fileType
 * 
 * Using file-type
 * @url https://www.npmjs.com/package/file-type
 */
import * as fileType from 'file-type';

/**
 * chuk
 * 
 * Using read-chunk
 * @url https://www.npmjs.com/package/read-chunk
 */
import * as chunk from 'read-chunk';

/**
 * GoogleStorage
 * 
 * Using @google-cloud/storage
 * @url https://www.npmjs.com/package/@google-cloud/storage
 */
import { Storage as GoogleStorage, Bucket } from '@google-cloud/storage';

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
  /**
   * type
   * 
   * File type
   * @param file 
   */
  async type(file: any){
    const part = await chunk.sync(file.path, 0, 4000);
    return fileType(part);
  }

  /**
   * buffer
   * 
   * Convert file into file buffer
   * @param file 
   */
  async buffer(file: any) {
    if(typeof file === 'string' && !existsSync(file)) {
      return await fetch(file).then(res => res.buffer());
    }

    return file;
  }
}

class Disk{
  /**
   * _config
   * 
   * Disk config
   */
  private _config: any;

  /**
   * _util
   * 
   * File util
   */
  private _util: Util;

  constructor(){
    this._config = config.storage.DISK;
    this._util = new Util();
  }

  /**
   * save
   * 
   * Save file on the disk
   * @param file 
   * @param sizes 
   */
  async save(file: any, sizes: any){
    const hash = randomHash();
    const buff = await this._util.buffer(file);
    const sharpFile = sharp(buff);
    //const type = await sharpFile.metadata();

    console.log(join(this._config.PATH, 'avatar', 'full' ,`${hash}.jpg`));

    await sharpFile.toFile(join(this._config.path, 'avatar', 'full' ,`${hash}.jpg`));
    await sharp(buff).resize(128).toFile(join(this._config.path, 'avatar', '128', `${hash}.jpg`));

    return `${hash}.jpg`;
  }

  /**
   * delete
   * 
   * delete file from the disk
   * @param name 
   */
  async delete(name: string){

  }
}

class Google {
  /**
   * _config
   * 
   * Storage config
   */
  private _config: any;

  /**
   * _client
   * 
   * Google Storage client
   */
  private _client: GoogleStorage;

  /**
   * _bucket
   * 
   * Google Bucket
   */
  private _bucket: Bucket;

  /**
   * _util
   * 
   * File util
   */
  private _util: Util;

  constructor(){
    this._config = config.storage.GOOGLE;

    this._client = new GoogleStorage({
      projectId: this._config.PROJECT_ID,
      keyFilename: this._config.KEY_PATH
    });

    this._bucket = this._client.bucket(this._config.BUCKET);

    this._util = new Util();
  }

  /**
   * save
   * 
   * Save file on the Google Clous Storage
   * @param file 
   * @param sizes 
   */
  async save(file: any, sizes: any){

    if(!sizes) {
      throw new Error('Sizes are required.');
    }

    const hash = randomHash();
    const buff = await this._util.buffer(file);

    for(let _key of Object.keys(sizes)) {
      const _size: any = sizes[_key];

      const _sharp_buff = sharp(buff);

      if(_size.width && !_size.height) {
        _sharp_buff.resize(_size.width);
      }

      if(_size.width && _size.height) {
        _sharp_buff.resize(_size.width, _size.height);
      }

      await _sharp_buff.pipe(
        this._bucket
          .file(`${_key}/${hash}.${_size.ext || 'jpg'}`)
          .createWriteStream()
      );

    }

    return `${hash}.jpg`;

    
  }

  /**
   * delete
   * 
   * Delete file from Google Cloud storage
   * @param key 
   */
  async delete(key: string){
    return await to(
      this._client
        .bucket(this._config.BUCKET)
        .file(key)
        .delete()
    );
  }
}

export default class Storage{
  constructor(type: string = config.storage.TYPE){
    const storage = (type.toLowerCase() === "google") ? Google : Disk;
    return new storage();
  }
}