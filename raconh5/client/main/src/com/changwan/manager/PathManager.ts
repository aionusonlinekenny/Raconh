class PathManager
{
    /**
     * 地图瓦片路径与地图路径文件
     * @param row 行数
     * @param col 列数
     */
    public getMapPath(resID:number, row:number = -1, col:number = -1):PathInfo
    {
        return PathInfo.getPath("res/map/" + resID + "/" + row + "_" + col + "." + Extension.JPG,LoaderType.IMAGE);
    }

    public getMapPath2(resID:number,name:string,loadeType:number):PathInfo
    {
        return PathInfo.getPath("res/map/" + resID + "/" + name,loadeType);
    }

    /**
     * 衣服路径文件
     */
    public getClothesPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/body/"+name+".json", LoaderType.ANI);
    }

    /**
     * 武器路径文件
     */
    public getWeaponPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/weapon/"+name+".json", LoaderType.ANI);
    }

    /**
     * 武器路径文件
     */
    public getWeaponEffectPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/skill/"+name+".json", LoaderType.ANI);
    }

    /**
     * 翅膀路径文件
     */
    public getWingPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/wing/"+name+".json", LoaderType.ANI);
    }

    /**
     * 怪物路径文件
     */
    public getMonsterPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/monster/"+name+".json", LoaderType.ANI);
    }

    /**
     * 宠物路径文件
     */
    public getPetPath(name:string, type:string = "json"):PathInfo
    {
        if(type == "json") return PathInfo.getPath("res/pet/" + name + ".json", LoaderType.ANI);
        else return PathInfo.getPath("res/pet/" + name + "." + type, LoaderType.IMAGE);
    }

    /**
     * 数据表文件
     */
    public getCVOPath():PathInfo
    {
        return PathInfo.getPath("res/cw.txt",LoaderType.BIN);
    }

    public getNPCPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/npc/" + name + ".json",LoaderType.ANI);
    }

    public getJumpPointPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/jumppoint/" + name + ".json",LoaderType.ANI);
    }

    public getSkillPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/skill/" + name + ".json",LoaderType.ANI);
    }

    public getSceneEffPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/sceneEff/" + name + ".json",LoaderType.ANI);
    }

    /**
     * 声音
     * @param name 
     */
    public getSoundPath(name:number):PathInfo
    {
        return PathInfo.getPath("res/sound/" + name + ".mp3",LoaderType.SOUND);
    }
    /**
     * 活动资源
     */
    public getCommonPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/common/"+name, LoaderType.IMAGE);
    }
    /**
     * 排行榜图片
     * @param name 
     */
    public rankPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/rank/" + name, LoaderType.IMAGE);
    }
    /**
     * 活动资源
     */
    public getActivityPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/activity/"+name, LoaderType.IMAGE);
    }
    /**
     * 个人竞技资源
     */
    public getArenaPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/arena/"+name, LoaderType.IMAGE);
    }
    /**
     * 创号资源
     * @param name 
     */
    public createRolePath(name:string):PathInfo
    {
        return PathInfo.getPath("res/createRole/" + name, LoaderType.IMAGE);
    }

    /**
     * 
     * @param imgId 物品图片imgId
     * @param size 图片规格（对应ItemsConst.IMG_SIZE）
     */
    public getIconPath(id:number, size:number = ItemsConst.IMG_SIZE_BIG):PathInfo
    {
        let url:string = "res/items/icon" + size + "X" + size + "/" + id + "." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    }
   
    /**表情文件 */
    public getFacePath(id:string):PathInfo
    {
        return PathInfo.getPath("res/face/face" + id + ".json",LoaderType.ANI);
    }
    /**面版人物模型 */
    public getPanelBodyPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/panelRes/body/"+name+".json", LoaderType.ANI);
    }
    /**面版武器模型 */
    public getPanelWeaponPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/panelRes/weapon/"+name+".json", LoaderType.ANI);
    }
    /**面版披风模型 */
    public getPanelPifengPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/panelRes/pifeng/"+name+".json", LoaderType.ANI);
    }
    /**面版兵魂模型 */
    public getPanelShenbingPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/panelRes/shenbing/"+name+".json", LoaderType.ANI);
    }
    /**
     * 角色头像图标
     * type 1方形 2圆形 3椭圆
     */
    public getRoleHeadPath(type:number,career:number,rein:number=0):PathInfo
    {
        let tStr:string;
        if(type == 1) tStr = "r";
        else if(type == 2) tStr = "c";
        else if(type == 3) tStr = "e";
        if(rein > 1) rein = 1;
        let url:string = "res/playerResource/headIcon/" + tStr + career + rein + "." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    }
    /**技能图标 */
    public getSkillIconPath(id:number):PathInfo
    {
        let url:string = "res/skill/skillIcon/" + id + "." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    }
    /**称号图片 */
    public getTitlePath(id:number):PathInfo
    {
        let url:string = "res/title/" + id + "." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    }
    /**特效 */
    public getEffectPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/effect/"+name+".json", LoaderType.ANI);
    }
    /**boss头像 (prefiex=""|"c"|"r")*/
    public getBossHeadPath(id:string, prefiex:string=""):PathInfo
    {
        let url = "res/boss/" + prefiex + id +"." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    }
    /**boss背景 */
    public getBossItemBackPath(id:number):PathInfo
    {
        let url = "res/boss/itemBack/" + id +"." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    }

     /**经脉特效 */
    public getJingMaiPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/jingmai/"+name+".json", LoaderType.ANI);
    }
     /**聚元特效 */
    public getJuyuanPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/juyuan/"+name+".json", LoaderType.ANI);
    }

     /**服饰资源 */
    public getFashionPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/dress/fashion/" + name, LoaderType.IMAGE);
    }

    /**
     * 盟会战路径
     */
    public getClubBFPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/clubBF/"+name, LoaderType.IMAGE);
    }
    
    /**
     * 任务路径文件
     */
    public getTaskPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/task/"+name, LoaderType.IMAGE);
    }

    /**预告*/
    public getSysnoticePath(icon:string):PathInfo
    {
        let url = "res/sysNotice/" + icon +"." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    }
    /**vip */
    public getVipPath(name:string, type:string = Extension.PNG):PathInfo
    {
        let url = "res/vip/" + name +"." + type;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    }
    
    /**江湖风云 */
    public getStormPath(name:string):PathInfo
    {
        let url = "res/storm/" + name;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    }

    /**披风模型 */
    public getPanelCloakPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/panelRes/cloak/"+name+".json", LoaderType.ANI);
    }
    /**活动图标 */
    public getActIconPath(id:number):PathInfo
    {
        let url = "res/actIcon/"+ id + "." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    }
    /**转生 */
    public getReinPath(name:string, extension:string):PathInfo
    {
        let url = "res/rein/"+ name + "." + extension;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    }

    /**命格 */
    public getPanelLifeGridPath(name:string,file:string=".json",type:number = LoaderType.ANI):PathInfo
    {
        return PathInfo.getPath("res/lifeGrid/"+name+file, type);
    }

    /** 特权 */
    public getPanelSysPrivilegePath(name:string,file:string=".jpg"):PathInfo
    {
        return PathInfo.getPath("res/sysprivilege/"+name+file, LoaderType.IMAGE);
    }
    /** 道充豪礼 */
    public getPanelFristChargePath(name:string):PathInfo
    {
        return PathInfo.getPath("res/fristCharge/"+name+".png", LoaderType.IMAGE);
    }
    /** 福利 */
    public getPanelCashCowPath(name:string,type:string = ".jpg"):PathInfo
    {
        return PathInfo.getPath("res/cashCow/"+name+type, LoaderType.IMAGE);
    }
    /** 充值活动 */
    public getPanelrechargeActivityPath(name:string):PathInfo
    {
        return PathInfo.getPath("res/rechargeActivity/"+name+".jpg", LoaderType.IMAGE);
    }
    /**斗地主 */
    public getPanelLandlordPath(name:string, fileType:string):PathInfo
    {
        return PathInfo.getPath("res/landlord/" + name + "." + fileType, LoaderType.IMAGE);
    }
    /** 寻宝 */
    public getArtifact(name:string):PathInfo
    {
        let url = "res/artifact/"+ name;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    }
    /** 充值 */
    public getPanelSysChargePath(name:string,type:string = ".jpg"):PathInfo
    {
        return PathInfo.getPath("res/sysCharge/"+name+type, LoaderType.IMAGE);
    }

    /** 神器 */
    public getRelicStuffPath(name:string,type:string = Extension.PNG,fileType:number = LoaderType.IMAGE):PathInfo
    {
        let url = "res/relicStuff/"+ name+ "." +type;
        return PathInfo.getPath(url, fileType);
    }

    /** 一些界面上的图片 */
    public getPanelUiImgPath(file:string,type:string = "jpg"):PathInfo
    {
        return PathInfo.getPath("res/panel_ui_Img/"+file+"."+type, LoaderType.IMAGE);
    }

    /**NPC头顶图标 */
    public getNpcHeadIcon(name:string, type:string = "png"):PathInfo
    {
        return PathInfo.getPath("res/npc/icon/" + name + "." + type, LoaderType.IMAGE);
    }
    /**界面全局 */
    public getPanelGlobalPath(file:string):PathInfo
    {
        return PathInfo.getPath("res/"+file+".json", LoaderType.ANI);
    }
    /**缥缈录 */
    public getPanelMaterialPath(name:string, type:string = "png"):PathInfo
    {
        return PathInfo.getPath("res/material/"+ name +"." + type, LoaderType.IMAGE);
    }

    /** 冲极竞技 */
    public getPanelSrvRankPath(name:string, type:string = "png",loadType:number=LoaderType.IMAGE):PathInfo
    {
        return PathInfo.getPath("res/srvRank/"+ name +"." + type, loadType);
    }
    /**火眼金睛 */
    public getFireEyePath(name:string, type:string = "png"):PathInfo
    {
        return PathInfo.getPath("res/fireEye/" + name + "." + type, LoaderType.IMAGE);
    }
    /**熔炼 */
    public getRonglianPath(name:string, type:string = "png"):PathInfo
    {
        return PathInfo.getPath("res/ronglian/" + name + "." + type, LoaderType.IMAGE);
    }
    /**魔神降临 */
    public getDevilPath(name:string, type:string = "png"):PathInfo
    {
        return PathInfo.getPath("res/devil/" + name + "." + type, LoaderType.IMAGE);
    }

    /**
     * path:skin文件路径
     * name:skin类名
     * skinClassName:exml类名不是以文件名+skin时使用，不推荐使用
     */
    public getSkinName(path:string, name:string):string
    {
        if(Manager.config.autoGenerateExmlsList)
        {
            return name;
        }
        else
            return "resource/game_skins/" + path + "/" + name + ".exml";
    }
}