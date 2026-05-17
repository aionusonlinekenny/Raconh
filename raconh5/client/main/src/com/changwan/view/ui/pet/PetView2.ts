/**
 * 宠物主界面
 * liangyan
 * create 2017-12-15
 * @update deveil 2018-04-12
*/
class PetView2 extends RenderSprite
{
    private _fightImg:BitmapRes;
    private _back1:BitmapRes;
    private _nameTxt:TextField;
    private _preBtn:Button;
    private _nextBtn:Button;
    private _container1:egret.DisplayObjectContainer;
    private _container1_img1:BitmapRes;
    private _container1_img2:BitmapRes;
    private _container1_img3:BitmapRes;
    private _container1_img4:BitmapRes;
    private _attrTxt:TextField;
    private _container2:egret.DisplayObjectContainer;
    private _container2_img1:BitmapRes;
    private _container2_img2:BitmapRes;
    private _skillReds:BitmapRes[];
    private _grids:PetSkillGrid2[];
    private _container3:egret.DisplayObjectContainer;
    private _huanhuaBtn:Button;
    private _hhImg:BitmapRes;
    private _hashhImg:BitmapRes;
    private _back2:BitmapRes;
    private _back3:BitmapRes;
    private _feedBtn:Button;
    private _feedIcon:BitmapRes;
    private _upgradeBtn:Button;
    private _upgradeIcon:BitmapRes;
    private _lossTxt:TextField;
    private _back4:BitmapRes;

    private _jieView:JieNumView2;
    private _fightView:NumImgView2;
    private _starView:StarView2;
    private _stripView2:StripView2;
    private _petModel:PetModel;
    private _bgImg:BitmapRemote;

    private _curPage:number;
    private _totalPage:number;
    private _isUpgradeing:boolean;
    private _curCvo:PetCVO;
    private _curStyleCvo:PetStyleCVO;
    private _petAni:Animation;
    private readonly DRAW_PAGE:string = "drawPage";
    private readonly DRAW_STRIP:string = "drawStrip";
    private readonly DRAW_ANI:string = "drawAni";

    private _sysPrivileImg:BitmapRes;


    public constructor()
    {
        super();
        this.touchChildren = true;
        this._isUpgradeing = false;
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        super.start();
        this._fightImg = BitmapRes.create("common_zhanli_png",434,158,102,57);
        this.addChild(this._fightImg);
        this._back1 = BitmapRes.create("common_back2_png",136,166,184,48);
        this.addChild(this._back1);
        this._nameTxt = TextField.create(174,28);
        this._nameTxt.move(141,176);
        this._nameTxt.textColor = 0xfffbeb;
        this._nameTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._nameTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this._nameTxt);
        this._preBtn = new Button();
        this._preBtn.skinName = "Button5Skin";
        this._preBtn.move(10,432);
        this._preBtn.setSize(37,70);
        this.addChild(this._preBtn);
        this._nextBtn = new Button();
        this._nextBtn.skinName = "Button5Skin";
        this._nextBtn.move(422,432);
        this._nextBtn.setSize(37,70);
        this._nextBtn.scaleX = -1;
        this.addChild(this._nextBtn);
        this._container1 = Manager.pool.create(egret.DisplayObjectContainer);
        this._container1.touchChildren = this._container1.touchEnabled = false;
        this._container1.x = 465;
        this._container1.y = 254;
        this.addChild(this._container1);
        this._container1_img1 = this.createContainer1Img(1);
        this._container1_img2 = this.createContainer1Img(46);
        this._container1_img3 = this.createContainer1Img(90);
        this._container1_img4 = this.createContainer1Img(134);
        this._attrTxt = TextField.create(180,164,0xfffbeb);
        this._attrTxt.move(45,4);
        this._attrTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._attrTxt.textAlign = egret.HorizontalAlign.LEFT;
        this._attrTxt.lineSpacing = 20;
        this._container1.addChild(this._attrTxt);

