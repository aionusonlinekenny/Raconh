var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 缥缈录
 */
var MaterialCopyModel = (function (_super) {
    __extends(MaterialCopyModel, _super);
    function MaterialCopyModel() {
        var _this = _super.call(this) || this;
        /**已领取的宝箱id */
        _this.getAwardId = 0;
        /**当前星数 */
        _this.curStar = 0;
        /**已通关层数 */
        _this.passList = {};
        /**最后通关 */
        _this.lastPassCell = 0;
        _this.passList = [];
        for (var i = 0; i < MaterialCopyModel.BIG_CELL_MAX_COUNT; i++)
            _this.passList[i + 1] = [];
        return _this;
    }
    MaterialCopyModel.prototype.updatePassList = function (list) {
        if (!list || list.length == 0)
            return;
        var tmpList = list;
        tmpList.sort(this.sortOnCell);
        this.lastPassCell = tmpList[tmpList.length - 1];
        for (var i = 0; i < tmpList.length; i++) {
            var type = Math.ceil(tmpList[i] / MaterialCopyModel.CELL_MAX_COUNT);
            this.passList[type].push(tmpList[i]);
        }
        this.dispatchEvent(new MaterialEvent(MaterialEvent.MATERIAL_PASS_LIST_UPDATE));
    };
    MaterialCopyModel.prototype.updatePassCell = function (passCell) {
        var type = Math.ceil(passCell / MaterialCopyModel.CELL_MAX_COUNT);
        if (this.passList[type].indexOf(passCell) == -1)
            this.passList[type].push(passCell);
        this.passList[type].sort(this.sortOnCell);
        this.lastPassCell = passCell;
        this.dispatchEvent(new MaterialEvent(MaterialEvent.MATERIAL_PASS_LIST_UPDATE));
    };
    MaterialCopyModel.prototype.sortOnCell = function (value1, value2) {
        if (value1 > value2)
            return 1;
        else if (value1 < value2)
            return -1;
        else
            return 0;
    };
    MaterialCopyModel.prototype.getPassCellByType = function (type) {
        if (this.passList[type].length > 0)
            return this.passList[type][this.passList[type].length - 1];
        else
            return 0;
    };
    MaterialCopyModel.prototype.createCollection = function (localX, localY) {
        var info = Manager.pool.create(CollectionGameObjectInfo, egret.getTimer());
        info.x = localX;
        info.y = localY;
        info.updatePostion(info.x, info.y, false);
        info.setData("box", false, this.collectComplete, this);
        Manager.model.getGameobject().addGameObject(info);
        this.collectionInfo = info;
        Manager.render.add(this.pick, this, 1000);
    };
    MaterialCopyModel.prototype.pick = function () {
        Manager.render.remove(this.pick, this);
        this.collectionInfo.createGameObject().pick();
    };
    MaterialCopyModel.prototype.collectComplete = function () {
        Manager.model.self.updateIsingState(BodyStateManger.ISING_COLLECT, false);
        Manager.model.getGameobject().removeGameObject(this.collectionInfo);
        Manager.control.getMaterialCopy().queryCollection();
    };
    /**返回可挑战大关卡 */
    MaterialCopyModel.prototype.getCommendItem = function () {
        // let type:number = 0;
        // for(let i:number=0; i<MaterialCopyModel.BIG_CELL_MAX_COUNT; i++)
        // {
        // 	let id:number;
        // 	if(this.passList[i + 1][this.passList[i + 1].length - 1])
        // 		id = this.passList[i + 1][this.passList[i + 1].length - 1] + 1;
        // 	else
        // 		id = i * MaterialCopyModel.CELL_MAX_COUNT + 1;
        // 	let info:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(id);
        // 	if(info)
        // 	{
        // 		if(Manager.model.self.attrInfo.fight >= info.fight)
        // 		{
        // 			type = info.type1;
        // 			break;
        // 		}
        // 	}
        // }
        // return type;
        var type = 0;
        if (this.lastPassCell == 0)
            type = 1;
        else {
            var info = MaterialCopyCVO.getCellInfo(this.lastPassCell);
            var nextInfo = MaterialCopyCVO.getCellInfo(this.lastPassCell + 1);
            if (info && nextInfo) {
                if (info.type2 == nextInfo.type2)
                    type = info.type1;
                else {
                    if (info.type1 + 1 <= MaterialCopyModel.BIG_CELL_MAX_COUNT) {
                        if (this.passList[info.type1].length > this.passList[info.type1 + 1].length) {
                            type = info.type1 + 1;
                        }
                    }
                    else {
                        if (this.passList[1].length < 15)
                            type = 1;
                    }
                }
            }
        }
        return type;
    };
    /**
     * 返回推荐大关卡编号
     */
    MaterialCopyModel.prototype.getRecommendCell = function () {
        var ret = 0;
        var isShowRedIcon = false;
        for (var i = 0; i < MaterialCopyCVO.MAX_CELL; i += 3) {
            var id = i + 1;
            var cvo = MaterialCopyCVO.getCellInfo(id);
            if (cvo) {
                var list = this.passList[cvo.type1];
                for (var j = id; j < id + 3; j++) {
                    if (list.indexOf(j) == -1) {
                        var info = MaterialCopyCVO.getCellInfo(j);
                        if (info) {
                            isShowRedIcon = Manager.model.self.attrInfo.fight >= info.fight && Manager.model.self.attrInfo.level >= info.conds.value;
                            if (isShowRedIcon)
                                return cvo.type1;
                        }
                    }
                }
            }
        }
        return ret;
    };
    /**小关上限 */
    MaterialCopyModel.CELL_MAX_COUNT = 15;
    /**大关上限 */
    MaterialCopyModel.BIG_CELL_MAX_COUNT = 50;
    return MaterialCopyModel;
}(egret.EventDispatcher));
__reflect(MaterialCopyModel.prototype, "MaterialCopyModel");
//# sourceMappingURL=MaterialCopyModel.js.map