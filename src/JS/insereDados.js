import apiResponse from "./API/API-Valorant.js";
import initSplide from "./carrousel.js";

apiResponse().then(agentes => {
    if (agentes){

        let dataAgentes = [];

        agentes.forEach((agente,index) => {
            dataAgentes.push({
                idAgente: index,
                nomeAgente: agente.displayName,
                descricaoAgente: agente.description,
                displayIcon : agente.displayIcon,
                imgAgente: agente.fullPortrait,
                killFeedIcon : agente.killfeedPortrait,
                background: agente.background,
                bgGradientColors: agente.backgroundGradientColors,
                roleAgente: agente.role,
                habilidades: agente.abilities
            })
        });
        criarElementosDosPersonagens(dataAgentes);
    }
});


function criarElementosDosPersonagens (dataAgentes) {

    
    adicionarImagensPersonagensAoCarrousel(dataAgentes);
    
    adicionarIconesPersonagens(dataAgentes);

     // Adiciona um pequeno atraso para garantir que o DOM esteja atualizado
     setTimeout(() => {
        //Incia o cod responsavel pelo carrousel
        initSplide();
        carregarInfoPersonagem(dataAgentes);
    }, 100); // 100ms de atraso, ajuste conforme necessário
    
    initSplide();
}



//Funcao responsavel por criar as tags li com as imagens de cada agente do valorant
function adicionarImagensPersonagensAoCarrousel(dataAgentes){
    //elemento ul que guarda as imagens
    const listaPersonagens = document.getElementById("listaPersonagens");

    let output= "";

    // ideia repentina: achar uma forma de adicionar as li individualmente e logo apos chamar a funcao de add background mandando o background do elemento atual a cada iteracao dentro do for fazendo com que nao precisace de um for dentro da funcao de bg

    dataAgentes.forEach(personagemAtual => {
        output += 
        `<li class="splide__slide">       
            <img class="personagemImg backgroundPersonagem${personagemAtual.idAgente}" id="personagemImg${personagemAtual.idAgente}" src="${personagemAtual.imgAgente}" alt="Imagem do Personagem ${personagemAtual.nomeAgente}" title="Imagem do personagem ${personagemAtual.nomeAgente} do jogo Valorant"></li>`;
    });

   // Criar um elemento temporário para converter a string em nós do DOM
   const tempContainer = document.createElement("div");
   tempContainer.innerHTML = output;

   // Adicionar os nós ao elemento da lista
   while (tempContainer.firstChild) {
       listaPersonagens.appendChild(tempContainer.firstChild);
   }

   //depois de inserir as li com as imagens no html ele insere o estilo que adiciona o background dos personagens no css
   adicionaBackgroundDasImagens(dataAgentes);
}

function adicionaBackgroundDasImagens(dataAgentes){

    dataAgentes.forEach(element => {
    let imagemDeFundoPersonagem = document.querySelector(`.backgroundPersonagem${element.idAgente}`);
        imagemDeFundoPersonagem.setAttribute('style', `background-image: url("${element.background}");background-repeat: no-repeat;background-size: contain; background-position:right`)
    });
}

function adicionarIconesPersonagens(dataAgentes){
    const listaDeIconesPersonagens = document.getElementById("thumbnails");
    let output= "";

    dataAgentes.forEach(personagemAtual => {
        output += 
        `<li class="thumbnail" id="${personagemAtual.idAgente}">
              <img src="${personagemAtual.displayIcon}" alt="Icone selecionavel do personagem ${personagemAtual.nomeAgente} title="Icone selecionavel personagem ${personagemAtual.nomeAgente}">
        </li>`;
    });

   // Criar um elemento temporário para converter a string em nós do DOM
   const tempContainer = document.createElement("div");
   tempContainer.innerHTML = output;

   // Adicionar os nós ao elemento da lista
   while (tempContainer.firstChild) {
    listaDeIconesPersonagens.appendChild(tempContainer.firstChild);
   }
}

function carregarInfoPersonagem(dataAgentes){
    //chama a funcao que insere os conteudos do personagem nos elementos e manda inicialmente o id do primeiro personagem sendo 0
    inserirConteudoPersonagens(dataAgentes,0)

    var splide = new Splide('#main-carousel', {
        pagination: false,
    });

    splide.on('mounted', function () {
        let icones = document.getElementsByClassName('thumbnail');

        for (let i = 0; i < icones.length; i++) {
            initThumbnail(icones[i]);
        }

        function initThumbnail(icone) {
            //evento de click em cada icone dos personagens que faz inserir o conteudo deles nos elemento visuais
            icone.addEventListener('click', function () {
                let idPersonagem = this.id; //Pegue o id desse icone que foi clicado
                inserirConteudoPersonagens(dataAgentes,idPersonagem);
            });
        }
        //evento de move que observa quando o user passa o slide para o proximo personagem ou o anterior inserindo assim o conteudo desse personagem
        splide.on('move', function () {
            let icone = icones[splide.index]; //guarda o elemento atual do slide
            console.log(icone)
            if (icone) {
                let idPersonagem = splide.index;
                inserirConteudoPersonagens(dataAgentes,idPersonagem);
            }
        });
    });

    splide.mount();
}

function inserirConteudoPersonagens(dataAgentes,idPersonagem){
    const descricao = document.getElementById("descricaoPersonagens");
    const nomePersonagem = document.getElementById("nomePersonagem");
    const rolePersonagem = document.getElementById("rolePersonagem");

    nomePersonagem.textContent = dataAgentes[idPersonagem].nomeAgente;
    descricao.textContent = dataAgentes[idPersonagem].descricaoAgente;
    rolePersonagem.textContent = dataAgentes[idPersonagem].roleAgente.displayName;
}


