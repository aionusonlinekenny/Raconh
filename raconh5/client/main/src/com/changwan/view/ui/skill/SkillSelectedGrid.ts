/**
 * 技能主界面选中技能格子
 * liangyan
 * create 2017-11-24
*/
class SkillSelectedGrid extends Sprite
{
    private _grid:SkillGrid;
    private _nameBack:eui.Image;
    private _nameTxt:Label;

    private _cvo:SkillCVO;

    public constructor()
    {
        super();
        this.start();
    }

    protected start():void
    {
        super.start();
        this.width = 140;
        this.height = 147;

        this._grid = new SkillGrid();
        this._grid.x = 15;
        this.addChild(this._grid);

        this._nameBack = new eui.Image();
        this._nameBack.source = "common_back2_png";
        this._nameBack.y = 105;
        this.addChild(this._nameBack);

        this._nameTxt = new Label();
        this._nameTxt.size = 20;
        this._nameTxt.textColor = Color.WHITE;
        this._nameTxt.fontFamily = Manager.config.defaultFont;
        this._nameTxt.y = 115;
        this._nameTxt.width = this.width;
        this._nameTxt.height = 24;
        this._nameTxt.textAlign = "center";
        this.addChild(this._nameTxt);
    }

    public set cvo(value:SkillCVO)
    {
        if(this._cvo == value) return;
        this._cvo = value;
        this._grid.cvo = this._cvo;
        this._nameTxt.text = this._cvo.name;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._grid, this._nameBack, this._nameTxt);
        this._grid.dispose();
        this._grid = null;
        this._nameBack = null;
        this._nameTxt.dispose();
        this._nameTxt = null;

        this._cvo = null;
    }
}