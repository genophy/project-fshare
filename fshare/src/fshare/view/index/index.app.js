var Clipboard = require('clipboard');

$(function() {

	var globalPathNames = '';
	var dialogUpload    = new JsUploadDialog();

	var local = function() {
		$.ajax({
			url:     '/rest/address/getlocal',
			data:    null,
			type:    'get',
			success: function() {
				alert('success');
			},
			fail:    function() {
				alert('fail');
			},
		});
	};

	var selectable = function() {
		return $('body').hasClass('selectable');
	};

	/**
	 *
	 * @param flag
	 */
	var changeGlobalChkbox = function(flag) {
		$('.global-chk-box').removeClass('select-1').removeClass('select-2');
		if (undefined !== flag) {
			if (2 === flag) {
				$('.global-chk-box').addClass('select-2');
				$('.file-list .chk-box').addClass('select-2');
				if (0 < $('.file-list .chk-box').length) {
					$('.checkable-show ').show();
				}
			} else if (1 === flag) {
				$('.global-chk-box').addClass('select-1');
				if (0 < $('.file-list .chk-box').length) {
					$('.checkable-show ').show();
				}
			} else {
				$('.file-list .chk-box').removeClass('select-2');
				$('.checkable-show ').hide();
			}

		} else {
			var chkCount = 0;
			var fileChks = $('.file-list').find('.chk-box');
			for (var i = 0; i < fileChks.length; i++) {
				if ($(fileChks[i]).hasClass('select-2')) {
					chkCount++;
				}
			}

			if (0 < chkCount) {
				$('.global-chk-box').addClass(chkCount === fileChks.length ? 'select-2' : 'select-1');
				if (0 < $('.file-list .chk-box').length) {
					$('.checkable-show ').show();
				}
			} else {
				$('.checkable-show ').hide();
			}
		}

	};

	/**
	 *
	 * @param pathNamesArr
	 */
	var fillDirCrumbs = function(pathNames) {
		globalPathNames    = pathNames;
		var pathNamesArr = pathNames.split('/');
		pathNamesArr.forEach(function(item) {
			if (item) {
				var $dirChild = $('<div class="dir__child">');
				$dirChild.text(item);
				$dirChild.on('click', function() {
					if (!selectable()) {
						var pathName = '';

						$(this).nextAll().remove();
						var vChildren = $(this).parent().children();
						for (var i = 0; i < vChildren.length; i++) {
							pathName += '/' + $(vChildren[i]).text();
						}
						cdDir(pathName);
					}

				});
				$('.path-children').append($dirChild);
			}

		});
	};

	/**
	 *
	 * @param list
	 */
	var fillFileList = function(pathNames, list) {
		changeGlobalChkbox(0);
		if (list && 0 < list.length) {
			list.forEach(function(item) {
				var $temp = $('<div class="item">');
				var $chk  = $('<div class="item--check chk-box">');
				var $div  = $('<div class="item--name">');
				$div.text(item.fileName);

				$temp.append($chk).append($div);
				// if file is directory, can click
				if ('true' === item['isDir']) {
					$temp.addClass('dir');
				}

				$temp.on('click', function() {
					if (!selectable()) {
						if ('true' === item.isDir) {
							cdDir(pathNames + '/' + item.fileName);
						}
					} else {
						var chk = $(this).find('.chk-box');
						chk.toggleClass('select-2');
						changeGlobalChkbox();
					}

				});

				$('.file-list').append($temp);
			});
		}
	};

	/**
	 *
	 * @param pathNames
	 */
	var cdDir = function(pathNames) {
		dialogUpload.close();
		$('iframe').remove();
		// set path-children
		if ('.' === pathNames || !pathNames) {
			pathNames = '';
		}
		pathNames = pathNames.replace(/^.?\//, '');

		$.post('/rest/file/ls',
			{
				pathNames: pathNames,
			},
			function(list, status) {
				$('.file-list').empty();
				$('.path-children').empty();

				fillDirCrumbs(pathNames);
				fillFileList(pathNames, list);

			});
	};

	/**
	 *
	 */
	var reloadDir = function() {
		dialogUpload.close();
		$('iframe').remove();
		$('.dialog-window.operate').addClass('hidden');
		if ($('body').hasClass('selectable')) {
			$('.btn-select-toggle').click();
		}
		if ($('.dir__children .dir__child:last-child')[0]) {
			$('.dir__children .dir__child:last-child').click();
		} else {
			$('.path-root').click();
		}

	};

	/**
	 *
	 * @param url
	 */
	function downloadAll(files) {
		if (files.length == 0) return;
		var file = files.pop();

		var iframe           = document.createElement('iframe');
		iframe.src           = file;
		iframe.style.display = 'none';
		document.body.appendChild(iframe);
		// $iframe.remove();
		downloadAll(files);
	}

	/**
	 * 根目录点击
	 */
	$('.path-root').on('click', function(e) {

		e.preventDefault();
		if (!selectable()) {
			cdDir();
		}
	});

	$('.global-chk-box').on('click', function(e) {

		e.preventDefault();
		if ($(this).hasClass('select-1') || $(this).hasClass('select-2')) {
			$(this).removeClass('select-1').removeClass('select-2');
			$('.file-list .chk-box').removeClass('select-2');
		} else {
			$(this).addClass('select-2');
			$('.file-list .chk-box').addClass('select-2');
		}
	});

	$('.btn-dialog-open').on('click', function(e) {

		e.preventDefault();
		var op = $(this).attr('op-target');
		$('.dialog-window.operate').addClass('hidden');
		$('.dialog-window.operate[op-name=' + op + ']').removeClass('hidden');
	});

	$('.dialog-window.operate .ctrl__slide__shadow , .dialog-window.operate .dialog-close').on('click', function() {
		$('.dialog-window.operate').addClass('hidden');
	});

	$('.btn-select-toggle').on('click', function(e) {

		e.preventDefault();
		$('body').toggleClass('selectable');
		changeGlobalChkbox(0);

	});

	$('.btn-file-rm').on('click', function(e) {

		e.preventDefault();
		var selectedChks    = $('.file-list>.item>.select-2');
		var selectedFileArr = [];

		for (var i = 0; i < selectedChks.length; i++) {
			selectedFileArr.push(globalPathNames + '/' + $(selectedChks[i]).next().text());
		}
		console.log(selectedFileArr);
		$.ajaxSettings.traditional = true;
		$.post('/rest/file/rm', {
			pathNamesList: selectedFileArr,
		}, function(data) {
			reloadDir();
		});
	});

	$('.btn-download').on('click', function(e) {

		e.preventDefault();
		var allChk = $('.file-list .chk-box.select-2');

		var files = [];
		for (var i = 0; i < allChk.length; i++) {
			files.push('/rest/file/download?fileName=' + globalPathNames + ('/' + $(allChk[i]).next().text()).replace('/', '---'));
		}
		downloadAll(files);

	});

	var initIpAddress = function() {
		$.get('/rest/address/getlocal', function(data) {
			$('.ip-address').val('http://' + data + ':8000');
		});
	};

	var initFileRootList = function() {
		cdDir('.');
	};

	var initUpload = function() {

		$('.fileupload').on('click', function() {
			openDialog();
		});

		function openDialog() {
			dialogUpload.setUrl('/rest/file/upload'); // 设置url
			dialogUpload.setMaxFileSize(800000000); // 设置单文件最大值
			dialogUpload.setMaxNumberOfFiles(5); // 设置总文件数
			// dialog.setSuffix('xlsx'); // 设置文件后缀 ,逗号分隔
			dialogUpload.setFormData({
				path: globalPathNames,
			});
			dialogUpload.setStartCallBackMethod(start);	// 开始执行的方法
			dialogUpload.setCompleteCallBackMethod(complete); // 完成后执行的方法
			dialogUpload.set;
			dialogUpload.open();
		}

		function complete() {
			reloadDir();
		}

	};

	var init = function() {
		new Clipboard('.btn-copy');
		initIpAddress();
		initFileRootList();
		initUpload();
	};

	init();
});
