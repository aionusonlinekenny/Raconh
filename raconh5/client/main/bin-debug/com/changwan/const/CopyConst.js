var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 副本静态值
 * luzhihong
 * create 2017.12.4
 */
var CopyConst = (function () {
    function CopyConst() {
    }
    /*副本类型*/
    CopyConst.TYPE_MAIN = 1; //主线副本
    CopyConst.TYPE_BOSS_PRIVATE = 2; //个人BOSS
    CopyConst.TYPE_TOWER = 3; //爬塔副本
    CopyConst.TYPE_EXP = 4; //经验副本
    CopyConst.TYPE_SILVER = 6; //银币副本
    CopyConst.TYPE_MATERIAL = 8; //缥缈录
    /*副本id*/
    CopyConst.ID_MAIN = 100; //主线副本
    CopyConst.ID_TOWER = 101; //爬塔副本
    CopyConst.ID_EXP = 102; //经验副本
    CopyConst.ID_SILVER = 103; //银币副本
    CopyConst.ID_MATERIAL = 104; //缥缈录
    CopyConst.ID_JUYUAN = 105; //聚元副本
    /**经验副本引导dialogID */
    CopyConst.ID_DIALOG_EXP = 3001;
    /**银币副本引导dialogID */
    CopyConst.ID_DIALOG_COIN = 4001;
    return CopyConst;
}());
__reflect(CopyConst.prototype, "CopyConst");
//# sourceMappingURL=CopyConst.js.map