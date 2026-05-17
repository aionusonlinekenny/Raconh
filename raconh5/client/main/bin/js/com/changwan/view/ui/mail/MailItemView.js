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
// 邮件子项
var MailItemView = /** @class */ (function (_super) {
    __extends(MailItemView, _super);
    function MailItemView() {
        var _this = _super.call(this) || this;
        _this._model = Manager.model.getMail();
        _this.skinName = Manager.path.getSkinName("mail", "MailItemViewSkin");
        return _this;
    }
    MailItemView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initEvent();
    };
    MailItemView.prototype.dataChanged = function () {
        var info = this.data;
        if (info == null)
            return;
        this._back.source = this.selected ? "common_wordBg_selected_png" : "common_wordBg_normal_png";
        this._titleTxt.text = info.title;
        this._dateTxt.text = cw.DateUtil.formatStr(info.date, cw.DateUtil.YYYY_MM_DD_HH_MM_SS);
        this._attachSign.visible = info.attachStatus == MailConst.UN_FETCH;
        this._unreadSign.visible = !info.hasRead;
        this._ilingquImg.visible = !this._attachSign.visible;
    };
    MailItemView.prototype.dispose = function () {
        this.removeEvent();
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._back, this._titleTxt, this._dateTxt, this._unreadSign, this._attachSign, this._ilingquImg);
        this._back = null;
        this._titleTxt = null;
        this._dateTxt = null;
        this._unreadSign = null;
        this._attachSign = null;
        this._model = null;
        this._ilingquImg = null;
    };
    MailItemView.prototype.initEvent = function () {
        this._model.addEventListener(MailEvent.HAS_READ_MAIL, this.onReadMailHandler, this);
        this._model.addEventListener(MailEvent.FETCH_ATTACH, this.onFetchMailHandler, this);
        this._model.addEventListener(MailEvent.MAIL_ALL_FETCH, this.onAllFetchMailHandler, this);
    };
    MailItemView.prototype.removeEvent = function () {
        this._model.removeEventListener(MailEvent.HAS_READ_MAIL, this.onReadMailHandler, this);
        this._model.removeEventListener(MailEvent.FETCH_ATTACH, this.onFetchMailHandler, this);
        this._model.removeEventListener(MailEvent.MAIL_ALL_FETCH, this.onAllFetchMailHandler, this);
    };
    MailItemView.prototype.setBgStyle = function (info) {
        if (this.data == info) {
            this._back.source = "common_wordBg_selected_png";
            // MailContentView.instance.show(this.data);
            Manager.view.show(4 /* MailContentView */, this.data);
        }
        else
            this._back.source = "common_wordBg_normal_png";
    };
    MailItemView.prototype.onReadMailHandler = function (e) {
        if (this.data == null || this.data == null)
            return;
        var readID = e.params;
        if (readID == this.data.uniqueID) {
            this._unreadSign.visible = !this.data.hasRead;
        }
    };
    MailItemView.prototype.onFetchMailHandler = function (e) {
        if (this.data == null || this.data == null)
            return;
        var ids = e.params;
        var length = ids.length;
        var id;
        for (var i = 0; i < length; i++) {
            id = ids[i];
            if (id == this.data.uniqueID) {
                this._attachSign.visible = this.data.attachStatus == MailConst.UN_FETCH;
                this._unreadSign.visible = !this.data.hasRead;
                this._ilingquImg.visible = !this._attachSign.visible;
                break;
            }
        }
    };
    MailItemView.prototype.onAllFetchMailHandler = function (e) {
        if (this.data == null || this.data == null)
            return;
        this._attachSign.visible = this.data.attachStatus == MailConst.UN_FETCH;
        this._unreadSign.visible = !this.data.hasRead;
        this._ilingquImg.visible = !this._attachSign.visible;
    };
    return MailItemView;
}(ItemRenderer));
//# sourceMappingURL=MailItemView.js.map