import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';

function App() {

  type Todo = {
      id: number;
      text: string;
      created_at: string;
      updated_at: string;
  }

  // 初回ロード時にTODOリストを更新
  useEffect(() => fetchTodos(), [])

  // TODOを入力(inputTextステート)
  const [inputText, setInputText] = useState('');
  const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => setInputText(e.target.value);

  // TODOの更新内容を入力

  // TODOをステートで持つ
  const [todos, setTodos] = useState<Array<Todo>>([]);

  // TODOを取得する
  const fetchTodos = () => {
    axios.get('http://localhost:3000/todos').then((res) => {
      const newTodos = res.data;
      console.log(newTodos);
      setTodos(newTodos);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      console.log('finish');
    });
  }

  // TODOを作成する
  const onClickAdd = () => {
    const newTodo = { todo: { text: inputText } };
    axios.post('http://localhost:3000/todos/', newTodo).then((res) => {
      setTodos(res.data)
      setInputText('')
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      console.log('finish post')
    });
  }

  // TODO完了
  const onClickDo = (id: number) => {
    axios.delete(`http://localhost:3000/todos/${id}`).then((res) => {
      setTodos(res.data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      console.log('finish');
    });
  }
  return (
    <div className="App">
      <div>
        <input type="text" value={inputText} onChange={onChangeInputText} />
        <button onClick={onClickAdd}>作成</button>
      </div>
      <div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <input type="text" value={todo.text} />
              <button>変更</button>
              <button onClick={() => onClickDo(todo.id)}>完了</button>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
