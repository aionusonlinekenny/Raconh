/**
 * 场景特效对象视图类
 * liangyan
 * create 2017-12-29
*/
class SceneEffGameObject extends GameObject
{
     private _sceneEffInfo:SceneEffGameObjectInfo;
     private _elementShow:ElementNoAliveAnimation;
    // private _temp:egret.Shape;

     public constructor()
     {
        super();
     }

    public start():void
    {
        super.start();
        this._elementShow = Manager.pool.create(ElementNoAliveAnimation, this);

        // this._temp = Manager.pool.create(egret.Shape);
        // this._temp.graphics.beginFill(0xff0000, 0.5);
        // this._temp.graphics.drawCircle(0,0,50);
        // this._temp.graphics.endFill();
        // this.addChild(this._temp);
    }

    public reuse(info:GameObjectInfo):void
	{
        this._sceneEffInfo = info as SceneEffGameObjectInfo;
        super.reuse(info);
    }

    public unuse():void
    {
        super.unuse();
        Manager.pool.push(this._elementShow);
        this._elementShow = null;
        // this.removeChild(this._temp);
        // this._temp = null;
        this._sceneEffInfo.isInMapFlag = false;
        this._sceneEffInfo = null;
    }

    protected drawAll():void
    {
        super.drawAll();
        this._elementShow.drawSceneStageEffect();
    }

    public playShow():void
    {
        this._elementShow.play();
    }

    protected disposeSelf():void
    {
        Manager.pool.push(this._elementShow);
        this._elementShow = null;
        super.disposeSelf();
        // this.removeChild(this._temp);
        // this._temp = null;
        this._sceneEffInfo.isInMapFlag = false;
        this._sceneEffInfo = null;
    }
}