class RoleExpCVO
{
    private static _cvos:Object;

    //等级
    public level:number;
    //经验值
    public exp:number;
    //总经验值
    public totalExp:number;

    public constructor()
    {}

    public static parse(bytes:egret.ByteArray):void
    {
        RoleExpCVO._cvos = {};
        var tableCount:number = bytes.readByte();
        for (var i = 0; i < tableCount; i++)
        {
            var count:number = bytes.readShort();
            for (var j = 0; j < count; j++)
            {
                var item:RoleExpCVO = new RoleExpCVO();
                item.level = bytes.readShort();
                item.exp = (bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
                item.totalExp = (bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
                RoleExpCVO._cvos[item.level] = item;
            }
        }
    }

    public static getCVO(level:number):RoleExpCVO
    {
        if(!RoleExpCVO._cvos) return null;
        return RoleExpCVO._cvos[level];
    }
}