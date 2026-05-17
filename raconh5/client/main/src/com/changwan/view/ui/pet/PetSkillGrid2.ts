/**
 *author Anydo
 *create 2018-1-31
 *update devil 2018-04-12 
*/
class PetSkillGrid2 extends RenderSprite
{
    private _back:BitmapRes;
    private _txtLevel:TextField;
    private _img:BitmapRemote;
    private _cvo:SkillCVO;
    public get cvo():SkillCVO
    {
         return this._cvo;
    }

    public constructor(x:number,y:number)
    {
        super();
        this.touchEnabled = true;
        this.x = x;
        this.y = y;
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        super.start();
        this._back = BitmapRes.create("common_itemBg_png",-15,-15);
        this.addChild(this._back);
        this._img = Manager.pool.create(BitmapRemote);
        this._img.x = 13;
        this._img.y = 13;
        this.addChild(this._img);
        this._txtLevel = Manager.pool.create(TextField);
        this._txtLevel.text = "LV.0";
        this._txtLevel.x = 7;
        this._txtLevel.y = 70;
        this._txtLevel.textColor = 0xFFFBEB;
        this._txtLevel.size = 24;
        this._txtLevel.fontFamily = "Microsoft YaHei";
        this._txtLevel.width = 89;
        this._txtLevel.height = 28;
        this._txtLevel.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._txtLevel.textAlign = egret.HorizontalAlign.RIGHT;
        this.addChild(this._txtLevel);
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
        this.invalidate("drawUpdateLevel");
    }

    public set cvo(value:SkillCVO)
    {
        if(this._cvo == value) return;
        this._cvo = value;
        if(this._cvo != null)
        {
            this._img.load(Manager.path.getSkillIconPath(this._cvo.icon));
            this.invalidate("drawUpdateLevel");
        }
    }

    protected drawAll():void
    {
        super.drawAll();
        if(this._cvo)this.drawUpdateLevel();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid("drawUpdateLevel"))this.drawUpdateLevel();
    }

    private drawUpdateLevel():void
    {
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

    protected disposeSelf():void
    {
        super.disposeSelf();
        if(this._back != null)
        {
            Manager.pool.push(this._back);
            this._back = null;
        }
        if(this._txtLevel != null)
        {
            Manager.pool.push(this._txtLevel);
            this._txtLevel = null;
        }
        if(this._img != null)
        {
            Manager.pool.push(this._img);
            this._img = null;
        }
        this._cvo = null;
    }
}