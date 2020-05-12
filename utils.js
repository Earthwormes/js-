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