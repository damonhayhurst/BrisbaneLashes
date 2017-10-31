<?php

namespace Tests\Unit;

use Tests\TestCase;
use Mockery;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
* Unit tests for StudioController
*/
class StudioControllerTest extends TestCase
{
    public function setUp() {
        parent::setUp();
        Mockery::mock('Eloquent');
        $this->mock = \Mockery::mock('Studio');
    }
    
    public function tearDown() {
        \Mockery::close();
    }
    
    /**
    * Test index function for api call
    */
    public function testIndex() {
        $this->mock
             ->shouldReceive('get')
             ->once();
        $response = $this->call('GET', 'api/studio');
        $studios = $response->original;
        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $studios);
    }
    
    public function testStore() {
        $this->mock
             ->shouldRecieve('save')
             ->once();
        $response = $this->call('POST', 'api/studio');
    }
        
        
}
