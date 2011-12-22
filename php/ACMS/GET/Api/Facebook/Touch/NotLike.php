<?php

require_once ACMS_LIB_DIR.'GET.php';
require_once ACMS_LIB_DIR.'GET/Api/Facebook/Touch/signed_request.php';

class ACMS_GET_Api_Facebook_Touch_NotLike extends ACMS_GET
{
    function get()
    {
		$facebook_app_secret = config('facebook_app_secret');
		if ( isset($_POST['signed_request']) ) {
			$fb_data = parse_signed_request($_POST['signed_request'], $facebook_app_secret);
			return ($fb_data['page']['liked']) ? false : $this->tpl;
		}

/*		if (isset($_POST['signed_request'])) {
			list($encoded_sig, $payload) = explode('.', $_POST['signed_request'], 2); 
			$data = json_decode(base64_decode(strtr($payload, '-_', '+/')), true);
		}

		if ($data && $data['page']['liked']) {
			return false;
		} else {
			return $this->tpl;
		}
*/    }
}

