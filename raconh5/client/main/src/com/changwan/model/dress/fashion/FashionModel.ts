/**
 * 服饰model
 * luzh
 * create 2017-12-19
*/
class FashionModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
        Manager.control.getDress().fashionInit();
    }

    /**设置时间 星数 */
    private _curID:number = 0;
    public get curID():number{return this._curID;}
    public set curID(value:number)
    {
        if(this._curID == value) return;
        this._curID = value;
        this.dispatchEvent(new FashionEvent(FashionEvent.WEARING, this._curID));
    }

    public get hasCanActive():boolean
    {
        if(!OpenCVO.isOpen(OpenConst.ID_DRESS)) return false;
        let cvos = FashionCVO.getCvosByCareer(Manager.model.self.attrInfo.career);
        for(let i = 0; i < cvos.length; i++)
        {
            if(cvos[i].canActiveOrUp) return true;
        }
        return false;
    }

    /**默认选中 */
    public defaultData:FashionCVO;
}