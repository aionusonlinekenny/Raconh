<?php
	require 'trace.php';
	//跳过的文件夹或文件(逗号隔开)，如果是目录，只看第一个目录
	define("FILE", "assets,eui_skins,game_skins,default.res.json,default.thm.json");
	//跳过的文件格式(逗号隔开)
	define("FILE_FORMAT", 'js,exe,gitignore,air,html,sh,tmp');
	//跳过文件列表，全局变量
	$skipFiles;			
	//跳过文件格式列表
	$skipFileFormats;
	
	define('ROOT',          str_replace('\\', '/', realpath(dirname(__FILE__))));
	define('CW_TXT', ROOT.'/../main/resource/res/version.txt');
	main();
	
	/**
	 * 过滤文件
	 * @param unknown $fileName
	 * @return boolean
	 */
	function isSkipFile($fileName)
	{
		global $skipFiles;
		global $skipFileFormats;
		if(!isset($skipFiles))$skipFiles = explode(',', FILE);
		foreach ($skipFiles as $value)
		{
			if(strpos($fileName, $value) === 0)
			{
 				//echo '过滤的文件:'.$fileName."\n";
				return true;
			}
		}
		$temp = explode('.', $fileName);
		$format = $temp[count($temp) - 1];
		if(!isset($skipFileFormats))$skipFileFormats = explode(",", FILE_FORMAT);
		foreach($skipFileFormats as $value)
		{
			if($format == $value)
			{
// 				echo '过滤的文件:'.$fileName."\n";
				return true;
			}
		}
		return false;
	}
	
	function getMemory($fileName)
	{
		$temp = explode(".", $fileName);
		$format = $temp[count($temp) - 1];
		switch($format)
		{
			case 'jpg':
			case 'png':
				traceMemory($fileName);
				$pic = getimagesize($fileName);
				$memory = $pic[0] * $pic[1] * 4;
				return $memory;
			case 'cvt':
				traceMemory($fileName);
				$handle = fopen($fileName, 'rb');
				$string = fread($handle, 4);
				$bytes = unpack("N", $string);
				$len = $bytes[1];
				$memory = 0;
				$position = 4;
				while($len > 0)
				{
					fseek($handle, $position);
					$string = fread($handle,4 * 4 + 2);
					$bytes = unpack("N4/na", $string);
					$memory += $bytes[3] *  $bytes[4] * 4;
					$strlen = $bytes["a"];
					$len -= (4 * 4 + 2 + $strlen);
					$position += (4 * 4 + 2 + $strlen);
				}
				fclose($handle);
				return $memory;
			default:
				return 0;
				
		}
		return 0;
	}
	
	/**
	 * 从Git中获取资源的版本号文件，并组成相关的url,版本号，文件大小的信息
	 */
	function genGitVersion()
	{
		$command = 'git ls-files --stage > git.temp';		//写入git.temp临时文件
		exec($command,$output,$return_var);
		if($return_var != 0)
		{
			echo "版本号生成失败!!!!!";
			return;
		}
		$file = fopen('git.temp', "r");						//以只读方式打开git.temp临时文件
		$lines = array();
		while(!feof($file))
		{
			$oneline = fgets($file,4096);
// 			echo $oneline;
			$part = explode(" ", $oneline);					//分隔字符串
			if(count($part) < 2) continue;
			$version = $part[1];
			$part = explode("\t",$part[2]);
			$fileName = trim($part[1]);
			if(isSkipFile($fileName))continue;
			$content = array();
			$size = filesize($fileName);
			$content[0] = substr($version, 0,7);
			$content[1] = $fileName;
			$content[2] = $size;
			$content[3] = getMemory($fileName);
			if($fileName)$lines[] = $content;
// 			echo substr($version, 0, 7)." ".$fileName." ".$size."\n";
		}
		fclose($file);
		unlink('git.temp');								//删除git.temp临时文件
// 		echo '资源数量：'.count($lines)."\n";				//记录版本的资源文件数量
		return $lines;
	}

	/**
	 * 生成version.cs文件。
	 * @param unknown $infos  二维数组，(version,url,size)
	 */
	function createVersion($infos)
	{
		$content = '';
		foreach($infos as $info)
		{
			$version = $info[0];
			$url = $info[1];
			$size = $info[2];
			$memory = $info[3];
			$content .= pack("v",strlen($url)).$url.pack("v",strlen($version)).$version.pack("V",$size).pack("V",$memory);
		}
		//$content = gzcompress($content);
		$file = fopen(CW_TXT, "w");
//		$file = fopen("E:/cw/game2/client/main1/a.txt","w");
		fwrite($file, $content);
		fclose($file);
		echo "版本文件创建完成！\n";
	}
	function main()
	{ 
		echo "创建版本文件\n";
		$t1 = time();
		createVersion(genGitVersion());
		echo "生成版本文件时间 : ". (time() - $t1) . "秒 \n";
	}
?>
