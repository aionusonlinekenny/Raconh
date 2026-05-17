/**
 * 寻宝积分奖励
 * pzx 
 * create 18.2.7
 */
class ArtifactRewardView extends PopUpView{
	private _label:Label;
	private _rewardBtn:Button;
	private _group:eui.Group;
    private _cvo:ArtifactIntegralCVO;
    private _list:Array<BaseGoods>;
    private _redIcon:eui.Image;
    private _ilingquImg:eui.Image;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("artifact", "ArtifactRewardViewSkin");
    }
    protected configUI():void
    {
        super.configUI();
		this._popupView.titleImg.source = "common_jiangli_png";
        this._list=[];
    }

    protected addEvent():void
    {
        super.addEvent();
        this._rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onrewardHandler,this);
        Manager.model.getArtifact().addEventListener(ArtifactEvent.ARTIFACT_REWARD_EVENT,this.drawData,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onrewardHandler,this);
        Manager.model.getArtifact().removeEventListener(ArtifactEvent.ARTIFACT_REWARD_EVENT,this.drawData,this);
    }
    private onrewardHandler():void
    {
        let ineg:number = Manager.model.getArtifact().getIntegral();
        if(ineg<this._cvo.args)
        {
            FloatTips.addTips(LangCVO.getContent("artifact5"),Color.RED);
            return;
        }
        Manager.control.getArtifact().integralReward(this._cvo.args);
    }


    protected drawAll():void
	{
		super.drawAll();
        this.drawData();
	}


    private drawData():void{
        this._cvo = ArtifactIntegralCVO.getCurIntegralCvo();
        let str:string = LangCVO.getContent("artifact3");//积分达到{0},可领取{1}
        let ineg:number = Manager.model.getArtifact().getIntegral();
        let color:string = Color.GREEN_STR;
        if(ineg<this._cvo.args)
        {
            color = Color.RED_STR;
            this._redIcon.visible= false;
        }
        else
        {
            this._redIcon.visible = true;
        }
        let desc:string = "("+ineg+"/"+this._cvo.args+")";
        desc = HtmlUtil.addColorTag(desc,color);

        str = StringUtils.setParam(str,this._cvo.args,desc);
        HtmlUtil.setTextFlow(this._label,str);

        let arr:Array<GainLossVO> = GainLossVO.parse(this._cvo.rewards);
        let ln:number = arr.length;
        for(let i:number = 0;i<ln;i++)
        {
            let item:BaseGoods = new BaseGoods();
            item.setGainLossVO(arr[i]);
            this._group.addChild(item);
            item.x = i * 155;
            this._list.push(item);
        }
        this._group.width = ln * 151;
        // this._group.horizontalCenter = 0;
        this._group.x = Math.round((this.width - this._group.width) / 2);
        if(this._cvo.isReward()==1)
        {
            this._rewardBtn.visible = false;
            this._redIcon.visible = false;
            this._ilingquImg.visible = true;
        }
    }
	
	protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.ArtifactRewardView);
    }
	

    public dispose():void
    {
        super.dispose();
        this._label.dispose();
	    this._rewardBtn.dispose();
        this.removeChild(this._group);
        this.removeChild(this._redIcon);
	    this._group=null;
        this._cvo=null;
        for(let item of this._list)
        {
            item.dispose();
        }
        this._list=null;
        this._redIcon=null;
    }
}