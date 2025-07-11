  

const subitems = {
    1: {
        title: "Dados de consumo",
        items: [
            `<a href="TelaConsumoGas.html">Leitura do Gás</a>`,
            "Leitura da água e acompanhamento de consumo"
        ]
    },
    2: {
        title: "Interação entre moradores",
        items: [
            "Quero ser seu PET Sitter",
            "Me empresta sua garagem?",
            "Eu estou vendendo! (doces, salgados, pães)",
            "Prestadores preferidos"
        ]
    }
};

function clearActive() {
    document.querySelectorAll('.sidebar button').forEach(btn => btn.classList.remove('active'));
}

function showSubitems(menuId) {
    clearActive();
    const btn = document.getElementById('menu' + menuId);
    if (btn) btn.classList.add('active');
    const main = document.getElementById('mainContent');
    if (subitems[menuId]) {
        const { title, items } = subitems[menuId];
        main.innerHTML = `
            <div class="subitems-list">
                <h2>${title}</h2>
                <ul>
                    ${items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    } else {
        main.innerHTML = `
            <div class="subitems-list">
                <h2>${btn ? btn.textContent : 'Opção selecionada'}</h2>
                <p>Em breve, mais informações sobre esta opção.</p>
            </div>
        `;
    }
}