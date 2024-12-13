import React, { useState } from 'react';
import {Input, Button, Tabs, Space, Typography} from 'antd';

import { AllTodosTab, ActiveTodosTab, CompletedTodosTab } from './Tabs.tsx'
import { Todo } from './interfaces.ts'

const TodoList: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [inputValue, setInputValue] = useState<string>('');
	const [nextId, setNextId] = useState<number>(1);
	
	const addTodo = () => {
		if (inputValue.trim()) {
			const newTodo: Todo = { id: nextId, text: inputValue, completed: false };
			setTodos([...todos, newTodo]);
			setInputValue('');
			setNextId(nextId + 1);
		}
	};
	
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addTodo();
		}
	};
	
	const removeTodo = (id: number) => {
		setTodos(todos.filter(todo => todo.id !== id));
	};
	
	const toggleTodo = (id: number) => {
		setTodos(todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		));
	};
	
	const items = [
		{
			key: '1',
			label: 'Все',
			children: <AllTodosTab todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />,
		},
		{
			key: '2',
			label: 'В работе',
			children: <ActiveTodosTab todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />,
		},
		{
			key: '3',
			label: 'Выполненные',
			children: <CompletedTodosTab todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />,
		},
	];
	
	return (
		<>
			<Input
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Введите задачу"
				style={{ width: '300px', marginRight: '10px' }}
			/>
			
			<Button type="primary" onClick={addTodo}>Добавить</Button>
			
			<Tabs
				defaultActiveKey="1"
				items={items}
				style={{ marginTop: '20px' }}
				size="large"
				centered
			/>
			
			<Space
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: '20px',
				}}
			>
				<Space>
					<Typography.Text>Всего задач: {todos.length}</Typography.Text>
					<Typography.Text>Выполнено: {todos.filter(todo => todo.completed).length}</Typography.Text>
					<Typography.Text>Не выполнено: {todos.filter(todo => !todo.completed).length}</Typography.Text>
				</Space>
				
				<Button onClick={() => setTodos(todos.filter(todo => !todo.completed))}>Удалить выполненные</Button>
			</Space>
		</>
	);
};

export default TodoList;