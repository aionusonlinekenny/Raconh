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
 *author Anydo
 *create 2017-11-17
 *description
*/
var SkillLineEffect = /** @class */ (function (_super) {
    __extends(SkillLineEffect, _super);
    function SkillLineEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkillLineEffect.prototype.getIsInFeet = function () { return this._isInFeet; };
    SkillLineEffect.prototype.getSortIndex = function () { return this._sortIndex; };
    Object.defineProperty(SkillLineEffect.prototype, "url", {
        get: function () { return Manager.path.getSkillPath("skill" + this._effectID).url; },
        enumerable: true,
        configurable: true
    });
    /**
     * 直线技能特效
     * @param config type#特效id#层级index#x偏移,y偏移#rotationType#地图层级0人物上层1人物下层#configStr
     * @param config type: 单线/扇形:1   圆形:2
     * @param config rotationType: 0:不处理 1:角色向左自动垂直翻转 2:特效只分左右方向不分8方向，且角色向左自动垂直翻转
     * @param config configStr: a,b,c,d|a,b,c,d..  (a为特效离中心点距离,b角度(360=360°),c出现时间(ms),d移动配置(延迟秒数&起始速度&加速度&相对起始点的X偏移&相对起始点的Y偏移))
     * @param rotation 对目标角度
     * @param correctRotation 是否需要纠正角度（人物需要，怪物宠物不需要）
     */
    SkillLineEffect.prototype.reuse = function (config, rotation, correctRotation) {
        if (rotation === void 0) { rotation = 0; }
        if (correctRotation === void 0) { correctRotation = false; }
        this._curLife = 0;
        this._countCur = 0;
        this._cons = [];
        this._anis = [];
        this.parseConfig(config, rotation, correctRotation);
        Manager.render.add(this.render, this);
        Manager.render.add(this.overtimeHandler, this, 4000, 1);
        _super.prototype.reuse.call(this);
    };
    SkillLineEffect.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        Manager.render.remove(this.render, this);
        Manager.render.remove(this.overtimeHandler, this);
        Manager.render.remove(this.checkAllComplete, this);
        this._effectID = 0;
        this._rotation = 0;
        this._curLife = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        this._countCur = 0;
        this._countTotal = 0;
        this._sortIndex = 0;
        this._isInFeet = false;
        for (var i = 0; i < this._anis.length; i++) {
            this._anis[i].removeEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.aniLoadFail, this);
            this._anis[i].removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.playComplete, this);
            // Manager.pool.push(this._anis[i]);
            this._anis[i] = null;
        }
        this._anis = null;
        for (var j = 0; j < this._cons.length; j++) {
            Manager.pool.push(this._cons[j]);
            this._cons[j] = null;
        }
        this._cons = null;
        for (var k = 0; k < this._infos.length; k++) {
            Manager.pool.push(this._infos[k]);
            this._infos[k] = null;
        }
        this._infos = null;
    };
    SkillLineEffect.prototype.parseConfig = function (config, rotation, correctRotation) {
        this._infos = [];
        if (config[0] == "1") {
            while (rotation < 0) {
                rotation += 360;
            }
            rotation = rotation % 360;
            if (config[4] == "2")
                this._rotation = (rotation > 90 && rotation < 270) ? 180 : 0; //config[4]=2时，只分左右两方向
            else if (correctRotation)
                this._rotation = GameUtil.getRotationDirectionByRotation(rotation);
        }
        else if (config[0] == "2")
            this._rotation = 0;
        this._effectID = parseInt(config[1]);
        this._sortIndex = parseInt(config[2]);
        var brr = config[3].split(",");
        this._offsetX = parseInt(brr[0]);
        this._offsetY = parseInt(brr[1]);
        var autoOverturn = ((config[4] != "0") && (config[0] == "1") && ((this._rotation > 90) && (this._rotation < 270)));
        this._isInFeet = (config[5] == "1");
        var crr = config[6].split("|");
        for (var i = 0; i < crr.length; i++) {
            var info = Manager.pool.create(SkillLineInfo, crr[i], this._rotation, autoOverturn);
            this._infos.push(info);
        }
        this._countTotal = this._infos.length;
    };
    SkillLineEffect.prototype.render = function (interval) {
        var that = this;
        var con;
        for (var i = 0; i < that._cons.length; i++) {
            con = that._cons[i];
            if (con.moveInfo == null)
                continue;
            if ((con.x == con.moveInfo.targetX) && (con.y == con.moveInfo.targetY))
                continue;
            var arr = con.moveInfo.getRunDiS(interval);
            var disX = arr[0];
            var disY = arr[1];
            var moveEnd = void 0;
            if (con.x != con.moveInfo.targetX) {
                moveEnd = false;
                con.x = con.moveInfo.startX + disX;
                if ((con.moveInfo.startX < con.moveInfo.targetX) && (con.x > con.moveInfo.targetX))
                    moveEnd = true;
                else if ((con.moveInfo.startX > con.moveInfo.targetX) && (con.x < con.moveInfo.targetX))
                    moveEnd = true;
                if (moveEnd)
                    con.x = con.moveInfo.targetX;
            }
            if (con.y != con.moveInfo.targetY) {
                moveEnd = false;
                con.y = con.moveInfo.startY + disY;
                if ((con.moveInfo.startY < con.moveInfo.targetY) && (con.y > con.moveInfo.targetY))
                    moveEnd = true;
                else if ((con.moveInfo.startY > con.moveInfo.targetY) && (con.y < con.moveInfo.targetY))
                    moveEnd = true;
                if (moveEnd)
                    con.y = con.moveInfo.targetY;
            }
        }
        that._curLife += interval;
        var one;
        for (var j = that._infos.length - 1; j >= 0; j--) {
            one = that._infos[j];
            if (one.showTime < that._curLife) {
                that.createOneEffect(one);
                Manager.pool.push(one);
                that._infos.splice(j, 1);
            }
        }
    };
    SkillLineEffect.prototype.createOneEffect = function (info) {
        var con = Manager.pool.create(SkillConfigSprite, info.rotation, info.moveConfig);
        con.x = this._offsetX;
        con.y = this._offsetY;
        var ani = Manager.animation.createSkillAnimation(this._effectID);
        ani.addEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.aniLoadFail, this);
        ani.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.playComplete, this);
        con.addChild(ani);
        if (info.autoOverturn)
            con.scaleY *= -1;
        var ro = this._rotation + info.angle;
        con.rotation = ro;
        if (info.dis != 0) {
            var vd = new Vector2D(1, 0);
            vd.angle = ro * Math.PI / 180;
            vd.length = Math.abs(info.dis);
            con.x = this._offsetX + ((info.dis > 0) ? 1 : -1) * vd.x;
            con.y = this._offsetY + ((info.dis > 0) ? 1 : -1) * vd.y;
        }
        this.addChild(con);
        this._anis.push(ani);
        this._cons.push(con);
        if (con.moveInfo != null)
            con.moveInfo.setStart(con.x, con.y);
    };
    SkillLineEffect.prototype.aniLoadFail = function (e) {
        this._countCur++;
        Manager.render.add(this.checkAllComplete, this, 100, 1, null, true); //加载失败时延迟执行checkAllComplete，避免对象池直接回收this，导致报错
    };
    SkillLineEffect.prototype.playComplete = function (e) {
        this._countCur++;
        this.checkAllComplete();
    };
    SkillLineEffect.prototype.checkAllComplete = function () {
        if (this._countCur >= this._countTotal) {
            Manager.pool.push(this);
        }
    };
    SkillLineEffect.prototype.overtimeHandler = function (interval) {
        Manager.pool.push(this);
    };
    SkillLineEffect.prototype.disposeSelf = function () {
        Manager.render.remove(this.render, this);
        Manager.render.remove(this.overtimeHandler, this);
        Manager.render.remove(this.checkAllComplete, this);
        _super.prototype.disposeSelf.call(this);
        for (var i = 0; i < this._anis.length; i++) {
            this._anis[i].removeEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.aniLoadFail, this);
            this._anis[i].removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.playComplete, this);
            Manager.pool.push(this._anis[i]);
            this._anis[i] = null;
        }
        this._anis = null;
        for (var j = 0; j < this._cons.length; j++) {
            Manager.pool.push(this._cons[j]);
            this._cons[j] = null;
        }
        this._cons = null;
        for (var k = 0; k < this._infos.length; k++) {
            Manager.pool.push(this._infos[k]);
            this._infos[k] = null;
        }
        this._infos = null;
    };
    return SkillLineEffect;
}(Sprite));
//# sourceMappingURL=SkillLineEffect.js.map