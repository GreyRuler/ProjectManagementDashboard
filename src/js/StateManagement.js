import StatsWidget from './StatsWidget';
import TasksWidget from './TasksWidget';
import { BehaviorSubject } from 'rxjs';

export default class StateManagement {
	static get keyProjects() {
		return 'projects'
	}

	static get selectorStatsContainer() {
		return '.stats-container'
	}

	static get selectorTasksContainer() {
		return '.tasks-container'
	}

	static init(element) {
		const projects = JSON.parse(localStorage.getItem(StateManagement.keyProjects)).projects

		const objectSubject = new BehaviorSubject(projects);

		const objectObserver = {
			next: (updatedObject) => {
				this.statsWidget = new StatsWidget(
					element.querySelector(StateManagement.selectorStatsContainer),
					updatedObject
				);
				this.tasksWidget = new TasksWidget(
					element.querySelector(StateManagement.selectorTasksContainer),
					updatedObject
				);
				this.tasksWidget.bindToDOM()
				this.statsWidget.bindToDOM()
			},
			error: (err) => console.error('Произошла ошибка:', err),
			complete: () => console.log('Завершено'),
		};

		objectSubject.subscribe(objectObserver);

		// Функция для рекурсивного создания Proxy
		function createDeepProxy(target, handler) {
			for (const key in target) {
				if (typeof target[key] === 'object' || Array.isArray(target[key])) {
					target[key] = createDeepProxy(target[key], handler);
				}
			}
			return new Proxy(target, handler);
		}

		const deepProxyHandler = {
			set(target, property, value) {
				target[property] = value;
				console.log(this)
				objectSubject.next(projects);
				return true;
			},
		};

		const objectProxy = createDeepProxy(projects, deepProxyHandler);
		this.statsWidget = new StatsWidget(
			element.querySelector(StateManagement.selectorStatsContainer),
			objectProxy
		);
		this.tasksWidget = new TasksWidget(
			element.querySelector(StateManagement.selectorTasksContainer),
			objectProxy
		);
		this.tasksWidget.bindToDOM()
		this.statsWidget.bindToDOM()
	}
}
