export default class StatsWidget {
	static get markup() {
		return `
			<table class="table">
				<thead>
				<tr>
					<td>Project</td>
					<td>Open</td>
				</tr>
				</thead>
				<tbody></tbody>
			</table>
		`;
	}

	static markupRow(name, countTasks) {
		return `
			<td>${name}</td>
			<td><h6><span class="badge rounded-pill bg-dark">${countTasks}</span></h6></td>
		`;
	}

	static get selectorTBody() {
		return 'tbody'
	}

	constructor(element, projects) {
		this.element = element;
		this.projects = projects;
	}

	bindToDOM() {
		this.element.innerHTML = StatsWidget.markup;
		this.tbody = this.element.querySelector(
			StatsWidget.selectorTBody
		)
		this.projects.forEach((project) => {
			const rowProject = document.createElement('tr')
			rowProject.innerHTML = StatsWidget.markupRow(project.name, project.tasks.length)
			this.tbody.append(rowProject)
		})
	}
}
