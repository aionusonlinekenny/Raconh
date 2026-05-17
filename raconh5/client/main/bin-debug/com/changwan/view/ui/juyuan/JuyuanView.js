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
 * drq
 * 聚元
 * 2018.3.28
 */
var JuyuanView = (function (_super) {
    __extends(JuyuanView, _super);
    function JuyuanView() {
        var _this = _super.call(this) || this;
        _this._ballList = [];
        _this._aniList = [];
        _this._starList = [];
        _this._isUpdate = false;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("juyuan", "JuyuanViewSkin");
        return _this;
    }
    JuyuanView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        Manager.control.getJuyuan().senInitInfo();
        this._model = Manager.model.getJuyuan();
        if (!this._bimfont) {
            this._bimfont = Manager.pool.create(NumImgView2);
            this._bimfont.x = 640;
            this._bimfont.y = 240;
            this.addChild(this._bimfont);
        }
        if (!this._bimfont2) {
            this._bimfont2 = Manager.pool.create(NumImgView2);
            this._bimfont2.x = 296;
            this._bimfont2.y = 790;
            this.addChild(this._bimfont2);
        }
        this._starList = [this._star01, this._star02, this._star03, this._star04];
    };
    JuyuanView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(JuyuanEvent.JUYUAN_INFO_UPDATE, this.infoUpdate, this);
        this._model.addEventListener(JuyuanEvent.JUYUAN_PROGRESS_UPDATE, this.progessUpdate, this);
        this._tupoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tupPoClick, this);
        this._juyuanBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.juyuanClick, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.setItem, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.setItem, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.setBtn, this);
    };
    JuyuanView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._model.removeEventListener(JuyuanEvent.JUYUAN_INFO_UPDATE, this.infoUpdate, this);
        this._model.removeEventListener(JuyuanEvent.JUYUAN_PROGRESS_UPDATE, this.progessUpdate, this);
        this._tupoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tupPoClick, this);
        this._juyuanBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.juyuanClick, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.setItem, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.setItem, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.setBtn, this);
    };
    JuyuanView.prototype.tupPoClick = function () {
        var list = this._model.getCurList();
        if (list.consume) {
            var arr = GainLossVO.parse(list.consume);
            var item = arr[0].num;
            var yinbi = arr[1].num;
            var cur_item = Manager.model.getItems().getCountItemById(arr[0].baseId);
            var cur_yinbi = Manager.model.self.attrInfo.coin;
            if (item > cur_item) {
                FloatTips.addTips(LangCVO.getContent("juyuan3"), Color.RED);
                var shopCvo = ShopCVO.getbaseIdCvo(arr[0].baseId);
                Manager.view.show(33 /* ShopBuyView */, shopCvo);
            }
            else if (yinbi > cur_yinbi) {
                FloatTips.addTips(LangCVO.getContent("juyuan4"), Color.RED);
            }
            else {
                Manager.control.getJuyuan().sendProgress(1, list.id);
            }
        }
        else {
            Manager.control.getJuyuan().sendProgress(1, list.id);
        }
    };
    JuyuanView.prototype.juyuanClick = function () {
        var list = this._model.getCurList();
        Manager.control.getJuyuan().sendProgress(2, list.id);
        Manager.view.hide(145 /* GfgPanel */);
    };
    JuyuanView.prototype.infoUpdate = function () {
        this.createGodAni();
        var list = this._model.getCurList();
        this.setItem();
        //阶
        this._bimfont.setValue(list.step, "nums_golden_", 15);
        //战力
        var cvo = JuyuanCVO.getCvo();
        var attr = cvo[list.sort_id - 1].t_attr;
        var attvo = Manager.pool.create(AttrVO, attr);
        var numfight = attvo.getFighting();
        Manager.pool.push(attvo);
        this._bimfont2.setValue(numfight, "nums_fighting_", 25);
        //星星
        this.setStar(list.star);
        this.createBall();
        this.setBallAni(list);
        ;
    };
    JuyuanView.prototype.createBall = function () {
        var list = this._model.getInfoList();
        var len = this._ballBackList.numChildren;
        for (var i = 0; i < len; i++) {
            var back = this._ballBackList.getChildAt(i);
            var img = new JuyuanBall(i, list[i]);
            img.width = 100;
            img.height = 100;
            img.x = back.x + this._ballBackList.x + 9;
            img.y = back.y + this._ballBackList.y + 3;
            this.addChild(img);
            this._ballList.push(img);
        }
    };
    JuyuanView.prototype.setBallAni = function (cvo) {
        for (var i = 0; i < 9; i++) {
            if (this._aniList[i] == null) {
                if (cvo.step == 0) {
                    if (i < cvo.id - 1) {
                        //this._ballList[i].setTouch(true);
                        var ani = Manager.animation.createJuyuanAnimation("jyui");
                        ani.x = this._ballList[i].x - 75;
                        ani.y = this._ballList[i].y - 75;
                        this.addChild(ani);
                        this._aniList.push(ani);
                    }
                }
                else {
                    var ani = Manager.animation.createJuyuanAnimation("jyui");
                    ani.x = this._ballList[i].x - 75;
                    ani.y = this._ballList[i].y - 75;
                    this.addChild(ani);
                    this._aniList.push(ani);
                }
            }
        }
    };
    JuyuanView.prototype.createGodAni = function () {
        if (this._godAni == null) {
            this._godAni = Manager.animation.createJuyuanAnimation("jy");
            this._godAni.x = -50;
            this._godAni.y = 120;
            this.addChild(this._godAni);
        }
    };
    JuyuanView.prototype.setItem = function () {
        var list = this._model.getCurList();
        if (list.consume) {
            this._cost.visible = true;
            var arr = GainLossVO.parse(list.consume);
            var item = Manager.model.getItems().getCountItemById(arr[0].baseId);
            this._cailiao.text = item + "/" + arr[0].num;
            this._yinbi.text = arr[1].num + "";
            var cur_yinbi = Manager.model.self.attrInfo.coin;
            if (cur_yinbi < arr[1].num) {
                this._yinbi.textColor = Color.RED;
            }
            else {
                this._yinbi.textColor = Color.DEF2;
            }
            var cur_item = Manager.model.getItems().getCountItemById(arr[0].baseId);
            if (cur_item < arr[0].num) {
                this._cailiao.textColor = Color.RED;
            }
            else {
                this._cailiao.textColor = Color.DEF2;
            }
        }
        else {
            this._cost.visible = false;
            this._cailiao.text = "";
            this._yinbi.text = "";
        }
        this.setBtn();
    };
    JuyuanView.prototype.setStar = function (star) {
        if (this._isUpdate) {
            this.createAniStar(star);
            this._isUpdate = false;
        }
        switch (star) {
            case 1:
                this._scedule.width = 1 * 130;
                this._star01.source = "juyuan_star01_png";
                this._star02.source = "juyuan_star02_png";
                this._star03.source = "juyuan_star02_png";
                this._star04.source = "juyuan_star02_png";
                break;
            case 2:
                this._scedule.width = 2 * 130;
                this._star01.source = "juyuan_star01_png";
                this._star02.source = "juyuan_star01_png";
                this._star03.source = "juyuan_star02_png";
                this._star04.source = "juyuan_star02_png";
                break;
            case 3:
                this._scedule.width = 3 * 130;
                this._star01.source = "juyuan_star01_png";
                this._star02.source = "juyuan_star01_png";
                this._star03.source = "juyuan_star01_png";
                this._star04.source = "juyuan_star02_png";
                break;
            case 4:
                this._scedule.width = 4 * 130;
                this._star01.source = "juyuan_star01_png";
                this._star02.source = "juyuan_star01_png";
                this._star03.source = "juyuan_star01_png";
                this._star04.source = "juyuan_star01_png";
                break;
            default:
                this._scedule.width = 0;
                this._star01.source = "juyuan_star02_png";
                this._star02.source = "juyuan_star02_png";
                this._star03.source = "juyuan_star02_png";
                this._star04.source = "juyuan_star02_png";
                break;
        }
    };
    JuyuanView.prototype.createAniStar = function (star) {
        var ani = Manager.animation.createJuyuanAnimation("starjy");
        if (this._starList[star - 1])
            ani.x = this._starList[star - 1].x;
        ani.y = 800;
        this.addChild(ani);
    };
    JuyuanView.prototype.setBtn = function () {
        var list = this._model.getCurList();
        var conList = ConditionVO.getVOList(list.cond);
        var conValue = conList[0].value;
        var curLevel = Manager.model.self.attrInfo.level;
        if (conValue > curLevel) {
            this._tupoBtn.visible = false;
            this._juyuanBtn.visible = false;
            this._redIcon.visible = false;
            this._redText.text = LangCVO.getContent("juyuan1", conValue);
            this._redText.textColor = Color.RED;
        }
        else {
            if (list.star == 4) {
                this._tupoBtn.visible = false;
                this._juyuanBtn.visible = true;
            }
            else {
                this._tupoBtn.visible = true;
                this._juyuanBtn.visible = false;
            }
            if (list.consume) {
                var bool = this._model.checkCoin();
                //设置红点
                if (bool) {
                    this._redIcon.visible = true;
                }
                else {
                    this._redIcon.visible = false;
                }
            }
            else {
                this._redIcon.visible = true;
            }
        }
    };
    JuyuanView.prototype.progessUpdate = function () {
        this._isUpdate = true;
        this.infoUpdate();
    };
    JuyuanView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._ballBackList, this._zhanliBack, this._jieduanBack, this._juyuanBtn, this._tupoBtn, this._redIcon, this._scedule, this._star01, this._star02, this._star03, this._star04, this._cost);
        ObjectUtil.disposes(this._model, this._redText, this._cailiao, this._yinbi);
        this._ballBackList = null;
        this._zhanliBack = null;
        this._jieduanBack = null;
        this._cailiao = null;
        this._yinbi = null;
        this._juyuanBtn = null;
        this._tupoBtn = null;
        this._redText = null;
        this._redIcon = null;
        this._scedule = null;
        this._star01 = null;
        this._star02 = null;
        this._star03 = null;
        this._star04 = null;
        this._cost = null;
        this._bimfont.dispose();
        this._bimfont = null;
        this._bimfont2.dispose();
        this._bimfont2 = null;
        if (this._godAni)
            Manager.pool.push(this._godAni);
        this._godAni = null;
        this._model = null;
        this._ballList = null;
        this._aniList = null;
        this._starList = null;
        this._isUpdate = null;
    };
    return JuyuanView;
}(UIComponent));
__reflect(JuyuanView.prototype, "JuyuanView");
//# sourceMappingURL=JuyuanView.js.map