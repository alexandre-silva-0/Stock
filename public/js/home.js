document.addEventListener('DOMContentLoaded', function () {

    const filterInput = document.querySelectorAll('.filter-input');
    const filterForm = document.querySelector('.filter-form');

    //Filter validation
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

    //post to insert machine 
    insertForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const popup = document.getElementById('popup-insert-done')

        const hostname = document.getElementById('insert-hostname').value;
        const patrimonio = document.getElementById('insert-patrimonio').value;
        const modelo = document.getElementById('insert-modelo').value;
        const type = document.getElementById('insert-type').value;
        const os = document.getElementById('insert-os').value;

        fetch('/machines/insertmachine', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hostname, patrimonio, modelo, type, os })
        }).then(() => {
            popup.style.display = 'flex'
            setTimeout(() => {
                popup.style.display = 'none'
                window.location.href = '/';
            }, 2000);
        })

    })


    const addBtn = document.querySelector('.add-btn')

    //Cancel insert
    addBtn.addEventListener('click', function () {
        const formPopUp = document.querySelector('.form-popup')

        formPopUp.addEventListener('click', function (e) {

            if (e.target.id === 'insert-popup') {
                formPopUp.style.display = 'none'
            }

        })

        formPopUp.style.display = 'flex'

        document.addEventListener('keyup', (e) => {

            if (e.key === 'Escape') {
                formPopUp.style.display = 'none'
            }

        })

    })

    //Edit machine register
    document.querySelectorAll('.btn-edit').forEach((btn) => {

        const hostname = document.getElementById('edit-hostname');
        const modelo = document.getElementById('edit-modelo');
        const os = document.getElementById('edit-os');
        const type = document.getElementById('edit-type');
        const patrimonio = document.getElementById('edit-patrimonio');

        const editFormPopup = document.getElementById('edit-popup');



        btn.addEventListener('click', function () {
            const row = this.closest('tr');
            const id = row.querySelector('.get-id').value;

            editFormPopup.style.display = 'flex';

            const newUrl = `${window.location.origin}/${id}`;
            window.history.pushState({}, '', newUrl);

            fetch(`/${id}`).then(response => {
                return response.json()
            }).then(data => {
                const machine = data.machine

                hostname.value = machine.hostname
                modelo.value = machine.modelo
                patrimonio.value = machine.patrimonio
                os.value = machine.os
                type.value = machine.type

            })
                        
            document.addEventListener('click', (e) => {
                if (e.target.id === 'edit-popup') {
                    editFormPopup.style.display = 'none'
                    window.history.pushState({}, '', '/');
                }

            })

            document.addEventListener('keyup', (e) => {
                if ( e.key === 'Escape'){
                    editFormPopup.style.display = 'none'
                    window.history.pushState({}, '', '/');
                }
            })

            const editForm = document.querySelector('.edit-form')
            editForm.addEventListener('click', function (e) {

                if (e.target.id === 'popup') {
                    editForm.style.display = 'none'

                }

            })


            editForm.addEventListener('submit', (e) => {
                e.preventDefault()
            })

            const editBtn = document.querySelector('.edited-btn');

            const popup = document.getElementById('popup-edited-machine');

            //Function to open popup with server response
            function openPopUp(text) {
                popup.style.display = 'flex';
                const serverResp = document.getElementById('server-resp');
                serverResp.textContent = text;
            }

            //Remove button
            editBtn.addEventListener('click', function () {

                const hostname = document.getElementById('edit-hostname').value;
                const modelo = document.getElementById('edit-modelo').value;
                const os = document.getElementById('edit-os').value;
                const type = document.getElementById('edit-type').value;
                const patrimonio = document.getElementById('edit-patrimonio').value;

                fetch('/machine/edited', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id, hostname, patrimonio, modelo, type, os })
                }).then((response) => {
                    return response.text();
                })
                    .then((data) => {
                        openPopUp(data);
                        setTimeout(() => {
                            window.location.href = '/';
                        }, 2000);
                    });

            })


            //Remove button
            const deleteBtn = document.querySelector('.delete-btn');

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
                            window.location.href = '/';
                        }, 2000);
                    });

            })


        });

    })
})