// ==UserScript==
// @name         彻底禁用 Page Visibility API
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  让 visibilitychange 永不触发，且状态始终为可见
// @author       deepseek
// @match        https://whut.ai-augmented.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1. 伪造属性，让页面永远认为自己是可见的
    Object.defineProperty(document, 'visibilityState', {
        get: () => 'visible',
        configurable: true
    });
    Object.defineProperty(document, 'hidden', {
        get: () => false,
        configurable: true
    });

    // 2. 拦截所有对 visibilitychange 事件的监听
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type === 'visibilitychange') {
            // 直接忽略，不注册任何监听器
            return;
        }
        return originalAddEventListener.call(this, type, listener, options);
    };

    // 3. 同样处理 removeEventListener，保持对称（避免报错）
    const originalRemoveEventListener = EventTarget.prototype.removeEventListener;
    EventTarget.prototype.removeEventListener = function(type, listener, options) {
        if (type === 'visibilitychange') {
            return;
        }
        return originalRemoveEventListener.call(this, type, listener, options);
    };
})();
