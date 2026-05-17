var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * 17.11.23
 * 滤镜
 */
var FilterUtil = (function () {
    function FilterUtil() {
    }
    /**设置成灰色 */
    FilterUtil.setTxtFilter = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var filters;
        var i = 0;
        var len = args.length;
        while (i < len) {
            filters = args[i].filters ? args[i].filters : [];
            filters.push(this.TXT_GLOW_FILTER);
            args[i].filters = filters;
            i++;
        }
    };
    /**设置成灰色 */
    FilterUtil.setGrayFilter = function (value) {
        //颜色矩阵数组
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        value.filters = [colorFlilter];
    };
    /**
     * 亮度滤镜
     * @param bright:-255-255
     * */
    FilterUtil.getBrightFilter = function (bright) {
        return new egret.ColorMatrixFilter([
            1, 0, 0, 0, bright,
            0, 1, 0, 0, bright,
            0, 0, 1, 0, bright,
            0, 0, 0, 1, 0
        ]);
    };
    /**
     * 生命对象添加颜色滤镜，color对应ColorFilterType.ts
     */
    FilterUtil.addAliveColorFilter = function (ani, color) {
        if (color === void 0) { color = 0; }
        var colorMat;
        switch (color) {
            case ColorFilterType.BLUE:
                colorMat = new egret.ColorMatrixFilter(this.BLUE_FILTER);
                break;
            case ColorFilterType.GREEN:
                colorMat = new egret.ColorMatrixFilter(this.GREEN_FILTER);
                break;
            case ColorFilterType.WHITE:
                colorMat = new egret.ColorMatrixFilter(this.WHITE_FILTER);
                break;
            case ColorFilterType.BLACK:
                colorMat = new egret.ColorMatrixFilter(this.BLACK_FILTER);
                break;
            case ColorFilterType.RED:
                colorMat = new egret.ColorMatrixFilter(this.RED_FILTER);
                break;
            default:
                colorMat = null;
                break;
        }
        this.removeColorMat(ani);
        if (!colorMat)
            return;
        var filters = ani.filters ? ani.filters : [];
        filters.push(colorMat);
        ani.filters = filters;
    };
    /**
     * 去除变亮和变暗(恢复)
     */
    FilterUtil.removeColorMat = function (display) {
        var filters = display.filters;
        var len = filters ? filters.length : 0;
        for (var i = len - 1; i >= 0; i--) {
            if (filters[i] instanceof egret.ColorMatrixFilter)
                filters.splice(i, 1);
        }
        display.filters = filters;
    };
    FilterUtil.BLUE_FILTER = [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 100,
        0, 0, 0, 1, 0
    ];
    FilterUtil.GREEN_FILTER = [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 100,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0
    ];
    FilterUtil.WHITE_FILTER = [
        1, 0, 0, 0, 100,
        0, 1, 0, 0, 100,
        0, 0, 1, 0, 100,
        0, 0, 0, 1, 0
    ];
    FilterUtil.BLACK_FILTER = [
        1, 0, 0, 0, -100,
        0, 1, 0, 0, -100,
        0, 0, 1, 0, -100,
        0, 0, 0, 1, 0
    ];
    FilterUtil.RED_FILTER = [
        1, 0, 0, 0, 100,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0
    ];
    FilterUtil.TXT_GLOW_FILTER = new egret.GlowFilter(0x000000, 1, 1, 1, 3);
    return FilterUtil;
}());
__reflect(FilterUtil.prototype, "FilterUtil");
//# sourceMappingURL=FilterUtil.js.map