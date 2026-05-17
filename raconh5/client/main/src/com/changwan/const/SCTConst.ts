/**
 * SCT静态值
 * luzhihong
 * create 2017-11-08
 */
class SCTConst
{
    //SCT类型start-------------------------------------------
    /**自己的攻击对象受到 技能普通攻击*/
    public static TYPE_SKILL:number = 1;
    /**自己的攻击对象受到 技能暴击*/
    public static TYPE_SKILL_CRIT:number = 2;
    /**自己的宠物的攻击对象受到 普通攻击*/
    public static TYPE_PET:number = 3;
    /**自己的宠物的攻击对象受到 暴击*/
    public static TYPE_PET_CRIT:number = 4;
    /**自己或自己的宠物的攻击对象 未命中（目标闪避）*/
    public static TYPE_MISS:number = 5;
    /**自身受到 普通攻击伤害*/
    public static TYPE_HURT:number = 6;
    /**自身受到 暴击伤害*/
    public static TYPE_HURT_CRIT:number = 7;
    /**自身受到 闪避*/
    public static TYPE_DODGE:number = 8;
    /**自身回血*/
    public static TYPE_BLOOD:number = 9;
    /**经验*/
    public static TYPE_EXP:number = 10;
    /**银币*/
    public static TYPE_SILVER:number = 11;
    /**银币加成*/
    public static TYPE_SILVER_RATE:number = 12;
    //SCT类型end^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    
    //数字类型start-------------------------------------------
    /**文字*/
    public static WORD:number = 0;
    /**蓝色数字*/
    public static NUM_BLUE:number = 1;
    /**绿色数字(11为"+")*/
    public static NUM_GREEN:number = 2;
    /**橙色数字*/
    public static NUM_ORANGE:number = 3;
    /**红色数字*/
    public static NUM_RED:number = 4;
    /**黄色数字*/
    public static NUM_YELLOW:number = 5;
    /**银色数字*/
    public static NUM_SILVER:number = 6;
    //数字类型end^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    
    //特殊符号类型start-------------------------------------------
    /**加号*/
    public static SIGN_ADD:string = "add";
    /**百分号*/
    public static SIGN_PERCENT:string = "percent";
    /**百分号*/
    public static SIGN_KH_LEFT:string = "kh_left";
    /**百分号*/
    public static SIGN_KH_RIGHT:string = "kh_right";
    //特殊符号类型end^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


    //文字类型start-------------------------------------------
    /**闪避*/
    public static WORD_DODGE:number = 0;
    /**经验*/
    public static WORD_EXP:number = 1;
    /**未命中*/
    public static WORD_MISS:number = 2;
    /**银币*/
    public static WORD_SILVER:number = 3;
    /**银币加成*/
    public static WORD_SILVER_ADD:number = 4;
    //文字类型end^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


    /**
     * 获取文字位图数据
	 * @param type:类型
	 * @param name:图片名
     * */
    public static getWord(type:number, name:string):string
    {
        switch(type)
        {
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
    }

    /**
     * 获取位图间隔
	 * @param type:类型
     * */
    public static getPadding(type:number):number
    {
        switch(type)
        {
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
    }
}