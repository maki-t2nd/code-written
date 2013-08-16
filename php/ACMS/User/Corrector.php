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
            'src="/'.DIR_OFFSET.THEMES_DIR.'hoge\1"',
            'href="/'.DIR_OFFSET.'\1"'
        );
        return preg_replace($patterns, $replace, $txt);
    }

    function strRep($txt, $args = array())
    {
        $replace = $args[0];
        $search = array_slice($args, 1);

        $str = str_replace($search, $replace, $txt);
        return $str;
    }
}

