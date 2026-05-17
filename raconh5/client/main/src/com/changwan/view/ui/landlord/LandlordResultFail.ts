/**
 * 斗地主失败界面
 */
class LandlordResultFail extends CopyResultFail
{
    public constructor()
    {
        super();
    }

    protected countDown():void
	{
		let left:number = this.leftTime;
		if(left <= 0)
		{
			Manager.view.hide(ViewID.LandlordResultFail);
            Manager.control.getLaird().lairdQuit();
            Manager.model.getArena().exitArenaHandler();
			return;
		}
		this._txt.text = LangCVO.getContent("activity2", left);
	}

    protected hideView():void
	{
		Manager.view.hide(ViewID.LandlordResultFail);

        Manager.control.getLaird().lairdQuit();
        Manager.model.getArena().exitArenaHandler();
    }
}