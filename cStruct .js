var config = {
	Product:{
		weight:'int',
		price:'float',
		id:'double',
	},
	Person:{
		name:'str[]',
		age:'float',
		height:'float',
		weight:'float'
	}
};

var str = [];
for (name in config){
	var struck = config[name];
	str.push('struct '+name+' {');
		for (fields in struck){
			str.push('   '+ fields + ' ' + struck[fields] + ';');
		}
	str.push('};\n');

	str.push(name+' generate'+name+'(str[] jsonStr) {');
		str.push('   json jsonObj = json::parse(jsonStr);');
		str.push('   '+ name + ' obj;');
		for (fields in struck){
			str.push('   obj.'+ fields + ' = jsonObj.get("'+fields+'");');
		}
		str.push('   return obj;');
	str.push('}; \n\n');
}

console.log(str.join('\n'));