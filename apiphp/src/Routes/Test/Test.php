<?php

declare(strict_types=1);

namespace App\Routes\Test;

use App\Model\Connection\DBApp;
use App\Model\Connection\DBSim;
use App\Model\Connection\DBCore;

class Test
{
    private $status;
    private $db_app;
    private $db_sim;
    private $mainLib;
    private $mode;
    private $sismonev2_url;

    public function __construct(
        DBApp $db_app,
        DBSim $db_sim,
        DBCore $db_core,
        MainHelper $mainLib,
        ModeHelper $modeLib
    ) {
        $this->status = 200;
        $this->db_app = $db_app;
        $this->db_core = $db_core;
        $this->db_sim = $db_sim;
    }

    public function __invoke($request, $response, $args)
    {
        $callback['success'] = false;
        $callback['msg'] = '404 - NOT FOUND';
        $response->getBody()->write(json_encode($callback));
        return $response->withStatus($this->status);
    }

    public function TestGet($request, $response, $args)
    {
        try {
            $param = $request->getParsedBody();
            $db = $this->db_core;

            $stmt = $db->prepare('SELECT * FROM data');
            $stmt->execute();
            $data = $stmt->fetchAll();

            $callback['success'] = true;
            $callback['data'] = $data;
        } catch (Exception $err) {
            $callback['success'] = false;
            $callback['msg'] = $err;
        }
        $response->getBody()->write(json_encode($callback));
        return $response->withStatus($this->status);
    }

    public function TestAdd($request, $response, $args)
    {
        try {
            $param = $request->getParsedBody();
            $db = $this->db_core;

            $user = $param["user"];
            $alamat = $param["alamat"];

            $stmt = $db->prepare('INSERT INTO table (user, alamat) VALUES (:user, :alamat)');
            $stmt->execute(array(
                'noref'         => $user,
                'noref'         => $alamat,
            ));

            $callback['success'] = true;
            $callback['msg'] = "Berhasil";
        } catch (Exception $err) {
            $callback['success'] = false;
            $callback['msg'] = $err;
        }
        $response->getBody()->write(json_encode($callback));
        return $response->withStatus($this->status);
    }
}
