const buttonElement = document.querySelector(".submitButton");

buttonElement.addEventListener('click', async () => {
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
        //Realizando a requisiçao HTTP
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

        //transformando response em um JSON, para poder visualizar e salvar posteriormente os dados retornados pelo servidor.
        const responseJson = await response.json()
        console.log(responseJson)

        //acessando dados do response e salvando como objeto para inserir no local storage.
        const user = {
            email: responseJson.email,
            id: responseJson.id,
            token: responseJson.token
        };

        //Converte objeto em string para poder inserir no localstorage.
        localStorage.setItem('user', JSON.stringify(user));

        

    } catch(err){
        console.error('Erro:', err);
    };

});
