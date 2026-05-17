/**
 * 宗门表
 * Simon
 * create 2017-12-16
 */
 class ClubDataCVO
{
    /**宗门信息 */
    private static _clubCvos:Object;
    /**宗门捐献信息 */
    private static _clubDonateCvos:Array<ClubDataCVO>;
    /**宗门职位信息 */
    private static _clubCareerCvos:Array<ClubDataCVO>;
    /**宗门奖励信息 */
    private static _clubGainCvos:Array<ClubDataCVO>;
    /**盟主战信息 */
    private static _clubLeaderWarCvos:Array<ClubDataCVO>;
    /**盟主战称号信息 */
    private static _clubLeaderWarTitle:{};

    /*宗门id*/
    public clubId:number;
    /*宗门名称*/
    public clubName:string;

    /**捐献类型 */
    public donateId:number;
    /**每日捐献次数上限 */
    public count:number;
    /**捐献消耗类型 */
    public lostType:string;
    /**捐献消耗值 */
    public lostValue:number;
    /**捐献收益类型 */
    public gainType:string;
    /**捐献收益值 */
    public gainValue:number;

    /**职位类型 */
    public careerId:number;
    /**职位名 */
    public careerName:string;
    /**每日俸禄 */
    public salaryList:Array<any>;
    /**当前职位条件 */
    public condList:Array<any>;
    /**属性加成 */
    public attrList:Array<Array<number>>;

    /**奖励ID */
    public gainId:number;
    /**奖励列表 */
    public gainList:Array<any>;

    /**盟主战配置编号 */
    public clubLeaderWarInfoId:number;
    /**盟主战配置内容 */
    public clubLeaderWarInfoValue:string;


    /*解析表*/
    public static parse(bytes:egret.ByteArray):void
    {
        ClubDataCVO._clubCvos = [];
        ClubDataCVO._clubDonateCvos = [];
        ClubDataCVO._clubCareerCvos = [];
        ClubDataCVO._clubGainCvos = [];
        ClubDataCVO._clubLeaderWarCvos = [];
        ClubDataCVO._clubLeaderWarTitle = {};
        let tableCount:number = bytes.readByte();
        for(let i:number = 0 ; i < tableCount; i ++)
        {
            if(i == 0)
            {
                let cvoCount = bytes.readShort();
                for(let j:number = 0 ; j < cvoCount; j ++)
                {
                    ClubDataCVO._clubCvos[bytes.readInt()] = bytes.readUTF();
                }
            }
            else if(i == 1)
            {
                let cvoCount = bytes.readShort();
                for(let j:number = 0 ; j < cvoCount; j ++)
                {
                    let cvo:ClubDataCVO = new ClubDataCVO();
                    cvo.donateId = bytes.readInt()
                    cvo.count = bytes.readInt();
                    let lostInfo:GainLossVO = new GainLossVO(bytes.readUTF());
                    if(lostInfo)
                    {
                        cvo.lostType = lostInfo.type;
                        cvo.lostValue = lostInfo.num;
                    }
                    let gainInfo:GainLossVO = new GainLossVO(bytes.readUTF());
                    if(gainInfo)
                    {
                        cvo.gainType = gainInfo.type;
                        cvo.gainValue = gainInfo.num;
                    }
                    ClubDataCVO._clubDonateCvos.push(cvo);
                }
            }
            else if(i == 2)
            {
                let cvoCount = bytes.readShort();
                for(let j:number = 0 ; j < cvoCount; j ++)
                {
                    let cvo:ClubDataCVO = new ClubDataCVO();
                    cvo.careerId = bytes.readInt()
                    cvo.careerName = bytes.readUTF();
                    cvo.salaryList = [];
                    let arr:Array<string> = bytes.readUTF().split("|");
                    for(let k:number=0; k<arr.length; k++)
                    {
                        let salaryInfo:GainLossVO = new GainLossVO(arr[k]);
                        if(salaryInfo)
                        {
                            if(salaryInfo.type == GainLossVO.ITEM)
                                cvo.salaryList.push({type:salaryInfo.type, baseId:salaryInfo.baseId, isBind:salaryInfo.bind, num:salaryInfo.num});
                            else
                                cvo.salaryList.push({type:salaryInfo.type, num:salaryInfo.num});
                        }
                    }

                    cvo.condList = [];
                    let arr2:Array<string> = bytes.readUTF().split("|");
                    for(let k:number=0; k<arr2.length; k++)
                    {
                        let condInfo:GainLossVO = new GainLossVO(arr2[k]);
                        if(condInfo)
                        {
                        if(condInfo.type == GainLossVO.GUILD_DONATE || condInfo.type == GainLossVO.EQM_LEV || condInfo.type == GainLossVO.DIMLY_STAR
                                || condInfo.type == GainLossVO.STONE_LEV || condInfo.type == GainLossVO.EQM_SOUL_LEV || condInfo.type == GainLossVO.MERIDIAN_LEV)
                                cvo.condList.push({type:condInfo.type, num:condInfo.num});
                            else if(condInfo.type == GainLossVO.DUN_PASS)
                                cvo.condList.push({type:condInfo.type, copyId:condInfo.copyId, num:condInfo.num});
                            else if(condInfo.type == GainLossVO.PET_LEV)
                                cvo.condList.push({type:condInfo.type, petPhase:condInfo.pet_phase, petLevel:condInfo.pet_level});
                        }
                    }

                    let attr:string = bytes.readUTF();
                    cvo.attrList = [];
                    if(attr.length != 0)
                    {
                        let arr1 = attr.split("|");
                        for(let k=0; k<arr1.length; k++)
                        {
                            arr2 = arr1[k].split(",");
                            let list = [];
                            list.push(Number(arr2[0]));
                            list.push(Number(arr2[1]));
                            cvo.attrList.push(list);
                        }
                    }

                    ClubDataCVO._clubCareerCvos.push(cvo);
                }
            }
            else if(i == 3)
            {
                let cvoCount = bytes.readShort();
                for(let j:number = 0 ; j < cvoCount; j ++)
                {
                    let cvo:ClubDataCVO = new ClubDataCVO();
                    cvo.gainId = bytes.readInt()
                    cvo.gainList = [];
                    let arr:Array<string> = bytes.readUTF().split("|");
                    for(let k:number=0; k<arr.length; k++)
                    {
                        let gainInfo:GainLossVO = new GainLossVO(arr[k]);
                        if(gainInfo)
                        {
                            if(gainInfo.type == GainLossVO.ITEM)
                                cvo.gainList.push({baseId:gainInfo.baseId, bind:gainInfo.bind, num:gainInfo.num});
                        }
                    }
                    ClubDataCVO._clubGainCvos.push(cvo);
                }
            }
            else if(i == 4)
            {
                let cvoCount = bytes.readShort();
                for(let j:number=0; j<cvoCount; j++)
                {
                    let cvo:ClubDataCVO = new ClubDataCVO();
                    cvo.clubLeaderWarInfoId = bytes.readByte();
                    let titleStr:string = bytes.readUTF();
                    cvo.clubLeaderWarInfoValue = bytes.readUTF();
                    if(cvo.clubLeaderWarInfoId >= 12 && cvo.clubLeaderWarInfoId <= 20)
                    {
                        let gainLossInfo:GainLossVO = new GainLossVO(titleStr);
                        if(gainLossInfo)
                            ClubDataCVO._clubLeaderWarTitle[gainLossInfo.clubId + "_" + gainLossInfo.clubLeaderWarRank] = Number(cvo.clubLeaderWarInfoValue);
                            // console.log(gainLossInfo.clubId);
                            // console.log(gainLossInfo.clubLeaderWarRank);
                            // console.log(ClubDataCVO._clubLeaderWarTitle[gainLossInfo.clubId + "_" + gainLossInfo.clubLeaderWarRank]);
                    }
                    ClubDataCVO._clubLeaderWarCvos.push(cvo);
                }
            }
        }
    }

