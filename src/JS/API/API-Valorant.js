const api = async () => {
    const route = 'https://valorant-api.com/v1/agents?language=pt-BR';
    try {
        const response = await fetch(route);
        const data = await response.json();
        return data.data;
    } catch (erro) {
        console.log("deu ruim prcr",erro);
    } finally {
        console.log("Resultado da requisição:");
    }
}
 
api().then(agentes => {
    if (agentes){
        console.clear()
        dataAgentes = [];
        agentes.forEach((agente) => {
            dataAgentes.push({
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

        inserirDados(dataAgentes);
    }
});

const inserirDados = (dataAgentes)=>{
    console.log(dataAgentes)
    const descricao = document.getElementById("descricaoPersonagens");
    const imgPersonagem = document.getElementById("personagemImg");
    const nomePersonagem = document.getElementById("nomePersonagem");
    const rolePersonagem = document.getElementById("rolePersonagem");
    nomePersonagem.textContent = dataAgentes[24].nomeAgente;
    descricao.textContent = dataAgentes[24].descricaoAgente;
    imgPersonagem.src = dataAgentes[24].imgAgente;

}