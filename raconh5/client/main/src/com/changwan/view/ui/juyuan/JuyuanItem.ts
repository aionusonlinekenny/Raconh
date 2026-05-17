/**
 * drq 
 * 聚元 Item
 * 2018.4.3
 */
class JuyuanItem extends PopUpView {
	private _ballImg:eui.Image;
	private _text01:Label;
	private _text02:Label;
	private _text03:Label;
	private _text04:Label;
	private _bimfont:NumImgView2;
	private _data:JuyuanCVO;
	private _index:number;

	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("juyuan", "JuyuanItemSkin");
	}
	protected configUI():void
    {
        super.configUI();
		if(!this._bimfont)
		{
			this._bimfont = Manager.pool.create(NumImgView2);
            this._bimfont.x = 238 + 115 + 10;
			this._bimfont.y = 526;
			this.addChild(this._bimfont);
		}
    }

	protected drawAll():void
	{
		super.drawAll();
		this.drawData();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

	private drawData():void
	{
		//标题
		this._popupView.titleImg.source = "zhu_name0" + (this._index+1) + "_png";
		//图标
		this._ballImg.source = "juyuan_icon_"+(this._index + 1)+"_png";
		if(this._data){
			//战力
			let attr:string = this._data.attr;
			let attvo:AttrVO = Manager.pool.create(AttrVO,attr);
			let fight:number = attvo.getFighting();
			this._bimfont.setValue(fight,"nums_fighting_",28);
			//各属性
			this._text01.text = attvo.attrInfos[0].desc();
			this._text02.text = attvo.attrInfos[1].desc();
			this._text03.text = attvo.attrInfos[2].desc();
			this._text04.text = attvo.attrInfos[3].desc();
			Manager.pool.push(attvo);
		} else{
			//战力

			this._bimfont.setValue(0,"nums_fighting_",28);
			//各属性
			this._text01.text = LangCVO.getContent("juyuan19") + "+0";
			this._text02.text = LangCVO.getContent("juyuan20") + "+0";
			this._text03.text = LangCVO.getContent("juyuan21") + "+0";
			this._text04.text = LangCVO.getContent("juyuan22") + "+0";
		}
	}


	public show(data:JuyuanCVO,index:number):void
    {
		this._data = data;
		this._index = index;
        super.show();
    }

	protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.JuyuanItem);
    }

	public dispose():void
	{
		super.dispose();
		ObjectUtil.remove(this._ballImg);
		ObjectUtil.disposes(this._text01,this._text02,this._text03,this._text04);
		this._ballImg = null;
		this._text01 = null;
		this._text02 = null;
		this._text03 = null;
		this._text04 = null;
		this._bimfont.dispose();
		this._bimfont = null;
		this._data = null;
		this._index = null;
	}
}