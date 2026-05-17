/**
 * 升星 说明
 * drq
 *  2018.04.13
 */
class StarUpExplainView extends PopUpView
{
	private _title:string;
    private _txt:Label;
    private _img:eui.Image;
    private _enterBtn:eui.Button;
    private _conType:number;
    private _con:string;
    private _isEnterBtn:boolean;
    private _imgW:number;
    private _imgH:number;

    private _list:Array<ItemsModelInfo>;
    
    private _vScroll:BaseVScrollerList;


	public constructor() 
	{
		super();
		this.skinName = Manager.path.getSkinName("equip", "StarUpExplainViewSkin");
	}
	protected configUI():void
    {
        super.configUI();
		this._popupView.titleImg.source = this._title;
        this._enterBtn.visible = this._isEnterBtn;
        switch(this._conType)
        {
            case 1://文字
                this._txt.visible = true;
                this._txt.text = this._con;
                break;
            case 2://图片
                this._popupView.diImgVisible = false;
                this._img.visible = true;
                this._img.source = this._con;
                this._img.width = this._imgW;
                this._img.height = this._imgH;
                break;
            case 3://主装备
                this._popupView.diImgVisible = false;
                this._vScroll.initBtnListData(StarUpRowItem,[],true);
                this.drawMainEquip(null);
                break;
        }
        
    }

    private drawMainEquip(e:ItemsEvent):void{
        let arr:Array<Array<ItemsModelInfo>> = [];
        let row:number = Math.ceil(this._list.length/4)<2?2:Math.ceil(this._list.length/4);
        let count:number = 0;
        let a=[];
        for(let i=0;i<this._list.length;i++)
        {
            a.push(this._list[i].base_id,this._list[i].storagetype);
        }
        for(let i=0;i<row;i++)
        {
            let arr2 = [];
            let col;
			if(i==(row-1))//最后一行?
            {
                this._list.length%4==0?col=4:col=this._list.length%4;
            }else{
                col=4;
            }
            
			for(let j=0;j<col;j++)
            {
                arr2.push(this._list[count]);
                count++;
            }
            arr.push(arr2);
        }
        this._vScroll.dataProvider(arr);
    }

    protected addEvent():void
    {
        super.addEvent();
        this._enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
    }
    
    public show(title:string, type:number, con:string ,isEnterBtn:boolean, w:number, h:number, list:Array<ItemsModelInfo>):void
    {
		super.show();
        this._title = title;
        this._conType = type;
        this._con = con;
        this._isEnterBtn = isEnterBtn;
        this._list = list;
		if(type == 2)
        {
            this._imgW = w;
            this._imgH = h;
        }
    }

	protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.StarUpExplainView);
    }
	

    public hide():void
    {
        this.dispose();
    }


    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._img,  this._enterBtn);
        ObjectUtil.dispose(this._txt);

        this._title = null;
        this._txt = null;
        this._img = null;
        this._enterBtn = null;
        this._conType = null;
        this._con = null;
        this._isEnterBtn = null;
        this._imgW = null;
        this._imgH = null;
        this._list = null;
    
        this._vScroll.dispose();
        this._vScroll = null;
    }
}