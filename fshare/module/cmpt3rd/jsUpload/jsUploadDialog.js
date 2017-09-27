// 用户配置
var v_maxNumberOfFiles          = 1;
var v_maxFileSize               = 85000000; // B
var v_suffix                    = '*';
var v_url                       = 'upload';
var formData                    = {  };
var fileList                    = new Array(); // 存储文件
var fileNameList                = new Array(); // 存储文件名，若存在文件名相同，则不会添加
var maxFileList                 = new Array(); // 存储过大的文件名
var overFileNameList            = new Array(); // 存储过多的文件名
var filterIncorrectFileNameList = new Array(); // 文件后缀不匹配

var c_jsUploadFileDialogDiv = '';
c_jsUploadFileDialogDiv += '<div closed="true"  id="jsUploadFileDialogDiv">';
c_jsUploadFileDialogDiv += '<div id="jsUploadFileTitle" >上传</div>';
c_jsUploadFileDialogDiv += '<div id="uploadFileList"></div>';
c_jsUploadFileDialogDiv += '<div class="upload_progress" ><div class="upload_progress_div" ></div></div>';
c_jsUploadFileDialogDiv += '<div  style="width:100%; height:50px;position:relative;top:0px; padding:0px auto;magin:0px auto; ">';
c_jsUploadFileDialogDiv += '<a href="javascript:void(0)" style="float:left;" id="fileUploadAdd" class="jsupload_abtn" onclick="s_uploadBtnClick()" >添加文件</a>';
c_jsUploadFileDialogDiv += '<a href="javascript:void(0)" style="float:right;" id="fileUploadSubmit"  class="jsupload_abtn_disabled" onclick="fileUploadStart()"   >上传</a>';
c_jsUploadFileDialogDiv += '</div>';
c_jsUploadFileDialogDiv += '<div  style="width:100%; height:40px;position:relative;top:0px; padding:0px auto;magin:0px auto; ">';
c_jsUploadFileDialogDiv += '<a href="javascript:void(0)" style="float:right;" id="dialog_fileUploadClose" class="jsupload_abtn" onclick="simpleCloseDialog(\'jsUploadFileDialogDiv\')" >关闭</a>';
c_jsUploadFileDialogDiv += '</div>';
c_jsUploadFileDialogDiv += '<form id="fileupload" style="display:none;" method="POST" enctype="multipart/form-data">';
c_jsUploadFileDialogDiv += '<span class="btn success fileinput-button"> <input id="fileUploadBtn"   type="file" name="files[]" multiple></span>  ';
c_jsUploadFileDialogDiv += '</form>';
c_jsUploadFileDialogDiv += '</div>';

var JsUploadDialog = function(url) {
	if (url) {
		v_url = url;
	}
	$(c_jsUploadFileDialogDiv).dialog({
		title:         '',
		autoOpen:      false,
		modal:         true,
		// width:         360,
		// height:        310,
		resizable:     false,
		closable:      false,
		closeOnEscape: false,
		open:          function(event, ui) {
			$('.ui-dialog-titlebar-close').hide();
		},
	});

	initUploadAll();
};

// 设置标题
JsUploadDialog.prototype.setTitle = function(content) {
	$('#jsUploadFileTitle').html(content);
};

// 设置url
JsUploadDialog.prototype.setUrl = function(v) {
	v_url = v;
};

// 设置单文件最大值
JsUploadDialog.prototype.setMaxFileSize = function(v) {
	v_maxFileSize = v;
};

// 设置文件最多数目
JsUploadDialog.prototype.setMaxNumberOfFiles = function(v) {
	v_maxNumberOfFiles = v;
};

// 设置后缀："\\.xlsx"
JsUploadDialog.prototype.setSuffix = function(v) {
	v_suffix = v;
};

// 设置formData
JsUploadDialog.prototype.setFormData = function(v) {
	formData = v;
};

// 设置上传开始的方法
JsUploadDialog.prototype.setStartCallBackMethod = function(method) {
	$('#fileupload').unbind('fileuploadstart').bind('fileuploadstart', function(e) {
		method();
	});
};

// 设置上传结束的方法
JsUploadDialog.prototype.setCompleteCallBackMethod = function(method) {
	$('#fileupload').unbind('fileuploadstop').bind('fileuploadstop', function(e) {
		method();
		// reset
		s_resetUploadVar();
	});
};

JsUploadDialog.prototype.open = function() {
	$('#jsUploadFileDialogDiv').dialog('open');
};

JsUploadDialog.prototype.close = function() {
	simpleCloseDialog('jsUploadFileDialogDiv');
};

