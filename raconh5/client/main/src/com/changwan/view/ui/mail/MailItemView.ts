// 邮件子项
class MailItemView extends ItemRenderer
{
    private _back:eui.Image;
    private _titleTxt:eui.Label;
    private _dateTxt:eui.Label;
    private _unreadSign:eui.Label;
    private _attachSign:eui.Image;

    private _model:MailModel;

    private _ilingquImg:eui.Image;

    public constructor()
    {
        super();
        this._model = Manager.model.getMail();
        this.skinName = Manager.path.getSkinName("mail", "MailItemViewSkin");
    }

    protected createChildren():void
    {
        super.createChildren();
        this.initEvent();
    }

    protected dataChanged():void
    {
        let info:MailInfo = this.data as MailInfo;
        if(info == null) return;
        this._back.source = this.selected ? "common_wordBg_selected_png" : "common_wordBg_normal_png";
        this._titleTxt.text = info.title;
        this._dateTxt.text = cw.DateUtil.formatStr(info.date, cw.DateUtil.YYYY_MM_DD_HH_MM_SS);
        this._attachSign.visible = info.attachStatus == MailConst.UN_FETCH;
        this._unreadSign.visible = !info.hasRead;
        this._ilingquImg.visible = !this._attachSign.visible;
    }

    public dispose():void
    {
        this.removeEvent();
        super.dispose();
        ObjectUtil.removes(this._back, this._titleTxt, this._dateTxt, this._unreadSign, this._attachSign,this._ilingquImg);        
        this._back = null;
        this._titleTxt = null;
        this._dateTxt = null;
        this._unreadSign = null;
        this._attachSign = null;

        this._model = null;
        this._ilingquImg=null;
    }

    private initEvent():void
    {
        this._model.addEventListener(MailEvent.HAS_READ_MAIL, this.onReadMailHandler, this);
        this._model.addEventListener(MailEvent.FETCH_ATTACH, this.onFetchMailHandler, this);
        this._model.addEventListener(MailEvent.MAIL_ALL_FETCH, this.onAllFetchMailHandler, this);
    }

    private removeEvent():void
    {
        this._model.removeEventListener(MailEvent.HAS_READ_MAIL, this.onReadMailHandler, this);
        this._model.removeEventListener(MailEvent.FETCH_ATTACH, this.onFetchMailHandler, this);
        this._model.removeEventListener(MailEvent.MAIL_ALL_FETCH, this.onAllFetchMailHandler, this);
    }

    public setBgStyle(info:MailInfo):void
    {
        if(this.data == info)
        {
            this._back.source = "common_wordBg_selected_png";
            // MailContentView.instance.show(this.data);
            Manager.view.show(ViewID.MailContentView,this.data);
        }
        else this._back.source = "common_wordBg_normal_png";
    }

    private onReadMailHandler(e:MailEvent):void
    {
        if(this.data == null || this.data == null) return;
        let readID:number = e.params;
        if(readID == this.data.uniqueID)
        {
            this._unreadSign.visible = !this.data.hasRead;
        }
    }

    private onFetchMailHandler(e:MailEvent):void
    {
        if(this.data == null || this.data == null) return;
        let ids:Array<number> = e.params;
        let length = ids.length;
        let id:number;
        for(let i = 0; i < length; i++)
        {
            id = ids[i];
            if(id == this.data.uniqueID)
            {
                this._attachSign.visible = this.data.attachStatus == MailConst.UN_FETCH;
                this._unreadSign.visible = !this.data.hasRead;
                this._ilingquImg.visible = !this._attachSign.visible;
                break;
            }
        }
    }

    private onAllFetchMailHandler(e:MailEvent):void
    {
        if(this.data == null || this.data == null) return;
        this._attachSign.visible = this.data.attachStatus == MailConst.UN_FETCH;
        this._unreadSign.visible = !this.data.hasRead;
        this._ilingquImg.visible = !this._attachSign.visible;
    }
}