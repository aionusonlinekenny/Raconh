/**
 * pzx 
 * 特权卡
 * 18.1.11
 */
class SysPrivilegeCVO {
	private static _cvos:Array<SysPrivilegeCVO>;
	public id:number;
    //价格（RMB）
	public price:number;	
	public name:string;
    public static parse(bytes:egret.ByteArray):void
    {
		this._cvos = [];
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			var item:SysPrivilegeCVO = new SysPrivilegeCVO();
			item.id = bytes.readByte();
			item.price = bytes.readShort();
			item.name = bytes.readUTF();
			this._cvos.push(item);
        }
    }
		
	public static getCvo(id:number):SysPrivilegeCVO
	{
		for(let i:number=this._cvos.length-1; i>=0; i--)
		{
			if(this._cvos[i].id == id) return this._cvos[i];
		}
		return null;
	}
}