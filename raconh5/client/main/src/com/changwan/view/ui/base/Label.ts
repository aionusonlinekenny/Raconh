/**
 * update devil 填加对象池接口   
 */
class Label extends eui.Label
{
    public constructor()
    {
        super();
    }

    public dispose():void
    {
        if(this.parent)this.parent.removeChild(this);
    }
}