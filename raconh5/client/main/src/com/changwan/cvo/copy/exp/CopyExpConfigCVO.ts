/**
 * 经验副本配置表
 * luzhihong
 * create 2018.1.10
 */
 class CopyExpConfigCVO
{
    /*银币鼓舞消耗数*/
    public static up_coin_need:GainLossVO;
    /*金币鼓舞消耗数*/
    public static up_gold_need:GainLossVO;
    /*vip购买进入消耗*/
    public static add_cound_need:GainLossVO;

    /*vip购买银币副本次数进入消耗*/
    public static add_silver_cound_need:GainLossVO;
    /*银币副本每日免费次数*/
    public static silver_free_count:number;

    /*每日免费次数*/
    public static free_count:number;
    /*鼓舞经验加成千分比*/
    public static up_per_rate:number;
    /*鼓舞加成千分比上限*/
    public static up_gold_rate_max:number;
    /*铜钱鼓舞加成千分比上限*/
    public static up_coin_rate_max:number;

    /*难度描述*/
    public static hardDesc:Object;


    /*解析经验副本难度表*/
    public static parseDifficult(bytes:egret.ByteArray):void
    {
        this.hardDesc = new Object();
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            this.hardDesc[bytes.readByte()] = bytes.readUTF();
        }
    }
    
    /*解析消耗数据表*/
    public static parseCost(bytes:egret.ByteArray):void
    {
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            let id:number = bytes.readByte();
            let vo:GainLossVO = new GainLossVO(bytes.readUTF());

            if(id == 1) this.up_coin_need = vo;
            else if(id == 2) this.up_gold_need = vo;
            else if(id == 3) this.add_cound_need = vo;
            else if(id == 4) this.add_silver_cound_need = vo;
        }
    }
    
    /*解析其他数据表*/
    public static parseOthers(bytes:egret.ByteArray):void
    {
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            let id:number = bytes.readByte();
            let value:number = bytes.readInt();

            if(id == 1) this.free_count = value;
            else if(id == 2) this.up_per_rate = value;
            else if(id == 3) this.up_gold_rate_max = value;
            else if(id == 5) this.up_coin_rate_max = value;
            else if(id == 9) this.silver_free_count = value;
        }
    }

}