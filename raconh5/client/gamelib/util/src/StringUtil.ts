namespace cw
{
	export class StringUtil
	{
		public static format(str:string,args:any[]):string
		{
			let len:number = args.length;
			let reg:RegExp;
			if(len > 0)
			{
				for(let i:number = 0; i < len; i ++)
				{
					reg = new RegExp(`({[${i}]})`, "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
					str = str.replace(reg,args[i]);
				}
		 	}
			return str;
		}

		/**
		* 获取字符串长度：汉字=2  字母数字=1
		*/
		public static getStringLen(str:string):number
		{
			let result = 0;
			let length = str.length;
			for(let i = 0; i < length; i++)
			{
				let temp = str.charCodeAt(i);
				if(temp > 127 || temp == 94)
				{
					result += 2;
				}
				else
				{
					result ++;              
				}
			}
			return result;
		}

		/**
		 * 判断字符串是否为空
		 */
		public static isEmptyStr(str:string):boolean
		{
			return str == "" || str == null;
		}
	}
}