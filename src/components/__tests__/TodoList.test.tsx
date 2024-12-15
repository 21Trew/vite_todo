import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import TodoList from '../TodoList';

// Очистка localStorage перед каждым тестом
beforeEach(() => {
	localStorage.clear();
});

describe('TodoList', () => {
	it('отрисовка компонента', () => {
		render(<TodoList />);
		expect(screen.getByPlaceholderText('Введите задачу')).toBeInTheDocument();
		expect(screen.getByText('Добавить')).toBeInTheDocument();
	});
	
	it('добавить задачу', () => {
		render(<TodoList />);
		
		const input = screen.getByPlaceholderText('Введите задачу');
		const button = screen.getByText('Добавить');
		
		fireEvent.change(input, { target: { value: 'Test Todo' } });
		fireEvent.click(button);
		
		expect(screen.getByText('Test Todo')).toBeInTheDocument();
		expect(localStorage.getItem('todoItems')).toContain('Test Todo');
	});
	
	it('удалить задачу', () => {
		render(<TodoList />);
		
		const input = screen.getByPlaceholderText('Введите задачу');
		const button = screen.getByText('Добавить');
		
		fireEvent.change(input, { target: { value: 'Test Todo' } });
		fireEvent.click(button);
		
		const removeButton = screen.getByText('Удалить');
		fireEvent.click(removeButton);
		
		expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
	});
	
	it('сменить статус', () => {
		render(<TodoList />);
		
		const input = screen.getByPlaceholderText('Введите задачу');
		const button = screen.getByText('Добавить');
		
		fireEvent.change(input, { target: { value: 'Test Todo' } });
		fireEvent.click(button);
		
		const checkbox = screen.getByRole('checkbox');
		fireEvent.click(checkbox);
		
		expect(checkbox).toBeChecked();
		expect(screen.getByText('Восстановить')).toBeInTheDocument();
	});
	
	it('удалить выполненные', () => {
		render(<TodoList />);
		
		const input = screen.getByPlaceholderText('Введите задачу');
		const button = screen.getByText('Добавить');
		
		fireEvent.change(input, { target: { value: 'Test Todo 1' } });
		fireEvent.click(button);
		fireEvent.change(input, { target: { value: 'Test Todo 2' } });
		fireEvent.click(button);
		
		const checkboxes = screen.getAllByRole('checkbox');
		
		fireEvent.click(checkboxes[0]);
		
		const removeCompletedButton = screen.getByText('Удалить выполненные');
		fireEvent.click(removeCompletedButton);
		
		expect(screen.queryByText('Test Todo 1')).not.toBeInTheDocument();
		expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
	});
});