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
 *人物视图
 * Anydo
 * create
 * update devil 2017-11-08
*/
var PlayerGameObject = (function (_super) {
    __extends(PlayerGameObject, _super);
    function PlayerGameObject() {
        return _super.call(this) || this;
    }
    PlayerGameObject.prototype.reuse = function (info) {
        this._playerGameObjectInfo = info;
        _super.prototype.reuse.call(this, info);
    };
    PlayerGameObject.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        Manager.pool.push(this._headContainer);
        this._headContainer = null;
        if (this._elementShow != null) {
            Manager.pool.push(this._elementShow);
            this._elementShow = null;
        }
        if (Manager.render.contains(this.callback, this)) {
            Manager.render.remove(this.callback, this);
        }
        if (this._composeTool != null) {
            Manager.pool.push(this._composeTool);
            this._composeTool = null;
        }
        if (this._txtName) {
            Manager.pool.push(this._txtName);
            this._txtName = null;
        }
        if (this._txtGuild) {
            Manager.pool.push(this._txtGuild);
            this._txtGuild = null;
        }
        if (this._iconVIP) {
            Manager.pool.push(this._iconVIP);
            this._iconVIP = null;
        }
        if (this._imgTitle != null) {
            Manager.pool.push(this._imgTitle);
            this._imgTitle = null;
        }
        this.removeTrainingEff();
        this._playerGameObjectInfo = null;
    };
    PlayerGameObject.prototype.start = function () {
        this._headContainer = Manager.pool.create(egret.DisplayObjectContainer);
        this.addChild(this._headContainer);
        this._composeTool = Manager.pool.create(HeadTopComposeTool);
        _super.prototype.start.call(this);
        this._headContainer.y = -180;
        this._elementShow = Manager.pool.create(ElementPlayerAnimation, this);
    };
    PlayerGameObject.prototype.eventSpeed = function () {
        this._action.updateSpeed();
    };
    PlayerGameObject.prototype.createAction = function () {
        this._action = Manager.pool.create(PlayerAction, this._aliveGameObjectInfo);
    };
    PlayerGameObject.prototype.drawName = function () {
        var isInit = this._txtName == null;
        if (isInit) {
            this._txtName = Manager.pool.create(egret.TextField);
            this._txtName.stroke = 2;
        }
        var color = this._playerGameObjectInfo.isSelfGO ? Color.SELF_NAME_STR : Color.WHITE_STR;
        var nameHtml = StringUtils.setParam(LangCVO.getContent("common1"), color, this._playerGameObjectInfo.attrInfo.nickName);
        this._txtName.width = 500;
        HtmlUtil.setTextFlow(this._txtName, nameHtml);
        this._txtName.width = this._txtName.textWidth + 10;
        this._txtName.height = 28;
        this._txtName.textAlign = "center";
        this._txtName.x = -this._txtName.width >> 1;
        if (this._txtName.parent == null)
            this._headContainer.addChild(this._txtName);
        if (isInit)
            this.headAddDisplayObj(this._txtName);
        this._composeTool.clearFlag();
        this.composeHeadTop();
    };
    PlayerGameObject.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    PlayerGameObject.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawName();
        this.drawAnimation();
        this.drawGuildName();
        this.drawVIP();
        this.drawTitle();
    };
    PlayerGameObject.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.GO_NAME))
            this.drawName();
        if (this.isInvalid(InvalidationType.GO_ANIMATION))
            this.drawAnimation();
        if (this.isInvalid(InvalidationType.GO_ACTION))
            this._elementShow.drawAction();
        if (this.isInvalid(InvalidationType.GO_DIRECTION))
            this._elementShow.drawDirection();
        if (this.isInvalid(InvalidationType.GO_DEAD))
            this._elementShow.drawDead();
        if (this.isInvalid(InvalidationType.GO_STYLE))
            this._elementShow.drawStyle();
        if (this.isInvalid(InvalidationType.GO_GUILD_NAME))
            this.drawGuildName();
        if (this.isInvalid(InvalidationType.GO_VIP))
            this.drawVIP();
        if (this.isInvalid(InvalidationType.GO_TITLE))
            this.drawTitle();
    };
    PlayerGameObject.prototype.drawAnimation = function () {
        this._elementShow.drawPlayerAnimation();
    };
    PlayerGameObject.prototype.getAnimation = function () {
        if (this._elementShow != null && this._elementShow.animation != null)
            return this._elementShow.animation;
        return null;
    };
    PlayerGameObject.prototype.eventDirection = function () {
        this.invalidate(InvalidationType.GO_DIRECTION);
    };
    PlayerGameObject.prototype.eventAction = function () {
        this.invalidate(InvalidationType.GO_ACTION);
    };
    PlayerGameObject.prototype.eventStyle = function () {
        this.invalidate(InvalidationType.GO_STYLE);
    };
    PlayerGameObject.prototype.eventPkMode = function () {
        this.invalidate(InvalidationType.GO_NAME);
    };
    PlayerGameObject.prototype.eventNickname = function () {
        this.invalidate(InvalidationType.GO_NAME);
    };
    PlayerGameObject.prototype.eventGuild = function () {
        this.invalidate(InvalidationType.GO_GUILD_NAME);
    };
    PlayerGameObject.prototype.eventVipLevel = function () {
        this.invalidate(InvalidationType.GO_VIP);
    };
    PlayerGameObject.prototype.eventLevel = function (oldLevel) {
    };
    PlayerGameObject.prototype.eventTitle = function () {
        this.invalidate(InvalidationType.GO_TITLE);
    };
    PlayerGameObject.prototype.eventTraining = function (isTraining) {
        if (isTraining) {
            this.removeTrainingEff();
            this._playerGameObjectInfo.setActionStr(FigureAction.SIT);
            if (this._playerGameObjectInfo.attrInfo.trainingType == 2 || this._playerGameObjectInfo.attrInfo.trainingType == 3) {
                var info = TrainingCVO.getPosInfo(this._playerGameObjectInfo.attrInfo.trainingPos);
                if (info)
                    this._playerGameObjectInfo.setDirection(info.direction);
            }
            this._trainingEff1 = Manager.animation.createEffectAnimation("training" + this._playerGameObjectInfo.attrInfo.trainingType + "1");
            this._trainingEff1.x = this._playerGameObjectInfo.x - 390;
            this._trainingEff1.y = this._playerGameObjectInfo.y - 390;
            Manager.layer.addChildToNodeByType(this._trainingEff1, this._trainingEff1.url, 2);
            this._trainingEff2 = Manager.animation.createEffectAnimation("training" + this._playerGameObjectInfo.attrInfo.trainingType + "2");
            this._trainingEff2.x = this._playerGameObjectInfo.x - 390;
            this._trainingEff2.y = this._playerGameObjectInfo.y - 400;
            Manager.layer.addChildToNodeByType(this._trainingEff2, this._trainingEff2.url, 1);
        }
        else {
            this.removeTrainingEff();
            this._playerGameObjectInfo.setActionStr(FigureAction.STAND);
        }
    };
    PlayerGameObject.prototype.removeTrainingEff = function () {
        if (this._trainingEff1) {
            Manager.pool.push(this._trainingEff1);
            this._trainingEff1 = null;
        }
        if (this._trainingEff2) {
            Manager.pool.push(this._trainingEff2);
            this._trainingEff2 = null;
        }
    };
    PlayerGameObject.prototype.eventAliveFlag = function () {
        _super.prototype.eventAliveFlag.call(this);
        this.invalidate(InvalidationType.GO_DEAD);
    };
    PlayerGameObject.prototype.eventJumpSyn = function (startPos, targets) {
        this._action.jump(startPos, targets);
    };
    PlayerGameObject.prototype.eventJumpHeight = function (h) {
        if (this._shadow != null) {
            this._shadow.y = this._info.y - 20.5 + h;
            var scale = 1 - 0.4 * h / 220;
            this._shadow.scaleX = this._shadow.scaleY = this._shadow.alpha = scale;
        }
    };
    PlayerGameObject.prototype.eventBlood = function () {
        if (this._bloodStrip3)
            this._bloodStrip3.updateBlood();
    };
    PlayerGameObject.prototype.eventStrip = function (value) {
        if (value)
            this.showStrip();
        else
            this.hideStrip();
    };
    PlayerGameObject.prototype.drawColorFilter = function () {
        this._elementShow.drawColorFilter();
    };
    //``````````````````````````````````````````````````````````````````````````````````````
    PlayerGameObject.prototype.showStrip = function () {
        // if(this._bloodStrip == null)
        // {
        // 	this._bloodStrip = Manager.pool.create(BloodStripView, this._info);
        // }
        // if(this._bloodStrip.parent == null)
        // {
        // 	this._headContainer.addChild(this._bloodStrip);
        // 	this._bloodStrip.visible = false;
        // 	this.headAddDisplayObj(this._bloodStrip);
        // 	this.composeHeadTop(this.addBlood);
        // }
        if (this._bloodContainer == null) {
            this._bloodContainer = ObjectUtil.createConainer(false, false);
        }
        if (this._bloodStrip3 == null) {
            this._bloodStrip3 = new BloodStripView2(this._bloodContainer, this._bloodContainer, this._info);
        }
        if (this._bloodContainer.parent == null) {
            this._headContainer.addChild(this._bloodContainer);
            this._bloodContainer.visible = false;
            this.headAddDisplayObj(this._bloodContainer);
            this.composeHeadTop(this.addBlood);
        }
    };
    PlayerGameObject.prototype.hideStrip = function () {
        // if(this._bloodStrip && this._bloodStrip.parent)
        // {
        // 	super.hideStrip();
        // 	this._composeTool.removeImage(this._bloodStrip);
        // 	this._composeTool.compose();
        // }
        if (this._bloodContainer && this._bloodContainer.parent) {
            _super.prototype.hideStrip.call(this);
            this._composeTool.removeImage(this._bloodContainer);
            this._composeTool.compose();
        }
    };
    PlayerGameObject.prototype.headAddDisplayObj = function (obj, offsetY, offsetX) {
        if (offsetY === void 0) { offsetY = 5; }
        if (offsetX === void 0) { offsetX = 0; }
        var arr = this.getComposePlace(obj);
        if (arr)
            this._composeTool.addImage(obj, arr[0], arr[1], offsetY, offsetX);
    };
    PlayerGameObject.prototype.getComposePlace = function (obj) {
        //名字初始为null，特殊处理该行
        var line2A = [this._iconVIP]; //_pkImg, _iconTeam2, _iconPVip, _iconVip, _zsIcon
        //名字
        if (this._txtName != null && obj && obj.text == this._txtName.text)
            return [1, line2A.length];
        var arr = [[this._bloodContainer], line2A, [this._txtGuild], [this._imgTitle]];
        for (var i = arr.length - 1; i >= 0; i--) {
            var index = arr[i].indexOf(obj);
            if (index != -1)
                return [i, index];
        }
        return null;
    };
    PlayerGameObject.prototype.composeHeadTop = function (endFun) {
        if (endFun === void 0) { endFun = null; }
        //延时执行，多个调用过来只执行一次compose
        Manager.render.add(this.callback, this, 1000, 1, endFun, true);
    };
    PlayerGameObject.prototype.callback = function () {
        this._composeTool.compose();
    };
    PlayerGameObject.prototype.addBlood = function () {
        this._bloodContainer.visible = true;
    };
    PlayerGameObject.prototype.drawGuildName = function () {
        if (this._playerGameObjectInfo.attrInfo.guildName == "") {
            if (this._txtGuild != null) {
                this._composeTool.removeImage(this._txtGuild);
                ObjectUtil.remove(this._txtGuild);
            }
        }
        else {
            if (this._txtGuild == null) {
                this._txtGuild = Manager.pool.create(egret.TextField);
                this._txtGuild.textAlign = "center";
            }
            if (this._txtGuild.parent == null)
                this._headContainer.addChild(this._txtGuild);
            var careerId = this._playerGameObjectInfo.attrInfo.guildJob;
            var colorStr = "";
            if (careerId <= 10)
                colorStr = Color.BLUE_STR;
            else if (careerId > 10 && careerId <= 30)
                colorStr = Color.PURPLE_STR;
            else if (careerId > 30 && careerId <= 40)
                colorStr = Color.ORANGE_STR;
            else if (careerId > 40)
                colorStr = Color.RED_STR;
            var guildHtml = StringUtils.setParam(LangCVO.getContent("common1"), Color.GUILD_NAME_STR, "[" + this._playerGameObjectInfo.attrInfo.guildName + "]" + "<font color='" + colorStr + "'>" + this._playerGameObjectInfo.attrInfo.guildJobName + "</font>");
            HtmlUtil.setTextFlow(this._txtGuild, guildHtml);
            this._txtGuild.width = 200;
            this._txtGuild.x = -this._txtGuild.width >> 1;
            this._composeTool.clearFlag();
            this.headAddDisplayObj(this._txtGuild);
        }
        this.composeHeadTop();
    };
    PlayerGameObject.prototype.drawVIP = function () {
        if (this._playerGameObjectInfo.attrInfo.vipLevel > 0) {
            if (!this._iconVIP)
                this._iconVIP = Manager.pool.create(BitmapRes, "chat_vip_png", this.loadTitleOrVipCallBack, this);
            if (this._iconVIP.parent == null)
                this._headContainer.addChild(this._iconVIP);
            this._composeTool.clearFlag();
            this.headAddDisplayObj(this._iconVIP, 0, 0);
        }
        else {
            if (this._iconVIP != null) {
                this._composeTool.removeImage(this._iconVIP);
                ObjectUtil.remove(this._iconVIP);
            }
        }
        this.composeHeadTop();
    };
    PlayerGameObject.prototype.drawTitle = function () {
        if (this._playerGameObjectInfo.attrInfo.titleId > 0) {
            var path = Manager.path.getTitlePath(this._playerGameObjectInfo.attrInfo.titleId);
            if (!this._imgTitle)
                this._imgTitle = Manager.pool.create(BitmapRemote);
            this._imgTitle.load(path, -1, -1, this.loadTitleOrVipCallBack, this);
            if (this._imgTitle.parent == null)
                this._headContainer.addChild(this._imgTitle);
            this._composeTool.clearFlag();
            this.headAddDisplayObj(this._imgTitle);
        }
        else {
            if (this._imgTitle != null) {
                this._composeTool.removeImage(this._imgTitle);
                ObjectUtil.remove(this._imgTitle);
            }
        }
        this.composeHeadTop();
    };
    /**加载头顶称号图片回调 */
    PlayerGameObject.prototype.loadTitleOrVipCallBack = function () {
        if (this._composeTool != null) {
            this._composeTool.clearFlag();
            this.composeHeadTop();
        }
    };
    //```````````````````````````````````````````````````````````````````````````````````````````````
    PlayerGameObject.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        // let pet:PetGameObjectInfo = this._playerGameObjectInfo.getPet();
        // if(pet)
        // {
        // 	Manager.model.getGameobject().removeGameObject(pet);
        // 	this._playerGameObjectInfo.setPet(null);
        // }
        Manager.pool.push(this._headContainer);
        this._headContainer = null;
        if (this._txtName != null) {
            Manager.pool.push(this._txtName);
            this._txtName = null;
        }
        this._playerGameObjectInfo = null;
        if (this._elementShow != null) {
            Manager.pool.push(this._elementShow);
            this._elementShow = null;
        }
        if (Manager.render.contains(this.callback, this)) {
            Manager.render.remove(this.callback, this);
        }
        if (this._composeTool != null) {
            Manager.pool.push(this._composeTool);
            this._composeTool = null;
        }
        if (this._txtGuild != null) {
            Manager.pool.push(this._txtGuild);
            this._txtGuild = null;
        }
        if (this._iconVIP != null) {
            ObjectUtil.remove(this._iconVIP);
            this._iconVIP.bitmapData = null;
            this._iconVIP = null;
        }
        if (this._imgTitle != null) {
            Manager.pool.push(this._imgTitle);
            this._imgTitle = null;
        }
        this.removeTrainingEff();
    };
    return PlayerGameObject;
}(AliveGameObject));
__reflect(PlayerGameObject.prototype, "PlayerGameObject");
//# sourceMappingURL=PlayerGameObject.js.map