function simpleCloseDialog(v) {
	$('#' + v).dialog('close');
}

// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------

function initUploadAll() {

	$('#fileupload').fileupload({
		autoUpload:        false,
		dataType:          'json',
		multi:             true,
		formAcceptCharset: 'utf-8',
		progressInterval:  100,

	});

	$('#fileupload').bind('fileuploadadd', function(e, data) {
	})
		.bind('fileuploadsubmit', function(e, data) {
		})
		.bind('fileuploadsend', function(e, data) {
		})
		.bind('fileuploaddone', function(e, data) {
		})
		.bind('fileuploadfail', function(e, data) {
		})
		.bind('fileuploadalways', function(e, data) {
		})
		.bind('fileuploadprogress', function(e, data) {
		})
		.bind('fileuploadprogressall', function(e, data) {
			s_changePrograss(e, data);
		})
		.bind('fileuploadstart', function(e) {

		})
		.bind('fileuploadstop', function(e) {
			s_uploadComplete();
			// reset
			s_resetUploadVar();
		})
		.bind('fileuploadchange', function(e, data) {
			// change file list
			s_onchange(e, data);
		}).bind('fileuploadpaste', function(e, data) {
	}).bind('fileuploaddrop', function(e, data) {
	}).bind('fileuploaddragover', function(e) {
	}).bind('fileuploadchunksend', function(e, data) {
	}).bind('fileuploadchunkdone', function(e, data) {
	}).bind('fileuploadchunkfail', function(e, data) {
	}).bind('fileuploadchunkalways', function(e, data) {
	});
}

//开始上传
function fileUploadStart() {
	$('#fileupload').fileupload({
		url:      v_url,
		formData: formData,
	});
	if (fileList.length > 0) { // 若文件列表为空,则跳转
		$('#fileUploadSubmit').attr('class', 'jsupload_abtn_disabled');
		$('#fileUploadAdd').attr('class', 'jsupload_abtn_disabled');
		$('.upload_item_del').hide();
		$('#fileupload').fileupload('send', {
			files: fileList,
		});
	}
}

//上传完成触发的函数
function s_uploadComplete() {

}

// 触发进度条
function s_changePrograss(e, data) {
	var result = ( data.loaded / data.total * 100 ).toString();
	result     = result.substring(0, result.indexOf('.') > -1 ? result.indexOf('.') + 2 : 3) + '%';
	$('.upload_progress_div').css('width', result);
}

// 文件改变后触发的函数
function s_onchange(e, data) {

	var v_suffix_str = s_parse_suffix(v_suffix);	// 解析后缀

	var fileTypeReg = new RegExp('\\\\*(' + v_suffix_str + ')$');  // 文件类型
	$.each(data.files, function(index, file) {
		if (fileNameList.indexOf(file.name) == -1) { // 若不存在文件名，则添加
			var appendAble = true;
			// file.size 判断大小
			if (file.size > v_maxFileSize) {	//文件过大,则不存放文件，并记录
				maxFileList.push(file);
				appendAble = false;
			}
			if (index > v_maxNumberOfFiles - 1) { // 文件超出数目
				overFileNameList.push(file.name);
				appendAble = false;
			}
			if (!fileTypeReg.test(file.name)) { // 文件后缀不匹配
				filterIncorrectFileNameList.push(file.name);
				appendAble = false;
			}
			if (appendAble) {
				fileList.push(file);
				fileNameList.push(file.name);
				$('#uploadFileList').append('<div class="upload_item_div" ><div class="upload_item" ><div class="upload_item_name" title="' + file.name + '(' + s_parseFileSize(file.size) + ')' + '" >'
					+ file.name + '(' + s_parseFileSize(file.size) + ')' + '</div><div class="upload_item_del" onclick="uploadDelItem(this)" title="cancel"   >X</div></div></div>');
			}
		}
	});

	// 列出选择中出现的文件问题
	warnning_maxFiles();	// 文件过大
	warnning_overFiles();	// 超出文件数
	warnning_filterFiles(); // 过滤文件名
	s_change_btn_status_fileUploadSubmit();
}

// 解析后缀
function s_parse_suffix(v) {
	var v_suffix_str = '';
	v_suffixs        = v.split(',');
	for (var i = 0; i < v_suffixs.length; i++) {
		v_suffix_str += '\\.' + v_suffixs[i];
		if (i < v_suffixs.length - 1) {
			v_suffix_str += '|';
		}
	}
	return v_suffix_str;
}

