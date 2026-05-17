class BaseEvent extends egret.Event
{
    public params:any;
    public constructor(type:string, params?:any, bubbles?: boolean, cancelable?: boolean)
    {
        super(type, bubbles, cancelable);
        this.params = params;
    }
}