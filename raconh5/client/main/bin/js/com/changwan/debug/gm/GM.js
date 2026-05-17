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
 * GM命令
 * Simon 2017.11.15
 */
var GM = /** @class */ (function (_super) {
    __extends(GM, _super);
    function GM() {
        var _this = _super.call(this) || this;
        _this.selectIndex = -1;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("debug", "GMSkin");
        return _this;
    }
    Object.defineProperty(GM, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new GM();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GM.prototype.getCMDList = function (list) {
        if (list) {
            this.btnTxtList2 = [];
            this.btnDir3 = {};
            for (var i = 0; i < list.length; i++) {
                if (this.btnTxtList2.indexOf(list[i].type) == -1)
                    this.btnTxtList2.push(list[i].type);
                if (!this.btnDir3[list[i].type])
                    this.btnDir3[list[i].type] = [];
                this.btnDir3[list[i].type].push({ cmd: list[i].cmd, desc: list[i].desc, example: list[i].example });
            }
            this.btnList2 = [];
            for (var i = 0; i < this.btnTxtList2.length; i++) {
                var btn = new GMBtn(this.btnTxtList2[i], 2);
                btn.y = i * 40;
                this.sp1.addChild(btn);
                this.btnList2.push(btn);
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBtnListHandler2, this);
            }
        }
    };
    GM.prototype.updateRequest = function (value) {
        var list = value.split("\n");
        for (var i = 0; i < list.length; i++) {
            if (list[i] != "")
                this._contentList.push(list[i]);
        }
        this._scrollerList.dataProvider(this._contentList);
    };
    GM.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.btnTxtList1 = ["一级菜单", "二级菜单"];
        this.bg1 = new egret.Sprite();
        this.bg1.graphics.clear();
        this.bg1.graphics.beginFill(0, 0.8);
        this.bg1.graphics.drawRect(0, 0, 600, 900);
        this.bg1.graphics.endFill();
        this.bg1.x = this.bg1.y = 0;
        this.bg1.width = 600;
        this.bg1.height = 900;
        this.bg1.visible = true;
        this.addChildAt(this.bg1, 0);
        this.bg2 = new egret.Sprite();
        this.bg2.graphics.clear();
        this.bg2.graphics.beginFill(0xffffff, 1);
        this.bg2.graphics.drawRect(0, 0, 500, 500);
        this.bg2.graphics.endFill();
        this.bg2.x = 50;
        this.bg2.y = 200;
        this.bg2.width = this.bg2.height = 500;
        this.bg2.visible = true;
        this.addChildAt(this.bg2, 1);
        this.tipsTxt = Manager.pool.create(egret.TextField);
        this.tipsTxt.x = 50;
        this.tipsTxt.y = 710;
        this.tipsTxt.textColor = 0xffffff;
        this.addChild(this.tipsTxt);
        this.inputTxt = Manager.pool.create(egret.TextField);
        this.inputTxt.type = egret.TextFieldType.INPUT;
        this.inputTxt.x = 50;
        this.inputTxt.y = 750;
        this.inputTxt.width = 400;
        this.inputTxt.background = true;
        this.inputTxt.backgroundColor = 0xffffff;
        this.inputTxt.textColor = 0x0000ff;
        this.addChild(this.inputTxt);
        this.send = new GMBtn("Send", 1);
        this.send.x = 460;
        this.send.y = 750;
        this.addChild(this.send);
        this.btnList1 = [];
        for (var i = 0; i < this.btnTxtList1.length; i++) {
            var btn = new GMBtn(this.btnTxtList1[i], 1);
            btn.x = 100 + i * 200;
            btn.y = 50;
            this.addChild(btn);
            this.btnList1.push(btn);
        }
        this.sp1 = new egret.Sprite();
        this.sp1.touchEnabled = true;
        this.sp1.graphics.beginFill(0, 0.5);
        this.sp1.graphics.drawRect(0, 0, 150, 450);
        this.sp1.graphics.endFill();
        this.sp1.x = 100;
        this.sp1.y = 95;
        this.addChild(this.sp1);
        this.sp1.visible = false;
        this.sp2 = new egret.Sprite();
        this.sp2.touchEnabled = true;
        this.sp2.graphics.beginFill(0, 0.5);
        this.sp2.graphics.drawRect(0, 0, 300, 450);
        this.sp2.graphics.endFill();
        this.sp2.x = 300;
        this.sp2.y = 95;
        this.addChild(this.sp2);
        this.sp2.visible = false;
        this.x = (Manager.config.gameWidth - this.width) / 2;
        this.y = (Manager.config.gameHeight - this.height) / 2;
        this._scrollerList.initBtnListData(GMContentItem, [], true);
    };
    GM.prototype.initData = function () {
        this._controller = new GMControl();
        this._controller.gmList();
        this._contentList = [];
    };
    GM.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        // GameDispatcher.getInstance().addEventListener(BaseUIEvent.ITEM_RENDERER_COMPLETE, this.onFuncBtnLoadComplete, this);
        this.inputTxt.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusHandler, this);
        for (var i = 0; i < this.btnList1.length; i++) {
            this.btnList1[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBtnListHandler1, this);
        }
        this.send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSendHandler, this);
    };
    GM.prototype.removeEvent = function () {
        // GameDispatcher.getInstance().removeEventListener(BaseUIEvent.ITEM_RENDERER_COMPLETE, this.onFuncBtnLoadComplete, this);
        this.inputTxt.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusHandler, this);
        if (this.btnList1) {
            for (var i = 0; i < this.btnList1.length; i++) {
                this.btnList1[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBtnListHandler1, this);
            }
        }
        if (this.btnList2) {
            for (var i = 0; i < this.btnList2.length; i++) {
                this.btnList2[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBtnListHandler2, this);
            }
        }
        if (this.btnList3) {
            for (var i = 0; i < this.btnList3.length; i++) {
                this.btnList3[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBtnListHandler3, this);
            }
        }
        this.send.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSendHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    // private onFuncBtnLoadComplete(e:BaseUIEvent):void
    // {
    //     this._scrollerList.scroller.viewport.scrollV = this._scrollerList.scroller.viewport.contentHeight - this._scrollerList.scroller.viewport.height + 100;
    // }
    GM.prototype.onFocusHandler = function (e) {
        this.sp1.visible = this.sp2.visible = false;
    };
    GM.prototype.onClickBtnListHandler1 = function (e) {
        var index = this.btnList1.indexOf(e.currentTarget);
        switch (index) {
            case 0:
                this.sp1.visible = !this.sp1.visible;
                break;
        }
    };
    GM.prototype.onClickBtnListHandler2 = function (e) {
        if (this.btnList3) {
            for (var i_1 = 0; i_1 < this.btnList3.length; i_1++) {
                this.btnList3[i_1].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBtnListHandler3, this);
                this.btnList3[i_1].dispose();
                this.btnList3[i_1] = null;
            }
        }
        this.btnList3 = [];
        this.sp2.visible = true;
        this.selectIndex = this.btnList2.indexOf(e.currentTarget);
        var i = 0;
        for (var _i = 0, _a = this.btnDir3[this.btnTxtList2[this.selectIndex]]; _i < _a.length; _i++) {
            var value = _a[_i];
            var btn = new GMBtn(value, 2);
            btn.y = i * 40;
            this.sp2.addChild(btn);
            this.btnList3.push(btn);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBtnListHandler3, this);
            i += 1;
        }
    };
    GM.prototype.onClickBtnListHandler3 = function (e) {
        var btn = e.currentTarget;
        this._contentList = [];
        this._contentList.push(btn.info.desc);
        this._contentList.push("例子：" + btn.info.example);
        this._contentList.push("==========================");
        this._scrollerList.dataProvider(this._contentList);
        this.inputTxt.text = btn.info.example;
        this.sp1.visible = false;
        this.sp2.visible = false;
    };
    GM.prototype.onClickSendHandler = function (e) {
        this._controller.gmListRequest(this.inputTxt.text);
        var str = "已提交";
        this._contentList.push(str);
        this._scrollerList.dataProvider(this._contentList);
        this.selectIndex = -1;
        this.tipsTxt.text = "";
    };
    GM.prototype.dispose = function () {
        this.removeEvent();
        if (this.bg1 && this.bg1.parent)
            this.bg1.parent.removeChild(this.bg1);
        this.bg1 = null;
        if (this.bg2 && this.bg2.parent)
            this.bg2.parent.removeChild(this.bg2);
        this.bg2 = null;
        if (this.sp1 && this.sp1.parent)
            this.sp1.parent.removeChild(this.sp1);
        this.sp1 = null;
        if (this.sp2 && this.sp2.parent)
            this.sp2.parent.removeChild(this.sp2);
        this.sp2 = null;
        if (this.btnList1) {
            for (var i = 0; i < this.btnList1.length; i++) {
                this.btnList1[i].dispose();
                this.btnList1[i] = null;
            }
        }
        this.btnList1 = null;
        if (this.btnList2) {
            for (var i = 0; i < this.btnList2.length; i++) {
                this.btnList2[i].dispose();
                this.btnList2[i] = null;
            }
        }
        this.btnList2 = null;
        if (this.btnList3) {
            for (var i = 0; i < this.btnList3.length; i++) {
                this.btnList3[i].dispose();
                this.btnList3[i] = null;
            }
        }
        this.btnList3 = null;
        if (this.tipsTxt) {
            Manager.pool.push(this.tipsTxt);
            this.tipsTxt = null;
        }
        if (this.inputTxt) {
            Manager.pool.push(this.inputTxt);
            this.inputTxt = null;
        }
        if (this.send) {
            this.send.dispose();
            this.send = null;
        }
        this.btnTxtList1 = null;
        this.btnTxtList2 = null;
        this.btnDir3 = null;
        if (this._scrollerList)
            this._scrollerList.dispose();
        this._scrollerList = null;
        this._contentList = null;
    };
    return GM;
}(UIComponent));
var GMBtn = /** @class */ (function (_super) {
    __extends(GMBtn, _super);
    function GMBtn(info, btnType) {
        if (btnType === void 0) { btnType = 1; }
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        if (Object.prototype.toString.call(info) === "[object String]") {
            _this.txtName = String(info);
        }
        else {
            _this.info = info;
            _this.txtName = info.cmd;
        }
        _this.btnType = btnType;
        _this.initView();
        return _this;
    }
    GMBtn.prototype.initView = function () {
        this.txt = Manager.pool.create(egret.TextField);
        this.txt.touchEnabled = false;
        this.txt.text = this.txtName;
        this.sp = Manager.pool.create(egret.Sprite);
        this.sp.touchEnabled = false;
        if (this.btnType == 1)
            this.sp.graphics.beginFill(0x0063dd, 1);
        else if (this.btnType == 2)
            this.sp.graphics.beginFill(0x317fdf, 1);
        this.sp.graphics.drawRect(0, 0, this.txt.textWidth + 10, 30);
        this.sp.graphics.endFill();
        this.addChild(this.sp);
        this.txt.x = 5;
        this.txt.y = 5;
        this.sp.addChild(this.txt);
    };
    GMBtn.prototype.dispose = function () {
        if (this.sp) {
            Manager.pool.push(this.sp);
            this.sp = null;
        }
        if (this.txt) {
            Manager.pool.push(this.txt);
            this.txt = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return GMBtn;
}(egret.DisplayObjectContainer));
//# sourceMappingURL=GM.js.map