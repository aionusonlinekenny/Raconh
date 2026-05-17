/**
 * 颜色值
 * luzhihong
 * create 2017-11-06
 */
var Color = /** @class */ (function () {
    function Color() {
    }
    Color.getColorNumByQuality = function (quality) {
        // 绿色：2
        // 蓝色：3
        // 紫色：4
        // 橙色：5
        // 红色：6
        switch (quality) {
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
    };
    Color.toColorStr = function (color) {
        return "#" + color.toString(16);
    };
    Color.getColorStrByQuality = function (quality) {
        // 绿色：2
        // 蓝色：3
        // 紫色：4
        // 橙色：5
        // 红色：6
        switch (quality) {
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
    };
    /**默认值 */
    Color.DEF = 0x7c6e62;
    /**默认值2 */
    Color.DEF2 = 0xfff7e7;
    /**绿色 */
    Color.GREEN = 0x38b800;
    /**绿色2 */
    Color.GREEN2 = 0x4eff00;
    /**蓝色 */
    Color.BLUE = 0x00e5fd;
    /**蓝色2 */
    Color.BLUE2 = 0x00a1fd;
    /**黄色 */
    Color.YELLOR = 0xf9db2c;
    /**黄色2 */
    Color.YELLOR2 = 0xffba00;
    /**紫色 */
    Color.PURPLE = 0xfd30ff;
    /**橙色 */
    Color.ORANGE = 0xfd7100;
    /**红色 */
    Color.RED = 0xff2400;
    /**白色 */
    Color.WHITE = 0xffffff;
    /**灰色 */
    Color.GRAY = 0x939393;
    /**玩家名字颜色 */
    Color.SELF_NAME = 0xf9db2c;
    /**帮派名字颜色 */
    Color.GUILD_NAME = 0x00e5fd;
    /**默认值str */
    Color.DEF_STR = Color.toColorStr(Color.DEF);
    /**默认值2str */
    Color.DEF_STR_2 = Color.toColorStr(Color.DEF2);
    /**绿色str */
    Color.GREEN_STR = Color.toColorStr(Color.GREEN);
    /**绿色2str */
    Color.GREEN_STR_2 = Color.toColorStr(Color.GREEN2);
    /**蓝色str */
    Color.BLUE_STR = Color.toColorStr(Color.BLUE);
    /**蓝色2str */
    Color.BLUE_STR_2 = Color.toColorStr(Color.BLUE2);
    /**黄色str */
    Color.YELLOR_STR = Color.toColorStr(Color.YELLOR);
    /**黄色2str */
    Color.YELLOR_STR_2 = Color.toColorStr(Color.YELLOR2);
    /**紫色str */
    Color.PURPLE_STR = Color.toColorStr(Color.PURPLE);
    /**橙色str */
    Color.ORANGE_STR = Color.toColorStr(Color.ORANGE);
    /**红色str */
    Color.RED_STR = Color.toColorStr(Color.RED);
    /**白色str */
    Color.WHITE_STR = Color.toColorStr(Color.WHITE); //"#ffffff";
    /**灰色str */
    Color.GRAY_STR = Color.toColorStr(Color.GRAY);
    /**玩家名字颜色str */
    Color.SELF_NAME_STR = Color.toColorStr(Color.SELF_NAME);
    /**帮派名字颜色str */
    Color.GUILD_NAME_STR = Color.toColorStr(Color.GUILD_NAME);
    return Color;
}());
//# sourceMappingURL=Color.js.map