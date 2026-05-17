/**
 * 创角名称
 */
class CreateRoleCVO
{
    private _lastNameList:Array<string>;
    private _maleNameList:Array<string>;
    private _femaleNameList:Array<string>;

    public constructor()
    {
        this._lastNameList = [];
        this._maleNameList = [];
        this._femaleNameList = [];
    }

    public parse(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readShort();
        for(let i:number = 0 ; i < tableCount; i ++)
        {
            this._lastNameList.push(bytes.readUTF());
            this._maleNameList.push(bytes.readUTF());
            this._femaleNameList.push(bytes.readUTF());
        }
    }

    /**
     * type:0为女，1为男
     */
    public getName(type:number):string
    {
        var lastName:string = this._lastNameList[Math.floor(Math.random() * this._lastNameList.length)];
        var firstName:string = "";
        switch(type)
        {
            case 0:
                firstName = this._femaleNameList[Math.floor(Math.random() * this._femaleNameList.length)];
                break;
            case 1:
                firstName = this._maleNameList[Math.floor(Math.random() * this._maleNameList.length)];
                break;
        }

        return firstName + lastName;
    }
}