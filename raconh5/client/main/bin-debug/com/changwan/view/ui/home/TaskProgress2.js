var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 17.11.10
 * 任务进度条
 * @devil 2018-04-17
 */
var TaskProgress2 = (function () {
    function TaskProgress2(homeImageLayer, homeLayer) {
        this._homeImageLayer = ObjectUtil.createConainer();
        homeImageLayer.addChild(this._homeImageLayer);
        this._homeLayer = ObjectUtil.createConainer();
        homeLayer.addChild(this._homeLayer);
        this._back = BitmapRes.create("task_jinduBg_png", 1, 1);
        this._homeImageLayer.addChild(this._back);
        this._barImg = BitmapRes.create("task_jindu_png", 5, 4);
        this._barImg.height = 14;
        this._barImg.scale9Grid = new egret.Rectangle(13, 1, 82, 11);
        this._homeImageLayer.addChild(this._barImg);
        this._proTxt = TextField.create(70, 19, 0xfff7e7, 20, "center");
        this._proTxt.move(24, 1);
        this._homeLayer.addChild(this._proTxt);
        this._barW = 108;
    }
    TaskProgress2.prototype.move = function (x, y) {
        this._homeImageLayer.x = x;
        this._homeImageLayer.y = y;
        this._homeLayer.x = x;
        this._homeLayer.y = y;
    };
    /**
     *  value 当前进度
     *  totalPro 总进度
     */
    TaskProgress2.prototype.setData = function (value, totolPro) {
        if (this._pro == value && this._totlaPro == totolPro)
            return;
        this._pro = value;
        this._totlaPro = totolPro;
        Manager.render.add(this.drawView, this, 0, 1);
    };
    TaskProgress2.prototype.drawView = function () {
        if (this._pro > this._totlaPro) {
            this._pro = this._totlaPro;
        }
        this._proTxt.text = this._pro + "/" + this._totlaPro;
        var c = this._pro / this._totlaPro;
        this._barImg.setWidth(this._barW * c);
    };
    TaskProgress2.prototype.dispose = function () {
        Manager.pool.push(this._back);
        this._back = null;
        Manager.pool.push(this._barImg);
        this._barImg = null;
        Manager.pool.push(this._proTxt);
        this._proTxt = null;
        this._homeLayer.parent.removeChild(this._homeLayer);
        this._homeLayer = null;
        this._homeImageLayer.parent.removeChild(this._homeImageLayer);
        this._homeImageLayer = null;
        Manager.render.remove(this.drawView, this);
    };
    return TaskProgress2;
}());
__reflect(TaskProgress2.prototype, "TaskProgress2", ["cw.IDispose"]);
//# sourceMappingURL=TaskProgress2.js.map