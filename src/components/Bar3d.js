import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Highcharts from "highcharts";
import StyledChart from "./Chart.style";
import factory from "highcharts/highcharts-3d";
import useChart from "../hooks/useChart";

factory(Highcharts);

const colorset = ["rgba(124, 181, 236, 0.9)", "rgba(255, 0, 0, 0.6)", "rgba(92, 92, 97, 0.6)"]

/**
 * 3D Bar Chart를 생성하는 컴포넌트 입니다.<br>
 * <b>id</b> : <i style='color:#1ea7fd'>string</i> - 차트를 생성할 div에 부여하는 아이디 값 입니다.<br>
 * <b>xAxis</b> : <i style='color:#1ea7fd'>string[]</i> - x축의 값 입니다.<br>
 * <b>series</b> : <i style='color:#1ea7fd'>number[]|Array<number[]></i> - 차트에 표시할 데이터로, 3D Bar는 number타입의 배열 또는 2차원 배열을 요구합니다.<br>
 * <b>options</b> : <i style='color:#1ea7fd'>Object</i> - 차트에 대한 설정값입니다.<br>
 * <b>style</b> : <i style='color:#1ea7fd'>CSSProperties</i> - 3D Bar container에 대한 css 값입니다.<br>
 */
export default function Bar3d(
	{ id, xAxis, series, options={}, style={} }
) {
	const chartOptions = useChart(series, colorset, options);

	useEffect(() => {
		Highcharts.chart({
			...chartOptions,
			chart: {
				renderTo: id,
				type: 'column',
				options3d: {
					enabled: true,
					alpha: 15,
					beta: 20,
					depth: 200,
					viewDistance: 100
				}
			},
			xAxis: { categories: xAxis, offset: 20 },
			plotOptions: {
				column: { depth: 75, groupZPadding: 0, grouping: false, pointPadding: 0.2 },
				series: { pointPadding: 0, groupPadding: 0 },
			},
			yAxis: {
				tickInterval: 10
			},
			// zAxis: {
			// 	min: 0, max: 3,
			// 	categories: ["", series[0].name, series[1].name, ""],
			// 	labels: { rotation: 20, y: 30 },
			// },
		});
	}, [id, xAxis, chartOptions])

	return <StyledChart id={id} style={style} />
}

Bar3d.propTypes = {
	id: PropTypes.string.isRequired,
	xAxis: PropTypes.arrayOf(PropTypes.string).isRequired,
	series: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.number),
		PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
	]).isRequired,
	options: PropTypes.exact({
		title: PropTypes.string,
		subtitle: PropTypes.string,
		legend: PropTypes.bool
	}),
	style: PropTypes.object
}