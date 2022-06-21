const { Schema, model, Types } = require('mongoose');
const moment = require('moment');


const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 2,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      },
    {
      username:{
        type: String,
        required: true,
      }
      reactions: [ReactionSchema]
    },

  );
  
  const Thought = model('Thought', ThoughtSchema);
  
  module.exports = Thought;