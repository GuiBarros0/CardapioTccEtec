// Carrinho.js
export class Carrinho {
  constructor() {
    this.cartItemsContainer = document.querySelector('#cart-items');
    this.cartTotal = document.querySelector('#cart-total');
    this.cartCounter = document.querySelector('#cart-count');
    this.produtos = document.getElementById('produtos');
    this.orderType = document.getElementById('order-type');
    this.cart = [];

    this.init();
  }

  init() {
    if (this.produtos) {
      this.produtos.addEventListener('click', (event) => this.handleAddToCart(event));
    }

    document.addEventListener('click', (event) => this.handleCartActions(event));
    this.orderType.addEventListener('change', (event) => this.handleOrderTypeChange(event));
  }

  handleAddToCart(event) {
    const parentButton = event.target.closest('.add-to-cart-btn');

    if (parentButton) {
      const name = parentButton.getAttribute('data-name');
      const price = parseFloat(parentButton.getAttribute('data-price'));
      this.addToCart(name, price);
    }
  }

  addToCart(name, price) {
    const existingItem = this.cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        name,
        price,
        quantity: 1,
      });
    }

    this.updateCartModal();
  }

  updateCartModal() {
    if (this.cartItemsContainer) {
      this.cartItemsContainer.innerHTML = '';
      let total = 0.0;

      this.cart.forEach((item) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col');

        cartItemElement.innerHTML = `
          <div class="flex items-center justify-between">
            <div>
              <p class="font-bold">${item.name}</p>
              <p>Qtd: 
                <i class="fa-solid fa-minus px-2 decrease-quantity cursor-pointer" data-name="${item.name}"></i>
                ${item.quantity}
                <i class="fa-solid fa-plus px-2 increase-quantity cursor-pointer" data-name="${item.name}"></i>
              </p>
              <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            <button data-name="${item.name}" class="remove-item-btn hover:text-red-600">Remover</button>
          </div>
        `;
        this.cartItemsContainer.appendChild(cartItemElement);
        total += item.price * item.quantity;
      });

      if (this.cartTotal) {
        this.cartTotal.textContent = `R$ ${total.toFixed(2)}`;
      }

      if (this.cartCounter) {
        const totalItems = this.cart.reduce((acc, item) => acc + item.quantity, 0);
        this.cartCounter.textContent = totalItems;
      }
    }
  }

  handleCartActions(event) {
    if (event.target.classList.contains('remove-item-btn')) {
      const name = event.target.getAttribute('data-name');
      this.removeFromCart(name);
    }
    if (event.target.classList.contains('increase-quantity')) {
      const name = event.target.getAttribute('data-name');
      this.changeQuantity(name, 1);
    }
    if (event.target.classList.contains('decrease-quantity')) {
      const name = event.target.getAttribute('data-name');
      this.changeQuantity(name, -1);
    }
  }

  removeFromCart(name) {
    const itemIndex = this.cart.findIndex((item) => item.name === name);
    if (itemIndex > -1) {
      this.cart.splice(itemIndex, 1);
      this.updateCartModal();
    }
  }

  changeQuantity(name, change) {
    const item = this.cart.find((item) => item.name === name);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(name);
      } else {
        this.updateCartModal();
      }
    }
  }

  handleOrderTypeChange(event) {
    const deliveryDetails = document.getElementById('delivery-details');
    const pickupDetails = document.getElementById('pickup-details');
    const trocoSection = document.getElementById('troco-section');
    const paymentMethod = document.getElementById('payment-method');

    if (event.target.value === 'delivery') {
      deliveryDetails.classList.remove('hidden');
      pickupDetails.classList.add('hidden');
    } else {
      deliveryDetails.classList.add('hidden');
      pickupDetails.classList.remove('hidden');
    }

    paymentMethod.addEventListener('change', function () {
      if (this.value === 'dinheiro') {
        trocoSection.classList.remove('hidden');
      } else {
        trocoSection.classList.add('hidden');
      }
    });
  }
}
