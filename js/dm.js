/**
 *	Copyright (c) 2019 pj1985 
 *	
 *	This code is part of the DM Lite (https://github.com/pj1985/dm_lite)
 *	
 *	You can redistribute it and/or modify it under the terms of the GNU General Public License
 *	as published by the Free Software Foundation, either version 3 of the License, or later.
 *	
 *	You should have received a copy of the GNU General Public License along
 *	with DM Lite.  See http://www.gnu.org/licenses/
*/

// Main tables object	
var items = new vis.DataSet([]);	
// Main edges object
var edges = new vis.DataSet([]);
// Table columns definitions
var columns = {};
// Constraints and indexes definition
var cons = {};
// Table change log definition
var chglog = {};
// Table metadata - additional attributes 
var meta = {};
// Model metadata - additional attributes 
var model = {};
// Network object
var gph;
// Default view
var g_view = 'view_logical';
// Blank string for formating
var blank = ".....................................................";

var about = 
'<div class="alert alert-primary"  id="A_Top">'
+'  <h4 class="alert-heading">Welcome to Data Modeler Lite</h4>'
+' <p>This is lite version of web based data modeler. Whole diagram is created only in your browser, no data is stored on server. You can save your work by exporting diagram into file and open later through import diagram function.</p>'
+'  <p>You can start drawing with right click on the canvas and select <b>Add table</b>. If you want to import existing diagram select <b>"Model"->"Import and Export"</b> from menu. You can load demo diagram in "Model"->"Import and Export" with <b>"Load Demo"</b> option.</p>'
+'   '
+'  <p>You can check available features in <b>  <a href="https://github.com/pj1985/dm_lite">https://github.com/pj1985/dm_lite</a> </b> </p>'
+'   '
+'   '
+'  '
+'</div>'
;
// Configuration of highlight library
hljs.configure({useBR: true});

/**
 * Read from file 
 * @r {String}  
 */
function f_TextRead(r) {
    r.onloadend = function(event) {
		$('#I_NetworkImport').val(event.target.result);
    }
}
/**
 * Read from file 
 *  
 */
function f_FileSelection() {
	var file = I_ImportFile.files[0],
        r = new FileReader();
    f_TextRead(r);
    r.readAsText(file);
}
/**
 * Utility function - transform object to array
 *  
 */
function objectToArray(obj) {
	return Object.keys(obj).map(function (key) {
	  obj[key].id = key;
	  return obj[key];
	});
}

/**
	Format model to json file
	
*/
function get_dia(){
	return '{"nodes":' +
				JSON.stringify(objectToArray(items._data), null, ' ') + 
			',"edges":' +
				JSON.stringify(objectToArray(edges._data), null, ' ') +
			',"options":' +
				JSON.stringify(opts, null, ' ') +
			',"model":' +
				JSON.stringify(model, null, ' ') +
			',"meta":' +
				JSON.stringify(meta, null, ' ') +
			',"bus_terms":' +
				JSON.stringify(bus_terms, null, ' ') +
			',"columns":' +
				JSON.stringify(columns, null, ' ') +
			',"cons":' +
				JSON.stringify(cons, null, ' ') +
			',"chglog":' +
				JSON.stringify(chglog, null, ' ') +
			'}';
}
 
/**
	Create diagram
	
*/
function startNetwork(){
	var container = document.getElementById('visualization');
	var data = {'nodes': items, 'edges': edges}
	
	gph = new vis.Network(container, data, opts);
	
	gph.on("doubleClick", function(e) {
		if (gph.getSelectedNodes()[0]){
			var sel = gph.getSelectedNodes()[0];
			$('#I_AddNodeId').val(sel);
			
			var nm;
			if (meta[sel]){
				nm = meta[sel].nm
				$('#I_Inserts_Weekly').val((meta[sel].Inserts_Weekly?meta[sel].Inserts_Weekly:''));
				$('#I_Updates_Weekly').val((meta[sel].Updates_Weekly?meta[sel].Updates_Weekly:''));
				$('#I_Deletes_Weekly').val((meta[sel].Deletes_Weekly?meta[sel].Deletes_Weekly:''));
				$('#I_Data_Sensitivity').val((meta[sel].Data_Sensitivity?meta[sel].Data_Sensitivity:''));
				$('#I_Data_Protection').val((meta[sel].Data_Protection?meta[sel].Data_Protection:''));
				$('#I_Business_Owner').val((meta[sel].Business_Owner?meta[sel].Business_Owner:''));
				$('#I_Technical_Owner').val((meta[sel].Technical_Owner?meta[sel].Technical_Owner:''));
				$('#I_Data_Origin').val((meta[sel].Data_Origin?meta[sel].Data_Origin:''));
			} else	
				nm = '';
			
			$('#I_AddNodeName').val(nm);
			
			showColumns();
			showChangeLog();
			showCons();
			
			$('#I_AddNodeDesc').val( items.get(sel).title);
			 
			
			$('#I_AddNodeType').html('');
			//<option value="g_lookup">Lookup</option>
			jQuery.each(opts.groups, function(i, val) {
				 $('#I_AddNodeType').append($('<option>', { 
					value: i,
					text : val.nm 
				}));
				
			});
			
			$('#I_AddNodeType').val(
				items.get(sel).group
			);
						
			$('#M_AddNode').modal({
				backdrop: 'static',
				keyboard: false
			});
			
		} else {
			if (gph.getSelectedEdges()[0]){
				$('#I_AddEdgeId').val(gph.getSelectedEdges()[0]);
				$('#I_AddEdgeName').val(
					edges.get(gph.getSelectedEdges()[0]).label
				);
				 
				$('#M_AddEdge').modal({
					backdrop: 'static',
					keyboard: false
				});
			}
		}
	});
	
	 
	gph.on("dragEnd", function (params) {
        
		if (this.getNodeAt(params.pointer.DOM))
			jQuery.each(gph.getConnectedEdges(this.getNodeAt(params.pointer.DOM)), function(i, val) {
				if (edges.get(val).label){
					}
				else {
					setFK (edges.get(val).from, edges.get(val).to);
				}
				
			});
		
		
    });
	
	gph.on("AfterDrawing", function (ctx) {
		var nodeId = 1;
		var nodePosition = gph.getPositions([nodeId]);
		
	});

}
/** 
 * Generate HTML select list for data types
 * @sel {String} selected option
 * @opt {String} select tag attributes
 */
function getDataTypeSelect(sel, opt=''){
	var a = '<select class="form-control" '+opt+'>'
	
	jQuery.each(datatypes, function(i, val) {
		if (sel == i)
			a += '<option   value="'+i+'" selected>'+i+'</option>';	
		else 
			a += '<option   value="'+i+'" >'+i+'</option>';	
	});
	a += '</select>'
	return a;
}
/** 
 * Generate HTML select list for business terms
 * @id {String} ID of the html element
 * @sel {String} selected value
 */
function getBusTermSelect(id, sel){
	var a = '<select class="form-control" id="S_BusTermCol_'+id+'">'
	a += '<option class="" value="" selected>...</option>';	
	jQuery.each(bus_terms, function(i, val) {
		if (sel == i)
			a += '<option   value="'+i+'" selected>'+i+'</option>';	
		else 
			a += '<option    value="'+i+'" >'+i+'</option>';	
	});
	 
	a += '</select>'	
	
	return a;
}
/** 
 * Generate HTML select list for tables
 * @id {String} ID of the html element
 * @sel {String} selected value
 * @opt {String} html element attributes
 */
function getTablesSelect(id, sel, opt='disabled'){
	var a = '<select class="form-control" id="S_ForeignCol_'+id+'" '+opt+'>'
	a += '<option class="" value="" selected>...</option>';	
	jQuery.each(meta, function(i, val) {
		if (sel == i){
			a += '<option   value="'+i+'" selected>'+val.nm+'</option>';	
		}
		else 
			a += '<option    value="'+i+'" >'+val.nm+'</option>';	
	});
	 
	a += '</select>'
	
	return a;
}
/** 
 * Generate HTML select list for constraint types
 * @id {String} ID of the html element
 * @sel {String} selected value
 */
