export default class TasksWidget {
	static get markup() {
		return `
			<table class="table">
				<thead></thead>
				<tbody></tbody>
			</table>
		`;
	}

	static get selectorTableHead() {
		return 'thead';
	}

	static get selectorTableBody() {
		return 'tbody';
	}

	constructor(element, storage) {
		this.element = element;
		this.storage = storage;
		this.rows = [];
	}

	bindToDOM() {
		this.element.innerHTML = TasksWidget.markup;
		this.thead = this.element.querySelector(TasksWidget.selectorTableHead);
		this.tbody = this.element.querySelector(TasksWidget.selectorTableBody);
		const select = this.createSelect();
		this.thead.append(select);

		this.storage.projects.forEach((project, index) => {
			const isSelect = !index;
			select.append(this.createOption(project, isSelect));
			project.tasks.forEach((task) => {
				const row = this.createRow(project.id, task, isSelect);
				this.rows.push(row);
				this.tbody.append(row);
			});
		});
	}

	createSelect() {
		const select = document.createElement('select');
		select.classList.add('form-select');
		select.addEventListener('change', () => {
			this.rows.forEach((row) => {
				row.classList.add('d-none');
				if (select.value === row.id) row.classList.remove('d-none');
			});
		});
		return select;
	}

	createOption(project, isSelect) {
		const option = document.createElement('option');
		option.value = project.id;
		option.text = project.name;
		option.selected = isSelect;
		return option;
	}

	createCheckbox(id, task) {
		const checkbox = document.createElement('input');
		checkbox.id = id;
		checkbox.type = 'checkbox';
		checkbox.checked = task.done;
		checkbox.addEventListener('change', () => {
			task.done = checkbox.checked;
		});
		return checkbox;
	}

	createLabel(id, task) {
		const label = document.createElement('label');
		label.textContent = task.name;
		label.htmlFor = id;
		return label;
	}

	createRow(projectId, task, isActive) {
		const row = document.createElement('tr');
		const columnCheckbox = document.createElement('td');
		const columnLabel = document.createElement('td');
		const id = `task-${task.id}`;
		if (!isActive) row.classList.add('d-none');
		row.id = projectId;
		columnCheckbox.append(this.createCheckbox(id, task));
		columnLabel.append(this.createLabel(id, task));
		row.append(columnCheckbox);
		row.append(columnLabel);
		return row;
	}
}
