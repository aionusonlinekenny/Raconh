/**
 * pzx 
 * 17.11.21
 * 战斗力配置表
 */
class AttributeFightingCVO {
	// <属性类型,战力系数>
	private static _dic:Dictionary<number,number>;

	public static parse(bytes:egret.ByteArray):void
    {
        let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
		let type:number;
		let name:string;
		let num:number;
		this._dic = new Dictionary<number,number>();
        
        for(let i:number = 0; i < tableCount; i++)
        {
           
            type = bytes.readByte();
			name =bytes.readUTF();
            num = bytes.readInt() / 100;
            this._dic.add(type,num);
        }
    }

	public static getData():Dictionary<number,number>
	{
		return this._dic;
	}


}