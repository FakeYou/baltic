var gulp = require('gulp');
var shell = require('gulp-shell');
var clean = require('gulp-clean');

gulp.task('generate', function() {
	gulp.src(['public/geo/countries.json', 'public/geo/seas.json', 'public/geo/baltic.json'], { read: false })
		.pipe(clean());

	gulp.start('ogr2ogr');
	gulp.start('topojson');
});

gulp.task('ogr2ogr', shell.task([
	'ogr2ogr ' +
	'-f GeoJSON ' +
	'-where "iso_a3 IN (\'SWE\', \'DNK\', \'DEU\', \'POL\', \'RUS\', \'LTU\', \'LVA\', \'EST\', \'FIN\', \'NOR\', \'NLD\', \'BLR\')" ' +
	'public/geo/countries.json ' + 
	'resources/ne_50m_admin_0_countries/ne_50m_admin_0_countries.shp',

	'ogr2ogr ' + 
	'-f GeoJSON ' +
	'-where "id IN (\'1a\', \'1b\', \'1c\', \'1\', \'2\')" ' +
	'public/geo/seas.json ' +
	'resources/seas/World_Seas.shp'
]));

gulp.task('topojson', shell.task([
	'topojson ' +
	'-o public/geo/baltic.json ' +
	'--properties name=NAME ' +
	'-- public/geo/countries.json public/geo/seas.json'
]));