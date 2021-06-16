#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./ui";

const cli = meow(
	`
	Usage
	  $ tarocodegen

	Options
		--type  component type

	Examples
	  $ tarocodegen --type routes

`,
	{
		flags: {
			type: {
				type: "string",
			},
		},
	}
);

render(<App type={cli.flags.type} />);
