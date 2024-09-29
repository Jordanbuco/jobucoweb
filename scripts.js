// scripts.js

// Función para cargar los componentes del navr y del main de forma independiente
const components = [
    { id: 'navr', file: 'com/navr.html' }
];

components.forEach(component => {
    fetch(component.file)
        .then(response => response.text())
        .then(html => {
            document.getElementById(component.id).innerHTML = html;

            // Añadir eventos para expandir el menú después de cargarlo
            const navr = document.querySelector('.main-menu');
            const mainContent = document.getElementById('main-content');

            navr.addEventListener('mouseenter', function () {
                navr.classList.add('expanded-menu');
            });

            navr.addEventListener('mouseleave', function () {
                navr.classList.remove('expanded-menu');
            });
        })
        .catch(error => console.error('Error al cargar componente:', component.id, error));
});

// Función para cargar contenido dinámico en el main
function loadContent(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;

            // Reiniciar Alpine.js después de cargar el contenido
            Alpine.initTree(document.getElementById('main-content'));
        })
        .catch(error => console.error('Error al cargar página:', page, error));
}

// Al iniciar, cargar la página Home por defecto
document.addEventListener('DOMContentLoaded', function () {
    loadContent('com/home.html');
});

// Función para mostrar/ocultar el cuadro de diálogo de ingreso y el overlay
function togglePasswordDialog(action) {
    const dialog = document.getElementById('password-dialog');
    const overlay = document.getElementById('overlay');

    if (dialog.style.display === 'none' || dialog.style.display === '') {
        dialog.style.display = 'block';
        overlay.style.display = 'block';
    } else {
        dialog.style.display = 'none';
        overlay.style.display = 'none';
    }

    // Guardar la acción a realizar después de verificar la contraseña
    dialog.dataset.action = action || '';
}

// Función para verificar la contraseña
function checkPassword() {
    const inputPassword = document.getElementById('password-input').value;

    fetch('private/password.json')
        .then(response => response.json())
        .then(data => {
            const correctPassword = data.password;

            if (inputPassword === correctPassword) {
                const action = document.getElementById('password-dialog').dataset.action;
                if (action === 'addMedia') {
                    goToAddMedia();
                }
            } else {
                document.getElementById('error-message').style.display = 'block';
            }
        })
        .catch(error => console.error('Error al obtener la contraseña:', error));
}

// Función para redirigir a la página de agregar medios
function goToAddMedia() {
    window.open('com/add/addmedia.html', '_self');
    togglePasswordDialog();
}

// Incluye el script de carga de contenido dinámico
function loadContent(url) {
    // Aquí podrías hacer una llamada AJAX o cargar contenido dinámicamente.
    console.log("Cargando contenido de " + url);
    // Ejemplo de uso de fetch para cargar el contenido dinámicamente
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}

function uploadToGithub() {
    return {
        token: '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', // Reemplazar por tu token personal
        repoOwner: 'Jordanbuco',
        repoName: 'Drive',
        branch: 'main',
        filePath: '',
        fileContent: '',
        newFileName: '',
        commitMessage: '',
        uploading: false,
        success: false,
        error: false,
        errorMessage: '',
        showModal: false,

        handleFile(event) {
            const file = event.target.files[0];
            if (file) {
                this.filePath = `jobuco/upfromweb/${file.name}`;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.fileContent = btoa(e.target.result);
                };
                reader.readAsBinaryString(file);
            }
        },

        async uploadFile() {
            if (this.newFileName.trim() !== '') {
                if (!this.newFileName.includes('.')) {
                    alert('Agrega una extensión al nuevo nombre del archivo (ej. .png, .jpg).');
                    return;
                }
                this.filePath = `jobuco/upfromweb/${this.newFileName}`;
            }

            if (!this.repoOwner || !this.repoName || !this.branch || !this.fileContent || !this.commitMessage) {
                alert('Por favor completa todos los campos.');
                return;
            }

            this.uploading = true;
            this.success = false;
            this.error = false;
            this.errorMessage = '';

            const url = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/${this.filePath}`;

            try {
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${this.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: this.commitMessage,
                        content: this.fileContent,
                        branch: this.branch,
                    }),
                });

                const result = await response.json();
                this.uploading = false;

                if (response.ok) {
                    this.success = true;
                    this.showModal = true;
                } else {
                    this.error = true;
                    this.errorMessage = result.message || 'Error desconocido';
                }
            } catch (err) {
                this.uploading = false;
                this.error = true;
                this.errorMessage = err.message;
            }
        },

        copyToClipboard() {
            navigator.clipboard.writeText(this.filePath)
                .then(() => {
                    alert('Ruta copiada al portapapeles!');
                })
                .catch(err => {
                    alert('Error al copiar la ruta: ' + err);
                });
        }
    }
}

// mediausing


function fetchImagesFromGithub() {
    return {
        repoOwner: 'Jordanbuco',
        repoName: 'Drive',
        branch: 'main',
        directoryPath: 'jobuco/upfromweb',
        images: [],
        loading: true,
        error: false,
        errorMessage: '',

        async fetchImages() {
            const url = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/${this.directoryPath}?ref=${this.branch}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/vnd.github.v3+json',
                    },
                });

                if (!response.ok) {
                    throw new Error('No se pudieron obtener las imágenes');
                }

                const result = await response.json();

                // Filtrar solo archivos que sean imágenes (por extensión)
                this.images = result.filter(file => file.name.match(/\.(jpg|jpeg|png|gif)$/i));

                this.loading = false;
            } catch (err) {
                this.error = true;
                this.errorMessage = err.message;
                this.loading = false;
            }
        },

        init() {
            this.fetchImages();
        }
    }
}

// TOOLS
function loadImages() {
    return {
        images: [],
        loading: true,
        async fetchImages() {
            try {
                const response = await fetch('./com/json/tools-images.json');
                this.images = await response.json();
            } catch (error) {
                console.error('Error al cargar el JSON:', error);
            } finally {
                this.loading = false;
            }
        },
        init() {
            this.fetchImages();
        }
    }
}
