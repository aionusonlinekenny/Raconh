class StringUtils
{
    public static setParam(content:string, ...param):string
	 {
		 var len:number = param.length;
		 var key:string = "";
		 var result:string = content;
		 for(var i:number = 0; i < len; i++)
		 {
			 key = "{" + i + "}";
			 result = result.replace(key, param[i]);
		 }

		 return result;
	 }

	public static setParamArr(content:string, arr:Array<any>):string
	{
		var len:number = arr.length;
		var key:string = "";
		var result:string = content;
		for(var i:number = 0; i < len; i++)
		{
			key = "{" + i + "}";
			result = result.replace(key, arr[i]);
		}

		return result;
	}

	 public static getBigNum(value:number, toFixed:number = 0):string
	 {
		 let ret:string = "";
		 if(value >= 100000000)
		 {
			 value = value / 100000000;
			 if(toFixed == 0)
			 	ret = Math.floor(value) + LangCVO.getContent("common16");
			 else
			 	ret = value.toFixed(toFixed) + LangCVO.getContent("common16");
		 }
		 else if(value >= 10000)
		 {
			 if(String(value).length > 5)
			 {
				value = value / 10000;
				if(toFixed == 0)
					ret = Math.floor(value) + LangCVO.getContent("common17");
				else
					ret = value.toFixed(toFixed) + LangCVO.getContent("common17");
			 }
			 else
			 	ret = value + "";
		 }
		 else
		 	ret = value + "";
		 return ret;
	 }

	 public static getStrlen(value:string):number
	 {
		let l:number = value.length;
		let blen = 0;
		for(let i:number=0; i<l; i++)
		{
			if ((value.charCodeAt(i) & 0xff00) != 0)
				blen ++;
			blen ++;
		}
		return blen;
	 }
}