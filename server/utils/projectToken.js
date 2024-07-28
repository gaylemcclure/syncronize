const generateUniqueId = require('generate-unique-id');

module.exports = {
    generateProjectId: function () {
        const id1 = generateUniqueId();
        return id1;
    }
}