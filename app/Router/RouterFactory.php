<?php

declare(strict_types=1);

namespace App\Router;

use Nette;
use Nette\Application\Routers\Route;
use Nette\Application\Routers\RouteList;


final class RouterFactory
{
	use Nette\StaticClass;

	public static function createRouter(): RouteList
	{
		$router = new RouteList;

        $router->addRoute('projects', 'Page:projects');
        $router->addRoute('blog', 'Page:blog');
        $router->addRoute('<presenter>/<action>[/<id>]', 'Page:homepage');

		return $router;
	}
}
