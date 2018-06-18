const path = require('path');

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        filename: 'index_bundle.js',
        path: path.resolve(__dirname, 'app', 'scripts')
    },
};