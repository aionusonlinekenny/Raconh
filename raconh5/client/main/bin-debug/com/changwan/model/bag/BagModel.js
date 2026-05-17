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
var BagModel = (function (_super) {
    __extends(BagModel, _super);
    function BagModel() {
        return _super.call(this) || this;
    }
    // public checkCanRonglian():boolean
    // {
    // 	if(!OpenCVO.isOpen(OpenConst.ID_RONGLIAN)) return false;
    //     let itemList = [];
    // 	let cantMoveLit = {};
    // 	let list:Array<ItemsModelInfo> = Manager.model.getItems().getBagItemBySmelt();
    // 	list.sort(this.fightingSort);
    //     let equipList:Dictionary<number,ItemsModelInfo> = Manager.model.getItems().equipList;
    // 	for(let i:number=0; i<list.length; i++)
    // 	{
    // 		let itemInfo:ItemsModelInfo = list[i];
    // 		if(itemInfo && itemInfo.cvo.group == 1)
    // 		{
    // 			let has:boolean = false;
    // 			let hasPos:boolean = false;
    // 			for(let j:number=1; j<=8; j++)
    // 			{
    // 				let info:ItemsModelInfo = equipList.get(j);
    // 				if(info)
    // 				{
    // 					if( Number(String(info.base_id).substr(6, 2)) == Number(String(itemInfo.base_id).substr(6,2)))
    // 					{
    // 						hasPos = true;
    // 						let itemInfoAttrVo = Manager.pool.create(AttrVO, itemInfo.cvo.attr);
    // 						let equipInfoAttrVo:AttrVO = Manager.pool.create(AttrVO, info.cvo.attr);
    // 						if(equipInfoAttrVo.getFighting() >= itemInfoAttrVo.getFighting())
    // 						{
    // 							itemList.push(itemInfo);
    // 							has = true;
    // 							break;
    // 						}
    // 						else
    // 						{
    // 							if(!cantMoveLit[ String(itemInfo.base_id).substr(6,2) ])
    // 								cantMoveLit[ String(itemInfo.base_id).substr(6,2) ] = itemInfo;
    // 						}
    // 					}
    // 				}
    // 			}
    // 			if(!has)
    // 			{
    // 				if(!hasPos)
    // 				{
    // 					if(!cantMoveLit[ String(itemInfo.base_id).substr(6,2) ])
    // 						cantMoveLit[ String(itemInfo.base_id).substr(6,2) ] = itemInfo;
    // 				}
    // 				if(cantMoveLit[ String(itemInfo.base_id).substr(6,2) ] != itemInfo)
    // 				{
    // 					itemList.push(itemInfo);
    // 				}
    // 			}
    // 		}
    // 		else
    // 		{
    // 			itemList.push(itemInfo);
    // 		}
    // 	}
    //     return itemList.length >= 50 ? true : false;
    // }
    BagModel.prototype.fightingSort = function (info1, info2) {
        var vo1 = Manager.pool.create(AttrVO, info1.cvo.attr);
        var vo2 = Manager.pool.create(AttrVO, info2.cvo.attr);
        var f1 = vo1.getFighting();
        var f2 = vo2.getFighting();
        Manager.pool.push(vo1);
        Manager.pool.push(vo2);
        if (f1 < f2)
            return 1;
        else if (f1 > f2)
            return -1;
        else
            return 0;
    };
    /**
     * 快速熔炼
     */
    BagModel.prototype.quickRonglian = function () {
        var itemList = Manager.model.getEquip().getCanRonglianItems(50);
        Manager.control.getEquip().equipRonglian(itemList);
    };
    /*剩余格子是否太少*/
    // public isTooLittle(oneKeyFusoin:boolean=false, callBack:Function=null, callBackParam:any=null):boolean
    BagModel.prototype.isTooLittle = function (oneKeyFusoin, callBack) {
        if (oneKeyFusoin === void 0) { oneKeyFusoin = false; }
        if (callBack === void 0) { callBack = null; }
        this._callBack = callBack;
        if (Manager.model.getItems().bagSurplus <= 5) {
            if (oneKeyFusoin) {
                var ok = Manager.pool.create(CallBackInfo, this.callBack, this);
                Manager.tips.showTips(LangCVO.getContent("activity6"), ok, true); //背包已满，是否一键熔炼
            }
            return true;
        }
        return false;
    };
    BagModel.prototype.callBack = function () {
        Manager.model.getBag().quickRonglian();
        if (this._callBack != null) {
            this._callBack.actCallBack();
            Manager.pool.push(this._callBack);
            this._callBack = null;
        }
    };
    return BagModel;
}(egret.EventDispatcher));
__reflect(BagModel.prototype, "BagModel");
//# sourceMappingURL=BagModel.js.map