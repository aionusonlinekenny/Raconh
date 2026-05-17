/**
 * 斗地主
 * Simon
 * 2018.1.23
 */
class LairdCVO
{
    private static _cvo = {};
    private static _awardCvo = {};
    private static _interactCvo = {};
    private static _expCvo = {};

    public id:number;
    public value:number;

	public static parse(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readByte();
        for (let i:number = 0; i < tableCount; i++)
        {
            let count:number = bytes.readShort();
            if(i == 0)
            {
                for(let j:number=0; j<count; j++)
                {
                    let info:LairdCVO = new LairdCVO();
                    info.id = bytes.readByte();
                    info.value = bytes.readInt();
                    this._cvo[info.id] = info;
                }
            }
            if(i == 1)
            {
                for(let j:number=0; j<count; j++)
                {
                    let info:LairdAwardInfo = new LairdAwardInfo();
                    info.id = bytes.readByte();
                    info.award = new GainLossVO(bytes.readUTF());
                    this._awardCvo[info.id] = info;
                }
            }
            if(i == 2)
            {
                for(let j:number=0; j<count; j++)
                {
                    let info:LairdInteractInfo = new LairdInteractInfo();
                    info.id = bytes.readByte();
                    info.type = bytes.readByte();
                    info.name = bytes.readUTF();
                    this._interactCvo[info.id] = info;
                }
            }
            if(i == 3)
            {
                for(let j:number=0; j<count; j++)
                {
                    let info:LairdExpInfo = new LairdExpInfo();
                    info.id = bytes.readShort();
                    info.minLevel = bytes.readShort();
                    info.maxLevel = bytes.readShort();
                    info.exp = bytes.readInt();
                    this._expCvo[info.id] = info;
                }
            }
        }
    }

	public static getInfo(id:number):LairdCVO
	{
        return this._cvo[id];
	}

    public static getAward(id:number):LairdAwardInfo
    {
        return this._awardCvo[id];
    }

    public static getInteractByType(type:number):Array<LairdInteractInfo>
    {
        let list:Array<LairdInteractInfo> = [];
        for(let i in this._interactCvo)
        {
            if(this._interactCvo[i].type == type)
                list.push(this._interactCvo[i]);
        }
        return list;
    }

    public static getExpInfoByLevel(level:number):LairdExpInfo
    {
        for(let i in this._expCvo)
        {
            if(level >= this._expCvo[i].minLevel && level < this._expCvo[i].maxLevel)
                return this._expCvo[i];
        }
        return null;
    }
}

class LairdAwardInfo
{
    public id:number;
    public award:GainLossVO;
}

class LairdInteractInfo
{
    public id:number;
    public type:number;
    public name:string;
}

class LairdExpInfo
{
    public id:number;
    public minLevel:number;
    public maxLevel:number;
    public exp:number;
}