/**
 * 称号界面
 * liangyan
 * create 2017-11-28
*/
class FashionView2 extends RenderSprite
{
    private _bgImg:BitmapRes;
    private _leftBgImg:BitmapRemote;
    private _rightBgImg:BitmapRemote;
    private _nameBackImg:BitmapRes;
    private _fightBg:BitmapRes;
    private _fightImg:BitmapRes;
    private _skillBack:BitmapRes;
    private _btn0:Button;
    private _btn1:Button;
    private _btnLabel0:BitmapRes;
    private _btnLabel1:BitmapRes;
    private _name:BitmapRemote;
    private _txtAttr:TextField;
    private _txtTime:TextField;
    private _txtCost:TextField;

    private _starView:FashionStarView;
    private _fighting:NumImgView2;
    private _list:BaseAccordionList;

    private _model:FashionModel;
    private _showCVO:FashionCVO;
    private _cvo:FashionCVO;
    private _nextStarCVO:FashionStarCVO;
    private _roleModel:RoleAnimation;

    public constructor(showItemID:number)
    {
        super();
        this.touchChildren = true;
        this._showCVO = FashionCVO.getCVO(showItemID);
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        super.start();

        this._model = Manager.model.getDress().fashionModel;

        this._bgImg = BitmapRes.create("common_pnl_back1_png", 248, 292, 467, 818);
        this._bgImg.scale9Grid = new egret.Rectangle(28,28,27,16);
        this.addChild(this._bgImg);

        this._leftBgImg = Manager.pool.create(BitmapRemote);
        this._leftBgImg.x = 5;
        this._leftBgImg.y = 292;
        this.addChild(this._leftBgImg);
        this._leftBgImg.load(PathInfo.getPath("res/common/common_pnl_back2.png", LoaderType.IMAGE), 238, 817);

        this._rightBgImg = Manager.pool.create(BitmapRemote);
        this._rightBgImg.x = 248;
        this._rightBgImg.y = 292;
        this.addChild(this._rightBgImg);
        this._rightBgImg.load(PathInfo.getPath("res/common/dress_player_back.png", LoaderType.IMAGE), 467, 685);

        this._nameBackImg = BitmapRes.create("common_name_back_png", 256, 312, 80, 394);
        this.addChild(this._nameBackImg);

        this._fightBg = BitmapRes.create("common_fighting_png", 305, 906, 441, 65);
        this.addChild(this._fightBg);

        this._fightImg = BitmapRes.create("common_zhanli_png", 347, 914, 102, 57);
        this.addChild(this._fightImg);

        this._skillBack = BitmapRes.create("skill_back1_png", 565, 350, 140, 89);
        this._skillBack.scale9Grid = new egret.Rectangle(17,4,108,26);
        this.addChild(this._skillBack);

        this._btn0 = new Button();
        this._btn0.skinName = "Button1Skin";
        this._btn0.move(273, 1000);
        this._btn0.setSize(197, 90);
        this.addChild(this._btn0);

        this._btn1 = new Button();
        this._btn1.skinName = "Button2Skin";
        this._btn1.move(495, 1000);
        this._btn1.setSize(197, 90);
        this.addChild(this._btn1);

        this._btnLabel0 = BitmapRes.create("common_label_png", 281, 1019, 181, 52);
        this.addChild(this._btnLabel0);

        this._btnLabel1 = BitmapRes.create("common_active_png", 503, 1019, 181, 52);
        this.addChild(this._btnLabel1);

        this._name = Manager.pool.create(BitmapRemote);
        this._name.x = 278;
        this._name.y = 352;
        this.addChild(this._name);

        this._txtAttr = TextField.create(140, 75);
        this._txtAttr.move(560,356);
        this._txtAttr.textColor = 0x7e6c62;
        this._txtAttr.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._txtAttr.textAlign = egret.HorizontalAlign.RIGHT;
        this._txtAttr.fontFamily = "Microsoft YaHei";
        this._txtAttr.size = 22;
        this._txtAttr.lineSpacing = 6;
        this.addChild(this._txtAttr);

        this._txtTime = TextField.create(202, 29);
        this._txtTime.move(272,971);
        this._txtTime.textColor = 0x7e6c62;
        this._txtTime.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._txtTime.textAlign = egret.HorizontalAlign.CENTER;
        this._txtTime.fontFamily = "Microsoft YaHei";
        this._txtTime.size = 22;
        this._txtTime.text = "剩余：";
        this.addChild(this._txtTime);

        this._txtCost = TextField.create(212, 29);
        this._txtCost.move(479,971);
        this._txtCost.textColor = 0x7e6c62;
        this._txtCost.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._txtCost.textAlign = egret.HorizontalAlign.CENTER;
        this._txtCost.fontFamily = "Microsoft YaHei";
        this._txtCost.size = 22;
        this._txtCost.text = "消耗：";
        this.addChild(this._txtCost);
        
        this._starView = Manager.pool.create(FashionStarView, 11, 178);
        this._starView.backAlpha = 0;
        this._starView.move(394, 309);
        this.addChild(this._starView);

        this._fighting = Manager.pool.create(NumImgView2);
        this._fighting.x = this._fightImg.x + 110;
        this._fighting.y = this._fightImg.y + 5;
        this.addChild(this._fighting);

        let arr = FashionCVO.TYPE_ARR;
        let cvos:Array<FashionCVO>;
        let dataArr = [];
        for(let i = 0; i < arr.length; i++)
        {
            cvos = FashionCVO.getCvosByTypeAndCareer(arr[i], Manager.model.self.attrInfo.career);
            dataArr.push({btn:FashionListBtn2, item:FashionListItem2, datas:cvos, label:cvos});
        }
        this._list = Manager.pool.create(BaseAccordionList, dataArr, 817, 60);
        this._list.x = 5;
        this._list.y = 290;
        this._list.width = 238;
        this._list.height = 817;
        this.addChildAt(this._list, this.getChildIndex(this._leftBgImg)+1);
    }

