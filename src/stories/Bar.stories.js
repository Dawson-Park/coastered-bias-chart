import Bar from "../components/Bar";

export default {
	title: "Bar",
	component: Bar
}

const Base = (args) => <Bar {...args} />

export const Default = Base.bind({});
Default.args = {
	id: "bar",
	xAxis: ['02.01', '02.02', '02.03', '02.04', '02.05', '02.06', '02.07', '02.08', '02.09', '02.10', '02.11', '02.12', '02.13', '02.14'],
	series: [13, 46, 15, 30, 8, 10, 50, 25, 65, 60, 20, 30, 15, 60],
};

export const Options = Base.bind({});
Options.args = {
	id: "bar",
	xAxis: ['02.01', '02.02', '02.03', '02.04', '02.05', '02.06', '02.07', '02.08', '02.09', '02.10', '02.11', '02.12', '02.13', '02.14'],
	series: [13, 46, 15, 30, 8, 10, 50, 25, 65, 60, 20, 30, 15, 60],
	options: {
		title: "Title",
		subtitle: "subtitle",
		legend: true,
	},
};

export const MultipleSeries = Base.bind({});
MultipleSeries.args = {
	id: "bar",
	xAxis: ['02.01', '02.02', '02.03', '02.04', '02.05', '02.06', '02.07', '02.08', '02.09', '02.10', '02.11', '02.12', '02.13', '02.14'],
	series: [[13, 46, 15, 30, 8, 10, 50, 25, 65, 60, 20, 30, 15, 60], [9, 24, 12, 55, 0, 8, 32, 44, 87, 62, 32, 33, 19, 42]],
}