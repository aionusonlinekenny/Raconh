declare namespace cw
{
    class  StringUtil
    {
        static format(result:string,...args:any[]):string;
        static getStringLen(str:string):number;
        static isEmptyStr(str:string):boolean;
    }
    class MathUtil
    {
        static clamb(min:number, max:number, value:number):number;
    }
    class ByteArray
    {
        readInt64():number;
        writeInt64():void;
    }
    class ByteUtil
    {
        static toHexDump(desc:string, dump:egret.ByteArray, start:number, count:number):string;
    }
	class DateUtil
    {
        static formatStr(seconds:number):string;
    }
    interface IDispose
    {
        dispose():void;
    }
    interface IPool extends IDispose
    {
        poolKey:string;
        reuse(...args:any[]):void;
        unuse():void;
    }
}