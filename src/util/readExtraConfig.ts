import fs from "fs";
import { resolve, extname } from "path";

export default function readExtraConfig(configPath: string) {
	const commandPath = process.cwd();
	const extraConfigPath = resolve(commandPath, configPath);
	if (fs.existsSync(extraConfigPath) && /json/.test(extname(extraConfigPath))) {
		return require(extraConfigPath);
	}
	return false;
}
