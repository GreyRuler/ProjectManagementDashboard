import { BehaviorSubject } from 'rxjs';
import StatsWidget from './StatsWidget';
import TasksWidget from './TasksWidget';

export default class StateManagement {
	static get keyProjects() {
		return 'projects';
	}

	static get selectorStatsContainer() {
		return '.stats-container';
	}

	static get selectorTasksContainer() {
		return '.tasks-container';
	}

	static init(element) {
		const storage = JSON.parse(localStorage.getItem(StateManagement.keyProjects));

		const objectSubject = new BehaviorSubject(storage);

		const objectObserver = {
			next: (updatedObject) => {
				this.statsWidget = new StatsWidget(
					element.querySelector(StateManagement.selectorStatsContainer),
					updatedObject,
				);
				this.statsWidget.bindToDOM();
			},
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
				objectSubject.next(storage);
				return true;
			},
		};

		const objectProxy = createDeepProxy(storage, deepProxyHandler);
		this.statsWidget = new StatsWidget(
			element.querySelector(StateManagement.selectorStatsContainer),
			objectProxy,
		);
		this.tasksWidget = new TasksWidget(
			element.querySelector(StateManagement.selectorTasksContainer),
			objectProxy,
		);
		this.tasksWidget.bindToDOM();
		this.statsWidget.bindToDOM();
	}
}
