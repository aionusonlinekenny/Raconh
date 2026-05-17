/**
 * 转生模板表
 * liangyan
 * create 2017-12-14
*/
class ReinCVO
{
    private static _cvos:Object;
    /**转生等级 */
    public level:number;
    /**转生条件 */
    public condArr:ConditionVO[];
    /**转生消耗 */
    public loss:GainLossVO;
    // /**转生奖励 */
    // public rewards:GainLossVO[];
    private _attrStr:string;
    /**属性 */
    public attr:AttrVO;
    private _rewardsStr:string;
    private _rewards:GainLossVO[];
    /**展示奖励 */
    public get showRewards():GainLossVO[]
    {
        return this.parseShowRewards(this._rewardsStr); 
    }
    private _dressStr:string;
    /**展示时装 */
    public get dress():number
    {
        let arr = this._dressStr.split(",");
        if(arr.length <= 1) return -1;
        return Number(arr[Manager.model.self.attrInfo.career - 1]); 
    }

    /**最大转数 */
    public static maxLevel:number;

    public static parse(bytes:egret.ByteArray):void
    {
        ReinCVO._cvos = {};
        var tableCount:number = bytes.readByte();
        var baseCount:number = bytes.readShort();
        let cvo:ReinCVO;
        for (var i = 0; i < baseCount; i++)
        {
            cvo = new ReinCVO();
            cvo.parseOne(bytes);
            ReinCVO._cvos[cvo.level] = cvo;
        }
        this.maxLevel = baseCount - 1;
    }

    private parseOne(data:egret.ByteArray):void
    {
        this.level = data.readShort();
        this.parseCond(data.readUTF());
        this.loss = new GainLossVO(data.readUTF());
        this._attrStr = data.readUTF();
        this.attr = Manager.pool.create(AttrVO, this._attrStr);
        this._rewardsStr = data.readUTF();
        this._dressStr = data.readUTF();
    }

    private parseCond(str:string):void
    {
        this.condArr = [];
        let arr = str.split("|");
        let cond:ConditionVO;
        for(let i = 0; i < arr.length; i++)
        {
            cond = new ConditionVO(arr[i]);
            this.condArr.push(cond);
        }
    }

    private parseShowRewards(str:string):GainLossVO[]
    {
        if(this._rewards && this._rewards.length > 0) return this._rewards;
        this._rewards = [];
        let arr = str.split("|");
        let cond:GainLossVO;
        let self = Manager.model.self;
        for(let i = 0; i < arr.length; i++)
        {
            cond = new GainLossVO(arr[i]);
            let goods = ItemsCVO.getCvo(cond.baseId);
            let needRein = (goods.needLevel / 10 - 100);
            if(goods.needCarrer == 0 || goods.needLevel == 0) this._rewards.push(cond);
            else if(goods.needCarrer > 0 && goods.needCarrer == self.attrInfo.career) this._rewards.push(cond);
            else if(needRein > 0 && needRein <= self.attrInfo.zhuanshu) this._rewards.push(cond);
        }
        return this._rewards;
    }

    public static getCvo(level:number):ReinCVO
    {
        return ReinCVO._cvos[level];
    }

    public get isMax():boolean
    {
        return this.level >= ReinCVO.maxLevel;
    }
}