var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FigureAction = (function () {
    function FigureAction() {
    }
    FigureAction.getWrapMode = function (name) {
        switch (name) {
            case FigureAction.STAND:
            case FigureAction.WALK:
            case FigureAction.SIT:
            case FigureAction.SLIDE:
            case FigureAction.KITE:
                return WrapMode.LOOP;
            case FigureAction.ATTACK1:
            case FigureAction.ATTACK2:
            case FigureAction.ATTACK3:
                return WrapMode.ATTACK;
            case FigureAction.DEAD:
            case FigureAction.JUMP:
            case FigureAction.HITED:
            case FigureAction.WATER:
                return WrapMode.ONCE;
        }
        return WrapMode.ONCE;
    };
    FigureAction.isAttackAction = function (name) {
        return name.indexOf("attack") != -1;
    };
    FigureAction.getResGroupShortName = function (name) {
        switch (name) {
            case FigureAction.WALK:
                return "w";
            case FigureAction.STAND:
            case FigureAction.KITE:
                return "s";
            case FigureAction.JUMP:
            case FigureAction.WATER:
                return "j";
            case FigureAction.ATTACK1:
                return "a1";
            case FigureAction.ATTACK2:
                return "a2";
            case FigureAction.ATTACK3:
                return "a3";
            case FigureAction.HITED:
                return "h";
            case FigureAction.DEAD:
                return "d";
            case FigureAction.SIT:
                return "t";
            case FigureAction.SLIDE:
                return "e";
        }
        return "s";
    };
    FigureAction.STAND = "stand";
    FigureAction.WALK = "walk";
    FigureAction.JUMP = "jump";
    FigureAction.DEAD = "dead";
    FigureAction.HITED = "hited";
    FigureAction.ATTACK1 = "attack1";
    FigureAction.ATTACK2 = "attack2";
    FigureAction.ATTACK3 = "attack3";
    FigureAction.SIT = "sit";
    FigureAction.SLIDE = "slide";
    FigureAction.KITE = "kite";
    FigureAction.WATER = "water";
    return FigureAction;
}());
__reflect(FigureAction.prototype, "FigureAction");
//# sourceMappingURL=FigureAction.js.map