/**
 * 气泡提示
 * liangyan
 * create 2017-11-03
*/
class BubbleView extends UIComponent
{
    public back:eui.Image;
    public numTxt:Label;

    private readonly MAX_NUM:number = 99;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("common", "BubbleViewSkin");
    }

    public update(num:number, autoVisible:boolean = true, showNum:boolean = true):void
    {
        if(this.numTxt)
        {
            if(showNum)
            {
                num = num > this.MAX_NUM ? this.MAX_NUM : num;
                this.numTxt.text = "" + num;
            }
            else this.numTxt.text = "!";
        }
        if(autoVisible)
        {
            this.visible = num != 0;
        }
    }

    public dispose():void
    {
        this.back = null;

        if(this.numTxt)
            this.numTxt.dispose();
        this.numTxt = null;

        super.dispose();
    }
}