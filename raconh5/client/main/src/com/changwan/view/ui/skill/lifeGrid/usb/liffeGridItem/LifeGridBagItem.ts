/**
 * pzx 
 * 命格背包item
 * create 17.12.26
 */
class LifeGridBagItem extends ItemRenderer{
    private _goods:BaseGoods;
    private _nameTxt:Label;
    private _attrTxt0:Label;
    private _attrTxt1:Label;
    private _cvo:LifeGridCVO;
    private _yiyouImg:eui.Image;
    private _tuijianImg:eui.Image;
	public constructor() {
			super();
        this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridBagItemSkin");
        this.touchChildren = false;
        this.touchEnabled = true;
	}
	 protected createChildren():void
    {
        super.createChildren();
    }  
   
	protected dataChanged():void
    {
        
        let lifeCvo:LifeGridCVO = this.data;
        let cvo:ItemsCVO = ItemsCVO.getCvo(lifeCvo.base_id);
        this._goods.setCvo(cvo);
        let name1:string = HtmlUtil.addColorTag(cvo.name+" Lv." + lifeCvo.lev,cvo.colorStr);
        HtmlUtil.setTextFlow(this._nameTxt,name1);
        this._cvo = lifeCvo;
        let attvo:AttrVO = Manager.pool.create(AttrVO,lifeCvo.attr);
        let attArr:AttrVoInfo[] = attvo.attrInfos;
        if(attArr[0])
        {
            HtmlUtil.setTextFlow(this._attrTxt0,attArr[0].desc(false, Color.GREEN_STR));
        }
        else
        {
            this._attrTxt0.text = "";
        }
        if(attArr[1])
        {
             HtmlUtil.setTextFlow(this._attrTxt1,attArr[1].desc(false, Color.GREEN_STR));
        }
        else
        {
            this._attrTxt1.text = "";
        }

        let arr:Array<ItemsModelInfo> = Manager.model.getItems().lifeGridList;
        let n:number=0;
        let m:number=0;
        let info:ItemsModelInfo;
        for(let i:number= 1;i<arr.length;i++)
        {
            if(arr[i])
            {
                let attrItemsinfo:ExattrItemsinfo = arr[i].infoList[0];
                let bagItemCvo:ItemsCVO = arr[i].cvo;
                let lifeCvo:LifeGridCVO = LifeGridCVO.getInfo(bagItemCvo.id,attrItemsinfo.value);
                let awerattArr:AttrVoInfo[] = lifeCvo.attrVos();
                n = this.getqeual(awerattArr,attArr);
                if(n!= 0)
                {
                    m=n;
                    let aln:number = awerattArr.length;
                    let bln:number = attArr.length;
                    if(aln == bln && aln == n)
                    {
                        //(一毛一样的属性组)
                        info = arr[i];
                        break;
                    }
                }

            }
        }
        if(info)
        {
            if(cvo.quality>info.cvo.quality)
            {
                this._tuijianImg.visible = true;
                this._yiyouImg.visible = false;
                return
            }
        }

        Manager.pool.push(attvo);
        this._yiyouImg.visible = !(m == 0);
        this._tuijianImg.visible = false;
	}
    /** 返回i个相同，0表示无相同 */
    private getqeual(value1:AttrVoInfo[],value2:AttrVoInfo[]):number
    {
        let i:number = 0;
        for(let j:number=0;j<value2.length;j++)
        {
            if(value1[0])
            {
                if(value1[0].id == value2[j].id)
                {
                    i++
                }
            }
            if(value1[1])
            {
                if(value1[0].id == value2[j].id)
                {
                    i++
                }
            }
        }
        return i;
    }
    public get cvo():LifeGridCVO
    {
        return this._cvo;
    }
	public dispose():void
	{
		super.dispose();
        ObjectUtil.disposes(this._nameTxt,this._attrTxt0,this._attrTxt1);
        Manager.pool.push(this._goods);
        this._goods=null;
        this._nameTxt=null;
        this._attrTxt0=null;
        this._attrTxt1=null;
        this._cvo=null;
        this.removeChild(this._yiyouImg);
        this._yiyouImg=null;
        this.removeChild(this._tuijianImg);
        this._tuijianImg = null;
	}

}