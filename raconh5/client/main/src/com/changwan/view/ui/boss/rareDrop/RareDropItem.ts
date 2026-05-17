/**
 * 珍希掉落item
 * pzx
 * create 18.2.1
 */
class RareDropItem extends  ItemRenderer{

    private _timeTxt:Label;
    private _descTxt:Label;
 
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("boss/rareDrop", "RareDropItemSkin");
    }
    protected createChildren():void
    {
        super.createChildren();
        this.addEvent();
    }

    private addEvent():void
    {
        this._descTxt.addEventListener(egret.TextEvent.LINK,this.linkShopTips,this);
    }
    private removeEvent():void
    {
        this._descTxt.removeEventListener(egret.TextEvent.LINK,this.linkShopTips,this);
    }

    private linkShopTips():void
    {
        let info:ItemsModelInfo = this.data.item;
        let cvo:ItemsCVO = info.cvo;
		if(cvo)
		{
			if(cvo.group==1)
			{
				Manager.view.show(ViewID.BagEquipTips, info);
			}
			else 
			{
				Manager.view.show(ViewID.ItemsTips, info);
			}
		}
    }
	protected dataChanged():void
    {
        let cnof:RareDropInfo = this.data;
        let monCvo:MonsterCVO = MonsterCVO.getCVO(cnof.mon_id);
        let date:Date = cw.DateUtil.getDateBySecs(cnof.time);
       
        let time:string =date.getUTCFullYear()+LangCVO.getContent("common43") + (date.getUTCMonth()+1)+LangCVO.getContent("common44")+ date.getDate()+LangCVO.getContent("common45")+ date.getHours()+LangCVO.getContent("common46")+ date.getUTCMinutes()+LangCVO.getContent("common47");
        this._timeTxt.text = monCvo.getBossTypeDesc() + time;
        let str:string = LangCVO.getContent("boss17");
        let itemCvo:ItemsCVO = cnof.item.cvo;
        str = StringUtils.setParam(str,cnof.name,monCvo.level,monCvo.name);
        let itemName:string = HtmlUtil.addColorTag(itemCvo.name,itemCvo.colorStr);
        itemName = HtmlUtil.addATag(HtmlUtil.addUTag(itemName),"link");
        str = str + itemName;
        HtmlUtil.setTextFlow(this._descTxt,str);

    }


    public dispose():void
    {
        super.dispose();
        this.removeEvent();
        this._descTxt.dispose();
        this._timeTxt.dispose();
    }
}