class UiPageGroup extends egret.DisplayObjectContainer {

	private _totalpage:number;
	private _radioGroup:eui.RadioButtonGroup;
	private _page:number=0;
	private _callBack:Function;
	private _spaceX:number;
	private _list:UiRadioButton[];
    /**value:翻页的数量，call：回调方法，dx:组件间距 */
	public constructor(value:number,call:Function=null,dx:number=40) {
		super();
		this._totalpage = value;
		this._spaceX = dx;
		this._callBack = call;
		this.initView();
		this.addEvent();
	}
	private addEvent():void
	{
		this._radioGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
	}

	private removeEvent():void
	{
		this._radioGroup.removeEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
	}

	protected initView():void
	{
		this._radioGroup= new eui.RadioButtonGroup();
		this._list=[];
		for(var i:number = 0;i<this._totalpage;i++)
		{
			var rdb: UiRadioButton = new UiRadioButton();
			rdb.group = this._radioGroup;
			rdb.page = i;
			rdb.x = this._spaceX * i;
    		this.addChild(rdb);
			this._list.push(rdb);
		}
		if(this._list[0])
		{
			this._list[0].$selected = true;
		}
	}
	/**总页数 */
	public get totalpage():number
	{
		return this._totalpage;
	}

    /**当前的页 */
	public get page():number
	{
		return this._page;
	}
	
	public onSelection(value:number=0)
	{
		if(value>=0 && value<this._totalpage)
		{
			var btn = this._list[value]
			btn.selected= true;
			this._page = value;
			this.callBack(value);
		}
	}

	private radioChangeHandler(evt:eui.UIEvent):void {
		var btn = this._radioGroup.selection as UiRadioButton;
		var index:number = btn.page;
		this._page = index;
		this.callBack(index);
	}
	private callBack(index:number):void
	{
		if(this._callBack!=null)
		{
			this._callBack.call(this._callBack,index);
		}
	}
	public dispose():void
	{		
		
		this.removeEvent();
		for(var i:number = 0;i<this._list.length;i++)
		{
			var rdb: UiRadioButton = this._list[i];
			rdb.group = null;
			rdb.dispose();
		}
		this._list = null;
		this._radioGroup = null;
		this._callBack = null;
	}
	
}