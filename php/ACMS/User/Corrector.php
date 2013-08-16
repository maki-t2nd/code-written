<?php

class ACMS_User_Corrector
{
    function add2path($txt)
    {
        $patterns = array(
            '/src="(\/.+)"/m',
            '/href="\/(.+)"/m'
        );
        $replace = array(
            'src="/'.DIR_OFFSET.THEMES_DIR.'doho\1"',
            'href="/'.DIR_OFFSET.'\1"'
        );
        return preg_replace($patterns, $replace, $txt);
    }
}

