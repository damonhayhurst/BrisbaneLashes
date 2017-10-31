<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class MasterStaffTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('master_staff')->insert([
            'name' => 'Damon',
            'email' => 'damonhayhurst@gmail.com',
            'password' => Hash::make('password'),
        ]);
        DB::table('master_staff')->insert([
                'name' => 'Alvin',
                'email' => 'alvin@asshole.uy',
                'password' => Hash::make('password'),
        ]);     
    }
}
