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
 * pzx
 * 珍宝阁model
 * create 18.2.3
 */
var TreasureGarretModel = /** @class */ (function (_super) {
    __extends(TreasureGarretModel, _super);
    function TreasureGarretModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //当前刷新次数
        _this._count = 0;
        // 免费次数
        _this._freeCount = 0;
        return _this;
    }
    TreasureGarretModel.prototype.updateDatA = function (ip) {
        this._freeCount = ip.readByte();
        this._count = ip.readByte();
        var ln = ip.readShort();
        this._shopList = [];
        for (var i = 0; i < ln; i++) {
            var id = ip.readShort();
            this._shopList.push(id);
        }
        if (ln == 0) {
            //若ln为0 ，是新号，由于新号后端刷新不了数据，所以这里由前端写死6个数据，------运营已确认，有问题找 心斌，超武
            this._shopList = [51, 63, 75, 87, 99, 111];
        }
        this.dispatchEvent(new ShopEvent(ShopEvent.TREASUREGARRET_UPDATE_EVENT));
        if (ip.protocol == Protocol.CMD_TREASUREGARRET_UPDATE) {
            Manager.control.getShop().query(ShopType.TREASUREGARRET_TYPE);
        }
    };
    TreasureGarretModel.prototype.setTime = function (time) {
        this._time = time; //７小时刷新一次
    };
    Object.defineProperty(TreasureGarretModel.prototype, "freeTime", {
        /** 免费刷新cd ７小时刷新一次*/
        get: function () {
            // if(this._freeCount == 0)
            // {
            // 	this._time = 0;
            // 	return 0;
            // }
            // if(this._time>0)
            // {
            // 	return this._time;
            // }
            // let second:number = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
            // let nowDate = cw.DateUtil.getDateBySecs(second);
            // let hours:number = nowDate.getHours();
            // let updateData:Date;
            // if(hours>=0 && hours<6)
            // {
            // 	 updateData= new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(),6);//取当天6时
            // }
            // else if(hours>=6 && hours<12)
            // {
            // 	updateData = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(),12);//取当天12时
            // }
            // else if(hours>=12 && hours<18)
            // {
            // 	updateData = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(),18);//取当天18时
            // }
            // else 
            // {
            // 	updateData = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(),23,59,59);//取当天0时
            // }
            // this._time = Math.round(updateData.getTime()/1000);
            return this._time;
        },
        enumerable: true,
        configurable: true
    });
    /** 元宝刷新次数 */
    TreasureGarretModel.prototype.count = function () {
        return this._count;
    };
    TreasureGarretModel.prototype.shopList = function () {
        if (!this._shopList) {
            Manager.control.getShop().treasureGarretQuery();
        }
        return this._shopList;
    };
    /** 是否有免费次数 */
    TreasureGarretModel.prototype.checkfreeTime = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_TREASURE_GARRET))
            return false;
        return this._freeCount == 0;
    };
    return TreasureGarretModel;
}(egret.EventDispatcher));
//# sourceMappingURL=TreasureGarretModel.js.map