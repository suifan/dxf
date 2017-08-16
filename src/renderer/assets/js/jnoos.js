/**
 * 常用的工具，方法
 * create 2017-07-28 15:53
 * [nodejs](https://nodejs.org/en/download/)
 * [jsDoc](http://shouce.jb51.net/jsdoc/)
 *
 * -----------目录-----------
 * jnoos
 * ├─getTime @type {function}: 获取系统时间
 * ├─OS @type {object}: 获取系统各类信息
 * ├  ├─IP @type {function}: 获取本地IP
 * ├  └─osName @type {function}: 获取操作系统名称，架构
 * ├─isNull @type {function}: 判断变量是否为空
 * ├─deepcopy @type {function}: 对象深拷贝 (还未完整)
 * ├─checkClickTime @type {function}: 检查两次点击的时间，防止点击过快
 * ├─class检测、添加、删除、切换
 * ├  ├─hasClass @type {function}: 
 * ├  ├─addClass @type {function}
 * ├  ├─removeClass @type {function}
 * ├  └─toggleClass @type {function}
 * ├─convertTimeFormat @type {function}: 数字转换成时间格式
 * --------------------------
 * 使用说明: 
 * 1、<script></script>标签引入
 * 2、require('path/jnoos.js')
 * 引入完成后，jnoos.OS
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
   * 获取系统时间：YY.MM.DD hh:mm:ss
   */
  var getTime = () => {
      let de = new Date()
      let YY = de.getFullYear()
      let MM = (de.getMonth() + 1) > 9 ? (de.getMonth() + 1) : '0' + (de.getMonth() + 1)//0~11
      let DD = de.getDate()
      let w = de.getDay() //0~6 星期天～星期六
      let hh = de.getHours() > 9 ? de.getHours() : '0' + de.getHours()
      let mm = de.getMinutes() > 9 ? de.getMinutes() : '0' + de.getMinutes()
      let ss = de.getSeconds() > 9 ? de.getSeconds() : '0' + de.getSeconds()
      let connector = '-'
      //${hh}:${mm}:${ss}
      return `${YY}${connector}${MM}${connector}${DD}`
    }

  /**
   * 获取系统各类信息 
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
   * @param {*} val 
   * @returns {boolean}
   */
  var isNull = val => {
    if(typeof val === 'object') {
      for(let i in val) return false //false不为空
      return true //true为空对象
    }
    if(typeof val === 'string') {
      return val === null || val === undefined || val.length === 0
    }
    if(typeof val === 'undefined') {
      return true
    }
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
  var checkClickTime = (time) => {
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
   * class检测、添加、删除、切换
   * has( elem, 'my-class' ) -> true/false
   * add( elem, 'my-new-class' )
   * remove( elem, 'my-unwanted-class' )
   * toggle( elem, 'my-class' )
   */
  var classReg = className => new RegExp("(^|\\s+)" + className + "(\\s+|$)")
  var hasClass, addClass, removeClass
  if ('classList' in document.documentElement) {
    hasClass = (elem, c) => elem.classList.contains(c)
    addClass = (elem, c) => {
      elem.classList.add(c)
    }
    removeClass = (elem, c) => {
      elem.classList.remove(c)
    }
  }
  else {
    hasClass = (elem, c) => classReg(c).test(elem.className)
    addClass = (elem, c) => {
      if (!hasClass(elem, c)) {
        elem.className = elem.className + ' ' + c
      }
    }
    removeClass = (elem, c) => {
      elem.className = elem.className.replace(classReg(c), ' ')
    }
  }
  var toggleClass = (elem, c) => {
    var fn = hasClass(elem, c) ? removeClass : addClass
    fn(elem, c)
  }

  /**
   * 数字转换成时间格式 110 -> 01:50
   * @param {number} num - 单位s
   * @return {string}
   */
  var convertTimeFormat = num => {
    if (!isNaN(Number(num))) {
      num = num.toFixed(0)
      let minute = parseInt(num / 60, 10) > 9 ? parseInt(num / 60, 10) : '0' + parseInt(num / 60, 10)
      let second = num % 60 > 9 ? num % 60 : '0' + num % 60
      return  `${minute}:${second}`
    }else {
      console.error(`${num} is not a number`)
    }
  }

  /**
   * jnoos设置为全局变量
   */
  window.jnoos = {
    $: $,
    getTime: getTime,
    OS: OS,
    isNull: isNull,
    deepcopy: deepcopy,
    checkClickTime: checkClickTime,
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    convertTF: convertTimeFormat
  }
  return jnoos
})))