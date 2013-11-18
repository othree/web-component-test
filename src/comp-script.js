
var doc = document.currentScript.ownerDocument;

var wthProto = Object.create(HTMLElement.prototype);
var tpl = doc.getElementById('wth-template');

wthProto.createdCallback = function () {
    var root = this;
    var host = this.webkitCreateShadowRoot();
    var clone = tpl.content.cloneNode(true);

    host.appendChild(clone);

    var what = host.querySelector('.what');
    var hell = host.querySelector('.hell');
    var toggle = function () {
        if (what.classList.contains('active')) {
            hide();
        } else {
            show();
        }
    };

    var show = function () {
        what.classList.add('active')
        hell.classList.add('active')

        hell.style.top = (root.offsetTop + what.offsetHeight + 1) + 'px';
        hell.style.left = root.offsetLeft + 'px';
    };
    var hide = function () {
        what.classList.remove('active')
        hell.classList.remove('active')
    };

    this.onclick = function (event) {
        this.value = event.target.getAttribute('value');
        toggle();
        event.stopPropagation()
    };

    document.onclick = function () {
        hide();
    };
};

document.register('x-wth', {prototype: wthProto});

