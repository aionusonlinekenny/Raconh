/**
 * 银币副本难度表
 * luzhihong
 * create 2018.3.9
 */
 class CopySilverHardCVO
{
    private static _cvos:Array<CopySilverHardCVO>;

    /*id*/
    public id:number;
    /*等级*/
    public level:number;
    /*名字*/
    public name:string;

    /*解析表*/
    public static parse(bytes:egret.ByteArray):void
    {
        CopySilverHardCVO._cvos = [];
        let cvo:CopySilverHardCVO;
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            cvo = new CopySilverHardCVO();
            cvo.id = bytes.readByte();
            cvo.level = bytes.readShort();
            cvo.name = bytes.readUTF();
            
            CopySilverHardCVO._cvos.push(cvo);
        }
    }

    public static getCVO(id:number):CopySilverHardCVO
    {
        for(let i:number=this._cvos.length-1; i>=0; i--)
        {
            if(this._cvos[i].id == id) return this._cvos[i];
        }
        return null;
    }
    
    public static getCurCVO():CopySilverHardCVO
    {
        let curLv:number = Manager.model.self.attrInfo.level;
        let len:number = this._cvos.length;
        for(let i:number=0; i<len; i++)
        {
            if(this._cvos[i].level > curLv) return this._cvos[i];
        }
        return this._cvos[len-1];
    }
}