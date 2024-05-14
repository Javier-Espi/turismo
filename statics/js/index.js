const fotoBanners = document.querySelectorAll('.foto-banner')

fotoBanners.forEach(foto => {
    foto.addEventListener('click', () => {
        removeActiveClasses()
        foto.classList.add('activa')
    })
})

function removeActiveClasses() {
    fotoBanners.forEach(foto => {
        foto.classList.remove('activa')
    })
}