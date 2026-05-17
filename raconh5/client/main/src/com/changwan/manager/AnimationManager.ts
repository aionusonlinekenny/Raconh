class AnimationManager
{
    public createGameOjbectAnimation(info:IAnimationInfo, animationType:number=0):ShowAnimation
    {
        let type:number = (animationType == 0) ? info.getAnimationType() : animationType;
        if(type == AnimationType.PLAYER) return Manager.pool.create(PlayerAnimation, info as PlayerGameObjectInfo);
        else if(type == AnimationType.MONSTER) return Manager.pool.create(MonsterAnimation, info as MonsterGameObjectInfo);
        else if(type == AnimationType.PET) return Manager.pool.create(PetAnimation, info as PetGameObjectInfo);
        return null;
    }
    /**场景特效 */
    public createSceneEffAnimation(id:string, loaderPriority:number, autoPlay:boolean=true, playCompleteDispose:boolean=true):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getSceneEffPath(id), AnimationCVO.getCVO("sceneEff"+id), loaderPriority, autoPlay, playCompleteDispose);
    }

    public createNPCAnimation(id:string):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getNPCPath("npc"+id), AnimationCVO.getCVO("npc"), 0, true, false);
    }

    public createJumpPointAnimation(id:string):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getJumpPointPath("jumppoint"+id), AnimationCVO.getCVO("jumppoint"), 0, true, false);
    }

    public createSkillAnimation(effectID:number, loaderPriority:number=0, autoPlay:boolean=true, playCompleteDispose:boolean=true):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getSkillPath("skill"+effectID), AnimationCVO.getCVO("" + effectID), loaderPriority, autoPlay, playCompleteDispose);
    }

    public createBombAnimation(bombIndex:number):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getSkillPath("bomb"+bombIndex), AnimationCVO.getCVO("bomb"+bombIndex), 0, true, true);
    }

    public createPanelBodyAnimation(id:string):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getPanelBodyPath("body"+id), AnimationCVO.getCVO("panelObj"), 0, true, false);
    }

    public createPanelPifengAnimation(id:string):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getPanelPifengPath("pifeng"+id), AnimationCVO.getCVO("panelObj"), 0, true, false);
    }

    public createPanelWeaponAnimation(id:string):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getPanelWeaponPath("weapon"+id), AnimationCVO.getCVO("panelObj"), 0, true, false);
    }

    public createPanelShenbingAnimation(id:string):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getPanelShenbingPath("shenbing"+id), AnimationCVO.getCVO("panelObj"), 0, false, false);
    }
    
    public createFaceAnimation(id:string):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getFacePath(id), AnimationCVO.getCVO("face" + id), 0, true, false);
    }

    public createEffectAnimation(name:string, loaderPriority:number=0, autoPlay:boolean=true, playCompleteDispose:boolean=true):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getEffectPath(name), AnimationCVO.getCVO(name), loaderPriority, autoPlay, playCompleteDispose);
    }
    //经脉
     public createJingmaiAnimation(name:string):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getJingMaiPath(name), AnimationCVO.getCVO(name), 0, true, false);
    }
    //聚元
    public createJuyuanAnimation(name:string, autoPlay:boolean=true, playCompleteDispose:boolean=true):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getJuyuanPath(name), AnimationCVO.getCVO(name), 0, autoPlay, playCompleteDispose);
    }
    /**宠物外形展示 */
     public createPetAnimation(name:string):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getPetPath(name), AnimationCVO.getCVO(name), 0, true, false);
    }
    /**披风面版 */
    public createPanelCloakAnimation(id:string):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getPanelCloakPath("pifeng"+id), AnimationCVO.getCVO("panelObj"), 0, true, false);
    }
    /**命格面版 */
    public createPanelLifeGridAnimation(id:string,cvoId:string = "lifeGridPanelBody"):Animation
    {
        return Manager.pool.create(Animation, Manager.path.getPanelLifeGridPath(id), AnimationCVO.getCVO(cvoId), 0, true, false);
    }
    /** 跨界面　*/
    public createPanelGlobalAnimation(file:string,cvoId:string):Animation
    {
        let cvo = AnimationCVO.getCVO(cvoId);
        return Manager.pool.create(Animation, Manager.path.getPanelGlobalPath(file), cvo, 0, true, false);
    }
}