import React, { FC, useEffect, useState } from "react";
import { Text, Box } from "ink";
import SelectInput from "ink-select-input";
import Spinner from "ink-spinner";
import chalk from "chalk";
import generateRoutes from "./routes";

const items = [
	{
		label: "路由",
		value: "routes",
	},
	{
		label: "图标",
		value: "icon",
	},
];

const App: FC<{ type?: string }> = ({ type }) => {
	const handleSelect = (item: { label: string; value: string }) => {
		setProcess("processing");
		if (item.value === "routes") {
			try {
				generateRoutes();
				setProcess("success");
			} catch (error) {
				console.log(chalk.red(error));
				setProcess("failed");
			}
		}
	};
	const [process, setProcess] = useState<
		"init" | "processing" | "success" | "failed"
	>("init");
	useEffect(() => {
		if (type) {
			setProcess("processing");
		}
	}, []);
	return (
		<Box>
			{process === "init" ? (
				<SelectInput items={items} onSelect={handleSelect} />
			) : null}
			{process === "processing" ? (
				<Text>
					<Text color="green">
						<Spinner type="dots" />
					</Text>
					{" Loading"}
				</Text>
			) : null}
			{process === "success" ? <Text>🎉 组件已更新</Text> : null}
			{process === "failed" ? <Text>❌ 组件更新失败</Text> : null}
		</Box>
	);
};

module.exports = App;
export default App;
