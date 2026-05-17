/**
 * pzx 
 * create 18.2.8
 * 寻宝珍希记录info
 *  */
class ArtifactLogInfo {
	/**服务器id */
	public srv_id:number;
	/** 玩家名称 */
	public name:string;
	/** 物品id*/
	public base_id:number;

	public get desc():string
	{
		let str:string = LangCVO.getContent("artifact4");
		let cvo:ItemsCVO = ItemsCVO.getCvo(this.base_id);
		let itemName:string = HtmlUtil.addColorTag("【"+cvo.name+"】",cvo.colorStr);
		str = StringUtils.setParam(str,this.name,itemName);
		return str;
	}
}