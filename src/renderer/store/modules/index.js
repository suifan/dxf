/**
 * store/moudles下面的所有.js（index除外）文件内容导入到modules对象中，
 * 并分配文件名称作为键名，vuex.modules = modules
 */

const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules
