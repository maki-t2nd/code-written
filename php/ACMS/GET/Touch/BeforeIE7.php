<?php

require_once ACMS_LIB_DIR.'GET.php';

class ACMS_GET_Touch_BeforeIE7 extends ACMS_GET
{
    function get()
    {
		return preg_match("/IE [6-7]/", UA) ? $this->tpl : false ;
    }
}
?>