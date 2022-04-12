import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Highcharts from "highcharts";
import StyledChart from "./Chart.style";
import useChart from "../hooks/useChart";

/**
 * Bar Chart를 생성하는 컴포넌트 입니다.<br>
 * <b>id</b> : <i>{string}</i> - 차트를 생성할 div에 부여하는 아이디 값 입니다.<br>
 * <b>xAxis</b> : <i>{string[]}</i> - x축의 값 입니다.<br>
 * <b>series</b> : <i>{number[]|number[][]}</i> - 입력된 xAxis에 맞춰서 데이터가 표시됩니다.<br>
 * <b>colors</b> : <i>{string|string[]}</i> - series의 색상을 결정합니다.<br>
 * <b>options</b> : <i>{Object}</i> - 차트에 대한 설정값입니다.<br>
 * <b>style</b> : <i>{CSSProperties}</i> - Bar container에 대한 css 값입니다.<br>
 */
export default function Bar(
	{ id, xAxis, series=[], colors="", options={}, style={} }
) {

	const chartOptions = useChart(series, colors, options);

	useEffect(() => {
		Highcharts.chart({
			...chartOptions,
			chart: {
				renderTo: id,
				type: 'column'
			},
			xAxis: {
				categories: xAxis
			},
		});
	}, [id, xAxis, chartOptions])

	return <StyledChart id={id} style={style} />
}

Bar.propTypes = {
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
	options: PropTypes.exact({
		title: PropTypes.string, // string
		subtitle: PropTypes.string, // string
		legend: PropTypes.bool // boolean
	}), // @optional
	style: PropTypes.object // object @optional
}