        this._container2 = Manager.pool.create(egret.DisplayObjectContainer);
        this._container2.touchEnabled = false;
        this._container2.x = 438;
        this._container2.y = 491;
        this.addChild(this._container2);
        this._container2_img1 = BitmapRes.create("common_rect_1_png",0,0,272,296);
        this._container2_img1.scale9Grid = new egret.Rectangle(6,6,38,38);
        this._container2.addChild(this._container2_img1);
        this._container2_img2 = BitmapRes.create("pet_skill_title_png",46,3);
        this._container2.addChild(this._container2_img2);
        this._grids = [];
        this._skillReds = [];
        for(let i:number = 0 ; i < 4; i ++)
        {
            if(i == 0)
            {
                this._grids[i] = new PetSkillGrid2(18,49);
                this._skillReds[i] = BitmapRes.create("common_red_icon_png",98,45);
            }
            else if(i == 1)
            {
                this._grids[i] = new PetSkillGrid2(148,49);
                this._skillReds[i] = BitmapRes.create("common_red_icon_png",228,45);
            }
            else if(i == 2)
            {
                this._grids[i] = new PetSkillGrid2(18,169);
                this._skillReds[i] = BitmapRes.create("common_red_icon_png",98,166);
            }
            else if(i == 3)
            {
                this._grids[i] = new PetSkillGrid2(148,169);
                this._skillReds[i] = BitmapRes.create("common_red_icon_png",228,166);
            }
            this._container2.addChild(this._grids[i]);
        }

        this._container3 = Manager.pool.create(egret.DisplayObjectContainer);
        this._container3.touchEnabled = false;
        this._container3.x = 131;
        this._container3.y = 714;
        this.addChild(this._container3);
        this._huanhuaBtn = new Button();
        this._huanhuaBtn.skinName = '<?xml version="1.0" encoding="utf-8"?>'
                                + '<e:Skin class="Button1Skin" xmlns:e="http://ns.egret.com/eui" states="up,down,disabled" xmlns:ns1="*">'
                                + '<e:Image width="100%" height="100%" source="common_btn1_1_png" source.down="common_btn1_2_png"/>'
                                + '<ns1:Label id="labelDisplay" horizontalCenter="0" verticalCenter="0" />'
                                +'</e:Skin>'
        this._huanhuaBtn.setSize(197,90);
        this._container3.addChild(this._huanhuaBtn);
        this._hhImg = BitmapRes.create("common_label_huanhua_png",8,19);
        this._container3.addChild(this._hhImg);
        this._hashhImg = BitmapRes.create("common_label_hasHuanhua_png",8,19);
        this._container3.addChild(this._hashhImg);

        this._back2 = BitmapRes.create("common_bg1_normal_png",5,841,710,138);
        this._back2.scale9Grid = new egret.Rectangle(29,11,181,69);
        this.addChild(this._back2);        
        this._back3 = BitmapRes.create("pet_rate_label_png",54,852);
        this.addChild(this._back3);    
        this._feedBtn = new Button();
        this._feedBtn.skinName = '<?xml version="1.0" encoding="utf-8"?>'
                        + '<e:Skin class="Button1Skin" xmlns:e="http://ns.egret.com/eui" states="up,down,disabled" xmlns:ns1="*">'
                        + '<e:Image width="100%" height="100%" source="common_btn2_1_png" source.down="common_btn2_2_png"/>'
                        + '<e:Image source="pet_feed_label_png" x="29" y="27"/>'
                        + '<e:Label id="labelDisplay" horizontalCenter="0" verticalCenter="0"/>'
                        +'</e:Skin>'
        this._feedBtn.setSize(238,105);
        this._feedBtn.move(73,1015);
        this.addChild(this._feedBtn);
        this._feedIcon = BitmapRes.create("common_red_icon_png",276,1015);
        this.addChild(this._feedIcon);
        this._upgradeBtn = new Button();
        // this._upgradeBtn.skinName = '<e:Skin states="up,down,disabled"><e:Image width="100%" height="100%" source="common_btn1_1_png" source.down="common_btn1_2_png"/><e:Image source="common_label_all_upgrade_png" x="29" y="27"/><e:Label id="labelDisplay" horizontalCenter="0" verticalCenter="0"/></e:Skin>'
        this._upgradeBtn.skinName = '<?xml version="1.0" encoding="utf-8"?>'
                        + '<e:Skin class="Button1Skin" xmlns:e="http://ns.egret.com/eui" states="up,down,disabled" xmlns:ns1="*">'
                        + '<e:Image width="100%" height="100%" source="common_btn1_1_png" source.down="common_btn1_2_png"/>'
                        + '<e:Image source="common_label_all_upgrade_png" x="29" y="27"/>'
                        + '<e:Label id="labelDisplay" horizontalCenter="0" verticalCenter="0"/>'
                        +'</e:Skin>'
        this._upgradeBtn.setSize(238,105);
        this._upgradeBtn.move(422,1015);
        this.addChild(this._upgradeBtn);
        this._upgradeIcon = BitmapRes.create("common_red_icon_png",625,1015);

