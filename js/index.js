
    const save = document.querySelector('#add');
    const input = document.querySelector('#task');
    const container = document.querySelector('.container_item');
    const title = document.querySelector('h3')

    save.addEventListener('click', () => {
        const value=input.value;

       if(!value){
           alert('Заполните поле...')
           return;
       }
   
let newTask ={
    value: value  ,
    // можно просто value
    id:  Date.now(),
};
setItemToStorage(newTask);
render();

    });   
    
    // Помещает значение в Local storage
    const setItemToStorage = (task) =>{
    if(!localStorage.getItem('task')){
        localStorage.setItem('task', '[]')
    }
      const data = JSON.parse(localStorage.getItem('task'));
    //   console.log(data) ;  
 data.push(task);
 localStorage.setItem('task',JSON.stringify(data));
    };

    const render = () =>{
        if(!localStorage.getItem('task')){
            localStorage.setItem('task', '[]')
        } 
        let newDate = JSON.parse(localStorage.getItem('task'))
        
        // Условный рендеринг
        newDate.length > 0?    
        (title.textContent = `У вас ${newDate.length} активных задач`)
        // обратные ковычки если хотим в предложение добавить переменную ${newDate} бла бла
        : (title.textContent = 'Нет активных задач') 


        let html  = '';
        newDate.forEach((t, i) => {
            // console.log(t, i)
            html += `
            <li class="item">${t.value}<button id="delet" onclick='deletTask(${i})'>Deleted</button></li>
            `;
            container.innerHTML = html;

        });
        input.value ='';
    }
    const deletTask =(index)=>{
    const todos = document.querySelectorAll('.item')
    todos[index].classList.add('del')

    setTimeout(() => {
        let data= JSON.parse(localStorage.getItem('task'))
        data.splice(index,1)
        localStorage.setItem('task', JSON.stringify(data))
        render();
    }, 500)
    }
    

    render();
