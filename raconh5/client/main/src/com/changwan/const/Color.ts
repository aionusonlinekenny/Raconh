/**
 * 颜色值
 * luzhihong
 * create 2017-11-06
 */
class Color
{
    /**默认值 */
    public static DEF:number = 0x7c6e62;
    /**默认值2 */
    public static DEF2:number = 0xfff7e7;
    /**绿色 */
    public static GREEN:number = 0x38b800;
    /**绿色2 */
    public static GREEN2:number = 0x4eff00;
    /**蓝色 */
    public static BLUE:number = 0x00e5fd;
    /**蓝色2 */
    public static BLUE2:number = 0x00a1fd;
    /**黄色 */
    public static YELLOR:number = 0xf9db2c;
    /**黄色2 */
    public static YELLOR2:number = 0xffba00;
    /**紫色 */
    public static PURPLE:number = 0xfd30ff;
    /**橙色 */
    public static ORANGE:number = 0xfd7100;
    /**红色 */
    public static RED:number = 0xff2400;
    /**白色 */
    public static WHITE:number = 0xffffff;
    /**灰色 */
    public static GRAY:number = 0x939393;
    /**玩家名字颜色 */
    public static SELF_NAME:number = 0xf9db2c;
    /**帮派名字颜色 */
    public static GUILD_NAME:number = 0x00e5fd;
    /**默认值str */
    public static DEF_STR:string = Color.toColorStr(Color.DEF);
    /**默认值2str */
    public static DEF_STR_2:string = Color.toColorStr(Color.DEF2);
    /**绿色str */
    public static GREEN_STR:string = Color.toColorStr(Color.GREEN);
    /**绿色2str */
    public static GREEN_STR_2:string = Color.toColorStr(Color.GREEN2);
    /**蓝色str */
    public static BLUE_STR:string = Color.toColorStr(Color.BLUE);
    /**蓝色2str */
    public static BLUE_STR_2:string = Color.toColorStr(Color.BLUE2);
    /**黄色str */
    public static YELLOR_STR:string = Color.toColorStr(Color.YELLOR);
    /**黄色2str */
    public static YELLOR_STR_2:string = Color.toColorStr(Color.YELLOR2);
    /**紫色str */
    public static PURPLE_STR:string = Color.toColorStr(Color.PURPLE);
    /**橙色str */
    public static ORANGE_STR:string = Color.toColorStr(Color.ORANGE);
    /**红色str */
    public static RED_STR:string = Color.toColorStr(Color.RED);
    /**白色str */
    public static WHITE_STR:string = Color.toColorStr(Color.WHITE);//"#ffffff";
    /**灰色str */
    public static GRAY_STR:string = Color.toColorStr(Color.GRAY);
    /**玩家名字颜色str */
    public static SELF_NAME_STR:string = Color.toColorStr(Color.SELF_NAME);
    /**帮派名字颜色str */
    public static GUILD_NAME_STR:string = Color.toColorStr(Color.GUILD_NAME);

    public static getColorNumByQuality(quality:number):number
    {
        // 绿色：2
        // 蓝色：3
        // 紫色：4
        // 橙色：5
        // 红色：6
        switch(quality)
        {
            case 2:
            return this.GREEN;
            case 3:
            return this.BLUE;
            case 4:
            return this.PURPLE;
            case 5:
            return this.ORANGE;
            case 6:
            return this.RED;
            default:
            return this.WHITE;
        }
    }

    public static toColorStr(color:number):string
    {
        return "#"+color.toString(16);
    }

    public static getColorStrByQuality(quality:number):string
    {
        // 绿色：2
        // 蓝色：3
        // 紫色：4
        // 橙色：5
        // 红色：6
        switch(quality)
        {
            case 2:
            return this.GREEN_STR;
            case 3:
            return this.BLUE_STR;
            case 4:
            return this.PURPLE_STR;
            case 5:
            return this.ORANGE_STR;
            case 6:
            return this.RED_STR;
            default:
            return this.WHITE_STR;
        }
    }
}