    public static getClubName(id:number):string
    {
        return ClubDataCVO._clubCvos[id] ? ClubDataCVO._clubCvos[id] : "";
    }

    public static getClubDonateById(id:number):ClubDataCVO
    {
        if(ClubDataCVO._clubDonateCvos)
        {
            for(let i:number=0; i<ClubDataCVO._clubDonateCvos.length; i++)
            {
                if(ClubDataCVO._clubDonateCvos[i].donateId == id)
                    return ClubDataCVO._clubDonateCvos[i];
            }
        }
        return null;
    }

    public static getClubCareerById(id:number):ClubDataCVO
    {
        if(ClubDataCVO._clubCareerCvos)
        {
            for(let i:number=0; i<ClubDataCVO._clubCareerCvos.length; i++)
            {
                if(ClubDataCVO._clubCareerCvos[i].careerId == id)
                    return ClubDataCVO._clubCareerCvos[i];
            }
        }
        return;
    }

    public static getClubGainById(id:number):ClubDataCVO
    {
        if(ClubDataCVO._clubGainCvos)
        {
            for(let i:number=0; i<ClubDataCVO._clubGainCvos.length; i++)
            {
                if(ClubDataCVO._clubGainCvos[i].gainId == id)
                    return ClubDataCVO._clubGainCvos[i];
            }
        }
        return;
    }

    public static getClubLeaderWarInfo(id:number):ClubDataCVO
    {
        if(ClubDataCVO._clubLeaderWarCvos)
        {
            for(let i:number=0; i<ClubDataCVO._clubLeaderWarCvos.length; i++)
            {
                if(ClubDataCVO._clubLeaderWarCvos[i].clubLeaderWarInfoId == id)
                    return ClubDataCVO._clubLeaderWarCvos[i];
            }
        }
        return;
    }

    public static getClubLeaderWarTitle(clubId:number, rank:number):number
    {
        if(ClubDataCVO._clubLeaderWarTitle[clubId + "_" + rank])
            return ClubDataCVO._clubLeaderWarTitle[clubId + "_" + rank];
        return 0;
    }
}
