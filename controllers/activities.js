const Activity = require('../models/Activity');
const { StatusCodes } = require('http-status-codes');

const getAllActivities = async (req, res) => {
    res.send('get all activities');
};

const getActivity = async (req, res) => {
    res.send('get activity');
};

const createActivity = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const activity = await Activity.create(req.body);
    res.status(StatusCodes.CREATED).json({ activity });
};

const updateActivity = async (req, res) => {
    res.send('update activity');
};

const deleteActivity = async (req, res) => {
    res.send('delete activity');
};

module.exports = {
    getAllActivities,
    getActivity,
    createActivity,
    updateActivity,
    deleteActivity,
};