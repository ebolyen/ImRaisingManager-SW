locale = {}

locale.title = function(currentPage) { 
	return currentPage + " | ImRaising Manager" ;
} 

locale.pages = [
	{
		path:"/home", 
		serverPath:"partials/home.html",
		name: "Home",
		title: "Home"
	},
	{
		path:"/events",  
		serverPath:"partials/events.html",
		name: "Events",
		title: "My Events",
		children: [
			{
				path:"/events/create",  
				serverPath:"partials/events-create.html",
				name: "Create Event",
				title: "Create Event"
			},
			{
				path:"/events/edit",  
				serverPath:"partials/events-edit.html",
				name: "Edit Event",
				title: "Edit Event"
			},
			{
				path:"/events/config",  
				serverPath:"partials/events-config.html",
				name: "Config",
				title: "Config"
			},
		]
	},
	{
		path:"/widgets",  
		serverPath:"partials/widgets.html",
		name: "Widgets",
		title: "My Widgets"
	},
		{
		path:"/ethansdandypage",  
		serverPath:"partials/widgets.html",
		name: "HECK THIS IS GREAT",
		title: "no"
	},
	{
		path:"/settings",  
		serverPath:"partials/settings.html",
		name: "Settings",
		title: "Account Settings"
	},
	

];



locale.sampleTable = {
	headers: [
		{
			column: "First",
			data: "key1",
			hidden: false
		},
		
		{
			column: "Key2",
			data: "key2",
			hidden: false
		},
		
		{
			column: "Third",
			data: "key3",
			hidden: false
		},
		
		{
			column: "Fourth",
			data: "key4",
			hidden: false
		}
	],
	
	rows: [
		{
			key1: "a",
			key2: "b",
			key3: "c",
			key4: "d"
		},
		{
			key1: "a1",
			key2: "b1",
			key3: "c1",
			key4: "d1"
		},
		{
			key1: "a2",
			key2: "b2",
			key3: "c2",
			key4: "d2"
		},
	]


	
}