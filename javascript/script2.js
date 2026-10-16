/* ============================================================
   LINKTREE DAIANE - SCRIPT
   ============================================================
   Controla a interatividade da página: links sociais,
   galeria de obras, lightbox, preços, filtros, menu mobile,
   parallax leve, animações de reveal no scroll e botão
   voltar ao topo.

   Toda configuração fácil de editar fica na seção
   "CONFIGURAÇÕES DO USUÁRIO" no topo deste arquivo.
   ============================================================ */

/* ============================================================
   1. CONFIGURAÇÕES DO USUÁRIO
   ============================================================
   Edite abaixo o nome do artista, os contatos, as imagens da
   galeria e os preços. Não é necessário mexer no restante do
   arquivo a menos que queira mudar o funcionamento.
   ============================================================ */

const CONFIG = {
  // Nome do artista exibido em toda a página
  artist: "Dayanee Art",

  // Links de contato (substitua pelos seus dados reais)
  whatsapp: "55SEUNUMERO",
  discord: "https://discord.gg/SEULINK",
  instagram: "https://instagram.com/SEUUSER",

  // Obras da galeria. Cada item inclui título, estilo,
  // altura da imagem, caminho da miniatura e caminho da
  // imagem ampliada (aberta no lightbox).
  gallery: [
    { title: "A queda", category: "Anime", height: 800, src: "imagens/a_queda.jpg", big: "imagens/a_queda.jpg" },
    { title: "Guardiã das Estrelas", category: "Semi Realista", height: 700, src: "imagens/bot_lobao_it.jpg", big: "imagens/bot_lobao_it.jpg" },
    { title: "Samurai do Neon", category: "Chibi", height: 900, src: "imagens/bot_lobao_leprechaun.jpg", big: "imagens/bot_lobao_leprechaun.jpg" },
    { title: "Mago do Crepúsculo", category: "Anime", height: 600, src: "imagens/bot_lobao_lobisomem.jpg", big: "imagens/bot_lobao_lobisomem.jpg" },
    { title: "Gatinha Ninja", category: "Chibi", height: 800, src: "imagens/bot_lobao_panico.jpg", big: "imagens/bot_lobao_panico.jpg" },
    { title: "Aurora Digital", category: "Semi Realista", height: 900, src: "imagens/caricatura.jpeg", big: "imagens/caricatura.jpeg" },
    { title: "Cavaleiro Sombrio", category: "Anime", height: 700, src: "imagens/chibi.jpeg", big: "imagens/chibi.jpeg" },
    { title: "Sakura Eterna", category: "Semi Realista", height: 800, src: "imagens/daiane_pfp.jpeg", big: "imagens/daiane_pfp.jpeg" },
    { title: "Piloto Cyber", category: "Anime", height: 600, src: "imagens/dardos.jpeg", big: "imagens/dardos.jpeg" },
    { title: "Bruxinha do Café", category: "Chibi", height: 900, src: "imagens/fada.jpg", big: "imagens/fada.jpg" },
    { title: "Rainha das Marés", category: "Semi Realista", height: 800, src: "imagens/flor_do_deserto.jpeg", big: "imagens/flor_do_deserto.jpeg" },
    { title: "Espírito da Floresta", category: "Anime", height: 700, src: "imagens/flower.jpeg", big: "imagens/flower.jpeg" },
    { title: "Idol Supernova", category: "Chibi", height: 600, src: "imagens/folha_na_cabeça.jpeg", big: "imagens/folha_na_cabeça.jpeg" },
    { title: "Caçadora de Dragões", category: "Anime", height: 900, src: "imagens/hange.jpeg", big: "imagens/hange.jpeg" },
    { title: "Menina da Chuva", category: "Semi Realista", height: 800, src: "imagens/lorita.jpeg", big: "imagens/lorita.jpeg" },
    { title: "Herói Relâmpago", category: "Anime", height: 700, src: "imagens/lorita_rainha_caipira.jpg", big: "imagens/lorita_rainha_caipira.jpg" }
  ],

  // Planos e preços exibidos na seção de orçamento
  pricing: [
    {
      name: "ANIME",
      description: "O clássico: traço limpo e cores vibrantes.",
      isPopular: false,
      services: [
        ["bust", "Busto", "R$ 60,00"],
        ["half", "Meio Corpo", "R$ 80,00"],
        ["full", "Corpo Inteiro", "R$ 100,00"]
      ],
      extras: [
        ["map", "Cenário", "+ R$30,00"],
        ["paw", "Animais", "+ R$20,00"],
        ["plus", "+1 Personagem", "+ valor original"]
      ]
    },
    {
      name: "SEMI REALISTA",
      description: "Detalhe e profundidade para um visual de capa.",
      isPopular: true,
      services: [
        ["bust", "Busto", "R$ 70,00"],
        ["half", "Meio Corpo", "R$ 90,00"],
        ["full", "Corpo Inteiro", "R$ 130,00"]
      ],
      extras: [
        ["map", "Cenário", "R$40,00"],
        ["paw", "Animais", "+ R$30,00"],
        ["plus", "+1 Personagem", "+ valor original"]
      ]
    },
    {
      name: "CHIBI",
      description: "Fofo, divertido e cheio de personalidade.",
      isPopular: false,
      services: [
        ["bust", "Busto", "R$ 30,00"],
        ["full", "Corpo Inteiro", "R$ 50,00"]
      ],
      extras: [
        ["map", "Cenário", "+ R$25,00"],
        ["paw", "Animais", "+ R$15,00"],
        ["plus", "+1 Personagem", "+ valor original"]
      ]
    }
  ]
};

