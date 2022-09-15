class Modal {
    constructor(modal) {
        this.modal = modal;
        this.counter = 0;
        this.overlay = this.modal.querySelector('.modal__overlay');
        this.buttonWrap = this.modal.querySelector('#button-wrap'),
        this.buttonHTML = '<button class="btn-danger modal__button" onclick="resetCounter()" title="Reset counter">Reset</button>';

        const closeButton = this.modal.querySelector('#modal-close');

        closeButton.addEventListener('click', this.close.bind(this));
        this.overlay.addEventListener('click', this.close.bind(this));

        if (document.cookie.indexOf('counter') !== -1) {
            this.counter = parseInt(this.getCookie('counter'));
        }
    }

    open() {
        this.counter += 1;
        this.modal.querySelector('#modal-counter').innerHTML = this.counter;
        this.modal.classList.add('active');

        document.cookie = 'counter=' + this.counter;
        
        if (this.counter > 5)
            this.buttonWrap.innerHTML = this.buttonHTML;

        setTimeout(() => {
            this.overlay.classList.add('visible');
            this.modal.querySelector('.modal__dialog').classList.add('visible');
        }, 1);
    }

    close() {
        this.overlay.classList.remove('visible');
        this.modal.querySelector('.modal__dialog').classList.remove('visible');

        setTimeout(() => {
            this.modal.classList.remove('active');
            this.buttonWrap.innerHTML = '';
        }, 150);
    }
    
    getCookie(name) {
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match)
            return match[2];
    }
    
    reset() {
        document.cookie = 'counter=' + 0;
        this.counter = 0;
        this.close();
    }
}

const modal = new Modal(document.querySelector('.modal'));

window.openModal = modal.open.bind(modal);
window.resetCounter = modal.reset.bind(modal);