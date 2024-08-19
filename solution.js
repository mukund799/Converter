function convertImage() {
    const fileInput = document.getElementById('file-input');
    const conversionType = document.getElementById('conversion-type').value;
    const file = fileInput.files[0];
    console.log(file)
    if (!file) {
        alert('Please select an image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {

        if(conversionType === "png-to-jpg")
            extension = "jpg"
        else if(conversionType === "jpg-to-png")
            extension = "png"
        let name = "output."+extension

        // to enable view image
        outputImage = document.getElementById("output-image")
        outputImage.style.display = 'inline';
        outputImage.src = event.target.result;
        // to enable download link
        downloadLink = document.getElementById("download-link")
        downloadLink.href = event.target.result;
        downloadLink.download = name;
        console.log(downloadLink.download)
        downloadLink.style.display = "inline"
    }
    reader.readAsDataURL(file);
}
function resizeImage() {
    const fileInput = document.getElementById('fileInput');
    const targetSizeKB = parseFloat(document.getElementById('targetSize').value);
    const targetSizeBytes = targetSizeKB * 1024;

    if (fileInput.files.length === 0 || isNaN(targetSizeKB)) {
        alert('Please select an image and enter a valid target size.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            
            // Initial image dimensions
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0);

            // Function to resize image and check file size
            function checkSize(scaleFactor) {
                canvas.width = img.width * scaleFactor;
                canvas.height = img.height * scaleFactor;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(function(blob) {
                    if (blob.size > targetSizeBytes) {
                        // Resize further if needed
                        checkSize(scaleFactor * 0.9);
                    } else {
                        // Image is resized to the target size
                        const downloadLink = document.getElementById('downloadLink');
                        downloadLink.href = URL.createObjectURL(blob);
                        downloadLink.style.display = 'inline';
                    }
                }, 'image/jpeg');
            }

            checkSize(1); // Start with no scaling
        }
        img.src = event.target.result;
    }

    reader.readAsDataURL(file);
}