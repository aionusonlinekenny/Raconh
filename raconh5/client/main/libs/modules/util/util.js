var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var cw;
(function (cw) {
    var ByteArray = (function (_super) {
        __extends(ByteArray, _super);
        function ByteArray() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ByteArray.prototype.readInt64 = function () {
            return this.readUnsignedInt() * Math.pow(2, 32) + this.readUnsignedInt();
        };
        ByteArray.prototype.writeInt64 = function (value) {
            this.writeUnsignedInt(value / 0xffffffff);
            this.writeUnsignedInt(value);
        };
        return ByteArray;
    }(egret.ByteArray));
    cw.ByteArray = ByteArray;
    __reflect(ByteArray.prototype, "cw.ByteArray");
})(cw || (cw = {}));
var cw;
(function (cw) {
    var ByteUtil = (function () {
        function ByteUtil() {
        }
        ByteUtil.toHexDump = function (desc, dump, start, count) {
            var hexDump = "";
            if (desc != null) {
                hexDump += desc;
                hexDump += "\n";
            }
            var end = start + count;
            for (var i = start; i < end; i += 16) {
                var text = "";
                var hex = "";
                for (var j = 0; j < 16; j++) {
                    if (j + i < end) {
                        var val = dump.bytes[j + i];
                        if (val < 16) {
                            hex += "0" + val.toString(16) + " ";
                        }
                        else {
                            hex += val.toString(16) + " ";
                        }
                        if (val >= 32 && val <= 127) {
                            text += String.fromCharCode(val);
                        }
                        else {
                            text += ".";
                        }
                    }
                    else {
                        hex += "   ";
                        text += " ";
                    }
                }
                hex += "  ";
                hex += text;
                hex += "\n";
                hexDump += hex;
            }
            return hexDump;
        };
        return ByteUtil;
    }());
    cw.ByteUtil = ByteUtil;
    __reflect(ByteUtil.prototype, "cw.ByteUtil");
})(cw || (cw = {}));
var cw;
(function (cw) {
    var DateUtil = (function () {
        function DateUtil() {
        }
        DateUtil.formatStr = function (seconds, format, isLeft) {
            if (isLeft === void 0) { isLeft = false; }
            var date = new Date(seconds * 1000);
            var year;
            var month;
            var day;
            var hour;
            var minute;
            var second;
            if (isLeft) {
                if (seconds > 0) {
                    day = Math.floor(seconds / (3600 * 24));
                    var temp = Math.floor(seconds % (3600 * 24));
                    hour = Math.floor(temp / 3600);
                    minute = Math.floor(temp / 60) % 60;
                    second = temp % 60;
                }
                else {
                    day = 0;
                    hour = 0;
                    minute = 0;
                    second = 0;
                }
            }
            else {
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
            if (format == cw.DateUtil.YYYY_MM_DD_HH_MM_SS)
                return year + "/" + monthStr + "/" + dayStr + " " + hourStr + ":" + minuteStr + ":" + secondStr;
            else if (format == cw.DateUtil.MM_DD_HH_MM)
                return monthStr + "/" + dayStr + " " + hourStr + ":" + minuteStr;
            else if (format == cw.DateUtil.HH_MM)
                return hourStr + ":" + minuteStr;
            else if (format == cw.DateUtil.MM_SS)
                return minuteStr + ":" + secondStr;
            else if (format == cw.DateUtil.LEFT_DD_HH_MM)
                return dayStr + "天" + hourStr + "小时" + minuteStr + "分";
            else if (format == cw.DateUtil.LEFT_MM_SS)
                return minuteStr + ":" + secondStr;
            else if (format == cw.DateUtil.LEFT_HH_MM_SS)
                return hourStr + ":" + minuteStr + ":" + secondStr;
            else
                return "";
        };
        DateUtil.getDateBySecs = function (secs) {
            var result = new Date();
            result.setTime(secs * 1000);
            return result;
        };
        DateUtil.disDay = function (date1, date2) {
            var dt = date2.getTime() - date1.getTime();
            return dt / 1000 / 60 / 60 / 24;
        };
        /**
         *获取经过的总天数。距离 1970 年 1 月 1 日
         * @param date
         * @return
         *
         */
        DateUtil.getTotalDays = function (date) {
            return Number((date.getTime() - date.getTimezoneOffset() * 60 * 1000) / (24 * 60 * 60 * 1000));
        };
        /**
         *获取日期之间相距的天数
         * @param startDate
         * @param endDate
         * @return
         *
         */
        DateUtil.getBetweenDays = function (startDate, endDate) {
            return this.getTotalDays(startDate) - this.getTotalDays(endDate);
        };
        /**
         *返回当年当月有多少天
         * @param year
         * @param month
         * @return
         *
         */
        DateUtil.getDates = function (year, month) {
            var date1 = new Date(year, month, 1);
            var date2 = new Date(year, month + 1, 1);
            return Number(this.disDay(date1, date2));
        };
        DateUtil.YYYY_MM_DD_HH_MM_SS = "YYYY_MM_DD_HH_MM_SS";
        DateUtil.MM_DD_HH_MM = "MM_DD_HH_MM_SS";
        DateUtil.HH_MM = "HH_MM";
        DateUtil.MM_SS = "MM_SS";
        DateUtil.LEFT_DD_HH_MM = "LEFT_DD_HH_MM";
        DateUtil.LEFT_MM_SS = "LEFT_MM_SS";
        DateUtil.LEFT_HH_MM_SS = "LEFT_HH_MM_SS";
        return DateUtil;
    }());
    cw.DateUtil = DateUtil;
    __reflect(DateUtil.prototype, "cw.DateUtil");
})(cw || (cw = {}));
var cw;
(function (cw) {
    var MathUtil = (function () {
        function MathUtil() {
        }
        /**
         * 返回介于min,max的值，其中max一定大于min
         */
        MathUtil.clamb = function (min, max, value) {
            if (value <= min)
                return min;
            if (value >= max)
                return max;
            return value;
        };
        return MathUtil;
    }());
    cw.MathUtil = MathUtil;
    __reflect(MathUtil.prototype, "cw.MathUtil");
})(cw || (cw = {}));
var cw;
(function (cw) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        StringUtil.format = function (str, args) {
            var len = args.length;
            var reg;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    reg = new RegExp("({[" + i + "]})", "g"); //这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    str = str.replace(reg, args[i]);
                }
            }
            return str;
        };
        /**
        * 获取字符串长度：汉字=2  字母数字=1
        */
        StringUtil.getStringLen = function (str) {
            var result = 0;
            var length = str.length;
            for (var i = 0; i < length; i++) {
                var temp = str.charCodeAt(i);
                if (temp > 127 || temp == 94) {
                    result += 2;
                }
                else {
                    result++;
                }
            }
            return result;
        };
        /**
         * 判断字符串是否为空
         */
        StringUtil.isEmptyStr = function (str) {
            return str == "" || str == null;
        };
        return StringUtil;
    }());
    cw.StringUtil = StringUtil;
    __reflect(StringUtil.prototype, "cw.StringUtil");
})(cw || (cw = {}));
