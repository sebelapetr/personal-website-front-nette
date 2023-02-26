<?php

declare(strict_types=1);

namespace App\Presenters;


class PagePresenter extends BasePresenter
{
    public function renderDefault(): void
    {
        $this->getTemplate()->setFile(__DIR__ . "/../templates/Page/default.latte");
    }
}