/* ============================================================
   2. UTILITÁRIOS
   ============================================================ */

// Seleciona um único elemento (ou dentro de um escopo)
const select = (selector, root = document) => root.querySelector(selector);

// Seleciona todos os elementos e retorna um array
const selectAll = (selector, root = document) => [...root.querySelectorAll(selector)];

// Gera um link do WhatsApp com mensagem pré-preenchida
const buildWhatsAppLink = (message) => {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
};

/* ============================================================
   3. INICIALIZAÇÃO: NOME, LINKS SOCIAIS E ANO DO RODAPÉ
   ============================================================ */

// Exibe o nome do artista em todos os elementos [data-artist]
const initArtistName = () => {
  selectAll('[data-artist]').forEach((element) => {
    element.textContent = CONFIG.artist;
  });
};

// Configura os links de WhatsApp, Discord e Instagram
const initSocialLinks = () => {
  const whatsappButton = select('#bw');
  const discordButton = select('#bd');
  const instagramButton = select('#bi');

  whatsappButton.href = buildWhatsAppLink("Olá! Quero encomendar uma arte");
  discordButton.href = CONFIG.discord;
  instagramButton.href = CONFIG.instagram;
};

// Exibe o ano atual no rodapé (#yr)
const initFooterYear = () => {
  const yearElement = select('#yr');
  yearElement.textContent = new Date().getFullYear();
};

/* ============================================================
   4. TELA DE CARREGAMENTO
   ============================================================ */

// Esconde o loading (#ld) após 1 segundo e inicia as
// animações de reveal nos elementos da página
const initLoadingScreen = () => {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loadingScreen = select('#ld');
      loadingScreen.classList.add('off');
      initRevealOnScroll();
    }, 1000);
  });
};

/* ============================================================
   5. GALERIA DE OBRAS
   ============================================================ */

