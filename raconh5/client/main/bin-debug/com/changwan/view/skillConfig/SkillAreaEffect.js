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
 *author Anydo
 *create 2017-11-17
 *description
*/
var SkillAreaEffect = (function (_super) {
    __extends(SkillAreaEffect, _super);
    function SkillAreaEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkillAreaEffect.prototype.getIsInFeet = function () { return this._isInFeet; };
    SkillAreaEffect.prototype.getSortIndex = function () { return this._sortIndex; };
    Object.defineProperty(SkillAreaEffect.prototype, "url", {
        get: function () { return Manager.path.getSkillPath("skill" + this._effectID).url; },
        enumerable: true,
        configurable: true
    });
    /**
     * 区域技能特效
     * @param config type#特效id#层级index#地图层级0人物上层1人物下层#configStr
     * @param config type: 单线/扇形:1   圆形:2
     * @param config configStr: a,b,c,d,e,f,g|a,b,c,d,e,f,g..  (a特效距离中心点距离,b公转角度(360=360°),c出现时间(ms),d水平缩放,e垂直缩放,f自转角度(360=360°),g移动配置(延迟秒数&起始速度&加速度&相对起始点的X偏移&相对起始点的Y偏移))
     * @param rotation 对目标角度
     */
    SkillAreaEffect.prototype.reuse = function (config, rotation) {
        if (rotation === void 0) { rotation = 0; }
        this._curLife = 0;
        this._countCur = 0;
        this._cons = [];
        this._anis = [];
        this.parseConfig(config, rotation);
        Manager.render.add(this.render, this);
        Manager.render.add(this.overtimeHandler, this, 4000, 1);
        _super.prototype.reuse.call(this);
    };
    SkillAreaEffect.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        Manager.render.remove(this.render, this);
        Manager.render.remove(this.overtimeHandler, this);
        Manager.render.remove(this.checkAllComplete, this);
        this._effectID = 0;
        this._rotation = 0;
        this._curLife = 0;
        this._countCur = 0;
        this._countTotal = 0;
        this._sortIndex = 0;
        this._isInFeet = false;
        for (var i = 0; i < this._anis.length; i++) {
            this._anis[i].removeEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.playComplete, this);
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
    SkillAreaEffect.prototype.parseConfig = function (config, rotation) {
        this._infos = [];
        this._rotation = (config[0] == "2") ? 0 : GameUtil.getRotationDirectionByRotation(rotation);
        this._effectID = parseInt(config[1]);
        this._sortIndex = parseInt(config[2]);
        this._isInFeet = (config[3] == "1");
        var crr = config[4].split("|");
        for (var i = 0; i < crr.length; i++) {
            var info = Manager.pool.create(SkillAreaInfo, crr[i], this._rotation);
            this._infos.push(info);
        }
        this._countTotal = this._infos.length;
    };
    SkillAreaEffect.prototype.render = function (interval) {
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
            var moveEnd;
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
    SkillAreaEffect.prototype.createOneEffect = function (info) {
        var con = Manager.pool.create(SkillConfigSprite, info.rotation, info.moveConfig);
        var ani = Manager.animation.createSkillAnimation(this._effectID);
        ani.addEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.aniLoadFail, this);
        ani.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.playComplete, this);
        con.addChild(ani);
        con.scaleX = info.scaleX;
        con.scaleY = info.scaleY;
        var ro = this._rotation + info.angleCom;
        var vd;
        vd = new Vector2D(1, 0);
        vd.angle = ro * Math.PI / 180;
        vd.length = info.dis;
        con.x = vd.x;
        con.y = vd.y;
        con.rotation = info.angleSelf;
        this.addChild(con);
        this._anis.push(ani);
        this._cons.push(con);
        if (con.moveInfo != null)
            con.moveInfo.setStart(con.x, con.y);
    };
    SkillAreaEffect.prototype.aniLoadFail = function (e) {
        this._countCur++;
        Manager.render.add(this.checkAllComplete, this, 100, 1, null, true); //加载失败时延迟执行checkAllComplete，避免对象池直接回收this，导致报错
    };
    SkillAreaEffect.prototype.playComplete = function (e) {
        this._countCur++;
        this.checkAllComplete();
    };
    SkillAreaEffect.prototype.checkAllComplete = function () {
        if (this._countCur >= this._countTotal) {
            Manager.pool.push(this);
        }
    };
    SkillAreaEffect.prototype.overtimeHandler = function (interval) {
        Manager.pool.push(this);
    };
    SkillAreaEffect.prototype.disposeSelf = function () {
        Manager.render.remove(this.render, this);
        Manager.render.remove(this.overtimeHandler, this);
        Manager.render.remove(this.checkAllComplete, this);
        _super.prototype.disposeSelf.call(this);
        for (var i = 0; i < this._anis.length; i++) {
            this._anis[i].removeEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.playComplete, this);
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
    return SkillAreaEffect;
}(Sprite));
__reflect(SkillAreaEffect.prototype, "SkillAreaEffect", ["ISkillConfigEffect"]);
//# sourceMappingURL=SkillAreaEffect.js.map