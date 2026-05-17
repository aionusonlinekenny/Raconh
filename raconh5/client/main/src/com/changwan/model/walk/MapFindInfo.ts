/**
 *author Anydo
 *create 2017-12-18
 *description 
*/
class MapFindInfo implements cw.IPool
{
    public pos:egret.Point;
    public cvo:BaseFindCVO;

    public reuse(tPos:egret.Point, tCvo:BaseFindCVO):void
	{
        this.pos = tPos;
        this.cvo = tCvo;
	}

	public unuse():void
	{
		this.pos = null;
		this.cvo = null;
	}

	public dispose():void
	{
		this.pos = null;
		this.cvo = null;
	}
}