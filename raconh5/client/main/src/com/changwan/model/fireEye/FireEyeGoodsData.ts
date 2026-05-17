/**
 * 火眼金睛物品数据
 * liangyan
 * create 2018-03-26
*/
class FireEyeGoodsData
{
    /**唯一id */
    public uniqueID:number;
    
    private _cvoID:number;
    private _cvo:FireEyeItemCVO;
    public set cvoID(value:number)
    {
        if(this._cvoID == value) return;
        this._cvoID = value;
        this._cvo = FireEyeItemCVO.getCVOByID(this._cvoID);
    }
    /**表数据 */
    public get cvo():FireEyeItemCVO
    {
        return this._cvo;
    }
    /**x坐标 */
    public x:number;
    /**y坐标 */
    public y:number;
    /**缩放 */
    public scale:number;
    /**旋转 */
    public rotation:number;
    /**选中 */
    public selected:boolean;
}