    protected drawAll():void
    {
        super.drawAll();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
        if(this.isInvalid("drawWearing")) this.drawWearing();
        if(this.isInvalid("drawUpdate")) this.drawUpdate();
    }

    private drawData():void
    {
        if(this._cvo == null) return;
        // this._name.load(PathManager.get);
        this.showAni();
        this.drawUpdate();
        this.drawWearing();
    }

    private showAni():void
	{
        this.clearAni();
        
        let attrInfo:GameObjectAttrInfo = Manager.model.self.attrInfo;
        this._roleModel = Manager.pool.create(RoleAnimation, this._cvo.resID, attrInfo.weapon);
        this._roleModel.move(-150, 50);
        let index = this.getChildIndex(this._fightImg);
        this.addChildAt(this._roleModel, index - 1);
	}
    private clearAni():void
    {
        if(this._roleModel)
		{
			Manager.pool.push(this._roleModel);
			this._roleModel = null;
		}
    }

    private drawWearing():void
    {
        if(this._cvo == null) return;
        this._btnLabel0.source = this._cvo.isWearing ? "common_takeoff_label_png" : "common_label_png";
    }

    private drawUpdate():void
    {
        if(this._cvo == null) return;
        let curStarCVO:FashionStarCVO = this._cvo.star > 0 ? FashionStarCVO.getCVO(this._cvo.id, this._cvo.star) : null;
        this._nextStarCVO = this._cvo.star < FashionStarCVO.MAX_STAR ? FashionStarCVO.getCVO(this._cvo.id, this._cvo.star + 1) : null;

        Manager.render.remove(this.countdown, this);

        this._name.load(Manager.path.getFashionPath("name/"+this._cvo.nameID+".png"));
        this._starView.level = this._cvo.star;
        //属性
        let attrVo:AttrVO = curStarCVO ? curStarCVO.attrVo : this._nextStarCVO.attrVo;
        let infos:Array<AttrVoInfo> = attrVo.attrInfos;
        let str = "";
        for(let i:number = 0, len:number = infos.length; i < len; i++)
        {
            str += infos[i].desc();
            if(i < len) str += "\n";
        }
        HtmlUtil.setTextFlow(this._txtAttr, str);
        this._fighting.setValue(attrVo.getFighting(), "nums_fighting_", 25);//战力
        this.drawItemUpdate();

        if(!this._cvo.isActived) 
        {
            this._btnLabel1.source = "common_active_png";
            this._txtTime.text = "";
        }
        else if(this._cvo.isForever) 
        {
            this._btnLabel1.source = "common_upgrade_label_png";
            this._txtTime.text = "有效期：永久";
        }
        else if(this._cvo.leftTime <= 0)
        {
            this._btnLabel1.source = "commony_label_xs_png";
            this._txtTime.text = "有效期：已过期";
        }
        else 
        {
            this._btnLabel1.source = "commony_label_xs_png";
            Manager.render.add(this.countdown, this, 1000);
            this.countdown();
        }
    }

