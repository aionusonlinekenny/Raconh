class HtmlUtil
{
    // <font color="#0000ff" size="30" fontFamily="Microsoft YaHei">Microsoft YaHei blue large</font><font color="#ff7f50" size="10">珊瑚色<b>局部加粗</b>小字体</font><i>斜体</i>
    // 宋体"SimSun"   微软雅黑"Microsoft YaHei"
    public static setTextFlow(tf:egret.TextField | eui.Label | TextField, htmlText:string):void
    {
        tf.textFlow = (new egret.HtmlTextParser).parser(htmlText);
    }
    public static addBTag(str:string):string
    {
        return "<b>" + str + "</b>";
    }
    public static addUTag(str:string):string
    {
        return "<u>" + str + "</u>";
    }
    public static addFont(str:string,font:string):string
    {
        return "<font fontFamily='" + font + "'>"+ str + "</font>";
    }
    public static addColorTag(str:string,color:string):string
    {
        return "<font color='" + color + "'>"+ str + "</font>";
    }
    public static addFontTag(str:string,color:string,size:number=0):string
    {
        if(size == 0) size = egret.TextField.default_size;
        return "<font color='" + color + "' size='" + size + "'>"+ str + "</font>";
    }
    public static addATag(str:string,event:string=""):string
    {
        return "<a href = 'event:" + event + "'>" + str + "</a>";
    }    
    public static addTag(text:string,color:string,size:number=0,bold:boolean=false):string
    {
        if(size == 0) size = egret.TextField.default_size;
        if(bold) text = this.addBTag(text);
        return this.addFontTag(text,color,size);
    }
}