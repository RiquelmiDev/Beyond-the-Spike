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
/*         inserirDados(dataAgentes); */
    }
});

const descricao = document.getElementById("descricaoPersonagens");
const imgPersonagem = document.getElementById("personagemImg");
const nomePersonagem = document.getElementById("nomePersonagem");
const rolePersonagem = document.getElementById("rolePersonagem");

const listaPersonagens = document.getElementById("listaPersonagens");

function criarElementosDosPersonagens (dataAgentes) {

    let output= "";

    dataAgentes.forEach(element => {
        output += 
        `<li class="splide__slide">       
            <img class="personagemImg backgroundPersonagem${element.idAgente}" id="personagemImg${element.idAgente}" src="${element.imgAgente}" alt="Imagem do Personagem ${element.nomeAgente}" title="Personagem ${element.nomeAgente} do jogo Valorant"></li>`;
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

   /*  nomePersonagem.textContent = dataAgentes[24].nomeAgente;
    descricao.textContent = dataAgentes[24].descricaoAgente;
    imgPersonagem.src = dataAgentes[24].imgAgente; */

    //Incia o cod responsavel pelo carrousel
    initSplide();

}

function adicionaBackgroundDasImagens(dataAgentes){
    dataAgentes.forEach(element => {
    let imagemDeFundoPersonagem = document.querySelector(`.backgroundPersonagem${element.idAgente}`);
        imagemDeFundoPersonagem.setAttribute('style', `background-image: url("${element.background}");background-repeat: no-repeat;background-size: contain; background-position:right`)
    });
}