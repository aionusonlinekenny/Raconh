/**
 *author Anydo
 *create 2018-3-1
 *description 
*/
class AnimationData
{
    private _frameJsons:AnimationJsonData[];
    private _sourceBitData:egret.BitmapData;

    private _frames:Object;
    public totalFrames:number;//动画总帧数

    public constructor()
    {
    }

    public reuse(jsonData:any, bitData:egret.BitmapData):void
	{
        this._frameJsons = [];
        this._frames = {};
        this._sourceBitData = bitData;

        this.parseJson(jsonData);
	}

	public unuse():void
	{
        for(let i:number = 0; i < this._frameJsons.length; i++)
        {
            Manager.pool.push(this._frameJsons[i]);
        }
        this._frameJsons = null;
        for(let frame in this._frames)
        {
            Manager.pool.push(this._frames[frame]);
            delete this._frames[frame];
        }
        this._frames = null;
        this.totalFrames = 0;
        if(this._sourceBitData) this._sourceBitData = null;
	}

    private parseJson(jsonData:any):void
    {
        let key:string;
        for(key in jsonData.mc) break;
        let offsetArr:any[] = jsonData.mc[key].frames;
        this.totalFrames = offsetArr.length;
        let frameName:string;
        let offX:number;
        let offY:number;
        let rectObj:any;
        let oneJson:AnimationJsonData;
        for(let i:number = 0; i < offsetArr.length; i++)
        {
            frameName = offsetArr[i].res;
            offX = offsetArr[i].x;
            offY = offsetArr[i].y;
            rectObj = jsonData.res[frameName];
            oneJson = Manager.pool.create(AnimationJsonData, frameName, offX, offY, jsonData.res[frameName]);
            this._frameJsons.push(oneJson);
        }
    }

    public getKeyFrameData(frame:number):AnimationFrameData
    {
        if(this._frames[frame] == null)
        {
            this.createFrameData(frame);
        }
        return this._frames[frame];
    }

    private createFrameData(frame:number):void
    {
        let frameJson:AnimationJsonData = this._frameJsons[frame - 1];
        let rectObj:any = frameJson.rectObj;
        let texture:egret.Texture = Manager.pool.create(egret.Texture);
        texture._bitmapData = this._sourceBitData;
        texture.$initData(rectObj.x, rectObj.y, rectObj.w, rectObj.h, 0, 0, rectObj.w, rectObj.h, this._sourceBitData.width, this._sourceBitData.height);
        let frameData:AnimationFrameData = Manager.pool.create(AnimationFrameData, frameJson.offX, frameJson.offY, texture);
        this._frames[frame] = frameData;
    }

    public dispose():void
    {
        for(let frame in this._frames)
        {
            Manager.pool.push(this._frames[frame]);
            delete this._frames[frame];
        }
        this._frames = null;
        if(this._sourceBitData) this._sourceBitData = null;
    }
}