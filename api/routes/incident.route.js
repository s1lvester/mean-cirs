
const express = require('express');
const router = express.Router();
const Incident = require('../models/incident.model');

router.post('/', (req, res) => {
    let incident = new Incident();
    incident.title = req.body.title;
    incident.description = req.body.description;
    incident.measures = req.body.measures;
    incident.suggestions = req.body.suggestions;

    incident.save((err, incident) => {
        if (err) {
            res.status(400).send(err.message);
            return;
        }

        res.json({
            message: 'incident created.',
            id: incident.id
        });
    });
});


router.get('/', (req, res) => {
    Incident.find({'published': true}, (err, incidents) => {
        if (err) {
            res.status(400).send(err.message);
            return;
        }

        res.json(incidents);
    });
});

router.get('/:id', (req, res) => {
    Incident.findById(req.params.id, (err, incident) => {
        if (err) {
            res.sendStatus(400);
            return;
        }

        if (!incident) {
            res.sendStatus(404);
            return;
        }

        res.json(incident);
    });
});

module.exports = router;
