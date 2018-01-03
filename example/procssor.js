const postcss = require('postcss');
const retina = require('../lib');
const fs = require('fs');
const path = require('path');


const processor = postcss([retina]);

fs.readFile(path.resolve(__dirname, './border.css'), 'utf8', (err, input) => {
    if (err) return;

    processor.process(input, {
        from: './border.css',
        to: './border.retina.css'
    }).then((result) => {
        fs.writeFile(path.resolve(__dirname, './border.retina.css'), result.css);
    });
});
