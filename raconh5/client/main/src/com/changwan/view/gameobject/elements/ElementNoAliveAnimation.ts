class ElementNoAliveAnimation extends ElementBaseAnimation
{
    public constructor()
    {
        super();
    }

    public drawNPC():void
    {
        var info:NPCGameObjectInfo = this._gameObject.info as NPCGameObjectInfo;
        this._animation = Manager.animation.createNPCAnimation("" + info.cvo.url);
        this._gameObject.addChild(this._animation as Animation);
        (this._animation as Animation).scaleX = info.cvo.flipH ? -1 : 1;
        (this._animation as Animation).x = -400 + info.cvo.offsetX;
        (this._animation as Animation).y = -400 + info.cvo.offsetY;
    }
    
    // public function drawDoor():void
    // {
    //     this._animation2 = AnimationManager.createAnimation("door",ResourcePriority.getPriority(ResourcePriority.WORLD_MINI_SCENE_PIC))
    //     _animation2.addEventListener(LoaderEvent.COMPLETE,__loadComplete);
    //     this._gameObject.addChild(_animation2 as Sprite);
    //     (this._animation2 as Sprite).scaleX = (this._gameObject.info as DoorGameObjectInfo).cvo.isToLeft ? -1 : 1;
    //     callLaterCreateDefault(true);
    // }
    
    // public function drawCollect():void
    // {
    //     var info:CollectGameObjectInfo = this._gameObject.info as CollectGameObjectInfo;
    //     this._animation2 = AnimationManager.createCollectAnimation("" + info.cvo.animationID);
    //     this._animation2.addEventListener(LoaderEvent.COMPLETE,__loadComplete);
    //     this._gameObject.addChild(this._animation2 as Sprite);
    //     (this._animation2 as MonoBehaviour).move(-400,-400);
    //     callLaterCreateDefault(true);
    // }
    
    public drawSceneStageEffect():void
    {
        var info = this._gameObject.info as SceneEffGameObjectInfo;
        this._animation = Manager.animation.createSceneEffAnimation("" + info.cvo.resID, 0, true, false);
        if(info.cvo.type == SceneEffCVO.TYPE_TOWER || info.cvo.type == SceneEffCVO.TYPE_EXP_STATUE
         || info.cvo.type == SceneEffCVO.TYPE_BRIDGE || info.cvo.type == SceneEffCVO.TYPE_DRAGON)
        {
            (this._animation as Animation).gotoAndStop(1);
        }
        this._gameObject.addChild(this._animation as Animation);
        (this._animation as Animation).scaleX = info.cvo.flipH ? -1 : 1;
        (this._animation as Animation).x = info.cvo.offsetX;
        (this._animation as Animation).y = info.cvo.offsetY;
        if(!info.cvo.flipH) (this._animation as Animation).scaleX = (this._animation as Animation).scaleY = info.cvo.scale;
    }

    public play():void
    {
        if(this._animation) (this._animation as Animation).play();
    }
    
    public drawJumpPoint():void
    {
        var info:JumpPointGameObjectInfo = this._gameObject.info as JumpPointGameObjectInfo;
        this._animation = Manager.animation.createJumpPointAnimation(String(info.cvo.resID));
        this._gameObject.addChild(this._animation as Animation);
    }
}