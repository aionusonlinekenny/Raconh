var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * SCT静态值
 * luzhihong
 * create 2017-11-08
 */
var SCTConst = (function () {
    function SCTConst() {
    }
    //文字类型end^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    /**
     * 获取文字位图数据
     * @param type:类型
     * @param name:图片名
     * */
    SCTConst.getWord = function (type, name) {
        switch (type) {
            case this.WORD:
                return ("sct_word_" + name + "_png");
            case this.NUM_BLUE:
                return ("sct_blue_" + name + "_png");
            case this.NUM_GREEN:
                return ("sct_green_" + name + "_png");
            case this.NUM_ORANGE:
                return ("sct_orange_" + name + "_png");
            case this.NUM_RED:
                return ("sct_red_" + name + "_png");
            case this.NUM_YELLOW:
                return ("sct_yellow_" + name + "_png");
            case this.NUM_SILVER:
                return ("sct_silver_" + name + "_png");
        }
        return null;
    };
    /**
     * 获取位图间隔
     * @param type:类型
     * */
    SCTConst.getPadding = function (type) {
        switch (type) {
            // case this.WORD:
            //     return ("sct_word_" + value + "_png");
            // case this.NUM_BLUE:
            //     return ("sct_blue_" + value + "_png");
            // case this.NUM_GREEN:
            //     return ("sct_green_" + value + "_png");
            // case this.NUM_ORANGE:
            //     return ("sct_orange_" + value + "_png");
            // case this.NUM_RED:
            //     return ("sct_red_" + value + "_png");
            // case this.NUM_YELLOW:
            //     return ("sct_yellow_" + value + "_png");
            case this.NUM_SILVER:
                return -18;
        }
        return -8;
    };
    //SCT类型start-------------------------------------------
    /**自己的攻击对象受到 技能普通攻击*/
    SCTConst.TYPE_SKILL = 1;
    /**自己的攻击对象受到 技能暴击*/
    SCTConst.TYPE_SKILL_CRIT = 2;
    /**自己的宠物的攻击对象受到 普通攻击*/
    SCTConst.TYPE_PET = 3;
    /**自己的宠物的攻击对象受到 暴击*/
    SCTConst.TYPE_PET_CRIT = 4;
    /**自己或自己的宠物的攻击对象 未命中（目标闪避）*/
    SCTConst.TYPE_MISS = 5;
    /**自身受到 普通攻击伤害*/
    SCTConst.TYPE_HURT = 6;
    /**自身受到 暴击伤害*/
    SCTConst.TYPE_HURT_CRIT = 7;
    /**自身受到 闪避*/
    SCTConst.TYPE_DODGE = 8;
    /**自身回血*/
    SCTConst.TYPE_BLOOD = 9;
    /**经验*/
    SCTConst.TYPE_EXP = 10;
    /**银币*/
    SCTConst.TYPE_SILVER = 11;
    /**银币加成*/
    SCTConst.TYPE_SILVER_RATE = 12;
    //SCT类型end^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //数字类型start-------------------------------------------
    /**文字*/
    SCTConst.WORD = 0;
    /**蓝色数字*/
    SCTConst.NUM_BLUE = 1;
    /**绿色数字(11为"+")*/
    SCTConst.NUM_GREEN = 2;
    /**橙色数字*/
    SCTConst.NUM_ORANGE = 3;
    /**红色数字*/
    SCTConst.NUM_RED = 4;
    /**黄色数字*/
    SCTConst.NUM_YELLOW = 5;
    /**银色数字*/
    SCTConst.NUM_SILVER = 6;
    //数字类型end^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //特殊符号类型start-------------------------------------------
    /**加号*/
    SCTConst.SIGN_ADD = "add";
    /**百分号*/
    SCTConst.SIGN_PERCENT = "percent";
    /**百分号*/
    SCTConst.SIGN_KH_LEFT = "kh_left";
    /**百分号*/
    SCTConst.SIGN_KH_RIGHT = "kh_right";
    //特殊符号类型end^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //文字类型start-------------------------------------------
    /**闪避*/
    SCTConst.WORD_DODGE = 0;
    /**经验*/
    SCTConst.WORD_EXP = 1;
    /**未命中*/
    SCTConst.WORD_MISS = 2;
    /**银币*/
    SCTConst.WORD_SILVER = 3;
    /**银币加成*/
    SCTConst.WORD_SILVER_ADD = 4;
    return SCTConst;
}());
__reflect(SCTConst.prototype, "SCTConst");
//# sourceMappingURL=SCTConst.js.map