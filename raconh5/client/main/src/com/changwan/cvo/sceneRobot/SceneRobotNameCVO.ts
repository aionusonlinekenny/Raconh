/**
 *author Anydo
 *create 2018-1-18
 *description 
*/
class SceneRobotNameCVO
{
    public id:number;
    public playerName:string;

    private static _cvos:SceneRobotNameCVO[];
    public static parse(bytes:egret.ByteArray)
    {
        SceneRobotNameCVO._cvos = [];
        var baseCount:number = bytes.readShort();
        let cvo:SceneRobotNameCVO;
        for (var i = 0; i < baseCount; i++)
        {
            cvo = new SceneRobotNameCVO();
            cvo.id = bytes.readShort();
            cvo.playerName = bytes.readUTF();
            SceneRobotNameCVO._cvos.push(cvo);
        }
    }

    public static getRandomName():string
    {
        let index:number = Math.floor(Math.random() * SceneRobotNameCVO._cvos.length);
        return SceneRobotNameCVO._cvos[index].playerName;
    }
}