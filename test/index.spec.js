const postcss = require('postcss');
const fs = require('fs');
const path = require('path');

const plugin = require('../lib');


const readFile = (filePath, ...args) => new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, filePath), ...args, (err, data) => {
        if (err) {
            reject();
        } else {
            resolve(data);
        }
    });
});

async function run(input, opts) {
    return postcss([plugin(opts)]).process(input)
        .then((result) => {
            expect(result.css).toMatchSnapshot();
            expect(result.warnings().length).toBe(0);
        });
}

it('no border decl or border-width unit is not "px" ', async () => {
    const input = await readFile('./case/no-border.css');
    run(input);
});

it('transform border normally', async () => {
    const input = await readFile('./case/1px-border.css');
    run(input);
});

it('transform border normally width opt 3', async () => {
    const input = await readFile('./case/1px-border.css');
    run(input);
});

it('transform border with border-radius', async () => {
    const input = await readFile('./case/border-radius.css');
    run(input);
});

it('do not transform border with pseudo', async () => {
    const input = await readFile('./case/pseudo.css');
    run(input);
});

it('transform border with repeat class', async () => {
    const input = await readFile('./case/repeat-class.css');
    run(input);
});

it('declare it is not require to transform', async () => {
    const input = await readFile('./case/no-need.css');
    run(input);
});

it('keep position whose value is not static', async () => {
    const input = await readFile('./case/position.css');
    run(input);
});
