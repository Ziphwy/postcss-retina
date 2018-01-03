const postcss = require('postcss');
const {
    createPseudoElement,
    createMediaQuery,
    radiusUnitTransform,
    getPseudoSelector,
    unique
} = require('./helper');

const borderReg = /border(?:-top|-bottom|-left|-right|-image)?(?:-width)?$/;
const borderRadiusReg = /border-radius/;
const unitPxReg = /px/;
const pseudoReg = /:(?:before|after)$/;

const retina = postcss.plugin('postcss-retina', (options = {}) => (root) => {
    const {
        dpi = 4
    } = options;
    const retinaRuleList = [];
    const selectors = [];
    root.walkRules((rule) => {
        const borderDecls = [];
        let isExistBorderWidth = false;

        rule.walkDecls((decl) => {
            if (borderReg.test(decl.prop) && unitPxReg.test(decl.value)) {
                const next = decl.next();
                if (!next || next.type !== 'comment' || !/^no$/.test(next.text.trim())) {
                    isExistBorderWidth = true;
                    decl.remove();
                    borderDecls.push(decl);
                }
            }
            if (borderRadiusReg.test(decl)) {
                borderDecls.push(decl.clone({
                    value: radiusUnitTransform(decl.value)
                }));
            }
        });

        const slts = rule.selectors.filter(slt => !pseudoReg.test(slt));
        if (!isExistBorderWidth || slts.length <= 0) return;

        const newRule = postcss.rule({
            selector: getPseudoSelector(slts)
        });
        borderDecls.forEach((decl) => {
            newRule.append(decl);
        });
        retinaRuleList.push(newRule);

        [].push.apply(selectors, rule.selectors);
    });

    retinaRuleList.forEach((rule) => {
        root.append(rule);
    });

    if (selectors.length > 0) {
        const slts = unique(selectors);
        root.append(createPseudoElement(slts));
        for (let i = 2, len = dpi + 1; i < len; i++) {
            root.append(createMediaQuery(slts, i));
        }
    }
});

module.exports = retina;
