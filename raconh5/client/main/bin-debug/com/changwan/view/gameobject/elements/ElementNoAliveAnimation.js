var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ElementNoAliveAnimation = (function (_super) {
    __extends(ElementNoAliveAnimation, _super);
    function ElementNoAliveAnimation() {
        return _super.call(this) || this;
    }
    ElementNoAliveAnimation.prototype.drawNPC = function () {
        var info = this._gameObject.info;
        this._animation = Manager.animation.createNPCAnimation("" + info.cvo.url);
        this._gameObject.addChild(this._animation);
        this._animation.scaleX = info.cvo.flipH ? -1 : 1;
        this._animation.x = -400 + info.cvo.offsetX;
        this._animation.y = -400 + info.cvo.offsetY;
    };
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
    ElementNoAliveAnimation.prototype.drawSceneStageEffect = function () {
        var info = this._gameObject.info;
        this._animation = Manager.animation.createSceneEffAnimation("" + info.cvo.resID, 0, true, false);
        if (info.cvo.type == SceneEffCVO.TYPE_TOWER || info.cvo.type == SceneEffCVO.TYPE_EXP_STATUE
            || info.cvo.type == SceneEffCVO.TYPE_BRIDGE || info.cvo.type == SceneEffCVO.TYPE_DRAGON) {
            this._animation.gotoAndStop(1);
        }
        this._gameObject.addChild(this._animation);
        this._animation.scaleX = info.cvo.flipH ? -1 : 1;
        this._animation.x = info.cvo.offsetX;
        this._animation.y = info.cvo.offsetY;
        if (!info.cvo.flipH)
            this._animation.scaleX = this._animation.scaleY = info.cvo.scale;
    };
    ElementNoAliveAnimation.prototype.play = function () {
        if (this._animation)
            this._animation.play();
    };
    ElementNoAliveAnimation.prototype.drawJumpPoint = function () {
        var info = this._gameObject.info;
        this._animation = Manager.animation.createJumpPointAnimation(String(info.cvo.resID));
        this._gameObject.addChild(this._animation);
    };
    return ElementNoAliveAnimation;
}(ElementBaseAnimation));
__reflect(ElementNoAliveAnimation.prototype, "ElementNoAliveAnimation");
//# sourceMappingURL=ElementNoAliveAnimation.js.map