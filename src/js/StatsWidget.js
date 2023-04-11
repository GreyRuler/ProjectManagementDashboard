export default class StatsWidget {
	static get markup() {
		return `
			<table class="table">
				<thead>
				<tr>
					<td>Проекты</td>
					<td>Открытые</td>
				</tr>
				</thead>
				<tbody></tbody>
			</table>
		`;
	}

	static markupRow(project) {
		return `
			<tr>
				<td>${project.name}</td>
				<td><h6><span class="badge rounded-pill bg-dark">
					${project.tasks.filter((task) => !task.done).length}
				</span></h6></td>				
			</tr>
		`;
	}

	static get selectorTBody() {
		return 'tbody';
	}

	constructor(element, storage) {
		this.element = element;
		this.storage = storage;
	}

	bindToDOM() {
		this.element.innerHTML = StatsWidget.markup;
		this.tbody = this.element.querySelector(
			StatsWidget.selectorTBody,
		);
		this.tbody.innerHTML = this.markupRows;
	}

	get markupRows() {
		return this.storage.projects.reduce((prev, project) => {
			prev += StatsWidget.markupRow(project);
			return prev;
		}, '');
	}
}
