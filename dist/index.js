"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("oj-event");
exports.zoomIn = function (el, _a, cb) {
    var _b = _a === void 0 ? {} : _a, margin = _b.margin, background = _b.background, transition = _b.transition;
    if (margin === undefined)
        margin = 80;
    if (transition === undefined)
        transition = "transform .2s ease-out";
    if (transition !== false)
        Object.assign(el.style, { transition: transition });
    var bg;
    if (background)
        bg = document.querySelector(".zoom-bg");
    if (background && !bg) {
        bg = document.createElement("div");
        bg.classList.add("zoom-bg");
        Object.assign(bg.style, { transition: transition === false ? "" : transition, position: "fixed", left: "0", top: "0", width: "100%", height: "100%", zIndex: "0", pointerEvents: "none", opacity: "0" });
        document.body.insertBefore(bg, document.body.firstChild);
    }
    setTimeout(function () {
        var rect = el.getBoundingClientRect();
        var container = { width: window.innerWidth - (margin * 2), height: window.innerHeight - (margin * 2) };
        var scale = Math.min(container.width / rect.width, container.height / rect.height);
        var x = -((rect.left - ((container.width / 2) - (rect.width / 2))) - margin) * (1 / scale);
        var y = -((rect.top - ((container.height / 2) - (rect.height / 2))) - margin) * (1 / scale);
        Object.assign(el.style, { transform: "scale(" + scale + ") translate3d(" + x + "px, " + y + "px, 0)", zIndex: "2" });
        el.classList.add("transform-zoom");
        if (bg) {
            Object.assign(bg.style, { opacity: "1", zIndex: "1", pointerEvents: "" });
            bg.classList.add("transform-zoom");
        }
        setTimeout(function () { return window.on("scroll.Zoom", function (e) { return exports.zoomOut(el, cb); }); }, 400);
        window.on("resize.Zoom", function (e) { return exports.zoomOut(el, cb); });
        if (bg)
            bg.on("click.Zoom", function (e) { return exports.zoomOut(el, cb); });
        if (cb)
            cb(true, el, { x: x, y: y, scale: scale });
    }, 100);
};
exports.zoomOut = function (el, cb) {
    var bg = document.querySelector(".zoom-bg");
    Object.assign(el.style, { transform: "" });
    el.classList.remove("transform-zoom");
    if (bg) {
        Object.assign(bg.style, { opacity: "0", pointerEvents: "none" });
        bg.classList.remove("transform-zoom");
    }
    setTimeout(function () {
        Object.assign(el.style, { zIndex: "" });
        if (bg)
            Object.assign(bg.style, { zIndex: "0" });
        if (cb)
            cb(false, el);
    }, 400);
    window.off("scroll.Zoom");
    window.off("resize.Zoom");
    if (bg)
        bg.off("click.Zoom");
};
