/**
 * 排行榜第4名后的单个信息视图
 * luzhihong
 * create 2017-11-02
 */
class RankItem2 extends ItemRenderer
{
	private _info:RankInfo;
	private _back:eui.Image;
	private _txtRank:Label;
	private _txtName:Label;
	private _txtValue:Label;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("rank", "RankItemSkin2");
	}
	
    // protected createChildren():void
    // {
    //     super.createChildren();
    //     this.initEvent();
    // }

    protected dataChanged():void
    {
        let info:RankInfo = this.data as RankInfo;
		if(this._info == info) return;
		this._info = info;

		this._txtRank.text = this._info.rank+"";
		this._txtName.text = this._info.name;
		this._txtValue.text = this.getValueLabel(this._info);
	}

	private getValueLabel(info:RankInfo):string
	{
		switch(info.type)
		{
			case RankConst.TYPE_POWER:
			case RankConst.TYPE_PET:
			case RankConst.TYPE_MING_GE:
				return LangCVO.getContent("rank1") + info.value;//1	战力：
			case RankConst.TYPE_LEVEL:
				// let str:string = info.value + LangCVO.getContent("common15");//15	级
				// if(info.zhuanshu > 0) str = info.zhuanshu + LangCVO.getContent("common14") + str;//14	转
				// return str;
				return LangCVO.getContent("rank11") + info.value;//11	等级：
			case RankConst.TYPE_JIE_XUE:
				return LangCVO.getContent("rank10") + info.value;//10	境界：
			case RankConst.TYPE_GEM:
			case RankConst.TYPE_SOUL:
				return LangCVO.getContent("rank2") + info.value;//2	总等级：
		}
		return ""
	}
	
    // private initEvent():void
    // {
    //     this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    // }

    // private removeEvent():void
    // {
    //     this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    // }

    // public setBgStyle(selected:boolean):void
    // {
    //     if(selected)
    //         this.back.source = "resource/assets/ui/common/word/common_wordBg_selected.png";
    //     else
    //         this.back.source = "resource/assets/ui/common/word/common_wordBg_normal.png";
    // }

    // private onClickHandler(e:egret.TouchEvent):void
    // {
    //     if(this._model.readingItem != null)
    //         return;
    //     let test:MailContentView = new MailContentView(this.data.info);
    //     this._model.mailView.addChild(test);
    //     this._model.readingItem = this;

    //     this.setBgStyle(true);
    // }
    
    public dispose():void
    {
        super.dispose();
		this._info = null;
		this._back.parent.removeChild(this._back);
		this._back = null;
		this._txtRank.dispose();
		this._txtRank = null;
		this._txtName.dispose();
		this._txtName = null;
		this._txtValue.dispose();
		this._txtValue = null;
    }
}