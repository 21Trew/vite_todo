import React from 'react';

import TodoListTab from './ListItem.tsx';
import { TabProps, Todo } from './interfaces.ts';

const toggleText = (item: Todo) => item.completed ? 'Восстановить' : 'Выполнить';

export const AllTodosTab: React.FC<TabProps> = ({ todos, toggleTodo, removeTodo }) => (
	<TodoListTab
		todos={todos}
		filterCondition={() => true}
		toggleTodo={toggleTodo}
		removeTodo={removeTodo}
		toggleText={toggleText}
	/>
);

export const ActiveTodosTab: React.FC<TabProps> = ({ todos, toggleTodo, removeTodo }) => (
	<TodoListTab
		todos={todos}
		filterCondition={todo => !todo.completed}
		toggleTodo={toggleTodo}
		removeTodo={removeTodo}
		toggleText={toggleText}
	/>
);

export const CompletedTodosTab: React.FC<TabProps> = ({ todos, toggleTodo, removeTodo }) => (
	<TodoListTab
		todos={todos}
		filterCondition={todo => todo.completed}
		toggleTodo={toggleTodo}
		removeTodo={removeTodo}
		toggleText={toggleText}
	/>
);