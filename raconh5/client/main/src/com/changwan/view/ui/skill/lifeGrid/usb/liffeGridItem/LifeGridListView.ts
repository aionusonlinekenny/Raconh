/**
 * 命格总览
 * pzx
 * 2017.12.26
 */
class LifeGridListView extends PopUpView{
    private _scroller:BaseVScrollerList;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridListViewSkin");
    }
    protected configUI():void
    {
        super.configUI();
        this._popupView.titleImg.source = "lifeGrid_minggeyl_png";
        this._popupView.diImgVisible = false;
    }

    protected addEvent():void
    {
        super.addEvent();
    }

    protected removeEvent():void
    {
        super.removeEvent();
    }

	protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.LifeGridListView);
    }
    protected initData():void
    {
        super.initData();
        this.darwData();
    }
    
    private darwData():void{
       let list:any = ItemsCVO.cvos();
       let arr:any = {};
       for(let key in list)
       {
           let info:ItemsCVO = list[key];
           if(info.group== 4)
           {
               if(info.condition == "")
               {
                   continue;
               }
               //只取命格类
               let cvos:ItemsCVO[];

               if(arr[info.condition])
               {
                   cvos = arr[info.condition];
               }
               else
               {
                   cvos = [];
                   arr[info.condition] = cvos;
               }
               cvos.push(info);
           }
       }
       let arrlist:any={}
       for(let key in arr)
       {
           //排序
           let con:ConditionVO = new ConditionVO(key);
           arrlist[con.value2] = arr[key];
       }
       let data:Array<Array<ItemsCVO>> = [];
       for(let key in arrlist)
       {
            data.push(ArrayUtil.sortOn(arrlist[key],["id"]));
       }
       this._scroller.initBtnListData(LifeGridListItem, data, true);
    }
    
    public show():void
    {
        super.show();
    }

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
       
    }

    public dispose():void
    {
        super.dispose();
       // ObjectUtil.remove();
       this._scroller.dispose();
       this._scroller = null;
        
    }
}