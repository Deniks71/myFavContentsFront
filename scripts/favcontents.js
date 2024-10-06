// const buttonFetchElement = document.querySelector('.testeFetch');
// buttonFetchElement.addEventListener('click', () => {
//     getContents();
// })

getContents()
async function getContents () {
    
    
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

        jsonResponse.conteudos.forEach(content => {
            const contentContainer = document.querySelector('.content_container');

            const contentDiv = document.createElement('div');
            contentDiv.classList.add('content');

            const contentDivText = document.createElement('div');
            contentDivText.classList.add('content_text');

            const titleElement = document.createElement('h3');
            const descriptionElement = document.createElement('p')
            titleElement.innerText = content.title;
            descriptionElement.innerText = content.description;

            contentDivText.appendChild(titleElement);
            contentDivText.appendChild(descriptionElement);

            contentDiv.appendChild(contentDivText);
            
            const divContentButtons = document.createElement('div');
            divContentButtons.classList.add('content_buttons');

            const deleteButtonElement = document.createElement('button');
            deleteButtonElement.classList.add('delete-btn');
            deleteButtonElement.classList.add('button');
            deleteButtonElement.innerText = 'Delete';
            deleteButtonElement.setAttribute('data-id', content.idcontent);

            divContentButtons.appendChild(deleteButtonElement);

            contentDiv.appendChild(divContentButtons);

            contentContainer.appendChild(contentDiv);

            
        })

        

    } catch (err){
        console.error('Erro:', err);
    }
}

