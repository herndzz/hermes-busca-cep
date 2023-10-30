function buscarCEP() {
    const cep = document.getElementById('cep').value;
    const uf = document.getElementById('uf').value;
    const cidade = document.getElementById('cidade').value;
    const logradouro = document.getElementById('logradouro').value;
    
    const loading = document.getElementById('loading');
    loading.style.display = 'block';

    if (cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                exibirResultado(data);
            })
            .catch(error => {
                document.getElementById('resultado').innerHTML = 'CEP não encontrado ou erro na busca.';
            });
    } else {
        console.log(uf, logradouro, cidade);
        fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`)
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

function exibirResultado(data) {
    document.getElementById('resultado').innerHTML = `
        <p>CEP: <span>${data.cep}</span></p>
        <p>Logradouro: <span>${data.logradouro}</span></p>
        <p>Bairro: <span>${data.bairro}</span></p>
        <p>Cidade: <span>${data.localidade}</span></p>
        <p>Estado: <span>${data.uf}</span></p>
    `;
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

/*fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultado').innerHTML = `
                <p>Logradouro: <span>${data.logradouro}</span></p>
                <p>Bairro: <span>${data.bairro}</span></p>
                <p>Cidade: <span>${data.localidade}</span></p>
                <p>Estado: <span>${data.uf}</span></p>
            `;
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = 'CEP não encontrado ou erro na busca.';
        });*/