var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AnimationManager = (function () {
    function AnimationManager() {
    }
    AnimationManager.prototype.createGameOjbectAnimation = function (info, animationType) {
        if (animationType === void 0) { animationType = 0; }
        var type = (animationType == 0) ? info.getAnimationType() : animationType;
        if (type == AnimationType.PLAYER)
            return Manager.pool.create(PlayerAnimation, info);
        else if (type == AnimationType.MONSTER)
            return Manager.pool.create(MonsterAnimation, info);
        else if (type == AnimationType.PET)
            return Manager.pool.create(PetAnimation, info);
        return null;
    };
    /**场景特效 */
    AnimationManager.prototype.createSceneEffAnimation = function (id, loaderPriority, autoPlay, playCompleteDispose) {
        if (autoPlay === void 0) { autoPlay = true; }
        if (playCompleteDispose === void 0) { playCompleteDispose = true; }
        return Manager.pool.create(Animation, Manager.path.getSceneEffPath(id), AnimationCVO.getCVO("sceneEff" + id), loaderPriority, autoPlay, playCompleteDispose);
    };
    AnimationManager.prototype.createNPCAnimation = function (id) {
        return Manager.pool.create(Animation, Manager.path.getNPCPath("npc" + id), AnimationCVO.getCVO("npc"), 0, true, false);
    };
    AnimationManager.prototype.createJumpPointAnimation = function (id) {
        return Manager.pool.create(Animation, Manager.path.getJumpPointPath("jumppoint" + id), AnimationCVO.getCVO("jumppoint"), 0, true, false);
    };
    AnimationManager.prototype.createSkillAnimation = function (effectID, loaderPriority, autoPlay, playCompleteDispose) {
        if (loaderPriority === void 0) { loaderPriority = 0; }
        if (autoPlay === void 0) { autoPlay = true; }
        if (playCompleteDispose === void 0) { playCompleteDispose = true; }
        return Manager.pool.create(Animation, Manager.path.getSkillPath("skill" + effectID), AnimationCVO.getCVO("" + effectID), loaderPriority, autoPlay, playCompleteDispose);
    };
    AnimationManager.prototype.createBombAnimation = function (bombIndex) {
        return Manager.pool.create(Animation, Manager.path.getSkillPath("bomb" + bombIndex), AnimationCVO.getCVO("bomb" + bombIndex), 0, true, true);
    };
    AnimationManager.prototype.createPanelBodyAnimation = function (id) {
        return Manager.pool.create(Animation, Manager.path.getPanelBodyPath("body" + id), AnimationCVO.getCVO("panelObj"), 0, true, false);
    };
    AnimationManager.prototype.createPanelPifengAnimation = function (id) {
        return Manager.pool.create(Animation, Manager.path.getPanelPifengPath("pifeng" + id), AnimationCVO.getCVO("panelObj"), 0, true, false);
    };
    AnimationManager.prototype.createPanelWeaponAnimation = function (id) {
        return Manager.pool.create(Animation, Manager.path.getPanelWeaponPath("weapon" + id), AnimationCVO.getCVO("panelObj"), 0, true, false);
    };
    AnimationManager.prototype.createPanelShenbingAnimation = function (id) {
        return Manager.pool.create(Animation, Manager.path.getPanelShenbingPath("shenbing" + id), AnimationCVO.getCVO("panelObj"), 0, false, false);
    };
    AnimationManager.prototype.createFaceAnimation = function (id) {
        return Manager.pool.create(Animation, Manager.path.getFacePath(id), AnimationCVO.getCVO("face" + id), 0, true, false);
    };
    AnimationManager.prototype.createEffectAnimation = function (name, loaderPriority, autoPlay, playCompleteDispose) {
        if (loaderPriority === void 0) { loaderPriority = 0; }
        if (autoPlay === void 0) { autoPlay = true; }
        if (playCompleteDispose === void 0) { playCompleteDispose = true; }
        return Manager.pool.create(Animation, Manager.path.getEffectPath(name), AnimationCVO.getCVO(name), loaderPriority, autoPlay, playCompleteDispose);
    };
    //经脉
    AnimationManager.prototype.createJingmaiAnimation = function (name) {
        return Manager.pool.create(Animation, Manager.path.getJingMaiPath(name), AnimationCVO.getCVO(name), 0, true, false);
    };
    //聚元
    AnimationManager.prototype.createJuyuanAnimation = function (name, autoPlay, playCompleteDispose) {
        if (autoPlay === void 0) { autoPlay = true; }
        if (playCompleteDispose === void 0) { playCompleteDispose = true; }
        return Manager.pool.create(Animation, Manager.path.getJuyuanPath(name), AnimationCVO.getCVO(name), 0, autoPlay, playCompleteDispose);
    };
    /**宠物外形展示 */
    AnimationManager.prototype.createPetAnimation = function (name) {
        return Manager.pool.create(Animation, Manager.path.getPetPath(name), AnimationCVO.getCVO(name), 0, true, false);
    };
    /**披风面版 */
    AnimationManager.prototype.createPanelCloakAnimation = function (id) {
        return Manager.pool.create(Animation, Manager.path.getPanelCloakPath("pifeng" + id), AnimationCVO.getCVO("panelObj"), 0, true, false);
    };
    /**命格面版 */
    AnimationManager.prototype.createPanelLifeGridAnimation = function (id, cvoId) {
        if (cvoId === void 0) { cvoId = "lifeGridPanelBody"; }
        return Manager.pool.create(Animation, Manager.path.getPanelLifeGridPath(id), AnimationCVO.getCVO(cvoId), 0, true, false);
    };
    /** 跨界面　*/
    AnimationManager.prototype.createPanelGlobalAnimation = function (file, cvoId) {
        var cvo = AnimationCVO.getCVO(cvoId);
        return Manager.pool.create(Animation, Manager.path.getPanelGlobalPath(file), cvo, 0, true, false);
    };
    return AnimationManager;
}());
__reflect(AnimationManager.prototype, "AnimationManager");
//# sourceMappingURL=AnimationManager.js.map