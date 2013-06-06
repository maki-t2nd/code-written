<?php

require_once ACMS_LIB_DIR.'GET.php';

class ACMS_User_GET_Touch_Root extends ACMS_GET
{
    function get()
    {
		return (BID == 1 && VIEW == 'top') ? $this->tpl : false ;
    }
}