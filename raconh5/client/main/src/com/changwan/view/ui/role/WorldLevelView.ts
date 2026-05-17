/** 
 * 世界等级
 * pzx 
 * create 18.3.29
 */
class WorldLevelView extends PopUpView{
    private _okBtn:Button;
    private _desc:Label;
    private _desc0:Label;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("role", "WorldLevelViewSkin");
    }
    protected configUI():void
    {
        super.configUI();
        this._popupView.titleImg.source = "role_shijiedengji_png";
        this._desc.lineSpacing = 15;
        this._desc0.lineSpacing = 15;
        Manager.control.getRole().worldLeve();
    }

    protected addEvent():void
    {
        super.addEvent();
        this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchCloseHandler,this);
         Manager.model.getLogin().addEventListener(WorldLeveExpEvent.UPDATE_WORLDLEVE_EVENT,this.darwData,this);
    }

    protected removeEvent():void
    {
        this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchCloseHandler,this);
         Manager.model.getLogin().removeEventListener(WorldLeveExpEvent.UPDATE_WORLDLEVE_EVENT,this.darwData,this);
        super.removeEvent();
    }

	protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.WorldLevelView);
    }

//     自身没达到120级的时候
// 当前世界等级：（还是写实际的）
// 当前经验加成：0%

    private darwData(e:WorldLeveExpEvent):void{
        let lv:number = e.params;//当前世界等级
       this._desc.text = StringUtils.setParam(LangCVO.getContent("worldLeve1"),lv);
       let exp:string;
       if(Manager.model.self.attrInfo.level<120)
       {
           exp = "0";
       }
       else
       {

            let mlv =lv - Manager.model.self.attrInfo.level;
            if(mlv<=0) exp = "0";
            else
            {
                exp = WorldLevelExpCVO.getExp(mlv);//千分比
                exp = exp.substr(0,exp.length - 1)
            }
       }
       HtmlUtil.setTextFlow(this._desc0,StringUtils.setParam(LangCVO.getContent("worldLeve2"),lv,exp));
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.disposes(this._okBtn,this._desc,this._desc0);
         this._okBtn=null;
        this._desc=null;
        this._desc0=null;
    }
}