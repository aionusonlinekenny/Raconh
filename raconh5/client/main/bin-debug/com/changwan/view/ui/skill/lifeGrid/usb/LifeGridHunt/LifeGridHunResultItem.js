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
var LifeGridHunResultItem = (function (_super) {
    __extends(LifeGridHunResultItem, _super);
    function LifeGridHunResultItem() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("lifeGrid/LifeGridHunt", "LifeGridHunResultItemSkin");
        return _this;
    }
    LifeGridHunResultItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    LifeGridHunResultItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    LifeGridHunResultItem.prototype.setData = function (data) {
        this._data = data;
        this.invalidate(InvalidationType.DATA);
    };
    LifeGridHunResultItem.prototype.drawData = function () {
        if (this._data == null)
            return;
        this._goods.count = this._data.quantity;
        var cvo = this._data.cvo;
        this._goods.data = this._data;
        var str = HtmlUtil.addColorTag(cvo.name, cvo.colorStr);
        HtmlUtil.setTextFlow(this._nameTxt, str);
        //let lifeCvo:LifeGridCVO = LifeGridCVO.getInfo(this._data.base_id,1);
        //let attrVOs:AttrVoInfo[];
        // if(lifeCvo) 
        // {
        // 	attrVOs = lifeCvo.attrVos();
        // 	if(attrVOs[0])
        // 	{
        // 		this._attrTxt.text = attrVOs[0].name;
        // 	}
        // 	else
        // 	{
        // 		this._attrTxt.text ="";
        // 	}
        // }
        // else
        // {
        // 	this._attrTxt.text ="";
        // }
    };
    LifeGridHunResultItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    LifeGridHunResultItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    LifeGridHunResultItem.prototype.removeEvent = function () {
        if (this._levAni)
            this._levAni.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    /** 翻放特效 */
    LifeGridHunResultItem.prototype.playAniEff = function () {
        if (this._levAni == null) {
            this._levAni = Manager.animation.createPanelLifeGridAnimation("lifeGridmgfj", "lifeGridPanel");
            this.addChild(this._levAni);
            this._levAni.x = this._goods.x - 79;
            this._levAni.y = this._goods.y - 77;
            this._levAni.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
        }
        else {
            this._levAni.visible = true;
            this._levAni.play();
        }
    };
    LifeGridHunResultItem.prototype.onShowBlastCompleteHandler = function () {
        this._levAni.visible = false;
    };
    LifeGridHunResultItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeChild(this._goods);
        Manager.pool.push(this._goods);
        this._goods = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        // this._attrTxt.dispose();
        // this._attrTxt=null;
        this._data = null;
        if (this._levAni) {
            Manager.pool.push(this._levAni);
            this._levAni = null;
        }
    };
    return LifeGridHunResultItem;
}(UIComponent));
__reflect(LifeGridHunResultItem.prototype, "LifeGridHunResultItem");
//# sourceMappingURL=LifeGridHunResultItem.js.map