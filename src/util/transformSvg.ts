import * as path from "path";
import * as fs from "fs";
// @ts-ignore
import svgr from "@svgr/core";

function loadSvg() {
	const svgCode = fs.readFileSync(
		path.resolve(__dirname, "../../example/icons/source/alert-triangle.svg"),
		"utf-8"
	);
	console.log(svgCode);
	svgr(
		svgCode,
		{
			native: true,
			dimensions: false,
			replaceAttrValues: {
				"#000": "{props.color}",
				"#000000": "{props.color}",
				currentColor: "{props.color}",
			},
			plugins: [
				"@svgr/plugin-svgo",
				"@svgr/plugin-jsx",
				"@svgr/plugin-prettier",
			],
		},
		{ componentName: "MyComponent" }
	).then((jsCode: string) => {
		console.log("--js", jsCode);
	});
}

loadSvg();

// function template(
// 	{ template }: any,
// 	opts: any,
// 	{ imports, componentName, props, jsx, exports }: any
// ) {
// 	console.log(jsx, opts);
// 	return template.ast`
// 	  ${imports}
// 	  const ${componentName} = (${props}) => ${jsx}
// 	  ${exports}
// 	`;
// }
