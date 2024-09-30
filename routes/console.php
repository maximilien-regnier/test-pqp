<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('api:update-trending-movies')->daily();
