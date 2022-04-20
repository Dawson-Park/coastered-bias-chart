import Histogram from "../components/Histogram";

const series = [
	{
		weight: 0,
		data: [
			{ms: -300, value: 14},
			{ms: -200, value: 22},
			{ms: -150, value: 65},
			{ms: 0, value: 78},
			{ms: 100, value: 69},
			{ms: 200, value: 52},
			{ms: 300, value: 29},
			{ms: 400, value: 14},
		]
	},
	{
		weight: 1,
		data: [
			{ms: -300, value: 14},
			{ms: -200, value: 22},
			{ms: -150, value: 65},
			{ms: 0, value: 78},
			{ms: 100, value: 69},
			{ms: 200, value: 52},
			{ms: 300, value: 29},
			{ms: 400, value: 14},
		]
	},
	{
		weight: 2,
		data: [
			{ms: -300, value: 14},
			{ms: -200, value: 22},
			{ms: -150, value: 65},
			{ms: 0, value: 78},
			{ms: 100, value: 69},
			{ms: 200, value: 52},
			{ms: 300, value: 29},
			{ms: 400, value: 14},
		]
	},
	{
		weight: 3,
		data: [
			{ms: -300, value: 14},
			{ms: -200, value: 22},
			{ms: -150, value: 65},
			{ms: 0, value: 78},
			{ms: 100, value: 69},
			{ms: 200, value: 52},
			{ms: 300, value: 29},
			{ms: 400, value: 14},
		]
	},
	{
		weight: 4,
		data: [
			{ms: -300, value: 14},
			{ms: -200, value: 22},
			{ms: -150, value: 65},
			{ms: 0, value: 78},
			{ms: 100, value: 69},
			{ms: 200, value: 52},
			{ms: 300, value: 29},
			{ms: 400, value: 14},
		]
	},
	{
		weight: 5,
		data: [
			{ms: -300, value: 14},
			{ms: -200, value: 22},
			{ms: -150, value: 65},
			{ms: 0, value: 78},
			{ms: 100, value: 69},
			{ms: 200, value: 52},
			{ms: 300, value: 29},
			{ms: 400, value: 14},
		]
	},
	{
		weight: 6,
		data: [
			{ms: -300, value: 14},
			{ms: -200, value: 22},
			{ms: -150, value: 65},
			{ms: 0, value: 78},
			{ms: 100, value: 69},
			{ms: 200, value: 52},
			{ms: 300, value: 29},
			{ms: 400, value: 14},
		]
	},
	{
		weight: 7,
		data: [
			{ms: -300, value: 14},
			{ms: -200, value: 22},
			{ms: -150, value: 65},
			{ms: 0, value: 78},
			{ms: 100, value: 69},
			{ms: 200, value: 52},
			{ms: 300, value: 29},
			{ms: 400, value: 14},
		]
	},
	{
		weight: 8,
		data: [
			{ms: -300, value: 14},
			{ms: -200, value: 22},
			{ms: -150, value: 65},
			{ms: 0, value: 78},
			{ms: 100, value: 69},
			{ms: 200, value: 52},
			{ms: 300, value: 29},
			{ms: 400, value: 14},
		]
	}
]

export default {
	title: "Histogram",
	component: Histogram
}

const Base = (args) => <Histogram {...args} />

export const Default = Base.bind({});
Default.args = {
	id: "Histogram",
	series: series
};

export const Size = Base.bind({});
Size.args = {
	id: "Histogram",
	series: series,
	width: 900,
	height: 500
};

export const Padding = Base.bind({});
Padding.args = {
	id: "Histogram",
	series: series,
	padding: 100,
};

export const Color = Base.bind({});
Color.args = {
	id: "Histogram",
	series: series,
	colorScheme: {
		start: "#a270ff", end: "#4017c6"
	},
};