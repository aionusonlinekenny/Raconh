/**
 *author Anydo
 *create 2018-4-10
 *description 
*/
class SoundObject
{
    private _loops:number;
    private _playFlag:number;//1停止 2暂停 3播放
    private _soundUrl:string;
    private _soundType:string;
    private _startTime:number;
    private _isLoaded:boolean;
    private _sound:egret.Sound;
    private _soundChannel:egret.SoundChannel;

    public path:PathInfo;

    public constructor(path:PathInfo)
	{
        this.path = path;
		this._startTime = 0;
        this._loops = 1;
        this._playFlag = 0;
        this._isLoaded = false;
	}

    public load(soundType:string, soundUrl:string):void
    {
        if (this._soundType == soundType && soundUrl == this._soundUrl) return;
        this._soundType = soundType;
        this._soundUrl = soundUrl;
        if (this._sound == null)
        {
            try
            {
                this._sound = new egret.Sound();
                this._sound.type = this._soundType;
                this._sound.addEventListener(egret.Event.COMPLETE, this.soundLoadComplete, this);
                this._sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.soundLoadError, this);
                this._sound.load(this._soundUrl);
            }
            catch (e)
            {
                console.log("声音音频问题！");
            }
        }
    }

    public play(loops:number=0):void
    {
        this._playFlag = 3;
        this._loops = loops;
        this.startPlay();
    }

    public continue():void
    {
        if (!this._isLoaded) return;
        this.stopChannel();
        this._playFlag = 3;
        this.startPlay();
    }
    
    public pause():void
    {
        this._playFlag = 2;
        this._startTime = (this._soundChannel != null) ? this._soundChannel.position : 0;
        if (this._isLoaded && (this._sound.length - this._startTime) < 10)
        {
            this._startTime = 0;
        }
        this.stopChannel();
    }

    public stop():void
    {
        this.stopChannel();
        this._playFlag = 1;
        this._startTime = 0;
    }

    private soundLoadComplete(e:egret.Event):void
    {
        this._isLoaded = true;
        if (this._playFlag == 3)
        {
            this.startPlay();
        }
    }

    private soundLoadError(e:egret.IOErrorEvent):void
    {
        Trace.error("Sound Error:", this._soundUrl);
        this._isLoaded = false;
    }

    private startPlay():void
    {
        if (!this._isLoaded) return;
        if (this._soundChannel == null)
        {
            this._soundChannel = this._sound.play(this._startTime, this._loops);
            this._soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
        }
    }

    private stopChannel():void
    {
        if (this._soundChannel != null)
        {
            this._soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
            try
            {
                this._soundChannel.stop();
            }
            catch (e)
            {
                Trace.error("声音停止报错：", e);
            }
            this._soundChannel = null;
        }
    }

    private onPlayComplete(e:egret.Event):void
    {
        this.stopChannel();
        this._playFlag = 1;
        this._startTime = 0;
    }
}