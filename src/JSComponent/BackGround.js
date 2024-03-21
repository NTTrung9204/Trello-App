import { useState, useEffect } from 'react';
import TodoApp from './TodoApp/TodoApp.js';

var isClicked = false;

document.body.addEventListener('mouseup', function (e) {
    if (isClicked) {
        isClicked = false;
    }
});

function BackGround() {
    useEffect(() => {
        const todoApp = document.getElementsByClassName("todoApp");

        var positionPointer = { x: 0, y: 0 };

        Array.from(todoApp).forEach((element) => {
            element.addEventListener('mousedown', function (event) {
                isClicked = true;
                element.style.transition = 'all 0.0s';
                element.style.zIndex = 100;

                positionPointer.x = event.clientX - element.getBoundingClientRect().left;
                positionPointer.y = event.clientY - element.getBoundingClientRect().top;
            });

            element.addEventListener("mousemove", function (event) {
                if (isClicked && element.className === 'todoApp') {
                    element.style.left = event.clientX - positionPointer.x + 'px';
                    element.style.top = event.clientY - positionPointer.y + 'px';
                }
            });
        });

    }, []);

    return (
        <div className='backGround'>
            <TodoApp />
            <TodoApp />
            <TodoApp />
        </div>
    );
}

export default BackGround;