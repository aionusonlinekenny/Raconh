/**
 * 货币视图 1:铜钱 2:经验 3:元宝
 * liangyan
 * create 2017-11-22
*/
class GameMoneyView extends UIComponent
{
    private _icon:eui.Image;
    private _txt:Label;

    private _moneyType:number;
    private _wordsFormat:boolean;
    private _num:number;
    private _color:number;

    public constructor()
    {
        super();
        this.skinName = "GameMoneyViewSkin";
    }

    protected configUI():void
    {
        super.configUI();
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawLayout();
        this.drawData();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.LAYOUT)) this.drawLayout();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
    }

    private drawLayout():void
    {
        let name:string;
        switch(this._moneyType)
        {
            case 1:
                name = "playRes_coin_54_png";
            break;
            case 2:
                name = "playRes_exp_54_png";
            break;
            case 3:
                name = "playRes_gold_54_png";
            break;
            default:
                name = "";
            break;
        }
        this._icon.source = name;
    }

    private drawData():void
    {
        this._txt.textColor = this._color;
		let numStr = this._txt.text;
		if(numStr != "< 1")
		{
			if(this._wordsFormat) numStr = this.setWordsFormat(this._num);
			else numStr = "" + this._num;
		}
		this._txt.text = "  " + numStr;
        this.width = this._txt.x + this._txt.width;
    }

	private setWordsFormat(num:number):string
	{
		if(num < 10000) return "" + num;
		if(num >= 100000000) return (num / 100000000).toFixed(num % 100000000 == 0 ? 0 : 1) + "亿";
		return (num / 10000).toFixed(num % 10000 == 0 ? 0 : 1) + "万";
	}

    public setNum(value:number, color:number = Color.WHITE):void
	{
		if(this._num == value && this._color == color) return;
		this._num = value;
        this._color = color;
        this.invalidate(InvalidationType.DATA);
	}

    public get num():number
    {
        return this._num;
    }

    public reuse(moneyType:number, wordsFormat:boolean = true):void
    {
        this._moneyType = moneyType;
        this._wordsFormat = wordsFormat;
        this._num = -1;
        this._color = -1;
        super.reuse();
    }

    public unuse():void
    {
        super.unuse();
        // this._icon.bitmapData = null;
        // this._icon = null;
        // this._txt.dispose();
        // this._txt = null;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._icon, this._txt);
        this._icon.bitmapData = null;
        this._icon = null;
        this._txt.dispose();
        this._txt = null;
    }
}