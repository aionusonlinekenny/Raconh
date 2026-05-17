/**
 * drq 
 * 兑换活动 兑换cmd
 * 2018.4.19
 */
class ExchangeCMD  extends BaseCMD
{
	public _id:number;
	private _cvo:ExchangeCVO[];

	public constructor() {
		super();
		this._protocol = Protocol.CMD_EXCHANGE;
	}

	protected processOut(pkg:TCPPacketOut):void
	{
		pkg.writeByte(this._id);//活动id
	}

	public receive(pi:TCPPacketIn):void
	{
		let id:number = pi.readByte();//活动id
		this._cvo = ExchangeCVO.getCvo();
		for(let j=0;j<this._cvo.length;j++)
		{
			if(id == this._cvo[j].id)
			{
				this._cvo[j].curCount += 1;
				break;
			}
		}
		Manager.model.getExchange().dispatchEvent(new ExchangeEvent(ExchangeEvent.EXCHANGE_UPDATE));
	}
}