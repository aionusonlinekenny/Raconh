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
 * 传功结束界面
 * Simon
 * 2018.1.16
 */
var ChuangongScussView = /** @class */ (function (_super) {
    __extends(ChuangongScussView, _super);
    function ChuangongScussView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.start();
        _this.addEvent();
        return _this;
    }
    ChuangongScussView.prototype.start = function () {
        _super.prototype.start.call(this);
        this.width = 720;
        this.height = 1280;
        this._bg = BitmapRes.create("result_bg_png", 4, 325, 713, 450);
        this._bg.scale9Grid = new egret.Rectangle(355, 37, 1, 6);
        this.addChild(this._bg);
        this._passImg = BitmapRes.create("cg_passImg_png", 149, 425, 422, 49);
        this.addChild(this._passImg);
        this._titleImg = BitmapRes.create("cg_jiangli_png", 124, 258, 472, 172);
        this.addChild(this._titleImg);
        this._btn = new Button();
        this._btn.skinName = "Button2Skin";
        this._btn.move(240, 643);
        this.addChild(this._btn);
        this._btnImg = BitmapRes.create("confirm_png", 269, 670, 181, 52);
        this.addChild(this._btnImg);
        this.onResizeHandler();
    };
    ChuangongScussView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ChuangongScussView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ChuangongScussView.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
    };
    ChuangongScussView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btn:
                Manager.view.hide(83 /* ChuangongScussView */);
                break;
        }
    };
    ChuangongScussView.prototype.show = function (data) {
        Manager.layer.tipImageLayer.addChild(this);
        if (data) {
            this._itemList = [];
            var list = data.list;
            if (!this._sp) {
                this._sp = new Sprite();
                this.addChild(this._sp);
            }
            this._sp.x = Math.round((720 - list.length * 141) / 2);
            this._sp.y = 500;
            for (var i = 0; i < list.length; i++) {
                if (data.trainingType == 1) {
                    var item = new ChuangongAwardItem();
                    item.removeObject(item.recommendImg, item.bei);
                    item.item.baseId = data.list[i].itemId;
                    item.item.bind = data.list[i].bind;
                    item.item.count = 1;
                    item.count.text = StringUtils.getBigNum(data.list[i].quantity);
                    this._sp.addChild(item);
                    this._itemList.push(item);
                }
                if (data.trainingType == 2) {
                    var item = new ChuangongAwardItem();
                    item.addObject(item.recommendImg);
                    item.bei.text = LangCVO.getContent("training2", 1.5);
                    item.item.baseId = data.list[i].itemId;
                    item.item.bind = data.list[i].bind;
                    item.item.count = 1;
                    item.count.text = StringUtils.getBigNum(data.list[i].quantity);
                    this._sp.addChild(item);
                    this._itemList.push(item);
                }
                if (data.trainingType == 3) {
                    var item = new ChuangongAwardItem();
                    item.x = 141 * i;
                    item.addObject(item.recommendImg);
                    if (data.list[i].itemId == ItemsConst.EXP)
                        item.bei.text = LangCVO.getContent("training2", 2);
                    else
                        item.bei.text = LangCVO.getContent("training3");
                    item.item.baseId = data.list[i].itemId;
                    item.item.bind = data.list[i].bind;
                    item.item.count = 1;
                    item.count.text = StringUtils.getBigNum(data.list[i].quantity);
                    this._sp.addChild(item);
                    this._itemList.push(item);
                }
            }
        }
    };
    ChuangongScussView.prototype.hide = function () {
        this.dispose();
    };
    ChuangongScussView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._bg, this._passImg, this._titleImg, this._btn, this._btnImg, this._sp);
        if (this._bg)
            Manager.pool.push(this._bg);
        this._bg = null;
        if (this._passImg)
            Manager.pool.push(this._passImg);
        this._passImg = null;
        if (this._titleImg)
            Manager.pool.push(this._titleImg);
        this._titleImg = null;
        if (this._btn)
            this._btn.dispose();
        this._btn = null;
        if (this._btnImg)
            Manager.pool.push(this._btnImg);
        this._btnImg = null;
        if (this._sp)
            Manager.pool.push(this._sp);
        this._sp = null;
        if (this._itemList) {
            for (var i = 0; i < this._itemList.length; i++) {
                this._itemList[i].dispose();
            }
            this._itemList = null;
        }
    };
    return ChuangongScussView;
}(Sprite));
//# sourceMappingURL=ChuangongScussView.js.map