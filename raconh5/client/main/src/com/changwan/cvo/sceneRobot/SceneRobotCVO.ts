/**
 *author Anydo
 *create 2018-1-18
 *description 
*/
class SceneRobotCVO
{
    public id:number;
    public mapResID:number;
    public posx:number;
    public posy:number;
    /** 怪物x偏移 */
    public posxMon:number;
    /** 怪物y偏移 */
    public posyMon:number;
    /** 怪物ID */
	public monsterId:number;
    /** 对应SceneRobotStyleCVO.id */		
    public playerStyId:number;

    private static _cvos:Object;
    public static parse(bytes:egret.ByteArray)
    {
        SceneRobotCVO._cvos = {};
        var baseCount:number = bytes.readShort();
        let cvo:SceneRobotCVO;
        for (var i = 0; i < baseCount; i++)
        {
            cvo = new SceneRobotCVO();
            cvo.id = bytes.readShort();
            cvo.mapResID = bytes.readShort();
            cvo.posx = bytes.readShort();
            cvo.posy = bytes.readShort();
            cvo.posxMon = bytes.readShort();
            cvo.posyMon = bytes.readShort();
            cvo.monsterId = bytes.readShort();
            cvo.playerStyId = bytes.readShort();
            SceneRobotCVO._cvos[cvo.id] = cvo;
        }
    }

    public static getCVOsByMapID(mapResID:number):SceneRobotCVO[]
    {
        let result:SceneRobotCVO[] = [];
        let cvo:SceneRobotCVO;
        for (let key in SceneRobotCVO._cvos)
        {
            cvo = SceneRobotCVO._cvos[key];
            if(cvo.mapResID == mapResID) result.push(cvo);
        }
        return result;
    }

    public static parseCVOs(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readByte();
        for(let i:number = 0 ; i < tableCount; i ++)
        {
            if(i == 0) SceneRobotCVO.parse(bytes);
            else if(i == 1) SceneRobotStyleCVO.parse(bytes);
            else if(i == 2) SceneRobotNameCVO.parse(bytes);
        }
    }
}