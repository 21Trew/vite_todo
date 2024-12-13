import React from "react";
import { Button, Checkbox, List } from "antd";

import { Todo, TodoListTabProps } from './interfaces.ts'

const TodoListTab: React.FC<TodoListTabProps> = ({ todos, filterCondition, toggleTodo, removeTodo, toggleText }) => {

	return (
		<List
			style={{
				maxHeight: '350px',
				overflowY: 'auto'
			}}
			bordered
			dataSource={todos.filter(filterCondition)}
			renderItem={(item: Todo) => (
				<List.Item
					style={{
						textDecoration: item.completed ? 'line-through' : 'none',
						color: item.completed ? '#d9d9d9' : 'inherit',
						display: 'flex'
					}}
					actions={[
						<Button type="link" onClick={() => toggleTodo(item.id)}>{toggleText(item)}</Button>,
						<Button type="link" onClick={() => removeTodo(item.id)}>Удалить</Button>
					]}
				>
					<Checkbox
						checked={item.completed}
						onChange={() => toggleTodo(item.id)}
					/>
					{item.text}
				</List.Item>
			)}
		/>
	);
};

export default TodoListTab;