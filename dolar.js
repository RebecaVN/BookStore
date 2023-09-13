fetch(`https://economia.awesomeapi.com.br/json/last/USD-BRL`).then(response =>{
    return response.json()
}).then (economia => {
    console.log(economia)
    document.getElementById("dolar").value = economia.USDBRL.bid;
    document.getElementById("moeda").innerHTML = economia.USDBRL.code;

    cotacao =  economia.USDBRL['bid']
    console.log("real : "+(cotacao*2))

    const numero = dolar.value;
    const operacao = parseFloat(dolar)

    const num1 = document.getElementById('num1');
    const resultado = document.getElementById('resultado');
   
    num1.addEventListener('input', () => {
        const soma = parseInt(num1.value) * parseFloat(cotacao);
        resultado.textContent = soma;
      });
})
