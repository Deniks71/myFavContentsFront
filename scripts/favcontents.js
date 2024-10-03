const buttonFetchElement = document.querySelector('.testeFetch');
buttonFetchElement.addEventListener('click', () => {
    getContents();
})

async function getContents () {
    const contentContainer = document.querySelector('.content_container');
    
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    try{
    
        const response = await fetch(`http://localhost:3000/myfavcontent/user/${user.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse)

    } catch (err){
        console.error('Erro:', err);
    }
}
