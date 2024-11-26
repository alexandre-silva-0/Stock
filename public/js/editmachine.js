
// const deleteBtn = document.querySelector('.delete-btn');
// const id = document.getElementById('id').value
// const editForm = document.querySelector('.edit-form')

// editForm.addEventListener('submit', (e) => {
//     e.preventDefault()
// })

// const popup = document.querySelector('.popup')
// function closePopUp() {
//     popup.style.display = 'none'
// }

// function openPopUp(text) {
//     popup.style.display = 'flex'
//     const serverResp = document.getElementById('server-resp')
//     serverResp.textContent = text
// }

// insertBtn.addEventListener('click', function(){

//     const hostname = document.getElementById('edit-hostname').value;
//     const modelo = document.getElementById('edit-modelo').value;
//     const os = document.getElementById('edit-os').value;
//     const type  = document.getElementById('edit-type').value;
//     const patrimonio = document.getElementById('edit-patrimonio').value;

//     fetch('/machine/edited', {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({id, hostname, patrimonio, modelo, type, os})
//     }).then((response) => {
//         return response.text(); 
//     })
//     .then((data) => {
//         openPopUp(data); 
//         setTimeout(() => {
//             closePopUp();
//             window.location.href = '/';
//         }, 2000);
//     });

// })

// deleteBtn.addEventListener('click', function () {
//     fetch('/deletemachine', {
//         method: 'post',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ id })
//     }).then((response) => {
//         return response.text(); 
//     })
//     .then((data) => {
//         openPopUp(data); 
//         setTimeout(() => {
//             closePopUp();
//             window.location.href = '/';
//         }, 2000);
//     });

// })

