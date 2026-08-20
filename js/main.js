document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contato");
  const msgEl = document.getElementById("form-msg");

  if (!form) return;

  // E-mail que vai receber as mensagens do formulário.
  // Troque pelo e-mail real do studio.
  const EMAIL_DESTINO = "contato@studioraquelmelo.com.br";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const dados = {
      nome: form.nome.value.trim(),
      email: form.email.value.trim(),
      telefone: form.telefone.value.trim(),
      mensagem: form.mensagem.value.trim(),
    };

    if (!dados.nome || !dados.email || !dados.mensagem) {
      mostrarMensagem("Preencha nome, e-mail e mensagem.", "erro");
      return;
    }

    // GitHub Pages não roda backend, então não há como enviar via fetch/API.
    // Como alternativa simples, abrimos o cliente de e-mail do usuário já
    // preenchido com os dados do formulário.
    const assunto = encodeURIComponent(`Contato pelo site - ${dados.nome}`);
    const corpo = encodeURIComponent(
      `Nome: ${dados.nome}\nE-mail: ${dados.email}\nTelefone: ${dados.telefone || "-"}\n\nMensagem:\n${dados.mensagem}`
    );

    window.location.href = `mailto:${EMAIL_DESTINO}?subject=${assunto}&body=${corpo}`;

    mostrarMensagem("Abrindo seu aplicativo de e-mail para enviar a mensagem...", "sucesso");
    form.reset();
  });

  function mostrarMensagem(texto, tipo) {
    msgEl.textContent = texto;
    msgEl.className = `form-msg ${tipo}`;
  }
});
