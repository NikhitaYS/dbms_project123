const path = require('path');

module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/hungerhub',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    jwtExpire: process.env.JWT_EXPIRE || '30d',
    uploadPath: path.join(__dirname, '../uploads'),
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif']
}; 