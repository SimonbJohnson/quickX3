$('#loaddata').on('click',function(d){
	let dataURL = $('#dataurl').val();
	let encodedURL = encodeURIComponent(dataURL);
	window.location.href = createURL.replace('xxx',encodedURL);
});