/**
 * 发布版的时候会删除
 */
class KeyManager
{
	public static A:number = 65;
	public static B:number = 66;
	public static C:number = 67;
	public static D:number = 68;
	public static E:number = 69;
	public static F:number = 70;
	public static G:number = 71;
	public static H:number = 72;
	public static I:number = 73;
	public static J:number = 74;
	public static K:number = 75;
	public static L:number = 76;
	public static M:number = 77;
	public static N:number = 78;
	public static O:number = 79;
	public static P:number = 80;
	public static Q:number = 81;
	public static R:number = 82;
	public static S:number = 83;
	public static T:number = 84;
	public static U:number = 85;
	public static V:number = 86;
	public static W:number = 87;
	public static X:number = 88;
	public static Y:number = 89;
	public static Z:number = 90;
	public static ESC:number = 27;
	public static ADD:number = 187;
	public static SUB:number = 189;
	public static SPACE:number = 32;

	public static bol:boolean = false;

	public constructor()
	{
		document.onkeydown = this.onKeyDownHandler;
		document.onkeyup = this.onKeyUpHandler;
	}

	private onKeyDownHandler(e):void
	{
	}
	
	private onKeyUpHandler(e):void
	{
		if(!Manager.model.getMap().mapDataLoadComplete) return;
		switch(e.keyCode)
        {
            case KeyManager.ESC:
				if(!GM.instance.parent)
					Manager.global.gameMain.addChild(GM.instance);
				else
					Manager.global.gameMain.removeChild(GM.instance);
                break;
			case KeyManager.SPACE:
				KeyManager.bol = !KeyManager.bol;
                break;
			case KeyManager.Z:
				Manager.model.getAuto().autoHook = !Manager.model.getAuto().autoHook;
				break;
			case KeyManager.W:
				Manager.pool.testCount();
				break;
			case KeyManager.ADD:
				let selfa:SelfGameObjectInfo = Manager.model.self;
				console.log(selfa.x, selfa.y, Manager.model.getMap().isWalkPoint(selfa.x, selfa.y), selfa.target != null);
				break;
			case KeyManager.SUB:
				break;
			//以上快捷键开发过程中常用，请勿修改
			case KeyManager.Q:
				//Manager.view.show(ViewID.Sysprivilege_ExperienceView);
                break;
			case KeyManager.E:
                break;
			case KeyManager.R:
				break;
			case KeyManager.T:
				break;
			case KeyManager.Y:
				break;
			case KeyManager.U:
				break;
			case KeyManager.I:
				break;
        }
	}
}