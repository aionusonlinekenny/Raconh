var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
 * 聊天表情视图
 * liangyan
 * create 2017-11-13
*/
var ChatFaceBox = (function (_super) {
    __extends(ChatFaceBox, _super);
    function ChatFaceBox(fun, target) {
        var _this = _super.call(this) || this;
        _this.SPACE = 40;
        _this.FACE_NUM = 24;
        _this.ROW_COUNT = 6;
        _this.OFFSETX = 90;
        _this.OFFSETY = 5;
        _this.SCALE = 2;
        _this.skinName = "";
        _this._callback = fun;
        _this._target = target;
        _this.touchChildren = true;
        return _this;
    }
    ChatFaceBox.getInstance = function (fun, target) {
        if (fun === void 0) { fun = null; }
        if (target === void 0) { target = null; }
        if (this._instance == null)
            this._instance = new ChatFaceBox(fun, target);
        return this._instance;
    };
    ChatFaceBox.nullInstance = function () { this._instance = null; };
    ChatFaceBox.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (this._back == null) {
            this._back = new eui.Image();
            this._back.source = "main_chatBg_png";
            this._back.width = 720;
            this._back.height = 300;
            this.addChild(this._back);
        }
    };
    ChatFaceBox.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.global.gameMain.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStageHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ChatFaceBox.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.global.gameMain.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStageHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ChatFaceBox.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
    };
    ChatFaceBox.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawLayout();
    };
    ChatFaceBox.prototype.drawLayout = function () {
        if (this._faces != null)
            return;
        this._faces = new Array();
        for (var i = 0; i < this.FACE_NUM; i++) {
            var face = Manager.pool.create(Face, "" + (i + 1));
            var row = Math.floor(i / this.ROW_COUNT);
            var col = i % this.ROW_COUNT;
            face.scaleX = face.scaleY = this.SCALE;
            face.x = col * (Face.SIZE * face.scaleX + this.SPACE) + this.OFFSETX;
            face.y = row * (Face.SIZE * face.scaleY + this.SPACE / 2) + this.OFFSETY;
            this._faces.push(face);
            this.addChild(face);
        }
        // this.x = this._x;
        this.onResizeHandler(null);
        this.y = this._y - this._back.height - 20;
        // Manager.layer.uiLayer.addChild(this);
        this._needHide = false;
    };
    ChatFaceBox.prototype.onTouchHandler = function (e) {
        e.stopImmediatePropagation();
        var rect = new eui.Rect(this._back.width - this.OFFSETX * 2, this._back.height - this.OFFSETY * 2);
        var mx = e.localX - this.OFFSETX;
        var my = e.localY - this.OFFSETY;
        if (mx > rect.width || my > rect.height || mx < 0 || my < 0)
            return;
        if (mx == 0)
            mx = 1;
        if (my == 0)
            my = 1;
        var tw = Math.ceil(mx / (Face.SIZE * this.SCALE + this.SPACE));
        var th = Math.floor(my / (Face.SIZE * this.SCALE + this.SPACE / 2));
        var type = th * this.ROW_COUNT + tw;
        if (this._callback != null)
            this._callback("" + type, this._target);
    };
    ChatFaceBox.prototype.onClickStageHandler = function (e) {
        if (!this._needHide)
            this._needHide = true;
        else
            this.hide();
    };
    ChatFaceBox.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    Object.defineProperty(ChatFaceBox, "hasInstance", {
        get: function () {
            return (this._instance != null && this._instance.parent != null);
        },
        enumerable: true,
        configurable: true
    });
    ChatFaceBox.prototype.show = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (this.parent == null) {
            // this._x = this.x;
            this._y = y;
            this.invalidate(InvalidationType.LAYOUT);
            Manager.layer.tipsLayer.addChild(this);
        }
    };
    ChatFaceBox.prototype.hide = function () {
        if (this.parent != null)
            this.dispose();
    };
    ChatFaceBox.prototype.dispose = function () {
        ChatFaceBox.nullInstance();
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._back);
        this._back = null;
        if (this._faces != null) {
            var length_1 = this._faces.length;
            var item = void 0;
            for (var i = 0; i < length_1; i++) {
                item = this._faces[i];
                Manager.pool.push(item);
                item = null;
            }
            this._faces = null;
        }
        this._callback = null;
    };
    return ChatFaceBox;
}(UIComponent));
__reflect(ChatFaceBox.prototype, "ChatFaceBox");
//# sourceMappingURL=ChatFaceBox.js.map