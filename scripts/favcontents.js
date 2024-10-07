// const buttonFetchElement = document.querySelector('.testeFetch');
// buttonFetchElement.addEventListener('click', () => {
//     getContents();
// })
getContents();
const addButtonElement = document.querySelector('#insereConteudo_button');
const buttonDeleteElement = document.querySelectorAll('.delete-btn');
const contentContainer = document.querySelector('.content_container');

contentContainer.addEventListener('click', (event) => {
   console.log(event)
   if(event.target.classList.contains('delete-btn')){
        const clickedButton = event.target;
        const idFromDataAttribute = clickedButton.dataset.id
        deleteContent(idFromDataAttribute)
   }
})


addButtonElement.addEventListener('click', () => {
    const titleElement = document.querySelector('#inputconteudo');
    const descriptionElement = document.querySelector('#input_descricao');

    const title = titleElement.value;
    const description = descriptionElement.value;

    if(!title){
        alert('Insira um conteúdo.');
    };
    if(!description){
        alert('Insira uma descrição');
    }

    addContent(title,description);
    titleElement.value = ""
    descriptionElement.value = ""
})

 
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

        const contentContainer = document.querySelector('.content_container');
        contentContainer.innerHTML = ''; // Limpa o conteúdo existente

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
};

async function addContent (title,description) {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    const contentData = {
        title: title,
        description: description
    }
    try{
        const response = await fetch(`http://localhost:3000/myfavcontent/user/${user.id}/insertContent`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contentData)
        })

        console.log(response);
        getContents();

    } catch (err){
        console.error('Erro:', err);
    }

};

async function deleteContent (idContent) {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    try{
        const response = await fetch(`http://localhost:3000/myfavcontent/user/${user.id}/delete/${idContent}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
            
        })

        getContents();
        console.log(response);
        
        
    } catch (err){
        console.error('Erro:', err);
    }
    
}