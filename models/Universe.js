/**
 * Created by Yinka on 2016-08-21.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UniverseModel = new Schema({
    universeName: String,
    createYear: Number,
    creators: String,
});