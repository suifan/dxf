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
  var $ = document.querySelector.bind(document)
  /**
   * 设置全局属性
   */
  var window = window ? window : global


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
      for(let i of network.en0) {
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
    }else if (platform === 'darwin') {
      name = 'OS X'
    }else if (platform === 'linux') {
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
   * jnoos设置为全局变量
   */
  window.jnoos = {
    $: $,
    OS: OS,
    isNull: isNull
  }
  return jnoos
})))