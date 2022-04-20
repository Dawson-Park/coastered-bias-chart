import * as d3 from "d3";

export default function MakeCnnHistogram(config, series) {
	show();

	/**
	 * 차트를 구성 후 표시
	 */
	function show() {
		// Make X Axis
		const [xAxis, yAxis, fy] = _makeAxis(series)

		// Binding SVG Tag
		const svg = d3.select(config.target)
			.style('width', config.width)
			.style('height', config.height);

		// Add Axis
		svg.append('g').call(xAxis);
		svg.append('g').call(yAxis);

		// get X, Y Position
		const sh = config.height - config.innerHeight;
		let intvArr = getInnerXPos(series);

		// draw Summay Chart
		_loopSummaryChart(series, intvArr)

		/**
		 * Area 그래프를 Y축에 맞게 출력하기 위한 메소드
		 * @param data {Array<Object>}
		 */
		function getInnerXPos(data) {
			let prev=0; let now=0; let intv=0; let intvArr = [];
			for(let i=0; i<data.length; i++) {
				if(prev !== 0) {
					now = fy(data[i].weight);
					intv = intv + (prev - now);
				}

				prev = fy(data[i].weight);
				intvArr.push(sh - intv);
			}

			return intvArr;
		}
	}

	/**
	 * 차트의 X축과 Y축을 표시하기 위한 메소드
	 */
	function _makeAxis(data) {
		// init X Axis, range : 0 to max
		const x = d3.scaleLinear()
			.domain(getSptrX(data)).nice()
			.range([config.padding, config.width - config.padding]);

		// Make X Axis
		const xAxis = g => g.attr("transform", `translate(0, ${config.height - config.margin.bottom})`)
			.attr("class", "cnn-xAxis")
			.call(d3.axisBottom(x).ticks(config.width / 90).tickSizeOuter(0))
			.call(g => g.select('.domain').remove())
			.call(g => g.selectAll('line').remove());

		// init Y Axis : Not Nice
		const y = d3.scaleLinear()
			.domain(getSptrY(data)).nice()
			.range([config.height - config.margin.bottom, config.margin.top*4]);

		// Make Y Axis
		const yAxis = g => g.attr("transform", `translate(${config.padding}, 0)`)
			.attr("class", "cnn-yAxis")
			.call(d3.axisLeft(y))
			.call(g => g.selectAll('text').remove())
			.call(g => g.select('.domain').remove())
			.call(g => g.selectAll('line').remove());

		return [xAxis, yAxis, y];

		/**
		 * 차트의 X축을 설정하는 함수
		 */
		function getSptrX(_data) {
			let max=Number.MIN_VALUE; let min=Number.MAX_VALUE;

			for(const e of _data) {
				let mx = d3.max(e.data, d => d.ms);
				max = (max >= mx) ? max : mx;

				let mn = d3.min(e.data, d => d.ms);
				min = (min <= mn) ? min : mn;
			}

			return [min, max];
		}

		/**
		 * 차트의 Y축을 설정하는 함수, 인덱스 간의 간격을 2배로 측정
		 */
		function getSptrY(_data) {
			let max = d3.max(_data, d => d.weight);
			let min = d3.min(_data, d => d.weight);

			return [min, max*2];
		}
	}

	/**
	 * 입력된 데이터 만큼 Area Summary 차트가 생성되도록 처리하는 함수
	 */
	function _loopSummaryChart(data, heightArray) {
		let dataRv = [...data].reverse();
		let spectrum = getSptr(data);
		let linearColor = d3.scaleLinear()
			.domain([0, data.length])
			.range([config.color.start, config.color.end])

		// 역순으로 출력, 가장 마지막 데이터가 가장 먼저 표시된다
		for(let i=0; i<data.length; i++) {
			__makeSummary(dataRv[i].data, heightArray[heightArray.length - (1+i)], spectrum.x, spectrum.y, linearColor(data.length - (1+i)))
		}

		/**
		 * 그래프의 축을 설정하는 메소드
		 */
		function getSptr(data) {
			let maxX=Number.MIN_VALUE; let minX=Number.MAX_VALUE;
			let maxY=Number.MIN_VALUE; let minY=Number.MAX_VALUE;

			for(const e of data) {
				let mxX = d3.max(e.data, d => d.ms);
				maxX = (maxX >= mxX) ? maxX : mxX;

				let mnX = d3.min(e.data, d => d.ms);
				minX = (minX <= mnX) ? minX : mnX;

				let mxY = d3.max(e.data, d => d.value);
				maxY = (maxY >= mxY) ? maxY : mxY;

				let mnY = d3.min(e.data, d => d.value);
				minY = (minY <= mnY) ? minY : mnY;
			}

			return {x: [minX, maxX], y: [/*minY*/0, maxY]};
		}
	}

	/**
	 * Area 그래프를 그리는 메소드
	 */
	function __makeSummary(data, intv, sptrX, sptrY, color) {
		// init X
		const fx = d3.scaleLinear()
			.domain(sptrX)/*.nice()*/
			.range([config.padding, config.width - config.padding]);

		// init Y Axis
		const fy = d3.scaleLinear()
			.domain(sptrY).nice()
			.range([config.innerHeight - config.margin.bottom, config.margin.top]);

		// Binding SVG Tag
		const svg = d3.select(config.target).append('svg')
			.attr("class", "cnn-summary")
			.style('width', config.width)
			.style('height', config.innerHeight);

		// Make Group
		const group = svg.append("g").attr("class", "cnn-group").attr("transform", `translate(0, ${intv})`);

		___innerMakeArea(group, data, fx, fy, color);
		___innerMakeLine(group, data, fx, fy);
		___innerMakeDot(group, data, fx, fy, color);
	}

	/**
	 * Area 차트의 선을 그리는 메소드
	 */
	function ___innerMakeLine(group, data, fx, fy) {
		// Make Line Chart
		const line = d3.line()
			.defined(d => !isNaN(d.value))
			.x(d => fx(d.ms))
			.y(d => fy(d.value));

		// Add Line Graph
		group.append('path')
			.datum(data)
			.attr("class", "cnn-line")
			.attr("fill", "none")
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("stroke", "#ccc")
			.attr("stroke-width", 1)
			.attr("d", line)
	}

	/**
	 * Area 차트의 Area를 그리는 메소드
	 */
	function ___innerMakeArea(group, data, fx, fy, color) {
		// Make Area Chart
		const area = d3.area()
			.x(d => fx(d.ms))
			.y0(fy(0))
			.y1(d => fy(d.value));

		// Add Area Graph
		group.append('path')
			.datum(data)
			.attr("class", "cnn-area")
			.attr("fill", color)
			.attr("d", area);
	}

	/**
	 * 최고점에 원과 텍스트를 표시하는 메소드
	 */
	function ___innerMakeDot(group, data, fx, fy, color) {
		// Add Dot
		const dot = (_ => {
			let max = d3.max(data, d => d.value);
			return data.find(e => e.value === max);
		})();

		group.append('circle')
			.attr("class", "cnn-dot")
			.attr("cx", fx(dot.ms))
			.attr("cy", fy(dot.value))
			.attr("r", 3)
			.attr("fill", color)
			.attr("stroke", "#ccc")
			.attr("stroke-width", 1)

		group.append('text')
			.attr("class", "cnn-text")
			.text(dot.value)
			.attr("x", fx(dot.ms))
			.attr("y", fy(dot.value) - 10)
			.attr("text-anchor", "middle")
			.attr("display", "none") // base
			.attr("font-family", "sans-serif") // base
			.attr("font-size", "16px") // base
			.attr("fill", "black") // base
			.attr("font-weight", "bold") // base
	}
}