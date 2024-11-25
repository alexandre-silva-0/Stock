document.addEventListener('DOMContentLoaded', function () {

    const filterInput = document.querySelectorAll('.filter-input');
    const filterButton = document.querySelector('.filter-button');
    const filterForm = document.querySelector('.filter-form');

    function closePopUp(popup) {
        popup.style.display = 'none'
    }

    function openPopUp(popup) {
        popup.style.display = 'flex'
        console.log('aqui');
    }

    filterForm.addEventListener('submit', function (e) {
        let contador = 0;
        const popupInvalid = document.querySelector('.pop-invalid');
        filterInput.forEach(input => {
            if (!input.checked) {
                contador++
            }
            if (contador === 3) {
                e.preventDefault();
                popupInvalid.style.display = 'flex'
                setTimeout(() => {
                    popupInvalid.style.display = 'none'
                }, 2000);

                fetch('/noneselected').then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na resposta: ' + response.status);
                    }
                    return response.text();
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    });

    const insertForm = document.querySelector('.insert-form')

    insertForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const popup = document.getElementById('popup-insert-done')

        const hostname = document.getElementById('hostname').value;
        const patrimonio = document.getElementById('patrimonio').value;
        const modelo = document.getElementById('modelo').value;
        const type = document.getElementById('type').value;
        const os = document.getElementById('os').value;

        // const formData = new FormData(insertForm)

        fetch('/machines/insertmachine', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hostname, patrimonio, modelo, type, os })
        }).then(() => {
            openPopUp(popup);
            setTimeout(() => {
                closePopUp(popup);
                window.location.href = '/';
            }, 2000);
        })

    })


    const addBtn = document.querySelector('.add-btn')
    const formPopUp = document.querySelector('.form-popup')


    addBtn.addEventListener('click', function () {

        formPopUp.style.display = 'flex'

        document.addEventListener('keyup', (e) => {

            if (e.key === 'Escape') {
                formPopUp.style.display = 'none'
            }

        })

    })


    formPopUp.addEventListener('click', function (e) {

        if (e.target.id === 'p') {
            formPopUp.style.display = 'none'

        }

    })

})