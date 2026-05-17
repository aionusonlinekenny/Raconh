/**
 * 资源回收类型
 */
class ResourceGCType
{
    //一直存在于游戏内存中
    public static NEVER:number = 1;
    //直接从内存中GC
    public static NOW:number = 2;
    public static CVO:number = 3;
    public static MAP:number = 4;
    public static COMMON:number = 5;
    public static AVATAR:number = 6;//形象资源
    public static SOUND:number = 7;
    /**
     * 资源存在于内存的时间，以MS为单位
     * @params type ResourceGCType类型
     */
    public static getGCTime(type:number)
    {
        if(type == ResourceGCType.NOW)return 0;
        else if(type == ResourceGCType.CVO)return 0;
        else if(type == ResourceGCType.SOUND)return 0;
        // else if(type == ResourceGCType.MAP)return 60000;
        // else if(type == ResourceGCType.COMMON)return 60000;
        // else if(type == ResourceGCType.AVATAR)return 120000;
        // return 60000;
        else if(type == ResourceGCType.MAP) return 60000;
        else if(type == ResourceGCType.COMMON) return 60000;
        else if(type == ResourceGCType.AVATAR) return 60000*2;
        return 60000;
    }
}