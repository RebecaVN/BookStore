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
          frete = 0.50; // 50% de desconto
        } else if (estado === 'SP' && ['Santos', 'Guarujá', 'Bertioga', 'Ubatuba'].includes(cidade)) {
          frete = 0.60; // 40% de desconto
        } else if (['SP', 'RJ', 'ES', 'MG'].includes(estado)) {
          frete = 20; // valor fixo para a região Sudeste
        } else if (['PR', 'SC', 'RS'].includes(estado)) {
          frete = 30; // valor fixo para a região Sul
        } else if (['MS', 'MT', 'GO', 'DF'].includes(estado)) {
          frete = 40; // valor fixo para a região Centro-Oeste
        } else if (['BA', 'SE', 'AL', 'PE', 'PB', 'RN', 'CE', 'PI', 'MA'].includes(estado)) {
          frete = 50; // valor fixo para a região Nordeste
        } else if (['AM', 'RR', 'AP', 'PA', 'TO', 'RO', 'AC'].includes(estado)) {
          frete = 60; // valor fixo para a região Norte
        } else {
          frete = 100; // valor fixo para outras regiões do Brasil
        }
  
        const valorFrete = frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2)}`;
        alert(`O valor do frete para ${cidade} é ${valorFrete}.`);
      })
      .catch(error => {
        console.error(error);
      })
    }