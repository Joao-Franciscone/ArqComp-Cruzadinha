document.addEventListener('DOMContentLoaded', inicializar);

let celulas = [];
let celulaSelecionada = null;
let direcaoAtual = 'H'; 
let palavraAtiva = null;

const DIRECOES_PALAVRAS = {
    MEMORIADEMASSA: 'H',
    MICROCONTROLADOR: 'H',
    RAM: 'H',
    CACHE: 'H',
    ULA: 'H',
    UC: 'H',
    ROM: 'H',
    EEPROM: 'V',
    DMA: 'V',
    REGISTRADORES: 'V',
    FLASH: 'V',
    CPU: 'V'
};

function inicializar() {
    const listaNos = document.querySelectorAll('.crossword-grid .cell');
    celulas = Array.from(listaNos);

    celulas.forEach((cell) => {
        const row = Number(cell.dataset.row);
        const col = Number(cell.dataset.col);
        cell.style.gridRow = row;
        cell.style.gridColumn = col;

        const spanLetra = cell.querySelector('.letra');
        if (spanLetra) {
            cell.dataset.solution = spanLetra.textContent.trim().toUpperCase();
            spanLetra.textContent = '';
        }

        cell.tabIndex = 0;
        cell.addEventListener('click', () => aoClicarCelula(cell));
        cell.addEventListener('keydown', aoPressionarTecla);
    });

    document.querySelectorAll('.clue-item').forEach((item) => {
        item.addEventListener('click', () => {
            const palavra = item.dataset.palavra;
            const dir = item.dataset.dir;
            selecionarPalavraPorNome(palavra, dir);
        });
    });

    const btnConferir = document.getElementById('check-btn');
    const btnRevelar = document.getElementById('reveal-btn');
    const btnReiniciar = document.getElementById('reset-btn');

    if (btnConferir) btnConferir.addEventListener('click', verificarRespostas);
    if (btnRevelar) btnRevelar.addEventListener('click', revelarRespostas);
    if (btnReiniciar) btnReiniciar.addEventListener('click', reiniciarGrade);
}

function obterPalavrasDaCelula(cell) {
    const attr = cell.dataset.palavras || '';
    return attr
        .split(',')
        .map((parte) => parte.trim())
        .filter(Boolean)
        .map((parte) => {
            const [nome, pos] = parte.split(':');
            return { nome, pos: Number(pos), dir: DIRECOES_PALAVRAS[nome] };
        });
}

function aoClicarCelula(cell) {
    const palavras = obterPalavrasDaCelula(cell);

    if (celulaSelecionada === cell && palavras.length > 1) {
        direcaoAtual = direcaoAtual === 'H' ? 'V' : 'H';
    } else if (palavras.length === 1) {
        direcaoAtual = palavras[0].dir;
    } else if (palavras.length > 1) {
        const temDirecaoAtual = palavras.some((p) => p.dir === direcaoAtual);
        if (!temDirecaoAtual) {
            direcaoAtual = palavras[0].dir;
        }
    }

    selecionarCelula(cell);
}

function selecionarCelula(cell) {
    if (!cell) return;

    celulas.forEach((c) => {
        c.classList.remove('cell--active', 'cell--word-active');
    });

    celulaSelecionada = cell;
    cell.classList.add('cell--active');
    cell.focus();

    const palavras = obterPalavrasDaCelula(cell);
    const escolhida = palavras.find((p) => p.dir === direcaoAtual) || palavras[0];

    if (escolhida) {
        palavraAtiva = escolhida.nome;
        destacarPalavra(palavraAtiva);
    }
}

function selecionarPalavraPorNome(nomePalavra, dir) {
    direcaoAtual = dir;
    const celulasDaPalavra = obterCelulasOrdenadas(nomePalavra);
    if (celulasDaPalavra.length > 0) {
        selecionarCelula(celulasDaPalavra[0]);
    }
}

function destacarPalavra(nomePalavra) {
    celulas.forEach((c) => {
        const pertence = obterPalavrasDaCelula(c).some((p) => p.nome === nomePalavra);
        if (pertence) {
            c.classList.add('cell--word-active');
        }
    });

    document.querySelectorAll('.clue-item').forEach((item) => {
        item.classList.toggle('clue-item--active', item.dataset.palavra === nomePalavra);
    });
}

function obterCelulasOrdenadas(nomePalavra) {
    const filtradas = [];
    celulas.forEach((c) => {
        const info = obterPalavrasDaCelula(c).find((p) => p.nome === nomePalavra);
        if (info) {
            filtradas.push({ cell: c, pos: info.pos });
        }
    });
    filtradas.sort((a, b) => a.pos - b.pos);
    return filtradas.map((item) => item.cell);
}