// 文件过大
function warnning_maxFiles() {
	var content = '';
	for (var i = 0; i < maxFileList.length; i++) {
		content += maxFileList[i].name + '(' + s_parseFileSize(maxFileList[i].size) + ') 文件超出限额' + s_parseFileSize(v_maxFileSize) + '<br/>';
	}
	if (content != '') {
		alert(content);
	}
}

// 超出文件数
function warnning_overFiles() {
	var content = '';
	for (var i = 0; i < overFileNameList.length; i++) {
		content += overFileNameList[i] + '<br/>';
	}
	if (content != '') {
		content = '超出文件数上线(' + v_maxNumberOfFiles + ')<br/>' + content;
		alert(content);
	}
}

// 文件后缀不符合要求
function warnning_filterFiles() {
	var content = '';
	for (var i = 0; i < filterIncorrectFileNameList.length; i++) {
		content += filterIncorrectFileNameList[i] + '<br/>';
	}
	if (content != '') {
		//
		content = '文件名不符合要求:' + content;
		alert(content);
	}
}

// 解析文件大小
function s_parseFileSize(num) {

	var num_size       = num.toString().length;
	var num_split_area = parseInt((num_size % 3 == 0) ? num_size / 3 : num_size / 3 + 1);
	var result         = '';
	if (num_split_area > 4) {
		result = (num / 1024000000000).toString();
		return result.substring(0, result.indexOf('.') > -1 ? result.indexOf('.') + 2 : 3) + ' GGB';
	} else if (num_split_area > 3) {
		result = (num / 1024000000).toString();
		return result.substring(0, result.indexOf('.') > -1 ? result.indexOf('.') + 2 : 3) + ' GB';
	} else if (num_split_area > 2) {
		result = (num / 1024000).toString();
		return result.substring(0, result.indexOf('.') > -1 ? result.indexOf('.') + 2 : 3) + ' MB';
	} else if (num_split_area > 1) {
		result = (num / 1024).toString();
		return result.substring(0, result.indexOf('.') > -1 ? result.indexOf('.') + 2 : 3) + ' KB';
	} else {
		return result + ' B';
	}

}

// 重置所有upload的var
function s_resetUploadVar() {
	fileList                    = new Array();
	fileNameList                = new Array();
	maxFileList                 = new Array();
	overFileNameList            = new Array();
	filterIncorrectFileNameList = new Array();
	$('#uploadFileList').empty();
	$('#fileUploadSubmit').attr('class', 'jsupload_abtn_disabled');
	$('#fileUploadAdd').attr('class', 'jsupload_abtn');
	$('.upload_progress_div').css('width', '0%');
}

// 改变上传按钮状态
function s_change_btn_status_fileUploadSubmit() {
	if ($.trim($('#uploadFileList').html()) == '') {
		$('#fileUploadSubmit').attr('class', 'jsupload_abtn_disabled');
	} else {
		$('#fileUploadSubmit').attr('class', 'jsupload_abtn');
	}
}

// 点击了file
function s_uploadBtnClick() {
	$('#fileUploadBtn').click();
}

// 删除文件
function uploadDelItem(v) {
	var delNum = fileNameList.indexOf($(v).prev().text());
	fileNameList.splice(delNum, 1);
	fileList.splice(delNum, 1);
	$(v).parent().parent().remove();
	s_change_btn_status_fileUploadSubmit();
}

// 清空列表(暂时不用)
function fileUploadClearAll() {
	s_resetUploadVar();
}

function start() {
}

function complete() {
	alert('上传结束');
}

// 重载的方法 覆盖默认 =======================================
// 文件过大:maxFileList
function warnning_maxFiles() {
	var content = '';
	for (var i = 0; i < maxFileList.length; i++) {
		content += maxFileList[i].name + '(' + s_parseFileSize(maxFileList[i].size) + ') 文件超出限额' + s_parseFileSize(v_maxFileSize) + '<br/>';
	}
	if (content != '') {
		alert(content);
	}
}

// 超出文件数:overFileNameList
function warnning_overFiles() {
	var content = '';
	for (var i = 0; i < overFileNameList.length; i++) {
		content += overFileNameList[i] + '<br/>';
	}
	if (content != '') {
		content = '超出文件数上线(' + v_maxNumberOfFiles + ')<br/>' + content;
		alert(content);
	}
}

// 过滤文件名:filterIncorrectFileNameList
function warnning_filterFiles() {
	var content = '';
	for (var i = 0; i < filterIncorrectFileNameList.length; i++) {
		content += filterIncorrectFileNameList[i] + '<br/>';
	}
	if (content != '') {
		content = '文件名不符合要求:' + content;
		alert(content);
	}
}
