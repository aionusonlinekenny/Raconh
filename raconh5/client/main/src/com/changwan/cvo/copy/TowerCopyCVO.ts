/**
 * 爬塔副本表
 * liangyan
 * create 2017-12-27
*/
class TowerCopyCVO
{
    private static _cvos:Object;
    /**最大层数 */
    public static MAX_CELL:number;

    /**层数 */
    public cell:number;
    private _monsterID:number;
    private _monCvo:MonsterCVO;
    /**怪物模板表 */
    public get monster():MonsterCVO
    {
        if(!this._monCvo) this._monCvo = MonsterCVO.getCVO(this._monsterID);
        return this._monCvo;
    }
    /**推荐战力 */
    public fightAdvise:number;
    /**进入条件 */
    public conditions:ConditionVO[];
    /**阶段解锁描述 */
    public unlockDesc:string[];
    /**是否为boss */
    public isBoss:boolean;
    private _firstStr:string;
    private _firstArr:GainLossVO[];
    /**首通奖励 */
    public get firstRewards():GainLossVO[]
    {
        if(!this._firstArr)
        {
            this._firstArr = [];
            let arr = this._firstStr.split("|");
            let gain:GainLossVO;
            for(let i = 0; i < arr.length; i++)
            {
                gain = new GainLossVO(arr[i]);
                this._firstArr.push(gain);
            }
        }
        return this._firstArr;
    }
    private _saodangStr:string;
    private _saodangArr:GainLossVO[];
    /**扫荡奖励 */
    public get saodangRewards():GainLossVO[]
    {
        if(!this._saodangArr)
        {
            this._saodangArr = [];
            let arr = this._saodangStr.split("|");
            let gain:GainLossVO;
            for(let i = 0; i < arr.length; i++)
            {
                gain = new GainLossVO(arr[i]);
                this._saodangArr.push(gain);
            }
        }
        return this._saodangArr;
    }

    private parseOne(data:egret.ByteArray):void
    {
        this.cell = data.readShort();
        this.parseMonster(data.readUTF());
        this.fightAdvise = data.readInt();
        this.conditions = ConditionVO.getVOList(data.readUTF());
        this.unlockDesc = data.readUTF().split("|");
        this.isBoss = data.readByte() == 1;
        this._firstStr = data.readUTF();
        this._saodangStr = data.readUTF();
    }

    private parseMonster(str:string):void
    {
        var reg:RegExp = /{|}| /g;
        str = str.replace(reg,"");
        let arr:Array<string> = str.split(",");
        this._monsterID = parseInt(arr[0]);
    }

    public static parse(bytes:egret.ByteArray):void
    {
        TowerCopyCVO._cvos = [];
        let cvo:TowerCopyCVO;
        let rowCount:number = bytes.readShort();
        for (let i = 0; i < rowCount; i++)
        {
            cvo = new TowerCopyCVO();
            cvo.parseOne(bytes);
            TowerCopyCVO._cvos[cvo.cell] = cvo;
        }
        TowerCopyCVO.MAX_CELL = rowCount;
    }

    public static getCVO(cell:number):TowerCopyCVO
    {
        return TowerCopyCVO._cvos[cell];
    }
    /**满足所有开启条件 */
    public isAllCondSatisfy(showTips:boolean = false):boolean
    {
        let conds = this.conditions;
        let len = conds ? conds.length : 0;
        let vo:ConditionVO;
        for(let i = 0; i < len; i++)
        {
            vo = conds[i];
            if(!vo.isSatisfy(null, showTips)) return false;
        }
        return true;
    }
    /**是否为最高层 */
    public get isMax():boolean
    {
        return this.cell == TowerCopyCVO.MAX_CELL;
    }
}