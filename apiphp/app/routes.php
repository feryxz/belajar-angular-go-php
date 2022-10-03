<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

use App\Helpers\AuthMiddleware;
use App\Helpers\LogMiddleware;
use App\Routes\Bsi\BSITagihan;
use App\Routes\Email\Email;
use App\Routes\Sismonev\ZisRutin;
// use App\Model\Connection\DBApp;

return function (App $app) {
    $app->add(function ($request, $handler) {
        $response = $handler->handle($request);
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Credentials', 'true')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    });

    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->get('/', function (Request $request, Response $response) {
        $callback['success'] = false;
        $callback['msg'] = 'Error 404, Page Not Found';

        $response->getBody()->write(json_encode($callback));
        return $response->withStatus(404);
    });

    $app->group('/test', function (Group $group) {
        $group->get('/data/get', ZisRutin::class . ':TestGet');
        $group->post('/data/add', ZisRutin::class . ':TestAdd');
        $group->post('/data/edit', ZisRutin::class . ':TestEdit');
        $group->post('/data/delete', ZisRutin::class . ':TestDelete');
    });
};
