var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 副本表
 * luzhihong
 * create 2017-12-2
 */
var CopyCVO = (function () {
    function CopyCVO() {
        /*是否通关过*/
        this.hasPass = false;
        /*进入层数*/
        this.cell = 0;
        /*已进入次数*/
        this.enterNum = 0;
        /*结束时间*/
        this.endTime = 0;
    }
    /*解析表*/
    CopyCVO.parseCVOs = function (bytes) {
        this._bytes = new egret.ByteArray();
        this._bytes.writeBytes(bytes);
        this._bytes.position = 0;
        var tabCount = this._bytes.readByte();
        // let tabCount:number = bytes.readByte();
        Manager.render.add(this.render, this);
        // CopyCVO.parse(bytes);
        // MainCopyCVO.parse(bytes);
        // TowerCopyCVO.parse(bytes);
        // CopySilverHardCVO.parse(bytes);
        // MaterialCopyCVO.parse(bytes);
    };
    CopyCVO.render = function (interval) {
        if (this._step == 0) {
            CopyCVO.parse(this._bytes);
            this._step = 1;
        }
        else if (this._step == 1) {
            MainCopyCVO.parse(this._bytes);
            this._step = 2;
        }
        else if (this._step == 2) {
            TowerCopyCVO.parse(this._bytes);
            this._step = 3;
        }
        else if (this._step == 3) {
            CopySilverHardCVO.parse(this._bytes);
            this._step = 4;
        }
        else if (this._step == 4) {
            MaterialCopyCVO.parse(this._bytes);
            this._step = 5;
        }
        else if (this._step == 5) {
            JuyuanCopyCVO.parse(this._bytes);
            Manager.render.remove(this.render, this);
            this._bytes.clear();
            this._bytes = null;
            Manager.cvo.complete();
        }
    };
    /*解析表*/
    CopyCVO.parse = function (bytes) {
        CopyCVO._cvos = [];
        var cvo;
        var rowCount = bytes.readShort();
        for (var j = 0; j < rowCount; j++) {
            cvo = new CopyCVO();
            cvo.id = bytes.readShort();
            cvo.name = bytes.readUTF();
            cvo.type = bytes.readByte();
            cvo.conditions = ConditionVO.getVOList(bytes.readUTF());
            cvo.loss = GainLossVO.parse(bytes.readUTF());
            cvo.bossID = bytes.readInt();
            cvo.awardDesc = bytes.readUTF();
            cvo.show = GainLossVO.parse(bytes.readUTF());
            cvo.saodangCond = new ConditionVO(bytes.readUTF());
            CopyCVO._cvos[cvo.id] = cvo;
        }
    };
    CopyCVO.getCVO = function (id) {
        return CopyCVO._cvos[id];
    };
    CopyCVO.getCVOsByType = function (type) {
        var result = [];
        for (var key in this._cvos) {
            if (this._cvos[key].type == type)
                result.push(this._cvos[key]);
        }
        return result;
    };
    //动态数据-------------------------------------------------------------
    CopyCVO.prototype.update = function (curCell, curNum) {
        this.cell = curCell;
        this.enterNum = curNum;
        this.hasPass = true; //只要发过来，就是已通关过
        Manager.model.getCopy().dispatchEvent(new CopyEvent(CopyEvent.UPDATE_SINGLE, this));
    };
    Object.defineProperty(CopyCVO.prototype, "leftTime", {
        /*剩余时间*/
        get: function () {
            var left = Math.floor(this.endTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
            return left > 0 ? left : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyCVO.prototype, "boss", {
        get: function () {
            if (!this._bossCVO)
                this._bossCVO = MonsterCVO.getCVO(this.bossID);
            return this._bossCVO;
        },
        enumerable: true,
        configurable: true
    });
    /**满足所有进入消耗 */
    CopyCVO.prototype.isLossEnough = function (showTips, showItemTips) {
        if (showTips === void 0) { showTips = false; }
        if (showItemTips === void 0) { showItemTips = false; }
        for (var i = this.loss.length - 1; i >= 0; i--) {
            if (!this.loss[i].isEnough(showTips, showItemTips))
                return false;
        }
        return true;
    };
    /**满足所有开启条件 */
    CopyCVO.prototype.isAllCondSatisfy = function (showTips) {
        if (showTips === void 0) { showTips = false; }
        for (var i = this.conditions.length - 1; i >= 0; i--) {
            if (!this.conditions[i].isSatisfy(null, showTips))
                return false;
        }
        return true;
    };
    /**是否满足指定开启条件 */
    CopyCVO.prototype.isCondSatisfy = function (types, showTips) {
        if (showTips === void 0) { showTips = false; }
        for (var i = this.conditions.length - 1; i >= 0; i--) {
            if (types.indexOf(this.conditions[i].type) != -1 && !this.conditions[i].isSatisfy(null, showTips)) {
                return false; //
            }
        }
        return true;
    };
    CopyCVO.prototype.getCondByType = function (type) {
        for (var i = this.conditions.length - 1; i >= 0; i--) {
            if (this.conditions[i].type == type) {
                return this.conditions[i]; //
            }
        }
        return null;
    };
    Object.defineProperty(CopyCVO.prototype, "enterTotal", {
        /**副本进入总次数 */
        get: function () {
            var condVo = this.getCondByType(ConditionVO.COPY_LIMIT); //是否为副本次数限制
            return condVo != null ? condVo.value2 : 0; //
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyCVO.prototype, "leftNum", {
        /**副本进入剩余次数 */
        get: function () {
            var value = this.enterTotal - this.enterNum;
            return value > 0 ? value : 0;
        },
        enumerable: true,
        configurable: true
    });
    CopyCVO._step = 0;
    return CopyCVO;
}());
__reflect(CopyCVO.prototype, "CopyCVO");
//# sourceMappingURL=CopyCVO.js.map