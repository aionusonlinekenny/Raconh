/**
 * luzh
 * 平台sdk Manager
 * 2018.3.28
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlatformManager = (function () {
    function PlatformManager() {
    }
    PlatformManager.prototype.init = function (completeCallBack, target) {
        var _this = this;
        var locationSearch = decodeURIComponent(window.location.search);
        Manager.socket.isWss = (window.location.protocol === "https:");
        Manager.config.platform = this.jsGetHttpParam("platform", locationSearch);
        Manager.config.apiUrl = this.jsGetHttpParam("apiUrl", locationSearch);
        // if(DEBUG)
        // {
        //     if(Manager.config.platform == "") Manager.config.platform = PlatformConst.P_DEFAULT;
        //     if(Manager.config.apiUrl == "") Manager.config.apiUrl = "http://127.0.0.1:8200/api/";
        // }
        if (Manager.config.platform == "")
            Manager.config.platform = PlatformConst.P_DEFAULT;
        if (Manager.config.apiUrl == "")
            Manager.config.apiUrl = location.href.split("?")[0].replace(/[^\/]*$/, "") + "api/";
        switch (Manager.config.platform) {
            case PlatformConst.P_KU_DAI://裤袋平台
                var kudaiURL = Manager.socket.isWss ? "https://kdsdk.04wan.com/js/kudaigame_v3.js?v=" : "http://kdsdk.04wan.com/js/kudaigame_v3.js?v=";
                this.loadScript(kudaiURL + version, function () { _this.initKuDai(completeCallBack, target); });
                break;
            default:
                this.initCommon(locationSearch, completeCallBack, target);
        }
    };
    //初始化通用平台
    PlatformManager.prototype.initCommon = function (locationSearch, completeCallBack, target) {
        Manager.model.getLogin().clientName = this.jsGetHttpParam("username", locationSearch);
        Manager.model.getLogin().logintTime = parseInt(this.jsGetHttpParam("timestamp", locationSearch));
        Manager.model.getLogin().loginBunch = this.jsGetHttpParam("sign", locationSearch);
        //加载平台玩家数据，初始化完成后回调
        completeCallBack.call(target);
    };
    PlatformManager.prototype.jsGetHttpParam = function (paras, locationSearch) {
        var reg = new RegExp("(^|&)" + paras + "=([^&]*)(&|$)", "i");
        var r = locationSearch.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    };
    //初始化裤袋平台
    PlatformManager.prototype.initKuDai = function (completeCallBack, target) {
        KUDAIGAME.init(function () {
            KUDAIGAME.login(function (jsonData) {
                // {
                //     "code":0,  // 状态码：0成功，非0失败
                //     "msg":"success",  // 错误信息
                //     "data":
                //     {
                //         "uid":"10001", //用户id ，必要参数
                //         "channel":"kudai", // 渠道号，必要参数
                //         "timestamp":"1472581060",//时间戳，必要参数
                //         "sign":"3e20c42182749d616a2d92a336f735d4",//签名，必要参数
                //         ......// 其他参数
                //     } 
                // }
                if (jsonData == null || jsonData.code != 0) {
                    Trace.trace("请示玩家数据失败", jsonData ? " msg:" + jsonData.msg : " ", " KUDAIGAME.login.jsonData" + JSON.stringify(jsonData));
                    return;
                }
                //初始化平台玩家数据
                Manager.model.getLogin().clientName = jsonData.data.uid;
                Manager.model.getLogin().channel = jsonData.data.channel;
                Manager.model.getLogin().logintTime = jsonData.data.timestamp;
                Manager.model.getLogin().loginBunch = jsonData.data.sign;
                Manager.model.getLogin().loginOtherData = JSON.stringify(jsonData.data);
                //加载平台玩家数据，初始化完成后回调
                completeCallBack.call(target);
            });
            var bool = KUDAIGAME.share_check();
            Manager.model.getshare().canShare = (bool.type != false); //支持分享功能，设置分享成功回调操作 ;
        });
    };
    /*充值
     * @param num 充值金额
     * @param type (0-普通充值 1-投资计划 2-特权充值)
     * */
    PlatformManager.prototype.pay = function (num, type) {
        if (type === void 0) { type = 0; }
        switch (Manager.config.platform) {
            case PlatformConst.P_KU_DAI://裤袋平台
                this.kudaiPay(num * 100, type);
                break;
            default:
        }
    };
    /*裤袋平台充值
     * @param num 充值金额（单位：分）
     * @param type (0-普通充值 1-投资计划 2-特权充值)
     * */
    PlatformManager.prototype.kudaiPay = function (num, type) {
        // appid : 1000047 key:88589689c85dea6e79bdf4502a50c0db
        var myOrder = {
            "uid": Manager.model.getLogin().clientName,
            "channel": Manager.model.getLogin().channel,
            "amount": num + "",
            "subject": type + "." + num + "元(RMB)",
            "appid": "1000047",
            "server_id": Manager.model.getLogin().serverId + "",
            "game_uid": Manager.model.self.id + "",
            "role_name": Manager.model.self.attrInfo.nickName,
            "ext": type + ""
        };
        var url = Manager.config.apiUrl + PlatformConst.P_KU_DAI + "/pay_order.php"; //向后台请求order
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        request.data = new egret.URLVariables("data=" + JSON.stringify(myOrder));
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, function (event) {
            var loader = event.target;
            var data = loader.data;
            var orderJson = JSON.parse(data.toString());
            //用后台返回的order，向裤袋平台请求充值
            KUDAIGAME.pay(orderJson, function () {
                // Trace.trace("购买成功！");
            });
        }, this);
        loader.load(request);
    };
    //充值
    PlatformManager.prototype.share = function () {
        switch (Manager.config.platform) {
            case PlatformConst.P_KU_DAI://裤袋平台
                this.kudaiShare();
                break;
            default:
                Manager.control.getshare().shareInfo(); //分享成功后，发协议通知后端
        }
    };
    //裤袋平台分享
    PlatformManager.prototype.kudaiShare = function () {
        if (Manager.model.getshare().canShare) {
            KUDAIGAME.share_success(function () {
                Manager.control.getshare().shareInfo(); //分享成功后，发协议通知后端
                // Trace.trace("分享成功！");
            });
            KUDAIGAME.share(function () {
                // Trace.trace('调起分享');
            });
        }
        else {
            Trace.trace("裤袋平台不支持分享！");
        }
    };
    //加载script文件
    PlatformManager.prototype.loadScript = function (url, completeCallback) {
        var _this = this;
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.onload = function () {
            if (completeCallback != null)
                completeCallback();
        };
        script.onerror = function () {
            script.parentNode.removeChild(script);
            setTimeout(function () { _this.loadScript(url, completeCallback); }, 1000);
        };
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };
    return PlatformManager;
}());
__reflect(PlatformManager.prototype, "PlatformManager");
//# sourceMappingURL=PlatformManager.js.map