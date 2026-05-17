class ScriptBaseCVO
{
    private _configs:string[];
    
    public constructor(script:string)
    {
        this._configs = (script == null || script == "") ? [] : script.split("|");
    }

    public getTypeValue(type:number):number
    {
         let b:string[];
         for(let one of this._configs)
         {
             b = one.split(",");
             if(parseInt(b[0]) == type) return parseInt(b[1]);
         }
         return -1;
    }

    public getTypeHasValue(type:number):boolean
    {
         var b:string[];
         for(let one of this._configs)
         {
             b = one.split(",");
             if(parseInt(b[0]) == type) return (b[1] != "-1");
         }
         return false;
    }
}