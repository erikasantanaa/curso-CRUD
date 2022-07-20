//Para a página não recarregar!
window.addEventListener('load', start);

//Declarando variaveis globais.
var GlobalNames = ['Um', 'Dois', 'Três', 'Quatro', 'Cinco'];
var IsEditing = false; //quando entra no modo de edição.
var Posicao; //qual a posição que se deve inserir um novo valor.

var nomes = document.querySelector('#nomes');
var ul = document.createElement('ul');
var input = document.getElementById('input');
var form = document.getElementById('formulario');

function start() {

    previnirComportamentoDeDefault(form);
    aplicarFoco(input);
    capturarValoresDigitados(input); //inserir ou editar
    exibirVetor();

}

function previnirComportamentoDeDefault(objeto) {

    objeto.addEventListener('submit', function (event) {
        event.preventDefault();
    });
}

function aplicarFoco(objeto){
    objeto.focus();
}

function capturarValoresDigitados(objeto) {
    objeto.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            var valorDigitado = event.target.value; //obtendo conteudo digitado

            //se algum valor tiver sido digitado, entao editar ou inserir
            if (valorDigitado) {
                if (IsEditing) {
                    //editando valores
                    GlobalNames.splice(posicao, 1, valorDigitado);
                    IsEditing = false; //desativando modo edição
                } else {
                    //Inserindo valores
                    GlobalNames.push(valorDigitado); //inserirndo no array GlobalNames
                }
            }

            exibirVetor();//atualizar site e exibir vetor com novo calor
        }
    });
}

function exibirVetor(){
    //Limpando conteudo da ul e input para receber novos valores
    ul.innerHTML = '';
    input.value = '';

    //para cada posição do vetor, executar a função percorrerVetor
    GlobalNames.forEach(percorrerVetor);
    nomes.appendChild(ul); //adicionar ul na div nomes para ser exibida nomes
}

function percorrerVetor(item){
    var li = document.createElement('li');

    li.appendChild(criarBotao()); //criar e adicionar o botão x na li
    li.appendChild(criarSpan(item));// cria e adc o span na li
    ul.appendChild(li); //adicionando li na ul
}

function criarBotao(){
    var botao = document.createElement('button');
    //adicionando classe deleteButton
    botao.classList.add('deleteButton');
    botao.textContent = 'x'; //adiconando conteúdo x

    //retornando botão criado ao ponto de chamada desta função
    return botao;
}

function criarSpan(valor) {
    var span = document.createElement('span');
    span.textContent = valor; //adicionando o valor dentro do span
    span.classList.add('clicavel');
    span.addEventListener('click', editarItem);
    //retornando valor dentro do span.
    return span;
}

function editarItem(event) {
    //capturando valor do elemento clicado
    var valor = event.target.innerHTML;

    var index = GlobalNames.indexOf(valor); //identificando indice
    input.value = GlobalNames[index];
    aplicarFoco(input); //aplicar foco no input
    IsEditing = true;
    Posicao = index;
}

//deletando elementos da lista que forem clicados
ul.addEventListener('click', function(event){
    //realizar evento apenas quando o usuario clicar no botão
    if (event.target.localName === 'button') {
        //capturando valor do elemento clicado
        var valor = event.srcElement.nextElementSibling.innerHTML;

        //deletando elemento de global names
        var index = GlobalNames.indexOf(valor); //identificando indice
        GlobalNames.splice(index, 1);

        var ancestral = event.target.parentElement;
        ancestral.remove(); //removendo elemento do site
        exibirVetor(); //atualizar site e exibir vetor com novo valor
    }
});

