🧩 Palavras Cruzadas — Arquitetura Computacional

Aplicação web interativa de palavras cruzadas desenvolvida com HTML5, CSS3 e JavaScript Vanilla (ES6+) para fixação de conceitos fundamentais da disciplina de Arquitetura de Computadores.

🎯 Funcionalidades

Grade Interativa (21×19): Layout responsivo ajustado à altura da tela sem necessidade de rolagem, com suporte a cruzamentos compartilhados entre pistas horizontais e verticais.

Destaque Inteligente: Ao clicar em uma célula ou diretamente em uma pista, toda a sequência correspondente é destacada na grade.

Alternância de Direção: Clicar duas vezes em uma célula de cruzamento alterna automaticamente entre o preenchimento Horizontal (→) e Vertical (↓).

Navegação pelo Teclado:

A–Z: Preenche a célula atual e avança automaticamente para a próxima posição da sequência ativa.

Backspace: Apaga a letra atual ou recua para a célula anterior.

Setas Direcionais (↑ ↓ ← →): Movem o cursor livremente pela grade.

Validação e Placar em Tempo Real: Botões para Conferir Respostas (destacando acertos em verde e erros em vermelho), Revelar Tudo e Reiniciar a partida.

Pistas Interativas: As pistas concluídas corretamente são marcadas automaticamente no painel lateral.

🗂️ Estrutura de Arquivos

ArqComp-Cruzadinha/
├── index.html       # Estrutura semântica da grade, controles e painel de pistas
├── css/
│   └── style.css    # Estilização responsiva com CSS Grid, Flexbox e variáveis CSS
├── js/
│   └── script.js    # Lógica de navegação, validação e controle de estado
└── README.md        # Documentação do projeto


🚀 Como Executar

Por utilizar apenas tecnologias nativas da web, não há necessidade de instalar dependências ou configurar servidores:

Clone ou baixe este repositório.

Abra o arquivo index.html diretamente em qualquer navegador moderno (Chrome, Firefox, Edge, Safari).

🛠️ Tecnologias Utilizadas

HTML5 (Semântica e atributos data-* para mapeamento de coordenadas)

CSS3 (CSS Grid, Flexbox, Custom Properties e metodologia BEM)

JavaScript ES6+ (Manipulação de DOM e eventos de teclado sem bibliotecas externas)