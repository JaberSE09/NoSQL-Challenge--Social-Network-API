const { User, Thought } = require("../models");

const usdrController = {
    // get all pizzas
    getAllUser(req, res) {
      User.find({})
        .populate({
          path: 'friends',
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
    getUserById({ params }, res) {
      User.findOne({ _id: params.id })
        .populate({
          path: 'friends',
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
    createUser({ body }, res) {
      User.create(body)
        .then(response => res.json(response))
        .catch(err => res.json(err));
    },
  
    // update pizza by id
    updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(response => {
          if (!response) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(response);
        })
        .catch(err => res.json(err));
    },
  
    // delete pizza
    deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
        .then(response => res.json(response))
        .catch(err => res.json(err));
    }

     // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((response) => {
        if (!response) {
          res.status(404).json({ message: "No user with this id" });
          return;
        }
        res.json(response);
      })
      .catch((err) => res.json(err));
  },

  // delete friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((response) => {
        if (!responsee) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(response);
      })
      .catch((err) => res.json(err));
  },





  };
  
  module.exports = pizzaController;
  