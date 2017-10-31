let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js(['resources/app/master-admin/module.js', 'resources/app/studio/module.js', 'resources/app/app.js'], 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');

mix.combine(['resources/app/master-admin/module.js', 'resources/app/studio/module.js', 'resources/app/app.js'], 'public/app/app.js');
mix.combine(['resources/app/*/controllers/*'], 'public/app/controllers.js');
mix.combine(['resources/app/*/services/*'], 'public/app/services.js');
mix.copy(['resources/app/master-admin/templates'], 'public/app/templates');
mix.copy(['resources/app/studio/templates'], 'public/app/templates');
