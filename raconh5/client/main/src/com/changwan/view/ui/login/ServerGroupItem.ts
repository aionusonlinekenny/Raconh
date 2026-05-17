/**
 * 服务器组按钮
 * luzhihong
 * create 2017-12-15
 */
class ServerGroupItem extends ItemRenderer
{
    private _back:eui.Image;
    private _label:Label;
    public list:Array<any>;

    public constructor()
    {
        super();
        this._back = new eui.Image("login_serverBtn0_png");
        this.addChild(this._back);

        this._label = new Label();
        this._label.y = 19;
        this._label.width = 185;
        this._label.size = 30;
        this._label.textColor = 0x7C6E62;
        this._label.fontFamily = Manager.config.defaultFont;
        this._label.textAlign = "center";
        this.addChild(this._label);
    }

    protected dataChanged():void
    {
        // {
        //     "name": "历史服务器",
        //     "list": [
        //         { "name":"202服务器", "host":"192.168.10.202" , "port":9001, "serverID":10001, "state":0 },
        //         { "name":"林铿50", "host":"192.168.10.50" , "port":9001, "serverID":10001, "state":1 },
        //     ]
        // }
        this._label.text = this.data.name;
        this.list = this.data.list;
    }

    public set selected(value:boolean)
    {
        this._back.source = value ? "login_serverBtn1_png" : "login_serverBtn0_png";
    }

    public dispose():void
    {
		super.dispose();
        ObjectUtil.remove(this._back);
        ObjectUtil.dispose(this._label);
        this._back = null;
        this._label = null;
        this.list = null;
	}
}