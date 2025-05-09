document.getElementById("btnSalvar").addEventListener("click", salvarUsuario);

function salvarUsuario() {
    const nome = document.getElementById("nome").value;
    
    if (nome.trim() === "") {
        alert("Digite um nome válido!");
        return;
    }

    fetch("http://localhost:3000/salvar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome })
    })
    .then(res => {
        if (!res.ok) throw new Error(`Erro: ${res.status}`);
        return res.json();
    })
    .then(() => listarUsuarios())
    .catch(err => console.error("Erro ao salvar:", err));
    
}

function listarUsuarios() {
    fetch("http://localhost:3000/usuarios")
    .then(res => res.json())
    .then(usuarios => {
        const lista = document.getElementById("listaUsuarios");
        lista.innerHTML = "";

        if (usuarios.length === 0) {
            lista.innerHTML = "<li>Nenhum usuário cadastrado ainda.</li>";
        } else {
            usuarios.forEach(user => {
                const li = document.createElement("li");
                li.textContent = user.nome;

                const btnExcluir = document.createElement("button");
                btnExcluir.textContent = "❌ Excluir";
                btnExcluir.onclick = () => excluirUsuario(user.id);

                li.appendChild(btnExcluir);
                lista.appendChild(li);
            });
        }
    })
    .catch(err => console.error("Erro ao listar usuários:", err));
}

function excluirUsuario(id) {
    fetch(`http://localhost:3000/deletar/${id}`, { method: "DELETE" })
    .then(res => {
        if (!res.ok) throw new Error("Erro ao excluir: " + res.status);
        listarUsuarios();
    })
    .catch(err => console.error(err));
}

// Carregar a lista de usuários ao iniciar
listarUsuarios();