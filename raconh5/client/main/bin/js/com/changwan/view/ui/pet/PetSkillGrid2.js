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
 *author Anydo
 *create 2018-1-31
 *update devil 2018-04-12
*/
var PetSkillGrid2 = /** @class */ (function (_super) {
    __extends(PetSkillGrid2, _super);
    function PetSkillGrid2(x, y) {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.x = x;
        _this.y = y;
        _this.start();
        _this.addEvent();
        return _this;
    }
    Object.defineProperty(PetSkillGrid2.prototype, "cvo", {
        get: function () {
            return this._cvo;
        },
        set: function (value) {
            if (this._cvo == value)
                return;
            this._cvo = value;
            if (this._cvo != null) {
                this._img.load(Manager.path.getSkillIconPath(this._cvo.icon));
                this.invalidate("drawUpdateLevel");
            }
        },
        enumerable: true,
        configurable: true
    });
    PetSkillGrid2.prototype.start = function () {
        _super.prototype.start.call(this);
        this._back = BitmapRes.create("common_itemBg_png", -15, -15);
        this.addChild(this._back);
        this._img = Manager.pool.create(BitmapRemote);
        this._img.x = 13;
        this._img.y = 13;
        this.addChild(this._img);
        this._txtLevel = Manager.pool.create(TextField);
        this._txtLevel.text = "LV.0";
        this._txtLevel.x = 7;
        this._txtLevel.y = 70;
        this._txtLevel.textColor = 0xFFFBEB;
        this._txtLevel.size = 24;
        this._txtLevel.fontFamily = "Microsoft YaHei";
        this._txtLevel.width = 89;
        this._txtLevel.height = 28;
        this._txtLevel.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._txtLevel.textAlign = egret.HorizontalAlign.RIGHT;
        this.addChild(this._txtLevel);
    };
    PetSkillGrid2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getPet().addEventListener(PetEvent.UPGRADE_SKILL, this.onSkillUpdateHandler, this);
    };
    PetSkillGrid2.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Manager.model.getPet().removeEventListener(PetEvent.UPGRADE_SKILL, this.onSkillUpdateHandler, this);
    };
    PetSkillGrid2.prototype.onSkillUpdateHandler = function (e) {
        if (this._cvo.groupID != Number(e.params))
            return;
        this.invalidate("drawUpdateLevel");
    };
    PetSkillGrid2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        if (this._cvo)
            this.drawUpdateLevel();
    };
    PetSkillGrid2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawUpdateLevel"))
            this.drawUpdateLevel();
    };
    PetSkillGrid2.prototype.drawUpdateLevel = function () {
        var level = Manager.model.getPet().getPetSkillLevel(this._cvo.groupID);
        if (level > 0) {
            this._img.filters = null;
            this._txtLevel.text = "Lv." + level;
        }
        else {
            FilterUtil.setGrayFilter(this._img);
            var cvo = PetCVO.getCVOByNewSkillId(this._cvo.groupID);
            if (cvo != null)
                HtmlUtil.setTextFlow(this._txtLevel, LangCVO.getContent("pet15", Color.GREEN_STR_2, cvo.pinjie));
        }
    };
    PetSkillGrid2.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        if (this._back != null) {
            Manager.pool.push(this._back);
            this._back = null;
        }
        if (this._txtLevel != null) {
            Manager.pool.push(this._txtLevel);
            this._txtLevel = null;
        }
        if (this._img != null) {
            Manager.pool.push(this._img);
            this._img = null;
        }
        this._cvo = null;
    };
    return PetSkillGrid2;
}(RenderSprite));
//# sourceMappingURL=PetSkillGrid2.js.map