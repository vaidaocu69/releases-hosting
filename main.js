// =================================================================
// SELEÇÃO DE ELEMENTOS DO DOM
// =================================================================
const input = document.getElementById("searchInput");
const buttons = document.querySelectorAll(".filter-button");
const cards = document.querySelectorAll(".game-card");
const empty = document.getElementById("emptyMessage");

// Estado inicial da categoria selecionada
let category = "todos";


// =================================================================
// FUNÇÃO PRINCIPAL DE FILTRAGEM E ATUALIZAÇÃO
// =================================================================
function updateGames() {
  const query = input.value.toLowerCase().trim();
  let visible = 0;

  cards.forEach(card => {
    // Verifica se o card atende à categoria e ao texto pesquisado
    const matchesCategory = (category === "todos" || card.dataset.category === category);
    const matchesSearch = card.dataset.title.includes(query);
    const show = matchesCategory && matchesSearch;

    // Exibe ou oculta o card com base no filtro
    card.style.display = show ? "block" : "none";
    
    if (show) {
      visible++;
    }
  });

  // Mostra ou oculta a mensagem de "nenhum resultado encontrado"
  empty.style.display = visible ? "none" : "block";
}


// =================================================================
// EVENT LISTENERS (INTERAÇÕES DO USUÁRIO)
// =================================================================

// Evento de digitação na barra de pesquisa
input.addEventListener("input", updateGames);

// Evento de clique nos botões de filtro por categoria
buttons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove a classe 'active' de todos os botões
    buttons.forEach(item => item.classList.remove("active"));
    
    // Adiciona a classe 'active' apenas no botão clicado
    button.classList.add("active");
    
    // Atualiza a categoria atual e refaz a filtragem
    category = button.dataset.category;
    updateGames();
  });
});