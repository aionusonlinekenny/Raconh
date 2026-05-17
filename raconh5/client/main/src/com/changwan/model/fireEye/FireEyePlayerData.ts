/**
 * 火眼金睛玩家数据
 * liangyan
 * create 2018-03-26
*/
class FireEyePlayerData
{
    public constructor()
    {
        this.targets = [];
    }
    
    /**玩家id */
    public id:number;
    /**积分 */
    public score:number;
    /**目标类型数据 */
    public targets:Array<any>;
    /**连胜数 */
    public winTimes:number;

    /**当前进度百分比 */
    public get rate():number
    {
        let sum = 0;
        let findNum = 0;
        let levelData = Manager.model.getFireEye().nextInfo.datas;
        let len = levelData ? levelData.length : 0;
        let targetLen = this.targets ? this.targets.length : 0;
        for(let i = 0; i < len; i++)
        {
            sum += levelData[i].num;
        }
        for(let j = 0; j < targetLen; j++)
        {
            findNum += this.targets[j].num;
        }
        return Math.round(findNum / sum * 100);
    }
}