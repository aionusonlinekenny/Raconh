var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Direction = (function () {
    function Direction() {
    }
    Object.defineProperty(Direction, "directions", {
        /**
         * 数组里面的方向位置不要改，策划有脚本控制出生怪物的朝向 按下面的顺序
         */
        // public static get directions():string[]
        // {
        // 	return [this.DOWN, this.TOP, this.LEFT, this.RIGHT, this.LEFT_DOWN, this.LEFT_TOP, this.RIGHT_DOWN, this.RIGHT_TOP];
        // }
        get: function () {
            return [this.LEFT, this.RIGHT, this.LEFT_DOWN, this.LEFT_TOP, this.RIGHT_DOWN, this.RIGHT_TOP];
        },
        enumerable: true,
        configurable: true
    });
    Direction.getRandomDirection = function () {
        return this.directions[Math.floor(Math.random() * this.directions.length)];
    };
    /**
     * 两点取方向
     * @param p1 起始点
     * @param p2 目标点
     */
    Direction.getDir = function (x1, y1, x2, y2) {
        var angle = PointUtil.getAngle(x1, y1, x2, y2);
        while (angle < 0) {
            angle += 360;
        }
        angle = angle % 360;
        return this.getDirByAngle(angle);
    };
    Direction.getDirByAngle = function (angle) {
        if (angle > 22.5 && angle <= 90)
            return this.RIGHT_DOWN;
        else if (angle > 90 && angle <= 157.5)
            return this.LEFT_DOWN;
        else if (angle > 157.5 && angle <= 202.5)
            return this.LEFT;
        else if (angle > 202.5 && angle <= 270)
            return this.LEFT_TOP;
        else if (angle > 270 && angle <= 337.5)
            return this.RIGHT_TOP;
        return this.RIGHT;
    };
    Direction.getAngleByDir = function (dir) {
        if (dir == Direction.RIGHT)
            return 0;
        else if (dir == Direction.RIGHT_DOWN)
            return 45;
        else if (dir == Direction.DOWN)
            return 90;
        else if (dir == Direction.LEFT_DOWN)
            return 135;
        else if (dir == Direction.LEFT)
            return 180;
        else if (dir == Direction.LEFT_TOP)
            return 225;
        else if (dir == Direction.TOP)
            return 270;
        else if (dir == Direction.RIGHT_TOP)
            return 315;
        return 0;
    };
    Direction.isLeft = function (dir) {
        return (dir == this.LEFT_TOP || dir == this.LEFT || dir == this.LEFT_DOWN);
    };
    Direction.isTop = function (dir) {
        return (dir == this.LEFT_TOP || dir == this.TOP || dir == this.RIGHT_TOP);
    };
    Direction.getResGroupShortName = function (dir) {
        switch (dir) {
            case this.TOP:
                return 0;
            case this.RIGHT_TOP:
            case this.LEFT_TOP:
                return 1;
            case this.RIGHT:
            case this.LEFT:
                return 2;
            case this.RIGHT_DOWN:
            case this.LEFT_DOWN:
                return 3;
            case this.DOWN:
                return 4;
        }
        return 0;
    };
    Direction.TOP = "top";
    Direction.DOWN = "down";
    Direction.LEFT = "left";
    Direction.RIGHT = "right";
    Direction.LEFT_TOP = "leftTop";
    Direction.RIGHT_TOP = "rightTop";
    Direction.LEFT_DOWN = "leftDown";
    Direction.RIGHT_DOWN = "rightDown";
    return Direction;
}());
__reflect(Direction.prototype, "Direction");
//# sourceMappingURL=Direction.js.map