const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

    function uploadImage() {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        if (!file) {
        alert('Selecciona una imagen antes de subir.');
        return;
        }

        // Crea un FormData para enviar la imagen a la función Lambda
        const formData = new FormData();
        formData.append('file', file);
    
        // Realiza una solicitud HTTP a tu función Lambda
        fetch('URL_DE_TU_API_GATEWAY', {
        method: 'POST',
        body: formData,
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Error al subir la imagen');
        }
        return response.json();
        })
        .then(data => {
        console.log('Imagen subida con éxito:', data);
        alert('Imagen subida con éxito.');
        })
        .catch(error => {
        console.error('Error al subir la imagen:', error);
        alert('Error al subir la imagen.');
        });
    };


dropArea.addEventListener("dragover",function(e){
    e.preventDefault();
});

dropArea.addEventListener("drop", function(e){
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadImage();
}); 