function aoPressionarTecla(e) {
    if (!celulaSelecionada) return;
    const tecla = e.key;

    if (tecla.length === 1 && /^[a-zA-Z]$/.test(tecla)) {
        e.preventDefault();
        const spanLetra = celulaSelecionada.querySelector('.letra');
        if (spanLetra) {
            spanLetra.textContent = tecla.toUpperCase();
        }
        celulaSelecionada.classList.remove('cell--correct', 'cell--wrong');
        avancarNaPalavra(1);
        return;
    }

    if (tecla === 'Backspace') {
        e.preventDefault();
        const spanLetra = celulaSelecionada.querySelector('.letra');
        if (spanLetra && spanLetra.textContent !== '') {
            spanLetra.textContent = '';
            celulaSelecionada.classList.remove('cell--correct', 'cell--wrong');
        } else {
            avancarNaPalavra(-1);
            const anteriorSpan = celulaSelecionada.querySelector('.letra');
            if (anteriorSpan) anteriorSpan.textContent = '';
            celulaSelecionada.classList.remove('cell--correct', 'cell--wrong');
        }
        return;
    }

    if (tecla === 'ArrowRight') {
        e.preventDefault();
        direcaoAtual = 'H';
        moverPorCoordenada(0, 1);
    } else if (tecla === 'ArrowLeft') {
        e.preventDefault();
        direcaoAtual = 'H';
        moverPorCoordenada(0, -1);
    } else if (tecla === 'ArrowDown') {
        e.preventDefault();
        direcaoAtual = 'V';
        moverPorCoordenada(1, 0);
    } else if (tecla === 'ArrowUp') {
        e.preventDefault();
        direcaoAtual = 'V';
        moverPorCoordenada(-1, 0);
    }
}

function avancarNaPalavra(passo) {
    if (!palavraAtiva) return;
    const lista = obterCelulasOrdenadas(palavraAtiva);
    const idx = lista.indexOf(celulaSelecionada);
    if (idx !== -1 && lista[idx + passo]) {
        selecionarCelula(lista[idx + passo]);
    }
}

function moverPorCoordenada(dRow, dCol) {
    const row = Number(celulaSelecionada.dataset.row) + dRow;
    const col = Number(celulaSelecionada.dataset.col) + dCol;
    const destino = celulas.find(
        (c) => Number(c.dataset.row) === row && Number(c.dataset.col) === col
    );
    if (destino) {
        selecionarCelula(destino);
    }
}

function verificarRespostas() {
    let acertos = 0;
    const totalPalavras = Object.keys(DIRECOES_PALAVRAS).length;

    celulas.forEach((c) => c.classList.remove('cell--correct', 'cell--wrong'));

    Object.keys(DIRECOES_PALAVRAS).forEach((nomePalavra) => {
        const listaCelulas = obterCelulasOrdenadas(nomePalavra);
        const tentativa = listaCelulas
            .map((c) => (c.querySelector('.letra')?.textContent || '').trim().toUpperCase())
            .join('');

        const clueEl = document.querySelector(`.clue-item[data-palavra="${nomePalavra}"]`);

        if (tentativa === nomePalavra) {
            acertos++;
            listaCelulas.forEach((c) => {
                c.classList.remove('cell--wrong');
                c.classList.add('cell--correct');
            });
            if (clueEl) clueEl.classList.add('clue-item--solved');
        } else {
            if (clueEl) clueEl.classList.remove('clue-item--solved');
            listaCelulas.forEach((c) => {
                const digitada = (c.querySelector('.letra')?.textContent || '').trim();
                if (digitada && !c.classList.contains('cell--correct')) {
                    c.classList.add('cell--wrong');
                }
            });
        }
    });

    const scoreEl = document.getElementById('score-value');
    const feedbackEl = document.getElementById('feedback-msg');
    if (scoreEl) scoreEl.textContent = String(acertos);

    if (feedbackEl) {
        if (acertos === totalPalavras) {
            feedbackEl.textContent = 'Parabéns! Você completou toda a cruzadinha.';
            feedbackEl.style.color = 'var(--correct-border)';
        } else {
            feedbackEl.textContent = `Você acertou ${acertos} de ${totalPalavras} palavras.`;
            feedbackEl.style.color = 'var(--text-muted)';
        }
    }
}

function revelarRespostas() {
    celulas.forEach((c) => {
        const spanLetra = c.querySelector('.letra');
        if (spanLetra && c.dataset.solution) {
            spanLetra.textContent = c.dataset.solution;
        }
    });
    verificarRespostas();
}

function reiniciarGrade() {
    celulas.forEach((c) => {
        const spanLetra = c.querySelector('.letra');
        if (spanLetra) spanLetra.textContent = '';
        c.classList.remove('cell--correct', 'cell--wrong', 'cell--active', 'cell--word-active');
    });

    document.querySelectorAll('.clue-item').forEach((item) => {
        item.classList.remove('clue-item--active', 'clue-item--solved');
    });

    const scoreEl = document.getElementById('score-value');
    const feedbackEl = document.getElementById('feedback-msg');
    if (scoreEl) scoreEl.textContent = '0';
    if (feedbackEl) feedbackEl.textContent = '';

    celulaSelecionada = null;
    palavraAtiva = null;
}