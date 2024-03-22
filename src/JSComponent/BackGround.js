import { useState, useEffect } from 'react';
import TodoApp from './TodoApp/TodoApp.js';
import CreateTodo from './TodoApp/CreateTodo.js';
import HeaderListTask from './TodoApp/HeaderListTask.js';
import DeleteTodo from './TodoApp/DeleteTodo.js';
import DangerousZone from './TodoApp/DangerousZone.js';

function generateTimestampID() {
    return Date.now().toString(36);
}

function getCenterElement(element) {
    const rect = element.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}

function isContain(element, x, y) {
    const rect = element.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

var isClicked = false;

document.body.addEventListener('mouseup', function (e) {
    isClicked = false;
    const todoApp = document.getElementsByClassName("todoApp");
    Array.from(todoApp).forEach(element => {
        element.style.transition = 'all 0.3s';
        if(isContain(document.getElementsByClassName('dangerousZone')[0], getCenterElement(element).x, getCenterElement(element).y)){
            if(window.confirm("Do you want to delete this board?")){
                element.remove();
                const headerItems = document.getElementsByClassName("headerItem");
                Array.from(headerItems).forEach((headerItem, index) => {
                    console.log(JSON.parse(localStorage.getItem(element.getAttribute('data-id') + "_nameBoard")));
                    if(headerItem.textContent === JSON.parse(localStorage.getItem(element.getAttribute('data-id') + "_nameBoard"))) {
                        headerItem.remove();
                    }
                });
                
                localStorage.removeItem(element.getAttribute('data-id'));
                localStorage.removeItem(element.getAttribute('data-id') + "_nameBoard");
                localStorage.removeItem(element.getAttribute('data-id') + "_listTask");
                const newTodoAppList = JSON.parse(localStorage.getItem('todoAppList')).filter((data_id) => data_id !== element.getAttribute('data-id'));
                localStorage.setItem('todoAppList', JSON.stringify(newTodoAppList));
                document.getElementsByClassName('dangerousZone')[0].style.backgroundColor = 'rgba(255, 77, 77, 0.7)';
                
            }
        }
    });
});


function BackGround() {
    const [todoAppList, setTodoAppList] = useState(localStorage.getItem('todoAppList')? JSON.parse(localStorage.getItem('todoAppList')) : []);

    function createTodoApp() {
        var nameBoard = prompt("Enter name of board: ");
        if(nameBoard){
            const idApp = generateTimestampID();
            localStorage.setItem(idApp + "_nameBoard", JSON.stringify(nameBoard));
            const newTodoAppList = [...todoAppList, idApp];
            setTodoAppList(newTodoAppList);
            localStorage.setItem('todoAppList', JSON.stringify(newTodoAppList));
        }
    }

    useEffect(() => {
        const todoApp = document.getElementsByClassName("todoApp");
        var zIndexCurrent = 0;

        var positionPointer = { x: 0, y: 0 };

        Array.from(todoApp).forEach((element) => {
            element.addEventListener('mousedown', function (event) {
                isClicked = true;
                element.style.transition = 'all 0.0s';
                element.style.zIndex = ++zIndexCurrent;

                positionPointer.x = event.clientX - element.getBoundingClientRect().left;
                positionPointer.y = event.clientY - element.getBoundingClientRect().top;
            });

            element.addEventListener("mousemove", function (event) {
                if (isClicked && element.className === 'todoApp') {
                    element.style.left = event.clientX - positionPointer.x + 'px';
                    element.style.top = event.clientY - positionPointer.y + 'px';
                    localStorage.setItem(element.getAttribute('data-id'), JSON.stringify({ x: element.style.left, y: element.style.top }));
                    const centerElement = getCenterElement(element);
                    if (isContain(document.getElementsByClassName('dangerousZone')[0], centerElement.x, centerElement.y)) {
                        document.getElementsByClassName('dangerousZone')[0].style.backgroundColor = 'red';
                    }
                    else {
                        document.getElementsByClassName('dangerousZone')[0].style.backgroundColor = 'rgba(255, 77, 77, 0.7)';
                    }
                }
            });
        });

    }, [todoAppList]);

    return (
        <div className='backGround'>
            <HeaderListTask todoAppList={todoAppList} />
            {
                todoAppList.map((data_id) => {
                    return <TodoApp key={data_id} data_id={data_id} />
                })
            }
            <CreateTodo onClick={createTodoApp} />
            <DeleteTodo />
            <DangerousZone />
        </div>
    );
}

export default BackGround;