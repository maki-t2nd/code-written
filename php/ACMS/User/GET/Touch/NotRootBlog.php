<?php

class ACMS_User_GET_Touch_NotRootBlog extends ACMS_GET
{
    function get()
    {
    return (BID == 1) ? false : $this->tpl ;
    }
}