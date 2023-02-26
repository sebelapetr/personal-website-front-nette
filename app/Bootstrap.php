<?php

declare(strict_types=1);

namespace App;

use Nette\Bootstrap\Configurator;
use Tracy\Debugger;

class Bootstrap
{

	public static function boot(): Configurator
	{
		$configurator = new Configurator;
		$appDir = dirname(__DIR__);

        define("WWW_DIR", __DIR__.'/../www');
        define("ROOT_DIR", __DIR__.'/../');
        define("LOG_DIR", __DIR__.'/../log');
        define("APP_DIR", __DIR__.'/../app');

		$configurator->enableTracy($appDir . '/log');

		$configurator->setTimeZone('Europe/Prague');
		$configurator->setTempDirectory($appDir . '/temp');

		$configurator->createRobotLoader()
			->addDirectory(__DIR__)
			->register();

        $configurator->addConfig($appDir . '/app/config/common.neon');
        $configurator->addConfig($appDir . '/app//config/local.neon');

		return $configurator;
	}
}
