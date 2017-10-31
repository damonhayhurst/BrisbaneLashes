<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Studio::class, function (Faker\Generator $faker) {
    
    return [
        'studio_name' => $faker->unique()->company,
        'studio_abn' =>  $faker->unique()->randomNumber($nbDigits = 11),
        'studio_addr1' => $faker->unique()->streetAddress,
        'studio_addr2' => $faker->unique()->optional()->secondaryAddress,
        'studio_suburb' => $faker->city,
        'studio_pcode' => $faker->randomNumber($nbDigits = 4),
        'studio_state' => $faker->state,
        'studio_phone' => $faker->e164PhoneNumber,
        'studio_email' => $faker->unique()->safeEmail,
        'studio_fax' => $faker->unique()->optional()->e164PhoneNumber
    ];
});