function selectConsType(id, sel){
	var a = '<select class="form-control" id="S_Cons_'+id+'">'
	
	jQuery.each(constypes, function(i, val) {
		if (sel == i)
			a += '<option   value="'+i+'" selected>'+i+'</option>';	
		else 
			a += '<option   value="'+i+'" >'+i+'</option>';	
	});
	 
	a += '</select>'
	
	return a;
	
}
/** 
 * Generate HTML select list for columns
 * @id {String} ID of the html element
 * @sel {String} selected value
 */
function getSelectColumns(id, sel){
	var a = '<select class="form-control" id="S_ConsCols_'+id+'">'
	var data = columns[$('#I_AddNodeId').val()];
	
	jQuery.each(data, function(i, val) {
		if (sel == val.a)
			a += '<option   value="'+val.a+'" selected>'+val.b+'</option>';	
		else 
			a += '<option   value="'+val.a+'" >'+val.b+'</option>';	
	});
	 
	a += '</select>'
	
	return a;
	
}
/** 
 * Get name of the column from ID
 * @table_id {String} Table identificator
 * @col_id {String} Column identificator
 */
function getColumnLabel(table_id, col_id){
	var data = columns[table_id];
	var a
	jQuery.each(data, function(i, val) {
		if (col_id == val.a){
			a = val.b;	
			return;
		}
	});
	
	return a;
	
}
/** 
 * Get name of the table from id
 * @tab {String} Table identificator
 */
function getTableLabel(tab){
	var v = $('#I_View').val();
	
	var txt = '<b>' + meta[tab].nm  + '</b>\n\n';
	var l = 32;
	$.each(columns[tab], function(j, val){
		l = 32;
		l -= (val.i != '' ? 1: 0); 
		l -= (val.d == 'Natural Key' ? 1: 0);
		
		if (v == 'Logical View'){
			txt = txt + 
			(val.i != '' ? '+': '')+ 
			(val.d == 'Natural Key' ? '#': '')+
			(val.h == true ? '<b><i>': '')+ 
			val.b + blank.slice(val.b.length, l) + val.d + "  " + 
			(val.h == true ? '</i></b>': '')
			+ "\n";
		}
		if (v == 'Business View'){
			if (val.c)
				txt = txt + val.c + "\n";
		}
		
	});
	return txt;
}
/** 
 * Print HTML to show data types list
 *  
 */
function showDatatypes(){
	var ht = '';
				
	ht += '<div><legend>Standard Data Types</legend>' 
		+'<table class="table table-sm table-bordered table-responsive-md table-striped text-center">'
		+'<tr><th>Name</th>'
		+'<th>Description</th>'
	 	+'</tr>'
	jQuery.each(datatypes, function(i, val) {
		ht += '<tr><td class="text-left"><b>'+i + '</b>'
		+'</td><td class="text-left">'+val.desc
		+'</td></tr>';					
	});
	ht += '</table>'; 
	
	$("#D_Modal_Default_sm").html(ht);
}
 

/** 
 * Print HTML to show columns
 *  
 */
function showColumns(){
	if ([
	'g_label'
	].indexOf($('#I_AddNodeType').val()) > -1){
		$('#D_NodeExtBasic').collapse('hide');
	}else {
			//show mapping part
			$('#D_NodeExtBasic').collapse('show');
			var vl = 0;
			//column definition header
			var ht = 
			'<table id="T_Columns" class="table table-bordered table-responsive-md table-striped table-sm" ><tr>'
			+'<th class="">#</th>'
			+'<th class="">Name</th>'
			+'<th class=""> Bus Term</th>'
			+'<th class="">Data Type</th>'
			+'<th class="">Default</th>'
			+'<th class="">FK</th>'
			+'<th class="">Description</th>'
			+'<th class=""> </th></tr>';
			
			var rid = 0;
			var o;
			//print column definitions
			if (columns[$('#I_AddNodeId').val()]){
				jQuery.each(columns[$('#I_AddNodeId').val()], function(i, val) {
					if (val.c != "" || (val.k ? val.k:"") != ""){ 
						o = 'disabled';
					}
					else 
						o = '';
					ht += '<tr class="pad-slim"><td class=" pad-slim" style="text-align: center;">'+val.a 
					+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="Set column name">'+val.b
					+'</td><td class=" pad-slim" data-toggle="tooltip" title="Connect with business term">'+getBusTermSelect(val.a, val.c)
					+'</td><td class=" pad-slim" data-toggle="tooltip" title="Select column data type">'+getDataTypeSelect(val.d, o)
					+'</td><td class=" pad-slim" contenteditable="'+ (val.c != "" ? "false" : "true") +'" data-toggle="tooltip" title="Set default value">'+val.e
				 	+'</td><td class=" pad-slim"  data-toggle="tooltip" title="Foreign key table name">'+getTablesSelect(val.a, val.i)
					+ '<input class="form-check-input" type="hidden" id="I_ColFK_'+ val.a +'" value="'+(val.k ? val.k : "") +'"></input>'
 					+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="Column description">'+val.j
					+'</td><td class=" " style="text-align: center;">' 
					+'<a href="#"   style="font-family: FontAwesome" id="TD_AdvColumn_'+val.a+'" data-toggle="tooltip" title="Advanced">\uf05a</a>'
					+ '<a href="#"   style="font-family: FontAwesome" id="TD_UpColumn_'+val.a+'" data-toggle="tooltip" title="Move up">\uf139</a>'
					+ '<a href="#"   style="font-family: FontAwesome" id="TD_DownColumn_'+val.a+'" data-toggle="tooltip" title="Move down">\uf13a</a>'
					+'<a href="#"   style="font-family: FontAwesome" id="TD_DelColumn_'+val.a+'" data-toggle="tooltip" title="Remove column">\uf056</a>' 
					 
					+'</td></tr>';
					rid = (Number(val.a)>rid?Number(val.a):rid);
				});
				
			}
			 rid += 1;
			
			ht += '</table>'; 
			//add new button
			ht += '<div class="d-flex flex-row-reverse"><a href="#" id="A_AddRow" class="align-middle btn btn-outline-primary btn-sm" style="font-family: FontAwesome" data-toggle="tooltip" title="Add column">\uf067</a></div>';
			$("#D_NodeExtBasic").html(ht);
			
			$('#A_AddRow').val(rid);	
			
			$('[id^=TD_DelColumn_]').on("click", function() {
				$(this).parents('tr').detach();
			 
			});
			$('[id^=TD_AdvColumn_]').on("click", function() {
				showAdvColumn($(this));				 			 
			});
			
			$('[id^=TD_UpColumn_]').on("click", function() {
				var row = $(this).parents('tr');
				row.prev().before(row);			 
			});
			$('[id^=TD_DownColumn_]').on("click", function() {
				var row = $(this).parents('tr');
				row.next().after(row);		 
			});
						
			$(function () {
			  $('[data-toggle="tooltip"]').tooltip()
			})
			
			$('#A_AddRow').click(function () {
				$('#T_Columns').append(
				'<tr><td class="" style="text-align: center;">' +$('#A_AddRow').val()+'</td>'
				+'<td class="" contenteditable="true" data-toggle="tooltip" title="Set column name"></td>' 	//name
				+'<td class="" data-toggle="tooltip" title="Connect with business term">'+getBusTermSelect($('#A_AddRow').val(), '')+'</td>'	//Bus Term
				+'<td class="" data-toggle="tooltip" title="Select column data type">'+getDataTypeSelect()+'</td>'	// Data Type
				+'<td class="" contenteditable="true" data-toggle="tooltip" title="Set default value"></td>'		// Default
				+'<td class="" data-toggle="tooltip" title="Foreign key table name">'+getTablesSelect($('#A_AddRow').val(), '')
				+'<input class="form-check-input" type="hidden" id="I_ColFK_'+ $('#A_AddRow').val() +'" value=""></input> </td>'
				+'<td class="" contenteditable="true" data-toggle="tooltip" title="Column description"></td> '  
				+'<td class="" style="text-align: center;">' 
				+'<a href="#" style="font-family: FontAwesome" id="TD_AdvColumn_'+$('#A_AddRow').val()+'" data-toggle="tooltip" title="Advanced">\uf05a</a>'
				+'<a href="#"   style="font-family: FontAwesome" id="TD_UpColumn_'+$('#A_AddRow').val()+'" data-toggle="tooltip" title="Move up">\uf139</a>'
				+'<a href="#"   style="font-family: FontAwesome" id="TD_DownColumn_'+$('#A_AddRow').val()+'" data-toggle="tooltip" title="Move down">\uf13a</a>'
				+'<a href="#" style="font-family: FontAwesome" id="TD_DelColumn_'+$('#A_AddRow').val()+'" data-toggle="tooltip" title="Remove column">\uf056</a>'
				
				+'</td></tr>');	
				
				$('#TD_DelColumn_'+$('#A_AddRow').val()).on("click", function() {
					$(this).parents('tr').detach();
					 
				});
				$('#TD_UpColumn_'+$('#A_AddRow').val()).on("click", function() {
					var row = $(this).parents('tr');
					row.prev().before(row);			 
				});
				$('#TD_DownColumn_'+$('#A_AddRow').val()).on("click", function() {
					var row = $(this).parents('tr');
					row.next().after(row);		 
				});
				$('#TD_AdvColumn_'+$('#A_AddRow').val()).on("click", function() {
					showAdvColumn($(this));				 			 
				});
				
				$(function () {
				  $('[data-toggle="tooltip"]').tooltip()
				})
				
				vl = Number($('#A_AddRow').val())+1;
				$('#A_AddRow').val(vl);	

				$('[id^=S_BusTermCol_]').on("change", function() {
					changeSelectBusterm($(this));
					 
				});
				
				
			});
			
			$('[id^=S_BusTermCol_]').on("change", function() {
				changeSelectBusterm($(this));
			});
			
		}
		 
}
/** 
 * Initialize columns based on stereotype
 * @str {String} - Stereotype identificator
 */
