import React, { useState } from 'react';
import { Input, Button, Tabs, Space, Typography, List, Checkbox } from 'antd';

import { Todo } from "./interfaces.ts";

const TodoList: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>(() => {
		const savedTodos = localStorage.getItem('todoItems');
		return savedTodos ? JSON.parse(savedTodos) : [];
	});
	
	const [nextId, setNextId] = useState<Todo['id']>(() => {
		const savedTodos = localStorage.getItem('todoItems');
		const parsedTodos = savedTodos ? JSON.parse(savedTodos) : [];
		return parsedTodos.length ? Math.max(...parsedTodos.map(todo => todo.id)) + 1 : 1;
	});
	
	const [inputValue, setInputValue] = useState('');
	
	const addTodo = () => {
		if (inputValue.trim()) {
			const newTodo = { id: nextId, text: inputValue, completed: false };
			const updatedTodos = [...todos, newTodo];
			setTodos(updatedTodos);
			setInputValue('');
			setNextId(nextId + 1);
			localStorage.setItem('todoItems', JSON.stringify(updatedTodos));
		}
	};
	
	const removeTodo = (id: Todo['id']) => {
		const updatedTodos = todos.filter(todo => todo.id !== id);
		setTodos(updatedTodos);
		localStorage.setItem('todoItems', JSON.stringify(updatedTodos));
	};
	
	const toggleTodo = (id: Todo['id']) => {
		const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
		setTodos(updatedTodos);
		localStorage.setItem('todoItems', JSON.stringify(updatedTodos));
	};
	
	const renderTodoList = (filterCondition: (todo: Todo) => boolean) => (
		<List
			style={{ textAlign: 'left', maxHeight: '350px', overflowY: 'auto' }}
			bordered
			dataSource={todos.filter(filterCondition)}
			renderItem={(item: Todo) => (
				<List.Item actions={[
					<Button type="link" onClick={() => toggleTodo(item.id)}>{item.completed ? 'Восстановить' : 'Выполнить'}</Button>,
					<Button type="link" danger onClick={() => removeTodo(item.id)}>Удалить</Button>
				]}>
					<Checkbox checked={item.completed} onChange={() => toggleTodo(item.id)} style={{ marginRight: '10px' }} />
					<span style={{ textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? '#d9d9d9' : 'inherit' }}>{item.text}</span>
				</List.Item>
			)}
		/>
	);
	
	return (
		<>
			<Space>
				<Input
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && addTodo()}
					placeholder="Введите задачу"
					size="large"
					style={{ width: '300px' }}
				/>
				<Button onClick={addTodo} size="large">Добавить</Button>
			</Space>
			
			<Tabs
				defaultActiveKey="1"
				centered
				style={{ marginTop: '10px' }}
				size="large"
				items={[
				{
					key: '1',
					label: 'Все',
					children: renderTodoList(() => true)
				},
				{
					key: '2',
					label: 'В работе',
					children: renderTodoList(todo => !todo.completed)
				},
				{
					key: '3',
					label: 'Выполненные',
					children: renderTodoList(todo => todo.completed)
				},
			]} />
			
			<Space style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
				<Space>
					<Typography.Text>Всего задач: {todos.length}</Typography.Text>
					<Typography.Text>Выполнено: {todos.filter(todo => todo.completed).length}</Typography.Text>
					<Typography.Text>Не выполнено: {todos.filter(todo => !todo.completed).length}</Typography.Text>
				</Space>
				
				<Button onClick={() => {
					const updatedTodos = todos.filter(todo => !todo.completed);
					setTodos(updatedTodos);
					localStorage.setItem('todoItems', JSON.stringify(updatedTodos));
				}}>Удалить выполненные</Button>
			</Space>
		</>
	);
};

export default TodoList;