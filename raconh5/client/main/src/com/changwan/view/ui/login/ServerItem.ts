/**
 * 服务器组按钮
 * luzhihong
 * create 2017-12-15
 */
class ServerItem extends ItemRenderer
{
    private _icon:eui.Image;
    private _txtServer:Label;
    private _txtPlayer:Label;
    public itemData:any;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("login", "ServerItemSkin");
    }

    protected dataChanged():void
    {
        // { "name":"202服务器", "host":"192.168.10.202" , "port":9001, "serverID":10001, "state":0 }
        this.itemData = this.data;
        if(this.itemData.state == 1) this._icon.source = "login_iconNew_png";
        else if(this.itemData.state == 2) this._icon.source = "login_iconHot_png";
        else this._icon.source = "";
        this._txtServer.text = this.itemData.name;
        if(this.itemData.nick_name)
        {
            this._txtServer.x = 15;
            if(this.itemData.rein > 0)
            {
                this._txtPlayer.text = LangCVO.getContent("common57", this.itemData.nick_name, this.itemData.rein, this.itemData.level);
            }
            else
            {
                this._txtPlayer.text = LangCVO.getContent("common58", this.itemData.nick_name, this.itemData.level);
            }
        }
        else 
        {
            this._txtServer.x = 170;
            this._txtPlayer.text = "";
        }
    }

    public dispose():void
    {
		super.dispose();
        ObjectUtil.remove(this._icon);
        ObjectUtil.disposes(this._txtServer, this._txtPlayer);
        this._icon = null;
        this._txtServer = null;
        this._txtPlayer = null;
        this.itemData = null;
	}
}