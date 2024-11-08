export default function criarCard(data) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src='${data.image}' alt='Imagem do personagem'>
        <p>Nome: ${data.name}</p>
        <p>Gênero: ${data.gender}</p>
        <p>Espécie: ${data.species}</p>
        <p>Origem: ${data.origin?.name || "Desconhecido"}</p>
        <p>Status: ${data.status}</p>
    `;
    return card;
}
async function buscarPersonagens(nome, status) {
    try {
        const url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(nome)}${status ? `&status=${encodeURIComponent(status)}` : ''}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro na busca de personagens");
        }
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Erro ao buscar personagens:", error);
        return [];
    }
}
function iniciarBuscaPersonagens() {
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    const form = document.createElement('form');
    form.innerHTML = `
        <input type="text" id="nome-personagem" placeholder="Nome do personagem" required>
        <select id="status-personagem">
            <option value="">Selecione o status</option>
            <option value="alive">Vivo</option>
            <option value="dead">Morto</option>
            <option value="unknown">Desconhecido</option>
        </select>
        <button type="submit">Buscar</button>
    `;
    const resultadosContainer = document.createElement('div');
    resultadosContainer.id = 'resultados';
    nav.appendChild(form);
    document.body.appendChild(nav);
    document.body.appendChild(resultadosContainer);
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        const nome = document.getElementById('nome-personagem').value;
        const status = document.getElementById('status-personagem').value;
        const personagens = await buscarPersonagens(nome, status);
        resultadosContainer.innerHTML = '';
        if (personagens.length > 0) {
            personagens.forEach(personagem => {
                const card = criarCard(personagem);
                resultadosContainer.appendChild(card);
            });
        } else {
            resultadosContainer.innerHTML = `<p>Nenhum personagem encontrado com o nome "${nome}" e status "${status}".</p>`;
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    iniciarBuscaPersonagens();
});
