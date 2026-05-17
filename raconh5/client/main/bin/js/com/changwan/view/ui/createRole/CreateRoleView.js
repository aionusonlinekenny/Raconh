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
 * 创角界面
 * luzhihong
 * create 2017-12-14
 */
var CreateRoleView = /** @class */ (function (_super) {
    __extends(CreateRoleView, _super);
    function CreateRoleView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("createRole", "CreateRoleViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    CreateRoleView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._back0.load(Manager.path.createRolePath("back0.jpg"));
        this._back1.load(Manager.path.createRolePath("back1.jpg"));
        // this._role.load(Manager.path.createRolePath("male.png"));
        this._txtName.type = egret.TextFieldType.INPUT;
        // this.onResizeHandler(null);
        this.x = -80;
        this.setCareer(Math.random() < 0.5 ? 1 : 2); //随机选中一个职业
    };
    CreateRoleView.prototype.show = function () {
        if (this.parent == null)
            Manager.layer.uiLayer.addChild(this);
    };
    CreateRoleView.prototype.hide = function () {
        this.dispose();
    };
    CreateRoleView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        // GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._headBack0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._headBack1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnRole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnCreate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getLogin().addEventListener(LoginEvent.RANDOM_NAME, this.updateName, this);
    };
    CreateRoleView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        // GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._headBack0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._headBack1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnRole.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btnCreate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getLogin().removeEventListener(LoginEvent.RANDOM_NAME, this.updateName, this);
    };
    // private onResizeHandler(e:GlobalEvent):void
    // {
    //     this.x = Math.round(Manager.config.gameWidth - this.width) / 2;
    // }
    CreateRoleView.prototype.updateName = function (e) {
        this._txtName.text = e.params;
    };
    CreateRoleView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._headBack0:
                this.setCareer(1);
                break;
            case this._headBack1:
                this.setCareer(2);
                break;
            case this._btnRole:
                this.reqRandomName();
                break;
            case this._btnCreate:
                Manager.control.getLogin().createRole(this._txtName.text, this._career);
                break;
        }
    };
    CreateRoleView.prototype.setCareer = function (career) {
        if (this._career == career)
            return;
        this._career = career;
        if (this._career == 1) {
            this._headBack0.source = "common_roleKuang_selected_png";
            this._headBack1.source = "common_roleKuang_normal_png";
            this._name.source = "createRole_nameMale_png";
            this._role.load(Manager.path.createRolePath("male.png"));
        }
        else {
            this._headBack0.source = "common_roleKuang_normal_png";
            this._headBack1.source = "common_roleKuang_selected_png";
            this._name.source = "createRole_nameFemale_png";
            this._role.load(Manager.path.createRolePath("female.png"));
        }
        this.reqRandomName();
    };
    CreateRoleView.prototype.reqRandomName = function () {
        Manager.control.getLogin().randomName(this._career);
    };
    CreateRoleView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._back0, this._back1, this._role, this._txtName);
        ObjectUtil.removes(this._headBack0, this._headBack1, this._name, this._btnRole, this._btnCreate);
        this._back0 = null;
        this._back1 = null;
        this._role = null;
        this._headBack0 = null;
        this._headBack1 = null;
        this._name = null;
        this._txtName = null;
        this._btnRole = null;
        this._btnCreate = null;
    };
    return CreateRoleView;
}(UIComponent));
//# sourceMappingURL=CreateRoleView.js.map