const router = require('express').Router();
const actionsDb = require('./actionModel.js');

router.get('/', (req, res) => {
	actionsDb
		.get()
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: 'Error retrieving the actions.' });
		});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	actionsDb
		.get(id)
		.then((actions) => {
			if (!actions) {
				res.status(404).json({ message: 'No actions found with specified ID' });
			} else {
				res.status(200).json(actions);
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error retrieving the actions' });
		});
});

router.post('/', (req, res) => {
	if (!req.body.notes || !req.body.description) {
		res.status(400).json({ message: 'Please include notes and description for the project' });
	}

	actionsDb
		.insert(req.body)
		.then((actions) => {
			res.status(201).json({ message: 'Action added', action: req.body });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: 'Error adding the action' });
		});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	actionsDb
		.remove(id)
		.then((action) => {
			if (!action) {
				res.status(404).json({ message: 'No action found with that ID' });
			} else {
				res.status(202).json({ message: 'action deleted' });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error deleting the action' });
		});
});

router.put('/:id', (req, res) => {
	const id = req.params.id;
	const actionInfo = req.body;

	actionsDb
		.update(id, actionInfo)
		.then((action) => {
			if (!action) {
				res.status(404).json({ message: 'No action found with that ID' });
			} else {
				res.status(200).json({
					message: 'action was updated',
					project: actionInfo
				});
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error updating the action' });
		});
});

module.exports = router;
