const inputFile = document.getElementById("input-file");
const uploadBtn = document.getElementById("upload-btn");
const imgView = document.getElementById("img-view");
const dropArea = document.getElementById("drop-area")


// Configura tus credenciales de AWS
AWS.config.update({
    accessKeyId: 'AKIAQZVZOJ5MFWWDTGN7',
    secretAccessKey: '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',
    region: 'sa-east-1'
});


const s3 = new AWS.S3();

function uploadImage() {
    const file = inputFile.files[0];
    if (!file) {
        alert('Selecione um arquivo');
        return;
    }

    // Especifica la carpeta dentro del bucket
    const folder = 'imagens/';
    const params = {
        Bucket: 'grupo1-restart-brpor1',
        Key: folder + file.name,
        ContentType: file.type,
        Body: file,
        ACL: 'public-read' // Opcional: establece los permisos del archivo
    };

    s3.upload(params, function(err, data) {
        if (err) {
            console.error('Erro ao enviar o arquivo:', err);
            alert('Erro ao enviar o arquivo');
        } else {
            alert('Arquivo enviado com sucesso');
            console.log(data);

            // Limpiar la entrada de archivos y la vista previa después de la carga
            inputFile.value = "";
            imgView.style.backgroundImage = 'none';
            imgView.innerHTML = '<img src="assets/img/cloud-upload-regular-180.png" alt=""><p>Arraste e solte <br> ou <br>clique aqui para carregar a imagem</p><span>Carregue qualquer imagem do computador</span>';
        }
    });
}


dropArea.addEventListener("dragover", function(e){
    e.preventDefault();
});

dropArea.addEventListener("drop", function(e){
    e.preventDefault();
    const files  = e.dataTransfer.files;
    if (files.length > 0) {
        // Actualizar la vista previa al soltar la imagen
        const imgLink = URL.createObjectURL(files[0]);
        imgView.style.backgroundImage = `url(${imgLink})`;
    imgView.textContent = "";
    imgView.style.border = 0;

        // Asignar el archivo al input para que esté disponible para la carga posterior
        inputFile.files = files;
    }    
});

function fileSelected(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('Seleccione un archivo');
        return;
    }

    // Actualizar la vista previa al seleccionar un archivo
    const imgLink = URL.createObjectURL(file);
    imgView.style.backgroundImage = `url(${imgLink})`;
    imgView.textContent = "";
    imgView.style.border = 0;
}






