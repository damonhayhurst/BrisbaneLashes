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

mix.js(['resources/app/shared/module.js', 'resources/app/master-admin/module.js', 'resources/app/studio/studio-customer/module.js', 'resources/app/studio/studio-staff/module.js', 'resources/app/studio/module.js', 'resources/app/app.js', 'resources/app/routes.js'], 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');

mix.combine(['resources/app/shared/module.js', 'resources/app/master-admin/module.js', 'resources/app/studio/studio-customer/module.js', 'resources/app/studio/studio-staff/module.js', 'resources/app/studio/module.js', 'resources/app/app.js', 'resources/app/routes.js'], 'public/app/app.js');
mix.combine(['resources/app/shared/controllers/*', 'resources/app/master-admin/controllers/*', 'resources/app/studio/controllers/*', 'resources/app/studio/studio-staff/controllers/*', 'resources/app/studio/studio-customer/controllers/*'], 'public/app/controllers.js');
mix.combine(['resources/app/shared/directives/*', 'resources/app/master-admin/directives/*', 'resources/app/studio/directives/*', 'resources/app/studio/studio-staff/directives/*', 'resources/app/studio/studio-customer/directives/*'], 'public/app/directives.js');
mix.copy(['resources/app/shared/templates/*', 'resources/app/master-admin/templates/*','resources/app/studio/templates/*', 'resources/app/studio/studio-staff/templates/*', 'resources/app/studio/studio-customer/templates/*'], 'public/app/templates');
