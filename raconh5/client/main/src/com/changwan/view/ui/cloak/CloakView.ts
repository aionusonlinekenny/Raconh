/**
 * pzx 
 * 17.11.29
 * 披风
 */
class CloakView extends UIComponent{
    //穿戴，卸下
    private _putonBtn:Button;
    //激活，升星
    private _activeBtn:Button;
    //激活
    private _actImg:eui.Image;
    /**穿戴*/
    private _putonImg:eui.Image;
    private _goods:BaseGoods;
    private _attrTxt1:Label;
    private _attrTxt2:Label;
    private _attrTxt3:Label;
    private _star3:eui.Image;
    private _star1:eui.Image;
    private _star2:eui.Image;
    /**卸下*/
    private _takeoffImg:eui.Image;
    //升星
    private _upgradeImg:eui.Image;
    private _vscroll:BaseVScrollerList;
    private _nameImg:BitmapRemote;
    private _fighting:NumImgView2;

    private _model:CloakModel;
    private _cvo:CloakCVO;
    private _pifeng:Animation;
    private _numTxt:Label;
    private _diGroup:eui.Group;
    private _fightImg:eui.Image;

    private _currentIndex:number = 0;
    private _bgImg:BitmapRemote;
    private _leftBgImg:BitmapRemote;
    
	public constructor() {
		super();
        this.skinName = Manager.path.getSkinName("cloak", "CloakViewSkin");
        this.touchChildren = true;
    }

    protected configUI():void
    {
        super.configUI();
        // this._currentIndex=-1;
        this._actImg.touchEnabled = this._putonImg.touchEnabled = this._takeoffImg.touchEnabled = this._upgradeImg.touchEnabled = false;

        this._bgImg = Manager.pool.create(BitmapRemote);
        this._bgImg.x = 0;
        this._bgImg.y = 0;
        this._bgImg.load(Manager.path.getPanelUiImgPath("cloak/cloak_di3", "png"), 454, 629);
        this._diGroup.addChild(this._bgImg);

        if(!this._leftBgImg)
        {
            this._leftBgImg = Manager.pool.create(BitmapRemote);
            this._leftBgImg.x = 6;
            this._leftBgImg.y = 124;
            this.addChildAt(this._leftBgImg, 3);
            this._leftBgImg.load(PathInfo.getPath("res/common/common_pnl_back2.png", LoaderType.IMAGE), 244, 853);
        }

        this._model = Manager.model.getCloak();

        this._goods.clear();

        if(!this._fighting)
		{
			this._fighting = Manager.pool.create(NumImgView2);
            this._fighting.y = 686;
			this.addChild(this._fighting);
		}

    }

    protected initData():void
	{
        this._vscroll.initBtnListData(CloakItem, this._model.getList(), true);

        if(this._currentIndex != -1)
            Manager.render.add(this.initSelect, this, 100);
    }

    private initSelect():void
    {
        Manager.render.remove(this.initSelect, this);
        this.onSelectItemHandler();
    }
  

