<?php

use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
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
            'client_id' => 1,
            'studio_id' => 1,
            'all_day' => false
        ]);
            
    }
}
