function onImagemLoad() {
    const divImage = document.getElementById('image');
    const src = document.querySelector('img').src;

    divImage.style.background = `url('${src}')`;
    divImage.style.backgroundSize = 'cover';
    divImage.style.backgroundPosition = 'center';

    setTimeout(() => {
        divImage.style.opacity = '1';
        preloader.style.opacity = '0';
    }, 0800);
}