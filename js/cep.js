function calcularFrete() {
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const cidade = data.localidade;
        const estado = data.uf;
  
        let frete;
        if (cidade === 'Mogi das Cruzes') {
          frete = 0;
        } else if (estado === 'SP' && cidade.startsWith('São Paulo')) {
          frete = 11.60; // 50% de desconto
        } else if (estado === 'SP' && ['Santos', 'Guarujá', 'Bertioga', 'Ubatuba'].includes(cidade)) {
          frete = 12.90; // 40% de desconto
        } else if (['SP', 'RJ', 'ES', 'MG'].includes(estado)) {
          frete = 15; // valor fixo para a região Sudeste
        } else if (['PR', 'SC', 'RS'].includes(estado)) {
          frete = 20; // valor fixo para a região Sul
        } else if (['MS', 'MT', 'GO', 'DF'].includes(estado)) {
          frete = 25; // valor fixo para a região Centro-Oeste
        } else if (['BA', 'SE', 'AL', 'PE', 'PB', 'RN', 'CE', 'PI', 'MA'].includes(estado)) {
          frete = 25; // valor fixo para a região Nordeste
        } else if (['AM', 'RR', 'AP', 'PA', 'TO', 'RO', 'AC'].includes(estado)) {
          frete = 30; // valor fixo para a região Norte
        } else {
          frete = 35; // valor fixo para outras regiões do Brasil
        }
        const freteDiv = document.getElementById('caixa-frete');
        const valorFrete = frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2)}`;
        freteDiv.innerHTML = `<p>O valor do frete para ${cidade} é ${valorFrete}.</p>`;
        freteElement.classList.add('fixed-position');
      })
      .catch(error => {
        console.error(error);
      })

           //preencher os inputs com arrow functions
 const preencherFormulario = (endereco) => {
  document.getElementById("rua").value = endereco.logradouro;
  document.getElementById("bairro").value = endereco.bairro;
  document.getElementById("cidade").value = endereco.localidade;
  document.getElementById("estado").value = endereco.uf;
}
//autopreenchimento
const cepValido = (cep) => {
  if (cep.length == 8) {
      return true;
  } else {
    freteElement.textContent = `Esse CEP não existe.`;
  }
}
}
'use strict';

const limparFormulario = (endereco) =>{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}


const preencherFormulario = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => {
    limparFormulario();
    
    const cep = document.getElementById('cep').value.replace("-","");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!';
        }else {
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
     
}

document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep);



