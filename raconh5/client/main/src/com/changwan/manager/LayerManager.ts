
/**
 * devil
 * create  201--
 * update devil 2017-11-16
*/
class LayerManager
{
    /**
     * 地图层
     */
    public mapLayer:egret.DisplayObjectContainer;
    /**
     * 场景底部对象层，通过addChildToNodeByType方法操作，不对外开放
     */
    private effectBottomLayer:egret.DisplayObjectContainer;
    /**
     * 场景对象阴影层
     */
    public shadowLayer:egret.DisplayObjectContainer;
    /**
     * 场景对象层，不需要排序，放在elementLayer下层
     */
    public elementLayer2:egret.DisplayObjectContainer;
    //..
    public clothesLayer:egret.DisplayObjectContainer;
    public wingLayer:egret.DisplayObjectContainer;
    public weaponLayer:egret.DisplayObjectContainer;
    /**
     * 场景对象层，需要排序，放在elementLayer2上层
     */
    public elementLayer:egret.DisplayObjectContainer;
    /**
     * 顶部技能特效层，通过addChildToNodeByType方法操作，不对外开放
     */
    private effectTopLayer:egret.DisplayObjectContainer;
    /**
     * sct对象层
     */
    public sctLayer:egret.DisplayObjectContainer;
    // /**
    //  * UI_home层
    //  */
    // public uiLayer_home:egret.DisplayObjectContainer;
    /**
     * 手机端panel遮罩Dark层
     */
    public panelDarkLayer:egret.DisplayObjectContainer;
    /**
     * UI层
     */
    public uiLayer:UILayer;
    /**
     * 界面特效层
     */
    public effectLayer:egret.DisplayObjectContainer;
    /**
     * 提示层
     */
    public tipsLayer:egret.DisplayObjectContainer;

    private _effectBottomList:any;
    private _effectTopList:any;


    public iconImageLayer:egret.DisplayObjectContainer;//图标容器
    public homeImageLayer:egret.DisplayObjectContainer;//主界面容器
    public homeLayer:egret.DisplayObjectContainer;
    public uiImageLayer:egret.DisplayObjectContainer;//UI帖图
    public sctLayer2:egret.DisplayObjectContainer;//SCT贴图
    public modalImageLayer:egret.DisplayObjectContainer;//模态帖图
    public modalLayer:egret.DisplayObjectContainer;
    public tipImageLayer:egret.DisplayObjectContainer;//tip容器
    public tipLayer:egret.DisplayObjectContainer;

