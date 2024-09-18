## 🔮 Beyond the Spike 🔮

Este projeto é uma página web dedicada aos agentes do jogo Valorant, com um design responsivo e um carrossel de de personagens para apresentar suas  suas habilidades. 

## 🎨 Tecnologias Utilizadas:

- HTML
- CSS/SCSS
- JavaScript

## 📁 Estrutura do Projeto:

### 📄 index.html

Arquivo principal da página web.

### 📁 src/

Contém o código-fonte da aplicação.

- 📁 CSS/: Arquivos CSS para estilização.
    - `responsividade.css`: Estilos responsivos para diferentes tamanhos de tela.
    - `style.css`: Estilos principais da página.
    - `style.map`: Mapa de referência do CSS para desenvolvimento.
- 📁 img/: Imagens utilizadas na página. 
    - `controlador.png`, `hab1-omen.png`, `hab2-omen.png`, etc.: Imagens relacionadas ao Omen e suas habilidades.
- 📁 JS/: Arquivos JavaScript para a lógica da página.
    - `API/`: Pasta relacionada à integração com a API do Valorant (potencial para dados dinâmicos do agente).
        - `API-Valorant.js`: Lógica para consumir a API do Valorant.
    - `carrousel.js`: Implementação do carrossel de imagens. 
- 📁 SCSS/: Arquivos SCSS, um pré-processador CSS que adiciona funcionalidades extras.
    - `responsividade.scss`: Estilos responsivos (provavelmente compila para `responsividade.css`).
    - `style.scss`: Estilos principais (provavelmente compila para `style.css`).
    - `_mixins.scss`: Mixins SCSS, que permitem reutilizar blocos de estilos.
