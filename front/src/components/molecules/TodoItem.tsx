import axios from "axios";
import { ChangeEvent, Dispatch, memo, useEffect, useState, VFC } from "react";
import { Todo } from "../../types/todo";

type Props = {
    index: number;
    todo: Todo;
    todos: Array<Todo>;
    setTodos: Dispatch<Array<Todo>>;
}

export const TodoItem: VFC<Props> = memo((props) => {
    const { todo, setTodos, todos } = props;
    const [todoText, setTodoText] = useState('');
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value);
    }

    useEffect(() => {
        setTodoText(todo.text);
    }, [todo]);

    // TODOを更新
    const updateTodo = (id: number) => {
        console.log(id)
        axios.patch(`http://localhost:3000/todos/${id}`, { todo: { text: todoText } }).then((res) => {
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            console.log('finish');
        });
    }
    // TODO完了
    const onClickDo = (id: number) => {
        console.log(id);
        axios.delete(`http://localhost:3000/todos/${id}`).then((res) => {
            setTodos(todos.filter((todo) => todo.id !== id));
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            console.log('finish');
        });
    }

    return (
        <li>
            <input type="text" value={todoText} onChange={onChangeInput} />
            <button onClick={() => updateTodo(todo.id)}>変更</button>
            <button onClick={() => onClickDo(todo.id)}>完了</button>
        </li>
    );
})