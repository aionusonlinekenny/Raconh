var PathManager = /** @class */ (function () {
    function PathManager() {
    }
    /**
     * 地图瓦片路径与地图路径文件
     * @param row 行数
     * @param col 列数
     */
    PathManager.prototype.getMapPath = function (resID, row, col) {
        if (row === void 0) { row = -1; }
        if (col === void 0) { col = -1; }
        return PathInfo.getPath("res/map/" + resID + "/" + row + "_" + col + "." + Extension.JPG, LoaderType.IMAGE);
    };
    PathManager.prototype.getMapPath2 = function (resID, name, loadeType) {
        return PathInfo.getPath("res/map/" + resID + "/" + name, loadeType);
    };
    /**
     * 衣服路径文件
     */
    PathManager.prototype.getClothesPath = function (name) {
        return PathInfo.getPath("res/body/" + name + ".json", LoaderType.ANI);
    };
    /**
     * 武器路径文件
     */
    PathManager.prototype.getWeaponPath = function (name) {
        return PathInfo.getPath("res/weapon/" + name + ".json", LoaderType.ANI);
    };
    /**
     * 武器路径文件
     */
    PathManager.prototype.getWeaponEffectPath = function (name) {
        return PathInfo.getPath("res/skill/" + name + ".json", LoaderType.ANI);
    };
    /**
     * 翅膀路径文件
     */
    PathManager.prototype.getWingPath = function (name) {
        return PathInfo.getPath("res/wing/" + name + ".json", LoaderType.ANI);
    };
    /**
     * 怪物路径文件
     */
    PathManager.prototype.getMonsterPath = function (name) {
        return PathInfo.getPath("res/monster/" + name + ".json", LoaderType.ANI);
    };
    /**
     * 宠物路径文件
     */
    PathManager.prototype.getPetPath = function (name, type) {
        if (type === void 0) { type = "json"; }
        if (type == "json")
            return PathInfo.getPath("res/pet/" + name + ".json", LoaderType.ANI);
        else
            return PathInfo.getPath("res/pet/" + name + "." + type, LoaderType.IMAGE);
    };
    /**
     * 数据表文件
     */
    PathManager.prototype.getCVOPath = function () {
        return PathInfo.getPath("res/cw.txt", LoaderType.BIN);
    };
    PathManager.prototype.getNPCPath = function (name) {
        return PathInfo.getPath("res/npc/" + name + ".json", LoaderType.ANI);
    };
    PathManager.prototype.getJumpPointPath = function (name) {
        return PathInfo.getPath("res/jumppoint/" + name + ".json", LoaderType.ANI);
    };
    PathManager.prototype.getSkillPath = function (name) {
        return PathInfo.getPath("res/skill/" + name + ".json", LoaderType.ANI);
    };
    PathManager.prototype.getSceneEffPath = function (name) {
        return PathInfo.getPath("res/sceneEff/" + name + ".json", LoaderType.ANI);
    };
    /**
     * 声音
     * @param name
     */
    PathManager.prototype.getSoundPath = function (name) {
        return PathInfo.getPath("res/sound/" + name + ".mp3", LoaderType.SOUND);
    };
    /**
     * 活动资源
     */
    PathManager.prototype.getCommonPath = function (name) {
        return PathInfo.getPath("res/common/" + name, LoaderType.IMAGE);
    };
    /**
     * 排行榜图片
     * @param name
     */
    PathManager.prototype.rankPath = function (name) {
        return PathInfo.getPath("res/rank/" + name, LoaderType.IMAGE);
    };
    /**
     * 活动资源
     */
    PathManager.prototype.getActivityPath = function (name) {
        return PathInfo.getPath("res/activity/" + name, LoaderType.IMAGE);
    };
    /**
     * 个人竞技资源
     */
    PathManager.prototype.getArenaPath = function (name) {
        return PathInfo.getPath("res/arena/" + name, LoaderType.IMAGE);
    };
    /**
     * 创号资源
     * @param name
     */
    PathManager.prototype.createRolePath = function (name) {
        return PathInfo.getPath("res/createRole/" + name, LoaderType.IMAGE);
    };
    /**
     *
     * @param imgId 物品图片imgId
     * @param size 图片规格（对应ItemsConst.IMG_SIZE）
     */
    PathManager.prototype.getIconPath = function (id, size) {
        if (size === void 0) { size = ItemsConst.IMG_SIZE_BIG; }
        var url = "res/items/icon" + size + "X" + size + "/" + id + "." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    };
    /**表情文件 */
    PathManager.prototype.getFacePath = function (id) {
        return PathInfo.getPath("res/face/face" + id + ".json", LoaderType.ANI);
    };
    /**面版人物模型 */
    PathManager.prototype.getPanelBodyPath = function (name) {
        return PathInfo.getPath("res/panelRes/body/" + name + ".json", LoaderType.ANI);
    };
    /**面版武器模型 */
    PathManager.prototype.getPanelWeaponPath = function (name) {
        return PathInfo.getPath("res/panelRes/weapon/" + name + ".json", LoaderType.ANI);
    };
    /**面版披风模型 */
    PathManager.prototype.getPanelPifengPath = function (name) {
        return PathInfo.getPath("res/panelRes/pifeng/" + name + ".json", LoaderType.ANI);
    };
    /**面版兵魂模型 */
    PathManager.prototype.getPanelShenbingPath = function (name) {
        return PathInfo.getPath("res/panelRes/shenbing/" + name + ".json", LoaderType.ANI);
    };
    /**
     * 角色头像图标
     * type 1方形 2圆形 3椭圆
     */
    PathManager.prototype.getRoleHeadPath = function (type, career, rein) {
        if (rein === void 0) { rein = 0; }
        var tStr;
        if (type == 1)
            tStr = "r";
        else if (type == 2)
            tStr = "c";
        else if (type == 3)
            tStr = "e";
        if (rein > 1)
            rein = 1;
        var url = "res/playerResource/headIcon/" + tStr + career + rein + "." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    };
    /**技能图标 */
    PathManager.prototype.getSkillIconPath = function (id) {
        var url = "res/skill/skillIcon/" + id + "." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    };
    /**称号图片 */
    PathManager.prototype.getTitlePath = function (id) {
        var url = "res/title/" + id + "." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    };
    /**特效 */
    PathManager.prototype.getEffectPath = function (name) {
        return PathInfo.getPath("res/effect/" + name + ".json", LoaderType.ANI);
    };
    /**boss头像 (prefiex=""|"c"|"r")*/
    PathManager.prototype.getBossHeadPath = function (id, prefiex) {
        if (prefiex === void 0) { prefiex = ""; }
        var url = "res/boss/" + prefiex + id + "." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    };
    /**boss背景 */
    PathManager.prototype.getBossItemBackPath = function (id) {
        var url = "res/boss/itemBack/" + id + "." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    };
    /**经脉特效 */
    PathManager.prototype.getJingMaiPath = function (name) {
        return PathInfo.getPath("res/jingmai/" + name + ".json", LoaderType.ANI);
    };
    /**聚元特效 */
    PathManager.prototype.getJuyuanPath = function (name) {
        return PathInfo.getPath("res/juyuan/" + name + ".json", LoaderType.ANI);
    };
    /**服饰资源 */
    PathManager.prototype.getFashionPath = function (name) {
        return PathInfo.getPath("res/dress/fashion/" + name, LoaderType.IMAGE);
    };
    /**
     * 盟会战路径
     */
    PathManager.prototype.getClubBFPath = function (name) {
        return PathInfo.getPath("res/clubBF/" + name, LoaderType.IMAGE);
    };
    /**
     * 任务路径文件
     */
    PathManager.prototype.getTaskPath = function (name) {
        return PathInfo.getPath("res/task/" + name, LoaderType.IMAGE);
    };
    /**预告*/
    PathManager.prototype.getSysnoticePath = function (icon) {
        var url = "res/sysNotice/" + icon + "." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    };
    /**vip */
    PathManager.prototype.getVipPath = function (name, type) {
        if (type === void 0) { type = Extension.PNG; }
        var url = "res/vip/" + name + "." + type;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    };
    /**江湖风云 */
    PathManager.prototype.getStormPath = function (name) {
        var url = "res/storm/" + name;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    };
    /**披风模型 */
    PathManager.prototype.getPanelCloakPath = function (name) {
        return PathInfo.getPath("res/panelRes/cloak/" + name + ".json", LoaderType.ANI);
    };
    /**活动图标 */
    PathManager.prototype.getActIconPath = function (id) {
        var url = "res/actIcon/" + id + "." + Extension.PNG;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    };
    /**转生 */
    PathManager.prototype.getReinPath = function (name, extension) {
        var url = "res/rein/" + name + "." + extension;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    };
    /**命格 */
    PathManager.prototype.getPanelLifeGridPath = function (name, file, type) {
        if (file === void 0) { file = ".json"; }
        if (type === void 0) { type = LoaderType.ANI; }
        return PathInfo.getPath("res/lifeGrid/" + name + file, type);
    };
    /** 特权 */
    PathManager.prototype.getPanelSysPrivilegePath = function (name, file) {
        if (file === void 0) { file = ".jpg"; }
        return PathInfo.getPath("res/sysprivilege/" + name + file, LoaderType.IMAGE);
    };
    /** 道充豪礼 */
    PathManager.prototype.getPanelFristChargePath = function (name) {
        return PathInfo.getPath("res/fristCharge/" + name + ".png", LoaderType.IMAGE);
    };
    /** 福利 */
    PathManager.prototype.getPanelCashCowPath = function (name, type) {
        if (type === void 0) { type = ".jpg"; }
        return PathInfo.getPath("res/cashCow/" + name + type, LoaderType.IMAGE);
    };
    /** 充值活动 */
    PathManager.prototype.getPanelrechargeActivityPath = function (name) {
        return PathInfo.getPath("res/rechargeActivity/" + name + ".jpg", LoaderType.IMAGE);
    };
    /**斗地主 */
    PathManager.prototype.getPanelLandlordPath = function (name, fileType) {
        return PathInfo.getPath("res/landlord/" + name + "." + fileType, LoaderType.IMAGE);
    };
    /** 寻宝 */
    PathManager.prototype.getArtifact = function (name) {
        var url = "res/artifact/" + name;
        return PathInfo.getPath(url, LoaderType.IMAGE);
    };
    /** 充值 */
    PathManager.prototype.getPanelSysChargePath = function (name, type) {
        if (type === void 0) { type = ".jpg"; }
        return PathInfo.getPath("res/sysCharge/" + name + type, LoaderType.IMAGE);
    };
    /** 神器 */
    PathManager.prototype.getRelicStuffPath = function (name, type, fileType) {
        if (type === void 0) { type = Extension.PNG; }
        if (fileType === void 0) { fileType = LoaderType.IMAGE; }
        var url = "res/relicStuff/" + name + "." + type;
        return PathInfo.getPath(url, fileType);
    };
    /** 一些界面上的图片 */
    PathManager.prototype.getPanelUiImgPath = function (file, type) {
        if (type === void 0) { type = "jpg"; }
        return PathInfo.getPath("res/panel_ui_Img/" + file + "." + type, LoaderType.IMAGE);
    };
    /**NPC头顶图标 */
    PathManager.prototype.getNpcHeadIcon = function (name, type) {
        if (type === void 0) { type = "png"; }
        return PathInfo.getPath("res/npc/icon/" + name + "." + type, LoaderType.IMAGE);
    };
    /**界面全局 */
    PathManager.prototype.getPanelGlobalPath = function (file) {
        return PathInfo.getPath("res/" + file + ".json", LoaderType.ANI);
    };
    /**缥缈录 */
    PathManager.prototype.getPanelMaterialPath = function (name, type) {
        if (type === void 0) { type = "png"; }
        return PathInfo.getPath("res/material/" + name + "." + type, LoaderType.IMAGE);
    };
    /** 冲极竞技 */
    PathManager.prototype.getPanelSrvRankPath = function (name, type, loadType) {
        if (type === void 0) { type = "png"; }
        if (loadType === void 0) { loadType = LoaderType.IMAGE; }
        return PathInfo.getPath("res/srvRank/" + name + "." + type, loadType);
    };
    /**火眼金睛 */
    PathManager.prototype.getFireEyePath = function (name, type) {
        if (type === void 0) { type = "png"; }
        return PathInfo.getPath("res/fireEye/" + name + "." + type, LoaderType.IMAGE);
    };
    /**熔炼 */
    PathManager.prototype.getRonglianPath = function (name, type) {
        if (type === void 0) { type = "png"; }
        return PathInfo.getPath("res/ronglian/" + name + "." + type, LoaderType.IMAGE);
    };
    /**魔神降临 */
    PathManager.prototype.getDevilPath = function (name, type) {
        if (type === void 0) { type = "png"; }
        return PathInfo.getPath("res/devil/" + name + "." + type, LoaderType.IMAGE);
    };
    /**
     * path:skin文件路径
     * name:skin类名
     * skinClassName:exml类名不是以文件名+skin时使用，不推荐使用
     */
    PathManager.prototype.getSkinName = function (path, name) {
        if (Manager.config.autoGenerateExmlsList) {
            return name;
        }
        else
            return "resource/game_skins/" + path + "/" + name + ".exml";
    };
    return PathManager;
}());
//# sourceMappingURL=PathManager.js.map