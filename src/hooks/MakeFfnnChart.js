import * as d3 from "d3";

export default function MakeFfnnChart(config) {
	let ADJUST = 42; // 간격의 크기
	let RADIUS = 10; // 원의 크기

	const tag = setUp();
	build(tag);

	/**
	 * svg의 설정값을 return하는 함수
	 */
	function setUp() {
		const svg = d3.select(`#${config.target}`);

		// get d3 Color Scheme
		const color = __makeColor();

		// elements for data join
		const link = svg.append("g").selectAll('.link');
		const accent = config.accent.length > 0 ? svg.append('g').selectAll('.accent') : undefined;
		const node = svg.append("g").attr('class', 'ffnn-nodeBody').selectAll('.node');

		// simulation initialization
		const simulation = d3.forceSimulation()
							 .force("link", d3.forceLink().id(d => d.id))
							 .force("charge", d3.forceManyBody().strength(0))
		const graph = make();

		return { color, link, accent, node, simulation, graph }



		function __makeColor() {
			const customSet = {
				input: d3.schemeCategory10[8],
				hidden: d3.schemeCategory10[5],
				output: d3.schemeCategory10[9]
			};

			return config.option.colorFix ? customSet : d3.scaleOrdinal(d3.schemeCategory10);
		} // function __makeColor()
	} // function setUp()

	/**
	 * 그래프에 사용될 정보를 생성하는 함수
	 */
	function make() {
		const layerLavel = config.layer + 2;
		const courseLength = config.accent.length;
		const maxCount = Math.max(config.input, config.hidden, config.output);

		// node에 사용될 최대 크기(svg의 크기)를 결정
		__initFactor();

		// create Node, Layer의 수에 따라 다르게 동작
		let arrayCount = 0; let groupIndex = 1;
		let layerArray = []; let sum = config.input;
		for(let i = 0; i<layerLavel; i++) {
			if(i === 0) { // case Input
				layerArray.push(__setNode(sum, String(groupIndex++), config.input, 'input'));
			}
			else if(i === layerLavel-1) { // case Output
				layerArray.push(__setNode(sum, String(groupIndex++), config.output, 'output'));
			}
			else { // case Hidden
				layerArray.push(__setNode(sum, String(groupIndex++), config.hidden, 'hidden'));
			}

			arrayCount++;

			if(i === layerLavel-2) {
				sum += config.output;
			}
			else {
				sum += config.hidden;
			}
		}

		// create Link
		const linkArray = __setLink();

		// create Nodes
		let nodeArray = [];
		for(let i=0; i<layerArray.length; i++) {
			nodeArray = nodeArray.concat(layerArray[i]);
		}

		// create Accent
		let accentArray = {};
		if(config.accent.length > 0) {
			accentArray = __setAccent(config.accent);
		}

		return {
			nodes: nodeArray,
			links: linkArray,
			accent: accentArray
		}



		/** @private - setup adjust & radius */
		function __initFactor() {
			if(maxCount < 6) {
				ADJUST = 50; RADIUS = 30;
			}
			else {
				ADJUST = 50 - ((maxCount - 5) * 4.7);
				RADIUS = 30 - ((maxCount - 5) * 4.7);
			}

			// limitation adjust
			if(ADJUST > 50) ADJUST = 50;
			else if(ADJUST < 10) ADJUST = 10;

			// limitation radius
			if(RADIUS > 30) RADIUS = 30;
			else if(RADIUS < 10) RADIUS = 10;
		} // function __initFactor()

		/** @private - setup Node Information */
		function __setNode(_sum, _group, _groupCount, type) {
			let _nodeArray = []; let s = 1;

			for(let i = arrayCount; i<_sum; i++) {
				arrayCount = i;
				_nodeArray.push({
					id: String(arrayCount),
					group: _group,
					sort: String(s++),
					type: type,
					groupCount: String(_groupCount),
					maxCount: String(maxCount)
				});
			}

			return _nodeArray;
		} // function __setNode(_sum, _group, _groupCount, type)

		/** @private - setup Link Information */
		function __setLink() {
			let _id = 0; const _linkArray = [];

			for(let i=1; i<layerArray.length; i++) {
				___makeLink(layerArray[i-1], layerArray[i]);
			}

			return _linkArray;

			function ___makeLink(start, end) {
				for (let i=0; i<start.length; i++){
					const startNode = start[i];

					for(let j=0; j<end.length; j++) {
						const endNode = end[j];
						const link = {
							"source" : startNode['id'],
							"target" : endNode['id'],
							"id" : String(_id++)
						};
						_linkArray.push(link);
					}
				}
			} // function ___makeLink(start, end)
		} // function __setLink()

		/** @private - setup Accecnt Information */
		function __setAccent(_accent) {
			const _links = []; let _node = 0;

			for(let i=0; i<courseLength; i++) {
				if(i === 0) {
					_links.push(`${_accent[i] - 1}`);
					_node += config.input;
				}
				else {
					_links.push(`${_node + _accent[i]-1}`);
					_node += config.hidden;
				}
			}

			const _accentArray = [];
			for(let i=1; i<courseLength; i++) {
				_accentArray.push({
					source: String(_links[i-1]),
					target: String(_links[i]),
					id: String(i-1),
				});
			}

			return _accentArray;
		} // function __setAccent(_accent)
	} // function make()

	/**
	 * d3를 이용해 그래프를 그리는 메소드
	 */
	function build(tag) {
		const adjust = ADJUST;

		// Create Link Line
		tag.link = tag.link.data(tag.graph.links);
		tag.link.exit().remove();
		tag.link = tag.link.enter().append("line").attr("class", "ffnn-link").merge(tag.link);

		// Create Node Circle
		tag.node = tag.node.data(tag.graph.nodes);
		tag.node.exit().remove();
		tag.node.enter().append("circle")
		   .attr("class", "ffnn-node")
		   .attr("r", RADIUS)
		   .attr("fill", d => { return config.option.colorFix ? tag.color[d.type] : tag.color(d.group);  } )
		   .attr("cx",   d => __getCx(d.group) )
		   .attr("cy",   d => __getCy(d.sort, d.maxCount, d.groupCount) )
		   .merge(tag.node);

		// Create Accent Line
		if(config.accent.length > 0) {
			tag.accent = tag.accent.data(tag.graph.accent);
			tag.accent.exit().remove();
			tag.accent = tag.accent.enter().append("line")
							.attr("class", "ffnn-accent")
							.merge(tag.accent);
		}

		// Set nodes, links, accent for simulation
		tag.simulation.nodes(tag.graph.nodes);
		tag.simulation.force("link").links(tag.graph.links);
		tag.simulation.force("link").links(tag.graph.accent);

		// Draw line
		setTimeout(() => {
			__drawLine(tag.link);
			if(config.accent.length > 0) {
				__drawLine(tag.accent);
			}
		}, 100)

		tag.simulation.alphaTarget(0.3).restart();
		__moveCenter(config.target)



		/** 태그의 x 좌표를 지정하는 메소드 */
		function __getCx(group) {
			return group * 100;
		} // function __getCx(group)

		/** 각 태그의 y 좌표를 지정하는 메소드 */
		function __getCy(sort, maxCnt, groupCnt) {
			let cy = sort * (adjust*2);
			const minus = maxCnt - groupCnt;

			if(minus > 0) {
				cy += (minus * adjust);
			}
			return cy-70;
		} // function __getCy(sort, maxCnt, groupCnt)

		/** 각 노드를 연결하는 선을 그리는 메소드 */
		function __drawLine(target) {
			target.attr("x1", d => __getCx(d.source.group))
				  .attr("y1", d => __getCy(d.source.sort, d.source.maxCount, d.source.groupCount))
				  .attr("x2", d => __getCx(d.target.group))
				  .attr("y2", d => __getCy(d.target.sort, d.target.maxCount, d.target.groupCount));
		} // function __drawLine(target)

		/** 그래프가 가운데 위치하도록 ViewBox를 조정하는 메소드 */
		function __moveCenter(target) {
			const pNode = d3.select(`#${target}`).node().getBoundingClientRect();
			const pBody = d3.select(`#${target} .ffnn-nodeBody`).node().getBoundingClientRect();

			const svg = d3.select(`#${target}`);
			const body = d3.select('.ffnn-nodeBody');
			const width = body.node().getBoundingClientRect().width;
			const height = body.node().getBoundingClientRect().height;

			svg.attr("width", width);
			svg.attr("height", height);
			svg.attr("viewBox", [pBody.x-pNode.x, pBody.y-pNode.y, width, height]);
		} // function __moveCenter(target)
	} // function build(tag)
}