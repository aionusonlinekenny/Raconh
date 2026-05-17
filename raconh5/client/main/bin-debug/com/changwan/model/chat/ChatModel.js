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
/**
 * 聊天model
 * liangyan
 * create 2017-11-13
*/
var ChatModel = (function (_super) {
    __extends(ChatModel, _super);
    function ChatModel() {
        var _this = _super.call(this) || this;
        /**存储聊天频道聊天信息 */
        _this._chatDatas = {};
        _this.init();
        return _this;
    }
    ChatModel.prototype.init = function () {
        this.chatTopWarm = "";
        this.curPropDatas = [];
        this.curPropDatas.length = 5;
        this._chatDatas = new Dictionary();
        this._chatDatas[ChatChannelType.SYSTEM] = new Array();
        this._chatDatas[ChatChannelType.WORLD] = new Array();
        this._chatDatas[ChatChannelType.CORPS] = new Array();
    };
    ChatModel.prototype.pushInfo = function (info, channel) {
        this._chatDatas[channel].push(info);
        this.dispatchEvent(new ChatEvent(ChatEvent.ADD_CHANNEL_MSG, channel));
    };
    ChatModel.prototype.getInfos = function (channel) {
        return this._chatDatas[channel];
    };
    /**是否被系统禁言 */
    ChatModel.prototype.checkDisableSendMsg = function () {
        if (this.disableEndTime <= 0)
            return false;
        if ((Manager.model.getLogin().serverTimeInfo.serverTime / 1000) > this.disableEndTime)
            return false;
        return true;
    };
    /** 判断装备信息体是否有效*/
    ChatModel.prototype.checkPropInfo = function (str, txt, props) {
        var prop;
        var tempPropName1;
        var tempPropName2;
        var tempPropName3;
        var length = props.length;
        for (var i = 0; i < length; i++) {
            prop = props[i];
            tempPropName1 = prop.goodsName;
            tempPropName2 = txt.substr(0, tempPropName1.length + 4);
            //剔除格式只显示装备名称,添加LinkEvent
            tempPropName3 = "<u><font color='" + prop.color + "'><a href='event:prop|" + prop.ownerID + "|" + prop.goodsID + "'>" + prop.goodsName + "</a></font></u>";
            str = str.replace(tempPropName2, tempPropName3);
        }
        return str;
    };
    ChatModel.prototype.parseLink = function (content, params) {
        var len = params ? params.length : 0;
        var str;
        var links = [];
        for (var i = 0; i < len; i++) {
            var temp = void 0;
            switch (params[i].type) {
                case SysNoticeParamType.PLAYER://human|id|serverID|name
                    temp = params[i].content.split(",");
                    str = "<u><font color='" + Color.GREEN_STR + "'><a href='event:" + "human|" + temp[2] + "|" + temp[1] + "|" + temp[0] + "'>"
                        + temp[2] + "</a></font></u>";
                    break;
                case SysNoticeParamType.GOODS://prop|base_id|bind|count
                    temp = params[i].content.split(",");
                    var goodsCvo = ItemsCVO.getCvo(Number(temp[0]));
                    if (!goodsCvo) {
                        str = "查无此物id:" + temp[0];
                        break;
                    }
                    str = "<u><font color='" + Color.getColorStrByQuality(goodsCvo.quality) + "'><a href='event:"
                        + "prop|" + temp[0] + "|" + temp[1] + "|" + temp[2] + "'>"
                        + (goodsCvo ? goodsCvo.name : "查无此物id:" + temp[0]) + "</a></font></u>";
                    break;
                case SysNoticeParamType.NUMBER:
                case SysNoticeParamType.STRING:
                    str = params[i].content;
                    break;
                case SysNoticeParamType.OPEN_PANEL://panel|id
                    str = "<u><font color='" + Color.GREEN_STR + "'><a href='event:" + "panel|" + params[i].content + "'>" + params[i].content + "</a></font></u>";
                    break;
                case SysNoticeParamType.GOODS_LIST:
                    temp = params[i].content.split(",");
                    var arrLen = temp ? Number(temp.length / 3) : 0;
                    var arr = void 0;
                    var goodsInfo = void 0;
                    str = "";
                    for (var i_1 = 0; i_1 < arrLen; i_1++) {
                        arr = temp.splice(0, 3);
                        goodsInfo = ItemsCVO.getCvo(Number(arr[0]));
                        if (!goodsInfo) {
                            str = "查无此物id:" + arr[0];
                            break;
                        }
                        str += "<u><font color='" + Color.getColorStrByQuality(goodsInfo.quality) + "'><a href='event:"
                            + "prop|" + arr[0] + "|" + arr[1] + "|" + arr[2] + "'>"
                            + (goodsInfo ? goodsInfo.name : "查无此物id:" + arr[0]) + "</a></font></u>";
                        if (i_1 != arrLen - 1)
                            str += "，";
                    }
                    break;
            }
            links.push(str);
        }
        content = StringUtils.setParamArr(content, links);
        return content;
    };
    /**聊天频道消息最大数 */
    ChatModel.MAX_MSG = 10;
    return ChatModel;
}(egret.EventDispatcher));
__reflect(ChatModel.prototype, "ChatModel");
//# sourceMappingURL=ChatModel.js.map