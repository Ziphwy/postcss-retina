const {
    getPseudoSelector,
    createMediaQuery,
    createPseudoElement,
    unique
} = require('../lib/helper');

it('getPseudoSelector()', () => {
    expect(getPseudoSelector(['class1', 'class2', 'class3'])).toEqual([1, 2, 3]);// .toMatchSnapshot();
});

it('createMediaQuery()', () => {
    expect(createMediaQuery(['class1', 'class2', 'class3'], 3))
        .toMatchSnapshot();
});

it('createMediaQuery(empty)', () => {
    expect(createMediaQuery([], 3))
        .toMatchSnapshot();
});

it('createPseudoElement()', () => {
    expect(createPseudoElement(['class1', 'class2', 'class3']))
        .toMatchSnapshot();
});

it('createPseudoElement(empty)', () => {
    expect(createPseudoElement([]))
        .toMatchSnapshot();
});

it('unique()', () => {
    expect(unique(['class1', 'class2', 'class1', 'class3']))
        .toMatchSnapshot();
});