    private countdown():void
    {
        if(this._cvo == null) return;
        let left = this._cvo.leftTime;
        if(left > 0)
        {
            this._txtTime.text = "有效期：" + cw.DateUtil.formatStr(this._cvo.endTime, cw.DateUtil.MM_DD_HH_MM);
        }
        else Manager.render.remove(this.countdown, this);
    }

    private drawItemUpdate():void
    {
        if(this._nextStarCVO)
        {
            let isEnough:boolean = this._nextStarCVO.loss.isEnough();
            // this._redIcon.visible = isEnough;

            let str:string = "" + this._nextStarCVO.loss.selfCount;
            str = HtmlUtil.addColorTag(str, isEnough ? Color.DEF_STR : Color.RED_STR);
            str = "消耗：" + this._nextStarCVO.loss.name + "(" + str + "/" + this._nextStarCVO.loss.num + ")";
            HtmlUtil.setTextFlow(this._txtCost, str);
        }
        else 
        {
            this._txtCost.text = "";
            // this._redIcon.visible = false;
        }
    }

    protected addEvent():void
    {
        super.addEvent();
        this._btn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.addEventListener(FashionEvent.UPDATE, this.onUpdate, this);
        this._model.addEventListener(FashionEvent.WEARING, this.onWearing, this);
        this._model.addEventListener(FashionEvent.SELECTED, this.onSelected, this);
        Manager.model.addEventListener(BaseUIEvent.ACCORDION_COMPOSING_COMPLETE, this.onAccordionHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdate, this);
    }

    protected removeEvent():void
    {
        this._btn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._model.removeEventListener(FashionEvent.UPDATE, this.onUpdate, this);
        this._model.removeEventListener(FashionEvent.WEARING, this.onWearing, this);
        this._model.removeEventListener(FashionEvent.SELECTED, this.onSelected, this);
        Manager.model.removeEventListener(BaseUIEvent.ACCORDION_COMPOSING_COMPLETE, this.onAccordionHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdate, this);
        super.removeEvent();
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        switch(e.currentTarget)
        {
            case this._btn0:
                this.wearing();
                break;
            case this._btn1:
                this.activeOrUp();
                break;
        }
    }

    private wearing():void
    {
        if(!this._cvo.isActived)
        {
            FloatTips.addTips("该服饰还没激活");
            return;
        }
        Manager.control.getDress().fashionWear(this._cvo.id);
    }

    private activeOrUp():void
    {
        if(this._nextStarCVO && !this._nextStarCVO.loss.isEnough())
        {
            // FloatTips.addTips(this._nextStarCVO.loss.name + "不足");
            Manager.view.show(ViewID.ItemsTips, this._nextStarCVO.loss.item);
            return;
        }
        if(this._cvo.isActived) 
        {
            if(this._cvo.star >= FashionStarCVO.MAX_STAR)
            {
                FloatTips.addTips("已升到最高星级");
                return;
            }
            Manager.control.getDress().fashionUp(this._cvo.id);
        }
        else Manager.control.getDress().fashionActive(this._cvo.id);
    }