// Cria os cards da galeria a partir dos dados em CONFIG.gallery
const buildGallery = () => {
  const galleryContainer = select('#mas');

  CONFIG.gallery.forEach((artwork, index) => {
    const item = document.createElement('div');
    item.className = 'it rv';
    item.dataset.c = artwork.category;

    // Atraso escalonado da animação de reveal (a cada 3 itens)
    item.style.setProperty('--dl', `${(index % 3) * 0.08}s`);

    // Marca o item do meio de cada linha para o efeito parallax
    if (index % 3 === 1) {
      item.dataset.px = 1;
    }

    item.innerHTML = `
      <button class="card" aria-label="Abrir ${artwork.title}">
        <img
          loading="lazy"
          src="${artwork.src}"
          width="600"
          height="${artwork.height}"
          alt="${artwork.title} - ilustração ${artwork.category}"
        >
        <div class="cap">
          <b>${artwork.title}</b>
          <span>${artwork.category}</span>
        </div>
      </button>
    `;

    galleryContainer.append(item);

    const card = select('.card', item);
    card.onclick = () => openLightbox(index);

    // Efeito de inclinação 3D ao passar o mouse sobre o card
    card.addEventListener('mousemove', (event) => {
      if (window.matchMedia('(hover:none)').matches) return;

      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
};

// Filtra os cards da galeria por estilo (Anime / Semi Realista / Chibi)
const initGalleryFilters = () => {
  selectAll('.fl').forEach((button) => {
    button.onclick = () => {
      // Atualiza o botão de filtro ativo
      selectAll('.fl').forEach((other) => other.classList.remove('on'));
      button.classList.add('on');

      const filter = button.dataset.f;

      selectAll('.it').forEach((item) => {
        const shouldShow = filter === 'all' || item.dataset.c === filter;

        if (shouldShow) {
          item.classList.remove('gone');
          window.requestAnimationFrame(() => item.classList.remove('hide'));
        } else {
          item.classList.add('hide');
          setTimeout(() => {
            if (item.classList.contains('hide')) {
              item.classList.add('gone');
            }
          }, 420);
        }
      });
    };
  });
};

/* ============================================================
   6. PARALLAX LEVE NO SCROLL
   ============================================================ */

// Move levemente os elementos marcados com [data-px] durante o scroll
const initParallax = () => {
  let isProcessing = false;
  const parallaxElements = selectAll('[data-px]');

  window.addEventListener('scroll', () => {
    if (isProcessing || window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

    isProcessing = true;

    window.requestAnimationFrame(() => {
      const centerY = window.innerHeight / 2;

      parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenterY = rect.top + rect.height / 2;
        const offset = (elementCenterY - centerY) * -0.06;
        element.style.translate = `0 ${offset.toFixed(1)}px`;
      });

      isProcessing = false;
    });
  }, { passive: true });
};

/* ============================================================
   7. LIGHTBOX (VISUALIZADOR DE IMAGEM AMPLIADA)
   ============================================================ */

// Descrições exibidas no lightbox para cada estilo de arte
const STYLE_NOTES = {
  Anime: "Traço limpo, cores vibrantes e muita expressão. O estilo clássico que dá vida ao seu personagem.",
  "Semi Realista": "Proporções e iluminação mais realistas, com acabamento detalhado em pele, cabelo e olhar.",
  Chibi: "Proporções fofas e cheias de personalidade. Perfeito para stickers, avatares e presentes."
};

let currentArtworkIndex = 0;
const lightbox = select('#lb');
const lightboxInner = select('#li');

// Abre o lightbox na obra de índice dado (faz wrap-around nas extremidades)
const openLightbox = (index) => {
  currentArtworkIndex = (index + CONFIG.gallery.length) % CONFIG.gallery.length;
  const artwork = CONFIG.gallery[currentArtworkIndex];

  lightboxInner.classList.remove('z');

  const image = select('#lim');
  image.src = artwork.big;
  image.alt = artwork.title;

  select('#lh').textContent = artwork.title;
  select('#lt').textContent = artwork.category;
  select('#lpp').textContent = STYLE_NOTES[artwork.category];

  select('#lw').href = buildWhatsAppLink(
    `Olá! Vi a arte "${artwork.title}" e quero encomendar uma no estilo ${artwork.category}`
  );

  lightbox.classList.add('on');
  document.body.style.overflow = 'hidden';
  select('#lc').focus();
};

// Fecha o lightbox
const closeLightbox = () => {
  lightbox.classList.remove('on');
  document.body.style.overflow = '';
};

// Inicializa os controles do lightbox (fechar, navegar, zoom, teclado)
const initLightbox = () => {
  // Botão de fechar (#lc)
  select('#lc').onclick = closeLightbox;

  // Navegação anterior (#lp) e próxima (#ln)
  select('#lp').onclick = () => openLightbox(currentArtworkIndex - 1);
  select('#ln').onclick = () => openLightbox(currentArtworkIndex + 1);

  // Fecha ao clicar no fundo do lightbox
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  // Alterna o zoom da imagem (#li)
  lightboxInner.onclick = () => lightboxInner.classList.toggle('z');

  // Navegação por teclado
  window.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('on')) return;

    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') openLightbox(currentArtworkIndex - 1);
    if (event.key === 'ArrowRight') openLightbox(currentArtworkIndex + 1);
  });
};

/* ============================================================
   8. PREÇOS E PLANOS
   ============================================================ */

// Monta o HTML de um item de lista (serviço ou extra)
const buildPriceListItem = (entry, isExtra = false) => {
  const [iconId, label, price] = entry;
  return `
    <li${isExtra ? ' class="x"' : ''}>
      <svg class="i"><use href="#${iconId}" /></svg>
      <span>${label}</span>
      <b>${price}</b>
    </li>
  `;
};

