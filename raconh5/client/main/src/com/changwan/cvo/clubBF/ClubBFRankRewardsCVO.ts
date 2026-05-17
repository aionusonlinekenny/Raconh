/**
 * 盟会战排名奖励
 * luzh
 * create 2018.1.30
 */
 class ClubBFRankRewardsCVO
{
    public id:number;
    public rewards:Array<GainLossVO>;
    public desc:string;


    private static _cvos:Array<ClubBFRankRewardsCVO>;

    /*解析表*/
    public static parse(bytes:egret.ByteArray):void
    {
        this._cvos = [];
        let cvo:ClubBFRankRewardsCVO;
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            cvo = new ClubBFRankRewardsCVO();
            cvo.id = bytes.readByte();
            cvo.rewards = GainLossVO.parse(bytes.readUTF());
            cvo.desc = bytes.readUTF()
            this._cvos.push(cvo);
        }
    }

    public static getCVOs():Array<ClubBFRankRewardsCVO>
    {
        return this._cvos;
    }
}
