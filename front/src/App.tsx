import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { TodoItem } from './components/molecules/TodoItem';
import { InputArea } from './components/organizms/InputArea ';
import { TodoList } from './components/organizms/TodoList';
import { Todo } from './types/todo';

function App() {

  // 初回ロード時にTODOリストを更新
  useEffect(() => fetchTodos(), [])

  // TODOを入力(inputTextステート)
  const [inputText, setInputText] = useState('');
  const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => setInputText(e.target.value);

  // TODOをステートで持つ
  const [todos, setTodos] = useState<Array<Todo>>([]);


  // TODOを取得する
  const fetchTodos = () => {
    axios.get('http://localhost:3000/todos').then((res) => {
      const newTodos = res.data;
      console.log('fetchtodos');
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
      setTodos([...todos, res.data]);
      setInputText('');
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      console.log('finish post');
    });
  }
  return (
    <div className="App">
      <InputArea onClickAdd={onClickAdd} onChangeInputText={onChangeInputText} inputText={inputText} />
      <div>
        <TodoList>
          {todos.map((todo, index) => (
            <TodoItem todos={todos} index={index} key={index} todo={todo} setTodos={setTodos} />
          ))}
          {console.log('list')}
        </TodoList>
      </div>
    </div>
  );
}

export default App;
