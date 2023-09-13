fetch(`https://economia.awesomeapi.com.br/json/last/USD-BRL`).then(response =>{
    return response.json()
}).then (economia => {
    var taxa = economia.USDBRL.bid; 
    taxa= parseFloat(taxa)
    console.log(taxa)
    console.log(typeof taxa)

    var precoDolar = document.getElementsByClassName("precoDolar")

     for(x=0;x<=precoDolar.length;x++ ){
        console.log(precoDolar[x].innerHTML)
        var precoReal = (precoDolar[x].innerHTML*taxa); 

        document.getElementsByClassName("precoReal")[x].innerHTML = precoReal.toFixed(2); 

     } 

})
.catch(error => console.error(error));
