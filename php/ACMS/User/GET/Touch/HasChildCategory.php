<?php
class ACMS_User_GET_Touch_HasChildCategory extends ACMS_GET
{
    var $_scope = array(
        'cid'   => 'global',
    );
    function get()
    {
      $DB     = DB::singleton(dsn());
      $SQL    = SQL::newSelect('category');
      $SQL->addSelect('category_id');
      $SQL->addWhereOpr('category_parent', $this->cid);
      $q  = $SQL->get(dsn());
      $res = $DB->query($q, 'all');

      return ( count($res) > 0 ) ? $this->tpl : false;
    }
}