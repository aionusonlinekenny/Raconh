/**
 *author Anydo
 *create 2018-1-31
 *description 
*/
class PetSkillGrid extends UIComponent
{
    private _txtLevel:Label;
    private _img:BitmapRemote;

    private _cvo:SkillCVO;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("pet", "PetSkillGridSkin");
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getPet().addEventListener(PetEvent.UPGRADE_SKILL, this.onSkillUpdateHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        Manager.model.getPet().removeEventListener(PetEvent.UPGRADE_SKILL, this.onSkillUpdateHandler, this);
    }

    private onSkillUpdateHandler(e:SkillEvent):void
    {
        if(this._cvo.groupID != Number(e.params)) return;
        this.updateLevel();
    }
    
    public set cvo(value:SkillCVO)
    {
        if(this._cvo == value) return;
        this._cvo = value;
        this._img.load(Manager.path.getSkillIconPath(this._cvo.icon));
        this.updateLevel();
    }

    public get cvo():SkillCVO{ return this._cvo; }

    private updateLevel():void
    {
        if(!this._cvo) return;
        let level:number = Manager.model.getPet().getPetSkillLevel(this._cvo.groupID);
        if(level > 0)
        {
            this._img.filters = null;
            this._txtLevel.text = "Lv." + level;
        }
        else
        {
            FilterUtil.setGrayFilter(this._img);
            let cvo = PetCVO.getCVOByNewSkillId(this._cvo.groupID);
            if(cvo != null) HtmlUtil.setTextFlow(this._txtLevel, LangCVO.getContent("pet15", Color.GREEN_STR_2, cvo.pinjie));
        }
    }

    // public get canUpgrade():boolean
    // {
    //     if(!this._cvo || !this._info) return false;
    //     this._info = Manager.model.getSkill().getSkillInfoByGroupID(this._cvo.groupID);
    //     if(this._info.level >= Manager.model.self.attrInfo.level || this._info.isMaxLevel()) return false;
    //     let loss = this._info.getSkillFormulaCvo(SkillFormulaType.LOSS).getFormulaResult(this._info.level);
    //     if(Manager.model.self.attrInfo.coin >= loss) return true;
    //     return false;
    // }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._txtLevel, this._img);
        if(this._txtLevel)
        {
            this._txtLevel.dispose();
            this._txtLevel = null;
        }
        if(this._img) Manager.pool.push(this._img);
        this._img = null;
        this._cvo = null;
    }
}