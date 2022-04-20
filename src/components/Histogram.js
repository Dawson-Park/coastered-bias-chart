import React, {useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MakeChart from "../hooks/MakeCnnHistogram"

const StyledDiv = styled.div`
  /* CNN Chart Style : Optional */
  .cnn-line { /*stroke: #ccc; stroke-width: 1;*/ }
  .cnn-dot { /*fill: #333; stroke: #ccc; stroke-width: 1;*/ }
  .cnn-text { /*display: none; fill: black; font-family: sans-serif; font-size: 16px; font-weight: bold;*/  }
  .cnn-area { /*fill: red;*/ }

  /* CNN Chart Style : Hover */
  .cnn-group:hover .cnn-line { stroke: #333; stroke-width: 2; }
  .cnn-group:hover .cnn-dot { fill: #333; stroke: #333; }
  .cnn-group:hover .cnn-text { display: block; }
`;

const defColorScheme = {
	start: '#ffa270', end: '#c64017'
}

export default function Histogram(
	{ id, series, width=600, height=400, padding=30, colorScheme=defColorScheme }
) {
	const config = useMemo(() => {
		const innerHeight = (height/4)*3;
		const _color = _makeColorScheme();

		return {
			target: "#"+id,
			width: width < 300 ? 300 : width,
			height: height < 225 ? 225 : height,
			innerHeight: innerHeight,
			padding: padding,
			margin: { top: 40, right: 0, bottom: 40, left: 0 },
			color: _color
		}

		function _makeColorScheme() {
			return {
				start: !!colorScheme.start ? colorScheme.start : defColorScheme.start,
				end: !!colorScheme.end ? colorScheme.end : defColorScheme.end
			}
		}
	}, [width, height, padding, colorScheme]);

	useEffect(() => {
		MakeChart(config, series)
	}, [config, series])

	return (
		<StyledDiv>
			<svg id={id} width={width} height={height} />
		</StyledDiv>
	)
}

Histogram.propTypes = {
	id: PropTypes.string.isRequired,
	series: PropTypes.arrayOf(
		PropTypes.exact({
			weight: PropTypes.number,
			data: PropTypes.arrayOf(
				PropTypes.exact({
					ms: PropTypes.number,
					value: PropTypes.number
				})
			),
		})
	).isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	padding: PropTypes.number,
	colorScheme: PropTypes.exact({
		start: PropTypes.string,
		end: PropTypes.string
	}),
}