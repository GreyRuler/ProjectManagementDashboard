export default class TasksWidget {
	static markup(tasks) {
		return tasks.reduce((prev, curr) => {
			prev += `
				<div class="task">
					<input id="task-${curr.id}" ${curr.done ? 'checked' : ''}
						   type="checkbox">
					<label for="task-${curr.id}">${curr.name}</label>
				</div>
			`
			return prev;
		}, '')
	}

	constructor(element, projects) {
		this.element = element;
		this.projects = projects;
		this.containersTasks = [];
	}

	bindToDOM() {
		const select = document.createElement('select')
		select.classList.add('form-select')
		select.addEventListener('change', () => {
			this.containersTasks.forEach((container) => {
				container.classList.add('d-none')
				if (select.value === container.id) container.classList.remove('d-none')
			})
		})
		this.element.append(select)
		this.projects.forEach((project, index) => {
			const option = document.createElement('option')
			if (!index) option.selected = true
			option.value = project.id
			option.text = project.name
			select.append(option)
			const containerTasks = document.createElement('div')
			this.containersTasks.push(containerTasks);
			containerTasks.id = project.id
			if (index) containerTasks.classList.add('d-none')
			containerTasks.innerHTML = TasksWidget.markup(project.tasks)
			this.element.append(containerTasks)
		})
	}
}
