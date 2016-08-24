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
router.route('/getMarvel').get(
    function (req, res) {
        console.log("Getting Marvel Characters");
        HeroModel.find({universe: "Marvel"},
            function (err, marvelCharacters) {
                if(err){res.send(err)}

                res.send(marvelCharacters);
            })
    }
);
/* Get DC Hero */
router.route('/getDC').get(
    function (req, res) {
        console.log("Getting DC Characters");
        HeroModel.find({universe: "DC"},
            function (err, DC_Characters) {
                if(err){res.send(err)}

                res.send(DC_Characters);
            })
    }
);
/* Get Hero*/
router.route('/findCharacter/:heroName').get(function (req, res) {
    var foundCharacters = [];
    var heroName = req.params.heroName;
    console.log('Finding: '+req.params.heroName);
    heroName = heroName.toLowerCase();
    HeroModel.find(
        function(err, foundChar) {
            if (err){
                res.send(err);
            }
            var characterHeroName = "";
            var characterRealName = "";
            var characterAliaseName = "";
            foundChar.forEach(function (character) {
                characterHeroName = character.heroName.toLowerCase();

                if(characterHeroName.indexOf(heroName) > -1){
                    console.log("Found Match: "+ characterHeroName);
                    foundCharacters.push(character);
                }
            });

            foundChar.forEach(function (character) {
                if(typeof character.realName != 'undefined') {
                    characterRealName = character.realName.toLowerCase();
                }
                if(typeof character.aliases != 'undefined') {
                    characterAliaseName = character.aliases.toLowerCase();
                }

                if(characterRealName.indexOf(heroName) > -1){
                    console.log("Found Match: "+ characterHeroName);
                    foundCharacters.push(character);
                }else if(characterAliaseName.indexOf(heroName) > -1){
                    console.log("Found Match: "+ characterHeroName);
                    foundCharacters.push(character);
                }
            });
            res.send(foundCharacters);
        });
});

module.exports = router;