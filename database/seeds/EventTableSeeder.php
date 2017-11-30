<?php

use Illuminate\Database\Seeder;

class EventTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('events')->insert([
            'employee_created_id' => 1,
            'employee_assigned_id' => 1,
            'client_id' => null, 
            'studio_id' => 1,
            'start' => '2017-11-19 00:00:00',
            'end' => '2017-11-20 00:00:00',
            'price' => null,
            'notes' => 'weekend',
            'category' => 'unavailable'
        ]);
        DB::table('events')->insert([
            'employee_created_id' => 1,
            'employee_assigned_id' => 1,
            'client_id' => null, 
            'studio_id' => 1,
            'start' => '2017-11-25 00:00:00',
            'end' => '2017-11-26 00:00:00',
            'price' => null,
            'notes' => 'weekend',
            'category' => 'unavailable'
        ]);
        DB::table('events')->insert([
            'employee_created_id' => 1,
            'employee_assigned_id' => 1,
            'client_id' => null, 
            'studio_id' => 1,
            'start' => '2017-11-24 00:00:00',
            'end' => '2017-11-25 00:00:00',
            'price' => null,
            'notes' => null,
            'category' => 'holiday'
        ]);
        DB::table('events')->insert([
            'employee_created_id' => 1,
            'employee_assigned_id' => 1,
            'client_id' => 2, 
            'studio_id' => 1,
            'start' => '2017-11-20 09:00:00',
            'end' => '2017-11-20 11:00:00',
            'price' => 34.00,
            'notes' => null,
            'category' => 'appointment'
        ]);
        DB::table('events')->insert([
            'employee_created_id' => 1,
            'employee_assigned_id' => 1,
            'client_id' => 3, 
            'studio_id' => 1,
            'start' => '2017-11-20 12:45:00',
            'end' => '2017-11-20 13:45:00',
            'price' => 35.00,
            'notes' => null,
            'category' => 'appointment'
        ]);
        DB::table('events')->insert([
            'employee_created_id' => 1,
            'employee_assigned_id' => 1,
            'client_id' => 2, 
            'studio_id' => 1,
            'start' => '2017-11-23 11:30:00',
            'end' => '2017-11-23 13:00:00',
            'price' => 356.00,
            'notes' => null,
            'category' => 'appointment'
        ]);
    }
}
