var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * tips Manager
 * 2017.11.6
 */
var TipsManager = (function () {
    function TipsManager() {
    }
    Object.defineProperty(TipsManager.prototype, "changeEquipTips", {
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
        get: function () {
            if (this._changeEquipTips == null) {
                this._changeEquipTips = Manager.pool.create(ChangeEquipTips);
            }
            return this._changeEquipTips;
        },
        set: function (value) {
            this._changeEquipTips = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param textContent 提示内容
     * @param okCallback 确定回调函数
     * @param isShowCancelBtn 是否显示取消按钮
     * @param cancelCallback 取消回调函数
     * @param data 需求传递的数据
    */
    TipsManager.prototype.showTips = function (textContent, okCallback, isShowCancelBtn, cancelCallback, data) {
        if (okCallback === void 0) { okCallback = null; }
        if (isShowCancelBtn === void 0) { isShowCancelBtn = false; }
        if (cancelCallback === void 0) { cancelCallback = null; }
        if (data === void 0) { data = null; }
        Manager.view.show(22 /* TipsView */, textContent, okCallback, isShowCancelBtn, cancelCallback, data);
    };
    return TipsManager;
}());
__reflect(TipsManager.prototype, "TipsManager");
//# sourceMappingURL=TipsManager.js.map