/**
 * drq 
 * 兑换活动 初始信息cmd
 * 2018.4.19
 */
class ExchangeInfoCMD extends BaseCMD
{
	private _model:ExchangeModel;
	private _cvo:ExchangeCVO[];

	public constructor() {
		super();
		this._protocol = Protocol.CMD_EXCHANGE_INFO;
	}

	public receive(pi:TCPPacketIn):void
	{
		this._model = Manager.model.getExchange();
		this._cvo = ExchangeCVO.getCvo();
		let end_ts:number = pi.readInt();//结束时间戳
		this._model._endTime = end_ts;
		let len:number = pi.readShort();
		for(let i=0;i<len;i++)
		{
			let id:number = pi.readByte();//活动id
			let count:number = pi.readShort();//领取次数
			for(let j=0;j<this._cvo.length;j++)
			{
				if(id == this._cvo[j].id)
				{
					this._cvo[j].curCount = this._cvo[j].maxCurent - count;
					break;
				}
			}
		}
	}
}