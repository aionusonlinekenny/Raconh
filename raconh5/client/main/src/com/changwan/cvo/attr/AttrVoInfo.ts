/**
 * pzx 
 * 17.11.20
 * 属性信息
 */
class AttrVoInfo
{
  
    //属性名字
    public name:string;
    //短名
    public shortName:string;
    /**标签（客户端）*/
    public type:string;

    public id:number;

    public num:number;

    public format:number;

    public showStar:number;

    public sign:string = " +";
/** 文本内容 */
    public desc(short:boolean=false, color:string=null):string
    {
        let tName:string = short ? this.shortName : this.name;
        let str:string
        if(this.format== 1)
        {
            //format== 1为须要显示%
            str = this.sign + (Math.round(this.num * 10) / 100) + "%";
            // str = this.sign + Number(this.num/1000 * 100).toFixed(2) + "%"
            if(color != null)
            {
                str = HtmlUtil.addColorTag(str,color);
            }
            str = tName + str;
        }
        else
        {
            if(this.id >= 38 && this.id <= 45)
                str = this.sign + this.num / 1000;
            else
                str = this.sign + this.num;
            if(color != null)
            {
                str = HtmlUtil.addColorTag(str,color);
            }
            str = tName + str;
        }
        return str;
    }
}
