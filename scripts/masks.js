var inputPhone = document.querySelector("#phone-input")

inputPhone.addEventListener('input', (e) => {
    var text = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    //                           -> Exemplo de Digitação: '1234567890' -> match -> {'1234567890', '12', '345', '6789'}
    if (!text[2]){ //se a segunda parte da divisão for vazia só escreva os números
        e.target.value = text[1];
    }else {
        if (!text[3]){
            e.target.value = "(" + text[1] + ") " + text[2]; 
        }else {
            e.target.value = "(" + text[1] + ") " + text[2] + "-" + text[3];  
        }
    }
});

