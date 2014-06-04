d3.json('public/geo/baltic.json', function(error, baltic) {

	console.log(baltic);

	var countries = topojson.feature(baltic, baltic.objects.countries);
	var seas = topojson.feature(baltic, baltic.objects.seas);

	console.log(countries);

	var width = 1280;
	var height = 720;

	var svg = d3.select('body').append('svg')
		.attr('width', width)
		.attr('height', height);

	var projection = d3.geo.mercator()
		.scale(1)
		.translate([0, 0]);

	var path = d3.geo.path()
		.projection(projection);

	var bounds = path.bounds(seas);

	var scale = .85 / Math.max(
		(bounds[1][0] - bounds[0][0]) / width,
		(bounds[1][1] - bounds[0][1]) / height);
	var translate = [
		(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
		(height - scale * (bounds[1][1] + bounds[0][1])) / 2
	];

	projection
		.scale(scale)
		.translate(translate);

	svg.append('g')
		.selectAll('path')
		.data(countries.features)
		.enter().append('path')
			.attr('class', 'country')
			.attr('d', path);

	svg.append('g')
		.append('path')
			.datum(topojson.mesh(baltic, baltic.objects.countries, function(a, b) { return a !== b }))
			.attr('d', path)
			.attr('class', 'borders')

	svg.append('g')
		.selectAll('path')
		.data(seas.features)
		.enter().append('path')
			.attr('class', 'sea')
			.attr('d', path);
});