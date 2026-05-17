/**
 * 场景特效表
 * liangyan
 * create 2018-01-02
*/
class SceneEffCVO
{
    public static TYPE_COMMON:number = 0;
    public static TYPE_TOWER:number = 1;
    public static TYPE_CHUAN_GONG:number = 2;
    public static TYPE_EXP_STATUE:number = 3;
    public static TYPE_BRIDGE:number = 4;
    public static TYPE_DRAGON:number = 5;

    private static _cvos:Object;

    public id:number;
    /**资源ID */
    public resID:number;
    /**名称 */
    public name:string;
    /** 0普通场景特效 1爬塔副本门 2传功法阵 3经验副本雕像 4新手剧情机关桥 5龙头*/
    public type:number;
    /**地图资源ID */
    public mapResID:number;
    /**坐标 */
    public position:egret.Point;
    /**水平翻转 */
    public flipH:boolean;
    /**模型宽 */
    public width:number;
    /**模型高 */
    public height:number;
    /**X偏移 */
    public offsetX:number;
    /**Y偏移 */
    public offsetY:number;
    /**触发半径 */
    public triggerRadius:number = 80;
    /**伸缩(不能与水平翻转同时设置) */
    public scale:number;
    /**脚本 */
    public script:string;

    private parseOne(data:egret.ByteArray):void
    {
        this.id = data.readInt();
        this.resID = data.readInt();
        this.name = data.readUTF();
        this.type = data.readByte();
        this.mapResID = data.readInt();
        this.position = new egret.Point(data.readShort(), data.readShort());
        this.flipH = data.readByte() == 1;
        this.width = data.readShort();
        this.height = data.readShort();
        this.offsetX = data.readShort();
        this.offsetY = data.readShort();
        this.scale = data.readByte();
        this.script = data.readUTF();
    }

    public get isTrainingEff():boolean{ return this.type == 2; }



    public static parse(bytes:egret.ByteArray):void
    {
        SceneEffCVO._cvos = {};
        let tableCount:number = bytes.readByte();
        let count:number = bytes.readShort();
        let cvo:SceneEffCVO;
        for (let i = 0; i < count; i++)
        {
            cvo = new SceneEffCVO();
            cvo.parseOne(bytes);
            SceneEffCVO._cvos[cvo.id] = cvo;
        }
    }

    public static getCVO(id:number):SceneEffCVO
    {
        return SceneEffCVO._cvos[id];
    }

    public static getCVOsByMapID(mapResID:number):SceneEffCVO[]
    {
        let result:SceneEffCVO[] = [];
        let cvo:SceneEffCVO;
        for (let key in SceneEffCVO._cvos)
        {
            cvo = SceneEffCVO._cvos[key];
            if(cvo.mapResID == mapResID) result.push(cvo);
        }
        return result;
    }
}