// Renderiza os cards de preços na seção #pg
const initPricing = () => {
  const pricingContainer = select('#pg');

  pricingContainer.innerHTML = CONFIG.pricing.map((plan, index) => {
    const servicesHtml = plan.services.map((entry) => buildPriceListItem(entry)).join('');
    const extrasHtml = plan.extras.map((entry) => buildPriceListItem(entry, true)).join('');

    return `
      <article
        class="pc glass rv${plan.isPopular ? ' ft' : ''}"
        style="--dl:${index * 0.1}s"
      >
        ${plan.isPopular ? '<span class="pt">MAIS PEDIDO</span>' : ''}
        <h3>${plan.name}</h3>
        <p class="d">${plan.description}</p>
        <ul>${servicesHtml}</ul>
        <h4>Extras</h4>
        <ul>${extrasHtml}</ul>
        <small>Preços podem alterar de acordo com a complexidade</small>
        <a
          class="btn ${plan.isPopular ? 'pri' : 'sec'}"
          target="_blank"
          rel="noopener"
          href="${buildWhatsAppLink(`Olá! Quero encomendar uma arte no estilo ${plan.name}`)}"
        >
          Encomendar este estilo
        </a>
      </article>
    `;
  }).join('');
};

/* ============================================================
   9. ANIMAÇÃO REVELA NO SCROLL
   ============================================================ */

// Adiciona a classe 'in' aos elementos .rv quando entram na viewport
const initRevealOnScroll = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px' }
  );

  selectAll('.rv').forEach((element) => observer.observe(element));
};

/* ============================================================
   10. MENU MOBILE
   ============================================================ */

// Abre e fecha o menu hamburguer no mobile
const initMobileMenu = () => {
  const header = select('header');
  const menuBackdrop = select('#bg');

  const toggleMenu = (isOpen) => {
    header.classList.toggle('open', isOpen);
    menuBackdrop.setAttribute('aria-expanded', isOpen);
  };

  menuBackdrop.onclick = () => toggleMenu(!header.classList.contains('open'));

  // Fecha o menu ao clicar em um link de navegação
  selectAll('nav a').forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Fecha o menu com a tecla Escape
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') toggleMenu(false);
  });
};

/* ============================================================
   11. TOUCH NO LIGHTBOX (SWIPE PARA NAVEGAR OU FECHAR)
   ============================================================ */

// Detecta swipe no lightbox para navegar entre obras ou fechar
const initLightboxTouch = () => {
  const lightboxContainer = select('.lbx');
  let startX = 0;
  let startY = 0;

  lightboxContainer.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  }, { passive: true });

  lightboxContainer.addEventListener('touchend', (event) => {
    // Se o zoom estiver ativo, não navega
    if (lightboxInner.classList.contains('z')) return;

    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // Swipe horizontal: navega para a próxima ou obra anterior
    if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      openLightbox(currentArtworkIndex + (deltaX < 0 ? 1 : -1));
    }
    // Swipe para baixo: fecha o lightbox
    else if (deltaY > 110 && Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
      closeLightbox();
    }
  }, { passive: true });
};

/* ============================================================
   12. BOTÃO VOLTAR AO TOPO
   ============================================================ */

// Mostra ou esconde o botão fixo (#sb) com base na posição do scroll
const initBackToTopButton = () => {
  const backToTopButton = select('#sb');
  let hasPassedHero = false;
  let isAtEnd = false;

  const updateVisibility = () => {
    backToTopButton.classList.toggle('show', hasPassedHero && !isAtEnd);
  };

  // Observa o final da seção .hero
  new IntersectionObserver((entries) => {
    hasPassedHero = !entries[0].isIntersecting;
    updateVisibility();
  }).observe(select('.hero'));

  // Observa a seção de contato #contato
  new IntersectionObserver((entries) => {
    isAtEnd = entries[0].isIntersecting;
    updateVisibility();
  }).observe(select('#contato'));
};

/* ============================================================
   13. EXECUÇÃO PRINCIPAL
   ============================================================ */

initArtistName();
initSocialLinks();
initFooterYear();
initLoadingScreen();
buildGallery();
initGalleryFilters();
initParallax();
initLightbox();
initLightboxTouch();
initPricing();
initMobileMenu();
initBackToTopButton();
