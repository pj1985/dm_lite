var opts = {
	groups: stereotypes,
	manipulation: false,
	height: '100%',
	interaction: {
		tooltipDelay: 200,
		hideEdgesOnDrag: false
	},
	nodes:{
		"shape": "box",
		font: { multi: true, align:'left', 'face': 'monospace' },
		"color":"#e7f9d1"
	},
	edges:{
		'arrows': 'to',
		"smooth": {
		  "type": "continuous",
		  "forceDirection": "none",
		  "roundness": 0.65
		},
		color:'grey'
	},
	layout: {},
	  
	physics:false 
	 
	 }