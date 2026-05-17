class TextField extends egret.TextField implements cw.IPool
{

    public static create(width:number,height:number,textColor:number = 0xffffff,size:number = 24,textAlign:string = "left",verticalAlign:string = "top"):TextField
    {
        let result:TextField = Manager.pool.create(TextField);
        result.fontFamily = "Microsoft YaHei";
        result.size = size;
        result.width = width;
        result.height = height;
        result.textColor = textColor;
        result.textAlign = textAlign;
        result.verticalAlign = verticalAlign;
        return result;
    }

    public reuse():void
    {

    }

    public move(x:number,y:number):void
    {
        this.x = x;
        this.y = y;
    }

    public pool():void
    {
        Manager.pool.push(this);
    }

    public unuse():void
    {
        if(this.parent != null)this.parent.removeChild(this);
        this.cacheAsBitmap = false;
        this.touchEnabled = false;
        this.x = 0;
        this.y = 0;
        this.alpha = 1;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.visible = true;
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        this.text = "";
        this.$TextField = 
            {
            0: egret.TextField.default_size,             //fontSize
            1: 0,              //lineSpacing
            2: egret.TextField.default_textColor,       //textColor
            3: NaN,           //textFieldWidth
            4: NaN,           //textFieldHeight
            5: 0,              //textWidth
            6: 0,              //textHeight
            7: 0,              //textDrawWidth
            8: egret.TextField.default_fontFamily,   //fontFamily
            9: "left",         //textAlign
            10: "top",         //verticalAlign
            11: "#ffffff",     //textColorString
            12: "",            //fontString
            13: "",            //text
            14: [],            //measuredWidths
            15: false,         //bold,
            16: false,         //italic,
            17: true,          //fontStringChanged,
            18: false,         //textLinesChanged,
            19: false,          //wordWrap
            20: false,         //displayAsPassword
            21: 0,              //maxChars
            22: 0, //selectionActivePosition,
            23: 0, //selectionAnchorPosition,
            24: egret.TextFieldType.DYNAMIC,              //type
            25: 0x000000,              //strokeColor
            26: "#000000",              //strokeColorString
            27: 0,              //stroke
            28: -1,              //scrollV
            29: 0,              //numLines
            30: false,              //multiline
            31: false,              //border
            32: 0x000000,              //borderColor
            33: false,              //background
            34: 0xffffff,              //backgroundColor
            35: null,           //restrictAnd
            36: null,           //restrictNot
            37: egret.TextFieldInputType.TEXT            //inputType
        };
    }

    public dispose():void
    {
        if(this.parent != null)this.parent.removeChild(this);
    }
}