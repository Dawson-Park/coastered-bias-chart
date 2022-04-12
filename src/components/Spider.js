import React, {useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import Highcharts from "highcharts";
import factory from "highcharts/highcharts-more"
import StyledChart from "./Chart.style";
import useChart from "../hooks/useChart";

factory(Highcharts);

/**
 * Spider Chart를 생성하는 컴포넌트입니다.<br>
 * <b>id</b> : <i>{string}</i> - 차트를 생성할 div에 부여하는 아이디 값 입니다.<br>
 * <b>xAxis</b> : <i>{string[]}</i> - x축의 값 입니다.<br>
 * <b>series</b> : <i>{number[]|number[][]}</i> - 입력된 xAxis에 맞춰서 데이터가 표시됩니다.<br>
 * <b>colors</b> : <i>{string|string[]}</i> - series의 색상을 결정합니다.<br>
 * <b>options</b> : <i>{Object}</i> - 차트에 대한 설정값입니다.<br>
 * <b>style</b> : <i>{CSSProperties}</i> - Spider container에 대한 css 값입니다.<br>
 */
export default function Spider(
	{ id, xAxis, series=[], colors="", options={}, style={} }
) {
	const chartOptions = useChart([], colors, options);

	const refinedSeries = useMemo(() => {
		if(typeof series[0] === 'number') {
			const f = typeof colors === 'string';
			return [
				{ type: 'line', color: f ? colors:colors[0], data: series, pointPlacement:'on' }
			]
		}
		else {
			return series.map(
				(item, idx) => ( { type: 'line', color: colors[idx]|colors, data: item, pointPlacement:'on' } )
			)
		}
	}, [series, colors]);

	useEffect(() => {
		Highcharts.chart({
			...chartOptions,
			series: refinedSeries,
			chart: {
				polar: true,
				type: 'line',
				renderTo: id
			},
			xAxis: {
				categories: xAxis,
				tickmarkPlacement: 'on',
				lineWidth: 0
			},
			yAxis: {
				gridLineInterpolation: 'polygon',
				lineWidth: 0,
				min: 0
			},
			legend: {
				align: 'right',
				verticalAlign: 'middle',
				layout: 'vertical'
			},
			tooltip: {
				shared: true,
				pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
			},
			pane: {
				size: '80%'
			},
			responsive: {
				rules: [{
					condition: {
						maxWidth: 500
					},
					chartOptions: {
						legend: {
							align: 'center',
							verticalAlign: 'bottom',
							layout: 'horizontal'
						},
						pane: {
							size: '70%'
						}
					}
				}]
			}
		});
	}, [id, xAxis, chartOptions])

	return <StyledChart id={id} style={style} />
}

Spider.propTypes = {
	id: PropTypes.string.isRequired, // string @require
	xAxis: PropTypes.arrayOf(PropTypes.string).isRequired, // string[] @require
	series: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.number), // number[]
		PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)) // number[][]
	]).isRequired, // @require
	colors: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string)
	]), // string|string[] @optional
	yAxis: PropTypes.arrayOf(PropTypes.string), // string[] @optional
	options: PropTypes.exact({
		title: PropTypes.string, // string
		subtitle: PropTypes.string, // string
		legend: PropTypes.bool // boolean
	}), // @optional
	style: PropTypes.object // object @optional
}