    private onUpdate(e:FashionEvent):void
    {
        if(this._cvo == null) return;
        if(this._cvo.id == (e.params as FashionCVO).id) this.invalidate("drawUpdate");
    }

    private onWearing(e:FashionEvent):void
    {
        this.invalidate("drawWearing");
    }

    private onSelected(e:FashionEvent):void
    {
        this.cvo = e.params as FashionCVO;
    }

    private set cvo(value:FashionCVO)
    {
        if(this._cvo == value) return;
        this._cvo = value;
        this.invalidate(InvalidationType.DATA);
    }

    private onAccordionHandler(e:BaseUIEvent):void
    {
        if(!this._showCVO)
        {
            let cvos = FashionCVO.getCvosByCareer(Manager.model.self.attrInfo.career);
            let target:FashionCVO;
            for(let i = 0; i < cvos.length; i++)
            {
                if(cvos[i].canActiveOrUp || cvos[i].isWearing)
                {
                    target = cvos[i];
                    break;
                }
            }
            if(!target) target = cvos[0];
            Manager.model.getDress().fashionModel.defaultData = target;
            this._cvo = target;
        }
        else
        {
            Manager.model.getDress().fashionModel.defaultData = this._showCVO;
            this._cvo = this._showCVO;
        }
        // this.invalidate(InvalidationType.DATA);
        this.drawData();
        this._list.setdefault(Manager.model.getDress().fashionModel.defaultData);
    }

    private onItemUpdate(e:ItemsEvent):void
    {
        if(e.params == ItemsType.BAG) this.invalidate("drawItemUpdate");
    }

    public disposeSelf():void
    {
        super.disposeSelf();
        ObjectUtil.removes(this._bgImg, this._leftBgImg, this._rightBgImg, this._nameBackImg, this._fightBg, this._fightImg, this._skillBack,
            this._btn0, this._btn1, this._btnLabel0, this._btnLabel1, this._txtAttr, this._txtTime, this._txtCost, this._starView, this._fighting, this._list);
        if(this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        if(this._leftBgImg)
            Manager.pool.push(this._leftBgImg);
        this._leftBgImg = null;
        if(this._rightBgImg)
            Manager.pool.push(this._rightBgImg);
        this._rightBgImg = null;
        if(this._nameBackImg)
            Manager.pool.push(this._nameBackImg);
        this._nameBackImg = null;
        if(this._fightBg)
            Manager.pool.push(this._fightBg);
        this._fightBg = null;
        if(this._fightImg)
            Manager.pool.push(this._fightImg);
        this._fightImg = null;
        if(this._skillBack)
            Manager.pool.push(this._skillBack);
        this._skillBack = null;
        if(this._btn0)
            this._btn0.dispose();
        this._btn0 = null;
        if(this._btn1)
            this._btn1.dispose();
        this._btn1 = null;
        if(this._btnLabel0)
            Manager.pool.push(this._btnLabel0);
        this._btnLabel0 = null;
        if(this._btnLabel1)
            Manager.pool.push(this._btnLabel1);
        this._btnLabel1 = null;
        if(this._name)
            Manager.pool.push(this._name);
        this._name = null;
        if(this._txtAttr)
            Manager.pool.push(this._txtAttr);
        this._txtAttr = null;
        if(this._txtTime)
            Manager.pool.push(this._txtTime);
        this._txtTime = null;
        if(this._txtCost)
            Manager.pool.push(this._txtCost);
        this._txtCost = null;
        if(this._starView)
            Manager.pool.push(this._starView);
        this._starView = null;
        if(this._fighting)
            Manager.pool.push(this._fighting);
        this._fighting = null;
        if(this._list)
            this._list.dispose();
        this._list = null;
        this._model = null;
        this._showCVO = null;
        this._cvo = null;
        this._nextStarCVO = null;
        if(this._roleModel)
            Manager.pool.push(this._roleModel);
        this._roleModel = null;
    }
}