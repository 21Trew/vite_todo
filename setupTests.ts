import { vi } from "vitest";
import '@testing-library/jest-dom/vitest';

global.matchMedia = vi.fn().mockImplementation((query) => ({
	matches: false,
	media: query,
	onchange: null,
	// полифиллы
	addListener: vi.fn(),
	removeListener: vi.fn(),
	dispatchEvent: vi.fn(),
}));