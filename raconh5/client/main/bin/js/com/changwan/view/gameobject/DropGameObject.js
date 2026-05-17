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
 * drop对象信息类
 * luzh
 * update 2017-11-17
*/
var DropGameObject = /** @class */ (function (_super) {
    __extends(DropGameObject, _super);
    function DropGameObject() {
        return _super.call(this) || this;
    }
    DropGameObject.prototype.reuse = function (info) {
        this._dropInfo = info;
        _super.prototype.reuse.call(this, info);
    };
    DropGameObject.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        egret.Tween.removeTweens(this);
        if (this._pic) {
            Manager.pool.push(this._pic);
            this._pic = null;
        }
    };
    DropGameObject.prototype.drawAll = function () {
        // if(this._shadow)this.removeChild(this._shadow);
        this.move(this._info.x, this._info.y);
        //显示物品
        var path = Manager.path.getIconPath(this._dropInfo.item.imgId, ItemsConst.IMG_SIZE_BIG);
        this._pic = Manager.pool.create(BitmapRemote, path);
        this._pic.scaleX = this._pic.scaleY = 0.7;
        this.addChild(this._pic);
        // var angle = Math.random() * Math.PI;
        // this._pos0 = new Vector2D(this.x, this.y);
        // // let vDic:Vector2D = new Vector2D(50 + 100 * Math.random() - 100 * Math.sin(angle));//方向大小，最小50，随机0-100，上下大小
        // // vDic.angle = angle;
        // // this._pos1 = this._pos0.add(vDic);
        // // this._pos2 = new Vector2D(this._pos1.x, this._pos1.y + 100);
        // this._pos1 = new Vector2D(this._pos0.x, this._pos0.y - 200);
        // let vDic:Vector2D = new Vector2D(150 + 50 * Math.random() - 50 * Math.sin(angle));//方向大小，最小50，随机0-100，上下大小
        // vDic.angle = angle;
        // this._pos2 = this._pos0.add(vDic);
        var temX = this._info.x;
        var temY = this._info.y;
        var distance = 250; //* Math.random() + 50; 
        var radius = 180;
        var angle = Math.random() * Math.PI * 2;
        if (this._dropInfo.isGet) {
            egret.Tween.get(this).to({ x: temX + radius * Math.sin(angle) * Math.random() }, 600);
            egret.Tween.get(this).to({ y: temY - distance }, 300, egret.Ease.circOut)
                .to({ y: temY + radius * Math.cos(angle) * Math.random() }, 300, egret.Ease.bounceOut).wait(1000)
                .call(this.showFloatTips, this);
        }
        else {
            egret.Tween.get(this).to({ x: temX + radius * Math.sin(angle) * Math.random() }, 600);
            egret.Tween.get(this).to({ y: temY - distance }, 300, egret.Ease.circOut)
                .to({ y: temY + radius * Math.cos(angle) * Math.random() }, 300, egret.Ease.bounceOut)
                .to({ alpha: 0 }, 5000).call(this.onComplete, this);
        }
    };
    DropGameObject.prototype.showFloatTips = function () {
        FloatTips.addTips(LangCVO.getContent("item1") + HtmlUtil.addColorTag(this._dropInfo.item.name + " x " + this._dropInfo.count, Color.toColorStr(this._dropInfo.item.color)));
        egret.Tween.get(this).to({ x: Manager.model.self.x, y: Manager.model.self.y - 60 }, 250).call(this.onComplete, this);
    };
    DropGameObject.prototype.onComplete = function () {
        Manager.model.getGameobject().removeGameObject(this.info);
    };
    DropGameObject.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        egret.Tween.removeTweens(this);
        if (this._pic) {
            Manager.pool.push(this._pic);
            this._pic = null;
        }
        this._dropInfo = null;
    };
    return DropGameObject;
}(GameObject));
//# sourceMappingURL=DropGameObject.js.map