const Activity = require('../models/Activity');
const { StatusCodes } = require('http-status-codes');

const getAllActivities = async (req, res) => {
    const activities = await Activity.find({createdBy: req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({activities, count: activities.length});
};

const getActivity = async (req, res) => {
    const {user:{userId}, params:{id: activityId}} = req;
    const activity = await Activity.findById({
        _id: activityId, createdBy: userId,
    });
    if (!activity) {
        throw new NotFoundError(`Activity with id ${userId} not found`);
    }
    res.status(StatusCodes.OK).json({activity});
};

const createActivity = async (req, res) => {
    if (!req.user || !req.user.userId) {
        throw new BadRequestError('User authentication failed');
    }
    req.body.createdBy = req.user.userId;
    const activity = await Activity.create(req.body);
    res.status(StatusCodes.CREATED).json({ activity });
};

const updateActivity = async (req, res) => {
    const {user:{userId}, params:{id: activityId}, body:{price}} = req;
    if(price === ''){
        throw new BadRequestError('Price cannot be empty');
    }
    const activity = await Activity.findByIdAndUpdate(
        {_id: activityId, createdBy: userId},
        req.body,
        {new: true, runValidators: true});
    if (!activity) {
        throw new NotFoundError(`Activity with id ${activityId} not found`);
    }
    res.status(StatusCodes.OK).json({activity});
};

const deleteActivity = async (req, res) => {
    const {user:{userId}, params:{id: activityId}} = req;
    const activity = await Activity.findByIdAndRemove({
        _id: activityId,
        createdBy: userId,
    })
    if (!activity) {
        throw new NotFoundError(`Activity with id ${userId} not found`);
    }
    res.status(StatusCodes.OK).send('Activity has been deleted');
};

module.exports = {
    getAllActivities,
    getActivity,
    createActivity,
    updateActivity,
    deleteActivity,
};