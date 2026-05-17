/**
 * 世界地图面板
 * luzhihong
 * create 2017-11-01
 */
class MapPanel extends Panel
{
	private _contentList:BaseVScrollerList;

	private _tempTime:number;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("worldMap", "MapSkin");
    }
    
    protected configUI():void
    {
		super.configUI();
		this.basePanel.setBottomBackTop(1200);
		this.basePanel.title = "world_title_png";

		let btnDatas = [
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "world_btn_world_png", imgClick: "world_btn_world_png"}
		];
		
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;

		// 填充数据
		let cvos:Array<MapCVO> = MapCVO.getCVOsByType(MapConst.TYPE_FIELD);

		this._contentList.initBtnListData(WorldMapItem, cvos, true);
		(<eui.VerticalLayout>this._contentList.itemList.layout).gap = -5;

		//定位
		let curVerseMapID:number = Manager.model.getTask().curVerseMapID;
		let index:number = 0;
		for(index = 0; index < cvos.length; index++)
		{
			if(cvos[index].id == curVerseMapID) break;
		}
		this._contentList.scroller.validateNow();
		let differ:number = index * 142 - 400;
		// if(differ > 0) this._contentList.scroller.viewport.scrollV = differ;
		this._tempTime = egret.setTimeout(this.delayMove, this, 150, differ);
    }

	private delayMove(differ:number):void
	{
		if(differ > 0) this._contentList.scroller.viewport.scrollV = differ;
	}

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.MapPanel);
				break;
		}
	}

	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);

		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;
		// switch(index)
		// {
		// 	case 0:
		// 		break;
		// 	case 1:
		// 		break;
		// 	case 2:
		// 		break;
		// 	case 3:
		// 		break;
		// }
	}

	public dispose():void
    {
		egret.clearTimeout(this._tempTime);
		super.dispose();
	}
}