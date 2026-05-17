var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 发布版的时候会删除
 */
var KeyManager = (function () {
    function KeyManager() {
        document.onkeydown = this.onKeyDownHandler;
        document.onkeyup = this.onKeyUpHandler;
    }
    KeyManager.prototype.onKeyDownHandler = function (e) {
    };
    KeyManager.prototype.onKeyUpHandler = function (e) {
        if (!Manager.model.getMap().mapDataLoadComplete)
            return;
        switch (e.keyCode) {
            case KeyManager.ESC:
                if (!GM.instance.parent)
                    Manager.global.gameMain.addChild(GM.instance);
                else
                    Manager.global.gameMain.removeChild(GM.instance);
                break;
            case KeyManager.SPACE:
                KeyManager.bol = !KeyManager.bol;
                break;
            case KeyManager.Z:
                Manager.model.getAuto().autoHook = !Manager.model.getAuto().autoHook;
                break;
            case KeyManager.W:
                Manager.pool.testCount();
                break;
            case KeyManager.ADD:
                var selfa = Manager.model.self;
                console.log(selfa.x, selfa.y, Manager.model.getMap().isWalkPoint(selfa.x, selfa.y), selfa.target != null);
                break;
            case KeyManager.SUB:
                break;
            //以上快捷键开发过程中常用，请勿修改
            case KeyManager.Q:
                //Manager.view.show(ViewID.Sysprivilege_ExperienceView);
                break;
            case KeyManager.E:
                break;
            case KeyManager.R:
                break;
            case KeyManager.T:
                break;
            case KeyManager.Y:
                break;
            case KeyManager.U:
                break;
            case KeyManager.I:
                break;
        }
    };
    KeyManager.A = 65;
    KeyManager.B = 66;
    KeyManager.C = 67;
    KeyManager.D = 68;
    KeyManager.E = 69;
    KeyManager.F = 70;
    KeyManager.G = 71;
    KeyManager.H = 72;
    KeyManager.I = 73;
    KeyManager.J = 74;
    KeyManager.K = 75;
    KeyManager.L = 76;
    KeyManager.M = 77;
    KeyManager.N = 78;
    KeyManager.O = 79;
    KeyManager.P = 80;
    KeyManager.Q = 81;
    KeyManager.R = 82;
    KeyManager.S = 83;
    KeyManager.T = 84;
    KeyManager.U = 85;
    KeyManager.V = 86;
    KeyManager.W = 87;
    KeyManager.X = 88;
    KeyManager.Y = 89;
    KeyManager.Z = 90;
    KeyManager.ESC = 27;
    KeyManager.ADD = 187;
    KeyManager.SUB = 189;
    KeyManager.SPACE = 32;
    KeyManager.bol = false;
    return KeyManager;
}());
__reflect(KeyManager.prototype, "KeyManager");
//# sourceMappingURL=KeyManager.js.map