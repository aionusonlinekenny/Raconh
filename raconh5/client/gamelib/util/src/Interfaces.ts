namespace cw
{
    export interface IDispose
    {
        dispose():void;
    }
    export interface IPool extends IDispose
    {
        // poolKey:string;
        reuse(...args:any[]):void;
        unuse():void;
    }
}
