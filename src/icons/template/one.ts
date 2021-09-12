// @ts-nocheck
import { parse } from "@babel/parser";

function oneTemplate(
	{ template },
	opts,
	{ imports, interfaces, componentName, props, jsx, exports }
) {
	const plugins = ["jsx"];
	if (opts.typescript) {
		plugins.push("typescript");
	}
	const typescriptTpl = template.smart({ plugins });
	const rnRequireAst = parse(`const Svg = require('react-native-svg');
	const {Path} = Svg;`);
	console.log(rnRequireAst);
	const rnRequire = rnRequireAst.program.body;
	return typescriptTpl.ast`
	${imports}
${interfaces}
function ${componentName}(${props}) {
	if (IS_RN) {
		${rnRequire}
		return ${jsx}
	}
  return ${jsx};
}
${exports}

	`;
}

export default oneTemplate;
