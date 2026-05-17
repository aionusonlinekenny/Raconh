/**
 * 复活类型
 * liangyan
 * create 2017-12-06
*/
class ReviveType
{
    public static FREE_CD:number = 1;
	public static FREE_ALERT:number = 2;
	public static PAY_ALERT:number = 4;

	public static checkType(mapID:number, type:number):boolean
	{
		if(mapID <= 0) return false;
		let map = MapCVO.getCVO(mapID);
		if(!map) return false;
		return (map.reliveType & type) == type;
	}
}