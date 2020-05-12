(function () {
    const defaultIsArray = Array.isArray

    const $qwer = {
        isArray: defaultIsArray || function () {
            return toString.call(obj) === '[object Array]'
        },

        xhr: function (cors) {
            if (cors) {
                if (typeof window.XMLHttpRequest !== void 0 ) {
                    return new XMLHttpRequest
                } else if (typeof XDomainRequest !== void 0) {
                    return new XDomainRequest
                } else {
                    return null
                }
            } else {
                
            }
        }
    }

    

    if (window.$qwer) {
        window.$rewq = $qwer
    } else {
        window.$qwer = $qwer
    }
})()