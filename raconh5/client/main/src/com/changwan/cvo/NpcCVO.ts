class NpcCVO extends BaseFindCVO
{
    private static _cvos:Object;

    //唯一id
    public id:number;
    //资源ID
    public url:number;
    //名称
    public name:string;
    //链接
    public link:string;
    //地图ID
    public mapID:number;
    //坐标
    public position:egret.Point;
    //水平翻转
    public flipH:boolean;
    //模型宽
    public width:number;
    //模型高
    public height:number;
    //水平位移
    public offsetX:number;
    //垂直位移
    public offsetY:number;
    //称号ID
    public title:number;
    //背景音乐
    public sound:number;
    //NPC头顶图标资源
    public iconRes:string;

    public constructor()
    {
        super();
    }

    public static parse(bytes:egret.ByteArray):void
    {
        NpcCVO._cvos = {};
        var tableCount:number = bytes.readByte();
        for (var i = 0; i < tableCount; i++)
        {
            var count:number = bytes.readShort();
            for (var j = 0; j < count; j++)
            {
                var item:NpcCVO = new NpcCVO();
                item.id = bytes.readInt();
                item.url = bytes.readInt();
                item.name = bytes.readUTF();
                item.link = bytes.readUTF();
                item.mapID = bytes.readInt();
                item.position = new egret.Point(bytes.readShort(), bytes.readShort());
                item.flipH = (bytes.readByte() == 1);
                item.width = bytes.readShort();
                item.height = bytes.readShort();
                item.offsetX = bytes.readShort();
                item.offsetY = bytes.readShort();
                item.title = bytes.readInt();
                item.iconRes = bytes.readUTF();
                item.sound = bytes.readInt();
                NpcCVO._cvos[item.id] = item;
            }
        }
    }

    public static getCVO(id):NpcCVO
    {
        if(!NpcCVO._cvos) return null;
        return NpcCVO._cvos[id];
    }

    public static getCVOsAtMap(mapID:number):NpcCVO[]
    {
        let result:NpcCVO[] = [];
        let cvo:NpcCVO;
        for (let key in NpcCVO._cvos)
        {
            cvo = NpcCVO._cvos[key];
            if(cvo.mapID == mapID) result.push(cvo);
        }
        return result;
    }
}