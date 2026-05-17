var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 邮件信息
var MailInfo = (function () {
    function MailInfo() {
    }
    Object.defineProperty(MailInfo.prototype, "hasRead", {
        get: function () {
            return this._hasRead;
        },
        set: function (value) {
            if (this._hasRead == value)
                return;
            this._hasRead = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailInfo.prototype, "silver", {
        get: function () {
            return this._silver;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailInfo.prototype, "gold", {
        get: function () {
            return this._gold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailInfo.prototype, "diamond", {
        get: function () {
            return this._diamond;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailInfo.prototype, "goodsArr", {
        get: function () {
            var result = [];
            if (this._goodsArr) {
                var len = this._goodsArr.length;
                var child = void 0;
                for (var i = 0; i < len; i++) {
                    child = new ItemsModelInfo();
                    child.base_id = this._goodsArr[i].base_id;
                    child.bind = this._goodsArr[i].bind;
                    child.quantity = this._goodsArr[i].quantity;
                    //特殊信息
                    var infoLen = this._goodsArr[i].infoList.length;
                    for (var j = 0; j < infoLen; j++) {
                        var exarr = new ExattrItemsinfo();
                        exarr.type = this._goodsArr[i].infoList[j].type;
                        exarr.target = this._goodsArr[i].infoList[j].target;
                        exarr.value = this._goodsArr[i].infoList[j].value;
                        exarr.desc = this._goodsArr[i].infoList[j].desc;
                        child.infoList.push(exarr);
                    }
                    result.push(child);
                }
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    MailInfo.prototype.parseData = function (pi) {
        this.uniqueID = pi.readInt64();
        this.mailID = pi.readInt();
        this.date = pi.readInt();
        this.receiverID = pi.readInt64();
        this.receiverName = pi.readUTF();
        this._hasRead = pi.readByte() == 1;
        //标题参数列表
        var length = pi.readShort();
        var mailCvo = MailContentCVO.getCVO(this.mailID);
        this.title = mailCvo.title;
        this.content = mailCvo.content;
        var i;
        var paramType;
        var paramArgs = [];
        for (i = 0; i < length; i++) {
            paramType = pi.readByte();
            paramArgs.push(pi.readUTF());
        }
        this.title = cw.StringUtil.format(mailCvo.title, paramArgs);
        //正文参数列表
        length = pi.readShort();
        paramArgs = [];
        for (i = 0; i < length; i++) {
            paramType = pi.readByte();
            paramArgs.push(pi.readUTF());
        }
        this.content = cw.StringUtil.format(mailCvo.content, paramArgs);
        //物品列表
        length = pi.readShort();
        var goodsInfo;
        this._goodsArr = [];
        for (i = 0; i < length; i++) {
            goodsInfo = new ItemsModelInfo();
            goodsInfo.base_id = pi.readInt();
            goodsInfo.bind = pi.readByte() == 1;
            goodsInfo.quantity = pi.readInt();
            //特殊信息
            var len = pi.readShort();
            for (var j = 0; j < len; j++) {
                var exarr = new ExattrItemsinfo();
                exarr.type = pi.readShort();
                exarr.target = pi.readInt();
                exarr.value = pi.readInt();
                exarr.desc = pi.readUTF();
                goodsInfo.infoList.push(exarr);
            }
            this._goodsArr.push(goodsInfo);
        }
        //附件状态0:无附件 1:未领取 2:已领取
        this.attachStatus = pi.readByte();
    };
    return MailInfo;
}());
__reflect(MailInfo.prototype, "MailInfo");
//# sourceMappingURL=MailInfo.js.map