    protected addEvent():void
    {
        super.addEvent();
        this._vscroll.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onitemListHandler,this);
        this._activeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onActiveHandler,this);
        this._putonBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onWareHandler,this);
        this._model.addEventListener(CloakEvent.CLOAK_UPDATE_EVENT,this.updateData,this);
        this._model.addEventListener(CloakEvent.CLOAK_WARE_EVENT,this.onUpdateWareHandler,this);
    }
  
    protected removeEvent():void
    {
        super.removeEvent();
        this._vscroll.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onitemListHandler,this);
        this._activeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onActiveHandler,this);
        this._putonBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onWareHandler,this);
        this._model.removeEventListener(CloakEvent.CLOAK_UPDATE_EVENT,this.updateData,this);
        this._model.removeEventListener(CloakEvent.CLOAK_WARE_EVENT,this.onUpdateWareHandler,this);
        this._pifeng.removeEventListener(GlobalEvent.ANIMATION_LOAD_COMPLETE, this.onpifengLoadComplete, this);
    }
     private onpifengLoadComplete(e:GlobalEvent):void
    {
         this._pifeng.play();
         this._pifeng.removeEventListener(GlobalEvent.ANIMATION_LOAD_COMPLETE, this.onpifengLoadComplete, this);
    }
    //升星，激活
    private onActiveHandler():void
    {
        if(this._cvo.num >0)
        {
            //升星
            if(this._cvo.num >= 3)
            {
                FloatTips.addTips("已满星",Color.RED);
                //Manager.tips.showTips("已满星",null,false);
                return;
            }
            let starCvo:CloakStarCvoInfo = this._cvo.starArr[this._cvo.num];
            let loss:GainLossVO = new GainLossVO(starCvo.loss);
            if(loss.isEnough())
            {
                Manager.control.getCloak().upgradeStar(this._cvo.id)
            }
            else
            {
                let cvo:ItemsCVO = ItemsCVO.getCvo(loss.baseId);
                Manager.view.show(ViewID.ItemsTips, cvo);
            }

            return;
        }
        // 激活
        let less:GainLossVO = this._cvo.losse;
        if(less.isEnough())
        {
            let actList:ConditionVO[] = this._cvo.act_cond;
            let str:string="";
            for(let con of actList)
            {
                if(!con.isSatisfy)
                {
                    if(con.type == ConditionVO.REIN)
                    {
                        str = con.value+"转可激活"
                    }
                    else if(con.type == ConditionVO.VIP)
                    {
                        str = "VIP"+con.value+"可激活"
                    }
                    else if(con.type == ConditionVO.LEVEL)
                    {
                        str = con.value+"级可激活"
                    }
                    break;
                }
            }
            if(str.length>0)
            {
                Manager.tips.showTips(str,null,false);
            }
            else
            {
                Manager.control.getCloak().activate(this._cvo.id);
            }
        }
        else
        {
            let cvo:ItemsCVO = ItemsCVO.getCvo(less.baseId);
            Manager.view.show(ViewID.ItemsTips, cvo);
        }
    }
    //穿戴
    private onWareHandler():void
    {
        if(this._cvo.id == this._model.currentId)
        {
            Manager.control.getCloak().rawe(0);
        }
        else
        {
            Manager.control.getCloak().rawe(this._cvo.id);
        }
        
    }
    protected drawAll():void
    {
        super.drawAll();
        this.updateData();
    }
    private updateData():void
    {
        this._vscroll.itemList.selectedIndex = 0;
        if(this._cvo == null)
        {
            if(this._model.currentId==0)
            {
            this._cvo = this._model.getList()[0];
            }
            else
            {
                for(let info of this._model.getList())
                {
                    if(info.id == this._model.currentId)
                    {
                        this._cvo = info;
                        break;
                    }
                }
            }
        }
       if(this._cvo)
       {
         this.updateView();
         this._model.pitchId = this._cvo.id
       }
        
    }
    private onitemListHandler(e:eui.UIEvent=null):void
    {
        var index:number = this._vscroll.itemList.selectedIndex;
        if(this._currentIndex == index) return;
        this._currentIndex = index;
        this.onSelectItemHandler();
    }

    private onSelectItemHandler():void
    {
        let item:CloakItem = this._vscroll.itemList.getElementAt(this._currentIndex) as CloakItem;
        this._cvo = item.data;
        this._model.pitchId = this._cvo.id
        this._model.dispatchEvent(new CloakEvent(CloakEvent.CLOAK_TAP_EVENT,this._cvo.id));
        this.updateView();
    }

    private updateView():void
    {
        
        if(this._pifeng)
        {
            this._pifeng.unuse();
        }
        this._pifeng = Manager.animation.createPanelCloakAnimation("" + this._cvo.res_id);
        this._pifeng.addEventListener(GlobalEvent.ANIMATION_LOAD_COMPLETE, this.onpifengLoadComplete, this);
         if(!this._pifeng.parent) 
         {
            this.addChild(this._pifeng);
            let posArr:Array<string> = this._cvo.res_posetion.split(",");
            this._pifeng.x = Number(posArr[0]);
            this._pifeng.y = Number(posArr[1]);
         }
        this._nameImg.load(Manager.path.getPanelUiImgPath("cloak/cloak_label_"+this._cvo.res_id,"png"))//.source = "cloak_label_"+this._cvo.res_id+"_png"
        for(let j:number=1;j<4;j++)
        {
            this["_star"+j].visible = j<=this._cvo.num;
        }

        if(this._cvo.num == 0)
        {
            //未激活的
            this._actImg.visible = true;
            this._upgradeImg.visible = false;
            this._takeoffImg.visible = false;
            this._putonImg.visible = true;
            FilterUtil.setGrayFilter(this._putonBtn);
            FilterUtil.setGrayFilter(this._putonImg);
        }
        else 
        {
            this._putonBtn.filters = null;
            this._putonImg.filters = null;
            this._actImg.visible = false;
            this._upgradeImg.visible =true ;
            if(this._cvo.id == this._model.currentId)
            {
                this._takeoffImg.visible = true;
                this._putonImg.visible = false;
            }
            else
            {
                this._takeoffImg.visible = false;
                this._putonImg.visible = true;

            }
        }

        let attr:AttrVO = this._cvo.getattrVO();
        let attrList:Array<AttrVoInfo> = attr.attrInfos;

        let i:number = 1;
        let fightNum:number = 0;
        for(let info of attrList)
        {
            if(info)
            {
                if(this["_attrTxt"+ i])
                this["_attrTxt"+ i].text = info.desc();
                i++;
            }
        }

        this._fighting.setValue(attr.getFighting(), "nums_fighting_", 25);
        //this._fightImg.x = this. _ditImg.x + (464 - this._fightImg.width - this._fighting.width)/2;
        this._fighting.x = this._fightImg.x + this._fightImg.width;

        let index:number = this._cvo.num+1;
        if(this._cvo.num>=3)
        {
            index = 3;
        }
        let starCvo:CloakStarCvoInfo = this._cvo.starArr[index];
        let less:GainLossVO = new GainLossVO(starCvo.loss);
        this._goods.baseId = less.baseId;
        this._goods.count = 1;

        let bagCount = Manager.model.getItems().getCountItemById(less.baseId);
        let numloss:string ;
        if(less.isEnough())
        {
             numloss =  bagCount+"/"+less.num;
        }
        else{

            numloss = HtmlUtil.addColorTag("" + bagCount,"#ff0000")+"/"+less.num
        }

        this._numTxt.textFlow = new egret.HtmlTextParser().parse(numloss);


    }

    private onUpdateWareHandler():void
    {
        if(this._cvo.id == this._model.currentId)
        {
            this._putonImg.visible = false;
            this._takeoffImg.visible = true;
        }
        else
        {
             this._putonImg.visible = true;
            this._takeoffImg.visible = false;
        }
    }

    public reuse(value:number = -1):void
    {
        super.reuse();

        if(value != -1)
            this._currentIndex = value - 1;
    }

    public unuse():void
    {
        Manager.render.remove(this.initSelect, this);
        super.unuse();
    }

	public dispose():void
	{
        Manager.render.remove(this.initSelect, this);
		super.dispose();
        if(!this._loadComplete) return;
        ObjectUtil.removes(this._actImg,this._putonImg,this._star3,this._star1,this._star2,
        this._takeoffImg,this._upgradeImg, this._bgImg, this._diGroup, this._leftBgImg);
        if(this._leftBgImg)
            Manager.pool.push(this._leftBgImg);
        this._leftBgImg = null;
        if(this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        this._diGroup = null;
        this._putonBtn.dispose();
        this._activeBtn.dispose();
        this._actImg=null;
        this._putonImg=null;
        this._goods.dispose();
        this._attrTxt1.dispose();
        this._attrTxt2.dispose();
        this._attrTxt3.dispose();
        this._star3=null;
        this._star1=null;
        this. _star2=null;
        this._takeoffImg=null;
        this._upgradeImg=null;
        this._vscroll.dispose();
        if(this._fighting)
            Manager.pool.push(this._fighting);
        this._fighting=null;
        this._putonBtn=null;
        this._activeBtn=null;
        this._goods=null;
        this._attrTxt1=null;
        this._attrTxt2=null;
        this._attrTxt3=null;
        this._vscroll=null;
        this._nameImg.dispose();
        this._nameImg=null;

        this._model=null;
        this._cvo=null;
        Manager.pool.push(this._pifeng);
        this._pifeng=null;
        this._numTxt.dispose();
        this._numTxt=null;
	}
}