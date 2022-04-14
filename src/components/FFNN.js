import React, {useEffect, useMemo, useRef,} from "react";
import MakeChart from "../hooks/MakeFfnnChart";
import PropTypes from "prop-types";
import styled from "styled-components";

const defaultNode = {
	input: 1,
	hidden: 1,
	output: 1,
};

const defaultOptions = {
	colorFix: false,
	// colorSet: {}
}

const StyledDiv = styled.div`
  min-width: 260px;
  min-height: 60px;
  width: 100%;
  height: 100%;
  
  .ffnn-node { stroke: #fff; stroke-width: 2px; }
  .ffnn-link { stroke: #999; stroke-width: 2px; }
  .ffnn-accent { stroke: #666; stroke-width: 6px; }
`

export default function FFNN({ id, node=defaultNode, layer=1, accent=[], options=defaultOptions }) {
	const divRef = useRef();

	const config = useMemo(() => {
		return {
			target: id,
			input: !!node.input ? node.input : defaultNode.input,
			hidden: !!node.hidden ? node.hidden : defaultNode.hidden,
			output: !!node.output ? node.output : defaultNode.output,
			layer: layer,
			accent: accent,
			option: { colorFix: !!options.colorFix },
		}

		// function __makeOption(options) {
		// 	const f_cs = !!options.colorSet ? !!options.colorSet.input : false;
		//
		// 	return {
		// 		colorFix: (f_cs) ? f_cs : (!!options.colorFix ? options.colorFix : defaultOptions.colorFix),
		// 		colorSet: (f_cs) ? options.colorSet : defaultOptions.colorSet,
		// 	}
		// }
	}, [id, node, layer, accent, options])

	useEffect(() => {
		MakeChart(config);
	}, [config, divRef]);

	return (
		<StyledDiv ref={divRef}>
			<svg id={id} width="260px" height="60px" />
		</StyledDiv>
	)
}



FFNN.propTypes = {
	id: PropTypes.string.isRequired,
	node: PropTypes.exact({
		input: PropTypes.number,
		hidden: PropTypes.number,
		output: PropTypes.number
	}),
	layer: PropTypes.number,
	accent: PropTypes.arrayOf(PropTypes.number),
	option: PropTypes.exact({
		colorFix: PropTypes.bool,
		// colorSet: PropTypes.exact({
		// 	input: PropTypes.string,
		// 	hidden: PropTypes.string,
		// 	output: PropTypes.string
		// })
	})
}