/***
 * pzx
 * 17.11.10
 * 人物资源Items
 * @update 2018-04-17
 */
var PlayerResItems2 = /** @class */ (function () {
    function PlayerResItems2(homeImageLayer, homeLayer, size) {
        if (size === void 0) { size = PlayerResItems2.ICON_SIZE_54; }
        this._type = "icon";
        this.sign = "x ";
        this.color = "#ffffff";
        this._homeImageLayer = ObjectUtil.createConainer();
        homeImageLayer.addChild(this._homeImageLayer);
        this._homeLayer = ObjectUtil.createConainer();
        homeLayer.addChild(this._homeLayer);
        this._resImg = BitmapRes.create("", 0, 0, size, size);
        this._iconSize = size;
        this._homeImageLayer.addChild(this._resImg);
        this._countTxt = TextField.create(122, 32, 0xffffff, 20);
        this._countTxt.move(30, 15);
        this._homeLayer.addChild(this._countTxt);
        this._drawType = false;
        this._drawCount = false;
    }
    PlayerResItems2.prototype.move = function (x, y) {
        this._homeLayer.x = x;
        this._homeLayer.y = y;
        this._homeImageLayer.x = x;
        this._homeImageLayer.y = y;
    };
    PlayerResItems2.prototype.setData = function (arg) {
        if (arg == null)
            return;
        if (arg.type == GainLossVO.ITEM)
            return;
        this.setType(arg.type.split("_")[0]);
        this.setCount(arg.num);
    };
    PlayerResItems2.prototype.setType = function (value) {
        if (value == this._type)
            return;
        this._type = value;
        this._drawType = true;
        this.dispatchRender();
    };
    PlayerResItems2.prototype.setCount = function (value) {
        if (this._count == value)
            return;
        this._count = value;
        this._drawCount = true;
        this.dispatchRender();
    };
    PlayerResItems2.prototype.dispatchRender = function () {
        Manager.render.add(this.draw, this, 0, 1);
    };
    PlayerResItems2.prototype.draw = function () {
        if (this._drawType)
            this.drawType();
        if (this._drawCount)
            this.drawCount();
        this._drawType = false;
        this._drawCount = false;
    };
    PlayerResItems2.prototype.dispose = function () {
        if (this._resImg) {
            Manager.pool.push(this._resImg);
            this._resImg = null;
        }
        Manager.pool.push(this._countTxt);
        this._countTxt = null;
        this._homeLayer.parent.removeChild(this._homeLayer);
        this._homeLayer = null;
        this._homeImageLayer.parent.removeChild(this._homeImageLayer);
        this._homeImageLayer = null;
        Manager.render.remove(this.draw, this);
    };
    PlayerResItems2.prototype.drawType = function () {
        this._resImg.source = "playRes_" + this._type + "_54_png";
        this._resImg.x = 0;
        this._resImg.y = 0;
        this._countTxt.x = this._iconSize;
        if (this._iconSize == PlayerResItems.ICON_30)
            this._countTxt.y = 3;
        else if (this._iconSize == PlayerResItems.ICON_54)
            this._countTxt.y = 15;
    };
    PlayerResItems2.prototype.drawCount = function () {
        var str = HtmlUtil.addColorTag(this.sign + StringUtils.getBigNum(this._count), this.color);
        HtmlUtil.setTextFlow(this._countTxt, str);
        this._w = this._iconSize + this._countTxt.textWidth;
    };
    PlayerResItems2.prototype.getWidth = function () {
        return this._w;
    };
    PlayerResItems2.prototype.getHeight = function () {
        return this._iconSize;
    };
    PlayerResItems2.prototype.setFontSize = function (value) {
        this._countTxt.size = value;
    };
    PlayerResItems2.ICON_SIZE_30 = 30;
    PlayerResItems2.ICON_SIZE_54 = 54;
    return PlayerResItems2;
}());
//# sourceMappingURL=PlayerResItems2.js.map