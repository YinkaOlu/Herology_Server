/**
 * Created by Yinka on 2016-08-21.
 */
var express = require('express');
var router = express.Router();

var HeroModel = require('../models/Hero');

/* GET All Heroes page. */
router.get('/allHeroes', function(req, res, next) {
    HeroModel.find(function(err, posts) {
        if (err)
            res.send(err);
        res.json(posts);
        console.log(posts);
    });
});

/* CREATE HERO */
router.post('/newCharacter', function (req, res) {
    console.log("Create a Charater Request");

//    New Character
    var character = HeroModel();
    character.gender = req.body.gender;
    character.abilityList = req.body.abilities;
    character.partnerships = req.body.partnerships;
    character.aliases = req.body.notable_aliases;
    character.summary = req.body.summary;
    character.firstAppearance = req.body.first_appearance;
    character.affiliations = req.body.team_affiliations;
    character.realName = req.body.alter_ego;
    character.creator = req.body.created_by;
    character.universe = req.body.universe;
    character.publisher = req.body.publisher;
    character.heroName = req.body.heroName;
    character.heroStatus = req.body.heroStatus;

    console.log(character);

    character.save(function(err) {
        if (err)
            res.send(err);
        console.log(character);
        res.send({message: "Character Sent"});
    });


});
/* EDIT HERO */
router.route('/editCharacter').put(function(req, res){
    console.log('Editing Character');
    console.log(req.body);
    HeroModel.find({$and: [{heroName: req.body.heroName}, {realName: req.body.realName}]},
        function(err, editCharacter) {
        if (err){
            res.send(err);
        }
            editCharacter.gender = req.body.gender;
            editCharacter.abilityList = req.body.abilities;
            editCharacter.partnerships = req.body.partnerships;
            editCharacter.aliases = req.body.notable_aliases;
            editCharacter.summary = req.body.summary;
            editCharacter.firstAppearance = req.body.first_appearance;
            editCharacter.affiliations = req.body.team_affiliations;
            editCharacter.realName = req.body.alter_ego;
            editCharacter.creator = req.body.created_by;
            editCharacter.universe = req.body.universe;
            editCharacter.publisher = req.body.publisher;
            editCharacter.heroName = req.body.heroName;
            editCharacter.heroStatus = req.body.heroStatus;

        editCharacter.save(function(err) {
            if (err)
                res.send(err);
            console.log(editCharacter);
        });
    });
});
/* Delete HERO */
router.route('/deleteCharacter').delete(function (req, res) {
    console.log('Deleting Character');
    console.log(req.body);
    HeroModel.remove({$and: [{heroName: req.body.heroName}, {realName: req.body.realName}]},
        function(err) {
            if (err){
                res.send(err);
            }
        });
});
/* Get Marvel Hero */
/* Get DC Hero */
/* Get Hero*/
router.route('/findCharacter/:heroName').get(function (req, res) {
    console.log('Finding: '+req.params.heroName+" "+req.params.realName);
    console.log(req.body);
    HeroModel.find({$or: [
            {heroName: req.params.heroName},
            {realName: req.params.heroName},
            {aliases: req.params.heroName}]},
        function(err, foundChar) {
            if (err){
                res.send(err);
            }
            res.send(foundChar);
        });
});

module.exports = router;