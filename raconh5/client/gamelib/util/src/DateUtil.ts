namespace cw
{
    export class DateUtil
    {
        public static formatStr(seconds:number, format:string, isLeft:boolean = false):string
        {
		    var date = new Date(seconds * 1000);
			var year; 
			var month; 
			var day; 
			var hour; 
			var minute; 
			var second; 
			
			if(isLeft)
			{
				if(seconds > 0)
				{
					day = Math.floor(seconds / (3600 * 24));
					var temp = Math.floor(seconds % (3600 * 24));
					hour = Math.floor(temp / 3600);
					minute = Math.floor(temp / 60) % 60;
					second = temp % 60;
				}
				else
				{
					day = 0;
					hour = 0;
					minute = 0;
					second = 0;
				}
			}
			else
			{
				year = date.getFullYear();
				month = date.getMonth() + 1;
				day = date.getDate();
				hour = date.getHours();
				minute = date.getMinutes();
				second = date.getSeconds();
			}
			
			var monthStr = month < 10 ? "0" + month : month + "";
			var dayStr = day < 10 ? "0" + day : day + "";
			var hourStr = hour < 10 ? "0" + hour : hour + "";
			var minuteStr = minute < 10 ? "0" + minute : minute + "";
			var secondStr = second < 10 ? "0" + second : second + "";
			
			if(format == cw.DateUtil.YYYY_MM_DD_HH_MM_SS) return year + "/" + monthStr + "/" + dayStr + " " + hourStr + ":" + minuteStr + ":" + secondStr;
			else if(format == cw.DateUtil.MM_DD_HH_MM) return monthStr + "/" + dayStr + " " + hourStr + ":" + minuteStr;
			else if(format == cw.DateUtil.HH_MM) return hourStr + ":" + minuteStr;
			else if(format == cw.DateUtil.MM_SS) return minuteStr + ":" + secondStr;
			else if(format == cw.DateUtil.LEFT_DD_HH_MM) return dayStr + "天" + hourStr + "小时" + minuteStr + "分";
			else if(format == cw.DateUtil.LEFT_MM_SS) return minuteStr + ":" + secondStr;
			else if(format == cw.DateUtil.LEFT_HH_MM_SS) return hourStr + ":" + minuteStr + ":" + secondStr;
			else return "";
		}
		
		public static YYYY_MM_DD_HH_MM_SS:string = "YYYY_MM_DD_HH_MM_SS";
		public static MM_DD_HH_MM:string = "MM_DD_HH_MM_SS";
		public static HH_MM:string = "HH_MM";
		public static MM_SS:string = "MM_SS";
		public static LEFT_DD_HH_MM:string = "LEFT_DD_HH_MM";
		public static LEFT_MM_SS:string = "LEFT_MM_SS";
		public static LEFT_HH_MM_SS:string = "LEFT_HH_MM_SS";
		
		public static getDateBySecs(secs:number):Date
		{
			var result = new Date();
			result.setTime(secs * 1000);
			return result;
		}
		
		public static disDay(date1:Date,date2:Date):number
		{
			var dt = date2.getTime() - date1.getTime();
			return dt / 1000 / 60 / 60 / 24;
		}
		
		/** 
		 *获取经过的总天数。距离 1970 年 1 月 1 日  
		 * @param date 
		 * @return  
		 *  
		 */       
		public static getTotalDays(date:Date):number  
		{  
			return Number(( date.getTime() - date.getTimezoneOffset() * 60 * 1000 ) / (24 * 60 * 60 * 1000));  
		}  
		
		/** 
		 *获取日期之间相距的天数  
		 * @param startDate 
		 * @param endDate 
		 * @return  
		 *  
		 */       
		public static getBetweenDays(startDate:Date,endDate:Date):number  
		{  
			return this.getTotalDays(startDate) - this.getTotalDays(endDate);  
		} 
		
		/** 
		 *返回当年当月有多少天 
		 * @param year 
		 * @param month 
		 * @return  
		 *  
		 */
		public static getDates(year:number, month:number):number
		{
			var date1 = new Date(year, month, 1);
			var date2 = new Date(year, month + 1, 1);
			return Number(this.disDay(date1, date2));
		}
    }
}