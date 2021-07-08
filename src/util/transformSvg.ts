import * as path from "path";
import * as fs from "fs";
// @ts-ignore
import svgr from "@svgr/core";

function loadSvg() {
	const svgCode = fs.readFileSync(
		path.resolve(__dirname, "../../example/icon/source/close-gray.svg"),
		"utf-8"
	);
	console.log(svgCode);
	svgr(
		svgCode,
		{ icon: true, native: true },
		{ componentName: "MyComponent" }
	).then((jsCode: string) => {
		console.log("--js", jsCode);
	});
}

loadSvg();
