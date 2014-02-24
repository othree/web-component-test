/*jslint vars: true, browser: true */
/*global HTMLElement: false */

(function () {
    "use strict";

    var doc = document.currentScript.ownerDocument;

    var xoptionProto = Object.create(HTMLElement.prototype);
    var tpl = doc.getElementById('x-option-template');

    xoptionProto.createdCallback = function () {
        var host = this;
        var root = this.webkitCreateShadowRoot();
        var clone = tpl.content.cloneNode(true);

        root.appendChild(clone);

        var value = this.getAttribute('value');

        host.onclick = function () {
            console.log("Choose Value: " + value);
        };

        host.addEventListener('expand', function () {
            setTimeout(function () {
                host.classList.add('show');
            }, 0);
        }, false);

        host.addEventListener('collapse', function () {
            host.classList.remove('show');
        }, false);
    };

    document.registerElement('x-option', {prototype: xoptionProto});

}());
