/**
 * pzx
 * 17.12.27
 * 命格model
 */
class LifeGridModel extends egret.EventDispatcher
{
    /** 下次免费时间戳(秒) */
    private _freeCd:number=600;
    //猎命类型
    private _type:number;
    /** 升级命格界面是否打开 */
    public openLeveUpView:boolean= false;

    public constructor()
    {
        super();
        Manager.model.self.addEventListener(GameObjectAttrEvent.SOUL, this.onIconShowHandler, this,false,1);
    }
    /** 打开升级界面，所有升级的小红点要消失 直到命魂有更新*/
    private onIconShowHandler():void
    {
        if(LifeGridLeveUpView.isHied)
        {
            this.openLeveUpView = false;
        }
    }

    public returnqueryCd(cd:number)
    {
        this._freeCd = cd;
        this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT));
        if(!this.isFree())
        {
            Manager.render.add(this.countdown, this, 60000);
        }
    }
    private countdown():void
    {
        if(this.isFree())
        {
            Manager.render.remove(this.countdown,this);
            this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT));
        }
    }
    /**命格穿戴 @param 位置*/
    public returnWare(pos:number):void
    {
        this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LIFEGRID_WARE_EVENT,pos));
    }
    //命格升级  是否成功，1:true，0:false
    public returnLvUP(succe:number,pos:number):void
    {
        if(succe== 1)
        {
            this.openLeveUpView = false;
            this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LIFEGRID_LVUP_EVENT,pos));
        }
    }
    //命格分解
    public returnSeparate(arr:ItemsModelInfo[]):void
    {
        this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LIFEGRID_SEPARATE_EVENT,arr));
    }
    //猎命  type 猎命类型 1免费 2单次首具，3单次元宝，4，5 十次猎命
    public returnHunt(arr:ItemsModelInfo[],type):void
    {
        // this._type = type;
        // this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LIFEGRID_HUNT_EVENT,arr));
        Manager.view.show(ViewID.LifeGridHunResultWin,arr,type);
        if(type==1)
        {
            Manager.control.getLifeGrid().query();
        }
        else
        {
            this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT));
        }
    }
    public get type():number
    {
        return this._type;
    }


/**下次免费时间戳(秒) */
    public get freeCd():number
    {
        return this._freeCd;
    }
    /**当前有空格子时，入口按钮、页签、格子图标有叹号提示  true为有空格子*/
    public getIsAware():boolean
    {
        if(Manager.model.getItems().lifeGridBagList.length==0)
        {
            return false;
        }
        let ln:number = 9;
        let arr:ItemsModelInfo[] = Manager.model.getItems().lifeGridList;
        for(let i:number = 1;i<ln;i++)
        {
            let cvo:LifeGridHoleCvoInfo = LifeGridCVO.getholeCvo(i);
            let conticion:ConditionVO = new ConditionVO(cvo.cond);
            if(conticion.isSatisfy())
            {
                if(!arr[i])
                {
                    return true;
                }
            }
        }
        return false;
    }
    /** 当获得更高品质的同种类型命格时(一毛一样的属性组)，入口按钮、页签、当前装备的命格有【可替换】标识，对应的高品质命格有【推荐】标识 */
    public getIsSenior(data:ItemsModelInfo[]=null):boolean
    {
        let baglist:ItemsModelInfo[]=Manager.model.getItems().lifeGridBagList;
        if(baglist.length== 0)
        {
            return false;
        }
        let arr:ItemsModelInfo[]
        if(data)
        {
            arr = data;
        }
        else
        {
            arr = Manager.model.getItems().lifeGridList;
        }
        let ln:number = arr.length;
        for(let i:number = 0;i<ln;i++)
        {
            let baginfo:ItemsModelInfo[]=[];
            if(arr[i])
            {
                let lifeCvo:LifeGridCVO = LifeGridCVO.getDataInfo(arr[i]);
                let awerattArr:AttrVoInfo[] = lifeCvo.attrVos();//穿上的
                for(let info of baglist)
                {
                    //背包内的
                    let baglifeCvo:LifeGridCVO = LifeGridCVO.getDataInfo(info);
                    let bagattArr:AttrVoInfo[] = baglifeCvo.attrVos();
                    let n:number = this.getqeual(awerattArr,bagattArr);
                    if(n== 0)
                    {
                        continue;
                    }
                    else 
                    {
                        let aln:number = awerattArr.length;
                        let bln:number = bagattArr.length;
                        if(aln == bln && aln == n)
                        {
                            //(一毛一样的属性组)
                            baginfo.push(info);
                        }
                    }
                }

                for(let info of baginfo)
                {
                    let cvo:ItemsCVO = arr[i].cvo;
                    if(info.cvo.quality>cvo.quality)
                    {
                        return true;
                    }
                }

            }
        }
        return false;
    }
    /** 返回i个相同，0表示无相同 */
    public getqeual(value1:AttrVoInfo[],value2:AttrVoInfo[]):number
    {
        let i:number = 0;
        for(let j:number=0;j<value2.length;j++)
        {
            if(value1[0])
            {
                if(value1[0].id == value2[j].id)
                {
                    i++
                }
            }
            if(value1[1])
            {
                if(value1[0].id == value2[j].id)
                {
                    i++
                }
            }
        }
        return i;
    }
/**当有免费猎命次数时，入口按钮、页签、免费猎命按钮有叹号提示 */
    public isFree():boolean
    {
        if(!OpenCVO.isOpen(OpenConst.ID_LIEFGRID)) return false;
        let second:number = Math.round(this._freeCd - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if(second <= 0)
        {
            return true;
        }
        return false;
    }
    /** 是否有足够的命魂升级     另外打开命格升级界面，所有关于升级的小红点消失，直到命魂有更新*/
    public isUpgrade():boolean
    {
        if(this.openLeveUpView) return false;
        let arr:ItemsModelInfo[] = Manager.model.getItems().lifeGridList;
        for(let info of arr)
        {
            if(info)
            {
                let cvo:LifeGridCVO = LifeGridCVO.getDataInfo(info);
                if(cvo.lev_loss!="")
                {
                    let loss:GainLossVO = new GainLossVO(cvo.lev_loss);
                    if(loss.isEnough())
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    /** 是否有可分解的晶石 */
    public checkSeparate():boolean
    {
        let arr:ItemsModelInfo[] = Manager.model.getItems().lifeGridBagList;
        for(let info of arr)
        {
            if(info.cvo.type == ItemsType.TYPE_LIFEGRID_SPAR)
            {
                return true;
            }
        }
        return false;
    }
/** 命格总战力 */
    public getAllFight():number
    {
        let arr:Array<ItemsModelInfo> =  Manager.model.getItems().lifeGridList;
        let ln:number = arr.length;
        let figt:number=0;
        for(let i:number = 1;i<ln;i++)
        {
            if(arr[i])
            {
                let exinfo:ExattrItemsinfo = arr[i].infoList[0];
                let cvo:LifeGridCVO = LifeGridCVO.getInfo(arr[i].base_id,exinfo.value);
                figt += cvo.fightnum;
            }
        }
        return figt;
    }
    

}