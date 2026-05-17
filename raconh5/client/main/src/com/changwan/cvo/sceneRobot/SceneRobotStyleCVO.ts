/**
 *author Anydo
 *create 2018-1-18
 *description 
*/
class SceneRobotStyleCVO
{
    public id:number;
    public playerName:string;
    public title:number;
    public career:number;
    public clothes:number;
    public weapon:number;
    public wing:number;

    private static _cvos:Object;
    public static parse(bytes:egret.ByteArray)
    {
        SceneRobotStyleCVO._cvos = {};
        var baseCount:number = bytes.readShort();
        let cvo:SceneRobotStyleCVO;
        for (var i = 0; i < baseCount; i++)
        {
            cvo = new SceneRobotStyleCVO();
            cvo.id = bytes.readShort();
            cvo.playerName = bytes.readUTF();
            cvo.title = bytes.readShort();
            cvo.career = bytes.readByte();
            cvo.clothes = bytes.readShort();
            cvo.weapon = bytes.readShort();
            cvo.wing = bytes.readShort();
            SceneRobotStyleCVO._cvos[cvo.id] = cvo;
        }
    }

    public static getCVO(id:number):SceneRobotStyleCVO
    {
        return SceneRobotStyleCVO._cvos[id];
    }
}