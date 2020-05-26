(function () {
    const defaultIsArray = Array.isArray

    const $qwer = {
        isArray: defaultIsArray || function () {
            return toString.call(obj) === '[object Array]'
        },

        isObject: function(data) {
            var toString = Object.prototype.toString
            var dataType = data instanceof Element ? 'element' : toString.call(data).replace(/\[object\s(.+)\]/, '$1').toLowerCase()
            return dataType
        },

        // 深拷贝
        deepClone: function (obj) {
            var copy
            if (this.isObject(obj) === 'object') {
                copy = {}
                for (const key in obj) {
                    copy[key] = this.deepClone(obj[key])
                }
            } else if (this.isArray(obj)) {
                copy = []
                obj.forEach(item => {
                    copy.push(this.deepClone(item))
                })
            } else {
                return obj
            }
            return copy
        },

        isWeiXin: function () {
            let ua = navigator.userAgent.toLowerCase()

            if (ua.match(/micromessenger/i) + '' === 'micromessenger') {
                return true
            } else {
                return false
            }
        },

        localStorage: {
            get: function (name) {
                if (typeof name === 'string') {
                    window.localStorage.getItem(name)
                }
                return str = '类型得是string类型'
            },
            
            set: function (name, value) {  
                window.localStorage.setItem(name, value)
            },

            remove: function (name) {
                window.localStorage.removeItem(name)
            }
        },

        sessionStorage: {
            get: function (name) {
                if (typeof name === 'string') {
                    window.sessionStorage.getItem(name)
                }
                return str = '类型得是string类型'
            },

            set: function (name, value) {
                window.sessionStorage.setItem(name, value)
            },

            remove: function (name) {
                window.sessionStorage.removeItem(name)
            }
        },

        getNowTime: function () {
            let time = new Date()
            return time.getFullYear() + '-' + this.addZero(time.getMonth() + 1) + '-' + this.addZero(time.getDate()) + '  ' + this.addZero(time.getHours()) + ':' + this.addZero(time.getMinutes()) + ':' + this.addZero(time.getSeconds())
        },

        addZero: function (n) {
            return n < 10 ? '0' + n : n
        },

        isIosOrAndroid: function () {
            const ua = navigator.userAgent
            if (ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                return 'ios'
            }

            if (ua.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
                return 'android'
            }

            return false
        },

        // ios上级页面不刷新问题
        iosPastRefresh: function () {
            if (isIosOrAndroid() === 'ios') {
                window.onpageshow = function (e) {
                    if (e.persisted && window.performance) {
                        // 或其他业务逻辑
                        window.location.reload()
                    }
                }
            }
        },

        // 去掉url中hash值方法
        removeHash: function () {
            let scrollV, scrollH, loc = window.location
            if ('pushState' in window.history)
                // 往浏览器历史记录里推一条记录，如需要替换当前历史记录，更换成replaceState方法
                window.history.pushState('', document.title, loc.pathname + loc.search)
            else {

                scrollV = document.body.scrollTop
                scrollH = document.body.scrollLeft
        
                loc.hash = ''
        
                document.body.scrollTop = scrollV
                document.body.scrollLeft = scrollH
            }
        },

        /**
         * 获取url里指定的参数值
         * @param url 链接
         * @param key key 
         */
        getUrlAssignParams: function (key, url) {
            let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i')
            if (!url) {
                let currenturl = window.location.search.substr(1)
                let res = currenturl.match(reg)
                if (res != null) {
                    return res[2]
                }
                return null
            } else {
                let arr = url.split('?')
                if (arr.length === 1) {
                    return null
                }
                let res =  arr[1].match(reg)
                if (res != null) {
                    return res[2]
                }
                return null 
            }
        },

        /**
         * 获取url里所有的参数值
         * @param url 链接
         */
        getUrlAllParams: function (url) {
            if (!url || url) {
                let paramsobj = {}
                let currenturl = window.location.search.substr(1)
                if (currenturl) {
                    currenturl = currenturl.split('&')
                    if (currenturl.length === 1) {
                        return null
                    }
                    currenturl.forEach(key => {
                        let middle = key.indexOf('=')
                        paramsobj[key.substr(0, middle)] = key.substr(middle + 1)
                    })
                    return paramsobj
                }
                return null
            }
            return null
        },

        /** 
         * 创建js
         * @param url url地址
         */
        createJs: function (url) {
            let filejs = document.createElement('script')
            
            filejs.setAttribute('scr', url)
            // document.querySelectorAll('body')[0]
            document.getElementsByTagName('body')[0].appendChild(filejs)
        },

        getUUID: function () {
            return this.numeral.getRandomNum () + '-' + this.numeral.getNowDate () + '-' + this.Ua()
        },

        // 数字相关类
        numeral: {
            getRandomNum () {
                return Math.random().toString(32).substr(2)
            },
            getNowDate () {
                let date = 1 * new Date()
                let i = 0
                while (date == 1 * new Date()) {
                    i++
                }
                return date.toString(32) + i.toString(32)
            }
        },
        Ua: function () {
            var uarr = window.navigator.userAgent.split(' ')
            if (uarr.length < 1) {
                return window.navigator.userAgent
            }
            var newarr = []
            var str = ''
            uarr.forEach(item => {
                let i = item.indexOf('/')
                if (i > -1) {
                    str = item.substr(0 ,i)
                    newarr.push(str)
                }
            })
            var uainfo = ''
            for (let j = 0; j < newarr.length; j++) {
                uainfo += newarr[j] + '-'
            }
            return uainfo
        },
        browserInfo: function () {
            var browser = {
                appname: 'unknown',
                version: 0
            },
            userAgent = window.navigator.userAgent.toLowerCase()
            if (/(msie|chrome|firefox|opera|netscape)\D+(\d[\d.]*)/.test(userAgent)) {
                browser.appname = RegExp.$1
                browser.version = RegExp.$2
            } else if (/version\D+(\d[\d.]*).*safari/.test(userAgent)) { // safari
                browser.appname = 'safari';
                browser.version = RegExp.$2;
            }
            return browser;
        },
        xhr: function (cors) {
            if (cors) {
                if (typeof window.XMLHttpRequest !== void 0) {
                    return new XMLHttpRequest
                } else if (typeof XDomainRequest !== void 0) {
                    return new XDomainRequest
                } else {
                    return null
                }
            } else {
                if (typeof window.XMLHttpRequest !== void 0) {
                    return new XMLHttpRequest
                } else if (typeof window.ActiveXObject !== void 0) {
                    try {
                        return new ActiveXObject('Msxml2.XMLHTTP')
                    } catch (err) {
                        try {
                            return new ActiveXObject('Microsoft.XMLHTTP')
                        } catch (err) {
                            console.log(err)
                        }
                    } 
                }
            }
        }
    }

    

    if (window.$qwer) {
        window.$rewq = $qwer
    } else {
        window.$qwer = $qwer
    }
})()