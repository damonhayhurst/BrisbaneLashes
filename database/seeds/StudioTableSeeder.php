<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class StudioTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('studios')->insert([
            'name' => 'Studio One',
            'abn' => '12345678900',
            'addr_1' => '1 One Street',
            'addr_2' => 'Wun Way',
            'suburb' => 'Oneburg',
            'state' => 'VIC',
            'pcode' => '3008',
            'phone' => '0424558301',
            'email' => 'one@one.com',
        ]);
        DB::table('studios')->insert([
            'name' => 'Studio Two',
            'abn' => '11111121201',
            'addr_1' => '2 Way Street',
            'addr_2' => 'Too ting',
            'suburb' => 'Twoting',
            'state' => 'NSW',
            'pcode' => '3002',
            'phone' => '0424558302',
            'email' => 'two@one.com',
        ]);
        DB::table('studios')->insert([
            'name' => 'Third The Studio',
            'abn' => '33311121201',
            'addr_1' => '3D Mansion',
            'addr_2' => 'Third Street',
            'suburb' => 'Threeford',
            'state' => 'VIC',
            'pcode' => '3333',
            'phone' => '0414367843',
            'email' => 'three@one.com',
        ]);
    }
}
