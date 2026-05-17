/**
 * vip视图
 * liangyan
 * create 2017-12-20
*/
class VipView extends UIComponent
{
    private _rightsBg:BitmapRemote;
    private _rewardsBg:BitmapRemote;
    private _list:BaseVScrollerList;
    private _curImg:eui.Image;
    private _nextImg:eui.Image;
    private _nextTxt:Label;
    private _rechargeBtn:Button;
    private _titleImg:eui.Image;
    private _preBtn:Button;
    private _nextBtn:Button;
    private _fetchBtn:Button;
    private _fetchedImg:eui.Image;
    private _redIcon:eui.Image;

    private _bg:BitmapRemote;
    private _curLvl:NumImgView2;
    private _nextLvl:NumImgView2;
    private _curLvl2:NumImgView2;
    private _strip2:StripView2;
    private _goods:Array<BaseGoods>;

    private _curCvo:VipLevelCVO;
    private _curPage:number;
    private _totalPage:number;
    private _isInit:boolean;

    private readonly STRIP:string = "strip";
    private readonly PAGE:string = "page";
    private readonly REWARDS:string = "rewards";

    private _setPage:boolean = false;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("vip", "VipViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
        if(!this._bg)
		{
			this._bg = Manager.pool.create(BitmapRemote);
			this._bg.x = 5;
			this._bg.y = 118;
			this._bg.load(PathInfo.getPath("res/common/common_back4.png", LoaderType.IMAGE), 710, 325);
			this.addChildAt(this._bg, 0);
		}

        this._rightsBg.load(Manager.path.getVipPath("vip_back"));

        if(!this._curLvl)
        {
            this._curLvl = Manager.pool.create(NumImgView2);
            this._curLvl.x = this._curImg.x + 130;
            this._curLvl.y = this._curImg.y + 5;
            this.addChild(this._curLvl);
        }
        if(!this._nextLvl)
        {
            this._nextLvl = Manager.pool.create(NumImgView2);
            this._nextLvl.x = this._nextImg.x + 130;
            this._nextLvl.y = this._nextImg.y + 5;
            this.addChild(this._nextLvl);
        }
        if(!this._curLvl2)
        {
            this._curLvl2 = Manager.pool.create(NumImgView2);
            this._curLvl2.x = this._titleImg.x + 55;
            this._curLvl2.y = this._titleImg.y + 2;
            this.addChild(this._curLvl2);
        }
        if(!this._strip2)
        {
            this._strip2 = StripView2.create(this,this,"strip_back2_png","strip_blue2_png",603,53,564,32,19,10,true,true);
            this._strip2.move(59,194);
        }

        this._fetchedImg.touchEnabled = false;
    }

    protected addEvent():void
    {
        super.addEvent();
        this._preBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._rechargeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._fetchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);

