/**
 *author Anydo
 *create 2017-12-4
 *description 
*/
class JumpManager
{
    public curInfo:JumpPointGameObjectInfo;

    public jump(targets:egret.Point[], complete?:Function):void
    {
        if(!this.canJump(false)) return;
        this.beforJump();
        
        Manager.model.self.updateIsingState(BodyStateManger.ISING_JUMP, true);
        Manager.model.self.dispatchJump(targets, complete);
    }

    private beforJump():void
    {
        Manager.model.self.stopWalk();
    }

    public canJump(showMsg:boolean = true):boolean
    {
        if(!Manager.model.getMap().mapDataLoadComplete) return false;
        let self:SelfGameObjectInfo = Manager.model.self;
        if(!self.getAliveFlag()) return false;
        return true;
    }

    public canJumpBefore(showMsg:boolean = false):boolean
    {
        if(!Manager.model.getMap().mapDataLoadComplete) return false;
        let self:SelfGameObjectInfo = Manager.model.self;
        if(!self.getAliveFlag()) return false;
        if(self.isBuffState(BodyStateManger.BUFF_XUAN_YUN)) 
        {
            if(showMsg) FloatTips.addTips("????");
            return false;
        }
        if(self.isBuffState(BodyStateManger.BUFF_CHAO_FENG)) 
        {
            if(showMsg) FloatTips.addTips("????");
            return false;	
        }
        return true;
    }
    
    public finishJump():void
    {
        Manager.model.self.finishJump();
        if(!Manager.model.getAuto().autoHook) Manager.walk.gotoMapFind();
        if(this.curInfo && this.curInfo.cvo)
        {
            let type = 0;
            switch(this.curInfo.cvo.scriptType)
            {
                case RookieConst.SLIDE:
                    type = WalkType.SLIDE;
                    break;
                case RookieConst.KITE:
                    type = WalkType.KITE;
                    break;
                case RookieConst.WATER:
                    type = WalkType.WATER;
                default:
                    break;
            }
            this.curInfo.playRookieAction(type);
            this.curInfo = null;
        }
    }
}