/**
 * 好友私聊分割线
 * liangyan
 * create 2017-11-08
*/
class FriendsChatSplitLine extends Sprite
{
    private _line:eui.Image;
    private _timeTxt:Label;

    public constructor()
    {
        super();
    }

    protected start():void
    {
        super.start();
        this._line = new eui.Image();
        this._line.source = "split_line_png";
        this._line.x = 4;
        this.addChild(this._line);

        this._timeTxt = Manager.pool.create(Label);
        this._timeTxt.textColor = Color.DEF;
        this._timeTxt.y = 7;
        this._timeTxt.width = 666;
        this._timeTxt.height = 33;
        this.addChild(this._timeTxt);
        this._timeTxt.textAlign = "center";

        this.width = 666;
        this.height = 33;
    }

    private set time(second:number)
    {
        this._timeTxt.text = cw.DateUtil.formatStr(second, cw.DateUtil.HH_MM);
    }

    public reuse(time:number):void
    {
        super.reuse();
        this.time = time;
    }

    public unuse():void
    {
        super.unuse();
        if(this._timeTxt)
        {
            Manager.pool.push(this._timeTxt);
            this._timeTxt = null;
        }
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._line, this._timeTxt);
        this._line = null;
        this._timeTxt.dispose();
        this._timeTxt = null;
    }
}