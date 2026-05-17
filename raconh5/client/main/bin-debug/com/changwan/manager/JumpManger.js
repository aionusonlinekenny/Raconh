var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2017-12-4
 *description
*/
var JumpManager = (function () {
    function JumpManager() {
    }
    JumpManager.prototype.jump = function (targets, complete) {
        if (!this.canJump(false))
            return;
        this.beforJump();
        Manager.model.self.updateIsingState(BodyStateManger.ISING_JUMP, true);
        Manager.model.self.dispatchJump(targets, complete);
    };
    JumpManager.prototype.beforJump = function () {
        Manager.model.self.stopWalk();
    };
    JumpManager.prototype.canJump = function (showMsg) {
        if (showMsg === void 0) { showMsg = true; }
        if (!Manager.model.getMap().mapDataLoadComplete)
            return false;
        var self = Manager.model.self;
        if (!self.getAliveFlag())
            return false;
        return true;
    };
    JumpManager.prototype.canJumpBefore = function (showMsg) {
        if (showMsg === void 0) { showMsg = false; }
        if (!Manager.model.getMap().mapDataLoadComplete)
            return false;
        var self = Manager.model.self;
        if (!self.getAliveFlag())
            return false;
        if (self.isBuffState(BodyStateManger.BUFF_XUAN_YUN)) {
            if (showMsg)
                FloatTips.addTips("????");
            return false;
        }
        if (self.isBuffState(BodyStateManger.BUFF_CHAO_FENG)) {
            if (showMsg)
                FloatTips.addTips("????");
            return false;
        }
        return true;
    };
    JumpManager.prototype.finishJump = function () {
        Manager.model.self.finishJump();
        if (!Manager.model.getAuto().autoHook)
            Manager.walk.gotoMapFind();
        if (this.curInfo && this.curInfo.cvo) {
            var type = 0;
            switch (this.curInfo.cvo.scriptType) {
                case RookieConst.SLIDE:
                    type = WalkType.SLIDE;
                    break;
                case RookieConst.KITE:
                    type = WalkType.KITE;
                    break;
                case RookieConst.WATER:
                    type = WalkType.WATER;
                default:
                    break;
            }
            this.curInfo.playRookieAction(type);
            this.curInfo = null;
        }
    };
    return JumpManager;
}());
__reflect(JumpManager.prototype, "JumpManager");
//# sourceMappingURL=JumpManger.js.map