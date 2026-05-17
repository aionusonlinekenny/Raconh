/**
 * drq 
 * 兑换活动 Model
 * 2018.4.19
 */
class ExchangeModel extends egret.EventDispatcher
{
	public _endTime:number;
	private _cvo:ExchangeCVO[];

	public constructor() {
		super();
	}


	public getData(data:ExchangeCVO):any
	{
		let condList:ConditionVO[] = ConditionVO.getVOList(data.limit);//vip等级
		let condValue:number = condList[0].value;
		let curVip = Manager.model.self.attrInfo.vipLevel;
		
		let numArr = GainLossVO.parse(data.rewards);//消耗物品
		let num1 = numArr[0].num;
		let num2 = numArr[1].num;
		let cur_num1:number = Manager.model.getItems().getCountItemById(numArr[0].baseId);
		let cur_num2:number;
		if(numArr[1].baseId == 90000001)
		{
			cur_num2 = Manager.model.self.attrInfo.gold;
		}else{
			cur_num2 = Manager.model.getItems().getCountItemById(numArr[1].baseId);
		}
		
		let any:any = {};
		any.condValue = condValue;//vip限制条件
		any.curVip = curVip;//当前vip
		any.num1 = num1;//消耗物品1
		any.num2 = num2;//消耗物品2
		any.cur_num1 = cur_num1;//当前物品1
		any.cur_num2 = cur_num2;//当前物品2
		any.itemBaseID = numArr[1].baseId;//识别是否为元宝
		return any;
	}
	
	public checkCoin():boolean
	{
		let day:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
		let exchangeDay:number = ExchangeCVO.getServerDay();
		let num:number = this._endTime;
        let second:number = Math.round(num - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
		if(day <= exchangeDay || second <= 0) return false;
		this._cvo = ExchangeCVO.getCvo();
		for(let i=0;i<this._cvo.length;i++)
		{
			let list:ExchangeCVO = this._cvo[i];
			let any:any = this.getData(list);
			if((list.maxCurent == 0 || list.curCount < list.maxCurent) && any.cur_num1 >= any.num1 && any.cur_num2 >= any.num2 && any.curVip >= any.condValue)
			{
				return true;
			}
		}
		return false;
	}
}