/**
 * 经验副本评分表
 * luzhihong
 * create 2018.1.10
 */
 class CopyExpScoreCVO
{
    private static _cvos:Array<CopyExpScoreCVO>;

    /*id*/
    public id:number;
    /*评分*/
    public score:string;
    /*杀怪数量*/
    public kill_num:number;

    /*解析表*/
    public static parseCVOs(bytes:egret.ByteArray):void
    {
        let pageCount:number = bytes.readByte();
        CopyExpScoreCVO.parse(bytes);
        CopyExpConfigCVO.parseDifficult(bytes);
        CopyExpConfigCVO.parseCost(bytes);
        CopyExpConfigCVO.parseOthers(bytes);
        WorldLevelExpCVO.parse(bytes);
    }

    /*解析表*/
    public static parse(bytes:egret.ByteArray):void
    {
        CopyExpScoreCVO._cvos = [];
        let cvo:CopyExpScoreCVO;
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            cvo = new CopyExpScoreCVO();
            cvo.id = bytes.readByte();
            cvo.score = bytes.readUTF();
            cvo.kill_num = bytes.readShort();
            
            CopyExpScoreCVO._cvos.push(cvo);
        }
    }

    public static getCVO(id:number):CopyExpScoreCVO
    {
        for(let i:number=this._cvos.length-1; i>=0; i--)
        {
            if(this._cvos[i].id == id) return this._cvos[i];
        }
        return null;
    }
    
    public static getCVOByKillNum(num:number):CopyExpScoreCVO
    {
        for(let i:number=this._cvos.length-1; i>=0; i--)
        {
            if(this._cvos[i].kill_num <= num) return this._cvos[i];
        }
        return null;
    }
}