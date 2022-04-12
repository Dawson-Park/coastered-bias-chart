import useChart from "../hooks/useChart";
import React, {useEffect, useMemo} from "react";
import Highcharts from "highcharts";
import StyledChart from "./Chart.style";
import PropTypes from "prop-types";

const colorSet = ["rgba(223, 83, 83, .5)", "rgba(119, 152, 191, .5)", "rgba(128, 65, 217, 0.2)", "rgba(0, 255, 0, 0.2)"]

/**
 * Scatter Chart를 그리는 컴포넌트 입니다.<br>
 * <b>id</b> : <i>{string}</i> - 차트를 생성할 div에 부여하는 아이디 값 입니다.<br>
 * <b>series</b> : <i>{number[][]|number[][][]}</i> - 차트에 사용할 데이터로, Scatter는 number타입의 2차원 또는 3차원 배열을 요구합니다.<br>
 * <b>xAxis</b> : <i>{string}</i> - x축에 사용할 이름입니다.<br>
 * <b>yAxis</b> : <i>{string}</i> - y축에 사용할 이름입니다.<br>
 * <b>seriesName</b> : <i>{string|string[]}</i> - 각 데이터의 이름입니다.<br>
 * <b>colors</b> : <i>{string|string[]}</i> - 데이터 표시에 사용될 색상입니다.<br>
 * <b>options</b> : <i>{Object}</i> - 차트에 대한 설정값입니다.<br>
 * <b>style</b> : <i>{CSSProperties}</i> - Scatter container에 대한 css 값입니다.<br>
 */
export default function Scatter(
	{ id, xAxis="xAxis", yAxis="yAxis", series=[[]], seriesName=[], colors=[], options={}, style={} }
) {
	const refinedSeries = useMemo(() => {
		if(typeof series[0][0] === 'number') {
			const f = typeof seriesName === 'string'
			return [
				{ color: colorSet[0], name: f ? seriesName:seriesName[0], data: series }
			]
		}
		else {
			return series.map(
				(item, idx) => ({ color: colorSet[idx], name: seriesName[idx], data: item })
			)
		}
	}, [series, colors])

	const chartOptions = useChart(series, colors.length ? colors:colorSet, options);

	useEffect(() => {
		Highcharts.chart({
			...chartOptions,
			series: refinedSeries,
			chart: {
				renderTo: id,
				type: 'scatter',
				zoomType: 'xy'
			},
			xAxis: {
				title: {text: xAxis, enabled: true},
				startOnTick: true,
				endOnTick: true,
				showLastLabel: true
			},
			yAxis: {
				title: {text: yAxis, enabled: true},
				style: {display: yAxis.length === 0 ? "none" : "block"}
			},
			legend: {
				layout: 'vertical',
				align: 'left',
				verticalAlign: 'top',
				x: 100,
				y: 70,
				floating: true,
				backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
				borderWidth: 1
			},
			plotOptions: {
				scatter: {
					marker: {
						radius: 5,
						states: {
							hover: {
								enabled: true,
								lineColor: 'rgb(100,100,100)'
							}
						}
					},
					states: {
						hover: {
							marker: {
								enabled: false
							}
						}
					},
					tooltip: {
						headerFormat: '<b>{series.name}</b><br>',
						pointFormat: `${xAxis}: {point.x}</br>${yAxis}: {point.y}`
					}
				}
			},
		});
	}, [id, xAxis, chartOptions])

	return <StyledChart id={id} style={style} />
}

Scatter.propTypes = {
	id: PropTypes.string.isRequired,
	series: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
		PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)))
	]).isRequired,

	xAxis: PropTypes.string,
	yAxis: PropTypes.string,
	seriesName: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string)
	]),
	colors: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string)
	]),
	options: PropTypes.exact({
		title: PropTypes.string,
		subtitle: PropTypes.string,
	}),
	style: PropTypes.object
}