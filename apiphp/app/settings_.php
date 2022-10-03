<?php
declare(strict_types=1);

use App\Application\Settings\Settings;
use App\Application\Settings\SettingsInterface;
use DI\ContainerBuilder;
use Monolog\Logger;

return function (ContainerBuilder $containerBuilder) {

    // Global Settings Object
    $containerBuilder->addDefinitions([
        SettingsInterface::class => function () {
            return new Settings([
                'displayErrorDetails' => true, // Should be set to false in production
                'logError'            => false,
                'logErrorDetails'     => false,

                'logger' => [
                    'name' => 'slim-app',
                    'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
                    'level' => Logger::DEBUG,
                ],

                'DBApp' => [
                    'host'      => 'localhost',
                    'database'  => 'imoneyq_app3',
                    'user'      => 'prosini',
                    'password'  => 'admin@prosini123',
                    'charset'   => 'utf8'
                ],

                'DBSim' => [
                    'host'      => 'localhost',
                    'database'  => 'imoneyq_dash2',
                    'user'      => 'prosini',
                    'password'  => 'admin@prosini123',
                    'charset'   => 'utf8'
                ]
            ]);
        },

    ]);
};