function initColumns(str){
	var nd = $('#I_AddNodeId').val();
	var data = [];
	var cols = [];
	var c;
	
	jQuery.each(opts.groups[str].cols, function(i, val) {
		if (val.b == 'Key')
			c = val.a;
			
		var h = {};
		h['a'] = val.a;
		h['b'] = val.b;
		h['c'] = val.c;
		h['d'] = val.d;
		h['e'] = val.e;
		
		h['f'] = val.f;
		h['g'] = val.g;
		h['h'] = val.h;
		
		h['i'] = val.i;
		h['j'] = val.j;
		h['k'] = val.k;
		
		data.push(h);
	});

	if (c) {
		cons[nd] = {};
		var h = {};
		h['i'] = '1';
		h['c'] = c;
		h['o'] = '';
		
		cols.push(h);
		
		cons[nd][1] = {
			'i' : 1,
			't' : 'Key',
			'cols' : cols
		};
	}
	
	columns[$('#I_AddNodeId').val()] = data;
	
}
/** 
 *  Save columns from modal form
 *  
 */
function saveColumns(){
	var rows = $('#T_Columns').find('tr');
	var data = [];
	
	var fk = [];
	
	rows.each(function(){
		var td = $(this).find('td');
		var h = {};
		
		if (td.eq(0).text()) {
			h['a'] = td.eq(0).text();				//Column id within table
			h['b'] = td.eq(1).text();				//Column name
			h['c'] = td.eq(2).find('select').val();	//Related business term
			h['d'] = td.eq(3).find('select').val();	//Data type 
			h['e'] = td.eq(4).text();				//Default
			
			h['i'] = (td.eq(5).find('select').val()?td.eq(5).find('select').val():''); 	//FK
			h['j'] = td.eq(6).text();				//Description
			h['k'] = ($('#I_ColFK_'+td.eq(0).text()).val()?$('#I_ColFK_'+td.eq(0).text()).val():'') ; //FK
			
			
			//Advanced data definitions for columns
			var data_adv = columns[$('#I_AddNodeId').val()];
			jQuery.each(data_adv, function(i, val) {
				if (val.a == h['a']){
					h['l'] = data_adv[i]['l'];		//Min value
					h['m'] = data_adv[i]['m'];		//Max value
					h['n'] = data_adv[i]['n'];		//Average data length
					h['o'] = data_adv[i]['o'];		//Common values
					h['p'] = data_adv[i]['p'];		//% of not null 
					h['r'] = data_adv[i]['r'];		//Value pattern
				}
			});
			
			if ($('#I_ColFK_'+td.eq(0).text()).val() != ''){
				edges.update({
					id:$('#I_ColFK_'+td.eq(0).text()).val(), 
					label:td.eq(1).text()					 
				});
				fk.push($('#I_ColFK_'+td.eq(0).text()).val());
			}
			
			data.push(h);
		}
	});
	
	var ed = gph.getConnectedEdges($('#I_AddNodeId').val());
	jQuery.each(ed, function(i, val) {
		if (fk.indexOf(val) > -1){
			 
		
		} else {
			 if (edges.get(val).from == $('#I_AddNodeId').val())
				edges.remove(val);
		}
		 
		 
	});
	
	columns[$('#I_AddNodeId').val()] = data;
	
}

/** 
 * Save change log
 *  
 */
function saveChglog(){
	var rows = $('#T_Chglog').find('tr');
	var data = [];
	
	var fk = [];
	
	rows.each(function(){
		var td = $(this).find('td');
		var h = {};
		
		if (td.eq(0).text()) {
			
			h['i'] = td.eq(0).text();	//Log ID within table
			h['d'] = td.eq(1).text();	//Date 
			h['v'] = td.eq(2).text();	//Model Version
			h['e'] = td.eq(3).text();	//External ID
			h['r'] = td.eq(4).text();	//Requested by
			h['m'] = td.eq(5).text();	//Modified by 
			h['dsc'] = td.eq(6).text();	//Description
			
			
			data.push(h);
		}
	});
	 
	
	chglog[$('#I_AddNodeId').val()] = data;
	
}
/** 
 * Print HTML to show change log
 *  
 */
