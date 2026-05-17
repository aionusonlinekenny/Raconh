/**
 * drq 
 * 签到
 * 2018.3.21
 */
class QiandaoView extends UIComponent
{
	private _back:eui.Image;
	private _totalNum:Label;
	private _repairNum:Label;
	private _totalNum1:number;
	private _repairNum1:number;
	private _vScroll:egret.ScrollView;
	private _cvo1:Array<QiandaoCVO>;
	private _cvo2:Array<QiandaoGainCVO>;

	private _bottomBack:eui.Image;
	private _bottomBack2:eui.Image;
	private _itemList:QiandaoItem[] = [];
	private _boxList:QiandaoSceduleItem[] = []
	private _currentDay:number;
	private _today:boolean = false;

	public constructor() 
	{
		super();
		this.skinName = Manager.path.getSkinName("qiandao","QiandaoViewSkins");
		this._currentDay = Manager.model.getQiandao().getToday();
		this.touchChildren = true;
	}

	protected configUI():void
	{
		super.configUI();
		this.createScrollView();//创建签到item
		this.createBottom();//创建阶段item
		this.infoUpdate();//根据后端数据，初始化签到item和阶段item
	}

	//事件
	protected addEvent():void
	{
		super.addEvent();
		Manager.model.getQiandao().addEventListener(QiandaoEvent.QIANDAO_SIGN_UPDATE,this.signUpdate,this);
	}
	protected removeEvent():void
	{
		super.removeEvent();
		Manager.model.getQiandao().removeEventListener(QiandaoEvent.QIANDAO_SIGN_UPDATE,this.signUpdate,this);
	}

	private createScrollView():void
	{
		this._cvo1 = QiandaoCVO.getCvo();
		let row = Math.ceil(this._cvo1.length/4);
		let count = 0;

		this._vScroll = new egret.ScrollView();
		this._vScroll.x = this._back.x;
		this._vScroll.y = this._back.y + this._back.height + 15;
		this._vScroll.width = this._back.width;
		this._vScroll.height = 660;
		this._vScroll.horizontalScrollPolicy = "off";
		this.addChild(this._vScroll);
		this._vScroll.scrollSpeed = 0.01;
		let myGroup = new eui.Group();
		myGroup.touchChildren = true;
		for(let i=0;i<row;i++)
		{
			let col;
			//(i==(row-1))?col=this._cvo1.length%4:col=4;
			if(i==(row-1))//最后一行?
            {
                this._cvo1.length%4==0?col=4:col=this._cvo1.length%4;
            }else{
                col=4;
            }
			for(let j=0;j<col;j++)
			{
				let item = Manager.pool.create(QiandaoItem);
				this._itemList.push(item);
				myGroup.addChild(item);
				item.x = j * (item.width + 16) + 5;
				item.y = i * (item.height + 16) + 5;
				item._cvo = this._cvo1[count];
				item._id = count+1;
				let title =  LangCVO.getContent("qiandao"+item._id);
				if(item._id < this._currentDay)
				{
					item.setProperty(false,title,false,true,this._cvo1[count].gain);
				}else{
					item.setProperty(false,title,false,false,this._cvo1[count].gain);
				}
				if(item._id == this._currentDay)
				{
					item.setProperty(true,title,false,false,this._cvo1[count].gain);
				}
				count++;
			}
		}
		this._vScroll.setContent(myGroup);
		//设置_vScroll显示位置
		let num:number = parseInt((this._currentDay - 1)/4+"");
		num = num>5?5:num;
		this._vScroll.scrollTop = num*212.5;
	}

	private createBottom():void
	{
		this._cvo2 = QiandaoGainCVO.getCvos();
		let sItem:QiandaoSceduleItem;
		for(var i:number=0; i<4; i++)
		{
			sItem = new QiandaoSceduleItem(this._cvo2[i],i==0 ? 0 : this._cvo2[i-1].day);
            sItem.x = this._bottomBack2.x + i * 156;
            sItem.y = this._bottomBack2.y;//989;
            this.addChild(sItem);
            this._boxList.push(sItem);
		}
	}

	private infoUpdate():void
	{
		//初始化每日签到
		let dailyList:any[] =  Manager.model.getQiandao().getDailyList();

		this._totalNum1 = dailyList.length;

		for(let i=0;i<dailyList.length;i++)
		{
			let dailyArr:number[] = dailyList[i];
			let count = dailyArr[0]-1;
			if(dailyArr[1] == 1)//已签到
			{
				if(dailyArr[0] == this._currentDay){this._today = true}
				this._itemList[count].setProperty(false,"",true,false,"");
				this._itemList[count].touchEnabled = false;
			}else if(dailyArr[1] == 2)//已补签
			{
				this._itemList[count].setProperty(false,"",true,true,"");
				this._itemList[count].touchEnabled = false;
			}
		}
		//初始化累计签到、可补签次数
		if(this._today)
		{
			this._repairNum1 = this._currentDay-dailyList.length;
		}else{
			this._repairNum1 = this._currentDay-1-dailyList.length;
		}
		this._totalNum.text = ""+this._totalNum1;
		this._repairNum.text = ""+this._repairNum1;
	}

	private signUpdate():void
	{
		let arr:number[] = Manager.model.getQiandao().getBuQian();
		let count = arr[0]-1;
		switch(arr[1])
		{
			case 1://签到
				this._itemList[count].setProperty(false,"",true,false,"");
				this._itemList[count].touchEnabled= false;
				this._totalNum1 = this._totalNum1 + 1;
				this._totalNum.text = ""+this._totalNum1;
				Manager.model.getQiandao().setDailyList(arr[0],1);
				break;
			case 2://补签
				this._itemList[count].setProperty(false,"",true,true,"");
				this._itemList[count].touchEnabled= false;
				this._totalNum1 = this._totalNum1 + 1;
				this._totalNum.text = ""+this._totalNum1;
				this._repairNum1 = this._repairNum1 - 1;
				this._repairNum.text = ""+this._repairNum1;
				Manager.model.getQiandao().setDailyList(arr[0],2);
				break;
		}
		
	}

	public dispose():void
	{
		for(let i=0;i<this._itemList.length;i++)
		{
			Manager.pool.push(this._itemList[i]);
		}
		super.dispose();
		ObjectUtil.removes(this._back,this._vScroll,this._bottomBack,this._bottomBack2);
		ObjectUtil.disposes(this._totalNum,this._repairNum);
		this._back = null;
		this._totalNum = null;
		this._repairNum = null;
		this._totalNum1 = null;
		this._repairNum1 = null;
		this._vScroll = null;
		this._cvo1 = null;
		this._cvo2 = null;

		this._bottomBack = null;
		this._bottomBack2 = null;
		this._itemList = null;
		this._boxList = null;
		this. _currentDay = null;
		this._today = null;
	}
}