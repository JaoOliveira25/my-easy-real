//========================== Evento de ver senha ==========================

let olho1 = document.querySelector('#olho1');
let olho2 = document.querySelector('#olho2');

olho1.addEventListener('click', () => {
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

olho2.addEventListener('click', () => {
    let inputConfSenha = document.querySelector('#confirmSenha');

        if(inputConfSenha.getAttribute('type')=='password'){
        /*o método getAttribute() retornar o valor do atributo passado como parametro 
        no caso o 'type' */
            inputConfSenha.setAttribute('type', 'text');
        }else{
            inputConfSenha.setAttribute('type', 'password');
        }
    }
);

//======================== Evento de Validação ===================================

let inputNome = document.querySelector('#nome');
let labelNome = document.querySelector('#labelNome');
let validNome = false;

let inputUsuario = document.querySelector('#usuario');
let labelUsuario = document.querySelector('#labelUsuario');
let validUsuario = false;

let inputSenha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let inputConfSenha = document.querySelector('#confirmSenha');
let labelConfSenha = document.querySelector('#labelConfSenha');
let validConfSenha = false;


inputNome.addEventListener('keyup',()=>{
    if (inputNome.value.length < 3) {
        labelNome.setAttribute('style', 'color: #F44336');
        labelNome.innerHTML = 'Nome  *Insira no mínimo 3 caracteres';
        inputNome.setAttribute('style', 'border-color: #F44336');
        validNome = false;
    } else {

        labelNome.setAttribute('style', 'color: black');
        labelNome.innerHTML = 'Nome';
        inputNome.setAttribute('style', 'border-color: rgb(98, 92, 92)');
        validNome = true;
    }
});

inputUsuario.addEventListener('keyup',()=>{
    if (inputUsuario.value.length < 4) {
        labelUsuario.setAttribute('style', 'color: #F44336');
        labelUsuario.innerHTML = 'Usuario  *Insira no mínimo 4 caracteres';
        inputUsuario.setAttribute('style', 'border-color: #F44336');
        validUsuario = false;
    } else {

        labelUsuario.setAttribute('style', 'color: black');
        labelUsuario.innerHTML = 'Usuário';
        inputUsuario.setAttribute('style', 'border-color: rgb(98, 92, 92)');
        validUsuario = true;
    }
});

inputSenha.addEventListener('keyup',()=>{
    if (inputSenha.value.length < 6) {
        labelSenha.setAttribute('style', 'color: #F44336');
        labelSenha.innerHTML = 'Senha  *Insira no mínimo 6 caracteres';
        inputSenha.setAttribute('style', 'border-color: #F44336');
        validSenha = false;
    } else {

        labelSenha.setAttribute('style', 'color: black');
        labelSenha.innerHTML = 'Senha';
        inputSenha.setAttribute('style', 'border-color: rgb(98, 92, 92)');
        validSenha = true;
    }
});

inputConfSenha.addEventListener('keyup',()=>{
    if (inputConfSenha.value != inputSenha.value ) {
        labelConfSenha.setAttribute('style', 'color: #F44336');
        labelConfSenha.innerHTML = 'Confirmar Senha *As senhas não conferem';
        inputConfSenha.setAttribute('style', 'border-color: #F44336');
        validConfSenha = false;
    } else {

        labelConfSenha.setAttribute('style', 'color: black');
        labelConfSenha.innerHTML = 'Confirmar Senha';
        inputConfSenha.setAttribute('style', 'border-color: rgb(98, 92, 92)');
        validConfSenha = true;
    }
});

//=========================== Função de cadastro ==================================

let msgErrorCad = document.querySelector('#msgErrorCad');
let msgSuccesCad = document.querySelector('#msgSuccesCad');
const btnCadatrar = document.querySelector('#btnCadastrar');

btnCadatrar.addEventListener('click',()=>{
     /*precisamos verificar se todos os campos estão preenchidos tem várias formas 
    de fazer isso podemos criar para cada input uma var valid = false
    não é somente ser preenchida e sim ser preenchida corretamente ai que entra
    as validações de key up 
    */

   //Nessa linha vericamos se cada um dos inputs está valido (preenchidos corretamente)
   if(validNome && validUsuario && validSenha && validConfSenha){
    //Aqui criamo um array que vai armazenas uma lista de objetos usuario 
      let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')||'[]');
  /*Ela recebe um item JSON (String) já armazenada no localStorage e converte para array e passa pro
   listaUsuarios caso o item não exista, [] é uma string que representa um array vazio em formato JSON
   ele vai ser convertido então para array e atribuido a listaUsuario */
     
      listaUsuarios.push(
          //criamos um objeto usuário que será armazenado no array
          {
              nome: inputNome.value,
              usuario: inputUsuario.value,
              senha: inputSenha.value
          }
      );
  
      localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
  
      /*Neste ponto, o JSON.stringify() converte o array de objetos para um JSON(formato de texto)
      e armazena no localStorage onde pode ser resgato pela chave 'listaUsuarios'*/
  
           msgSuccesCad.style ='display: block;';
           msgSuccesCad.innerHTML = '<strong>Usuário cadastrado com sucesso!</strong>';
           msgErrorCad.style ='display: none;';
           msgErrorCad.innerHTML = '';
  

     }else{
           msgErrorCad.style = 'display: block;'
           msgErrorCad.innerHTML = '<strong>Preencha todos os campos corretamente!</strong>';
           msgSuccesCad.style ='display: none;';
           msgSuccesCad.innerHTML = '';
     }
})


/*
function cadastrar(){
   
    
}
*/
