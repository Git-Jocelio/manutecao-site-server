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
        
        <p><strong>Exibir:</strong> ${noticia.exibir ? 'Sim' : 'Não'}</p>
      `;

      lista.appendChild(item);
    });
  } catch (erro) {
    console.error("Erro ao carregar notícias:", erro);
    document.getElementById("lista-noticias").innerText = "Erro ao carregar notícias.";
  }
}

//////////////////
// 🔹 Função para adicionar nova notícia (POST)
async function adicionarNoticia(event) {
  event.preventDefault(); // evita recarregar a página

  const titulo = document.getElementById("titulo").value.trim();
  const link = document.getElementById("link").value.trim();
  const postagem = document.getElementById("postagem").value;
  const mensagem = document.getElementById("mensagem");
  const exibir = document.getElementById("exibir").value;

  if (!titulo || !link || !postagem) {
    mensagem.textContent = "Preencha todos os campos!";
    mensagem.style.color = "red";
    return;
  }

  mensagem.textContent = "Salvando...";
  mensagem.style.color = "black";

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, link, postagem, exibir })
    });

    if (!resposta.ok) {
      throw new Error("Erro ao salvar notícia.");
    }

    mensagem.textContent = "✅ Notícia adicionada com sucesso!";
    mensagem.style.color = "green";
    document.getElementById("form-noticia").reset();

    // recarrega a lista para mostrar a nova notícia
    carregarNoticias();

  } catch (erro) {
    console.error(erro);
    mensagem.textContent = "❌ Erro ao salvar notícia.";
    mensagem.style.color = "red";
  }
}
///////////////////
// 🔹 Eventos e inicialização
document.getElementById("form-noticia").addEventListener("submit", adicionarNoticia);
carregarNoticias();
