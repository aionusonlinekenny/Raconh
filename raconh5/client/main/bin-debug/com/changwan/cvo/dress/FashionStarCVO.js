var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 服饰星数模板表
 * luzh
 * create 2017-12-18
*/
var FashionStarCVO = (function () {
    function FashionStarCVO() {
    }
    Object.defineProperty(FashionStarCVO.prototype, "attrVo", {
        get: function () {
            if (this._attrVo == null)
                this._attrVo = Manager.pool.create(AttrVO, this.attrStr);
            return this._attrVo;
        },
        enumerable: true,
        configurable: true
    });
    FashionStarCVO.parse = function (bytes) {
        FashionStarCVO._cvos = {};
        var tableCount = bytes.readShort();
        var cvo;
        for (var i = 0; i < tableCount; i++) {
            cvo = new FashionStarCVO();
            cvo.id = bytes.readShort();
            cvo.star = bytes.readByte();
            cvo.loss = new GainLossVO(bytes.readUTF());
            cvo.attrStr = bytes.readUTF();
            FashionStarCVO._cvos[cvo.id + "_" + cvo.star] = cvo;
            if (cvo.star > FashionStarCVO.MAX_STAR)
                FashionStarCVO.MAX_STAR = cvo.star;
        }
    };
    FashionStarCVO.getCVO = function (id, star) {
        var key = id + "_" + star;
        if (this._cvos[key])
            return this._cvos[key];
        return null;
    };
    FashionStarCVO.MAX_STAR = 0;
    return FashionStarCVO;
}());
__reflect(FashionStarCVO.prototype, "FashionStarCVO");
//# sourceMappingURL=FashionStarCVO.js.map