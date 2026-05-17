/**
 * 技能列表子项
 * liangyan
 * create 2017-11-18
*/
class SkillListItem extends ItemRenderer
{
    public grid:SkillGrid;
    private _nameTxt:Label;
    private _lvlTxt:Label;
    private _upgradeIcon:eui.Image;
    private _upgradeEff:Animation;

    private _cvo:SkillCVO;

    public static HEIGHT:number = 145;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("skill", "SkillListItemSkin");
    }

    public setData():void
    {
        this._nameTxt.text = this._cvo.name;
        this.data.info = Manager.model.getSkill().getSkillInfoByGroupID(this._cvo.groupID);
        this._lvlTxt.text = this.data.info ? ("Lv：" + this.data.info.level) : LangCVO.getContent("skill7");//未激活
        this.enabled = this.itemEnable;
        this.setRedIcon();
    }

    public setRedIcon():void
    {
        Manager.render.add(this.setRedIconCB, this, 500, 1, null, true);
    }

    private setRedIconCB():void
    {
        this._upgradeIcon.visible = this.itemEnable && (this.grid.canUpgrade || this.canActPassive);
    }

    public get cvo():SkillCVO
    {
        return this._cvo;
    }

    /**道具激活被动技能 */
    private get canActPassive():boolean
    {
        let cvos = SkillCVO.getCVOsByGroup(this._cvo.groupID);
        for(let i = 0; i < cvos.length; i++)
        {
            if(Manager.model.getSkill().getPassiveSkillStatus(cvos[i].groupID) == SkillTipsType.ACTIVE) return true;
        }
        return false;
    }

    public playEff():void
    {
        this.setData();
        this.disposeEff();
        this._upgradeEff = Manager.animation.createEffectAnimation("upActive", 0, true, true);
        if(!this._upgradeEff.parent) this.grid.addChild(this._upgradeEff);
    }

    private disposeEff():void
    {
        if(this._upgradeEff)
        {
            Manager.pool.push(this._upgradeEff);
            this._upgradeEff = null;
        }
    }

    protected createChildren():void
    {
        super.createChildren();
        this.touchChildren = false;
    }

    protected dataChanged():void
    {
        let cvo = this.data.cvo as SkillCVO;
        if(cvo == null) return;
        if(this._cvo == cvo) return;
        this._cvo = cvo;
        this.grid.cvo = cvo;
        this.setData();
    }

    public get itemEnable():boolean
    {
        return this.data && this.data.info != null;
    }

    public dispose():void
    {
        Manager.render.remove(this.playEff, this);
        Manager.render.remove(this.setRedIconCB, this);
        super.dispose();
        ObjectUtil.removes(this.grid, this._nameTxt, this._lvlTxt, this._upgradeIcon, this._upgradeEff);
        this.grid = null;
        this._nameTxt = null;
        this._lvlTxt = null;
        this._upgradeIcon.bitmapData = null;
        this._upgradeIcon = null;
        this.disposeEff();

        this._cvo = null;
    }
}