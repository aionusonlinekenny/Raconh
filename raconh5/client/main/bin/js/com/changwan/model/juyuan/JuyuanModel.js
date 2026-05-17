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
 * drq
 * 聚元Model
 * 2018.4.2
 */
var JuyuanModel = /** @class */ (function (_super) {
    __extends(JuyuanModel, _super);
    function JuyuanModel() {
        var _this = _super.call(this) || this;
        _this._infoList = []; //魂球id列表
        _this._curId = 1; //当前id
        _this._toJuyuan = false;
        _this._cvo = JuyuanCVO.getCvo();
        return _this;
    }
    //存
    //读
    JuyuanModel.prototype.getInfoList = function () {
        this._infoList = [];
        this._infoList.push(this.getCurList());
        var go = this._curId - 1 + 45;
        var len = this._curId;
        for (var i = go; i > len; i--) {
            if (this._cvo[i - 1].star == 0 && this._cvo[i - 1].id != this.getCurList().id) {
                this._infoList.push(this._cvo[i - 1]);
            }
        }
        if (this._infoList[0].step == 0) {
            var length_1 = this._infoList.length;
            var arr = [];
            for (var j = 0; j < length_1; j++) {
                if (this._infoList[j].id <= this.getCurList().id) {
                    arr.push(this._infoList[j]);
                }
            }
            this._infoList = arr;
        }
        //排序
        for (var k = 0; k < this._infoList.length; k++) {
            for (var l = 0; l < this._infoList.length - 1; l++) {
                if (this._infoList[l].id > this._infoList[l + 1].id) {
                    var a = this._infoList[l + 1];
                    this._infoList[l + 1] = this._infoList[l];
                    this._infoList[l] = a;
                }
            }
        }
        return this._infoList;
    };
    JuyuanModel.prototype.getNextStepList = function (sortid) {
        var go = sortid - 1 + 45;
        var len = sortid;
        for (var i = go; i > len; i--) {
            if (this._cvo[i - 1].star == 0 && this._cvo[i - 1].id != this.getCurList().id) {
                return this._cvo[i - 1];
            }
        }
    };
    JuyuanModel.prototype.getCurList = function (curId) {
        if (curId === void 0) { curId = this._curId; }
        for (var i = 0; i < this._cvo.length; i++) {
            if (curId == this._cvo[i].sort_id) {
                return this._cvo[i];
            }
        }
    };
    JuyuanModel.prototype.checkCoin = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_JUYUAN))
            return false;
        var bool = false;
        var list = this.getCurList();
        if (list.consume) {
            var conList = ConditionVO.getVOList(list.cond);
            var conValue = conList[0].value;
            var curLevel = Manager.model.self.attrInfo.level;
            var arr = GainLossVO.parse(list.consume);
            var item = arr[0].num;
            var yinbi = arr[1].num;
            var cur_item = Manager.model.getItems().getCountItemById(arr[0].baseId);
            var cur_yinbi = Manager.model.self.attrInfo.coin;
            if (conValue <= curLevel && cur_item >= item && cur_yinbi >= yinbi) {
                bool = true;
            }
        }
        else {
            bool = true;
        }
        return bool;
    };
    //副本相关
    JuyuanModel.prototype.setCopyAni = function (localX, localY) {
        var info = Manager.pool.create(CollectionGameObjectInfo, egret.getTimer());
        info.x = localX;
        info.y = localY;
        info.updatePostion(info.x, info.y, false);
        info.setData("box", false, this.collectComplete, this);
        Manager.model.getGameobject().addGameObject(info);
        this.collectionInfo = info;
        Manager.render.add(this.pick, this, 1000);
    };
    JuyuanModel.prototype.pick = function () {
        Manager.render.remove(this.pick, this);
        this.collectionInfo.createGameObject().pick();
    };
    JuyuanModel.prototype.collectComplete = function () {
        Manager.control.getMaterialCopy().queryCollection();
        Manager.model.self.updateIsingState(BodyStateManger.ISING_COLLECT, false);
        Manager.model.getGameobject().removeGameObject(this.collectionInfo);
        this.createAni();
    };
    JuyuanModel.prototype.createAni = function () {
        this._ani01 = Manager.animation.createJuyuanAnimation("fuben01");
        this._ani01.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.createAni01, this);
        var self = Manager.model.self;
        this._ani01.x = self.x + self.view.width / 2 - 500 + 100;
        this._ani01.y = self.y + self.view.height / 2 - 500 - 100;
        // Manager.layer.elementLayer2.addChildAt(this._ani01, Manager.layer.elementLayer2.numChildren - 1);
        Manager.layer.elementLayer2.addChild(this._ani01);
    };
    JuyuanModel.prototype.createAni01 = function () {
        this._ani01.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.createAni01, this);
        this._ani02 = Manager.animation.createJuyuanAnimation("fuben03");
        this._ani02.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.createAni02, this);
        this._ani02.anchorOffsetX = 400;
        this._ani02.anchorOffsetY = 400;
        var self = Manager.model.self;
        var centerX = self.x + self.view.width / 2;
        var centerY = self.y + self.view.height / 2;
        this._ani02.x = centerX - 80;
        this._ani02.y = centerY - 200;
        //let angle:number = Math.atan2(this._ani02.y - centerY, this._ani02.x - centerX) * (180/Math.PI) - 90;
        this._ani02.rotation = 150;
        Manager.layer.elementLayer2.addChild(this._ani02);
    };
    JuyuanModel.prototype.createAni02 = function () {
        this._ani02.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.createAni02, this);
        this._ani03 = Manager.animation.createJuyuanAnimation("fuben02");
        this._ani03.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.aniEnd, this);
        var self = Manager.model.self;
        this._ani03.x = self.x + self.view.width / 2 - 500;
        this._ani03.y = self.y + self.view.height / 2 - 530;
        Manager.layer.elementLayer2.addChild(this._ani03);
    };
    JuyuanModel.prototype.aniEnd = function () {
        this._ani03.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.aniEnd, this);
        Manager.view.show(140 /* JuyuanResultView */, this._curId, 10, this.aniEndCallback);
    };
    JuyuanModel.prototype.aniEndCallback = function () {
        Manager.control.getCopy().exit();
        Manager.view.show(145 /* GfgPanel */, 1);
        this._curId += 1;
    };
    return JuyuanModel;
}(egret.EventDispatcher));
//# sourceMappingURL=JuyuanModel.js.map