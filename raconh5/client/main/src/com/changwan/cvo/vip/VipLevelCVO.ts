/**
 * vip等级表
 * liangyan
 * create 2017-12-25
*/
class VipLevelCVO
{
    private static _cvos:Object;
    /**最高vip等级 */
    public static MAX_LEVEL:number;

    /**等级 */
    public level:number;
    /**下一等级额度 */
    public nextLimit:number;
    private _rewardStr:string;
    private _rewardsArr:Array<GainLossVO>;
    /**物品奖励 */
    public get rewards():Array<GainLossVO>
    {
        if(!this._rewardsArr)
        {
            this._rewardsArr = [];
            let arr = this._rewardStr.split("|");
            let gain:GainLossVO;
            for(let i = 0; i < arr.length; i++)
            {
                gain = new GainLossVO(arr[i]);
                this._rewardsArr.push(gain);
            }
        }
        return this._rewardsArr;
    }
    /**物品奖励 */
    public award:string;
    /**物品框发光特效 */
    public showEff:boolean;
    /**特权文本 */
    public rightsDesc:string;
    /**NEW标签项 */
    public newItem:string;
    /**界面图片id */
    public picID:number;
    /**主奖励模型id */
    public showID:number;

    private parseOne(data:egret.ByteArray):void
    {
        this.level = data.readByte();
        this.nextLimit = data.readInt();
        this._rewardStr = data.readUTF();
        this.award = data.readUTF();
        this.showEff = data.readByte() == 1;
        this.rightsDesc = data.readUTF();
        this.newItem = data.readUTF();
        this.picID = data.readShort();
        this.showID = data.readShort();
    }

    public static parse(bytes:egret.ByteArray):void
    {
        VipLevelCVO._cvos = {};
        VipRightsCVO.cvos = {};
        var tableCount:number = bytes.readByte();
        var baseCount:number = bytes.readShort();
        VipLevelCVO.MAX_LEVEL = baseCount - 1;
        let cvo:VipLevelCVO;
        for (var i = 0; i < baseCount; i++)
        {
            cvo = new VipLevelCVO();
            cvo.parseOne(bytes);
            VipLevelCVO._cvos[cvo.level] = cvo;
        }
        var rightsCount = bytes.readShort();
        let rights:VipRightsCVO;
        for(var j = 0; j < rightsCount; j++)
        {
            rights = new VipRightsCVO();
            rights.parse(bytes);
            if(rights.level == 4 || rights.level == 6 || rights.level > 7)
            {
                let a = 0;
            }
            VipRightsCVO.cvos[rights.level] = rights;
        }
    }

    public static getCVO(level:number):VipLevelCVO
    {
        return VipLevelCVO._cvos[level];
    }

    public get isMax():boolean
    {
        return this.level == VipLevelCVO.MAX_LEVEL;
    }
}