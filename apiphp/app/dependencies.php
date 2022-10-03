<?php

declare(strict_types=1);

use App\Application\Settings\SettingsInterface;
use DI\ContainerBuilder;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Monolog\Processor\UidProcessor;
use Psr\Container\ContainerInterface;
use Psr\Log\LoggerInterface;
use App\Model\Connection\DBApp;
use App\Model\Connection\DBSim;
use App\Model\Connection\DBCore;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
        LoggerInterface::class => function (ContainerInterface $c) {
            $settings = $c->get(SettingsInterface::class);

            $loggerSettings = $settings->get('logger');
            $logger = new Logger($loggerSettings['name']);

            $processor = new UidProcessor();
            $logger->pushProcessor($processor);

            $handler = new StreamHandler($loggerSettings['path'], $loggerSettings['level']);
            $logger->pushHandler($handler);

            return $logger;
        },

        DBApp::class => function (ContainerInterface $c) {
            $settings = $c->get(SettingsInterface::class);

            $config = $settings->get('DBApp');

            $host = $config['host'];
            $database = $config['database'];
            $user = $config['user'];
            $password = $config['password'];
            $charset = $config['charset'];

            $dsn = "mysql:host=" . $host . ";dbname=" . $database . ";charset=" . $charset;
            $pdo = new DBApp($dsn, $user, $password);

            $pdo->setAttribute(DBApp::ATTR_ERRMODE, DBApp::ERRMODE_EXCEPTION);
            $pdo->setAttribute(DBApp::ATTR_DEFAULT_FETCH_MODE, DBApp::FETCH_ASSOC);

            return $pdo;
        },

        DBCore::class => function (ContainerInterface $c) {
            $settings = $c->get(SettingsInterface::class);

            $config = $settings->get('DBCore');

            $host = $config['host'];
            $database = $config['database'];
            $user = $config['user'];
            $password = $config['password'];
            $charset = $config['charset'];

            $dsn = "mysql:host=" . $host . ";dbname=" . $database . ";charset=" . $charset;
            $pdo = new DBCore($dsn, $user, $password);

            $pdo->setAttribute(DBCore::ATTR_ERRMODE, DBCore::ERRMODE_EXCEPTION);
            $pdo->setAttribute(DBCore::ATTR_DEFAULT_FETCH_MODE, DBCore::FETCH_ASSOC);

            return $pdo;
        },

        DBSim::class => function (ContainerInterface $c) {
            $settings = $c->get(SettingsInterface::class);

            $config = $settings->get('DBSim');

            $host = $config['host'];
            $database = $config['database'];
            $user = $config['user'];
            $password = $config['password'];
            $charset = $config['charset'];

            $dsn = "mysql:host=" . $host . ";dbname=" . $database . ";charset=" . $charset;
            $pdo = new DBSim($dsn, $user, $password);

            $pdo->setAttribute(DBSim::ATTR_ERRMODE, DBSim::ERRMODE_EXCEPTION);
            $pdo->setAttribute(DBSim::ATTR_DEFAULT_FETCH_MODE, DBSim::FETCH_ASSOC);

            return $pdo;
        },

    ]);
};
