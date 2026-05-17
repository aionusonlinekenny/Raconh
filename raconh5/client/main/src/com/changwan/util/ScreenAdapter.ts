class ScreenAdapter implements egret.sys.IScreenAdapter
{
        /**
         * @private
         * 计算舞台显示尺寸
         * @param scaleMode 当前的缩放模式
         * @param screenWidth 播放器视口宽度
         * @param screenHeight 播放器视口高度
         * @param contentWidth 初始化内容宽度
         * @param contentHeight 初始化内容高度
         */
        public calculateStageSize(scaleMode:string, screenWidth:number, screenHeight:number,
                                  contentWidth:number, contentHeight:number):egret.sys.StageDisplaySize {



            //based on : https://github.com/jondavidjohn/hidpi-canvas-polyfill
            let context = egret.sys.canvasHitTestBuffer.context;
            let backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
            egret.sys.DisplayList.$canvasScaleFactor = (window.devicePixelRatio || 1) / backingStore;
            let displayWidth = Math.floor(screenWidth);
            let displayHeight = Math.floor(screenHeight);
            let stageWidth = Math.floor(displayWidth / displayHeight * contentHeight);
            let stageHeight = Math.floor(contentHeight);
            //宽高不是2的整数倍会导致图片绘制出现问题
            if (stageWidth % 2 != 0) {
                stageWidth += 1;
            }
            if (stageHeight % 2 != 0) {
                stageHeight += 1;
            }
            if(displayWidth % 2 != 0) {
                displayWidth += 1;
            }
            if(displayHeight % 2 != 0) {
                displayHeight += 1;
            }
            return {
                stageWidth: stageWidth,
                stageHeight: stageHeight,
                displayWidth: displayWidth,
                displayHeight: displayHeight
            };
        }
}