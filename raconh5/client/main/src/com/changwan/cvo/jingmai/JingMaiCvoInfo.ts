/**
 * pzx 
 * 17.11.18
 * 经脉表信息
 */
class JingMaiCvoInfo
{
    public id:number;
      /**类型，1 冲穴，2突破*/
    public type:number;
    /**当前等级*/
    public level:number;
    public name:string;
    /**层数*/
    public cond:number;
    /**消耗*/
    public quantity:string;
    /**属性*/
    public attr:string;
/**底图资源ID  {职业，底图|} */
    public source_id:string;
/**位置 */
    public pose:number;
/**经脉类型  */
    public jingmaiType:number;
    public gai:GainLossVO;

    public constructor()
    {
      
    }
}
