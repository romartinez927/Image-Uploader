const savedForm = document.querySelector("#saved-form")
const queuedForm = document.querySelector("#queued-form")

const savedDiv = document.querySelector(".saved-div")
const queuedDiv = document.querySelector(".queued-div")
const inputDiv = document.querySelector(".input-div")

const input = document.querySelector(".input-div input")
const serverMessage = document.querySelector(".server-message")

const arrayImages = []
const deleteImages = []

// IMAGENES GUARDADAS EN SERVER

// IMAGENES EN FRONT
input.addEventListener("change", () => {
    const files = input.files
    for(let i = 0; i < files.length; i++){
        arrayImages.push(files[i])
    }
    queuedForm.reset()
    displayQueuedImages()
})

inputDiv.addEventListener("drop", (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    for(let i = 0; i < files.length; i++) {
        if(!files[i].type.match("image")) continue

        if(arrayImages.every(image => image.name !== files[i].name)) {
            arrayImages.push(files[i])
        }
    }
    displayQueuedImages()
})

function displayQueuedImages() {
    let images = ""
    arrayImages.forEach((image, index) => {
        images += `
        <div class="image">
            <img src="${URL.createObjectURL(image)}" alt="image">
            <span onclick="deleteQueuedImage(${index})">&times;</span>
        </div>
        `
    })
    queuedDiv.innerHTML = images
}

function deleteQueuedImage(index) {
    arrayImages.splice(index, 1)
    displayQueuedImages()
}

queuedForm.addEventListener("submit", (e) => {
    e.preventDefault()
    sendQueuedImagesToServer()
})

function sendQueuedImagesToServer() {
    const formData = new FormData(queuedForm)

    arrayImages.forEach((image, index) => {
        formData.append(`file[${index}]`, image)
    })

    fetch("upload", {
        method: "POST",
        body: formData
    })

    .then(response => {
        if(response.status !== 200) throw Error(response.statusText)
        location.reload()
    })

    .catch(error => {
        serverMessage.innerHTML = error
        serverMessage.style.cssText = "color: #b71c1c; background-color: #f8d7da"
    })


}