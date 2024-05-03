const connect = require('../config/connect');
const db = require('../models/index');



async function upload({track_name, user_id }, fileSound) {
    try {
        const track = await db.Track.create({
            sound: fileSound,
            track_name,
            user_id
        });
        return { track };
    } catch (error) {
        console.error('Error creating new track:', error);
        throw error;
    }
}


module.exports = {
    upload
}