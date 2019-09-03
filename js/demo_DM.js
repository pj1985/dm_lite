var demo = {"nodes":[
 {
  "id": "3ec3a148-887d-47e8-9ca7-ff9425b8dfc4",
  "label": "<b>Party Type</b>\n\n#Key............................Natural Key  \nName............................Name  \nDescription.....................Description  \nValid from......................Date From  \nValid to........................Date To  \n",
  "group": "g_lookup",
  "x": -881,
  "y": -372,
  "title": "Type of party"
 },
 {
  "id": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
  "label": "<b>Party</b>\n\n#Key............................Natural Key  \nParty Type......................ID  \nFirst Name......................Name  \nLast Name.......................Name  \n",
  "group": "g_subject",
  "x": -330,
  "y": -190,
  "title": "Table stores attributes about party"
 },
 {
  "id": "ae0e5be9-4125-44b5-bb25-60dd381cfd42",
  "label": "<b>Address</b>\n\nStreet..........................Long Text  \nHouse No........................Numeric  \n+City...........................ID  \n+Party..........................ID  \n",
  "group": "g_subject",
  "x": 207,
  "y": -264,
  "title": "Address"
 },
 {
  "id": "693fe068-8e32-4860-bc22-96ce93a2a2f2",
  "label": "<b>City</b>\n\n#Key............................Natural Key  \nName............................Name  \nValid from......................Date From  \nValid to........................Date To  \n",
  "group": "g_lookup",
  "x": 407,
  "y": -451,
  "title": "City"
 },
 {
  "id": "f9561a0a-fc09-4273-a77e-91e91b3682e5",
  "label": "<b>Phone</b>\n\nParty...........................ID  \nPhone number....................Phone  \nNote............................Long Text  \nPhone Type......................ID  \n",
  "group": "g_subject",
  "x": 36,
  "y": -2,
  "title": ""
 },
 {
  "id": "1d57ffa0-8d00-4cb2-8794-635d44b7cf5d",
  "label": "<b>Phone Type</b>\n\n#Key............................Natural Key  \nName............................Name  \nDescription.....................Description  \nValid from......................Date From  \nValid to........................Date To  \n",
  "group": "g_lookup",
  "x": 523,
  "y": -13,
  "title": "Type of phone - mobile, work, home..."
 },
 {
  "id": "e51885a1-6aa7-4e30-9675-118b47a56307",
  "label": "<b>Party To Party</b>\n\n+Party_Related..................ID  \n+Party..........................ID  \n+Party Relation Type............ID  \n",
  "group": "g_relation",
  "x": -860,
  "y": 93,
  "title": "Relationship table"
 },
 {
  "id": "3d177b5c-b8f6-4214-b34d-904f06e6cf75",
  "label": "<b>Party Relation Type</b>\n\n#Key............................Natural Key  \nName............................Name  \nDescription.....................Description  \nValid from......................Date From  \nValid to........................Date To  \n",
  "group": "g_lookup",
  "x": -1111,
  "y": -128,
  "title": "Type of the relation between two parties"
 },
 {
  "id": "cd497658-b4fa-488f-8b9f-46fe1eb7fd37",
  "label": "<b>Party Company</b>\n\nCompany Name....................Name  \n+Party..........................ID  \n",
  "group": "g_subject_special",
  "x": -350,
  "y": -8,
  "title": "Party company attributes"
 },
 {
  "id": "2acc9c25-75a3-4a66-ab96-c0ae0a629ab4",
  "label": "<b>Party Interactions</b>\n\n#Key............................Natural Key  \nDate............................Date  \nInteraction details.............Long Text  \n+Party..........................ID  \n",
  "group": "g_transaction",
  "x": 20,
  "y": -615,
  "title": "Party interaction from CRM"
 },
 {
  "id": "2cee2595-2e29-4216-a564-8f9c6f302393",
  "label": "<b>Party History</b>\n\nParty...........................ID  \nChange Date.....................Date  \nChange Description..............Numeric  \n",
  "group": "g_history",
  "x": -847,
  "y": -597,
  "title": "Changes in the party"
 },
 {
  "id": "2c32f90b-8a26-495a-86b8-a1bf9a864200",
  "label": "<b>Party Facts</b>\n\nCalculated Value................Numeric  \n+Party..........................ID  \nAggregated Value 1..............Numeric  \nAggregated Value 2..............Numeric  \nAggregated Value 3..............Numeric  \nActual Number...................Numeric  \n",
  "group": "g_fact",
  "x": -330,
  "y": -629,
  "title": "Party Facts"
 },
 {
  "id": "dcc70f8a-79cf-4471-b9cf-416563251698",
  "label": "<b>Audit Log</b>\n\nBusiness Date...................Date  \nOperation.......................Numeric  \nParameters......................Long Text  \n",
  "group": "g_log",
  "x": -837,
  "y": -705,
  "title": "Business audit log for storing important activities for party"
 }
],"edges":[
 {
  "id": "9740b3dd-6972-4169-80f7-c6df8bd2857f",
  "label": "City",
  "smooth": {
   "type": "curvedCW",
   "roundness": 0.01334478012992979
  }
 },
 {
  "id": "7fa05981-11c4-404f-89f0-4af168961fa1",
  "from": "f9561a0a-fc09-4273-a77e-91e91b3682e5",
  "to": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
  "label": "Party",
  "smooth": {
   "type": "curvedCW",
   "roundness": 0.17107139853096098
  }
 },
 {
  "id": "e9b096a4-0706-4c7d-9a2b-66c8658a0dc2",
  "from": "f9561a0a-fc09-4273-a77e-91e91b3682e5",
  "to": "1d57ffa0-8d00-4cb2-8794-635d44b7cf5d",
  "label": "Phone Type",
  "smooth": {
   "type": "curvedCW",
   "roundness": 0.09730189768337527
  }
 },
 {
  "id": "fcd890bd-fe18-46a0-bc51-c0a130015f8b",
  "from": "e51885a1-6aa7-4e30-9675-118b47a56307",
  "to": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
  "label": "Party_Related",
  "smooth": {
   "type": "curvedCW",
   "roundness": 0.02560057211120087
  }
 },
 {
  "id": "bfaa0d9e-970c-40c7-abc9-6911a362f061",
  "from": "e51885a1-6aa7-4e30-9675-118b47a56307",
  "to": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
  "label": "Party",
  "smooth": {
   "type": "curvedCW",
   "roundness": 0.07048035047880807
  }
 },
 {
  "id": "d84a3662-a4e8-49c5-8a40-d0ed1d17a488",
  "from": "e51885a1-6aa7-4e30-9675-118b47a56307",
  "to": "3d177b5c-b8f6-4214-b34d-904f06e6cf75",
  "label": "Party Relation Type",
  "smooth": {
   "type": "curvedCW",
   "roundness": 0.10555661952617329
  }
 },
 {
  "id": "43ba8332-6a7c-46e2-a7d4-7916a10d1255",
  "from": "2cee2595-2e29-4216-a564-8f9c6f302393",
  "to": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
  "label": "Party",
  "smooth": {
   "type": "curvedCW",
   "roundness": 0.17269711096468943
  }
 },
 {
  "id": "9a86bebd-bc15-4f7f-86bf-07c4dc0c781d",
  "from": "cd497658-b4fa-488f-8b9f-46fe1eb7fd37",
  "to": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
  "label": "Party",
  "smooth": {
   "type": "curvedCW",
   "roundness": 0.15638632286083154
  }
 },
 {
  "id": "228c4745-c06b-4880-8ef6-b84199f034af",
  "from": "2c32f90b-8a26-495a-86b8-a1bf9a864200",
  "to": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
  "label": "Party",
  "smooth": {
   "type": "curvedCW",
   "roundness": 0.059759513432869726
  }
 },
 {
  "id": "c65a1510-e921-4214-b2fe-5d0b304385e1",
  "from": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
  "to": "3ec3a148-887d-47e8-9ca7-ff9425b8dfc4",
  "label": "Party Type",
  "smooth": {
   "type": "curvedCW",
   "roundness": 0.1903899853884315
  }
 },
 {
  "id": "951a84de-4491-4a65-b35b-383e5aeaee23",
  "from": "ae0e5be9-4125-44b5-bb25-60dd381cfd42",
  "to": "693fe068-8e32-4860-bc22-96ce93a2a2f2",
  "label": "City",
  "smooth": {
   "type": "curvedCW",
   "roundness": 0.11505337421998224
  }
 },
 {
  "id": "5635abf2-23cc-42f2-ac58-fa468e22b717",
  "from": "ae0e5be9-4125-44b5-bb25-60dd381cfd42",
  "to": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
  "label": "Party",
  "smooth": {
   "type": "curvedCW",
   "roundness": 0.12165140529404961
  }
 },
 {
  "id": "be5e0ff2-cf71-4927-ae9e-62f0f8c033f5",
  "from": "2acc9c25-75a3-4a66-ab96-c0ae0a629ab4",
  "to": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
  "label": "Party",
  "smooth": {
   "type": "curvedCW",
   "roundness": 0.1530928361761843
  }
 }
],"options":{
 "groups": {
  "g_lookup": {
   "shape": "box",
   "font": {
    "multi": true,
    "align": "left",
    "face": "monospace"
   },
   "color": "#fff9bc",
   "dsc": "Lookup table stores list of values with standard structure",
   "nm": "Lookup",
   "cols": [
    {
     "a": "0",
     "b": "Key",
     "d": "Natural Key",
     "e": "",
     "f": true,
     "g": true,
     "h": true
    },
    {
     "a": "1",
     "b": "Name",
     "d": "Name",
     "e": "",
     "f": true,
     "g": false,
     "h": true
    },
    {
     "a": "2",
     "b": "Description",
     "d": "Description",
     "e": "",
     "f": true,
     "g": false,
     "h": false
    },
    {
     "a": "3",
     "b": "Valid from",
     "d": "Date From",
     "e": "",
     "f": true,
     "g": false,
     "h": false
    },
    {
     "a": "4",
     "b": "Valid to",
     "d": "Date to",
     "e": "",
     "f": true,
     "g": false,
     "h": false
    }
   ]
  },
  "g_subject": {
   "shape": "box",
   "font": {
    "multi": true,
    "align": "left",
    "face": "monospace"
   },
   "color": "#77a0ff",
   "dsc": "Main table to store subjectse",
   "nm": "Subject",
   "cols": [
    {
     "a": "0",
     "b": "Key",
     "d": "Natural Key",
     "e": "",
     "f": true,
     "g": true,
     "h": true
    }
   ]
  },
  "g_subject_special": {
   "shape": "box",
   "font": {
    "multi": true,
    "align": "left",
    "face": "monospace"
   },
   "color": "#b3c6f2",
   "dsc": "Specialization tables for subjects",
   "nm": "Subject Specialization",
   "cols": [
    {
     "a": "0",
     "b": "Key",
     "d": "Natural Key",
     "e": "",
     "f": true,
     "g": true,
     "h": true
    }
   ]
  },
  "g_relation": {
   "shape": "box",
   "font": {
    "multi": true,
    "align": "left",
    "face": "monospace"
   },
   "color": "#fcd1d1",
   "dsc": "Table to store M:N relations",
   "nm": "Relationship",
   "cols": []
  },
  "g_transaction": {
   "shape": "box",
   "font": {
    "multi": true,
    "align": "left",
    "face": "monospace"
   },
   "color": "#e6f7de",
   "dsc": "Transaction table used only for inserts (or deletes during historization)",
   "nm": "Transaction",
   "cols": [
    {
     "a": "0",
     "b": "Key",
     "d": "Natural Key",
     "e": "",
     "f": true,
     "g": true,
     "h": true
    }
   ]
  },
  "g_history": {
   "shape": "box",
   "font": {
    "multi": true,
    "align": "left",
    "face": "monospace"
   },
   "color": "#cfd3cd",
   "dsc": "Table stores previous versions of record values",
   "nm": "History",
   "cols": [
    {
     "a": "0",
     "b": "Key",
     "d": "Natural Key",
     "e": "",
     "f": true,
     "g": true,
     "h": true
    }
   ]
  },
  "g_fact": {
   "shape": "box",
   "font": {
    "multi": true,
    "align": "left",
    "face": "monospace"
   },
   "color": "#feeaff",
   "dsc": "Actaul facts about subjects",
   "nm": "Fact",
   "cols": [
    {
     "a": "0",
     "b": "Key",
     "d": "Natural Key",
     "e": "",
     "f": true,
     "g": true,
     "h": true
    }
   ]
  },
  "g_work": {
   "shape": "box",
   "font": {
    "multi": true,
    "align": "left",
    "face": "monospace"
   },
   "color": "#e5e5e5",
   "dsc": "Working tables for processing",
   "nm": "Working",
   "cols": [
    {
     "a": "0",
     "b": "Key",
     "d": "Natural Key",
     "e": "",
     "f": true,
     "g": true,
     "h": true
    }
   ]
  },
  "g_temp": {
   "shape": "box",
   "font": {
    "multi": true,
    "align": "left",
    "face": "monospace"
   },
   "color": "#e5e5e5",
   "dsc": "Temporary tables",
   "nm": "Temporary",
   "cols": [
    {
     "a": "0",
     "b": "Key",
     "d": "Natural Key",
     "e": "",
     "f": true,
     "g": true,
     "h": true
    }
   ]
  },
  "g_log": {
   "shape": "box",
   "font": {
    "multi": true,
    "align": "left",
    "face": "monospace"
   },
   "color": "#e5e5e5",
   "dsc": "Logging tables (Insert only)",
   "nm": "Log",
   "cols": [
    {
     "a": "0",
     "b": "Key",
     "d": "Natural Key",
     "e": "",
     "f": true,
     "g": true,
     "h": true
    }
   ]
  },
  "g_view_low": {
   "shape": "box",
   "font": {
    "multi": true,
    "align": "left",
    "face": "monospace"
   },
   "color": "#d6bcff",
   "dsc": "Low level business view",
   "nm": "View - low",
   "cols": [
    {
     "a": "0",
     "b": "Key",
     "d": "Natural Key",
     "e": "",
     "f": true,
     "g": true,
     "h": true
    }
   ]
  },
  "g_view_high": {
   "shape": "box",
   "font": {
    "multi": true,
    "align": "left",
    "face": "monospace"
   },
   "color": "#d6bcff",
   "dsc": "High level business view",
   "nm": "View - high",
   "cols": [
    {
     "a": "0",
     "b": "Key",
     "d": "Natural Key",
     "e": "",
     "f": true,
     "g": true,
     "h": true
    }
   ]
  },
  "g_label": {
   "shape": "box",
   "font": {
    "multi": true,
    "align": "left",
    "face": "monospace"
   },
   "physics": false,
   "dsc": "Description of the stereotype",
   "nm": "Label"
  }
 },
 "manipulation": false,
 "height": "100%",
 "interaction": {
  "tooltipDelay": 200,
  "hideEdgesOnDrag": false
 },
 "nodes": {
  "shape": "box",
  "font": {
   "multi": true,
   "align": "left",
   "face": "monospace"
  },
  "color": "#e7f9d1"
 },
 "edges": {
  "arrows": "to",
  "smooth": {
   "type": "continuous",
   "forceDirection": "none",
   "roundness": 0.65
  },
  "color": "grey"
 },
 "layout": {},
 "physics": false
},"model":{
 "Name": "Party Model",
 "Version": "1.2",
 "Schema": "OD",
 "Architect": "Jeor Mormont",
 "Business": "Tormund Giantsbane",
 "Project": "CRM",
 "System": "Core Avalon",
 "Database": "ODS",
 "Description": "Customer operational database"
},"meta":{
 "3ec3a148-887d-47e8-9ca7-ff9425b8dfc4": {
  "nm": "Party Type",
  "Inserts_Weekly": "0",
  "Updates_Weekly": "0",
  "Deletes_Weekly": "0",
  "Data_Sensitivity": "1",
  "Data_Protection": "1",
  "Business_Owner": "Stannis Baratheon",
  "Technical_Owner": "Stannis Baratheon",
  "Data_Origin": "MDM"
 },
 "ca627cf3-3beb-4ddc-8077-edd092fd2cb4": {
  "nm": "Party",
  "Inserts_Weekly": "10",
  "Updates_Weekly": "10",
  "Deletes_Weekly": "10",
  "Data_Sensitivity": "4",
  "Data_Protection": "3",
  "Business_Owner": "Holub",
  "Technical_Owner": "Hrdlicka",
  "Data_Origin": "CRM"
 },
 "ae0e5be9-4125-44b5-bb25-60dd381cfd42": {
  "nm": "Address",
  "Inserts_Weekly": "10",
  "Updates_Weekly": "100",
  "Deletes_Weekly": "10",
  "Data_Sensitivity": "4",
  "Data_Protection": "3",
  "Business_Owner": "Holub",
  "Technical_Owner": "Holub",
  "Data_Origin": "CRM"
 },
 "693fe068-8e32-4860-bc22-96ce93a2a2f2": {
  "nm": "City",
  "Inserts_Weekly": "0",
  "Updates_Weekly": "0",
  "Deletes_Weekly": "0",
  "Data_Sensitivity": "1",
  "Data_Protection": "1",
  "Business_Owner": "Margaery Tyrell",
  "Technical_Owner": "Margaery Tyrell",
  "Data_Origin": "MDM"
 },
 "f9561a0a-fc09-4273-a77e-91e91b3682e5": {
  "nm": "Phone",
  "Inserts_Weekly": "100",
  "Updates_Weekly": "1000",
  "Deletes_Weekly": "10",
  "Data_Sensitivity": "4",
  "Data_Protection": "3",
  "Business_Owner": "Holub",
  "Technical_Owner": "Holub",
  "Data_Origin": "CRM"
 },
 "1d57ffa0-8d00-4cb2-8794-635d44b7cf5d": {
  "nm": "Phone Type",
  "Inserts_Weekly": "0",
  "Updates_Weekly": "0",
  "Deletes_Weekly": "0",
  "Data_Sensitivity": "1",
  "Data_Protection": "1",
  "Business_Owner": "Jaqen H'ghar",
  "Technical_Owner": "Jaqen H'ghar",
  "Data_Origin": "MDM"
 },
 "e51885a1-6aa7-4e30-9675-118b47a56307": {
  "nm": "Party To Party",
  "Inserts_Weekly": "10",
  "Updates_Weekly": "100",
  "Deletes_Weekly": "10",
  "Data_Sensitivity": "4",
  "Data_Protection": "3",
  "Business_Owner": "Holub",
  "Technical_Owner": "Holub",
  "Data_Origin": "CRM"
 },
 "3d177b5c-b8f6-4214-b34d-904f06e6cf75": {
  "nm": "Party Relation Type",
  "Inserts_Weekly": "0",
  "Updates_Weekly": "0",
  "Deletes_Weekly": "0",
  "Data_Sensitivity": "1",
  "Data_Protection": "1",
  "Business_Owner": "Stannis Baratheon",
  "Technical_Owner": "Stannis Baratheon",
  "Data_Origin": "MDM"
 },
 "cd497658-b4fa-488f-8b9f-46fe1eb7fd37": {
  "nm": "Party Company",
  "Inserts_Weekly": "10",
  "Updates_Weekly": "10",
  "Deletes_Weekly": "10",
  "Data_Sensitivity": "4",
  "Data_Protection": "3",
  "Business_Owner": "Jaqen H'ghar",
  "Technical_Owner": "Jaqen H'ghar",
  "Data_Origin": "CRM"
 },
 "2acc9c25-75a3-4a66-ab96-c0ae0a629ab4": {
  "nm": "Party Interactions",
  "Inserts_Weekly": "100000",
  "Updates_Weekly": "0",
  "Deletes_Weekly": "0",
  "Data_Sensitivity": "4",
  "Data_Protection": "4",
  "Business_Owner": "Samwell Tarly",
  "Technical_Owner": "Samwell Tarly",
  "Data_Origin": "Call Center"
 },
 "2cee2595-2e29-4216-a564-8f9c6f302393": {
  "nm": "Party History",
  "Inserts_Weekly": "1000",
  "Updates_Weekly": "0",
  "Deletes_Weekly": "0",
  "Data_Sensitivity": "4",
  "Data_Protection": "2",
  "Business_Owner": "Tormund Giantsbane",
  "Technical_Owner": "Tywin Lannister",
  "Data_Origin": "CRM"
 },
 "2c32f90b-8a26-495a-86b8-a1bf9a864200": {
  "nm": "Party Facts",
  "Inserts_Weekly": "10",
  "Updates_Weekly": "10000",
  "Deletes_Weekly": "10",
  "Data_Sensitivity": "5",
  "Data_Protection": "2",
  "Business_Owner": "Jaqen H'ghar",
  "Technical_Owner": "Jaqen H'ghar",
  "Data_Origin": "Core"
 },
 "dcc70f8a-79cf-4471-b9cf-416563251698": {
  "nm": "Audit Log",
  "Inserts_Weekly": "100000",
  "Updates_Weekly": "0",
  "Deletes_Weekly": "0",
  "Data_Sensitivity": "5",
  "Data_Protection": "3",
  "Business_Owner": "Jeor Mormont",
  "Technical_Owner": "Talisa Maegyr",
  "Data_Origin": "Core"
 }
},"bus_terms":
 {
  "Account.Accounting.Interest": {
    "short": "Interest",
    "name": "Interest",
    "bus_desc": "Money paid (cost of credit) for the use of money.",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Accounting",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Party.Corporation.Corporation": {
    "short": "Corporation",
    "name": "Corporation",
    "bus_desc": "A form of business registered with the state as a legal entity.",
    "datatype": "Short Text",
    "category": "Party",
    "subcategory": "Corporation",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Party.Partner.General Partner": {
    "short": "Partner",
    "name": "General Partner",
    "bus_desc": "When a business is a partnership, every owner who holds a share (a percentage) of the company shares in the profits and losses.  General partners are responsible for total liabilities.",
    "datatype": "Short Text",
    "category": "Party",
    "subcategory": "Partner",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Party.Partner.Agent": {
    "short": "Agent",
    "name": "Agent",
    "bus_desc": "someone who acts on behalf of another person or organisation",
    "datatype": "Name",
    "category": "Party",
    "subcategory": "Partner",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Party.Partner.Limited Partnership": {
    "short": "Partnership",
    "name": "Limited Partnership",
    "bus_desc": "Partner that invests in a business and receives a share of the profits (or losses).  A partner’s liability is limited by the amount of his or her investment.  A limited partner does not have any management authority in the operation of the business; the role is purely that of an investor.",
    "datatype": "Name",
    "category": "Party",
    "subcategory": "Partner",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Party.Address.Street": {
    "short": "Street",
    "name": "Street",
    "bus_desc": "",
    "datatype": "Short Text",
    "category": "Party",
    "subcategory": "Address",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Party.Address.City": {
    "short": "City",
    "name": "City",
    "bus_desc": "",
    "datatype": "Short Text",
    "category": "Party",
    "subcategory": "Address",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Party.Address.State": {
    "short": "State",
    "name": "State",
    "bus_desc": "",
    "datatype": "Short Text",
    "category": "Party",
    "subcategory": "Address",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Party.Address.ZIP": {
    "short": "ZIP",
    "name": "ZIP",
    "bus_desc": "",
    "datatype": "Short Text",
    "category": "Party",
    "subcategory": "Address",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Party.Contact.Phone number": {
    "short": "Phone",
    "name": "Phone number",
    "bus_desc": "",
    "datatype": "Short Text",
    "category": "Party",
    "subcategory": "Contact",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Party.Contact.Mobile phone number": {
    "short": "Mobile",
    "name": "Mobile phone number",
    "bus_desc": "",
    "datatype": "Short Text",
    "category": "Party",
    "subcategory": "Contact",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Party.Liabilities.Current liabilities": {
    "short": "Current",
    "name": "Current liabilities",
    "bus_desc": "",
    "datatype": "Money",
    "category": "Party",
    "subcategory": "Liabilities",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Party.Liabilities.Long-term liabilities": {
    "short": "Long-term",
    "name": "Long-term liabilities",
    "bus_desc": "",
    "datatype": "Money",
    "category": "Party",
    "subcategory": "Liabilities",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Loan.Mortgage.Commercial Mortgage": {
    "short": "Mortgage",
    "name": "Commercial Mortgage",
    "bus_desc": "A loan for a business’ real estate.  Rates and terms are negotiated and the finance charge is usually related to the prime rate.",
    "datatype": "Short Text",
    "category": "Loan",
    "subcategory": "Mortgage",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Loan.Term Loan.Term Loan": {
    "short": "Term Loan",
    "name": "Term Loan",
    "bus_desc": "Loan, given in one lump sum, is provided at the closing.  Repayment is monthly.",
    "datatype": "Money",
    "category": "Loan",
    "subcategory": "Term Loan",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Loan.Commitment.Commitment": {
    "short": "Commitment",
    "name": "Commitment",
    "bus_desc": "When a lender agrees to lend a specific amount, with the rates, terms, conditions and covenants…in writing",
    "datatype": "Short Text",
    "category": "Loan",
    "subcategory": "Commitment",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Loan.Commitment.Cosigner": {
    "short": "Cosigner",
    "name": "Cosigner",
    "bus_desc": "A person who signs and guarantees a loan for someone else.",
    "datatype": "Name",
    "category": "Loan",
    "subcategory": "Commitment",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Loan.Commitment.Credit": {
    "short": "Credit",
    "name": "Credit",
    "bus_desc": "Lenders’ agreement to provide funds or apply money to an account owned by the customer.",
    "datatype": "Money",
    "category": "Loan",
    "subcategory": "Commitment",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Loan.Commitment.Guarantor": {
    "short": "Guarantor",
    "name": "Guarantor",
    "bus_desc": "A guarantor has the same responsibilities as a co-signer.  If the loan goes into default and is not paid by the signer(s) of the loan, the guarantor is responsible.",
    "datatype": "Name",
    "category": "Loan",
    "subcategory": "Commitment",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Loan.Commitment.Loan Agreement": {
    "short": "Agreement",
    "name": "Loan Agreement",
    "bus_desc": "The document or contract of the parties that reflects the commitment.",
    "datatype": "Short Text",
    "category": "Loan",
    "subcategory": "Commitment",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Loan.Scoring.Credit Scoring": {
    "short": "Scoring",
    "name": "Credit Scoring",
    "bus_desc": "A predetermined process of scoring which is used to approve or reject loan applications.",
    "datatype": "Numeric",
    "category": "Loan",
    "subcategory": "Scoring",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Loan.Commitment.Fixed Rate of Interest": {
    "short": "Fixed Rate",
    "name": "Fixed Rate of Interest",
    "bus_desc": "Interest rate remains the same for the length of the loan.",
    "datatype": "Percentage",
    "category": "Loan",
    "subcategory": "Commitment",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Loan.Commitment.Variable Rate of Interest": {
    "short": "Variabile Rate",
    "name": "Variable Rate of Interest",
    "bus_desc": "Interest rate depends upon an index and increases or decreases",
    "datatype": "",
    "category": "Loan",
    "subcategory": "Commitment",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Assets.Fixed Assets": {
    "short": "Fixed Asset",
    "name": "Fixed Assets",
    "bus_desc": "Assets like furniture, fixtures, equipment, machinery, and real estate.",
    "datatype": "",
    "category": "Account",
    "subcategory": "Assets",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Insurance.Accident.Ambulatory Services": {
    "short": "Service",
    "name": "Ambulatory Services",
    "bus_desc": "health services provided to members who are not confined to a health care institution",
    "datatype": "",
    "category": "Insurance",
    "subcategory": "Accident",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Payment.Ability to Pay": {
    "short": "Ability to Pay",
    "name": "Ability to Pay",
    "bus_desc": "Ability to pay loans from the business’ income.",
    "datatype": "Boolean",
    "category": "Account",
    "subcategory": "Payment",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Account.Accounts Payable": {
    "short": "Accounts",
    "name": "Accounts Payable",
    "bus_desc": "Expenses incurred and purchases made, but not paid for.",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Account",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Account.Cash Flow": {
    "short": "Cash Flow",
    "name": "Cash Flow",
    "bus_desc": "Money available from a business’ operations to satisfy cash needs.  The primary source for monthly payments on a loan.",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Account",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Account.Current Assets": {
    "short": "Current",
    "name": "Current Assets",
    "bus_desc": "Assets that can be converted into cash in one year.  Non-Current Assets take one year or more.",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Account",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Payment.Quick Payment": {
    "short": "Quick Pay",
    "name": "Quick Payment",
    "bus_desc": "Quick payment within bank",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Payment",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Payment.Advance": {
    "short": "Advance",
    "name": "Advance",
    "bus_desc": "Money withdrawn from a pre-approved line of credit.",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Payment",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Assets.Current Assests": {
    "short": "Current Asset",
    "name": "Current Assests",
    "bus_desc": "",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Assets",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Assets.Non-Current Assests": {
    "short": "Non-Current Asset",
    "name": "Non-Current Assests",
    "bus_desc": "Assets that take one year or more to turn into cash.",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Assets",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Assets.Liquidity": {
    "short": "Liquidity",
    "name": "Liquidity",
    "bus_desc": "A company’s ability to pay its expenses.  The ability to turn an asset into cash (such as selling a piece of machinery).",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Assets",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Loan.Business.Business Credit": {
    "short": "Business Credit",
    "name": "Business Credit",
    "bus_desc": "Loans made to businesses in the form of a term loan or a line of credit.",
    "datatype": "Money",
    "category": "Loan",
    "subcategory": "Business",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Business Events.Marketing.Marketing Call": {
    "short": "Marketing Call",
    "name": "Marketing Call",
    "bus_desc": "Call to non customer",
    "datatype": "Short Text",
    "category": "Business Events",
    "subcategory": "Marketing",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Assets.Market Value": {
    "short": "Market Value",
    "name": "Market Value",
    "bus_desc": "The price an asset, product or service will bring in a current, competitive market.",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Assets",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Assets.Net Worth": {
    "short": "Net Worth",
    "name": "Net Worth",
    "bus_desc": "Assets less liabilities",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Assets",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Accounting.Net Profit": {
    "short": "Net Profit",
    "name": "Net Profit",
    "bus_desc": "Money left after all expenses have been paid.  Used to pay loans and grow the company.",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Accounting",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Accounting.Net Sales": {
    "short": "Net Sales",
    "name": "Net Sales",
    "bus_desc": "Revenue or income from sales after returns and allowances are deducted.",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Accounting",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Accounting.Overdraft": {
    "short": "Overdraft",
    "name": "Overdraft",
    "bus_desc": "When the amount of a check exceeds the available balance",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Accounting",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Account.Accounting.Balance Sheet": {
    "short": "Balance Sheet",
    "name": "Balance Sheet",
    "bus_desc": "accounting statement showing the financial condition of a company at a particular date.",
    "datatype": "Money",
    "category": "Account",
    "subcategory": "Accounting",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Finance.Fees.Application Fees": {
    "short": "Application Fees",
    "name": "Application Fees",
    "bus_desc": "",
    "datatype": "Money",
    "category": "Finance",
    "subcategory": "Fees",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  },
  "Finance.Fees.Exit Fees": {
    "short": "Exit Fees",
    "name": "Exit Fees",
    "bus_desc": "",
    "datatype": "Money",
    "category": "Finance",
    "subcategory": "Fees",
    "default": "",
    "mask_desc": "",
    "mask": "",
    "tags": "",
    "Sensitivity": 4,
    "Analyst": "Talisa Maegyr",
    "Owner": "Samwell Tarly",
    "Project": "MDM",
    "example": ""
  }
},"columns":{
 "3ec3a148-887d-47e8-9ca7-ff9425b8dfc4": [
  {
   "a": "0",
   "b": "Key",
   "c": "",
   "d": "Natural Key",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "1",
   "b": "Name",
   "c": "",
   "d": "Name",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "2",
   "b": "Description",
   "c": "",
   "d": "Description",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "3",
   "b": "Valid from",
   "c": "",
   "d": "Date From",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "4",
   "b": "Valid to",
   "c": "",
   "d": "Date To",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  }
 ],
 "ca627cf3-3beb-4ddc-8077-edd092fd2cb4": [
  {
   "a": "0",
   "b": "Key",
   "c": "",
   "d": "Natural Key",
   "e": "",
   "i": "",
   "j": "undefined",
   "k": ""
  },
  {
   "a": "4",
   "b": "Party Type",
   "c": "",
   "d": "ID",
   "e": "",
   "i": "",
   "j": "",
   "k": "c65a1510-e921-4214-b2fe-5d0b304385e1"
  },
  {
   "a": "1",
   "b": "First Name",
   "c": "Party.Personal_Identification.Person_First_Name",
   "d": "Name",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "3",
   "b": "Last Name",
   "c": "Party.Personal_Identification.Person_Last_Name",
   "d": "Name",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  }
 ],
 "ae0e5be9-4125-44b5-bb25-60dd381cfd42": [
  {
   "a": "1",
   "b": "Street",
   "c": "",
   "d": "Long Text",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "3",
   "b": "House No",
   "c": "",
   "d": "Numeric",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "4",
   "b": "City",
   "c": "",
   "d": "ID",
   "e": "",
   "i": "693fe068-8e32-4860-bc22-96ce93a2a2f2",
   "j": "",
   "k": "951a84de-4491-4a65-b35b-383e5aeaee23"
  },
  {
   "a": "5",
   "b": "Party",
   "c": "",
   "d": "ID",
   "e": "",
   "i": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
   "j": "",
   "k": "5635abf2-23cc-42f2-ac58-fa468e22b717"
  }
 ],
 "693fe068-8e32-4860-bc22-96ce93a2a2f2": [
  {
   "a": "0",
   "b": "Key",
   "c": "",
   "d": "Natural Key",
   "e": "",
   "i": "",
   "j": "Uppercase code",
   "k": "",
   "l": "",
   "m": "",
   "n": "15",
   "o": "",
   "p": "100",
   "r": "9"
  },
  {
   "a": "1",
   "b": "Name",
   "c": "",
   "d": "Name",
   "e": "",
   "i": "",
   "j": "Name of the city",
   "k": "",
   "l": "",
   "m": "",
   "n": "25",
   "o": "",
   "p": "100",
   "r": "3"
  },
  {
   "a": "3",
   "b": "Valid from",
   "c": "",
   "d": "Date From",
   "e": "",
   "i": "",
   "j": "Date valid from",
   "k": "",
   "l": "",
   "m": "",
   "n": "",
   "o": "",
   "p": "30",
   "r": "12"
  },
  {
   "a": "4",
   "b": "Valid to",
   "c": "",
   "d": "Date To",
   "e": "",
   "i": "",
   "j": "Date valid to",
   "k": "",
   "l": "",
   "m": "",
   "n": "",
   "o": "",
   "p": "30",
   "r": "12"
  }
 ],
 "f9561a0a-fc09-4273-a77e-91e91b3682e5": [
  {
   "a": "1",
   "b": "Party",
   "c": "",
   "d": "ID",
   "e": "",
   "i": "",
   "j": "",
   "k": "7fa05981-11c4-404f-89f0-4af168961fa1"
  },
  {
   "a": "2",
   "b": "Phone number",
   "c": "Party.Personal_Contact.Phone_Number",
   "d": "Phone",
   "e": "",
   "i": "",
   "j": "Phone number in MSISDN format",
   "k": ""
  },
  {
   "a": "3",
   "b": "Note",
   "c": "",
   "d": "Long Text",
   "e": "",
   "i": "",
   "j": "Note for the phone number",
   "k": ""
  },
  {
   "a": "4",
   "b": "Phone Type",
   "c": "",
   "d": "ID",
   "e": "",
   "i": "",
   "j": "",
   "k": "e9b096a4-0706-4c7d-9a2b-66c8658a0dc2"
  }
 ],
 "1d57ffa0-8d00-4cb2-8794-635d44b7cf5d": [
  {
   "a": "0",
   "b": "Key",
   "c": "",
   "d": "Natural Key",
   "e": "",
   "i": "",
   "j": "Uppercase code of type",
   "k": ""
  },
  {
   "a": "1",
   "b": "Name",
   "c": "",
   "d": "Name",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "2",
   "b": "Description",
   "c": "",
   "d": "Description",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "3",
   "b": "Valid from",
   "c": "",
   "d": "Date From",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "4",
   "b": "Valid to",
   "c": "",
   "d": "Date To",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  }
 ],
 "e51885a1-6aa7-4e30-9675-118b47a56307": [
  {
   "a": "0",
   "b": "Party_Related",
   "c": "",
   "d": "ID",
   "e": "",
   "i": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
   "j": "",
   "k": "fcd890bd-fe18-46a0-bc51-c0a130015f8b"
  },
  {
   "a": "1",
   "b": "Party",
   "c": "",
   "d": "ID",
   "e": "",
   "i": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
   "j": "",
   "k": "bfaa0d9e-970c-40c7-abc9-6911a362f061"
  },
  {
   "a": "2",
   "b": "Party Relation Type",
   "c": "",
   "d": "ID",
   "e": "",
   "i": "3d177b5c-b8f6-4214-b34d-904f06e6cf75",
   "j": "",
   "k": "d84a3662-a4e8-49c5-8a40-d0ed1d17a488"
  }
 ],
 "3d177b5c-b8f6-4214-b34d-904f06e6cf75": [
  {
   "a": "0",
   "b": "Key",
   "c": "",
   "d": "Natural Key",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "1",
   "b": "Name",
   "c": "",
   "d": "Name",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "2",
   "b": "Description",
   "c": "",
   "d": "Description",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "3",
   "b": "Valid from",
   "c": "",
   "d": "Date From",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "4",
   "b": "Valid to",
   "c": "",
   "d": "Date To",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  }
 ],
 "5aaf4c37-e835-4cb6-8a59-26a513a43ada": [],
 "cd497658-b4fa-488f-8b9f-46fe1eb7fd37": [
  {
   "a": "1",
   "b": "Company Name",
   "c": "",
   "d": "Name",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "2",
   "b": "Party",
   "c": "",
   "d": "ID",
   "e": "",
   "i": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
   "j": "",
   "k": "9a86bebd-bc15-4f7f-86bf-07c4dc0c781d"
  }
 ],
 "2acc9c25-75a3-4a66-ab96-c0ae0a629ab4": [
  {
   "a": "0",
   "b": "Key",
   "c": "",
   "d": "Natural Key",
   "e": "",
   "i": "",
   "j": "Uppercase code of the interaction",
   "k": "",
   "l": "",
   "m": "",
   "n": "10",
   "o": "",
   "p": "100",
   "r": "9"
  },
  {
   "a": "1",
   "b": "Date",
   "c": "",
   "d": "Date",
   "e": "",
   "i": "",
   "j": "Interaction date",
   "k": "",
   "l": "",
   "m": "",
   "n": "",
   "o": "",
   "p": "100",
   "r": "13"
  },
  {
   "a": "3",
   "b": "Interaction details",
   "c": "",
   "d": "Long Text",
   "e": "",
   "i": "",
   "j": "Description of the interaction with customer",
   "k": "",
   "l": "",
   "m": "",
   "n": "150",
   "o": "",
   "p": "90",
   "r": "4"
  },
  {
   "a": 4,
   "b": "Party",
   "c": "",
   "d": "ID",
   "e": "",
   "i": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
   "j": "",
   "k": "be5e0ff2-cf71-4927-ae9e-62f0f8c033f5"
  }
 ],
 "2cee2595-2e29-4216-a564-8f9c6f302393": [
  {
   "a": "1",
   "b": "Party",
   "c": "",
   "d": "ID",
   "e": "",
   "i": "",
   "j": "",
   "k": "43ba8332-6a7c-46e2-a7d4-7916a10d1255"
  },
  {
   "a": "2",
   "b": "Change Date",
   "c": "",
   "d": "Date",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "3",
   "b": "Change Description",
   "c": "",
   "d": "Numeric",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  }
 ],
 "2c32f90b-8a26-495a-86b8-a1bf9a864200": [
  {
   "a": "1",
   "b": "Calculated Value",
   "c": "",
   "d": "Numeric",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "2",
   "b": "Party",
   "c": "",
   "d": "ID",
   "e": "",
   "i": "ca627cf3-3beb-4ddc-8077-edd092fd2cb4",
   "j": "",
   "k": "228c4745-c06b-4880-8ef6-b84199f034af"
  },
  {
   "a": "3",
   "b": "Aggregated Value 1",
   "c": "",
   "d": "Numeric",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "4",
   "b": "Aggregated Value 2",
   "c": "",
   "d": "Numeric",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "5",
   "b": "Aggregated Value 3",
   "c": "",
   "d": "Numeric",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  },
  {
   "a": "6",
   "b": "Actual Number",
   "c": "",
   "d": "Numeric",
   "e": "",
   "i": "",
   "j": "",
   "k": ""
  }
 ],
 "dcc70f8a-79cf-4471-b9cf-416563251698": [
  {
   "a": "3",
   "b": "Business Date",
   "c": "",
   "d": "Date",
   "e": "Sysdate",
   "i": "",
   "j": "Business date of the event",
   "k": "",
   "l": "",
   "m": "",
   "n": "",
   "o": "",
   "p": "100",
   "r": "13"
  },
  {
   "a": "1",
   "b": "Operation",
   "c": "",
   "d": "Numeric",
   "e": "",
   "i": "",
   "j": "Business name of the operations",
   "k": "",
   "l": "",
   "m": "",
   "n": "30",
   "o": "",
   "p": "100",
   "r": "9"
  },
  {
   "a": "2",
   "b": "Parameters",
   "c": "",
   "d": "Long Text",
   "e": "",
   "i": "",
   "j": "Parameters in JSON format",
   "k": ""
  }
 ]
},"cons":{
 "ca627cf3-3beb-4ddc-8077-edd092fd2cb4": {
  "1": {
   "i": "1",
   "t": "Key",
   "cols": [
    {
     "i": "1",
     "c": "0",
     "o": ""
    }
   ]
  }
 },
 "dcc70f8a-79cf-4471-b9cf-416563251698": {
  "1": {
   "i": "1",
   "t": "Index",
   "cols": []
  },
  "2": {
   "i": "2",
   "t": "Index",
   "cols": [
    {
     "i": "1",
     "c": "3",
     "o": ""
    },
    {
     "i": "2",
     "c": "1",
     "o": ""
    }
   ]
  }
 },
 "693fe068-8e32-4860-bc22-96ce93a2a2f2": {
  "1": {
   "i": "1",
   "t": "Key",
   "cols": [
    {
     "i": "1",
     "c": "0",
     "o": ""
    }
   ]
  }
 },
 "2acc9c25-75a3-4a66-ab96-c0ae0a629ab4": {
  "1": {
   "i": "1",
   "t": "Key",
   "cols": [
    {
     "i": "1",
     "c": "0",
     "o": ""
    }
   ]
  },
  "2": {
   "i": "2",
   "t": "Index",
   "cols": [
    {
     "i": "1",
     "c": "2",
     "o": ""
    },
    {
     "i": "2",
     "c": "1",
     "o": ""
    }
   ]
  }
 },
 "ae0e5be9-4125-44b5-bb25-60dd381cfd42": {
  "1": {
   "i": "1",
   "t": "Key",
   "cols": [
    {
     "i": "1",
     "c": "5",
     "o": ""
    }
   ]
  }
 },
 "cd497658-b4fa-488f-8b9f-46fe1eb7fd37": {
  "1": {
   "i": "1",
   "t": "Key",
   "cols": [
    {
     "i": "1",
     "c": "2",
     "o": ""
    }
   ]
  }
 },
 "f9561a0a-fc09-4273-a77e-91e91b3682e5": {
  "1": {
   "i": "1",
   "t": "Key",
   "cols": [
    {
     "i": "1",
     "c": "1",
     "o": ""
    },
    {
     "i": "2",
     "c": "4",
     "o": ""
    }
   ]
  }
 },
 "e51885a1-6aa7-4e30-9675-118b47a56307": {
  "1": {
   "i": "1",
   "t": "Key",
   "cols": [
    {
     "i": "1",
     "c": "0",
     "o": ""
    },
    {
     "i": "2",
     "c": "1",
     "o": ""
    },
    {
     "i": "3",
     "c": "2",
     "o": ""
    }
   ]
  }
 },
 "3d177b5c-b8f6-4214-b34d-904f06e6cf75": {
  "1": {
   "i": "1",
   "t": "Key",
   "cols": [
    {
     "i": "1",
     "c": "0",
     "o": ""
    }
   ]
  }
 },
 "3ec3a148-887d-47e8-9ca7-ff9425b8dfc4": {
  "1": {
   "i": "1",
   "t": "Key",
   "cols": []
  },
  "2": {
   "i": "2",
   "t": "Key",
   "cols": [
    {
     "i": "1",
     "c": "0",
     "o": ""
    }
   ]
  }
 },
 "1d57ffa0-8d00-4cb2-8794-635d44b7cf5d": {
  "1": {
   "i": "1",
   "t": "Key",
   "cols": [
    {
     "i": "1",
     "c": "0",
     "o": ""
    }
   ]
  }
 },
 "2c32f90b-8a26-495a-86b8-a1bf9a864200": {
  "1": {
   "i": "1",
   "t": "Key",
   "cols": [
    {
     "i": "1",
     "c": "2",
     "o": ""
    }
   ]
  }
 }
},"chglog":{
 "dcc70f8a-79cf-4471-b9cf-416563251698": [
  {
   "i": "1",
   "d": "12.12.2019",
   "v": "1.1.",
   "e": "Req 1321",
   "r": "Orol",
   "m": "Holub",
   "dsc": "Table created"
  }
 ],
 "2cee2595-2e29-4216-a564-8f9c6f302393": [
  {
   "i": "1",
   "d": "12.03.2019",
   "v": "1.1",
   "e": "Req 12313",
   "r": "Holub",
   "m": "Hrdlicka",
   "dsc": ""
  }
 ],
 "2c32f90b-8a26-495a-86b8-a1bf9a864200": [
  {
   "i": "1",
   "d": "12.03.2019",
   "v": "1.1",
   "e": "Req 32132",
   "r": "Jaqen H'ghar",
   "m": "Jaqen H'ghar",
   "dsc": "Table created based on request"
  }
 ],
 "ca627cf3-3beb-4ddc-8077-edd092fd2cb4": [
  {
   "i": "1",
   "d": "02.12.2019",
   "v": "1.1",
   "e": "Req 432432",
   "r": "Talisa Maegyr",
   "m": "Talisa Maegyr",
   "dsc": "Table created"
  },
  {
   "i": "2",
   "d": "03.12.2019",
   "v": "1.2",
   "e": "Req 1321",
   "r": "Ramsay Bolton",
   "m": "Ramsay Bolton",
   "dsc": "Add column"
  }
 ],
 "2acc9c25-75a3-4a66-ab96-c0ae0a629ab4": [
  {
   "i": "1",
   "d": "12.05.2019",
   "v": "1.1",
   "e": "Req 456969",
   "r": "Samwell Tarly",
   "m": "Samwell Tarly",
   "dsc": "Table created"
  },
  {
   "i": "2",
   "d": "13.06.2019",
   "v": "1.2",
   "e": "Bug 432432",
   "r": "Samwell Tarly",
   "m": "Samwell Tarly",
   "dsc": "Change of data type"
  }
 ],
 "693fe068-8e32-4860-bc22-96ce93a2a2f2": [
  {
   "i": "1",
   "d": "01.01.2018",
   "v": "1",
   "e": "Req 432432",
   "r": "Margaery Tyrell",
   "m": "Margaery Tyrell",
   "dsc": "Table created based on MDM"
  }
 ],
 "1d57ffa0-8d00-4cb2-8794-635d44b7cf5d": [
  {
   "i": "1",
   "d": "01.01.2018",
   "v": "1",
   "e": "Req 4465456",
   "r": "Jaqen H'ghar",
   "m": "Jaqen H'ghar",
   "dsc": "Table created from MDM mirror"
  }
 ],
 "f9561a0a-fc09-4273-a77e-91e91b3682e5": [
  {
   "i": "1",
   "d": "01.01.2019",
   "v": "1.1",
   "e": "Req 432432",
   "r": "Holub",
   "m": "Holub",
   "dsc": "Table created"
  }
 ],
 "3ec3a148-887d-47e8-9ca7-ff9425b8dfc4": [
  {
   "i": "1",
   "d": "01.01.2019",
   "v": "1",
   "e": "Req 1321",
   "r": "Stannis Baratheon",
   "m": "Stannis Baratheon",
   "dsc": "Table created"
  }
 ],
 "3d177b5c-b8f6-4214-b34d-904f06e6cf75": [
  {
   "i": "1",
   "d": "01.01.2019",
   "v": "1",
   "e": "Req 2656",
   "r": "Stannis Baratheon",
   "m": "Stannis Baratheon",
   "dsc": "Table created"
  }
 ],
 "cd497658-b4fa-488f-8b9f-46fe1eb7fd37": [
  {
   "i": "1",
   "d": "01.01.2019",
   "v": "1",
   "e": "Req 321312",
   "r": "Jaqen H'ghar",
   "m": "Jaqen H'ghar",
   "dsc": "Table created"
  }
 ],
 "e51885a1-6aa7-4e30-9675-118b47a56307": [
  {
   "i": "1",
   "d": "01.01.2019",
   "v": "1",
   "e": "Req 23123",
   "r": "Holub",
   "m": "Holub",
   "dsc": "fdsafsdafsa"
  }
 ],
 "ae0e5be9-4125-44b5-bb25-60dd381cfd42": []
}}