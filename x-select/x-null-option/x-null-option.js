/*jslint vars: true, browser: true */
/*global HTMLXOptionElement: false */

(function () {
    "use strict";

    var doc = document.currentScript.ownerDocument;

    var proto = '__proto__';

    var xnulloptionProto = Object.create(document.createElement('x-option')[proto]);

    var createdCallback = xnulloptionProto.createdCallback;

    xnulloptionProto.createdCallback = function () {
        createdCallback.apply(this, arguments);

        var tpl = doc.getElementById('x-null-option-template');
        var clone = tpl.content.cloneNode(true);
        var root = this.shadowRoot;
        root.appendChild(clone);

        this.onclick = function (event) {
            event.data = 'unset';
        };
    };

    document.registerElement('x-null-option', {prototype: xnulloptionProto});

}());
