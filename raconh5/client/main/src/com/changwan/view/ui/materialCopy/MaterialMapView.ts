/**
 * 缥缈录地图
 * Simon
 * 2018.3.14
 */
class MaterialMapView extends UIComponent
{
	public static MAPIMG_WIDTH:number = 2758;
	public static MAPIMG_HEIGHT:number = 1544;
	private _bgImgList:Array<BitmapRemote>;
	private _smallMap:BitmapRemote;

	private _thisParent:MaterialPanel;

	public constructor(thisParent:MaterialPanel)
	{
		super();
		this._thisParent = thisParent;
		this.skinName = Manager.path.getSkinName("material", "MaterialMapViewSkin");
	}

	protected configUI():void
	{
		super.configUI();

		this.touchEnabled = true;

		this.width = MaterialMapView.MAPIMG_WIDTH;
		this.height = MaterialMapView.MAPIMG_HEIGHT;

		this._smallMap = Manager.pool.create(BitmapRemote);
		this._smallMap.x = 0;
		this._smallMap.y = 0;
		this._smallMap.load(Manager.path.getPanelMaterialPath("material_smallMap", "jpg"), MaterialMapView.MAPIMG_WIDTH, MaterialMapView.MAPIMG_HEIGHT);
		this.addChild(this._smallMap);

		this._bgImgList = [];
		for(let i:number=0; i<7; i++)
		{
			for(let j:number=0; j<11; j++)
			{
				let bgImg = Manager.pool.create(BitmapRemote);
				bgImg.x = j * 256;
				bgImg.y = i * 256;
				this.addChild(bgImg);
				bgImg.load(Manager.path.getPanelMaterialPath("bgImgs/" + i + "_" + j, "jpg"));
				this._bgImgList.push(bgImg);
			}
		}
		this.onMapLoadComplete();
	}

	private onMapLoadComplete():void
	{
		this._thisParent.onMapLoadComplete();
	}

	public dispose():void
	{
		super.dispose();
		if(this._smallMap)
			Manager.pool.push(this._smallMap);
		this._smallMap = null;
		if(this._bgImgList)
		{
			for(let i:number=0; i<this._bgImgList.length; i++)
			{
				if(this._bgImgList[i])
					Manager.pool.push(this._bgImgList[i]);
				this._bgImgList[i] = null;
			}
			this._bgImgList = null;
		}
		this._thisParent = null;
	}
}