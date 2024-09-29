const buttonElement = document.querySelector(".submitButton");

buttonElement.addEventListener('click', async () => {

    //Selecionando elementos html
    const emailElement = document.querySelector("#inputEmail");
    const nameElement = document.querySelector("#inputName");
    const passwordElement = document.querySelector("#inputPassword");
    const confirmPasswordElement = document.querySelector("#inputConfirmPassword");

    const email = emailElement.value;
    const name = nameElement.value;
    const password = passwordElement.value;
    const confirmpassword = confirmPasswordElement.value;

    if(!email){
        window.alert("Insira um email Valido");
        return;
    };
    if(!name){
        window.alert("Insira um nome Valido");
        return;
    };

    if(!password){
        window.alert("Insira uma senha valida")
        return;
    };

    if(confirmpassword !== password){
        window.alert("As senhas não correspondem!")
        return;
    };

    
    try{
        const response = await fetch('http://localhost:3000/myfavcontent/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                name,
                email,
                password,
                confirmpassword 
            })
        });


        const responseJson = await response.json();
        console.log(responseJson);
    } catch(err){
        console.error('Erro:', err);
    }

})