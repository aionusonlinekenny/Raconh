/**
 * pzx
 * 17.11.13
 * taskCVO
 */
var TaskCVO = /** @class */ (function () {
    function TaskCVO() {
    }
    TaskCVO.parse = function (bytes) {
        this._bytes = new egret.ByteArray();
        this._bytes.writeBytes(bytes);
        this._bytes.position = 0;
        Manager.render.add(TaskCVO.render, TaskCVO);
        var pageCount = this._bytes.readByte();
        this._count = this._bytes.readShort();
        // let tableCount:number = bytes.readShort();
        // var info:TaskCvoInfo;
        // for(let i:number = 0; i < tableCount; i++)
        // {
        //     info = new TaskCvoInfo();
        //     info.id =bytes.readInt();
        //     info.type = bytes.readByte();
        //     info.chapter = bytes.readShort();
        //     info.taskType = bytes.readByte();
        //     info.taskTypeValue = bytes.readUTF();
        //     info.taskParam = bytes.readInt();
        //     info.desc = bytes.readUTF();
        //     info.cond = bytes.readUTF();
        //     info.rewards = bytes.readUTF();
        //     info.next_main = bytes.readInt();
        //     info.effect = bytes.readByte();
        //     info.guideAfter = bytes.readShort();
        //     info.guideBefore = bytes.readShort();
        //     info.panelID = bytes.readUTF();
        //     info.verse = bytes.readShort();
        //     this._data[info.id] = info;
        // }
        // tableCount = bytes.readShort();
        // var item:TaskSectionCvoInfo;
        // for(let j:number = 0;j<tableCount;j++)
        // {
        //     item = new TaskSectionCvoInfo;
        //     item.id = bytes.readShort();
        //     //item.verse = bytes.readUTF();
        //     item.name = bytes.readUTF();
        //     item.taskCount = bytes.readByte();
        //     item.sceneId = bytes.readShort();
        //     this._verseList[item.id] = item;
        // }
        // StoryCVO.parse(bytes);
    };
    TaskCVO.render = function (interval) {
        if (this._step == 0) {
            var i = this._count;
            this._count = this._count - 200 < 0 ? 0 : this._count - 200;
            var info = void 0;
            while (i > this._count) {
                info = new TaskCvoInfo();
                info.id = this._bytes.readInt();
                info.type = this._bytes.readByte();
                info.chapter = this._bytes.readShort();
                info.taskType = this._bytes.readByte();
                info.taskTypeValue = this._bytes.readUTF();
                info.taskParam = this._bytes.readInt();
                info.desc = this._bytes.readUTF();
                info.cond = this._bytes.readUTF();
                info.rewards = this._bytes.readUTF();
                info.next_main = this._bytes.readInt();
                info.effect = this._bytes.readByte();
                info.guideAfter = this._bytes.readShort();
                info.guideBefore = this._bytes.readShort();
                info.panelID = this._bytes.readUTF();
                info.verse = this._bytes.readShort();
                this._data[info.id] = info;
                i--;
            }
            if (this._count == 0) {
                this._count = this._bytes.readShort();
                this._step = 1;
            }
        }
        else if (this._step == 1) {
            var item = void 0;
            var i = this._count;
            this._count = this._count - 300 < 0 ? 0 : this._count - 300;
            while (i > this._count) {
                item = new TaskSectionCvoInfo;
                item.id = this._bytes.readShort();
                item.name = this._bytes.readUTF();
                item.taskCount = this._bytes.readByte();
                item.sceneId = this._bytes.readShort();
                this._verseList[item.id] = item;
                i--;
            }
            if (this._count == 0) {
                this._step = 2;
            }
        }
        else if (this._step == 2) {
            StoryCVO.parse(this._bytes);
            Manager.render.remove(this.render, this);
            Manager.cvo.complete();
            this._bytes.clear();
            this._bytes = null;
        }
    };
    /**任务信息 @param 任务id*/
    TaskCVO.getinfo = function (id) {
        return this._data[id];
    };
    /**任务章节 @param 章节id*/
    TaskCVO.getVerselInfo = function (id) {
        return this._verseList[id];
    };
    /**任务章节 @param 任务id*/
    TaskCVO.getTaskVerselInfo = function (id) {
        var cvo;
        if (this._data[id]) {
            var vo = this._data[id];
            cvo = this._verseList[vo.chapter];
        }
        return cvo;
    };
    /**获得单个章节已完成的任务个数  :章节id*/
    TaskCVO.getVerselComplete = function (id) {
        var i = 0;
        if (this._verseList[id]) {
            var model = Manager.model.getTask();
            for (var key in this._data) {
                var cvo = this._data[key];
                if (model.getTaskIdComplete(cvo.id)) {
                    if (cvo.chapter == id) {
                        i++;
                    }
                }
                else {
                    break;
                }
            }
        }
        return i;
    };
    TaskCVO.data = function () {
        return this._data;
    };
    TaskCVO._data = {};
    TaskCVO._verseList = {};
    TaskCVO._step = 0;
    TaskCVO._count = 0;
    return TaskCVO;
}());
//# sourceMappingURL=TaskCVO.js.map