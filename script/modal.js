// Modal.js
export class Modal {
  constructor() {
    // IDs fixos ou padrões para os elementos
    this.cartBtnId = 'cart-btn';
    this.cartModalId = 'cart-modal';
    this.closeModalBtnId = 'close-modal-btn';

    this.cartBtn = document.getElementById(this.cartBtnId);
    this.cartModal = document.getElementById(this.cartModalId);
    this.closeModalBtn = document.getElementById(this.closeModalBtnId);

    this.init();
  }

  init() {
    if (this.cartBtn && this.cartModal && this.closeModalBtn) {
      this.cartBtn.addEventListener('click', () => this.openModal());
      this.cartModal.addEventListener('click', (event) => this.closeModalOnOutsideClick(event));
      this.closeModalBtn.addEventListener('click', () => this.closeModal());
    }
  }

  openModal() {
    this.cartModal.style.display = 'flex';
  }

  closeModal() {
    this.cartModal.style.display = 'none';
  }

  closeModalOnOutsideClick(event) {
    if (event.target === this.cartModal) {
      this.closeModal();
    }
  }
}
