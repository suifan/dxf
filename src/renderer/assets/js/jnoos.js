/**
 * 常用的工具，方法
 * create 2017-07-28 15:53
 * [nodejs](https://nodejs.org/en/download/)
 * [jsDoc](http://shouce.jb51.net/jsdoc/)
 *
 * -------目录-------
 * jnoos
 * |--OS @type {object}: 获取系统各类信息
 * |  |--IP @type {function}: 获取本地IP
 * |  |--osName @type {function}: 获取操作系统名称，架构
 * |--isNull @type {function}: 判断变量是否为空
 * |--deepcopy @type {function}: 对象深拷贝(简单的版本，未完整)
 * |--checkClickTime @type {function}: 检查两次点击的时间，防止点击过快
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory()
    : typeof define === 'function' && define.amd
      ? define(factory)
      : (global.jnoos = factory())
}(this, (function () {
  'use strict';
  /**
   * 引入其他模块
   */
  const os = require('os')

  /**
   * 模拟jQuery的$
   */
  var $ = document
    .querySelector
    .bind(document)
  /**
   * 设置全局属性
   */
  var window = window
    ? window
    : global

  /**
   * ====================================
   * |          获取系统各类信息           |
   * ====================================
   */
  var OS = {}
  /**
   * 获取本地IP
   * @returns {string}
   */
  OS.IP = () => {
    const network = os.networkInterfaces()
    let IPv4
    if (network.en0) {
      //osx
      for (let i of network.en0) {
        if (i.family == 'IPv4') {
          IPv4 = i.address
        }
      }
    } else {
      //windows
      if (network['无线网络连接']) {
        for (let i of network['无线网络连接']) {
          if (i.family == 'IPv4') {
            IPv4 = i.address
          }
        }
      } else {
        for (let i of network['本地连接']) {
          if (i.family == 'IPv4') {
            IPv4 = i.address
          }
        }
      }
    }
    return IPv4
  }
  /**
   * 获取操作系统名称，架构
   * @returns {string}
   */
  OS.osName = () => {
    const platform = os.platform() //操作系统平台
    const arch = os.arch() //操作系统CPU架构
    let name
    let num
    if (platform === 'win32') {
      name = 'Windows'
    } else if (platform === 'darwin') {
      name = 'OS X'
    } else if (platform === 'linux') {
      name = 'Linux'
    }
    return name
  }

  /**
   * 判断变量是否为空
   * @param {string} val
   * @returns {boolean} true => Null
   */
  var isNull = val => {
    return val === null || val === undefined || val.length === 0
  }

  /**
   * 对象深拷贝 (还未完整)
   * @param {string|Array|object} obj - 大多数对象
   * @returns {string|Array|object}
   */
  var deepcopy = obj => {

    if (typeof obj === 'object') {
      let result = {}

      for (let key in obj) {
        result[key] = obj[key]
        if (Object.hasOwnProperty(key)) {
          // if(key === 'name') {   result.name = obj[key] }
          //
        }
      }
      return result
    }
    //
  }

  /**
   * 检查两次点击的时间，防止点击过快
   * @param {number} time - 两次点击的时间间隔,单位毫秒
   * @returns {boolean}
   */
  var firstTime //记录每两次第一次的时间
  var checkClickTime = time => {
    const newTime = new Date().getTime(); //获取每次点击时的系统时间:毫秒数
    if (isNull(firstTime)) {
      firstTime = newTime
      return true //可以点击
    } else {
      let t = time - (newTime - firstTime)
      t = parseInt(t)
      if (t <= 0) {
        firstTime = newTime
        return true //可以点击
      } else {
        //alert("不要频繁点击，距离下次点击还有："+t+"秒")
        return false
      }
    }
  }

  /**
   * jnoos设置为全局变量
   */
  window.jnoos = {
    $: $,
    OS: OS,
    isNull: isNull,
    deepcopy: deepcopy,
    checkClickTime: checkClickTime
  }
  return jnoos
})))