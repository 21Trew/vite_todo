export interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

export interface TodoListTabProps {
	todos: Todo[];
	filterCondition: (todo: Todo) => boolean;
	toggleTodo: (id: number) => void;
	removeTodo: (id: number) => void;
	toggleText: (item: Todo) => string;
}

export interface TabProps {
	todos: Todo[];
	toggleTodo: (id: number) => void;
	removeTodo: (id: number) => void;
}