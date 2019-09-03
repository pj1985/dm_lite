var stereotypes = {
	"g_lookup": {
   "shape": "box",
    font: { multi: true, align:'left', 'face': 'monospace' },
	"color":"#fff9bc",
	"dsc":"Lookup table stores list of values with standard structure",
	"nm":"Lookup",
	"cols":[
		{"a":"0", "b":"Key", "d":"Natural Key", "e":"", "f":true, "g":true, "h":true},
		{"a":"1", "b":"Name", "d":"Name", "e":"", "f":true, "g":false,"h":true},
		{"a":"2", "b":"Description", "d":"Description", "e":"", "f":true, "g":false, "h":false},
		{"a":"3", "b":"Valid from", "d":"Date From", "e":"", "f":true, "g":false, "h":false},
		{"a":"4", "b":"Valid to", "d":"Date to", "e":"", "f":true, "g":false, "h":false}	
	]
  },
  "g_subject": {
   "shape": "box",
    font: { multi: true, align:'left', 'face': 'monospace' },
	"color":"#77a0ff",
	"dsc":"Main table to store subjects",
	"nm":"Subject",
	"cols":[
		{"a":"0", "b":"Key", "d":"Natural Key", "e":"", "f":true, "g":true, "h":true}
	]
  },
  "g_subject_special": {
   "shape": "box",
    font: { multi: true, align:'left', 'face': 'monospace' },
	"color":"#b3c6f2",
	"dsc":"Specialization tables for subjects",
	"nm":"Subject Specialization",
	"cols":[
		{"a":"0", "b":"Key", "d":"Natural Key", "e":"", "f":true, "g":true, "h":true},
	]
  },
  "g_relation": {
   "shape": "box",
    font: { multi: true, align:'left', 'face': 'monospace' },
	"color":"#fcd1d1",
	"dsc":"Table to store M:N relations",
	"nm":"Relationship",
	"cols":[]
  },
  "g_transaction": {
   "shape": "box",
    font: { multi: true, align:'left', 'face': 'monospace' },
	"color":"#e6f7de",
	"dsc":"Transaction table used only for inserts (or deletes during historization)",
	"nm":"Transaction",
	"cols":[
		{"a":"0", "b":"Key", "d":"Natural Key", "e":"", "f":true, "g":true, "h":true}
	]
  },
  "g_history": {
   "shape": "box",
    font: { multi: true, align:'left', 'face': 'monospace' },
	"color":"#cfd3cd",
	"dsc":"Table stores previous versions of record values",
	"nm":"History",
	"cols":[
		{"a":"0", "b":"Key", "d":"Natural Key", "e":"", "f":true, "g":true, "h":true}
	]
  },
  "g_fact": {
  "shape": "box",
    font: { multi: true, align:'left', 'face': 'monospace' },
	"color":"#feeaff",
	"dsc":"Actaul facts about subjects",
	"nm":"Fact",
	"cols":[
		{"a":"0", "b":"Key", "d":"Natural Key", "e":"", "f":true, "g":true, "h":true}
	]
  },
  "g_work": {
   "shape": "box",
    font: { multi: true, align:'left', 'face': 'monospace' },
	"color":"#e5e5e5",
	"dsc":"Working tables for processing",
	"nm":"Working",
	"cols":[
		{"a":"0", "b":"Key", "d":"Natural Key", "e":"", "f":true, "g":true, "h":true}
	]
  },
  "g_temp": {
  "shape": "box",
    font: { multi: true, align:'left', 'face': 'monospace' },
	"color":"#e5e5e5",
	"dsc":"Temporary tables",
	"nm":"Temporary",
	"cols":[
		{"a":"0", "b":"Key", "d":"Natural Key", "e":"", "f":true, "g":true, "h":true}
	]
  },
  "g_log": {
	"shape": "box",
    font: { multi: true, align:'left', 'face': 'monospace' },
	"color":"#e5e5e5",
	"dsc":"Logging tables (Insert only)",
	"nm":"Log",
	"cols":[
		{"a":"0", "b":"Key", "d":"Natural Key", "e":"", "f":true, "g":true, "h":true}
	]
  },
  "g_view_low": {
	"shape": "box",
    font: { multi: true, align:'left', 'face': 'monospace' },
	"color":"#d6bcff",
	"dsc":"Low level business view",
	"nm":"View - low",
	"cols":[
		{"a":"0", "b":"Key", "d":"Natural Key", "e":"", "f":true, "g":true, "h":true}
	]
  },
  "g_view_high": {
	"shape": "box",
    font: { multi: true, align:'left', 'face': 'monospace' },
	"color":"#d6bcff",
	"dsc":"High level business view",
	"nm":"View - high",
	"cols":[
		{"a":"0", "b":"Key", "d":"Natural Key", "e":"", "f":true, "g":true, "h":true}
	]
  }
  /*,
  "g_label": {
   "shape": "box",
    font: { multi: true, align:'left', 'face': 'monospace' },
   "physics": false,
   "dsc":"Description of the stereotype",
   "nm":"Label"
  }*/
   
	}