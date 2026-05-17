/**
 * 服饰模板表
 * luzh
 * create 2017-12-18
*/
var FashionCVO = /** @class */ (function () {
    function FashionCVO() {
        //-----------------------------------------------------------------------
        //星数
        this.star = 0; //
        //有效时间（-1永久，0未激活，大于0到期时间）
        this.endTime = 0;
    }
    /*解析表*/
    FashionCVO.parseCVOs = function (bytes) {
        var pageCount = bytes.readByte();
        FashionCVO.parse(bytes);
        FashionStarCVO.parse(bytes);
    };
    /*解析表*/
    FashionCVO.parse = function (bytes) {
        FashionCVO._cvos = [];
        var cvo;
        var rowCount = bytes.readShort();
        for (var i = 0; i < rowCount; i++) {
            cvo = new FashionCVO();
            cvo.id = bytes.readShort();
            cvo.resID = bytes.readInt();
            cvo.career = bytes.readByte();
            cvo.name = bytes.readUTF();
            cvo.nameID = bytes.readShort();
            cvo.type = bytes.readByte();
            cvo.desc = bytes.readUTF();
            // cvo.loss = new GainLossVO(bytes.readUTF());
            var sort = bytes.readShort();
            FashionCVO._cvos[cvo.id] = cvo;
            if (FashionCVO.TYPE_ARR.indexOf(cvo.type) == -1)
                FashionCVO.TYPE_ARR.push(cvo.type);
        }
        FashionCVO.TYPE_ARR.sort(function (a, b) { return (a > b ? 1 : -1); });
    };
    FashionCVO.getCVO = function (id) {
        if (this._cvos[id])
            return this._cvos[id];
        return null;
    };
    FashionCVO.getCvosByTypeAndCareer = function (type, career) {
        var result = [];
        var cvo;
        for (var key in this._cvos) {
            cvo = this._cvos[key];
            if (cvo.type == type && cvo.career == career)
                result.push(cvo);
        }
        return result;
    };
    FashionCVO.getCvosByCareer = function (career) {
        var result = [];
        var cvo;
        for (var key in this._cvos) {
            cvo = this._cvos[key];
            if (cvo.career == career)
                result.push(cvo);
        }
        return result;
    };
    Object.defineProperty(FashionCVO.prototype, "isForever", {
        //是否永久激活
        get: function () {
            return this.endTime == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FashionCVO.prototype, "leftTime", {
        //剩余时间
        get: function () {
            return Math.floor(this.endTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FashionCVO.prototype, "isActived", {
        //是否已激活
        get: function () {
            return this.endTime == -1 || this.endTime != 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FashionCVO.prototype, "isWearing", {
        //是否穿戴中
        get: function () {
            return Manager.model.getDress().fashionModel.curID == this.id;
        },
        enumerable: true,
        configurable: true
    });
    /**设置时间 星数 */
    FashionCVO.prototype.setTimeAndStar = function (endTime, star) {
        if (this.endTime == endTime && this.star == star)
            return;
        this.endTime = endTime;
        this.star = star;
        Manager.model.getDress().fashionModel.dispatchEvent(new FashionEvent(FashionEvent.UPDATE, this));
    };
    Object.defineProperty(FashionCVO.prototype, "canActiveOrUp", {
        get: function () {
            var cvo = this.star < FashionStarCVO.MAX_STAR ? FashionStarCVO.getCVO(this.id, this.star + 1) : null;
            return cvo && cvo.loss.isEnough();
        },
        enumerable: true,
        configurable: true
    });
    FashionCVO.TYPE_ARR = [];
    return FashionCVO;
}());
//# sourceMappingURL=FashionCVO.js.map