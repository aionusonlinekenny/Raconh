declare namespace cw {
    class ByteArray extends egret.ByteArray {
        readInt64(): number;
        writeInt64(value: number): void;
    }
}
declare namespace cw {
    class ByteUtil {
        static toHexDump(desc: string, dump: egret.ByteArray, start: number, count: number): string;
    }
}
declare namespace cw {
    class DateUtil {
        static formatStr(seconds: number, format: string, isLeft?: boolean): string;
        static YYYY_MM_DD_HH_MM_SS: string;
        static MM_DD_HH_MM: string;
        static HH_MM: string;
        static MM_SS: string;
        static LEFT_DD_HH_MM: string;
        static LEFT_MM_SS: string;
        static LEFT_HH_MM_SS: string;
        static getDateBySecs(secs: number): Date;
        static disDay(date1: Date, date2: Date): number;
        /**
         *获取经过的总天数。距离 1970 年 1 月 1 日
         * @param date
         * @return
         *
         */
        static getTotalDays(date: Date): number;
        /**
         *获取日期之间相距的天数
         * @param startDate
         * @param endDate
         * @return
         *
         */
        static getBetweenDays(startDate: Date, endDate: Date): number;
        /**
         *返回当年当月有多少天
         * @param year
         * @param month
         * @return
         *
         */
        static getDates(year: number, month: number): number;
    }
}
declare namespace cw {
    interface IDispose {
        dispose(): void;
    }
    interface IPool extends IDispose {
        reuse(...args: any[]): void;
        unuse(): void;
    }
}
declare namespace cw {
    class MathUtil {
        /**
         * 返回介于min,max的值，其中max一定大于min
         */
        static clamb(min: number, max: number, value: number): number;
    }
}
declare namespace cw {
    class StringUtil {
        static format(str: string, args: any[]): string;
        /**
        * 获取字符串长度：汉字=2  字母数字=1
        */
        static getStringLen(str: string): number;
        /**
         * 判断字符串是否为空
         */
        static isEmptyStr(str: string): boolean;
    }
}
