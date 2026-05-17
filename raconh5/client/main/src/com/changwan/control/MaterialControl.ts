class MaterialControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.MATERIAL_COPY_INFO, MaterialCopyInfoCMD);
        Manager.socket.addCMD(Protocol.MATERIAL_COPY_AWARD, MaterialCopyAwardCMD);
        Manager.socket.addCMD(Protocol.MATERIAL_COPY_MAKE_BOX, MaterialCopyMakeBoxCMD);
        Manager.socket.addCMD(Protocol.MATERIAL_COPY_COLLECTION, MaterialCopyCollectionCMD);
        Manager.socket.addCMD(Protocol.MATERIAL_COPY_ALL_INFO_UPDATE, MaterialCopyAllInfoUpdateCMD);
        Manager.socket.addCMD(Protocol.MATERIAL_COPY_INFO_UPDATE, MaterialCopyInfoUpdateCMD);
        Manager.socket.addCMD(Protocol.COPY_WARNING_TIP, MaterialCopyWarningCMD);
    }

    public getAwardCell():void
    {
        let cmd = Manager.socket.getCMD(Protocol.MATERIAL_COPY_INFO) as MaterialCopyInfoCMD;
        cmd.send();
    }

    public getAward(awardId:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.MATERIAL_COPY_AWARD) as MaterialCopyAwardCMD;
        cmd.awardId = awardId;
        cmd.send();
    }

    public queryCollection():void
    {
        let cmd = Manager.socket.getCMD(Protocol.MATERIAL_COPY_COLLECTION) as MaterialCopyCollectionCMD;
        cmd.send();
    }

    public addMaterialEffect(attack:MonsterGameObjectInfo):void
	{
		let effectName:string = "";
		let localX:number;
		let localY:number;
		let skewY:number = 0;
        if(attack.getDirection().indexOf("right") != -1)
		{
            effectName = "long_eff_right";
			localX = attack.x - 420;
			localY = attack.y - 400;
			skewY = 0;
		}
        else if(attack.getDirection().indexOf("left") != -1)
		{
            effectName = "long_eff_right";
			localX = attack.x + 420;
			localY = attack.y - 400;
			skewY = 180;
		}

		let fireLongEffect:Animation = Manager.animation.createEffectAnimation(effectName, 0, true, true);
		fireLongEffect.x = localX;
		fireLongEffect.y = localY;
		fireLongEffect.skewY = skewY;
        Manager.layer.addChildToNodeByType(fireLongEffect, fireLongEffect.url, 1)
	}
}