class ChuangongAwardItem extends Sprite
{
	public item:BaseGoods;
	public recommendImg:BitmapRes;
	public bei:TextField;
	public count:TextField;

	public constructor()
	{
		super();
		this.touchChildren = true;
		this.start();
	}

	protected start():void
    {
        super.start();

		this.item = Manager.pool.create(BaseGoods);
		this.addChild(this.item);

		this.recommendImg = BitmapRes.create("common_itemRecommend_png", 16, 17, 82, 84);
		this.addChild(this.recommendImg);

		this.bei = TextField.create(73, 25);
		this.bei.move(14, 65);
		this.bei.textColor = Color.WHITE;
        this.bei.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.bei.textAlign = egret.HorizontalAlign.CENTER;
        this.bei.fontFamily = "Microsoft YaHei";
        this.bei.size = 25;
		this.bei.text = LangCVO.getContent("training2", 2);
		this.bei.rotation = 314;
		this.addChild(this.bei);

		this.count = TextField.create(100, 24);
		this.count.move(13, 91);
		this.count.textColor = Color.WHITE;
        this.count.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.count.textAlign = egret.HorizontalAlign.RIGHT;
        this.count.fontFamily = "Microsoft YaHei";
        this.count.size = 24;
		this.count.text = "100000";
		this.addChild(this.count);
    }

	public addObject(...arge:any[]):void
	{
		if(arge)
		{
			for(let obj of arge)
				if(obj && !obj.parent) obj.parent.addChild(obj);
		}
	}

	public removeObject(...arge:any[]):void
	{
		if(arge)
		{
			for(let obj of arge)
				if(obj && obj.parent) obj.parent.removeChild(obj);
		}
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this.item, this.recommendImg, this.bei, this.count);

		if(this.item)
			Manager.pool.push(this.item);
		this.item = null;
		if(this.recommendImg)
			Manager.pool.push(this.recommendImg);
		this.recommendImg = null;
		if(this.bei)
			Manager.pool.push(this.bei);
		this.bei = null;
		if(this.count)
			Manager.pool.push(this.count);
		this.count = null;
	}
}