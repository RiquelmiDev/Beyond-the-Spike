const apiResponse = async () => {
    const route = 'https://valorant-api.com/v1/agents?language=pt-BR&isPlayableCharacter=true';
    try {
        const response = await fetch(route);
        const data = await response.json();
        return data.data;
    } catch (erro) {
        return "deu ruim prcr",erro;
    } finally {
        console.log("Resultado da requisição:");
    }
};

export default apiResponse;