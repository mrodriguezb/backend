'use strict'

var ObjectID = require('mongodb').ObjectID;

var MongoClient = require('mongodb').MongoClient;

// we create 'users' collection in newdb database

var uri = "mongodb://localhost:27017";

// create a client to mongodb


function getAllExcursions() {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        client.connect().then((client) => {
            var db = client.db('mountaineering_club')

            db.collection('excursions').aggregate(
                [
                  {
                    $lookup:{
                      from: "members",
                      localField: "users_id",
                      foreignField: "_id",
                      as: "members_info"
                    }
                  }
                ]
              ).toArray(function (err, result) {
                if (err) throw err
                resolve(result)
            })
        })
    })
}



function getExcursionById(id) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        client.connect().then((client) => {
            var db = client.db('mountaineering_club')
            /*
            db.collection('excursions').findOne({_id: ObjectID(id)},function (err, result) {
                if (err) throw err
                resolve(result)
            }) */

            db.collection('excursions').aggregate(
                [ { $match : { _id : ObjectID(id) } },
                  {
                    $lookup:{
                      from: "members",
                      localField: "users_id",
                      foreignField: "_id",
                      as: "members_info"
                    }
                  }
                ]
              ).toArray(function (err, result) {
                if (err) throw err
                resolve(result)
            })
        })
    })
}


function deleteExcursionById(id) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        client.connect().then((client) => {
            var db = client.db('mountaineering_club')

            db.collection('excursions').deleteOne({_id: ObjectID(id)},function (err, result) {
                if (err) throw err
                resolve(result)
            })
        })
    })
}


function addExcursion(excursion) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        client.connect().then((client) => {
            var db = client.db('mountaineering_club')
            excursion.date = new Date (excursion.date);
            db.collection('excursions').insertOne((excursion),function (err, result) {
                if (err) throw err
                resolve(result)
            })
        })
    })
}


function updateExcursion(excursion) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        client.connect().then((client) => {
            var db = client.db('mountaineering_club')
            excursion.date = new Date (excursion.date);
            excursion._id = ObjectID(excursion._id);
            db.collection('excursions').updateOne({_id: excursion._id}, {$set: convertUsersIdToObjectIds(excursion)},function (err, result) {
                if (err) throw err
                resolve(result)
            })
        })
    })
}

function convertUsersIdToObjectIds(excursion) {

    excursion.users_id.forEach((element, index, array) => {
        array[index] = ObjectID(element);
        
    });
    return excursion;
}
module.exports = {getAllExcursions, getExcursionById, deleteExcursionById, addExcursion, updateExcursion}