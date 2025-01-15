const express = require('express');
const router = express.Router();

const {
    getAllActivities,
    getActivity,
    createActivity,
    updateActivity,
    deleteActivity
} = require('../controllers/activities');

router.route('/').post(createActivity).get(getAllActivities);
router.route('/:id').get(getActivity).delete(deleteActivity).patch(updateActivity);

module.exports = router;