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
var RoleSkillItem2 = (function (_super) {
    __extends(RoleSkillItem2, _super);
    function RoleSkillItem2() {
        var _this = _super.call(this) || this;
        _this.start();
        _this.addEvent();
        return _this;
    }
    RoleSkillItem2.prototype.start = function () {
        _super.prototype.start.call(this);
        this._redFlag = false;
        this._lockFlag = false;
        this._back = Manager.pool.create(BitmapRes, "role_skillBg_png");
        this.addChild(this._back);
        this.touchEnabled = true;
    };
    Object.defineProperty(RoleSkillItem2.prototype, "btnName", {
        set: function (value) {
            if (this._btnName == value)
                return;
            this._btnName = value;
            this.invalidate(InvalidationType.DATA);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleSkillItem2.prototype, "btnImg", {
        get: function () {
            return this._btnImg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleSkillItem2.prototype, "showIcon", {
        set: function (value) {
            if (this._redFlag == value)
                return;
            this._redFlag = value;
            this.invalidate("drawRed");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleSkillItem2.prototype, "showLock", {
        set: function (value) {
            if (this._lockFlag == value)
                return;
            this._lockFlag = value;
            this.invalidate("drawLock");
        },
        enumerable: true,
        configurable: true
    });
    RoleSkillItem2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
        this.drawRed();
        this.drawLock();
    };
    RoleSkillItem2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
        if (this.isInvalid("drawRed"))
            this.drawRed();
        if (this.isInvalid("drawLock"))
            this.drawLock();
    };
    RoleSkillItem2.prototype.drawData = function () {
        if (this._btnName != null && this._btnName != "") {
            if (this._btnImg == null) {
                this._btnImg = Manager.pool.create(BitmapRes, this._btnName);
                this._btnImg.x = 7;
                this.addChild(this._btnImg);
            }
        }
        else {
            if (this._btnImg != null)
                this.removeChild(this._btnImg);
        }
    };
    RoleSkillItem2.prototype.drawRed = function () {
        if (this._redFlag) {
            if (this._redIcon == null) {
                this._redIcon = Manager.pool.create(BitmapRes, "common_red_icon_png");
                this._redIcon.y = 7;
                this._redIcon.x = 85;
            }
            this.addChild(this._redIcon);
        }
        else {
            if (this._redIcon != null)
                this.removeChild(this._redIcon);
        }
    };
    RoleSkillItem2.prototype.drawLock = function () {
        if (this._lockFlag) {
            if (this._lockImg == null) {
                this._lockImg = Manager.pool.create(BitmapRes, "main_suo_png");
                this._lockImg.y = 19;
                this._lockImg.x = 16;
            }
            this.addChild(this._lockImg);
        }
        else {
            if (this._lockImg != null)
                this.removeChild(this._lockImg);
        }
    };
    RoleSkillItem2.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        if (this._back != null) {
            Manager.pool.push(this._back);
            this._back = null;
        }
        if (this._btnImg != null) {
            Manager.pool.push(this._btnImg);
            this._btnImg = null;
        }
        if (this._redIcon != null) {
            Manager.pool.push(this._redIcon);
            this._redIcon = null;
        }
        if (this._lockImg != null) {
            Manager.pool.push(this._lockImg);
            this._lockImg = null;
        }
    };
    RoleSkillItem2.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        if (this._back != null) {
            Manager.pool.push(this._back);
            this._back = null;
        }
        if (this._btnImg != null) {
            Manager.pool.push(this._btnImg);
            this._btnImg = null;
        }
        if (this._redIcon != null) {
            Manager.pool.push(this._redIcon);
            this._redIcon = null;
        }
        if (this._lockImg != null) {
            Manager.pool.push(this._lockImg);
            this._lockImg = null;
        }
    };
    return RoleSkillItem2;
}(RenderSprite));
__reflect(RoleSkillItem2.prototype, "RoleSkillItem2");
//# sourceMappingURL=RoleSkillItem2.js.map