const task = require("../models/task");
const Task = require("../models/task");

exports.createTask = async(req, res) => {
    const {title, description} = req.body;

    const task = new Task({title, description, userId:req.user.id});
    await task.save();

    res.send({
        isSuccess: true,
        message:"Task added"
    })
}

exports.getTask = async(req, res) => {
    const tasks = await Task.find({userId:req.user.id});

    res.send({
        isSuccess: true,
        data: tasks,
    })
}

exports.deleteTask = async(req, res) => {
    await Task.findByIdAndDelete(req.params.id);

    res.send({
        isSuccess:true,
        message: "task deleted",
    })
}

exports.completeTask = async(req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, {completed:true}, {new:true});

    res.send({
        isSuccess: true,
        data: task,
    })
}