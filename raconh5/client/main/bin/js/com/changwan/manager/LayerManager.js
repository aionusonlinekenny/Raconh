/**
 * devil
 * create  201--
 * update devil 2017-11-16
*/
var LayerManager = /** @class */ (function () {
    function LayerManager() {
        this.mapLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.mapLayer.touchEnabled = true;
        this.mapLayer.touchChildren = false;
        this.effectBottomLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.shadowLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.elementLayer2 = Manager.pool.create(egret.DisplayObjectContainer);
        this.clothesLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.wingLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.weaponLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.elementLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.effectTopLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.sctLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.iconImageLayer = ObjectUtil.createConainer();
        this.homeImageLayer = ObjectUtil.createConainer();
        this.homeLayer = ObjectUtil.createConainer();
        this.uiImageLayer = ObjectUtil.createConainer();
        this.sctLayer2 = ObjectUtil.createConainer();
        this.sctLayer2.touchChildren = false;
        this.modalImageLayer = ObjectUtil.createConainer();
        this.modalLayer = ObjectUtil.createConainer();
        this.tipImageLayer = ObjectUtil.createConainer();
        this.tipLayer = ObjectUtil.createConainer();
        // this.uiLayer_home = Manager.pool.create(egret.DisplayObjectContainer);
        this.panelDarkLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.uiLayer = ObjectUtil.createObj(UILayer);
        this.effectLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.tipsLayer = Manager.pool.create(egret.DisplayObjectContainer);
        var main = Manager.global.gameMain;
        main.addChildAt(this.mapLayer, 0 /* mapLayer */);
        main.addChildAt(this.effectBottomLayer, 1 /* effectBottomLayer */);
        main.addChildAt(this.shadowLayer, 2 /* shadowLayer */);
        main.addChildAt(this.elementLayer2, 3 /* elementLayer2 */);
        main.addChildAt(this.clothesLayer, 4 /* clothesLayer */);
        main.addChildAt(this.wingLayer, 5 /* wingLayer */);
        main.addChildAt(this.weaponLayer, 6 /* weaponLayer */);
        main.addChildAt(this.elementLayer, 7 /* elementLayer */);
        main.addChildAt(this.effectTopLayer, 8 /* effectTopLayer */);
        main.addChildAt(this.sctLayer, 9 /* sctLayer */);
        // main.addChildAt(this.uiLayer_home, LayerIndex.uiLayer_home);
        main.addChildAt(this.panelDarkLayer, 15 /* panelDarkLayer */);
        main.addChildAt(this.uiLayer, 16 /* uiLayer */);
        main.addChildAt(this.effectLayer, 17 /* effectLayer */);
        main.addChildAt(this.tipsLayer, 20 /* tipsLayer */);
        main.addChildAt(this.iconImageLayer, 10 /* iconImageLayer */);
        main.addChildAt(this.homeImageLayer, 11 /* homeImageLayer */);
        main.addChildAt(this.homeLayer, 12 /* homeLayer */);
        main.addChildAt(this.uiImageLayer, 13 /* uiImageLayer */);
        main.addChildAt(this.sctLayer2, 14 /* sctLayer2 */);
        main.addChildAt(this.modalImageLayer, 18 /* modalImageLayer */);
        main.addChildAt(this.modalLayer, 19 /* modalLayer */);
        main.addChildAt(this.tipImageLayer, 21 /* tipImageLayer */);
        main.addChildAt(this.tipLayer, 22 /* tipLayer */);
        this._effectBottomList = {};
        this._effectTopList = {};
    }
    //type:1上层技能特效，2下层技能特效
    LayerManager.prototype.addChildToNodeByType = function (view, filePath, type) {
        var list;
        var layer;
        if (type == 1) {
            list = this._effectTopList;
            layer = this.effectTopLayer;
        }
        else if (type == 2) {
            list = this._effectBottomList;
            layer = this.effectBottomLayer;
        }
        var container = list[filePath];
        if (container == null) {
            container = Manager.pool.create(egret.DisplayObjectContainer);
            layer.addChild(container);
            list[filePath] = container;
        }
        container.addChild(view);
    };
    LayerManager.prototype.moveMapPos = function (x, y) {
        this.mapLayer.x = x;
        this.mapLayer.y = y;
        this.effectBottomLayer.x = x;
        this.effectBottomLayer.y = y;
        this.elementLayer.x = x;
        this.elementLayer.y = y;
        this.shadowLayer.x = x;
        this.shadowLayer.y = y;
        this.effectTopLayer.x = x;
        this.effectTopLayer.y = y;
        this.clothesLayer.x = x;
        this.clothesLayer.y = y;
        this.wingLayer.x = x;
        this.wingLayer.y = y;
        this.weaponLayer.x = x;
        this.weaponLayer.y = y;
        this.elementLayer2.x = x;
        this.elementLayer2.y = y;
        this.sctLayer.x = x;
        this.sctLayer.y = y;
    };
    LayerManager.prototype.moveMapY = function (y) {
        this.mapLayer.y = y;
        this.effectBottomLayer.y = y;
        this.elementLayer.y = y;
        this.shadowLayer.y = y;
        this.effectTopLayer.y = y;
        this.clothesLayer.y = y;
        this.wingLayer.y = y;
        this.weaponLayer.y = y;
        this.elementLayer2.y = y;
        this.sctLayer.y = y;
    };
    return LayerManager;
}());
//# sourceMappingURL=LayerManager.js.map