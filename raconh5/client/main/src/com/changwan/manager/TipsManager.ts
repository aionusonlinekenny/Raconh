/**
 * pzx 
 * tips Manager
 * 2017.11.6
 */
class TipsManager
{
    /**bag Tips */
    // private _bagItemsTips:ItemsTips;
    /** 使用 tips*/
    // private _useItemsTips:UseItemsTips;
    /** 装备 tips*/
    // private _bagEquipTips:EquipTips;
    /** 更换装备 tips */
    private _changeEquipTips:ChangeEquipTips;
    
    private  _tips:TipsView;

    public constructor()
    {
    }
    // public get getItemsTips():ItemsTips
    // {
    //     if(this._bagItemsTips== null)
    //     {
    //         this._bagItemsTips = new ItemsTips();
    //     }
    //     return this._bagItemsTips;
    // }
    // public get useItemsTips():UseItemsTips
    // {
    //     if(this._useItemsTips== null)
    //     {
    //         this._useItemsTips = new UseItemsTips;
    //     }
    //     return this._useItemsTips;
    // }

    // public get getEquipTips():EquipTips
    // {
    //     if(this._bagEquipTips==null)
    //     {
    //         this._bagEquipTips = new EquipTips;
    //     }
    //     return this._bagEquipTips;
    // }

    public get changeEquipTips():ChangeEquipTips
    {
        if(this._changeEquipTips==null)
        {
            this._changeEquipTips = Manager.pool.create(ChangeEquipTips);
        }
        return this._changeEquipTips;
    }

    public set changeEquipTips(value:ChangeEquipTips)
    {
        this._changeEquipTips = value;
    }

    /** 
	 * @param textContent 提示内容
	 * @param okCallback 确定回调函数
	 * @param isShowCancelBtn 是否显示取消按钮
	 * @param cancelCallback 取消回调函数
	 * @param data 需求传递的数据
    */
    public showTips(textContent:string, okCallback:CallBackInfo = null, isShowCancelBtn:boolean = false, cancelCallback:CallBackInfo = null, data:any = null):void
    {
        Manager.view.show(ViewID.TipsView, textContent, okCallback, isShowCancelBtn, cancelCallback, data);
    }
}