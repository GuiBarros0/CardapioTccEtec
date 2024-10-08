// Menu module
export class Menu {
  constructor() {
    this.menu = document.getElementById('menu');
    this.init();
  }

  async init() {
    await this.fetchCategorias();
  }

  async fetchCategorias() {
    try {
      const response = await fetch('api/produtos.json');
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const produtosJSON = await response.json();
      this.criarMenuLateral(produtosJSON);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  }

  criarMenuLateral(categorias) {
    // Container que envolve os itens de menu
    const menuContainer = document.createElement('div');
    menuContainer.className = 'flex';

    categorias.forEach((categoria) => {
      for (const [tipo] of Object.entries(categoria)) {
        const menuItem = document.createElement('div');
        menuItem.className = 'flex-shrink-0';

        const link = document.createElement('a');
        link.href = `#${tipo.toLowerCase()}`;
        link.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);
        link.className = 'block px-4 py-3 text-lg font-medium hover:scale-110 hover:bg-violet-950';

        link.addEventListener('click', (event) => {
          event.preventDefault();
          this.scrollToCategoria(tipo.toLowerCase());
        });

        menuItem.appendChild(link);
        menuContainer.appendChild(menuItem);
      }
    });

    // Adiciona o container de menu ao menu lateral
    this.menu.appendChild(menuContainer);
  }

  scrollToCategoria(categoria) {
    const elemento = document.getElementById(categoria);
    if (elemento) {
      // Rola o elemento para a visualização
      elemento.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });

      // Ajusta a rolagem manualmente após um atraso para garantir que o scroll inicial foi concluído
      setTimeout(() => {
        const offset = 80; // Ajuste esse valor conforme necessário
        const elementoPos = elemento.getBoundingClientRect().top + window.scrollY;
        const scrollPos = window.scrollY;
        const ajustadoPos = elementoPos - scrollPos - offset;

        // Ajusta a rolagem manualmente
        window.scrollBy({
          top: ajustadoPos,
          behavior: 'smooth',
        });
      }, 300); // Tempo para garantir que a rolagem inicial foi concluída
    }
  }
}