        this._lossTxt = TextField.create(233,29,0xfff7e6,22,"center","middle");
        this._lossTxt.move(423,993);
        this._lossTxt.text = "宠物进阶丹：10/20"
        this.addChild(this._lossTxt);
        this._back4 = BitmapRes.create("common__jindudi_png",81,908,564,32);
        this._back4.scale9Grid = new egret.Rectangle(24,10,60,13);
        this.addChild(this._back4);


        this._jieView = new JieNumView2();
        this._jieView.x = 56;
        this._jieView.y = 170;
        this.addChild(this._jieView);
        this._fightView = Manager.pool.create(NumImgView2);
        this._fightView.x = this._fightImg.x + 100;
        this._fightView.y = this._fightImg.y + 10;
        this.addChild(this._fightView);
        this._starView = new StarView2(10,42,"common_star_grey_png", "common_star_bright_png");
        this._starView.x = 240;
        this._starView.y = 860;
        this.addChild(this._starView);

        this._stripView2 = StripView2.create(this,this,"strip_back2_png", "strip_blue2_png", 603, 53, 564, 32, 19, 10,true,true,24);
        this._stripView2.move(62,898);

        this._bgImg = Manager.pool.create(BitmapRemote);
        this._bgImg.x = 5;
        this._bgImg.y = 979;
        this._bgImg.load(PathInfo.getPath("res/common/panel_bg2.png", LoaderType.IMAGE), 710, 163);
        this.addChildAt(this._bgImg, 8);

        this._petModel = Manager.model.getPet();
        this._curCvo = PetCVO.getCVO(this._petModel.pinjie, this._petModel.star);
        this._curCvo = PetCVO.getCVO(this._petModel.pinjie, this._petModel.star);
        this._curStyleCvo = PetStyleCVO.getCVOByResId(this._petModel.huanhuaID);
        this._curPage = this._curStyleCvo ? (PetStyleCVO.cvos.indexOf(this._curStyleCvo) + 1) : 1;
        this._totalPage = PetStyleCVO.cvos.length;
        let skillCvos:SkillCVO[] = SkillCVO.getPetPanelSkills();
        for(let i:number = 0; i < 4; i++)
        {
            this._grids[i].cvo = skillCvos[i];
        }

