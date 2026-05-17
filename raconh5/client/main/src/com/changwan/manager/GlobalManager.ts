class GlobalManager
{
    /** 60帧频每帧毫秒数 */
    public FRAME_TIME_60:number;

    /** 帧时 */
    public FRAME_TIME:number;

    /** 帧时 */
    public ANI_INTERVAL:number;

    /** 需要重启游戏 */
    public gameReOpen: boolean;

    /** 心跳包发送间隔时间 */
    public heartBeatTime: number;

    /** 主界面 */
    public gameMain:Main;

    /** 玩家数据 */
    public roleInfo:RoleInfo;

    /** 进入后台 */
    public lifecyclePause:boolean;

    public constructor(main:Main)
	{
        this.gameMain = main;
        this.FRAME_TIME = 1000 / this.gameMain.stage.frameRate;
        this.ANI_INTERVAL = 33;
        this.FRAME_TIME_60 = 1000/60;
        this.gameReOpen = false;
        this.lifecyclePause = false;
        this.heartBeatTime = 60* 1000;
    }
}