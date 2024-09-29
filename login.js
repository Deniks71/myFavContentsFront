const buttonElement = document.querySelector(".submitButton");

buttonElement.addEventListener('click', async ()=>{
    //Selecionando elementos html
    const emailElement = document.querySelector("#inputEmail");
    const passwordElement = document.querySelector("#inputPassword");

    const email = emailElement.value;
    const password = passwordElement.value;

    //Validações simples para usuarios inserirem email e senha
    if(!email){
        window.alert("Insira um email Valido");
        return;
    };

    if(!password){
        window.alert("Insira uma senha valida")
        return;
    };

    try{
        const response = await fetch('http://localhost:3000/myfavcontent/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const responseJson = await response.json()
        console.log(responseJson)

    } catch(err){
        console.error('Erro:', err);
    };

});
