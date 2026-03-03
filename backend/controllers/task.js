const Task = require("../models/task");
const redisClient = require("../config/redis");

exports.createTask = async(req, res) => {
    const {title, description} = req.body;

    const task = new Task({title, description, userId:req.user.id});
    await task.save();

    // Clear Redis cache after data change
    await redisClient.del(`tasks:${req.user.id}`);

    res.send({
        isSuccess: true,
        message:"Task added"
    })
}

exports.getTask = async(req, res) => {
    const userId = req.user.id;

    // getting data from redis (cached data)
    const cacheKey = `tasks:${userId}`;
    const cachedTasks = await redisClient.get(cacheKey);

    if(cachedTasks){
        console.log("Serving from Redis");
        return res.send({
            isSuccess: true,
            message:"cached data",
            data: JSON.parse(cachedTasks)
        })
    }

    // getting data from DB
    const tasks = await Task.find({userId});

    await redisClient.setEx(cacheKey,60, JSON.stringify(tasks) )

    console.log("Serving from database");

    res.send({
        isSuccess: true,
        message: "Data from database",
        data: tasks,
    })
}

exports.deleteTask = async(req, res) => {
    await Task.findByIdAndDelete(req.params.id);

    // Clear Redis cache after data change
    await redisClient.del(`tasks:${req.user.id}`);

    res.send({
        isSuccess:true,
        message: "task deleted",
    })
}

exports.completeTask = async(req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, {completed:true}, {new:true});

    // Clear Redis cache after data change
    await redisClient.del(`tasks:${req.user.id}`);

    res.send({
        isSuccess: true,
        data: task,
    })
}