/**
 * 世界等级经验加成
 * pzx
 * create 2018.1.10
 */
 class WorldLevelExpCVO
{
    private static _cvos:Array<WorldLevelExpCVO>;

    /*下限*/
    public bottom:number;
    /**上限 */
    public top:number;
    /*经验加成*/
    public exp_ratio:string;

    /*解析表*/
    public static parse(bytes:egret.ByteArray):void
    {
        this._cvos = [];
        let cvo:WorldLevelExpCVO;
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            cvo = new WorldLevelExpCVO();
            cvo.bottom = bytes.readShort();
            cvo.top = bytes.readShort();
            cvo.exp_ratio = bytes.readUTF();
            this._cvos.push(cvo);
        }
    }

    public static getExp(lv:number):string
    {
        let ln:number = this._cvos.length;
       for(let i:number =0;i<ln;i++)
       {
           let cvo:WorldLevelExpCVO = this._cvos[i];
           if(cvo.bottom<lv && cvo.top>=lv)
           {
               return cvo.exp_ratio;
           }
       }
       return this._cvos[ln-1].exp_ratio;
    }
 
}