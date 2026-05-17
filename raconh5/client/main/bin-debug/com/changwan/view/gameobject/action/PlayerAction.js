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
var PlayerAction = (function (_super) {
    __extends(PlayerAction, _super);
    function PlayerAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.H = 250;
        return _this;
    }
    //↑↑↑↑↑跳跃相关end↑↑↑↑↑
    PlayerAction.prototype.reuse = function (info) {
        this._player = info;
        _super.prototype.reuse.call(this, info);
    };
    PlayerAction.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        if (this._jumpLotus) {
            Manager.pool.push(this._jumpLotus);
            this._jumpLotus = null;
        }
        this._player = null;
        this._jumpCurrTime = 0;
    };
    PlayerAction.prototype.render = function (interval) {
        // let interval:number = runTime - this._lastTickTime;
        this.renderWalk(interval);
        this.renderJump(interval);
        // this._lastTickTime = runTime;
        return false;
    };
    PlayerAction.prototype.updateSpeed = function () {
        if (this._finishPos != null)
            this.initSpeed(this._finishPos);
    };
    PlayerAction.prototype.walk = function (path, walkType, complete, completeTarget) {
        this.forceCancelJump(); //解决其他玩家还没跳完就更新走路过来，导致跳跃状态没取消的bug
        _super.prototype.walk.call(this, path, walkType, complete, completeTarget);
    };
    PlayerAction.prototype.forceCancelJump = function () {
        if (this._walkType == WalkType.JUMP) {
            this.disposeJumpLotus();
            // egret.stopTick(this.render,this);
            Manager.render.remove(this.render, this);
            this._player.needCanYing = false;
            if (this._player.isSelfGO) {
                Manager.jump.finishJump();
            }
            else {
                this._player.finishJump();
            }
            if (this._jumpComplete != null)
                this._jumpComplete();
        }
    };
    /**
     * 跳跃
     */
    PlayerAction.prototype.jump = function (startPos, targets, complete) {
        this._walkType = WalkType.JUMP;
        this._jumpStartPos = startPos.clone();
        this._jumpTargets = targets.concat();
        this._jumpComplete = complete;
        this._player.needCanYing = true;
        this._player.setActionStr(FigureAction.JUMP);
        this.jumpOneStep();
        this.addRenderTick();
        // this._jumpStartPos = startPos.clone();
        // this._jumpEndPos = endPos.clone();
        // this._jumpComplete = complete;
        // this._jumpCurrTime = 0;
        // this._player.needCanYing = true;
        // this.addRenderTick();
        // this.newJumpInitialize();
    };
    PlayerAction.prototype.jumpOneStep = function () {
        this._jumpEndPos = this._jumpTargets.shift();
        this._jumpCurrTime = 0;
        this.newJumpInitialize();
    };
    PlayerAction.prototype.newJumpInitialize = function () {
        var h = this._player.jumpHeigth > 0 ? this.H * 0.75 : this.H;
        this._jumpLotus = Manager.pool.create(JumpLotus, this._jumpStartPos, this._jumpEndPos, PlayerAction.T, h, this._player.jumpHeigth);
        this._player.setDirection(Direction.getDir(0, 0, this._jumpLotus.s.x, this._jumpLotus.s.y));
    };
    PlayerAction.prototype.renderJump = function (interval) {
        if (this._walkType != WalkType.JUMP)
            return;
        this._jumpCurrTime += interval * 0.001;
        var pos = this._jumpLotus.getPos(this._jumpCurrTime);
        var h = this._jumpLotus.getH(this._jumpCurrTime);
        this._player.updatePostion(pos.x, pos.y);
        this._player.updateJumpHeight(h);
        if (this._jumpCurrTime >= this._jumpLotus.tAll)
            this.jumpComplete();
    };
    PlayerAction.prototype.jumpComplete = function () {
        if (this._jumpTargets.length > 0) {
            this.disposeJumpLotus();
            this._jumpStartPos = this._jumpEndPos;
            this.jumpOneStep();
        }
        else {
            this._walkType = 0;
            this.disposeJumpLotus();
            // egret.stopTick(this.render,this);
            Manager.render.remove(this.render, this);
            var figure = this._info.getAliveFlag() ? FigureAction.STAND : FigureAction.DEAD;
            this._info.setActionStr(figure);
            this._player.needCanYing = false;
            if (this._player.isSelfGO) {
                Manager.jump.finishJump();
            }
            else {
                this._player.finishJump();
            }
            if (this._jumpComplete != null)
                this._jumpComplete();
        }
    };
    PlayerAction.prototype.disposeJumpLotus = function () {
        if (this._jumpLotus) {
            Manager.pool.push(this._jumpLotus);
            this._jumpLotus = null;
        }
    };
    PlayerAction.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeJumpLotus();
        this._player = null;
    };
    PlayerAction.T = 55 / 60;
    return PlayerAction;
}(Action));
__reflect(PlayerAction.prototype, "PlayerAction");
//# sourceMappingURL=PlayerAction.js.map