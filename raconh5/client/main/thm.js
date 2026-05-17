var ButtonSkin=(function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["labelDisplay","iconDisplay"];
		},
		enumerable: true,
		configurable: true
	});
	return ButtonSkin;
})(eui.Skin);var CheckBoxSkin=(function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","resource/CheckBox/checkbox_select_up.png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","resource/CheckBox/checkbox_select_down.png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","resource/CheckBox/checkbox_select_disabled.png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "resource/CheckBox/checkbox_unselect.png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["labelDisplay"];
		},
		enumerable: true,
		configurable: true
	});
	return CheckBoxSkin;
})(eui.Skin);var HScrollBarSkin=(function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["thumb"];
		},
		enumerable: true,
		configurable: true
	});
	return HScrollBarSkin;
})(eui.Skin);var HSliderSkin=(function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["track","thumb"];
		},
		enumerable: true,
		configurable: true
	});
	return HSliderSkin;
})(eui.Skin);var ItemRendererSkin=(function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text")
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["labelDisplay"];
		},
		enumerable: true,
		configurable: true
	});
	return ItemRendererSkin;
})(eui.Skin);var PanelSkin=(function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["titleDisplay","moveArea","closeButton"];
		},
		enumerable: true,
		configurable: true
	});
	return PanelSkin;
})(eui.Skin);var ProgressBarSkin=(function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["thumb","labelDisplay"];
		},
		enumerable: true,
		configurable: true
	});
	return ProgressBarSkin;
})(eui.Skin);var RadioButtonSkin=(function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["labelDisplay"];
		},
		enumerable: true,
		configurable: true
	});
	return RadioButtonSkin;
})(eui.Skin);var ScrollerSkin=(function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["horizontalScrollBar","verticalScrollBar"];
		},
		enumerable: true,
		configurable: true
	});
	return ScrollerSkin;
})(eui.Skin);var TextInputSkin=(function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(0,0,1,1);
		t.source = "inputBg_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["textDisplay","promptDisplay"];
		},
		enumerable: true,
		configurable: true
	});
	return TextInputSkin;
})(eui.Skin);var ToggleSwitchSkin=(function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return [];
		},
		enumerable: true,
		configurable: true
	});
	return ToggleSwitchSkin;
})(eui.Skin);var VScrollBarSkin=(function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "";
		t.width = 8;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["thumb"];
		},
		enumerable: true,
		configurable: true
	});
	return VScrollBarSkin;
})(eui.Skin);var VSliderSkin=(function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["track","thumb"];
		},
		enumerable: true,
		configurable: true
	});
	return VSliderSkin;
})(eui.Skin);var ActBaseIconSkin=(function (_super) {
	__extends(ActBaseIconSkin, _super);
	function ActBaseIconSkin() {
		_super.call(this);
		
		this.height = 140;
		this.width = 117;
		this.elementsContent = [this._icon_i(),this._txt_i(),this._tipsIcon_i()];
	}
	var _proto = ActBaseIconSkin.prototype;

	_proto._icon_i = function () {
		var t = new BitmapRemote();
		this._icon = t;
		t.height = 118;
		t.percentWidth = 100;
		return t;
	};
	_proto._txt_i = function () {
		var t = new Label();
		this._txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 24;
		t.size = 22;
		t.text = "";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 106;
		return t;
	};
	_proto._tipsIcon_i = function () {
		var t = new eui.Image();
		this._tipsIcon = t;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.x = 70;
		t.y = 10;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_icon","_txt","_tipsIcon"];
		},
		enumerable: true,
		configurable: true
	});
	return ActBaseIconSkin;
})(eui.Skin);var TopInfoSkin=(function (_super) {
	__extends(TopInfoSkin, _super);
	var TopInfoSkin$Skin1 = 	(function (_super) {
		__extends(TopInfoSkin$Skin1, _super);
		function TopInfoSkin$Skin1() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","main_topPay_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TopInfoSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "main_topPay_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return TopInfoSkin$Skin1;
	})(eui.Skin);

	function TopInfoSkin() {
		_super.call(this);
		
		this.height = 57;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.resImg_i(),this._Image4_i(),this.coinValue_i(),this.goldValue_i(),this.nameValue_i(),this._payBtn_i()];
	}
	var _proto = TopInfoSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 62;
		t.scale9Grid = new egret.Rectangle(9,6,56,5);
		t.source = "common_topBg_png";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "common_top_itemBg_png";
		t.verticalCenter = 0;
		t.x = 382;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "common_top_itemBg_png";
		t.verticalCenter = 0;
		t.x = 524;
		return t;
	};
	_proto.resImg_i = function () {
		var t = new eui.Image();
		this.resImg = t;
		t.source = "playRes_coin_54_png";
		t.x = 345;
		t.y = 1;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "playRes_gold_54_png";
		t.x = 488;
		t.y = 0;
		return t;
	};
	_proto.coinValue_i = function () {
		var t = new Label();
		this.coinValue = t;
		t.height = 24;
		t.size = 24;
		t.text = "0";
		t.textAlign = "right";
		t.width = 100;
		t.x = 383;
		t.y = 16;
		return t;
	};
	_proto.goldValue_i = function () {
		var t = new Label();
		this.goldValue = t;
		t.height = 24;
		t.size = 24;
		t.text = "0";
		t.textAlign = "right";
		t.width = 100;
		t.x = 525;
		t.y = 16;
		return t;
	};
	_proto.nameValue_i = function () {
		var t = new Label();
		this.nameValue = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 24;
		t.size = 24;
		t.text = "";
		t.textColor = 0xd1ccc8;
		t.width = 280;
		t.x = 7;
		t.y = 15;
		return t;
	};
	_proto._payBtn_i = function () {
		var t = new Button();
		this._payBtn = t;
		t.label = "";
		t.x = 637;
		t.y = 12;
		t.skinName = TopInfoSkin$Skin1;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["resImg","coinValue","goldValue","nameValue","_payBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return TopInfoSkin;
})(eui.Skin);var BasePanelSkin=(function (_super) {
	__extends(BasePanelSkin, _super);
	var BasePanelSkin$Skin2 = 	(function (_super) {
		__extends(BasePanelSkin$Skin2, _super);
		function BasePanelSkin$Skin2() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_closeImg_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BasePanelSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_closeImg_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return BasePanelSkin$Skin2;
	})(eui.Skin);

	var BasePanelSkin$Skin3 = 	(function (_super) {
		__extends(BasePanelSkin$Skin3, _super);
		function BasePanelSkin$Skin3() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","panel_funcBtnBg_png"),
						new eui.SetProperty("_Image2","source","panel_backBtn2_normal_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BasePanelSkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.height = 85;
			t.source = "panel_funcBtnBg_png";
			t.width = 85;
			t.x = 15;
			t.y = 27;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.bottom = 10;
			t.horizontalCenter = 0;
			t.source = "panel_backBtn2_normal_png";
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return BasePanelSkin$Skin3;
	})(eui.Skin);

	function BasePanelSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.topInfoView_i(),this.backImg_i(),this.bottomBackImg_i(),this.activeImg_i(),this._Image1_i(),this.titleBg1_i(),this.titleBg2_i(),this._titleImg_i(),this.downFrameImg_i(),this.closeBtn_i(),this.backBtn_i(),this.scrollerList_i()];
	}
	var _proto = BasePanelSkin.prototype;

	_proto.topInfoView_i = function () {
		var t = new TopInfoView();
		this.topInfoView = t;
		t.height = 57;
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "TopInfoSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.backImg_i = function () {
		var t = new eui.Image();
		this.backImg = t;
		t.height = 1223;
		t.scale9Grid = new egret.Rectangle(5,114,9,687);
		t.source = "common_panelBg_png";
		t.width = 720;
		t.y = 57;
		return t;
	};
	_proto.bottomBackImg_i = function () {
		var t = new eui.Image();
		this.bottomBackImg = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(90,0,540,248);
		t.source = "panel_bg2_png";
		t.top = 982;
		return t;
	};
	_proto.activeImg_i = function () {
		var t = new eui.Image();
		this.activeImg = t;
		t.source = "";
		t.x = 5;
		t.y = 116;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 1175.5;
		t.scale9Grid = new egret.Rectangle(30,15,183,94);
		t.source = "panel_bgKuang2_png";
		t.width = 720;
		t.x = 0;
		t.y = 105.5;
		return t;
	};
	_proto.titleBg1_i = function () {
		var t = new eui.Image();
		this.titleBg1 = t;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(7,33,46,0);
		t.source = "common_titleBg_png";
		t.width = 720;
		t.y = 57;
		return t;
	};
	_proto.titleBg2_i = function () {
		var t = new eui.Image();
		this.titleBg2 = t;
		t.horizontalCenter = 0;
		t.source = "common_titleBg2_png";
		t.width = 720;
		t.y = 57;
		return t;
	};
	_proto._titleImg_i = function () {
		var t = new eui.Image();
		this._titleImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.source = "";
		t.top = 70;
		return t;
	};
	_proto.downFrameImg_i = function () {
		var t = new eui.Image();
		this.downFrameImg = t;
		t.height = 1280;
		t.scale9Grid = new egret.Rectangle(74,30,100,48);
		t.source = "panel_bgKuang_png";
		t.touchEnabled = false;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new Button();
		this.closeBtn = t;
		t.label = "";
		t.x = 618;
		t.y = 45;
		t.skinName = BasePanelSkin$Skin2;
		return t;
	};
	_proto.backBtn_i = function () {
		var t = new ToggleButton();
		this.backBtn = t;
		t.bottom = 10;
		t.label = "";
		t.x = 558;
		t.skinName = BasePanelSkin$Skin3;
		return t;
	};
	_proto.scrollerList_i = function () {
		var t = new BaseHScrollerList();
		this.scrollerList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 10;
		t.height = 130;
		t.width = 495;
		t.x = 70;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["topInfoView","backImg","bottomBackImg","activeImg","titleBg1","titleBg2","_titleImg","downFrameImg","closeBtn","backBtn","scrollerList"];
		},
		enumerable: true,
		configurable: true
	});
	return BasePanelSkin;
})(eui.Skin);var ActivityPanelSkin=(function (_super) {
	__extends(ActivityPanelSkin, _super);
	function ActivityPanelSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i()];
	}
	var _proto = ActivityPanelSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.enabled = true;
		t.height = 1280;
		t.skinName = "BasePanelSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel"];
		},
		enumerable: true,
		configurable: true
	});
	return ActivityPanelSkin;
})(eui.Skin);var DailyItemSkin=(function (_super) {
	__extends(DailyItemSkin, _super);
	var DailyItemSkin$Skin4 = 	(function (_super) {
		__extends(DailyItemSkin$Skin4, _super);
		function DailyItemSkin$Skin4() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = DailyItemSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return DailyItemSkin$Skin4;
	})(eui.Skin);

	var DailyItemSkin$Skin5 = 	(function (_super) {
		__extends(DailyItemSkin$Skin5, _super);
		function DailyItemSkin$Skin5() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = DailyItemSkin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return DailyItemSkin$Skin5;
	})(eui.Skin);

	function DailyItemSkin() {
		_super.call(this);
		
		this.height = 145;
		this.width = 669;
		this.elementsContent = [this._back_i(),this._Image1_i(),this.txt0_i(),this._txtDesc_i(),this._txtValue0_i(),this._txtValue1_i(),this._Image2_i(),this._btn0_i(),this._btn1_i(),this._btnLabel_i(),this._Image3_i()];
	}
	var _proto = DailyItemSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.percentHeight = 100;
		t.source = "common_wordBg_normal_png";
		t.percentWidth = 100;
		t.x = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "activity_tubiao1_png";
		t.x = 12;
		t.y = 24;
		return t;
	};
	_proto.txt0_i = function () {
		var t = new Label();
		this.txt0 = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "奖励：";
		t.textColor = 0x7C6E62;
		t.x = 125;
		t.y = 76;
		return t;
	};
	_proto._txtDesc_i = function () {
		var t = new Label();
		this._txtDesc = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "强化装备";
		t.textColor = 0x7C6E62;
		t.x = 125;
		t.y = 26;
		return t;
	};
	_proto._txtValue0_i = function () {
		var t = new Label();
		this._txtValue0 = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "x10";
		t.textColor = 0x7C6E62;
		t.x = 257;
		t.y = 76;
		return t;
	};
	_proto._txtValue1_i = function () {
		var t = new Label();
		this._txtValue1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "x10";
		t.textColor = 0x7c6e62;
		t.x = 361;
		t.y = 76;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "activity_tubiao3_png";
		t.x = 208;
		t.y = 67;
		return t;
	};
	_proto._btn0_i = function () {
		var t = new Button();
		this._btn0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 85;
		t.label = "";
		t.width = 191;
		t.x = 458;
		t.y = 30;
		t.skinName = DailyItemSkin$Skin4;
		return t;
	};
	_proto._btn1_i = function () {
		var t = new Button();
		this._btn1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 85;
		t.label = "";
		t.width = 191;
		t.x = 458;
		t.y = 30;
		t.skinName = DailyItemSkin$Skin5;
		return t;
	};
	_proto._btnLabel_i = function () {
		var t = new eui.Image();
		this._btnLabel = t;
		t.source = "common_label_qianwang_png";
		t.x = 462;
		t.y = 47;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "playRes_coin_54_png";
		t.x = 308;
		t.y = 66;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","txt0","_txtDesc","_txtValue0","_txtValue1","_btn0","_btn1","_btnLabel"];
		},
		enumerable: true,
		configurable: true
	});
	return DailyItemSkin;
})(eui.Skin);var DailyScheduleItemSkin=(function (_super) {
	__extends(DailyScheduleItemSkin, _super);
	function DailyScheduleItemSkin() {
		_super.call(this);
		
		this.height = 130;
		this.width = 170;
		this.elementsContent = [this._bar_i(),this._circle_i(),this._box_i(),this._txt_i(),this._label_i()];
	}
	var _proto = DailyScheduleItemSkin.prototype;

	_proto._bar_i = function () {
		var t = new eui.Image();
		this._bar = t;
		t.scale9Grid = new egret.Rectangle(6,2,40,19);
		t.source = "activity_jindu_png";
		t.width = 80;
		t.x = 2;
		t.y = 37;
		return t;
	};
	_proto._circle_i = function () {
		var t = new eui.Image();
		this._circle = t;
		t.source = "activity_yuan_png";
		t.x = 76;
		t.y = 2;
		return t;
	};
	_proto._box_i = function () {
		var t = new eui.Image();
		this._box = t;
		t.source = "activity_xiangzi_1_png";
		t.x = 74;
		t.y = 3;
		return t;
	};
	_proto._txt_i = function () {
		var t = new Label();
		this._txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "000";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.x = 96;
		t.y = 94;
		return t;
	};
	_proto._label_i = function () {
		var t = new eui.Image();
		this._label = t;
		t.source = "common_label_yilingqu_1_png";
		t.x = 77;
		t.y = 21;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_bar","_circle","_box","_txt","_label"];
		},
		enumerable: true,
		configurable: true
	});
	return DailyScheduleItemSkin;
})(eui.Skin);var DailyViewSkin=(function (_super) {
	__extends(DailyViewSkin, _super);
	function DailyViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._list_i(),this._Image1_i(),this._Image2_i(),this._Image3_i()];
	}
	var _proto = DailyViewSkin.prototype;

	_proto._list_i = function () {
		var t = new BaseVScrollerList();
		this._list = t;
		t.height = 814;
		t.width = 671;
		t.x = 26;
		t.y = 120;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "activity_bg_0_png";
		t.x = 22;
		t.y = 935;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "activity_bg_1_png";
		t.x = 45;
		t.y = 989;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "activity_label_0_png";
		t.x = 48;
		t.y = 944;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_list"];
		},
		enumerable: true,
		configurable: true
	});
	return DailyViewSkin;
})(eui.Skin);var MainCopyViewSkin=(function (_super) {
	__extends(MainCopyViewSkin, _super);
	var MainCopyViewSkin$Skin6 = 	(function (_super) {
		__extends(MainCopyViewSkin$Skin6, _super);
		function MainCopyViewSkin$Skin6() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = MainCopyViewSkin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "activity_copy_label_tiaozhan_png";
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return MainCopyViewSkin$Skin6;
	})(eui.Skin);

	function MainCopyViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._bg_i(),this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._txtBoss_i(),this._Image7_i(),this._Image8_i(),this._txtPreNeed_i(),this._txtPreName_i(),this._txtName_i(),this._txtRank_i(),this._txtLink_i(),this._btn_i()];
	}
	var _proto = MainCopyViewSkin.prototype;

	_proto._bg_i = function () {
		var t = new BitmapRemote();
		this._bg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 730;
		t.width = 720;
		t.x = 0;
		t.y = 117;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 150;
		t.scale9Grid = new egret.Rectangle(6,6,38,38);
		t.source = "common_rect_1_png";
		t.width = 234;
		t.x = 5;
		t.y = 117;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 138;
		t.scale9Grid = new egret.Rectangle(29,11,181,69);
		t.source = "common_bg1_normal_png";
		t.width = 720;
		t.x = 0;
		t.y = 847;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "common_back2_png";
		t.width = 184;
		t.x = 276;
		t.y = 124;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "activity_copy_label_2_png";
		t.x = 34;
		t.y = 893;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "activity_copy_rank_title_png";
		t.x = 13;
		t.y = 124;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "common_name_back_png";
		t.x = 517;
		t.y = 142.5;
		return t;
	};
	_proto._txtBoss_i = function () {
		var t = new Label();
		this._txtBoss = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 182;
		t.size = 22;
		t.text = "怪";
		t.textColor = 0xFFF7E6;
		t.width = 27;
		t.x = 550;
		t.y = 233.5;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.height = 188;
		t.scale9Grid = new egret.Rectangle(6,6,38,38);
		t.source = "common_rect_1_png";
		t.width = 164;
		t.x = 535;
		t.y = 605;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "activity_copy_label_1_png";
		t.x = 545;
		t.y = 615;
		return t;
	};
	_proto._txtPreNeed_i = function () {
		var t = new Label();
		this._txtPreNeed = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "500";
		t.textAlign = "center";
		t.textColor = 0xFFF7E6;
		t.width = 48;
		t.x = 571;
		t.y = 621;
		return t;
	};
	_proto._txtPreName_i = function () {
		var t = new Label();
		this._txtPreName = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "XX";
		t.textAlign = "center";
		t.textColor = 0xfff7e6;
		t.width = 150;
		t.x = 542;
		t.y = 758;
		return t;
	};
	_proto._txtName_i = function () {
		var t = new Label();
		this._txtName = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "排名：未上榜";
		t.textAlign = "center";
		t.textColor = 0xFFF7E6;
		t.width = 160;
		t.x = 288;
		t.y = 134;
		return t;
	};
	_proto._txtRank_i = function () {
		var t = new Label();
		this._txtRank = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 95;
		t.lineSpacing = 12;
		t.size = 22;
		t.text = "";
		t.textColor = 0xFFF7E6;
		t.width = 212;
		t.x = 15;
		t.y = 164;
		return t;
	};
	_proto._txtLink_i = function () {
		var t = new Label();
		this._txtLink = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "查看排名";
		t.textColor = 0x37b700;
		t.x = 132;
		t.y = 130;
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 1014;
		t.skinName = MainCopyViewSkin$Skin6;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_bg","_txtBoss","_txtPreNeed","_txtPreName","_txtName","_txtRank","_txtLink","_btn"];
		},
		enumerable: true,
		configurable: true
	});
	return MainCopyViewSkin;
})(eui.Skin);var TowerCopyViewSkin=(function (_super) {
	__extends(TowerCopyViewSkin, _super);
	var TowerCopyViewSkin$Skin7 = 	(function (_super) {
		__extends(TowerCopyViewSkin$Skin7, _super);
		function TowerCopyViewSkin$Skin7() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TowerCopyViewSkin$Skin7.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return TowerCopyViewSkin$Skin7;
	})(eui.Skin);

	function TowerCopyViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._txtLvl_i(),this._Image7_i(),this._Image8_i(),this._txtPreNeed_i(),this._txtPreName_i(),this._txtName_i(),this._txtRank_i(),this._txtLink_i(),this._btn_i(),this._tiaozhanImg_i(),this._saodangImg_i(),this._txtTiaozhan_i(),this._tipsIcon_i()];
	}
	var _proto = TowerCopyViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 150;
		t.scale9Grid = new egret.Rectangle(6,6,38,38);
		t.source = "common_rect_1_png";
		t.width = 234;
		t.x = 5;
		t.y = 117;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 138;
		t.scale9Grid = new egret.Rectangle(29,11,181,69);
		t.source = "common_bg1_normal_png";
		t.width = 710;
		t.x = 5;
		t.y = 847;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "common_back2_png";
		t.width = 184;
		t.x = 276;
		t.y = 124;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "activity_copy_label_2_png";
		t.x = 34;
		t.y = 893;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "activity_copy_rank_title_png";
		t.x = 13;
		t.y = 124;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "common_name_back_png";
		t.x = 517;
		t.y = 142.5;
		return t;
	};
	_proto._txtLvl_i = function () {
		var t = new Label();
		this._txtLvl = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 182;
		t.size = 22;
		t.text = "怪";
		t.textAlign = "center";
		t.textColor = 0xFFF7E6;
		t.width = 27;
		t.x = 550;
		t.y = 233.5;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.height = 188;
		t.scale9Grid = new egret.Rectangle(6,6,38,38);
		t.source = "common_rect_1_png";
		t.width = 164;
		t.x = 535;
		t.y = 605;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "activity_copy_label_1_png";
		t.x = 545;
		t.y = 615;
		return t;
	};
	_proto._txtPreNeed_i = function () {
		var t = new Label();
		this._txtPreNeed = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "500";
		t.textAlign = "center";
		t.textColor = 0xFFF7E6;
		t.width = 48;
		t.x = 571;
		t.y = 621;
		return t;
	};
	_proto._txtPreName_i = function () {
		var t = new Label();
		this._txtPreName = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "XX";
		t.textAlign = "center";
		t.textColor = 0xFFF7E6;
		t.width = 150;
		t.x = 542;
		t.y = 758;
		return t;
	};
	_proto._txtName_i = function () {
		var t = new Label();
		this._txtName = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "排名：未上榜";
		t.textAlign = "center";
		t.textColor = 0xFFF7E6;
		t.width = 160;
		t.x = 288;
		t.y = 134;
		return t;
	};
	_proto._txtRank_i = function () {
		var t = new Label();
		this._txtRank = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 95;
		t.lineSpacing = 12;
		t.size = 22;
		t.text = "";
		t.textColor = 0xFFF7E6;
		t.width = 212;
		t.x = 15;
		t.y = 164;
		return t;
	};
	_proto._txtLink_i = function () {
		var t = new Label();
		this._txtLink = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "查看排名";
		t.textColor = 0x37B700;
		t.x = 132;
		t.y = 130;
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 1014;
		t.skinName = TowerCopyViewSkin$Skin7;
		return t;
	};
	_proto._tiaozhanImg_i = function () {
		var t = new eui.Image();
		this._tiaozhanImg = t;
		t.source = "activity_copy_label_tiaozhan_png";
		t.x = 270;
		t.y = 1041;
		return t;
	};
	_proto._saodangImg_i = function () {
		var t = new eui.Image();
		this._saodangImg = t;
		t.source = "common_label_saodang_png";
		t.x = 270;
		t.y = 1041;
		return t;
	};
	_proto._txtTiaozhan_i = function () {
		var t = new Label();
		this._txtTiaozhan = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "达到999级可挑战";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 1052;
		return t;
	};
	_proto._tipsIcon_i = function () {
		var t = new eui.Image();
		this._tipsIcon = t;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.x = 444;
		t.y = 1014;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_txtLvl","_txtPreNeed","_txtPreName","_txtName","_txtRank","_txtLink","_btn","_tiaozhanImg","_saodangImg","_txtTiaozhan","_tipsIcon"];
		},
		enumerable: true,
		configurable: true
	});
	return TowerCopyViewSkin;
})(eui.Skin);var BasePopUpSkin=(function (_super) {
	__extends(BasePopUpSkin, _super);
	var BasePopUpSkin$Skin8 = 	(function (_super) {
		__extends(BasePopUpSkin$Skin8, _super);
		function BasePopUpSkin$Skin8() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BasePopUpSkin$Skin8.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "common_closeImg_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return BasePopUpSkin$Skin8;
	})(eui.Skin);

	function BasePopUpSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._bgImg_i(),this.diImg_i(),this._kuangImg_i(),this._bommImg_i(),this._group_i()];
	}
	var _proto = BasePopUpSkin.prototype;

	_proto._bgImg_i = function () {
		var t = new eui.Image();
		this._bgImg = t;
		t.anchorOffsetY = 0;
		t.height = 436;
		t.scale9Grid = new egret.Rectangle(5,114,4,687);
		t.source = "panel_bg3_png";
		t.width = 720;
		t.x = 0;
		t.y = 344;
		return t;
	};
	_proto.diImg_i = function () {
		var t = new eui.Image();
		this.diImg = t;
		t.height = 130;
		t.scale9Grid = new egret.Rectangle(90,0,540,248);
		t.source = "panel_bg2_png";
		t.width = 720;
		t.x = 0;
		t.y = 670;
		return t;
	};
	_proto._kuangImg_i = function () {
		var t = new eui.Image();
		this._kuangImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 445;
		t.scale9Grid = new egret.Rectangle(30,15,183,94);
		t.source = "panel_bgKuang2_png";
		t.width = 720;
		t.x = 0;
		t.y = 344;
		return t;
	};
	_proto._bommImg_i = function () {
		var t = new eui.Image();
		this._bommImg = t;
		t.anchorOffsetY = 0;
		t.height = 32;
		t.scale9Grid = new egret.Rectangle(90,4,540,25);
		t.source = "border2_png";
		t.width = 720;
		t.x = 0;
		t.y = 772;
		return t;
	};
	_proto._group_i = function () {
		var t = new eui.Group();
		this._group = t;
		t.x = 0;
		t.y = 303;
		t.elementsContent = [this._Image1_i(),this.titleBg_i(),this.titleImg_i(),this.closeBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 32;
		t.scale9Grid = new egret.Rectangle(90,10,540,5);
		t.source = "border1_png";
		t.x = 0;
		t.y = 23;
		return t;
	};
	_proto.titleBg_i = function () {
		var t = new eui.Image();
		this.titleBg = t;
		t.height = 69;
		t.source = "common_titleBg2_png";
		t.width = 720;
		t.x = 0;
		t.y = 6;
		return t;
	};
	_proto.titleImg_i = function () {
		var t = new eui.Image();
		this.titleImg = t;
		t.horizontalCenter = 0;
		t.y = 12;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new Button();
		this.closeBtn = t;
		t.label = "Button";
		t.width = 82;
		t.x = 622;
		t.y = 0;
		t.skinName = BasePopUpSkin$Skin8;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_bgImg","diImg","_kuangImg","_bommImg","titleBg","titleImg","closeBtn","_group"];
		},
		enumerable: true,
		configurable: true
	});
	return BasePopUpSkin;
})(eui.Skin);var ArenaAwardViewSkin=(function (_super) {
	__extends(ArenaAwardViewSkin, _super);
	function ArenaAwardViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._popupView_i(),this._title_i(),this._Image1_i(),this._Image2_i(),this._list_i(),this._txtRank_i(),this._txt1_i(),this._txt2_i(),this._Image3_i()];
	}
	var _proto = ArenaAwardViewSkin.prototype;

	_proto._popupView_i = function () {
		var t = new BasePopUpView();
		this._popupView = t;
		t.percentHeight = 100;
		t.skinName = "BasePopUpSkin";
		t.percentWidth = 100;
		return t;
	};
	_proto._title_i = function () {
		var t = new eui.Image();
		this._title = t;
		t.source = "arenaTitle2_png";
		t.x = 278;
		t.y = 149;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "common_label_rank_png";
		t.x = 70;
		t.y = 200;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "common_label_award_png";
		t.x = 437;
		t.y = 200;
		return t;
	};
	_proto._list_i = function () {
		var t = new BaseVScrollerList();
		this._list = t;
		t.height = 598;
		t.width = 671;
		t.x = 25;
		t.y = 242;
		return t;
	};
	_proto._txtRank_i = function () {
		var t = new Label();
		this._txtRank = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "我的排名：";
		t.textAlign = "center";
		t.textColor = 0x7B6D61;
		t.width = 310;
		t.y = 851;
		return t;
	};
	_proto._txt1_i = function () {
		var t = new Label();
		this._txt1 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "每日排名奖励00:00邮件发送";
		t.textAlign = "right";
		t.textColor = 0x7B6D61;
		t.width = 326;
		t.x = 365;
		t.y = 905;
		return t;
	};
	_proto._txt2_i = function () {
		var t = new Label();
		this._txt2 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "成就奖励只能领取1次";
		t.textAlign = "center";
		t.textColor = 0x7B6D61;
		t.width = 326;
		t.y = 1047;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "arenaHistoryLabel_png";
		t.x = 15;
		t.y = 899;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_popupView","_title","_list","_txtRank","_txt1","_txt2"];
		},
		enumerable: true,
		configurable: true
	});
	return ArenaAwardViewSkin;
})(eui.Skin);var ArenaDailyListItemSkin=(function (_super) {
	__extends(ArenaDailyListItemSkin, _super);
	function ArenaDailyListItemSkin() {
		_super.call(this);
		
		this.height = 123;
		this.width = 671;
		this.elementsContent = [this._Image1_i(),this._txt_i()];
	}
	var _proto = ArenaDailyListItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "common_wordBg_normal_png";
		t.top = 0;
		return t;
	};
	_proto._txt_i = function () {
		var t = new Label();
		this._txt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "label";
		t.textColor = 0x7B6D61;
		t.width = 180;
		t.x = 17;
		t.y = 46;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_txt"];
		},
		enumerable: true,
		configurable: true
	});
	return ArenaDailyListItemSkin;
})(eui.Skin);var ArenaLogListItemSkin=(function (_super) {
	__extends(ArenaLogListItemSkin, _super);
	function ArenaLogListItemSkin() {
		_super.call(this);
		
		this.height = 115;
		this.width = 710;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._txtTime_i(),this._Label1_i(),this._txtHonour_i(),this._Label2_i(),this._txtName_i(),this._txtRank_i()];
	}
	var _proto = ArenaLogListItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "common_bg1_normal_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "playRes_honour_54_png";
		t.x = 299;
		t.y = 51;
		return t;
	};
	_proto._txtTime_i = function () {
		var t = new Label();
		this._txtTime = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "label";
		t.textColor = 0x37b700;
		t.width = 300;
		t.x = 202;
		t.y = 21;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "获得奖励:";
		t.textColor = 0x7b6d61;
		t.width = 106;
		t.x = 202;
		t.y = 66;
		return t;
	};
	_proto._txtHonour_i = function () {
		var t = new Label();
		this._txtHonour = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "0";
		t.textColor = 0xfd7100;
		t.width = 65;
		t.x = 347;
		t.y = 66;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new Label();
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "对手：";
		t.textColor = 0x7B6D61;
		t.width = 106;
		t.x = 475;
		t.y = 21;
		return t;
	};
	_proto._txtName_i = function () {
		var t = new Label();
		this._txtName = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "label";
		t.textColor = 0xFD7100;
		t.width = 160;
		t.x = 544;
		t.y = 21;
		return t;
	};
	_proto._txtRank_i = function () {
		var t = new Label();
		this._txtRank = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "label";
		t.textAlign = "left";
		t.textColor = 0x7B6D61;
		t.width = 200;
		t.x = 475;
		t.y = 66;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_txtTime","_txtHonour","_txtName","_txtRank"];
		},
		enumerable: true,
		configurable: true
	});
	return ArenaLogListItemSkin;
})(eui.Skin);var ArenaLogViewSkin=(function (_super) {
	__extends(ArenaLogViewSkin, _super);
	function ArenaLogViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._popupView_i(),this._list_i(),this._title_i()];
	}
	var _proto = ArenaLogViewSkin.prototype;

	_proto._popupView_i = function () {
		var t = new BasePopUpView();
		this._popupView = t;
		t.percentHeight = 100;
		t.skinName = "BasePopUpSkin";
		t.percentWidth = 100;
		return t;
	};
	_proto._list_i = function () {
		var t = new BaseVScrollerList();
		this._list = t;
		t.height = 885;
		t.width = 712;
		t.x = 5;
		t.y = 212;
		return t;
	};
	_proto._title_i = function () {
		var t = new eui.Image();
		this._title = t;
		t.source = "arenaTitle3_png";
		t.x = 278;
		t.y = 149;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_popupView","_list","_title"];
		},
		enumerable: true,
		configurable: true
	});
	return ArenaLogViewSkin;
})(eui.Skin);var ResultWinBackSkin=(function (_super) {
	__extends(ResultWinBackSkin, _super);
	var ResultWinBackSkin$Skin9 = 	(function (_super) {
		__extends(ResultWinBackSkin$Skin9, _super);
		function ResultWinBackSkin$Skin9() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ResultWinBackSkin$Skin9.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "confirm_png";
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return ResultWinBackSkin$Skin9;
	})(eui.Skin);

	function ResultWinBackSkin() {
		_super.call(this);
		
		this.height = 637;
		this.width = 715;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = ResultWinBackSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 637;
		t.width = 715;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._back_i(),this._txt_i(),this.titleImg_i(),this.btn_i(),this.btnClose_i()];
		return t;
	};
	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.height = 567;
		t.scale9Grid = new egret.Rectangle(89,38,535,7);
		t.source = "result_bg_png";
		t.x = 0;
		t.y = 70;
		return t;
	};
	_proto._txt_i = function () {
		var t = new Label();
		this._txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "倒计时3s退出";
		t.textColor = 0xFFF7E6;
		t.x = 475;
		t.y = 556;
		return t;
	};
	_proto.titleImg_i = function () {
		var t = new eui.Image();
		this.titleImg = t;
		t.source = "result_title_win_png";
		t.x = 122;
		t.y = 0;
		return t;
	};
	_proto.btn_i = function () {
		var t = new Button();
		this.btn = t;
		t.height = 105;
		t.label = "";
		t.width = 238;
		t.x = 237;
		t.y = 516;
		t.skinName = ResultWinBackSkin$Skin9;
		return t;
	};
	_proto.btnClose_i = function () {
		var t = new eui.Image();
		this.btnClose = t;
		t.source = "common_tip_close_png";
		t.x = 639;
		t.y = 88;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_txt","titleImg","btn","btnClose"];
		},
		enumerable: true,
		configurable: true
	});
	return ResultWinBackSkin;
})(eui.Skin);var ArenaResultWinSkin=(function (_super) {
	__extends(ArenaResultWinSkin, _super);
	function ArenaResultWinSkin() {
		_super.call(this);
		
		this.height = 637;
		this.width = 715;
		this.elementsContent = [this._back_i(),this._Image1_i(),this._Image2_i(),this._txt1_i(),this._txt2_i(),this._txt3_i()];
	}
	var _proto = ArenaResultWinSkin.prototype;

	_proto._back_i = function () {
		var t = new ResultWinBack();
		this._back = t;
		t.skinName = "ResultWinBackSkin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "result_line_png";
		t.x = 113;
		t.y = 340;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "arenaResultAwardLabel_png";
		t.x = 285;
		t.y = 319;
		return t;
	};
	_proto._txt1_i = function () {
		var t = new Label();
		this._txt1 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xfff7e6;
		t.width = 542;
		t.y = 153;
		return t;
	};
	_proto._txt2_i = function () {
		var t = new Label();
		this._txt2 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xFFF7E6;
		t.width = 542;
		t.y = 203;
		return t;
	};
	_proto._txt3_i = function () {
		var t = new Label();
		this._txt3 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xFFF7E6;
		t.width = 542;
		t.y = 254;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_txt1","_txt2","_txt3"];
		},
		enumerable: true,
		configurable: true
	});
	return ArenaResultWinSkin;
})(eui.Skin);var BagSkin=(function (_super) {
	__extends(BagSkin, _super);
	function BagSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i()];
	}
	var _proto = BagSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.percentHeight = 100;
		t.skinName = "BasePanelSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel"];
		},
		enumerable: true,
		configurable: true
	});
	return BagSkin;
})(eui.Skin);var BagViewSkin=(function (_super) {
	__extends(BagViewSkin, _super);
	var BagViewSkin$Skin10 = 	(function (_super) {
		__extends(BagViewSkin$Skin10, _super);
		function BagViewSkin$Skin10() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BagViewSkin$Skin10.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "bag_ronglian_png";
			t.verticalCenter = 0;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return BagViewSkin$Skin10;
	})(eui.Skin);

	var BagViewSkin$Skin11 = 	(function (_super) {
		__extends(BagViewSkin$Skin11, _super);
		function BagViewSkin$Skin11() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BagViewSkin$Skin11.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "bag_duihuan_png";
			t.verticalCenter = 0;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return BagViewSkin$Skin11;
	})(eui.Skin);

	function BagViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._rongLianBtn_i(),this._diuHuanBtn_i(),this._Group1_i()];
	}
	var _proto = BagViewSkin.prototype;

	_proto._rongLianBtn_i = function () {
		var t = new Button();
		this._rongLianBtn = t;
		t.height = 90;
		t.width = 197;
		t.x = 372;
		t.y = 1026;
		t.skinName = BagViewSkin$Skin10;
		return t;
	};
	_proto._diuHuanBtn_i = function () {
		var t = new Button();
		this._diuHuanBtn = t;
		t.height = 90;
		t.width = 197;
		t.x = 149;
		t.y = 1026;
		t.skinName = BagViewSkin$Skin11;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 271;
		t.y = 954;
		t.elementsContent = [this._contentTxt_i(),this._Image1_i()];
		return t;
	};
	_proto._contentTxt_i = function () {
		var t = new Label();
		this._contentTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 33;
		t.size = 31;
		t.stroke = 3;
		t.strokeColor = 0x5b554a;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0xfffade;
		t.verticalAlign = "middle";
		t.width = 158;
		t.x = 88;
		t.y = 3;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "bag_rongliang_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_rongLianBtn","_diuHuanBtn","_contentTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return BagViewSkin;
})(eui.Skin);var RongLianItemSkin=(function (_super) {
	__extends(RongLianItemSkin, _super);
	function RongLianItemSkin() {
		_super.call(this);
		
		this.height = 141;
		this.width = 141;
	}
	var _proto = RongLianItemSkin.prototype;

	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return [];
		},
		enumerable: true,
		configurable: true
	});
	return RongLianItemSkin;
})(eui.Skin);var RonglianViewSkin=(function (_super) {
	__extends(RonglianViewSkin, _super);
	var RonglianViewSkin$Skin12 = 	(function (_super) {
		__extends(RonglianViewSkin$Skin12, _super);
		function RonglianViewSkin$Skin12() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RonglianViewSkin$Skin12.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return RonglianViewSkin$Skin12;
	})(eui.Skin);

	function RonglianViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._monsterImgs_i(),this._Image5_i(),this._scrollerList_i(),this._btn_i(),this._btnImg_i(),this._Label1_i()];
	}
	var _proto = RonglianViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 271;
		t.horizontalCenter = 0;
		t.source = "equip_zhuhun_upgradeDI_png";
		t.width = 720;
		t.y = 568;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 588;
		t.horizontalCenter = 1;
		t.source = "equip_strengthen_centerImg1_png";
		t.width = 623;
		t.y = 140;
		return t;
	};
	_proto._monsterImgs_i = function () {
		var t = new eui.Group();
		this._monsterImgs = t;
		t.height = 498;
		t.width = 591;
		t.x = 65;
		t.y = 184;
		t.elementsContent = [this._Image3_i(),this._mouth_i(),this._Image4_i(),this._fuGroup_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 498;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ronglian_di_png";
		t.width = 591;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._mouth_i = function () {
		var t = new eui.Image();
		this._mouth = t;
		t.height = 189;
		t.horizontalCenter = 1;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ronglian_head2_png";
		t.width = 309;
		t.x = 141;
		t.y = 244;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 280;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ronglian_head1_png";
		t.width = 394;
		t.x = 98;
		t.y = 51;
		return t;
	};
	_proto._fuGroup_i = function () {
		var t = new eui.Group();
		this._fuGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 441;
		t.width = 407;
		t.x = 93;
		t.y = 30;
		t.elementsContent = [this._fu1_i(),this._fu2_i(),this._fu3_i(),this._fu4_i(),this._fu5_i(),this._fu6_i(),this._eye1_i(),this._eye2_i()];
		return t;
	};
	_proto._fu1_i = function () {
		var t = new eui.Image();
		this._fu1 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ronglian_fu_png";
		t.x = 151;
		t.y = -3;
		return t;
	};
	_proto._fu2_i = function () {
		var t = new eui.Image();
		this._fu2 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ronglian_fu_png";
		t.x = -12;
		t.y = 90;
		return t;
	};
	_proto._fu3_i = function () {
		var t = new eui.Image();
		this._fu3 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ronglian_fu_png";
		t.x = -10;
		t.y = 250;
		return t;
	};
	_proto._fu4_i = function () {
		var t = new eui.Image();
		this._fu4 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ronglian_fu_png";
		t.x = 151;
		t.y = 344;
		return t;
	};
	_proto._fu5_i = function () {
		var t = new eui.Image();
		this._fu5 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ronglian_fu_png";
		t.x = 313;
		t.y = 251;
		return t;
	};
	_proto._fu6_i = function () {
		var t = new eui.Image();
		this._fu6 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ronglian_fu_png";
		t.x = 312;
		t.y = 91;
		return t;
	};
	_proto._eye1_i = function () {
		var t = new eui.Image();
		this._eye1 = t;
		t.height = 54;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ronglian_eye_png";
		t.width = 70;
		t.x = 126;
		t.y = 186;
		return t;
	};
	_proto._eye2_i = function () {
		var t = new eui.Image();
		this._eye2 = t;
		t.height = 54;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ronglian_eye_png";
		t.width = 70;
		t.x = 219;
		t.y = 184;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 160;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(29,11,181,69);
		t.source = "common_bg1_normal_png";
		t.width = 710;
		t.y = 840;
		return t;
	};
	_proto._scrollerList_i = function () {
		var t = new BaseHScrollerList();
		this._scrollerList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 160;
		t.horizontalCenter = 0;
		t.width = 710;
		t.y = 839;
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 1010;
		t.skinName = RonglianViewSkin$Skin12;
		return t;
	};
	_proto._btnImg_i = function () {
		var t = new eui.Image();
		this._btnImg = t;
		t.height = 43;
		t.horizontalCenter = 0;
		t.source = "ronglian_title_png";
		t.width = 86;
		t.y = 1045;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 24;
		t.text = "一次可熔炼50件装备";
		t.textColor = 0x7c6e62;
		t.y = 796;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_mouth","_fu1","_fu2","_fu3","_fu4","_fu5","_fu6","_eye1","_eye2","_fuGroup","_monsterImgs","_scrollerList","_btn","_btnImg"];
		},
		enumerable: true,
		configurable: true
	});
	return RonglianViewSkin;
})(eui.Skin);var depotViewSkin=(function (_super) {
	__extends(depotViewSkin, _super);
	function depotViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = depotViewSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 271;
		t.y = 1077;
		t.elementsContent = [this._contentTxt_i(),this._Image1_i()];
		return t;
	};
	_proto._contentTxt_i = function () {
		var t = new Label();
		this._contentTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 33;
		t.size = 31;
		t.stroke = 3;
		t.strokeColor = 0x5b554a;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0xfffade;
		t.verticalAlign = "middle";
		t.width = 158;
		t.x = 88;
		t.y = 3;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "bag_rongliang_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_contentTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return depotViewSkin;
})(eui.Skin);var BossEnemyItemSkin=(function (_super) {
	__extends(BossEnemyItemSkin, _super);
	function BossEnemyItemSkin() {
		_super.call(this);
		
		this.height = 132;
		this.width = 118;
		this.elementsContent = [this._Image1_i(),this._head_i(),this._Image2_i(),this._Image3_i(),this._barMask_i(),this._Image4_i(),this._txtPower_i()];
	}
	var _proto = BossEnemyItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 118;
		t.source = "main_role_bg_png";
		t.width = 118;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._head_i = function () {
		var t = new BitmapRemote();
		this._head = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 90;
		t.width = 92;
		t.x = 12;
		t.y = 15;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "main_hp_bg_png";
		t.x = 5;
		t.y = 112;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "main_hp_png";
		t.x = 8;
		t.y = 115;
		return t;
	};
	_proto._barMask_i = function () {
		var t = new eui.Image();
		this._barMask = t;
		t.source = "main_hp_png";
		t.x = 8;
		t.y = 115;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 24;
		t.source = "common_tips_back_png";
		t.width = 97;
		t.x = 10;
		t.y = 84;
		return t;
	};
	_proto._txtPower_i = function () {
		var t = new Label();
		this._txtPower = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 20;
		t.text = "asdf";
		t.textAlign = "center";
		t.x = 39;
		t.y = 84;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_head","_barMask","_txtPower"];
		},
		enumerable: true,
		configurable: true
	});
	return BossEnemyItemSkin;
})(eui.Skin);var BossEnemyViewSkin=(function (_super) {
	__extends(BossEnemyViewSkin, _super);
	function BossEnemyViewSkin() {
		_super.call(this);
		
		this.height = 190;
		this.width = 129;
		this.elementsContent = [this._btn_i(),this._Image1_i(),this._arrow_i(),this._group_i(),this._mask_i()];
	}
	var _proto = BossEnemyViewSkin.prototype;

	_proto._btn_i = function () {
		var t = new eui.Image();
		this._btn = t;
		t.source = "common_btn3_1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "boss_enemy_png";
		t.touchEnabled = false;
		t.x = 15;
		t.y = 13;
		return t;
	};
	_proto._arrow_i = function () {
		var t = new eui.Image();
		this._arrow = t;
		t.source = "common_arrow0_png";
		t.x = 93;
		t.y = 24;
		return t;
	};
	_proto._group_i = function () {
		var t = new eui.Group();
		this._group = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 107;
		t.width = 118;
		t.x = 5;
		t.y = 69;
		return t;
	};
	_proto._mask_i = function () {
		var t = new eui.Image();
		this._mask = t;
		t.source = "common_back0_png";
		t.width = 118;
		t.x = 5;
		t.y = 69;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_btn","_arrow","_group","_mask"];
		},
		enumerable: true,
		configurable: true
	});
	return BossEnemyViewSkin;
})(eui.Skin);var BossPanelSkin=(function (_super) {
	__extends(BossPanelSkin, _super);
	function BossPanelSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i()];
	}
	var _proto = BossPanelSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.enabled = true;
		t.height = 1280;
		t.skinName = "BasePanelSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel"];
		},
		enumerable: true,
		configurable: true
	});
	return BossPanelSkin;
})(eui.Skin);var BossPrivateItemSkin=(function (_super) {
	__extends(BossPrivateItemSkin, _super);
	var BossPrivateItemSkin$Skin13 = 	(function (_super) {
		__extends(BossPrivateItemSkin$Skin13, _super);
		function BossPrivateItemSkin$Skin13() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BossPrivateItemSkin$Skin13.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return BossPrivateItemSkin$Skin13;
	})(eui.Skin);

	function BossPrivateItemSkin() {
		_super.call(this);
		
		this.height = 178;
		this.width = 705;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._head_i(),this._Image3_i(),this._txtName_i(),this._txtLv_i(),this._txtLeft_i(),this._Group1_i()];
	}
	var _proto = BossPrivateItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 178;
		t.source = "common_wordBg_normal_png";
		t.width = 705;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "common_head_back1_png";
		t.x = 28;
		t.y = 21;
		return t;
	};
	_proto._head_i = function () {
		var t = new BitmapRemote();
		this._head = t;
		t.height = 125;
		t.width = 101;
		t.x = 37;
		t.y = 7;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 48;
		t.scale9Grid = new egret.Rectangle(34,5,73,32);
		t.source = "common_back2_png";
		t.width = 176;
		t.x = 7;
		t.y = 124;
		return t;
	};
	_proto._txtName_i = function () {
		var t = new Label();
		this._txtName = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "怪物名";
		t.textAlign = "center";
		t.textColor = 0xefe7e1;
		t.width = 112;
		t.x = 6;
		t.y = 137;
		return t;
	};
	_proto._txtLv_i = function () {
		var t = new Label();
		this._txtLv = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "Lv80";
		t.textColor = 0xefe7e1;
		t.x = 118;
		t.y = 137;
		return t;
	};
	_proto._txtLeft_i = function () {
		var t = new Label();
		this._txtLeft = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "剩余挑战次数1次";
		t.textColor = 0x7b6d61;
		t.x = 179;
		t.y = 23;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 510;
		t.y = 64;
		t.elementsContent = [this._btn_i(),this._label_i()];
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.height = 86;
		t.label = "";
		t.width = 192;
		t.x = 0;
		t.y = 0;
		t.skinName = BossPrivateItemSkin$Skin13;
		return t;
	};
	_proto._label_i = function () {
		var t = new eui.Image();
		this._label = t;
		t.horizontalCenter = 0;
		t.source = "common_label_killed_png";
		t.touchEnabled = false;
		t.verticalCenter = 0.5;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_head","_txtName","_txtLv","_txtLeft","_btn","_label"];
		},
		enumerable: true,
		configurable: true
	});
	return BossPrivateItemSkin;
})(eui.Skin);var BossPrivateViewSkin=(function (_super) {
	__extends(BossPrivateViewSkin, _super);
	function BossPrivateViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
	}
	var _proto = BossPrivateViewSkin.prototype;

	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return [];
		},
		enumerable: true,
		configurable: true
	});
	return BossPrivateViewSkin;
})(eui.Skin);var BossPublicItemSkin=(function (_super) {
	__extends(BossPublicItemSkin, _super);
	var BossPublicItemSkin$Skin14 = 	(function (_super) {
		__extends(BossPublicItemSkin$Skin14, _super);
		function BossPublicItemSkin$Skin14() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BossPublicItemSkin$Skin14.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return BossPublicItemSkin$Skin14;
	})(eui.Skin);

	var BossPublicItemSkin$Skin15 = 	(function (_super) {
		__extends(BossPublicItemSkin$Skin15, _super);
		function BossPublicItemSkin$Skin15() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
		}
		var _proto = BossPublicItemSkin$Skin15.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "strip_back_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.thumb_i = function () {
			var t = new eui.Image();
			this.thumb = t;
			t.percentHeight = 100;
			t.source = "strip_blue2_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.fontFamily = "Microsoft YaHei";
			t.horizontalCenter = 0;
			t.size = 24;
			t.textColor = 0xFFF7E6;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["thumb","labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return BossPublicItemSkin$Skin15;
	})(eui.Skin);

	var BossPublicItemSkin$Skin16 = 	(function (_super) {
		__extends(BossPublicItemSkin$Skin16, _super);
		function BossPublicItemSkin$Skin16() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image2","source","common_cb_selected_png")
					])
				,
				new eui.State ("downAndSelected",
					[
						new eui.SetProperty("_Image2","source","")
					])
				,
				new eui.State ("disabledAndSelected",
					[
						new eui.SetProperty("_Image2","source","")
					])
			];
		}
		var _proto = BossPublicItemSkin$Skin16.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.source = "common_cb_rect_png";
			t.x = 0;
			t.y = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.source = "";
			t.x = 0;
			t.y = 0;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.fontFamily = "Microsoft YaHei";
			t.size = 24;
			t.text = "";
			t.textColor = 0x7B6D61;
			t.x = 48;
			t.y = 8;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return BossPublicItemSkin$Skin16;
	})(eui.Skin);

	function BossPublicItemSkin() {
		_super.call(this);
		
		this.height = 178;
		this.width = 705;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._head_i(),this._Image3_i(),this._txtName_i(),this._txtLv_i(),this._txt0_i(),this._Group1_i(),this._bar_i(),this._checkBox_i(),this._pkIcon_i()];
	}
	var _proto = BossPublicItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 178;
		t.source = "common_wordBg_normal_png";
		t.width = 705;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "common_head_back1_png";
		t.x = 28;
		t.y = 21;
		return t;
	};
	_proto._head_i = function () {
		var t = new BitmapRemote();
		this._head = t;
		t.height = 125;
		t.width = 101;
		t.x = 37;
		t.y = 7;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 48;
		t.scale9Grid = new egret.Rectangle(34,5,73,32);
		t.source = "common_back2_png";
		t.width = 176;
		t.x = 7;
		t.y = 124;
		return t;
	};
	_proto._txtName_i = function () {
		var t = new Label();
		this._txtName = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "怪物名";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.width = 112;
		t.x = 6;
		t.y = 137;
		return t;
	};
	_proto._txtLv_i = function () {
		var t = new Label();
		this._txtLv = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "Lv80";
		t.textColor = 0xFFFFFF;
		t.x = 118;
		t.y = 137;
		return t;
	};
	_proto._txt0_i = function () {
		var t = new Label();
		this._txt0 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "血量：";
		t.textColor = 0x7B6D61;
		t.x = 179;
		t.y = 21;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 510;
		t.y = 64;
		t.elementsContent = [this._btn_i(),this._label_i()];
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.height = 86;
		t.label = "";
		t.width = 192;
		t.x = 0;
		t.y = 0;
		t.skinName = BossPublicItemSkin$Skin14;
		return t;
	};
	_proto._label_i = function () {
		var t = new eui.Image();
		this._label = t;
		t.horizontalCenter = 0;
		t.source = "common_label_killed_png";
		t.touchEnabled = false;
		t.verticalCenter = 0.5;
		return t;
	};
	_proto._bar_i = function () {
		var t = new ProgressBar();
		this._bar = t;
		t.height = 20;
		t.width = 258;
		t.x = 251;
		t.y = 23;
		t.skinName = BossPublicItemSkin$Skin15;
		return t;
	};
	_proto._checkBox_i = function () {
		var t = new CheckBox();
		this._checkBox = t;
		t.label = "关注";
		t.x = 547;
		t.y = 18;
		t.skinName = BossPublicItemSkin$Skin16;
		return t;
	};
	_proto._pkIcon_i = function () {
		var t = new eui.Image();
		this._pkIcon = t;
		t.source = "boss_pkIcon_png";
		t.x = 5;
		t.y = 6;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_head","_txtName","_txtLv","_txt0","_btn","_label","_bar","_checkBox","_pkIcon"];
		},
		enumerable: true,
		configurable: true
	});
	return BossPublicItemSkin;
})(eui.Skin);var BossPublicViewSkin=(function (_super) {
	__extends(BossPublicViewSkin, _super);
	function BossPublicViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._txtCount_i(),this._txtTime_i(),this._txtTips_i(),this._list_i()];
	}
	var _proto = BossPublicViewSkin.prototype;

	_proto._txtCount_i = function () {
		var t = new Label();
		this._txtCount = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "挑战次数：8/10";
		t.textColor = 0x7b6d61;
		t.x = 70;
		t.y = 118;
		return t;
	};
	_proto._txtTime_i = function () {
		var t = new Label();
		this._txtTime = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "恢复倒计时：00：28：00";
		t.textColor = 0x7B6D61;
		t.x = 400;
		t.y = 118;
		return t;
	};
	_proto._txtTips_i = function () {
		var t = new Label();
		this._txtTips = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "伤害第一的玩家可获得击杀大奖，其他玩家可获得参与奖励";
		t.textAlign = "center";
		t.textColor = 0x7B6D61;
		t.width = 680;
		t.x = 20;
		t.y = 1113;
		return t;
	};
	_proto._list_i = function () {
		var t = new BaseVScrollerList();
		this._list = t;
		t.anchorOffsetY = 0;
		t.height = 964;
		t.width = 710;
		t.x = 7;
		t.y = 144;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_txtCount","_txtTime","_txtTips","_list"];
		},
		enumerable: true,
		configurable: true
	});
	return BossPublicViewSkin;
})(eui.Skin);var BossRankViewSkin=(function (_super) {
	__extends(BossRankViewSkin, _super);
	function BossRankViewSkin() {
		_super.call(this);
		
		this.height = 144;
		this.width = 418;
		this.elementsContent = [this._Image1_i(),this._btn_i(),this._txtMy_i(),this._txtFirst_i(),this._group_i()];
	}
	var _proto = BossRankViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 35;
		t.scale9Grid = new egret.Rectangle(9,9,21,17);
		t.source = "boss_dmgList_bg_png";
		t.width = 203;
		t.x = 171;
		t.y = 2;
		return t;
	};
	_proto._btn_i = function () {
		var t = new eui.Image();
		this._btn = t;
		t.source = "boss_dmgList_btn_png";
		t.x = 374;
		t.y = 0;
		return t;
	};
	_proto._txtMy_i = function () {
		var t = new Label();
		this._txtMy = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 20;
		t.text = "Label";
		t.textColor = 0xfffbeb;
		t.x = 0;
		t.y = 9;
		return t;
	};
	_proto._txtFirst_i = function () {
		var t = new Label();
		this._txtFirst = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 20;
		t.text = "Label";
		t.textColor = 0xFFFBEB;
		t.x = 179;
		t.y = 9;
		return t;
	};
	_proto._group_i = function () {
		var t = new eui.Group();
		this._group = t;
		t.x = 171;
		t.y = 39;
		t.elementsContent = [this._back_i(),this._txtRank_i()];
		return t;
	};
	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.anchorOffsetY = 0;
		t.height = 92;
		t.scale9Grid = new egret.Rectangle(9,9,21,17);
		t.source = "boss_dmgList_bg_png";
		t.width = 203;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._txtRank_i = function () {
		var t = new Label();
		this._txtRank = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 20;
		t.text = "Label";
		t.textColor = 0xFFFBEB;
		t.x = 8;
		t.y = 8;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_btn","_txtMy","_txtFirst","_back","_txtRank","_group"];
		},
		enumerable: true,
		configurable: true
	});
	return BossRankViewSkin;
})(eui.Skin);var BossReviveViewSkin=(function (_super) {
	__extends(BossReviveViewSkin, _super);
	var BossReviveViewSkin$Skin17 = 	(function (_super) {
		__extends(BossReviveViewSkin$Skin17, _super);
		function BossReviveViewSkin$Skin17() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BossReviveViewSkin$Skin17.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return BossReviveViewSkin$Skin17;
	})(eui.Skin);

	var BossReviveViewSkin$Skin18 = 	(function (_super) {
		__extends(BossReviveViewSkin$Skin18, _super);
		function BossReviveViewSkin$Skin18() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_tip_close_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BossReviveViewSkin$Skin18.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_tip_close_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return BossReviveViewSkin$Skin18;
	})(eui.Skin);

	function BossReviveViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._name_i(),this._Image3_i(),this._Image4_i(),this._head_i(),this._btn_i(),this._Image5_i(),this._closeBtn_i()];
	}
	var _proto = BossReviveViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 334;
		t.scale9Grid = new egret.Rectangle(55,57,103,100);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_tipsBg_png";
		t.width = 238;
		t.x = 241;
		t.y = 473;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(55,17,103,0);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_title_wordBg_png";
		t.width = 207;
		t.x = 257;
		t.y = 489;
		return t;
	};
	_proto._name_i = function () {
		var t = new Label();
		this._name = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "BOSS名";
		t.textColor = 0x7C6E62;
		t.y = 492;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "boss_label_revive_png";
		t.x = 313;
		t.y = 675;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "common_head_back1_png";
		t.x = 301;
		t.y = 550;
		return t;
	};
	_proto._head_i = function () {
		var t = new BitmapRemote();
		this._head = t;
		t.height = 125;
		t.width = 101;
		t.x = 310;
		t.y = 536;
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.height = 90;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 197;
		t.x = 262;
		t.y = 711;
		t.skinName = BossReviveViewSkin$Skin17;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "common_label_tiaozhan_png";
		t.touchEnabled = false;
		t.x = 270;
		t.y = 730;
		return t;
	};
	_proto._closeBtn_i = function () {
		var t = new Button();
		this._closeBtn = t;
		t.label = "";
		t.x = 441;
		t.y = 475;
		t.skinName = BossReviveViewSkin$Skin18;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_name","_head","_btn","_closeBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return BossReviveViewSkin;
})(eui.Skin);var BossBloodStripSkin=(function (_super) {
	__extends(BossBloodStripSkin, _super);
	function BossBloodStripSkin() {
		_super.call(this);
		
		this.height = 119;
		this.width = 539;
		this.elementsContent = [this._Image1_i(),this._nameTxt_i(),this._Image2_i(),this._bossHead_i()];
	}
	var _proto = BossBloodStripSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "boss_blood_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "boss名字 Lv:80";
		t.textColor = 0xfffbeb;
		t.width = 400;
		t.x = 114;
		t.y = 13;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(35,19,11,10);
		t.source = "boss_blood_figure_png";
		t.width = 435;
		t.x = 104;
		t.y = 36;
		return t;
	};
	_proto._bossHead_i = function () {
		var t = new BitmapRemote();
		this._bossHead = t;
		t.height = 20;
		t.width = 20;
		t.x = 9;
		t.y = -15;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_nameTxt","_bossHead"];
		},
		enumerable: true,
		configurable: true
	});
	return BossBloodStripSkin;
})(eui.Skin);var BackgroundNoticeSkin=(function (_super) {
	__extends(BackgroundNoticeSkin, _super);
	var BackgroundNoticeSkin$Skin19 = 	(function (_super) {
		__extends(BackgroundNoticeSkin$Skin19, _super);
		function BackgroundNoticeSkin$Skin19() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BackgroundNoticeSkin$Skin19.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "common_tip_close_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return BackgroundNoticeSkin$Skin19;
	})(eui.Skin);

	function BackgroundNoticeSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._txt_i(),this._closeBtn_i()];
	}
	var _proto = BackgroundNoticeSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "notice_border_png";
		t.x = 105;
		t.y = 330;
		return t;
	};
	_proto._txt_i = function () {
		var t = new Label();
		this._txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 145;
		t.lineSpacing = 17;
		t.multiline = true;
		t.size = 22;
		t.text = "各位大侠！奔赴将于今日10:00开始进行 停机维护，预计维护时间为30分钟，还请 各位大侠见谅啊！                                                  XX游戏运营组";
		t.textAlign = "left";
		t.textColor = 0x7c6e62;
		t.verticalAlign = "middle";
		t.width = 420;
		t.x = 166;
		t.y = 369;
		return t;
	};
	_proto._closeBtn_i = function () {
		var t = new Button();
		this._closeBtn = t;
		t.label = "";
		t.x = 584;
		t.y = 355;
		t.skinName = BackgroundNoticeSkin$Skin19;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_txt","_closeBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return BackgroundNoticeSkin;
})(eui.Skin);var ChatChannelBtnSkin=(function (_super) {
	__extends(ChatChannelBtnSkin, _super);
	var ChatChannelBtnSkin$Skin20 = 	(function (_super) {
		__extends(ChatChannelBtnSkin$Skin20, _super);
		function ChatChannelBtnSkin$Skin20() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn4_1_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatChannelBtnSkin$Skin20.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn3_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ChatChannelBtnSkin$Skin20;
	})(eui.Skin);

	function ChatChannelBtnSkin() {
		_super.call(this);
		
		this.height = 70;
		this.width = 129;
		this.elementsContent = [this.btn_i(),this._Image1_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.channelName"],[0],this._Image1,"source")
	}
	var _proto = ChatChannelBtnSkin.prototype;

	_proto.btn_i = function () {
		var t = new ToggleButton();
		this.btn = t;
		t.label = "";
		t.x = 0;
		t.y = 0;
		t.skinName = ChatChannelBtnSkin$Skin20;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["btn"];
		},
		enumerable: true,
		configurable: true
	});
	return ChatChannelBtnSkin;
})(eui.Skin);var ChatContentItemSkin=(function (_super) {
	__extends(ChatContentItemSkin, _super);
	function ChatContentItemSkin() {
		_super.call(this);
		
		this.height = 34;
		this.width = 581;
		this.elementsContent = [this._txt_i()];
	}
	var _proto = ChatContentItemSkin.prototype;

	_proto._txt_i = function () {
		var t = new Label();
		this._txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.percentHeight = 100;
		t.lineSpacing = 5;
		t.multiline = true;
		t.size = 24;
		t.text = "";
		t.percentWidth = 100;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_txt"];
		},
		enumerable: true,
		configurable: true
	});
	return ChatContentItemSkin;
})(eui.Skin);var BaseTextInputSkin=(function (_super) {
	__extends(BaseTextInputSkin, _super);
	function BaseTextInputSkin() {
		_super.call(this);
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = BaseTextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(169,23,63,16);
		t.source = "friends_input_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 32;
		t.left = "10";
		t.right = "10";
		t.size = 24;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 32;
		t.left = 10;
		t.right = 10;
		t.size = 28;
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["textDisplay","promptDisplay"];
		},
		enumerable: true,
		configurable: true
	});
	return BaseTextInputSkin;
})(eui.Skin);var ChatViewSkin=(function (_super) {
	__extends(ChatViewSkin, _super);
	var ChatViewSkin$Skin21 = 	(function (_super) {
		__extends(ChatViewSkin$Skin21, _super);
		function ChatViewSkin$Skin21() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatViewSkin$Skin21.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "friends_backBtn_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ChatViewSkin$Skin21;
	})(eui.Skin);

	var ChatViewSkin$Skin22 = 	(function (_super) {
		__extends(ChatViewSkin$Skin22, _super);
		function ChatViewSkin$Skin22() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatViewSkin$Skin22.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "friends_face_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ChatViewSkin$Skin22;
	})(eui.Skin);

	var ChatViewSkin$Skin23 = 	(function (_super) {
		__extends(ChatViewSkin$Skin23, _super);
		function ChatViewSkin$Skin23() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatViewSkin$Skin23.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "friends_sendBtn_png";
			t.verticalCenter = 0;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ChatViewSkin$Skin23;
	})(eui.Skin);

	function ChatViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._channelList_i(),this._backBtn_i(),this._faceBtn_i(),this._sendBtn_i(),this._input_i(),this._msgScroll_i()];
	}
	var _proto = ChatViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 402;
		t.scale9Grid = new egret.Rectangle(15,37,11,225);
		t.source = "chat_back_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 737;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "chat_btn_back_png";
		t.x = 0;
		t.y = 737;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 107;
		t.scale9Grid = new egret.Rectangle(90,0,540,248);
		t.source = "panel_bg2_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 1033;
		return t;
	};
	_proto._channelList_i = function () {
		var t = new BaseVScrollerList();
		this._channelList = t;
		t.height = 296;
		t.width = 132;
		t.x = 0;
		t.y = 739;
		return t;
	};
	_proto._backBtn_i = function () {
		var t = new Button();
		this._backBtn = t;
		t.label = "";
		t.x = 7;
		t.y = 1052;
		t.skinName = ChatViewSkin$Skin21;
		return t;
	};
	_proto._faceBtn_i = function () {
		var t = new Button();
		this._faceBtn = t;
		t.label = "";
		t.x = 468;
		t.y = 1053;
		t.skinName = ChatViewSkin$Skin22;
		return t;
	};
	_proto._sendBtn_i = function () {
		var t = new Button();
		this._sendBtn = t;
		t.height = 90;
		t.label = "";
		t.width = 192;
		t.x = 528;
		t.y = 1043;
		t.skinName = ChatViewSkin$Skin23;
		return t;
	};
	_proto._input_i = function () {
		var t = new TextInput();
		this._input = t;
		t.height = 62;
		t.maxChars = 30;
		t.prompt = "聊天发送信息输入区域";
		t.skinName = "BaseTextInputSkin";
		t.width = 327;
		t.x = 136;
		t.y = 1058;
		return t;
	};
	_proto._msgScroll_i = function () {
		var t = new Scroller();
		this._msgScroll = t;
		t.height = 287;
		t.width = 581;
		t.x = 136;
		t.y = 745;
		t.viewport = this._msgGroup_i();
		return t;
	};
	_proto._msgGroup_i = function () {
		var t = new eui.Group();
		this._msgGroup = t;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_channelList","_backBtn","_faceBtn","_sendBtn","_input","_msgGroup","_msgScroll"];
		},
		enumerable: true,
		configurable: true
	});
	return ChatViewSkin;
})(eui.Skin);var SystemNoticeSkin=(function (_super) {
	__extends(SystemNoticeSkin, _super);
	function SystemNoticeSkin() {
		_super.call(this);
		
		this.height = 41;
		this.width = 498;
		this.elementsContent = [this._Image1_i(),this._txt_i()];
	}
	var _proto = SystemNoticeSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "notice_back_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._txt_i = function () {
		var t = new Label();
		this._txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.multiline = false;
		t.size = 22;
		t.text = "";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.wordWrap = false;
		t.x = 456;
		t.y = 7;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_txt"];
		},
		enumerable: true,
		configurable: true
	});
	return SystemNoticeSkin;
})(eui.Skin);var BaseGoodsSkin=(function (_super) {
	__extends(BaseGoodsSkin, _super);
	function BaseGoodsSkin() {
		_super.call(this);
		
		this.height = 141;
		this.minHeight = 99;
		this.minWidth = 99;
		this.width = 141;
		this.elementsContent = [this._bgImg_i(),this._itemSelect_i(),this._backbgImg_i(),this._itemImg_i(),this._countkunImg_i(),this._countTxt_i(),this._strengthenLevelTxt_i(),this._amountTxt_i(),this._star1_i(),this._star2_i(),this._star3_i(),this._jieImg_i(),this._jieTxt_i()];
	}
	var _proto = BaseGoodsSkin.prototype;

	_proto._bgImg_i = function () {
		var t = new eui.Image();
		this._bgImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 141;
		t.source = "common_itemBg_png";
		t.width = 141;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._itemSelect_i = function () {
		var t = new eui.Image();
		this._itemSelect = t;
		t.height = 141;
		t.source = "common_itemBg_select_png";
		t.visible = false;
		t.width = 141;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._backbgImg_i = function () {
		var t = new eui.Image();
		this._backbgImg = t;
		t.source = "";
		t.x = 28;
		t.y = 28;
		return t;
	};
	_proto._itemImg_i = function () {
		var t = new eui.Image();
		this._itemImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.width = 80;
		t.x = 31;
		t.y = 31;
		return t;
	};
	_proto._countkunImg_i = function () {
		var t = new eui.Image();
		this._countkunImg = t;
		t.source = "common_item_amountBg_png";
		t.x = 58;
		t.y = 91;
		return t;
	};
	_proto._countTxt_i = function () {
		var t = new Label();
		this._countTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 24;
		t.size = 24;
		t.text = "";
		t.textAlign = "right";
		t.width = 90;
		t.x = 20;
		t.y = 91;
		return t;
	};
	_proto._strengthenLevelTxt_i = function () {
		var t = new Label();
		this._strengthenLevelTxt = t;
		t.height = 24;
		t.size = 24;
		t.text = "";
		t.textAlign = "right";
		t.width = 90;
		t.x = 20;
		t.y = 91;
		return t;
	};
	_proto._amountTxt_i = function () {
		var t = new Label();
		this._amountTxt = t;
		t.height = 24;
		t.size = 24;
		t.text = "";
		t.textAlign = "right";
		t.width = 90;
		t.x = 20;
		t.y = 91;
		return t;
	};
	_proto._star1_i = function () {
		var t = new eui.Image();
		this._star1 = t;
		t.height = 20;
		t.source = "common_star_bright_png";
		t.width = 20;
		t.x = 92;
		t.y = 28;
		return t;
	};
	_proto._star2_i = function () {
		var t = new eui.Image();
		this._star2 = t;
		t.height = 20;
		t.source = "common_star_bright_png";
		t.width = 20;
		t.x = 92;
		t.y = 48;
		return t;
	};
	_proto._star3_i = function () {
		var t = new eui.Image();
		this._star3 = t;
		t.height = 20;
		t.source = "common_star_bright_png";
		t.width = 20;
		t.x = 92;
		t.y = 68;
		return t;
	};
	_proto._jieImg_i = function () {
		var t = new eui.Image();
		this._jieImg = t;
		t.source = "tips_jieduan_png";
		t.x = 20.85;
		t.y = 21.15;
		return t;
	};
	_proto._jieTxt_i = function () {
		var t = new Label();
		this._jieTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 21;
		t.size = 24;
		t.text = "1阶";
		t.width = 42;
		t.x = 27;
		t.y = 23;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_bgImg","_itemSelect","_backbgImg","_itemImg","_countkunImg","_countTxt","_strengthenLevelTxt","_amountTxt","_star1","_star2","_star3","_jieImg","_jieTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return BaseGoodsSkin;
})(eui.Skin);var CloakItemSkin=(function (_super) {
	__extends(CloakItemSkin, _super);
	function CloakItemSkin() {
		_super.call(this);
		
		this.height = 142;
		this.width = 242;
		this.elementsContent = [this._diImg_i(),this._effGup_i(),this._goods_i(),this._starGup_i(),this._nameTxt_i(),this._condTxt_i(),this._dangqianImg_i()];
	}
	var _proto = CloakItemSkin.prototype;

	_proto._diImg_i = function () {
		var t = new eui.Image();
		this._diImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 136;
		t.scale9Grid = new egret.Rectangle(29,11,181,69);
		t.source = "common_bg1_normal_png";
		t.width = 238;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto._effGup_i = function () {
		var t = new eui.Group();
		this._effGup = t;
		t.x = 1;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 136;
		t.scale9Grid = new egret.Rectangle(11,12,22,17);
		t.source = "common_xuanzhong1_png";
		t.width = 238;
		t.x = 1;
		t.y = 2;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 139;
		t.scale9Grid = new egret.Rectangle(13,13,84,84);
		t.source = "common_di_png";
		t.width = 240;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._goods_i = function () {
		var t = new Goods();
		this._goods = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = -6;
		t.y = -3;
		return t;
	};
	_proto._starGup_i = function () {
		var t = new eui.Group();
		this._starGup = t;
		t.x = 123;
		t.y = 79;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this._star1_i(),this._Image5_i(),this._star2_i(),this._Image6_i(),this._star3_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(24,10,60,13);
		t.source = "common__jindudi_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "common_star_grey_png";
		t.x = 3;
		t.y = 0;
		return t;
	};
	_proto._star1_i = function () {
		var t = new eui.Image();
		this._star1 = t;
		t.source = "common_star_bright_png";
		t.x = 3;
		t.y = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "common_star_grey_png";
		t.x = 33;
		t.y = 0;
		return t;
	};
	_proto._star2_i = function () {
		var t = new eui.Image();
		this._star2 = t;
		t.source = "common_star_bright_png";
		t.x = 34;
		t.y = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "common_star_grey_png";
		t.x = 66;
		t.y = 0;
		return t;
	};
	_proto._star3_i = function () {
		var t = new eui.Image();
		this._star3 = t;
		t.source = "common_star_bright_png";
		t.x = 67;
		t.y = 0;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "Label";
		t.textColor = 0x7c6e62;
		t.width = 116;
		t.x = 122;
		t.y = 34;
		return t;
	};
	_proto._condTxt_i = function () {
		var t = new Label();
		this._condTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 33;
		t.text = "Label";
		t.textColor = 0x7c6e62;
		t.width = 116;
		t.x = 122;
		t.y = 79;
		return t;
	};
	_proto._dangqianImg_i = function () {
		var t = new eui.Image();
		this._dangqianImg = t;
		t.source = "common_dangqian_png";
		t.x = 1;
		t.y = 2;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_diImg","_effGup","_goods","_star1","_star2","_star3","_starGup","_nameTxt","_condTxt","_dangqianImg"];
		},
		enumerable: true,
		configurable: true
	});
	return CloakItemSkin;
})(eui.Skin);var CloakViewSkin=(function (_super) {
	__extends(CloakViewSkin, _super);
	var CloakViewSkin$Skin24 = 	(function (_super) {
		__extends(CloakViewSkin$Skin24, _super);
		function CloakViewSkin$Skin24() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = CloakViewSkin$Skin24.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return CloakViewSkin$Skin24;
	})(eui.Skin);

	var CloakViewSkin$Skin25 = 	(function (_super) {
		__extends(CloakViewSkin$Skin25, _super);
		function CloakViewSkin$Skin25() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = CloakViewSkin$Skin25.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return CloakViewSkin$Skin25;
	})(eui.Skin);

	function CloakViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._putonBtn_i(),this._activeBtn_i(),this._Image2_i(),this._actImg_i(),this._putonImg_i(),this._ditImg_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._goods_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this._fightImg_i(),this._attrTxt1_i(),this._attrTxt2_i(),this._attrTxt3_i(),this._Image9_i(),this._star1_i(),this._Image10_i(),this._star2_i(),this._Image11_i(),this._star3_i(),this._takeoffImg_i(),this._upgradeImg_i(),this._vscroll_i(),this._nameTxt_i(),this._numTxt_i()];
	}
	var _proto = CloakViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 853;
		t.scale9Grid = new egret.Rectangle(32,102,16,613);
		t.source = "common_pnl_back1_png";
		t.width = 465;
		t.x = 250;
		t.y = 124;
		return t;
	};
	_proto._putonBtn_i = function () {
		var t = new Button();
		this._putonBtn = t;
		t.label = "Button";
		t.x = 73;
		t.y = 1010;
		t.skinName = CloakViewSkin$Skin24;
		return t;
	};
	_proto._activeBtn_i = function () {
		var t = new Button();
		this._activeBtn = t;
		t.label = "Button";
		t.x = 420;
		t.y = 1013;
		t.skinName = CloakViewSkin$Skin25;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 850;
		t.source = "common_pnl_back2_png";
		t.width = 244;
		t.x = 6;
		t.y = 127;
		return t;
	};
	_proto._actImg_i = function () {
		var t = new eui.Image();
		this._actImg = t;
		t.source = "common_active_png";
		t.x = 449;
		t.y = 1038;
		return t;
	};
	_proto._putonImg_i = function () {
		var t = new eui.Image();
		this._putonImg = t;
		t.source = "common_label_png";
		t.x = 101;
		t.y = 1037;
		return t;
	};
	_proto._ditImg_i = function () {
		var t = new eui.Image();
		this._ditImg = t;
		t.source = "cloak_di3_png";
		t.x = 251;
		t.y = 127;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "common_name_back_png";
		t.x = 256;
		t.y = 158;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 194;
		t.scale9Grid = new egret.Rectangle(10,10,63,65);
		t.source = "common_di2_png";
		t.width = 226;
		t.x = 254;
		t.y = 759;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 189;
		t.scale9Grid = new egret.Rectangle(10,10,63,65);
		t.source = "common_di2_png";
		t.width = 226;
		t.x = 487.36;
		t.y = 761;
		return t;
	};
	_proto._goods_i = function () {
		var t = new Goods();
		this._goods = t;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 529.86;
		t.y = 807;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "cloak_suoxucl_png";
		t.x = 500;
		t.y = 768;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "cloak_shuxingjc_png";
		t.x = 269;
		t.y = 767;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "common_fighting_png";
		t.x = 264;
		t.y = 669;
		return t;
	};
	_proto._fightImg_i = function () {
		var t = new eui.Image();
		this._fightImg = t;
		t.source = "common_zhanli_png";
		t.x = 327;
		t.y = 677;
		return t;
	};
	_proto._attrTxt1_i = function () {
		var t = new Label();
		this._attrTxt1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 34;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0x7c6e62;
		t.width = 205;
		t.x = 275;
		t.y = 815;
		return t;
	};
	_proto._attrTxt2_i = function () {
		var t = new Label();
		this._attrTxt2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 34;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0x7c6e62;
		t.width = 207;
		t.x = 275;
		t.y = 860;
		return t;
	};
	_proto._attrTxt3_i = function () {
		var t = new Label();
		this._attrTxt3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 34;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0x7c6e62;
		t.width = 207;
		t.x = 275;
		t.y = 905;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "common_star_grey_png";
		t.x = 409;
		t.y = 176;
		return t;
	};
	_proto._star1_i = function () {
		var t = new eui.Image();
		this._star1 = t;
		t.source = "common_star_bright_png";
		t.x = 409;
		t.y = 176;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.source = "common_star_grey_png";
		t.x = 470;
		t.y = 176;
		return t;
	};
	_proto._star2_i = function () {
		var t = new eui.Image();
		this._star2 = t;
		t.source = "common_star_bright_png";
		t.x = 470;
		t.y = 176;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.source = "common_star_grey_png";
		t.x = 530;
		t.y = 176;
		return t;
	};
	_proto._star3_i = function () {
		var t = new eui.Image();
		this._star3 = t;
		t.source = "common_star_bright_png";
		t.x = 531;
		t.y = 176;
		return t;
	};
	_proto._takeoffImg_i = function () {
		var t = new eui.Image();
		this._takeoffImg = t;
		t.source = "common_takeoff_label_png";
		t.x = 102;
		t.y = 1038;
		return t;
	};
	_proto._upgradeImg_i = function () {
		var t = new eui.Image();
		this._upgradeImg = t;
		t.source = "common_upgrade_label_png";
		t.x = 450;
		t.y = 1039;
		return t;
	};
	_proto._vscroll_i = function () {
		var t = new BaseVScrollerList();
		this._vscroll = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 841;
		t.width = 242;
		t.x = 7;
		t.y = 129;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 210;
		t.size = 33;
		t.text = "中在夺地";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 37;
		t.x = 280;
		t.y = 197;
		return t;
	};
	_proto._numTxt_i = function () {
		var t = new Label();
		this._numTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 25;
		t.text = "1";
		t.textAlign = "right";
		t.width = 63;
		t.x = 576;
		t.y = 893;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_putonBtn","_activeBtn","_actImg","_putonImg","_ditImg","_goods","_fightImg","_attrTxt1","_attrTxt2","_attrTxt3","_star1","_star2","_star3","_takeoffImg","_upgradeImg","_vscroll","_nameTxt","_numTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return CloakViewSkin;
})(eui.Skin);var ChooseClubViewSkin=(function (_super) {
	__extends(ChooseClubViewSkin, _super);
	var ChooseClubViewSkin$Skin26 = 	(function (_super) {
		__extends(ChooseClubViewSkin$Skin26, _super);
		function ChooseClubViewSkin$Skin26() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","club_img1_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChooseClubViewSkin$Skin26.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "club_img1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ChooseClubViewSkin$Skin26;
	})(eui.Skin);

	var ChooseClubViewSkin$Skin27 = 	(function (_super) {
		__extends(ChooseClubViewSkin$Skin27, _super);
		function ChooseClubViewSkin$Skin27() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","club_img2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChooseClubViewSkin$Skin27.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "club_img2_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ChooseClubViewSkin$Skin27;
	})(eui.Skin);

	var ChooseClubViewSkin$Skin28 = 	(function (_super) {
		__extends(ChooseClubViewSkin$Skin28, _super);
		function ChooseClubViewSkin$Skin28() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","club_img3_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChooseClubViewSkin$Skin28.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "club_img3_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ChooseClubViewSkin$Skin28;
	})(eui.Skin);

	function ChooseClubViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i(),this._Image1_i(),this._club2_i(),this._Image2_i(),this._Image3_i(),this._club3_i(),this._Image4_i(),this._Image5_i(),this._club1_i(),this._Image6_i(),this._Image7_i(),this._tui2_i(),this._tui3_i(),this._tui1_i()];
	}
	var _proto = ChooseClubViewSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.height = 1280;
		t.skinName = "BasePanelSkin";
		t.visible = false;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1160;
		t.horizontalCenter = 0;
		t.source = "club_bg_jpg";
		t.width = 710;
		t.y = 116;
		return t;
	};
	_proto._club2_i = function () {
		var t = new Button();
		this._club2 = t;
		t.label = "";
		t.x = 410;
		t.y = 324;
		t.skinName = ChooseClubViewSkin$Skin26;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 394;
		t.source = "common_name_back_png";
		t.width = 80;
		t.x = 583;
		t.y = 257;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 126;
		t.source = "club_name2_png";
		t.width = 44;
		t.x = 605;
		t.y = 342;
		return t;
	};
	_proto._club3_i = function () {
		var t = new Button();
		this._club3 = t;
		t.label = "";
		t.x = 120;
		t.y = 454;
		t.skinName = ChooseClubViewSkin$Skin27;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 394;
		t.source = "common_name_back_png";
		t.width = 80;
		t.x = 63;
		t.y = 386;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 126;
		t.source = "club_name3_png";
		t.width = 44;
		t.x = 85;
		t.y = 471;
		return t;
	};
	_proto._club1_i = function () {
		var t = new Button();
		this._club1 = t;
		t.label = "";
		t.x = 260;
		t.y = 904;
		t.skinName = ChooseClubViewSkin$Skin28;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 394;
		t.source = "common_name_back_png";
		t.width = 80;
		t.x = 173;
		t.y = 837;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.height = 126;
		t.source = "club_name1_png";
		t.width = 44;
		t.x = 195;
		t.y = 922;
		return t;
	};
	_proto._tui2_i = function () {
		var t = new eui.Image();
		this._tui2 = t;
		t.height = 86;
		t.source = "club_tuijian_png";
		t.visible = false;
		t.width = 140;
		t.x = 414;
		t.y = 441;
		return t;
	};
	_proto._tui3_i = function () {
		var t = new eui.Image();
		this._tui3 = t;
		t.height = 86;
		t.source = "club_tuijian_png";
		t.visible = false;
		t.width = 140;
		t.x = 123;
		t.y = 570;
		return t;
	};
	_proto._tui1_i = function () {
		var t = new eui.Image();
		this._tui1 = t;
		t.height = 86;
		t.source = "club_tuijian_png";
		t.visible = false;
		t.width = 140;
		t.x = 264;
		t.y = 1023;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel","_club2","_club3","_club1","_tui2","_tui3","_tui1"];
		},
		enumerable: true,
		configurable: true
	});
	return ChooseClubViewSkin;
})(eui.Skin);var ClubBuildViewSkin=(function (_super) {
	__extends(ClubBuildViewSkin, _super);
	var ClubBuildViewSkin$Skin29 = 	(function (_super) {
		__extends(ClubBuildViewSkin$Skin29, _super);
		function ClubBuildViewSkin$Skin29() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","club_gfg_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ClubBuildViewSkin$Skin29.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "club_gfg_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ClubBuildViewSkin$Skin29;
	})(eui.Skin);

	var ClubBuildViewSkin$Skin30 = 	(function (_super) {
		__extends(ClubBuildViewSkin$Skin30, _super);
		function ClubBuildViewSkin$Skin30() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","club_home_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ClubBuildViewSkin$Skin30.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "club_home_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ClubBuildViewSkin$Skin30;
	})(eui.Skin);

	var ClubBuildViewSkin$Skin31 = 	(function (_super) {
		__extends(ClubBuildViewSkin$Skin31, _super);
		function ClubBuildViewSkin$Skin31() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","club_careerWord_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ClubBuildViewSkin$Skin31.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "club_careerWord_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ClubBuildViewSkin$Skin31;
	})(eui.Skin);

	var ClubBuildViewSkin$Skin32 = 	(function (_super) {
		__extends(ClubBuildViewSkin$Skin32, _super);
		function ClubBuildViewSkin$Skin32() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","club_edit_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ClubBuildViewSkin$Skin32.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "club_edit_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ClubBuildViewSkin$Skin32;
	})(eui.Skin);

	function ClubBuildViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._clubViewBtn_i(),this._careerBtn_i(),this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Button1_i(),this._Button2_i(),this._Button3_i(),this._ggBg_i(),this._gonggao_i(),this._editBtn_i(),this._masterName_i(),this._gfgBtn_i(),this._clubHomeBtn_i(),this._clubCareerBtn_i()];
	}
	var _proto = ClubBuildViewSkin.prototype;

	_proto._clubViewBtn_i = function () {
		var t = new Button();
		this._clubViewBtn = t;
		t.label = "正殿";
		t.x = 492;
		t.y = 191;
		return t;
	};
	_proto._careerBtn_i = function () {
		var t = new Button();
		this._careerBtn = t;
		t.label = "职位";
		t.x = 178;
		t.y = 318;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1160;
		t.source = "club_buildingBg_jpg";
		t.width = 710;
		t.x = 5;
		t.y = 116;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 179;
		t.source = "club_buildingGuy_png";
		t.width = 139;
		t.x = 292;
		t.y = 562;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 394;
		t.source = "common_name_back_png";
		t.width = 80;
		t.x = 149;
		t.y = 311;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 394;
		t.source = "common_name_back_png";
		t.width = 80;
		t.x = 319;
		t.y = 151;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 394;
		t.source = "common_name_back_png";
		t.width = 80;
		t.x = 540;
		t.y = 142;
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.height = 120;
		t.label = "";
		t.width = 42;
		t.x = 170;
		t.y = 389;
		t.skinName = ClubBuildViewSkin$Skin29;
		return t;
	};
	_proto._Button2_i = function () {
		var t = new eui.Button();
		t.height = 162;
		t.label = "";
		t.width = 50;
		t.x = 339;
		t.y = 232;
		t.skinName = ClubBuildViewSkin$Skin30;
		return t;
	};
	_proto._Button3_i = function () {
		var t = new eui.Button();
		t.height = 162;
		t.label = "";
		t.width = 50;
		t.x = 560;
		t.y = 226;
		t.skinName = ClubBuildViewSkin$Skin31;
		return t;
	};
	_proto._ggBg_i = function () {
		var t = new eui.Image();
		this._ggBg = t;
		t.anchorOffsetX = 0;
		t.height = 41;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(280,0,7,41);
		t.source = "notice_back_png";
		t.width = 400;
		t.y = 153;
		return t;
	};
	_proto._gonggao_i = function () {
		var t = new Label();
		this._gonggao = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "";
		t.textColor = 0xe5dfd3;
		t.x = 173;
		t.y = 161;
		return t;
	};
	_proto._editBtn_i = function () {
		var t = new Button();
		this._editBtn = t;
		t.label = "";
		t.x = 553;
		t.y = 137;
		t.skinName = ClubBuildViewSkin$Skin32;
		return t;
	};
	_proto._masterName_i = function () {
		var t = new Label();
		this._masterName = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 24;
		t.size = 24;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xf9db2c;
		t.width = 220;
		t.x = 278;
		t.y = 525;
		return t;
	};
	_proto._gfgBtn_i = function () {
		var t = new eui.Group();
		this._gfgBtn = t;
		t.height = 200;
		t.width = 200;
		t.x = 27;
		t.y = 330;
		return t;
	};
	_proto._clubHomeBtn_i = function () {
		var t = new eui.Group();
		this._clubHomeBtn = t;
		t.height = 200;
		t.width = 200;
		t.x = 220;
		t.y = 196;
		return t;
	};
	_proto._clubCareerBtn_i = function () {
		var t = new eui.Group();
		this._clubCareerBtn = t;
		t.height = 200;
		t.width = 200;
		t.x = 444;
		t.y = 196;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_clubViewBtn","_careerBtn","_ggBg","_gonggao","_editBtn","_masterName","_gfgBtn","_clubHomeBtn","_clubCareerBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return ClubBuildViewSkin;
})(eui.Skin);var ClubCareerViewSkin=(function (_super) {
	__extends(ClubCareerViewSkin, _super);
	var ClubCareerViewSkin$Skin33 = 	(function (_super) {
		__extends(ClubCareerViewSkin$Skin33, _super);
		function ClubCareerViewSkin$Skin33() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ClubCareerViewSkin$Skin33.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ClubCareerViewSkin$Skin33;
	})(eui.Skin);

	function ClubCareerViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._group_i()];
	}
	var _proto = ClubCareerViewSkin.prototype;

	_proto._group_i = function () {
		var t = new eui.Group();
		this._group = t;
		t.height = 1280;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this._basePopView_i(),this._Image1_i(),this._curCareer_i(),this._Image2_i(),this._Image3_i(),this._tiaojian1_i(),this._tiaojian2_i(),this._tiaojian3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._curAttr1_i(),this._curAttr2_i(),this._curAttr3_i(),this._Image7_i(),this._Image8_i(),this._nextAttr1_i(),this._nextAttr2_i(),this._nextAttr3_i(),this._Image9_i(),this._Image10_i(),this._btn_i(),this._btnImg_i()];
		return t;
	};
	_proto._basePopView_i = function () {
		var t = new BasePopUpView();
		this._basePopView = t;
		t.height = 1280;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BasePopUpSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 52;
		t.source = "club_curCareer_png";
		t.width = 181;
		t.x = 212;
		t.y = 196;
		return t;
	};
	_proto._curCareer_i = function () {
		var t = new Label();
		this._curCareer = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "无职位";
		t.textColor = 0x7c6e62;
		t.x = 393;
		t.y = 209;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 3;
		t.horizontalCenter = 0;
		t.source = "common_line_png";
		t.width = 658;
		t.y = 263;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 52;
		t.horizontalCenter = 0.5;
		t.source = "club_changeLife_png";
		t.width = 181;
		t.y = 281;
		return t;
	};
	_proto._tiaojian1_i = function () {
		var t = new Label();
		this._tiaojian1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 237;
		t.y = 337;
		return t;
	};
	_proto._tiaojian2_i = function () {
		var t = new Label();
		this._tiaojian2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 237;
		t.y = 381;
		return t;
	};
	_proto._tiaojian3_i = function () {
		var t = new Label();
		this._tiaojian3 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 237;
		t.y = 424;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 3;
		t.horizontalCenter = 0;
		t.source = "common_line_png";
		t.width = 658;
		t.y = 471;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 190;
		t.scale9Grid = new egret.Rectangle(10,10,63,65);
		t.source = "common_di2_png";
		t.width = 230;
		t.x = 61;
		t.y = 501;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 52;
		t.source = "club_curAttr_png";
		t.width = 181;
		t.x = 87.5;
		t.y = 513;
		return t;
	};
	_proto._curAttr1_i = function () {
		var t = new Label();
		this._curAttr1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 90;
		t.y = 574;
		return t;
	};
	_proto._curAttr2_i = function () {
		var t = new Label();
		this._curAttr2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 90;
		t.y = 604;
		return t;
	};
	_proto._curAttr3_i = function () {
		var t = new Label();
		this._curAttr3 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 90;
		t.y = 634;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 190;
		t.scale9Grid = new egret.Rectangle(10,10,63,65);
		t.source = "common_di2_png";
		t.width = 230;
		t.x = 424;
		t.y = 501;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.height = 52;
		t.source = "club_nextAttr_png";
		t.width = 181;
		t.x = 448.5;
		t.y = 513;
		return t;
	};
	_proto._nextAttr1_i = function () {
		var t = new Label();
		this._nextAttr1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 453;
		t.y = 574;
		return t;
	};
	_proto._nextAttr2_i = function () {
		var t = new Label();
		this._nextAttr2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 453;
		t.y = 604;
		return t;
	};
	_proto._nextAttr3_i = function () {
		var t = new Label();
		this._nextAttr3 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 453;
		t.y = 634;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.height = 3;
		t.horizontalCenter = 0;
		t.source = "common_line_png";
		t.width = 658;
		t.y = 712;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.height = 52;
		t.horizontalCenter = 0;
		t.source = "club_fenglu_png";
		t.width = 181;
		t.y = 730;
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 928;
		t.skinName = ClubCareerViewSkin$Skin33;
		return t;
	};
	_proto._btnImg_i = function () {
		var t = new eui.Image();
		this._btnImg = t;
		t.height = 52;
		t.source = "common_label_lingqu_0_png";
		t.width = 181;
		t.x = 269.5;
		t.y = 954.5;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_basePopView","_curCareer","_tiaojian1","_tiaojian2","_tiaojian3","_curAttr1","_curAttr2","_curAttr3","_nextAttr1","_nextAttr2","_nextAttr3","_btn","_btnImg","_group"];
		},
		enumerable: true,
		configurable: true
	});
	return ClubCareerViewSkin;
})(eui.Skin);var ClubEditNoticeViewSkin=(function (_super) {
	__extends(ClubEditNoticeViewSkin, _super);
	var ClubEditNoticeViewSkin$Skin34 = 	(function (_super) {
		__extends(ClubEditNoticeViewSkin$Skin34, _super);
		function ClubEditNoticeViewSkin$Skin34() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ClubEditNoticeViewSkin$Skin34.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ClubEditNoticeViewSkin$Skin34;
	})(eui.Skin);

	function ClubEditNoticeViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = ClubEditNoticeViewSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1280;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this._tipBaseView_i(),this._input_i(),this._btn_i(),this._btnImg_i()];
		return t;
	};
	_proto._tipBaseView_i = function () {
		var t = new BasePopUpView();
		this._tipBaseView = t;
		t.height = 1280;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BasePopUpSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._input_i = function () {
		var t = new eui.TextInput();
		this._input = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 220;
		t.horizontalCenter = 0;
		t.skinName = "BaseTextInputSkin";
		t.width = 508;
		t.y = 407;
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 672;
		t.skinName = ClubEditNoticeViewSkin$Skin34;
		return t;
	};
	_proto._btnImg_i = function () {
		var t = new eui.Image();
		this._btnImg = t;
		t.height = 52;
		t.source = "confirm_png";
		t.width = 181;
		t.x = 269.5;
		t.y = 698.5;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_tipBaseView","_input","_btn","_btnImg"];
		},
		enumerable: true,
		configurable: true
	});
	return ClubEditNoticeViewSkin;
})(eui.Skin);var ClubJoinTipsViewSkin=(function (_super) {
	__extends(ClubJoinTipsViewSkin, _super);
	var ClubJoinTipsViewSkin$Skin35 = 	(function (_super) {
		__extends(ClubJoinTipsViewSkin$Skin35, _super);
		function ClubJoinTipsViewSkin$Skin35() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ClubJoinTipsViewSkin$Skin35.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ClubJoinTipsViewSkin$Skin35;
	})(eui.Skin);

	var ClubJoinTipsViewSkin$Skin36 = 	(function (_super) {
		__extends(ClubJoinTipsViewSkin$Skin36, _super);
		function ClubJoinTipsViewSkin$Skin36() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ClubJoinTipsViewSkin$Skin36.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ClubJoinTipsViewSkin$Skin36;
	})(eui.Skin);

	function ClubJoinTipsViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._group_i()];
	}
	var _proto = ClubJoinTipsViewSkin.prototype;

	_proto._group_i = function () {
		var t = new eui.Group();
		this._group = t;
		t.height = 1280;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this._tipsView_i(),this._okBtn_i(),this._okBtnImg_i(),this._tips1_i(),this._tips2_i(),this._cancelBtn_i(),this._cancelBtnImg_i()];
		return t;
	};
	_proto._tipsView_i = function () {
		var t = new BasePopUpView();
		this._tipsView = t;
		t.height = 1280;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BasePopUpSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._okBtn_i = function () {
		var t = new Button();
		this._okBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 157;
		t.label = "";
		t.y = 675;
		t.skinName = ClubJoinTipsViewSkin$Skin35;
		return t;
	};
	_proto._okBtnImg_i = function () {
		var t = new eui.Image();
		this._okBtnImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 157.5;
		t.source = "confirm_png";
		t.y = 703;
		return t;
	};
	_proto._tips1_i = function () {
		var t = new Label();
		this._tips1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 24;
		t.text = "是否确定加入雄霸天下世家？（选择后无法更改）";
		t.textColor = 0x7c6e62;
		t.y = 401;
		return t;
	};
	_proto._tips2_i = function () {
		var t = new Label();
		this._tips2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 24;
		t.text = "加入推荐的世家可获得推荐好礼一份！";
		t.textColor = 0xff0000;
		t.y = 475;
		return t;
	};
	_proto._cancelBtn_i = function () {
		var t = new Button();
		this._cancelBtn = t;
		t.label = "";
		t.x = 95;
		t.y = 675;
		t.skinName = ClubJoinTipsViewSkin$Skin36;
		return t;
	};
	_proto._cancelBtnImg_i = function () {
		var t = new eui.Image();
		this._cancelBtnImg = t;
		t.source = "common_label_quxiao_png";
		t.x = 127;
		t.y = 702;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_tipsView","_okBtn","_okBtnImg","_tips1","_tips2","_cancelBtn","_cancelBtnImg","_group"];
		},
		enumerable: true,
		configurable: true
	});
	return ClubJoinTipsViewSkin;
})(eui.Skin);var ClubPanelSkin=(function (_super) {
	__extends(ClubPanelSkin, _super);
	function ClubPanelSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i()];
	}
	var _proto = ClubPanelSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.height = 1280;
		t.skinName = "BasePanelSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel"];
		},
		enumerable: true,
		configurable: true
	});
	return ClubPanelSkin;
})(eui.Skin);var ClubViewSkin=(function (_super) {
	__extends(ClubViewSkin, _super);
	var ClubViewSkin$Skin37 = 	(function (_super) {
		__extends(ClubViewSkin$Skin37, _super);
		function ClubViewSkin$Skin37() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ClubViewSkin$Skin37.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ClubViewSkin$Skin37;
	})(eui.Skin);

	var ClubViewSkin$Skin38 = 	(function (_super) {
		__extends(ClubViewSkin$Skin38, _super);
		function ClubViewSkin$Skin38() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ClubViewSkin$Skin38.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ClubViewSkin$Skin38;
	})(eui.Skin);

	function ClubViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = ClubViewSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1280;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this._basePopView_i(),this._Image1_i(),this._clubName_i(),this._Label1_i(),this._masterName_i(),this._Image2_i(),this._Image3_i(),this._Label2_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._memberList_i(),this._Image7_i(),this._clubCareer_i(),this._nickName_i(),this._fighting_i(),this._Image8_i(),this._Label3_i(),this._Image9_i(),this._gongxian_i(),this._Image10_i(),this._Image11_i(),this._Image12_i(),this._Label4_i(),this._gongxianValue1_i(),this._timeValue1_i(),this._btn1_i(),this._btnImg1_i(),this._Image13_i(),this._Image14_i(),this._Image15_i(),this._Label5_i(),this._gongxianValue2_i(),this._timeValue2_i(),this._btn2_i(),this._btnImg2_i(),this._icon1_i(),this._icon2_i(),this._coinValue_i(),this._goldValue_i()];
		return t;
	};
	_proto._basePopView_i = function () {
		var t = new BasePopUpView();
		this._basePopView = t;
		t.height = 1280;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BasePopUpSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 170;
		t.source = "common_itemBg_png";
		t.width = 170;
		t.x = 24;
		t.y = 187;
		return t;
	};
	_proto._clubName_i = function () {
		var t = new Label();
		this._clubName = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "名称";
		t.textColor = 0x7c6e62;
		t.x = 192;
		t.y = 212;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "现任掌门：";
		t.textColor = 0x7c6e62;
		t.x = 192;
		t.y = 260;
		return t;
	};
	_proto._masterName_i = function () {
		var t = new Label();
		this._masterName = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "虚位以待";
		t.textColor = 0x7c6e62;
		t.x = 312;
		t.y = 260;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 3;
		t.horizontalCenter = 0;
		t.source = "common_line_png";
		t.width = 658;
		t.y = 353;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 36;
		t.horizontalCenter = 0.5;
		t.source = "common_title_wordBg_png";
		t.width = 209;
		t.y = 365;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 26;
		t.text = "门派成员";
		t.textColor = 0x7c6e62;
		t.y = 369;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 44;
		t.source = "club_career_png";
		t.width = 66;
		t.x = 118;
		t.y = 404;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "common_label_name_png";
		t.x = 326;
		t.y = 404;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "common_fight_rank_png";
		t.x = 566;
		t.y = 404;
		return t;
	};
	_proto._memberList_i = function () {
		var t = new BaseVScrollerList();
		this._memberList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 222;
		t.horizontalCenter = 0.5;
		t.width = 655;
		t.y = 450;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 55;
		t.horizontalCenter = 0.5;
		t.scale9Grid = new egret.Rectangle(10,10,63,65);
		t.source = "common_di2_png";
		t.width = 655;
		t.y = 680;
		return t;
	};
	_proto._clubCareer_i = function () {
		var t = new Label();
		this._clubCareer = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "";
		t.textColor = 0x38b800;
		t.x = 121;
		t.y = 694;
		return t;
	};
	_proto._nickName_i = function () {
		var t = new Label();
		this._nickName = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "";
		t.textColor = 0x38b800;
		t.y = 694;
		return t;
	};
	_proto._fighting_i = function () {
		var t = new Label();
		this._fighting = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "";
		t.textColor = 0x38b800;
		t.x = 567;
		t.y = 694;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 36;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(54,4,108,28);
		t.source = "common_title_wordBg_png";
		t.width = 498;
		t.y = 743;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new Label();
		t.size = 28;
		t.text = "盟会贡献：";
		t.textColor = 0x7c6e62;
		t.x = 196;
		t.y = 747;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.height = 46;
		t.source = "playRes_donate_54_png";
		t.width = 45;
		t.x = 326;
		t.y = 738;
		return t;
	};
	_proto._gongxian_i = function () {
		var t = new Label();
		this._gongxian = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "0/0";
		t.textColor = 0x7c6e62;
		t.x = 376;
		t.y = 747;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 126;
		t.horizontalCenter = 0.5;
		t.scale9Grid = new egret.Rectangle(29,11,181,69);
		t.source = "common_bg1_normal_png";
		t.width = 655;
		t.y = 788;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.height = 116;
		t.source = "club_gxIm1_png";
		t.width = 169;
		t.x = 39;
		t.y = 793;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.height = 43;
		t.source = "club_gx_word1_png";
		t.width = 122;
		t.x = 299;
		t.y = 805;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "盟会贡献：";
		t.textColor = 0x7c6e62;
		t.x = 267;
		t.y = 860;
		return t;
	};
	_proto._gongxianValue1_i = function () {
		var t = new Label();
		this._gongxianValue1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "0";
		t.textColor = 0xfd7100;
		t.x = 406;
		t.y = 860;
		return t;
	};
	_proto._timeValue1_i = function () {
		var t = new Label();
		this._timeValue1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "剩余次数5次";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.x = 520;
		t.y = 795;
		return t;
	};
	_proto._btn1_i = function () {
		var t = new Button();
		this._btn1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.44;
		t.label = "";
		t.width = 171;
		t.x = 495;
		t.y = 811;
		t.skinName = ClubViewSkin$Skin37;
		return t;
	};
	_proto._btnImg1_i = function () {
		var t = new eui.Image();
		this._btnImg1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 42;
		t.source = "club_jx_png";
		t.width = 144;
		t.x = 508;
		t.y = 827;
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 126;
		t.horizontalCenter = 0.5;
		t.scale9Grid = new egret.Rectangle(29,11,181,69);
		t.source = "common_bg1_normal_png";
		t.width = 655;
		t.y = 925;
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.height = 116;
		t.source = "club_gxIm2_png";
		t.width = 169;
		t.x = 39;
		t.y = 928;
		return t;
	};
	_proto._Image15_i = function () {
		var t = new eui.Image();
		t.height = 43;
		t.source = "club_gx_word2_png";
		t.width = 122;
		t.x = 299;
		t.y = 940;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "盟会贡献：";
		t.textColor = 0x7c6e62;
		t.x = 267;
		t.y = 995;
		return t;
	};
	_proto._gongxianValue2_i = function () {
		var t = new Label();
		this._gongxianValue2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "0";
		t.textColor = 0xfd7100;
		t.x = 406;
		t.y = 996;
		return t;
	};
	_proto._timeValue2_i = function () {
		var t = new Label();
		this._timeValue2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "剩余次数5次";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.x = 520;
		t.y = 932;
		return t;
	};
	_proto._btn2_i = function () {
		var t = new Button();
		this._btn2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.44;
		t.label = "";
		t.width = 171;
		t.x = 495;
		t.y = 947;
		t.skinName = ClubViewSkin$Skin38;
		return t;
	};
	_proto._btnImg2_i = function () {
		var t = new eui.Image();
		this._btnImg2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 42;
		t.source = "club_jx_png";
		t.width = 144;
		t.x = 508;
		t.y = 963;
		return t;
	};
	_proto._icon1_i = function () {
		var t = new eui.Image();
		this._icon1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 54;
		t.source = "playRes_coin_54_png";
		t.width = 54;
		t.x = 509;
		t.y = 867;
		return t;
	};
	_proto._icon2_i = function () {
		var t = new eui.Image();
		this._icon2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 54;
		t.source = "playRes_gold_54_png";
		t.width = 54;
		t.x = 535;
		t.y = 1003;
		return t;
	};
	_proto._coinValue_i = function () {
		var t = new Label();
		this._coinValue = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "200000";
		t.textColor = 0x7c6e62;
		t.x = 558;
		t.y = 881;
		return t;
	};
	_proto._goldValue_i = function () {
		var t = new Label();
		this._goldValue = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "100";
		t.textColor = 0x7c6e62;
		t.x = 584;
		t.y = 1018;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_basePopView","_clubName","_masterName","_memberList","_clubCareer","_nickName","_fighting","_gongxian","_gongxianValue1","_timeValue1","_btn1","_btnImg1","_gongxianValue2","_timeValue2","_btn2","_btnImg2","_icon1","_icon2","_coinValue","_goldValue"];
		},
		enumerable: true,
		configurable: true
	});
	return ClubViewSkin;
})(eui.Skin);var ClubMemberItemViewSkin=(function (_super) {
	__extends(ClubMemberItemViewSkin, _super);
	function ClubMemberItemViewSkin() {
		_super.call(this);
		
		this.height = 65;
		this.width = 655;
		this.elementsContent = [this._Image1_i(),this._career_i(),this._nickName_i(),this._fighting_i()];
	}
	var _proto = ClubMemberItemViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 55;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(10,10,63,65);
		t.source = "common_di2_png";
		t.width = 655;
		t.y = 0;
		return t;
	};
	_proto._career_i = function () {
		var t = new Label();
		this._career = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "大神";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.x = 90;
		t.y = 14;
		return t;
	};
	_proto._nickName_i = function () {
		var t = new Label();
		this._nickName = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "大神大神大神";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.y = 14;
		return t;
	};
	_proto._fighting_i = function () {
		var t = new Label();
		this._fighting = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "大神";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.x = 537;
		t.y = 14;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_career","_nickName","_fighting"];
		},
		enumerable: true,
		configurable: true
	});
	return ClubMemberItemViewSkin;
})(eui.Skin);var BaseFuncBtnSkin=(function (_super) {
	__extends(BaseFuncBtnSkin, _super);
	function BaseFuncBtnSkin() {
		_super.call(this);
		
		this.height = 130;
		this.width = 120;
		this.elementsContent = [this._effect_i(),this._redIcon_i(),this._Image5_i()];
		this._Image1_i();
		this._Image2_i();
		this._Image3_i();
		this._Image4_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image1","",2,"_effect"),
					new eui.AddItems("_Image3","",2,"_redIcon")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image2","",2,"_effect"),
					new eui.AddItems("_Image4","",2,"_redIcon")
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.bgImgNormal"],[0],this._Image1,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.data.bgImgClick"],[0],this._Image2,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.data.imgNormal"],[0],this._Image3,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.data.imgClick"],[0],this._Image4,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.data.imgSuo"],[0],this._Image5,"source")
	}
	var _proto = BaseFuncBtnSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.x = 15;
		t.y = 27;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.x = 15;
		t.y = 27;
		return t;
	};
	_proto._effect_i = function () {
		var t = new eui.Group();
		this._effect = t;
		t.height = 130;
		t.width = 120;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.bottom = 10;
		t.height = 120;
		t.horizontalCenter = 0;
		t.width = 120;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 10;
		t.height = 120;
		t.horizontalCenter = 0;
		t.width = 120;
		return t;
	};
	_proto._redIcon_i = function () {
		var t = new eui.Image();
		this._redIcon = t;
		t.right = 0;
		t.source = "common_red_icon_png";
		t.top = 9;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		this._Image5 = t;
		t.x = 27;
		t.y = 52;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_effect","_redIcon"];
		},
		enumerable: true,
		configurable: true
	});
	return BaseFuncBtnSkin;
})(eui.Skin);var BaseHScrollerListSkin=(function (_super) {
	__extends(BaseHScrollerListSkin, _super);
	function BaseHScrollerListSkin() {
		_super.call(this);
		
		this.elementsContent = [this.scroller_i()];
	}
	var _proto = BaseHScrollerListSkin.prototype;

	_proto.scroller_i = function () {
		var t = new Scroller();
		this.scroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.x = 0;
		t.y = 0;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new List();
		this.itemList = t;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["itemList","scroller"];
		},
		enumerable: true,
		configurable: true
	});
	return BaseHScrollerListSkin;
})(eui.Skin);var BaseVScrollerListSkin=(function (_super) {
	__extends(BaseVScrollerListSkin, _super);
	function BaseVScrollerListSkin() {
		_super.call(this);
		
		this.elementsContent = [this.scroller_i()];
	}
	var _proto = BaseVScrollerListSkin.prototype;

	_proto.scroller_i = function () {
		var t = new Scroller();
		this.scroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.x = 0;
		t.y = 0;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new List();
		this.itemList = t;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["itemList","scroller"];
		},
		enumerable: true,
		configurable: true
	});
	return BaseVScrollerListSkin;
})(eui.Skin);var BubbleViewSkin=(function (_super) {
	__extends(BubbleViewSkin, _super);
	function BubbleViewSkin() {
		_super.call(this);
		
		this.height = 44;
		this.width = 43;
		this.elementsContent = [this.back_i(),this.numTxt_i()];
	}
	var _proto = BubbleViewSkin.prototype;

	_proto.back_i = function () {
		var t = new eui.Image();
		this.back = t;
		t.source = "friends_bubble_png";
		return t;
	};
	_proto.numTxt_i = function () {
		var t = new Label();
		this.numTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 44;
		t.size = 18;
		t.text = "99";
		t.textAlign = "center";
		t.textColor = 0xfefefe;
		t.verticalAlign = "middle";
		t.width = 44;
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["back","numTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return BubbleViewSkin;
})(eui.Skin);var CountDownToolSkin=(function (_super) {
	__extends(CountDownToolSkin, _super);
	function CountDownToolSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._picLabel_i()];
	}
	var _proto = CountDownToolSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "revive_bg_cd_png";
		t.x = 27;
		t.y = 400;
		return t;
	};
	_proto._picLabel_i = function () {
		var t = new eui.Image();
		this._picLabel = t;
		t.horizontalCenter = 0;
		t.source = "revive_cd_png";
		t.y = 435;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_picLabel"];
		},
		enumerable: true,
		configurable: true
	});
	return CountDownToolSkin;
})(eui.Skin);var CopyInfoViewSkin=(function (_super) {
	__extends(CopyInfoViewSkin, _super);
	function CopyInfoViewSkin() {
		_super.call(this);
		
		this.height = 100;
		this.width = 235;
		this.elementsContent = [this._Image1_i(),this._txtTitle_i(),this._txt0_i(),this._txt1_i()];
	}
	var _proto = CopyInfoViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(56,32,118,64);
		t.source = "common_back1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._txtTitle_i = function () {
		var t = new Label();
		this._txtTitle = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "鬼影山";
		t.textAlign = "center";
		t.width = 167;
		t.x = 34;
		t.y = 2;
		return t;
	};
	_proto._txt0_i = function () {
		var t = new Label();
		this._txt0 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "通关：";
		t.textAlign = "left";
		t.x = 15;
		t.y = 35;
		return t;
	};
	_proto._txt1_i = function () {
		var t = new Label();
		this._txt1 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "奖励：";
		t.textAlign = "left";
		t.x = 15;
		t.y = 66;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_txtTitle","_txt0","_txt1"];
		},
		enumerable: true,
		configurable: true
	});
	return CopyInfoViewSkin;
})(eui.Skin);var CopyRankItemSkin=(function (_super) {
	__extends(CopyRankItemSkin, _super);
	function CopyRankItemSkin() {
		_super.call(this);
		
		this.height = 73;
		this.width = 671;
		this.elementsContent = [this._Image1_i(),this._txtRank_i(),this._txtName_i(),this._txtPower_i(),this._txtValue_i()];
	}
	var _proto = CopyRankItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 73;
		t.source = "common_wordBg_normal_png";
		t.width = 671;
		t.x = 0;
		return t;
	};
	_proto._txtRank_i = function () {
		var t = new Label();
		this._txtRank = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "第1名";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.width = 90;
		t.x = 30;
		t.y = 22;
		return t;
	};
	_proto._txtName_i = function () {
		var t = new Label();
		this._txtName = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "名字名字名字名字";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.width = 250;
		t.x = 134;
		t.y = 22;
		return t;
	};
	_proto._txtPower_i = function () {
		var t = new Label();
		this._txtPower = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "5000000";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.width = 140;
		t.x = 398;
		t.y = 22;
		return t;
	};
	_proto._txtValue_i = function () {
		var t = new Label();
		this._txtValue = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "2000";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.width = 100;
		t.x = 552;
		t.y = 22;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_txtRank","_txtName","_txtPower","_txtValue"];
		},
		enumerable: true,
		configurable: true
	});
	return CopyRankItemSkin;
})(eui.Skin);var CopyRankSkin=(function (_super) {
	__extends(CopyRankSkin, _super);
	var CopyRankSkin$Skin39 = 	(function (_super) {
		__extends(CopyRankSkin$Skin39, _super);
		function CopyRankSkin$Skin39() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = CopyRankSkin$Skin39.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "common_closeImg_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return CopyRankSkin$Skin39;
	})(eui.Skin);

	function CopyRankSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this._Image9_i(),this._Image10_i(),this._labelValue_i(),this._list_i(),this._txtRank_i(),this._txtValue_i(),this._btnClose_i()];
	}
	var _proto = CopyRankSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 592;
		t.scale9Grid = new egret.Rectangle(5,114,4,687);
		t.source = "panel_bg3_png";
		t.width = 720;
		t.x = 0;
		t.y = 294;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 32;
		t.scale9Grid = new egret.Rectangle(90,10,540,5);
		t.source = "border1_png";
		t.x = 0;
		t.y = 276;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 69;
		t.source = "common_titleBg2_png";
		t.x = 0;
		t.y = 259;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 130;
		t.scale9Grid = new egret.Rectangle(90,0,540,248);
		t.source = "panel_bg2_png";
		t.width = 720;
		t.x = 0;
		t.y = 776;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 32;
		t.scale9Grid = new egret.Rectangle(90,4,540,25);
		t.source = "border2_png";
		t.width = 720;
		t.x = 0;
		t.y = 878;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 6;
		t.source = "activity_copy_label_0_png";
		t.y = 265;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "activity_copy_rank_label_4_png";
		t.x = 41;
		t.y = 811;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "common_label_rank_png";
		t.x = 72;
		t.y = 331;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "common_label_name_png";
		t.x = 237;
		t.y = 331;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.source = "common_fight_rank_png";
		t.x = 418;
		t.y = 331;
		return t;
	};
	_proto._labelValue_i = function () {
		var t = new eui.Image();
		this._labelValue = t;
		t.source = "activity_copy_rank_label_3_png";
		t.x = 552;
		t.y = 331;
		return t;
	};
	_proto._list_i = function () {
		var t = new BaseVScrollerList();
		this._list = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 382;
		t.width = 672;
		t.x = 25;
		t.y = 386;
		return t;
	};
	_proto._txtRank_i = function () {
		var t = new Label();
		this._txtRank = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "排名：未上榜";
		t.textColor = 0xfff7e6;
		t.x = 246;
		t.y = 815;
		return t;
	};
	_proto._txtValue_i = function () {
		var t = new Label();
		this._txtValue = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "当前：11关";
		t.textColor = 0xfff7e6;
		t.x = 491;
		t.y = 815;
		return t;
	};
	_proto._btnClose_i = function () {
		var t = new Button();
		this._btnClose = t;
		t.label = "Button";
		t.width = 82;
		t.x = 622;
		t.y = 253;
		t.skinName = CopyRankSkin$Skin39;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_labelValue","_list","_txtRank","_txtValue","_btnClose"];
		},
		enumerable: true,
		configurable: true
	});
	return CopyRankSkin;
})(eui.Skin);var CopyResultFailSkin=(function (_super) {
	__extends(CopyResultFailSkin, _super);
	var CopyResultFailSkin$Skin40 = 	(function (_super) {
		__extends(CopyResultFailSkin$Skin40, _super);
		function CopyResultFailSkin$Skin40() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = CopyResultFailSkin$Skin40.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "common_label_leave_png";
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return CopyResultFailSkin$Skin40;
	})(eui.Skin);

	function CopyResultFailSkin() {
		_super.call(this);
		
		this.height = 637;
		this.width = 715;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = CopyResultFailSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.width = 715;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._txt_i(),this._btn_i(),this._btnRole_i(),this._btnGrow_i(),this._btnEquip_i(),this._btnBag_i(),this._btnClose_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 567;
		t.scale9Grid = new egret.Rectangle(89,38,535,7);
		t.source = "result_bg_png";
		t.x = 0;
		t.y = 70;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "result_title_fail_png";
		t.x = 122;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "result_fail_words_png";
		t.x = 224;
		t.y = 165;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "result_line_png";
		t.x = 113;
		t.y = 313;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "result_label_png";
		t.x = 266;
		t.y = 291;
		return t;
	};
	_proto._txt_i = function () {
		var t = new Label();
		this._txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "倒计时3s退出";
		t.textColor = 0xfff7e6;
		t.x = 475;
		t.y = 556;
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.height = 105;
		t.label = "";
		t.width = 238;
		t.x = 237;
		t.y = 516;
		t.skinName = CopyResultFailSkin$Skin40;
		return t;
	};
	_proto._btnRole_i = function () {
		var t = new eui.Image();
		this._btnRole = t;
		t.source = "main_icon_role_png";
		t.x = 141;
		t.y = 362;
		return t;
	};
	_proto._btnGrow_i = function () {
		var t = new eui.Image();
		this._btnGrow = t;
		t.source = "main_icon_growup_png";
		t.x = 252.32999999999993;
		t.y = 362;
		return t;
	};
	_proto._btnEquip_i = function () {
		var t = new eui.Image();
		this._btnEquip = t;
		t.source = "main_icon_forging_png";
		t.x = 379.6700000000001;
		t.y = 362;
		return t;
	};
	_proto._btnBag_i = function () {
		var t = new eui.Image();
		this._btnBag = t;
		t.source = "main_icon_bag_png";
		t.x = 498;
		t.y = 362;
		return t;
	};
	_proto._btnClose_i = function () {
		var t = new eui.Image();
		this._btnClose = t;
		t.source = "common_tip_close_png";
		t.x = 639;
		t.y = 88;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_txt","_btn","_btnRole","_btnGrow","_btnEquip","_btnBag","_btnClose"];
		},
		enumerable: true,
		configurable: true
	});
	return CopyResultFailSkin;
})(eui.Skin);var CopyResultWinSkin=(function (_super) {
	__extends(CopyResultWinSkin, _super);
	function CopyResultWinSkin() {
		_super.call(this);
		
		this.height = 637;
		this.width = 715;
		this.elementsContent = [this._back_i()];
	}
	var _proto = CopyResultWinSkin.prototype;

	_proto._back_i = function () {
		var t = new ResultWinBack();
		this._back = t;
		t.skinName = "ResultWinBackSkin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back"];
		},
		enumerable: true,
		configurable: true
	});
	return CopyResultWinSkin;
})(eui.Skin);var TowerCopyWinViewSkin=(function (_super) {
	__extends(TowerCopyWinViewSkin, _super);
	var TowerCopyWinViewSkin$Skin41 = 	(function (_super) {
		__extends(TowerCopyWinViewSkin$Skin41, _super);
		function TowerCopyWinViewSkin$Skin41() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TowerCopyWinViewSkin$Skin41.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "confirm_png";
			t.x = 29;
			t.y = 27;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return TowerCopyWinViewSkin$Skin41;
	})(eui.Skin);

	var TowerCopyWinViewSkin$Skin42 = 	(function (_super) {
		__extends(TowerCopyWinViewSkin$Skin42, _super);
		function TowerCopyWinViewSkin$Skin42() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TowerCopyWinViewSkin$Skin42.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "commony_label_next_png";
			t.x = 29;
			t.y = 27;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return TowerCopyWinViewSkin$Skin42;
	})(eui.Skin);

	function TowerCopyWinViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._back_i(),this._txt_i(),this._Image1_i(),this._confirmBtn_i(),this._nextBtn_i(),this._btnClose_i()];
	}
	var _proto = TowerCopyWinViewSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.height = 636;
		t.scale9Grid = new egret.Rectangle(89,38,535,7);
		t.source = "result_bg_png";
		t.x = 2;
		t.y = 213;
		return t;
	};
	_proto._txt_i = function () {
		var t = new Label();
		this._txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "倒计时3s退出";
		t.textColor = 0xFFF7E6;
		t.x = 420;
		t.y = 709;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "result_title_win_png";
		t.x = 124;
		t.y = 143;
		return t;
	};
	_proto._confirmBtn_i = function () {
		var t = new Button();
		this._confirmBtn = t;
		t.height = 105;
		t.label = "";
		t.width = 238;
		t.x = 94;
		t.y = 732;
		t.skinName = TowerCopyWinViewSkin$Skin41;
		return t;
	};
	_proto._nextBtn_i = function () {
		var t = new Button();
		this._nextBtn = t;
		t.height = 105;
		t.label = "";
		t.width = 238;
		t.x = 392;
		t.y = 732;
		t.skinName = TowerCopyWinViewSkin$Skin42;
		return t;
	};
	_proto._btnClose_i = function () {
		var t = new eui.Image();
		this._btnClose = t;
		t.source = "common_tip_close_png";
		t.x = 639;
		t.y = 231;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_txt","_confirmBtn","_nextBtn","_btnClose"];
		},
		enumerable: true,
		configurable: true
	});
	return TowerCopyWinViewSkin;
})(eui.Skin);var CreateRoleViewSkin=(function (_super) {
	__extends(CreateRoleViewSkin, _super);
	function CreateRoleViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 880;
		this.elementsContent = [this._back_i(),this._Image1_i(),this._role_i(),this._Image2_i(),this._Image3_i(),this._headBack1_i(),this._headBack0_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this._name_i(),this._Image9_i(),this._txtName_i(),this._btnRole_i(),this._btnCreate_i()];
	}
	var _proto = CreateRoleViewSkin.prototype;

	_proto._back_i = function () {
		var t = new BitmapRemote();
		this._back = t;
		t.height = 1280;
		t.width = 880;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "createRole_back2_jpg";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._role_i = function () {
		var t = new BitmapRemote();
		this._role = t;
		t.height = 880;
		t.width = 720;
		t.x = 80;
		t.y = 250;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "createRole_back1_png";
		t.width = 880;
		t.x = 0;
		t.y = 788;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "createRole_back2_jpg";
		t.x = 0;
		t.y = 1229;
		return t;
	};
	_proto._headBack1_i = function () {
		var t = new eui.Image();
		this._headBack1 = t;
		t.source = "common_roleKuang_normal_png";
		t.x = 469;
		t.y = 45;
		return t;
	};
	_proto._headBack0_i = function () {
		var t = new eui.Image();
		this._headBack0 = t;
		t.source = "common_roleKuang_selected_png";
		t.x = 237;
		t.y = 45;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "createRole_rope_png";
		t.touchEnabled = false;
		t.x = 309;
		t.y = 16;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "createRole_rope_png";
		t.touchEnabled = false;
		t.x = 541;
		t.y = 16;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "createRole_headFemale_png";
		t.touchEnabled = false;
		t.x = 493;
		t.y = 61;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "createRole_headMale_png";
		t.touchEnabled = false;
		t.x = 261;
		t.y = 61;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "createRole_nameBack_png";
		t.x = 98;
		t.y = 185;
		return t;
	};
	_proto._name_i = function () {
		var t = new eui.Image();
		this._name = t;
		t.source = "createRole_nameMale_png";
		t.x = 98;
		t.y = 185;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "createRole_txtBack_jpg";
		t.x = 282;
		t.y = 946;
		return t;
	};
	_proto._txtName_i = function () {
		var t = new Label();
		this._txtName = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "";
		t.textAlign = "center";
		t.width = 245;
		t.x = 295;
		t.y = 955;
		return t;
	};
	_proto._btnRole_i = function () {
		var t = new eui.Image();
		this._btnRole = t;
		t.source = "createRole_dice_png";
		t.x = 541;
		t.y = 945;
		return t;
	};
	_proto._btnCreate_i = function () {
		var t = new eui.Image();
		this._btnCreate = t;
		t.horizontalCenter = 0;
		t.source = "createRole_btn_png";
		t.y = 1034;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_role","_headBack1","_headBack0","_name","_txtName","_btnRole","_btnCreate"];
		},
		enumerable: true,
		configurable: true
	});
	return CreateRoleViewSkin;
})(eui.Skin);var DressTypeBtnSkin=(function (_super) {
	__extends(DressTypeBtnSkin, _super);
	function DressTypeBtnSkin() {
		_super.call(this);
		
		this.height = 144;
		this.width = 144;
		this.elementsContent = [this._Image3_i()];
		this._Image1_i();
		this._Image2_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image1","",0,"")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image2","",2,"_Image3")
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.typeImg"],[0],this._Image3,"source")
	}
	var _proto = DressTypeBtnSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "common_roleKuang_normal_png";
		t.x = -15;
		t.y = -15;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.source = "common_roleKuang_selected_png";
		t.x = -15;
		t.y = -15;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.height = 120;
		t.horizontalCenter = 0;
		t.verticalCenter = -3;
		t.width = 120;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return [];
		},
		enumerable: true,
		configurable: true
	});
	return DressTypeBtnSkin;
})(eui.Skin);var DressViewSkin=(function (_super) {
	__extends(DressViewSkin, _super);
	function DressViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._funList_i()];
	}
	var _proto = DressViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.left = 5;
		t.right = 5;
		t.source = "common_back4_png";
		t.touchEnabled = false;
		t.y = 0;
		return t;
	};
	_proto._funList_i = function () {
		var t = new BaseHScrollerList();
		this._funList = t;
		t.height = 144;
		t.width = 615;
		t.x = 54;
		t.y = 126;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_funList"];
		},
		enumerable: true,
		configurable: true
	});
	return DressViewSkin;
})(eui.Skin);var FashionListItemSkin=(function (_super) {
	__extends(FashionListItemSkin, _super);
	function FashionListItemSkin() {
		_super.call(this);
		
		this.height = 119;
		this.width = 238;
		this.elementsContent = [this._back_i(),this._iconBack_i(),this._img_i(),this._iconWear_i(),this._name_i()];
	}
	var _proto = FashionListItemSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.height = 119;
		t.source = "common_bg1_normal_png";
		t.width = 239;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._iconBack_i = function () {
		var t = new eui.Image();
		this._iconBack = t;
		t.source = "common_itemBg_png";
		t.touchEnabled = false;
		t.x = -1;
		t.y = -11;
		return t;
	};
	_proto._img_i = function () {
		var t = new BitmapRemote();
		this._img = t;
		t.touchEnabled = false;
		t.x = 25;
		t.y = 18;
		return t;
	};
	_proto._iconWear_i = function () {
		var t = new eui.Image();
		this._iconWear = t;
		t.source = "common_dangqian_png";
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._name_i = function () {
		var t = new Label();
		this._name = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "Label";
		t.textColor = 0x7c6e62;
		t.touchEnabled = false;
		t.x = 128;
		t.y = 25;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_iconBack","_img","_iconWear","_name"];
		},
		enumerable: true,
		configurable: true
	});
	return FashionListItemSkin;
})(eui.Skin);var FashionViewSkin=(function (_super) {
	__extends(FashionViewSkin, _super);
	var FashionViewSkin$Skin43 = 	(function (_super) {
		__extends(FashionViewSkin$Skin43, _super);
		function FashionViewSkin$Skin43() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FashionViewSkin$Skin43.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return FashionViewSkin$Skin43;
	})(eui.Skin);

	var FashionViewSkin$Skin44 = 	(function (_super) {
		__extends(FashionViewSkin$Skin44, _super);
		function FashionViewSkin$Skin44() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FashionViewSkin$Skin44.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return FashionViewSkin$Skin44;
	})(eui.Skin);

	function FashionViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._back0_i(),this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._fightImg_i(),this._Image5_i(),this._name_i(),this._txtAttr_i(),this._btn0_i(),this._btnLabel0_i(),this._btn1_i(),this._btnLabel1_i(),this._txtTime_i(),this._txtCost_i()];
	}
	var _proto = FashionViewSkin.prototype;

	_proto._back0_i = function () {
		var t = new eui.Image();
		this._back0 = t;
		t.height = 817;
		t.source = "common_pnl_back2_png";
		t.width = 238;
		t.x = 5;
		t.y = 292;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.left = 248;
		t.right = 5;
		t.source = "common_pnl_back1_png";
		t.y = 292;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.left = 248;
		t.right = 5;
		t.source = "dress_player_back_png";
		t.y = 292;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "common_name_back_png";
		t.x = 256;
		t.y = 312;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "common_fighting_png";
		t.x = 305;
		t.y = 907;
		return t;
	};
	_proto._fightImg_i = function () {
		var t = new eui.Image();
		this._fightImg = t;
		t.height = 57;
		t.source = "common_zhanli_png";
		t.width = 102;
		t.x = 347;
		t.y = 914;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 89;
		t.scale9Grid = new egret.Rectangle(17,4,108,26);
		t.source = "skill_back1_png";
		t.width = 140;
		t.x = 565;
		t.y = 350;
		return t;
	};
	_proto._name_i = function () {
		var t = new BitmapRemote();
		this._name = t;
		t.height = 20;
		t.width = 20;
		t.x = 278;
		t.y = 352;
		return t;
	};
	_proto._txtAttr_i = function () {
		var t = new Label();
		this._txtAttr = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 75;
		t.size = 22;
		t.text = "攻击：0";
		t.textAlign = "left";
		t.textColor = 0x7E6C62;
		t.verticalAlign = "middle";
		t.x = 570;
		t.y = 358;
		return t;
	};
	_proto._btn0_i = function () {
		var t = new Button();
		this._btn0 = t;
		t.height = 90;
		t.label = "";
		t.width = 197;
		t.x = 273;
		t.y = 1000;
		t.skinName = FashionViewSkin$Skin43;
		return t;
	};
	_proto._btnLabel0_i = function () {
		var t = new eui.Image();
		this._btnLabel0 = t;
		t.source = "common_label_png";
		t.touchEnabled = false;
		t.x = 281;
		t.y = 1019;
		return t;
	};
	_proto._btn1_i = function () {
		var t = new Button();
		this._btn1 = t;
		t.height = 90;
		t.label = "";
		t.width = 197;
		t.x = 495;
		t.y = 1000;
		t.skinName = FashionViewSkin$Skin44;
		return t;
	};
	_proto._btnLabel1_i = function () {
		var t = new eui.Image();
		this._btnLabel1 = t;
		t.source = "common_active_png";
		t.touchEnabled = false;
		t.x = 503;
		t.y = 1019;
		return t;
	};
	_proto._txtTime_i = function () {
		var t = new Label();
		this._txtTime = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 29;
		t.size = 22;
		t.text = "剩余：";
		t.textAlign = "left";
		t.textColor = 0x7E6C62;
		t.verticalAlign = "middle";
		t.x = 272;
		t.y = 971;
		return t;
	};
	_proto._txtCost_i = function () {
		var t = new Label();
		this._txtCost = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 29;
		t.size = 22;
		t.text = "消耗：";
		t.textAlign = "left";
		t.textColor = 0x7E6C62;
		t.verticalAlign = "middle";
		t.x = 512;
		t.y = 971;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back0","_fightImg","_name","_txtAttr","_btn0","_btnLabel0","_btn1","_btnLabel1","_txtTime","_txtCost"];
		},
		enumerable: true,
		configurable: true
	});
	return FashionViewSkin;
})(eui.Skin);var TitleListBtnSkin=(function (_super) {
	__extends(TitleListBtnSkin, _super);
	var TitleListBtnSkin$Skin45 = 	(function (_super) {
		__extends(TitleListBtnSkin$Skin45, _super);
		function TitleListBtnSkin$Skin45() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_ddlist_back_png"),
						new eui.SetProperty("_Image2","source","common_triangle_click_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TitleListBtnSkin$Skin45.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_ddlist_back_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.source = "common_triangle_normal_png";
			t.x = 190;
			t.y = 23;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.fontFamily = "Microsoft YaHei";
			t.horizontalCenter = 0;
			t.size = 24;
			t.textColor = 0x7e6c62;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return TitleListBtnSkin$Skin45;
	})(eui.Skin);

	function TitleListBtnSkin() {
		_super.call(this);
		
		this.height = 60;
		this.width = 239;
		this.elementsContent = [this._btn_i()];
	}
	var _proto = TitleListBtnSkin.prototype;

	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.percentHeight = 100;
		t.label = "";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.skinName = TitleListBtnSkin$Skin45;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_btn"];
		},
		enumerable: true,
		configurable: true
	});
	return TitleListBtnSkin;
})(eui.Skin);var TitleListItemSkin=(function (_super) {
	__extends(TitleListItemSkin, _super);
	function TitleListItemSkin() {
		_super.call(this);
		
		this.height = 91;
		this.width = 238;
		this.elementsContent = [this._back_i(),this._btn_i(),this._img_i(),this._isWearing_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
				])
		];
	}
	var _proto = TitleListItemSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(29,11,181,69);
		t.source = "";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.percentHeight = 100;
		t.label = "";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._img_i = function () {
		var t = new BitmapRemote();
		this._img = t;
		return t;
	};
	_proto._isWearing_i = function () {
		var t = new eui.Image();
		this._isWearing = t;
		t.source = "common_dangqian_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_btn","_img","_isWearing"];
		},
		enumerable: true,
		configurable: true
	});
	return TitleListItemSkin;
})(eui.Skin);var TitleViewSkin=(function (_super) {
	__extends(TitleViewSkin, _super);
	var TitleViewSkin$Skin46 = 	(function (_super) {
		__extends(TitleViewSkin$Skin46, _super);
		function TitleViewSkin$Skin46() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TitleViewSkin$Skin46.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return TitleViewSkin$Skin46;
	})(eui.Skin);

	function TitleViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._lossTxt_i(),this._fightImg_i(),this._Image4_i(),this._Image5_i(),this._attrTxt_i(),this._titleImg_i(),this._actBtn_i(),this._actImg_i(),this._wearImg_i(),this._takeoffImg_i()];
	}
	var _proto = TitleViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 817;
		t.left = 248;
		t.right = 5;
		t.source = "common_pnl_back1_png";
		t.width = 472;
		t.y = 292;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 817;
		t.source = "common_pnl_back2_png";
		t.width = 238;
		t.x = 5;
		t.y = 290;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.left = 248;
		t.right = 5;
		t.source = "dress_player_back_png";
		t.y = 292;
		return t;
	};
	_proto._lossTxt_i = function () {
		var t = new Label();
		this._lossTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 29;
		t.size = 22;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0x7e6c62;
		t.verticalAlign = "middle";
		t.width = 474;
		t.x = 248;
		t.y = 971;
		return t;
	};
	_proto._fightImg_i = function () {
		var t = new eui.Image();
		this._fightImg = t;
		t.source = "common_fighting_png";
		t.x = 305;
		t.y = 907;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 57;
		t.source = "common_zhanli_png";
		t.width = 102;
		t.x = 347;
		t.y = 914;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 89;
		t.scale9Grid = new egret.Rectangle(17,4,108,26);
		t.source = "skill_back1_png";
		t.width = 140;
		t.x = 565;
		t.y = 350;
		return t;
	};
	_proto._attrTxt_i = function () {
		var t = new Label();
		this._attrTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 71;
		t.size = 22;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0x7e6c62;
		t.verticalAlign = "middle";
		t.width = 140;
		t.x = 565;
		t.y = 359;
		return t;
	};
	_proto._titleImg_i = function () {
		var t = new BitmapRemote();
		this._titleImg = t;
		t.height = 20;
		t.width = 20;
		t.x = 385;
		t.y = 310;
		return t;
	};
	_proto._actBtn_i = function () {
		var t = new Button();
		this._actBtn = t;
		t.height = 90;
		t.label = "";
		t.width = 197;
		t.x = 391;
		t.y = 1000;
		t.skinName = TitleViewSkin$Skin46;
		return t;
	};
	_proto._actImg_i = function () {
		var t = new eui.Image();
		this._actImg = t;
		t.source = "active_label_png";
		t.touchEnabled = false;
		t.x = 399;
		t.y = 1019;
		return t;
	};
	_proto._wearImg_i = function () {
		var t = new eui.Image();
		this._wearImg = t;
		t.source = "common_label_png";
		t.touchEnabled = false;
		t.x = 399;
		t.y = 1019;
		return t;
	};
	_proto._takeoffImg_i = function () {
		var t = new eui.Image();
		this._takeoffImg = t;
		t.source = "common_takeoff_label_png";
		t.touchEnabled = false;
		t.x = 399;
		t.y = 1019;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_lossTxt","_fightImg","_attrTxt","_titleImg","_actBtn","_actImg","_wearImg","_takeoffImg"];
		},
		enumerable: true,
		configurable: true
	});
	return TitleViewSkin;
})(eui.Skin);var DropAlertSkin=(function (_super) {
	__extends(DropAlertSkin, _super);
	function DropAlertSkin() {
		_super.call(this);
		
		this.height = 249;
		this.width = 477;
		this.elementsContent = [this._back_i(),this._title_i()];
	}
	var _proto = DropAlertSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.scale9Grid = new egret.Rectangle(43,120,393,118);
		t.source = "ui_drop_back_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._title_i = function () {
		var t = new eui.Image();
		this._title = t;
		t.horizontalCenter = 0;
		t.source = "ui_drop_title_png";
		t.y = 12;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_title"];
		},
		enumerable: true,
		configurable: true
	});
	return DropAlertSkin;
})(eui.Skin);var DropTipsItemSkin=(function (_super) {
	__extends(DropTipsItemSkin, _super);
	function DropTipsItemSkin() {
		_super.call(this);
		
		this.height = 41;
		this.width = 498;
		this.elementsContent = [this._Image1_i(),this._name_i()];
	}
	var _proto = DropTipsItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "common_tips_back_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._name_i = function () {
		var t = new Label();
		this._name = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 20;
		t.text = "";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.width = 498;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_name"];
		},
		enumerable: true,
		configurable: true
	});
	return DropTipsItemSkin;
})(eui.Skin);var EfficiencyAlertSkin=(function (_super) {
	__extends(EfficiencyAlertSkin, _super);
	function EfficiencyAlertSkin() {
		_super.call(this);
		
		this.height = 249;
		this.width = 477;
		this.elementsContent = [this._back_i(),this._title_i(),this._group0_i(),this._group1_i(),this._group2_i(),this._group3_i()];
	}
	var _proto = EfficiencyAlertSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.scale9Grid = new egret.Rectangle(43,120,393,118);
		t.source = "ui_drop_back_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._title_i = function () {
		var t = new eui.Image();
		this._title = t;
		t.height = 60;
		t.horizontalCenter = 0;
		t.source = "ui_drop_efficiency_title_png";
		t.width = 238;
		t.y = 11;
		return t;
	};
	_proto._group0_i = function () {
		var t = new eui.Group();
		this._group0 = t;
		t.x = 54;
		t.y = 75;
		t.elementsContent = [this._Image1_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 54;
		t.source = "playRes_exp_54_png";
		t.width = 54;
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 54;
		t.source = "playRes_coin_54_png";
		t.width = 54;
		t.x = 0;
		t.y = 54;
		return t;
	};
	_proto._group1_i = function () {
		var t = new eui.Group();
		this._group1 = t;
		t.x = 104;
		t.y = 87;
		t.elementsContent = [this._txtSilver0_i(),this._txtExp0_i()];
		return t;
	};
	_proto._txtSilver0_i = function () {
		var t = new Label();
		this._txtSilver0 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.text = "123456";
		t.textColor = 0x7c6e62;
		t.x = 0;
		t.y = 54;
		return t;
	};
	_proto._txtExp0_i = function () {
		var t = new Label();
		this._txtExp0 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.text = "123456";
		t.textColor = 0x7c6e62;
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto._group2_i = function () {
		var t = new eui.Group();
		this._group2 = t;
		t.x = 216;
		t.y = 89;
		t.elementsContent = [this._Image3_i(),this._Image4_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "ui_drop_arrow_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "ui_drop_arrow_png";
		t.x = 0;
		t.y = 53;
		return t;
	};
	_proto._group3_i = function () {
		var t = new eui.Group();
		this._group3 = t;
		t.x = 250;
		t.y = 87;
		t.elementsContent = [this._txtSilver1_i(),this._txtExp1_i()];
		return t;
	};
	_proto._txtSilver1_i = function () {
		var t = new Label();
		this._txtSilver1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.text = "123456";
		t.textColor = 0x7C6E62;
		t.x = 0;
		t.y = 54;
		return t;
	};
	_proto._txtExp1_i = function () {
		var t = new Label();
		this._txtExp1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.text = "123456";
		t.textColor = 0x7C6E62;
		t.x = 0;
		t.y = 1;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_title","_group0","_txtSilver0","_txtExp0","_group1","_group2","_txtSilver1","_txtExp1","_group3"];
		},
		enumerable: true,
		configurable: true
	});
	return EfficiencyAlertSkin;
})(eui.Skin);var EquipPanelSkin=(function (_super) {
	__extends(EquipPanelSkin, _super);
	function EquipPanelSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i(),this._titleImg_i(),this._Image1_i(),this._equipName_i(),this._topBtn_i(),this._fightImg_i(),this._Image2_i(),this._func_i(),this._equipItemList_i()];
	}
	var _proto = EquipPanelSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.height = 1280;
		t.skinName = "BasePanelSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._titleImg_i = function () {
		var t = new eui.Image();
		this._titleImg = t;
		t.height = 52;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "";
		t.width = 181;
		t.x = 320;
		t.y = 72;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_title_wordBg_png";
		t.x = 256;
		t.y = 166;
		return t;
	};
	_proto._equipName_i = function () {
		var t = new Label();
		this._equipName = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 32;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 360;
		t.y = 167;
		return t;
	};
	_proto._topBtn_i = function () {
		var t = new Button();
		this._topBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 471;
		t.y = 160;
		return t;
	};
	_proto._fightImg_i = function () {
		var t = new eui.Image();
		this._fightImg = t;
		t.height = 65;
		t.horizontalCenter = 35;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_fighting_png";
		t.width = 441;
		t.y = 836;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 57;
		t.source = "common_zhanli_png";
		t.width = 102;
		t.x = 222;
		t.y = 843;
		return t;
	};
	_proto._func_i = function () {
		var t = new eui.Group();
		this._func = t;
		t.anchorOffsetY = 0;
		t.height = 1280;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._equipItemList_i = function () {
		var t = new eui.Group();
		this._equipItemList = t;
		t.height = 950;
		t.width = 720;
		t.x = 0;
		t.y = 237;
		t.elementsContent = [this._equipItem1_i(),this._equipItem2_i(),this._equipItem3_i(),this._equipItem4_i(),this._equipItem5_i(),this._equipItem6_i(),this._equipItem7_i(),this._equipItem8_i(),this._baseIcon1_i(),this._baseIcon2_i(),this._baseIcon3_i(),this._baseIcon4_i(),this._baseIcon5_i(),this._baseIcon6_i(),this._baseIcon7_i(),this._baseIcon8_i(),this._redImg1_i(),this._redImg2_i(),this._redImg3_i(),this._redImg4_i(),this._redImg5_i(),this._redImg6_i(),this._redImg7_i(),this._redImg8_i()];
		return t;
	};
	_proto._equipItem1_i = function () {
		var t = new EquipItem();
		this._equipItem1 = t;
		t.height = 141;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 12;
		t.y = -1;
		return t;
	};
	_proto._equipItem2_i = function () {
		var t = new EquipItem();
		this._equipItem2 = t;
		t.height = 141;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 12;
		t.y = 164;
		return t;
	};
	_proto._equipItem3_i = function () {
		var t = new EquipItem();
		this._equipItem3 = t;
		t.height = 141;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 12;
		t.y = 319;
		return t;
	};
	_proto._equipItem4_i = function () {
		var t = new EquipItem();
		this._equipItem4 = t;
		t.height = 141;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 12;
		t.y = 474;
		return t;
	};
	_proto._equipItem5_i = function () {
		var t = new EquipItem();
		this._equipItem5 = t;
		t.height = 141;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 569;
		t.y = -1;
		return t;
	};
	_proto._equipItem6_i = function () {
		var t = new EquipItem();
		this._equipItem6 = t;
		t.height = 141;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 569;
		t.y = 166;
		return t;
	};
	_proto._equipItem7_i = function () {
		var t = new EquipItem();
		this._equipItem7 = t;
		t.height = 141;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 569;
		t.y = 321;
		return t;
	};
	_proto._equipItem8_i = function () {
		var t = new EquipItem();
		this._equipItem8 = t;
		t.height = 141;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 569;
		t.y = 476;
		return t;
	};
	_proto._baseIcon1_i = function () {
		var t = new eui.Image();
		this._baseIcon1 = t;
		t.height = 70;
		t.source = "equip_baseIcon1_png";
		t.width = 63;
		t.x = 52;
		t.y = 35;
		return t;
	};
	_proto._baseIcon2_i = function () {
		var t = new eui.Image();
		this._baseIcon2 = t;
		t.height = 70;
		t.source = "equip_baseIcon2_png";
		t.width = 63;
		t.x = 52;
		t.y = 200;
		return t;
	};
	_proto._baseIcon3_i = function () {
		var t = new eui.Image();
		this._baseIcon3 = t;
		t.height = 70;
		t.source = "equip_baseIcon3_png";
		t.width = 63;
		t.x = 52;
		t.y = 355;
		return t;
	};
	_proto._baseIcon4_i = function () {
		var t = new eui.Image();
		this._baseIcon4 = t;
		t.height = 70;
		t.source = "equip_baseIcon4_png";
		t.width = 63;
		t.x = 52;
		t.y = 510;
		return t;
	};
	_proto._baseIcon5_i = function () {
		var t = new eui.Image();
		this._baseIcon5 = t;
		t.height = 70;
		t.source = "equip_baseIcon5_png";
		t.width = 63;
		t.x = 608;
		t.y = 34;
		return t;
	};
	_proto._baseIcon6_i = function () {
		var t = new eui.Image();
		this._baseIcon6 = t;
		t.height = 70;
		t.source = "equip_baseIcon6_png";
		t.width = 63;
		t.x = 608;
		t.y = 202;
		return t;
	};
	_proto._baseIcon7_i = function () {
		var t = new eui.Image();
		this._baseIcon7 = t;
		t.height = 70;
		t.source = "equip_baseIcon7_png";
		t.width = 63;
		t.x = 608;
		t.y = 356;
		return t;
	};
	_proto._baseIcon8_i = function () {
		var t = new eui.Image();
		this._baseIcon8 = t;
		t.height = 70;
		t.source = "equip_baseIcon8_png";
		t.width = 63;
		t.x = 608;
		t.y = 510;
		return t;
	};
	_proto._redImg1_i = function () {
		var t = new eui.Image();
		this._redImg1 = t;
		t.height = 23;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.width = 23;
		t.x = 117;
		t.y = 12;
		return t;
	};
	_proto._redImg2_i = function () {
		var t = new eui.Image();
		this._redImg2 = t;
		t.height = 23;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.width = 23;
		t.x = 117;
		t.y = 176;
		return t;
	};
	_proto._redImg3_i = function () {
		var t = new eui.Image();
		this._redImg3 = t;
		t.height = 23;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.width = 23;
		t.x = 117;
		t.y = 331;
		return t;
	};
	_proto._redImg4_i = function () {
		var t = new eui.Image();
		this._redImg4 = t;
		t.height = 23;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.width = 23;
		t.x = 117;
		t.y = 486;
		return t;
	};
	_proto._redImg5_i = function () {
		var t = new eui.Image();
		this._redImg5 = t;
		t.height = 23;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.width = 23;
		t.x = 674;
		t.y = 12;
		return t;
	};
	_proto._redImg6_i = function () {
		var t = new eui.Image();
		this._redImg6 = t;
		t.height = 23;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.width = 23;
		t.x = 674;
		t.y = 177;
		return t;
	};
	_proto._redImg7_i = function () {
		var t = new eui.Image();
		this._redImg7 = t;
		t.height = 23;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.width = 23;
		t.x = 674;
		t.y = 334;
		return t;
	};
	_proto._redImg8_i = function () {
		var t = new eui.Image();
		this._redImg8 = t;
		t.height = 23;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.width = 23;
		t.x = 674;
		t.y = 489;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel","_titleImg","_equipName","_topBtn","_fightImg","_func","_equipItem1","_equipItem2","_equipItem3","_equipItem4","_equipItem5","_equipItem6","_equipItem7","_equipItem8","_baseIcon1","_baseIcon2","_baseIcon3","_baseIcon4","_baseIcon5","_baseIcon6","_baseIcon7","_baseIcon8","_redImg1","_redImg2","_redImg3","_redImg4","_redImg5","_redImg6","_redImg7","_redImg8","_equipItemList"];
		},
		enumerable: true,
		configurable: true
	});
	return EquipPanelSkin;
})(eui.Skin);var GemAttrTipsSkin=(function (_super) {
	__extends(GemAttrTipsSkin, _super);
	var GemAttrTipsSkin$Skin47 = 	(function (_super) {
		__extends(GemAttrTipsSkin$Skin47, _super);
		function GemAttrTipsSkin$Skin47() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_tip_close_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GemAttrTipsSkin$Skin47.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_tip_close_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return GemAttrTipsSkin$Skin47;
	})(eui.Skin);

	function GemAttrTipsSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = GemAttrTipsSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1280;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this._tipsBg_i(),this._Image1_i(),this._Label1_i(),this._curLevel_i(),this._curStatus_i(),this._curValue_i(),this._Image2_i(),this._nextLevel_i(),this._nextStatus_i(),this._nextValue_i(),this._closeBtn_i()];
		return t;
	};
	_proto._tipsBg_i = function () {
		var t = new eui.Image();
		this._tipsBg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 229;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(52,55,108,103);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_tipsBg_png";
		t.width = 345;
		t.x = 188;
		t.y = 321;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 36;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_title_wordBg_png";
		t.width = 209;
		t.x = 256;
		t.y = 336;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "宝石属性加成";
		t.textColor = 0x7c6e62;
		t.x = 288;
		t.y = 339;
		return t;
	};
	_proto._curLevel_i = function () {
		var t = new Label();
		this._curLevel = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "全身宝石+30";
		t.textColor = 0x7c6e62;
		t.x = 210;
		t.y = 382;
		return t;
	};
	_proto._curStatus_i = function () {
		var t = new Label();
		this._curStatus = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "（已激活）";
		t.textColor = 0x38b800;
		t.x = 349;
		t.y = 380;
		return t;
	};
	_proto._curValue_i = function () {
		var t = new Label();
		this._curValue = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击+100 生命+1000";
		t.textColor = 0x38b800;
		t.x = 210;
		t.y = 416;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 3;
		t.scale9Grid = new egret.Rectangle(297,1,100,0);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_line_png";
		t.width = 260;
		t.x = 206;
		t.y = 451;
		return t;
	};
	_proto._nextLevel_i = function () {
		var t = new Label();
		this._nextLevel = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "全身宝石+30";
		t.textColor = 0x7c6e62;
		t.x = 210;
		t.y = 464;
		return t;
	};
	_proto._nextStatus_i = function () {
		var t = new Label();
		this._nextStatus = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "（下级效果）";
		t.textColor = 0x7c6e62;
		t.x = 349;
		t.y = 463;
		return t;
	};
	_proto._nextValue_i = function () {
		var t = new Label();
		this._nextValue = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击+100 生命+1000";
		t.textColor = 0x38b800;
		t.x = 210;
		t.y = 498;
		return t;
	};
	_proto._closeBtn_i = function () {
		var t = new Button();
		this._closeBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 501;
		t.y = 321;
		t.skinName = GemAttrTipsSkin$Skin47;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_tipsBg","_curLevel","_curStatus","_curValue","_nextLevel","_nextStatus","_nextValue","_closeBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return GemAttrTipsSkin;
})(eui.Skin);var GemItemViewSkin=(function (_super) {
	__extends(GemItemViewSkin, _super);
	function GemItemViewSkin() {
		_super.call(this);
		
		this.height = 153;
		this.width = 116;
		this.elementsContent = [this._itemBgImg_i(),this._itemName_i(),this._itemLv_i(),this._addImg_i(),this._gemImg_i(),this._redImg_i(),this._itemTips_i()];
	}
	var _proto = GemItemViewSkin.prototype;

	_proto._itemBgImg_i = function () {
		var t = new eui.Image();
		this._itemBgImg = t;
		t.height = 153;
		t.source = "equip_gem_openBg_png";
		t.width = 116;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._itemName_i = function () {
		var t = new Label();
		this._itemName = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 22;
		t.text = "";
		t.textColor = 0xfefbeb;
		t.y = 116;
		return t;
	};
	_proto._itemLv_i = function () {
		var t = new Label();
		this._itemLv = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "";
		t.textColor = 0xfaf3e2;
		t.y = 9;
		return t;
	};
	_proto._addImg_i = function () {
		var t = new eui.Image();
		this._addImg = t;
		t.height = 65;
		t.horizontalCenter = 0;
		t.source = "role_add_png";
		t.width = 65;
		t.y = 22;
		return t;
	};
	_proto._gemImg_i = function () {
		var t = new eui.Image();
		this._gemImg = t;
		t.height = 70;
		t.horizontalCenter = -1;
		t.source = "";
		t.width = 70;
		t.y = 20;
		return t;
	};
	_proto._redImg_i = function () {
		var t = new eui.Image();
		this._redImg = t;
		t.height = 23;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.width = 23;
		t.x = 77;
		t.y = 0;
		return t;
	};
	_proto._itemTips_i = function () {
		var t = new Label();
		this._itemTips = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "";
		t.textColor = 0xfaf3e2;
		t.y = 75;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_itemBgImg","_itemName","_itemLv","_addImg","_gemImg","_redImg","_itemTips"];
		},
		enumerable: true,
		configurable: true
	});
	return GemItemViewSkin;
})(eui.Skin);var GemViewSkin=(function (_super) {
	__extends(GemViewSkin, _super);
	var GemViewSkin$Skin48 = 	(function (_super) {
		__extends(GemViewSkin$Skin48, _super);
		function GemViewSkin$Skin48() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GemViewSkin$Skin48.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return GemViewSkin$Skin48;
	})(eui.Skin);

	function GemViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._BasePanel1_i(),this._Image1_i(),this._Image2_i(),this._Image3_i(),this._item1_i(),this._item2_i(),this._item3_i(),this._equipImg_i(),this._Image4_i(),this._gemImg1_i(),this._gemImg2_i(),this._gemImg3_i(),this._name1_i(),this._attrValue1_i(),this._name2_i(),this._attrValue2_i(),this._name3_i(),this._attrValue3_i(),this._Label1_i(),this._btn_i(),this._btnImg_i(),this._Image5_i()];
	}
	var _proto = GemViewSkin.prototype;

	_proto._BasePanel1_i = function () {
		var t = new BasePanel();
		t.height = 1280;
		t.skinName = "BasePanelSkin";
		t.visible = false;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 588;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "equip_strengthen_centerImg1_png";
		t.width = 623;
		t.y = 217;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 442;
		t.horizontalCenter = 0;
		t.source = "equip_gem_di_png";
		t.verticalCenter = -157;
		t.width = 488;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 191;
		t.horizontalCenter = 0;
		t.source = "equip_gem_equipBg_png";
		t.verticalCenter = -158;
		t.width = 173;
		return t;
	};
	_proto._item1_i = function () {
		var t = new GemItemView();
		this._item1 = t;
		t.height = 153;
		t.horizontalCenter = 0;
		t.skinName = "GemItemViewSkin";
		t.width = 116;
		t.y = 248;
		return t;
	};
	_proto._item2_i = function () {
		var t = new GemItemView();
		this._item2 = t;
		t.height = 153;
		t.skinName = "GemItemViewSkin";
		t.width = 116;
		t.x = 150;
		t.y = 408;
		return t;
	};
	_proto._item3_i = function () {
		var t = new GemItemView();
		this._item3 = t;
		t.height = 153;
		t.skinName = "GemItemViewSkin";
		t.width = 116;
		t.x = 463;
		t.y = 408;
		return t;
	};
	_proto._equipImg_i = function () {
		var t = new eui.Image();
		this._equipImg = t;
		t.height = 105;
		t.horizontalCenter = 0;
		t.width = 105;
		t.y = 419;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 127;
		t.horizontalCenter = 0;
		t.source = "equip_gem_attrBg_png";
		t.width = 446;
		t.y = 569;
		return t;
	};
	_proto._gemImg1_i = function () {
		var t = new eui.Image();
		this._gemImg1 = t;
		t.height = 27;
		t.source = "equip_gem_red_png";
		t.width = 27;
		t.x = 206;
		t.y = 581;
		return t;
	};
	_proto._gemImg2_i = function () {
		var t = new eui.Image();
		this._gemImg2 = t;
		t.height = 27;
		t.source = "equip_gem_green_png";
		t.width = 27;
		t.x = 206;
		t.y = 614;
		return t;
	};
	_proto._gemImg3_i = function () {
		var t = new eui.Image();
		this._gemImg3 = t;
		t.height = 27;
		t.source = "equip_gem_blue_png";
		t.width = 27;
		t.x = 206;
		t.y = 646;
		return t;
	};
	_proto._name1_i = function () {
		var t = new Label();
		this._name1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "Label";
		t.textColor = 0x7c6e62;
		t.x = 258;
		t.y = 581;
		return t;
	};
	_proto._attrValue1_i = function () {
		var t = new Label();
		this._attrValue1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "Label";
		t.textColor = 0x7c6e62;
		t.x = 406;
		t.y = 581;
		return t;
	};
	_proto._name2_i = function () {
		var t = new Label();
		this._name2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "Label";
		t.textColor = 0x7c6e62;
		t.x = 258;
		t.y = 615;
		return t;
	};
	_proto._attrValue2_i = function () {
		var t = new Label();
		this._attrValue2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "Label";
		t.textColor = 0x7c6e62;
		t.x = 406;
		t.y = 615;
		return t;
	};
	_proto._name3_i = function () {
		var t = new Label();
		this._name3 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "Label";
		t.textColor = 0x7c6e62;
		t.x = 258;
		t.y = 647;
		return t;
	};
	_proto._attrValue3_i = function () {
		var t = new Label();
		this._attrValue3 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "Label";
		t.textColor = 0x7c6e62;
		t.x = 406;
		t.y = 647;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "更换装备不影响所镶嵌的宝石";
		t.textColor = 0xdfccbe;
		t.x = 192;
		t.y = 994;
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 241;
		t.y = 1019;
		t.skinName = GemViewSkin$Skin48;
		return t;
	};
	_proto._btnImg_i = function () {
		var t = new eui.Image();
		this._btnImg = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "equip_gem_btnImg_png";
		t.x = 280;
		t.y = 1045;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 127;
		t.horizontalCenter = 0;
		t.source = "equip_strengthen_bottomBg_png";
		t.width = 720;
		t.y = 855;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_item1","_item2","_item3","_equipImg","_gemImg1","_gemImg2","_gemImg3","_name1","_attrValue1","_name2","_attrValue2","_name3","_attrValue3","_btn","_btnImg"];
		},
		enumerable: true,
		configurable: true
	});
	return GemViewSkin;
})(eui.Skin);var StrengthenViewSkin=(function (_super) {
	__extends(StrengthenViewSkin, _super);
	var StrengthenViewSkin$Skin49 = 	(function (_super) {
		__extends(StrengthenViewSkin$Skin49, _super);
		function StrengthenViewSkin$Skin49() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = StrengthenViewSkin$Skin49.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return StrengthenViewSkin$Skin49;
	})(eui.Skin);

	function StrengthenViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._strengthen_i()];
	}
	var _proto = StrengthenViewSkin.prototype;

	_proto._strengthen_i = function () {
		var t = new eui.Group();
		this._strengthen = t;
		t.anchorOffsetY = 0;
		t.height = 1280;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Label1_i(),this._btn_i(),this._btnImg_i(),this._Image3_i(),this._goodsItem_i(),this._Label2_i(),this._attrValue1_i(),this._attrValue2_i(),this._nextAttrValue1_i(),this._nextAttrValue2_i(),this._equipImg_i(),this._Image4_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 588;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "equip_strengthen_centerImg1_png";
		t.width = 623;
		t.x = 49;
		t.y = 217;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "equip_strengthen_centerImg2_png";
		t.x = 49;
		t.y = 314;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "更换装备强化等级将完美继承";
		t.textColor = 0xdfccbe;
		t.x = 192;
		t.y = 994;
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 241;
		t.y = 1019;
		t.skinName = StrengthenViewSkin$Skin49;
		return t;
	};
	_proto._btnImg_i = function () {
		var t = new eui.Image();
		this._btnImg = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "equip_strengthen_btnWord_png";
		t.x = 280;
		t.y = 1046;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 70;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_strengthen_jiantou_png";
		t.width = 56;
		t.x = 332;
		t.y = 497;
		return t;
	};
	_proto._goodsItem_i = function () {
		var t = new BaseGoods();
		this._goodsItem = t;
		t.height = 141;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 290;
		t.y = 632;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "所需材料";
		t.textColor = 0x7c6e62;
		t.x = 300;
		t.y = 608;
		return t;
	};
	_proto._attrValue1_i = function () {
		var t = new Label();
		this._attrValue1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 183;
		t.y = 492;
		return t;
	};
	_proto._attrValue2_i = function () {
		var t = new Label();
		this._attrValue2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 183;
		t.y = 550;
		return t;
	};
	_proto._nextAttrValue1_i = function () {
		var t = new Label();
		this._nextAttrValue1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 408;
		t.y = 492;
		return t;
	};
	_proto._nextAttrValue2_i = function () {
		var t = new Label();
		this._nextAttrValue2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 408;
		t.y = 550;
		return t;
	};
	_proto._equipImg_i = function () {
		var t = new eui.Image();
		this._equipImg = t;
		t.height = 105;
		t.horizontalCenter = 4.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 105;
		t.x = 312;
		t.y = 345;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 127;
		t.horizontalCenter = 0;
		t.source = "equip_strengthen_bottomBg_png";
		t.width = 720;
		t.y = 855;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_btn","_btnImg","_goodsItem","_attrValue1","_attrValue2","_nextAttrValue1","_nextAttrValue2","_equipImg","_strengthen"];
		},
		enumerable: true,
		configurable: true
	});
	return StrengthenViewSkin;
})(eui.Skin);var SuitViewSkin=(function (_super) {
	__extends(SuitViewSkin, _super);
	var SuitViewSkin$Skin50 = 	(function (_super) {
		__extends(SuitViewSkin$Skin50, _super);
		function SuitViewSkin$Skin50() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","suit_btnImg1_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SuitViewSkin$Skin50.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "suit_btnImg1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return SuitViewSkin$Skin50;
	})(eui.Skin);

	var SuitViewSkin$Skin51 = 	(function (_super) {
		__extends(SuitViewSkin$Skin51, _super);
		function SuitViewSkin$Skin51() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","suit_btnImg2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SuitViewSkin$Skin51.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "suit_btnImg2_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return SuitViewSkin$Skin51;
	})(eui.Skin);

	var SuitViewSkin$Skin52 = 	(function (_super) {
		__extends(SuitViewSkin$Skin52, _super);
		function SuitViewSkin$Skin52() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SuitViewSkin$Skin52.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "suit_chaijie_png";
			t.x = 28;
			t.y = 26;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return SuitViewSkin$Skin52;
	})(eui.Skin);

	var SuitViewSkin$Skin53 = 	(function (_super) {
		__extends(SuitViewSkin$Skin53, _super);
		function SuitViewSkin$Skin53() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SuitViewSkin$Skin53.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "suit_dazao_png";
			t.x = 29;
			t.y = 26;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return SuitViewSkin$Skin53;
	})(eui.Skin);

	function SuitViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._equip1_i(),this._equip2_i(),this._equip3_i(),this._equip4_i(),this._equip5_i(),this._equip6_i(),this._equip7_i(),this._equip8_i(),this.fightingImg_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._BaseGoods1_i(),this._BaseGoods2_i(),this._Image8_i(),this._Image9_i(),this._Label1_i(),this._Label2_i(),this._Label3_i(),this._Label4_i(),this._Label5_i(),this._Label6_i(),this._Label7_i(),this._Image10_i(),this._Image11_i(),this._Label8_i(),this._Label9_i(),this._Label10_i(),this._Label11_i(),this._Label12_i(),this._Label13_i(),this._Label14_i(),this._Label15_i(),this._Label16_i(),this._Label17_i(),this._Label18_i(),this._Label19_i(),this._Label20_i(),this._Label21_i(),this._Label22_i(),this._Label23_i(),this._Label24_i(),this._Button1_i(),this._Button2_i(),this._Button3_i(),this._Button4_i()];
	}
	var _proto = SuitViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 855;
		t.scale9Grid = new egret.Rectangle(1,114,13,687);
		t.source = "common_panelBg_png";
		t.width = 710;
		t.x = 5;
		t.y = 120;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 693;
		t.scale9Grid = new egret.Rectangle(28,107,25,643);
		t.source = "common_pnl_back1_png";
		t.width = 454;
		t.x = 256;
		t.y = 126;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 671;
		t.source = "suit_bgImg_png";
		t.width = 458;
		t.x = 260;
		t.y = 127;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 693;
		t.source = "common_pnl_back2_png";
		t.width = 242;
		t.x = 10;
		t.y = 126;
		return t;
	};
	_proto._equip1_i = function () {
		var t = new EquipItem();
		this._equip1 = t;
		t.height = 141;
		t.width = 141;
		t.x = 417;
		t.y = 141;
		return t;
	};
	_proto._equip2_i = function () {
		var t = new EquipItem();
		this._equip2 = t;
		t.height = 141;
		t.width = 141;
		t.x = 314;
		t.y = 238;
		return t;
	};
	_proto._equip3_i = function () {
		var t = new EquipItem();
		this._equip3 = t;
		t.height = 141;
		t.width = 141;
		t.x = 417;
		t.y = 320;
		return t;
	};
	_proto._equip4_i = function () {
		var t = new EquipItem();
		this._equip4 = t;
		t.height = 141;
		t.width = 141;
		t.x = 558;
		t.y = 349;
		return t;
	};
	_proto._equip5_i = function () {
		var t = new EquipItem();
		this._equip5 = t;
		t.height = 141;
		t.width = 141;
		t.x = 264;
		t.y = 381;
		return t;
	};
	_proto._equip6_i = function () {
		var t = new EquipItem();
		this._equip6 = t;
		t.height = 141;
		t.width = 141;
		t.x = 332;
		t.y = 500;
		return t;
	};
	_proto._equip7_i = function () {
		var t = new EquipItem();
		this._equip7 = t;
		t.height = 141;
		t.width = 141;
		t.x = 526;
		t.y = 479;
		return t;
	};
	_proto._equip8_i = function () {
		var t = new EquipItem();
		this._equip8 = t;
		t.height = 141;
		t.width = 141;
		t.x = 369;
		t.y = 628;
		return t;
	};
	_proto.fightingImg_i = function () {
		var t = new eui.Image();
		this.fightingImg = t;
		t.source = "common_fighting_png";
		t.x = 263;
		t.y = 744;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 57;
		t.source = "common_zhanli_png";
		t.width = 102;
		t.x = 305;
		t.y = 750;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 143;
		t.horizontalCenter = -0.5;
		t.scale9Grid = new egret.Rectangle(29,11,181,69);
		t.scaleY = 1.15;
		t.source = "common_bg1_normal_png";
		t.width = 711;
		t.y = 818;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "cloak_suoxucl_png";
		t.x = 41;
		t.y = 880;
		return t;
	};
	_proto._BaseGoods1_i = function () {
		var t = new BaseGoods();
		t.height = 141;
		t.width = 141;
		t.x = 211;
		t.y = 830;
		return t;
	};
	_proto._BaseGoods2_i = function () {
		var t = new BaseGoods();
		t.height = 141;
		t.width = 141;
		t.x = 411;
		t.y = 830;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.height = 36;
		t.source = "common_title_wordBg_png";
		t.width = 209;
		t.x = 26;
		t.y = 153;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.height = 40;
		t.source = "suit_jiaImg_png";
		t.width = 74;
		t.x = 28;
		t.y = 154;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "攻击套装";
		t.textColor = 0x7c6e62;
		t.x = 102;
		t.y = 161;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "(0/5)";
		t.textColor = 0xff0000;
		t.x = 192;
		t.y = 161;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "头";
		t.textColor = 0x7c6e62;
		t.x = 36;
		t.y = 199;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "头";
		t.textColor = 0x7c6e62;
		t.x = 76;
		t.y = 199;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "头";
		t.textColor = 0x7c6e62;
		t.x = 116;
		t.y = 199;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "头";
		t.textColor = 0x7c6e62;
		t.x = 156;
		t.y = 199;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "头";
		t.textColor = 0x7c6e62;
		t.x = 196;
		t.y = 199;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.height = 3;
		t.scale9Grid = new egret.Rectangle(331,0,17,3);
		t.source = "common_line_png";
		t.width = 200;
		t.x = 25;
		t.y = 239;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.height = 3;
		t.scale9Grid = new egret.Rectangle(331,0,17,3);
		t.source = "common_line_png";
		t.width = 200;
		t.x = 25;
		t.y = 285;
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "套装效果";
		t.textColor = 0xffa800;
		t.x = 79;
		t.y = 251;
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "[2]件";
		t.textColor = 0x38b800;
		t.x = 13;
		t.y = 300;
		return t;
	};
	_proto._Label10_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击+100";
		t.textColor = 0x7c6e61;
		t.x = 77;
		t.y = 300;
		return t;
	};
	_proto._Label11_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击+100";
		t.textColor = 0x7c6e61;
		t.x = 77;
		t.y = 330;
		return t;
	};
	_proto._Label12_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击+100";
		t.textColor = 0x7c6e61;
		t.x = 77;
		t.y = 360;
		return t;
	};
	_proto._Label13_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "[3]件";
		t.textColor = 0x38b800;
		t.x = 13;
		t.y = 396;
		return t;
	};
	_proto._Label14_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击+100";
		t.textColor = 0x7c6e61;
		t.x = 77;
		t.y = 396;
		return t;
	};
	_proto._Label15_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击+100";
		t.textColor = 0x7c6e61;
		t.x = 77;
		t.y = 426;
		return t;
	};
	_proto._Label16_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击+100";
		t.textColor = 0x7c6e61;
		t.x = 77;
		t.y = 456;
		return t;
	};
	_proto._Label17_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "[4]件";
		t.textColor = 0x38b800;
		t.x = 13;
		t.y = 492;
		return t;
	};
	_proto._Label18_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击+100";
		t.textColor = 0x7c6e61;
		t.x = 77;
		t.y = 492;
		return t;
	};
	_proto._Label19_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击+100";
		t.textColor = 0x7c6e61;
		t.x = 78;
		t.y = 522;
		return t;
	};
	_proto._Label20_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击+100";
		t.textColor = 0x7c6e61;
		t.x = 77;
		t.y = 552;
		return t;
	};
	_proto._Label21_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "[5]件";
		t.textColor = 0x38b800;
		t.x = 13;
		t.y = 588;
		return t;
	};
	_proto._Label22_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击+100";
		t.textColor = 0x7c6e61;
		t.x = 77;
		t.y = 588;
		return t;
	};
	_proto._Label23_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击+100";
		t.textColor = 0x7c6e61;
		t.x = 77;
		t.y = 618;
		return t;
	};
	_proto._Label24_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击+100";
		t.textColor = 0x7c6e61;
		t.x = 77;
		t.y = 648;
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.label = "";
		t.x = 21;
		t.y = 725;
		t.skinName = SuitViewSkin$Skin50;
		return t;
	};
	_proto._Button2_i = function () {
		var t = new eui.Button();
		t.label = "";
		t.x = 142;
		t.y = 725;
		t.skinName = SuitViewSkin$Skin51;
		return t;
	};
	_proto._Button3_i = function () {
		var t = new eui.Button();
		t.label = "";
		t.x = 76;
		t.y = 1008;
		t.skinName = SuitViewSkin$Skin52;
		return t;
	};
	_proto._Button4_i = function () {
		var t = new eui.Button();
		t.label = "";
		t.x = 407;
		t.y = 1008;
		t.skinName = SuitViewSkin$Skin53;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_equip1","_equip2","_equip3","_equip4","_equip5","_equip6","_equip7","_equip8","fightingImg"];
		},
		enumerable: true,
		configurable: true
	});
	return SuitViewSkin;
})(eui.Skin);var ZhuhunAttrTipsSkin=(function (_super) {
	__extends(ZhuhunAttrTipsSkin, _super);
	var ZhuhunAttrTipsSkin$Skin54 = 	(function (_super) {
		__extends(ZhuhunAttrTipsSkin$Skin54, _super);
		function ZhuhunAttrTipsSkin$Skin54() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_tip_close_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ZhuhunAttrTipsSkin$Skin54.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_tip_close_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ZhuhunAttrTipsSkin$Skin54;
	})(eui.Skin);

	function ZhuhunAttrTipsSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = ZhuhunAttrTipsSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1280;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this._tipsBg_i(),this._Image1_i(),this._Label1_i(),this._curLevel_i(),this._curStatus_i(),this._curValue_i(),this._Image2_i(),this._nextLevel_i(),this._nextStatus_i(),this._nextValue_i(),this._closeBtn_i()];
		return t;
	};
	_proto._tipsBg_i = function () {
		var t = new eui.Image();
		this._tipsBg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 229;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(53,52,105,108);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_tipsBg_png";
		t.width = 345;
		t.x = 188;
		t.y = 322;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 36;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_title_wordBg_png";
		t.width = 209;
		t.x = 256;
		t.y = 336;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "铸魂属性加成";
		t.textColor = 0x7c6e62;
		t.x = 288;
		t.y = 339;
		return t;
	};
	_proto._curLevel_i = function () {
		var t = new Label();
		this._curLevel = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "全身铸魂+30";
		t.textColor = 0x7c6e62;
		t.x = 210;
		t.y = 382;
		return t;
	};
	_proto._curStatus_i = function () {
		var t = new Label();
		this._curStatus = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "（已激活）";
		t.textColor = 0x38b800;
		t.x = 349;
		t.y = 381;
		return t;
	};
	_proto._curValue_i = function () {
		var t = new Label();
		this._curValue = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击+100 生命+1000";
		t.textColor = 0x38b800;
		t.x = 210;
		t.y = 416;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 3;
		t.scale9Grid = new egret.Rectangle(297,1,100,0);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_line_png";
		t.width = 260;
		t.x = 206;
		t.y = 451;
		return t;
	};
	_proto._nextLevel_i = function () {
		var t = new Label();
		this._nextLevel = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "全身铸魂+30";
		t.textColor = 0x7c6e62;
		t.x = 210;
		t.y = 464;
		return t;
	};
	_proto._nextStatus_i = function () {
		var t = new Label();
		this._nextStatus = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "（下级效果）";
		t.textColor = 0x7c6e62;
		t.x = 349;
		t.y = 463;
		return t;
	};
	_proto._nextValue_i = function () {
		var t = new Label();
		this._nextValue = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击+100 生命+1000";
		t.textColor = 0x38b800;
		t.x = 210;
		t.y = 498;
		return t;
	};
	_proto._closeBtn_i = function () {
		var t = new Button();
		this._closeBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 501;
		t.y = 321;
		t.skinName = ZhuhunAttrTipsSkin$Skin54;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_tipsBg","_curLevel","_curStatus","_curValue","_nextLevel","_nextStatus","_nextValue","_closeBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return ZhuhunAttrTipsSkin;
})(eui.Skin);var ZhuhunUpgradeSkin=(function (_super) {
	__extends(ZhuhunUpgradeSkin, _super);
	var ZhuhunUpgradeSkin$Skin55 = 	(function (_super) {
		__extends(ZhuhunUpgradeSkin$Skin55, _super);
		function ZhuhunUpgradeSkin$Skin55() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ZhuhunUpgradeSkin$Skin55.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ZhuhunUpgradeSkin$Skin55;
	})(eui.Skin);

	function ZhuhunUpgradeSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = ZhuhunUpgradeSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1280;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this.baseView_i(),this._Image1_i(),this._btn_i(),this._btnImg_i(),this._Image2_i(),this._upgradeImg_i(),this._Image3_i(),this._attrValue_i(),this._Label1_i()];
		return t;
	};
	_proto.baseView_i = function () {
		var t = new BasePopUpView();
		this.baseView = t;
		t.height = 1280;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 271;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "equip_zhuhun_upgradeDI_png";
		t.width = 702;
		t.x = 9;
		t.y = 398;
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 241;
		t.y = 674;
		t.skinName = ZhuhunUpgradeSkin$Skin55;
		return t;
	};
	_proto._btnImg_i = function () {
		var t = new eui.Image();
		this._btnImg = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "confirm_png";
		t.x = 270;
		t.y = 701;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 52;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "equip_zhuhun_suit_png";
		t.width = 181;
		t.x = 270;
		t.y = 312;
		return t;
	};
	_proto._upgradeImg_i = function () {
		var t = new eui.Image();
		this._upgradeImg = t;
		t.height = 50;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "equip_zhuhun_upgradeLevel_png";
		t.width = 500;
		t.x = 110;
		t.y = 414;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 36;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_title_wordBg_png";
		t.width = 209;
		t.x = 256;
		t.y = 520;
		return t;
	};
	_proto._attrValue_i = function () {
		var t = new Label();
		this._attrValue = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击+99 防御+99";
		t.textColor = 0x7c6e62;
		t.x = 263;
		t.y = 594;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "阶段奖励属性";
		t.textColor = 0x7c6e62;
		t.x = 288;
		t.y = 526;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["baseView","_btn","_btnImg","_upgradeImg","_attrValue"];
		},
		enumerable: true,
		configurable: true
	});
	return ZhuhunUpgradeSkin;
})(eui.Skin);var ZhuhunViewSkin=(function (_super) {
	__extends(ZhuhunViewSkin, _super);
	var ZhuhunViewSkin$Skin56 = 	(function (_super) {
		__extends(ZhuhunViewSkin$Skin56, _super);
		function ZhuhunViewSkin$Skin56() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ZhuhunViewSkin$Skin56.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ZhuhunViewSkin$Skin56;
	})(eui.Skin);

	function ZhuhunViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i(),this._Image1_i(),this._Image2_i(),this._Label1_i(),this._btn_i(),this._btnImg_i(),this._Image3_i(),this._Label2_i(),this._attrValue1_i(),this._attrValue2_i(),this._nextAttrValue1_i(),this._nextAttrValue2_i(),this._equipImg_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this._ball1_i(),this._ball2_i(),this._ball3_i(),this._ball4_i(),this._ball5_i(),this._rateImg_i(),this._percentImg_i(),this._Image9_i()];
	}
	var _proto = ZhuhunViewSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.height = 1280;
		t.skinName = "BasePanelSkin";
		t.visible = false;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 588;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "equip_strengthen_centerImg1_png";
		t.width = 623;
		t.x = 49;
		t.y = 217;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "equip_strengthen_centerImg2_png";
		t.x = 49;
		t.y = 234;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "更换装备铸魂等级将完美继承";
		t.textColor = 0xdfccbe;
		t.x = 192;
		t.y = 994;
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 241;
		t.y = 1019;
		t.skinName = ZhuhunViewSkin$Skin56;
		return t;
	};
	_proto._btnImg_i = function () {
		var t = new eui.Image();
		this._btnImg = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "equip_sure_png";
		t.x = 280;
		t.y = 1046;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 70;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_strengthen_jiantou_png";
		t.width = 56;
		t.x = 332;
		t.y = 413;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "所需材料";
		t.textColor = 0x7c6e62;
		t.x = 300;
		t.y = 632;
		return t;
	};
	_proto._attrValue1_i = function () {
		var t = new Label();
		this._attrValue1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 165;
		t.y = 414;
		return t;
	};
	_proto._attrValue2_i = function () {
		var t = new Label();
		this._attrValue2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 165;
		t.y = 467;
		return t;
	};
	_proto._nextAttrValue1_i = function () {
		var t = new Label();
		this._nextAttrValue1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 408;
		t.y = 414;
		return t;
	};
	_proto._nextAttrValue2_i = function () {
		var t = new Label();
		this._nextAttrValue2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 408;
		t.y = 467;
		return t;
	};
	_proto._equipImg_i = function () {
		var t = new eui.Image();
		this._equipImg = t;
		t.height = 105;
		t.horizontalCenter = 4;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 105;
		t.x = 312;
		t.y = 266;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 67;
		t.source = "equip_zhuhun_ballBg_png";
		t.width = 66;
		t.x = 158;
		t.y = 519;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 67;
		t.source = "equip_zhuhun_ballBg_png";
		t.width = 66;
		t.x = 243;
		t.y = 519;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 67;
		t.source = "equip_zhuhun_ballBg_png";
		t.width = 66;
		t.x = 328;
		t.y = 520;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.height = 67;
		t.source = "equip_zhuhun_ballBg_png";
		t.width = 66;
		t.x = 413;
		t.y = 520;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.height = 67;
		t.source = "equip_zhuhun_ballBg_png";
		t.width = 66;
		t.x = 498;
		t.y = 520;
		return t;
	};
	_proto._ball1_i = function () {
		var t = new eui.Image();
		this._ball1 = t;
		t.height = 47;
		t.source = "equip_zhuhun_ball1_png";
		t.width = 46;
		t.x = 169;
		t.y = 526;
		return t;
	};
	_proto._ball2_i = function () {
		var t = new eui.Image();
		this._ball2 = t;
		t.height = 47;
		t.source = "equip_zhuhun_ball1_png";
		t.width = 46;
		t.x = 254;
		t.y = 526;
		return t;
	};
	_proto._ball3_i = function () {
		var t = new eui.Image();
		this._ball3 = t;
		t.height = 47;
		t.source = "equip_zhuhun_ball1_png";
		t.width = 46;
		t.x = 339;
		t.y = 526;
		return t;
	};
	_proto._ball4_i = function () {
		var t = new eui.Image();
		this._ball4 = t;
		t.height = 47;
		t.source = "equip_zhuhun_ball1_png";
		t.width = 46;
		t.x = 424;
		t.y = 526;
		return t;
	};
	_proto._ball5_i = function () {
		var t = new eui.Image();
		this._ball5 = t;
		t.height = 47;
		t.source = "equip_zhuhun_ball1_png";
		t.width = 46;
		t.x = 508;
		t.y = 526;
		return t;
	};
	_proto._rateImg_i = function () {
		var t = new eui.Image();
		this._rateImg = t;
		t.height = 44;
		t.source = "equip_zhuhun_cgl_png";
		t.width = 131;
		t.x = 247;
		t.y = 583;
		return t;
	};
	_proto._percentImg_i = function () {
		var t = new eui.Image();
		this._percentImg = t;
		t.height = 44;
		t.source = "equip_zhuhun_percent_png";
		t.width = 35;
		t.x = 400;
		t.y = 583;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.height = 127;
		t.horizontalCenter = 0;
		t.source = "equip_strengthen_bottomBg_png";
		t.width = 720;
		t.y = 855;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel","_btn","_btnImg","_attrValue1","_attrValue2","_nextAttrValue1","_nextAttrValue2","_equipImg","_ball1","_ball2","_ball3","_ball4","_ball5","_rateImg","_percentImg"];
		},
		enumerable: true,
		configurable: true
	});
	return ZhuhunViewSkin;
})(eui.Skin);var FriendsMainViewSkin=(function (_super) {
	__extends(FriendsMainViewSkin, _super);
	function FriendsMainViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i(),this._msgTipsIcon_i()];
	}
	var _proto = FriendsMainViewSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.percentHeight = 100;
		t.skinName = "BasePanelSkin";
		t.percentWidth = 100;
		return t;
	};
	_proto._msgTipsIcon_i = function () {
		var t = new eui.Image();
		this._msgTipsIcon = t;
		t.source = "common_red_icon_png";
		t.touchEnabled = false;
		t.x = 520;
		t.y = 1160;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel","_msgTipsIcon"];
		},
		enumerable: true,
		configurable: true
	});
	return FriendsMainViewSkin;
})(eui.Skin);var FriendsBlackViewSkin=(function (_super) {
	__extends(FriendsBlackViewSkin, _super);
	var FriendsBlackViewSkin$Skin57 = 	(function (_super) {
		__extends(FriendsBlackViewSkin$Skin57, _super);
		function FriendsBlackViewSkin$Skin57() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FriendsBlackViewSkin$Skin57.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "friends_btn_all_delete_png";
			t.x = 29;
			t.y = 27;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return FriendsBlackViewSkin$Skin57;
	})(eui.Skin);

	function FriendsBlackViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._list_i(),this._Image1_i(),this._deleteBtn_i()];
	}
	var _proto = FriendsBlackViewSkin.prototype;

	_proto._list_i = function () {
		var t = new BaseVScrollerList();
		this._list = t;
		t.height = 857;
		t.width = 672;
		t.x = 22;
		t.y = 122;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "friends_delete_tips_png";
		t.x = 82;
		t.y = 989;
		return t;
	};
	_proto._deleteBtn_i = function () {
		var t = new Button();
		this._deleteBtn = t;
		t.label = "";
		t.x = 235;
		t.y = 1014;
		t.skinName = FriendsBlackViewSkin$Skin57;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_list","_deleteBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return FriendsBlackViewSkin;
})(eui.Skin);var FriendsBatchDeleteSkin=(function (_super) {
	__extends(FriendsBatchDeleteSkin, _super);
	var FriendsBatchDeleteSkin$Skin58 = 	(function (_super) {
		__extends(FriendsBatchDeleteSkin$Skin58, _super);
		function FriendsBatchDeleteSkin$Skin58() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FriendsBatchDeleteSkin$Skin58.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "friends_btn_delete_png";
			t.verticalCenter = 0;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return FriendsBatchDeleteSkin$Skin58;
	})(eui.Skin);

	var FriendsBatchDeleteSkin$Skin59 = 	(function (_super) {
		__extends(FriendsBatchDeleteSkin$Skin59, _super);
		function FriendsBatchDeleteSkin$Skin59() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","friends_checkbox_selected_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FriendsBatchDeleteSkin$Skin59.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "friends_checkbox_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return FriendsBatchDeleteSkin$Skin59;
	})(eui.Skin);

	function FriendsBatchDeleteSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._basePopUp_i(),this._titleImg_i(),this._list_i(),this._delBtn_i(),this._Label1_i(),this._allCB_i()];
	}
	var _proto = FriendsBatchDeleteSkin.prototype;

	_proto._basePopUp_i = function () {
		var t = new BasePopUpView();
		this._basePopUp = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._titleImg_i = function () {
		var t = new eui.Image();
		this._titleImg = t;
		t.source = "friends_batch_delete_png";
		t.x = 284;
		t.y = 317;
		return t;
	};
	_proto._list_i = function () {
		var t = new BaseVScrollerList();
		this._list = t;
		t.height = 286;
		t.width = 671;
		t.x = 23;
		t.y = 377;
		return t;
	};
	_proto._delBtn_i = function () {
		var t = new Button();
		this._delBtn = t;
		t.label = "";
		t.x = 240;
		t.y = 673;
		t.skinName = FriendsBatchDeleteSkin$Skin58;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "全选";
		t.x = 561;
		t.y = 707;
		return t;
	};
	_proto._allCB_i = function () {
		var t = new CheckBox();
		this._allCB = t;
		t.label = "";
		t.x = 625;
		t.y = 699;
		t.skinName = FriendsBatchDeleteSkin$Skin59;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_basePopUp","_titleImg","_list","_delBtn","_allCB"];
		},
		enumerable: true,
		configurable: true
	});
	return FriendsBatchDeleteSkin;
})(eui.Skin);var FriendsDeleteItemSkin=(function (_super) {
	__extends(FriendsDeleteItemSkin, _super);
	var FriendsDeleteItemSkin$Skin60 = 	(function (_super) {
		__extends(FriendsDeleteItemSkin$Skin60, _super);
		function FriendsDeleteItemSkin$Skin60() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","friends_checkbox_selected_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FriendsDeleteItemSkin$Skin60.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "friends_checkbox_normal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return FriendsDeleteItemSkin$Skin60;
	})(eui.Skin);

	function FriendsDeleteItemSkin() {
		_super.call(this);
		
		this.height = 73;
		this.width = 671;
		this.elementsContent = [this._Image1_i(),this._nameTxt_i(),this._lvlTxt_i(),this._offTxt_i(),this._cb_i()];
	}
	var _proto = FriendsDeleteItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "common_wordBg_normal_png";
		t.top = 0;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "角色名字七个字";
		t.textColor = 0x7c6e62;
		t.x = 19;
		t.y = 25;
		return t;
	};
	_proto._lvlTxt_i = function () {
		var t = new Label();
		this._lvlTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "99转999级";
		t.textColor = 0x7c6e62;
		t.x = 293;
		t.y = 25;
		return t;
	};
	_proto._offTxt_i = function () {
		var t = new Label();
		this._offTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "离线7天以上";
		t.textColor = 0x7c6e62;
		t.x = 465;
		t.y = 25;
		return t;
	};
	_proto._cb_i = function () {
		var t = new CheckBox();
		this._cb = t;
		t.label = "";
		t.x = 604;
		t.y = 12;
		t.skinName = FriendsDeleteItemSkin$Skin60;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_nameTxt","_lvlTxt","_offTxt","_cb"];
		},
		enumerable: true,
		configurable: true
	});
	return FriendsDeleteItemSkin;
})(eui.Skin);var FriendsListItemSkin=(function (_super) {
	__extends(FriendsListItemSkin, _super);
	function FriendsListItemSkin() {
		_super.call(this);
		
		this.height = 147;
		this.width = 671;
		this.elementsContent = [this._back_i(),this._headBack_i(),this._nameTxt_i(),this._fightTxt_i(),this._lvlTxt_i(),this._sign_i(),this._statusTxt_i()];
	}
	var _proto = FriendsListItemSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "common_wordBg_normal_png";
		t.top = 0;
		return t;
	};
	_proto._headBack_i = function () {
		var t = new eui.Image();
		this._headBack = t;
		t.source = "common_itemBg_png";
		t.x = 3;
		t.y = 3;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.width = 300;
		t.x = 140;
		t.y = 30;
		return t;
	};
	_proto._fightTxt_i = function () {
		var t = new Label();
		this._fightTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.width = 300;
		t.x = 140;
		t.y = 85;
		return t;
	};
	_proto._lvlTxt_i = function () {
		var t = new Label();
		this._lvlTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "1级";
		t.textColor = 0x7c6e62;
		t.x = 467;
		t.y = 30;
		return t;
	};
	_proto._sign_i = function () {
		var t = new eui.Image();
		this._sign = t;
		t.source = "friends_online_png";
		t.x = 460;
		t.y = 85;
		return t;
	};
	_proto._statusTxt_i = function () {
		var t = new Label();
		this._statusTxt = t;
		t.bold = true;
		t.size = 24;
		t.text = "在线";
		t.textColor = 0x38b800;
		t.x = 490;
		t.y = 90;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_headBack","_nameTxt","_fightTxt","_lvlTxt","_sign","_statusTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return FriendsListItemSkin;
})(eui.Skin);var FriendsListViewSkin=(function (_super) {
	__extends(FriendsListViewSkin, _super);
	var FriendsListViewSkin$Skin61 = 	(function (_super) {
		__extends(FriendsListViewSkin$Skin61, _super);
		function FriendsListViewSkin$Skin61() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FriendsListViewSkin$Skin61.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "friends_batch_delete_png";
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return FriendsListViewSkin$Skin61;
	})(eui.Skin);

	function FriendsListViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._list_i(),this._batchDelBtn_i()];
	}
	var _proto = FriendsListViewSkin.prototype;

	_proto._list_i = function () {
		var t = new BaseVScrollerList();
		this._list = t;
		t.height = 857;
		t.width = 672;
		t.x = 22;
		t.y = 122;
		return t;
	};
	_proto._batchDelBtn_i = function () {
		var t = new Button();
		this._batchDelBtn = t;
		t.label = "";
		t.x = 235;
		t.y = 1014;
		t.skinName = FriendsListViewSkin$Skin61;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_list","_batchDelBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return FriendsListViewSkin;
})(eui.Skin);var FriendsDialogSkin=(function (_super) {
	__extends(FriendsDialogSkin, _super);
	function FriendsDialogSkin() {
		_super.call(this);
		
		this.height = 69;
		this.width = 500;
		this.elementsContent = [this._back_i(),this._txt_i()];
	}
	var _proto = FriendsDialogSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(41,40,34,12);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "friends_chat_others_png";
		t.top = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._txt_i = function () {
		var t = new Label();
		this._txt = t;
		t.bottom = 10;
		t.fontFamily = "Microsoft YaHei";
		t.maxWidth = 456;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "测试测试";
		t.textColor = 0x7c6e62;
		t.top = 10;
		t.verticalAlign = "middle";
		t.x = 20;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_txt"];
		},
		enumerable: true,
		configurable: true
	});
	return FriendsDialogSkin;
})(eui.Skin);var FriendsChatItemSkin=(function (_super) {
	__extends(FriendsChatItemSkin, _super);
	function FriendsChatItemSkin() {
		_super.call(this);
		
		this.height = 111;
		this.width = 666;
		this.elementsContent = [this._headBack_i(),this._dialog_i()];
	}
	var _proto = FriendsChatItemSkin.prototype;

	_proto._headBack_i = function () {
		var t = new eui.Image();
		this._headBack = t;
		t.source = "common_itemBg_png";
		t.x = 0;
		t.y = -15;
		return t;
	};
	_proto._dialog_i = function () {
		var t = new FriendsDialog();
		this._dialog = t;
		t.height = 69;
		t.skinName = "FriendsDialogSkin";
		t.width = 500;
		t.x = 0;
		t.y = 6;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_headBack","_dialog"];
		},
		enumerable: true,
		configurable: true
	});
	return FriendsChatItemSkin;
})(eui.Skin);var FriendsChatViewSkin=(function (_super) {
	__extends(FriendsChatViewSkin, _super);
	var FriendsChatViewSkin$Skin62 = 	(function (_super) {
		__extends(FriendsChatViewSkin$Skin62, _super);
		function FriendsChatViewSkin$Skin62() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_closeImg_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FriendsChatViewSkin$Skin62.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_closeImg_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return FriendsChatViewSkin$Skin62;
	})(eui.Skin);

	var FriendsChatViewSkin$Skin63 = 	(function (_super) {
		__extends(FriendsChatViewSkin$Skin63, _super);
		function FriendsChatViewSkin$Skin63() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","按下状态资源名")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FriendsChatViewSkin$Skin63.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "friends_backBtn_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return FriendsChatViewSkin$Skin63;
	})(eui.Skin);

	var FriendsChatViewSkin$Skin64 = 	(function (_super) {
		__extends(FriendsChatViewSkin$Skin64, _super);
		function FriendsChatViewSkin$Skin64() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FriendsChatViewSkin$Skin64.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "friends_face_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return FriendsChatViewSkin$Skin64;
	})(eui.Skin);

	var FriendsChatViewSkin$Skin65 = 	(function (_super) {
		__extends(FriendsChatViewSkin$Skin65, _super);
		function FriendsChatViewSkin$Skin65() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FriendsChatViewSkin$Skin65.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "friends_sendBtn_png";
			t.x = 7;
			t.y = 19;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return FriendsChatViewSkin$Skin65;
	})(eui.Skin);

	function FriendsChatViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._closeBtn_i(),this._nameTxt_i(),this._scroll_i(),this._backBtn_i(),this._input_i(),this._faceBtn_i(),this._sendBtn_i()];
	}
	var _proto = FriendsChatViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1043;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(5,114,4,687);
		t.source = "panel_bg3_png";
		t.top = 90;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 32;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(90,10,540,5);
		t.source = "border1_png";
		t.top = 66;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 110;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(90,0,540,248);
		t.source = "panel_bg2_png";
		t.top = 1015;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 32;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(90,4,540,25);
		t.source = "border2_png";
		t.y = 1115;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 1073;
		t.source = "panel_bgKuang2_png";
		t.width = 720;
		t.x = 0;
		t.y = 67;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 69;
		t.left = 0;
		t.right = 0;
		t.source = "common_titleBg2_png";
		t.top = 49;
		return t;
	};
	_proto._closeBtn_i = function () {
		var t = new eui.Button();
		this._closeBtn = t;
		t.label = "";
		t.x = 622;
		t.y = 43;
		t.skinName = FriendsChatViewSkin$Skin62;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.bold = true;
		t.text = "与XXX私聊中";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 70;
		return t;
	};
	_proto._scroll_i = function () {
		var t = new Scroller();
		this._scroll = t;
		t.height = 870;
		t.scrollPolicyH = "off";
		t.width = 666;
		t.x = 26;
		t.y = 125;
		t.viewport = this._group_i();
		return t;
	};
	_proto._group_i = function () {
		var t = new eui.Group();
		this._group = t;
		return t;
	};
	_proto._backBtn_i = function () {
		var t = new Button();
		this._backBtn = t;
		t.label = "";
		t.x = 7;
		t.y = 1036;
		t.skinName = FriendsChatViewSkin$Skin63;
		return t;
	};
	_proto._input_i = function () {
		var t = new TextInput();
		this._input = t;
		t.height = 62;
		t.maxChars = 200;
		t.prompt = "聊天发送信息输入区域";
		t.skinName = "BaseTextInputSkin";
		t.width = 327;
		t.x = 137;
		t.y = 1039;
		return t;
	};
	_proto._faceBtn_i = function () {
		var t = new Button();
		this._faceBtn = t;
		t.label = "";
		t.x = 467;
		t.y = 1035;
		t.skinName = FriendsChatViewSkin$Skin64;
		return t;
	};
	_proto._sendBtn_i = function () {
		var t = new Button();
		this._sendBtn = t;
		t.height = 90;
		t.label = "";
		t.width = 195;
		t.x = 524;
		t.y = 1026;
		t.skinName = FriendsChatViewSkin$Skin65;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_closeBtn","_nameTxt","_group","_scroll","_backBtn","_input","_faceBtn","_sendBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return FriendsChatViewSkin;
})(eui.Skin);var FriendsPrivateItemSkin=(function (_super) {
	__extends(FriendsPrivateItemSkin, _super);
	function FriendsPrivateItemSkin() {
		_super.call(this);
		
		this.height = 147;
		this.width = 671;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._headBack_i(),this._bubble_i(),this._nameTxt_i(),this._lvlTxt_i(),this._msgTxt_i(),this._timeTxt_i()];
	}
	var _proto = FriendsPrivateItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "common_wordBg_normal_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 72;
		t.left = 0;
		t.right = 0;
		t.source = "split_line_png";
		t.top = 72;
		return t;
	};
	_proto._headBack_i = function () {
		var t = new eui.Image();
		this._headBack = t;
		t.source = "common_itemBg_png";
		t.x = 3;
		t.y = 3;
		return t;
	};
	_proto._bubble_i = function () {
		var t = new BubbleView();
		this._bubble = t;
		t.height = 44;
		t.skinName = "BubbleViewSkin";
		t.width = 43;
		t.x = 88;
		t.y = 4;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "角色名字七个字";
		t.textColor = 0x7c6e62;
		t.x = 140;
		t.y = 30;
		return t;
	};
	_proto._lvlTxt_i = function () {
		var t = new Label();
		this._lvlTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "99转999级";
		t.textColor = 0x7c6e62;
		t.width = 150;
		t.x = 510;
		t.y = 30;
		return t;
	};
	_proto._msgTxt_i = function () {
		var t = new Label();
		this._msgTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.maxChars = 336;
		t.multiline = false;
		t.size = 24;
		t.text = "最新消息最新消息最新消息";
		t.textColor = 0x7c6e62;
		t.width = 360;
		t.wordWrap = false;
		t.x = 140;
		t.y = 85;
		return t;
	};
	_proto._timeTxt_i = function () {
		var t = new Label();
		this._timeTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "23:59:59";
		t.textColor = 0x38b800;
		t.width = 150;
		t.x = 510;
		t.y = 88;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_headBack","_bubble","_nameTxt","_lvlTxt","_msgTxt","_timeTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return FriendsPrivateItemSkin;
})(eui.Skin);var FriendsPrivateViewSkin=(function (_super) {
	__extends(FriendsPrivateViewSkin, _super);
	function FriendsPrivateViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._list_i()];
	}
	var _proto = FriendsPrivateViewSkin.prototype;

	_proto._list_i = function () {
		var t = new BaseVScrollerList();
		this._list = t;
		t.height = 998;
		t.width = 672;
		t.x = 22;
		t.y = 122;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_list"];
		},
		enumerable: true,
		configurable: true
	});
	return FriendsPrivateViewSkin;
})(eui.Skin);var FriendsSearchViewSkin=(function (_super) {
	__extends(FriendsSearchViewSkin, _super);
	var FriendsSearchViewSkin$Skin66 = 	(function (_super) {
		__extends(FriendsSearchViewSkin$Skin66, _super);
		function FriendsSearchViewSkin$Skin66() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","friends_icon_search_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FriendsSearchViewSkin$Skin66.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "friends_icon_search_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return FriendsSearchViewSkin$Skin66;
	})(eui.Skin);

	var FriendsSearchViewSkin$Skin67 = 	(function (_super) {
		__extends(FriendsSearchViewSkin$Skin67, _super);
		function FriendsSearchViewSkin$Skin67() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FriendsSearchViewSkin$Skin67.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "friends_btn_change_png";
			t.x = 29;
			t.y = 27;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return FriendsSearchViewSkin$Skin67;
	})(eui.Skin);

	var FriendsSearchViewSkin$Skin68 = 	(function (_super) {
		__extends(FriendsSearchViewSkin$Skin68, _super);
		function FriendsSearchViewSkin$Skin68() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FriendsSearchViewSkin$Skin68.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "friends_btn_invite_png";
			t.x = 29;
			t.y = 27;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return FriendsSearchViewSkin$Skin68;
	})(eui.Skin);

	function FriendsSearchViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._list_i(),this._input_i(),this._searchBtn_i(),this._changeBtn_i(),this._addBtn_i()];
	}
	var _proto = FriendsSearchViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "friends_suggest_png";
		t.x = 14;
		t.y = 127;
		return t;
	};
	_proto._list_i = function () {
		var t = new BaseVScrollerList();
		this._list = t;
		t.height = 703;
		t.width = 672;
		t.x = 22;
		t.y = 181;
		return t;
	};
	_proto._input_i = function () {
		var t = new TextInput();
		this._input = t;
		t.enabled = true;
		t.height = 63;
		t.skinName = "BaseTextInputSkin";
		t.width = 427;
		t.x = 110;
		t.y = 897;
		return t;
	};
	_proto._searchBtn_i = function () {
		var t = new Button();
		this._searchBtn = t;
		t.label = "";
		t.x = 545;
		t.y = 892;
		t.skinName = FriendsSearchViewSkin$Skin66;
		return t;
	};
	_proto._changeBtn_i = function () {
		var t = new Button();
		this._changeBtn = t;
		t.label = "";
		t.x = 42;
		t.y = 1008;
		t.skinName = FriendsSearchViewSkin$Skin67;
		return t;
	};
	_proto._addBtn_i = function () {
		var t = new Button();
		this._addBtn = t;
		t.label = "";
		t.x = 440;
		t.y = 1008;
		t.skinName = FriendsSearchViewSkin$Skin68;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_list","_input","_searchBtn","_changeBtn","_addBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return FriendsSearchViewSkin;
})(eui.Skin);var HeroView=(function (_super) {
	__extends(HeroViewSkin, _super);
	var HeroViewSkin$Skin69 = 	(function (_super) {
		__extends(HeroViewSkin$Skin69, _super);
		function HeroViewSkin$Skin69() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HeroViewSkin$Skin69.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "common_close_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HeroViewSkin$Skin69;
	})(eui.Skin);

	function HeroViewSkin() {
		_super.call(this);
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this._closeBtn_i()];
	}
	var _proto = HeroViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "common_bg_jpg";
		t.top = 0;
		return t;
	};
	_proto._closeBtn_i = function () {
		var t = new eui.Button();
		this._closeBtn = t;
		t.label = "";
		t.x = 560;
		t.y = 30;
		t.skinName = HeroViewSkin$Skin69;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_closeBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return HeroViewSkin;
})(eui.Skin);var MainSysnoticeItemSkin=(function (_super) {
	__extends(MainSysnoticeItemSkin, _super);
	function MainSysnoticeItemSkin() {
		_super.call(this);
		
		this.height = 92;
		this.width = 256;
		this.elementsContent = [this._Image1_i(),this._redIcon_i(),this._img1_i(),this._img2_i()];
	}
	var _proto = MainSysnoticeItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "main_sysnotice_png";
		t.x = 0;
		t.y = 23;
		return t;
	};
	_proto._redIcon_i = function () {
		var t = new eui.Image();
		this._redIcon = t;
		t.source = "common_red_icon_png";
		t.x = 165;
		t.y = 22;
		return t;
	};
	_proto._img1_i = function () {
		var t = new eui.Image();
		this._img1 = t;
		t.source = "task_fightIcon_png";
		t.x = 217;
		t.y = 28;
		return t;
	};
	_proto._img2_i = function () {
		var t = new eui.Image();
		this._img2 = t;
		t.source = "task_fightIcon_png";
		t.x = 258;
		t.y = 28.5;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_redIcon","_img1","_img2"];
		},
		enumerable: true,
		configurable: true
	});
	return MainSysnoticeItemSkin;
})(eui.Skin);var TaskProgressSkin=(function (_super) {
	__extends(TaskProgressSkin, _super);
	function TaskProgressSkin() {
		_super.call(this);
		
		this.height = 24;
		this.width = 118;
		this.elementsContent = [this._Image1_i(),this._barImg_i(),this._proTxt_i()];
	}
	var _proto = TaskProgressSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "task_jinduBg_png";
		t.x = 1;
		t.y = 1;
		return t;
	};
	_proto._barImg_i = function () {
		var t = new eui.Image();
		this._barImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 14;
		t.scale9Grid = new egret.Rectangle(23,1,61,11);
		t.source = "task_jindu_png";
		t.width = 106;
		t.x = 5;
		t.y = 4;
		return t;
	};
	_proto._proTxt_i = function () {
		var t = new Label();
		this._proTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 19;
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xfff7e7;
		t.width = 70;
		t.y = 1;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_barImg","_proTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return TaskProgressSkin;
})(eui.Skin);var PlayerResItemsSkin=(function (_super) {
	__extends(PlayerResItemsSkin, _super);
	function PlayerResItemsSkin() {
		_super.call(this);
		
		this.height = 54;
		this.width = 67;
		this.elementsContent = [this._resImg_i(),this._countTxt_i()];
	}
	var _proto = PlayerResItemsSkin.prototype;

	_proto._resImg_i = function () {
		var t = new eui.Image();
		this._resImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 54;
		t.source = "";
		t.width = 54;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._countTxt_i = function () {
		var t = new Label();
		this._countTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 32;
		t.size = 20;
		t.text = "X1000";
		t.width = 122;
		t.x = 30;
		t.y = 15;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_resImg","_countTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return PlayerResItemsSkin;
})(eui.Skin);var TaskViewSkin=(function (_super) {
	__extends(TaskViewSkin, _super);
	var TaskViewSkin$Skin70 = 	(function (_super) {
		__extends(TaskViewSkin$Skin70, _super);
		function TaskViewSkin$Skin70() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TaskViewSkin$Skin70.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "task_autoTask_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return TaskViewSkin$Skin70;
	})(eui.Skin);

	function TaskViewSkin() {
		_super.call(this);
		
		this.height = 175;
		this.width = 287;
		this.elementsContent = [this._group_i(),this._Image3_i(),this._Label1_i(),this._autoBtn_i(),this._gouImg_i(),this._passTxt_i(),this._Label2_i()];
	}
	var _proto = TaskViewSkin.prototype;

	_proto._group_i = function () {
		var t = new eui.Group();
		this._group = t;
		t.x = 24;
		t.y = 59;
		t.elementsContent = [this._Image1_i(),this._descTxt_i(),this._nameTxt_i(),this._Image2_i(),this._progress_i(),this._res1_i(),this._res2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 116;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "task_guangBg_png";
		t.width = 264;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._descTxt_i = function () {
		var t = new Label();
		this._descTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 31;
		t.size = 22;
		t.text = "Label";
		t.textColor = 0xfff7e7;
		t.width = 228;
		t.x = 21;
		t.y = 51;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 26;
		t.size = 22;
		t.text = "在在在在";
		t.textAlign = "center";
		t.textColor = 0xfff7e7;
		t.width = 97;
		t.x = 16;
		t.y = 13;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "task_fightIcon_png";
		t.x = 228;
		t.y = 10;
		return t;
	};
	_proto._progress_i = function () {
		var t = new TaskProgress();
		this._progress = t;
		t.height = 20;
		t.skinName = "TaskProgressSkin";
		t.width = 118;
		t.x = 109;
		t.y = 14;
		return t;
	};
	_proto._res1_i = function () {
		var t = new PlayerResItems();
		this._res1 = t;
		t.height = 23;
		t.skinName = "PlayerResItemsSkin";
		t.width = 93;
		t.x = 26;
		t.y = 81;
		return t;
	};
	_proto._res2_i = function () {
		var t = new PlayerResItems();
		this._res2 = t;
		t.height = 23;
		t.skinName = "PlayerResItemsSkin";
		t.width = 93;
		t.x = 146;
		t.y = 81;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 89;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "task_guang_png";
		t.width = 42;
		t.x = 4;
		t.y = 43;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 25;
		t.size = 22;
		t.text = "第";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.verticalAlign = "top";
		t.width = 25;
		t.x = 12;
		t.y = 61;
		return t;
	};
	_proto._autoBtn_i = function () {
		var t = new Button();
		this._autoBtn = t;
		t.label = "Button";
		t.x = 3;
		t.y = 0;
		t.skinName = TaskViewSkin$Skin70;
		return t;
	};
	_proto._gouImg_i = function () {
		var t = new eui.Image();
		this._gouImg = t;
		t.source = "task_gou_png";
		t.x = 4;
		t.y = 8;
		return t;
	};
	_proto._passTxt_i = function () {
		var t = new Label();
		this._passTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 24;
		t.size = 22;
		t.text = "11";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.verticalAlign = "top";
		t.width = 41;
		t.x = 3.5;
		t.y = 83.5;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 25;
		t.size = 22;
		t.text = "关";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.verticalAlign = "top";
		t.width = 25;
		t.x = 12;
		t.y = 105;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_descTxt","_nameTxt","_progress","_res1","_res2","_group","_autoBtn","_gouImg","_passTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return TaskViewSkin;
})(eui.Skin);var HomeViewSkin=(function (_super) {
	__extends(HomeViewSkin, _super);
	var HomeViewSkin$Skin71 = 	(function (_super) {
		__extends(HomeViewSkin$Skin71, _super);
		function HomeViewSkin$Skin71() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","main_minBtn_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin71.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "main_minBtn_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin71;
	})(eui.Skin);

	var HomeViewSkin$Skin72 = 	(function (_super) {
		__extends(HomeViewSkin$Skin72, _super);
		function HomeViewSkin$Skin72() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","main_maxBtn_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin72.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "main_maxBtn_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin72;
	})(eui.Skin);

	var HomeViewSkin$Skin73 = 	(function (_super) {
		__extends(HomeViewSkin$Skin73, _super);
		function HomeViewSkin$Skin73() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin73.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.height = 70;
			t.source = "common_btn3_1_png";
			t.width = 129;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "common_label_exit_png";
			t.verticalCenter = 0;
			t.x = -23;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin73;
	})(eui.Skin);

	var HomeViewSkin$Skin74 = 	(function (_super) {
		__extends(HomeViewSkin$Skin74, _super);
		function HomeViewSkin$Skin74() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","main_addImg_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin74.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "main_addImg_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin74;
	})(eui.Skin);

	var HomeViewSkin$Skin75 = 	(function (_super) {
		__extends(HomeViewSkin$Skin75, _super);
		function HomeViewSkin$Skin75() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","main_VIP_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin75.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "main_VIP_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 20;
			t.source = "main_vipImg_png";
			t.width = 30;
			t.x = 23;
			t.y = 43;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin75;
	})(eui.Skin);

	var HomeViewSkin$Skin76 = 	(function (_super) {
		__extends(HomeViewSkin$Skin76, _super);
		function HomeViewSkin$Skin76() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","main_mail_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin76.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "main_mail_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin76;
	})(eui.Skin);

	var HomeViewSkin$Skin77 = 	(function (_super) {
		__extends(HomeViewSkin$Skin77, _super);
		function HomeViewSkin$Skin77() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","main_chat_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin77.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "main_chat_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin77;
	})(eui.Skin);

	var HomeViewSkin$Skin78 = 	(function (_super) {
		__extends(HomeViewSkin$Skin78, _super);
		function HomeViewSkin$Skin78() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin78.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "main_icon_bag2_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin78;
	})(eui.Skin);

	var HomeViewSkin$Skin79 = 	(function (_super) {
		__extends(HomeViewSkin$Skin79, _super);
		function HomeViewSkin$Skin79() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin79.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "main_icon_gift_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin79;
	})(eui.Skin);

	var HomeViewSkin$Skin80 = 	(function (_super) {
		__extends(HomeViewSkin$Skin80, _super);
		function HomeViewSkin$Skin80() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin80.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "main_icon_fazuo_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin80;
	})(eui.Skin);

	var HomeViewSkin$Skin81 = 	(function (_super) {
		__extends(HomeViewSkin$Skin81, _super);
		function HomeViewSkin$Skin81() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin81.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "main_icon_faqi_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin81;
	})(eui.Skin);

	var HomeViewSkin$Skin82 = 	(function (_super) {
		__extends(HomeViewSkin$Skin82, _super);
		function HomeViewSkin$Skin82() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin82.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "main_icon_zhanhun_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin82;
	})(eui.Skin);

	var HomeViewSkin$Skin83 = 	(function (_super) {
		__extends(HomeViewSkin$Skin83, _super);
		function HomeViewSkin$Skin83() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","main_icon_role_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin83.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "main_icon_role_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin83;
	})(eui.Skin);

	var HomeViewSkin$Skin84 = 	(function (_super) {
		__extends(HomeViewSkin$Skin84, _super);
		function HomeViewSkin$Skin84() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","main_icon_skill_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin84.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "main_icon_skill_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin84;
	})(eui.Skin);

	var HomeViewSkin$Skin85 = 	(function (_super) {
		__extends(HomeViewSkin$Skin85, _super);
		function HomeViewSkin$Skin85() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","main_icon_forging_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin85.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "main_icon_forging_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin85;
	})(eui.Skin);

	var HomeViewSkin$Skin86 = 	(function (_super) {
		__extends(HomeViewSkin$Skin86, _super);
		function HomeViewSkin$Skin86() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","main_icon_bag_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin86.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "main_icon_bag_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin86;
	})(eui.Skin);

	var HomeViewSkin$Skin87 = 	(function (_super) {
		__extends(HomeViewSkin$Skin87, _super);
		function HomeViewSkin$Skin87() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = HomeViewSkin$Skin87.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return HomeViewSkin$Skin87;
	})(eui.Skin);

	function HomeViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._leftLayer_i(),this._topGroup_i(),this._mapGroup_i(),this._mainLayer_i(),this._taskView_i(),this._rightIconGroup_i(),this._effectLayer1_i(),this._effectLayer2_i()];
	}
	var _proto = HomeViewSkin.prototype;

	_proto._leftLayer_i = function () {
		var t = new eui.Group();
		this._leftLayer = t;
		t.height = 1280;
		t.left = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this._minBtn_i(),this._maxBtn_i(),this._topBtnGroup_i(),this._btnExit_i(),this._sysNoticeItem_i()];
		return t;
	};
	_proto._minBtn_i = function () {
		var t = new Button();
		this._minBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 0;
		t.y = 155;
		t.skinName = HomeViewSkin$Skin71;
		return t;
	};
	_proto._maxBtn_i = function () {
		var t = new Button();
		this._maxBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 0;
		t.y = 155;
		t.skinName = HomeViewSkin$Skin72;
		return t;
	};
	_proto._topBtnGroup_i = function () {
		var t = new eui.Group();
		this._topBtnGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 236;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 630;
		t.x = 68;
		t.y = 135;
		return t;
	};
	_proto._btnExit_i = function () {
		var t = new Button();
		this._btnExit = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = -1;
		t.y = 987;
		t.skinName = HomeViewSkin$Skin73;
		return t;
	};
	_proto._sysNoticeItem_i = function () {
		var t = new MainSysnoticeItem();
		this._sysNoticeItem = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 92;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "MainSysnoticeItemSkin";
		t.width = 220;
		t.x = -14;
		t.y = 711;
		return t;
	};
	_proto._topGroup_i = function () {
		var t = new eui.Group();
		this._topGroup = t;
		t.height = 134;
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 510;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._coin_i(),this._Image4_i(),this._Image5_i(),this._gold_i(),this._vip_i(),this._headImg_i(),this._sysChargeBtn_i(),this._sound_i(),this._nickName_i(),this._vipBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 134;
		t.source = "main_headBg_png";
		t.width = 465;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "common_top_itemBg_png";
		t.x = 162;
		t.y = 9;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "playRes_coin_54_png";
		t.x = 130;
		t.y = -4;
		return t;
	};
	_proto._coin_i = function () {
		var t = new eui.Label();
		this._coin = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "0";
		t.textAlign = "right";
		t.width = 100;
		t.x = 162;
		t.y = 12;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "common_top_itemBg_png";
		t.x = 297;
		t.y = 9;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "playRes_gold_54_png";
		t.x = 270;
		t.y = -5;
		return t;
	};
	_proto._gold_i = function () {
		var t = new eui.Label();
		this._gold = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "0";
		t.textAlign = "right";
		t.width = 100;
		t.x = 297;
		t.y = 12;
		return t;
	};
	_proto._vip_i = function () {
		var t = new eui.Group();
		this._vip = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 31;
		t.width = 165;
		t.x = 281;
		t.y = 5;
		return t;
	};
	_proto._headImg_i = function () {
		var t = new eui.Image();
		this._headImg = t;
		t.height = 126;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "main_sex1_png";
		t.width = 103;
		t.x = 11;
		t.y = -6;
		return t;
	};
	_proto._sysChargeBtn_i = function () {
		var t = new eui.Button();
		this._sysChargeBtn = t;
		t.label = "";
		t.x = 406;
		t.y = 3;
		t.skinName = HomeViewSkin$Skin74;
		return t;
	};
	_proto._sound_i = function () {
		var t = new eui.Image();
		this._sound = t;
		t.height = 42;
		t.source = "main_sound_open_png";
		t.width = 37;
		t.x = 99;
		t.y = 88;
		return t;
	};
	_proto._nickName_i = function () {
		var t = new eui.Label();
		this._nickName = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "专打高富帅 2转999级";
		t.textColor = 0xd1ccc8;
		t.x = 144;
		t.y = 47;
		return t;
	};
	_proto._vipBtn_i = function () {
		var t = new Button();
		this._vipBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 425;
		t.y = 43;
		t.skinName = HomeViewSkin$Skin75;
		return t;
	};
	_proto._mapGroup_i = function () {
		var t = new eui.Group();
		this._mapGroup = t;
		t.height = 186;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 227;
		t.y = 0;
		t.elementsContent = [this._Image6_i(),this._mapBg_i(),this._mapIcon_i(),this._mapName_i(),this._mapValue1_i(),this._mapValue2_i(),this._Image7_i(),this._Image8_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 186;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "main_mapKuang_png";
		t.width = 227;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._mapBg_i = function () {
		var t = new eui.Group();
		this._mapBg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 105;
		t.width = 45;
		t.x = 180;
		t.y = 33;
		return t;
	};
	_proto._mapIcon_i = function () {
		var t = new eui.Image();
		this._mapIcon = t;
		t.source = "main_map_img_home_png";
		t.x = 189;
		t.y = 57;
		return t;
	};
	_proto._mapName_i = function () {
		var t = new Label();
		this._mapName = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "大峡谷";
		t.textAlign = "center";
		t.width = 150;
		t.x = 31;
		t.y = 10;
		return t;
	};
	_proto._mapValue1_i = function () {
		var t = new Label();
		this._mapValue1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 20;
		t.text = "123456/小时";
		t.x = 60;
		t.y = 44;
		return t;
	};
	_proto._mapValue2_i = function () {
		var t = new Label();
		this._mapValue2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 20;
		t.text = "123456/小时";
		t.x = 60;
		t.y = 74;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.height = 38;
		t.source = "main_mapIcon2_png";
		t.width = 38;
		t.x = 24;
		t.y = 36;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.height = 40;
		t.source = "main_mapIcon1_png";
		t.width = 40;
		t.x = 23;
		t.y = 65;
		return t;
	};
	_proto._mainLayer_i = function () {
		var t = new eui.Group();
		this._mainLayer = t;
		t.height = 1280;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this._bottomGroup_i()];
		return t;
	};
	_proto._bottomGroup_i = function () {
		var t = new eui.Group();
		this._bottomGroup = t;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 258;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 720;
		t.x = 0;
		t.y = 1022;
		t.elementsContent = [this._Image9_i(),this._reinBtn_i(),this._reinIcon_i(),this._Image10_i(),this._expView_i(),this._Group1_i(),this._chatView_i(),this._growupView_i(),this._funGroup_i(),this._roleIcon_i(),this._skillIcon_i(),this._equipIcon_i(),this._bagIcon_i(),this._ronglian_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 159;
		t.horizontalCenter = 1;
		t.scale9Grid = new egret.Rectangle(149,0,88,159);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "main_bottom_png";
		t.width = 720;
		t.x = 0;
		t.y = 93;
		return t;
	};
	_proto._reinBtn_i = function () {
		var t = new eui.Image();
		this._reinBtn = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "main_xing_png";
		t.x = 22;
		t.y = 203;
		return t;
	};
	_proto._reinIcon_i = function () {
		var t = new eui.Image();
		this._reinIcon = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_red_icon_png";
		t.touchEnabled = false;
		t.visible = false;
		t.x = 104.5;
		t.y = 107;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "main_club_png";
		t.x = 612;
		t.y = 203;
		return t;
	};
	_proto._expView_i = function () {
		var t = new eui.Group();
		this._expView = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 14;
		t.horizontalCenter = 2;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 455;
		t.x = 122;
		t.y = 244;
		t.elementsContent = [this._expImg_i(),this._Image11_i(),this._Image12_i(),this._Image13_i(),this._expValue_i()];
		return t;
	};
	_proto._expImg_i = function () {
		var t = new eui.Image();
		this._expImg = t;
		t.height = 14;
		t.scale9Grid = new egret.Rectangle(15,0,448,14);
		t.source = "main_exp_png";
		t.width = 455;
		t.x = 0;
		t.y = -6;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.height = 19;
		t.source = "main_exp_fenge_png";
		t.width = 5;
		t.x = 91;
		t.y = -8;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.height = 19;
		t.source = "main_exp_fenge_png";
		t.width = 5;
		t.x = 227;
		t.y = -8;
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.height = 19;
		t.source = "main_exp_fenge_png";
		t.width = 5;
		t.x = 363;
		t.y = -8;
		return t;
	};
	_proto._expValue_i = function () {
		var t = new eui.Label();
		this._expValue = t;
		t.bottom = 3;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.text = "999999/999999";
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 72;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 690;
		t.x = 15;
		t.y = 35;
		t.elementsContent = [this._mailBtn_i(),this._mailTipsIcon_i(),this._friendsBtn_i(),this._friendsTipsIcon_i()];
		return t;
	};
	_proto._mailBtn_i = function () {
		var t = new Button();
		this._mailBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = -2;
		t.y = 1;
		t.skinName = HomeViewSkin$Skin76;
		return t;
	};
	_proto._mailTipsIcon_i = function () {
		var t = new eui.Image();
		this._mailTipsIcon = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_red_icon_png";
		t.touchEnabled = false;
		t.visible = false;
		t.x = 38;
		t.y = 8;
		return t;
	};
	_proto._friendsBtn_i = function () {
		var t = new Button();
		this._friendsBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 621;
		t.y = 1;
		t.skinName = HomeViewSkin$Skin77;
		return t;
	};
	_proto._friendsTipsIcon_i = function () {
		var t = new eui.Image();
		this._friendsTipsIcon = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_red_icon_png";
		t.touchEnabled = false;
		t.visible = false;
		t.x = 661;
		t.y = 8;
		return t;
	};
	_proto._chatView_i = function () {
		var t = new eui.Group();
		this._chatView = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 59;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 548;
		t.x = 86;
		t.y = 41;
		t.elementsContent = [this._Image14_i(),this._chatTxt_i()];
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.height = 59;
		t.scale9Grid = new egret.Rectangle(7,7,45,45);
		t.source = "main_chatBg_png";
		t.width = 548;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._chatTxt_i = function () {
		var t = new ChatContentItem();
		this._chatTxt = t;
		t.height = 55;
		t.width = 540;
		t.x = 4;
		t.y = 2;
		return t;
	};
	_proto._growupView_i = function () {
		var t = new eui.Group();
		this._growupView = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 115;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 548;
		t.x = 86;
		t.y = 0;
		t.elementsContent = [this._Image15_i(),this._Button1_i(),this._giftBtn_i(),this._fazuoBtn_i(),this._faqiBtn_i(),this._zhanhunBtn_i()];
		return t;
	};
	_proto._Image15_i = function () {
		var t = new eui.Image();
		t.height = 59;
		t.scale9Grid = new egret.Rectangle(7,7,45,45);
		t.source = "main_chatBg_png";
		t.width = 548;
		t.x = 0;
		t.y = 41;
		return t;
	};
	_proto._Button1_i = function () {
		var t = new Button();
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 39;
		t.y = 15;
		t.skinName = HomeViewSkin$Skin78;
		return t;
	};
	_proto._giftBtn_i = function () {
		var t = new Button();
		this._giftBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 138;
		t.y = 15;
		t.skinName = HomeViewSkin$Skin79;
		return t;
	};
	_proto._fazuoBtn_i = function () {
		var t = new Button();
		this._fazuoBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 235;
		t.y = 16;
		t.skinName = HomeViewSkin$Skin80;
		return t;
	};
	_proto._faqiBtn_i = function () {
		var t = new Button();
		this._faqiBtn = t;
		t.label = "";
		t.x = 328;
		t.y = 19;
		t.skinName = HomeViewSkin$Skin81;
		return t;
	};
	_proto._zhanhunBtn_i = function () {
		var t = new Button();
		this._zhanhunBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 428;
		t.y = 15;
		t.skinName = HomeViewSkin$Skin82;
		return t;
	};
	_proto._funGroup_i = function () {
		var t = new eui.Group();
		this._funGroup = t;
		t.anchorOffsetX = 0;
		t.height = 116;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 435;
		t.x = 143;
		t.y = 122;
		t.elementsContent = [this._roleBtn_i(),this._skillBtn_i(),this._equipBtn_i(),this._bagBtn_i()];
		return t;
	};
	_proto._roleBtn_i = function () {
		var t = new Button();
		this._roleBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 0;
		t.y = 0;
		t.skinName = HomeViewSkin$Skin83;
		return t;
	};
	_proto._skillBtn_i = function () {
		var t = new Button();
		this._skillBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 110;
		t.y = 14;
		t.skinName = HomeViewSkin$Skin84;
		return t;
	};
	_proto._equipBtn_i = function () {
		var t = new Button();
		this._equipBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 223;
		t.y = 5;
		t.skinName = HomeViewSkin$Skin85;
		return t;
	};
	_proto._bagBtn_i = function () {
		var t = new Button();
		this._bagBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 335;
		t.y = 6;
		t.skinName = HomeViewSkin$Skin86;
		return t;
	};
	_proto._roleIcon_i = function () {
		var t = new eui.Image();
		this._roleIcon = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_red_icon_png";
		t.touchEnabled = false;
		t.visible = false;
		t.x = 213;
		t.y = 143;
		return t;
	};
	_proto._skillIcon_i = function () {
		var t = new eui.Image();
		this._skillIcon = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_red_icon_png";
		t.touchEnabled = false;
		t.visible = false;
		t.x = 323;
		t.y = 143;
		return t;
	};
	_proto._equipIcon_i = function () {
		var t = new eui.Image();
		this._equipIcon = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_red_icon_png";
		t.touchEnabled = false;
		t.visible = false;
		t.x = 433;
		t.y = 143;
		return t;
	};
	_proto._bagIcon_i = function () {
		var t = new eui.Image();
		this._bagIcon = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_red_icon_png";
		t.touchEnabled = false;
		t.visible = false;
		t.x = 543;
		t.y = 143;
		return t;
	};
	_proto._ronglian_i = function () {
		var t = new eui.Group();
		this._ronglian = t;
		t.anchorOffsetY = 0;
		t.height = 105;
		t.scaleX = 1;
		t.scaleY = 1;
		t.visible = false;
		t.width = 182;
		t.x = 436;
		t.y = 33;
		t.elementsContent = [this._Image16_i(),this._ronglianBtn_i(),this._ronglianImg_i(),this._Image17_i()];
		return t;
	};
	_proto._Image16_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 83;
		t.scale9Grid = new egret.Rectangle(6,6,38,38);
		t.source = "common_rect_1_png";
		t.width = 182;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._ronglianBtn_i = function () {
		var t = new eui.Button();
		this._ronglianBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 70;
		t.label = "";
		t.width = 153;
		t.x = 15;
		t.y = 8;
		t.skinName = HomeViewSkin$Skin87;
		return t;
	};
	_proto._ronglianImg_i = function () {
		var t = new eui.Image();
		this._ronglianImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40.22;
		t.rotation = 360;
		t.source = "main_onkeyRonglian_png";
		t.width = 140;
		t.x = 21;
		t.y = 22;
		return t;
	};
	_proto._Image17_i = function () {
		var t = new eui.Image();
		t.height = 33;
		t.source = "ronglian_jiantou_png";
		t.width = 112;
		t.x = 40;
		t.y = 72;
		return t;
	};
	_proto._taskView_i = function () {
		var t = new TaskView();
		this._taskView = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 174;
		t.skinName = "TaskViewSkin";
		t.width = 294;
		t.x = 0;
		t.y = 825;
		return t;
	};
	_proto._rightIconGroup_i = function () {
		var t = new eui.Group();
		this._rightIconGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 472;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 117;
		t.x = 603;
		t.y = 420;
		return t;
	};
	_proto._effectLayer1_i = function () {
		var t = new eui.Group();
		this._effectLayer1 = t;
		t.height = 134;
		t.left = 0;
		t.width = 465;
		t.y = 0;
		return t;
	};
	_proto._effectLayer2_i = function () {
		var t = new eui.Group();
		this._effectLayer2 = t;
		t.height = 1280;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_minBtn","_maxBtn","_topBtnGroup","_btnExit","_sysNoticeItem","_leftLayer","_coin","_gold","_vip","_headImg","_sysChargeBtn","_sound","_nickName","_vipBtn","_topGroup","_mapBg","_mapIcon","_mapName","_mapValue1","_mapValue2","_mapGroup","_reinBtn","_reinIcon","_expImg","_expValue","_expView","_mailBtn","_mailTipsIcon","_friendsBtn","_friendsTipsIcon","_chatTxt","_chatView","_giftBtn","_fazuoBtn","_faqiBtn","_zhanhunBtn","_growupView","_roleBtn","_skillBtn","_equipBtn","_bagBtn","_funGroup","_roleIcon","_skillIcon","_equipIcon","_bagIcon","_ronglianBtn","_ronglianImg","_ronglian","_bottomGroup","_mainLayer","_taskView","_rightIconGroup","_effectLayer1","_effectLayer2"];
		},
		enumerable: true,
		configurable: true
	});
	return HomeViewSkin;
})(eui.Skin);var ListItemSkin=(function (_super) {
	__extends(ListItemSkin, _super);
	function ListItemSkin() {
		_super.call(this);
		
		this.height = 100;
		this.width = 400;
		this.elementsContent = [this.testTxt_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.text1"],[0],this.testTxt,"text")
	}
	var _proto = ListItemSkin.prototype;

	_proto.testTxt_i = function () {
		var t = new eui.Label();
		this.testTxt = t;
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["testTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return ListItemSkin;
})(eui.Skin);var MainIconButtonSkin=(function (_super) {
	__extends(MainIconButtonSkin, _super);
	function MainIconButtonSkin() {
		_super.call(this);
		
		this.height = 125;
		this.width = 123;
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.btnBgImg"],[0],this._Image1,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.data.btnImg"],[0],this._Image2,"source")
	}
	var _proto = MainIconButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return [];
		},
		enumerable: true,
		configurable: true
	});
	return MainIconButtonSkin;
})(eui.Skin);var ItemUseResultWinSkin=(function (_super) {
	__extends(ItemUseResultWinSkin, _super);
	var ItemUseResultWinSkin$Skin88 = 	(function (_super) {
		__extends(ItemUseResultWinSkin$Skin88, _super);
		function ItemUseResultWinSkin$Skin88() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ItemUseResultWinSkin$Skin88.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "lifeGrid_jxsy_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return ItemUseResultWinSkin$Skin88;
	})(eui.Skin);

	function ItemUseResultWinSkin() {
		_super.call(this);
		
		this.height = 631;
		this.width = 715;
		this.elementsContent = [this._back_i(),this._group_i()];
	}
	var _proto = ItemUseResultWinSkin.prototype;

	_proto._back_i = function () {
		var t = new ResultWinBack();
		this._back = t;
		t.skinName = "ResultWinBackSkin";
		t.x = 0;
		t.y = -2;
		return t;
	};
	_proto._group_i = function () {
		var t = new eui.Group();
		this._group = t;
		t.x = 237;
		t.y = 509;
		t.elementsContent = [this._hontTenBtn_i(),this._lossTxt0_i()];
		return t;
	};
	_proto._hontTenBtn_i = function () {
		var t = new Button();
		this._hontTenBtn = t;
		t.label = "Button";
		t.x = 0;
		t.y = 27;
		t.skinName = ItemUseResultWinSkin$Skin88;
		return t;
	};
	_proto._lossTxt0_i = function () {
		var t = new Label();
		this._lossTxt0 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "Label";
		t.textAlign = "center";
		t.width = 230;
		t.x = 4;
		t.y = 11;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_hontTenBtn","_lossTxt0","_group"];
		},
		enumerable: true,
		configurable: true
	});
	return ItemUseResultWinSkin;
})(eui.Skin);var JingmaiRen1Skin=(function (_super) {
	__extends(JingmaiRen1Skin, _super);
	function JingmaiRen1Skin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._ling7_i(),this._star7_i(),this._star0_i(),this._ling1_i(),this._star1_i(),this._ling2_i(),this._star2_i(),this._ling3_i(),this._star3_i(),this._ling4_i(),this._star4_i(),this._ling5_i(),this._star5_i(),this._ling6_i(),this._star6_i()];
	}
	var _proto = JingmaiRen1Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "jingmai_ren1_png";
		t.x = 85;
		t.y = 110;
		return t;
	};
	_proto._ling7_i = function () {
		var t = new eui.Image();
		this._ling7 = t;
		t.rotation = 36.42;
		t.source = "jingmai_xian_png";
		t.x = 436.27;
		t.y = 547.68;
		return t;
	};
	_proto._star7_i = function () {
		var t = new eui.Image();
		this._star7 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 438;
		t.y = 577;
		return t;
	};
	_proto._star0_i = function () {
		var t = new eui.Image();
		this._star0 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 328.5;
		t.y = 161;
		return t;
	};
	_proto._ling1_i = function () {
		var t = new eui.Image();
		this._ling1 = t;
		t.rotation = 85.69;
		t.source = "jingmai_xian_png";
		t.x = 358.64;
		t.y = 208;
		return t;
	};
	_proto._star1_i = function () {
		var t = new eui.Image();
		this._star1 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 293.3;
		t.y = 244;
		return t;
	};
	_proto._ling2_i = function () {
		var t = new eui.Image();
		this._ling2 = t;
		t.rotation = 1.88;
		t.source = "jingmai_xian_png";
		t.x = 340.48;
		t.y = 286.67;
		return t;
	};
	_proto._star2_i = function () {
		var t = new eui.Image();
		this._star2 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 364;
		t.y = 280;
		return t;
	};
	_proto._ling3_i = function () {
		var t = new eui.Image();
		this._ling3 = t;
		t.rotation = 114.1;
		t.source = "jingmai_xian_png";
		t.x = 387.61;
		t.y = 327.68;
		return t;
	};
	_proto._star3_i = function () {
		var t = new eui.Image();
		this._star3 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 284;
		t.y = 344;
		return t;
	};
	_proto._ling4_i = function () {
		var t = new eui.Image();
		this._ling4 = t;
		t.rotation = 112.98;
		t.source = "jingmai_xian_png";
		t.x = 305.94;
		t.y = 391.68;
		return t;
	};
	_proto._star4_i = function () {
		var t = new eui.Image();
		this._star4 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 223;
		t.y = 400;
		return t;
	};
	_proto._ling5_i = function () {
		var t = new eui.Image();
		this._ling5 = t;
		t.rotation = 338.17;
		t.source = "jingmai_xian_png";
		t.x = 274.27;
		t.y = 440.35;
		return t;
	};
	_proto._star5_i = function () {
		var t = new eui.Image();
		this._star5 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 317;
		t.y = 414;
		return t;
	};
	_proto._ling6_i = function () {
		var t = new eui.Image();
		this._ling6 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 36.86;
		t.rotation = 202.91;
		t.source = "jingmai_xian_png";
		t.width = 60.74;
		t.x = 408.6;
		t.y = 519.68;
		return t;
	};
	_proto._star6_i = function () {
		var t = new eui.Image();
		this._star6 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 393;
		t.y = 498;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_ling7","_star7","_star0","_ling1","_star1","_ling2","_star2","_ling3","_star3","_ling4","_star4","_ling5","_star5","_ling6","_star6"];
		},
		enumerable: true,
		configurable: true
	});
	return JingmaiRen1Skin;
})(eui.Skin);var JingmaiRen2Skin=(function (_super) {
	__extends(JingmaiRen2Skin, _super);
	function JingmaiRen2Skin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._ling7_i(),this._star7_i(),this._star0_i(),this._ling1_i(),this._star1_i(),this._ling2_i(),this._star2_i(),this._ling3_i(),this._star3_i(),this._ling4_i(),this._star4_i(),this._ling5_i(),this._star5_i(),this._ling6_i(),this._star6_i()];
	}
	var _proto = JingmaiRen2Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "jingmai_ren2_png";
		t.x = 86;
		t.y = 110;
		return t;
	};
	_proto._ling7_i = function () {
		var t = new eui.Image();
		this._ling7 = t;
		t.rotation = 118.86;
		t.source = "jingmai_xian_png";
		t.x = 463.6;
		t.y = 534.01;
		return t;
	};
	_proto._star7_i = function () {
		var t = new eui.Image();
		this._star7 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 373;
		t.y = 534;
		return t;
	};
	_proto._star0_i = function () {
		var t = new eui.Image();
		this._star0 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 327.5;
		t.y = 161;
		return t;
	};
	_proto._ling1_i = function () {
		var t = new eui.Image();
		this._ling1 = t;
		t.rotation = 44.25;
		t.source = "jingmai_xian_png";
		t.x = 365.6399999999999;
		t.y = 211;
		return t;
	};
	_proto._star1_i = function () {
		var t = new eui.Image();
		this._star1 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 357.29999999999995;
		t.y = 239;
		return t;
	};
	_proto._ling2_i = function () {
		var t = new eui.Image();
		this._ling2 = t;
		t.rotation = 115.9;
		t.source = "jingmai_xian_png";
		t.x = 378.5;
		t.y = 284.8;
		return t;
	};
	_proto._star2_i = function () {
		var t = new eui.Image();
		this._star2 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 278;
		t.y = 297;
		return t;
	};
	_proto._ling3_i = function () {
		var t = new eui.Image();
		this._ling3 = t;
		t.rotation = 346.56;
		t.source = "jingmai_xian_png";
		t.x = 327.27;
		t.y = 338.02;
		return t;
	};
	_proto._star3_i = function () {
		var t = new eui.Image();
		this._star3 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 366;
		t.y = 320;
		return t;
	};
	_proto._ling4_i = function () {
		var t = new eui.Image();
		this._ling4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 46.68;
		t.rotation = 101.6;
		t.source = "jingmai_xian_png";
		t.width = 78.56;
		t.x = 389.4200000000001;
		t.y = 366.26;
		return t;
	};
	_proto._star4_i = function () {
		var t = new eui.Image();
		this._star4 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 287;
		t.y = 413;
		return t;
	};
	_proto._ling5_i = function () {
		var t = new eui.Image();
		this._ling5 = t;
		t.anchorOffsetX = 0;
		t.rotation = 340.76;
		t.source = "jingmai_xian_png";
		t.width = 86.74;
		t.x = 337.27;
		t.y = 447.34000000000003;
		return t;
	};
	_proto._star5_i = function () {
		var t = new eui.Image();
		this._star5 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 416;
		t.y = 413;
		return t;
	};
	_proto._ling6_i = function () {
		var t = new eui.Image();
		this._ling6 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 35.05;
		t.rotation = 220.59;
		t.source = "jingmai_xian_png";
		t.width = 46.57;
		t.x = 470.28;
		t.y = 519.67;
		return t;
	};
	_proto._star6_i = function () {
		var t = new eui.Image();
		this._star6 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 437;
		t.y = 480;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_ling7","_star7","_star0","_ling1","_star1","_ling2","_star2","_ling3","_star3","_ling4","_star4","_ling5","_star5","_ling6","_star6"];
		},
		enumerable: true,
		configurable: true
	});
	return JingmaiRen2Skin;
})(eui.Skin);var JingmaiRen3Skin=(function (_super) {
	__extends(JingmaiRen3Skin, _super);
	function JingmaiRen3Skin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._ling7_i(),this._star7_i(),this._star0_i(),this._ling1_i(),this._star1_i(),this._ling2_i(),this._star2_i(),this._ling3_i(),this._star3_i(),this._ling4_i(),this._star4_i(),this._ling5_i(),this._star5_i(),this._ling6_i(),this._star6_i()];
	}
	var _proto = JingmaiRen3Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "jingmai_ren3_png";
		t.x = 128;
		t.y = 110;
		return t;
	};
	_proto._ling7_i = function () {
		var t = new eui.Image();
		this._ling7 = t;
		t.anchorOffsetX = 0;
		t.rotation = 35.85;
		t.source = "jingmai_xian_png";
		t.width = 79.97;
		t.x = 424.9100000000001;
		t.y = 507;
		return t;
	};
	_proto._star7_i = function () {
		var t = new eui.Image();
		this._star7 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 444;
		t.y = 560;
		return t;
	};
	_proto._star0_i = function () {
		var t = new eui.Image();
		this._star0 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 314.5;
		t.y = 176;
		return t;
	};
	_proto._ling1_i = function () {
		var t = new eui.Image();
		this._ling1 = t;
		t.rotation = 85.4;
		t.source = "jingmai_xian_png";
		t.x = 346.3;
		t.y = 228;
		return t;
	};
	_proto._star1_i = function () {
		var t = new eui.Image();
		this._star1 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 285.3;
		t.y = 256;
		return t;
	};
	_proto._ling2_i = function () {
		var t = new eui.Image();
		this._ling2 = t;
		t.rotation = 40.86;
		t.source = "jingmai_xian_png";
		t.x = 323.59;
		t.y = 306.29;
		return t;
	};
	_proto._star2_i = function () {
		var t = new eui.Image();
		this._star2 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 315;
		t.y = 335;
		return t;
	};
	_proto._ling3_i = function () {
		var t = new eui.Image();
		this._ling3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 36.3;
		t.rotation = 346.56;
		t.source = "jingmai_xian_png";
		t.width = 78.68;
		t.x = 363.27;
		t.y = 368.68;
		return t;
	};
	_proto._star3_i = function () {
		var t = new eui.Image();
		this._star3 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 435;
		t.y = 347;
		return t;
	};
	_proto._ling4_i = function () {
		var t = new eui.Image();
		this._ling4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 49.3;
		t.rotation = 132.14;
		t.source = "jingmai_xian_png";
		t.width = 132.53;
		t.x = 454.31999999999994;
		t.y = 398.77;
		return t;
	};
	_proto._star4_i = function () {
		var t = new eui.Image();
		this._star4 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 285;
		t.y = 439;
		return t;
	};
	_proto._ling5_i = function () {
		var t = new eui.Image();
		this._ling5 = t;
		t.anchorOffsetX = 0;
		t.rotation = 65.48;
		t.source = "jingmai_xian_png";
		t.width = 58.12;
		t.x = 316.51;
		t.y = 492.91999999999996;
		return t;
	};
	_proto._star5_i = function () {
		var t = new eui.Image();
		this._star5 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 280.32;
		t.y = 524.02;
		return t;
	};
	_proto._ling6_i = function () {
		var t = new eui.Image();
		this._ling6 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 36.86;
		t.rotation = 125.22;
		t.source = "jingmai_xian_png";
		t.width = 82.38;
		t.x = 403.53;
		t.y = 505.6700000000001;
		return t;
	};
	_proto._star6_i = function () {
		var t = new eui.Image();
		this._star6 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 382.70000000000005;
		t.y = 455.99;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_ling7","_star7","_star0","_ling1","_star1","_ling2","_star2","_ling3","_star3","_ling4","_star4","_ling5","_star5","_ling6","_star6"];
		},
		enumerable: true,
		configurable: true
	});
	return JingmaiRen3Skin;
})(eui.Skin);var JingmaiRen4Skin=(function (_super) {
	__extends(JingmaiRen4Skin, _super);
	function JingmaiRen4Skin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._ling7_i(),this._star7_i(),this._star0_i(),this._ling1_i(),this._star1_i(),this._ling2_i(),this._star2_i(),this._ling3_i(),this._star3_i(),this._ling4_i(),this._star4_i(),this._ling5_i(),this._star5_i(),this._ling6_i(),this._star6_i()];
	}
	var _proto = JingmaiRen4Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "jingmai_ren4_png";
		t.x = 145.05;
		t.y = 110;
		return t;
	};
	_proto._ling7_i = function () {
		var t = new eui.Image();
		this._ling7 = t;
		t.anchorOffsetX = 0;
		t.rotation = 3.12;
		t.source = "jingmai_xian_png";
		t.width = 79.97;
		t.x = 408.78;
		t.y = 562.01;
		return t;
	};
	_proto._star7_i = function () {
		var t = new eui.Image();
		this._star7 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 456.28;
		t.y = 560;
		return t;
	};
	_proto._star0_i = function () {
		var t = new eui.Image();
		this._star0 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 365.78;
		t.y = 165;
		return t;
	};
	_proto._ling1_i = function () {
		var t = new eui.Image();
		this._ling1 = t;
		t.rotation = 75.53;
		t.source = "jingmai_xian_png";
		t.x = 393.57000000000005;
		t.y = 218;
		return t;
	};
	_proto._star1_i = function () {
		var t = new eui.Image();
		this._star1 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 346.58000000000004;
		t.y = 241;
		return t;
	};
	_proto._ling2_i = function () {
		var t = new eui.Image();
		this._ling2 = t;
		t.anchorOffsetX = 0;
		t.rotation = 137.17;
		t.source = "jingmai_xian_png";
		t.width = 96.07;
		t.x = 361.75;
		t.y = 283.44;
		return t;
	};
	_proto._star2_i = function () {
		var t = new eui.Image();
		this._star2 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 229.28000000000003;
		t.y = 294;
		return t;
	};
	_proto._ling3_i = function () {
		var t = new eui.Image();
		this._ling3 = t;
		t.anchorOffsetX = 0;
		t.rotation = 13.95;
		t.source = "jingmai_xian_png";
		t.width = 78.99;
		t.x = 273.32000000000005;
		t.y = 339.55;
		return t;
	};
	_proto._star3_i = function () {
		var t = new eui.Image();
		this._star3 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 324.28000000000003;
		t.y = 366;
		return t;
	};
	_proto._ling4_i = function () {
		var t = new eui.Image();
		this._ling4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40.8;
		t.rotation = 26.12;
		t.source = "jingmai_xian_png";
		t.width = 35.73;
		t.x = 366.46000000000004;
		t.y = 420.22;
		return t;
	};
	_proto._star4_i = function () {
		var t = new eui.Image();
		this._star4 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 349.28;
		t.y = 438;
		return t;
	};
	_proto._ling5_i = function () {
		var t = new eui.Image();
		this._ling5 = t;
		t.anchorOffsetX = 0;
		t.rotation = 314.46;
		t.source = "jingmai_xian_png";
		t.width = 58.12;
		t.x = 301.49;
		t.y = 499.84000000000003;
		return t;
	};
	_proto._star5_i = function () {
		var t = new eui.Image();
		this._star5 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 256.28000000000003;
		t.y = 469;
		return t;
	};
	_proto._ling6_i = function () {
		var t = new eui.Image();
		this._ling6 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32.68;
		t.rotation = 184.21;
		t.source = "jingmai_xian_png";
		t.width = 72.33;
		t.x = 371.54999999999995;
		t.y = 549.75;
		return t;
	};
	_proto._star6_i = function () {
		var t = new eui.Image();
		this._star6 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 358.28;
		t.y = 520;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_ling7","_star7","_star0","_ling1","_star1","_ling2","_star2","_ling3","_star3","_ling4","_star4","_ling5","_star5","_ling6","_star6"];
		},
		enumerable: true,
		configurable: true
	});
	return JingmaiRen4Skin;
})(eui.Skin);var JingmaiRen5Skin=(function (_super) {
	__extends(JingmaiRen5Skin, _super);
	function JingmaiRen5Skin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._ling7_i(),this._star7_i(),this._star0_i(),this._ling1_i(),this._star1_i(),this._ling2_i(),this._star2_i(),this._ling3_i(),this._star3_i(),this._ling4_i(),this._star4_i(),this._ling5_i(),this._star5_i(),this._ling6_i(),this._star6_i()];
	}
	var _proto = JingmaiRen5Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "jingmai_ren5_png";
		t.x = -0.060000000000002274;
		t.y = 110;
		return t;
	};
	_proto._ling7_i = function () {
		var t = new eui.Image();
		this._ling7 = t;
		t.anchorOffsetX = 0;
		t.rotation = 14.5;
		t.source = "jingmai_xian_png";
		t.width = 127.37;
		t.x = 326.5;
		t.y = 549.66;
		return t;
	};
	_proto._star7_i = function () {
		var t = new eui.Image();
		this._star7 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 426;
		t.y = 584;
		return t;
	};
	_proto._star0_i = function () {
		var t = new eui.Image();
		this._star0 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 325.5;
		t.y = 153;
		return t;
	};
	_proto._ling1_i = function () {
		var t = new eui.Image();
		this._ling1 = t;
		t.rotation = 85.36;
		t.source = "jingmai_xian_png";
		t.x = 350.96000000000004;
		t.y = 204.91;
		return t;
	};
	_proto._star1_i = function () {
		var t = new eui.Image();
		this._star1 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 286.3;
		t.y = 240;
		return t;
	};
	_proto._ling2_i = function () {
		var t = new eui.Image();
		this._ling2 = t;
		t.anchorOffsetX = 0;
		t.rotation = 173;
		t.source = "jingmai_xian_png";
		t.width = 96.07;
		t.x = 428.70000000000005;
		t.y = 301.36;
		return t;
	};
	_proto._star2_i = function () {
		var t = new eui.Image();
		this._star2 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 414;
		t.y = 269;
		return t;
	};
	_proto._ling3_i = function () {
		var t = new eui.Image();
		this._ling3 = t;
		t.anchorOffsetX = 0;
		t.rotation = 141.94;
		t.source = "jingmai_xian_png";
		t.width = 175.34;
		t.x = 431;
		t.y = 313.01;
		return t;
	};
	_proto._star3_i = function () {
		var t = new eui.Image();
		this._star3 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 235;
		t.y = 361;
		return t;
	};
	_proto._ling4_i = function () {
		var t = new eui.Image();
		this._ling4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40.8;
		t.rotation = 337.15;
		t.source = "jingmai_xian_png";
		t.width = 35.73;
		t.x = 285.5;
		t.y = 403.24;
		return t;
	};
	_proto._star4_i = function () {
		var t = new eui.Image();
		this._star4 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 319;
		t.y = 396;
		return t;
	};
	_proto._ling5_i = function () {
		var t = new eui.Image();
		this._ling5 = t;
		t.anchorOffsetX = 0;
		t.rotation = 197.53;
		t.source = "jingmai_xian_png";
		t.width = 58.12;
		t.x = 408.53999999999996;
		t.y = 493.86;
		return t;
	};
	_proto._star5_i = function () {
		var t = new eui.Image();
		this._star5 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 388;
		t.y = 467;
		return t;
	};
	_proto._ling6_i = function () {
		var t = new eui.Image();
		this._ling6 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32.68;
		t.rotation = 138.53;
		t.source = "jingmai_xian_png";
		t.width = 72.33;
		t.x = 403.29999999999995;
		t.y = 511;
		return t;
	};
	_proto._star6_i = function () {
		var t = new eui.Image();
		this._star6 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 276;
		t.y = 507;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_ling7","_star7","_star0","_ling1","_star1","_ling2","_star2","_ling3","_star3","_ling4","_star4","_ling5","_star5","_ling6","_star6"];
		},
		enumerable: true,
		configurable: true
	});
	return JingmaiRen5Skin;
})(eui.Skin);var JingmaiRen6Skin=(function (_super) {
	__extends(JingmaiRen6Skin, _super);
	function JingmaiRen6Skin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._ling7_i(),this._star7_i(),this._star0_i(),this._ling1_i(),this._star1_i(),this._ling2_i(),this._star2_i(),this._ling3_i(),this._star3_i(),this._ling4_i(),this._star4_i(),this._ling5_i(),this._star5_i(),this._ling6_i(),this._star6_i()];
	}
	var _proto = JingmaiRen6Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "jingmai_ren6_png";
		t.x = 152;
		t.y = 110;
		return t;
	};
	_proto._ling7_i = function () {
		var t = new eui.Image();
		this._ling7 = t;
		t.anchorOffsetX = 0;
		t.rotation = 110.69;
		t.source = "jingmai_xian_png";
		t.width = 83.86;
		t.x = 435.1700000000001;
		t.y = 514;
		return t;
	};
	_proto._star7_i = function () {
		var t = new eui.Image();
		this._star7 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 414;
		t.y = 467;
		return t;
	};
	_proto._star0_i = function () {
		var t = new eui.Image();
		this._star0 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 343.5;
		t.y = 149;
		return t;
	};
	_proto._ling1_i = function () {
		var t = new eui.Image();
		this._ling1 = t;
		t.anchorOffsetX = 0;
		t.rotation = 41.05;
		t.source = "jingmai_xian_png";
		t.width = 51.36;
		t.x = 382.64;
		t.y = 202.91;
		return t;
	};
	_proto._star1_i = function () {
		var t = new eui.Image();
		this._star1 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 371;
		t.y = 235.49;
		return t;
	};
	_proto._ling2_i = function () {
		var t = new eui.Image();
		this._ling2 = t;
		t.anchorOffsetX = 0;
		t.rotation = 161.52;
		t.source = "jingmai_xian_png";
		t.width = 69.71;
		t.x = 385.70000000000005;
		t.y = 279.04;
		return t;
	};
	_proto._star2_i = function () {
		var t = new eui.Image();
		this._star2 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 258.99;
		t.y = 233.05;
		return t;
	};
	_proto._ling3_i = function () {
		var t = new eui.Image();
		this._ling3 = t;
		t.anchorOffsetX = 0;
		t.rotation = 16.04;
		t.source = "jingmai_xian_png";
		t.width = 45.07;
		t.x = 303.66;
		t.y = 281;
		return t;
	};
	_proto._star3_i = function () {
		var t = new eui.Image();
		this._star3 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 313;
		t.y = 301;
		return t;
	};
	_proto._ling4_i = function () {
		var t = new eui.Image();
		this._ling4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32.94;
		t.rotation = 27.23;
		t.source = "jingmai_xian_png";
		t.width = 31.58;
		t.x = 354.37;
		t.y = 352.16;
		return t;
	};
	_proto._star4_i = function () {
		var t = new eui.Image();
		this._star4 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 340;
		t.y = 375;
		return t;
	};
	_proto._ling5_i = function () {
		var t = new eui.Image();
		this._ling5 = t;
		t.anchorOffsetX = 0;
		t.rotation = 284.98;
		t.source = "jingmai_xian_png";
		t.width = 58.12;
		t.x = 321.21;
		t.y = 475.52;
		return t;
	};
	_proto._star5_i = function () {
		var t = new eui.Image();
		this._star5 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 278;
		t.y = 451;
		return t;
	};
	_proto._ling6_i = function () {
		var t = new eui.Image();
		this._ling6 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32.68;
		t.rotation = 37.39;
		t.source = "jingmai_xian_png";
		t.width = 72.33;
		t.x = 314.82;
		t.y = 509;
		return t;
	};
	_proto._star6_i = function () {
		var t = new eui.Image();
		this._star6 = t;
		t.source = "jingmai_zhu1_png";
		t.x = 333;
		t.y = 555;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_ling7","_star7","_star0","_ling1","_star1","_ling2","_star2","_ling3","_star3","_ling4","_star4","_ling5","_star5","_ling6","_star6"];
		},
		enumerable: true,
		configurable: true
	});
	return JingmaiRen6Skin;
})(eui.Skin);var JingmainViewSkin=(function (_super) {
	__extends(JingmainViewSkin, _super);
	var JingmainViewSkin$Skin89 = 	(function (_super) {
		__extends(JingmainViewSkin$Skin89, _super);
		function JingmainViewSkin$Skin89() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = JingmainViewSkin$Skin89.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "jingmai_dazuo_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return JingmainViewSkin$Skin89;
	})(eui.Skin);

	var JingmainViewSkin$Skin90 = 	(function (_super) {
		__extends(JingmainViewSkin$Skin90, _super);
		function JingmainViewSkin$Skin90() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = JingmainViewSkin$Skin90.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "jingmai_tupo_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return JingmainViewSkin$Skin90;
	})(eui.Skin);

	var JingmainViewSkin$Skin91 = 	(function (_super) {
		__extends(JingmainViewSkin$Skin91, _super);
		function JingmainViewSkin$Skin91() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = JingmainViewSkin$Skin91.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "jingmai_chongxue_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return JingmainViewSkin$Skin91;
	})(eui.Skin);

	function JingmainViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._chongtianBtn_i(),this._dazuohuiImg_i(),this._itemTxt_i(),this._tupoBtn_i(),this._chongxueBtn_i(),this._Group1_i(),this._Group2_i(),this._resistTxt_i(),this._chongtianImg_i(),this._Image6_i(),this._Image7_i(),this._redIcon_i(),this._res1_i()];
	}
	var _proto = JingmainViewSkin.prototype;

	_proto._chongtianBtn_i = function () {
		var t = new Button();
		this._chongtianBtn = t;
		t.label = "Button";
		t.width = 69;
		t.x = 623;
		t.y = 171;
		t.skinName = JingmainViewSkin$Skin89;
		return t;
	};
	_proto._dazuohuiImg_i = function () {
		var t = new eui.Image();
		this._dazuohuiImg = t;
		t.source = "jingmai_dazuo_hui_png";
		t.x = 623;
		t.y = 171;
		return t;
	};
	_proto._itemTxt_i = function () {
		var t = new Label();
		this._itemTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0.5;
		t.size = 22;
		t.text = "123";
		t.textAlign = "center";
		t.textColor = 0xfffade;
		t.width = 255;
		t.y = 1002;
		return t;
	};
	_proto._tupoBtn_i = function () {
		var t = new Button();
		this._tupoBtn = t;
		t.horizontalCenter = 0;
		t.label = "Button";
		t.y = 1029;
		t.skinName = JingmainViewSkin$Skin90;
		return t;
	};
	_proto._chongxueBtn_i = function () {
		var t = new Button();
		this._chongxueBtn = t;
		t.horizontalCenter = 0;
		t.label = "Button";
		t.y = 1029;
		t.skinName = JingmainViewSkin$Skin91;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 140;
		t.y = 860;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Label1_i(),this._attackTxt_i(),this._Label2_i(),this._hpTxt_i(),this._Label3_i(),this._armorTxt_i(),this._Label4_i(),this._defenseTxt_i(),this._arrorw1_i(),this._arrorw2_i(),this._arrorw3_i(),this._arrorw4_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "jingmai_heidi_png";
		t.x = 1;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "jingmai_heidi_png";
		t.x = 250;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "jingmai_heidi_png";
		t.x = 0;
		t.y = 56;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "jingmai_heidi_png";
		t.x = 250;
		t.y = 56;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.width = 62;
		t.x = 14;
		t.y = 9;
		return t;
	};
	_proto._attackTxt_i = function () {
		var t = new Label();
		this._attackTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "+123456";
		t.textColor = 0x7C6E62;
		t.width = 118;
		t.x = 71;
		t.y = 9;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new Label();
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "生命";
		t.textColor = 0x7C6E62;
		t.width = 65;
		t.x = 265;
		t.y = 9;
		return t;
	};
	_proto._hpTxt_i = function () {
		var t = new Label();
		this._hpTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 26;
		t.size = 24;
		t.text = "+123456";
		t.textColor = 0x7C6E62;
		t.width = 119;
		t.x = 320;
		t.y = 9;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new Label();
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "破甲";
		t.textColor = 0x7C6E62;
		t.width = 64;
		t.x = 14;
		t.y = 66;
		return t;
	};
	_proto._armorTxt_i = function () {
		var t = new Label();
		this._armorTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7C6E62;
		t.width = 118;
		t.x = 71;
		t.y = 66;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new Label();
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "防御";
		t.textColor = 0x7C6E62;
		t.width = 55;
		t.x = 265;
		t.y = 66;
		return t;
	};
	_proto._defenseTxt_i = function () {
		var t = new Label();
		this._defenseTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7C6E62;
		t.width = 118;
		t.x = 320;
		t.y = 66;
		return t;
	};
	_proto._arrorw1_i = function () {
		var t = new eui.Image();
		this._arrorw1 = t;
		t.source = "common_upgrade_png";
		t.x = 195;
		t.y = 4;
		return t;
	};
	_proto._arrorw2_i = function () {
		var t = new eui.Image();
		this._arrorw2 = t;
		t.source = "common_upgrade_png";
		t.x = 448;
		t.y = 4;
		return t;
	};
	_proto._arrorw3_i = function () {
		var t = new eui.Image();
		this._arrorw3 = t;
		t.source = "common_upgrade_png";
		t.x = 195;
		t.y = 59;
		return t;
	};
	_proto._arrorw4_i = function () {
		var t = new eui.Image();
		this._arrorw4 = t;
		t.source = "common_upgrade_png";
		t.x = 448;
		t.y = 59;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 15;
		t.y = 119;
		t.elementsContent = [this._Image5_i(),this._dumaiImg_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "common_name_back_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._dumaiImg_i = function () {
		var t = new eui.Image();
		this._dumaiImg = t;
		t.source = "jingmai_dumai_png";
		t.x = 20;
		t.y = 64;
		return t;
	};
	_proto._resistTxt_i = function () {
		var t = new Label();
		this._resistTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "攻击+";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.width = 121;
		t.x = 597;
		t.y = 251;
		return t;
	};
	_proto._chongtianImg_i = function () {
		var t = new eui.Image();
		this._chongtianImg = t;
		t.source = "jingmai_6chongtian_png";
		t.x = 624;
		t.y = 219;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "common_fighting_png";
		t.x = 140;
		t.y = 764;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "common_zhanli_png";
		t.x = 177;
		t.y = 769;
		return t;
	};
	_proto._redIcon_i = function () {
		var t = new eui.Image();
		this._redIcon = t;
		t.source = "common_red_icon_png";
		t.x = 435;
		t.y = 1037;
		return t;
	};
	_proto._res1_i = function () {
		var t = new PlayerResItems();
		this._res1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 43;
		t.skinName = "PlayerResItemsSkin";
		t.width = 165;
		t.x = 312;
		t.y = 986.5;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_chongtianBtn","_dazuohuiImg","_itemTxt","_tupoBtn","_chongxueBtn","_attackTxt","_hpTxt","_armorTxt","_defenseTxt","_arrorw1","_arrorw2","_arrorw3","_arrorw4","_dumaiImg","_resistTxt","_chongtianImg","_redIcon","_res1"];
		},
		enumerable: true,
		configurable: true
	});
	return JingmainViewSkin;
})(eui.Skin);var jingmaiCondViewSkin=(function (_super) {
	__extends(jingmaiCondViewSkin, _super);
	var jingmaiCondViewSkin$Skin92 = 	(function (_super) {
		__extends(jingmaiCondViewSkin$Skin92, _super);
		function jingmaiCondViewSkin$Skin92() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = jingmaiCondViewSkin$Skin92.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "common_fanhui_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return jingmaiCondViewSkin$Skin92;
	})(eui.Skin);

	function jingmaiCondViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Group2_i()];
	}
	var _proto = jingmaiCondViewSkin.prototype;

	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 1280;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this._basepopView_i(),this._backBtn_i(),this._Image1_i(),this._Image2_i(),this._Group1_i()];
		return t;
	};
	_proto._basepopView_i = function () {
		var t = new BasePopUpView();
		this._basepopView = t;
		t.percentHeight = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BasePopUpSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._backBtn_i = function () {
		var t = new Button();
		this._backBtn = t;
		t.horizontalCenter = 0;
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 241;
		t.y = 542.6;
		t.skinName = jingmaiCondViewSkin$Skin92;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 147;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_wordBg_normal_png";
		t.width = 640;
		t.x = 46;
		t.y = 381;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "jingmai_jieduan_png";
		t.x = 269;
		t.y = 315;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 105;
		t.y = 418;
		t.elementsContent = [this._arrowImg_i(),this._nameTxt1_i(),this._valueTxt1_i(),this._valueTxt2_i(),this._nameTxt2_i()];
		return t;
	};
	_proto._arrowImg_i = function () {
		var t = new eui.Image();
		this._arrowImg = t;
		t.rotation = 360;
		t.source = "common_strengthen_jiantou_png";
		t.x = 235;
		t.y = 4;
		return t;
	};
	_proto._nameTxt1_i = function () {
		var t = new Label();
		this._nameTxt1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 48;
		t.size = 32;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 282;
		t.x = -49;
		t.y = 0;
		return t;
	};
	_proto._valueTxt1_i = function () {
		var t = new Label();
		this._valueTxt1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 48;
		t.size = 32;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xad37c6;
		t.verticalAlign = "top";
		t.width = 247;
		t.x = -31;
		t.y = 48;
		return t;
	};
	_proto._valueTxt2_i = function () {
		var t = new Label();
		this._valueTxt2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 48;
		t.size = 32;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xAD37C6;
		t.verticalAlign = "top";
		t.width = 200;
		t.x = 329;
		t.y = 48;
		return t;
	};
	_proto._nameTxt2_i = function () {
		var t = new Label();
		this._nameTxt2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 48;
		t.size = 32;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 274;
		t.x = 297;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_basepopView","_backBtn","_arrowImg","_nameTxt1","_valueTxt1","_valueTxt2","_nameTxt2"];
		},
		enumerable: true,
		configurable: true
	});
	return jingmaiCondViewSkin;
})(eui.Skin);var LifeGridBuyItemSkin=(function (_super) {
	__extends(LifeGridBuyItemSkin, _super);
	var LifeGridBuyItemSkin$Skin93 = 	(function (_super) {
		__extends(LifeGridBuyItemSkin$Skin93, _super);
		function LifeGridBuyItemSkin$Skin93() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LifeGridBuyItemSkin$Skin93.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "common_dh_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridBuyItemSkin$Skin93;
	})(eui.Skin);

	function LifeGridBuyItemSkin() {
		_super.call(this);
		
		this.height = 129;
		this.width = 700;
		this.elementsContent = [this._Image1_i(),this._goods_i(),this._nameTxt_i(),this._attrTxt0_i(),this._numGroup_i(),this._copyTxt_i(),this._attrTxt1_i(),this._yiyouImg_i(),this._buyBtn_i()];
	}
	var _proto = LifeGridBuyItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 128;
		t.scale9Grid = new egret.Rectangle(10,10,63,65);
		t.source = "common_di2_png";
		t.width = 700;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._goods_i = function () {
		var t = new BaseGoods();
		this._goods = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = -7;
		t.y = -8;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.text = "";
		t.width = 205;
		t.x = 123;
		t.y = 32;
		return t;
	};
	_proto._attrTxt0_i = function () {
		var t = new Label();
		this._attrTxt0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.text = "";
		t.textColor = 0x7C6E62;
		t.width = 180;
		t.x = 123;
		t.y = 81;
		return t;
	};
	_proto._numGroup_i = function () {
		var t = new eui.Group();
		this._numGroup = t;
		t.x = 483;
		t.y = 6;
		t.elementsContent = [this._Image2_i(),this._numTxt_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "playRes_suipian_54_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._numTxt_i = function () {
		var t = new Label();
		this._numTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.text = "";
		t.textColor = 0x7C6E62;
		t.width = 141;
		t.x = 54;
		t.y = 14;
		return t;
	};
	_proto._copyTxt_i = function () {
		var t = new Label();
		this._copyTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.width = 299;
		t.x = 393;
		t.y = 51.5;
		return t;
	};
	_proto._attrTxt1_i = function () {
		var t = new Label();
		this._attrTxt1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.text = "";
		t.textColor = 0x7C6E62;
		t.width = 167;
		t.x = 302;
		t.y = 81;
		return t;
	};
	_proto._yiyouImg_i = function () {
		var t = new eui.Image();
		this._yiyouImg = t;
		t.source = "common_yiyousx_png";
		t.visible = false;
		t.x = 541;
		t.y = 19.5;
		return t;
	};
	_proto._buyBtn_i = function () {
		var t = new Button();
		this._buyBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 81;
		t.label = "Button";
		t.width = 201;
		t.x = 480;
		t.y = 47;
		t.skinName = LifeGridBuyItemSkin$Skin93;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_goods","_nameTxt","_attrTxt0","_numTxt","_numGroup","_copyTxt","_attrTxt1","_yiyouImg","_buyBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridBuyItemSkin;
})(eui.Skin);var LifeGridBuySkin=(function (_super) {
	__extends(LifeGridBuySkin, _super);
	var LifeGridBuySkin$Skin94 = 	(function (_super) {
		__extends(LifeGridBuySkin$Skin94, _super);
		function LifeGridBuySkin$Skin94() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LifeGridBuySkin$Skin94.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "lifeGrid_yjfj_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridBuySkin$Skin94;
	})(eui.Skin);

	function LifeGridBuySkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._splerBtn_i(),this._Image1_i(),this._numTxt_i()];
	}
	var _proto = LifeGridBuySkin.prototype;

	_proto._splerBtn_i = function () {
		var t = new Button();
		this._splerBtn = t;
		t.horizontalCenter = 0;
		t.label = "Button";
		t.y = 1011;
		t.skinName = LifeGridBuySkin$Skin94;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "playRes_suipian_54_png";
		t.x = 466;
		t.y = 1036.5;
		return t;
	};
	_proto._numTxt_i = function () {
		var t = new Label();
		this._numTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "L";
		t.textColor = 0xffebe2;
		t.width = 177;
		t.x = 524;
		t.y = 1051;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_splerBtn","_numTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridBuySkin;
})(eui.Skin);var LifeGridHunResultItemSkin=(function (_super) {
	__extends(LifeGridHunResultItemSkin, _super);
	function LifeGridHunResultItemSkin() {
		_super.call(this);
		
		this.height = 182;
		this.width = 195;
		this.elementsContent = [this._goods_i(),this._nameTxt_i(),this._attrTxt_i()];
	}
	var _proto = LifeGridHunResultItemSkin.prototype;

	_proto._goods_i = function () {
		var t = new BaseGoods();
		this._goods = t;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 27;
		t.y = -9;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.width = 133;
		t.x = 31;
		t.y = 115;
		return t;
	};
	_proto._attrTxt_i = function () {
		var t = new Label();
		this._attrTxt = t;
		t.anchorOffsetX = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.width = 172;
		t.x = 13;
		t.y = 146;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_goods","_nameTxt","_attrTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridHunResultItemSkin;
})(eui.Skin);var LifeGridHunResultWinSkin=(function (_super) {
	__extends(LifeGridHunResultWinSkin, _super);
	var LifeGridHunResultWinSkin$Skin95 = 	(function (_super) {
		__extends(LifeGridHunResultWinSkin$Skin95, _super);
		function LifeGridHunResultWinSkin$Skin95() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LifeGridHunResultWinSkin$Skin95.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "lifeGrid_zailaishici_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridHunResultWinSkin$Skin95;
	})(eui.Skin);

	function LifeGridHunResultWinSkin() {
		_super.call(this);
		
		this.height = 631;
		this.width = 715;
		this.elementsContent = [this._back_i(),this._group_i(),this._itemGroup_i()];
	}
	var _proto = LifeGridHunResultWinSkin.prototype;

	_proto._back_i = function () {
		var t = new ResultWinBack();
		this._back = t;
		t.skinName = "ResultWinBackSkin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._group_i = function () {
		var t = new eui.Group();
		this._group = t;
		t.x = 417;
		t.y = 489;
		t.elementsContent = [this._resImg0_i(),this._hontTenBtn_i(),this._lossTxt0_i()];
		return t;
	};
	_proto._resImg0_i = function () {
		var t = new eui.Image();
		this._resImg0 = t;
		t.source = "playRes_gold_54_png";
		t.x = 33;
		t.y = 0;
		return t;
	};
	_proto._hontTenBtn_i = function () {
		var t = new Button();
		this._hontTenBtn = t;
		t.label = "Button";
		t.x = 0;
		t.y = 27;
		t.skinName = LifeGridHunResultWinSkin$Skin95;
		return t;
	};
	_proto._lossTxt0_i = function () {
		var t = new Label();
		this._lossTxt0 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "Label";
		t.width = 155;
		t.x = 79;
		t.y = 11;
		return t;
	};
	_proto._itemGroup_i = function () {
		var t = new eui.Group();
		this._itemGroup = t;
		t.verticalCenter = 22.5;
		t.x = 181;
		t.elementsContent = [this._item1_i(),this._item2_i()];
		return t;
	};
	_proto._item1_i = function () {
		var t = new LifeGridHunResultItem();
		this._item1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 212;
		t.skinName = "LifeGridHunResultItemSkin";
		t.width = 205;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._item2_i = function () {
		var t = new LifeGridHunResultItem();
		this._item2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 212;
		t.skinName = "LifeGridHunResultItemSkin";
		t.width = 205;
		t.x = 166.5;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_resImg0","_hontTenBtn","_lossTxt0","_group","_item1","_item2","_itemGroup"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridHunResultWinSkin;
})(eui.Skin);var LifeGridHuntSkin=(function (_super) {
	__extends(LifeGridHuntSkin, _super);
	var LifeGridHuntSkin$Skin96 = 	(function (_super) {
		__extends(LifeGridHuntSkin$Skin96, _super);
		function LifeGridHuntSkin$Skin96() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LifeGridHuntSkin$Skin96.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "lifeGrid_lmyc_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridHuntSkin$Skin96;
	})(eui.Skin);

	var LifeGridHuntSkin$Skin97 = 	(function (_super) {
		__extends(LifeGridHuntSkin$Skin97, _super);
		function LifeGridHuntSkin$Skin97() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LifeGridHuntSkin$Skin97.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "lifeGrid_lmsc_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridHuntSkin$Skin97;
	})(eui.Skin);

	function LifeGridHuntSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._resImg1_i(),this._resImg0_i(),this._hontBtn_i(),this._hontTenBtn_i(),this._Image1_i(),this._Image2_i(),this._Image3_i(),this._cdTxt_i(),this._Group1_i(),this._lossTxt1_i(),this._lossTxt0_i()];
	}
	var _proto = LifeGridHuntSkin.prototype;

	_proto._resImg1_i = function () {
		var t = new eui.Image();
		this._resImg1 = t;
		t.source = "playRes_gold_54_png";
		t.x = 137;
		t.y = 959;
		return t;
	};
	_proto._resImg0_i = function () {
		var t = new eui.Image();
		this._resImg0 = t;
		t.source = "playRes_gold_54_png";
		t.x = 408.5;
		t.y = 959;
		return t;
	};
	_proto._hontBtn_i = function () {
		var t = new Button();
		this._hontBtn = t;
		t.label = "Button";
		t.x = 125;
		t.y = 995;
		t.skinName = LifeGridHuntSkin$Skin96;
		return t;
	};
	_proto._hontTenBtn_i = function () {
		var t = new Button();
		this._hontTenBtn = t;
		t.label = "Button";
		t.x = 399;
		t.y = 995.5;
		t.skinName = LifeGridHuntSkin$Skin97;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "lifeGrid_chaozhi_png";
		t.x = 411;
		t.y = 1004;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "lifeGrid_zi_png";
		t.x = 61;
		t.y = 298;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 35;
		t.scale9Grid = new egret.Rectangle(8,7,49,22);
		t.source = "common_back3_png";
		t.width = 200;
		t.x = 143;
		t.y = 1089;
		return t;
	};
	_proto._cdTxt_i = function () {
		var t = new Label();
		this._cdTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = " ";
		t.textAlign = "center";
		t.width = 196;
		t.x = 144;
		t.y = 1091.5;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 75;
		t.y = 917;
		t.elementsContent = [this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this._Image9_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "lifeGrid_suipian_png";
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "nums_lifegrid_3_png";
		t.x = 391.5;
		t.y = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "nums_lifegrid_6_png";
		t.x = 411;
		t.y = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "nums_lifegrid_-_png";
		t.x = 436;
		t.y = 0;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "nums_lifegrid_4_png";
		t.x = 464;
		t.y = 0;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "nums_lifegrid_2_png";
		t.x = 484;
		t.y = 0;
		return t;
	};
	_proto._lossTxt1_i = function () {
		var t = new Label();
		this._lossTxt1 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "Label";
		t.width = 155;
		t.x = 189;
		t.y = 973;
		return t;
	};
	_proto._lossTxt0_i = function () {
		var t = new Label();
		this._lossTxt0 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "Label";
		t.width = 155;
		t.x = 457.5;
		t.y = 973;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_resImg1","_resImg0","_hontBtn","_hontTenBtn","_cdTxt","_lossTxt1","_lossTxt0"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridHuntSkin;
})(eui.Skin);var LifeGridSeparateItemSkin=(function (_super) {
	__extends(LifeGridSeparateItemSkin, _super);
	function LifeGridSeparateItemSkin() {
		_super.call(this);
		
		this.height = 241;
		this.width = 214;
		this.elementsContent = [this._Image1_i(),this._effImg_i(),this._goods_i(),this._nameTxt_i(),this._attrTxt1_i(),this._attrTxt2_i()];
	}
	var _proto = LifeGridSeparateItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 239;
		t.scale9Grid = new egret.Rectangle(10,10,63,65);
		t.source = "common_di2_png";
		t.width = 212;
		t.x = 1;
		t.y = 1;
		return t;
	};
	_proto._effImg_i = function () {
		var t = new eui.Image();
		this._effImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 241;
		t.scale9Grid = new egret.Rectangle(13,13,84,84);
		t.source = "common_di_png";
		t.visible = false;
		t.width = 215;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._goods_i = function () {
		var t = new BaseGoods();
		this._goods = t;
		t.height = 141;
		t.horizontalCenter = 0.5;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.y = -10.5;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.width = 146;
		t.x = 34;
		t.y = 119;
		return t;
	};
	_proto._attrTxt1_i = function () {
		var t = new Label();
		this._attrTxt1 = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 199;
		t.y = 154;
		return t;
	};
	_proto._attrTxt2_i = function () {
		var t = new Label();
		this._attrTxt2 = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 209;
		t.y = 189;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_effImg","_goods","_nameTxt","_attrTxt1","_attrTxt2"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridSeparateItemSkin;
})(eui.Skin);var LifeGridSeparateViewSkin=(function (_super) {
	__extends(LifeGridSeparateViewSkin, _super);
	var LifeGridSeparateViewSkin$Skin98 = 	(function (_super) {
		__extends(LifeGridSeparateViewSkin$Skin98, _super);
		function LifeGridSeparateViewSkin$Skin98() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LifeGridSeparateViewSkin$Skin98.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "lifeGrid_yjfj_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridSeparateViewSkin$Skin98;
	})(eui.Skin);

	var LifeGridSeparateViewSkin$Skin99 = 	(function (_super) {
		__extends(LifeGridSeparateViewSkin$Skin99, _super);
		function LifeGridSeparateViewSkin$Skin99() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image2","source","common_cb_selected_png")
					])
				,
				new eui.State ("downAndSelected",
					[
						new eui.SetProperty("_Image2","source","")
					])
				,
				new eui.State ("disabledAndSelected",
					[
						new eui.SetProperty("_Image2","source","")
					])
			];
		}
		var _proto = LifeGridSeparateViewSkin$Skin99.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.source = "common_cb_rect_png";
			t.x = 0;
			t.y = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.source = "";
			t.x = 0;
			t.y = 0;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.fontFamily = "Microsoft YaHei";
			t.size = 24;
			t.text = "";
			t.textColor = 0x7B6D61;
			t.x = 48;
			t.y = 8;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridSeparateViewSkin$Skin99;
	})(eui.Skin);

	var LifeGridSeparateViewSkin$Skin100 = 	(function (_super) {
		__extends(LifeGridSeparateViewSkin$Skin100, _super);
		function LifeGridSeparateViewSkin$Skin100() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image2","source","common_cb_selected_png")
					])
				,
				new eui.State ("downAndSelected",
					[
						new eui.SetProperty("_Image2","source","")
					])
				,
				new eui.State ("disabledAndSelected",
					[
						new eui.SetProperty("_Image2","source","")
					])
			];
		}
		var _proto = LifeGridSeparateViewSkin$Skin100.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.source = "common_cb_rect_png";
			t.x = 0;
			t.y = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.source = "";
			t.x = 0;
			t.y = 0;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.fontFamily = "Microsoft YaHei";
			t.size = 24;
			t.text = "";
			t.textColor = 0x7B6D61;
			t.x = 48;
			t.y = 8;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridSeparateViewSkin$Skin100;
	})(eui.Skin);

	var LifeGridSeparateViewSkin$Skin101 = 	(function (_super) {
		__extends(LifeGridSeparateViewSkin$Skin101, _super);
		function LifeGridSeparateViewSkin$Skin101() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image2","source","common_cb_selected_png")
					])
				,
				new eui.State ("downAndSelected",
					[
						new eui.SetProperty("_Image2","source","")
					])
				,
				new eui.State ("disabledAndSelected",
					[
						new eui.SetProperty("_Image2","source","")
					])
			];
		}
		var _proto = LifeGridSeparateViewSkin$Skin101.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.source = "common_cb_rect_png";
			t.x = 0;
			t.y = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.source = "";
			t.x = 0;
			t.y = 0;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.fontFamily = "Microsoft YaHei";
			t.size = 24;
			t.text = "";
			t.textColor = 0x7B6D61;
			t.x = 48;
			t.y = 8;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridSeparateViewSkin$Skin101;
	})(eui.Skin);

	var LifeGridSeparateViewSkin$Skin102 = 	(function (_super) {
		__extends(LifeGridSeparateViewSkin$Skin102, _super);
		function LifeGridSeparateViewSkin$Skin102() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image2","source","common_cb_selected_png")
					])
				,
				new eui.State ("downAndSelected",
					[
						new eui.SetProperty("_Image2","source","")
					])
				,
				new eui.State ("disabledAndSelected",
					[
						new eui.SetProperty("_Image2","source","")
					])
			];
		}
		var _proto = LifeGridSeparateViewSkin$Skin102.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.source = "common_cb_rect_png";
			t.x = 0;
			t.y = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.source = "";
			t.x = 0;
			t.y = 0;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.fontFamily = "Microsoft YaHei";
			t.size = 24;
			t.text = "";
			t.textColor = 0x7B6D61;
			t.x = 48;
			t.y = 8;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridSeparateViewSkin$Skin102;
	})(eui.Skin);

	function LifeGridSeparateViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._splerBtn_i(),this._bosGroup_i(),this._Image2_i(),this._soulTxt_i(),this._sepatateTxt_i()];
	}
	var _proto = LifeGridSeparateViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 140;
		t.scale9Grid = new egret.Rectangle(29,11,181,69);
		t.source = "common_bg1_normal_png";
		t.width = 713;
		t.x = 3;
		t.y = 893;
		return t;
	};
	_proto._splerBtn_i = function () {
		var t = new Button();
		this._splerBtn = t;
		t.horizontalCenter = 0;
		t.label = "Button";
		t.y = 1032;
		t.skinName = LifeGridSeparateViewSkin$Skin98;
		return t;
	};
	_proto._bosGroup_i = function () {
		var t = new eui.Group();
		this._bosGroup = t;
		t.x = 51;
		t.y = 942;
		t.elementsContent = [this._checkBox3_i(),this._checkBox2_i(),this._checkBox1_i(),this._checkBox0_i()];
		return t;
	};
	_proto._checkBox3_i = function () {
		var t = new CheckBox();
		this._checkBox3 = t;
		t.label = "红色";
		t.x = 0;
		t.y = 0;
		t.skinName = LifeGridSeparateViewSkin$Skin99;
		return t;
	};
	_proto._checkBox2_i = function () {
		var t = new CheckBox();
		this._checkBox2 = t;
		t.label = "蓝色";
		t.x = 518;
		t.y = 0;
		t.skinName = LifeGridSeparateViewSkin$Skin100;
		return t;
	};
	_proto._checkBox1_i = function () {
		var t = new CheckBox();
		this._checkBox1 = t;
		t.label = "紫色";
		t.x = 345;
		t.y = 0;
		t.skinName = LifeGridSeparateViewSkin$Skin101;
		return t;
	};
	_proto._checkBox0_i = function () {
		var t = new CheckBox();
		this._checkBox0 = t;
		t.label = "橙色";
		t.x = 173;
		t.y = 0;
		t.skinName = LifeGridSeparateViewSkin$Skin102;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "playRes_destiny_54_png";
		t.x = 457;
		t.y = 1057;
		return t;
	};
	_proto._soulTxt_i = function () {
		var t = new Label();
		this._soulTxt = t;
		t.anchorOffsetX = 0;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0xfcebde;
		t.width = 108;
		t.x = 504;
		t.y = 1067.5;
		return t;
	};
	_proto._sepatateTxt_i = function () {
		var t = new Label();
		this._sepatateTxt = t;
		t.anchorOffsetX = 0;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0xa1d33b;
		t.width = 104;
		t.x = 615;
		t.y = 1067.5;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_splerBtn","_checkBox3","_checkBox2","_checkBox1","_checkBox0","_bosGroup","_soulTxt","_sepatateTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridSeparateViewSkin;
})(eui.Skin);var LifeGridViewSkin=(function (_super) {
	__extends(LifeGridViewSkin, _super);
	function LifeGridViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._bgImg_i(),this._roleImg_i(),this._funList_i()];
	}
	var _proto = LifeGridViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 223;
		t.left = 5;
		t.right = 5;
		t.source = "common_back4_png";
		t.touchEnabled = false;
		t.y = 69;
		return t;
	};
	_proto._bgImg_i = function () {
		var t = new eui.Image();
		this._bgImg = t;
		t.source = "lifeGrid_ditu_jpg";
		t.width = 712;
		t.x = 4;
		t.y = 291;
		return t;
	};
	_proto._roleImg_i = function () {
		var t = new eui.Image();
		this._roleImg = t;
		t.horizontalCenter = 0;
		t.source = "lifeGrid_dazuo_png";
		t.y = 569;
		return t;
	};
	_proto._funList_i = function () {
		var t = new BaseHScrollerList();
		this._funList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 160;
		t.horizontalCenter = 0;
		t.width = 635;
		t.y = 127;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_bgImg","_roleImg","_funList"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridViewSkin;
})(eui.Skin);var LifeGridBagItemSkin=(function (_super) {
	__extends(LifeGridBagItemSkin, _super);
	function LifeGridBagItemSkin() {
		_super.call(this);
		
		this.height = 130;
		this.width = 635;
		this.elementsContent = [this._Image1_i(),this._goods_i(),this._nameTxt_i(),this._attrTxt0_i(),this._attrTxt1_i(),this._levTxt_i(),this._tuijianImg_i(),this._yiyouImg_i()];
	}
	var _proto = LifeGridBagItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 128;
		t.scale9Grid = new egret.Rectangle(10,10,63,65);
		t.source = "common_di2_png";
		t.width = 632;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._goods_i = function () {
		var t = new BaseGoods();
		this._goods = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = -7;
		t.y = -8;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.text = "";
		t.width = 88;
		t.x = 123;
		t.y = 32;
		return t;
	};
	_proto._attrTxt0_i = function () {
		var t = new Label();
		this._attrTxt0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.width = 180;
		t.x = 123;
		t.y = 81;
		return t;
	};
	_proto._attrTxt1_i = function () {
		var t = new Label();
		this._attrTxt1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.width = 167;
		t.x = 302;
		t.y = 81;
		return t;
	};
	_proto._levTxt_i = function () {
		var t = new Label();
		this._levTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.width = 127;
		t.x = 228;
		t.y = 32;
		return t;
	};
	_proto._tuijianImg_i = function () {
		var t = new eui.Image();
		this._tuijianImg = t;
		t.source = "lifeGrid_tuijian_png";
		t.visible = false;
		t.x = 479;
		t.y = 18;
		return t;
	};
	_proto._yiyouImg_i = function () {
		var t = new eui.Image();
		this._yiyouImg = t;
		t.source = "common_yiyousx_png";
		t.x = 482;
		t.y = 19;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_goods","_nameTxt","_attrTxt0","_attrTxt1","_levTxt","_tuijianImg","_yiyouImg"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridBagItemSkin;
})(eui.Skin);var LifeGridBagViewSkin=(function (_super) {
	__extends(LifeGridBagViewSkin, _super);
	var LifeGridBagViewSkin$Skin103 = 	(function (_super) {
		__extends(LifeGridBagViewSkin$Skin103, _super);
		function LifeGridBagViewSkin$Skin103() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LifeGridBagViewSkin$Skin103.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "lifeGrid_hqmg_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridBagViewSkin$Skin103;
	})(eui.Skin);

	function LifeGridBagViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._popupView_i(),this._gainBtn_i(),this._scroller_i(),this._numTxt_i()];
	}
	var _proto = LifeGridBagViewSkin.prototype;

	_proto._popupView_i = function () {
		var t = new BasePopUpView();
		this._popupView = t;
		t.height = 1280;
		t.skinName = "BasePopUpSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._gainBtn_i = function () {
		var t = new Button();
		this._gainBtn = t;
		t.label = "Button";
		t.x = 241;
		t.y = 949;
		t.skinName = LifeGridBagViewSkin$Skin103;
		return t;
	};
	_proto._scroller_i = function () {
		var t = new BaseVScrollerList();
		this._scroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 687;
		t.width = 699;
		t.x = 10;
		t.y = 192;
		return t;
	};
	_proto._numTxt_i = function () {
		var t = new Label();
		this._numTxt = t;
		t.anchorOffsetX = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 312;
		t.x = 189;
		t.y = 901;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_popupView","_gainBtn","_scroller","_numTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridBagViewSkin;
})(eui.Skin);var LifeGridBallItemSkin=(function (_super) {
	__extends(LifeGridBallItemSkin, _super);
	function LifeGridBallItemSkin() {
		_super.call(this);
		
		this.height = 113;
		this.width = 113;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._lockImg_i(),this._addImg_i(),this._ballImg_i()];
	}
	var _proto = LifeGridBallItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "lifeGrid_quan1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "lifeGrid_quan2_png";
		t.x = 15;
		t.y = 14;
		return t;
	};
	_proto._lockImg_i = function () {
		var t = new eui.Image();
		this._lockImg = t;
		t.source = "lifeGrid_suo1_png";
		t.x = 30;
		t.y = 28;
		return t;
	};
	_proto._addImg_i = function () {
		var t = new eui.Image();
		this._addImg = t;
		t.source = "lifeGrid_jia_png";
		t.visible = false;
		t.x = 30;
		t.y = 30;
		return t;
	};
	_proto._ballImg_i = function () {
		var t = new eui.Image();
		this._ballImg = t;
		t.source = "lifeGrid_quan3_png";
		t.visible = false;
		t.x = 14;
		t.y = 14;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_lockImg","_addImg","_ballImg"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridBallItemSkin;
})(eui.Skin);var LifeGridContainerSkin=(function (_super) {
	__extends(LifeGridContainerSkin, _super);
	var LifeGridContainerSkin$Skin104 = 	(function (_super) {
		__extends(LifeGridContainerSkin$Skin104, _super);
		function LifeGridContainerSkin$Skin104() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LifeGridContainerSkin$Skin104.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "lifeGrid_fuwenzl_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridContainerSkin$Skin104;
	})(eui.Skin);

	function LifeGridContainerSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._ball1_i(),this._ball2_i(),this._ball3_i(),this._ball4_i(),this._ball5_i(),this._ball6_i(),this._ball7_i(),this._ball8_i(),this._fuwenBtn_i(),this._Image1_i(),this._finghtImg_i()];
	}
	var _proto = LifeGridContainerSkin.prototype;

	_proto._ball1_i = function () {
		var t = new LifeGridBallItem();
		this._ball1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 113;
		t.skinName = "LifeGridBallItemSkin";
		t.width = 113;
		t.x = 78;
		t.y = 789;
		return t;
	};
	_proto._ball2_i = function () {
		var t = new LifeGridBallItem();
		this._ball2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 113;
		t.skinName = "LifeGridBallItemSkin";
		t.width = 113;
		t.x = 42;
		t.y = 607;
		return t;
	};
	_proto._ball3_i = function () {
		var t = new LifeGridBallItem();
		this._ball3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 113;
		t.skinName = "LifeGridBallItemSkin";
		t.width = 113;
		t.x = 76;
		t.y = 437;
		return t;
	};
	_proto._ball4_i = function () {
		var t = new LifeGridBallItem();
		this._ball4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 113;
		t.skinName = "LifeGridBallItemSkin";
		t.width = 113;
		t.x = 203;
		t.y = 323;
		return t;
	};
	_proto._ball5_i = function () {
		var t = new LifeGridBallItem();
		this._ball5 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 113;
		t.skinName = "LifeGridBallItemSkin";
		t.width = 113;
		t.x = 404.5;
		t.y = 323;
		return t;
	};
	_proto._ball6_i = function () {
		var t = new LifeGridBallItem();
		this._ball6 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 113;
		t.skinName = "LifeGridBallItemSkin";
		t.width = 113;
		t.x = 530;
		t.y = 437;
		return t;
	};
	_proto._ball7_i = function () {
		var t = new LifeGridBallItem();
		this._ball7 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 113;
		t.skinName = "LifeGridBallItemSkin";
		t.width = 113;
		t.x = 564;
		t.y = 607;
		return t;
	};
	_proto._ball8_i = function () {
		var t = new LifeGridBallItem();
		this._ball8 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 113;
		t.skinName = "LifeGridBallItemSkin";
		t.width = 113;
		t.x = 530;
		t.y = 799;
		return t;
	};
	_proto._fuwenBtn_i = function () {
		var t = new Button();
		this._fuwenBtn = t;
		t.label = "Button";
		t.x = 27.5;
		t.y = 1011;
		t.skinName = LifeGridContainerSkin$Skin104;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "common_fighting_png";
		t.x = 171;
		t.y = 1023;
		return t;
	};
	_proto._finghtImg_i = function () {
		var t = new eui.Image();
		this._finghtImg = t;
		t.source = "common_zhanli_png";
		t.x = 193;
		t.y = 1029;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_ball1","_ball2","_ball3","_ball4","_ball5","_ball6","_ball7","_ball8","_fuwenBtn","_finghtImg"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridContainerSkin;
})(eui.Skin);var LifeGridFuseViewSkin=(function (_super) {
	__extends(LifeGridFuseViewSkin, _super);
	var LifeGridFuseViewSkin$Skin105 = 	(function (_super) {
		__extends(LifeGridFuseViewSkin$Skin105, _super);
		function LifeGridFuseViewSkin$Skin105() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LifeGridFuseViewSkin$Skin105.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridFuseViewSkin$Skin105;
	})(eui.Skin);

	var LifeGridFuseViewSkin$Skin106 = 	(function (_super) {
		__extends(LifeGridFuseViewSkin$Skin106, _super);
		function LifeGridFuseViewSkin$Skin106() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LifeGridFuseViewSkin$Skin106.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "common_dh_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridFuseViewSkin$Skin106;
	})(eui.Skin);

	function LifeGridFuseViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._popupView_i(),this._lifeGroup_i(),this._rightGroup_i(),this._group1_i()];
	}
	var _proto = LifeGridFuseViewSkin.prototype;

	_proto._popupView_i = function () {
		var t = new BasePopUpView();
		this._popupView = t;
		t.height = 1280;
		t.skinName = "BasePopUpSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._lifeGroup_i = function () {
		var t = new eui.Group();
		this._lifeGroup = t;
		t.x = 282;
		t.y = 383;
		t.elementsContent = [this._attrTxt0_i(),this._attrTxt1_i(),this._goods1_i(),this._nameTxt1_i()];
		return t;
	};
	_proto._attrTxt0_i = function () {
		var t = new Label();
		this._attrTxt0 = t;
		t.anchorOffsetX = 0;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0x7C6E62;
		t.width = 234;
		t.x = 32.5;
		t.y = 156;
		return t;
	};
	_proto._attrTxt1_i = function () {
		var t = new Label();
		this._attrTxt1 = t;
		t.anchorOffsetX = 0;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0x7C6E62;
		t.width = 234;
		t.x = 33.5;
		t.y = 186;
		return t;
	};
	_proto._goods1_i = function () {
		var t = new BaseGoods();
		this._goods1 = t;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 11;
		t.y = 0;
		return t;
	};
	_proto._nameTxt1_i = function () {
		var t = new Label();
		this._nameTxt1 = t;
		t.anchorOffsetX = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 157;
		t.x = 0;
		t.y = 126;
		return t;
	};
	_proto._rightGroup_i = function () {
		var t = new eui.Group();
		this._rightGroup = t;
		t.x = 311;
		t.y = 373;
		t.elementsContent = [this._attrTxt3_i(),this._attrTxt2_i(),this._goods2_i(),this._nameTxt2_i(),this._Image1_i(),this._rhBtn_i(),this._Label1_i()];
		return t;
	};
	_proto._attrTxt3_i = function () {
		var t = new Label();
		this._attrTxt3 = t;
		t.anchorOffsetX = 0;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0x7C6E62;
		t.width = 234;
		t.x = 143.5;
		t.y = 186;
		return t;
	};
	_proto._attrTxt2_i = function () {
		var t = new Label();
		this._attrTxt2 = t;
		t.anchorOffsetX = 0;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0x7c6e62;
		t.width = 234;
		t.x = 143.5;
		t.y = 156;
		return t;
	};
	_proto._goods2_i = function () {
		var t = new BaseGoods();
		this._goods2 = t;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 121;
		t.y = 0;
		return t;
	};
	_proto._nameTxt2_i = function () {
		var t = new Label();
		this._nameTxt2 = t;
		t.anchorOffsetX = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.width = 157;
		t.x = 113;
		t.y = 126;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "common_arrow_png";
		t.x = 0;
		t.y = 42;
		return t;
	};
	_proto._rhBtn_i = function () {
		var t = new Button();
		this._rhBtn = t;
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = -71.5;
		t.y = 298;
		t.skinName = LifeGridFuseViewSkin$Skin105;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 67;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "高品质命格将与底品质命格融合底品质命格消失，保留最高属性";
		t.textAlign = "center";
		t.textColor = 0x76ef51;
		t.width = 339;
		t.x = -121.5;
		t.y = 221.5;
		return t;
	};
	_proto._group1_i = function () {
		var t = new eui.Group();
		this._group1 = t;
		t.x = 106;
		t.y = 613;
		t.elementsContent = [this._losseTxt_i(),this._buyBtn_i()];
		return t;
	};
	_proto._losseTxt_i = function () {
		var t = new Label();
		this._losseTxt = t;
		t.anchorOffsetX = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 509;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._buyBtn_i = function () {
		var t = new Button();
		this._buyBtn = t;
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 135;
		t.y = 58;
		t.skinName = LifeGridFuseViewSkin$Skin106;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_popupView","_attrTxt0","_attrTxt1","_goods1","_nameTxt1","_lifeGroup","_attrTxt3","_attrTxt2","_goods2","_nameTxt2","_rhBtn","_rightGroup","_losseTxt","_buyBtn","_group1"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridFuseViewSkin;
})(eui.Skin);var LifeGridLeveUpViewSkin=(function (_super) {
	__extends(LifeGridLeveUpViewSkin, _super);
	var LifeGridLeveUpViewSkin$Skin107 = 	(function (_super) {
		__extends(LifeGridLeveUpViewSkin$Skin107, _super);
		function LifeGridLeveUpViewSkin$Skin107() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LifeGridLeveUpViewSkin$Skin107.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "lifeGrid_tihuan_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridLeveUpViewSkin$Skin107;
	})(eui.Skin);

	var LifeGridLeveUpViewSkin$Skin108 = 	(function (_super) {
		__extends(LifeGridLeveUpViewSkin$Skin108, _super);
		function LifeGridLeveUpViewSkin$Skin108() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LifeGridLeveUpViewSkin$Skin108.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "common_label_upgrade_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return LifeGridLeveUpViewSkin$Skin108;
	})(eui.Skin);

	function LifeGridLeveUpViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._closeImg_i(),this._goods_i(),this._nameTxt_i(),this._attrTxt0_i(),this._attrTxt1_i(),this._attrTxt2_i(),this._attrTxt3_i(),this._attrTxt4_i(),this._leupGroup_i(),this._fightImg_i(),this._resGroup_i(),this._awoorImg1_i(),this._awoorImg2_i(),this._awoorImg3_i(),this._maijiImg_i(),this._changeBtn_i(),this._levUpBtn_i()];
	}
	var _proto = LifeGridLeveUpViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 532;
		t.scale9Grid = new egret.Rectangle(26,26,160,160);
		t.source = "common_tipsBg_png";
		t.verticalCenter = 56;
		t.width = 448;
		t.x = 136;
		return t;
	};
	_proto._closeImg_i = function () {
		var t = new eui.Image();
		this._closeImg = t;
		t.source = "common_tip_close_png";
		t.x = 533;
		t.y = 430;
		return t;
	};
	_proto._goods_i = function () {
		var t = new BaseGoods();
		this._goods = t;
		t.height = 141;
		t.horizontalCenter = 0;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.y = 437.5;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 161;
		t.x = 280;
		t.y = 563.5;
		return t;
	};
	_proto._attrTxt0_i = function () {
		var t = new Label();
		this._attrTxt0 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "Labe";
		t.textAlign = "right";
		t.textColor = 0x7C6E62;
		t.width = 214;
		t.x = 167;
		t.y = 610;
		return t;
	};
	_proto._attrTxt1_i = function () {
		var t = new Label();
		this._attrTxt1 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0x7C6E62;
		t.width = 130;
		t.x = 427;
		t.y = 610;
		return t;
	};
	_proto._attrTxt2_i = function () {
		var t = new Label();
		this._attrTxt2 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "Label";
		t.textAlign = "right";
		t.textColor = 0x7C6E62;
		t.verticalAlign = "justify";
		t.width = 210;
		t.x = 170;
		t.y = 657;
		return t;
	};
	_proto._attrTxt3_i = function () {
		var t = new Label();
		this._attrTxt3 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0x7C6E62;
		t.width = 124;
		t.x = 427;
		t.y = 657;
		return t;
	};
	_proto._attrTxt4_i = function () {
		var t = new Label();
		this._attrTxt4 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0x7C6E62;
		t.width = 127;
		t.x = 427;
		t.y = 705;
		return t;
	};
	_proto._leupGroup_i = function () {
		var t = new eui.Group();
		this._leupGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.width = 244;
		t.x = 258;
		t.y = 750;
		t.elementsContent = [this._Image2_i(),this._Label1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "common_title_wordBg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "升级条件";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.width = 178;
		t.x = 15.5;
		t.y = 6;
		return t;
	};
	_proto._fightImg_i = function () {
		var t = new eui.Image();
		this._fightImg = t;
		t.source = "main_fighting_png";
		t.x = 173;
		t.y = 696;
		return t;
	};
	_proto._resGroup_i = function () {
		var t = new eui.Group();
		this._resGroup = t;
		t.horizontalCenter = 0;
		t.y = 800.5;
		t.elementsContent = [this._Image3_i(),this._countTxt_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "playRes_destiny_54_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._countTxt_i = function () {
		var t = new Label();
		this._countTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "1";
		t.textAlign = "left";
		t.textColor = 0x7C6E62;
		t.width = 195;
		t.x = 51;
		t.y = 12;
		return t;
	};
	_proto._awoorImg1_i = function () {
		var t = new eui.Image();
		this._awoorImg1 = t;
		t.source = "common_upgrade_png";
		t.x = 390;
		t.y = 604;
		return t;
	};
	_proto._awoorImg2_i = function () {
		var t = new eui.Image();
		this._awoorImg2 = t;
		t.source = "common_upgrade_png";
		t.x = 390;
		t.y = 649;
		return t;
	};
	_proto._awoorImg3_i = function () {
		var t = new eui.Image();
		this._awoorImg3 = t;
		t.source = "common_upgrade_png";
		t.x = 390;
		t.y = 698;
		return t;
	};
	_proto._maijiImg_i = function () {
		var t = new eui.Image();
		this._maijiImg = t;
		t.source = "common_yimanji_png";
		t.visible = false;
		t.x = 287;
		t.y = 757;
		return t;
	};
	_proto._changeBtn_i = function () {
		var t = new Button();
		this._changeBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 96;
		t.label = "Button";
		t.width = 219;
		t.x = 140.5;
		t.y = 857;
		t.skinName = LifeGridLeveUpViewSkin$Skin107;
		return t;
	};
	_proto._levUpBtn_i = function () {
		var t = new Button();
		this._levUpBtn = t;
		t.height = 96;
		t.label = "Button";
		t.width = 219;
		t.x = 360;
		t.y = 857;
		t.skinName = LifeGridLeveUpViewSkin$Skin108;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_closeImg","_goods","_nameTxt","_attrTxt0","_attrTxt1","_attrTxt2","_attrTxt3","_attrTxt4","_leupGroup","_fightImg","_countTxt","_resGroup","_awoorImg1","_awoorImg2","_awoorImg3","_maijiImg","_changeBtn","_levUpBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridLeveUpViewSkin;
})(eui.Skin);var LifeGridListItemSkin=(function (_super) {
	__extends(LifeGridListItemSkin, _super);
	function LifeGridListItemSkin() {
		_super.call(this);
		
		this.height = 514;
		this.width = 608;
		this.elementsContent = [this._Image1_i(),this._titleTxt_i()];
	}
	var _proto = LifeGridListItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(61,4,75,28);
		t.source = "common_title_wordBg_png";
		t.width = 289;
		t.y = 5;
		return t;
	};
	_proto._titleTxt_i = function () {
		var t = new Label();
		this._titleTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 277;
		t.y = 10;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_titleTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridListItemSkin;
})(eui.Skin);var LifeGridListViewSkin=(function (_super) {
	__extends(LifeGridListViewSkin, _super);
	function LifeGridListViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._popupView_i(),this._scroller_i()];
	}
	var _proto = LifeGridListViewSkin.prototype;

	_proto._popupView_i = function () {
		var t = new BasePopUpView();
		this._popupView = t;
		t.height = 1280;
		t.skinName = "BasePopUpSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._scroller_i = function () {
		var t = new BaseVScrollerList();
		this._scroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 390;
		t.horizontalCenter = 0;
		t.width = 608;
		t.y = 384;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_popupView","_scroller"];
		},
		enumerable: true,
		configurable: true
	});
	return LifeGridListViewSkin;
})(eui.Skin);var LoginViewSkin=(function (_super) {
	__extends(LoginViewSkin, _super);
	function LoginViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 880;
		this.elementsContent = [this._back_i(),this._serverBack_i(),this._icon_i(),this._txtServer_i(),this._txtClick_i(),this._btnEnter_i(),this._Label1_i(),this._Label2_i(),this._inputServer_i(),this._inputClient_i()];
	}
	var _proto = LoginViewSkin.prototype;

	_proto._back_i = function () {
		var t = new BitmapRemote();
		this._back = t;
		t.height = 1280;
		t.width = 880;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._serverBack_i = function () {
		var t = new eui.Image();
		this._serverBack = t;
		t.height = 56;
		t.scale9Grid = new egret.Rectangle(81,7,66,42);
		t.source = "login_labelBack_png";
		t.width = 596;
		t.x = 145;
		t.y = 898;
		return t;
	};
	_proto._icon_i = function () {
		var t = new eui.Image();
		this._icon = t;
		t.height = 54;
		t.source = "login_iconHot_png";
		t.touchEnabled = false;
		t.width = 42;
		t.x = 200;
		t.y = 898;
		return t;
	};
	_proto._txtServer_i = function () {
		var t = new Label();
		this._txtServer = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "测试服";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.width = 272;
		t.x = 242;
		t.y = 910;
		return t;
	};
	_proto._txtClick_i = function () {
		var t = new Label();
		this._txtClick = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "点击换服";
		t.textAlign = "left";
		t.touchEnabled = false;
		t.width = 122;
		t.x = 514;
		t.y = 910;
		return t;
	};
	_proto._btnEnter_i = function () {
		var t = new eui.Image();
		this._btnEnter = t;
		t.height = 93;
		t.source = "login_btnStart_png";
		t.width = 292;
		t.x = 296;
		t.y = 1027;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "服务器：";
		t.textAlign = "left";
		t.width = 122;
		t.x = 200;
		t.y = 806;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new Label();
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "账号：";
		t.textAlign = "left";
		t.width = 122;
		t.x = 200;
		t.y = 849;
		return t;
	};
	_proto._inputServer_i = function () {
		var t = new TextInput();
		this._inputServer = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 35;
		t.width = 231;
		t.x = 317;
		t.y = 806;
		return t;
	};
	_proto._inputClient_i = function () {
		var t = new TextInput();
		this._inputClient = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 35;
		t.width = 231;
		t.x = 317;
		t.y = 849;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_serverBack","_icon","_txtServer","_txtClick","_btnEnter","_inputServer","_inputClient"];
		},
		enumerable: true,
		configurable: true
	});
	return LoginViewSkin;
})(eui.Skin);var ServerItemSkin=(function (_super) {
	__extends(ServerItemSkin, _super);
	function ServerItemSkin() {
		_super.call(this);
		
		this.height = 73;
		this.width = 498;
		this.elementsContent = [this._back_i(),this._icon_i(),this._label_i()];
	}
	var _proto = ServerItemSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.height = 73;
		t.source = "common_wordBg_normal_png";
		t.width = 498;
		t.x = 0;
		return t;
	};
	_proto._icon_i = function () {
		var t = new eui.Image();
		this._icon = t;
		t.source = "login_iconHot_png";
		t.x = 440;
		t.y = 3;
		return t;
	};
	_proto._label_i = function () {
		var t = new Label();
		this._label = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "强化装备";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.width = 427;
		t.x = 10;
		t.y = 21.5;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_icon","_label"];
		},
		enumerable: true,
		configurable: true
	});
	return ServerItemSkin;
})(eui.Skin);var ServerSelectViewSkin=(function (_super) {
	__extends(ServerSelectViewSkin, _super);
	function ServerSelectViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._groupList_i(),this._itemList_i(),this._btnClose_i()];
	}
	var _proto = ServerSelectViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 910;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(5,114,4,687);
		t.source = "panel_bg3_png";
		t.width = 720;
		t.y = 111;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 32;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(90,10,540,5);
		t.source = "border1_png";
		t.y = 93;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 69;
		t.horizontalCenter = 0;
		t.source = "common_titleBg2_png";
		t.y = 76;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 32;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(90,4,540,25);
		t.source = "border2_png";
		t.width = 720;
		t.y = 1002;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "login_serverTitle_png";
		t.y = 83;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 860;
		t.scale9Grid = new egret.Rectangle(59,102,356,613);
		t.source = "common_pnl_back1_png";
		t.width = 520;
		t.x = 200;
		t.y = 136;
		return t;
	};
	_proto._groupList_i = function () {
		var t = new BaseVScrollerList();
		this._groupList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 810;
		t.width = 186;
		t.x = 9;
		t.y = 159;
		return t;
	};
	_proto._itemList_i = function () {
		var t = new BaseVScrollerList();
		this._itemList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 810;
		t.width = 498;
		t.x = 209;
		t.y = 159;
		return t;
	};
	_proto._btnClose_i = function () {
		var t = new eui.Image();
		this._btnClose = t;
		t.source = "common_closeImg_png";
		t.x = 622;
		t.y = 70;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_groupList","_itemList","_btnClose"];
		},
		enumerable: true,
		configurable: true
	});
	return ServerSelectViewSkin;
})(eui.Skin);var MailAllFetchSkin=(function (_super) {
	__extends(MailAllFetchSkin, _super);
	var MailAllFetchSkin$Skin109 = 	(function (_super) {
		__extends(MailAllFetchSkin$Skin109, _super);
		function MailAllFetchSkin$Skin109() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = MailAllFetchSkin$Skin109.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "confirm_png";
			t.x = 8;
			t.y = 19;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return MailAllFetchSkin$Skin109;
	})(eui.Skin);

	function MailAllFetchSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._basePopUp_i(),this._Image1_i(),this._confirmBtn_i()];
	}
	var _proto = MailAllFetchSkin.prototype;

	_proto._basePopUp_i = function () {
		var t = new BasePopUpView();
		this._basePopUp = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "fetch_title_png";
		t.x = 284;
		t.y = 314;
		return t;
	};
	_proto._confirmBtn_i = function () {
		var t = new Button();
		this._confirmBtn = t;
		t.height = 90;
		t.label = "";
		t.width = 197;
		t.x = 262;
		t.y = 680;
		t.skinName = MailAllFetchSkin$Skin109;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_basePopUp","_confirmBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return MailAllFetchSkin;
})(eui.Skin);var MailContentSkin=(function (_super) {
	__extends(MailContentSkin, _super);
	var MailContentSkin$Skin110 = 	(function (_super) {
		__extends(MailContentSkin$Skin110, _super);
		function MailContentSkin$Skin110() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = MailContentSkin$Skin110.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "fetch_png";
			t.x = 8;
			t.y = 19;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return MailContentSkin$Skin110;
	})(eui.Skin);

	function MailContentSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._basePopUp_i(),this._Image1_i(),this._Image2_i(),this._titleTxt_i(),this._contentTxt_i(),this._Image3_i(),this._Label1_i(),this._fetchBtn_i()];
	}
	var _proto = MailContentSkin.prototype;

	_proto._basePopUp_i = function () {
		var t = new BasePopUpView();
		this._basePopUp = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "mail_content_title_png";
		t.x = 282;
		t.y = 314;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "common_title_wordBg_png";
		t.x = 254;
		t.y = 382;
		return t;
	};
	_proto._titleTxt_i = function () {
		var t = new Label();
		this._titleTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 30;
		t.text = "新手礼包";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 720;
		t.x = 0;
		t.y = 383;
		return t;
	};
	_proto._contentTxt_i = function () {
		var t = new Label();
		this._contentTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 26;
		t.text = "亲爱的玩家";
		t.textAlign = "left";
		t.textColor = 0x7c6e62;
		t.width = 674;
		t.wordWrap = true;
		t.x = 20;
		t.y = 421;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "split_line_png";
		t.x = 31;
		t.y = 518;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 26;
		t.text = "附件：";
		t.textColor = 0x7c6e62;
		t.x = 20;
		t.y = 523;
		return t;
	};
	_proto._fetchBtn_i = function () {
		var t = new Button();
		this._fetchBtn = t;
		t.height = 90;
		t.label = "";
		t.width = 197;
		t.x = 262;
		t.y = 680;
		t.skinName = MailContentSkin$Skin110;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_basePopUp","_titleTxt","_contentTxt","_fetchBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return MailContentSkin;
})(eui.Skin);var MailItemViewSkin=(function (_super) {
	__extends(MailItemViewSkin, _super);
	function MailItemViewSkin() {
		_super.call(this);
		
		this.height = 133;
		this.width = 661;
		this.elementsContent = [this._back_i(),this._Image1_i(),this._titleTxt_i(),this._dateTxt_i(),this._attachSign_i(),this._unreadSign_i()];
	}
	var _proto = MailItemViewSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "common_wordBg_normal_png";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "mail_sign_png";
		t.x = 8;
		t.y = 16;
		return t;
	};
	_proto._titleTxt_i = function () {
		var t = new eui.Label();
		this._titleTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 28;
		t.left = 114;
		t.size = 28;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.top = 23;
		t.width = 280;
		return t;
	};
	_proto._dateTxt_i = function () {
		var t = new eui.Label();
		this._dateTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 24;
		t.left = 113;
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.top = 80;
		t.width = 280;
		return t;
	};
	_proto._attachSign_i = function () {
		var t = new eui.Image();
		this._attachSign = t;
		t.source = "common_itemBg_png";
		t.x = 500;
		t.y = -3;
		return t;
	};
	_proto._unreadSign_i = function () {
		var t = new eui.Label();
		this._unreadSign = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "（未读）";
		t.textColor = 0x38b800;
		t.x = 380;
		t.y = 23;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_titleTxt","_dateTxt","_attachSign","_unreadSign"];
		},
		enumerable: true,
		configurable: true
	});
	return MailItemViewSkin;
})(eui.Skin);var MailViewSkin=(function (_super) {
	__extends(MailViewSkin, _super);
	var MailViewSkin$Skin111 = 	(function (_super) {
		__extends(MailViewSkin$Skin111, _super);
		function MailViewSkin$Skin111() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = MailViewSkin$Skin111.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "one_key_fetch_png";
			t.x = 32;
			t.y = 24;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return MailViewSkin$Skin111;
	})(eui.Skin);

	function MailViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i(),this._mailList_i(),this._Image1_i(),this._allBtn_i()];
	}
	var _proto = MailViewSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.enabled = true;
		t.percentHeight = 100;
		t.skinName = "BasePanelSkin";
		t.percentWidth = 100;
		return t;
	};
	_proto._mailList_i = function () {
		var t = new BaseVScrollerList();
		this._mailList = t;
		t.height = 850;
		t.width = 661;
		t.x = 32;
		t.y = 120;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "mail_tips_png";
		t.x = 83;
		t.y = 1000;
		return t;
	};
	_proto._allBtn_i = function () {
		var t = new eui.Button();
		this._allBtn = t;
		t.height = 100;
		t.label = "";
		t.width = 244;
		t.x = 238;
		t.y = 1025;
		t.skinName = MailViewSkin$Skin111;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel","_mailList","_allBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return MailViewSkin;
})(eui.Skin);var OfflineProfitViewSkin=(function (_super) {
	__extends(OfflineProfitViewSkin, _super);
	var OfflineProfitViewSkin$Skin112 = 	(function (_super) {
		__extends(OfflineProfitViewSkin$Skin112, _super);
		function OfflineProfitViewSkin$Skin112() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = OfflineProfitViewSkin$Skin112.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "confirm_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return OfflineProfitViewSkin$Skin112;
	})(eui.Skin);

	function OfflineProfitViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._popupView_i(),this._btnOk_i(),this._Image1_i(),this._Group1_i(),this._Group2_i(),this._txt1_i(),this._txt2_i(),this._Group3_i()];
	}
	var _proto = OfflineProfitViewSkin.prototype;

	_proto._popupView_i = function () {
		var t = new BasePopUpView();
		this._popupView = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.skinName = "BasePopUpSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._btnOk_i = function () {
		var t = new Button();
		this._btnOk = t;
		t.label = "button";
		t.x = 241;
		t.y = 792;
		t.skinName = OfflineProfitViewSkin$Skin112;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "offlineProfit_title_png";
		t.x = 278;
		t.y = 317;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 370;
		t.width = 702;
		t.x = 14;
		t.y = 383;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "offlineProfit_label1_png";
		t.x = -2;
		t.y = -3;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "offlineProfit_label2_png";
		t.x = -2;
		t.y = 52;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_line_png";
		t.x = 12;
		t.y = 108;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 55;
		t.source = "playRes_exp_54_png";
		t.width = 55;
		t.x = -10;
		t.y = 140.5;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 55;
		t.source = "playRes_coin_54_png";
		t.width = 55;
		t.x = -11;
		t.y = 225;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.height = 50;
		t.source = "offlineProfit_icon3_png";
		t.width = 47;
		t.x = -5;
		t.y = 315;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 215;
		t.width = 650;
		t.x = 56;
		t.y = 530;
		t.elementsContent = [this._Image8_i(),this._Image9_i(),this._Image10_i(),this._Image11_i(),this._Image12_i(),this._Image13_i(),this._Image14_i(),this._Image15_i(),this._Image16_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.alpha = 0.5;
		t.height = 43;
		t.scale9Grid = new egret.Rectangle(8,4,49,29);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_back3_png";
		t.width = 210;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.alpha = 0.5;
		t.height = 43;
		t.scale9Grid = new egret.Rectangle(8,4,49,29);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_back3_png";
		t.width = 210;
		t.x = 220;
		t.y = 0;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.alpha = 0.5;
		t.height = 43;
		t.scale9Grid = new egret.Rectangle(8,4,49,29);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_back3_png";
		t.width = 210;
		t.x = 440;
		t.y = 0;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.alpha = 0.5;
		t.height = 43;
		t.scale9Grid = new egret.Rectangle(8,4,49,29);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_back3_png";
		t.width = 210;
		t.x = 0;
		t.y = 85;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.alpha = 0.5;
		t.height = 43;
		t.scale9Grid = new egret.Rectangle(8,4,49,29);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_back3_png";
		t.width = 210;
		t.x = 220;
		t.y = 85;
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.alpha = 0.5;
		t.height = 43;
		t.scale9Grid = new egret.Rectangle(8,4,49,29);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_back3_png";
		t.width = 210;
		t.x = 440;
		t.y = 85;
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.alpha = 0.5;
		t.height = 43;
		t.scale9Grid = new egret.Rectangle(8,4,49,29);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_back3_png";
		t.width = 210;
		t.x = 0;
		t.y = 172;
		return t;
	};
	_proto._Image15_i = function () {
		var t = new eui.Image();
		t.alpha = 0.5;
		t.height = 43;
		t.scale9Grid = new egret.Rectangle(8,4,49,29);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_back3_png";
		t.width = 210;
		t.x = 220;
		t.y = 172;
		return t;
	};
	_proto._Image16_i = function () {
		var t = new eui.Image();
		t.alpha = 0.5;
		t.height = 43;
		t.scale9Grid = new egret.Rectangle(8,4,49,29);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_back3_png";
		t.width = 210;
		t.x = 440;
		t.y = 172;
		return t;
	};
	_proto._txt1_i = function () {
		var t = new Label();
		this._txt1 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "Label";
		t.textColor = 0x7c6e62;
		t.width = 550;
		t.x = 152;
		t.y = 387;
		return t;
	};
	_proto._txt2_i = function () {
		var t = new Label();
		this._txt2 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "Label";
		t.textColor = 0x7c6e62;
		t.width = 550;
		t.x = 152;
		t.y = 440;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 204;
		t.width = 627;
		t.x = 70;
		t.y = 537;
		t.elementsContent = [this._txt3_i(),this._txt4_i(),this._txt5_i(),this._txt6_i(),this._txt7_i(),this._txt8_i(),this._txt9_i(),this._txt10_i(),this._txt11_i()];
		return t;
	};
	_proto._txt3_i = function () {
		var t = new Label();
		this._txt3 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "Label";
		t.textColor = 0x7C6E62;
		t.width = 195;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._txt4_i = function () {
		var t = new Label();
		this._txt4 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "Label";
		t.textColor = 0x7C6E62;
		t.width = 195;
		t.x = 219;
		t.y = 0;
		return t;
	};
	_proto._txt5_i = function () {
		var t = new Label();
		this._txt5 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "Label";
		t.textColor = 0x7C6E62;
		t.width = 195;
		t.x = 441;
		t.y = 0;
		return t;
	};
	_proto._txt6_i = function () {
		var t = new Label();
		this._txt6 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "Label";
		t.textColor = 0x7C6E62;
		t.width = 195;
		t.x = 0;
		t.y = 85;
		return t;
	};
	_proto._txt7_i = function () {
		var t = new Label();
		this._txt7 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "Label";
		t.textColor = 0x7C6E62;
		t.width = 195;
		t.x = 219;
		t.y = 85;
		return t;
	};
	_proto._txt8_i = function () {
		var t = new Label();
		this._txt8 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "Label";
		t.textColor = 0x7C6E62;
		t.width = 195;
		t.x = 441;
		t.y = 85;
		return t;
	};
	_proto._txt9_i = function () {
		var t = new Label();
		this._txt9 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "Label";
		t.textColor = 0x7C6E62;
		t.width = 195;
		t.x = 0;
		t.y = 172;
		return t;
	};
	_proto._txt10_i = function () {
		var t = new Label();
		this._txt10 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "Label";
		t.textColor = 0x7C6E62;
		t.width = 195;
		t.x = 219;
		t.y = 172;
		return t;
	};
	_proto._txt11_i = function () {
		var t = new Label();
		this._txt11 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "Label";
		t.textColor = 0x7C6E62;
		t.width = 195;
		t.x = 441;
		t.y = 172;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_popupView","_btnOk","_txt1","_txt2","_txt3","_txt4","_txt5","_txt6","_txt7","_txt8","_txt9","_txt10","_txt11"];
		},
		enumerable: true,
		configurable: true
	});
	return OfflineProfitViewSkin;
})(eui.Skin);var PetFeedItemSkin=(function (_super) {
	__extends(PetFeedItemSkin, _super);
	var PetFeedItemSkin$Skin113 = 	(function (_super) {
		__extends(PetFeedItemSkin$Skin113, _super);
		function PetFeedItemSkin$Skin113() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PetFeedItemSkin$Skin113.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "common_label_use_png";
			t.x = 8;
			t.y = 19;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return PetFeedItemSkin$Skin113;
	})(eui.Skin);

	function PetFeedItemSkin() {
		_super.call(this);
		
		this.height = 156;
		this.width = 700;
		this.elementsContent = [this._Image1_i(),this._goods_i(),this._nameTxt_i(),this._hasUseTxt_i(),this._canUseTxt_i(),this._leftTxt_i(),this._useBtn_i()];
	}
	var _proto = PetFeedItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "common_wordBg_normal_png";
		t.top = 0;
		return t;
	};
	_proto._goods_i = function () {
		var t = new Goods();
		this._goods = t;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 34;
		t.y = 0;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "宠物资质丹";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.verticalAlign = "middle";
		t.width = 111;
		t.x = 49;
		t.y = 123;
		return t;
	};
	_proto._hasUseTxt_i = function () {
		var t = new Label();
		this._hasUseTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "当前已使用：6";
		t.textColor = 0x7e6c62;
		t.width = 250;
		t.x = 210;
		t.y = 46;
		return t;
	};
	_proto._canUseTxt_i = function () {
		var t = new Label();
		this._canUseTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "当前可使用：30";
		t.textColor = 0x7e6c62;
		t.width = 250;
		t.x = 210;
		t.y = 88;
		return t;
	};
	_proto._leftTxt_i = function () {
		var t = new Label();
		this._leftTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "剩余：2个";
		t.textAlign = "center";
		t.textColor = 0x7e6c62;
		t.verticalAlign = "middle";
		t.width = 197;
		t.x = 477;
		t.y = 20;
		return t;
	};
	_proto._useBtn_i = function () {
		var t = new Button();
		this._useBtn = t;
		t.height = 90;
		t.label = "";
		t.width = 197;
		t.x = 477;
		t.y = 39;
		t.skinName = PetFeedItemSkin$Skin113;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_goods","_nameTxt","_hasUseTxt","_canUseTxt","_leftTxt","_useBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return PetFeedItemSkin;
})(eui.Skin);var PetFeedViewSkin=(function (_super) {
	__extends(PetFeedViewSkin, _super);
	function PetFeedViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._baseView_i(),this._item0_i(),this._item1_i()];
	}
	var _proto = PetFeedViewSkin.prototype;

	_proto._baseView_i = function () {
		var t = new BasePopUpView();
		this._baseView = t;
		t.percentHeight = 100;
		t.skinName = "BasePopUpSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._item0_i = function () {
		var t = new PetFeedItem();
		this._item0 = t;
		t.height = 156;
		t.skinName = "PetFeedItemSkin";
		t.width = 700;
		t.x = 10;
		t.y = 380;
		return t;
	};
	_proto._item1_i = function () {
		var t = new PetFeedItem();
		this._item1 = t;
		t.height = 156;
		t.skinName = "PetFeedItemSkin";
		t.width = 700;
		t.x = 10;
		t.y = 542;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_baseView","_item0","_item1"];
		},
		enumerable: true,
		configurable: true
	});
	return PetFeedViewSkin;
})(eui.Skin);var SkillGridSkin=(function (_super) {
	__extends(SkillGridSkin, _super);
	function SkillGridSkin() {
		_super.call(this);
		
		this.height = 111;
		this.width = 111;
		this.elementsContent = [this._back_i(),this._img_i()];
	}
	var _proto = SkillGridSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.source = "common_itemBg_png";
		t.x = -15;
		t.y = -15;
		return t;
	};
	_proto._img_i = function () {
		var t = new BitmapRemote();
		this._img = t;
		t.height = 86;
		t.width = 86;
		t.x = 12.5;
		t.y = 12.5;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_img"];
		},
		enumerable: true,
		configurable: true
	});
	return SkillGridSkin;
})(eui.Skin);var PetSkillViewSkin=(function (_super) {
	__extends(PetSkillViewSkin, _super);
	var PetSkillViewSkin$Skin114 = 	(function (_super) {
		__extends(PetSkillViewSkin$Skin114, _super);
		function PetSkillViewSkin$Skin114() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PetSkillViewSkin$Skin114.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "common_label_upgrade_png";
			t.x = 8;
			t.y = 19;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return PetSkillViewSkin$Skin114;
	})(eui.Skin);

	function PetSkillViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._baseView_i(),this._grid_i(),this._nameTxt_i(),this._statusTxt_i(),this._Image1_i(),this._Image2_i(),this._descImg_i(),this._descTxt_i(),this._condImg_i(),this._condTxt_i(),this._upgradeBtn_i()];
	}
	var _proto = PetSkillViewSkin.prototype;

	_proto._baseView_i = function () {
		var t = new BasePopUpView();
		this._baseView = t;
		t.percentHeight = 100;
		t.skinName = "BasePopUpSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._grid_i = function () {
		var t = new SkillGrid();
		this._grid = t;
		t.height = 111;
		t.skinName = "SkillGridSkin";
		t.width = 111;
		t.x = 81;
		t.y = 377;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "英雄Lv.1";
		t.textColor = 0x7e6c62;
		t.x = 203;
		t.y = 396;
		return t;
	};
	_proto._statusTxt_i = function () {
		var t = new Label();
		this._statusTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "（未激活）";
		t.textColor = 0xff2400;
		t.x = 187;
		t.y = 446;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "split_line_png";
		t.width = 668;
		t.x = 26;
		t.y = 494;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "split_line_png";
		t.width = 668;
		t.x = 26;
		t.y = 598;
		return t;
	};
	_proto._descImg_i = function () {
		var t = new eui.Image();
		this._descImg = t;
		t.source = "common_label_skillEff_png";
		t.x = 82;
		t.y = 506;
		return t;
	};
	_proto._descTxt_i = function () {
		var t = new Label();
		this._descTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "战斗中有一定几率提升宠物自身攻击力10%";
		t.textColor = 0x7e6c62;
		t.x = 82;
		t.y = 549;
		return t;
	};
	_proto._condImg_i = function () {
		var t = new eui.Image();
		this._condImg = t;
		t.source = "common_label_act_cond_png";
		t.x = 82;
		t.y = 611;
		return t;
	};
	_proto._condTxt_i = function () {
		var t = new Label();
		this._condTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "宠物达到3阶";
		t.textColor = 0x7e6c62;
		t.x = 82;
		t.y = 654;
		return t;
	};
	_proto._upgradeBtn_i = function () {
		var t = new Button();
		this._upgradeBtn = t;
		t.height = 90;
		t.label = "";
		t.width = 197;
		t.x = 487;
		t.y = 622;
		t.skinName = PetSkillViewSkin$Skin114;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_baseView","_grid","_nameTxt","_statusTxt","_descImg","_descTxt","_condImg","_condTxt","_upgradeBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return PetSkillViewSkin;
})(eui.Skin);var PetViewSkin=(function (_super) {
	__extends(PetViewSkin, _super);
	var PetViewSkin$Skin115 = 	(function (_super) {
		__extends(PetViewSkin$Skin115, _super);
		function PetViewSkin$Skin115() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PetViewSkin$Skin115.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "common_page_arrow_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return PetViewSkin$Skin115;
	})(eui.Skin);

	var PetViewSkin$Skin116 = 	(function (_super) {
		__extends(PetViewSkin$Skin116, _super);
		function PetViewSkin$Skin116() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PetViewSkin$Skin116.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "common_page_arrow_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return PetViewSkin$Skin116;
	})(eui.Skin);

	var PetViewSkin$Skin117 = 	(function (_super) {
		__extends(PetViewSkin$Skin117, _super);
		function PetViewSkin$Skin117() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PetViewSkin$Skin117.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return PetViewSkin$Skin117;
	})(eui.Skin);

	var PetViewSkin$Skin118 = 	(function (_super) {
		__extends(PetViewSkin$Skin118, _super);
		function PetViewSkin$Skin118() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PetViewSkin$Skin118.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "pet_feed_label_png";
			t.x = 29;
			t.y = 27;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return PetViewSkin$Skin118;
	})(eui.Skin);

	var PetViewSkin$Skin119 = 	(function (_super) {
		__extends(PetViewSkin$Skin119, _super);
		function PetViewSkin$Skin119() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PetViewSkin$Skin119.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "common_label_all_upgrade_png";
			t.x = 29;
			t.y = 27;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return PetViewSkin$Skin119;
	})(eui.Skin);

	function PetViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._fightImg_i(),this._Image1_i(),this._nameTxt_i(),this._preBtn_i(),this._nextBtn_i(),this._Group1_i(),this._Group2_i(),this._Group3_i(),this._Image8_i(),this._Image9_i(),this._Image10_i(),this._feedBtn_i(),this._feedIcon_i(),this._upgradeBtn_i(),this._upgradeIcon_i(),this._Image11_i(),this._lossTxt_i(),this._Image12_i()];
	}
	var _proto = PetViewSkin.prototype;

	_proto._fightImg_i = function () {
		var t = new eui.Image();
		this._fightImg = t;
		t.height = 57;
		t.source = "common_zhanli_png";
		t.width = 102;
		t.x = 434;
		t.y = 158;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 48;
		t.source = "common_back2_png";
		t.width = 184;
		t.x = 136;
		t.y = 166;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 28;
		t.size = 24;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xfffbeb;
		t.verticalAlign = "middle";
		t.width = 174;
		t.x = 141;
		t.y = 176;
		return t;
	};
	_proto._preBtn_i = function () {
		var t = new Button();
		this._preBtn = t;
		t.height = 70;
		t.label = "";
		t.width = 37;
		t.x = 10;
		t.y = 432;
		t.skinName = PetViewSkin$Skin115;
		return t;
	};
	_proto._nextBtn_i = function () {
		var t = new Button();
		this._nextBtn = t;
		t.height = 70;
		t.label = "";
		t.scaleX = -1;
		t.width = 37;
		t.x = 392;
		t.y = 432;
		t.skinName = PetViewSkin$Skin116;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 172;
		t.width = 227;
		t.x = 465;
		t.y = 254;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._attrTxt_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 37;
		t.source = "common_back0_png";
		t.width = 227;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 37;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_back0_png";
		t.width = 227;
		t.x = 0;
		t.y = 45;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 37;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_back0_png";
		t.width = 227;
		t.x = 0;
		t.y = 90;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 37;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_back0_png";
		t.width = 227;
		t.x = 0;
		t.y = 135;
		return t;
	};
	_proto._attrTxt_i = function () {
		var t = new Label();
		this._attrTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 164;
		t.lineSpacing = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "";
		t.textAlign = "left";
		t.textColor = 0xfffbeb;
		t.verticalAlign = "middle";
		t.width = 180;
		t.x = 45;
		t.y = 4;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 296;
		t.width = 272;
		t.x = 438;
		t.y = 491;
		t.elementsContent = [this._Image6_i(),this._Image7_i(),this._grid0_i(),this._grid1_i(),this._grid2_i(),this._grid3_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 296;
		t.scale9Grid = new egret.Rectangle(6,6,38,38);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_rect_1_png";
		t.width = 272;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "pet_skill_title_png";
		t.x = 46;
		t.y = 3;
		return t;
	};
	_proto._grid0_i = function () {
		var t = new SkillGrid();
		this._grid0 = t;
		t.height = 111;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "SkillGridSkin";
		t.width = 111;
		t.x = 18;
		t.y = 49;
		return t;
	};
	_proto._grid1_i = function () {
		var t = new SkillGrid();
		this._grid1 = t;
		t.height = 111;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "SkillGridSkin";
		t.width = 111;
		t.x = 148;
		t.y = 49;
		return t;
	};
	_proto._grid2_i = function () {
		var t = new SkillGrid();
		this._grid2 = t;
		t.height = 111;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "SkillGridSkin";
		t.width = 111;
		t.x = 18;
		t.y = 169;
		return t;
	};
	_proto._grid3_i = function () {
		var t = new SkillGrid();
		this._grid3 = t;
		t.height = 111;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "SkillGridSkin";
		t.width = 111;
		t.x = 148;
		t.y = 169;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 90;
		t.width = 197;
		t.x = 131;
		t.y = 714;
		t.elementsContent = [this._huanhuaBtn_i(),this._hhImg_i(),this._hashhImg_i()];
		return t;
	};
	_proto._huanhuaBtn_i = function () {
		var t = new Button();
		this._huanhuaBtn = t;
		t.height = 90;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 197;
		t.x = 0;
		t.y = 0;
		t.skinName = PetViewSkin$Skin117;
		return t;
	};
	_proto._hhImg_i = function () {
		var t = new eui.Image();
		this._hhImg = t;
		t.source = "common_label_huanhua_png";
		t.x = 8;
		t.y = 19;
		return t;
	};
	_proto._hashhImg_i = function () {
		var t = new eui.Image();
		this._hashhImg = t;
		t.source = "common_label_hasHuanhua_png";
		t.x = 8;
		t.y = 19;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.bottom = 138;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(90,0,540,248);
		t.source = "panel_bg2_png";
		t.top = 979;
		t.width = 710;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.height = 138;
		t.scale9Grid = new egret.Rectangle(29,11,181,69);
		t.source = "common_bg1_normal_png";
		t.width = 710;
		t.x = 5;
		t.y = 841;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.source = "pet_rate_label_png";
		t.x = 15;
		t.y = 852;
		return t;
	};
	_proto._feedBtn_i = function () {
		var t = new Button();
		this._feedBtn = t;
		t.height = 105;
		t.label = "";
		t.width = 238;
		t.x = 73;
		t.y = 1015;
		t.skinName = PetViewSkin$Skin118;
		return t;
	};
	_proto._feedIcon_i = function () {
		var t = new eui.Image();
		this._feedIcon = t;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.x = 276;
		t.y = 1015;
		return t;
	};
	_proto._upgradeBtn_i = function () {
		var t = new Button();
		this._upgradeBtn = t;
		t.height = 105;
		t.label = "";
		t.width = 238;
		t.x = 422;
		t.y = 1015;
		t.skinName = PetViewSkin$Skin119;
		return t;
	};
	_proto._upgradeIcon_i = function () {
		var t = new eui.Image();
		this._upgradeIcon = t;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.x = 625;
		t.y = 1015;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.source = "pet_upgrade_loss_png";
		t.x = 456;
		t.y = 990;
		return t;
	};
	_proto._lossTxt_i = function () {
		var t = new Label();
		this._lossTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 29;
		t.size = 22;
		t.text = "消耗：10/20";
		t.textColor = 0xfff7e6;
		t.verticalAlign = "middle";
		t.width = 132;
		t.x = 490;
		t.y = 993;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.height = 32;
		t.scale9Grid = new egret.Rectangle(24,10,60,13);
		t.source = "common__jindudi_png";
		t.width = 564;
		t.x = 91;
		t.y = 908;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_fightImg","_nameTxt","_preBtn","_nextBtn","_attrTxt","_grid0","_grid1","_grid2","_grid3","_huanhuaBtn","_hhImg","_hashhImg","_feedBtn","_feedIcon","_upgradeBtn","_upgradeIcon","_lossTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return PetViewSkin;
})(eui.Skin);var RankItemSkin0=(function (_super) {
	__extends(RankItemSkin0, _super);
	var RankItemSkin0$Skin120 = 	(function (_super) {
		__extends(RankItemSkin0$Skin120, _super);
		function RankItemSkin0$Skin120() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RankItemSkin0$Skin120.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "rank_btn_label_mobai_png";
			t.x = 28;
			t.y = 28;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return RankItemSkin0$Skin120;
	})(eui.Skin);

	function RankItemSkin0() {
		_super.call(this);
		
		this.height = 455;
		this.width = 720;
		this.elementsContent = [this._back_i(),this._Image1_i(),this._txtName_i(),this._btnWorship_i(),this._bubbleIcon_i()];
	}
	var _proto = RankItemSkin0.prototype;

	_proto._back_i = function () {
		var t = new BitmapRemote();
		this._back = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 455;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "rank_1_png";
		t.x = 443;
		t.y = 38;
		return t;
	};
	_proto._txtName_i = function () {
		var t = new Label();
		this._txtName = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 30;
		t.text = "虚位以待";
		t.textAlign = "center";
		t.width = 200;
		t.x = 436;
		t.y = 212;
		return t;
	};
	_proto._btnWorship_i = function () {
		var t = new Button();
		this._btnWorship = t;
		t.height = 105;
		t.label = "";
		t.width = 238;
		t.x = 417;
		t.y = 320;
		t.skinName = RankItemSkin0$Skin120;
		return t;
	};
	_proto._bubbleIcon_i = function () {
		var t = new eui.Image();
		this._bubbleIcon = t;
		t.height = 22;
		t.source = "common_red_icon_png";
		t.width = 22;
		t.x = 619;
		t.y = 333;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_txtName","_btnWorship","_bubbleIcon"];
		},
		enumerable: true,
		configurable: true
	});
	return RankItemSkin0;
})(eui.Skin);var RankItemSkin1=(function (_super) {
	__extends(RankItemSkin, _super);
	function RankItemSkin() {
		_super.call(this);
		
		this.height = 145;
		this.width = 669;
		this.elementsContent = [this._back_i(),this._Image1_i(),this._iconRank_i(),this._txtName_i(),this._txtValue_i()];
	}
	var _proto = RankItemSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.percentHeight = 100;
		t.source = "common_wordBg_normal_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 100;
		t.source = "common_head_back_png";
		t.width = 100;
		t.x = 18;
		t.y = 23;
		return t;
	};
	_proto._iconRank_i = function () {
		var t = new eui.Image();
		this._iconRank = t;
		t.source = "rank_2_png";
		t.x = 22;
		t.y = 83;
		return t;
	};
	_proto._txtName_i = function () {
		var t = new Label();
		this._txtName = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 30;
		t.text = "名字";
		t.textColor = 0x7c6e62;
		t.x = 130;
		t.y = 58;
		return t;
	};
	_proto._txtValue_i = function () {
		var t = new Label();
		this._txtValue = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 30;
		t.text = "战力：0";
		t.textColor = 0x7c6e62;
		t.x = 408;
		t.y = 58;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_iconRank","_txtName","_txtValue"];
		},
		enumerable: true,
		configurable: true
	});
	return RankItemSkin;
})(eui.Skin);var RankItemSkin2=(function (_super) {
	__extends(RankItemSkin2, _super);
	function RankItemSkin2() {
		_super.call(this);
		
		this.height = 108;
		this.width = 669;
		this.elementsContent = [this._back_i(),this._Image1_i(),this._txtRank_i(),this._txtName_i(),this._txtValue_i()];
	}
	var _proto = RankItemSkin2.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.percentHeight = 100;
		t.source = "common_wordBg_normal_png";
		t.percentWidth = 100;
		t.x = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 47;
		t.source = "common_num_back_png";
		t.width = 47;
		t.x = 46;
		t.y = 31;
		return t;
	};
	_proto._txtRank_i = function () {
		var t = new Label();
		this._txtRank = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 30;
		t.text = "4";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 38;
		t.x = 50;
		t.y = 39;
		return t;
	};
	_proto._txtName_i = function () {
		var t = new Label();
		this._txtName = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 30;
		t.text = "名字";
		t.textColor = 0x7c6e62;
		t.x = 130;
		t.y = 39;
		return t;
	};
	_proto._txtValue_i = function () {
		var t = new Label();
		this._txtValue = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 30;
		t.text = "战力：0";
		t.textColor = 0x7c6e62;
		t.x = 408;
		t.y = 39;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_txtRank","_txtName","_txtValue"];
		},
		enumerable: true,
		configurable: true
	});
	return RankItemSkin2;
})(eui.Skin);var RankSkin=(function (_super) {
	__extends(rankSkin, _super);
	function rankSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i(),this._content_i()];
	}
	var _proto = rankSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.enabled = true;
		t.height = 1280;
		t.skinName = "BasePanelSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._content_i = function () {
		var t = new eui.Group();
		this._content = t;
		t.x = 0;
		t.y = 73;
		t.elementsContent = [this._item0_i(),this._list_i(),this._txtMyRank_i(),this._txtMyValue_i()];
		return t;
	};
	_proto._item0_i = function () {
		var t = new RankItem0();
		this._item0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 455;
		t.width = 720;
		t.x = 0;
		t.y = 43;
		return t;
	};
	_proto._list_i = function () {
		var t = new BaseVScrollerList();
		this._list = t;
		t.anchorOffsetY = 0;
		t.height = 486;
		t.width = 670;
		t.x = 26;
		t.y = 492;
		return t;
	};
	_proto._txtMyRank_i = function () {
		var t = new Label();
		this._txtMyRank = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 30;
		t.text = "我的排行：未入榜";
		t.textColor = 0xdfcbbd;
		t.x = 65;
		t.y = 1010;
		return t;
	};
	_proto._txtMyValue_i = function () {
		var t = new Label();
		this._txtMyValue = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 30;
		t.text = "我的战力：0";
		t.textColor = 0xdfcbbd;
		t.x = 419;
		t.y = 1010;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel","_item0","_list","_txtMyRank","_txtMyValue","_content"];
		},
		enumerable: true,
		configurable: true
	});
	return rankSkin;
})(eui.Skin);var ReinConditionItemSkin=(function (_super) {
	__extends(ReinConditionItemSkin, _super);
	function ReinConditionItemSkin() {
		_super.call(this);
		
		this.height = 80;
		this.width = 322;
		this.elementsContent = [this._Image1_i(),this._descTxt_i(),this._goTxt_i(),this._icon_i()];
	}
	var _proto = ReinConditionItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "common_wordBg_normal_png";
		t.top = 0;
		return t;
	};
	_proto._descTxt_i = function () {
		var t = new Label();
		this._descTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.x = 20;
		t.y = 10;
		return t;
	};
	_proto._goTxt_i = function () {
		var t = new Label();
		this._goTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "";
		t.x = 259;
		t.y = 9;
		return t;
	};
	_proto._icon_i = function () {
		var t = new eui.Image();
		this._icon = t;
		t.source = "common_label_finish_png";
		t.x = 92;
		t.y = -3;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_descTxt","_goTxt","_icon"];
		},
		enumerable: true,
		configurable: true
	});
	return ReinConditionItemSkin;
})(eui.Skin);var ReinPanelSkin=(function (_super) {
	__extends(ReinPanelSkin, _super);
	function ReinPanelSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i()];
	}
	var _proto = ReinPanelSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.percentHeight = 100;
		t.left = 0;
		t.skinName = "BasePanelSkin";
		t.top = 0;
		t.percentWidth = 100;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel"];
		},
		enumerable: true,
		configurable: true
	});
	return ReinPanelSkin;
})(eui.Skin);var ReinRewardsBoxSkin=(function (_super) {
	__extends(ReinRewardsBoxSkin, _super);
	function ReinRewardsBoxSkin() {
		_super.call(this);
		
		this.height = 137;
		this.width = 128;
		this.elementsContent = [this._back_i(),this._icon_i()];
	}
	var _proto = ReinRewardsBoxSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.source = "common_itemBg_png";
		t.x = -6;
		t.y = -6;
		return t;
	};
	_proto._icon_i = function () {
		var t = new BitmapRemote();
		this._icon = t;
		t.height = 86;
		t.width = 86;
		t.x = 21.5;
		t.y = 21.5;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_icon"];
		},
		enumerable: true,
		configurable: true
	});
	return ReinRewardsBoxSkin;
})(eui.Skin);var ReinSuccViewSkin=(function (_super) {
	__extends(ReinSuccViewSkin, _super);
	function ReinSuccViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._bmp_i()];
	}
	var _proto = ReinSuccViewSkin.prototype;

	_proto._bmp_i = function () {
		var t = new BitmapRemote();
		this._bmp = t;
		t.height = 20;
		t.width = 20;
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_bmp"];
		},
		enumerable: true,
		configurable: true
	});
	return ReinSuccViewSkin;
})(eui.Skin);var ReinViewSkin=(function (_super) {
	__extends(ReinViewSkin, _super);
	var ReinViewSkin$Skin121 = 	(function (_super) {
		__extends(ReinViewSkin$Skin121, _super);
		function ReinViewSkin$Skin121() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ReinViewSkin$Skin121.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "rein_title_png";
			t.x = 29;
			t.y = 27;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ReinViewSkin$Skin121;
	})(eui.Skin);

	function ReinViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._curImg_i(),this._nextImg_i(),this._Image2_i(),this._attrTxt_i(),this._fightImg_i(),this._Image3_i(),this._reinBtn_i(),this._reinIcon_i(),this._Group1_i(),this._Group2_i(),this._finishIcon_i()];
	}
	var _proto = ReinViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "common_arrow_png";
		t.x = 326;
		t.y = 123;
		return t;
	};
	_proto._curImg_i = function () {
		var t = new eui.Image();
		this._curImg = t;
		t.source = "rein_level_label_png";
		t.x = 256;
		t.y = 130;
		return t;
	};
	_proto._nextImg_i = function () {
		var t = new eui.Image();
		this._nextImg = t;
		t.source = "rein_level_label_png";
		t.x = 456;
		t.y = 130;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 144;
		t.source = "common_rect_1_png";
		t.width = 164;
		t.x = 543;
		t.y = 190;
		return t;
	};
	_proto._attrTxt_i = function () {
		var t = new Label();
		this._attrTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 136;
		t.lineSpacing = 10;
		t.size = 22;
		t.text = "";
		t.textAlign = "left";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.width = 135;
		t.x = 568;
		t.y = 194;
		return t;
	};
	_proto._fightImg_i = function () {
		var t = new eui.Image();
		this._fightImg = t;
		t.source = "common_fighting_png";
		t.x = 183;
		t.y = 706;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 57;
		t.source = "common_zhanli_png";
		t.width = 102;
		t.x = 225;
		t.y = 713;
		return t;
	};
	_proto._reinBtn_i = function () {
		var t = new Button();
		this._reinBtn = t;
		t.label = "";
		t.x = 241;
		t.y = 1014;
		t.skinName = ReinViewSkin$Skin121;
		return t;
	};
	_proto._reinIcon_i = function () {
		var t = new eui.Image();
		this._reinIcon = t;
		t.source = "common_red_icon_png";
		t.x = 441;
		t.y = 1014;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 457;
		t.width = 128;
		t.x = 28;
		t.y = 187;
		t.elementsContent = [this._box0_i(),this._box1_i(),this._box2_i()];
		return t;
	};
	_proto._box0_i = function () {
		var t = new ReinRewardsBox();
		this._box0 = t;
		t.height = 137;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "ReinRewardsBoxSkin";
		t.width = 128;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._box1_i = function () {
		var t = new ReinRewardsBox();
		this._box1 = t;
		t.height = 137;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "ReinRewardsBoxSkin";
		t.width = 128;
		t.x = 0;
		t.y = 152;
		return t;
	};
	_proto._box2_i = function () {
		var t = new ReinRewardsBox();
		this._box2 = t;
		t.height = 137;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "ReinRewardsBoxSkin";
		t.width = 128;
		t.x = 0;
		t.y = 304;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 164;
		t.width = 672;
		t.x = 24;
		t.y = 796;
		t.elementsContent = [this._cond0_i(),this._cond1_i(),this._cond2_i(),this._cond3_i()];
		return t;
	};
	_proto._cond0_i = function () {
		var t = new ReinConditionItem();
		this._cond0 = t;
		t.height = 80;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "ReinConditionItemSkin";
		t.width = 322;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._cond1_i = function () {
		var t = new ReinConditionItem();
		this._cond1 = t;
		t.height = 80;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "ReinConditionItemSkin";
		t.width = 322;
		t.x = 350;
		t.y = 0;
		return t;
	};
	_proto._cond2_i = function () {
		var t = new ReinConditionItem();
		this._cond2 = t;
		t.height = 80;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "ReinConditionItemSkin";
		t.width = 322;
		t.x = 0;
		t.y = 84;
		return t;
	};
	_proto._cond3_i = function () {
		var t = new ReinConditionItem();
		this._cond3 = t;
		t.height = 80;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "ReinConditionItemSkin";
		t.width = 322;
		t.x = 350;
		t.y = 84;
		return t;
	};
	_proto._finishIcon_i = function () {
		var t = new eui.Image();
		this._finishIcon = t;
		t.source = "common_label_finish_png";
		t.x = 290;
		t.y = 1024;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_curImg","_nextImg","_attrTxt","_fightImg","_reinBtn","_reinIcon","_box0","_box1","_box2","_cond0","_cond1","_cond2","_cond3","_finishIcon"];
		},
		enumerable: true,
		configurable: true
	});
	return ReinViewSkin;
})(eui.Skin);var RenameViewSkin=(function (_super) {
	__extends(RenameViewSkin, _super);
	var RenameViewSkin$Skin122 = 	(function (_super) {
		__extends(RenameViewSkin$Skin122, _super);
		function RenameViewSkin$Skin122() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RenameViewSkin$Skin122.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "confirm_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return RenameViewSkin$Skin122;
	})(eui.Skin);

	function RenameViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._popupView_i(),this._okBtn_i(),this._txt_i(),this._Image1_i(),this._inputTxt_i(),this._loginTxt_i(),this._itemTxt_i(),this._res_i()];
	}
	var _proto = RenameViewSkin.prototype;

	_proto._popupView_i = function () {
		var t = new BasePopUpView();
		this._popupView = t;
		t.percentHeight = 100;
		t.skinName = "BasePopUpSkin";
		t.percentWidth = 100;
		t.y = 0;
		return t;
	};
	_proto._okBtn_i = function () {
		var t = new Button();
		this._okBtn = t;
		t.label = "Button";
		t.x = 241;
		t.y = 669;
		t.skinName = RenameViewSkin$Skin122;
		return t;
	};
	_proto._txt_i = function () {
		var t = new Label();
		this._txt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 30;
		t.text = "请输入新名字：";
		t.textColor = 0x7c6e62;
		t.width = 255;
		t.x = 113.5;
		t.y = 439;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "rename_gaiming_png";
		t.x = 278;
		t.y = 317;
		return t;
	};
	_proto._inputTxt_i = function () {
		var t = new TextInput();
		this._inputTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 66;
		t.skinName = "BaseTextInputSkin";
		t.width = 352;
		t.x = 182;
		t.y = 517;
		return t;
	};
	_proto._loginTxt_i = function () {
		var t = new Label();
		this._loginTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 120;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.verticalAlign = "top";
		t.width = 429;
		t.x = 154;
		t.y = 498;
		return t;
	};
	_proto._itemTxt_i = function () {
		var t = new Label();
		this._itemTxt = t;
		t.anchorOffsetX = 0;
		t.size = 24;
		t.text = "Label";
		t.textColor = 0xffe3ce;
		t.width = 215;
		t.x = 497;
		t.y = 710.5;
		return t;
	};
	_proto._res_i = function () {
		var t = new PlayerResItems();
		this._res = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 36;
		t.width = 192;
		t.x = 479;
		t.y = 681.5;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_popupView","_okBtn","_txt","_inputTxt","_loginTxt","_itemTxt","_res"];
		},
		enumerable: true,
		configurable: true
	});
	return RenameViewSkin;
})(eui.Skin);var ReviveCDViewSkin=(function (_super) {
	__extends(ReviveCDViewSkin, _super);
	function ReviveCDViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
	}
	var _proto = ReviveCDViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "revive_bg_cd_png";
		t.x = 27;
		t.y = 400;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "revive_cd_png";
		t.x = 236;
		t.y = 435;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return [];
		},
		enumerable: true,
		configurable: true
	});
	return ReviveCDViewSkin;
})(eui.Skin);var ReviveChooseViewSkin=(function (_super) {
	__extends(ReviveChooseViewSkin, _super);
	var ReviveChooseViewSkin$Skin123 = 	(function (_super) {
		__extends(ReviveChooseViewSkin$Skin123, _super);
		function ReviveChooseViewSkin$Skin123() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ReviveChooseViewSkin$Skin123.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "revive_free_png";
			t.x = 8;
			t.y = 19;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ReviveChooseViewSkin$Skin123;
	})(eui.Skin);

	var ReviveChooseViewSkin$Skin124 = 	(function (_super) {
		__extends(ReviveChooseViewSkin$Skin124, _super);
		function ReviveChooseViewSkin$Skin124() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ReviveChooseViewSkin$Skin124.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "revive_loss_png";
			t.x = 8;
			t.y = 19;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ReviveChooseViewSkin$Skin124;
	})(eui.Skin);

	function ReviveChooseViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._baseView_i(),this._Image1_i(),this._Image2_i(),this._killerTxt_i(),this._arrowImg_i(),this._differImg_i(),this._stateTxt_i(),this._freeBtn_i(),this._lossBtn_i()];
	}
	var _proto = ReviveChooseViewSkin.prototype;

	_proto._baseView_i = function () {
		var t = new BasePopUpView();
		this._baseView = t;
		t.height = 20;
		t.skinName = "BasePopUpSkin";
		t.width = 20;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "revive_bg_choose_png";
		t.y = 366;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "revive_title_png";
		t.x = 270;
		t.y = 314;
		return t;
	};
	_proto._killerTxt_i = function () {
		var t = new Label();
		this._killerTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.left = 0;
		t.right = 0;
		t.size = 24;
		t.text = "您被摩羯伊妮击杀了";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.x = 0;
		t.y = 396;
		return t;
	};
	_proto._arrowImg_i = function () {
		var t = new eui.Image();
		this._arrowImg = t;
		t.source = "revive_less_fight_png";
		t.x = 203;
		t.y = 551;
		return t;
	};
	_proto._differImg_i = function () {
		var t = new eui.Image();
		this._differImg = t;
		t.source = "revive_label_png";
		t.x = 248;
		t.y = 544;
		return t;
	};
	_proto._stateTxt_i = function () {
		var t = new Label();
		this._stateTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.left = 0;
		t.right = 0;
		t.size = 24;
		t.text = "倒计时后将在中立地区安全区自动复活";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.x = 0;
		t.y = 611;
		return t;
	};
	_proto._freeBtn_i = function () {
		var t = new Button();
		this._freeBtn = t;
		t.height = 90;
		t.label = "";
		t.width = 197;
		t.x = 100;
		t.y = 668;
		t.skinName = ReviveChooseViewSkin$Skin123;
		return t;
	};
	_proto._lossBtn_i = function () {
		var t = new Button();
		this._lossBtn = t;
		t.height = 90;
		t.label = "";
		t.width = 197;
		t.x = 451;
		t.y = 667;
		t.skinName = ReviveChooseViewSkin$Skin124;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_baseView","_killerTxt","_arrowImg","_differImg","_stateTxt","_freeBtn","_lossBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return ReviveChooseViewSkin;
})(eui.Skin);var RoleAttrViewSkin=(function (_super) {
	__extends(RoleAttrViewSkin, _super);
	function RoleAttrViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = RoleAttrViewSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1280;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this._baseView_i(),this._Image1_i(),this._Label1_i(),this._attrName1_i(),this._attrValue1_i(),this._attrName2_i(),this._attrValue2_i(),this._attrName3_i(),this._attrValue3_i(),this._attrName4_i(),this._attrValue4_i(),this._attrName5_i(),this._attrValue5_i(),this._attrName6_i(),this._attrValue6_i(),this._attrName7_i(),this._attrValue7_i(),this._attrName8_i(),this._attrValue8_i(),this._attrAddName1_i(),this._attrAddValue1_i(),this._attrAddName2_i(),this._attrAddValue2_i(),this._attrAddName3_i(),this._attrAddValue3_i(),this._attrAddName4_i(),this._attrAddValue4_i(),this._attrAddName5_i(),this._attrAddValue5_i(),this._attrAddName6_i(),this._attrAddValue6_i(),this._attrAddName7_i(),this._attrAddValue7_i(),this._attrAddName8_i(),this._attrAddValue8_i(),this._attrAddName9_i(),this._attrAddValue9_i(),this._attrAddName10_i(),this._attrAddValue10_i(),this._Image2_i()];
		return t;
	};
	_proto._baseView_i = function () {
		var t = new BasePopUpView();
		this._baseView = t;
		t.height = 1280;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 36;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_title_wordBg_png";
		t.width = 209;
		t.x = 256;
		t.y = 370;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.text = "详细属性";
		t.textColor = 0x7c6e62;
		t.x = 300;
		t.y = 372;
		return t;
	};
	_proto._attrName1_i = function () {
		var t = new Label();
		this._attrName1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 109;
		t.y = 427;
		return t;
	};
	_proto._attrValue1_i = function () {
		var t = new Label();
		this._attrValue1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 236;
		t.y = 427;
		return t;
	};
	_proto._attrName2_i = function () {
		var t = new Label();
		this._attrName2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 416;
		t.y = 427;
		return t;
	};
	_proto._attrValue2_i = function () {
		var t = new Label();
		this._attrValue2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 545;
		t.y = 427;
		return t;
	};
	_proto._attrName3_i = function () {
		var t = new Label();
		this._attrName3 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 110;
		t.y = 463;
		return t;
	};
	_proto._attrValue3_i = function () {
		var t = new Label();
		this._attrValue3 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 237;
		t.y = 464;
		return t;
	};
	_proto._attrName4_i = function () {
		var t = new Label();
		this._attrName4 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 416;
		t.y = 464;
		return t;
	};
	_proto._attrValue4_i = function () {
		var t = new Label();
		this._attrValue4 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 545;
		t.y = 464;
		return t;
	};
	_proto._attrName5_i = function () {
		var t = new Label();
		this._attrName5 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 110;
		t.y = 500;
		return t;
	};
	_proto._attrValue5_i = function () {
		var t = new Label();
		this._attrValue5 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 237;
		t.y = 500;
		return t;
	};
	_proto._attrName6_i = function () {
		var t = new Label();
		this._attrName6 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 416;
		t.y = 500;
		return t;
	};
	_proto._attrValue6_i = function () {
		var t = new Label();
		this._attrValue6 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 545;
		t.y = 501;
		return t;
	};
	_proto._attrName7_i = function () {
		var t = new Label();
		this._attrName7 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 110;
		t.y = 537;
		return t;
	};
	_proto._attrValue7_i = function () {
		var t = new Label();
		this._attrValue7 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 237;
		t.y = 537;
		return t;
	};
	_proto._attrName8_i = function () {
		var t = new Label();
		this._attrName8 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 416;
		t.y = 537;
		return t;
	};
	_proto._attrValue8_i = function () {
		var t = new Label();
		this._attrValue8 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 545;
		t.y = 537;
		return t;
	};
	_proto._attrAddName1_i = function () {
		var t = new Label();
		this._attrAddName1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 110;
		t.y = 579;
		return t;
	};
	_proto._attrAddValue1_i = function () {
		var t = new Label();
		this._attrAddValue1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 236;
		t.y = 579;
		return t;
	};
	_proto._attrAddName2_i = function () {
		var t = new Label();
		this._attrAddName2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 416;
		t.y = 579;
		return t;
	};
	_proto._attrAddValue2_i = function () {
		var t = new Label();
		this._attrAddValue2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 545;
		t.y = 579;
		return t;
	};
	_proto._attrAddName3_i = function () {
		var t = new Label();
		this._attrAddName3 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 109;
		t.y = 614;
		return t;
	};
	_proto._attrAddValue3_i = function () {
		var t = new Label();
		this._attrAddValue3 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 236;
		t.y = 613;
		return t;
	};
	_proto._attrAddName4_i = function () {
		var t = new Label();
		this._attrAddName4 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 416;
		t.y = 614;
		return t;
	};
	_proto._attrAddValue4_i = function () {
		var t = new Label();
		this._attrAddValue4 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 545;
		t.y = 614;
		return t;
	};
	_proto._attrAddName5_i = function () {
		var t = new Label();
		this._attrAddName5 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 110;
		t.y = 650;
		return t;
	};
	_proto._attrAddValue5_i = function () {
		var t = new Label();
		this._attrAddValue5 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 237;
		t.y = 650;
		return t;
	};
	_proto._attrAddName6_i = function () {
		var t = new Label();
		this._attrAddName6 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 416;
		t.y = 650;
		return t;
	};
	_proto._attrAddValue6_i = function () {
		var t = new Label();
		this._attrAddValue6 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 545;
		t.y = 650;
		return t;
	};
	_proto._attrAddName7_i = function () {
		var t = new Label();
		this._attrAddName7 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 110;
		t.y = 686;
		return t;
	};
	_proto._attrAddValue7_i = function () {
		var t = new Label();
		this._attrAddValue7 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 237;
		t.y = 686;
		return t;
	};
	_proto._attrAddName8_i = function () {
		var t = new Label();
		this._attrAddName8 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 417;
		t.y = 686;
		return t;
	};
	_proto._attrAddValue8_i = function () {
		var t = new Label();
		this._attrAddValue8 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 545;
		t.y = 686;
		return t;
	};
	_proto._attrAddName9_i = function () {
		var t = new Label();
		this._attrAddName9 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 109;
		t.y = 719;
		return t;
	};
	_proto._attrAddValue9_i = function () {
		var t = new Label();
		this._attrAddValue9 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 236;
		t.y = 719;
		return t;
	};
	_proto._attrAddName10_i = function () {
		var t = new Label();
		this._attrAddName10 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击";
		t.textColor = 0x7c6e62;
		t.x = 417;
		t.y = 719;
		return t;
	};
	_proto._attrAddValue10_i = function () {
		var t = new Label();
		this._attrAddValue10 = t;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "123456789";
		t.textColor = 0x7c6e62;
		t.x = 545;
		t.y = 720;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 3;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_line_png";
		t.width = 658;
		t.x = 31;
		t.y = 569;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_baseView","_attrName1","_attrValue1","_attrName2","_attrValue2","_attrName3","_attrValue3","_attrName4","_attrValue4","_attrName5","_attrValue5","_attrName6","_attrValue6","_attrName7","_attrValue7","_attrName8","_attrValue8","_attrAddName1","_attrAddValue1","_attrAddName2","_attrAddValue2","_attrAddName3","_attrAddValue3","_attrAddName4","_attrAddValue4","_attrAddName5","_attrAddValue5","_attrAddName6","_attrAddValue6","_attrAddName7","_attrAddValue7","_attrAddName8","_attrAddValue8","_attrAddName9","_attrAddValue9","_attrAddName10","_attrAddValue10"];
		},
		enumerable: true,
		configurable: true
	});
	return RoleAttrViewSkin;
})(eui.Skin);var RoleEquipItemSkin=(function (_super) {
	__extends(RoleEquipItemSkin, _super);
	function RoleEquipItemSkin() {
		_super.call(this);
		
		this.height = 141;
		this.width = 141;
		this.elementsContent = [this.equipItem_i(),this.addImg_i()];
	}
	var _proto = RoleEquipItemSkin.prototype;

	_proto.equipItem_i = function () {
		var t = new EquipItem();
		this.equipItem = t;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.addImg_i = function () {
		var t = new eui.Image();
		this.addImg = t;
		t.horizontalCenter = 0;
		t.source = "role_add_png";
		t.verticalCenter = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["equipItem","addImg"];
		},
		enumerable: true,
		configurable: true
	});
	return RoleEquipItemSkin;
})(eui.Skin);var RolePanelSkin=(function (_super) {
	__extends(RolePanelSkin, _super);
	function RolePanelSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i()];
	}
	var _proto = RolePanelSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.height = 1280;
		t.skinName = "BasePanelSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel"];
		},
		enumerable: true,
		configurable: true
	});
	return RolePanelSkin;
})(eui.Skin);var RoleSkillItemSkin=(function (_super) {
	__extends(RoleSkillItemSkin, _super);
	function RoleSkillItemSkin() {
		_super.call(this);
		
		this.height = 127;
		this.width = 127;
		this.elementsContent = [this._Image1_i(),this._redIcon_i()];
	}
	var _proto = RoleSkillItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 127;
		t.source = "role_skillBg_png";
		t.width = 127;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._redIcon_i = function () {
		var t = new eui.Image();
		this._redIcon = t;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.x = 85;
		t.y = 7;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_redIcon"];
		},
		enumerable: true,
		configurable: true
	});
	return RoleSkillItemSkin;
})(eui.Skin);var RoleViewSkin=(function (_super) {
	__extends(RoleViewSkin, _super);
	var RoleViewSkin$Skin125 = 	(function (_super) {
		__extends(RoleViewSkin$Skin125, _super);
		function RoleViewSkin$Skin125() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RoleViewSkin$Skin125.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return RoleViewSkin$Skin125;
	})(eui.Skin);

	var RoleViewSkin$Skin126 = 	(function (_super) {
		__extends(RoleViewSkin$Skin126, _super);
		function RoleViewSkin$Skin126() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RoleViewSkin$Skin126.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return RoleViewSkin$Skin126;
	})(eui.Skin);

	function RoleViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.skillItem0_i(),this.skillItem1_i(),this.skillItem2_i(),this.skillItem3_i(),this.equipItem1_i(),this.equipItem2_i(),this.equipItem3_i(),this.equipItem4_i(),this.equipItem5_i(),this.equipItem6_i(),this.equipItem7_i(),this.equipItem8_i(),this.fightingImg_i(),this._Image1_i(),this._checkAttrBtn_i(),this._checkAttrImg_i(),this._onekeyEquipBtn_i(),this._onekeyEquipImg_i()];
	}
	var _proto = RoleViewSkin.prototype;

	_proto.skillItem0_i = function () {
		var t = new RoleSkillItem();
		this.skillItem0 = t;
		t.height = 127;
		t.width = 127;
		t.x = 27;
		t.y = 878;
		return t;
	};
	_proto.skillItem1_i = function () {
		var t = new RoleSkillItem();
		this.skillItem1 = t;
		t.height = 127;
		t.width = 127;
		t.x = 178;
		t.y = 951;
		return t;
	};
	_proto.skillItem2_i = function () {
		var t = new RoleSkillItem();
		this.skillItem2 = t;
		t.height = 127;
		t.width = 127;
		t.x = 421;
		t.y = 951;
		return t;
	};
	_proto.skillItem3_i = function () {
		var t = new RoleSkillItem();
		this.skillItem3 = t;
		t.height = 127;
		t.width = 127;
		t.x = 569;
		t.y = 878;
		return t;
	};
	_proto.equipItem1_i = function () {
		var t = new RoleEquipItem();
		this.equipItem1 = t;
		t.height = 141;
		t.left = 0;
		t.width = 141;
		t.y = 170;
		return t;
	};
	_proto.equipItem2_i = function () {
		var t = new RoleEquipItem();
		this.equipItem2 = t;
		t.height = 141;
		t.left = 0;
		t.width = 141;
		t.y = 335;
		return t;
	};
	_proto.equipItem3_i = function () {
		var t = new RoleEquipItem();
		this.equipItem3 = t;
		t.height = 141;
		t.left = 0;
		t.width = 141;
		t.y = 500;
		return t;
	};
	_proto.equipItem4_i = function () {
		var t = new RoleEquipItem();
		this.equipItem4 = t;
		t.height = 141;
		t.left = 0;
		t.width = 141;
		t.y = 665;
		return t;
	};
	_proto.equipItem5_i = function () {
		var t = new RoleEquipItem();
		this.equipItem5 = t;
		t.height = 141;
		t.right = 0;
		t.width = 141;
		t.y = 170;
		return t;
	};
	_proto.equipItem6_i = function () {
		var t = new RoleEquipItem();
		this.equipItem6 = t;
		t.height = 141;
		t.right = 0;
		t.width = 141;
		t.y = 335;
		return t;
	};
	_proto.equipItem7_i = function () {
		var t = new RoleEquipItem();
		this.equipItem7 = t;
		t.height = 141;
		t.right = 0;
		t.width = 141;
		t.y = 500;
		return t;
	};
	_proto.equipItem8_i = function () {
		var t = new RoleEquipItem();
		this.equipItem8 = t;
		t.height = 141;
		t.right = 0;
		t.width = 141;
		t.y = 665;
		return t;
	};
	_proto.fightingImg_i = function () {
		var t = new eui.Image();
		this.fightingImg = t;
		t.source = "common_fighting_png";
		t.x = 173;
		t.y = 774;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 57;
		t.source = "common_zhanli_png";
		t.width = 102;
		t.x = 215;
		t.y = 780;
		return t;
	};
	_proto._checkAttrBtn_i = function () {
		var t = new Button();
		this._checkAttrBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.label = "";
		t.width = 200;
		t.x = 148;
		t.y = 854;
		t.skinName = RoleViewSkin$Skin125;
		return t;
	};
	_proto._checkAttrImg_i = function () {
		var t = new eui.Image();
		this._checkAttrImg = t;
		t.height = 52;
		t.source = "role_checkAttr_png";
		t.width = 181;
		t.x = 157;
		t.y = 867;
		return t;
	};
	_proto._onekeyEquipBtn_i = function () {
		var t = new Button();
		this._onekeyEquipBtn = t;
		t.height = 80;
		t.label = "";
		t.width = 200;
		t.x = 372;
		t.y = 855;
		t.skinName = RoleViewSkin$Skin126;
		return t;
	};
	_proto._onekeyEquipImg_i = function () {
		var t = new eui.Image();
		this._onekeyEquipImg = t;
		t.height = 52;
		t.source = "role_onkeyEquip_png";
		t.width = 181;
		t.x = 381;
		t.y = 869;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["skillItem0","skillItem1","skillItem2","skillItem3","equipItem1","equipItem2","equipItem3","equipItem4","equipItem5","equipItem6","equipItem7","equipItem8","fightingImg","_checkAttrBtn","_checkAttrImg","_onekeyEquipBtn","_onekeyEquipImg"];
		},
		enumerable: true,
		configurable: true
	});
	return RoleViewSkin;
})(eui.Skin);var SelectRoleBtnSkin=(function (_super) {
	__extends(SelectRoleBtnSkin, _super);
	function SelectRoleBtnSkin() {
		_super.call(this);
		
		this.height = 174;
		this.width = 174;
		this.elementsContent = [this.lockImg_i(),this.roleImg_i(),this.roleCareer_i(),this.conditionTxt_i()];
		this._Image1_i();
		this._Image2_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image1","",2,"lockImg")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image2","",2,"lockImg")
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.bgImgNormal"],[0],this._Image1,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.data.bgImgClick"],[0],this._Image2,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.data.lockImg"],[0],this.lockImg,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.data.roleImg"],[0],this.roleImg,"source")
	}
	var _proto = SelectRoleBtnSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lockImg_i = function () {
		var t = new eui.Image();
		this.lockImg = t;
		t.height = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 100;
		return t;
	};
	_proto.roleImg_i = function () {
		var t = new eui.Image();
		this.roleImg = t;
		t.height = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 100;
		return t;
	};
	_proto.roleCareer_i = function () {
		var t = new eui.Image();
		this.roleCareer = t;
		t.height = 40;
		t.right = 0;
		t.top = 0;
		t.width = 50;
		return t;
	};
	_proto.conditionTxt_i = function () {
		var t = new eui.Label();
		this.conditionTxt = t;
		t.right = 0;
		t.text = "四转";
		t.top = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["lockImg","roleImg","roleCareer","conditionTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return SelectRoleBtnSkin;
})(eui.Skin);var ShopBuyViewSkin=(function (_super) {
	__extends(ShopBuyViewSkin, _super);
	var ShopBuyViewSkin$Skin127 = 	(function (_super) {
		__extends(ShopBuyViewSkin$Skin127, _super);
		function ShopBuyViewSkin$Skin127() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ShopBuyViewSkin$Skin127.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "shop_anniu1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 36;
			t.source = "shop_-_png";
			t.width = 26;
			t.x = 30;
			t.y = 18;
			return t;
		};
		_proto._Image3_i = function () {
			var t = new eui.Image();
			t.height = 36;
			t.source = "shop_1_png";
			t.width = 28;
			t.x = 50;
			t.y = 18;
			return t;
		};
		_proto._Image4_i = function () {
			var t = new eui.Image();
			t.height = 36;
			t.source = "shop_0_png";
			t.width = 28;
			t.x = 70;
			t.y = 18;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return ShopBuyViewSkin$Skin127;
	})(eui.Skin);

	var ShopBuyViewSkin$Skin128 = 	(function (_super) {
		__extends(ShopBuyViewSkin$Skin128, _super);
		function ShopBuyViewSkin$Skin128() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ShopBuyViewSkin$Skin128.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "shop_anniu1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 36;
			t.source = "shop_+_png";
			t.width = 26;
			t.x = 30;
			t.y = 18;
			return t;
		};
		_proto._Image3_i = function () {
			var t = new eui.Image();
			t.height = 36;
			t.source = "shop_1_png";
			t.width = 28;
			t.x = 50;
			t.y = 18;
			return t;
		};
		_proto._Image4_i = function () {
			var t = new eui.Image();
			t.height = 36;
			t.source = "shop_0_png";
			t.width = 28;
			t.x = 70;
			t.y = 18;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return ShopBuyViewSkin$Skin128;
	})(eui.Skin);

	var ShopBuyViewSkin$Skin129 = 	(function (_super) {
		__extends(ShopBuyViewSkin$Skin129, _super);
		function ShopBuyViewSkin$Skin129() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ShopBuyViewSkin$Skin129.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "shop_goumai_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return ShopBuyViewSkin$Skin129;
	})(eui.Skin);

	var ShopBuyViewSkin$Skin130 = 	(function (_super) {
		__extends(ShopBuyViewSkin$Skin130, _super);
		function ShopBuyViewSkin$Skin130() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ShopBuyViewSkin$Skin130.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "common__jian_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return ShopBuyViewSkin$Skin130;
	})(eui.Skin);

	var ShopBuyViewSkin$Skin131 = 	(function (_super) {
		__extends(ShopBuyViewSkin$Skin131, _super);
		function ShopBuyViewSkin$Skin131() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ShopBuyViewSkin$Skin131.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "common_jia_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return ShopBuyViewSkin$Skin131;
	})(eui.Skin);

	function ShopBuyViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = ShopBuyViewSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1280;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this._popupView_i(),this._placeTxt_i(),this._goods_i(),this._Image1_i(),this._Image2_i(),this._nameTxt_i(),this._jina10Btn_i(),this._jia10Btn_i(),this._buyBtn_i(),this._jianBtn_i(),this._jiaBtn_i(),this._Image3_i(),this._numTxt_i(),this._res1_i()];
		return t;
	};
	_proto._popupView_i = function () {
		var t = new BasePopUpView();
		this._popupView = t;
		t.percentHeight = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BasePopUpSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._placeTxt_i = function () {
		var t = new Label();
		this._placeTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.rotation = 0.35;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0x7c6e62;
		t.width = 183.03;
		t.x = 405;
		t.y = 463;
		return t;
	};
	_proto._goods_i = function () {
		var t = new Goods();
		this._goods = t;
		t.height = 140;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 269;
		t.y = 368;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "shop_goumai_png";
		t.x = 270;
		t.y = 316;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "shop_goumaizongjia_png";
		t.x = 123;
		t.y = 508;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.rotation = 0.35;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "Label";
		t.textAlign = "left";
		t.width = 203.02;
		t.x = 405;
		t.y = 415;
		return t;
	};
	_proto._jina10Btn_i = function () {
		var t = new Button();
		this._jina10Btn = t;
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 67;
		t.y = 574;
		t.skinName = ShopBuyViewSkin$Skin127;
		return t;
	};
	_proto._jia10Btn_i = function () {
		var t = new Button();
		this._jia10Btn = t;
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 531.63;
		t.y = 574;
		t.skinName = ShopBuyViewSkin$Skin128;
		return t;
	};
	_proto._buyBtn_i = function () {
		var t = new Button();
		this._buyBtn = t;
		t.horizontalCenter = 0;
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 241;
		t.y = 674;
		t.skinName = ShopBuyViewSkin$Skin129;
		return t;
	};
	_proto._jianBtn_i = function () {
		var t = new Button();
		this._jianBtn = t;
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 70;
		t.x = 209;
		t.y = 574;
		t.skinName = ShopBuyViewSkin$Skin130;
		return t;
	};
	_proto._jiaBtn_i = function () {
		var t = new Button();
		this._jiaBtn = t;
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 70;
		t.x = 447.63;
		t.y = 573;
		t.skinName = ShopBuyViewSkin$Skin131;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 45;
		t.scale9Grid = new egret.Rectangle(24,10,60,13);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common__jindudi_png";
		t.width = 144;
		t.x = 293;
		t.y = 585;
		return t;
	};
	_proto._numTxt_i = function () {
		var t = new Label();
		this._numTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 37;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "Label";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 131;
		t.x = 299;
		t.y = 589;
		return t;
	};
	_proto._res1_i = function () {
		var t = new PlayerResItems();
		this._res1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 54;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "PlayerResItemsSkin";
		t.width = 173;
		t.x = 292;
		t.y = 507;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_popupView","_placeTxt","_goods","_nameTxt","_jina10Btn","_jia10Btn","_buyBtn","_jianBtn","_jiaBtn","_numTxt","_res1"];
		},
		enumerable: true,
		configurable: true
	});
	return ShopBuyViewSkin;
})(eui.Skin);var ShopItemSkin=(function (_super) {
	__extends(ShopItemSkin, _super);
	var ShopItemSkin$Skin132 = 	(function (_super) {
		__extends(ShopItemSkin$Skin132, _super);
		function ShopItemSkin$Skin132() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ShopItemSkin$Skin132.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "shop_goumai_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return ShopItemSkin$Skin132;
	})(eui.Skin);

	function ShopItemSkin() {
		_super.call(this);
		
		this.height = 327;
		this.width = 231;
		this.elementsContent = [this._Image1_i(),this._nameTxt_i(),this._tuijianImg_i(),this._buyBtn_i(),this._noStockImg_i(),this._gro1_i(),this._gro2_i(),this._hongImg_i(),this._vipImg_i(),this._agioTxt_i(),this._goods_i()];
	}
	var _proto = ShopItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "shop_di_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.width = 201;
		t.y = 12;
		return t;
	};
	_proto._tuijianImg_i = function () {
		var t = new eui.Image();
		this._tuijianImg = t;
		t.source = "shop_tuijian_png";
		t.x = 0;
		t.y = -3;
		return t;
	};
	_proto._buyBtn_i = function () {
		var t = new Button();
		this._buyBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 78;
		t.label = "Button";
		t.width = 179;
		t.x = 27;
		t.y = 236;
		t.skinName = ShopItemSkin$Skin132;
		return t;
	};
	_proto._noStockImg_i = function () {
		var t = new eui.Image();
		this._noStockImg = t;
		t.horizontalCenter = 0;
		t.source = "shop_yigoumai_png";
		t.y = 236;
		return t;
	};
	_proto._gro1_i = function () {
		var t = new eui.Group();
		this._gro1 = t;
		t.x = 34;
		t.y = 173;
		t.elementsContent = [this._res1_i(),this._priceTxt_i()];
		return t;
	};
	_proto._res1_i = function () {
		var t = new PlayerResItems();
		this._res1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 54;
		t.skinName = "PlayerResItemsSkin";
		t.width = 53;
		t.x = 54;
		t.y = -15;
		return t;
	};
	_proto._priceTxt_i = function () {
		var t = new Label();
		this._priceTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "原价:";
		t.textColor = 0x7c6e62;
		t.x = 3;
		t.y = 0;
		return t;
	};
	_proto._gro2_i = function () {
		var t = new eui.Group();
		this._gro2 = t;
		t.x = 34;
		t.y = 187;
		t.elementsContent = [this._res2_i(),this._currentPriceTxt_i()];
		return t;
	};
	_proto._res2_i = function () {
		var t = new PlayerResItems();
		this._res2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 54;
		t.skinName = "PlayerResItemsSkin";
		t.width = 78;
		t.x = 54;
		t.y = 0;
		return t;
	};
	_proto._currentPriceTxt_i = function () {
		var t = new Label();
		this._currentPriceTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "现价:";
		t.textColor = 0x7C6E62;
		t.x = 3;
		t.y = 12;
		return t;
	};
	_proto._hongImg_i = function () {
		var t = new eui.Image();
		this._hongImg = t;
		t.height = 3;
		t.horizontalCenter = 0;
		t.source = "shop_hong_png";
		t.y = 182;
		return t;
	};
	_proto._vipImg_i = function () {
		var t = new eui.Image();
		this._vipImg = t;
		t.horizontalCenter = 0;
		t.source = "shop_vip_png";
		t.y = 258;
		return t;
	};
	_proto._agioTxt_i = function () {
		var t = new Label();
		this._agioTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.rotation = 314.1;
		t.size = 25;
		t.text = "1扣";
		t.textAlign = "center";
		t.width = 73.62;
		t.x = -4.83;
		t.y = 47.35;
		return t;
	};
	_proto._goods_i = function () {
		var t = new BaseGoods();
		this._goods = t;
		t.height = 141;
		t.horizontalCenter = 0;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.y = 35;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_nameTxt","_tuijianImg","_buyBtn","_noStockImg","_res1","_priceTxt","_gro1","_res2","_currentPriceTxt","_gro2","_hongImg","_vipImg","_agioTxt","_goods"];
		},
		enumerable: true,
		configurable: true
	});
	return ShopItemSkin;
})(eui.Skin);var ShopPanelSkin=(function (_super) {
	__extends(ShopPanelSkin, _super);
	function ShopPanelSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i()];
	}
	var _proto = ShopPanelSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.percentHeight = 100;
		t.skinName = "BasePanelSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel"];
		},
		enumerable: true,
		configurable: true
	});
	return ShopPanelSkin;
})(eui.Skin);var ShortcutButtonSkin=(function (_super) {
	__extends(ShortcutButtonSkin, _super);
	function ShortcutButtonSkin() {
		_super.call(this);
		
		this.maxHeight = 90;
		this.maxWidth = 197;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","common_btn2_2_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ShortcutButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "common_btn2_1_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["labelDisplay","iconDisplay"];
		},
		enumerable: true,
		configurable: true
	});
	return ShortcutButtonSkin;
})(eui.Skin);var SkillGainNewSkin=(function (_super) {
	__extends(SkillGainNewSkin, _super);
	function SkillGainNewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._backImg_i(),this._skillIcon_i()];
	}
	var _proto = SkillGainNewSkin.prototype;

	_proto._backImg_i = function () {
		var t = new eui.Image();
		this._backImg = t;
		t.source = "skill_gain_new_back_png";
		t.x = 50;
		t.y = 528;
		return t;
	};
	_proto._skillIcon_i = function () {
		var t = new BitmapRemote();
		this._skillIcon = t;
		t.height = 86;
		t.width = 86;
		t.x = 323;
		t.y = 552;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_backImg","_skillIcon"];
		},
		enumerable: true,
		configurable: true
	});
	return SkillGainNewSkin;
})(eui.Skin);var SkillListItemSkin=(function (_super) {
	__extends(SkillListItemSkin, _super);
	function SkillListItemSkin() {
		_super.call(this);
		
		this.height = 145;
		this.width = 238;
		this.elementsContent = [this.grid_i(),this._nameTxt_i(),this._lvlTxt_i(),this._upgradeIcon_i()];
		this._Image1_i();
		this._Image2_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image1","",0,"")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image2","",2,"grid")
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.normalImg"],[0],this._Image1,"source")
		eui.Binding.$bindProperties(this, ["hostComponent.data.clickImg"],[0],this._Image2,"source")
	}
	var _proto = SkillListItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.height = 142;
		t.scale9Grid = new egret.Rectangle(29,11,181,69);
		t.percentWidth = 100;
		t.y = 3;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.height = 142;
		t.scale9Grid = new egret.Rectangle(29,11,181,69);
		t.percentWidth = 100;
		t.y = 3;
		return t;
	};
	_proto.grid_i = function () {
		var t = new SkillGrid();
		this.grid = t;
		t.height = 111;
		t.skinName = "SkillGridSkin";
		t.width = 111;
		t.x = 15;
		t.y = 18;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new eui.Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "绝代风华";
		t.textAlign = "left";
		t.textColor = 0x7c6e62;
		t.width = 100;
		t.x = 130;
		t.y = 31;
		return t;
	};
	_proto._lvlTxt_i = function () {
		var t = new eui.Label();
		this._lvlTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "Lv：140";
		t.textAlign = "left";
		t.textColor = 0x7c6e62;
		t.x = 130;
		t.y = 88;
		return t;
	};
	_proto._upgradeIcon_i = function () {
		var t = new eui.Image();
		this._upgradeIcon = t;
		t.source = "common_red_icon_png";
		t.x = 210;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["grid","_nameTxt","_lvlTxt","_upgradeIcon"];
		},
		enumerable: true,
		configurable: true
	});
	return SkillListItemSkin;
})(eui.Skin);var SkillMarkSkin=(function (_super) {
	__extends(SkillMarkSkin, _super);
	function SkillMarkSkin() {
		_super.call(this);
		
		this.height = 156;
		this.width = 144;
		this.elementsContent = [this._lockBack_i(),this._normalBack_i(),this._skillIcon_i(),this._addIcon_i(),this._Image1_i(),this._nameTxt_i(),this._bubble_i()];
	}
	var _proto = SkillMarkSkin.prototype;

	_proto._lockBack_i = function () {
		var t = new eui.Image();
		this._lockBack = t;
		t.height = 174;
		t.source = "common_roleKuang_lock_png";
		t.width = 174;
		t.x = -15;
		t.y = -9;
		return t;
	};
	_proto._normalBack_i = function () {
		var t = new eui.Image();
		this._normalBack = t;
		t.height = 174;
		t.source = "common_roleKuang_normal_png";
		t.width = 174;
		t.x = -15;
		t.y = -9;
		return t;
	};
	_proto._skillIcon_i = function () {
		var t = new eui.Image();
		this._skillIcon = t;
		t.height = 115;
		t.width = 115;
		t.x = 14.5;
		t.y = 17.5;
		return t;
	};
	_proto._addIcon_i = function () {
		var t = new eui.Image();
		this._addIcon = t;
		t.source = "role_add_png";
		t.x = 40;
		t.y = 45;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "common_back2_png";
		t.x = 2;
		t.y = 114;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 20;
		t.text = "绝命风华";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.width = 144;
		t.x = 0;
		t.y = 123;
		return t;
	};
	_proto._bubble_i = function () {
		var t = new BubbleView();
		this._bubble = t;
		t.height = 44;
		t.skinName = "BubbleViewSkin";
		t.width = 43;
		t.x = 88;
		t.y = 9;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_lockBack","_normalBack","_skillIcon","_addIcon","_nameTxt","_bubble"];
		},
		enumerable: true,
		configurable: true
	});
	return SkillMarkSkin;
})(eui.Skin);var SkillPanelSkin=(function (_super) {
	__extends(SkillPanelSkin, _super);
	function SkillPanelSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i()];
	}
	var _proto = SkillPanelSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.percentHeight = 100;
		t.skinName = "BasePanelSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel"];
		},
		enumerable: true,
		configurable: true
	});
	return SkillPanelSkin;
})(eui.Skin);var SkillTipsSkin=(function (_super) {
	__extends(SkillTipsSkin, _super);
	var SkillTipsSkin$Skin133 = 	(function (_super) {
		__extends(SkillTipsSkin$Skin133, _super);
		function SkillTipsSkin$Skin133() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SkillTipsSkin$Skin133.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "common_tip_close_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return SkillTipsSkin$Skin133;
	})(eui.Skin);

	var SkillTipsSkin$Skin134 = 	(function (_super) {
		__extends(SkillTipsSkin$Skin134, _super);
		function SkillTipsSkin$Skin134() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SkillTipsSkin$Skin134.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "skill_label2_png";
			t.x = 8;
			t.y = 19;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return SkillTipsSkin$Skin134;
	})(eui.Skin);

	var SkillTipsSkin$Skin135 = 	(function (_super) {
		__extends(SkillTipsSkin$Skin135, _super);
		function SkillTipsSkin$Skin135() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SkillTipsSkin$Skin135.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "common_active_png";
			t.x = 8;
			t.y = 19;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return SkillTipsSkin$Skin135;
	})(eui.Skin);

	var SkillTipsSkin$Skin136 = 	(function (_super) {
		__extends(SkillTipsSkin$Skin136, _super);
		function SkillTipsSkin$Skin136() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SkillTipsSkin$Skin136.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "tips_items_tubiao1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "tips_items_tuijian_png";
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return SkillTipsSkin$Skin136;
	})(eui.Skin);

	var SkillTipsSkin$Skin137 = 	(function (_super) {
		__extends(SkillTipsSkin$Skin137, _super);
		function SkillTipsSkin$Skin137() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SkillTipsSkin$Skin137.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "tips_items_tubiao1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return SkillTipsSkin$Skin137;
	})(eui.Skin);

	var SkillTipsSkin$Skin138 = 	(function (_super) {
		__extends(SkillTipsSkin$Skin138, _super);
		function SkillTipsSkin$Skin138() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SkillTipsSkin$Skin138.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "tips_items_tubiao1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "tips_items_tuijian_png";
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return SkillTipsSkin$Skin138;
	})(eui.Skin);

	function SkillTipsSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._back_i(),this._Image1_i(),this._titleTxt_i(),this._lossItem_i(),this._fightTxt_i(),this._awakeTxt_i(),this._Image2_i(),this._descTxt_i(),this._Image3_i(),this._closeBtn_i(),this._awakeBtn_i(),this._actBtn_i(),this._actIcon_i(),this._goShopG_i()];
	}
	var _proto = SkillTipsSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.height = 484;
		t.scale9Grid = new egret.Rectangle(58,59,102,100);
		t.source = "common_tipsBg_png";
		t.width = 406;
		t.x = 180;
		t.y = 463;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "common_title_wordBg_png";
		t.x = 279;
		t.y = 485;
		return t;
	};
	_proto._titleTxt_i = function () {
		var t = new Label();
		this._titleTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "绝命风华";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 406;
		t.x = 180;
		t.y = 491;
		return t;
	};
	_proto._lossItem_i = function () {
		var t = new BaseGoods();
		this._lossItem = t;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 200;
		t.y = 510;
		return t;
	};
	_proto._fightTxt_i = function () {
		var t = new Label();
		this._fightTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "战力：";
		t.textColor = 0x7c6e62;
		t.width = 230;
		t.x = 330;
		t.y = 530;
		return t;
	};
	_proto._awakeTxt_i = function () {
		var t = new Label();
		this._awakeTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "觉醒：";
		t.textColor = 0x7c6e62;
		t.width = 230;
		t.x = 330;
		t.y = 565;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "split_line_png";
		t.width = 400;
		t.x = 183;
		t.y = 637;
		return t;
	};
	_proto._descTxt_i = function () {
		var t = new Label();
		this._descTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 20;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.width = 333;
		t.x = 217;
		t.y = 644;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "split_line_png";
		t.width = 400;
		t.x = 183;
		t.y = 704;
		return t;
	};
	_proto._closeBtn_i = function () {
		var t = new Button();
		this._closeBtn = t;
		t.label = "";
		t.x = 544;
		t.y = 464;
		t.skinName = SkillTipsSkin$Skin133;
		return t;
	};
	_proto._awakeBtn_i = function () {
		var t = new Button();
		this._awakeBtn = t;
		t.height = 90;
		t.label = "";
		t.width = 197;
		t.x = 285;
		t.y = 717;
		t.skinName = SkillTipsSkin$Skin134;
		return t;
	};
	_proto._actBtn_i = function () {
		var t = new Button();
		this._actBtn = t;
		t.height = 90;
		t.label = "";
		t.width = 197;
		t.x = 285;
		t.y = 717;
		t.skinName = SkillTipsSkin$Skin135;
		return t;
	};
	_proto._actIcon_i = function () {
		var t = new eui.Image();
		this._actIcon = t;
		t.source = "skill_sign_hasAct_png";
		t.x = 318;
		t.y = 725;
		return t;
	};
	_proto._goShopG_i = function () {
		var t = new eui.Group();
		this._goShopG = t;
		t.height = 190;
		t.width = 406;
		t.x = 180;
		t.y = 707;
		t.elementsContent = [this._Image4_i(),this._shopBtn0_i(),this._shopBtn1_i(),this._shopBtn2_i(),this._Label1_i(),this._Label2_i(),this._Label3_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "tips_items_huoqutuj_png";
		t.x = 148;
		t.y = 5;
		return t;
	};
	_proto._shopBtn0_i = function () {
		var t = new Button();
		this._shopBtn0 = t;
		t.label = "";
		t.x = 15;
		t.y = 45;
		t.skinName = SkillTipsSkin$Skin136;
		return t;
	};
	_proto._shopBtn1_i = function () {
		var t = new Button();
		this._shopBtn1 = t;
		t.label = "";
		t.x = 142;
		t.y = 45;
		t.skinName = SkillTipsSkin$Skin137;
		return t;
	};
	_proto._shopBtn2_i = function () {
		var t = new Button();
		this._shopBtn2 = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 269;
		t.y = 45;
		t.skinName = SkillTipsSkin$Skin138;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "神秘商店";
		t.textColor = 0x7c6e62;
		t.x = 28;
		t.y = 160;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "神秘商店";
		t.textColor = 0x7C6E62;
		t.x = 155;
		t.y = 160;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "神秘商店";
		t.textColor = 0x7C6E62;
		t.x = 282;
		t.y = 160;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_titleTxt","_lossItem","_fightTxt","_awakeTxt","_descTxt","_closeBtn","_awakeBtn","_actBtn","_actIcon","_shopBtn0","_shopBtn1","_shopBtn2","_goShopG"];
		},
		enumerable: true,
		configurable: true
	});
	return SkillTipsSkin;
})(eui.Skin);var SkillViewSkin=(function (_super) {
	__extends(SkillViewSkin, _super);
	var SkillViewSkin$Skin139 = 	(function (_super) {
		__extends(SkillViewSkin$Skin139, _super);
		function SkillViewSkin$Skin139() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SkillViewSkin$Skin139.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "skill_btn_upgrade_png";
			t.x = 29;
			t.y = 27;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return SkillViewSkin$Skin139;
	})(eui.Skin);

	var SkillViewSkin$Skin140 = 	(function (_super) {
		__extends(SkillViewSkin$Skin140, _super);
		function SkillViewSkin$Skin140() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SkillViewSkin$Skin140.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "skill_btn_all_upgrade_png";
			t.x = 29;
			t.y = 27;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return SkillViewSkin$Skin140;
	})(eui.Skin);

	function SkillViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._skillList_i(),this._Image2_i(),this._weaponList_i(),this._Image3_i(),this._Image4_i(),this._fightImg_i(),this._Image5_i(),this._Image6_i(),this._effTxt_i(),this._Image7_i(),this._desc1Txt_i(),this._Image8_i(),this._desc2Txt_i(),this._Image9_i(),this._desc3Txt_i(),this._upgradeBtn_i(),this._upgradeIcon_i(),this._allUpBtn_i(),this._allUpIcon_i(),this._mark0_i(),this._mark1_i(),this._mark2_i(),this._mark3_i()];
	}
	var _proto = SkillViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 859;
		t.source = "common_pnl_back2_png";
		t.x = 5;
		t.y = 122;
		return t;
	};
	_proto._skillList_i = function () {
		var t = new BaseVScrollerList();
		this._skillList = t;
		t.height = 859;
		t.width = 248;
		t.x = 5;
		t.y = 122;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 857;
		t.left = 255;
		t.right = 5;
		t.source = "common_pnl_back1_png";
		t.y = 125;
		return t;
	};
	_proto._weaponList_i = function () {
		var t = new BaseHScrollerList();
		this._weaponList = t;
		t.height = 174;
		t.visible = false;
		t.width = 480;
		t.x = 120;
		t.y = 100;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 211;
		t.scale9Grid = new egret.Rectangle(12,12,78,78);
		t.source = "skill_back2_png";
		t.width = 459;
		t.x = 255;
		t.y = 755;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "skill_mark_back_png";
		t.x = 252;
		t.y = 186;
		return t;
	};
	_proto._fightImg_i = function () {
		var t = new eui.Image();
		this._fightImg = t;
		t.source = "common_fighting_png";
		t.x = 279;
		t.y = 641;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 57;
		t.source = "common_zhanli_png";
		t.width = 102;
		t.x = 321;
		t.y = 647;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "skill_label1_png";
		t.x = 244;
		t.y = 767;
		return t;
	};
	_proto._effTxt_i = function () {
		var t = new Label();
		this._effTxt = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 61;
		t.size = 24;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.verticalAlign = "middle";
		t.width = 437;
		t.x = 263;
		t.y = 824;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "skill_back1_png";
		t.x = 262;
		t.y = 905;
		return t;
	};
	_proto._desc1Txt_i = function () {
		var t = new Label();
		this._desc1Txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 34;
		t.size = 20;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.verticalAlign = "middle";
		t.width = 142;
		t.x = 262;
		t.y = 905;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "skill_back1_png";
		t.x = 415;
		t.y = 905;
		return t;
	};
	_proto._desc2Txt_i = function () {
		var t = new Label();
		this._desc2Txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 34;
		t.size = 20;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.verticalAlign = "middle";
		t.width = 142;
		t.x = 415;
		t.y = 905;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "skill_back1_png";
		t.x = 567;
		t.y = 905;
		return t;
	};
	_proto._desc3Txt_i = function () {
		var t = new Label();
		this._desc3Txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 34;
		t.size = 20;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.verticalAlign = "middle";
		t.width = 142;
		t.x = 567;
		t.y = 905;
		return t;
	};
	_proto._upgradeBtn_i = function () {
		var t = new Button();
		this._upgradeBtn = t;
		t.height = 105;
		t.label = "";
		t.width = 238;
		t.x = 421;
		t.y = 1022;
		t.skinName = SkillViewSkin$Skin139;
		return t;
	};
	_proto._upgradeIcon_i = function () {
		var t = new eui.Image();
		this._upgradeIcon = t;
		t.source = "common_red_icon_png";
		t.touchEnabled = false;
		t.x = 620.5;
		t.y = 1022.5;
		return t;
	};
	_proto._allUpBtn_i = function () {
		var t = new Button();
		this._allUpBtn = t;
		t.height = 105;
		t.label = "";
		t.width = 238;
		t.x = 61;
		t.y = 1022;
		t.skinName = SkillViewSkin$Skin140;
		return t;
	};
	_proto._allUpIcon_i = function () {
		var t = new eui.Image();
		this._allUpIcon = t;
		t.source = "common_red_icon_png";
		t.touchEnabled = false;
		t.x = 264;
		t.y = 1022.5;
		return t;
	};
	_proto._mark0_i = function () {
		var t = new SkillMarkGrid();
		this._mark0 = t;
		t.height = 156;
		t.skinName = "SkillMarkSkin";
		t.width = 144;
		t.x = 416;
		t.y = 315;
		return t;
	};
	_proto._mark1_i = function () {
		var t = new SkillMarkGrid();
		this._mark1 = t;
		t.height = 156;
		t.skinName = "SkillMarkSkin";
		t.width = 144;
		t.x = 416;
		t.y = 315;
		return t;
	};
	_proto._mark2_i = function () {
		var t = new SkillMarkGrid();
		this._mark2 = t;
		t.height = 156;
		t.skinName = "SkillMarkSkin";
		t.width = 144;
		t.x = 416;
		t.y = 315;
		return t;
	};
	_proto._mark3_i = function () {
		var t = new SkillMarkGrid();
		this._mark3 = t;
		t.height = 156;
		t.skinName = "SkillMarkSkin";
		t.width = 144;
		t.x = 416;
		t.y = 315;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_skillList","_weaponList","_fightImg","_effTxt","_desc1Txt","_desc2Txt","_desc3Txt","_upgradeBtn","_upgradeIcon","_allUpBtn","_allUpIcon","_mark0","_mark1","_mark2","_mark3"];
		},
		enumerable: true,
		configurable: true
	});
	return SkillViewSkin;
})(eui.Skin);var SoldierItemSkin=(function (_super) {
	__extends(SoldierItemSkin, _super);
	function SoldierItemSkin() {
		_super.call(this);
		
		this.height = 142;
		this.width = 242;
		this.elementsContent = [this._diImg_i(),this._effGup_i(),this._goods_i(),this._starGup_i(),this._nameTxt_i(),this._condTxt_i(),this._dangqianImg_i(),this._redIcon_i()];
	}
	var _proto = SoldierItemSkin.prototype;

	_proto._diImg_i = function () {
		var t = new eui.Image();
		this._diImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 136;
		t.scale9Grid = new egret.Rectangle(29,11,181,69);
		t.source = "common_bg1_normal_png";
		t.width = 238;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto._effGup_i = function () {
		var t = new eui.Group();
		this._effGup = t;
		t.x = 1;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 136;
		t.scale9Grid = new egret.Rectangle(11,12,22,17);
		t.source = "common_xuanzhong1_png";
		t.width = 238;
		t.x = 1;
		t.y = 2;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 139;
		t.scale9Grid = new egret.Rectangle(13,13,84,84);
		t.source = "common_di_png";
		t.width = 240;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._goods_i = function () {
		var t = new Goods();
		this._goods = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = -6;
		t.y = -3;
		return t;
	};
	_proto._starGup_i = function () {
		var t = new eui.Group();
		this._starGup = t;
		t.x = 123;
		t.y = 79;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this._star1_i(),this._Image5_i(),this._star2_i(),this._Image6_i(),this._star3_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(24,10,60,13);
		t.source = "common__jindudi_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "common_star_grey_png";
		t.x = 3;
		t.y = 0;
		return t;
	};
	_proto._star1_i = function () {
		var t = new eui.Image();
		this._star1 = t;
		t.source = "common_star_bright_png";
		t.visible = false;
		t.x = 3;
		t.y = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "common_star_grey_png";
		t.x = 33;
		t.y = 0;
		return t;
	};
	_proto._star2_i = function () {
		var t = new eui.Image();
		this._star2 = t;
		t.source = "common_star_bright_png";
		t.visible = false;
		t.x = 33;
		t.y = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "common_star_grey_png";
		t.x = 66;
		t.y = 0;
		return t;
	};
	_proto._star3_i = function () {
		var t = new eui.Image();
		this._star3 = t;
		t.source = "common_star_bright_png";
		t.visible = false;
		t.x = 66;
		t.y = 0;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "";
		t.textColor = 0x7c6e62;
		t.width = 116;
		t.x = 122;
		t.y = 34;
		return t;
	};
	_proto._condTxt_i = function () {
		var t = new Label();
		this._condTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 33;
		t.text = "";
		t.textColor = 0x7c6e62;
		t.width = 116;
		t.x = 122;
		t.y = 79;
		return t;
	};
	_proto._dangqianImg_i = function () {
		var t = new eui.Image();
		this._dangqianImg = t;
		t.source = "common_dangqian_png";
		t.visible = false;
		t.x = 1;
		t.y = 2;
		return t;
	};
	_proto._redIcon_i = function () {
		var t = new eui.Image();
		this._redIcon = t;
		t.source = "common_red_icon_png";
		t.visible = false;
		t.x = 202;
		t.y = 3;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_diImg","_effGup","_goods","_star1","_star2","_star3","_starGup","_nameTxt","_condTxt","_dangqianImg","_redIcon"];
		},
		enumerable: true,
		configurable: true
	});
	return SoldierItemSkin;
})(eui.Skin);var SoldierViewSkin=(function (_super) {
	__extends(SoldierViewSkin, _super);
	var SoldierViewSkin$Skin141 = 	(function (_super) {
		__extends(SoldierViewSkin$Skin141, _super);
		function SoldierViewSkin$Skin141() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SoldierViewSkin$Skin141.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return SoldierViewSkin$Skin141;
	})(eui.Skin);

	var SoldierViewSkin$Skin142 = 	(function (_super) {
		__extends(SoldierViewSkin$Skin142, _super);
		function SoldierViewSkin$Skin142() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SoldierViewSkin$Skin142.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return SoldierViewSkin$Skin142;
	})(eui.Skin);

	function SoldierViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._scroller_i(),this._Image2_i(),this._ditImg_i(),this._Image3_i(),this._nameTxt_i(),this._nameImg_i(),this._Image4_i(),this._Image5_i(),this._star1_i(),this._Image6_i(),this._star2_i(),this._Image7_i(),this._star3_i(),this._fightImg_i(),this._Image8_i(),this._Image9_i(),this._attrTxt1_i(),this._attrTxt2_i(),this._attrTxt3_i(),this._Image10_i(),this._Image11_i(),this._goods_i(),this._numTxt_i(),this._putonBtn_i(),this._activeBtn_i(),this._actImg_i(),this._putonImg_i(),this._takeoffImg_i(),this._upgradeImg_i()];
	}
	var _proto = SoldierViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 853;
		t.source = "common_pnl_back2_png";
		t.width = 244;
		t.x = 6;
		t.y = 124;
		return t;
	};
	_proto._scroller_i = function () {
		var t = new BaseVScrollerList();
		this._scroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 845;
		t.width = 242;
		t.x = 8;
		t.y = 127;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 853;
		t.scale9Grid = new egret.Rectangle(32,102,19,613);
		t.source = "common_pnl_back1_png";
		t.width = 465;
		t.x = 250;
		t.y = 124;
		return t;
	};
	_proto._ditImg_i = function () {
		var t = new eui.Image();
		this._ditImg = t;
		t.anchorOffsetX = 0;
		t.source = "cloak_di3_png";
		t.width = 454;
		t.x = 255;
		t.y = 127;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "common_name_back_png";
		t.x = 256;
		t.y = 158;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 210;
		t.size = 33;
		t.text = "";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 37;
		t.x = 280;
		t.y = 197;
		return t;
	};
	_proto._nameImg_i = function () {
		var t = new eui.Image();
		this._nameImg = t;
		t.height = 170;
		t.width = 52;
		t.x = 273;
		t.y = 211;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "common_fighting_png";
		t.x = 264;
		t.y = 669;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "common_star_grey_png";
		t.x = 429;
		t.y = 146;
		return t;
	};
	_proto._star1_i = function () {
		var t = new eui.Image();
		this._star1 = t;
		t.source = "common_star_bright_png";
		t.visible = false;
		t.x = 429;
		t.y = 146;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "common_star_grey_png";
		t.x = 470;
		t.y = 146;
		return t;
	};
	_proto._star2_i = function () {
		var t = new eui.Image();
		this._star2 = t;
		t.source = "common_star_bright_png";
		t.visible = false;
		t.x = 470;
		t.y = 146;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "common_star_grey_png";
		t.x = 510;
		t.y = 146;
		return t;
	};
	_proto._star3_i = function () {
		var t = new eui.Image();
		this._star3 = t;
		t.source = "common_star_bright_png";
		t.visible = false;
		t.x = 511;
		t.y = 146;
		return t;
	};
	_proto._fightImg_i = function () {
		var t = new eui.Image();
		this._fightImg = t;
		t.source = "common_zhanli_png";
		t.x = 327;
		t.y = 677;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 190;
		t.scale9Grid = new egret.Rectangle(10,10,63,65);
		t.source = "common_di2_png";
		t.width = 226;
		t.x = 255;
		t.y = 760;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "cloak_shuxingjc_png";
		t.x = 269;
		t.y = 767;
		return t;
	};
	_proto._attrTxt1_i = function () {
		var t = new Label();
		this._attrTxt1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 34;
		t.text = "";
		t.textAlign = "left";
		t.textColor = 0x7c6e62;
		t.width = 205;
		t.x = 275;
		t.y = 823;
		return t;
	};
	_proto._attrTxt2_i = function () {
		var t = new Label();
		this._attrTxt2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 34;
		t.text = "";
		t.textAlign = "left";
		t.textColor = 0x7c6e62;
		t.width = 207;
		t.x = 275;
		t.y = 860;
		return t;
	};
	_proto._attrTxt3_i = function () {
		var t = new Label();
		this._attrTxt3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 34;
		t.text = "";
		t.textAlign = "left";
		t.textColor = 0x7c6e62;
		t.width = 207;
		t.x = 275;
		t.y = 897;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 190;
		t.scale9Grid = new egret.Rectangle(10,10,63,65);
		t.source = "common_di2_png";
		t.width = 226;
		t.x = 484.36;
		t.y = 760;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.source = "cloak_suoxucl_png";
		t.x = 500;
		t.y = 768;
		return t;
	};
	_proto._goods_i = function () {
		var t = new BaseGoods();
		this._goods = t;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 529.86;
		t.y = 807;
		return t;
	};
	_proto._numTxt_i = function () {
		var t = new Label();
		this._numTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 25;
		t.text = "";
		t.textAlign = "right";
		t.width = 63;
		t.x = 576;
		t.y = 893;
		return t;
	};
	_proto._putonBtn_i = function () {
		var t = new Button();
		this._putonBtn = t;
		t.label = "Button";
		t.x = 73;
		t.y = 1010;
		t.skinName = SoldierViewSkin$Skin141;
		return t;
	};
	_proto._activeBtn_i = function () {
		var t = new Button();
		this._activeBtn = t;
		t.label = "Button";
		t.x = 420;
		t.y = 1013;
		t.skinName = SoldierViewSkin$Skin142;
		return t;
	};
	_proto._actImg_i = function () {
		var t = new eui.Image();
		this._actImg = t;
		t.source = "common_active_png";
		t.x = 449;
		t.y = 1038;
		return t;
	};
	_proto._putonImg_i = function () {
		var t = new eui.Image();
		this._putonImg = t;
		t.source = "common_label_png";
		t.x = 101;
		t.y = 1037;
		return t;
	};
	_proto._takeoffImg_i = function () {
		var t = new eui.Image();
		this._takeoffImg = t;
		t.source = "common_takeoff_label_png";
		t.x = 102;
		t.y = 1038;
		return t;
	};
	_proto._upgradeImg_i = function () {
		var t = new eui.Image();
		this._upgradeImg = t;
		t.source = "common_upgrade_label_png";
		t.x = 450;
		t.y = 1039;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_scroller","_ditImg","_nameTxt","_nameImg","_star1","_star2","_star3","_fightImg","_attrTxt1","_attrTxt2","_attrTxt3","_goods","_numTxt","_putonBtn","_activeBtn","_actImg","_putonImg","_takeoffImg","_upgradeImg"];
		},
		enumerable: true,
		configurable: true
	});
	return SoldierViewSkin;
})(eui.Skin);var SysChargeItemSkin=(function (_super) {
	__extends(SysChargeItemSkin, _super);
	function SysChargeItemSkin() {
		_super.call(this);
		
		this.height = 276;
		this.width = 354;
		this.elementsContent = [this._Image1_i(),this._kuangImg_i(),this._Image2_i(),this._goldBgImg_i(),this._largessGroup_i(),this._goldTxt_i(),this._moneyTxt_i(),this._chargeGroup_i()];
	}
	var _proto = SysChargeItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "sysCharge_kuang2_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._kuangImg_i = function () {
		var t = new eui.Image();
		this._kuangImg = t;
		t.source = "sysCharge_kuang_png";
		t.visible = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "playRes_gold_54_png";
		t.x = 109;
		t.y = 16;
		return t;
	};
	_proto._goldBgImg_i = function () {
		var t = new eui.Image();
		this._goldBgImg = t;
		t.source = "sysCharge_yuanbao1_png";
		t.x = 81;
		t.y = 58;
		return t;
	};
	_proto._largessGroup_i = function () {
		var t = new eui.Group();
		this._largessGroup = t;
		t.x = 226;
		t.y = 96;
		t.elementsContent = [this._Image3_i(),this._goldTxt0_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "sysCharge_zengsong_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._goldTxt0_i = function () {
		var t = new Label();
		this._goldTxt0 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "1";
		t.textAlign = "center";
		t.width = 99;
		t.x = 2;
		t.y = 56;
		return t;
	};
	_proto._goldTxt_i = function () {
		var t = new Label();
		this._goldTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = " ";
		t.width = 100;
		t.x = 160;
		t.y = 33;
		return t;
	};
	_proto._moneyTxt_i = function () {
		var t = new Label();
		this._moneyTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.text = "1元";
		t.textAlign = "center";
		t.width = 204;
		t.y = 227;
		return t;
	};
	_proto._chargeGroup_i = function () {
		var t = new eui.Group();
		this._chargeGroup = t;
		t.x = 6;
		t.y = 6;
		t.elementsContent = [this._Image4_i(),this._czImg_i(),this._perImg_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "sysCharge_dikuang_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._czImg_i = function () {
		var t = new eui.Image();
		this._czImg = t;
		t.source = "sysCharge_cz_png";
		t.x = 20;
		t.y = 40;
		return t;
	};
	_proto._perImg_i = function () {
		var t = new eui.Image();
		this._perImg = t;
		t.source = "sysCharge_per_png";
		t.x = 41;
		t.y = 117;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_kuangImg","_goldBgImg","_goldTxt0","_largessGroup","_goldTxt","_moneyTxt","_czImg","_perImg","_chargeGroup"];
		},
		enumerable: true,
		configurable: true
	});
	return SysChargeItemSkin;
})(eui.Skin);var SysChargePanelSkin=(function (_super) {
	__extends(SysChargePanelSkin, _super);
	var SysChargePanelSkin$Skin143 = 	(function (_super) {
		__extends(SysChargePanelSkin$Skin143, _super);
		function SysChargePanelSkin$Skin143() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","main_VIP_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SysChargePanelSkin$Skin143.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "main_VIP_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 20;
			t.source = "main_vipImg_png";
			t.width = 30;
			t.x = 23;
			t.y = 43;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return SysChargePanelSkin$Skin143;
	})(eui.Skin);

	var SysChargePanelSkin$Skin144 = 	(function (_super) {
		__extends(SysChargePanelSkin$Skin144, _super);
		function SysChargePanelSkin$Skin144() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SysChargePanelSkin$Skin144.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "common_tequan_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return SysChargePanelSkin$Skin144;
	})(eui.Skin);

	function SysChargePanelSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i(),this._vipBtn_i(),this._tequanBtn_i(),this._nextTxt_i(),this._vipTxt_i(),this._yuanImg_i(),this._maxVipTxt_i(),this._Image1_i()];
	}
	var _proto = SysChargePanelSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.percentHeight = 100;
		t.skinName = "BasePanelSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._vipBtn_i = function () {
		var t = new Button();
		this._vipBtn = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 43;
		t.y = 248;
		t.skinName = SysChargePanelSkin$Skin143;
		return t;
	};
	_proto._tequanBtn_i = function () {
		var t = new Button();
		this._tequanBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 98;
		t.label = "Button";
		t.width = 217;
		t.x = 492;
		t.y = 232;
		t.skinName = SysChargePanelSkin$Skin144;
		return t;
	};
	_proto._nextTxt_i = function () {
		var t = new Label();
		this._nextTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 32;
		t.text = "再充";
		t.width = 63;
		t.x = 457;
		t.y = 334;
		return t;
	};
	_proto._vipTxt_i = function () {
		var t = new Label();
		this._vipTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 32;
		t.text = "成为VIP1";
		t.textAlign = "left";
		t.width = 144;
		t.x = 589;
		t.y = 335;
		return t;
	};
	_proto._yuanImg_i = function () {
		var t = new eui.Image();
		this._yuanImg = t;
		t.source = "sysCharge_yuan_png";
		t.x = 553;
		t.y = 331;
		return t;
	};
	_proto._maxVipTxt_i = function () {
		var t = new Label();
		this._maxVipTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 32;
		t.text = "";
		t.textAlign = "center";
		t.width = 202;
		t.x = 501;
		t.y = 335;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scale9Grid = new egret.Rectangle(24,10,60,13);
		t.source = "common__jindudi_png";
		t.width = 312;
		t.x = 162;
		t.y = 281;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel","_vipBtn","_tequanBtn","_nextTxt","_vipTxt","_yuanImg","_maxVipTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return SysChargePanelSkin;
})(eui.Skin);var SysnoticeItemSkin=(function (_super) {
	__extends(SysnoticeItemSkin, _super);
	function SysnoticeItemSkin() {
		_super.call(this);
		
		this.height = 199;
		this.width = 160;
		this.elementsContent = [this._Image1_i(),this._effectImg_i(),this._gridImg_i(),this._passTxt_i(),this._nameTxt_i(),this._redIcon_i(),this._ilingquImg_i()];
	}
	var _proto = SysnoticeItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 197;
		t.scale9Grid = new egret.Rectangle(10,10,63,65);
		t.source = "common_di2_png";
		t.width = 158;
		t.x = 1;
		t.y = 1;
		return t;
	};
	_proto._effectImg_i = function () {
		var t = new eui.Image();
		this._effectImg = t;
		t.height = 199;
		t.scale9Grid = new egret.Rectangle(13,13,84,84);
		t.source = "common_di_png";
		t.width = 160;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._gridImg_i = function () {
		var t = new eui.Image();
		this._gridImg = t;
		t.source = "common_itemBg_png";
		t.x = 10;
		t.y = 21;
		return t;
	};
	_proto._passTxt_i = function () {
		var t = new Label();
		this._passTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 45;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.verticalAlign = "middle";
		t.width = 158;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 45;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.verticalAlign = "middle";
		t.width = 158;
		t.x = 0;
		t.y = 154;
		return t;
	};
	_proto._redIcon_i = function () {
		var t = new eui.Image();
		this._redIcon = t;
		t.source = "common_red_icon_png";
		t.x = 125;
		t.y = 0;
		return t;
	};
	_proto._ilingquImg_i = function () {
		var t = new eui.Image();
		this._ilingquImg = t;
		t.source = "commony_ilingqu_png";
		t.x = 12;
		t.y = 101;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_effectImg","_gridImg","_passTxt","_nameTxt","_redIcon","_ilingquImg"];
		},
		enumerable: true,
		configurable: true
	});
	return SysnoticeItemSkin;
})(eui.Skin);var SysnoticeNewSystemSkin=(function (_super) {
	__extends(SysnoticeNewSystemSkin, _super);
	function SysnoticeNewSystemSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._backImg_i(),this._skillIcon_i()];
	}
	var _proto = SysnoticeNewSystemSkin.prototype;

	_proto._backImg_i = function () {
		var t = new eui.Image();
		this._backImg = t;
		t.horizontalCenter = 0;
		t.source = "sysNotice_gongnengkaiqi_png";
		t.y = 468;
		return t;
	};
	_proto._skillIcon_i = function () {
		var t = new BitmapRemote();
		this._skillIcon = t;
		t.height = 80;
		t.width = 85;
		t.x = 315;
		t.y = 498;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_backImg","_skillIcon"];
		},
		enumerable: true,
		configurable: true
	});
	return SysnoticeNewSystemSkin;
})(eui.Skin);var SysnoticeViewSkin=(function (_super) {
	__extends(SysnoticeViewSkin, _super);
	var SysnoticeViewSkin$Skin145 = 	(function (_super) {
		__extends(SysnoticeViewSkin$Skin145, _super);
		function SysnoticeViewSkin$Skin145() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SysnoticeViewSkin$Skin145.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "common_label_lingqu_0_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return SysnoticeViewSkin$Skin145;
	})(eui.Skin);

	function SysnoticeViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i(),this._item1_i(),this._item2_i(),this._linchunBtn_i(),this._redIcon_i()];
	}
	var _proto = SysnoticeViewSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.height = 1280;
		t.skinName = "BasePanelSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._item1_i = function () {
		var t = new BaseGoods();
		this._item1 = t;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 59;
		t.y = 988;
		return t;
	};
	_proto._item2_i = function () {
		var t = new BaseGoods();
		this._item2 = t;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 200;
		t.y = 988;
		return t;
	};
	_proto._linchunBtn_i = function () {
		var t = new Button();
		this._linchunBtn = t;
		t.label = "Button";
		t.x = 429;
		t.y = 1006;
		t.skinName = SysnoticeViewSkin$Skin145;
		return t;
	};
	_proto._redIcon_i = function () {
		var t = new eui.Image();
		this._redIcon = t;
		t.source = "common_red_icon_png";
		t.x = 623;
		t.y = 1010;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel","_item1","_item2","_linchunBtn","_redIcon"];
		},
		enumerable: true,
		configurable: true
	});
	return SysnoticeViewSkin;
})(eui.Skin);var EquipTipsSkin=(function (_super) {
	__extends(EquipTipsSkin, _super);
	var EquipTipsSkin$Skin146 = 	(function (_super) {
		__extends(EquipTipsSkin$Skin146, _super);
		function EquipTipsSkin$Skin146() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_tip_close_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = EquipTipsSkin$Skin146.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_tip_close_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return EquipTipsSkin$Skin146;
	})(eui.Skin);

	function EquipTipsSkin() {
		_super.call(this);
		
		this.height = 674;
		this.width = 419;
		this.elementsContent = [this._group_i()];
	}
	var _proto = EquipTipsSkin.prototype;

	_proto._group_i = function () {
		var t = new eui.Group();
		this._group = t;
		t.horizontalCenter = 0;
		t.y = 0;
		t.elementsContent = [this._bgImg_i(),this._goods_i(),this._closeBtn_i(),this._Image1_i(),this._nameTxt_i(),this._Label1_i(),this._Label2_i(),this._Label3_i(),this._fighting_i(),this._level_i(),this._career_i(),this._Image2_i(),this._attText1_i(),this._attText2_i(),this._attAddValue1_i(),this._attAddValue2_i(),this._jipinGup_i(),this._zhuhunGup_i(),this._gem_i()];
		return t;
	};
	_proto._bgImg_i = function () {
		var t = new eui.Image();
		this._bgImg = t;
		t.anchorOffsetY = 0;
		t.height = 372;
		t.scale9Grid = new egret.Rectangle(53,57,108,100);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_tipsBg_png";
		t.width = 408;
		t.x = 2;
		t.y = 0;
		return t;
	};
	_proto._goods_i = function () {
		var t = new BaseGoods();
		this._goods = t;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 16;
		t.y = 42;
		return t;
	};
	_proto._closeBtn_i = function () {
		var t = new Button();
		this._closeBtn = t;
		t.label = "";
		t.x = 369;
		t.y = 1;
		t.skinName = EquipTipsSkin$Skin146;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_title_wordBg_png";
		t.x = 105;
		t.y = 15;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 32;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.verticalAlign = "middle";
		t.width = 310;
		t.y = 15;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "战力：";
		t.textColor = 0x7c6e62;
		t.x = 160;
		t.y = 62;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "等级：";
		t.textColor = 0x7c6e62;
		t.x = 160;
		t.y = 100.5;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "职业：";
		t.textColor = 0x7c6e62;
		t.x = 160;
		t.y = 137;
		return t;
	};
	_proto._fighting_i = function () {
		var t = new Label();
		this._fighting = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "0";
		t.textColor = 0x7c6e62;
		t.width = 142;
		t.x = 244;
		t.y = 62;
		return t;
	};
	_proto._level_i = function () {
		var t = new Label();
		this._level = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "0";
		t.textColor = 0x7c6e62;
		t.width = 127;
		t.x = 244;
		t.y = 100.5;
		return t;
	};
	_proto._career_i = function () {
		var t = new Label();
		this._career = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "无";
		t.textColor = 0x7c6e62;
		t.width = 116;
		t.x = 244;
		t.y = 137;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(153,0,359,0);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_line_png";
		t.width = 370;
		t.x = 19;
		t.y = 169;
		return t;
	};
	_proto._attText1_i = function () {
		var t = new Label();
		this._attText1 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击：";
		t.textColor = 0x7c6e62;
		t.width = 138;
		t.x = 37;
		t.y = 181;
		return t;
	};
	_proto._attText2_i = function () {
		var t = new Label();
		this._attText2 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "破甲：";
		t.textColor = 0x7c6e62;
		t.width = 141;
		t.x = 37;
		t.y = 216;
		return t;
	};
	_proto._attAddValue1_i = function () {
		var t = new Label();
		this._attAddValue1 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "(强化+0)";
		t.textColor = 0x38b800;
		t.width = 174;
		t.x = 178;
		t.y = 181;
		return t;
	};
	_proto._attAddValue2_i = function () {
		var t = new Label();
		this._attAddValue2 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "(强化+0)";
		t.textColor = 0x38b800;
		t.width = 172;
		t.x = 178;
		t.y = 216;
		return t;
	};
	_proto._jipinGup_i = function () {
		var t = new eui.Group();
		this._jipinGup = t;
		t.x = 19;
		t.y = 248;
		t.elementsContent = [this._Image3_i(),this._Label4_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_line_png";
		t.width = 370;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "极品属性";
		t.textColor = 0xffa800;
		t.x = 18.5;
		t.y = 12;
		return t;
	};
	_proto._zhuhunGup_i = function () {
		var t = new eui.Group();
		this._zhuhunGup = t;
		t.x = 19;
		t.y = 248;
		t.elementsContent = [this._Image4_i(),this._Label5_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_line_png";
		t.width = 370;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "铸魂属性";
		t.textColor = 0xffa800;
		t.x = 18.5;
		t.y = 12;
		return t;
	};
	_proto._gem_i = function () {
		var t = new eui.Image();
		this._gem = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_line_png";
		t.width = 370;
		t.x = 19;
		t.y = 248;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_bgImg","_goods","_closeBtn","_nameTxt","_fighting","_level","_career","_attText1","_attText2","_attAddValue1","_attAddValue2","_jipinGup","_zhuhunGup","_gem","_group"];
		},
		enumerable: true,
		configurable: true
	});
	return EquipTipsSkin;
})(eui.Skin);var BagEquipTipsSkin=(function (_super) {
	__extends(BagEquipTipsSkin, _super);
	var BagEquipTipsSkin$Skin147 = 	(function (_super) {
		__extends(BagEquipTipsSkin$Skin147, _super);
		function BagEquipTipsSkin$Skin147() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BagEquipTipsSkin$Skin147.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 44;
			t.horizontalCenter = 0;
			t.source = "shiyong_png";
			t.verticalCenter = 0;
			t.width = 77;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return BagEquipTipsSkin$Skin147;
	})(eui.Skin);

	var BagEquipTipsSkin$Skin148 = 	(function (_super) {
		__extends(BagEquipTipsSkin$Skin148, _super);
		function BagEquipTipsSkin$Skin148() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BagEquipTipsSkin$Skin148.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 54;
			t.horizontalCenter = 0;
			t.source = "tips_items_fangruck_png";
			t.verticalCenter = 0;
			t.width = 152;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return BagEquipTipsSkin$Skin148;
	})(eui.Skin);

	var BagEquipTipsSkin$Skin149 = 	(function (_super) {
		__extends(BagEquipTipsSkin$Skin149, _super);
		function BagEquipTipsSkin$Skin149() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BagEquipTipsSkin$Skin149.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "tips_quchu_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return BagEquipTipsSkin$Skin149;
	})(eui.Skin);

	function BagEquipTipsSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = BagEquipTipsSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._bgImg_i(),this._useBtn_i(),this._fangruckBtn_i(),this._quchuBtn_i(),this._equipTips_i()];
		return t;
	};
	_proto._bgImg_i = function () {
		var t = new eui.Image();
		this._bgImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 126;
		t.scale9Grid = new egret.Rectangle(52,56,105,103);
		t.source = "common_tipsBg_png";
		t.width = 198;
		t.x = 408;
		t.y = 0;
		return t;
	};
	_proto._useBtn_i = function () {
		var t = new Button();
		this._useBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 66;
		t.label = "Button";
		t.width = 179;
		t.x = 417;
		t.y = 32;
		t.skinName = BagEquipTipsSkin$Skin147;
		return t;
	};
	_proto._fangruckBtn_i = function () {
		var t = new Button();
		this._fangruckBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 66;
		t.label = "Button";
		t.width = 179;
		t.x = 417;
		t.y = 126;
		t.skinName = BagEquipTipsSkin$Skin148;
		return t;
	};
	_proto._quchuBtn_i = function () {
		var t = new Button();
		this._quchuBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 66;
		t.label = "Button";
		t.width = 179;
		t.x = 419;
		t.y = 31;
		t.skinName = BagEquipTipsSkin$Skin149;
		return t;
	};
	_proto._equipTips_i = function () {
		var t = new EquipTipsSkinClass();
		this._equipTips = t;
		t.height = 652;
		t.skinName = "EquipTipsSkin";
		t.width = 419;
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_bgImg","_useBtn","_fangruckBtn","_quchuBtn","_equipTips"];
		},
		enumerable: true,
		configurable: true
	});
	return BagEquipTipsSkin;
})(eui.Skin);var BaseTipsSkin=(function (_super) {
	__extends(BaseTipsSkin, _super);
	var BaseTipsSkin$Skin150 = 	(function (_super) {
		__extends(BaseTipsSkin$Skin150, _super);
		function BaseTipsSkin$Skin150() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = BaseTipsSkin$Skin150.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "common_tip_close_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return BaseTipsSkin$Skin150;
	})(eui.Skin);

	function BaseTipsSkin() {
		_super.call(this);
		
		this.height = 596;
		this.width = 425;
		this.elementsContent = [this._Group4_i()];
	}
	var _proto = BaseTipsSkin.prototype;

	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 3;
		t.elementsContent = [this._itemsBgImg_i(),this._Image1_i(),this._Image2_i(),this._lin1_i(),this._items_i(),this._nameTxt_i(),this._porpTxt1_i(),this._desc_i(),this._Image3_i(),this._huoqutujImg_i(),this._porpTxt2_i(),this._porpTxt3_i(),this._close_i(),this._Group1_i(),this._Group2_i(),this._Group3_i()];
		return t;
	};
	_proto._itemsBgImg_i = function () {
		var t = new eui.Image();
		this._itemsBgImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 453;
		t.scale9Grid = new egret.Rectangle(52,56,105,103);
		t.source = "common_tipsBg_png";
		t.width = 409;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "common_title_wordBg_png";
		t.x = 99;
		t.y = 12;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 3;
		t.source = "common_line_png";
		t.width = 316;
		t.x = 45;
		t.y = 165;
		return t;
	};
	_proto._lin1_i = function () {
		var t = new eui.Image();
		this._lin1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 3;
		t.source = "common_line_png";
		t.width = 316;
		t.x = 45;
		t.y = 255;
		return t;
	};
	_proto._items_i = function () {
		var t = new BaseGoods();
		this._items = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 141;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 6;
		t.y = 35;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 30;
		t.size = 28;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 231;
		t.x = 88;
		t.y = 16;
		return t;
	};
	_proto._porpTxt1_i = function () {
		var t = new Label();
		this._porpTxt1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 26;
		t.size = 24;
		t.text = "Label";
		t.textColor = 0x7c6e62;
		t.width = 225;
		t.x = 151;
		t.y = 59;
		return t;
	};
	_proto._desc_i = function () {
		var t = new Label();
		this._desc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 77;
		t.size = 24;
		t.text = "Label";
		t.textColor = 0x7C6E62;
		t.width = 357;
		t.x = 26;
		t.y = 173;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "tips_items_close_png";
		t.x = 370;
		t.y = 0;
		return t;
	};
	_proto._huoqutujImg_i = function () {
		var t = new eui.Image();
		this._huoqutujImg = t;
		t.source = "tips_items_huoqutuj_png";
		t.x = 148;
		t.y = 258;
		return t;
	};
	_proto._porpTxt2_i = function () {
		var t = new Label();
		this._porpTxt2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 26;
		t.size = 24;
		t.text = "Label";
		t.textColor = 0x7C6E62;
		t.width = 225;
		t.x = 151;
		t.y = 95;
		return t;
	};
	_proto._porpTxt3_i = function () {
		var t = new Label();
		this._porpTxt3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 26;
		t.size = 24;
		t.text = "Label";
		t.textColor = 0x7C6E62;
		t.width = 225;
		t.x = 151;
		t.y = 132;
		return t;
	};
	_proto._close_i = function () {
		var t = new Button();
		this._close = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 93;
		t.label = "";
		t.width = 50;
		t.x = 369;
		t.y = 3;
		t.skinName = BaseTipsSkin$Skin150;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 10;
		t.y = 298;
		t.elementsContent = [this._pathBg1_i(),this._pathtxt1_i(),this._tuijianImg1_i()];
		return t;
	};
	_proto._pathBg1_i = function () {
		var t = new eui.Image();
		this._pathBg1 = t;
		t.source = "tips_items_tubiao1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._pathtxt1_i = function () {
		var t = new Label();
		this._pathtxt1 = t;
		t.anchorOffsetX = 0;
		t.size = 24;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 115;
		t.x = 3;
		t.y = 116;
		return t;
	};
	_proto._tuijianImg1_i = function () {
		var t = new eui.Image();
		this._tuijianImg1 = t;
		t.source = "tips_items_tuijian_png";
		t.x = 9;
		t.y = 23;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 144;
		t.y = 298;
		t.elementsContent = [this._pathBg0_i(),this._pathtxt0_i(),this._tuijianImg0_i()];
		return t;
	};
	_proto._pathBg0_i = function () {
		var t = new eui.Image();
		this._pathBg0 = t;
		t.source = "tips_items_tubiao1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._pathtxt0_i = function () {
		var t = new Label();
		this._pathtxt0 = t;
		t.anchorOffsetX = 0;
		t.size = 24;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 114;
		t.x = 3;
		t.y = 116;
		return t;
	};
	_proto._tuijianImg0_i = function () {
		var t = new eui.Image();
		this._tuijianImg0 = t;
		t.source = "tips_items_tuijian_png";
		t.x = 9;
		t.y = 23;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.x = 278;
		t.y = 298;
		t.elementsContent = [this._pathBg2_i(),this._pathtxt2_i(),this._tuijianImg2_i()];
		return t;
	};
	_proto._pathBg2_i = function () {
		var t = new eui.Image();
		this._pathBg2 = t;
		t.source = "tips_items_tubiao1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._pathtxt2_i = function () {
		var t = new Label();
		this._pathtxt2 = t;
		t.anchorOffsetX = 0;
		t.size = 24;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 116;
		t.x = 3;
		t.y = 116;
		return t;
	};
	_proto._tuijianImg2_i = function () {
		var t = new eui.Image();
		this._tuijianImg2 = t;
		t.source = "tips_items_tuijian_png";
		t.x = 9;
		t.y = 23;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_itemsBgImg","_lin1","_items","_nameTxt","_porpTxt1","_desc","_huoqutujImg","_porpTxt2","_porpTxt3","_close","_pathBg1","_pathtxt1","_tuijianImg1","_pathBg0","_pathtxt0","_tuijianImg0","_pathBg2","_pathtxt2","_tuijianImg2"];
		},
		enumerable: true,
		configurable: true
	});
	return BaseTipsSkin;
})(eui.Skin);var ChangeEquipTipsSkin=(function (_super) {
	__extends(ChangeEquipTipsSkin, _super);
	var ChangeEquipTipsSkin$Skin151 = 	(function (_super) {
		__extends(ChangeEquipTipsSkin$Skin151, _super);
		function ChangeEquipTipsSkin$Skin151() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChangeEquipTipsSkin$Skin151.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ChangeEquipTipsSkin$Skin151;
	})(eui.Skin);

	var ChangeEquipTipsSkin$Skin152 = 	(function (_super) {
		__extends(ChangeEquipTipsSkin$Skin152, _super);
		function ChangeEquipTipsSkin$Skin152() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_tip_close_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChangeEquipTipsSkin$Skin152.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_tip_close_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ChangeEquipTipsSkin$Skin152;
	})(eui.Skin);

	function ChangeEquipTipsSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = ChangeEquipTipsSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 334;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 238;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Label1_i(),this._item_i(),this._itemName_i(),this._btn_i(),this._img_i(),this._closeBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 334;
		t.scale9Grid = new egret.Rectangle(55,57,103,100);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_tipsBg_png";
		t.width = 238;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(55,17,103,0);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_title_wordBg_png";
		t.width = 160;
		t.x = 39;
		t.y = 16;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "提示";
		t.textColor = 0x7c6e62;
		t.x = 91;
		t.y = 19;
		return t;
	};
	_proto._item_i = function () {
		var t = new EquipItem();
		this._item = t;
		t.height = 141;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.x = 67;
		t.y = 56;
		return t;
	};
	_proto._itemName_i = function () {
		var t = new Label();
		this._itemName = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "物品名称物品";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.x = 35;
		t.y = 191;
		return t;
	};
	_proto._btn_i = function () {
		var t = new Button();
		this._btn = t;
		t.height = 70;
		t.horizontalCenter = 1;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 190;
		t.x = 25;
		t.y = 238;
		t.skinName = ChangeEquipTipsSkin$Skin151;
		return t;
	};
	_proto._img_i = function () {
		var t = new eui.Image();
		this._img = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "tips_change_equip_png";
		t.x = 41;
		t.y = 248;
		return t;
	};
	_proto._closeBtn_i = function () {
		var t = new Button();
		this._closeBtn = t;
		t.label = "";
		t.x = 200;
		t.y = 2;
		t.skinName = ChangeEquipTipsSkin$Skin152;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_item","_itemName","_btn","_img","_closeBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return ChangeEquipTipsSkin;
})(eui.Skin);var TipsGemItemSkin=(function (_super) {
	__extends(TipsGemItemSkin, _super);
	function TipsGemItemSkin() {
		_super.call(this);
		
		this.height = 53;
		this.width = 354;
		this.elementsContent = [this._Image1_i(),this._itemImg_i(),this._nameTxt_i(),this._attrTxt_i()];
	}
	var _proto = TipsGemItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 70;
		t.scale9Grid = new egret.Rectangle(32,33,40,40);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "common_itemBg_png";
		t.width = 70;
		t.x = -9;
		t.y = -9;
		return t;
	};
	_proto._itemImg_i = function () {
		var t = new eui.Image();
		this._itemImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 42;
		t.scale9Grid = new egret.Rectangle(32,33,40,40);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "";
		t.width = 43;
		t.x = 4.5;
		t.y = 5;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "血精石(3级)";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.width = 141;
		t.x = 53.5;
		t.y = 13;
		return t;
	};
	_proto._attrTxt_i = function () {
		var t = new Label();
		this._attrTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "攻击+9999";
		t.textAlign = "left";
		t.textColor = 0x7C6E62;
		t.width = 160.5;
		t.x = 204.5;
		t.y = 13;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_itemImg","_nameTxt","_attrTxt"];
		},
		enumerable: true,
		configurable: true
	});
	return TipsGemItemSkin;
})(eui.Skin);var TipsViewSkin=(function (_super) {
	__extends(TipsViewSkin, _super);
	var TipsViewSkin$Skin153 = 	(function (_super) {
		__extends(TipsViewSkin$Skin153, _super);
		function TipsViewSkin$Skin153() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TipsViewSkin$Skin153.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "common_label_quxiao_png";
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return TipsViewSkin$Skin153;
	})(eui.Skin);

	var TipsViewSkin$Skin154 = 	(function (_super) {
		__extends(TipsViewSkin$Skin154, _super);
		function TipsViewSkin$Skin154() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TipsViewSkin$Skin154.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "confirm_png";
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return TipsViewSkin$Skin154;
	})(eui.Skin);

	function TipsViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = TipsViewSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 331;
		t.elementsContent = [this._back_i(),this._Image1_i(),this._line_i(),this._title_i(),this._content_i(),this._btnCancel_i(),this._btnOk_i(),this._btnClose_i()];
		return t;
	};
	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.height = 313;
		t.scale9Grid = new egret.Rectangle(51,54,112,106);
		t.source = "common_tipsBg_png";
		t.width = 446;
		t.x = 0;
		t.y = 2;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(46,4,118,28);
		t.source = "common_title_wordBg_png";
		t.width = 225;
		t.x = 111;
		t.y = 13;
		return t;
	};
	_proto._line_i = function () {
		var t = new eui.Image();
		this._line = t;
		t.source = "common_line_png";
		t.width = 400;
		t.x = 23;
		t.y = 180;
		return t;
	};
	_proto._title_i = function () {
		var t = new Label();
		this._title = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.text = "提示";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.verticalAlign = "middle";
		t.width = 184;
		t.x = 131;
		t.y = 16;
		return t;
	};
	_proto._content_i = function () {
		var t = new Label();
		this._content = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 124;
		t.text = "content";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.verticalAlign = "middle";
		t.width = 366;
		t.x = 40;
		t.y = 53;
		return t;
	};
	_proto._btnCancel_i = function () {
		var t = new Button();
		this._btnCancel = t;
		t.height = 86;
		t.label = "";
		t.width = 192;
		t.x = 6;
		t.y = 201;
		t.skinName = TipsViewSkin$Skin153;
		return t;
	};
	_proto._btnOk_i = function () {
		var t = new Button();
		this._btnOk = t;
		t.height = 86;
		t.label = "";
		t.width = 192;
		t.x = 247;
		t.y = 201;
		t.skinName = TipsViewSkin$Skin154;
		return t;
	};
	_proto._btnClose_i = function () {
		var t = new eui.Image();
		this._btnClose = t;
		t.source = "common_tip_close_png";
		t.x = 419;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_line","_title","_content","_btnCancel","_btnOk","_btnClose"];
		},
		enumerable: true,
		configurable: true
	});
	return TipsViewSkin;
})(eui.Skin);var AddItemsScrollerSKin=(function (_super) {
	__extends(AddItemsScrollerSKin, _super);
	var AddItemsScrollerSKin$Skin155 = 	(function (_super) {
		__extends(AddItemsScrollerSKin$Skin155, _super);
		function AddItemsScrollerSKin$Skin155() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = AddItemsScrollerSKin$Skin155.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "common__jian_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return AddItemsScrollerSKin$Skin155;
	})(eui.Skin);

	var AddItemsScrollerSKin$Skin156 = 	(function (_super) {
		__extends(AddItemsScrollerSKin$Skin156, _super);
		function AddItemsScrollerSKin$Skin156() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = AddItemsScrollerSKin$Skin156.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "common_jia_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return AddItemsScrollerSKin$Skin156;
	})(eui.Skin);

	var AddItemsScrollerSKin$Skin157 = 	(function (_super) {
		__extends(AddItemsScrollerSKin$Skin157, _super);
		function AddItemsScrollerSKin$Skin157() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","tips_jindu2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = AddItemsScrollerSKin$Skin157.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "tips_jindu2_png";
			t.percentWidth = 100;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return AddItemsScrollerSKin$Skin157;
	})(eui.Skin);

	function AddItemsScrollerSKin() {
		_super.call(this);
		
		this.height = 98;
		this.width = 400;
		this.elementsContent = [this._Image1_i(),this._progreImg_i(),this._jianBtn_i(),this._kunGro_i(),this._jiaBtn_i(),this._barBtn_i()];
	}
	var _proto = AddItemsScrollerSKin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scale9Grid = new egret.Rectangle(12,8,78,16);
		t.source = "common__jindudi_png";
		t.width = 220;
		t.x = 89;
		t.y = 45;
		return t;
	};
	_proto._progreImg_i = function () {
		var t = new eui.Image();
		this._progreImg = t;
		t.scale9Grid = new egret.Rectangle(9,9,32,10);
		t.source = "tips_jindutiao_png";
		t.x = 90;
		t.y = 47;
		return t;
	};
	_proto._jianBtn_i = function () {
		var t = new Button();
		this._jianBtn = t;
		t.label = "Button";
		t.width = 70;
		t.x = 8;
		t.y = 26;
		t.skinName = AddItemsScrollerSKin$Skin155;
		return t;
	};
	_proto._kunGro_i = function () {
		var t = new eui.Group();
		this._kunGro = t;
		t.x = 110;
		t.y = 7;
		t.elementsContent = [this._Image2_i(),this._countTxt_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "tips_jindu_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._countTxt_i = function () {
		var t = new Label();
		this._countTxt = t;
		t.anchorOffsetX = 0;
		t.size = 22;
		t.text = "55";
		t.textAlign = "center";
		t.textColor = 0x7c6e62;
		t.width = 52;
		t.x = 1;
		t.y = 1;
		return t;
	};
	_proto._jiaBtn_i = function () {
		var t = new Button();
		this._jiaBtn = t;
		t.label = "Button";
		t.width = 70;
		t.x = 321;
		t.y = 27;
		t.skinName = AddItemsScrollerSKin$Skin156;
		return t;
	};
	_proto._barBtn_i = function () {
		var t = new Button();
		this._barBtn = t;
		t.label = "Button";
		t.width = 51;
		t.x = 120;
		t.y = 35;
		t.skinName = AddItemsScrollerSKin$Skin157;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_progreImg","_jianBtn","_countTxt","_kunGro","_jiaBtn","_barBtn"];
		},
		enumerable: true,
		configurable: true
	});
	return AddItemsScrollerSKin;
})(eui.Skin);var useItemsTips=(function (_super) {
	__extends(useItemsTips, _super);
	var useItemsTips$Skin158 = 	(function (_super) {
		__extends(useItemsTips$Skin158, _super);
		function useItemsTips$Skin158() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn2_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = useItemsTips$Skin158.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn2_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 52;
			t.horizontalCenter = 0;
			t.source = "common_label_quxiao_png";
			t.verticalCenter = 0;
			t.width = 181;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return useItemsTips$Skin158;
	})(eui.Skin);

	var useItemsTips$Skin159 = 	(function (_super) {
		__extends(useItemsTips$Skin159, _super);
		function useItemsTips$Skin159() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = useItemsTips$Skin159.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.height = 48;
			t.horizontalCenter = 0;
			t.source = "shiyong_png";
			t.verticalCenter = 0;
			t.width = 77;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return useItemsTips$Skin159;
	})(eui.Skin);

	function useItemsTips() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = useItemsTips.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1280;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this._basePopupSkin_i(),this._Image1_i(),this._closeBtn_i(),this._useBtn_i(),this._goods_i(),this._nameTxt_i(),this._addScorlle_i()];
		return t;
	};
	_proto._basePopupSkin_i = function () {
		var t = new BasePopUpView();
		this._basePopupSkin = t;
		t.percentHeight = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BasePopUpSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "tips_title_png";
		t.x = 321;
		t.y = 320;
		return t;
	};
	_proto._closeBtn_i = function () {
		var t = new Button();
		this._closeBtn = t;
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 71;
		t.y = 673;
		t.skinName = useItemsTips$Skin158;
		return t;
	};
	_proto._useBtn_i = function () {
		var t = new Button();
		this._useBtn = t;
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 413;
		t.y = 673;
		t.skinName = useItemsTips$Skin159;
		return t;
	};
	_proto._goods_i = function () {
		var t = new BaseGoods();
		this._goods = t;
		t.height = 141;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseGoodsSkin";
		t.width = 141;
		t.y = 405;
		return t;
	};
	_proto._nameTxt_i = function () {
		var t = new Label();
		this._nameTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "1111";
		t.textAlign = "center";
		t.textColor = 0x7C6E62;
		t.verticalAlign = "middle";
		t.width = 304;
		t.x = 212;
		t.y = 535;
		return t;
	};
	_proto._addScorlle_i = function () {
		var t = new AddItemsScroller();
		this._addScorlle = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 98;
		t.horizontalCenter = 0;
		t.skinName = "AddItemsScrollerSKin";
		t.width = 400;
		t.y = 568;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_basePopupSkin","_closeBtn","_useBtn","_goods","_nameTxt","_addScorlle"];
		},
		enumerable: true,
		configurable: true
	});
	return useItemsTips;
})(eui.Skin);var GameMoneyViewSkin=(function (_super) {
	__extends(GameMoneyViewSkin, _super);
	function GameMoneyViewSkin() {
		_super.call(this);
		
		this.height = 41;
		this.width = 129;
		this.elementsContent = [this._icon_i(),this._txt_i()];
	}
	var _proto = GameMoneyViewSkin.prototype;

	_proto._icon_i = function () {
		var t = new eui.Image();
		this._icon = t;
		t.source = "playRes_gold_54_png";
		t.x = -4;
		t.y = -5;
		return t;
	};
	_proto._txt_i = function () {
		var t = new Label();
		this._txt = t;
		t.bottom = 0;
		t.fontFamily = "Microsoft YaHei";
		t.left = 45;
		t.size = 18;
		t.text = "";
		t.textAlign = "left";
		t.textColor = 0xfffade;
		t.top = 0;
		t.verticalAlign = "middle";
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_icon","_txt"];
		},
		enumerable: true,
		configurable: true
	});
	return GameMoneyViewSkin;
})(eui.Skin);var uiRadioButtonSkin=(function (_super) {
	__extends(uiRadioButtonSkin, _super);
	function uiRadioButtonSkin() {
		_super.call(this);
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","common_radioBtn_select_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","common_radioBtn_select_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","common_radioBtn_select_png")
				])
		];
	}
	var _proto = uiRadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "common_radioBtn_normal_png";
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return [];
		},
		enumerable: true,
		configurable: true
	});
	return uiRadioButtonSkin;
})(eui.Skin);var VipPanelSkin=(function (_super) {
	__extends(VipPanelSkin, _super);
	function VipPanelSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i()];
	}
	var _proto = VipPanelSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.percentHeight = 100;
		t.skinName = "BasePanelSkin";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel"];
		},
		enumerable: true,
		configurable: true
	});
	return VipPanelSkin;
})(eui.Skin);var VipRightItemSkin=(function (_super) {
	__extends(VipRightItemSkin, _super);
	function VipRightItemSkin() {
		_super.call(this);
		
		this.height = 56;
		this.width = 550;
		this.elementsContent = [this._txt_i(),this._icon_i()];
	}
	var _proto = VipRightItemSkin.prototype;

	_proto._txt_i = function () {
		var t = new Label();
		this._txt = t;
		t.fontFamily = "Microsoft YaHei";
		t.percentHeight = 100;
		t.left = 50;
		t.size = 28;
		t.text = "";
		t.textAlign = "left";
		t.textColor = 0x7b6d61;
		t.verticalAlign = "middle";
		t.width = 500;
		return t;
	};
	_proto._icon_i = function () {
		var t = new eui.Image();
		this._icon = t;
		t.source = "common_label_new_png";
		t.x = 450;
		t.y = 13;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_txt","_icon"];
		},
		enumerable: true,
		configurable: true
	});
	return VipRightItemSkin;
})(eui.Skin);var VipViewSkin=(function (_super) {
	__extends(VipViewSkin, _super);
	var VipViewSkin$Skin160 = 	(function (_super) {
		__extends(VipViewSkin$Skin160, _super);
		function VipViewSkin$Skin160() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = VipViewSkin$Skin160.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "common_label_recharge_png";
			t.x = 8;
			t.y = 19;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return VipViewSkin$Skin160;
	})(eui.Skin);

	var VipViewSkin$Skin161 = 	(function (_super) {
		__extends(VipViewSkin$Skin161, _super);
		function VipViewSkin$Skin161() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = VipViewSkin$Skin161.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "common_page_arrow_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return VipViewSkin$Skin161;
	})(eui.Skin);

	var VipViewSkin$Skin162 = 	(function (_super) {
		__extends(VipViewSkin$Skin162, _super);
		function VipViewSkin$Skin162() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = VipViewSkin$Skin162.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "common_page_arrow_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return VipViewSkin$Skin162;
	})(eui.Skin);

	var VipViewSkin$Skin163 = 	(function (_super) {
		__extends(VipViewSkin$Skin163, _super);
		function VipViewSkin$Skin163() {
			_super.call(this);
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","common_btn1_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = VipViewSkin$Skin163.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "common_btn1_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.source = "common_label_fetch_png";
			t.x = 8;
			t.y = 19;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return VipViewSkin$Skin163;
	})(eui.Skin);

	function VipViewSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._rightsBg_i(),this._rewardsBg_i(),this._list_i(),this._Image3_i(),this._curImg_i(),this._nextImg_i(),this._Image4_i(),this._nextTxt_i(),this._rechargeBtn_i(),this._Image5_i(),this._titleImg_i(),this._preBtn_i(),this._nextBtn_i(),this._fetchBtn_i(),this._fetchedImg_i()];
	}
	var _proto = VipViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 325;
		t.left = 5;
		t.right = 5;
		t.source = "common_back4_png";
		t.touchEnabled = false;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 33;
		t.scale9Grid = new egret.Rectangle(24,10,60,13);
		t.source = "common__jindudi_png";
		t.width = 560;
		t.x = 80;
		t.y = 204;
		return t;
	};
	_proto._rightsBg_i = function () {
		var t = new BitmapRemote();
		this._rightsBg = t;
		t.alpha = 0.08;
		t.height = 432;
		t.width = 717;
		t.x = 3;
		t.y = 409;
		return t;
	};
	_proto._rewardsBg_i = function () {
		var t = new BitmapRemote();
		this._rewardsBg = t;
		t.height = 368;
		t.width = 684;
		t.x = 18;
		t.y = 756;
		return t;
	};
	_proto._list_i = function () {
		var t = new BaseVScrollerList();
		this._list = t;
		t.height = 272;
		t.width = 550;
		t.x = 85;
		t.y = 436;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "split_line_png";
		t.width = 668;
		t.x = 26;
		t.y = 729;
		return t;
	};
	_proto._curImg_i = function () {
		var t = new eui.Image();
		this._curImg = t;
		t.source = "vip_title_png";
		t.x = 15;
		t.y = 140;
		return t;
	};
	_proto._nextImg_i = function () {
		var t = new eui.Image();
		this._nextImg = t;
		t.source = "vip_title_png";
		t.x = 490;
		t.y = 140;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "common_arrow_png";
		t.x = 342;
		t.y = 129;
		return t;
	};
	_proto._nextTxt_i = function () {
		var t = new Label();
		this._nextTxt = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 37;
		t.size = 28;
		t.text = "在充值100元宝成为VIP1";
		t.textAlign = "left";
		t.textColor = 0x7b6d61;
		t.verticalAlign = "middle";
		t.width = 395;
		t.x = 115;
		t.y = 255;
		return t;
	};
	_proto._rechargeBtn_i = function () {
		var t = new Button();
		this._rechargeBtn = t;
		t.height = 90;
		t.label = "";
		t.width = 197;
		t.x = 503;
		t.y = 231;
		t.skinName = VipViewSkin$Skin160;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "vip_title_back_png";
		t.x = 169;
		t.y = 356;
		return t;
	};
	_proto._titleImg_i = function () {
		var t = new eui.Image();
		this._titleImg = t;
		t.source = "vip_label_right_png";
		t.x = 276;
		t.y = 371;
		return t;
	};
	_proto._preBtn_i = function () {
		var t = new Button();
		this._preBtn = t;
		t.height = 70;
		t.label = "";
		t.width = 37;
		t.x = 66;
		t.y = 592;
		t.skinName = VipViewSkin$Skin161;
		return t;
	};
	_proto._nextBtn_i = function () {
		var t = new Button();
		this._nextBtn = t;
		t.height = 70;
		t.label = "";
		t.scaleX = -1;
		t.width = 37;
		t.x = 658;
		t.y = 592;
		t.skinName = VipViewSkin$Skin162;
		return t;
	};
	_proto._fetchBtn_i = function () {
		var t = new Button();
		this._fetchBtn = t;
		t.height = 90;
		t.label = "";
		t.width = 197;
		t.x = 378;
		t.y = 1020;
		t.skinName = VipViewSkin$Skin163;
		return t;
	};
	_proto._fetchedImg_i = function () {
		var t = new eui.Image();
		this._fetchedImg = t;
		t.source = "commony_ilingqu_png";
		t.x = 407;
		t.y = 1022;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_rightsBg","_rewardsBg","_list","_curImg","_nextImg","_nextTxt","_rechargeBtn","_titleImg","_preBtn","_nextBtn","_fetchBtn","_fetchedImg"];
		},
		enumerable: true,
		configurable: true
	});
	return VipViewSkin;
})(eui.Skin);var MapSkin=(function (_super) {
	__extends(MapSkin, _super);
	function MapSkin() {
		_super.call(this);
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.basePanel_i(),this._contentList_i()];
	}
	var _proto = MapSkin.prototype;

	_proto.basePanel_i = function () {
		var t = new BasePanel();
		this.basePanel = t;
		t.enabled = true;
		t.height = 1280;
		t.skinName = "BasePanelSkin";
		t.width = 720;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._contentList_i = function () {
		var t = new BaseVScrollerList();
		this._contentList = t;
		t.height = 996;
		t.width = 670;
		t.x = 25;
		t.y = 121;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["basePanel","_contentList"];
		},
		enumerable: true,
		configurable: true
	});
	return MapSkin;
})(eui.Skin);var WorldMapItemSkin=(function (_super) {
	__extends(WorldMapItemSkin, _super);
	function WorldMapItemSkin() {
		_super.call(this);
		
		this.height = 147;
		this.width = 671;
		this.elementsContent = [this._back_i(),this._txtName_i(),this._txtOpen_i(),this._Image1_i(),this._labelHook_i()];
	}
	var _proto = WorldMapItemSkin.prototype;

	_proto._back_i = function () {
		var t = new eui.Image();
		this._back = t;
		t.percentHeight = 100;
		t.source = "common_wordBg_normal_png";
		t.percentWidth = 100;
		t.x = 0;
		return t;
	};
	_proto._txtName_i = function () {
		var t = new Label();
		this._txtName = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "地图名称";
		t.textColor = 0x7c6e62;
		t.x = 160;
		t.y = 60;
		return t;
	};
	_proto._txtOpen_i = function () {
		var t = new Label();
		this._txtOpen = t;
		t.fontFamily = "Microsoft YaHei";
		t.text = "第几章";
		t.textColor = 0x7c6e62;
		t.x = 480;
		t.y = 60;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "world_icon_boss_png";
		t.x = 32;
		t.y = 28;
		return t;
	};
	_proto._labelHook_i = function () {
		var t = new eui.Image();
		this._labelHook = t;
		t.source = "world_label_hook_png";
		t.x = 552;
		t.y = 4;
		return t;
	};
	Object.defineProperty(_proto, "skinParts", {
		get: function () {
			return ["_back","_txtName","_txtOpen","_labelHook"];
		},
		enumerable: true,
		configurable: true
	});
	return WorldMapItemSkin;
})(eui.Skin);