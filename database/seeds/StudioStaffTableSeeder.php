<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class StudioStaffTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('studio_staff')->insert([
            'first_name' => 'Barbara',
            'last_name' => 'Canning',
            'studio_id' => 1,
            'email' => 'barbara@gmail.com',
            'password' => Hash::make('password'),
        ]);
        DB::table('studio_staff')->insert([
            'first_name' => 'Alex',
            'last_name' => 'Jones',
            'studio_id' => 2,
            'email' => 'alex@gmail.com',
            'password' => Hash::make('password123'),
        ]);     
    }
}
