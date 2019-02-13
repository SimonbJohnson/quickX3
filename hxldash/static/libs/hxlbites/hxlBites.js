let hxlBites = {

	//variable data is stored in
	_data: [],

	//variable unfiltered timeseries data stored in
	_fullData: [],

	//identifying whether a dataset is a timeseries
	timeSeries: false,
	timeSeriesFilter: '',
	timeSeriesFilterHeader: '',

	//function to set data and check is data is a timeseries
	data: function(data){
		this._data = data;
		this._fullData = data;
		this._data = this.checkTimeSeriesAndFilter(data);
		return this;
	},

	//check if data is a timeseries
	checkTimeSeriesAndFilter: function(data){
		let self = this;
		
		//get values for tags that match
		let matches = self._getIngredientValues({'name':'#date','tags':['#date-update','#date-report','#date-start']},self._data);
		let timeSeries = true;
		
		//tracking which column to filter on and by what value
		let filterValue='';
		let filterHeader = '';
		let filterCol = 0;
		
		//check if any date columns
		if(matches.length==0){
			timeSeries = false;
		} else {
			[timeSeries,filterValue,filterHeader,filterCol] = self._checkColumnMatchesForTimeSeries(matches);
		}
		//if time series data is found filter for last date
		if(timeSeries){
			let headers = data.slice(0, 2);
			data = data.slice(2,data.length);
			data = self._filterData(data,filterCol,filterValue);
			data = headers.concat(data);
		}
		//global time series 
		self.timeSeries = timeSeries;
		self.timeSeriesFilter = filterValue;
		self.timeSeriesFilterHeader = filterHeader;
		return data;
	},

	//loops through matches and returns first timeseries
	_checkColumnMatchesForTimeSeries: function(matches){
		let self = this;
		timeSeries = true
		let filterValue='';
		let filterHeader = '';
		let filterCol = 0;


		//loop through every match
		matches.forEach(function(match){

			//keyvalue of date plus count of occurences
			let keyValues = self._varFuncKeyValue(match);
			//check there enough unique values to be a time series
			let length = keyValues.length;
			var lastValue = keyValues[length-1].value;
			// lastvalue>3
			//sort alphabetically (assumes date in YYYY-MM-DD format currently)
			keyValues = keyValues.sort(function(a,b){
				if (a.key < b.key)
    				return -1;
  				if (a.key > b.key)
    				return 1;
  				return 0;
			});	
			var values = keyValues.map(function(d){return new Date(d.key)});
			var diffs = diff(values);
			
			if(length<3){
				timeSeries = false;
			} else {
				var sd = stddev(diffs);
				if(sd<0.5 || lastValue>2){
					//filter for latest date from sort
					filterValue = keyValues[length-1].key;
					filterCol = match.col;
					filterHeader = match.header;
				} else {
					timeSeries = false;
				}
			}
		});
		return [timeSeries,filterValue,filterHeader,filterCol];

		function diff(arr){
			var output = [];
			for(var i=1;i<arr.length;i++){
				var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
				var firstDate = arr[i];
				var secondDate = arr[i-1];

				var diff = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
				if(!isNaN(diff)){
					output.push(diff);
				}			
			}
			return output;
		}

		function stddev(array){
			n = array.length;
			mean = array.reduce((a,b) => a+b)/n;
			s = Math.sqrt(array.map(x => Math.pow(x-mean,2)).reduce((a,b) => a+b)/n);
			return s;
		}
	},

	getTextBites: function(){
		let self = this;
		let bites = [];
		if(this.timeSeries){
			bites.push({'type':'text','subtype':'intro','priority':10,'bite':'Data filtered on '+this.timeSeriesFilterHeader+' for '+this.timeSeriesFilter, 'id':'text0000'});
		}
		this._textBites.forEach(function(bite,i){
			let distinctOptions = {};
			bite.ingredients.forEach(function(ingredient){
				distinctValues = self._getIngredientValues(ingredient,self._data);
				distinctOptions[ingredient.name] = distinctValues;
			});
			let matchingValues = self._checkCriteria(bite.criteria,distinctOptions);
			if(matchingValues !== false){
				let uniqueIDs = []
				bite.ingredients.forEach(function(ingredient){
					matchingValues[ingredient.name].forEach(function(match){
						uniqueIDs.push(bite.id+'/'+match.tag+'/'+match.col);
					})
				});
				let variables = self._getVariables(bite,matchingValues);
				let newBites = self._generateTextBite(bite.phrase,variables);
				newBites.forEach(function(newBite,i){
					bites.push({'type':'text','subtype':bite.subType,'priority':bite.priority,'bite':newBite, 'id':uniqueIDs[i]});
				});
				
			}
		});
		return bites;
	},

	getTableBites: function(){
		let self = this;
		let bites = [];
		this._tableBites.forEach(function(bite,i){
			let distinctOptions = {};
			bite.ingredients.forEach(function(ingredient){
				distinctValues = self._getIngredientValues(ingredient,self._data);
				distinctOptions[ingredient.name] = distinctValues;
			});
			let matchingValues = self._checkCriteria(bite.criteria,distinctOptions);
			if(matchingValues !== false){
				let titleVariables = self._getTitleVariables(bite.variables,matchingValues);				
				let titles = self._generateTextBite(bite.title,titleVariables);
				let variables = self._getTableVariablesWithMatching(self._data,bite,matchingValues);
				let newBites = self._generateTableBite(bite.table,variables);
				newBites.forEach(function(newBite,i){
					bites.push({'type':'table','subtype':bite.subType,'priority':bite.priority,'bite':newBite.bite, 'uniqueID':newBite.uniqueID, 'id':bite.id, 'title':titles[i]});
				});				
			}			
		});
		return bites;
	},

	getCrossTableBites: function(){
		let self = this;
		let bites = [];
		this._crossTableBites.forEach(function(bite,i){
			let distinctOptions = {};
			bite.ingredients.forEach(function(ingredient){
				distinctValues = self._getIngredientValues(ingredient,self._data);
				distinctOptions[ingredient.name] = distinctValues;
			});
			let matchingValues = self._checkCriteria(bite.criteria,distinctOptions);
			if(matchingValues !== false){
				let titleVariables = self._getTitleVariables(bite.variables,matchingValues);				
				let titles = self._generateTextBite(bite.title,titleVariables);
				let variables = self._getCrossTableVariables(self._data,bite,matchingValues);
				let newBite = self._generateCrossTableBite(bite.table,variables);
				bites.push({'type':'crosstable','subtype':bite.subType,'priority':bite.priority,'bite':newBite.bite, 'uniqueID':newBite.uniqueID, 'id':bite.id, 'title':titles[0]});
			}			
		});
		return bites;
	},	

	getChartBites: function(){
		let self = this;
		let bites = [];
		this._chartBites.forEach(function(bite,i){
			let distinctOptions = {};
			bite.ingredients.forEach(function(ingredient){
				distinctValues = self._getIngredientValues(ingredient,self._data);
				distinctOptions[ingredient.name] = distinctValues;
			});
			let matchingValues = self._checkCriteria(bite.criteria,distinctOptions);
			if(matchingValues !== false){
				//let titleVariables = self._getTitleVariables(bite.variables,matchingValues);				
				//let titles = self._generateTextBite(bite.title,titleVariables);
				let variables = self._getTableVariablesWithMatching(self._data,bite,matchingValues);
				let newBites = self._generateChartBite(bite.chart,variables);
				newBites.forEach(function(newBite,i){
					bites.push({'type':'chart','subtype':bite.subType,'priority':bite.priority,'bite':newBite.bite, 'id':bite.id, 'uniqueID':newBite.uniqueID, 'title':newBite.title});
				});		
			}			
		});
		return bites;
	},

	getTimeSeriesBites: function(){

		let self = this;
		let bites = [];

		if(!self.timeSeries){
			return [];
		}

		// through all timeSeriesBites and check criteria
		this._timeSeriesBites.forEach(function(bite,i){

			//get unique values for each ingredient for checking against bite criteria
			let distinctOptions = {};
			bite.ingredients.forEach(function(ingredient){
				distinctValues = self._getIngredientValues(ingredient,self._fullData);
				distinctOptions[ingredient.name] = distinctValues;
			});

			//return just the ingredients that match the criteria of the bite
			let matchingValues = self._checkCriteria(bite.criteria,distinctOptions);

			//skip if no values match
			if(matchingValues !== false){

				//get all the combinations of matching values with their data table
				let variables = self._getTableVariablesWithMatching(self._fullData,bite,matchingValues);
				//turning date strings into date objects

				variables = self._formatTimeSeriesVariables(variables);
				//construct bite from chart bite
				let newBites = self._generateChartBite(bite.chart,variables);
				newBites.forEach(function(newBite,i){

					//sort by date
					let headers = newBite.bite.slice(0, 1);
					data = newBite.bite.slice(1,newBite.bite.length);
					data = data.sort(function(a,b){
						return a[0] - b[0];
					});
					newBite.bite = headers.concat(data);
					bites.push({'type':'chart','subtype':bite.subType,'priority':bite.priority,'bite':newBite.bite, 'id':bite.id, 'uniqueID':newBite.uniqueID, 'title':newBite.title});
				});		
			}

		});
		return bites;
	},

	getMapBites: function(){
		let self = this;
		let bites = [];
		this._mapBites.forEach(function(bite,i){
			let distinctOptions = {};
			bite.ingredients.forEach(function(ingredient){
				distinctValues = self._getIngredientValues(ingredient,self._data);
				distinctOptions[ingredient.name] = distinctValues;
			});
			let matchingValues = self._checkCriteria(bite.criteria,distinctOptions);
			if(matchingValues !== false){
						let variables = self._getTableVariablesWithMatching(self._data,bite,matchingValues);
						let newBites = self._generateMapBite(bite.map,variables);
						newBites.forEach(function(newBite,i){
							bites.push({'type':'map','subtype':bite.subType,'title': newBite.title,'priority':bite.priority,'bite':newBite.bite, 'uniqueID':newBite.uniqueID, 'id':bite.id, 'geom_url':newBite.geom_url,'geom_attribute':newBite.geom_attribute});
						});
			}		
		});
		return bites;
	},

	_formatTimeSeriesVariables: function(variables){
		variables.forEach(function(variable,j){
			variable.table[0].forEach(function(d,i){
				if(i>0){
					variables[j].table[0][i] = new Date(d);
				}
			});
		});
		return variables;
	},

	_getTitleVariables: function(variables,matchingValues){
		let titleVariables = [];
		let length = matchingValues[variables[0]].length;
		for(var pos = 0;pos<length;pos++){
			variables.forEach(function(v,i){
				if(pos==0){
					titleVariables.push([]);
				}
				if(v.indexOf('(')==-1){
					let header = '';
					if(i==0){
						header = matchingValues[v][pos].header;
					} else {
						header = matchingValues[v][0].header;
					}
					titleVariables[i].push(header);
				} else if (v!='count()') {
					var variable = v.substring(v.indexOf('(')+1,v.indexOf(')'));
					let header = '';
					if(i==0){
						header = matchingValues[variable][pos].header;
					} else {
						header = matchingValues[variable][0].header;
					}
					titleVariables[i].push(header);
				} else {
					titleVariables[i].push('');
				}
			});
		}	
		return titleVariables;
	},		

	_getIngredientValues: function(ingredient,data){
		let ingredientDistinct = [];
		let dataset = hxl.wrap(data);
		dataset.withColumns(ingredient.tags).forEach(function(row,col,rowindex){				
			row.values.forEach(function(value,index){
				//At the moment only include first tag that meets requirement.
				if(index>-1){
					if(rowindex==0){
						ingredientDistinct[index] = {'tag':'','header':'','uniqueValues':[],'values':[],'col':''};
						ingredientDistinct[index].tag = col.displayTags[index];
						ingredientDistinct[index].header = col.headers[index];
						ingredientDistinct[index].col = data[0].indexOf(ingredientDistinct[index].header);
					}
					if(ingredientDistinct[index].uniqueValues.indexOf(value)==-1){
						ingredientDistinct[index].uniqueValues.push(value);
					}
					ingredientDistinct[index].values.push(value);
				}						
			});
		});
		return ingredientDistinct;
	},

	_checkCriteria: function(criteria,ingredientValues){
		let self = this;
		criteria.forEach(function(criterion){
			parsedCriterion = self._parseCriterion(criterion);
			ingredientValues = self._filterForMatches(parsedCriterion,ingredientValues);
		});
		for(key in ingredientValues){
			if(ingredientValues[key].length==0){
				return false;
			}
		}		
		return ingredientValues;
	},

	_parseCriterion: function(criterion){
		let operations = ['<','>','!'];
		let operation = -1;
		operations.forEach(function(op){
			if(criterion.indexOf(op)>-1){
				operation = op;
			}
		});
		if(operation != -1){
			let parse = criterion.split(operation);
			let variable = parse[0].trim();
			let value = parse[1].trim();
			return {'variable':variable,'operation':operation,'value':value};			
		} else {
			return 'Failed to parse';
		}
	},

	_filterForMatches: function(criterion,ingredientValues){
		ingredientValues[criterion.variable] = ingredientValues[criterion.variable].filter(function(distinctValues,i){
			if(criterion.operation=='<'){
				if(!(distinctValues.uniqueValues.length < criterion.value)){
					return false;
				}
			}
			if(criterion.operation=='>'){
				if(!(distinctValues.uniqueValues.length > criterion.value)){
					return false;
				}		
			}
			return true;
		});
		if(criterion.operation == '!'){
			if(ingredientValues[criterion.variable].length==0){
				ingredientValues[criterion.variable].push({tag: "#value", header: "Placeholder", uniqueValues: [], values: [], col: -1});
			} else {
				ingredientValues[criterion.variable] = [];
			}
		}
		return ingredientValues;
	},

	_getTableVariablesWithMatching: function(data,bite,matchingValues){

		//needs large efficieny improvements
		
		let self = this;
		let tables = [];
		let keyMatches = matchingValues[bite.variables[0]];
		keyMatches.forEach(function(keyMatch){
			let table = [];
			let keyValues = self._varFuncKeyValue(keyMatch);
			let firstCol = [keyMatch.header];
			keyValues.forEach(function(keyValue){
				firstCol.push(keyValue.key); 
			});
			var workingTables = [[]];
			workingTables[0].push(firstCol);
			var idMatches = [[]];
			var headerMatches = [[]];
			bite.variables.forEach(function(variable,index){
				if(index>0){
					if(variable.indexOf('(')>-1){
						let col = new Array(firstCol.length).fill(0);
						let func = variable.split('(')[0];
						if(func == 'count'){
							col[0] = 'Count';
							keyValues.forEach(function(keyValue,index){
								col[index+1] = keyValue.value;
							});
							workingTables.forEach(function(table,i){
								workingTables[i].push(col);
							});
						}
						if(func == 'sum'){
							let sumValue = variable.split('(')[1].split(')')[0];
							var newWorkingTables = [];
							var newIDMatches = [];
							var newHeaderMatches = [];
							var length = matchingValues[sumValue].length;
							for (i = 0; i < length; i++){
								newWorkingTables = newWorkingTables.concat(JSON.parse(JSON.stringify(workingTables)));
								newIDMatches = newIDMatches.concat(JSON.parse(JSON.stringify(idMatches)));
								newHeaderMatches = newIDMatches.concat(JSON.parse(JSON.stringify(headerMatches)));
							}
							workingTables = JSON.parse(JSON.stringify(newWorkingTables));
							idMatches = JSON.parse(JSON.stringify(newIDMatches));
							headerMatches = JSON.parse(JSON.stringify(newHeaderMatches));
							matchingValues[sumValue].forEach(function(match, ti){
								let col = new Array(firstCol.length).fill(0);
								idMatches.forEach(function(idMatch,i){
									if(i % length==ti){
										idMatches[i].push({'tag':match.tag,'col':match.col});
										headerMatches[i].push(match.header);
									}
								});
								col[0] = 'Value';
								firstCol.forEach(function(value,index){
									if(index>0){
										let filteredData = self._filterData(data,keyMatch.col,value);
										let sum = 0;
										filteredData.forEach(function(row,index){
											let value = Number(row[match.col]);
											if(value!=NaN){
												sum += value;
											}									
										});
										col[index] = sum;
									}
								});
								workingTables.forEach(function(table,i){
									if(i % length==ti){
										workingTables[i].push(col);
									}
								});								
							});					
						}					
					} else {
						// use this code for sums!
						let match = matchingValues[variable][0];
						let col = new Array(firstCol.length).fill(0);
						idMatches.forEach(function(idMatch,i){						
							idMatches[i].push({'tag':match.tag,'col':match.col});
							headerMatches[i].push(match.header);
						})
						col[0] = match.header;
						firstCol.forEach(function(value,index){
							if(index>0){
								let filteredData = self._filterData(data,keyMatch.col,value);
								let uniques = [];
								filteredData.forEach(function(row,index){
									let value = row[match.col];
									if(uniques.indexOf(value)==-1){
										uniques.push(value);
									}
								});
								col[index] = uniques.length;
							}
						});
						workingTables.forEach(function(table,i){
							workingTables[i].push(col);
						});
					}					
				}
			});
			workingTables.forEach(function(table,i){
				var uniqueID = bite.id+'/'+keyMatch.tag+'/'+keyMatch.col;
				var titleVars = [[keyMatch.header]];
				idMatches[i].forEach(function(d){
					uniqueID = uniqueID + '/'+d.tag+'/'+d.col;
				})
				headerMatches[i].forEach(function(header){
					titleVars.push([header]);
				});

				var titles = self._generateTextBite(bite.title,titleVars);
				tables.push({'table':table,'uniqueID':uniqueID,'title':titles[0]});
			});
		});
		return tables;
	},

	_getCrossTableVariables: function(data,bite,matchingValues){

		//needs large efficieny improvements
		let self = this;
		let table = [];
		let keyMatch1 = matchingValues[bite.variables[0]][0];
		let keyValues1 = this._varFuncKeyValue(keyMatch1);
		let keyMatch2 = matchingValues[bite.variables[1]][0];
		let keyValues2 = this._varFuncKeyValue(keyMatch2);
		let firstCol = [''];
		keyValues1.forEach(function(keyValue){
			firstCol.push(keyValue.key); 
		});
		let maxCount = data.length;
		table.push(firstCol);
		keyValues2.forEach(function(keyValue,index){
			let col = new Array(firstCol.length).fill(0);
			col[0] = keyValue.key;
			firstCol.forEach(function(value,index){
				if(index>0){
					let filteredData = self._filterData(data,keyMatch1.col,value);
					let maxRowCount = filteredData.length;
					filteredData = self._filterData(filteredData,keyMatch2.col,keyValue.key);
					let func = bite.variables[2].split('(')[0];
					if(func == 'percentCount'){
						col[index] = (filteredData.length/maxCount*100).toFixed(2);;
					}
					if(func == 'percentRowCount'){
						col[index] = (filteredData.length/maxRowCount*100).toFixed(2);;
					}
					if(func == 'count'){
						col[index] = filteredData.length;
					}
					if(func == 'sum'){
						let sumValue = bite.variables[2].split('(')[1].split(')')[0];
						let match = matchingValues[sumValue][0];
						let sum = 0;
						filteredData.forEach(function(row,index){
							let value = Number(row[match.col]);
							if(value!=NaN){
								sum += value;
							}									
						});
						col[index] = sum;					
					}
				}						
			});					
			table.push(col);
		});
		return {'table':table,'uniqueID':bite.id+'/'+keyMatch1.tag+'/'+keyMatch1.col+'/'+keyMatch2.tag+'/'+keyMatch2.col};
	},

	_filterData: function(data,col,value){
		let filterData = data.filter(function(d,index){
			if(d[col]==value){
				return true;
			} else {
				return false;
			}
		});
		return filterData;
	},

	_getVariables: function(bite,matchingValues){

		let self = this;
		variableList = [];
		bite.variables.forEach(function(variable){
			let func = variable.split('(')[0];
			let ingredient = variable.split(')')[0].split('(')[1];
			let items=[];
			matchingValues[ingredient].forEach(function(match){
				if(func == 'count'){
					items.push(self._varFuncCount(match));
				}
				if(func == 'single'){
					items.push(self._varFuncSingle(match));
				}
				if(func == 'header'){
					items.push(self._varFuncHeader(match));
				}
				if(func == 'tag'){
					items.push(self._varFuncTag(match));
				}
				if(func == 'list'){
					items.push(self._varFuncList(match));
				}
				if(func == 'listOrCount'){
					items.push(self._varFuncListOrCount(match));
				}
				if(func == 'first'){
					items.push(self._varFuncSortPosition(match,0));
				}
				if(func == 'firstCount'){
					items.push(self._varFuncSortPositionCount(match,0));
				}
				if(func == 'second'){
					items.push(self._varFuncSortPosition(match,1));
				}
				if(func == 'secondCount'){
					items.push(self._varFuncSortPositionCount(match,1));
				}
				if(func == 'sum'){
					items.push(self._varFuncSum(match));
				}									
			});
			variableList.push(items);
		});
		return variableList;
	},

	_checkMapCodes: function(level,values){


		worldgeos = hxlBites._mapValues.world;
		codCodes = hxlBites._mapValues.cod;

		/*var urlPattern = "https://gistmaps.itos.uga.edu/arcgis/rest/services/COD_External/{{country}}_pcode/MapServer/{{level}}/query?where=1%3D1&outFields=*&f=geojson";
        var url = urlPattern.replace("{{country}}", countryCode.toUpperCase());
        url = url.replace("{{level}}", levelId);*/
		if(level==0){
			let maxMatch = 0;
			let maxURL = '';
			let maxName = '';
			let maxCode = '';
			worldgeos.forEach(function(geomMeta){
				geomMeta.codes.forEach(function(code){
					let match = 0;
					values.forEach(function(value,i){
						if(code.values.indexOf(value)>-1){
							match++;
						}
					});
					if(match>maxMatch){
						maxMatch=match;
						maxURL = geomMeta.url;
						maxName = geomMeta.name;
						maxCode = code.name;
					}
				});
			});
			//let matchPercent = maxMatch/values.length;
			//let unmatched = values.length - maxMatch;
			return {'code':[maxCode],'name':maxName,'url':[maxURL],'clean':[],'name_att':['NAME']};
		}
		if(level>0){
			let iso3Codes = [];
			let pcodeClean = [];
			let parsed = [];
			var url = '';
			var adjustment = '';
			values.forEach(function(d){
				let iso3 = isNaN(d.substring(2,3));
				if(iso3){
					countryCode = d.substring(0,3);
				} else {
					countryCode = d.substring(0,2);
				}
				if(parsed.indexOf(countryCode)==-1){
					parsed.push(countryCode);
					if(iso3){
						codCodes.forEach(function(code){
							if(code.iso3==countryCode){
								iso3Codes.push(code);
								if(code.iso3!=code.use){
									pcodeClean.push([code.iso3,code.use]);
								}
							}
						});
					} else {
						codCodes.forEach(function(code){
							if(code.iso2==countryCode){
								iso3Codes.push(code);
								if(code.iso2!=code.use){
									pcodeClean.push([code.iso2,code.use]);
								}
							}
						});						
					}
				}
			})
			let urls = [];
			let codes = [];
			let name_atts = [];
			let urlPattern = "https://gistmaps.itos.uga.edu/arcgis/rest/services/COD_External/{{country}}_pcode/MapServer/{{level}}/query?where=1%3D1&outFields=*&f=geojson";
			iso3Codes.forEach(function(d){
		        var url = d.url.replace(/{{country}}/g, d.iso3.toUpperCase());
		        url = url.replace("{{level}}", level+d.adjustment);
		        urls.push(url);
		        var code = d.code_att.replace("{{level}}", level);
		        var name_att = d.name_att.replace("{{level}}", level);
		        codes.push(code);
		        name_atts.push(name_att);
			});
			//admin code to go in here
			return {'code':codes,'name':'cod','url':urls,'clean':pcodeClean,'name_att':name_atts};			
		}
		return false

	},

	//change later to form every iteration
	_generateTextBite: function(phrase,variables){
		let length = variables[0].length;
		let bites = [];
		for(var pos = 0;pos<length;pos++){
			phraseSplit = phrase.split('{');
			phraseParts = phraseSplit.map(function(part,i){
				if(i>0){
					let numString = part.substring(0,1);;
					let varNum = parseInt(numString);
					let matchString = numString + '}';
					part = part.replace(numString+'}',variables[varNum-1][pos]);
				}
				return part;
			});
			let bite  = '';
			phraseParts.forEach(function(part){
				bite += part;
			});
			bites.push(bite);
		}
		return bites
	},

	_generateTableBite: function(table,variables){
		let length = variables.length;
		let bites = [];
		for(var pos = 0;pos<length;pos++){
			let tableData = this._transposeTable(variables[pos].table);
			if(table.length>0){
				let func=table.split('(')[0];
				if(func=='rows'){
					let value = parseInt(table.split('(')[1].split(')')[0]);
					tableData = tableData.filter(function(row,i){
						if(i<value+1){
							return true;
						} else {
							return false;
						}
					}) ;
				}
			}
			let bite = {'bite':tableData,'uniqueID':variables[pos].uniqueID};
			bites.push(bite);
		}
		return bites;
	},

	_generateCrossTableBite: function(table,variables){
		let tableData = this._transposeTable(variables.table);
		if(table.length>0){
			let func=table.split('(')[0];
			if(func=='rows'){
				let value = parseInt(table.split('(')[1].split(')')[0]);
				tableData = tableData.filter(function(row,i){
					if(i<value+1){
						return true;
					} else {
						return false;
					}
				}) ;
			}
		}
		let bite = tableData;
		return {'bite':bite,'uniqueID':variables.uniqueID};
	},	

	_generateChartBite: function(chart,variablesList){
		let self = this;
		let bites = [];
		variablesList.forEach(function(variables){
			let chartData = self._transposeTable(variables.table);
			if(chart.length>0){
				let func=chart.split('(')[0];
				if(func=='rows'){
					let value = parseInt(chart.split('(')[1].split(')')[0]);
					var topRow = chartData.shift();
					chartData.sort(function(a,b){
						return b[1] - a[1];
					});
					chartData.unshift(topRow);					
					chartData = chartData.filter(function(row,i){
						if(i<value+1){
							return true;
						} else {
							return false;
						}
					});
				}
			}
			let bite = {'bite':chartData,'uniqueID':variables.uniqueID,'title':variables.title};
			bites.push(bite);
		});
		return bites
	},

	_generateMapBite: function(map,variables){
		let self = this;
		let bites = [];
		variables.forEach(function(v){
			let mapData = self._transposeTable(v.table);
			let tag = v.uniqueID.split('/')[1];
			let location = null;
			let level = -1;
			if(tag=='#country+code'){
				level = 0;
			}
			if(tag=='#adm1+code'){
				level = 1;
			}
			if(tag=='#adm2+code'){
				level = 2;
			}
			if(tag=='#adm3+code'){
				level = 3;
			}							
			if(level>-1){
				values = v.table[0].slice(1, v.table[0].length);
				let mapCheck = self._checkMapCodes(level,values);
				mapCheck.clean.forEach(function(c){
					mapData.forEach(function(d){
						d[0] = d[0].replace(c[0],c[1]);
					});
				});
				let bite = {'bite':mapData,'uniqueID':v.uniqueID,'title':v.title,'geom_attribute':mapCheck.code,'geom_url':mapCheck.url,'name_attribute':mapCheck.name_att};
				bites.push(bite);
			}
		});
		return bites;
	},

	_transposeTable: function(table){

		let newTable = [];
		let length = table[0].length;
		for(var i =0;i<table[0].length;i++){
			let row = [];
			table.forEach(function(col){
				row.push(col[i]);
			});
			newTable.push(row);
		}
		return newTable;
	},

	_varFuncCount: function(match){
		return '<span class="hbvalue">'+match.uniqueValues.length+'</span>';
	},

	_varFuncSum: function(match){
		var sum = match.values.reduce((a, b) => a + (isNaN(Number(b)) ? 0 : Number(b)), 0);
		return '<span class="hbvalue">'+sum+'</span>';
	},	

	_varFuncSingle: function(match){
		return '<span class="hbvalue">'+match.uniqueValues[0]+'</span>';
	},

	_varFuncHeader: function(match){
		return '<span class="hbheader">' + match.header + '</span>';
	},

	_varFuncTag: function(match){
		return '<span class="hbtag">' + match.tag + '</span>';
	},

	_varFuncKeyValue: function(match){
		let hash = {};
		match.values.forEach(function(value){
			if(value in hash){
				hash[value]++;
			} else {
				hash[value] = 1;
			}
		});
		let output = [];
		for(key in hash){
			output.push({'key':key,'value':hash[key]});
		}
		output = output.sort(function(a,b){
			return b.value - a.value;
		});
		return output;
	},

	_varFuncSortPosition: function(match,position){
		let keyValue = this._varFuncKeyValue(match);
		let key = keyValue[position].key;
		return '<span class="hbvalue">' + key + '</span>';
	},

	_varFuncSortPositionCount: function(match,position){
		let keyValue = this._varFuncKeyValue(match);
		let value = keyValue[position].value;
		return '<span class="hbvalue">' + value + '</span>';
	},

	_varFuncList: function(match){
		let output = '';
		match.uniqueValues.forEach(function(v,i){
			if(i==0){
				output = '<span class="hbvalue">'+v+'</span>';
			} else if(i<match.uniqueValues.length-1) {
				output+= ', <span class="hbvalue">'+v+'</span>';
			} else {
				output+= ' and <span class="hbvalue">'+v+'</span>';
			}
		});
		return output;
	},

	_varFuncListOrCount: function(match){
		if(match.uniqueValues.length>4){
			return this._varFuncCount(match) + ' ' + this._varFuncHeader(match)+'(s)';
		} else {
			return this._varFuncList(match);
		}
	},

	reverse: function(id){

		var self = this;

		var data = self._data;

		//split bite ID into it constituent parts
		var parts = id.split('/');
		//bite ID is first part
		var biteID = parts[0]

		//if bite is a timeseries then reference the full data rather than data filtered to the latest data
		if (biteID.substr(0,4)=='time'){
			data = self._fullData;
		}

		//column data in two parts in the unique bite ID.  The original tag and column number
		var columns = [];
		var length = (parts.length-1)/2
		for(i=0;i<length;i++){
			columns.push({'tag':parts[i*2+1],'number':+parts[i*2+2]})
		}

		//for each column confirm if tag is present	
		columns.forEach(function(col,i){
			columns[i]=self.confirmCols(col);
			columns[i].values = self.getValues(data,col);
			columns[i].uniqueValues = self.getDistinct(columns[i].values);
		});
		var bite = this.getBite(biteID);
		var matchingValues = this.createMatchingValues(bite,columns);
		var bites = [];
		newBites = [];
		let uniqueID = '';
		let variables = '';
		if(bite.type!='text'){
			variables = self._getTableVariablesWithMatching(data,bite,matchingValues);
		} else {
			bite.ingredients.forEach(function(ingredient){
				matchingValues[ingredient.name].forEach(function(match){
					uniqueID = bite.id+'/'+match.tag+'/'+match.col;
				})
			});
			let variables = self._getVariables(bite,matchingValues);
			newBites = [{'bite':self._generateTextBite(bite.phrase,variables)[0]}];
			newBites[0].uniqueID = uniqueID;
		}
		if(bite.type=='chart'){
			if (biteID.substr(0,4)=='time'){
				variables = self._formatTimeSeriesVariables(variables);
			}
			newBites = self._generateChartBite(bite.chart,variables);
		}		
		if(bite.type=='table'){
			newBites = self._generateTableBite(bite.table,variables);
		}
		if(bite.type=='crosstable'){
			let variables = self._getCrossTableVariables(data,bite,matchingValues);
			newBites = [self._generateCrossTableBite(bite.table,variables)];
			newBites[0].title = 'Crosstable';
		}
		var mapCheck;						
		if(bite.type=='map'){
			let tag = columns[0].tag;
			let location = null;
			let level = -1;
			if(tag=='#country+code'){
				level = 0;
			}
			if(tag=='#adm1+code'){
				level = 1;
			}
			if(level>-1){
				//let titleVariables = self._getTitleVariables(bite.variables,matchingValues);				
				//let titles = self._generateTextBite(bite.title,titleVariables);
				let keyVariable = bite.variables[0]
				let values = matchingValues[keyVariable][0].values;
				//mapCheck = self._checkMapCodes(level,values);
				/*mapCheck.clean.forEach(function(c){
					mapData.forEach(function(d){
						d[0] = d[0].replace(c[0],c[1]);
					});
				});	*/	
				newBites = self._generateMapBite(bite.chart,variables);
			}
		}		
		newBites.forEach(function(newBite,i){
			if (biteID.substr(0,4)=='time'){
				let headers = newBite.bite.slice(0, 1);
				data = newBite.bite.slice(1,newBite.bite.length);
				data = data.sort(function(a,b){
					return a[0] - b[0];
				});
				newBite.bite = headers.concat(data);
			}
			bites.push({'type':bite.type,'subtype':bite.subType,'priority':bite.priority,'bite':newBite.bite, 'id':bite.id, 'uniqueID':newBite.uniqueID, 'title':newBite.title});
			if(bite.type=='map'){
				bites[i].geom_url=newBite.geom_url;
				bites[i].geom_attribute=newBite.geom_attribute;
				bites[i].name_attribute=newBite.name_attribute;
			}
		});
		return bites[0];

	},

	getBite: function(id){
		var bite = {};
		hxlBites._chartBites.forEach(function(b){
			if(b.id==id){
				bite = b;
			}
		});
		hxlBites._timeSeriesBites.forEach(function(b){
			if(b.id==id){
				bite = b;
			}
		});
		hxlBites._mapBites.forEach(function(b){
			if(b.id==id){
				bite = b;
			}
		});
		hxlBites._tableBites.forEach(function(b){
			if(b.id==id){
				bite = b;
			}
		});
		hxlBites._crossTableBites.forEach(function(b){
			if(b.id==id){
				bite = b;
			}
		});
		hxlBites._textBites.forEach(function(b){
			if(b.id==id){
				bite = b;
			}
		});										
		return bite;
	},

	confirmCols: function(col){
		var found = false;
		var tag = this._data[1][col.number].split('+')[0];
		var colTag = col.tag.split('+')[0];
		if(tag == colTag){
			col.header = this._data[0][col.number];
			return col;
		} else {
			return {}
		}
	},

	createMatchingValues: function(bite,cols){
		var matchingValues = {}
		bite.ingredients.forEach(function(ingredient){
			matchingValues[ingredient.name] = [];
		});
		cols.forEach(function(col){
			//applies the column to the correct ingredient that contains the tag to create matching values
			//might be a problem if both ingredients use the same tag.
			bite.ingredients.forEach(function(ingredient){
				ingredient.tags.forEach(function(tag){
					var formatTag = tag.replace('-','+').split('+')[0];
					var colTag = col.tag.split('+')[0];
					if(formatTag==colTag){
						var matchingValue = {};
						matchingValue['tag'] = col.tag;
						matchingValue['header'] = col.header;
						matchingValue['col'] = col.number;
						matchingValue['values'] = col.values;
						matchingValue['uniqueValues'] = col.uniqueValues;
						matchingValues[ingredient.name].push(matchingValue);
					}
				});
			});
		});
		return matchingValues;
	},

	getValues: function(data,col){
		var output = [];
		data.forEach(function(row,i){
			if(i>1){
				output.push(row[col.number]);
			}
		});
		return output;
	},

	getDistinct: function(values){
		var output = [];
		values.forEach(function(v,i){
			if(output.indexOf(v)==-1){
				output.push(v);
			}
		});
		return output;
	}	
}