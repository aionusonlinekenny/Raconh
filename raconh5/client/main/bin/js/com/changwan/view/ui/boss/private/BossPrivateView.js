var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 个人boss界面
 * luzh
 * create 2017-12.25
*/
var BossPrivateView = /** @class */ (function (_super) {
    __extends(BossPrivateView, _super);
    function BossPrivateView() {
        var _this = _super.call(this) || this;
        // this.skinName = Manager.path.getSkinName("boss", "BossPrivateViewSkin");
        _this.dispatchEvent(new eui.UIEvent(eui.UIEvent.COMPLETE)); //
        _this.touchChildren = true;
        return _this;
    }
    BossPrivateView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getBoss();
        this._cvos = CopyCVO.getCVOsByType(CopyConst.TYPE_BOSS_PRIVATE);
        this._list = new BaseVScrollerList();
        this._list.x = 5;
        this._list.y = 122;
        this._list.width = 710;
        this._list.height = 1010;
        this.addChild(this._list);
        this._list.initBtnListData(BossPrivateItem, null, true);
        this._list.itemList.layout.gap = 13;
        this.drawList();
    };
    BossPrivateView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.updateList, this);
    };
    BossPrivateView.prototype.removeEvent = function () {
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.updateList, this);
        _super.prototype.removeEvent.call(this);
    };
    BossPrivateView.prototype.updateList = function (e) {
        if (e.params.type == CopyConst.TYPE_BOSS_PRIVATE) {
            this.invalidate("drawList");
        }
    };
    BossPrivateView.prototype.drawList = function () {
        this._cvos.sort(function (a, b) {
            if (a.leftNum > 0 && b.leftNum == 0)
                return -1;
            if (a.leftNum == 0 && b.leftNum > 0)
                return 1;
            return (a.id > b.id ? 1 : -1);
            // let isOpen1:boolean = a.isCondSatisfy([ConditionVO.LEVEL, ConditionVO.REIN]);
            // let isOpen2:boolean = b.isCondSatisfy([ConditionVO.LEVEL, ConditionVO.REIN]);
            // if(isOpen1 && !isOpen2) return -1;
            // if(!isOpen1 && isOpen2) return 1;
            // if(isOpen1) return (a.id < b.id ? 1 : -1); 
            // else  return (a.id < b.id ? -1 : 1); 
        });
        this._list.dataProvider(this._cvos);
    };
    BossPrivateView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawList"))
            this.drawList();
    };
    BossPrivateView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawList();
    };
    BossPrivateView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.dispose(this._list);
        this._model = null;
        this._cvos = null;
        this._list = null;
    };
    return BossPrivateView;
}(UIComponent));
//# sourceMappingURL=BossPrivateView.js.map