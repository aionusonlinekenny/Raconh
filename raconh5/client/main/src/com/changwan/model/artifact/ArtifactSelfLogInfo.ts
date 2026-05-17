/**
 * pzx 
 * create 18.2.8
 * 寻宝个人记录info
 *  */
class ArtifactSelfLogInfo {
	//寻宝类型 1-1次 10-10次
	public type:number;
/**物品列表  <base_id>*/
	public itemList:Array<number>= []

	public desc():string
	{
		let str:string;
		if(this.type == ArtifactType.SENDS_ONE_TYPE)
		{
			str = LangCVO.getContent("artifact6")
		}
		else if(this.type == 10)
		{
			str = LangCVO.getContent("artifact7")
		}
		let name:string="";
		let sign:string="";
		for(let i:number = this.itemList.length-1;i>-1;i--)
		{
			let cvo:ItemsCVO = ItemsCVO.getCvo(this.itemList[i]);
			if(cvo)
			{
				name += sign+"【"+HtmlUtil.addColorTag(cvo.name,cvo.colorStr)+"】";
			}
			sign = ",";
		}
		str = StringUtils.setParam(str,name);
		return str;
	}
}