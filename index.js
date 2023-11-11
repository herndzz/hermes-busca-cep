function buscarCEP() {
    // Variáveis
    const ufList = document.getElementById('uf');
    const ufValue = ufList.value;
    const cep = document.getElementById('cep').value;
    const cidade = document.getElementById('cidade').value;
    const logradouro = document.getElementById('logradouro').value.replace(/\s+/g, '+');
    const linkBase = 'https://viacep.com.br';
    
    // Busca primeiramneto pelo CEP, se não estiver inserido, é feito uma busca pela UF, logradouro e cidade
    if (cep) {
        fetch(`${linkBase}/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                exibirResultado(data);
                console.log(data);
            })
            .catch(error => {
                document.getElementById('resultado').innerHTML = 'CEP não encontrado ou erro na busca.'
                console.error(error);
            });
    } else {
        //console.log(ufValue, logradouro, cidade, `${linkBase}/ws/${ufValue}/${cidade}/${logradouro}/json/`);
        fetch(`${linkBase}/ws/${ufValue}/${cidade}/${logradouro}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data || data.erro) {
                    document.getElementById('resultado').innerHTML = 'Endereço não encontrado ou erro na busca.';
                    return;
                }         
                
                exibirResultado(data);
            })
            .catch(error => {
                document.getElementById('resultado').innerHTML = 'Erro na busca do endereço.';
            });
    }
}

// Função para Exibir o Resultado da Busca
function exibirResultado(data) {
    console.log(data, data.length); // Dados Brutus
    let responseData = ``;
    let counter = 0;
    
    // Se a resposta possuir mais de 1 resultado, será executado o 'if' abaixo, onde será feito um 'map' para listar os elementos e atribuir ao 'responseData'
    if(data.length > 1) {
        responseData = data.map(i => {
            counter++; // Enumera os resultados
            return `
                    <div class="res-container">
                        <h4>${counter}</h4>
                        <p>CEP: <span>${i.cep}</span></p>
                        <p>Logradouro: <span>${i.logradouro === "" ? 'Sem dados' : i.logradouro}</span></p>
                        <p>Bairro: <span>${i.bairro === "" ? 'Sem dados' : i.bairro}</span></p>
                        <p>Cidade: <span>${data.localidade  === "" ? 'Sem dados' : i.localidade}</span></p>
                        <p>Estado: <span>${i.uf}</span></p>
                        <p>DDD: <span>${i.ddd}</span></p>
                        <p>IBGE: <span>${i.ibge}</span></p>
                        <p>GIA: <span>${i.gia === "" ? 'Sem dados' : i.gia}</span></p>
                        <p>SIAFI: <span>${i.siafi}</span></p>
                    </div>`
        }).toString().replace(/,/g, ''); //Transforma o array em uma String e elimina as vírgulas
        
        console.info('MultipleResponse: ok');
    } else { // Se a resposta não possuir mais de 1 resultado, será executado o 'else', onde será inserido um HTML simples ao 'responseData'
        responseData = `
        <div class="res-container">
            <p>CEP: <span>${data.cep}</span></p>
            <p>Logradouro: <span>${data.logradouro === "" ? 'Sem dados' : data.logradouro}</span></p>
            <p>Bairro: <span>${data.bairro === "" ? 'Sem dados' : data.bairro}</span></p>
            <p>Cidade: <span>${data.localidade  === "" ? 'Sem dados' : data.localidade}</span></p>
            <p>Estado: <span>${data.uf}</span></p>
            <p>DDD: <span>${data.ddd}</span></p>
            <p>IBGE: <span>${data.ibge}</span></p>
            <p>GIA: <span>${data.gia === "" ? 'Sem dados' : data.gia}</span></p>
            <p>SIAFI: <span>${data.siafi}</span></p>
        </div>`
        
        console.info('UniqueResponse: ok')
    }
    
    document.getElementById('resultado').innerHTML = responseData; // Altera o código HTML do interior do objeto para mostrar o resultado
}

// Regex do cep inserido no input
document.getElementById('cep').addEventListener('input', function() {
    let cepValue = this.value;
    // Remove caracteres não numéricos
    cepValue = cepValue.replace(/\D/g, '');
    // Adiciona o hífen depois do quinto caractere
    if (cepValue.length > 5) {
        cepValue = cepValue.slice(0, 5) + '-' + cepValue.slice(5, 8);
    }
    // Limita a entrada para o tamanho máximo de um CEP (9, considerando o hífen)
    if (cepValue.length > 9) {
        cepValue = cepValue.slice(0, 9);
    }
    this.value = cepValue;
});