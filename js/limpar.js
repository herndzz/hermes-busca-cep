//
function limparInput() {
    console.log('Executed limparInput()')
    const cep = document.getElementById('cep');
    const cidade = document.getElementById('cidade');
    const logradouro = document.getElementById('logradouro');
    const reseultado = document.getElementById('resultado');
    
    cep.value = '';
    cidade.value = '';
    logradouro.value = '';
    reseultado.innerHTML = '';
}