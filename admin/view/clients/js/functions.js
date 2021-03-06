(function () {
    'use strict'
  
    window.addEventListener('load', function () {
      listClients()
      findClient()
    }, false)
}());

function listClients() {
    $.ajax({
        url: "ajax_router.php",
        method: 'POST',
        data: {
            function: 'listClients',
        },
    }).done(function(res) {

        document.querySelector("div.table-responsive > table > tbody").innerHTML = res.html;
        deleteClient()

    }).fail(function(error) {
        console.log(error);
    });
}

function deleteClient() {

    var lista = document.querySelectorAll('.excluir')
    Array.from(lista).forEach((el) => {
        el.addEventListener('click', (e) => {
            client_id = el.getAttribute('client_id');

            confirm = confirm('Tem certeza que deseja excluir esse cliente?');
            if (confirm) {

                $.ajax({
                    url: "ajax_router.php",
                    method: 'POST',
                    data: {
                        function: 'deleteClient',
                        args: { client_id: client_id }
                    },
                }).done(function(res) {

                    alert(res.message)
                    location.reload();
            
                }).fail(function(error) {
                    console.log(error);
                });
            }
        })
    });
}

function findClient() {

    var client_email = document.getElementById('client_email');
    client_email.addEventListener('keypress', (e) => {
        if (e.which === 13) {
            
            var email = client_email.value;
            
            $.ajax({
                url: "ajax_router.php",
                method: 'POST',
                data: {
                    function: 'findClientByNameOrEmail',
                    args: { email: email }
                },
            }).done(function(res) {
        
                if (res.id === '') {
                    alert(res.message);
                    document.getElementById('client_email').value = '';
                    return false;
                }

                window.location.href = `./form.php?client_id=${res.id}`;
                return true;
        
            }).fail(function(error) {
                console.log(error);
            });
        }
    });
}