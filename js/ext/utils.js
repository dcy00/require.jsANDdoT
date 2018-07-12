/**
 * Created with Cocos2d-x3.0 jsb.
 * company: 郑州优德
 * author:caokui
 * date: 16-1-9 下午4:23
 * summary:工具函数
 */
define([
    'jquery',
    'jqueryJSON'
], function (jquery, jqueryJSON) {
    /**
     * @describe 跨浏览器的事件处理对象
     * @element 绑定事件的dom元素 eg:div
     * @type    事件类型 eg：click
     * @handler 事件处理函数
     * @used
     * var btn=document.getElementById("myBtn");//获取dom元素
     * var handler=function(event){//事件处理函数
     *      alert(this.id);
     * }
     * UtilTools.addHandler(btn,"click",handler);//dom无素绑定事件
     */
    var UtilTools = {
        // 添加事件绑定
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, handler);
            } else {
                element['on' + type] = handler;
            }
        },
        // 移除事件绑定
        removeHandler: function (element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent('on' + type, handler);
            } else {
                element['on' + type] = null;
            }
        },
        //获取事件对象
        getEvent: function (event) {
            return event ? event : window.event;
        },
        //获取事件目标元素
        getElement: function (event) {
            return event.target || event.srcElement;
        },
        //获取事件类型
        getType: function (event) {
            return event.type;
        },
        //阻止事件默认行为
        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        //阻止事件冒泡
        stopPropagation: function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },
        //根据字节长度截取字符串
        substringByByteLen: function (pStr, pLen, flag) {
            var _ret = this.cutString(pStr, pLen);
            var _cutFlag = _ret.cutflag;
            var _cutStringn = _ret.cutstring;
            if ("1" == _cutFlag) {
                if (flag) {
                    return _cutStringn;
                } else {
                    return _cutStringn + "...";
                }
            } else {
                return _cutStringn;
            }
        },
        /*
         * 取得指定长度的字符串
         * 注：半角长度为1，全角长度为2
         * pStr:字符串
         * pLen:截取长度
         * return: 截取后的字符串
         */
        cutString: function (pStr, pLen) {
            // 原字符串长度
            var _strLen = pStr.length;
            var _tmpCode;
            var _cutString;
            // 默认情况下，返回的字符串是原字符串的一部分
            var _cutFlag = "1";
            var _lenCount = 0;
            var _ret = false;
            if (_strLen <= pLen / 2) {
                _cutString = pStr;
                _ret = true;
            }
            if (!_ret) {
                for (var i = 0; i < _strLen; i++) {
                    if (this.isFull(pStr.charAt(i))) {
                        _lenCount += 2;
                    } else {
                        _lenCount += 1;
                    }
                    if (_lenCount > pLen) {
                        _cutString = pStr.substring(0, i);
                        _ret = true;
                        break;
                    } else if (_lenCount == pLen) {
                        _cutString = pStr.substring(0, i + 1);
                        _ret = true;
                        break;
                    }
                }
            }
            if (!_ret) {
                _cutString = pStr;
                _ret = true;
            }
            if (_cutString.length == _strLen) {
                _cutFlag = "0";
            }
            return {"cutstring": _cutString, "cutflag": _cutFlag};
        },

        /*
         * 判断是否为全角
         *
         * pChar:长度为1的字符串
         * return: true:全角
         *          false:半角
         */
        isFull: function (pChar) {
            if ((pChar.charCodeAt(0) > 128)) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * 获取移动终端的分辨率
         **/
        getTerminalRatio: function () {
            var ratio = window.screen.width;
            var screenRatio = "";
            if (ratio >= 960) {
                screenRatio = 960;
            }
            else if (960 >= ratio && ratio >= 720) {
                screenRatio = 720;
            }
            else if (720 >= ratio && ratio >= 480) {
                screenRatio = 480;
            }
            else if (480 >= ratio && ratio >= 320) {
                screenRatio = 320;
            } else if (ratio < 320) {
                screenRatio = 320;
            }
            ;
            return screenRatio
        },
        /*
         * localStorage
         * */
        setItem: function (key, val) {
            var storage = window.localStorage;
            storage.removeItem(key);
            storage.setItem(key, val)
        },
        getItem: function (key) {
            return window.localStorage.getItem(key);
        },

        /**
         * 接收url传入的参数
         * @param paramName
         * @returns {*}
         * 例如 b.html?paramName=888
         */
        getUrlParam: function (paramName) {
            var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent((r[2]));
            } else {
                return null;
            }
        },
        /**
         *收藏首页
         */
        AddFavorite: function (obj, vrl) {
            try {
                window.external.addFavorite(sURL, sTitle);
            }
            catch (e) {
                try {
                    window.sidebar.addPanel(sTitle, sURL, "");
                }
                catch (e) {
                    alert("加入收藏失败，请使用Ctrl+D进行添加");
                }
            }
        },
        /**
         *将url参数封装成json字符串并加密
         */
        urlParamToJSON: function (obj) {
            var strJson = $.toJSON(obj);//转成字符串
            strJson=encodeURIComponent(strJson);//加密
            return strJson;
        },
        /**
         *将url参数解析成json对象并解密
         */
        urlParamParseJSON: function (str) {
            var character = decodeURIComponent(str);//解密
            return $.parseJSON(character);//转成对象
        },
        /**
         *渲染关键字
         */
        renderKeyWords:function(seoinfo){
            $('[data-attach-point=keywords]').attr('content',seoinfo.keywords);
            $('[data-attach-point=description]').attr('content',seoinfo.description);
            $('[data-attach-point=title]').text(seoinfo.site_title);//=data.site_title;
        },
        /**
         *渲染title
         */
        renderTitle:function(seoinfo){
            var title=$('[data-attach-point=tip]').text();
            $('[data-attach-point=keywords]').attr('content',title);
            $('[data-attach-point=description]').attr('content',title);
            $('[data-attach-point=title]').text(title);//=data.site_title;
        }
    }


    return UtilTools;
})

