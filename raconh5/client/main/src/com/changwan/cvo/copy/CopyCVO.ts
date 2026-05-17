/**
 * 副本表
 * luzhihong
 * create 2017-12-2
 */
 class CopyCVO
{
    private static _cvos:Object;

    /*id*/
    public id:number;
    /*名字*/
    public name:string;
    /*类型*/
    public type:number;
    /*条件*/
    public conditions:Array<ConditionVO>;
    /*进入消耗*/
    public loss:Array<GainLossVO>;
    /*展示BOSSid*/
    public bossID:number;
    /*奖励描述*/
    public awardDesc:string;
    /*展示奖励*/
    public show:Array<GainLossVO>;
    /*扫荡条件*/
    public saodangCond:ConditionVO;

    private static _step:number = 0;
    private static _bytes:egret.ByteArray;

    /*解析表*/
    public static parseCVOs(bytes:egret.ByteArray):void
    {
        this._bytes = new egret.ByteArray();
        this._bytes.writeBytes(bytes);
        this._bytes.position = 0;
        let tabCount:number = this._bytes.readByte();
        // let tabCount:number = bytes.readByte();
        Manager.render.add(this.render,this);
        // CopyCVO.parse(bytes);
        // MainCopyCVO.parse(bytes);
        // TowerCopyCVO.parse(bytes);
        // CopySilverHardCVO.parse(bytes);
        // MaterialCopyCVO.parse(bytes);
    }

    private static render(interval:number):void
    {
        if(this._step == 0)
        {
            CopyCVO.parse(this._bytes);
            this._step = 1;
        }
        else if(this._step == 1)
        {
            MainCopyCVO.parse(this._bytes);
            this._step = 2;
        }
        else if(this._step == 2)
        {
            TowerCopyCVO.parse(this._bytes);
            this._step = 3;
        }
        else if(this._step == 3)
        {
            CopySilverHardCVO.parse(this._bytes);
            this._step = 4;
        }
        else if(this._step == 4)
        {
            MaterialCopyCVO.parse(this._bytes);
            this._step = 5;
        }
        else if(this._step == 5)
        {
            JuyuanCopyCVO.parse(this._bytes);
            Manager.render.remove(this.render,this);
            this._bytes.clear();
            this._bytes = null;
            Manager.cvo.complete();
        }
    }
    
    /*解析表*/
    public static parse(bytes:egret.ByteArray):void
    {
        CopyCVO._cvos = [];
        let cvo:CopyCVO;
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            cvo = new CopyCVO();
            cvo.id = bytes.readShort();
            cvo.name = bytes.readUTF();
            cvo.type = bytes.readByte();
            cvo.conditions = ConditionVO.getVOList(bytes.readUTF());
            cvo.loss = GainLossVO.parse(bytes.readUTF());
            cvo.bossID = bytes.readInt();
            cvo.awardDesc = bytes.readUTF();
            cvo.show = GainLossVO.parse(bytes.readUTF());
            cvo.saodangCond = new ConditionVO(bytes.readUTF());

            CopyCVO._cvos[cvo.id] = cvo;
        }
    }

    
    public static getCVO(id:number):CopyCVO
    {
        return CopyCVO._cvos[id];
    }
    
    public static getCVOsByType(type:number):Array<CopyCVO>
    {
        let result:Array<CopyCVO> = [];
  		for(let key in this._cvos)
		{
            if(this._cvos[key].type == type) result.push(this._cvos[key]);
		}
        return result;
    }


    //动态数据-------------------------------------------------------------
    public update(curCell:number, curNum:number):void
    {
        this.cell = curCell;
        this.enterNum = curNum;
        this.hasPass = true;//只要发过来，就是已通关过
        Manager.model.getCopy().dispatchEvent(new CopyEvent(CopyEvent.UPDATE_SINGLE, this));
    }
    /*是否通关过*/
    public hasPass:boolean = false;
    /*进入层数*/
    public cell:number = 0;
    /*已进入次数*/
    public enterNum:number = 0;
    /*结束时间*/
    public endTime:number = 0;
    /*剩余时间*/
    public get leftTime():number
    {
        let left:number = Math.floor(this.endTime - Manager.model.getLogin().serverTimeInfo.serverTime/1000);
        return left > 0 ? left : 0;
    }

    private _bossCVO:MonsterCVO
    public get boss():MonsterCVO
    {
        if(!this._bossCVO) this._bossCVO = MonsterCVO.getCVO(this.bossID);
        return this._bossCVO;
    }

    /**满足所有进入消耗 */
    public isLossEnough(showTips:boolean = false, showItemTips:boolean = false):boolean
    {
        for(let i = this.loss.length-1; i >= 0; i--)
        {
            if(!this.loss[i].isEnough(showTips, showItemTips)) return false;
        }
        return true;
    }
    /**满足所有开启条件 */
    public isAllCondSatisfy(showTips:boolean = false):boolean
    {
        for(let i = this.conditions.length-1; i >= 0; i--)
        {
            if(!this.conditions[i].isSatisfy(null, showTips)) return false;
        }
        return true;
    }
    /**是否满足指定开启条件 */
    public isCondSatisfy(types:string[], showTips:boolean = false):boolean
    {
        for(let i = this.conditions.length-1; i >= 0; i--)
        {
            if(types.indexOf(this.conditions[i].type) != -1 && !this.conditions[i].isSatisfy(null, showTips))//
            {
                return false;//
            }
        }
        return true;
    }
    public getCondByType(type:string):ConditionVO
    {
        for(let i = this.conditions.length-1; i >= 0; i--)
        {
            if(this.conditions[i].type == type)//
            {
                return this.conditions[i];//
            }
        }
        return null;
    }
    /**副本进入总次数 */
    public get enterTotal():number
    {
        let condVo:ConditionVO = this.getCondByType(ConditionVO.COPY_LIMIT);//是否为副本次数限制
        return condVo != null ? condVo.value2 : 0;//
    }
    /**副本进入剩余次数 */
    public get leftNum():number
    {
        let value:number = this.enterTotal - this.enterNum
        return value > 0 ? value : 0;
    }
}