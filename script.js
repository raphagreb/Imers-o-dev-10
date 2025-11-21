let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("header input");
let dados = [];

async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca do JSON.
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
            return;
        }
    }

    let termoBusca = inputBusca.value.toLowerCase();

    let dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    dados.forEach((dado, index) => {
        let article = document.createElement("article");
        article.classList.add("card");
        article.classList.add("card-animation"); // Adiciona a classe para animar
        article.style.animationDelay = `${index * 100}ms`; // Adiciona um delay escalonado
        article.innerHTML = ` 
        <h2>${dado.nome}</h2>
        <p>${dado.data_criacao}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Página do jogo</a>
        `
        cardContainer.appendChild(article);
    });
}
