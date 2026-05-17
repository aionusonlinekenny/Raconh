/**
 * 个人boss界面
 * luzh
 * create 2017-12.25
*/
class BossPrivateView extends UIComponent
{
    private _model:BossModel;
    private _cvos:Array<CopyCVO>;
    private _list:BaseVScrollerList;

    public constructor()
    {
        super();
        // this.skinName = Manager.path.getSkinName("boss", "BossPrivateViewSkin");
		this.dispatchEvent(new eui.UIEvent(eui.UIEvent.COMPLETE));//
        this.touchChildren = true;
    }
    
    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getBoss();
        this._cvos = CopyCVO.getCVOsByType(CopyConst.TYPE_BOSS_PRIVATE);

        this._list = new BaseVScrollerList();
        this._list.x = 5;
        this._list.y = 122;
        this._list.width = 710;
        this._list.height = 1010;
        this.addChild(this._list);
		this._list.initBtnListData(BossPrivateItem, null, true);
		(<eui.VerticalLayout>this._list.itemList.layout).gap = 13;

        this.drawList();
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.updateList, this);
    }

    protected removeEvent():void
    {
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.updateList, this);
        super.removeEvent();
    }

    private updateList(e:CopyEvent):void
    {
        if(e.params.type == CopyConst.TYPE_BOSS_PRIVATE)
        {
		    this.invalidate("drawList");
        }
    }

    private drawList():void
    {
        this._cvos.sort((a:CopyCVO, b:CopyCVO) => {
                if(a.leftNum > 0 && b.leftNum==0) return -1;
                if(a.leftNum==0 && b.leftNum > 0) return 1;
                return (a.id > b.id ? 1 : -1); 
                // let isOpen1:boolean = a.isCondSatisfy([ConditionVO.LEVEL, ConditionVO.REIN]);
                // let isOpen2:boolean = b.isCondSatisfy([ConditionVO.LEVEL, ConditionVO.REIN]);
                // if(isOpen1 && !isOpen2) return -1;
                // if(!isOpen1 && isOpen2) return 1;
                // if(isOpen1) return (a.id < b.id ? 1 : -1); 
                // else  return (a.id < b.id ? -1 : 1); 
            });
		this._list.dataProvider(this._cvos);
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawList")) this.drawList();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawList();
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.dispose(this._list);
        this._model = null;
        this._cvos = null;
        this._list = null;
    }
}