import FFNN from "../components/FFNN";

export default {
	title: "FFNN",
	component: FFNN
}

const Base = (args) => <FFNN {...args} />

export const Default = Base.bind({});
Default.args = {
	id: "ffnn",
};

export const Nodes = Base.bind({});
Nodes.args = {
	id: "ffnn",
	node: {
		input: 2,
		hidden: 4,
		output: 3
	}
};

export const MultiLayer = Base.bind({});
MultiLayer.args = {
	id: "ffnn",
	node: {
		input: 2,
		hidden: 4,
		output: 3
	},
	layer: 2,
};

export const Accent = Base.bind({});
Accent.args = {
	id: "ffnn",
	node: {
		input: 2,
		hidden: 4,
		output: 3
	},
	layer: 2,
	accent: [2, 4, 1, 2]
};

export const Options = Base.bind({});
Options.args = {
	id: "ffnn",
	node: {
		input: 2,
		hidden: 4,
		output: 3
	},
	layer: 2,
	accent: [2, 4, 1, 2],
	options: {
		colorFix: true,
		// colorSet: {}
	}
};