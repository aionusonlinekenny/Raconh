class RankModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
    }

    /*已膜拜的类型*/
    private _worshipTypes:Array<number> = [];
    /*更新所有已膜拜类型*/
    public set worshipTypes(value:Array<number>)
    {
        this._worshipTypes = value;
        this.dispatchEvent(new RankEvent(RankEvent.UPDATE_WORSHIP_LIST));
    }
    /*添加已膜拜类型*/
    public addWorshipType(type:number)
    {
        this._worshipTypes.push(type);
        this.dispatchEvent(new RankEvent(RankEvent.UPDATE_WORSHIP_LIST));
    }
    /*是否已膜拜*/
    public hasWorship(type:number):boolean
    {
        return this._worshipTypes.indexOf(type) != -1;
    }

    public checkCanWorship():boolean
    {
        // for(let i:number=0; i<7; i++)
        // {
        //     if(this._worshipTypes.indexOf(i) == -1)
        //         return true;
        // }
        // return false;
        return this._worshipTypes.indexOf(RankConst.TYPE_POWER) == -1;//其它榜的膜拜已取消，只留战力榜，故只判断战力榜就行
    }
}