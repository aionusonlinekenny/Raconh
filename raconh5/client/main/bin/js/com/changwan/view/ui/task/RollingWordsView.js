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
 * 新手剧情滚动字幕
 * liangyan
 * create 2018-03-12
*/
var RollingWordsView = /** @class */ (function (_super) {
    __extends(RollingWordsView, _super);
    function RollingWordsView() {
        return _super.call(this) || this;
    }
    RollingWordsView.prototype.show = function () {
        if (!this.parent) {
            this._msgs = LangCVO.getContent("copy27").split("");
            this._words = new Label();
            this._words.width = 700;
            this._words.textAlign = "left";
            this._words.lineSpacing = 10;
            this._words.fontFamily = Manager.config.defaultFont;
            this._words.size = 30;
            this.onResizeHandler(null);
            this.addChild(this._words);
            Manager.render.add(this.render, this, 90);
            Manager.view.setModalAlpha(1);
            Manager.layer.tipsLayer.addChild(this);
            GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        }
    };
    RollingWordsView.prototype.onResizeHandler = function (e) {
        if (this._words) {
            this._words.x = Math.round(Manager.global.gameMain.stage.stageWidth - this._words.width) / 2;
            this._words.y = Math.round(Manager.global.gameMain.stage.stageHeight - this._words.height) / 2;
        }
    };
    RollingWordsView.prototype.render = function (interval) {
        if (this._words == null)
            return;
        this._words.appendText(this._msgs.shift());
        if (this._msgs.length <= 0) {
            Manager.render.remove(this.render, this);
            Manager.render.add(this.render2, this, 2000, 1);
        }
    };
    RollingWordsView.prototype.render2 = function (interval) {
        Manager.render.remove(this.render2, this);
        Manager.view.hide(127 /* RollingWordsView */);
    };
    RollingWordsView.prototype.hide = function () {
        Manager.control.getMap().cmdEnterMap(6001);
        Manager.view.setModalAlpha(0.8);
        if (this.parent)
            this.dispose();
    };
    RollingWordsView.prototype.dispose = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        Manager.render.remove(this.render, this);
        Manager.render.remove(this.render2, this);
        this._words.dispose();
        this._words = null;
        this._msgs = null;
    };
    return RollingWordsView;
}(egret.DisplayObjectContainer));
//# sourceMappingURL=RollingWordsView.js.map