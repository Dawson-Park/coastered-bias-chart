import {useMemo} from "react";

export default function useChart(series, colors, options) {
	const refinedSeries = useMemo(() => {
		const f = typeof colors === 'string';
		if(typeof series[0] === 'number') {
			return [
				{ type: 'column', color: f ? colors:colors[0], data: series }
			]
		}
		else {
			return series.map(
				(item, idx) => ( { type: 'column', color: f ? colors:colors[idx], data: item } )
			)
		}
	}, [series, colors])

	const parsedOpts = useMemo(() => {
		return {
			title: !!options.title ? options.title : "",
			subtitle: !!options.subtitle ? options.subtitle : "",
			legend: !!options.legend ? options.legend : false,
		}
	}, [options])

	return useMemo(() => {
		return {
			series: refinedSeries,
			tooltip: {enabled: true, animation: true},
			credits: {enabled: false},
			exporting: {enabled: false},
			yAxis: {categories: undefined, title: {style: {display: "none"}}},
			title: {
				text: parsedOpts.title,
				style: {display: parsedOpts.title.length === 0 ? "none" : "block"}
			},
			subtitle: {
				text: parsedOpts.subtitle,
				style: {display: parsedOpts.subtitle.length === 0 ? "none" : "block"}
			},
			legend: {enabled: parsedOpts.legend}
		}
	}, [refinedSeries, parsedOpts]);
}