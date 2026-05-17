/**
 * 命格背包
 * pzx
 * 2017.12.26
 */
class LifeGridBagView extends PopUpView{
    private _scroller:BaseVScrollerList;
    private _gainBtn:Button;
    private _numTxt:Label;
    /** 穿上的位置 */
    private _pos:number=0;
    private _model:LifeGridModel;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridBagViewSkin");
    }
    protected configUI():void
    {
        super.configUI();
        this._popupView.titleImg.source = "lifeGrid_minggebeibao_png";
        this._popupView.viewY = 150;
        this._popupView.bgHeight = 900;
        this._model = Manager.model.getLifeGrid();
    }

    protected addEvent():void
    {
         this._scroller.itemList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
         this._gainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclickHandler,this);
         this._model.addEventListener(LifeGridEvent.LIFEGRID_WARE_EVENT,this.onTouchCloseHandler,this);
        super.addEvent();
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._scroller.itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._gainBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclickHandler,this);
        this._model.removeEventListener(LifeGridEvent.LIFEGRID_WARE_EVENT,this.onTouchCloseHandler,this);
    }
   
    private onclickHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.LifeGridBagView);
        if(LifeGridView.view) LifeGridView.view.setTap(LifeGridType.HUNT);
    }
    private onShortcutHandler(e:egret.TouchEvent):void
    {
        let target = e.target;
        if(target instanceof BaseGoods)
        {
            return;
        }
        let index = this._scroller.itemList.selectedIndex;
        if(index < 0) return;
        let item :LifeGridBagItem = this._scroller.itemList.getElementAt(index) as LifeGridBagItem;
        let cvo:LifeGridCVO = item.cvo;
        let itemCvo:ItemsCVO = ItemsCVO.getCvo(cvo.base_id);
        let atvoArr:AttrVoInfo[] = cvo.attrVos();
        let arr:Array<ItemsModelInfo> = Manager.model.getItems().lifeGridList;
        for(let i:number= 1;i<arr.length;i++)
        {
            if(arr[i])
            {
                let attrItemsinfo:ExattrItemsinfo = arr[i].infoList[0];
                let bagItemCvo:ItemsCVO = arr[i].cvo;
                let lifeCvo:LifeGridCVO = LifeGridCVO.getInfo(bagItemCvo.id,attrItemsinfo.value);
                let attArr:AttrVoInfo[] = lifeCvo.attrVos();
                let n:number = this.getqeual(atvoArr,attArr);
                if(n!= 0)
                {
                    if(attArr.length == atvoArr.length)
                    {
                        if(atvoArr.length == 1)
                        {
                            if(bagItemCvo.color<itemCvo.color)
                            {
                                let view:LifeGridFuseView = Manager.view.show(ViewID.LifeGridFuseView);
                                view.setData(lifeCvo,cvo,i,cvo.itemid);
                            }
                            else
                            {
                                FloatTips.addTips(LangCVO.getContent("lifeGrid3"),0xff0000);
                            }
                        }
                        else if(atvoArr.length==2)
                        {
                            if(n == 1)
                            {
                                FloatTips.addTips(LangCVO.getContent("lifeGrid2"),0xff0000);
                            }
                            else 
                            {
                                if(bagItemCvo.color<itemCvo.color)
                                {
                                    let view:LifeGridFuseView = Manager.view.show(ViewID.LifeGridFuseView);
                                    view.setData(lifeCvo,cvo,i,cvo.itemid);
                                }
                            }
                        }
                    }
                    else
                    {
                        FloatTips.addTips(LangCVO.getContent("lifeGrid2"),0xff0000);
                    }
                    return;
                }
            }
        }
        if(this._pos>0)
        Manager.control.getLifeGrid().ware(cvo.itemid,this._pos);
    }
/** 返回i个相同，0表示无相同 */
    private getqeual(value1:AttrVoInfo[],value2:AttrVoInfo[]):number
    {
        let i:number = 0;
        for(let j:number=0;j<value2.length;j++)
        {
            if(value1[0])
            {
                if(value1[0].id == value2[j].id)
                {
                    i++
                }
            }
            if(value1[1])
            {
                if(value1[0].id == value2[j].id)
                {
                    i++
                }
            }
        }
        return i;
    }
	protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.LifeGridBagView);
    }
    protected initData():void
    {
        super.initData();
    }

    protected drawAll():void
	{
		super.drawAll();
        this.darwData();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.darwData();
	}

    public setData(data):void
    {
        this.invalidate(InvalidationType.DATA);
    }
    
    private darwData():void{
        let infos:Array<ItemsModelInfo> = Manager.model.getItems().lifeGridBagList;
        let cvos:LifeGridCVO[]=[];
        for(let info of infos)
        {
            let itemcvo:ItemsCVO = info.cvo;
            if(itemcvo.type == ItemsType.TYPE_LIFEGRID_SPAR)
            {
                continue;
            }
            let cvo:LifeGridCVO = LifeGridCVO.getDataInfo(info);
            let boo:boolean;
            for( let obj of cvos)
            {
                if(obj.base_id == cvo.base_id && obj.lev == cvo.lev)
                {
                    boo = true;
                    break;
                }
            }
            if(boo) continue;
            cvos.push(cvo);
        }
        cvos = ArrayUtil.sortOn(cvos,["color","fightnum"],[1,1]);

        this._scroller.initBtnListData(LifeGridBagItem, cvos, true);
        this._scroller.itemList.selectedIndex = -1;
        this._numTxt.text = LangCVO.getContent("lifeGrid1")+infos.length+"/"+Manager.model.getItems().lifeGridTotal;
    }
    
    public show(value:number):void
    {
        this._pos = value;
        super.show();
    }

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
       
    }

    public dispose():void
    {
        super.dispose();
        this._pos = 0;
        this._scroller.dispose();
        this._scroller=null;
        this._gainBtn.dispose();
        this._gainBtn=null;
        this._numTxt.dispose();
        this._numTxt=null;
        this._model=null;
        
    }
}