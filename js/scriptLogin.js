let olho = document.querySelector('.fa-eye');

olho.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha');
        if(inputSenha.getAttribute('type')=='password'){
        /*o método getAttribute() retornar o valor do atributo passado como parametro 
        no caso o 'type' */
            inputSenha.setAttribute('type', 'text');
        }else{
            inputSenha.setAttribute('type', 'password');
        }
    }
);

function entrar(){
    

    let usuario = document.querySelector("#usuario");
    let userLabel = document.querySelector("#userLabel");

    let senha = document.querySelector("#senha");
    let passwordLabel= document.querySelector("#passwordLabel");

    let msgError = document.querySelector("#msgError");

    let listaUser = [];

    let userValid = {
        nome:'',
        user:'',
        senha:''
    }

    listaUser = JSON.parse(localStorage.getItem('listaUsuarios'));

    listaUser.forEach((item) => {
        if(usuario.value == item.usuario && senha.value == item.senha ){
            userValid = {
                nome:item.nome,
                user: item.usuario,
                senha: item.senha
            }
        }
    });
    

    if(usuario.value == '' | senha.value == ''){
        msgError.setAttribute('style','display: block');
        msgError.innerHTML = "Preencha todos os campos!";
        usuario.focus();
    }else{
        if(usuario.value == userValid.user && senha.value == userValid.senha ){
            window.location.href = 'http://127.0.0.1:5500/aplicacao-principal.html';
    
            let token = Math.random().toString(16).substring(2);
            
            localStorage.setItem('token', token);
    
            localStorage.setItem('userLogado', JSON.stringify(userValid));
        }else{
            usuario.setAttribute('style', 'border-color: red');
            userLabel.setAttribute('style', 'color: red');
            senha.setAttribute('style', 'border-color: red');
            passwordLabel.setAttribute('style', 'color: red');
            msgError.setAttribute('style','display: block');
            msgError.innerHTML = "Usuário ou senha incorretos!";
            usuario.focus();
        }
    
    }

   
}