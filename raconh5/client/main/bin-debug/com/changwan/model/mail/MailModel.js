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
var MailModel = (function (_super) {
    __extends(MailModel, _super);
    function MailModel() {
        var _this = _super.call(this) || this;
        _this.mailInfos = [];
        return _this;
    }
    MailModel.prototype.parseList = function (pi) {
        var length = pi.readShort();
        var info;
        for (var i = 0; i < length; i++) {
            info = new MailInfo();
            info.parseData(pi);
            this.mailInfos.push(info);
        }
        this.mailInfos.sort(this.sortMails);
        this.checkNeedNotice();
        this.dispatchEvent(new MailEvent(MailEvent.UPDATE_LIST));
    };
    MailModel.prototype.parseReceive = function (pi) {
        if (this.mailInfos == null)
            this.mailInfos = [];
        var info;
        var length = pi.readShort();
        for (var i = 0; i < length; i++) {
            info = new MailInfo();
            info.parseData(pi);
            this.mailInfos.push(info);
        }
        this.mailInfos.sort(this.sortMails);
        this.checkNeedNotice();
        this.dispatchEvent(new MailEvent(MailEvent.MAIL_RECEIVE));
    };
    MailModel.prototype.parseDelete = function (pi) {
        var length = pi.readShort();
        var id;
        var info;
        var infoLength = this.mailInfos.length;
        for (var i = 0; i < length; i++) {
            id = pi.readInt64();
            for (var j = 0; j < infoLength; j++) {
                info = this.mailInfos[j];
                if (info.uniqueID == id) {
                    var index = this.mailInfos.indexOf(info);
                    this.mailInfos.splice(index);
                    break;
                }
            }
        }
        this.mailInfos.sort(this.sortMails);
        this.dispatchEvent(new MailEvent(MailEvent.MAIL_DELETE));
    };
    MailModel.prototype.parseRead = function (pi) {
        var id = pi.readInt64();
        var length = this.mailInfos.length;
        var info;
        for (var i = 0; i < length; i++) {
            info = this.mailInfos[i];
            if (info.uniqueID == id) {
                info.hasRead = true;
                break;
            }
        }
        this.mailInfos.sort(this.sortMails);
        this.checkNeedNotice();
        this.dispatchEvent(new MailEvent(MailEvent.HAS_READ_MAIL, id));
    };
    MailModel.prototype.parseFetch = function (pi) {
        var length = pi.readShort();
        var id;
        var infoLength = this.mailInfos.length;
        var info;
        var ids = [];
        for (var i = 0; i < length; i++) {
            id = pi.readInt64();
            for (var j = 0; j < infoLength; j++) {
                info = this.mailInfos[j];
                if (info.uniqueID == id) {
                    info.hasRead = true;
                    info.attachStatus = MailConst.HAS_FETCH;
                    ids.push(id);
                    break;
                }
            }
        }
        this.mailInfos.sort(this.sortMails);
        this.checkNeedNotice();
        this.dispatchEvent(new MailEvent(MailEvent.FETCH_ATTACH, ids));
    };
    MailModel.prototype.sortMails = function (a, b) {
        if (!a.hasRead && !b.hasRead) {
            if (a.attachStatus == MailConst.UN_FETCH && b.attachStatus != MailConst.UN_FETCH)
                return -1;
            else if (a.attachStatus != MailConst.UN_FETCH && b.attachStatus == MailConst.UN_FETCH)
                return 1;
        }
        else if (!a.hasRead && b.hasRead)
            return -1;
        else if (a.hasRead && !b.hasRead)
            return 1;
        else {
            if (a.attachStatus == MailConst.UN_FETCH && b.attachStatus != MailConst.UN_FETCH)
                return -1;
            else if (a.attachStatus != MailConst.UN_FETCH && b.attachStatus == MailConst.UN_FETCH)
                return 1;
        }
        if (a.date > b.date)
            return -1;
        else if (a.date < b.date)
            return 1;
        return 0;
    };
    MailModel.prototype.checkNeedNotice = function () {
        var len = this.mailInfos.length;
        var result = false;
        for (var i = 0; i < len; i++) {
            if (!this.mailInfos[i].hasRead || this.mailInfos[i].attachStatus == MailConst.UN_FETCH) {
                result = true;
                break;
            }
        }
        this.dispatchEvent(new MailEvent(MailEvent.HIDE_SHOW_NOTICE, result));
    };
    return MailModel;
}(egret.EventDispatcher));
__reflect(MailModel.prototype, "MailModel");
//# sourceMappingURL=MailModel.js.map