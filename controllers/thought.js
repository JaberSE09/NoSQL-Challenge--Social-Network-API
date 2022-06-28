const { Thought, User } = require('../models');

const thoughtController = {
    // get all pizzas
    getAllThought(req, res) {
      Thought.find({})
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(response => res.json(response))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one pizza by id
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
        .then(response => res.json(response))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // createPizza
    createThought({ body }, res) {
      Thought.create(body)
        .then(response => res.json(response))
        .catch(err => res.json(err));
    },
  
    // update pizza by id
    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(response => {
          if (!response) {
            res.status(404).json({ message: 'No Thoughts found with this id!' });
            return;
          }
          res.json(response);
        })
        .catch(err => res.json(err));
    },
  
    // delete pizza
    deleteThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
        .then(response => res.json(response))
        .catch(err => res.json(err));
    },
   // add reaction
   addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true },
    )
      .then((response) => {
        if (!response) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(response);
      })
      .catch((err) => res.json(err));
    },

  // delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  }
}

  module.exports = thoughtController;