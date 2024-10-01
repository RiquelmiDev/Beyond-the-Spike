import ValorantAPI from './API/API-Valorant.js'; // Importa a classe da API Valorant
import initSplide from './carrousel.js'; // Importa a inicialização do carrossel (biblioteca Splide)

class ValorantUI {
    constructor() {
        this.dataAgentes = []; // Inicializa uma lista vazia para armazenar os dados dos agentes
    }

     // Método principal para inicializar a interface
     async initialize() {
        // Aguarda o carregamento completo do DOM
        document.addEventListener('DOMContentLoaded', async () => {
            // Busca os dados dos agentes através da API
            const agentes = await ValorantAPI.fetchAgents();

            // Verifica se há dados de agentes
            if (agentes && agentes.length) {
                // Transforma os dados da API em um formato adequado para a interface
                this.dataAgentes = agentes.map((agente, index) => ({
                    idAgente: index,
                    nomeAgente: agente.displayName,
                    descricaoAgente: agente.description,
                    displayIcon: agente.displayIcon,
                    imgAgente: agente.fullPortrait,
                    killFeedIcon: agente.killfeedPortrait,
                    background: agente.background,
                    bgGradientColors: agente.backgroundGradientColors,
                    roleAgente: agente.role,
                    habilidades: agente.abilities
                }));

                // Cria os elementos visuais com base nos dados processados
                this.criarElementosDosPersonagens(this.dataAgentes);
            } else {
                console.error("Nenhum agente encontrado.");
            }
        });
    }

    // Método responsável por criar os elementos HTML dos personagens
    criarElementosDosPersonagens(dataAgentes) {
        // Adiciona as imagens dos personagens no carrossel
        this.adicionarImagensPersonagensAoCarrousel(dataAgentes);
        // Adiciona os ícones dos personagens na seção de seleção
        this.adicionarIconesPersonagens(dataAgentes);

        // Adiciona um pequeno atraso para garantir que o DOM esteja atualizado antes de iniciar o carrossel e carregar os dados dos personagens
        setTimeout(() => {
            initSplide(); // Inicia o carrossel
            this.carregarInfoPersonagem(dataAgentes); // Carrega as informações do personagem
        }, 100); // Atraso de 100ms
    }

    // Método que insere as imagens dos personagens no carrossel
    adicionarImagensPersonagensAoCarrousel(dataAgentes) {
        const listaPersonagens = document.getElementById("listaPersonagens"); // Seleciona a lista de personagens no HTML

        // Constrói o HTML de cada personagem, usando a função map para gerar uma lista de elementos <li>
        let output = dataAgentes.map(personagemAtual => `
            <li class="splide__slide">       
                <img class="personagemImg backgroundPersonagem${personagemAtual.idAgente}" id="personagemImg${personagemAtual.idAgente}" src="${personagemAtual.imgAgente}" alt="Imagem do Personagem ${personagemAtual.nomeAgente}" title="Imagem do personagem ${personagemAtual.nomeAgente} do jogo Valorant">
            </li>
        `).join(''); // O join('') junta o array de strings gerado pelo map em uma única string

        listaPersonagens.innerHTML = output; // Insere o HTML no elemento da lista
        this.adicionaBackgroundDasImagens(dataAgentes); // Chama a função para adicionar o background dos personagens
    }

    // Método que adiciona o background para cada personagem
    adicionaBackgroundDasImagens(dataAgentes) {
        dataAgentes.forEach(element => {
            // Seleciona a imagem de fundo do personagem e aplica o estilo de background
            let imagemDeFundoPersonagem = document.querySelector(`.backgroundPersonagem${element.idAgente}`);
            imagemDeFundoPersonagem.setAttribute('style', `background-image: url("${element.background}");background-repeat: no-repeat;background-size: contain; background-position:right`);
        });
    }

    // Método que adiciona os ícones dos personagens na seção de thumbnails
    adicionarIconesPersonagens(dataAgentes) {
        const listaDeIconesPersonagens = document.getElementById("thumbnails"); // Seleciona o elemento que contém os ícones
        // Constrói o HTML dos ícones usando map
        let output = dataAgentes.map(personagemAtual => `
            <li class="thumbnail" id="${personagemAtual.idAgente}">
                <img src="${personagemAtual.displayIcon}" alt="Icone selecionável do personagem ${personagemAtual.nomeAgente}" title="Icone selecionável personagem ${personagemAtual.nomeAgente}">
                <div class="div-Shadow nome-agentes-icones">${personagemAtual.nomeAgente}</div>
            </li>
        `).join('');

        listaDeIconesPersonagens.innerHTML = output; // Insere o HTML no elemento da lista
    }

    // Método responsável por carregar as informações dos personagens
    carregarInfoPersonagem(dataAgentes) {
        // Inicialmente insere as informações do primeiro personagem (id 0)
        this.inserirConteudoPersonagens(dataAgentes, 0);

        // Inicializa o carrossel principal usando a biblioteca Splide
        let splide = new Splide('#main-carousel', { pagination: false });
        let icones = document.getElementsByClassName('thumbnail'); // Seleciona todos os ícones dos personagens

        // Após o carrossel ser montado, adiciona eventos de clique aos ícones
        splide.on('mounted', () => {
            // Adiciona eventos de clique para cada ícone
            [...icones].forEach(icone => {
                icone.addEventListener('click', () => {
                    this.inserirConteudoPersonagens(dataAgentes, icone.id); // Insere o conteúdo do personagem ao clicar no ícone
                });
            });

            // Adiciona evento de mover para atualizar o conteúdo conforme o slide do carrossel muda
            splide.on('move', () => {
                this.inserirConteudoPersonagens(dataAgentes, splide.index); // Atualiza o conteúdo com base no índice do slide atual
            });
        });

        splide.mount(); // Monta o carrossel na página
    }

    // Método que insere o conteúdo dos personagens nas respectivas áreas
    inserirConteudoPersonagens(dataAgentes, idPersonagem) {
        const descricao = document.getElementById("descricaoPersonagens"); // Seleciona o elemento para a descrição do personagem
        const nomePersonagem = document.getElementById("nomePersonagem"); // Seleciona o elemento para o nome do personagem
        const rolePersonagem = document.getElementById("rolePersonagem"); // Seleciona o elemento para o papel do personagem

        // Insere os dados do personagem no HTML
        nomePersonagem.textContent = dataAgentes[idPersonagem].nomeAgente;
        descricao.textContent = dataAgentes[idPersonagem].descricaoAgente;
        rolePersonagem.textContent = dataAgentes[idPersonagem].roleAgente.displayName;
    }
}

// Inicializa a interface Valorant
const valorantUI = new ValorantUI();
valorantUI.initialize(); // Chama o método para inicializar a UI e carregar os dados dos personagens