        this._sysPrivileImg = BitmapRes.create("sysprivilege_zuanshi2_png",16,247);
        this.addChild(this._sysPrivileImg);
        if(!Manager.model.getSysPrivilege().getdata2(SysprivilegeType.DIAMOND_CARD).isActive)
        {
            FilterUtil.setGrayFilter(this._sysPrivileImg);
        }

    }

    private createContainer1Img(y:number):BitmapRes
    {
        let result:BitmapRes = BitmapRes.create("common_back3_png",0,y,227,37);
        result.scale9Grid = new egret.Rectangle(8,4,49,29);
        this._container1.addChild(result);
        return result;
    }

    protected addEvent():void
    {
        super.addEvent();
        for(let i = 0; i < 4; i++)
        {
            this._grids[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSkillHandler, this);
        }
        this._preBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._huanhuaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._feedBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._upgradeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);

        this._petModel.addEventListener(PetEvent.UPGRADE, this.onPetUpdateHandler, this);
        this._petModel.addEventListener(PetEvent.ZZD_USE, this.onPetUpdateHandler, this);
        this._petModel.addEventListener(PetEvent.WXD_USE, this.onPetUpdateHandler, this);
        this._petModel.addEventListener(PetEvent.HUANHUA, this.onPetUpdateHandler, this);
        this._petModel.addEventListener(PetEvent.UPDATE_ALL_ATTR, this.onPetUpdateHandler, this);

        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemsUpdateHandler, this);
    }

    protected removeEvent():void
    {
        for(let i = 0; i < 4; i++)
        {
            this._grids[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSkillHandler, this);
        }
        this._preBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._huanhuaBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._feedBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._upgradeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);

        this._petModel.removeEventListener(PetEvent.UPGRADE, this.onPetUpdateHandler, this);
        this._petModel.removeEventListener(PetEvent.ZZD_USE, this.onPetUpdateHandler, this);
        this._petModel.removeEventListener(PetEvent.WXD_USE, this.onPetUpdateHandler, this);
        this._petModel.removeEventListener(PetEvent.HUANHUA, this.onPetUpdateHandler, this);
        this._petModel.removeEventListener(PetEvent.ITEM_STYLE_LIST, this.onPetUpdateHandler, this);
        this._petModel.removeEventListener(PetEvent.UPDATE_ALL_ATTR, this.onPetUpdateHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemsUpdateHandler, this);
        super.removeEvent();
    }

    protected disposeSelf():void
    {
        super.disposeSelf();
        if(this._fightImg)
        {
            Manager.pool.push(this._fightImg);
            this._fightImg = null;
        }
        if(this._back1)
        {
            Manager.pool.push(this._back1);
            this._back1 = null;
        }
        if(this._nameTxt)
        {
            Manager.pool.push(this._nameTxt);
            this._nameTxt = null;
        }
        if(this._preBtn)
        {
            this._preBtn.dispose();
            this._preBtn = null;
        }
        if(this._nextBtn)
        {
            this._nextBtn.dispose();
            this._nextBtn = null;
        }

        if(this._container1)
        {
            Manager.pool.push(this._container1);
            this._container1 = null;
        }
        if(this._container1_img1)
        {
            Manager.pool.push(this._container1_img1);
            this._container1_img1 = null;
        }
        if(this._container1_img2)
        {
            Manager.pool.push(this._container1_img2);
            this._container1_img2 = null;
        }
        if(this._container1_img3)
        {
            Manager.pool.push(this._container1_img3);
            this._container1_img3 = null;
        }
        if(this._container1_img4)
        {
            Manager.pool.push(this._container1_img4);
            this._container1_img4 = null;
        }
        if(this._attrTxt)
        {
            Manager.pool.push(this._attrTxt);
            this._attrTxt = null;
        }
        if(this._container2)
        {
            Manager.pool.push(this._container2);
            this._container2 = null;
        }
        if(this._container2_img1)
        {
            Manager.pool.push(this._container2_img1);
            this._container2_img1 = null;
        }
        if(this._container2_img2)
        {
            Manager.pool.push(this._container2_img2);
            this._container2_img2 = null;
        }
        for(let i:number = 0 ; i < 4; i ++)
        {
            Manager.pool.push(this._skillReds[i]);
            Manager.pool.push(this._grids[i]);
        }
        this._grids = null;
        this._skillReds = null;
        if(this._container3)
        {
            Manager.pool.push(this._container3);
            this._container3 = null;
        }
        if(this._huanhuaBtn)
        {
            this._huanhuaBtn.dispose();
            this._huanhuaBtn = null;
        }
        if(this._hhImg)
        {
            Manager.pool.push(this._hhImg);
            this._hhImg = null;
        }
        if(this._hashhImg)
        {
            Manager.pool.push(this._hashhImg);
            this._hashhImg = null;
        }
        if(this._back2)
        {
            Manager.pool.push(this._back2);
            this._back2 = null;
        }
        if(this._back3)
        {
            Manager.pool.push(this._back3);
            this._back3 = null;
        }
        if(this._feedBtn)
        {
            this._feedBtn.dispose();
            this._feedBtn = null;
        }
        if(this._feedIcon)
        {
            Manager.pool.push(this._feedIcon);
            this._feedIcon = null;
        }
        if(this._upgradeBtn)
        {
            this._upgradeBtn.dispose();
            this._upgradeBtn = null;
        }
        if(this._upgradeIcon)
        {
            Manager.pool.push(this._upgradeIcon);
            this._upgradeIcon = null;
        }
        if(this._lossTxt)
        {
            Manager.pool.push(this._lossTxt);
            this._lossTxt = null;
        }
       if(this._back4)
        {
            Manager.pool.push(this._back4);
            this._back4 = null;
        }
        if(this._jieView)
        {
            this._jieView.dispose();
            this._jieView = null;
        }
        if(this._fightView)
        {
            Manager.pool.push(this._fightView);
            this._fightView = null;
        }
        if(this._starView)
        {
            this._starView.dispose();
            this._starView = null;
        }
        // if(this._stripView)
        // {
        //     Manager.pool.push(this._stripView);
        //     this._stripView = null;
        // }
        if(this._stripView2)
        {
            this._stripView2.dispose();
            this._stripView2 = null;
        }
        this._petModel = null;
        if(this._bgImg)
        {
            Manager.pool.push(this._bgImg);
            this._bgImg = null;
        }
        this._curCvo = null;
        this._curStyleCvo = null;
        if(this._petAni)
        {
            Manager.pool.push(this._petAni);
            this._petAni = null;
        }
        if(Manager.render.contains(this.drawLoss, this)) Manager.render.remove(this.drawLoss, this);
        if(Manager.model.getGuide().curID == GuideID.PET_UPGRADE) Manager.control.getTask().hideGuide();
        if(Manager.render.contains(this.delayUpgradePet, this)) Manager.render.remove(this.delayUpgradePet, this);

        if(this._sysPrivileImg)
        {
            Manager.pool.push(this._sysPrivileImg);
            this._sysPrivileImg.filters = null;
            this._sysPrivileImg = null;
        }
    }

    private onTouchSkillHandler(e:egret.TouchEvent):void
    {
        let grid:PetSkillGrid2 = e.currentTarget as PetSkillGrid2;
        if(!grid) return;
        Manager.view.show(ViewID.PetSkillView, grid.cvo);
    }

    private prePage():void
    {
        if(this._curPage <= 1) return;
        this._curPage--;
        this.invalidate(this.DRAW_PAGE);
    }

    private nextPage():void
    {
        if(this._curPage >= this._totalPage) return;
        this._curPage++;
        this.invalidate(this.DRAW_PAGE);
    }

    private upgradeFun(e:egret.TouchEvent):void
    {
        if(e != null && Manager.model.getGuide().curID == GuideID.PET_UPGRADE) return;
        if(this._isUpgradeing) return;
        let petCvo = PetCVO.getCVO(this._petModel.pinjie, this._petModel.star);
        if(petCvo && !petCvo.loss.isEnough())
        {
            let shopCvo = ShopCVO.getbaseIdCvo(petCvo.loss.baseId);
            Manager.view.show(ViewID.ShopBuyView,shopCvo);
            return;
        }
        Manager.control.getPet().upgradePet();
        this._isUpgradeing = true;
    }


    private drawStar():void
    {
        if(!this._curCvo) return;
        this._starView.update(this._curCvo.star);
    }

    /**添加延迟，等进度条播放完毕再进阶 */
    private delayUpgradePet():void
    {
        if(!this._isUpgradeing) return;
        if(!this._curCvo.loss.isEnough())
        {
            this._isUpgradeing = false;
            return;
        }
        Manager.control.getPet().upgradePet();
    }

    private drawAttrAndFight():void
    {
        if(!this._curCvo) return;
        let str = "";
        let info:AttrVoInfo;
        let infos = this._petModel.allAttrVO.attrInfos;
        for(let i = 0; i < infos.length; i++)
        {
            info = infos[i];
            if(i != infos.length-1) str += info.name + "+" + info.num + "\n";
            else str += info.name + "+" + info.num;
        }
        HtmlUtil.setTextFlow(this._attrTxt, str);
        this._fightView.setValue(this._petModel.allAttrVO.getFighting(), "nums_fighting_", 25);
    }

    private drawAni():void
    {
        if(!this._curCvo) return;
        if(this._petAni)
		{
			Manager.pool.push(this._petAni);
			this._petAni = null;
		}
        let styleCvo:PetStyleCVO = PetStyleCVO.cvos[this._curPage - 1];
        this._petAni = Manager.animation.createPetAnimation("mochong" + styleCvo.resId);
        this.addChildAt(this._petAni, 0);
        this._petAni.x = -320;
        this._petAni.y = -100;
    }

    private drawStrip():void
    {
        if(!this._curCvo) return;
        // this._stripView.update(this._petModel.starExp, this._curCvo.starExp, true);
        this._stripView2.update(this._petModel.starExp, this._curCvo.starExp, true);
    }

    private drawPage():void
    {
        this._preBtn.visible = this._curPage > 0 && this._curPage != 1;
        this._nextBtn.visible = this._curPage > 0 && this._curPage < this._totalPage;
        let styleCvo:PetStyleCVO = PetStyleCVO.cvos[this._curPage - 1];
        this._nameTxt.text = styleCvo.name;
        this._hhImg.visible = styleCvo.resId != this._petModel.huanhuaID;
        this._hashhImg.visible = styleCvo.resId == this._petModel.huanhuaID;
        this._jieView.jie = this._curPage;
    }

    private drawLoss():void
    {
        if(!this._curCvo) return;
        let bagCount = Manager.model.getItems().getCountItemById(this._curCvo.loss.baseId);
        let itemName:string = ItemsCVO.getCvo(this._curCvo.loss.baseId).name;
        let color:string = bagCount >= this._curCvo.loss.num ? Color.WHITE_STR : Color.RED_STR;
        let msg:string = StringUtils.setParam("{0}：{1}/{2}", itemName, HtmlUtil.addColorTag("" + bagCount, color), this._curCvo.loss.num);
        HtmlUtil.setTextFlow(this._lossTxt, msg);
        if(!this._petModel) return;
        this._feedIcon.visible = this._petModel.checkCanFeed();
        this._upgradeIcon.visible = this._petModel.checkCanUpgrade();
        for(let i:number = 0; i < 4; i++)
        {
            if(this._grids[i].cvo)
            {
                let visible:boolean = this._petModel.checkOneSkillCanUp(this._grids[i].cvo.groupID);
                if(visible) 
                {
                    if(this._skillReds[i].parent == null)this._container2.addChild(this._skillReds[i]);
                }
                else 
                {
                    if(this._skillReds[i].parent != null)this._container2.removeChild(this._skillReds[i]);
                }
            }
               
        }
    }


    protected drawAll():void
    {
        super.drawAll();
        this.drawStar();
        this.drawStrip();
        this.drawPage();
        this.drawAni();
        this.drawLoss();
       if(this._petModel.allAttrVO)this.drawAttrAndFight();
       else this._petModel.delayParseAllAttrVO();

       //引导(放在start会导致视图没添加到panel，获取parent为空)
	   if(Manager.model.getGuide().curID == GuideID.PET_UPGRADE) 
	   {
           let pos:egret.Point = this._upgradeBtn.parent.localToGlobal(this._upgradeBtn.x,this._upgradeBtn.y);
           Manager.control.getTask().showGuide(pos, this._upgradeBtn.width>>1, this._upgradeBtn.height>>1, this.guideCB, this, false);
	   }
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(this.DRAW_STRIP)) this.drawStrip();
        if(this.isInvalid(this.DRAW_PAGE)) this.drawPage();
        if(this.isInvalid(this.DRAW_ANI,this.DRAW_PAGE))this.drawAni();
        if(this.isInvalid("drawAttrAndFight")) this.drawAttrAndFight();
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
            case this._huanhuaBtn:
                let styleCvo:PetStyleCVO = PetStyleCVO.cvos[this._curPage - 1];
                if(styleCvo.resId == this._petModel.huanhuaID)
                {
                    return;
                }
                if((styleCvo.activeType == 1) && (styleCvo.activeJie > this._petModel.pinjie))
                {
                    FloatTips.addTips(LangCVO.getContent("pet1"), Color.RED);//无法幻化未激活外形！
                    return;
                }
                if((styleCvo.activeType == 2) && !this._petModel.hasItemStyle(styleCvo.resId))
                {
                    FloatTips.addTips(LangCVO.getContent("pet1"), Color.RED);//无法幻化未激活外形！
                    return;
                }
                Manager.control.getPet().huanhuaPet(styleCvo.resId);
            break;
            case this._feedBtn:
                Manager.view.show(ViewID.PetFeedView);
            break;
            case this._upgradeBtn:
                this.upgradeFun(e);
            break;
        }
    }

    private onItemsUpdateHandler(e:ItemsEvent):void
    {
        Manager.render.add(this.drawLoss, this, 300, 1, null, true);
    }

    private onPetUpdateHandler(e:PetEvent):void
    {
        switch(e.type)
        {
            case PetEvent.UPGRADE:
                if(this._curCvo.pinjie < this._petModel.pinjie || this._curCvo.star < this._petModel.star)
                {
                    this._isUpgradeing = false;
                    this._petModel.delayParseAllAttrVO();
                    if(this._curCvo.pinjie < this._petModel.pinjie)
                    {
                        this._curPage = this._petModel.pinjie; 
                        this.invalidate(this.DRAW_PAGE);
                    }
                }
                this._curCvo = PetCVO.getCVO(this._petModel.pinjie, this._petModel.star);
                this.drawStar();
                this.invalidate(this.DRAW_STRIP);
                Manager.render.add(this.delayUpgradePet, this, 280, 1, null, true);
            break;
            case PetEvent.ZZD_USE:
                FloatTips.addTips(LangCVO.getContent("pet9"), Color.GREEN);//使用资质丹成功
                this._petModel.delayParseAllAttrVO();
            break;
            case PetEvent.WXD_USE:
                FloatTips.addTips(LangCVO.getContent("pet10"), Color.GREEN);//使用悟性丹成功
                this._petModel.delayParseAllAttrVO();
            break;
            case PetEvent.HUANHUA:
                FloatTips.addTips(LangCVO.getContent("pet11"), Color.GREEN);//幻化成功
                this.invalidate(this.DRAW_PAGE);
            break;
            case PetEvent.ITEM_STYLE_LIST:
                this.invalidate(this.DRAW_PAGE);
                this._petModel.delayParseAllAttrVO();
            break;
            case PetEvent.UPDATE_ALL_ATTR:
                this.invalidate("drawAttrAndFight");
            break;
        }
    }

    private guideCB():void
    {
        this.upgradeFun(null);
        this._isUpgradeing = true;
        Manager.control.getTask().hideGuide();
    }
}