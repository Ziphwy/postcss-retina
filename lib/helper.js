function getPseudoSelector(classList) {
    return classList.map(slt => `${slt}::before`).join(', ');
}


function createPseudoElement(classList) {
    if (classList.length < 1) return '';

    return `
${classList.join(', ')} {
  position: relative;
}
 
${getPseudoSelector(classList)} {
  content: ' ';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  box-sizing: border-box;
  font-size: 100px;
}`;
}

function createMediaQuery(classList, dpr) {
    if (classList.length < 1) return '';
    return `
/* dpr is ${dpr} */
@media only screen and (-webkit-min-device-pixel-ratio: ${dpr}), 
only screen and (min-device-pixel-ratio: ${dpr}) {
  ${getPseudoSelector(classList)} {
    transform: scale(${parseFloat((1 / dpr).toFixed(6))});
    transform-origin: 0 0;
    width: ${dpr * 100}%;
    height: ${dpr * 100}%;
    font-size: ${dpr * 100}px;
  }
}`;
}

function radiusUnitTransform(value) {
    return value.replace(/(\d+)px/g, ($0, $1) => `${parseFloat($1) / 100}em`);
}

function unique(list) {
    const table = {};
    return list.reduce((c, item) => {
        if (!table[item]) {
            table[item] = true;
            c.push(item);
        }
        return c;
    }, []);
}

module.exports = {
    getPseudoSelector,
    createPseudoElement,
    createMediaQuery,
    radiusUnitTransform,
    unique
};