    public constructor()
    {
        this.mapLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.mapLayer.touchEnabled = true;
        this.mapLayer.touchChildren = false;

        this.effectBottomLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.shadowLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.elementLayer2 = Manager.pool.create(egret.DisplayObjectContainer);
        this.clothesLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.wingLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.weaponLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.elementLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.effectTopLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.sctLayer = Manager.pool.create(egret.DisplayObjectContainer);

        this.iconImageLayer = ObjectUtil.createConainer();
        this.homeImageLayer = ObjectUtil.createConainer();
        this.homeLayer = ObjectUtil.createConainer();
        this.uiImageLayer = ObjectUtil.createConainer();
        this.sctLayer2 = ObjectUtil.createConainer();
        this.sctLayer2.touchChildren = false;
        this.modalImageLayer = ObjectUtil.createConainer();
        this.modalLayer = ObjectUtil.createConainer();
        this.tipImageLayer = ObjectUtil.createConainer();
        this.tipLayer = ObjectUtil.createConainer();

        // this.uiLayer_home = Manager.pool.create(egret.DisplayObjectContainer);
        this.panelDarkLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.uiLayer = ObjectUtil.createObj(UILayer) as UILayer;
        this.effectLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.tipsLayer = Manager.pool.create(egret.DisplayObjectContainer);

        let main:egret.DisplayObjectContainer = Manager.global.gameMain;

        main.addChildAt(this.mapLayer, LayerIndex.mapLayer);
        main.addChildAt(this.effectBottomLayer, LayerIndex.effectBottomLayer);
        main.addChildAt(this.shadowLayer, LayerIndex.shadowLayer);
        main.addChildAt(this.elementLayer2, LayerIndex.elementLayer2);
        main.addChildAt(this.clothesLayer, LayerIndex.clothesLayer);
        main.addChildAt(this.wingLayer, LayerIndex.wingLayer);
        main.addChildAt(this.weaponLayer, LayerIndex.weaponLayer);
        main.addChildAt(this.elementLayer, LayerIndex.elementLayer);
        main.addChildAt(this.effectTopLayer, LayerIndex.effectTopLayer);
        main.addChildAt(this.sctLayer, LayerIndex.sctLayer);
        // main.addChildAt(this.uiLayer_home, LayerIndex.uiLayer_home);
        main.addChildAt(this.panelDarkLayer, LayerIndex.panelDarkLayer);
        main.addChildAt(this.uiLayer, LayerIndex.uiLayer);
        main.addChildAt(this.effectLayer, LayerIndex.effectLayer);
        main.addChildAt(this.tipsLayer, LayerIndex.tipsLayer);

        main.addChildAt(this.iconImageLayer, LayerIndex.iconImageLayer);
        main.addChildAt(this.homeImageLayer, LayerIndex.homeImageLayer);
        main.addChildAt(this.homeLayer, LayerIndex.homeLayer);
        main.addChildAt(this.uiImageLayer, LayerIndex.uiImageLayer);
        main.addChildAt(this.sctLayer2,LayerIndex.sctLayer2);
        main.addChildAt(this.modalImageLayer, LayerIndex.modalImageLayer);
        main.addChildAt(this.modalLayer, LayerIndex.modalLayer);
        main.addChildAt(this.tipImageLayer, LayerIndex.tipImageLayer);
        main.addChildAt(this.tipLayer, LayerIndex.tipLayer);

        this._effectBottomList = {};
        this._effectTopList = {};
    }

    //type:1上层技能特效，2下层技能特效
	public addChildToNodeByType(view:any, filePath:string, type:number):void
    {
		var list:any;
		var layer:egret.DisplayObjectContainer;
		if(type == 1)
		{
			list = this._effectTopList;
			layer = this.effectTopLayer;
		}
		else if(type == 2)
		{
			list = this._effectBottomList;
			layer = this.effectBottomLayer;
		}
		var container:egret.DisplayObjectContainer = list[filePath];
		if(container == null)
		{
			container = Manager.pool.create(egret.DisplayObjectContainer);
			layer.addChild(container);
			list[filePath] = container;
		}
        container.addChild(view);
	}

    public moveMapPos(x:number, y:number):void
    {
        this.mapLayer.x = x;
        this.mapLayer.y = y;
        this.effectBottomLayer.x = x;
        this.effectBottomLayer.y = y;
        this.elementLayer.x = x;
        this.elementLayer.y = y;
        this.shadowLayer.x = x;
        this.shadowLayer.y = y;
        this.effectTopLayer.x = x;
        this.effectTopLayer.y = y;
        this.clothesLayer.x = x;
        this.clothesLayer.y = y;
        this.wingLayer.x = x;
        this.wingLayer.y = y;
        this.weaponLayer.x = x;
        this.weaponLayer.y = y;
        this.elementLayer2.x = x;
        this.elementLayer2.y = y;
        this.sctLayer.x = x;
        this.sctLayer.y = y;
    }

    public moveMapY(y:number):void
    {
        this.mapLayer.y = y;
        this.effectBottomLayer.y = y;
        this.elementLayer.y = y;
        this.shadowLayer.y = y;
        this.effectTopLayer.y = y;
        this.clothesLayer.y = y;
        this.wingLayer.y = y;
        this.weaponLayer.y = y;
        this.elementLayer2.y = y;
        this.sctLayer.y = y;
    }
}