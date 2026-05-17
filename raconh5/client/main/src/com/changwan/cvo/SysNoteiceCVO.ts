/**
 * pzx 
 * 2017.12.16
 */
class SysNoteiceCVO
{
    private static _cvos:Array<SysNoteiceCVO>;

	/** ID */
	public id:number;
	public name:string;
/**任务id  */
	public taskId:number;
/**  预告图标ID */
	public icon:string;
//资源x坐标
	public offsetX:number;
	public offsetY:number;
//对应关卡数字
	public pass:number;
	
/**  功能开启任务ID
（完成任务时，功能开启、播放特效） */
	public open_task_id:number;
/**  奖励
配置掉落包*/
	public reward:string
/**图标飞到对应的位置 */
	public pointId:number;
/** 开关隐藏按钮 0：隐藏 1：显示 */
	public is_show:number;

	public panelId:string;

	private _state:number=0;

	public setState(value:number):void
	{
		this._state = value;
	}
    /**领取奖励,0:否,1:是' */
	public get state():number
	{
		return this._state;
	}

    public static parse(bytes:egret.ByteArray):void
    {
		this._cvos = [];
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			var item:SysNoteiceCVO = new SysNoteiceCVO();
			item.id = bytes.readShort();
			item.name = bytes.readUTF();
			item.taskId = bytes.readInt();
			item.icon = bytes.readUTF();
			item.offsetX = bytes.readShort();
			item.offsetY =bytes.readShort();
			item.pass = bytes.readShort();
			item.open_task_id = bytes.readInt();
			item.reward = bytes.readUTF();
			item.pointId = bytes.readByte();
			let show:number = bytes.readByte();
			item.panelId = bytes.readUTF();
			if(show == 1)
			this._cvos.push(item);
        }
    }
	public static getCvos():Array<SysNoteiceCVO>
	{
		return this._cvos;
	}
	
	public static getCvo(id:number):SysNoteiceCVO
	{
		for(let i:number=this._cvos.length-1; i>=0; i--)
		{
			if(this._cvos[i].id == id) return this._cvos[i];
		}
		return null;
	}
}