/**
 *author Anydo
 *create 2017-12-1
 *description 
*/
class WalkManager
{
	public findInfo:MapFindInfo;

    /** 与NPC对话的最大距离 */		
	public static NPC_TALK_MAX_DISTANCE:number = 150;  
    
    public moveTo(pos:egret.Point, complete:Function = null, completeTarget:any = null, sceneID:number = -1):void
    {
        if(!Manager.model.self.can(CanType.CAN_WALK, false)) return;
        if(sceneID != -1 && sceneID != Manager.model.getMap().getId())
        {
            this.findInfo = Manager.pool.create(MapFindInfo, pos, null);
            Manager.control.getMap().cmdEnterMap(sceneID);
        }
        else
        {
            this.move(pos, 0, complete, completeTarget);
        }
    }

    public moveToNPC(cvo:NpcCVO):void
    {
        if(!Manager.model.self.can(CanType.CAN_WALK, false)) return;
        let info:NPCGameObjectInfo = Manager.model.getGameobject().getGameObject(cvo.id) as NPCGameObjectInfo;
        let self:SelfGameObjectInfo = Manager.model.self;
        this._tempNpcId = cvo.id;
        console.log("a", this._tempNpcId);
        if(egret.Point.distance(cvo.position, new egret.Point(self.x, self.y)) <= WalkManager.NPC_TALK_MAX_DISTANCE && cvo.mapID == Manager.model.getMap().getId())
        {
            this.moveToNpcComplete();
        }
        else
        {
            if(cvo.mapID != Manager.model.getMap().getId())
            {
                this.findInfo = Manager.pool.create(MapFindInfo, null, cvo);
                Manager.control.getMap().cmdEnterMap(cvo.mapID);
            }
            else
            {
                this.findInfo = Manager.pool.create(MapFindInfo, null, cvo);
                this.move(cvo.position, WalkManager.NPC_TALK_MAX_DISTANCE, this.moveToNpcComplete, this);
            }
        }
        
        // function complete(cvo:NpcCVO):void
        // {
        //     if(Manager.walk.findInfo && (Manager.walk.findInfo.cvo instanceof NpcCVO)) Manager.walk.cancelMapFind();
        //     let dir:string = Direction.getDir(Manager.model.self.x, Manager.model.self.y, cvo.position.x, cvo.position.y);
        //     Manager.model.self.setDirection(dir);

        //     Manager.link.linkStr(cvo.link);
        // }
    }

    private _tempNpcId:number;
    private moveToNpcComplete():void
    {
        if(Manager.walk.findInfo && (Manager.walk.findInfo.cvo instanceof NpcCVO)) Manager.walk.cancelMapFind();
        console.log("b",this._tempNpcId);
        let cvo:NpcCVO = NpcCVO.getCVO(this._tempNpcId);
        let dir:string = Direction.getDir(Manager.model.self.x, Manager.model.self.y, cvo.position.x, cvo.position.y);
        Manager.model.self.setDirection(dir);
        Manager.link.linkStr(cvo.link);
    }

    private move(pos:egret.Point, processDis:number=0, complete:Function = null, completeTarget:any = null):void
    {
        let self:SelfGameObjectInfo = Manager.model.self;
        if(self.x == pos.x && self.y == pos.y && complete != null) complete.call(completeTarget);
        else
        {
            let path:Array<egret.Point> = Manager.model.getMap().findPath.findpath(new egret.Point(self.x,self.y), pos);
            if(processDis > 0) path = PathUtils.processPath(path, processDis);
            
            if(path != null && path.length > 0)
            {
                self.walk(path, WalkType.WALK, complete, completeTarget);
            }
        }
    }

    /** 跳跃、跨地图后继续寻路 */
    public gotoMapFind():void
    {
        if(this.findInfo != null)
        {
            if(this.findInfo.cvo instanceof NpcCVO)
            {
                let npc:NpcCVO = this.findInfo.cvo as NpcCVO;
                this.cancelMapFind();
                this.moveToNPC(npc);
            }
            else if(this.findInfo.pos != null)
            {
                let pos:egret.Point = this.findInfo.pos;
                this.cancelMapFind();
                this.moveTo(pos);
            }
        }
    }
    
    /**
     * 取消MapFindInfo数据
     */		
    public cancelMapFind():void
    {
        if(this.findInfo != null)
        {
            Manager.pool.push(this.findInfo);
            this.findInfo = null;
        }
    }
}