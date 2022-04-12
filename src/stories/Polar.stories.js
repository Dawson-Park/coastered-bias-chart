import Polar from "../components/Polar";

export default {
	title: 'Polar',
	component: Polar
}

const Base = (args) => <Polar {...args} />

export const Default = Base.bind({});
Default.args = {
	id: 'polar',
	xAxis: ['02.01', '02.02', '02.03', '02.04', '02.05', '02.06'],
	series: [13, 46, 15, 30, 8, 10],
}

export const Options = Base.bind({});
Options.args = {
	id: 'polar',
	xAxis: ['02.01', '02.02', '02.03', '02.04', '02.05', '02.06'],
	series: [13, 46, 15, 30, 8, 10],
	options: {
		title: "Title",
		subtitle: "subtitle",
		legend: true,
	},
};

export const MultipleSeries = Base.bind({});
MultipleSeries.args = {
	id: 'polar',
	xAxis: ['02.01', '02.02', '02.03', '02.04', '02.05', '02.06'],
	series: [[13, 46, 15, 30, 8, 10], [9, 24, 12, 55, 0, 8]],
}