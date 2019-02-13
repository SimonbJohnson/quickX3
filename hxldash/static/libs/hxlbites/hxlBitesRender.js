hxlBites.render = function(_id,_bite){
	let _tableToHTML = function(table){
		let html = '<table class="table">';
		table.forEach(function(row,index){
			if(index == 0 ){
				html += '<thead><tr>';
				row.forEach(function(value){
					html+='<th>'+value+'</th>';
				});
			}
			if(index == 1 ){
				html += '</tr></thead><tbody><tr>'
			}
			if(index > 1 ){
				html += '</tr><tr>'
			}
			if(index>0){
				row.forEach(function(value){
					html+='<td>'+value+'</td>';
				});
			}
		});
		html += '</tr></tbody></table>';
		return html;
	}

	let _crossTableToHTML = function(table){
		let max = -10000;
		table.forEach(function(row){
			row.forEach(function(cell){
				if(!isNaN(cell)){
					if(Number(cell)>Number(max)){
						max = cell
					}
				}
			});
		});

		max = max+1;
		let html = '<table class="crosstable">';
		table.forEach(function(row,index){
			if(index == 0 ){
				html += '<thead><tr>';
				row.forEach(function(value){
					html+='<th>'+value+'</th>';
				});
			}
			if(index == 1 ){
				html += '</tr></thead><tbody><tr>'
			}
			if(index > 1 ){
				html += '</tr><tr>'
			}
			if(index>0){
				row.forEach(function(value){
					let cls = Math.ceil(value/max*5);
					html+='<td class="crosstable'+cls+'">'+value+'</td>';
				});
			}
		});
		html += '</tr></tbody></table>';
		return html;
	}
	if(_id!=null){
		_id = _id.substring(1);
	}
	if(_bite.type == 'table'){
		if(_id == null){
			return _tableToHTML(_bite.bite);
		} else {
			document.getElementById(_id).insertAdjacentHTML("beforeend",_tableToHTML(_bite.bite));
		}		
	}

	if(_bite.type == 'crosstable'){
		if(_id == null){
			return _crossTableToHTML(_bite.bite);
		} else {
			document.getElementById(_id).insertAdjacentHTML("beforeend",_crossTableToHTML(_bite.bite));
		}		
	}
}