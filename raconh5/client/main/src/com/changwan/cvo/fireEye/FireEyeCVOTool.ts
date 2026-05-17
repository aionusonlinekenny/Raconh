/**
 * 
 * liangyan
 * create 2018-03-27
*/
class FireEyeCVOTool
{
    public static parse(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readByte();
        for(let i:number = 0 ; i < tableCount; i ++)
        {
            if(i == 0) FireEyeLevelCVO.parse(bytes);
            else if(i == 1) FireEyeItemCVO.parse(bytes);
            else if(i == 2) FireEyeConfigCVO.parse(bytes);
        }
    }
}