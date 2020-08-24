/**
 * @description user controller
 */

const { getUserInfo } = require('../services/user')
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel')

const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')

/**
 * 用户名是否存在
 * @param {string} userName 
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 存在
        return new SuccessModel(userInfo)
    } else {
        // 不存在
        return new ErrorModel(registerUserNameNotExistInfo)
    }

}

module.exports = {
    isExist
}