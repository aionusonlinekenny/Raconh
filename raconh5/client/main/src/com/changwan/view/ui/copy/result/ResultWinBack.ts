/**
 *author Anydo
 *create 2017-12-27
 *description 
*/
class ResultWinBack extends UIComponent
{
    public btn:Button;
    public btnClose:eui.Image;
    public titleImg:eui.Image;
    private _back:eui.Image;
    private _txt:Label;

    public constructor()
	{
        super();
        this.skinName = Manager.path.getSkinName("copy", "ResultWinBackSkin");
        this.touchChildren = true;
    }

    public setBackHeight(h:number=567):void
    {
        this._back.height = h;
        this._txt.y = this._back.y + this._back.height - 81;
        this.btn.y = this._back.y + this._back.height - 121;
    }

    public setTxt(msg:string):void
    {
        this._txt.text = msg;
    }

	public dispose():void
	{
		super.dispose();
        if(this._loadComplete)
        {
            ObjectUtil.removes(this.btnClose, this._back,this.titleImg);
            this._back = null;
            this.btnClose = null;
            this.btn.dispose();
            this.btn = null;
            this._txt.dispose();
            this._txt = null;
            this.titleImg=null;
        }
	}
}