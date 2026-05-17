class RenderTexture extends egret.RenderTexture implements cw.IPool
{
    public constructor()
    {
        super();
    }

    public reuse():void
    {}

    public unuse():void
    {
        
    }

    public dispose():void
    {
        super.dispose();
    }
}