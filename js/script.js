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
        if(!files[1].type.match("image")) return

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
            <span onclick="deleteQueuedImage(${index})"></span>
        </div>
        `
    })
    queuedDiv.innerHTML = images
}

function deleteQueuedImage(index) {
    arrayImages.splice(index, 1)
    displayQueuedImages()
}