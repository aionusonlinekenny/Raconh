/**
 * 服饰星数模板表
 * luzh
 * create 2017-12-18
*/
class FashionStarCVO
{
    public static MAX_STAR:number = 0;
    private static _cvos:Object;

    /**时装id */
	public id:number; 
    /**星数 */
	public star:number; 
    /**升星消耗 */
	public loss:GainLossVO; 
    /**属性 */
    public attrStr:String;
    /**属性 */
    private _attrVo:AttrVO
    public get attrVo():AttrVO
    {
        if(this._attrVo == null) this._attrVo = Manager.pool.create(AttrVO, this.attrStr);
        return this._attrVo;
    }

	public static parse(bytes:egret.ByteArray):void
	{
		FashionStarCVO._cvos = {};
        let tableCount:number = bytes.readShort();
        let cvo:FashionStarCVO;
        for (let i = 0; i < tableCount; i++)
        {
            cvo = new FashionStarCVO();
            cvo.id = bytes.readShort();
            cvo.star = bytes.readByte();
            cvo.loss = new GainLossVO(bytes.readUTF());
            cvo.attrStr = bytes.readUTF();
            FashionStarCVO._cvos[cvo.id + "_" + cvo.star] = cvo;
            if(cvo.star > FashionStarCVO.MAX_STAR) FashionStarCVO.MAX_STAR = cvo.star;
        }
	}

		
	public static getCVO(id:number, star:number):FashionStarCVO
	{
        let key:string = id + "_" + star;
		if(this._cvos[key]) return this._cvos[key];
		return null;
	}
}