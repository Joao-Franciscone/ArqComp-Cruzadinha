# 🧩 Cruzadinha — Arquitetura Computacional

Jogo interativo de palavras cruzadas desenvolvido em **HTML5**, **CSS3** e **JavaScript** para praticar os conceitos fundamentais da disciplina de **Arquitetura Computacional**.

🔗 **Acesse o jogo online:** <https://joao-franciscone.github.io/ArqComp-Cruzadinha/>

## 🎮 Como Jogar

1. **Selecione uma palavra:** Clique diretamente em qualquer casa do tabuleiro ou clique em uma das pistas na lista lateral (**Horizontais** ou **Verticais**).

2. **Alterne a direção:** Caso clique em uma casa onde duas palavras se cruzam, clique novamente nela para alternar entre o preenchimento **Horizontal (→)** e **Vertical (↓)**.

3. **Preencha as letras:**

   * Digite as letras de **A a Z** no teclado (o cursor avança automaticamente para a próxima casa da palavra).

   * Pressione **Backspace** para apagar a letra atual ou voltar para a casa anterior.

   * Use as **Setas Direcionais (`↑` `↓` `←` `→`)** para navegar livremente pelo tabuleiro.

4. **Confira seu progresso:**

   * Clique em **Conferir Respostas** para validar o tabuleiro (palavras corretas ficam destacadas em verde, erros em vermelho e o contador de acertos é atualizado).

   * Clique em **Revelar Tudo** para visualizar o gabarito completo.

   * Clique em **Reiniciar** para limpar o tabuleiro e jogar novamente.

## 📋 Palavras e Pistas

### Horizontais (→)

| Nº | Palavra no Tabuleiro | Pista | 
| ----- | ----- | ----- | 
| **1** | `MEMORIADEMASSA` | Armazenamento de longo prazo que guarda arquivos e programas. | 
| **3** | `MICROCONTROLADOR` | Computador pequeno e de baixo custo utilizado para tarefas específicas. | 
| **5** | `RAM` | Armazenamento dentro do computador volátil e localizado em pentes na placa-mãe do Desktop. | 
| **7** | `CACHE` | Memória que grava as últimas informações do processador. | 
| **9** | `ULA` | Parte do processamento que executa suas contas na calculadora do computador. | 
| **11** | `UC` | Parte de um processador que ordena a outra parte dele a executar 2 + 2. | 
| **12** | `ROM` | Tipo de armazenamento que guarda informações essenciais para que o computador dê o start inicial. | 

### Verticais (↓)

| Nº | Palavra no Tabuleiro | Pista | 
| ----- | ----- | ----- | 
| **2** | `EEPROM` | Memória não volátil usada para guardar pequenos dados de configuração. No ATmega328P possui 1KB. | 
| **4** | `DMA` | Auxiliar da CPU responsável por permitir troca de dados sem passar por ela em cada byte. | 
| **6** | `REGISTRADORES` | Memória pequena e rápida que fica dentro do processador e guarda informações do momento. | 
| **8** | `FLASH` | Memória que guarda o programa mesmo sem energia. Armazenamento máximo no ATmega328P é 31,5 KB. | 
| **10** | `CPU` | O cérebro de um computador. Busca e executa as instruções do programa. | 

## 🗂️ Estrutura do Projeto

```
ArqComp-Cruzadinha/
├── index.html       # Estrutura do tabuleiro, controles e painel de pistas
├── css/
│   └── style.css    # Estilização e layout responsivo com CSS Grid e Flexbox
├── js/
│   └── script.js    # Lógica de navegação, validação e contagem de acertos
└── README.md        # Documentação do jogo

```

## 🛠️ Tecnologias Utilizadas

* **HTML5**

* **CSS3**

* **JavaScript (ES6+)**