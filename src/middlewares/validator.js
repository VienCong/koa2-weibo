/**
 * @description json schema 验证中间件
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
/**
 * @description
 * json schema 验证中间件
 * @author Viencong
 * @date 2020-08-25
 * @param {*} validateFn 验证函数
 * @returns {*}  
 */
function genValidator(validateFn) {
    async function validator(ctx, next) {
        // 校验
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            // 验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return // 跳出当前中间件
        }
        // 验证成功，执行下一个中间件
        await next()
    }
    // 返回中间件
    return validator
}

module.exports = {
    genValidator
}