/**
 * 多物品显示容器
 * Simon
 * 2018.4.9
 */
class ItemObject extends RenderSprite
{
    private static ITEM_WIDTH:number = 141;
    private _itemInfoList:Array<ItemsModelInfo>;
    private _col:number;
    private _spacing:number;

    /**背景层 */
    private _bgLayer:Sprite;
    /**选择图片层 */
    private _selectLayer:Sprite;
    /**品质图片层列表，以品质分组 */
    private _bgColorLayer = {};
    /**物品基类层 */
    private _baseItemLayer:Sprite;
    /**物品数量背景层 */
    private _countBgImgLayer:Sprite;
    /**物品数量层 */
    private _itemAmountLayer:Sprite;
    /**星数层 */
    private _starLayer:Sprite;
    /**阶数背景层 */
    private _jieImgLayer:Sprite;
    /**阶数层 */
    private _jieNumLayer:Sprite;
    /**特效层 */
    private _effectLayer:Sprite;

    /**背景图片列表 */
    private _bgList = {};
    /**品质图片列表 */
    private _bgColorList = {};
    /**物品列表 */
    private _itemList = {};
    /**物品数量背景图列表 */
    private _countBgImgList = {};
    /**物品数量列表 */
    private _itemAmountList = {};
    /**星数列表 */
    private _starList = {};
    /**阶数背景列表 */
    private _jieImgList = {};
    /**阶数列表 */
    private _jieNumList = {};
    /**特效列表 */
    private _effectList = {};

    /**选择图片 */
    private _selectImg:BitmapRes;

    private _inited:boolean = false;
    private _selectIndex:number = -1;

