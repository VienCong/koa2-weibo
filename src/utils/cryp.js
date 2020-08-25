/**
 * @description 加密方法
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')


/**
 * @description
 * md5 加密
 * @author Viencong
 * @date 2020-08-25
 * @param {*} content
 * @returns {*}  
 */
function _md5(content){
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}


/**
 * @description
 * @author Viencong
 * @date 2020-08-25
 * @param {string} content 明文
 * @returns {*}  
 */
function doCrypto(content) {
    const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
    return _md5(str)
}

module.exports = doCrypto
