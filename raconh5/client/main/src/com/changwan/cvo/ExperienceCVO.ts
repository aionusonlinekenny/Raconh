/**
 * 经验表
 */
class ExperienceCVO
{
    private _data = {};

    public parse(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readShort();
        let info:ExperienceInfo;
        for(let i:number = 0; i < tableCount; i++)
        {
            info = new ExperienceInfo(bytes);
            this._data[info.level] = info;
        }
    }

    public getLevel(level:number):ExperienceInfo
    {
        return this._data[level];
    }
}

class ExperienceInfo
{
    //等级
    public level:number;
    //经验
    public exp:number;
    //总经验
    public totalExp:number;

    public constructor(bytes:egret.ByteArray)
    {
        if(bytes)
        {
            this.level = bytes.readShort();
            this.exp = bytes.readDouble();
            this.totalExp = bytes.readDouble();
        }
    }
}