function showChangeLog(){
	var vl = 0;
	//table header
	var ht = 
	'<table id="T_Chglog" class="table table-bordered table-responsive-md table-striped table-sm" ><tr>'
	+'<th class="">#</th>'
	+'<th class="">Date</th>'
	+'<th class="">Model Version</th>'
	+'<th class="">External ID</th>'
	+'<th class="">Requested by</th>'
	+'<th class="">Modified by</th>'
	+'<th class="">Description</th>'
	+'<th class=""> </th></tr>';
	
	var rid = 0;
	var o;
	//print changelog table
	if (chglog[$('#I_AddNodeId').val()]){
		jQuery.each(chglog[$('#I_AddNodeId').val()], function(i, val) {
			ht += '<tr class="pad-slim"><td class=" pad-slim" style="text-align: center;">'+val.i 
			+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="Change date">'+val.d
			+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="Model Version">'+val.v
			+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="External Identification - Request number, bug number,..">'+val.e
			+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="Name of the requestor">'+val.r
			+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="Name of the modifier">'+val.m
			+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="Change description">'+val.dsc
			+'</td><td class=" " style="text-align: center;">' 
			+'<a href="#"   style="font-family: FontAwesome" id="TD_DelChglog_'+val.i+'" data-toggle="tooltip" title="Remove log">\uf056</a>' 
			+'</td></tr>';
			rid = (Number(val.i)>rid?Number(val.i):rid);
		});
		
	}
	 rid += 1;
	
	ht += '</table>'; 
	//add new 
	ht += '<div class="d-flex flex-row-reverse"><a href="#" id="A_AddChglog" class="align-middle btn btn-outline-primary btn-sm" style="font-family: FontAwesome" data-toggle="tooltip" title="Add log">\uf067</a></div>';
	
	$("#D_NodeChglog").html(ht);
	
	$('#A_AddChglog').val(rid);	
	
	$('[id^=TD_DelChglog_]').on("click", function() {
		$(this).parents('tr').detach();
	 
	});
				
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})
	
	$('#A_AddChglog').click(function () {
		$('#T_Chglog').append(
		'<tr><td class="" style="text-align: center;">' +$('#A_AddChglog').val()+'</td>'
			+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="Change date">' 
			+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="Model Version">' 
			+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="External Identification - Request number, bug number,..">' 
			+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="Name of the requestor">' 
			+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="Name of the modifier">' 
			+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="Chagne description">' 
	
		+'</td><td class="" style="text-align: center;">' 
		+'<a href="#" style="font-family: FontAwesome" id="TD_DelChglog_'+$('#A_AddChglog').val()+'" data-toggle="tooltip" title="Remove log">\uf056</a>'
		+'</td></tr>');	
		
		$('#TD_DelChglog_'+$('#A_AddChglog').val()).on("click", function() {
			$(this).parents('tr').detach();
			 
		});
	 
		
		$(function () {
		  $('[data-toggle="tooltip"]').tooltip()
		})
		
		vl = Number($('#A_AddChglog').val())+1;
		$('#A_AddChglog').val(vl);			 
		
	});
}

/** 
 * Create foreign key
 * @fr {String} From table
 * @to {String} To table
 * @col {String} column
 */
function setFK(fr, to, col=''){
	
	var id;
	if (col == '')
		col = (meta[to] ? meta[to].nm : '');
		
	var ed = gph.getConnectedEdges(fr);
	var notexists = true;
	jQuery.each(ed, function(i, val) {
		 
		if (edges.get(val).from == fr && edges.get(val).to == to){
		 	if (col == edges.get(val).col){
				notexists = false;
				id = val;
			}
			else if (edges.get(val).label == '' || !(edges.get(val).label)){
				edges.update({
					id:val, 
					label:col,
					'smooth': {'type': 'curvedCW', roundness: Math.random()%0.2 }					
				});
				id = val;
				notexists = false;
			}
		}
	});
	
	var cols = columns[fr];
	notexists = true;
	var a = 0;
	
	jQuery.each(cols, function(i, val) {
		if (val.b == col){			
			cols[i].i = to;
			notexists = false;
		}
		if (Number(cols[i].a) >= a)
			a = Number(cols[i].a)+1;
	});
	
	
	if (notexists){
		var h = {};
		h['a'] = a;
		h['b'] = (meta[to] ? meta[to].nm : '');
		h['c'] = '';
		h['d'] = 'ID';
		h['e'] = '';
			
		//h['f'] = '';
		//h['g'] = '';
		//h['h'] = '';
			
		h['i'] = to;
		h['j'] = '';
		h['k'] = id;
		
		columns[fr].push(h);
		
	} else {
		columns[fr] = cols;
	}
	
	items.update({
		id:fr, 
		label:getTableLabel(fr)					 
	});
		
}
/** 
 * Delete foreign key
 * @fr {String} From table
 * @fk {String} Key
 
 */
function delFK(fr, fk){
	gph.deleteSelected();
	
	var cols = columns[fr];
	jQuery.each(cols, function(i, val) {
		if (val.k == fk){
			cols[i].k = '';		
			cols[i].i = '';
		}
	});
	
	items.update({
		id:fr, 
		label:getTableLabel(fr)					 
	});
}

/** 
 * Print business term form
 *
 */
function showBusTermEdit(){
 		
		$('[data-toggle="tooltip"]').tooltip();
		
		$('#I_BusTerm_datatype').html('');
		jQuery.each(datatypes, function(i, val) {
			 $('#I_BusTerm_datatype').append($('<option>', { 
					value: i,
					text : i
				}));
				
		});
 
		if (bus_terms[$('#I_BusTerm').val()]){
			$('#I_BusTerm_short').val(bus_terms[$('#I_BusTerm').val()].short);
			$('#I_BusTerm_bus_name').val(bus_terms[$('#I_BusTerm').val()].name);
			$('#I_BusTerm_bus_desc').val(bus_terms[$('#I_BusTerm').val()].bus_desc);
			$('#I_BusTerm_datatype').val(bus_terms[$('#I_BusTerm').val()].datatype);
			$('#I_BusTerm_category').val(bus_terms[$('#I_BusTerm').val()].category);
			$('#I_BusTerm_mandatory').val(bus_terms[$('#I_BusTerm').val()].mandatory);
			$('#I_BusTerm_default').val(bus_terms[$('#I_BusTerm').val()].default);
			$('#I_BusTerm_mask_desc').val(bus_terms[$('#I_BusTerm').val()].mask_desc);
			$('#I_BusTerm_mask').val(bus_terms[$('#I_BusTerm').val()].mask);
			$('#I_BusTerm_subcategory').val(bus_terms[$('#I_BusTerm').val()].subcategory);
			$('#I_BusTerm_tags').val(bus_terms[$('#I_BusTerm').val()].tags);
			$('#I_BusTerm_Sensitivity').val(bus_terms[$('#I_BusTerm').val()].Sensitivity);
			$('#I_BusTerm_Analyst').val(bus_terms[$('#I_BusTerm').val()].Analyst);
			$('#I_BusTerm_Owner').val(bus_terms[$('#I_BusTerm').val()].Owner);
			$('#I_BusTerm_Project').val(bus_terms[$('#I_BusTerm').val()].Project);
			$('#I_BusTerm_example').val(bus_terms[$('#I_BusTerm').val()].example);
		
		} else {
			$('#I_BusTerm_short').val('');
			$('#I_BusTerm_bus_name').val('');
			$('#I_BusTerm_bus_desc').val('');
			$('#I_BusTerm_datatype').val('');
			$('#I_BusTerm_category').val('');
			$('#I_BusTerm_mandatory').val('');
			$('#I_BusTerm_default').val('');
			$('#I_BusTerm_mask_desc').val('');
			$('#I_BusTerm_mask').val('');
			$('#I_BusTerm_subcategory').val('');
			$('#I_BusTerm_tags').val('');
			$('#I_BusTerm_Sensitivity').val('');
			$('#I_BusTerm_Analyst').val('');
			$('#I_BusTerm_Owner').val('');
			$('#I_BusTerm_Project').val('');
			$('#I_BusTerm_example').val('');
		}
		
		
		$('#M_BusTermEdit').modal({
			backdrop: 'static',
			keyboard: false
		});
}
/** 
 * Change business term
 *
 */
function changeSelectBusterm(obj){
	
	var td = obj.parents('tr').find('td');	
	
	if (bus_terms[obj.val()]){
	 
		td.eq(3).find('select').prop('disabled', true);
		td.eq(4).prop('contenteditable', false);
		//td.eq(5).prop('contenteditable', false);
		
		td.eq(3).find('select').val(bus_terms[obj.val()].datatype);
		td.eq(4).text(bus_terms[obj.val()].default);
		//td.eq(5).text(bus_terms[obj.val()].mandatory);
	} else {
		td.eq(3).find('select').prop('disabled', false);
		td.eq(4).prop('contenteditable', true);
		//td.eq(5).prop('contenteditable', true);
	
	}
	
}
/** 
 * Show business terms table
 *
 */
