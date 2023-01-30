export interface IRequestFile {
    name: string;
    data: Buffer;
    size: bigint;
    encoding: string;
    tempFilePath: string;
    truncated: boolean;
    mimetype: string;
    md5: string;
    mv: Function;
  }
  
  export interface ICreateFile {
    name: string;
    src: string;
    size: string;
    ext: string;
    mimetype: string;
  }