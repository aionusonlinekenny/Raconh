/**
 * 火眼金睛画布
 * liangyan
 * create 2018-03-28
*/
class FireEyeCanvas extends RenderSprite
{
	private _back:BitmapRes;
	private _elements:FireEyeElement[];
	private _label:BitmapRes;
	private _datas:Array<FireEyeGoodsData>;

	private _newData:FireEyeGoodsData;
	private _deleteItem:FireEyeElement;
	
    private readonly ELEMENT = "element";

	public constructor()
	{
		super();
		this.start();
		this.touchChildren = true;
	}

	protected start():void
	{
		super.start();

		this.width = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_CANVAS_WIDTH).value;
		this.height = FireEyeConfigCVO.getCVOByID(FireEyeConfigCVO.ID_CANVAS_HEIGHT).value;

		if(this._back == null)
		{
			this._back = Manager.pool.create(BitmapRes, "common_back3_png");
			this._back.width = this.width;
			this._back.height = this.height;
			this._back.alpha = 0;
			this.addChild(this._back);
		}

		if(this._label == null)
		{
			this._label = Manager.pool.create(BitmapRes, "fireEye_label_stop_png");
			this._label.x = (this.width - 171) / 2;
			this._label.y = this.height - 48;
			this.addChild(this._label);
		}
	}

	private createNew():void
	{
		Manager.render.remove(this.createNew, this);
		ObjectUtil.remove(this._deleteItem);
		if(this._deleteItem) Manager.pool.push(this._deleteItem);
		this._deleteItem = null;
		let element = Manager.pool.create(FireEyeElement, this._newData);
		element.x = this._newData.x;
		element.y = this._newData.y;
		element.touchEnabled = true;
		this.addChild(element);
		this._elements.push(element);
		Manager.model.getFireEye().curGoodsDatas.push(this._newData);
	}

    private clear():void
    {
        let len = this._elements ? this._elements.length : 0;
        for(let i = 0; i < len; i++)
        {
            ObjectUtil.remove(this._elements[i]);
            Manager.pool.push(this._elements[i]);
            this._elements[i] = null;
        }
        this._elements.length = 0;
    }

    public drawStatus(id:number, newData:FireEyeGoodsData):void
    {
		let status = newData != null;
		let len = this._elements ? this._elements.length : 0;
		let element:FireEyeElement;
		for(let i = 0; i < len; i++)
		{
			element = this._elements[i];
			if(element.data == null) continue;
			if(element.data.uniqueID == id)
			{
				let offset = 86 / 2 * this._datas[i].scale / 100;
				let sign = Manager.pool.create(FireEyeStatus, status);
				sign.x = element.x - offset;
				sign.y = element.y - offset;
				this.addChild(sign);
				if(status)
				{
					this._newData = newData;
					this._deleteItem = element;
					this._elements.slice(i, 1);
					Manager.model.getFireEye().curGoodsDatas.slice(i, 1);
					Manager.render.add(this.createNew, this, 500, 1);
				}
				break;
			}
		}
    }

    public reuse():void
	{
		this._datas = Manager.model.getFireEye().curGoodsDatas;
        super.reuse();
		if(this._elements == null) this._elements = [];
		this.clear();
		let len = this._datas ? this._datas.length : 0;
		let element:FireEyeElement;
		let data:FireEyeGoodsData;
		for(let i = 0; i <len; i++)
		{
			data = this._datas[i];
			element = Manager.pool.create(FireEyeElement, data);
			element.x = data.x;
			element.y = data.y;
			element.touchEnabled = true;
			this.addChild(element);
			this._elements.push(element);
		}
	}

	public unuse():void
	{
		Manager.render.remove(this.createNew, this);
        super.unuse();
		this.clear();
		ObjectUtil.removes(this._back, this._label);
		if(this._back) Manager.pool.push(this._back);
		this._back = null;
		if(this._label) Manager.pool.push(this._label);
		this._label = null;
		this._datas = null;
		this._newData = null;
		if(this._deleteItem) Manager.pool.push(this._deleteItem);
		this._deleteItem = null;
	}
	
	public dispose():void
	{
		Manager.render.remove(this.createNew, this);
        this.clear();
		ObjectUtil.removes(this._back, this._label);
		if(this._back) Manager.pool.push(this._back);
		this._back = null;
		if(this._label) Manager.pool.push(this._label);
		this._label = null;
		this._datas = null;
		this._newData = null;
		if(this._deleteItem) Manager.pool.push(this._deleteItem);
		this._deleteItem = null;
	}
}