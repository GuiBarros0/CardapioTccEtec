import { Carrinho } from './carrinho.js';
import { Menu } from './menu.js';
import { Modal } from './modal.js';
import EnvioPedido from './envioPedido.js';
import Produtos from './produtos.js';

// Inicialize a instância do Carrinho
const meuCarrinho = new Carrinho();

// Inicializa o Menu
new Menu('menu');

// Inicializa o Modal
new Modal();

// Inicializa EnvioPedido com a instância do Carrinho
new EnvioPedido(meuCarrinho.cart, meuCarrinho);

// Inicializa Produtos
new Produtos();
