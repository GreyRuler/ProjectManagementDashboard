import StateManagement from './StateManagement';

const projects = {
	projects: [
		{
			id: 1,
			name: 'Website',
			tasks: [
				{
					id: 1,
					name: 'Responsive Design',
					done: true,
				},
				{
					id: 2,
					name: 'SEO Optimization',
					done: false,
				},
				{
					id: 3,
					name: 'Content Management',
					done: false,
				},
				{
					id: 4,
					name: 'Performance Optimization',
					done: true,
				},
			],
		},
		{
			id: 2,
			name: 'Android App',
			tasks: [
				{
					id: 5,
					name: 'User Authentication',
					done: true,
				},
				{
					id: 6,
					name: 'In-app Purchases',
					done: false,
				},
				{
					id: 7,
					name: 'Location Services',
					done: false,
				},
				{
					id: 8,
					name: 'Offline Capability',
					done: true,
				},
			],
		},
		{
			id: 3,
			name: 'API',
			tasks: [
				{
					id: 9,
					name: 'RESTful API',
					done: true,
				},
				{
					id: 10,
					name: 'API Documentation',
					done: false,
				},
				{
					id: 11,
					name: 'API Security',
					done: false,
				},
				{
					id: 12,
					name: 'Rate Limiting',
					done: true,
				},
			],
		},
		{
			id: 4,
			name: 'iOS App',
			tasks: [
				{
					id: 13,
					name: 'Push Notifications',
					done: true,
				},
				{
					id: 14,
					name: 'Apple Pay Support',
					done: false,
				},
				{
					id: 15,
					name: '3D Touch Support',
					done: false,
				},
				{
					id: 16,
					name: 'Dark Mode',
					done: true,
				},
			],
		},
	],
};

localStorage.setItem(StateManagement.keyProjects, JSON.stringify(projects));

const app = document.querySelector('#app');
StateManagement.init(app);
