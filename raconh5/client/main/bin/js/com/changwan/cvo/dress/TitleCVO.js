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
 * 称号模板表
 * liangyan
 * create 2017-11-28
*/
var TitleCVO = /** @class */ (function (_super) {
    __extends(TitleCVO, _super);
    function TitleCVO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TitleCVO.prototype.parseOne = function (data) {
        this._templateID = data.readShort();
        this.resID = data.readShort();
        this.name = data.readUTF();
        this.platform = data.readUTF();
        this.type = data.readByte();
        this.description = data.readUTF();
        this.loss = new GainLossVO(data.readUTF());
        this._baseAttrCfg = data.readUTF();
        this.time = data.readInt();
        this.isUnique = data.readByte() == 1;
        this.popupID = data.readShort();
        this.resH = data.readShort();
        this.getWay = data.readUTF();
        this.sortIndex = data.readByte();
        this.actShow = data.readByte() == 1;
        this.guildID = data.readByte();
        this.dressType = DressType.TITLE;
        this.parseType();
    };
    TitleCVO.prototype.parseType = function () {
        var str = "";
        switch (this.type) {
            case 1:
                str = "普通称号";
                break;
            case 2:
                str = "稀世称号";
                break;
            case 3:
                str = "至尊称号";
                break;
        }
        this.typeStr = str;
    };
    TitleCVO.parse = function (datas) {
        TitleCVO._cvos = {};
        var pageCount = datas.readByte();
        var tableCount = datas.readShort();
        var cvo;
        for (var i = 0; i < tableCount; i++) {
            cvo = new TitleCVO();
            cvo.parseOne(datas);
            TitleCVO._cvos[cvo.templateID] = cvo;
        }
    };
    TitleCVO.getAll = function () {
        if (!TitleCVO._all) {
            TitleCVO._all = [];
            for (var key in this._cvos) {
                TitleCVO._all.push(this._cvos[key]);
            }
            if (TitleCVO._all.length > 1)
                TitleCVO._all.sort(function (a, b) { return (a.sortIndex > b.sortIndex ? 1 : -1); });
        }
        return TitleCVO._all;
    };
    TitleCVO.getCVO = function (id) {
        if (this._cvos[id])
            return this._cvos[id];
        return null;
    };
    TitleCVO.getCvosByType = function (type) {
        var result = [];
        var cvo;
        var selfGuild = Manager.model.self.attrInfo.guildID % 10;
        for (var key in this._cvos) {
            cvo = this._cvos[key];
            if (cvo.type == type) {
                if (cvo.guildID > 0) {
                    if (cvo.guildID == selfGuild)
                        result.push(cvo);
                }
                else
                    result.push(cvo);
            }
        }
        if (result.length > 1)
            result.sort(function (a, b) { return (a.sortIndex > b.sortIndex ? 1 : -1); });
        return result;
    };
    Object.defineProperty(TitleCVO.prototype, "isUsing", {
        get: function () {
            return Manager.model.self.attrInfo.titleId == this.templateID;
        },
        enumerable: true,
        configurable: true
    });
    TitleCVO.TITLE_TYPE_ARR = [1, 2, 3];
    return TitleCVO;
}(DressBaseCVO));
//# sourceMappingURL=TitleCVO.js.map