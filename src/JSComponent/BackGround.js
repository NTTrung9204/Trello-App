import { useState, useEffect } from 'react';
import TodoApp from './TodoApp/TodoApp.js';
import CreateTodo from './TodoApp/CreateTodo.js';

function generateTimestampID() {
    return Date.now().toString(36);
}

var isClicked = false;

document.body.addEventListener('mouseup', function (e) {
    isClicked = false;
    const todoApp = document.getElementsByClassName("todoApp");
    Array.from(todoApp).forEach(element => {
        element.style.transition = 'all 0.3s';
    });
});


function BackGround() {
    const [todoAppList, setTodoAppList] = useState(localStorage.getItem('todoAppList')? JSON.parse(localStorage.getItem('todoAppList')) : []);

    function createTodoApp() {
        const idApp = generateTimestampID();
        const newTodoAppList = [...todoAppList, idApp];
        setTodoAppList(newTodoAppList);
        localStorage.setItem('todoAppList', JSON.stringify(newTodoAppList));
        const nameBoard = prompt("Enter name of board: ");
        if(nameBoard){
            localStorage.setItem(idApp + "_nameBoard", JSON.stringify(nameBoard));
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
                }
            });
        });

    }, [todoAppList]);

    return (
        <div className='backGround'>
            {
                todoAppList.map((data_id) => {
                    return <TodoApp key={data_id} data_id={data_id} />
                })
            }
            <CreateTodo onClick={createTodoApp} />
        </div>
    );
}

export default BackGround;