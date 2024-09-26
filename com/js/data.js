function data() {
    return {
        // Indica si el sidebar está abierto o no.
        isOpen: false,

        // Aldeano seleccionado para mostrar en el sidebar.
        selectedVillager: null,

        // Lista de aldeanos (villagers) que se van a mostrar en las tarjetas.
        villagers: [
            {
                id: 1,
                name: { 'name-USen': 'Isabelle' },
                icon_uri: 'https://vignette.wikia.nocookie.net/animalcrossing/images/4/49/Isabelle_NH.png',
                birthday: '12/20',
                gender: 'Female',
                personality: 'Peppy',
                species: 'Dog',
                'bubble-color': '#FFD700',
                'text-color': '#000',
                'catch-phrase': 'How can I help you today?'
            },
            {
                id: 2,
                name: { 'name-USen': 'Tom Nook' },
                icon_uri: 'https://vignette.wikia.nocookie.net/animalcrossing/images/e/e5/Tom_Nook_NH.png',
                birthday: '5/30',
                gender: 'Male',
                personality: 'Businessman',
                species: 'Raccoon',
                'bubble-color': '#8B4513',
                'text-color': '#FFF',
                'catch-phrase': 'Ah yes, yes!'
            },
            {
                id: 3,
                name: { 'name-USen': 'K.K. Slider' },
                icon_uri: 'https://vignette.wikia.nocookie.net/animalcrossing/images/4/42/K.K._Slider_NH.png',
                birthday: '8/23',
                gender: 'Male',
                personality: 'Cool',
                species: 'Dog',
                'bubble-color': '#FF4500',
                'text-color': '#FFF',
                'catch-phrase': 'Dig this, man!'
            }
        ],

        // Método para manejar el click y abrir el sidebar con el aldeano seleccionado.
        handleClick(villager) {
            this.selectedVillager = villager;
            this.isOpen = true;
        },

        // Método para cerrar el sidebar.
        closeSidebar() {
            this.isOpen = false;
            this.selectedVillager = null;
        }
    };
}