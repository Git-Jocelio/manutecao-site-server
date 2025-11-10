// URL da API
const API_URL = "http://localhost:3000/api/noticias";

// Função para buscar e exibir as notícias
async function carregarNoticias() {
  try {
    const resposta = await fetch(API_URL);
    const noticias = await resposta.json();

    const lista = document.getElementById("lista-noticias");
    lista.innerHTML = ""; // limpa antes de inserir

    noticias.forEach(noticia => {
      const item = document.createElement("div");
      item.classList.add("noticia");

      item.innerHTML = `
        <h2>${noticia.titulo}</h2>
        <p><a href="${noticia.link}" target="_blank">Acessar notícia</a></p>
        <p><strong>Postagem:</strong> ${new Date(noticia.postagem).toLocaleDateString()}</p>
      `;

      lista.appendChild(item);
    });
  } catch (erro) {
    console.error("Erro ao carregar notícias:", erro);
    document.getElementById("lista-noticias").innerText = "Erro ao carregar notícias.";
  }
}

// Chama a função assim que a página for carregada
carregarNoticias();
