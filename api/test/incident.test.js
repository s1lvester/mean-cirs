
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Incident = require('../models/incident.model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Incident', () => {
    const testIncident = {
        title: 'test-title',
        text: 'test-text'
    };
    const invalidIncident = {
        title: 'test-title',
        txt: 'test-text'
    };

    beforeEach((done) => { //Before each test empty the database
        Incident.remove({}, () => {
            done();
        });
    });

    describe('/GET incident', () => {
        it('it should GET all incidents', (done) => {
            chai.request(server)
                .get('/incident')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });


    describe('/POST incident', () => {
        it ('it should POST a new incident', (done) => {
            chai.request(server)
                .post('/incident')
                .send(testIncident)
                .end((err, res) => {
                    res.should.be.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    done();
                });
        });

        it ('it should fail when POST invalid incident', (done) => {
            chai.request(server)
                .post('/incident')
                .send(invalidIncident)
                .end((err, res) => {
                    res.should.be.status(400);
                    res.body.should.be.a('object');
                    res.body.should.not.have.property('id');
                    done();
                });
        });
    });

    describe('/GET incident/:id', () => {
        it('it should GET one incident', (done) => {
            let incident = new Incident(testIncident);
            incident.save((err, incident) => {
                chai.request(server)
                    .get('/incident/' + incident.id)
                    .send(incident)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('title');
                        res.body.should.have.property('text');
                        res.body.should.have.property('_id').eql(incident.id);
                        done();
                    });
            });
        });

        it('it should 404 when GET unknown incident', (done) => {
            chai.request(server)
            .get('/incident/59dbc515907a261f40c3c171')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
        });

        it('it should 400 when GET invalid id', (done) => {
            chai.request(server)
            .get('/incident/oviously')
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });
    });


    describe('/PUT incident/:id', () => {
        it('it should update one incident', (done) => {
            let incident = new Incident(testIncident);
            incident.save((err, incident) => {
                chai.request(server)
                    .put('/incident/' + incident.id)
                    .send({ title: 'new title', text: 'new text' })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eql('Incident updated.');
                        done();
                    });
            });
        });

        it('it should 400 when PUT is malformed object', (done) => {
            let incident = new Incident(testIncident);
            incident.save((err, incident) => {
                chai.request(server)
                    .put('/incident/' + incident.id)
                    .send({ title: 'new title', text: '' })
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
        });
    });


    describe('/DELETE incident/:id', () => {
        it('it should delete one incident', (done) => {
            let incident = new Incident(testIncident);
            incident.save((err, incident) => {
                chai.request(server)
                    .delete('/incident/' + incident.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eql('Successfully deleted.');
                        done();
                    });
            });
        });

        it('it should 404 when DELETE unknown incident', (done) => {
            chai.request(server)
            .delete('/incident/59dbc515907a261f40c3c171')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
        });

        it('it should 400 when DELETE invalid id', (done) => {
            chai.request(server)
            .delete('/incident/oviously')
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });
    });

});
