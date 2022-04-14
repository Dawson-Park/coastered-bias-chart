import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Highcharts from "highcharts";
import StyledChart from "./Chart.style";
import useChart from "../hooks/useChart";

/**
 * Bar Chart를 생성하는 컴포넌트 입니다.<br>
 * <b>id</b> : <i style='color:#1ea7fd'>string</i> - 차트를 생성할 div에 부여하는 아이디 값 입니다.<br>
 * <b>xAxis</b> : <i style='color:#1ea7fd'>string[]</i> - x축의 값 입니다.<br>
 * <b>series</b> : <i style='color:#1ea7fd'>number[]|Array<number[]></i> - 차트에 표시할 데이터로, Bar는 number타입의 배열 또는 2차원 배열을 요구합니다.<br>
 * <b>colors</b> : <i style='color:#1ea7fd'>string|string[]</i> - series의 색상을 결정합니다.<br>
 * <b>options</b> : <i style='color:#1ea7fd'>Object</i> - 차트에 대한 설정값입니다.<br>
 * <b>style</b> : <i style='color:#1ea7fd'>CSSProperties</i> - Bar container에 대한 css 값입니다.<br>
 */
export default function Bar(
	{ id, xAxis, series=[], colors="", options={}, style={} }
) {

	const commonOpts = useChart(series, colors, options);

	useEffect(() => {
		Highcharts.chart({
			...commonOpts,
			chart: {
				renderTo: id,
				type: 'column'
			},
			xAxis: {
				categories: xAxis
			},
		});
	}, [id, xAxis, commonOpts])

	return <StyledChart id={id} style={style} />
}

Bar.propTypes = {
	id: PropTypes.string.isRequired,
	xAxis: PropTypes.arrayOf(PropTypes.string).isRequired,
	series: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.number),
		PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
	]).isRequired,
	colors: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string)
	]),
	options: PropTypes.exact({
		title: PropTypes.string,
		subtitle: PropTypes.string,
		legend: PropTypes.bool
	}),
	style: PropTypes.object
}