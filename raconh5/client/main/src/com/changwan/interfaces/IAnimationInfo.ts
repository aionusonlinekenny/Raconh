interface IAnimationInfo
{
    // updateAction(value:string):void;
    setActionStr(value:string):void;
    getAnimationType():number;
    getActionStr():string;
    getType(): number;
    // getAniID(): number;
    // getTopH(): number;
    dispatchEvent(e:egret.Event):boolean;
    isSceneRobot:boolean;
}