function showBusTerms () {
	
	var ht = '<ul class="ul_tree h5" id="U_BusTerms_Tree">'
	var col_count = 0;
	var catg = Array();
	var c = {};
	jQuery.each(bus_terms, function(i, val) {
		if (!catg[val.category])
			catg[val.category] = Array();
		
		if (!catg[val.category][val.subcategory])
			catg[val.category][val.subcategory] = Array();
		c = {
			'name': val.name,
			'i': i,
			'desc':val.bus_desc
		};
		console.log(c);
		catg[val.category][val.subcategory].push(c);
		
	});
	
	jQuery.each(objectToArray(catg), function(a, val_a){
		
		console.log(val_a.id);
		ht += '<li><span class="caret text-primary">'+val_a.id+'</span>';
		ht += '<ul class="nested ">';
		jQuery.each(objectToArray(catg[val_a.id]), function(b, val_b){
			if (!val_b.id) return;
			ht += '<li><span class="caret text-primary">'+val_b.id+'</span>';
			ht += '<ul class="nested">';
			jQuery.each(catg[val_a.id][val_b.id], function(c, val_c){
				
				if (val_c)
					ht += '<li><a href=# id="A_bt_'+val_c.i+'"><b >' + val_c.name + '</b></a><p class="h6 small">'+val_c.desc+'</p></li>';
					
				
			});
			ht += '</ul>';
			ht += '</li>';
		});
		ht += '</ul>';
		ht += '</li>';
	});
	ht += '</ul>';
	
	$("#D_BusTermsTree").html(ht);
	
	$(".caret").on("click", function(e) {
		this.parentElement.querySelector(".nested").classList.toggle("active");
		this.classList.toggle("caret-down");
	});
	
	$("[id^=A_bt_]").on("click", function(e) {
		$('#I_BusTerm').val($(this).attr('id').replace('A_bt_', ''));
		
		showBusTermEdit();
 
	});
	$("#B_BusTermNew").on("click", function(e) {
		$('#I_BusTerm').val('');
		showBusTermEdit();
 
	});

}

/** 
 * Show constraints
 *
 */
function showCons(){
	var vl = 0;
	var tab_id = $('#I_AddNodeId').val();
	//table header
	var ht = 
	'<table id="T_Cons" class="table table-bordered table-responsive-md table-striped table-sm" ><tr>'
	+'<th style="width: 6.66%">#</th>'
	+'<th style="width: 25%">Type</th>'
	+'<th style="width: 60%">Columns</th>'
	+'<th style="width: 8.33%"> </th></tr>';
	
	var rid = 0;
	var o;
	//print table
	if (cons[tab_id]){
		jQuery.each(cons[tab_id], function(i, val) {
			var colNames = '';
			jQuery.each(cons[tab_id][i].cols, function(j, j_val) {
				if (colNames != '')
					colNames += ','
				colNames += getColumnLabel(tab_id, j_val.c) + (j_val.o?' (':'') + j_val.o + (j_val.o?')':'');
			});
			
						
			ht += '<tr class="pad-slim "><td class=" pad-slim" style="text-align: center;">'+val.i 
			+'</td><td class=" pad-slim " contenteditable="false" data-toggle="tooltip" title="Type">'+selectConsType(val.i, val.t) 
			+'</td><td class=" pad-slim " contenteditable="false" data-toggle="tooltip" id="TD_Cons_'+val.i+ '" title="Comma separated column names">'
			+ colNames
			+'</td><td class="" style="text-align: center;">' 
			+'<a href="#" class="pointer"  style="font-family: FontAwesome" id="TD_SelCons_'+val.i+'" data-toggle="tooltip" title="Select Columns">\uf013</a>' 
			+'<a href="#"   style="font-family: FontAwesome" id="TD_DelCons_'+val.i+'" data-toggle="tooltip" title="Remove Constraint/Index">\uf056</a>' 
			+'</td></tr>';
			rid = (Number(val.i)>rid?Number(val.i):rid);
		});
		
	}
	 rid += 1;
	
	ht += '</table>'; 
	//add line
	ht += '<div class="d-flex flex-row-reverse"><a href="#" id="A_AddCons" class="align-middle btn btn-outline-primary btn-sm" style="font-family: FontAwesome" data-toggle="tooltip" title="Add Constraint/Index">\uf067</a></div>';
	
	$("#D_NodeCons").html(ht);
	
	$('#A_AddCons').val(rid);	
	
	$('[id^=TD_DelCons_]').on("click", function() {
		$(this).parents('tr').detach();
	 
	});
	
	$('[id^=S_Cons_]').on("click", function() {
		$('#I_ConsColumns').val($(this).attr('id').replace('S_Cons_', ''));
		saveCons();
	});
	
	$('[id^=TD_SelCons_]').on("click", function() {
		$('#I_ConsColumns').val($(this).attr('id').replace('TD_SelCons_', ''));
		showConsColumns();
		$('#M_ConsColumns').modal({
			backdrop: 'static',
			keyboard: false
		});
	 
	});
				
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})
	
	
	
	$('#A_AddCons').click(function () {
		$('#T_Cons').append(
		'<tr><td class="" style="text-align: center;">' +$('#A_AddCons').val()+'</td>'
			+'</td><td class=" pad-slim" contenteditable="false" data-toggle="tooltip" title="Type">'+selectConsType($('#A_AddCons').val(), '') 
			+'</td><td class=" pad-slim " contenteditable="false" id="TD_Cons_'+$('#A_AddCons').val()+ '" data-toggle="tooltip" title="">'
		
		+'</td><td class="" style="text-align: center;">' 
		+'<a href="#" class="pointer" style="font-family: FontAwesome" id="TD_SelCons_'+$('#A_AddCons').val()+'" data-toggle="tooltip" title="Select Columns">\uf013</a>' 
		+'<a href="#" style="font-family: FontAwesome" id="TD_DelCons_'+$('#A_AddCons').val()+'" data-toggle="tooltip" title="Remove Constraint/Index">\uf056</a>'
		+'</td></tr>');	
		
		$('#TD_DelCons_'+$('#A_AddCons').val()).on("click", function() {
			$(this).parents('tr').detach();
			 
		});
		$('#TD_SelCons_'+$('#A_AddCons').val()).on("click", function() {
			$('#I_ConsColumns').val($(this).attr('id').replace('TD_SelCons_',''));
			showConsColumns();
			 
			$('#M_ConsColumns').modal({
				backdrop: 'static',
				keyboard: false
			});
		});	
		
		$('#S_Cons_'+$('#A_AddCons').val()).on("click", function() {
			$('#I_ConsColumns').val($(this).attr('id').replace('S_Cons_', ''));
			saveCons();
		});
	 
		
		$(function () {
		  $('[data-toggle="tooltip"]').tooltip()
		})
		
		vl = Number($('#A_AddCons').val())+1;
		$('#A_AddCons').val(vl);	

	});
	
}
/** 
 * Show constraint columns
 *
 */
