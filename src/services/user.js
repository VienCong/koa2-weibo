/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
/**
 * 
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }
    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        return result
    }
    // 格式化
    const formatRes = formatUser(result.dataValues)
    return formatRes
}


/**
 * @description
 * 创建用户
 * @author Viencong
 * @date 2020-08-25
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} [gender=3] 性别
 * @param {string} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName || userName,
        gender
    })
    return result.dataValues


}

module.exports = {
    getUserInfo,
    createUser
}