var version = Math.random();
var Loading = ( function()
{
	var Loading = {};
	var _allCtrls = {};
	var _intervalLoadingID = null;
	var _value = 0;
	Loading.init = function(version1)
	{
        if(!!version1)version = version1;
    	UITool.setCurScale();
		Loading.showLoadingPanel();

		window.onresize = Loading.onResize;
	}
	
	Loading.onResize = function( event )
	{
		UITool.onResize(_allCtrls);
	}
	
	//加载界面start^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	Loading.showLoadingPanel = function()
	{
		var loadingPanel = UITool.createImage( "loadingPanel", UITool.getPath("loading/back.jpg"), 880, 1280, "absolute", "50%", "0%", -880/2, 0 );
    	_allCtrls[ loadingPanel.id ] = loadingPanel;
		document.body.appendChild( loadingPanel );
		
		var barBack0 = UITool.createImage( "barBack0", UITool.getPath("loading/barBack.png"), 680, 22, "absolute", "0%", "0%", 98 , 919 );
    	_allCtrls[ barBack0.id ] = barBack0;
		loadingPanel.appendChild( barBack0 );

		var barBack1 = UITool.createImage( "barBack1", UITool.getPath("loading/barBack.png"), 680, 22, "absolute", "0%", "0%", 98 , 969 );
    	_allCtrls[ barBack1.id ] = barBack1;
		loadingPanel.appendChild( barBack1 );

		var bar0 = UITool.createImage( "bar0", UITool.getPath("loading/bar.png"), 596, 15, "absolute", "0%", "0%", 140 , 923 );
    	_allCtrls[ bar0.id ] = bar0;
		loadingPanel.appendChild( bar0 );
        bar0.style.width = "0px";

		var bar1 = UITool.createImage( "bar1", UITool.getPath("loading/bar.png"), 596, 15, "absolute", "0%", "0%", 140 , 973 );
    	_allCtrls[ bar1.id ] = bar1;
		loadingPanel.appendChild( bar1 );
        bar1.style.width = "0px";

		var txtPercent0 = UITool.createFont("0%", "txtPercent0", 0, 25, "absolute", "0%", "0%", 0, 294, "微软雅黑", "#FFF7E7", 18, "center" );
    	_allCtrls[ txtPercent0.id ] = txtPercent0;
		loadingPanel.appendChild( txtPercent0 );

		var txtPercent1 = UITool.createFont("0%", "txtPercent1", 0, 25, "absolute", "0%", "0%", 0, 344, "微软雅黑", "#FFF7E7", 18, "center" );
    	_allCtrls[ txtPercent1.id ] = txtPercent1;
		loadingPanel.appendChild( txtPercent1 );

		var txtTips = UITool.createFont("<nobr>First load may take a while, please wait....</nobr>", "txtTips", 0, 25, "absolute", "0%", "0%", 0, 390, "微软雅黑", "#FFF7E7", 18, "center" );
    	_allCtrls[ txtTips.id ] = txtTips;
		loadingPanel.appendChild( txtTips );
		
		_intervalLoadingID = window.setInterval( Loading.updateBar0, 100 );
	}

	Loading.updateBar0 = function()
	{
		var scale = UITool.scale;
		var progWidth = _value / 100 * 596 * scale;
			
		var bar0 = _allCtrls[ "bar0" ];
		bar0.style.width = progWidth + "px";

		var txtPercent0 = _allCtrls[ "txtPercent0" ];
		txtPercent0.innerHTML = _value + "%";
		
		_value += 5;
		if ( _value > 100 ) _value = 0;
	}

	Loading.updateProgress = function( cur, total )
	{
		var scale = UITool.scale;
		var curProgress = Math.floor( cur/total * 100 );
		var progWidth = curProgress / 100 * 596 * scale;
		
		var bar1 = _allCtrls[ "bar1" ];
		bar1.style.width = progWidth + "px";

		var txtPercent1 = _allCtrls[ "txtPercent1" ];
		txtPercent1.innerHTML = curProgress + "%";
	}

    Loading.cleanAll = function()
	{
		//清空
		if(_intervalLoadingID) window.clearInterval( _intervalLoadingID );
		_intervalLoadingID = null;
		window.onresize = null;

		UITool.removes(_allCtrls);
		_allCtrls = null;
        window.Loading = null;
	}
	//加载界面end^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

	window.Loading = Loading;
	return Loading;
}
)();



