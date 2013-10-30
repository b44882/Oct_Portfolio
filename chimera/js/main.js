// Brett Gear 
// Project 4 
// VFW 1305 


window.addEventListener("DOMContentLoaded", function(){

	//Variables: Key Titles
	var cNameKey      = "Name:";
		cLevelKey     = "Level:";
		cTypeKey      = "Type:";
		cAttKey       = "Attributes:";
		cDescKey      = "Description:";
		cDateKey      = "Date Created:";
		cIdKey        = "ID";
		cFlyKey       = "Can Fly?:";
		cSwimKey      = "Can Swim?:";
		cRunKey       = "Can Run?:";
		cAttributeKey = "Attribute:";
		
	//Variables: Element IDs
	var cName  = document.getElementById("name");
		cLevel = document.getElementById("level");
		cType  = document.getElementById("type");
		cDesc  = document.getElementById("desc");
		cDate  = document.getElementById("date");
		cFly   = document.getElementById("fly");
		cSwim  = document.getElementById("swim");
		cRun   = document.getElementById("run");
		
	//Objects: Content
	var chimContent = {};
	var viewSubList = {};
		chimContent.dropBox = ["-Choose a Type-", "Alien", "Aquatic", "Beast", "Volcanic"];
	
//CORE CODE//
	//Function: Submit Chimera Data
	var submitChim = function(key){
		var submitSwitch = 0;
		if(!key){
			var id = "chi" + Math.random()*1000000000000001;
		} else {
			var id = key;
			submitSwitch = 1;
		}
		var chimera       = {};
			chimera.name  = [cNameKey, cName.value];
			chimera.level = [cLevelKey, cLevel.value];
			chimera.type  = [cTypeKey, cType.value];
			chimera.desc  = [cDescKey, cDesc.value];
			chimera.date  = [cDateKey, cDate.value];
			if(cFly.checked){chimera.fly = [cFlyKey, "Yes"]} else {chimera.fly = [cFlyKey, "No"]};
			if(cSwim.checked){chimera.swim = [cSwimKey, "Yes"]} else {chimera.swim = [cSwimKey, "No"]};
			if(cRun.checked){chimera.run = [cRunKey, "Yes"]} else {chimera.run = [cRunKey, "No"]};
		localStorage.setItem(id, JSON.stringify(chimera));
		alert("Chimera Saved!");
		switch(submitSwitch){
			case 0:
				window.location.reload();
  				break;
  			case 1:
  				viewChimera();
  				break;
		}
		
	};

	var viewChimera = function(){
		if(localStorage.length === 0){
			if(confirm("There are no Chimeras in the database! Would you like to create default chimeras?")){
				autoFillChim();
			}
		}
		//Object Creation//
		var chimeraJson = {};
		var viewSection = {};
		var viewSubList = {};
		var formSection = {};
		//Form Manipulation//
		var mainSection = document.getElementById("mainContent");
		formSection.form       = document.getElementById("formContent");
		formSection.display    = document.getElementById("display");
		formSection.clear      = document.getElementById("clear");
		formSection.options    = document.getElementById("options");
		formSection.returnForm = document.getElementById("returnForm");
		formSection.saveChim   = document.getElementById("saveChim");
		formSection.saveCancel = document.getElementById("saveCancel");
		formSection.create     = document.getElementById("create");
		formSection.saveChim.setAttribute("class", "hidden");
		formSection.saveCancel.setAttribute("class", "hidden");
		formSection.form.setAttribute("class", "hidden");
		formSection.display.setAttribute("class", "hidden");
		formSection.clear.setAttribute("class", "hidden");
		formSection.returnForm.removeAttribute("class", "hidden");
		formSection.create.setAttribute("class", "hidden");
		displayLevel();
		//Object Manipulation//
		viewSection.divView = document.createElement("div");
		viewSection.divView.setAttribute("id", "viewChimList");
		mainSection.appendChild(viewSection.divView);
		for (var i=0; i<localStorage.length; i++){
			chimeraJson.key     = localStorage.key(i);
			chimeraJson.value  = localStorage.getItem(chimeraJson.key)
			chimeraJson.obj = JSON.parse(chimeraJson.value);
			if(chimeraJson.key.charAt(0) == "c" && chimeraJson.key.charAt(1) == "h" && chimeraJson.key.charAt(2) == "i"){
				viewSubList.ul  = document.createElement("ul");
				viewSection.br = document.createElement("br");
				viewSection.linksLi = document.createElement("li");
				viewSubList.ul.setAttribute("id", "ViewItem");
				viewSection.divView.appendChild(viewSubList.ul);
				listThumbnail(chimeraJson.obj.type[1],viewSubList);
				for (var n in chimeraJson.obj){
					viewSubList.li = document.createElement("li");
					viewSubList.text =  chimeraJson.obj[n][0]+ " " + chimeraJson.obj[n][1];
					viewSubList.ul.appendChild(viewSubList.li);
					viewSubList.li.innerHTML = viewSubList.text;
					viewSubList.ul.appendChild(viewSection.linksLi);
				}
				makeChimeraLinks(chimeraJson.key, viewSection.linksLi);
			}
		}
	};
	
	var listThumbnail = function(typeName, viewSublist){
		var thumbNail = {};
		thumbNail.li  = document.createElement('li');
		thumbNail.img = document.createElement('img');
		thumbNail.img.setAttribute("src", "img/"+ typeName.toLowerCase() + ".png");
		viewSublist.ul.appendChild(thumbNail.li);
		thumbNail.li.appendChild(thumbNail.img);
	};
	
	var makeChimeraLinks = function(key, linksLi){
		var links           = {};
			links.br        = document.createElement("br");
			links.functions = [editChim, deleteChim];
			links.id        = ["editOne", "deleteOne"];
 			links.content   = ["Edit Chimera", "Delete Chimera"];
 			linksLi.appendChild(links.br);
		for (i=0; i<links.functions.length; i++){
			links.a = document.createElement("a");
			links.a.href = ("#");
			links.a.setAttribute("id", "oneLink");
			links.a.setAttribute("id", links.id[i]);
			links.a.key = key;
			links.a.innerHTML = links.content[i];
			links.a.addEventListener("click", links.functions[i]);
			linksLi.appendChild(links.a);
		}
	};
	
	var editChim = function(){
		returnChimera();
		var editNav = {};
		    editNav.display = document.getElementById("display");
		    editNav.clear   = document.getElementById("clear");
		    editNav.saveChim = document.getElementById("saveChim");
		    editNav.saveCancel = document.getElementById("saveCancel");
		    editNav.create = document.getElementById("create");
		    editNav.display.setAttribute("class", "hidden");
		    editNav.clear.setAttribute("class", "hidden");
		    editNav.saveChim.removeAttribute("class", "hidden");
		    editNav.saveCancel.removeAttribute("class", "hidden");
		    editNav.create.setAttribute("class", "hidden");
		var value = localStorage.getItem(this.key);
		var json = JSON.parse(value);
		cName.value  = json.name[1];
		cLevel.value = json.level[1];
		cType.value  = json.type[1];
		cDesc.value  = json.desc[1];
		cDate.value  = json.date[1];
		if(json.fly[1] === "Yes"){
			cFly.checked = true;
		};
		if(json.swim[1] === "Yes"){
			cSwim.checked = true;
		};
		if(json.run[1]  === "Yes"){
			cRun.checked = true;
		};
		displayLevel();
		saveChim.key = this.key
	};
	
	var e_showForm = function(){
		var viewSection = {};
		var formSection = {};
		//Form Manipulation//
		var mainSection            = document.getElementById("mainContent");
			formSection.form       = document.getElementById("formContent");
			formSection.display    = document.getElementById("display");
			formSection.clear      = document.getElementById("clear");
			formSection.options    = document.getElementById("options");
			formSection.returnForm = document.getElementById("returnForm");
			formSection.create     = document.getElementById("create");
			formSection.form.removeAttribute("class", "hidden");
			formSection.display.removeAttribute("class", "hidden");
			formSection.clear.removeAttribute("class", "hidden");
			formSection.returnForm.setAttribute("class", "hidden");
			formSection.create = document.getElementById
			//Object Manipulation//
			viewSection.divList = document.getElementById("viewChimList");
			mainSection.removeChild(viewSection.divList);
	};
		
	var deleteChim = function(){
		if(confirm("Are you sure you want to delete this chimera?")){
			localStorage.removeItem(this.key);
			returnChimera();
			viewChimera();
		}
	};
	var clearChimera = function(){
		if(localStorage.length === 0){
			alert("There are no Chimeras in the database!");
		} else {
			if(confirm("This will CLEAR the database!!  Are you sure?")){
				localStorage.clear();
				alert("The Chimera Database has been cleared!");
				window.location.reload();
			}
		}
	};
	var returnChimera = function(){
		var viewSection = {};
		var formSection = {};
		//Form Manipulation//
		var mainSection            = document.getElementById("mainContent");
			formSection.form       = document.getElementById("formContent");
			formSection.display    = document.getElementById("display");
			formSection.clear      = document.getElementById("clear");
			formSection.options    = document.getElementById("options");
			formSection.returnForm = document.getElementById("returnForm");
			formSection.create     = document.getElementById("create");
			formSection.form.removeAttribute("class", "hidden");
			formSection.display.removeAttribute("class", "hidden");
			formSection.clear.removeAttribute("class", "hidden");
			formSection.returnForm.setAttribute("class", "hidden");
			formSection.create.removeAttribute("class", "hidden");
			//Object Manipulation//
			viewSection.divList = document.getElementById("viewChimList");
			mainSection.removeChild(viewSection.divList);
			cName.value  = ""
			cLevel.value = 1
			cType.value  = "-Choose a Type-"
			cDesc.value  = ""
			cDate.value  = ""
			cFly.checked = false;
			cSwim.checked = false;
			cRun.checked = false;
			displayLevel();
	};
	var displayLevel = function(){
		var levelSection       = {};
			levelSection.label = document.getElementById("level");
			levelSection.li    = document.getElementById("chimlevel");
			levelSection.li.innerHTML = level.value;	
	};
	var createDropDown = function(data) {
		var dropDownSection = {};
			dropDownSection.select = document.getElementById("type");
		for(i=0; i<data.length; i++){
				dropDownSection.option = document.createElement("option");
				dropDownSection.option.setAttribute("value", data[i]);
				dropDownSection.select.appendChild(dropDownSection.option);
				dropDownSection.option.innerHTML = data[i];
		};	
	};
	var autoFillChim = function(){
		for (var n in json){
			var id = "chi"+Math.random()*1000000000000001;
			localStorage.setItem(id, JSON.stringify(json[n]));
		};
	};
	var validateChim = function(){
		var vReq = {};
			vReq.error = document.getElementById("errormessage");
		 	vReq.name  = document.getElementById("l_name");
		 	vReq.type  = document.getElementById("l_type");
		 	vReq.date  = document.getElementById("l_date");
		 	vReq.desc  = document.getElementById("l_desc");
		var vswitch = 0;
		if(cName.value == ""){
			vReq.name.setAttribute("class", "error");
			console.log("Name Error");
			vswitch=1;
		} else { vReq.name.removeAttribute("class", "error"); }
		if(cType.value == "-Choose a Type-"){
			vReq.type.setAttribute("class", "error");
			console.log("Type Error");
			vswitch=1;
		} else { vReq.type.removeAttribute("class", "error"); }
		if(cDate.value == ""){
			vReq.date.setAttribute("class", "error");
			console.log("Date Error");
			vswitch=1;
		} else { vReq.date.removeAttribute("class", "error"); }
		if(cDesc.value == ""){
			vReq.desc.setAttribute("class", "error");
			console.log("Description Error")
			vswitch=1;
		} else { vReq.desc.removeAttribute("class", "error"); }
		switch(vswitch){
			case 0:
				vReq.error.setAttribute("class", "hidden");
  				submitChim(this.key);
  				break;
  			case 1:
  				vReq.error.setAttribute("class", "error");
  				console.log("ERROR!");
  				break;
		}
	};
	//Event Listeners
	createDropDown(chimContent.dropBox);
	create.addEventListener("click", validateChim);
	display.addEventListener("click", viewChimera);
	clear.addEventListener("click", clearChimera);
	returnForm.addEventListener("click", returnChimera);
	level.addEventListener("change", displayLevel);
	saveChim.addEventListener("click", validateChim);
	saveCancel.addEventListener("click", viewChimera);
	
	cLevel.value = 1
	displayLevel();
	
})


