'use strict'

var ObjectID = require('mongodb').ObjectID;

var MongoClient = require('mongodb').MongoClient;

// we create 'users' collection in newdb database

var uri = "mongodb://localhost:27017";

// create a client to mongodb

function getAllMembers() {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        client.connect().then((client) => {
            var db = client.db('mountaineering_club')

            db.collection('members').find().toArray(function (err, result) {
                if (err) throw err
                resolve(result)
            })
        })
    })
}


function getMemberById(id) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        client.connect().then((client) => {
            var db = client.db('mountaineering_club')

            db.collection('members').findOne({_id: ObjectID(id)},function (err, result) {
                if (err) throw err
                resolve(result)
            })
        })
    })
}


function deleteMemberById(id) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        client.connect().then((client) => {
            var db = client.db('mountaineering_club')

            db.collection('members').deleteOne({_id: ObjectID(id)},function (err, result) {
                if (err) throw err
                resolve(result)
            })
        })
    })
}


function addMember(user) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        client.connect().then((client) => {
            var db = client.db('mountaineering_club')
            user.birthDate = new Date (user.birthDate);
            db.collection('members').insertOne((user),function (err, result) {
                if (err) throw err
                resolve(result)
            })
        })
    })
}


function updateMember(user) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        client.connect().then((client) => {
            var db = client.db('mountaineering_club')
            user.birthDate = new Date (user.birthDate);
            console.log(user);
            let set = {
                $set: {
                    name: user.name,
                    surname: user.surname,
                    birthDate: user.birthDate,
                    clubId: user.clubId,
                    licenseNumber: user.licenseNumber,
                    type: user.type,
                    responsibilityAgreementSigned: user.responsibilityAgreementSigned
                }
            }
            console.log(set);
            db.collection('members').updateOne({_id: ObjectID(user._id)}, set,function (err, result) {
                if (err) throw err
                resolve(result)
            })
        })
    })
}


module.exports = {getAllMembers, getMemberById, deleteMemberById, addMember, updateMember}