async function fetchArticlesData() {
    const url = 'https://raw.githubusercontent.com/Jordanbuco/Data/refs/heads/main/miweb/blog/data.json'; // Tu enlace JSON

    try {
        const response = await fetch(url);
        const articles = await response.json();
        return articles;  // Retornamos el JSON ya parseado
    } catch (error) {
        console.error('Error al obtener el JSON:', error);
        return [];  // En caso de error, devolvemos un array vacío
    }
}

function data() {
    return {
        // Indica si el sidebar está abierto o no.
        isOpen: false,

        // Artículo seleccionado para mostrar en el sidebar.
        selectedArticle: null,

        // Lista de artículos (articles) que se van a mostrar en las tarjetas.
        articles: [],  // Inicialmente vacío

        // Método para cargar los datos desde el archivo JSON externo
        async loadArticles() {
            this.articles = await fetchArticlesData();  // Cargar los datos
        },

        // Método para manejar el click y abrir el sidebar con el artículo seleccionado.
        handleClick(article) {
            this.selectedArticle = article;
            this.isOpen = true;
        },

        // Método para cerrar el sidebar.
        closeSidebar() {
            this.isOpen = false;
            this.selectedArticle = null;
        }
    };
}