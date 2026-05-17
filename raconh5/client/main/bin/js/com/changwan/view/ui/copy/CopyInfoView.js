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
 * 副本信息界面
 * luzhihong
 * create 2017-12-5
 */
var CopyInfoView = /** @class */ (function (_super) {
    __extends(CopyInfoView, _super);
    function CopyInfoView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("copy", "CopyInfoViewSkin");
        return _this;
    }
    /**
     * @param id 副本ID
    */
    CopyInfoView.prototype.show = function (id) {
        Manager.render.remove(this.countdown, this);
        Manager.render.remove(this.materialCountDown, this);
        this._cvo = CopyCVO.getCVO(id);
        if (this.parent == null) {
            Manager.layer.uiLayer.addChild(this);
        }
        if (this._loadComplete && this._cvo.type == CopyConst.TYPE_TOWER)
            this.setTower();
    };
    CopyInfoView.prototype.hide = function () {
        this.dispose();
    };
    CopyInfoView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("boss5") + HtmlUtil.addColorTag(this._cvo.awardDesc, Color.GREEN_STR)); //奖励：
        if (this._cvo.type == CopyConst.TYPE_MAIN) {
            var mainCVO = MainCopyCVO.getCVO(this._cvo.cell + 1);
            if (mainCVO == null)
                mainCVO = MainCopyCVO.getCVO(this._cvo.cell);
            this._txtTitle.text = mainCVO.name;
            HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("boss6") + HtmlUtil.addColorTag(mainCVO.monCVO.name, Color.GREEN_STR)); //通关：
        }
        else if (this._cvo.type == CopyConst.TYPE_BOSS_PRIVATE) {
            this._txt0.y = 35;
            this._txt1.y = 66;
            Manager.render.add(this.countdown, this, 1000);
            this.countdown();
        }
        else if (this._cvo.type == CopyConst.TYPE_TOWER)
            this.setTower();
        else if (this._cvo.type == CopyConst.TYPE_MATERIAL)
            this.setMaterialInfo();
        this.onResizeHandler(null);
    };
    CopyInfoView.prototype.setTower = function () {
        var model = Manager.model.getCopy().towerModel;
        var towerCVO = TowerCopyCVO.getCVO(model.curLvl + 1);
        if (towerCVO == null)
            towerCVO = TowerCopyCVO.getCVO(model.curLvl);
        //播放boss动画
        if (towerCVO.isBoss)
            this._timeoutID = egret.setTimeout(this.showTouwerCopyBossView, this, 1000);
        this._txtTitle.text = LangCVO.getContent("copy1", towerCVO.cell); //第{0}关
        var htmlStr = HtmlUtil.addColorTag(towerCVO.monster.name, Color.GREEN_STR);
        HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("copy3") + htmlStr); //挑战：
        htmlStr = HtmlUtil.addColorTag(LangCVO.getContent("copy4"), Color.GREEN_STR); ////命格、命魂
        HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("boss5") + htmlStr);
    };
    CopyInfoView.prototype.showTouwerCopyBossView = function () {
        Manager.view.show(63 /* TowerCopyBossView */);
    };
    CopyInfoView.prototype.setMaterialInfo = function () {
        var copyCVO = CopyCVO.getCVO(CopyConst.ID_MATERIAL);
        if (copyCVO) {
            var info = MaterialCopyCVO.getCellInfo(copyCVO.cell + 1);
            if (info) {
                this._txtTitle.text = info.name;
            }
            Manager.render.add(this.materialCountDown, this, 1000);
            this.materialCountDown();
            var htmlStr = HtmlUtil.addColorTag(LangCVO.getContent("copy28"), Color.GREEN_STR); ////绝学、铸魂
            HtmlUtil.setTextFlow(this._txt1, LangCVO.getContent("boss5") + htmlStr);
        }
    };
    CopyInfoView.prototype.materialCountDown = function () {
        var htmlStr;
        if (this._cvo.leftTime > 10)
            htmlStr = HtmlUtil.addColorTag(cw.DateUtil.formatStr(this._cvo.leftTime, cw.DateUtil.LEFT_MM_SS, true), Color.GREEN_STR);
        else
            htmlStr = HtmlUtil.addColorTag(cw.DateUtil.formatStr(this._cvo.leftTime, cw.DateUtil.LEFT_MM_SS, true), Color.RED_STR);
        HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("copy26") + htmlStr);
    };
    CopyInfoView.prototype.countdown = function () {
        var str = cw.DateUtil.formatStr(this._cvo.leftTime, cw.DateUtil.LEFT_MM_SS, true);
        str = HtmlUtil.addColorTag(str, Color.GREEN_STR);
        HtmlUtil.setTextFlow(this._txt0, LangCVO.getContent("boss4") + str); //倒计时：
    };
    CopyInfoView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    CopyInfoView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    CopyInfoView.prototype.onResizeHandler = function (e) {
        this.x = Manager.config.gameWidth - this.parent.x - this.width;
    };
    CopyInfoView.prototype.dispose = function () {
        egret.clearTimeout(this._timeoutID);
        Manager.render.remove(this.countdown, this);
        Manager.render.remove(this.materialCountDown, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._txtTitle, this._txt0, this._txt1);
        this._txtTitle = null;
        this._txt0 = null;
        this._txt1 = null;
        this._cvo = null;
    };
    return CopyInfoView;
}(UIComponent));
//# sourceMappingURL=CopyInfoView.js.map