function showConsColumns(){
	
			var id = $('#I_ConsColumns').val();
			var vl = 0;
			 
			var ht = 
			'<table id="T_ConsColumns" class="table table-bordered table-responsive-md table-striped table-sm" ><tr>'
			+'<th class="">#</th>'
			+'<th class="">Column Name</th>'
			+'<th class="">Option</th>'
			+'<th class=""> </th></tr>';
			
			var rid = 0;
			var o;
			 
			 
			if (cons[$('#I_AddNodeId').val()] && cons[$('#I_AddNodeId').val()][id] && cons[$('#I_AddNodeId').val()][id].cols){
				jQuery.each(cons[$('#I_AddNodeId').val()][id].cols, function(i, val) {
					 
					ht += '<tr class="pad-slim"><td class=" pad-slim" style="text-align: center;">'+val.i 
					+'</td><td class=" pad-slim" data-toggle="tooltip" title="Column name">'+getSelectColumns(val.i, val.c)
					+'</td><td class=" pad-slim" contenteditable="true" data-toggle="tooltip" title="Option (Asc, Desc,..)">'+val.o
					+'</td><td class=" " style="text-align: center;">' 
					+ '<a href="#"   style="font-family: FontAwesome" id="TD_UpConsColumns_'+val.i+'" data-toggle="tooltip" title="Move up">\uf139</a>'
					+ '<a href="#"   style="font-family: FontAwesome" id="TD_DownConsColumns_'+val.i+'" data-toggle="tooltip" title="Move down">\uf13a</a>'
					+'<a href="#"   style="font-family: FontAwesome" id="TD_DelConsColumns_'+val.i+'" data-toggle="tooltip" title="Remove ">\uf056</a>' 
					 
					+'</td></tr>';
					rid = (Number(val.i)>rid?Number(val.i):rid);
				});
				
			}
			 rid += 1;
			
			ht += '</table>'; 
			 
			ht += '<div class="d-flex flex-row-reverse"><a href="#" id="A_AddConsColumns" class="align-middle btn btn-outline-primary btn-sm" style="font-family: FontAwesome" data-toggle="tooltip" title="Add column">\uf067</a></div>';
			$("#D_ConsColumns").html(ht);
			
			$('#A_AddConsColumns').val(rid);	
			
			$('[id^=TD_DelConsColumns_]').on("click", function() {
				$(this).parents('tr').detach();
			 
			});
			 
			
			$('[id^=TD_UpConsColumns_]').on("click", function() {
				var row = $(this).parents('tr');
				row.prev().before(row);			 
			});
			$('[id^=TD_DownConsColumns_]').on("click", function() {
				var row = $(this).parents('tr');
				row.next().after(row);		 
			});
						
			$(function () {
			  $('[data-toggle="tooltip"]').tooltip()
			})
			
			$('#A_AddConsColumns').click(function () {
				$('#T_ConsColumns').append(
				'<tr><td class="" style="text-align: center;">' +$('#A_AddConsColumns').val()+'</td>'
				+'<td class="" data-toggle="tooltip" title="Column name">'+getSelectColumns($('#A_AddConsColumns').val(), '')+'</td>'	//Bus Term
				+'<td class="" contenteditable="true" data-toggle="tooltip" title="Option (Asc, Desc,..)"></td>' 	//name
				+'<td class="" style="text-align: center;">' 
				+'<a href="#"   style="font-family: FontAwesome" id="TD_UpConsColumns_'+$('#A_AddConsColumns').val()+'" data-toggle="tooltip" title="Move up">\uf139</a>'
				+'<a href="#"   style="font-family: FontAwesome" id="TD_DownConsColumns_'+$('#A_AddConsColumns').val()+'" data-toggle="tooltip" title="Move down">\uf13a</a>'
				+'<a href="#" style="font-family: FontAwesome" id="TD_DelConsColumns_'+$('#A_AddConsColumns').val()+'" data-toggle="tooltip" title="Remove column">\uf056</a>'
				
				+'</td></tr>');	
				
				$('#TD_DelConsColumns_'+$('#A_AddConsColumns').val()).on("click", function() {
					$(this).parents('tr').detach();
					 
				});
				$('#TD_UpConsColumns_'+$('#A_AddConsColumns').val()).on("click", function() {
					var row = $(this).parents('tr');
					row.prev().before(row);			 
				});
				$('#TD_DownConsColumns_'+$('#A_AddConsColumns').val()).on("click", function() {
					var row = $(this).parents('tr');
					row.next().after(row);		 
				});
				 
				$(function () {
				  $('[data-toggle="tooltip"]').tooltip()
				})
				
				vl = Number($('#A_AddConsColumns').val())+1;
				$('#A_AddConsColumns').val(vl);					
			});
	
}
/** 
 * Save constraints
 *
 */
function saveCons(){
	var nd = $('#I_AddNodeId').val();
	var cn = $('#I_ConsColumns').val();
	
	if (cons[nd] && cons[nd][cn]){
		cons[nd][cn].t = $('#S_Cons_'+cn).val()		
	} else {
		if (!cons[nd]) 
			cons[nd] = {};
		
		cons[nd][cn] = {
			'i' : cn,
			't' : $('#S_Cons_'+cn).val(),
			'cols' : []
		};
		
	} 
}
/** 
 * Save constraint columns
 *
 */
function saveConsCols (){
	var nd = $('#I_AddNodeId').val();
	var cn = $('#I_ConsColumns').val();
	
	var cols = [];
	
	var td_cols = '';
	
	var rows = $('#T_ConsColumns').find('tr');
	
	
	rows.each(function(){
		var td = $(this).find('td');
		var h = {};
		if (td_cols != '')
			td_cols += ',';
		
		td_cols += $('#'+td.eq(1).find('select').attr('id')+' option:selected').text() +(td.eq(2).text()?' (':'') + td.eq(2).text()+(td.eq(2).text()?')':'');
		
		if (td.eq(0).text()) {
			
			h['i'] = td.eq(0).text();
			h['c'] = td.eq(1).find('select').val();
			h['o'] = td.eq(2).text();
			
			cols.push(h);
		}
	});
	if (!cons[nd]) 
		cons[nd] = {};
	
	cons[nd][cn] = {
		'i' : cn,
		't' : $('#S_Cons_'+cn).val(),
		'cols' : cols
	};
	
	$('#TD_Cons_'+ cn).text(td_cols);
	
}

/** 
 * Show advanced columns configuration
 * @col {String} Column identificator
 */
function showAdvColumn(col){
	
	$('#I_AdvColumn_Id').val(col.attr('id').replace('TD_AdvColumn_', ''));
	var id = $('#I_AdvColumn_Id').val();
	
	var data = columns[$('#I_AddNodeId').val()];
	jQuery.each(data, function(i, val) {
		if (val.a == id){
			$('#I_AdvColumn_MinVal').val(data[i]['l']);
			$('#I_AdvColumn_MaxVal').val(data[i]['m']);
			$('#I_AdvColumn_AvgVal').val(data[i]['n']);
			$('#I_AdvColumn_Common').val(data[i]['o']);
			$('#I_AdvColumn_Filled').val(data[i]['p']);
			$('#I_AdvColumn_Mask').val(data[i]['r']);
			
		}
	});
	
	$('#M_AdvColumn').modal({
		backdrop: 'static',
		keyboard: false
	})
	
}
/** 
 * Save advanced column configurations
 *
 */
function saveAdvColumn(){
	if (!$('#I_AddNodeId').val()){
		console.log('No table selected');
		return;
	}
	
	var id = $('#I_AdvColumn_Id').val();
	var data = columns[$('#I_AddNodeId').val()];
	jQuery.each(data, function(i, val) {
		if (val.a == id){
			data[i]['l'] = $('#I_AdvColumn_MinVal').val();
			data[i]['m'] = $('#I_AdvColumn_MaxVal').val();
			data[i]['n'] = $('#I_AdvColumn_AvgVal').val();
			data[i]['o'] = $('#I_AdvColumn_Common').val();
			data[i]['p'] = $('#I_AdvColumn_Filled').val();
			data[i]['r'] = $('#I_AdvColumn_Mask').val();
			
		}
	});
	columns[$('#I_AddNodeId').val()] = data;
}
/** 
 * Print about modal
 */
function showAbout(){
	
	$("#D_Modal_Default_lg").html(about);
	
	$('#M_Default_lg').modal({
		//backdrop: 'static'
		 
	});
}
/** 
 * Save model metadata
 *
 */
