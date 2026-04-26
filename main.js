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

    Object.defineProperty(document, 'visibilityState', {
        get: () => 'visible',
        configurable: true
    });
    Object.defineProperty(document, 'hidden', {
        get: () => false,
        configurable: true
    });

    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type === 'visibilitychange') {
            return;
        }
        return originalAddEventListener.call(this, type, listener, options);
    };

    const originalRemoveEventListener = EventTarget.prototype.removeEventListener;
    EventTarget.prototype.removeEventListener = function(type, listener, options) {
        if (type === 'visibilitychange') {
            return;
        }
        return originalRemoveEventListener.call(this, type, listener, options);
    };
})();
