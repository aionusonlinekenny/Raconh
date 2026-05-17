/**
 * 宠物技能操作界面
 * liangyan
 * create 2017-12-16
*/
class PetSkillView extends UIComponent implements IViewManager
{
    private _baseView:BasePopUpView;
    private _grid:PetSkillGrid;
    private _nameTxt:Label;
    private _statusTxt:Label;
    private _condImg:eui.Image;
    private _descImg:eui.Image;
    private _upgradeImg:eui.Image;
    private _descTxt:Label;
    private _condTxt:Label;
    private _upgradeBtn:Button;
    private _redIcon:eui.Image;

    private _cvo:SkillCVO;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("pet", "PetSkillViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
        this.onResizeHandler(null);
        this._baseView.titleImg.source = "pet_skill_title_png";
        this._baseView.diImgVisible = false;
        this._baseView.bgHeight = 370;
    }

    protected addEvent():void
    {
        super.addEvent();
        this._upgradeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgradeHandler, this);
        this._baseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        Manager.model.getPet().addEventListener(PetEvent.UPGRADE_SKILL, this.onSkillUpdateHandler, this);
    }

    protected removeEvent():void
    {
        this._upgradeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgradeHandler, this);
        this._baseView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        Manager.model.getPet().removeEventListener(PetEvent.UPGRADE_SKILL, this.onSkillUpdateHandler, this);
        super.removeEvent();
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
    }

    private drawData():void
    {
        if(!this._cvo) return;
        this._grid.cvo = this._cvo;
        let level:number = Manager.model.getPet().getPetSkillLevel(this._cvo.groupID);
        this._nameTxt.text = this._cvo.name + " Lv." + level;
        let levelCvo:PetSkillLevelCVO = PetSkillLevelCVO.getCVO(this._cvo.groupID, (level <= 0) ? 1 : level);
        HtmlUtil.setTextFlow(this._descTxt, levelCvo.des);
        if(level <= 0)
        {
            this._statusTxt.visible = true;
            this._condImg.visible = true;
            this._upgradeImg.visible = false;
            this._upgradeBtn.visible = false;
            this._redIcon.visible = false;
            let petCvo:PetCVO = PetCVO.getCVOByNewSkillId(this._cvo.groupID);
            this._condTxt.text = LangCVO.getContent("pet12", petCvo.pinjie, petCvo.star);
        }
        else
        {
            this._statusTxt.visible = false;
            this._condImg.visible = false;
            this._upgradeImg.visible = true;
            if(level >= SkillCVO.getCVO(this._cvo.groupID).maxLevel)
            {
                this._condTxt.text = LangCVO.getContent("pet13");
                this._upgradeBtn.visible = false;
                this._redIcon.visible = false;
            }
            else
            {
                let levelCvo2:PetSkillLevelCVO = PetSkillLevelCVO.getCVO(this._cvo.groupID, level + 1);
                let bagCount:number = Manager.model.getItems().getCountItemById(levelCvo2.loss.baseId);
                let itemName:string = ItemsCVO.getCvo(levelCvo2.loss.baseId).name;
                let color:string = bagCount >= levelCvo2.loss.num ? Color.DEF_STR : Color.RED_STR;
                let msg:string = LangCVO.getContent("pet14", itemName, HtmlUtil.addColorTag("" + bagCount, color), levelCvo2.loss.num);
                HtmlUtil.setTextFlow(this._condTxt, msg);
                this._upgradeBtn.visible = true;
                this._redIcon.visible = levelCvo2.loss.isEnough();
            }
        }
    }

    private onUpgradeHandler(e:egret.TouchEvent):void
    {
        let level:number = Manager.model.getPet().getPetSkillLevel(this._cvo.groupID);
        let levelCvo:PetSkillLevelCVO = PetSkillLevelCVO.getCVO(this._cvo.groupID, level + 1);
        if(!levelCvo.loss.isEnough(true))
        {
            let itemInfo:ItemsCVO = ItemsCVO.getCvo(levelCvo.loss.baseId);
            Manager.view.show(ViewID.ItemsTips, itemInfo);
            return;
        }
        Manager.control.getPet().upgradePetSkill(this._cvo.groupID);
    }

    private onCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.PetSkillView);
    }

    private onSkillUpdateHandler(e:SkillEvent):void
    {
        if(this._cvo.groupID != Number(e.params)) return;
        this.invalidate(InvalidationType.DATA);
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    }

    public show(cvo:SkillCVO):void
    {
        if(!this.parent)
        {
            this._cvo = cvo;
            Manager.layer.tipsLayer.addChild(this);
            this.invalidate(InvalidationType.DATA);
        }
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

    public reuse():void
    {
        super.reuse();
    }

    public unuse():void
    {
        super.unuse();
        this._baseView.dispose();
        this._baseView = null;
        this._grid.dispose();
        this._grid = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._statusTxt.dispose();
        this._statusTxt = null;
        this._condImg.bitmapData = null;
        this._condImg = null;
        this._descImg.bitmapData = null;
        this._descImg = null;
        this._condTxt.dispose();
        this._condTxt = null;
        this._descTxt.dispose();
        this._descTxt = null;
        this._upgradeBtn.dispose();
        this._upgradeBtn = null;
        this._redIcon.bitmapData = null;
        this._redIcon = null;

        this._cvo = null;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._baseView, this._grid, this._nameTxt, this._statusTxt, this._condImg, this._descImg, this._condTxt, this._descTxt,
        this._upgradeBtn, this._redIcon);
        this._baseView.dispose();
        this._baseView = null;
        this._grid.dispose();
        this._grid = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._statusTxt.dispose();
        this._statusTxt = null;
        this._condImg.bitmapData = null;
        this._condImg = null;
        this._descImg.bitmapData = null;
        this._descImg = null;
        this._redIcon.bitmapData = null;
        this._redIcon = null;
        this._condTxt.dispose();
        this._condTxt = null;
        this._descTxt.dispose();
        this._descTxt = null;
        this._upgradeBtn.dispose();
        this._upgradeBtn = null;
    }
}