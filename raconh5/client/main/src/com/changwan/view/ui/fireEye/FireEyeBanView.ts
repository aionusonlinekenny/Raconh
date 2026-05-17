/**
 * 火眼金睛禁手视图
 * liangyan
 * create 2018-03-22
*/
class FireEyeBanView extends UIComponent
{
    private _back:BitmapRemote;
    private _countDown:Label;
    private _bp:BitmapRemote;

    private _wrong:number;
    private _life:number;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("fireEye", "FireEyeBanViewSkin");
        this.touchChildren = true;
    }

    protected configUI():void
    {
        super.configUI();
        
        let path = Manager.path.getFireEyePath("dark_back");
        this._back.load(path);
        this._back.touchEnabled = true;
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
        this._wrong = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_WRONG_TIMES).value;
        this._life = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_BAN_HAND).value;
        let path = Manager.path.getFireEyePath("crying");
        this._bp = Manager.pool.create(BitmapRemote, path);
        this._bp.x = 171;
        this._bp.y = 480;
        this.addChild(this._bp);
        HtmlUtil.setTextFlow(this._countDown, StringUtils.setParam(LangCVO.getContent("fireEye8"), this._wrong, Color.GREEN_STR_2, this._life));
        Manager.render.add(this.countDown, this, 1000);
    }

    private countDown():void
	{
        this._life--;
        //点错啦!（累积错3次会禁手{0}}秒啊）
        let str = StringUtils.setParam(LangCVO.getContent("fireEye8"), this._wrong, Color.GREEN_STR_2, this._life);
        HtmlUtil.setTextFlow(this._countDown, str);
        if(this._life == 0)
        {
            Manager.control.getFireEye().banView.dispose();
            Manager.control.getFireEye().banView = null;
        }
	}

    public dispose():void
    {
        if(Manager.render.contains(this.countDown, this)) Manager.render.remove(this.countDown, this);
        super.dispose();
        ObjectUtil.removes(this._countDown, this._bp);
        if(this._back != null) Manager.pool.push(this._back);
        this._back = null;
        this._countDown.dispose();
        this._countDown = null;
        if(this._bp) Manager.pool.push(this._bp);
        this._bp = null;
    }
}