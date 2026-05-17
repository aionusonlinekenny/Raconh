/**
 * 宠物model
 * liangyan
 * create 2017-12-16
*/
class PetModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
        this._pinjie = 0;
        this._star = 0;
        this._starExp = 0;
        this._zzdUsed = 0;
        this._wxdUsed = 0;
        this._huanhuaID = 0;
        this._itemStyles = [];
        this.initSkills();
        this.analysisGoods();
    }

    private _pinjie:number;
    /**品阶 */
    public get pinjie():number {return this._pinjie;}
    public set pinjie(value:number)
    {
        if(this._pinjie == value) return;
        this._pinjie = value;
    }

    private _star:number;
    /**星数 */
    public get star():number {return this._star;}
    public set star(value:number)
    {
        if(this._star == value) return;
        this._star = value;
    }
    
    private _starExp:number;
    /**升星进度 */
    public get starExp():number {return this._starExp;}
    public set starExp(value:number)
    {
        if(this._starExp == value) return;
        this._starExp = value;
    }

    private _zzdUsed:number;
    /**资质丹使用数量 */
    public get zzdUsed():number {return this._zzdUsed;}
    public set zzdUsed(value:number)
    {
        if(this._zzdUsed == value) return;
        this._zzdUsed = value;
    }

    private _wxdUsed:number;
    /**悟性丹使用数量 */
    public get wxdUsed():number {return this._wxdUsed;}
    public set wxdUsed(value:number)
    {
        if(this._wxdUsed == value) return;
        this._wxdUsed = value;
    }

    private _huanhuaID:number;
    /**幻化id */
    public get huanhuaID():number {return this._huanhuaID;}
    public set huanhuaID(value:number)
    {
        if(this._huanhuaID == value) return;
        this._huanhuaID = value;
    }

    /** 通过物品获得的外形列表 */
    private _itemStyles:number[];
    public addItemStyle(resId:number):void
    {
        if(this.hasItemStyle(resId)) return;
        this._itemStyles.push(resId);
        this.dispatchEvent(new PetEvent(PetEvent.ITEM_STYLE_LIST, resId));
    }
    public hasItemStyle(resId:number):boolean
    {
        return (this._itemStyles.indexOf(resId) != -1);
    }

    /** 宠物技能 */
    private _skillsDic:Object;
    public setPetSkillLevel(groupId:number, level:number):void
    {
        this._skillsDic[groupId] = level;
        this.dispatchEvent(new PetEvent(PetEvent.UPGRADE_SKILL, groupId));
    }
    public getPetSkillLevel(groupId:number):number
    {
        return this._skillsDic[groupId] ? this._skillsDic[groupId] : 0;
    }
    private initSkills():void
    {
        this._skillsDic = {};
        let skillCvos:SkillCVO[] = SkillCVO.getPetPanelSkills();
        for(let i:number = 0; i < skillCvos.length; i++)
        {
            this.setPetSkillLevel(skillCvos[i].groupID, 0);
        }
    }
    public checkOneSkillCanUp(groupId:number):boolean
    {
        let level:number = this._skillsDic[groupId];
        if(level <= 0 || level >= SkillCVO.getCVO(groupId).maxLevel) return false;
        let cvo:PetSkillLevelCVO = PetSkillLevelCVO.getCVO(groupId, level + 1);
        return cvo.loss.isEnough();
    }

    private _attrZZD:AttrVoInfo[];
    private _attrWXD:AttrVoInfo[];
    private _curData:any;
    private analysisGoods():void
    {
        this._attrZZD = [];
        this._attrWXD = [];
        //资质丹
        let cvo = ItemsCVO.getCvo(ItemsConst.PET_ZZD);
        if(cvo && cvo.attr != "")
        {
            let attr:AttrVO = Manager.pool.create(AttrVO, cvo.attr);
            if(attr) this._attrZZD = attr.attrInfos;
        }
        //悟性丹
        cvo = ItemsCVO.getCvo(ItemsConst.PET_WXD);
        if(cvo && cvo.attr != "")
        {
            let attr:AttrVO = Manager.pool.create(AttrVO, cvo.attr);
            if(attr) this._attrWXD = attr.attrInfos;
        }
    }

    /**宠物属性 = 进阶属性 +（进阶属性 * 悟性丹）+ 资质丹 + 道具外形属性 */
    public allAttrVO:AttrVO;
    public delayParseAllAttrVO():void
    {
        Manager.render.add(this.reParseAllAttrVO, this);
    }
    public reParseAllAttrVO():void
    {
        Manager.render.remove(this.reParseAllAttrVO, this);
        if(this._pinjie < 1) 
        {
            if(this.allAttrVO) Manager.pool.push(this.allAttrVO);
            this.allAttrVO = Manager.pool.create(AttrVO, "11|0");
            return;
        }

        let attrStr:string = PetCVO.getCVO(this._pinjie, this._star).attrStr;
        let attrArr:Array<string> = attrStr.split("|");
        let result:string = "";
        for(let i = 0; i < attrArr.length; i++)
        {
            let arr = attrArr[i].split(",");
            if(arr.length > 1)
            {
                //悟性丹按比增加属性
                for(let k = 0; k < this._attrWXD.length; k++)
                {
                    if(Number(arr[0]) == this._attrWXD[k].id)
                    {
                        arr[1] = Math.round(Number(arr[1]) * (this._attrWXD[k].num * this._wxdUsed / 1000 + 1)) + "";
                        break;
                    }
                }
                //资质丹直接增加属性
                for(let j = 0; j < this._attrZZD.length; j++)
                {
                    if(Number(arr[0]) == this._attrZZD[j].id)
                    {
                        arr[1] = Number(arr[1]) + this._attrZZD[j].num * this._zzdUsed + "";
                        break;
                    }
                }
                //道具外形直接增加属性
                for(let m:number = 0; m < this._itemStyles.length; m++)
                {
                    let avis:AttrVoInfo[] = PetStyleCVO.getCVOByResId(this._itemStyles[m]).attrVO.attrInfos;
                    for(let n:number = 0; n < avis.length; n++)
                    {
                        if(Number(arr[0]) == avis[n].id)
                        {
                            arr[1] = Number(arr[1]) + avis[n].num + "";
                            break;
                        }
                    }
                }
            }
            if(i == attrArr.length - 1) result += arr[0] + "," + arr[1];
            else result += arr[0] + "," + arr[1] + "|";
        }
        if(this.allAttrVO) Manager.pool.push(this.allAttrVO);
        this.allAttrVO = Manager.pool.create(AttrVO, result);
        this.dispatchEvent(new PetEvent(PetEvent.UPDATE_ALL_ATTR));
    }
    public getAttrStr(attrStr:string):string
    {
        if(this._curData && this._curData.zzdNum == this._zzdUsed && this._curData.wxdNum == this._wxdUsed && this._curData.baseStr == attrStr)
        {
            return this._curData.resultStr;
        }
        let attrArr:Array<string> = attrStr.split("|");
        let result:string = "";
        for(let i = 0; i < attrArr.length; i++)
        {
            let arr = attrArr[i].split(",");
            if(arr.length > 1)
            {
                //悟性丹按比增加属性
                for(let k = 0; k < this._attrWXD.length; k++)
                {
                    if(Number(arr[0]) == this._attrWXD[k].id)
                    {
                        arr[1] = Math.round(Number(arr[1]) * (this._attrWXD[k].num * this._wxdUsed / 1000 + 1)) + "";
                        break;
                    }
                }
                //资质丹直接增加属性
                for(let j = 0; j < this._attrZZD.length; j++)
                {
                    if(Number(arr[0]) == this._attrZZD[j].id)
                    {
                        arr[1] = Number(arr[1]) + this._attrZZD[j].num * this._zzdUsed + "";
                        break;
                    }
                }
            }
            if(i == attrArr.length - 1) result += arr[0] + "," + arr[1];
            else result += arr[0] + "," + arr[1] + "|";
        }
        this._curData = {zzdNum:this._zzdUsed, wxdNum:this._wxdUsed, baseStr:attrStr, resultStr:result};
        return result;
    }

    /**检测宠物进阶 */
    public checkCanUpgrade():boolean
    {
        if(this._pinjie >= PetCVO.MAX_PINJIE) return false;
        let cvo = PetCVO.getCVO(this._pinjie, this._star);
        if(!cvo) return false;
        return cvo.loss.isEnough();
    }
    /**检测宠物喂养 */
    public checkCanFeed():boolean
    {
        let cvo = PetCVO.getCVO(this._pinjie, this._star);
        if(!cvo) return false;
        //资质丹
        let bagCount = Manager.model.getItems().getCountItemById(ItemsConst.PET_ZZD);
        if(bagCount > 0) return this._zzdUsed < cvo.zzdMax;
        //悟性丹
        bagCount = Manager.model.getItems().getCountItemById(ItemsConst.PET_WXD);
        if(bagCount > 0) return this._wxdUsed < cvo.wxdMax;
        return false;
    }
    /**检测宠物技能 */
    public checkSkillCanUp():boolean
    {
        for(let groupID in this._skillsDic)
        {
            if(this.checkOneSkillCanUp(parseInt(groupID))) return true;
        }
        return false;
    }
    /**检测可操作（进阶、喂养，激活、升级技能） */
    public get checkCanOperate():boolean
    {
        if(!OpenCVO.isOpen(OpenConst.ID_PET)) return false;
        return this.checkCanUpgrade() || this.checkCanFeed() || this.checkSkillCanUp();
    }
}