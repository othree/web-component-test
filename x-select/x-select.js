/*jslint vars: true, browser: true */
/*global HTMLInputElement: false, CustomEvent: false */
(function () {
    "use strict";

    var doc = document.currentScript.ownerDocument;

    var xselectProto = Object.create(HTMLInputElement.prototype);
    var tpl = doc.getElementById('x-select-template');

    xselectProto.createdCallback = function () {
        var host = this;
        var options = host.querySelectorAll('x-option');

        var name = host.getAttribute('name');
        var input = document.createElement('input');
        input.type = 'hidden';
        if (name) {
            input.setAttribute('name', name);
        }

        host.appendChild(input);

        var root = this.webkitCreateShadowRoot();
        var clone = tpl.content.cloneNode(true);
        root.appendChild(clone);

        var unset = document.createElement('x-null-option');
        var opts = root.querySelector('.options');
        unset.appendChild(document.createTextNode('Unset'));
        opts.insertBefore(unset, opts.firstChild);

        var label = host.getAttribute('data-label');

        var desc = root.querySelector('.desc');

        var defaultDesc = function () {
            if (desc.firstChild) {
                desc.removeChild(desc.firstChild);
            }
            desc.appendChild(document.createTextNode(label));
        };
        defaultDesc();

        root.querySelector('.options').style.minWidth = host.offsetWidth + 'px';

        var e = function (nodes, type) {
            if (!nodes.length || (nodes.length && nodes.length === 1)) {
                nodes = [nodes];
            }
            var evt = new CustomEvent(type, {bubbles: false, cancelable: false});
            [].forEach.call(nodes, function (option) {
                option.dispatchEvent(evt);
            });
        };


        var collapse = function () {
            host.classList.remove('expand');
            e(options, 'collapse');
            e(unset, 'collapse');
            document.removeEventListener('click', collapse, false);
        };
        var expand = function () {
            host.classList.add('expand');
            e(options, 'expand');
            e(unset, 'expand');
            setTimeout(function () {
                document.addEventListener('click', collapse, false);
            }, 0);
        };

        host.onclick = function (event) {
            if (host.classList.contains('expand')) {
                collapse();
            } else {
                expand();
            }

            var target = event.srcElement;
            var value = target.getAttribute('value');
            console.log(event);
            if (target !== this && value) {
                input.setAttribute('value', value);
                desc.removeChild(desc.firstChild);
                desc.appendChild(document.createTextNode(target.firstChild.nodeValue));
            } else if (event.data === 'unset') {
                input.removeAttribute('value');
                defaultDesc();
            }
        };

    };

    document.registerElement('x-select', {prototype: xselectProto});

}());