	protected start():void
	{
		super.start();

        this._bgLayer = Manager.pool.create(Sprite);
        this.addChild(this._bgLayer);

        this._selectLayer = Manager.pool.create(Sprite);
        this.addChild(this._selectLayer);

        if(!this._bgColorLayer) this._bgColorLayer = {};
        for(let i:number=0; i<5; i++)
        {
            let bgColorLayer:Sprite = Manager.pool.create(Sprite);
            this.addChild(bgColorLayer);
            this._bgColorLayer[i + 2] = bgColorLayer;
        }

        this._baseItemLayer = Manager.pool.create(Sprite);
        this._baseItemLayer.touchChildren = true;
        this.addChild(this._baseItemLayer);

        this._countBgImgLayer = Manager.pool.create(Sprite);
        this.addChild(this._countBgImgLayer);

        this._itemAmountLayer = Manager.pool.create(Sprite);
        this.addChild(this._itemAmountLayer);

        this._starLayer = Manager.pool.create(Sprite);
        this.addChild(this._starLayer);

        this._jieImgLayer = Manager.pool.create(Sprite);
        this.addChild(this._jieImgLayer);

        this._jieNumLayer = Manager.pool.create(Sprite);
        this.addChild(this._jieNumLayer);

        this._effectLayer = Manager.pool.create(Sprite);
        this.addChild(this._effectLayer);
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawItems();
        this._inited = true;

        if(this._selectIndex != -1)
            this.selectIndex = this._selectIndex;
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid("drawItems")) this.drawItems();
    }

    private drawItems():void
    {
        let col:number = 0;
        let row:number = 0;
        let itemX:number;
        let itemY:number;
        for(let i:number=0; i<this._itemInfoList.length; i++)
        {
            if(col == this._col)
            {
                col = 0;
                row += 1;
            }

            itemX = col * (ItemObject.ITEM_WIDTH + this._spacing);
            itemY = row * (ItemObject.ITEM_WIDTH + this._spacing);

            /**背景图 */
            let bg:BitmapRes = Manager.pool.create(BitmapRes, "common_itemBg_png");
            bg.x = itemX;
            bg.y = itemY;
            this._bgLayer.addChild(bg);
            this._bgList[i] = bg;

            if(this._itemInfoList[i])
            {
                /**品质图 */
                let colorBg:BitmapRes = Manager.pool.create(BitmapRes, "common_item_" + this._itemInfoList[i].cvo.quality + "_png");
                colorBg.x = 27 + itemX;
                colorBg.y = 27 + itemY;
                this._bgColorLayer[this._itemInfoList[i].cvo.quality].addChild(colorBg);
                this._bgColorList[this._itemInfoList[i].id] = colorBg;

                /**物品item */
                let item:BaseItem = Manager.pool.create(BaseItem, this._itemInfoList[i]);
                item.x = itemX;
                item.y = itemY;
                this._baseItemLayer.addChild(item);
                this._itemList[this._itemInfoList[i].id] = item;

                /**物品数量背景 */
                let countBgImg:BitmapRes = Manager.pool.create(BitmapRes, "common_item_amountBg_png");
                countBgImg.x = 56 + itemX;
                countBgImg.y = 90 + itemY;
                if(this._itemInfoList[i].quantity > 1)
                    this._countBgImgLayer.addChild(countBgImg);
                this._countBgImgList[this._itemInfoList[i].id] = countBgImg;

                /**物品数量文本 */
                let countTxt:Label = Manager.pool.create(Label);
                countTxt.fontFamily = "Microsoft YaHei";
                countTxt.textAlign = "right";
                countTxt.width = 90;
                countTxt.height = 24;
                countTxt.x = 20 + itemX;
                countTxt.y = 90 + itemY;
                countTxt.text = this._itemInfoList[i].quantity + "";
                if(this._itemInfoList[i].quantity > 1)
                    this._itemAmountLayer.addChild(countTxt);
                this._itemAmountList[this._itemInfoList[i].id] = countTxt;

                /**星数 */
                let starList:Array<BitmapRes> = [];
                for(let j:number=0; j<3; j++)
                {
                    let star:BitmapRes = Manager.pool.create(BitmapRes, "common_star_bright_png", null, null, 20, 20);
                    star.x = 92 + itemX;
                    star.y = 28 + 20 * j + itemY;
                    starList.push(star);
                    if(j + 1 <= this._itemInfoList[i].getStar())
                        this._starLayer.addChild(star);
                }
                this._starList[this._itemInfoList[i].id] = starList;

                let isShowJie:boolean = this._itemInfoList[i].cvo.group==1 && this._itemInfoList[i].cvo.needLevel>1000;
                /**阶数背景 */
                let jieBgImg:BitmapRes = Manager.pool.create(BitmapRes, "common_tips_num_back_png");
                jieBgImg.x = 24 + itemX;
                jieBgImg.y = 23 + itemY;
                if(isShowJie)
                    this._jieImgLayer.addChild(jieBgImg);
                this._jieImgList[this._itemInfoList[i].id] = jieBgImg;

                /**阶数文本 */
                let jieTxt:Label = Manager.pool.create(Label);
                jieTxt.fontFamily = "Microsoft YaHei";
                jieTxt.textAlign = "right";
                jieTxt.width = 42;
                jieTxt.height = 21;
                jieTxt.x = 27 + itemX;
                jieTxt.y = 23 + itemY;
                jieTxt.text = "";
                if(isShowJie)
                {
                    jieTxt.text = String(this._itemInfoList[i].cvo.needLevel).substr(2,1)+LangCVO.getContent("common18");
                    this._jieNumLayer.addChild(jieTxt);
                }
                this._jieNumList[this._itemInfoList[i].id] = jieTxt;

                this.setEffect(this._itemInfoList[i], itemX, itemY);
            }

            col += 1;
        }
    }

    private setEffect(itemInfo:ItemsModelInfo, itemX:number, itemY:number):void
	{
        if(!this._effectList[itemInfo.id]) this._effectList[itemInfo.id] = {effectPath:"", itemAni:null};

        let effectPath:string = "";
        if(itemInfo.cvo.quality == 5)
		{
			effectPath = "itemOrange2Eff";
		}
		else if(itemInfo.cvo.quality == 6)
		{
			effectPath = "itemRedEff";
		}

		if(effectPath == "")
		{
            this._effectList[itemInfo.id].effectPath = ""
            if(this._effectList[itemInfo.id].itemAni)
                Manager.pool.push(this._effectList[itemInfo.id].itemAni);
            this._effectList[itemInfo.id].itemAni = null;
			return;
		}
		if(this._effectList[itemInfo.id].effectPath == effectPath) return;
		if(this._effectList[itemInfo.id].itemAni)
		{
			Manager.pool.push(this._effectList[itemInfo.id].itemAni);
			this._effectList[itemInfo.id].itemAni = null;
		}
		
		this._effectList[itemInfo.id].itemAni = Manager.animation.createEffectAnimation(effectPath);
		this._effectLayer.addChild(this._effectList[itemInfo.id].itemAni);
		this._effectList[itemInfo.id].itemAni.x = -57 + itemX;
		this._effectList[itemInfo.id].itemAni.y = -51 + itemY;
		
		this._effectList[itemInfo.id].effectPath = effectPath;
	}

    /**
     * itemInfoList：物品信息列表
     * col:列数
     * spacing:间距
     */
	public reuse(itemInfoList:Array<ItemsModelInfo>, col:number = 10, spacing:number = 20):void
	{
        this.touchChildren = true;
		this._itemInfoList = itemInfoList;
        this._col = col;
        this._spacing = spacing;
        this.cleanData();
		super.reuse();
	}

	public unuse():void
	{
        this.cleanAll();
		super.unuse();
    }

    private cleanData():void
    {
        if(this._bgList)
        {
            for(let i in this._bgList)
            {
                if(this._bgList[i])
                {
                    Manager.pool.push(this._bgList[i]);
                }
                this._bgList[i] = null;
            }
        }
        this._bgList = {};

        if(this._bgColorList)
        {
            for(let i in this._bgColorList)
            {
                if(this._bgColorList[i])
                    Manager.pool.push(this._bgColorList[i]);
                this._bgColorList[i] = null;
            }
        }
        this._bgColorList = {};

        if(this._itemList)
        {
            for(let i in this._itemList)
            {
                if(this._itemList[i])
                    Manager.pool.push(this._itemList[i]);
                this._itemList[i] = null;
            }
        }
        this._itemList = {};

        if(this._countBgImgList)
        {
            for(let i in this._countBgImgList)
            {
                if(this._countBgImgList[i])
                    Manager.pool.push(this._countBgImgList[i]);
                this._countBgImgList[i] = null;
            }
        }
        this._countBgImgList = {};

        if(this._itemAmountList)
        {
            for(let i in this._itemAmountList)
            {
                if(this._itemAmountList[i])
                    Manager.pool.push(this._itemAmountList[i]);
                this._itemAmountList[i] = null;
            }
        }
        this._itemAmountList = {};

        if(this._starList)
        {
            for(let i in this._starList)
            {
                if(this._starList[i])
                {
                    for(let j:number=0; j<this._starList[i].length; j++)
                    {
                        if(this._starList[i][j])
                            Manager.pool.push(this._starList[i][j]);
                        this._starList[i][j] = null;
                    }
                    this._starList[i] = null;
                }
            }
        }
        this._starList = {};

        if(this._jieImgList)
        {
            for(let i in this._jieImgList)
            {
                if(this._jieImgList[i])
                    Manager.pool.push(this._jieImgList[i]);
                this._jieImgList[i] = null;
            }
        }
        this._jieImgList = {};

        if(this._jieNumList)
        {
            for(let i in this._jieNumList)
            {
                if(this._jieNumList[i])
                    Manager.pool.push(this._jieNumList[i]);
                this._jieNumList[i] = null;
            }
        }
        this._jieNumList = {};

        if(this._effectList)
        {
            for(let i in this._effectList)
            {
                this._effectList[i].effectPath = null;
                if(this._effectList[i].itemAni)
                    Manager.pool.push(this._effectList[i].itemAni);
                this._effectList[i].itemAni = null;
            }
        }
        this._effectList = {};
    }

    private cleanAll():void
    {
        ObjectUtil.removes(this._bgLayer, this._selectLayer, this._baseItemLayer, this._countBgImgLayer, 
            this._itemAmountLayer, this._starLayer, this._jieImgLayer, this._jieNumLayer, this._effectLayer, this._selectImg);

        this.cleanData();

        if(this._bgLayer)
            Manager.pool.push(this._bgLayer);
        this._bgLayer = null;

        if(this._selectLayer)
            Manager.pool.push(this._selectLayer);
        this._selectLayer = null;

        if(this._bgColorLayer)
        {
            for(let i in this._bgColorLayer)
            {
                Manager.pool.push(this._bgColorLayer[i]);
                this._bgColorLayer[i] = null;
            }
        }
        this._bgColorLayer = null;

        if(this._baseItemLayer)
            Manager.pool.push(this._baseItemLayer);
        this._baseItemLayer = null;

        if(this._countBgImgLayer)
            Manager.pool.push(this._countBgImgLayer);
        this._countBgImgLayer = null;

        if(this._itemAmountLayer)
            Manager.pool.push(this._itemAmountLayer);
        this._itemAmountLayer = null;

        if(this._starLayer)
            Manager.pool.push(this._starLayer);
        this._starLayer = null;

        if(this._jieImgLayer)
            Manager.pool.push(this._jieImgLayer);
        this._jieImgLayer = null;

        if(this._jieNumLayer)
            Manager.pool.push(this._jieNumLayer);
        this._jieNumLayer = null;

        if(this._effectLayer)
            Manager.pool.push(this._effectLayer);
        this._effectLayer = null;

        
        if(this._selectImg)
            Manager.pool.push(this._selectImg);
        this._selectImg = null;

        this._itemInfoList = null;
    }

    public getItem(id:number):BaseItem
    {
        return this._itemList[id];
    }

    public updateItemInfo(itemInfoList:Array<ItemsModelInfo>):void
    {
        this._itemInfoList = itemInfoList;
        this.cleanData();
        // this.invalidate("drawItems");
        this.drawItems();
    }

    public getItemInfo():Array<ItemsModelInfo>
    {
        return this._itemInfoList;
    }

    /**
     * 选择某个物品
     */
    public set selectIndex(value:number)
    {
        this._selectIndex = value;
        if(this._inited)
        {
            if(this._bgList[this._selectIndex])
            {
                if(this._selectImg && this._selectImg.parent)
                    this._selectLayer.removeChild(this._selectImg);
                if(!this._selectImg) this._selectImg = Manager.pool.create(BitmapRes, "common_itemBg_select_png");
                this._selectImg.x = this._bgList[this._selectIndex].x;
                this._selectImg.y = this._bgList[this._selectIndex].y;
                this._selectLayer.addChild(this._selectImg);
            }
        }
    }

    /**
     * 返回当前选中物品序号
     */
    public get selectIndex():number
    {
        return this._selectIndex;
    }

    public dispose():void
    {
        super.dispose();

        this.cleanAll();
        this._bgList = null;
        this._bgColorList = null;
        this._itemList = null;
        this._countBgImgList = null;
        this._itemAmountList = null;
        this._starList = null;
        this._jieImgList = null;
        this._jieNumList = null;
        this._effectList = null;
    }
}