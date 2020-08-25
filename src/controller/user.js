/**
 * @description user controller
 */

const { getUserInfo, createUser } = require('../services/user')
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel')

const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo
} = require('../model/ErrorInfo')

const doCrypto = require('../utils/cryp')

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

/**
 * @description
 * 注册
 * @author Viencong
 * @date 2020-08-25
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 （1男，2女， 3保密）
 */

async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }
    // 注册
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (error) {
        console.error(error.message, error.stack)
        return new ErrorModel(registerFailInfo)
    }

}



module.exports = {
    isExist,
    register
}