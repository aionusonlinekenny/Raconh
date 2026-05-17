/**
 * 技能刻印格子
 * liangyan
 * create 2017-11-18
*/
class SkillMarkGrid extends UIComponent
{
    private _lockBack:eui.Image;
    private _normalBack:eui.Image;
    private _addIcon:eui.Image;
    private _nameTxt:Label;
    private _bubble:BubbleView;
    private _skillIcon:BitmapRemote;
    private _actEff:Animation;

    private _cvo:SkillCVO;
    private _status:number;

    public constructor()
    {
        super();
        this.touchEnabled = true;
        this.touchChildren = false;
        this.skinName = Manager.path.getSkinName("skill", "SkillMarkSkin");
    }

    protected configUI():void
    {
        super.configUI();
    }

    protected addEvent():void
    {
        super.addEvent();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getSkill().addEventListener(SkillEvent.SKILL_SINGLE_UPDATE, this.onSkillupdateHandler, this);
    }

    protected removeEvent():void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getSkill().removeEventListener(SkillEvent.SKILL_SINGLE_UPDATE, this.onSkillupdateHandler, this);
        super.removeEvent();
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        if(!this._cvo) return;
        Manager.pool.create(SkillTips, this._status, this._cvo);
    }

    private onSkillupdateHandler(e:SkillEvent):void
    {
        if(this._cvo && this._cvo.groupID == e.params)
        {
            this.disposeEff();
            this._actEff = Manager.animation.createEffectAnimation("actPassive", 0, true, true);
            if(!this._actEff.parent) this.addChild(this._actEff);
        }
    }

    private disposeEff():void
    {
        if(this._actEff)
        {
            Manager.pool.push(this._actEff);
            this._actEff = null;
        }
    }

    private setStatus():void
    {
        this._lockBack.visible = this._normalBack.visible = this._skillIcon.visible = this._addIcon.visible = false;
        this._bubble.update(0);
        switch(this._status)
        {
            case SkillTipsType.AWAKE:
                this._lockBack.visible = true;
            break;
            case SkillTipsType.ACTIVE:
                this._normalBack.visible = this._addIcon.visible = true;
                this._bubble.update(1, true, false);
            break;
            case SkillTipsType.GO_SHOP:
                this._normalBack.visible = this._addIcon.visible = true;
            break;
            case SkillTipsType.HAS_ACT:
                this._normalBack.visible = this._skillIcon.visible = true;
            break;
            default:
            break;
        }
    }

    public set cvo(value:SkillCVO)
    {
        this._cvo = value;
        if(!this._cvo) return;
        this._skillIcon.load(Manager.path.getSkillIconPath(this._cvo.icon));
        this._nameTxt.text = this._cvo.name;
        this._status = Manager.model.getSkill().getPassiveSkillStatus(this._cvo.groupID);
        this.setStatus();
    }

    public get cvo():SkillCVO
    {
        return this._cvo;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._lockBack, this._normalBack, this._addIcon, this._skillIcon, this._nameTxt, this._actEff);
        this._lockBack = null;
        this._normalBack = null;
        if(this._skillIcon) Manager.pool.push(this._skillIcon);
        this._skillIcon = null;
        this._addIcon = null;
        this._nameTxt = null;
        this.disposeEff();

        this._cvo = null;
    }
}