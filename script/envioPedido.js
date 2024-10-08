export default class EnvioPedido {
  constructor(cart, carrinhoInstance) {
    this.cart = cart;
    this.carrinhoInstance = carrinhoInstance;
    this.checkoutBtn = document.getElementById('checkout-btn');
    this.addressInput = document.getElementById('address');
    this.nameInput = document.getElementById('name');
    this.cepInput = document.getElementById('cep');
    this.scheduleInput = document.getElementById('schedule');
    this.paymentMethodInput = document.getElementById('payment-method');
    this.trocoInput = document.getElementById('troco');
    this.orderTypeInput = document.getElementById('order-type');
    this.pickupNameInput = document.getElementById('pickup-name');
    this.pickupScheduleInput = document.getElementById('pickup-schedule');
    this.addressWarn = document.getElementById('address-warn');

    this.init();
  }

  init() {
    const inputs = [this.addressInput, this.nameInput, this.cepInput, this.scheduleInput, this.paymentMethodInput, this.pickupNameInput, this.pickupScheduleInput];

    inputs.forEach((input) => {
      if (input) {
        input.addEventListener('input', () => this.clearWarning(input));
      }
    });

    if (this.checkoutBtn) {
      this.checkoutBtn.addEventListener('click', () => this.handleCheckout());
    }

    if (this.orderTypeInput) {
      this.orderTypeInput.addEventListener('change', (event) => this.toggleOrderDetails(event.target.value));
    }
  }

  toggleOrderDetails(orderType) {
    const deliveryDetails = document.getElementById('delivery-details');
    const pickupDetails = document.getElementById('pickup-details');

    if (orderType === 'delivery') {
      deliveryDetails.classList.remove('hidden');
      pickupDetails.classList.add('hidden');
    } else if (orderType === 'pickup') {
      pickupDetails.classList.remove('hidden');
      deliveryDetails.classList.add('hidden');
    }
    this.updateWarningMessage();
  }

  clearWarning(inputElement) {
    if (inputElement.value !== '') {
      inputElement.classList.remove('border-red-500');
    }
    this.updateWarningMessage();
  }

  showWarning(inputElement) {
    inputElement.classList.add('border-red-500');
  }

  updateWarningMessage() {
    const orderType = this.orderTypeInput.value;
    let inputs = [];

    if (orderType === 'delivery') {
      inputs = [this.nameInput, this.cepInput, this.addressInput, this.scheduleInput, this.paymentMethodInput];
    } else if (orderType === 'pickup') {
      inputs = [this.pickupNameInput, this.pickupScheduleInput];
    }

    const hasEmptyFields = inputs.some((input) => input && input.value === '');
    if (hasEmptyFields) {
      this.addressWarn.classList.remove('hidden');
    } else {
      this.addressWarn.classList.add('hidden');
    }
  }

  handleCheckout() {
    const orderType = this.orderTypeInput.value;
    let valid = true;

    if (this.cart.length === 0) {
      this.showWarning(this.addressInput);
      valid = false;
    }

    if (orderType === 'delivery') {
      if (!this.nameInput.value) {
        this.showWarning(this.nameInput);
        valid = false;
      }
      if (!this.cepInput.value) {
        this.showWarning(this.cepInput);
        valid = false;
      }
      if (!this.addressInput.value) {
        this.showWarning(this.addressInput);
        valid = false;
      }
      if (!this.scheduleInput.value) {
        this.showWarning(this.scheduleInput);
        valid = false;
      }
      if (!this.paymentMethodInput.value) {
        this.showWarning(this.paymentMethodInput);
        valid = false;
      }
    } else if (orderType === 'pickup') {
      if (!this.pickupNameInput.value) {
        this.showWarning(this.pickupNameInput);
        valid = false;
      }
      if (!this.pickupScheduleInput.value) {
        this.showWarning(this.pickupScheduleInput);
        valid = false;
      }
    }

    this.updateWarningMessage();

    if (!valid) return;

    const cartItems = this.cart
      .map((item) => {
        return ` ${item.name} Quantidade: (${item.quantity}) Preço: R$ ${item.price} \n`;
      })
      .join('');

    const total = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    let message = '';
    if (orderType === 'delivery') {
      message = encodeURIComponent(`
        Nome: ${this.nameInput.value}
        CEP: ${this.cepInput.value}
        Endereço: ${this.addressInput.value}
        Data e Hora: ${this.scheduleInput.value}
        Forma de Pagamento: ${this.paymentMethodInput.value}
        ${this.paymentMethodInput.value === 'dinheiro' ? `Troco para: R$ ${this.trocoInput.value}` : ''}
        Itens: ${cartItems}
        Total: R$ ${total}
      `);
    } else if (orderType === 'pickup') {
      message = encodeURIComponent(`
        Nome: ${this.pickupNameInput.value}
        Data e Hora de Retirada: ${this.pickupScheduleInput.value}
        Itens: ${cartItems}
        Total: R$ ${total}
      `);
    }

    const phone = '18997348846';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    console.log(cartItems);

    this.carrinhoInstance.cart = [];
    this.carrinhoInstance.updateCartModal();
  }
}
