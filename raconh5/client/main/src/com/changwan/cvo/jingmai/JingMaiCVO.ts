/**
 * pzx 
 * 17.11.18
 * 经脉cvo
 */
class JingMaiCVO {
	 private static _data:any = {};
     private static _maxLeve:number;
     private static _maxCond:number;

	public static parse(bytes:egret.ByteArray):void
    {
        let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        var info:JingMaiCvoInfo;
        this._maxLeve = tableCount-1;
        this._maxCond = 1;
        
        for(let i:number = 0; i < tableCount; i++)
        {
            info = new JingMaiCvoInfo();
            info.id =bytes.readShort();
            info.level = bytes.readShort();
            info.cond = bytes.readShort();
            info.type = bytes.readByte();
            info.name = bytes.readUTF();
            info.quantity = bytes.readUTF();
            info.attr = bytes.readUTF();
            info.source_id = bytes.readUTF();
            info.pose = bytes.readByte();
            info.jingmaiType = bytes.readByte();
            info.gai = new GainLossVO(info.quantity);
            this._data[info.level] = info;
            if(info.cond>this._maxCond)
            {
                this._maxCond = info.cond;
            }
        }
    }

    public static getInfo(leve:number):JingMaiCvoInfo
    {
        return this._data[leve];
    }
/**获得当前层数对应的经脉列表 */
    public static getCondList(cond:number,type:number):Array<JingMaiCvoInfo>
    {
        let arr:Array<JingMaiCvoInfo> =[];
        for(var value in this._data)
        {
            let info:JingMaiCvoInfo = this._data[value];
            if(cond == info.cond && type == info.jingmaiType)
            {
                arr.push(info);
            }
        }
        arr = ArrayUtil.sortOn(arr,["pose"]);
        return arr;
    }
    /**最大级 */
    public static get maxLevel():number
    {
        return this._maxLeve;
    }
/**最大层 */
    public static get maxCond():number
    {
        return this._maxCond;
    }
    
	
}