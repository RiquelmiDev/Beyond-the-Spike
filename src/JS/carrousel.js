function initSplide(){
    var splide = new Splide('#main-carousel', {
        pagination: false,
    });
    
    var thumbnails = document.getElementsByClassName('thumbnail');
    var divShadowActive = document.getElementsByClassName('div-Shadow');
    var current;  // Variável para armazenar a miniatura atualmente ativa
    let currentDivShadow;
    
    // Inicializa cada miniatura
    for (var i = 0; i < thumbnails.length; i++) {
        initThumbnail(thumbnails[i], i);
    }
    
    function initThumbnail(thumbnail, index) {
        thumbnail.addEventListener('click', function () {
            splide.go(index);  // Muda para o slide correspondente
        });
    }
    
    // Atualiza a miniatura ativa
    splide.on('mounted move', function () {
        var thumbnail = thumbnails[splide.index];
        let divShadowAtual = divShadowActive[splide.index];
        if (thumbnail) {
            if (current) {
                current.classList.remove('is-active');  // Remove a classe da miniatura anterior
                currentDivShadow.classList.remove('shadow-perso-active');
            }
            thumbnail.classList.add('is-active');  // Adiciona a classe à miniatura atual
            divShadowAtual.classList.add('shadow-perso-active');  // Adiciona a classe à miniatura atual

            current = thumbnail;  // Atualiza a miniatura atual
            currentDivShadow = divShadowAtual;  // Atualiza a miniatura atual
        }
    });
    
    splide.mount();
}

export default initSplide;