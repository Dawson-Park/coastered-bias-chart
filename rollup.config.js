// @ts-check
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

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
		resolve(),
		commonjs(),
		terser()
	],
	external: ["react", "react-dom"]
}

export default [config];