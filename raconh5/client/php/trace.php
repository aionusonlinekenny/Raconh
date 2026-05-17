<?php
	/**
	 * 输出Exel表的数据
	 * @param unknown $xml
	 */
	function traceXML($xml,$url)
	{
		echo '解析文件:'.realpath($url)."\n";
// 		print_r($xml);
	}
	
	function traceMemory($url)
	{
// 		echo "计算内存地址:".$url."\n";
	}
?>