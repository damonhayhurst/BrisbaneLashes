<?php

use Illuminate\Database\Seeder;

class CustomersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('customers')->insert([
            'first_name' => 'Steve',
            'last_name' => 'Scanner',
            'addr_1' => '1 Two Street',
            'addr_2' => 'Twun Way',
            'suburb' => 'Oneburg',
            'state' => 'VIC',
            'pcode' => '3008',
            'phone' => '0424558302',
            'email' => 'steve@scanner.com',
            'password' => Hash::make('password'),
            'studio_id' => 1
        ]);
        DB::table('customers')->insert([
            'first_name' => 'Sally',
            'last_name' => 'Scanner',
            'addr_1' => '2 Two Street',
            'addr_2' => 'Twun TWay',
            'suburb' => 'Oneburg',
            'state' => 'VIC',
            'pcode' => '3008',
            'phone' => '0424558303',
            'email' => 'sally@scanner.com',
            'password' => Hash::make('password'),
            'studio_id' => 1
        ]);
        DB::table('customers')->insert([
            'first_name' => 'Solomon',
            'last_name' => 'Scanner',
            'addr_1' => '3 Two Street',
            'addr_2' => 'Twun TWay',
            'suburb' => 'Oneburg',
            'state' => 'VIC',
            'pcode' => '3008',
            'phone' => '0424558304',
            'email' => 'solomon@scanner.com',
            'password' => Hash::make('password'),
            'studio_id' => 2
        ]);
    }
}
