/**
 * 路径信息类，相关的参数key是相对路径，并且不是版本号,尽量不提供key接口，防止错误引用
 * devil
 * create  2017-11-10
 * update
*/
 class PathInfo
 {
     private static _dic = {};
     private _key:string;
     /**
      * URL地址，绝对路径，并且带有版本号
      */
     public url:string;
     /**
      * URL地址，绝对路径，并且带有版本号
      */
     public url2:string;
     /**
      * 文件大小 
      */
    //  public size:number;
     /**
      * 内存大小 
      */
    //  public memory:number;

     public loaderType:number;

    /**
     * @param key   相对路径并且不带版本号的地址 
     * @param version	地图图片采用客户端编辑日期版本号记录，只有加载地图图片时才会生效，其它的情况下都会传入默认值
     */	
     public static getPath(key:string,loaderType?:number):PathInfo
     {
         let path:PathInfo = PathInfo._dic[key];
        if(path == null) 
        {
            path = new PathInfo(key);
            egret.log("不存在资源路径:",key,loaderType);
        }
         path.setLoaderType(loaderType);
         return path;
     }
    /**
     * @param key			相对路径地址
     * @param version
     * @param size
     */		
     public constructor(key:string,version?:any)
     {
            this._key = key;
            if(version)
                this.url = Manager.config.rootToURL(key) + "?v=" + version;
            else
                this.url = Manager.config.rootToURL(key) + "?v=" + Manager.config.clientVersion;
			// this.size = size;
			// this.memory = memory;
            PathInfo._dic[key] = this;
     }

     public setLoaderType(loaderType:number):void
     {
        this.loaderType = loaderType;
        if(loaderType == LoaderType.ANI)
        {
            let tempKey:string = this._key.split(".json").join(".png");//.json变为.png
            let path2:PathInfo = PathInfo.getPath(tempKey);
            this.url2 = path2.url//Manager.config.rootToURL(tempKey) + "?v=" + version;
        }
        else if(loaderType == LoaderType.MAP_DATA)
        {
            let tempKey:string = this._key.split("path.txt").join("smallMap.jpg");//path.txt变为smallMap.jpg
            let path2:PathInfo = PathInfo.getPath(tempKey);
            this.url2 = path2.url;//Manager.config.rootToURL(tempKey) + "?v=" + version;
        }
     }
 }