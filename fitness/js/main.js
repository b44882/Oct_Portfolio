$(function(){
	var id = "fit" + Math.floor(Math.random()*10000000001);
	$("#create").attr('data-key', id);
	
	var genList = function(){
		$("#importLS").empty();
		for(var i=0, j=localStorage.length; i<j; i++){
			var key = localStorage.key(i);
				value  = localStorage.getItem(key)
				obj = JSON.parse(value);
			if (key.charAt(0) == "f"&& key.charAt(1) == "i" && key.charAt(2) == "t"){
			$("#importLS").append('<ul class="box">' +
			  '<li>' + '<h3>' + obj.name +'</h3>' + '</li>' +
			  '<li>' + 'Calories Burned: ' + obj.cals + '</li>' +
			  '<li>' + 'Measurement: ' + obj.length + ' ' + obj.measure + '</li>' +
			  '<nav class="padtop padbot">'+
			  '<a href="#" class="delete button" data-key="'+key+'"> Delete Exercise </a>' + ' ' +
			  '<a href="#" class="edit button" data-key="'+key+'"> Edit Exercise </a>' +
			  '</nav>')
			 }
		}
	}
	
	var clearForm = function(){
		console.log("Clear form initiated");
		$('#name').val('')
		$('#cals').val('') 
		$('#length').val('') 
		$('#measure').val('') 
	};
	
	var validateForm = function(){
		var result = true;
		if($('#name').val() === ''){
			$('#nameLabel').attr('class','red');
			var result = false;
		} else {$('#nameLabel').attr('class','');};
		if($('#cals').val() === ''){
			$('#calsLabel').attr('class','red');
			var result = false;
		} else {$('#calsLabel').attr('class','');};
		if($('#length').val() === ''){
			$('#lengthLabel').attr('class','red');
			var result = false;
		} else {$('#lengthLabel').attr('class','');};
		if($('#measure').val() === ''){
			$('#measureLabel').attr('class','red');
			var result = false;
		} else {$('#measureLabel').attr('class','');};
		return result;
	}
	$('#create').on("click", function(){
		var id = $("#create").attr('data-key');
			result = validateForm();
		if (result === true){
		var exercise = {};
		    exercise.name    = $('#name').val();
		    exercise.cals    = $('#cals').val();
		    exercise.length  = $('#length').val();
		    exercise.measure = $('#measure').val();
		localStorage.setItem(id, JSON.stringify(exercise));
		alert("Exercise Saved!");
		window.location.reload();
		} else {alert("Please fill all highlighted forms");};
	});
	
	$('#cancel').on("click", function(){
		window.location.reload();
	});
	
	$("#clearLS").on("click", function(){
		if(localStorage.length === 0){
			alert("There are no exercises in the database!");
		} else {
			if(confirm("This will CLEAR the database!!  Are you sure?")){
				localStorage.clear();
				alert("The exercise database has been cleared!");
				window.location.reload();
			}
		}
	});
	
	$("#getJSON").on("click", function(){
		$("#importAJAX").empty();
		$.ajax({
			url: "js/data.json",
			type: "GET",
			dataType: "json",
			success: function(data){
				console.log(data);
				for(var i=0, j=data.exercise.length; i<j; i++){
					var obj = data.exercise[i];
					$('<ul class="box padbot">' +
					  '<li><h3>' + obj.name +'</li></h3>' +
					  '<li>' + 'Calories Burned: ' + obj.burn + '</li>' +
					  '<li>' + 'Measurement: ' + obj.length + ' ' + obj.measure + '</li>' +
					  '<li>Created in JSON</li>'+
					  '</ul>').appendTo("#importAJAX");
				}
			},
			error: function(error, perror){
				console.log("Error:" + error + "\n" + "Parse Error: " + perror);
			}
		});
	
	});
	
	$("#getXML").on("click", function(){
		$("#importAJAX").empty();
		$.ajax({
			url: "js/data.xml",
			type: "GET",
			dataType: "xml",
			success: function(data){
				$(data).find("exercise").each(function() {
					$('<ul class="box padbot">' +
					  '<li><h3>' + $(this).find('name').text() +'</h3></li>' +
					  '<li>' + 'Calories Burned: ' + $(this).find('burned').text() + '</li>' +
					  '<li>' + 'Measurement: ' + $(this).find('length').text() + ' ' + $(this).find('measure').text() + '</li>' +
					  '<li>Created in XML</li>'+
					  '</li>').appendTo("#importAJAX");
				});
			},
			error: function(error, perror){
				console.log("Error:" + error + "\n" + "Parse Error: " + perror);
			}
		});
	});
	
	$("#getID").on("click", function(){
		console.log(id);
	});
	
	$("#importLS").on("click","a.delete",function(){
		console.log("Button clicked.");
		console.log(this.id);
		if(confirm("Are you sure you want to delete this exercise?")){
			var itemKey = $(this).data('key');
			localStorage.removeItem(itemKey);
			window.location.reload();
		}
	});
	
	$("#importLS").on("click","a.edit",function(){
		var id = $(this).data('key');
		var value = localStorage.getItem(id);
		var obj = JSON.parse(value);
		console.log("ID: " + id);
		console.log("Value: " + value);
		console.log("Obj: " + obj);
		$("#create").attr('data-key', id);
		$("#editMode").attr('class', 'red');
		$("#cancel").attr('class', 'button');
		$('#name').val(obj.name);
		$('#cals').val(obj.cals);
		$('#length').val(obj.length);
		$('#measure').val(obj.measure);
	});
	
	clearForm();
	genList();

});




        
        	
    