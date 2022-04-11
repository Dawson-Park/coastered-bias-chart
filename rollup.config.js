// @ts-check
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

const config = {
	input: "src/index.js",
	output: [
		{
			file: "lib/index.js",
			format: "es",
			name: "coastered-bias-chart",
		},
		{
			file: "lib/index.common.js",
			format: "cjs",
			name: "coastered-bias-chart",
		},
	],
	plugins: [
		babel({
			extensions: [".js"],
			exclude: ["node_modules/**"],
		}),
		commonjs(),
	],
	external: ["react", "react-dom"]
}

export default [config];