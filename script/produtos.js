// Produtos.js
export default class Produtos {
  constructor() {
    this.apiUrl = 'api/produtos.json';
    this.divProdutos = document.getElementById('produtos');
    this.fetchProdutos();
  }

  async fetchProdutos() {
    try {
      const produtosResponse = await fetch(this.apiUrl);
      if (!produtosResponse.ok) {
        throw new Error(`Erro HTTP! Status: ${produtosResponse.status}`);
      }
      const produtosJSON = await produtosResponse.json();
      this.montagemProdutoSeções(produtosJSON);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  }

  montagemProdutoSeções(produtosJSON) {
    produtosJSON.forEach((categoria) => {
      for (const [tipo, produtos] of Object.entries(categoria)) {
        this.montagemSeção(produtos, tipo.charAt(0).toUpperCase() + tipo.slice(1));
      }
    });
  }

  montagemSeção(produtos, tipo) {
    const container = document.createElement('div');
    container.className = 'mx-auto max-w-7xl px-2 my-2';
    container.id = tipo.toLowerCase();

    const heading = document.createElement('h2');
    heading.className = 'text-2xl md:text-3xl font-bold mt-9 mb-6 mx-4';
    heading.textContent = tipo;

    container.appendChild(heading);

    const main = document.createElement('div');
    main.className = 'grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 mx-auto max-w-7xl px-2 mb-16';

    produtos.forEach((item) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'flex gap-2 w-full';

      const img = document.createElement('img');
      img.src = item.imagem;
      img.alt = item.nome;
      img.className = 'w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300';

      const detailsDiv = document.createElement('div');
      detailsDiv.className = 'w-full';

      const name = document.createElement('p');
      name.className = 'font-bold';
      name.textContent = item.nome;
      detailsDiv.appendChild(name);

      if (item.descricao) {
        const description = document.createElement('p');
        description.className = 'text-sm max-w-prose';
        description.textContent = item.descricao;
        detailsDiv.appendChild(description);
      }

      const priceDiv = document.createElement('div');
      priceDiv.className = 'flex items-center gap-2 justify-between mt-3';

      const price = document.createElement('p');
      price.className = 'font-bold text-lg';
      price.textContent = `R$ ${item.preco}`;

      const button = document.createElement('button');
      button.className = 'bg-gray-900 px-5 rounded add-to-cart-btn hover:scale-110 duration-200';
      button.dataset.name = item.nome;
      button.dataset.price = item.preco;

      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-bag-shopping text-lg text-white';
      button.appendChild(icon);

      priceDiv.appendChild(price);
      priceDiv.appendChild(button);

      detailsDiv.appendChild(priceDiv);
      itemDiv.appendChild(img);
      itemDiv.appendChild(detailsDiv);

      main.appendChild(itemDiv);
    });

    container.appendChild(main);
    this.divProdutos.appendChild(container);
  }
}
('');
