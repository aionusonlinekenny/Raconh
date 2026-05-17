var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ScreenAdapter = (function () {
    function ScreenAdapter() {
    }
    /**
     * @private
     * 计算舞台显示尺寸
     * @param scaleMode 当前的缩放模式
     * @param screenWidth 播放器视口宽度
     * @param screenHeight 播放器视口高度
     * @param contentWidth 初始化内容宽度
     * @param contentHeight 初始化内容高度
     */
    ScreenAdapter.prototype.calculateStageSize = function (scaleMode, screenWidth, screenHeight, contentWidth, contentHeight) {
        //based on : https://github.com/jondavidjohn/hidpi-canvas-polyfill
        var context = egret.sys.canvasHitTestBuffer.context;
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        egret.sys.DisplayList.$canvasScaleFactor = (window.devicePixelRatio || 1) / backingStore;
        var displayWidth = Math.floor(screenWidth);
        var displayHeight = Math.floor(screenHeight);
        var stageWidth = Math.floor(displayWidth / displayHeight * contentHeight);
        var stageHeight = Math.floor(contentHeight);
        //宽高不是2的整数倍会导致图片绘制出现问题
        if (stageWidth % 2 != 0) {
            stageWidth += 1;
        }
        if (stageHeight % 2 != 0) {
            stageHeight += 1;
        }
        if (displayWidth % 2 != 0) {
            displayWidth += 1;
        }
        if (displayHeight % 2 != 0) {
            displayHeight += 1;
        }
        return {
            stageWidth: stageWidth,
            stageHeight: stageHeight,
            displayWidth: displayWidth,
            displayHeight: displayHeight
        };
    };
    return ScreenAdapter;
}());
__reflect(ScreenAdapter.prototype, "ScreenAdapter", ["egret.sys.IScreenAdapter"]);
//# sourceMappingURL=ScreenAdapter.js.map