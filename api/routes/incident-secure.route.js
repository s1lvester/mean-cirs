
const express = require('express');
const router = express.Router();
const Incident = require('../models/incident.model');
const jwt = require('jsonwebtoken');
const config = require('config');


router.use((req, res, next) => {
    const token = req.headers.authorization;

    if (!token || token.split(' ')[0] !== 'Bearer') {
        res.status(403).send('no auth-token provided');
    } else {
        jwt.verify(token.split(' ')[1], config.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(403).send(err.message);
            }
            else {
                next();
            }
        });
    }
});

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
    Incident.find((err, incidents) => {
        if (err) {
            res.sendStatus(400);
            return;
        }

        res.json(incidents);
    });
});

router.get('/unpublished', (req, res) => {
    Incident.find({'published': false}, (err, incidents) => {
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


router.put('/:id', (req, res) => {
    Incident.findById(req.params.id, (err, incident) => {
        if (err) {
            res.sendStatus(400);
            return;
        }

        if (!incident) {
            res.sendStatus(404);
            return;
        }

        incident.title = req.body.title;
        incident.description = req.body.description;
        incident.measures = req.body.measures;
        incident.suggestions = req.body.suggestions;
        incident.published = req.body.published;
        incident.answer = req.body.answer;
        incident.done = req.body.done;
        incident.dateUpdated = Date.now();
        incident.save((err) => {
            if (err) {
                res.sendStatus(400);
                return;
            }

            res.json({ message: 'Incident updated.' });
        });
    });
});


router.delete('/:id', (req, res) => {
    Incident.remove({
        _id: req.params.id
    }, (err, reply) => {
        if (err || reply.result.ok !== 1) {
            res.sendStatus(400);
            return;
        }
        if (reply.result.n < 1) {
            res.sendStatus(404);
            return;
        }
        res.json({ message: 'Successfully deleted.' });
    })
});


module.exports = router;
