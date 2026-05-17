// 邮件主界面
class MailPanel extends Panel
{
    private _mailList:BaseVScrollerList;
    private _allBtn:eui.Button;

    private _menuBtnContent:Array<any>;
    private _model:MailModel;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("mail", "MailViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getMail();
        this._model.mailInfos = [];
        this.basePanel.setBottomBackTop(979);
        this.basePanel.title = "mail_title_png";
        // this.basePanel.backBtn.selected = false;
		if(!this._menuBtnContent)
		{
			this._menuBtnContent = [
				{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "mail_btn_normal_png", imgClick: "mail_btn_normal_png" },
				// { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "", imgClick: "" },
				// { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "", imgClick: "" },
				// { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "", imgClick: "" }
			];
		}
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
    }

	protected addEvent():void
	{
		super.addEvent();

        this._allBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);

        this._model.addEventListener(MailEvent.UPDATE_LIST, this.onUpdateListHandler, this);
        this._model.addEventListener(MailEvent.MAIL_RECEIVE, this.onUpdateListHandler, this);
        this._model.addEventListener(MailEvent.MAIL_DELETE, this.onUpdateListHandler, this);
        this._model.addEventListener(MailEvent.HAS_READ_MAIL, this.onUpdateListHandler, this);
        this._mailList.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickItemHandler, this);
	}

	protected removeEvent():void
	{
        this._allBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);

        this._model.removeEventListener(MailEvent.UPDATE_LIST, this.onUpdateListHandler, this);
        this._model.removeEventListener(MailEvent.MAIL_RECEIVE, this.onUpdateListHandler, this);
        this._model.removeEventListener(MailEvent.MAIL_DELETE, this.onUpdateListHandler, this);
        this._model.removeEventListener(MailEvent.HAS_READ_MAIL, this.onUpdateListHandler, this);
        this._mailList.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickItemHandler, this);
        
		super.removeEvent();
	}

    protected initData():void
    {
        super.initData();
        Manager.control.getMail().mailListRequest();
    }

    protected onClickHandler(e:egret.TouchEvent):void
    {
        super.onClickHandler(e);

        switch(e.currentTarget)
        {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
				// Manager.panel.hide(this);
                Manager.view.hide(ViewID.MailPanel);
                break;
            case this._allBtn:
                // MailAllFetchView.instance.show();
                let mailInfos = Manager.model.getMail().mailInfos;
                let len = mailInfos ? mailInfos.length : 0;
                for(let i = 0; i < len; i++)
                {
                    if(mailInfos[i].attachStatus == MailConst.UN_FETCH)
                    {
                        Manager.view.show(ViewID.MailAllFetchView);
                        return;
                    }
                }
                FloatTips.addTips(LangCVO.getContent("mail1"),Color.RED);
                break;
        }
    }

    private onUpdateListHandler(e:MailEvent):void
    {
        /// 填充数据
        let mailInfos = this._model.mailInfos;
        this._mailList.initBtnListData(MailItemView, mailInfos, true);
		(<eui.VerticalLayout>this._mailList.itemList.layout).gap = -6;
    }

    private onClickItemHandler(e:eui.ItemTapEvent):void
    {
        let list = e.currentTarget as eui.List;
        let length = list.numChildren;
        for(let i = 0; i < length; i++)
        {
            (list.getChildAt(i) as MailItemView).setBgStyle(list.selectedItem);
        }
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this.basePanel, this._mailList, this._allBtn);
        this.basePanel = null;
        this._mailList = null;
        this._allBtn = null;

        this._menuBtnContent.length = 0;
        this._model = null;
    }

}