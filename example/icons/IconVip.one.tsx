import * as React from "react";

function IconVip(props) {
	if (IS_RN) {
		const Svg,
			{
				Defs,
				LinearGradient,
				Stop,
				G,
				Rect,
				Path,
			} = require("react-native-svg");
		return (
			<Svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" {...props}>
				<Defs>
					<LinearGradient
						x1="7.241%"
						y1="7.366%"
						x2="99.488%"
						y2="97.328%"
						id="prefix__svg3830786751a"
					>
						<Stop stopColor="#FFE4AF" offset="0%" />
						<Stop stopColor="#FFD288" offset="100%" />
					</LinearGradient>
				</Defs>
				<G fill="none" fillRule="evenodd">
					<Rect
						stroke="#FFF"
						fill="url(#prefix__svg3830786751a)"
						width={20}
						height={20}
						rx={10}
					/>
					<Path
						d="M16.497 8.326c-.734 4.059-4.832 7.494-6.065 8.28-1.233.785-2.358-.315-2.764-1.147-.467-.948-1.865-6.086-2.233-6.512-.366-.425-1.466.426-1.466.426l-.531-.688s2.231-2.618 3.93-2.946c1.8-.348 1.798 2.717 2.232 4.417.42 1.645.701 2.586 1.067 2.586.367 0 1.066-.918 1.83-2.324.768-1.407-.032-2.651-1.53-1.766.597-3.534 6.262-4.385 5.53-.326z"
						fill="#474038"
						fillRule="nonzero"
					/>
				</G>
			</Svg>
		);
	}

	return (
		<svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" {...props}>
			<defs>
				<linearGradient
					x1="7.241%"
					y1="7.366%"
					x2="99.488%"
					y2="97.328%"
					id="prefix__svg3830786751a"
				>
					<stop stopColor="#FFE4AF" offset="0%" />
					<stop stopColor="#FFD288" offset="100%" />
				</linearGradient>
			</defs>
			<g fill="none" fillRule="evenodd">
				<rect
					stroke="#FFF"
					fill="url(#prefix__svg3830786751a)"
					width={20}
					height={20}
					rx={10}
				/>
				<path
					d="M16.497 8.326c-.734 4.059-4.832 7.494-6.065 8.28-1.233.785-2.358-.315-2.764-1.147-.467-.948-1.865-6.086-2.233-6.512-.366-.425-1.466.426-1.466.426l-.531-.688s2.231-2.618 3.93-2.946c1.8-.348 1.798 2.717 2.232 4.417.42 1.645.701 2.586 1.067 2.586.367 0 1.066-.918 1.83-2.324.768-1.407-.032-2.651-1.53-1.766.597-3.534 6.262-4.385 5.53-.326z"
					fill="#474038"
					fillRule="nonzero"
				/>
			</g>
		</svg>
	);
}

export default IconVip;
