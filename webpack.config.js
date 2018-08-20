'use strict';

const JS_INDEX = './index.js';
const JS_OUT_FILE = './script.js';

module.exports = {
    mode: 'development',
    entry: JS_INDEX,
    output: {
        path: '',
        filename: JS_OUT_FILE
    }
};