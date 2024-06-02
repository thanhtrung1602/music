const connect = require('../config/connect');
const db = require('../models/index');



async function upload({track_name, description, user_id, category_id, genre_id }, fileSound, fileImage) {
    try {
        const track = await db.Track.create({
            track_name,
            sound: fileSound,
            image: fileImage,
            description,
            user_id,
            category_id,
            genre_id
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