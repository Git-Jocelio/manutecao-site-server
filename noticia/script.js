// URL da API
const API_URL = "http://localhost:3000/api/noticias";

// Função para buscar e exibir as notícias
async function carregarNoticias() {
  try {
    const resposta = await fetch(API_URL);
    const noticias = await resposta.json();

    const tabela = document.getElementById("lista-noticias");
    tabela.innerHTML = ""; // limpa antes de inserir

    noticias.forEach(noticia => {
      const linha = document.createElement("tr");

      linha.innerHTML = `
        <td>${noticia.idnoticia}</td>
        <td>${noticia.titulo}</td>
        <td><a href="${noticia.link}" target="_blank">Acessar</a></td>
        <td>${new Date(noticia.postagem).toLocaleDateString()}</td>
        <td>${noticia.exibir ? "Sim" : "Não"}</td>
        <td>
          <button onclick="editarNoticia(${noticia.idnoticia})">✏️ Editar</button>
          <button onclick="excluirNoticia(${noticia.idnoticia})">🗑️ Excluir</button>
        </td>
      `;

      tabela.appendChild(linha);
    });
  } catch (erro) {
    console.error("Erro ao carregar notícias:", erro);
    document.getElementById("lista-noticias").innerHTML =
      `<tr><td colspan="6">Erro ao carregar notícias.</td></tr>`;
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

// ✅ Função para excluir uma notícia (DELETE)
async function excluirNoticia(id) {
  if (!confirm("Deseja realmente excluir esta notícia?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    alert(data.message || "Notícia excluída com sucesso!");

    carregarNoticias(); // recarrega a lista
  } catch (error) {
    console.error("Erro ao excluir notícia:", error);
    alert("Erro ao excluir notícia.");
  }
}

//Controle de exibição do formulário
const botaoMostrarForm = document.getElementById("btn-mostrar-form");
const formSection = document.getElementById("form-section");

botaoMostrarForm.addEventListener("click", () => {
  // Alterna entre mostrar e ocultar o formulário
  const visivel = formSection.style.display === "block";

  formSection.style.display = visivel ? "none" : "block";
  botaoMostrarForm.textContent = visivel
    ? "📰 Cadastrar nova notícia"
    : "❌ Fechar formulário";
});


carregarNoticias();
