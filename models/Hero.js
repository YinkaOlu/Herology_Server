/**
 * Created by Yinka on 2016-08-21.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HeroSchema = new Schema({
    universe: String,
    // Check if this how its done
    heroName: String,
    realName: String,
    summary: String,
    abilityList: String,
    affiliations: String,
    firstAppearance: String,
    aliases: String,
    partnerships: String,
    heroStatus: String,
    creator: String,
    gender: String,
    publisher: String

});

var Hero = mongoose.model('Hero', HeroSchema);

module.exports = Hero;