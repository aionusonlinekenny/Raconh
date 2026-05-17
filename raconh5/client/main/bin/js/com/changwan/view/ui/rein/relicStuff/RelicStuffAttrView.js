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
 * 神器属性详情
 * pzx
 * create 18.3.8
 */
var RelicStuffAttrView = /** @class */ (function (_super) {
    __extends(RelicStuffAttrView, _super);
    function RelicStuffAttrView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("relicStuff", "RelicStuffAttrViewSkin");
        return _this;
    }
    RelicStuffAttrView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._attList = [this._attrTxt0, this._attrTxt1, this._attrTxt2, this._attrTxt3];
        if (!this._fighting) {
            this._fighting = Manager.pool.create(NumImgView2);
            this._fighting.x = this._fightImg.x + 70;
            this._fighting.y = this._fightImg.y + 3;
            this.addChild(this._fighting);
        }
        this._desc2.text = LangCVO.getContent("relicstuff2");
    };
    RelicStuffAttrView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._actBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendActivityHandler, this);
        Manager.model.getrelicstuff().addEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT, this.onActivityReturn, this);
    };
    RelicStuffAttrView.prototype.removeEvent = function () {
        this._actBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendActivityHandler, this);
        Manager.model.getrelicstuff().removeEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT, this.onActivityReturn, this);
        _super.prototype.removeEvent.call(this);
    };
    RelicStuffAttrView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        //引导
        this._guideID = Manager.model.getGuide().curID;
        if (this._guideID == GuideID.RELIC_PIECE || this._guideID == GuideID.RELIC_ACTIVE) {
            if (!this._actBtn || !this._actBtn.visible) {
                Manager.control.getTask().hideGuide();
                return;
            }
            var pos = this._actBtn.parent.localToGlobal(this._actBtn.x, this._actBtn.y);
            Manager.control.getTask().showGuide(pos, this._actBtn.width >> 1, this._actBtn.height >> 1, this.guideCB, this, false);
        }
    };
    //请求神器碎片激活
    RelicStuffAttrView.prototype.onSendActivityHandler = function (e) {
        if (e != null && (this._guideID == GuideID.RELIC_PIECE || this._guideID == GuideID.RELIC_ACTIVE))
            return;
        this._actBtn.enabled = false;
        if (this._data instanceof RelicStuffDebrisCVO) {
            var cvo = this._data;
            Manager.control.getRelicstuff().activity(cvo.des_id, RelicStuffType.DEBRIS_TYPE);
        }
    };
    RelicStuffAttrView.prototype.onActivityReturn = function () {
        // this._sucAni=Manager.animation.createEffectAnimation("suc");
        // this._sucAni.x = Math.round((this.width - 512) / 2);
        // this._sucAni.y = this._diImg.y + 10;
        // this._sucAni.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
        // this.addChild(this._sucAni);
        // this.touchEnabled = this.touchChildren = false;
        var sucAni = Manager.animation.createEffectAnimation("suc", 0, true, true);
        sucAni.x = Math.round((Manager.global.gameMain.stage.$stageWidth - 512) / 2); //Math.round((this.width - 512) / 2);
        sucAni.y = Math.round(Manager.global.gameMain.stage.$stageHeight / 2); //this._diImg.y + 10;
        Manager.layer.effectLayer.addChild(sucAni);
        this.onTouchCloseHandler(null);
    };
    // private onShowBlastCompleteHandler():void
    // {
    // 	if(this._sucAni) this._sucAni.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
    // 	this.clearAni();
    // 	this.onTouchCloseHandler(null);
    // }
    // private clearAni():void
    // {
    // 	if(this._sucAni)
    // 	{
    // 		Manager.pool.push(this._sucAni);
    // 		this._sucAni = null;
    // 	}
    // }
    RelicStuffAttrView.prototype.onTouchCloseHandler = function (e) {
        Manager.view.hide(124 /* RelicStuffAttrView */);
    };
    RelicStuffAttrView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    RelicStuffAttrView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    RelicStuffAttrView.prototype.setData = function (data) {
        this._data = data;
        this.invalidate(InvalidationType.DATA);
    };
    RelicStuffAttrView.prototype.drawData = function () {
        if (this._data instanceof RelicStuffCVO) {
            this.drawCvo();
        }
        else if (this._data instanceof RelicStuffDebrisCVO) {
            this.drawDesCvo();
        }
    };
    /** 神器碎片详情 */
    RelicStuffAttrView.prototype.drawDesCvo = function () {
        this._popupView.titleImg.source = "relicStuff_suipianshux_png";
        var _cvo = this._data;
        this._diImg.source = "common_itemBg_png";
        this._equipBit.load(Manager.path.getRelicStuffPath("fargment/fargment" + _cvo.des_id));
        this._equipBit.x = 318;
        this._equipBit.y = 406;
        var vo = _cvo.attrVO;
        this._fighting.setValue(vo.getFighting(), "nums_fighting2_", 20);
        var arr = vo.attrInfos;
        for (var i = this._attList.length - 1; i > -1; i--) {
            if (arr[i]) {
                this._attList[i].text = arr[i].desc();
            }
            else {
                this._attList[i].text = "";
            }
        }
        var con = _cvo.condVo; //new ConditionVO(_cvo.cond);
        var cvo = TaskCVO.getinfo(con.value);
        var vers = cvo.verse;
        this._versTxt.visible = true;
        if (_cvo.isActivity()) {
            this._actBtn.visible = false;
            this._redIcon.visible = false;
            this._descGroup.visible = false;
            this._versTxt.text = StringUtils.setParam(LangCVO.getContent("relicstuff5"), vers);
            this._popupView.bgHeight = 430;
            this._versTxt.y = 705;
        }
        else {
            this._descGroup.visible = true;
            if (_cvo.checkisActivity()) {
                this._actBtn.visible = true;
                this._redIcon.visible = true;
                this._versTxt.visible = false;
            }
            else {
                this._actBtn.visible = false;
                this._redIcon.visible = false;
                this._versTxt.text = StringUtils.setParam(LangCVO.getContent("relicstuff5"), vers);
                this._versTxt.y = 775;
            }
            var arr_1 = RelicStuffDebrisCVO.cvos(_cvo.sqId);
            this.drawDesc(arr_1);
            this._popupView.bgHeight = 510;
        }
    };
    /** 神器详情 */
    RelicStuffAttrView.prototype.drawCvo = function () {
        this._popupView.titleImg.source = "relicStuff_shenqishuxing_png";
        this._diImg.source = "relicStuff_huawen_png";
        this._actBtn.visible = false;
        var _cvo = this._data;
        this._equipBit.load(Manager.path.getRelicStuffPath("mainBody/mainBody" + _cvo.id));
        this._equipBit.x = 260;
        this._equipBit.y = 343;
        var arr = _cvo.getDebrisList();
        var any = {};
        this._versTxt.visible = true;
        this._versTxt.text = LangCVO.getContent("relicstuff3");
        this._fighting.setValue(_cvo.getFightNum(), "nums_fighting2_", 20);
        for (var i = arr.length - 1; i > -1; i--) {
            var desCvo = arr[i];
            var vos = desCvo.attrVO.attrInfos;
            if (desCvo.isActivity()) {
                for (var j = vos.length - 1; j > -1; j--) {
                    var vo = vos[j];
                    if (any[vo.id]) {
                        any[vo.id].num = any[vo.id].num + vo.num;
                    }
                    else {
                        any[vo.id] = vo;
                    }
                }
            }
            else {
                for (var j = vos.length - 1; j > -1; j--) {
                    var vo = vos[j];
                    if (!any[vo.id]) {
                        var creVo = new AttrVoInfo;
                        creVo.id = vo.id;
                        creVo.num = 0;
                        creVo.name = vo.name;
                        creVo.format = vo.format;
                        creVo.type = vo.type;
                        any[vo.id] = creVo;
                    }
                }
            }
        }
        var index = 0;
        for (var key in any) {
            var vo = any[key];
            if (this._attList[index]) {
                this._attList[index].text = vo.desc();
            }
            index++;
        }
        this._descGroup.visible = false;
        this._popupView.bgHeight = 430;
        this._versTxt.y = 705;
    };
    RelicStuffAttrView.prototype.drawDesc = function (arr) {
        var ln = arr.length;
        var isact = 0;
        for (var i = 0; i < ln; i++) {
            if (arr[i].isActivity()) {
                isact++;
            }
        }
        isact = ln - isact;
        this._desc1.text = StringUtils.setParam(LangCVO.getContent("relicstuff1"), isact);
    };
    RelicStuffAttrView.prototype.guideCB = function () {
        this.onSendActivityHandler(null);
        if (this._guideID == GuideID.RELIC_PIECE)
            Manager.control.getTask().hideGuide();
        else {
            var reinPnl = Manager.view.getView(37 /* ReinPanel */);
            if (!reinPnl) {
                Manager.control.getTask().hideGuide();
                return;
            }
            var relicView = reinPnl.curView;
            if (!relicView) {
                Manager.control.getTask().hideGuide();
                return;
            }
            relicView.guideActPet();
        }
    };
    RelicStuffAttrView.prototype.show = function (data) {
        //data = RelicStuffDebrisCVO.cvo(1);
        this._data = data;
        _super.prototype.show.call(this);
    };
    RelicStuffAttrView.prototype.dispose = function () {
        if (Manager.model.getGuide().curID == GuideID.RELIC_PIECE)
            Manager.control.getTask().hideGuide();
        _super.prototype.dispose.call(this);
        // this.clearAni();
        ObjectUtil.removes(this._fightImg, this._redIcon, this._diImg, this._descGroup);
        ObjectUtil.disposes(this._actBtn, this._equipBit, this._desc1, this._desc2, this._versTxt);
        this._actBtn = null;
        this._equipBit = null;
        this._attrTxt0 = null;
        this._attrTxt1 = null;
        this._attrTxt2 = null;
        this._attrTxt3 = null;
        this._versTxt = null;
        this._desc1 = null;
        this._desc2 = null;
        this._descGroup = null;
        this._data = null;
        this._attList.forEach(function (txt, i) {
            txt.dispose();
        });
        this._attList = null;
        Manager.pool.push(this._fighting);
        this._fighting = null;
        this._fightImg = null;
        this._redIcon = null;
        this._diImg = null;
        this._guideID = -1;
    };
    return RelicStuffAttrView;
}(PopUpView));
//# sourceMappingURL=RelicStuffAttrView.js.map