//--------------------------------------------------------
var UITool = {}
UITool.createUI = function( type, id, width, height, pos, left, top, mleft, mtop)
{
    var scale = UITool.scale;
    var uiWidth = scale * width;
    var uiHeight = scale * height;
    var uiMLeft = scale * mleft;
    var uiMTop = scale * mtop;
    
    var ui = document.createElement( type );
    ui.id = id;
    ui.style.width = uiWidth + "px";
    ui.style.height = uiHeight + "px";
    ui.style.position = pos;
    ui.style.top = top;
    ui.style.left = left;
    ui.style.margin = "0";
    ui.style.marginLeft = uiMLeft + "px";
    ui.style.marginTop = uiMTop + "px";
    
    ui._width_ = width;
    ui._height_ = height;
    ui._mleft_ = mleft;
    ui._mtop_ = mtop;
    return ui;
}

UITool.createImage = function( id, img, width, height, pos, left, top, mleft, mtop)
{
    var scale = UITool.scale;
    var imgWidth = scale * width;
    var imgHeight = scale * height;
    
    var image = UITool.createUI( "div", id, width, height, pos, left, top, mleft, mtop );
    image.style.lineHeight = imgHeight + "px";
    image.style.backgroundImage = img;
    image.style.backgroundRepeat = "no-repeat";
    image.style.backgroundPosition = "center";
    image.style.backgroundSize = imgWidth + "px " + imgHeight + "px";
    return image;
}

UITool.createInput = function( id, width, height, pos, left, top, mleft, mtop, font, fontColor, fontSize, textAlign)
{
    var scale = UITool.scale;
    var input = UITool.createUI( "input", id, width, height, pos, left, top, mleft, mtop );
    input.type = "text";
    input.style.border = "0";
    input.style.backgroundColor = "transparent";
    input.style.fontFamily = font;
    input.style.fontSize = ( fontSize * scale ) + "px";
    input.style.textAlign = textAlign;
    input.style.color = fontColor;
    input.style.outline = "none";
    input._fontSize_ = fontSize;
    return input;
}

UITool.createFont = function(text, id, width, height, pos, left, top, mleft, mtop, font, fontColor, fontSize, textAlign)
{
    var scale = UITool.scale;
    var label = UITool.createUI( "div", id, width, height, pos, left, top, mleft, mtop );
    label.id = id;
    label.style.width = width == 0 ? "100%" : width;
    label.style.height = height == 0 ? "100%" : height;
    // label.style.width = "100%";
    // label.style.height = "100%";
    label.style.fontFamily = font;
    label.style.fontSize = ( fontSize * scale ) + "px";
    label.style.color = fontColor;
    label.style.textAlign = textAlign;
    label._fontSize_ = fontSize;
    label.innerHTML = text;
    return label;
}

UITool.removes = function(allCtrls)
{
    for ( var name in allCtrls )
    {
        UITool.remove(allCtrls[ name ]);
    }
}

UITool.remove = function(view)
{
    if ( view && view.parentElement) view.parentElement.removeChild( view );
}

UITool.onResize = function(allCtrls)
{
    UITool.setCurScale();
    var scale = UITool.scale;
    for ( var name in allCtrls )
    {
        var ctrl = allCtrls[ name ];
        if ( ctrl == null || ctrl.parentElement == null )
            continue;
        
        var newWidth = ctrl._width_ * scale;
        var newHeight = ctrl._height_ * scale;
        
        if ( ctrl.style.width.indexOf( "%" ) == -1 )
            ctrl.style.width = newWidth + "px";
        
        if ( ctrl.style.height.indexOf( "%" ) == -1 )
            ctrl.style.height = newHeight + "px";
        
        if ( ctrl.style.marginLeft != null && ctrl.style.marginLeft.length > 0 )
        {
            var newMLeft = ctrl._mleft_ * scale;
            ctrl.style.marginLeft = newMLeft + "px";
        }
        
        if ( ctrl.style.marginTop != null && ctrl.style.marginTop.length > 0 )
        {
            var newMTop = ctrl._mtop_ * scale;
            ctrl.style.marginTop = newMTop + "px";
        }
        
        if ( ctrl.style.fontSize != null && ctrl.style.fontSize.length > 0 )
        {
            var newFontSize = ctrl._fontSize_ * scale;
            ctrl.style.fontSize = newFontSize + "px";
        }
        
        if ( ctrl.style.lineHeight != null && ctrl.style.lineHeight.length > 0 )
        {
            ctrl.style.lineHeight = newHeight + "px";
            ctrl.style.backgroundSize = newWidth + "px " + newHeight + "px";
        }
    }
}
	
    
UITool.getPath = function( img )
{
    return "url(resource/res/" + img + "?v=" +version + ")";
}

UITool.setCurScale = function()
{
    UITool.scale = document.body.clientHeight / 1280;
}