var AssetAdapter = /** @class */ (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    // public getAsset(source: string, compFunc:Function, thisObject: any): void {
    //     // if(source.indexOf("login_btnStart_png") == -1 && source.indexOf("createRole_btn_png") == -1)return;
    //     // Trace.trace("source",source)
    //     function onGetRes(data: any): void {
    //         compFunc.call(thisObject, data, source);
    //     }
    //     if (RES.hasRes(source)) {
    //         let data = RES.getRes(source);
    //         if (data) {
    //             onGetRes(data);
    //         }
    //         else {
    //             RES.getResAsync(source, onGetRes, this);
    //             // let config:RES.ResourceConfig = <RES.ResourceConfig>(RES["configInstance"]);
    //             // let key:string = config.getRawResourceItem(source).url;
    //             // let path:PathInfo = PathInfo.getPath(key,LoaderType.IMAGE)
    //             // Manager.loader.load(path,compFunc,thisObject,ResourceGCType.NEVER);
    //         }
    //     }
    //     else 
    //     {
    //         RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
    //     }
    // }
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        // if(source.indexOf("login_btnStart_png") == -1 && source.indexOf("createRole_btn_png") == -1)return;
        // Trace.trace("source",source)
        Manager.loader.loadTexture(source, compFunc, thisObject);
    };
    return AssetAdapter;
}());
//# sourceMappingURL=AssetAdapter.js.map