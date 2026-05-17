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
 * 火眼金睛画布
 * liangyan
 * create 2018-03-28
*/
var FireEyeCanvas = (function (_super) {
    __extends(FireEyeCanvas, _super);
    function FireEyeCanvas() {
        var _this = _super.call(this) || this;
        _this.ELEMENT = "element";
        _this.start();
        _this.touchChildren = true;
        return _this;
    }
    FireEyeCanvas.prototype.start = function () {
        _super.prototype.start.call(this);
        this.width = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_CANVAS_WIDTH).value;
        this.height = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_CANVAS_HEIGHT).value;
        if (this._back == null) {
            this._back = Manager.pool.create(BitmapRes, "common_back3_png");
            this._back.width = this.width;
            this._back.height = this.height;
            this._back.alpha = 0;
            this.addChild(this._back);
        }
        if (this._label == null) {
            this._label = Manager.pool.create(BitmapRes, "fireEye_label_stop_png");
            this._label.x = (this.width - 171) / 2;
            this._label.y = this.height - 48;
            this.addChild(this._label);
        }
    };
    FireEyeCanvas.prototype.createNew = function () {
        Manager.render.remove(this.createNew, this);
        ObjectUtil.remove(this._deleteItem);
        if (this._deleteItem)
            Manager.pool.push(this._deleteItem);
        this._deleteItem = null;
        var element = Manager.pool.create(FireEyeElement, this._newData);
        element.x = this._newData.x;
        element.y = this._newData.y;
        element.touchEnabled = true;
        this.addChild(element);
        this._elements.push(element);
        Manager.model.getFireEye().curGoodsDatas.push(this._newData);
    };
    FireEyeCanvas.prototype.clear = function () {
        var len = this._elements ? this._elements.length : 0;
        for (var i = 0; i < len; i++) {
            ObjectUtil.remove(this._elements[i]);
            Manager.pool.push(this._elements[i]);
            this._elements[i] = null;
        }
        this._elements.length = 0;
    };
    FireEyeCanvas.prototype.drawStatus = function (id, newData) {
        var status = newData != null;
        var len = this._elements ? this._elements.length : 0;
        var element;
        for (var i = 0; i < len; i++) {
            element = this._elements[i];
            if (element.data == null)
                continue;
            if (element.data.uniqueID == id) {
                var offset = 86 / 2 * this._datas[i].scale / 100;
                var sign = Manager.pool.create(FireEyeStatus, status);
                sign.x = element.x - offset;
                sign.y = element.y - offset;
                this.addChild(sign);
                if (status) {
                    this._newData = newData;
                    this._deleteItem = element;
                    this._elements.slice(i, 1);
                    Manager.model.getFireEye().curGoodsDatas.slice(i, 1);
                    Manager.render.add(this.createNew, this, 500, 1);
                }
                break;
            }
        }
    };
    FireEyeCanvas.prototype.reuse = function () {
        this._datas = Manager.model.getFireEye().curGoodsDatas;
        _super.prototype.reuse.call(this);
        if (this._elements == null)
            this._elements = [];
        this.clear();
        var len = this._datas ? this._datas.length : 0;
        var element;
        var data;
        for (var i = 0; i < len; i++) {
            data = this._datas[i];
            element = Manager.pool.create(FireEyeElement, data);
            element.x = data.x;
            element.y = data.y;
            element.touchEnabled = true;
            this.addChild(element);
            this._elements.push(element);
        }
    };
    FireEyeCanvas.prototype.unuse = function () {
        Manager.render.remove(this.createNew, this);
        _super.prototype.unuse.call(this);
        this.clear();
        ObjectUtil.removes(this._back, this._label);
        if (this._back)
            Manager.pool.push(this._back);
        this._back = null;
        if (this._label)
            Manager.pool.push(this._label);
        this._label = null;
        this._datas = null;
        this._newData = null;
        if (this._deleteItem)
            Manager.pool.push(this._deleteItem);
        this._deleteItem = null;
    };
    FireEyeCanvas.prototype.dispose = function () {
        Manager.render.remove(this.createNew, this);
        this.clear();
        ObjectUtil.removes(this._back, this._label);
        if (this._back)
            Manager.pool.push(this._back);
        this._back = null;
        if (this._label)
            Manager.pool.push(this._label);
        this._label = null;
        this._datas = null;
        this._newData = null;
        if (this._deleteItem)
            Manager.pool.push(this._deleteItem);
        this._deleteItem = null;
    };
    return FireEyeCanvas;
}(RenderSprite));
__reflect(FireEyeCanvas.prototype, "FireEyeCanvas");
//# sourceMappingURL=FireEyeCanvas.js.map