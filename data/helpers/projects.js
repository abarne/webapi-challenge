const router = require('express').Router();
const projectsDb = require('./projectModel.js');

// get,
// insert,
// update,
// remove,
// getProjectActions,

router.get('/', (req, res) => {
	projectsDb
		.get()
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: 'Error retrieving the projects.' });
		});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	projectsDb
		.get(id)
		.then((project) => {
			if (!project) {
				res.status(404).json({ message: 'No project found with specified ID' });
			} else {
				res.status(200).json(project);
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error retrieving the project' });
		});
});

router.post('/', (req, res) => {
	if (!req.body.name || !req.body.description) {
		res.status(400).json({ message: 'Please include a name and description for the project' });
	}

	projectsDb
		.insert(req.body)
		.then((project) => {
			res.status(201).json({ message: 'Project added', project: req.body });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: 'Error adding the project' });
		});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	projectsDb
		.remove(id)
		.then((project) => {
			if (!project) {
				res.status(404).json({ message: 'No project found with that ID' });
			} else {
				res.status(202).json({ message: 'Project deleted' });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error deleting the project' });
		});
});

router.put('/:id', (req, res) => {
	const id = req.params.id;
	const projectInfo = req.body;

	projectsDb
		.update(id, projectInfo)
		.then((project) => {
			if (!project) {
				res.status(404).json({ message: 'No project found with that ID' });
			} else {
				res.status(200).json({
					message: 'Project was updated',
					project: projectInfo
				});
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error updating the project' });
		});
});

router.get('/:id/actions', (req, res) => {
	const id = req.params.id;

	projectsDb
		.getProjectActions(id)
		.then((projectActions) => {
			if (!projectActions) {
				res.status(404).json({ message: 'No project found with that ID' });
			} else {
				res.status(202).json(projectActions);
			}
		})
		.catch((error) => {
			res.status(500).json({ message: `Error getting the project's actions` });
		});
});

module.exports = router;