        Manager.model.self.addEventListener(GameObjectAttrEvent.VIP_LEVEL, this.onEventUpdateHander, this);
        Manager.model.getVip().addEventListener(VipEvent.EXP_UPDATE, this.onEventUpdateHander, this);
        Manager.model.getVip().addEventListener(VipEvent.REWARDS_UPDATE, this.onEventUpdateHander, this);
    }

    protected removeEvent():void
    {
        this._preBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._rechargeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._fetchBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);

        Manager.model.self.removeEventListener(GameObjectAttrEvent.VIP_LEVEL, this.onEventUpdateHander, this);
        Manager.model.getVip().removeEventListener(VipEvent.EXP_UPDATE, this.onEventUpdateHander, this);
        Manager.model.getVip().removeEventListener(VipEvent.REWARDS_UPDATE, this.onEventUpdateHander, this);
        super.removeEvent();
    }

    protected initData():void
    {
        super.initData();
        let vipLvl = Manager.model.self.attrInfo.vipLevel;
        if(!this._setPage)
        {
            this._curPage = vipLvl;
        }
        this._totalPage = VipLevelCVO.MAX_LEVEL;
        this._curLvl.setValue(this._curPage, "nums_vip_", 25);
        let next = this._curPage + 1;
        next = next > this._totalPage ? this._totalPage : next;
        this._nextLvl.setValue(next, "nums_vip_", 25);
        this.drawCost();
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawStrip();
        this._curPage = this.getCanFetchPage();
        this.drawPage();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(this.STRIP)) this.drawStrip();
        if(this.isInvalid(this.PAGE)) this.drawPage();
        if(this.isInvalid(this.REWARDS)) this.drawRewards();
    }
    /**进度条 */
    private drawStrip():void
    {
        if(!this._curCvo) return;
        let cvo:VipLevelCVO;
        if(!this._curCvo.isMax)
        {
            let cur = Manager.model.getVip().exp;
            // this._strip.update(cur, this._curCvo.nextLimit);
            this._strip2.update(cur,this._curCvo.nextLimit);
        }
        else
        {
            cvo = VipLevelCVO.getCVO(this._curCvo.level - 1);
            // this._strip.update(cvo.nextLimit, cvo.nextLimit);
            this._strip2.update(cvo.nextLimit,cvo.nextLimit);
        }
    }
    /**翻页 */
    private drawPage():void
    {
        this._preBtn.visible = this._curPage > 0;
        this._nextBtn.visible = this._curPage >= 0 && this._curPage < this._totalPage;
        this.drawRewards();
        this.drawRight();
        this._curLvl2.setValue(this._curPage, "nums_count_", 16);
        if(this._curPage <= this._curCvo.level) return;
        let next = this._curPage;
        next = next > this._totalPage ? this._totalPage : next;
        this._nextLvl.setValue(next, "nums_vip_", 25);

        this.drawCost();
    }
    /**充值数值 */
    private drawCost():void
    {
        if(!this._curCvo) return;
        let cvo = VipLevelCVO.getCVO(this._curPage > this._curCvo.level ?  this._curPage-1 : this._curCvo.level);
        if(!cvo) return;
        let cur = Manager.model.getVip().exp;
        let str:string;
        if(!this._curCvo.isMax)
        {
            if(cvo.isMax) cvo = VipLevelCVO.getCVO(this._curPage - 1);
            str = StringUtils.setParam(LangCVO.getContent("vip1"), cvo.nextLimit - cur, cvo.level + 1);//再充值{0}元宝成为VIP{1}
        }
        else str = LangCVO.getContent("vip2");//已达VIP最高级
        HtmlUtil.setTextFlow(this._nextTxt, str);
    }
    /**特权文本 */
    private drawRight():void
    {
        let cvo = VipLevelCVO.getCVO(this._curPage);
        if(!cvo) return;
        let vipDatas = [];
        let obj:any;
        if(cvo.newItem != "")
        {
            let arr = cvo.newItem.split("|");
            for(let i = 0; i < arr.length; i++)
            {
                obj = {str:arr[i], isNew:true};
                vipDatas.push(obj);
            }
        }
        if(cvo.rightsDesc != "")
        {
            let arr = cvo.rightsDesc.split("|");
            for(let j = 0; j < arr.length; j++)
            {
                obj = {str:arr[j], isNew:false};
                vipDatas.push(obj);
            }
        }
        if(this._isInit)
        {
            this._list.initBtnListData(VipRightItem, vipDatas, true);
		    (<eui.VerticalLayout>this._list.itemList.layout).gap = 0;
            this._isInit = false;
        }
        else this._list.dataProvider(vipDatas);
    }
    /**物品奖励 */
    private drawRewards():void
    {
        let cvo = VipRightsCVO.getCVO(this._curPage);
        if(!cvo) return;
        this._rewardsBg.load(Manager.path.getVipPath("vip_reward_back" + this._curPage, Extension.JPG));
        let status = Manager.model.getVip().getRewardsStatus(cvo.level);
        this._fetchBtn.visible = this._fetchedImg.visible = this._redIcon.visible = false;
        switch(status)
        {
            case VipRewardsStatus.NOT_REACH:
                break;
            case VipRewardsStatus.UN_FETCH:
                this._fetchBtn.visible = this._redIcon.visible = true;
                break;
            case VipRewardsStatus.HAS_FETCH:
                this._fetchedImg.visible = true;
                break;
        }

        let lvlCvo = VipLevelCVO.getCVO(this._curPage);
        if(!lvlCvo) return;
        this.clearGoods();
        let rewards = lvlCvo.rewards;
        let goodsLen = rewards.length;
        let child:BaseGoods;
        let offsetX = 295;
        let offsetY = 895;
        for(let i = 0; i < goodsLen; i++)
        {
            child = Manager.pool.create(BaseGoods);
            // child.clear();
            child.baseId = rewards[i].baseId;
            child.count = rewards[i].num;
            child.x = offsetX + (111 * i);
            child.y = offsetY;
            this._goods.push(child);
            this.addChild(child);
        }
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        switch(e.currentTarget)
        {
            case this._preBtn:
                this.prePage();
                break;
            case this._nextBtn:
                this.nextPage();
                break;
            case this._rechargeBtn:
                Manager.link.link(LinkType.PANEL_RECHARGE);
                break;
            case this._fetchBtn:
                Manager.control.getVip().getRewardsByLevel(this._curPage);
                break;
        }
    }

    private prePage():void
    {
        if(this._curPage <= 0) return;
        this._curPage--;
        this.invalidate(this.PAGE);
    }

    private nextPage():void
    {
        if(this._curPage >= this._totalPage) return;
        this._curPage++;
        this.invalidate(this.PAGE);
    }

    public setPage(value:number):void
    {
        this._curPage = value;
        this._setPage = true;
        this.invalidate(this.PAGE);
    }

    private onEventUpdateHander(e:BaseEvent):void
    {
        switch(e.type)
        {
            case GameObjectAttrEvent.VIP_LEVEL:
                this._curPage = Manager.model.self.attrInfo.vipLevel;
                this._curLvl.setValue(this._curPage, "nums_vip_", 25);
                this._curCvo = VipLevelCVO.getCVO(this._curPage);
                this.invalidate(this.PAGE);
                break;
            case VipEvent.EXP_UPDATE:
                this.invalidate(this.STRIP);
                break;
            case VipEvent.REWARDS_UPDATE:
                // this.invalidate(this.REWARDS);
                this._curPage = this.getCanFetchPage();
                this.invalidate(this.PAGE);
                break;
        }
    }

    private getCanFetchPage():number
    {
        let page = this._curPage;
        let status = -1;
        while(page >= 0)
        {
            status = Manager.model.getVip().getRewardsStatus(page);
            if(status == VipRewardsStatus.UN_FETCH) break;
            page--;
        }
        if(status == VipRewardsStatus.HAS_FETCH)
        page = this._curCvo.level == VipLevelCVO.MAX_LEVEL ? this._curCvo.level : this._curCvo.level + 1;
        return page;
    }

    private clear(isRemove:boolean = false):void
    {
        if(isRemove)
        {
            ObjectUtil.removes(this._rightsBg, this._rewardsBg, this._list, this._curImg, this._nextImg, 
            this._nextTxt, this._rechargeBtn, this._titleImg, this._preBtn, this._nextBtn, this._fetchBtn, this._fetchedImg, 
            this._curLvl, this._nextLvl, this._curLvl2, this._redIcon, this._bg);
        }
        //Manager.pool.push(this._rightsBg);
        this._rightsBg.dispose();
        this._rightsBg = null;
        //Manager.pool.push(this._rewardsBg);
        this._rewardsBg.dispose();
        this._rewardsBg = null;
        this._list.dispose();
        this._list = null;
        this._curImg.bitmapData = null;
        this._curImg = null;
        this._nextImg.bitmapData = null;
        this._nextImg = null;
        this._nextTxt.dispose();
        this._nextTxt = null;
        this._rechargeBtn.dispose();
        this._rechargeBtn = null;
        this._titleImg.bitmapData = null;
        this._titleImg = null;
        this._preBtn.dispose();
        this._preBtn = null;
        this._nextBtn.dispose();
        this._nextBtn = null;
        this._fetchBtn.dispose();
        this._fetchBtn = null;
        this._fetchedImg.bitmapData = null;
        this._fetchedImg = null;
        if(this._curLvl) Manager.pool.push(this._curLvl);
        this._curLvl = null;
        if(this._nextLvl) Manager.pool.push(this._nextLvl);
        this._nextLvl = null;
        if(this._curLvl2) Manager.pool.push(this._curLvl2);
        this._curLvl2 = null;
        // if(this._strip) Manager.pool.push(this._strip);
        // this._strip = null;
        // this._strip2.pool();
        if(this._strip2)
        {
            this._strip2.dispose()
            this._strip2 = null;
        }
        this._redIcon = null;
        if(this._bg)
            Manager.pool.push(this._bg);
        this._bg = null;

        this.clearGoods();
        this._curPage = this._totalPage = 0;
    }

    private clearGoods():void
    {
        if(this._goods)
        {
            this._goods.forEach((goods, i) => 
            {
                ObjectUtil.remove(goods);
                Manager.pool.push(goods);
                goods = null;
            })
            this._goods.length = 0;
        }
    }

    public reuse():void
    {
        this._goods = [];
        this._curCvo = VipLevelCVO.getCVO(Manager.model.self.attrInfo.vipLevel);
        this._isInit = true;
        super.reuse();
    }

    public unuse():void
    {
        super.unuse();
        this.clear();
    }

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}