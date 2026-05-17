class ClubInfo
{
    public clubType:number;
    public clubName:string;
    public desc:string;
    public masterId:number;
    public masterName:string;
    public masterSex:number;
    public masterVip:number;
    public masterClubCareer:number;
    public masterFashion:number;
    public masterCloak:number;
    public masterWeapon:number;
    public memberType:number;
    public clubCareer:number;
    public donate:number;
    public hisDonate:number;
    public donateList:Array<ClubDonateInfo>;
    public isGetReward:number;
}

class ClubDonateInfo
{
    public donateType:number;
    public count:number;
}