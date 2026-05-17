/**
 *人物雕像视图信息类
 * Anydo
 * create  
 * update devil 2017-11-08
*/
class StatusGameObjectInfo extends PlayerGameObjectInfo
{	
    
	public getType():number
	{
		return GameObjectType.STATUE;
	}

    public set id(value:number)
    {
         this._id = value;
    }

	public canHited(showMsg:boolean):boolean { return false; }

	public reuse(id:number,role:RoleInfo):void
	{
		super.reuse(id, role);
		this.updatePostion(1393, 907);
	}

	public parse(data:TCPPacketIn):void
	{
		let name:string = data.readUTF();
		this.attrInfo.setValue(AttrDescType.NICKNAME, name != "" ? name : LangCVO.getContent("common61"));//虚位以待
        this.attrInfo.setValue(AttrDescType.CAREER, data.readByte());
		this.updateStyle(data.readShort(), data.readShort(), data.readShort());
		this.attrInfo.setValue(AttrDescType.TITLE_ID, data.readShort());
		this.attrInfo.setValue(AttrDescType.GUILD_NAME, data.readUTF());
		// this.updatePostion(1393, 907);
	}

	// public setStatusDef():void
	// {
	// 	// this.updateStyle(data.readShort(), data.readShort(), data.readShort());
	// 	this.attrInfo.setValue(AttrDescType.NICKNAME, "虚位以待");

	// 	let career:number = Manager.model.self.attrInfo.career;
	// 	this.attrInfo.setValue(AttrDescType.CAREER, career);
	// 	if(career == 1) this.updateStyle(1003, 9004, 9002);
	// 	else this.updateStyle(2003, 8004, 8002);
	// 	this.attrInfo.setValue(AttrDescType.TITLE_ID, 0);
	// }
}