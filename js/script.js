/////////// CÓDIGO DA PARTE DOS DADOS DO USUÁRIO /////////////
let olhoEditaSenha = document.querySelector("#olhoSenha");
let userLogado = JSON.parse(localStorage.getItem('userLogado'));
let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));
let msgAtualiza = document.querySelector("#msgAtualiza");
let logado = document.querySelector('.profile-name');
logado.innerHTML =`Seja bem vindo ao My Easy Real <strong> ${userLogado.user} </strong>!`;

document.getElementById('nome').value = userLogado.nome;
document.getElementById('usuario').value = userLogado.user;
document.getElementById('senha').value = userLogado.senha;



olhoEditaSenha.addEventListener('click', () => {
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

function editar(){
    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i].nome === userLogado.nome && listaUsuarios[i].senha === userLogado.senha) {

            listaUsuarios[i].usuario = document.getElementById('usuario').value
            listaUsuarios[i].nome = document.getElementById('nome').value
            listaUsuarios[i].senha = document.getElementById('senha').value
            
            userLogado.nome = document.getElementById('nome').value;
            userLogado.user = document.getElementById('usuario').value;
            userLogado.senha = document.getElementById('senha').value;
            localStorage.setItem('userLogado', JSON.stringify(userLogado));
            break;
        }
    }

    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
    msgAtualiza.setAttribute('style','display: block;');
    msgAtualiza.innerHTML = "Atualizando cadastro...";

    setTimeout(()=>{
        window.location.href = 'https://jaooliveira25.github.io/my-easy-real/aplicacao-principal.html';
    },2000);
   
}

if(localStorage.getItem('token')==null){
    alert('Você precisa estar logado para acessar essa página');
    window.location.href = 'https://jaooliveira25.github.io/my-easy-real/index.html';
}

function sair(){
    localStorage.removeItem('token');
    localStorage.removeItem('userLogado');
    window.location.href = 'https://jaooliveira25.github.io/my-easy-real/index.html';
}

document.addEventListener("DOMContentLoaded", () => {
    const openModalButton = document.querySelector("#open-modal");
    const closeModalButton = document.querySelector("#close-modal");
    const modal = document.querySelector("#modal");
    const fade = document.querySelector("#fade");
    
    const toggleModal = ()=>{
        //Alterna (liga/desliga) uma classe no elemento. Se a classe já estiver presente, ela será removida.
        //Se a classe não estiver presente, ela será adicionada.
        modal.classList.toggle("hide");
        fade.classList.toggle("hide");
    };
    
    [openModalButton, closeModalButton, fade].forEach((el)=>{
        el.addEventListener("click", ()=>toggleModal())
    });


    
});

////////////////// CÓDIGO DA APLICAÇÃO PRINCIPAL /////////////////////////

const tbody = document.querySelector("tbody");//pega o o corpo da tabela
const descItem = document.querySelector("#desc");//pega o input com id desc(Descrição)
const amount = document.querySelector("#amount");//pega o input com id amount(valor)
const type = document.querySelector("#type");//pega o select com id type (Tipo) selecionado pelo usuario
const btnNew = document.querySelector("#btnNew");//seleciona o botão de id btnNew 

//agora vamos declarar as variveis que vão armazenar os valores dos <span>
const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");

let itens; //var que vai armazenar nossos items descrição valor tipo

btnNew.onclick = () =>{
    if(descItem.value === ""|| amount.value === ""|| type.value === ""){
        return alert("Preencha todos os campos!");
    }
    
    itens.push({
        desc: descItem.value,
        amount: Math.abs(amount.value).toFixed(2),
        type: type.value,
    } );

    setItensDB();
    loadItens();

    descItem.value = "";
    amount.value = "";
    
}

function insertItem(item, index){
    //criamo uma varivavel que representa a linha de uma tabela que vai ser inserida no tbody
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.desc}</td>
        <td>R$ ${item.amount}</td>
        <td class="columnType">${
            item.type == "Entrada"
            ?'<i class="bx bxs-chevron-up"></i>'
            :'<i class="bx bxs-chevron-down"></i>'
        }</td>
        <td class="columnAction">
            <button onclick="deleteItem(${index})" style="cursor: pointer;"><i class='bx bx-trash' ></i></button>
        </td>
    `;
    
    tbody.appendChild(tr);
}

function deleteItem(index){ // foi apagado em algum lugar do código ver amanhã 
    itens.splice(index, 1);
    setItensDB();//atualiza o bd 
    loadItens();//carrega na tela os dados do bd 
}

const getItensDB = ()=> JSON.parse(localStorage.getItem("db_itens"))??[];
//se no localStorage não tiver o item "db_items" a getItens recebe um array vazio
const setItensDB = () => localStorage.setItem("db_itens", JSON.stringify(itens));

function loadItens(){//inicializar a função loadItens que vai ser chamada assim que que carregar o document
    itens = getItensDB();//atribuit a var itens o conteudo que tem no BD e fica em formado de array
    tbody.innerHTML = "";
    //o forEach percorre cada index do array itens
    itens.forEach((item, index)=>{
        insertItem(item, index);//vamos criar essa função
    })

    getTotal();
}

function getTotal(){
    const amountIncomes = itens
    .filter((item)=>item.type === "Entrada")//filtra elementos de um array com base em uma condição
    .map((transaction)=> Number(transaction.amount));//transforma as string em números

    const amountExpenses = itens
    .filter((item)=>item.type === "Saída")
    .map((transaction)=> Number(transaction.amount));
    //reduce() é usado para reduzir um array a um único valor, aplicando uma função acumuladora a cada elemento do array, da esquerda para a direita.
    const totalIncomes = amountIncomes.reduce((acc, cur) => acc+cur, 0).toFixed(2);

    const totalExpenses = Math.abs(amountExpenses.reduce((acc, cur)=>acc+cur,0).toFixed(2));

    const totalItens = (totalIncomes - totalExpenses).toFixed(2);

    incomes.innerHTML = totalIncomes;
    expenses.innerHTML = totalExpenses;
    total.innerHTML = totalItens;
}

loadItens();//ao abrir o navegador ele já carrega o itens existente no bd


