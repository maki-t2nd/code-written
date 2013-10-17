<?php

class ACMS_User_Corrector
{
    // ユニット内に書いたhtmlソースの、aタグのhrefとimgタグのsrcをカレントテーマの該当パスにつなげる
    /*
    *   /themes/system/include/column.html の21行目近辺にこうする
    *   <!-- BEGIN none -->{text}[raw|add2path]<!-- END none -->
    */
    function add2path($txt)
    {
        $patterns = array(
            '/src="(\/.+)"/m',
            '/href="\/(.+)"/m'
        );
        $replace = array(
            'src="/' . DIR_OFFSET . THEMES_DIR . config('theme') . '\1"',
            'href="/' . DIR_OFFSET . '\1"'
        );
        return preg_replace($patterns, $replace, $txt);
    }

    // 指定した変数の特定の文字を、指定した文字に置き換える
    /*
    *   - を _ に置き換える場合
    *   {hoge}[strRep('_', '-')]
    */
    function strRep($txt, $args = array())
    {
        $replace = $args[0];
        $search = array_slice($args, 1);

        $str = str_replace($search, $replace, $txt);
        return $str;
    }
}

