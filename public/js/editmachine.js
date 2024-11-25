const insertBtn = document.querySelector('.edited-btn');
const deleteBtn = document.querySelector('.delete-btn');
const editForm = document.querySelector('.edit-form')
const id = document.getElementById('id').value

editForm.addEventListener('submit', (e) => {
    e.preventDefault()
})

const popup = document.querySelector('.popup')
function closePopUp() {
    popup.style.display = 'none'
}

function openPopUp(text) {
    popup.style.display = 'flex'
    const serverResp = document.getElementById('server-resp')
    serverResp.textContent = text
}

insertBtn.addEventListener('click', function(){

    const hostname = document.getElementById('hostname').value;
    const modelo = document.getElementById('modelo').value;
    const os = document.getElementById('os').value;
    const type  = document.getElementById('type').value;
    const patrimonio = document.getElementById('patrimonio').value;

    fetch('/machine/edited', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, hostname, patrimonio, modelo, type, os})
    }).then((response) => {
        return response.text(); 
    })
    .then((data) => {
        openPopUp(data); 
        setTimeout(() => {
            closePopUp();
            window.location.href = '/';
        }, 2000);
    });

})

deleteBtn.addEventListener('click', function () {
    fetch('/deletemachine', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    }).then((response) => {
        return response.text(); 
    })
    .then((data) => {
        openPopUp(data); 
        setTimeout(() => {
            closePopUp();
            window.location.href = '/';
        }, 2000);
    });

})

