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
 * 神器
 * pzx
 * create 18.3.8
 */
var RelicStuffView = (function (_super) {
    __extends(RelicStuffView, _super);
    function RelicStuffView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("relicStuff", "RelicStuffViewSkin");
        return _this;
    }
    RelicStuffView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._itemList = [this._item0, this._item1, this._item2, this._item3];
        this._resList = [];
        this._model = Manager.model.getrelicstuff();
        if (!this._container) {
            this._container = Manager.pool.create(egret.DisplayObjectContainer);
            this._container.x = this._bodyBit.x;
            this._container.y = this._bodyBit.y;
            this.addChild(this._container);
        }
        if (!this._fighting) {
            this._fighting = Manager.pool.create(NumImgView2);
            this._fighting.x = 280;
            this._fighting.y = 899;
            this.addChild(this._fighting);
        }
    };
    RelicStuffView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this._datas = RelicStuffCVO.cvos();
        for (var i = 0; i < this._datas.length; i++) {
            this._curCvo = this._datas[i];
            this._page = i;
            if (!this._curCvo.isActivity()) {
                break;
            }
        }
        this.drawData();
        this.updateGrayFilter();
        //引导
        if (Manager.model.getGuide().curID == GuideID.RELIC_PIECE) {
            //碎片1
            this._guideItem = this._itemList ? this._itemList[0] : null;
            if (!this._guideItem || !this._guideItem.visible) {
                Manager.control.getTask().hideGuide();
                return;
            }
            var pos = this._guideItem.parent.localToGlobal(this._guideItem.x, this._guideItem.y);
            Manager.control.getTask().showGuide(pos, this._guideItem.width >> 1, this._guideItem.height >> 1, this.guideCB, this, false);
        }
        if (Manager.model.getGuide().curID == GuideID.RELIC_ACTIVE) {
            //碎片2
            this._guideItem = this._itemList ? this._itemList[1] : null;
            if (!this._guideItem || !this._guideItem.visible) {
                Manager.control.getTask().hideGuide();
                return;
            }
            var pos = this._guideItem.parent.localToGlobal(this._guideItem.x, this._guideItem.y);
            Manager.control.getTask().showGuide(pos, this._guideItem.width >> 1, this._guideItem.height >> 1, this.guideCB, this, false);
        }
    };
    RelicStuffView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._leftImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpdatePageHandler, this);
        this._rightImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpdatePageHandler, this);
        this._model.addEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT, this.onActivityReturn, this);
        this._actBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendActivityHandler, this);
        this._attrImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRelicStuffAttrViewHandler, this);
    };
    RelicStuffView.prototype.removeEvent = function () {
        this._leftImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpdatePageHandler, this);
        this._rightImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpdatePageHandler, this);
        this._model.removeEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT, this.onActivityReturn, this);
        this._actBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendActivityHandler, this);
        this._attrImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRelicStuffAttrViewHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    RelicStuffView.prototype.onRelicStuffAttrViewHandler = function () {
        Manager.view.show(124 /* RelicStuffAttrView */, this._curCvo);
    };
    //请求升级神器
    RelicStuffView.prototype.onSendActivityHandler = function () {
        Manager.control.getRelicstuff().activity(this._curCvo.id, RelicStuffType.RELICSTUFF_TYPE);
    };
    /** 激活成功返回 */
    RelicStuffView.prototype.onActivityReturn = function (e) {
        var type = e.params.type;
        this.drawData();
        if (type == RelicStuffType.RELICSTUFF_TYPE) {
            this._curCvo = RelicStuffCVO.cvo(e.params.id);
            Manager.view.show(125 /* RelicStuffCuccessView */, this._curCvo);
        }
    };
    RelicStuffView.prototype.onTouchUpdatePageHandler = function (e) {
        var obj = e.target;
        if (obj == this._leftImg) {
            if (this._page == 0) {
                return;
            }
            this._page--;
        }
        if (obj == this._rightImg) {
            if (this._page >= this._datas.length - 1) {
                return;
            }
            this._page++;
        }
        this._curCvo = this._datas[this._page];
        this.drawData();
        this.updateGrayFilter();
    };
    RelicStuffView.prototype.updateGrayFilter = function () {
        if (this._page == 0) {
            FilterUtil.setGrayFilter(this._leftImg);
        }
        else if (this._leftImg.filters) {
            this._leftImg.filters = null;
        }
        if (this._page == this._datas.length - 1) {
            FilterUtil.setGrayFilter(this._rightImg);
        }
        else if (this._rightImg.filters) {
            this._rightImg.filters = null;
        }
    };
    RelicStuffView.prototype.clearAni = function () {
        if (this._ani) {
            Manager.pool.push(this._ani);
            this._ani = null;
        }
    };
    RelicStuffView.prototype.drawData = function () {
        this._nameBit.load(Manager.path.getRelicStuffPath("label/name" + this._curCvo.id));
        this._hengfuBit.load(Manager.path.getRelicStuffPath("label/zi" + this._curCvo.id));
        this._fighting.setValue(this._curCvo.getFightNum(), "nums_fighting_", 25);
        this._redIcon.visible = false;
        this._actBtn.visible = false;
        this.updateDebrisList();
        this.clearAni();
        if (this._curCvo.isActivity()) {
            //已激活
            //Manager.view.show(ViewID.RelicStuffCuccessView,this._curCvo);
            this._spGroup.visible = true;
            this._actImg.visible = false;
            this._bodyBit.visible = false;
            var arr = this._curCvo.ani_id.split("/");
            this._ani = Manager.animation.createPanelGlobalAnimation(this._curCvo.ani_id, arr[arr.length - 1]);
            this._ani.y = 116;
            this._ani.x = 5;
            var points = this._curCvo.point.split("|");
            this._ani.x = this._ani.x + Number(points[0]);
            this._ani.y = this._ani.y + Number(points[1]);
            this.addChildAt(this._ani, 3);
            this._container.visible = false;
        }
        else {
            this._container.visible = true;
            this._bodyBit.visible = true;
            this._bodyBit.load(Manager.path.getRelicStuffPath("body/body" + this._curCvo.id));
            this._actImg.visible = true;
            if (this._curCvo.checkIsActivity()) {
                this._actBtn.visible = true;
                this._spGroup.visible = false;
                this._redIcon.visible = true;
            }
            else {
                //this.updateDebrisList();
                this._spGroup.visible = true;
            }
        }
    };
    //刷新碎片
    RelicStuffView.prototype.updateDebrisList = function () {
        var list = this._curCvo.getDebrisList();
        //this._completeIndex = 0;
        for (var i = this._itemList.length - 1; i > -1; i--) {
            var item = this._itemList[i];
            if (list[i]) {
                item.setData(list[i]);
                item.visible = true;
                if (list[i].isActivity()) {
                    //this._completeIndex++;
                    this.updateBody(list[i], i);
                }
                else {
                    if (this._resList[i]) {
                        Manager.pool.push(this._resList[i]);
                        this._resList[i] = null;
                    }
                }
            }
            else {
                item.visible = false;
            }
        }
        if (this._itemList.length > 2) {
            this._spGroup.y = 998;
        }
        else {
            this._spGroup.y = 1018;
        }
    };
    RelicStuffView.prototype.updateBody = function (cvo, i) {
        var res;
        if (this._resList[i]) {
            res = this._resList[i];
        }
        else {
            res = Manager.pool.create(BitmapRemote);
            this._resList[i] = res;
            res.x = 0;
            res.y = 0;
            this._container.addChild(res);
        }
        res.load(Manager.path.getRelicStuffPath("debris/debris" + cvo.des_id));
        //res.load(Manager.path.getRelicStuffPath("debris/debris"+this.cvo.id),-1,-1,this.completeBitres,this);
    };
    // public completeBitres():void
    // {
    // 	this._completeIndex--;
    // 	if(this._completeIndex== 0)
    // 	{
    // 		this._container= Manager.pool.create(egret.DisplayObjectContainer);
    // 		for(let i:number = this._resList.length-1;i>-1;i--)
    // 		{
    // 			let res:BitmapRemote = this._resList[i];
    // 			if(res && res.getBitmap())
    // 			{
    // 				this._container.addChild(res);
    // 			}
    // 		}
    // 		this.drawBitmap();
    // 	}
    // }
    // private drawBitmap():void
    // {
    // 	let renderTexture = new RenderTexture();
    // 	renderTexture.drawToTexture(this._container);
    // 	if(this._bitmap.texture) this._bitmap.texture.dispose();
    // 	this._bitmap.texture = renderTexture;
    // 	this._bitmap.pixelHitTest = true;
    // 	if(this._container) Manager.pool.push(this._container);
    // 	this._container = null;
    // }
    /**引导激活墨宠 */
    RelicStuffView.prototype.guideActPet = function () {
        if (Manager.model.getGuide().curID == GuideID.RELIC_ACTIVE) {
            var pos = this._actBtn.parent.localToGlobal(this._actBtn.x, this._actBtn.y);
            Manager.control.getTask().showGuide(pos, this._actBtn.width >> 1, this._actBtn.height >> 1, this.callBack, this, false);
        }
    };
    RelicStuffView.prototype.callBack = function () {
        this.onSendActivityHandler();
        Manager.control.getTask().hideGuide();
    };
    RelicStuffView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    RelicStuffView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    RelicStuffView.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.disposes(this._bodyBit, this._hengfuBit, this._nameBit, this._actBtn);
            ObjectUtil.removes(this._leftImg, this._rightImg, this._actImg, this._attrImg, this._spGroup, this._redIcon);
        }
        this._bodyBit = null;
        this._leftImg = null;
        this._rightImg = null;
        this._hengfuBit = null;
        this._actImg = null;
        this._attrImg = null;
        this._nameBit = null;
        this._spGroup = null;
        this._item0 = null;
        this._item1 = null;
        this._item2 = null;
        this._item3 = null;
        this._actBtn = null;
        this._redIcon = null;
        this._datas = null;
        this._curCvo = null;
        this._itemList.forEach(function (item, i) {
            Manager.pool.push(item);
        });
        this._itemList = null;
        this._model = null;
        this._resList.forEach(function (itm, i) {
            if (itm)
                Manager.pool.push(itm);
        });
        this._resList = null;
        this._container = null;
        Manager.pool.push(this._fighting);
        this._fighting = null;
        this.clearAni();
        if (this._guideItem)
            Manager.pool.push(this._guideItem);
        this._guideItem = null;
    };
    RelicStuffView.prototype.guideCB = function () {
        Manager.view.show(124 /* RelicStuffAttrView */, this._guideItem.cvo);
    };
    RelicStuffView.prototype.dispose = function () {
        if (Manager.model.getGuide().curID == GuideID.RELIC_PIECE || Manager.model.getGuide().curID == GuideID.RELIC_ACTIVE) {
            Manager.control.getTask().hideGuide();
        }
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return RelicStuffView;
}(UIComponent));
__reflect(RelicStuffView.prototype, "RelicStuffView");
//# sourceMappingURL=RelicStuffView.js.map