import { useState, useEffect } from 'react';
import TodoApp from './TodoApp/TodoApp.js';

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

    }, []);

    return (
        <div className='backGround'>
            <TodoApp data_id={123} />
            <TodoApp data_id={333} />
            <TodoApp data_id={321} />
            <button id="createTodo">
            <i className="fas fa-plus"></i>
            </button>
        </div>
    );
}

export default BackGround;