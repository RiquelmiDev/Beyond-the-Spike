class ValorantAPI {
    constructor() {
        // Define a base da URL da API Valorant
        this.baseUrl = 'https://valorant-api.com/v1/agents';
    }

    // Método para buscar agentes da API, com idioma padrão como português
    async fetchAgents(language = 'pt-BR', isPlayable = true) {
        // Constrói a rota da API com base nos parâmetros
        const route = `${this.baseUrl}?language=${language}&isPlayableCharacter=${isPlayable}`;
        try {
            // Faz a requisição para a API
            const response = await fetch(route);
            // Converte a resposta para JSON
            const data = await response.json();
            // Retorna a lista de agentes
            return data.data;
        } catch (error) {
            // Caso ocorra erro, imprime no console e retorna um array vazio
            console.error('Erro ao buscar agentes:', error);
            return [];
        } finally {
            // Exibe uma mensagem no console informando que a requisição terminou
            console.log("Requisição da API concluída");
        }
    }
}

// Exporta a instância da classe para ser usada em outros módulos
export default new ValorantAPI();
