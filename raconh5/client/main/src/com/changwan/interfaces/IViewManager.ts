/**
 * 需要视图管理器打开的统一接口
 * devil 2017-11-23
 */
interface IViewManager
{
    show(...args:any[]):void;
    hide():void;
}