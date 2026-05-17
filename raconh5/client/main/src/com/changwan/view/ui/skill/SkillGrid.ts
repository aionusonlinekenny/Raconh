/**
 * 技能格子
 * liangyan
 * create 2017-11-18
*/
class SkillGrid extends UIComponent
{
    private _back:eui.Image;
    private _img:BitmapRemote;

    private _cvo:SkillCVO;
    private _info:SkillInfo;
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("skill", "SkillGridSkin");
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getSkill().addEventListener(SkillEvent.SKILL_UPDATE, this.onSkillUpdateHandler, this);
        Manager.model.getSkill().addEventListener(SkillEvent.SKILL_SINGLE_UPDATE, this.onSkillUpdateHandler, this);
    }

    protected removeEvent():void
    {
        Manager.model.getSkill().removeEventListener(SkillEvent.SKILL_UPDATE, this.onSkillUpdateHandler, this);
        Manager.model.getSkill().removeEventListener(SkillEvent.SKILL_SINGLE_UPDATE, this.onSkillUpdateHandler, this);
        super.removeEvent();
    }

    private setData():void
    {
        if(!this._cvo) return;
        this._info = Manager.model.getSkill().getSkillInfoByGroupID(this._cvo.groupID);
        this._back.source = this._info ? "common_itemBg_png" : "common_itemBg_lock_png";
        if(this._info) this._img.load(Manager.path.getSkillIconPath(this._cvo.icon));
    }

    private onSkillUpdateHandler(e:SkillEvent):void
    {
        if(e.type == SkillEvent.SKILL_UPDATE || (e.type == SkillEvent.SKILL_SINGLE_UPDATE && this._cvo && this._cvo.groupID == e.params))
        {
            this.setData();
        }
    }
    
    public set cvo(value:SkillCVO)
    {
        if(this._cvo == value) return;
        this._cvo = value;
        this.setData();
    }

    public get cvo():SkillCVO
    {
        return this._cvo;
    }

    public get canUpgrade():boolean
    {
        if(!this._cvo || !this._info) return false;
        this._info = Manager.model.getSkill().getSkillInfoByGroupID(this._cvo.groupID);
        if(this._info.level >= Manager.model.self.attrInfo.level || this._info.isMaxLevel()) return false;
        let loss = this._info.getSkillFormulaCvo(SkillFormulaType.LOSS).getFormulaResult(this._info.level);
        if(Manager.model.self.attrInfo.coin >= loss) return true;
        return false;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._back, this._img);
        this._back = null;
        if(this._img) Manager.pool.push(this._img);
        this._img = null;

        this._cvo = null;
        this._info = null;
    }
}