function saveModelMeta(){
	model = {
	
	'Name' : $("#I_ModelMeta_Name").val(),
	'Version': $("#I_ModelMeta_Version").val(),
	'Schema' : $("#I_ModelMeta_Schema").val(),
	'Architect' : $("#I_ModelMeta_Architect").val(),
	'Business' : $("#I_ModelMeta_Business").val(),
	'Project' : $("#I_ModelMeta_Project").val(),
	'System' : $("#I_ModelMeta_System").val(),
	'Database' : $("#I_ModelMeta_Database").val(),
	'Description' : $("#I_ModelMeta_Description").val()
	};
}
/** 
 * Show model metadata
 *
 */
function showModelMeta(){
	
	if (model){
		$("#I_ModelMeta_Name").val(model.Name);
		$("#I_ModelMeta_Version").val(model.Version);
		$("#I_ModelMeta_Schema").val(model.Schema);
		$("#I_ModelMeta_Architect").val(model.Architect);
		$("#I_ModelMeta_Business").val(model.Business);
		$("#I_ModelMeta_Project").val(model.Project);
		$("#I_ModelMeta_System").val(model.System);
		$("#I_ModelMeta_Database").val(model.Database);
		$("#I_ModelMeta_Description").val(model.Description);
	}
	$('#M_ModelMeta').modal({
		backdrop: 'static',
		keyboard: false
	});
}
 
 $(document).ready(function() {
	startNetwork();
	
	showAbout();
	
	$('#GotoOptions').on("click", function(){
		showModelMeta();
	});
	$('#B_ModelMeta_Save').on("click", function(){
		saveModelMeta();
	});
	
	$('#GotoDataTypes').on("click", function(){
		showDatatypes();
		$('#M_Default_sm').modal({
			backdrop: 'static',
			keyboard: false
		})
	});
	
	$('#GotoAbout').on("click", function(){
		showAbout();
	});
	
	$('#GotoFit').on("click", function(){
		
		gph.fit();
	});
		
	
	$('#GotoRedraw').on("click", function(){
		gph.storePositions();
		startNetwork();
	});

	$('#GotoGroups').on("click", function(){
		//load groups
		var ht = '<table class="table table-bordered table-responsive-md table-striped text-center table-sm"><th>Stereotype</th><th>Description</th><tr>';
		
		jQuery.each(opts.groups, function(i, val) {
			
			if (val.dsc){
				
				ht += '<tr><td><a href=# id="A_Group_'+i+'"> '+ val.nm + '</a></td><td>' + val.dsc + '</td>';
				
			}
		});
		ht += '</table>'; 
		
		$("#D_GroupsTable").html(ht);
		 
		$('#M_Groups').modal({
			backdrop: 'static',
			keyboard: false
		})
	});
 
	$('#GotoColumns').on("click", function(){
		//load options
		 
		$('#M_ColumnsAll').modal({
			backdrop: 'static',
			keyboard: false
		})
	});
	 
	
	$('#GotoBusterms').on("click", function(){ 
				//load groups
		showBusTerms();
				
				 
		$('#M_BusTerms').modal({
			backdrop: 'static',
			keyboard: false
		})
	});
	
	$('#GotoImportNetwork').on("click", function(){  
			gph.storePositions();
			// pretty print node data
			$('#I_NetworkImport').val(
			'{"nodes":' +
				JSON.stringify(objectToArray(items._data), null, ' ') + 
			',"edges":' +
				JSON.stringify(objectToArray(edges._data), null, ' ') +
			',"options":' +
				JSON.stringify(opts, null, ' ') +
			',"model":' +
				JSON.stringify(model, null, ' ') +
			',"meta":' +
				JSON.stringify(meta, null, ' ') +
			',"bus_terms":' +
				JSON.stringify(bus_terms, null, ' ') +
			',"columns":' +
				JSON.stringify(columns, null, ' ') +
			',"cons":' +
				JSON.stringify(cons, null, ' ') +
			',"chglog":' +
				JSON.stringify(chglog, null, ' ') +
			'}'
			);
			
			$('#B_ExportNetwork').attr('href', 'data:text/json;charset=utf-8,' + encodeURIComponent($('#I_NetworkImport').val()) + '');
			
			
			$('#M_ImportNetwork').modal({
				backdrop: 'static',
				keyboard: false
			})
		});
	
	
	$('#B_BusTermSave').on("click", function() {
		var l_busterm = {
			"short": $('#I_BusTerm_short').val(),
			"name": $('#I_BusTerm_bus_name').val(),
			"bus_desc":$('#I_BusTerm_bus_desc').val(),
			"datatype":$('#I_BusTerm_datatype').val(),
			"category":$('#I_BusTerm_category').val(),
			"mandatory":$('#I_BusTerm_mandatory').val(),
			"default":$('#I_BusTerm_default').val(),
			"mask_desc":$('#I_BusTerm_mask_desc').val(),
			"mask":$('#I_BusTerm_mask').val(),
			"subcategory":$('#I_BusTerm_subcategory').val(),
			"tags":$('#I_BusTerm_tags').val(),
			"Sensitivity":$('#I_BusTerm_Sensitivity').val(),
			"Analyst":$('#I_BusTerm_Analyst').val(),
			"Owner":$('#I_BusTerm_Owner').val(),
			"Project":$('#I_BusTerm_Project').val(),
			"example":$('#I_BusTerm_example').val()
		}
		bus_terms[$('#I_BusTerm').val()] = l_busterm;	
			
		showBusTerms();
	});
	
	$('#B_BusTermDelete').on("click", function() {
		 
		delete bus_terms[$('#I_BusTerm').val()];	
			
		showBusTerms();
	});
	
	
	//listener for file chooser
	$('#I_ImportFile').change(f_FileSelection);

	$('#I_AddNodeType').on("change", function() {
		if (columns[$('#I_AddNodeId').val()])
			{}
		else 	
			initColumns($('#I_AddNodeType').val());
		
		showCons();
		showColumns();	
		
	});
	
	 
	$('#B_Menu').on("click", function(e) {
			var top = e.pageY - 10;
			var left = e.pageX;
			var mn = '';
			//click
			if (gph.getSelectedNodes()[0]){ //selected node
				mn = "#context-menu-node";
			
			} else if (gph.getSelectedEdges()[0]){// selected edge
				mn = "#context-menu-edge";			
			} 
			else { // empty space
				mn = "#context-menu";
			}
			
			$(mn).css({
				display: "block",
				top: top,
				left: left
			}).addClass("show");
			
			$('#A_Top').alert('close');
			
			return false;  
	});
	
	 
	//context menu (right click)
	$('#visualization').on('contextmenu', function(e) {
		
		 
			var top = e.pageY - 10;
			var left = e.pageX - 90;
			var mn = '';
			 
			if (gph.getSelectedNodes()[0]){ //node click
				mn = "#context-menu-node";
			
			} else if (gph.getSelectedEdges()[0]){// edge click
				mn = "#context-menu-edge";
			} 
			else { // empty space
				mn = "#context-menu";
			}
			
			$(mn).css({
				display: "block",
				top: top,
				left: left
			}).addClass("show");
			
			
			return false;  
	}).on("click", function() {
		$("[id^=context-menu]").removeClass("show").hide(); 			
	});
	
		

	//node context menu
	$("#context-menu-node a").on("click", function(e) {
	 
		// Add node
		if ($(this).attr('id') == 'GotoConnectNode'){  
			var newId = (Math.random() * 1e7).toString(32);
			var tp = 'g_'  +$(this).attr('title');
			items.add([{
				id: newId, 
				label: 'New Table',
				group: tp				
				}]);
			edges.add([{
				from: gph.getSelectedNodes()[0], 
				to: newId					 
			}])
		}
		//Delete
		if ($(this).attr('id') == 'GotoDeleteNode'){  
			gph.deleteSelected();
			
		}
		if ($(this).attr('id') == 'GotoGenerateNode'){  
			ext_gen_ddl($('#I_Gen_Result'));
			
			$('#M_Generate_DDL').modal({
					backdrop: 'static',
					keyboard: false
				})
			
		}
		
		
		 
		$(this).parent().removeClass("show").hide();
	});
	//edge context menu
	$("#context-menu-edge a").on("click", function(e) {
		//delete
		if ($(this).attr('id') == 'GotoDeleteEdge'){  
			delFK(edges.get(gph.getSelectedEdges()[0]).from, gph.getSelectedEdges()[0]);
			
		}
		if ($(this).attr('id') == 'GotoSwitchEdge'){  
			
			var ii = gph.getSelectedEdges()[0];
			
			var dash = false;
			/*if (
				items.get(edges.get(gph.getSelectedEdges()[0]).to).group == 'g_label') {
				dash = true;
			}if (
				items.get(edges.get(gph.getSelectedEdges()[0]).from).group == 'g_label') {
				dash = true;
			}*/
			
			edges.add([{
				from: edges.get(gph.getSelectedEdges()[0]).to, 
				to: edges.get(gph.getSelectedEdges()[0]).from,
				label: edges.get(gph.getSelectedEdges()[0]).label,
				color: edges.get(gph.getSelectedEdges()[0]).color, 
				title: edges.get(gph.getSelectedEdges()[0]).title,
				dashes:dash
			}])
			gph.deleteSelected();
			
		}
		 
		$(this).parent().removeClass("show").hide();
	});
		
		//default context menu
		$("#context-menu a").on("click", function(e) {
			
		 
			if ($(this).attr('id') == 'GotoFit2'){
				 
				gph.fit();
			}
			//add node 
			if ($(this).attr('id') == 'GotoAddNode'){
				 
				gph.addNodeMode();
			}
			//add edge  
			if ($(this).attr('id') == 'GotoAddEdge'){
				 
				gph.addEdgeMode();
			}
			
			$(this).parent().removeClass("show").hide();
		});
		
		
		$("#B_AdvColumn_Save").on("click", function(e) {
			saveAdvColumn();			
		});
		
		$("#B_SaveConsColumns").on("click", function(e) {
			saveConsCols();			
		});
		
		
		
		$("#B_AddNodeSave").on("click", function(e) {
		
			 
			saveColumns();
			saveChglog();
			
			var to_meta = {
				'nm': $('#I_AddNodeName').val(),
				'Inserts_Weekly': $('#I_Inserts_Weekly').val(),
				'Updates_Weekly':$('#I_Updates_Weekly').val(),
				'Deletes_Weekly':$('#I_Deletes_Weekly').val(),
				'Data_Sensitivity':$('#I_Data_Sensitivity').val(),
				'Data_Protection':$('#I_Data_Protection').val(),
				'Business_Owner':$('#I_Business_Owner').val(),
				'Technical_Owner':$('#I_Technical_Owner').val(),
				'Data_Origin':$('#I_Data_Origin').val()
			}
			meta[gph.getSelectedNodes()[0]] = to_meta;
			
			/*var txt = '<b>' + $('#I_AddNodeName').val()  + '</b>\n\n';
			$.each(columns[gph.getSelectedNodes()[0]], function(j, val){
				txt = txt + val.b + blank.slice(val.b.length, 32) + val.d + "  " + 
				"\n";
			});*/
						
			items.update({
				id:gph.getSelectedNodes()[0], 
				label:getTableLabel(gph.getSelectedNodes()[0]), 
				//color:$('#I_AddNodeColor').val(),
				group:$('#I_AddNodeType').val(),				
				title:$('#I_AddNodeDesc').val()
				});
			
			$('#I_AddNodeId').val('');
			$('#I_AddNodeName').val('');
			$('#I_AddNodeType').val('');
			$('#I_AddNodeDesc').val('');
			//$('#I_AddNodeColor').val('');
			
	 
		});
		$("#B_AddEdgeSave").on("click", function(e) {
			//update edge
			edges.update({
				id:gph.getSelectedEdges()[0], 
				label:$('#I_AddEdgeName').val(), 
				title:$('#I_AddEdgeDesc').val()
				});
			$('#I_AddEdgeId').val('');
			$('#I_AddEdgeName').val('');
			$('#I_AddEdgeDesc').val('');
	 
		});
		$("#B_ApplyConfig").on("click", function(e) {
			
			if ($("#I_HierarchyEnable").is(':checked')){
				opts.layout.hierarchical = {
					  enabled: true,
					  levelSeparation: 150,
					  parentCentralization: true,
					  sortMethod: 'directed' 
					}; 
			}
			else {
				opts.layout.hierarchical = false; 
			}
			
			if ($("#I_PhysicsEnable").is(':checked')){
				opts.physics = true; 
			}
			else {
				opts.physics = false; 
			}
			//update options
			gph.setOptions(opts);
		});
		
		//load dema
		$("#B_ImportLoadDemo").on("click", function(e) {
			$('#I_NetworkImport').val(JSON.stringify(demo));		
		});
		//import 
		$("#B_ImportNetwork").on("click", function(e) {
			var container = document.getElementById('visualization');
			
			var items_json = JSON.parse($('#I_NetworkImport').val()).nodes;
					
			if (JSON.parse($('#I_NetworkImport').val()).options){
				gph.setOptions(JSON.parse($('#I_NetworkImport').val()).options);	
				opts = JSON.parse($('#I_NetworkImport').val()).options;
			}
			if (JSON.parse($('#I_NetworkImport').val()).columns){
				//gph.setOptions(JSON.parse($('#I_NetworkImport').val()).options);	
				columns = JSON.parse($('#I_NetworkImport').val()).columns;
			}
			if (JSON.parse($('#I_NetworkImport').val()).cons){
				//gph.setOptions(JSON.parse($('#I_NetworkImport').val()).options);	
				cons = JSON.parse($('#I_NetworkImport').val()).cons;
			}
			if (JSON.parse($('#I_NetworkImport').val()).chglog){
				//gph.setOptions(JSON.parse($('#I_NetworkImport').val()).options);	
				chglog = JSON.parse($('#I_NetworkImport').val()).chglog;
			}
			if (JSON.parse($('#I_NetworkImport').val()).model){
				model = JSON.parse($('#I_NetworkImport').val()).model;
			}
			if (JSON.parse($('#I_NetworkImport').val()).meta){
				meta = JSON.parse($('#I_NetworkImport').val()).meta;
			}
			if (JSON.parse($('#I_NetworkImport').val()).bus_terms){
				bus_terms = JSON.parse($('#I_NetworkImport').val()).bus_terms;
			}
					
			items = new vis.DataSet([]);
			$.each(items_json, function(i){
				
				/*var txt = '<b>' + meta[items_json[i].id].nm  + '</b>\n\n';
				$.each(columns[items_json[i].id], function(j, val){
					txt = txt + val.b + blank.slice(val.b.length, 32) + val.d + "  " + 
					"\n";
				});*/
				
			
				items.add([{
					id: items_json[i].id, 
					label: getTableLabel(items_json[i].id),
					color: items_json[i].color,
					group: items_json[i].group,
					x: items_json[i].x,
					y: items_json[i].y,
					title: items_json[i].title
					}])
			});
			var edges_json = JSON.parse($('#I_NetworkImport').val()).edges;
			edges = new vis.DataSet([]);
			$.each(edges_json, function(k){
				edges.add([{
					id:edges_json[k].id,
					from: edges_json[k].from, 
					to: edges_json[k].to,
					label: edges_json[k].label,
					color: edges_json[k].color, 
					title: edges_json[k].title,
					'smooth': {'type': 'curvedCW', roundness: Math.random()%0.2 },
				}])
			});
			
			
			var data = {'nodes': items, 'edges': edges};
			gph.setData({'nodes':items, 'edges':edges}); // = new vis.Network(container, data, opts);
			gph.fit();
		});
		$("#ImportNetwork").on("click", function(e) {
			f_JSON_to_Network();	 
		});
		
});
