
var doc = document.currentScript.ownerDocument;

var wthProto = Object.create(HTMLElement.prototype);
var tpl = doc.getElementById('wth-template');

wthProto.createdCallback = function () {
    var host = this.webkitCreateShadowRoot();
    var clone = tpl.content.cloneNode(true);

    host.appendChild(clone);

    var what = host.querySelector('.what');
    var hell = host.querySelector('.hell');
    var toggle = function () {
        if (what.classList.contains('active')) {
            what.classList.remove('active')
            hell.classList.remove('active')

        } else {
            what.classList.add('active')
            hell.classList.add('active')

            hell.style.top = this.offsetTop + what.offsetHeight + 'px';
            hell.style.left = this.offsetLeft + 'px';
        }
    };

    this.onclick = function (event) {
        this.value = event.target.getAttribute('value');
        toggle();
    };
};

document.register('x-wth', {prototype: wthProto});

