<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(MasterStaffTableSeeder::class);
        $this->call(StudioTableSeeder::class);
        $this->call(StudioStaffTableSeeder::class);
        $this->call(CustomersTableSeeder::class);
    }
}
