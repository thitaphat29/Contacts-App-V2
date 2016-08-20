var list=[];



$(document).ready(function(){


	/* --- Add Contact --- */
	$('form').submit(function(event){
		console.log("submit");
		event.preventDefault();
	
		createContact();
	
	});

	/* --- Add Phone Number --- */
	$(".btn-phone").on("click",function(e){
		
		var totalPhoneInput = ($(".input-phone").length) + 1;
		e.preventDefault();

		$(".form-phone-number").append('<div class="form-group"><label for="phoneNumber">Phone Number ('+totalPhoneInput+') </label><input type="text" class="form-control input-phone" name="phoneNumber" required=""></div>');
	});
	
	/* --- Add Address --- */
	$(".btn-address").on("click",function(e){
		var totalStreetInput = ($(".input-street").length) + 1;
		var totalCityInput = ($(".input-city").length) + 1;
		var totalStateInput = ($(".input-state").length) + 1;
		e.preventDefault();

		console.log("add address");
		$(".form-address").append('<div class="form-group">'+
			'<label for="street">Street ('+totalStreetInput+')</label>'+
			'<input type="text" class="form-control input-street" name="street">'+
      		'<label for="city">City ('+totalCityInput+') </label>'+
     		'<input type="text" class="form-control input-city" name="city">'+
      		'<label for="state">State ('+totalStateInput+')</label>'+
     		'<input type="text" class="form-control input-state" name="state"></div>');
	});

	/* --- See Contact Detail--- */
	$('ul').on('click', 'li', function(event) {
  		contactDetail($(this)[0].id);
	});

});

function createContact(){
	var address ={
		street : "",
		city : "",
		state : ""
	};

	var Contact = {
		firstName : "",
		lastName : "",
		phoneNumber : [],
		addresses : []
	};
	var newContact = Object.create(Contact);

	var totalPhoneInput = $(".input-phone").length;
	var totalAddress = $(".input-street").length;

	/* -- add firstname and lastname -- */
	newContact.firstName = $("#firstName").val();
	newContact.lastName = $("#lastName").val();

	/* -- add phone number -- */
	$(".input-phone").each(function(){
		newContact.phoneNumber.push($(this).val());
	});
	console.log("phone number list : "+newContact.phoneNumber);


	for(i=0;i<totalAddress;i++){
		var newAddress = Object.create(address);
		newAddress.street = $(".input-street")[i].value;
		newAddress.city = $(".input-city")[i].value;
		newAddress.state = $(".input-state")[i].value;
		newContact.addresses.push(newAddress);

	}
	console.log("address list : "+newContact.addresses);

	list.push(newContact);
	displayContactList(newContact);	
	console.log(list);
}

function displayContactList(newContact){

	var totalPhoneInput = $(".input-phone").length;
	var totalAddress = $(".input-street").length;

	$(".contact-list ul").append('<a><li id="' + (list.length-1) +'">'+newContact.firstName + ' ' +newContact.lastName+'<br></li></a>');
	

	// clear form
	$("#firstName").val("");
	$("#lastName").val("");

	// remove added phone list
	for(var i=totalPhoneInput-1;i>=1;i--){
		$(".input-phone")[i].value="";
		var removediv = $(".form-phone-number .form-group")[i];
		removediv.remove();
	}
	
		
	// remove added address list
	for(var j=totalAddress-1; j>=1;j--){
		$(".input-street")[j].value="";
		$(".input-city")[j].value="";
		$(".input-state")[j].value="";
		var removediv = $(".form-address .form-group")[j];
		removediv.remove();
	}

	//clear original one
	$(".input-phone").val("");
	$(".input-street")[i].value="";
	$(".input-city")[i].value="";
	$(".input-state")[i].value="";

}

function contactDetail(index){

	// clear content
	$(".firstname").text("");
	$(".lastname").text("");
	$(".phone-number").text("");
	$(".address").text("");

	

	console.log("----- contact details here ----");
	/* -- show firstname and lastname -- */
	$(".firstname").append("Fist Name: "+list[index].firstName);
	$(".lastname").append("Last Name: "+list[index].lastName);

	/* -- show list of phone number -- */
	for(var i=0;i<list[index].phoneNumber.length;i++){
		$(".phone-number").append('Phone Number ('+(i+1)+') '+list[index].phoneNumber[i]+'<br>');
	}
	
	/* -- show list address -- */
	$(".address").append("<p>Address</p>");
	for(var j=0;j<list[index].addresses.length;j++){
		if((list[index].addresses[j].street != "") && (list[index].addresses[j].city != "") && (list[index].addresses[j].state != "")){
			$(".address").append("<li>"+list[index].addresses[j].street+", "+list[index].addresses[j].city+", "+list[index].addresses[j].state+"</li>")
		}
		else if((list[index].addresses[j].street != "") && (list[index].addresses[j].city != "")){
			$(".address").append("<li>"+list[index].addresses[j].street+", "+list[index].addresses[j].city+"</li>");
		}else if((list[index].addresses[j].street != "") && (list[index].addresses[j].state != "")){
			$(".address").append("<li>"+list[index].addresses[j].street+", "+list[index].addresses[j].state+"</li>");
		}else if((list[index].addresses[j].city != "") && (list[index].addresses[j].state != "")){
			$(".address").append("<li>"+list[index].addresses[j].city+", "+list[index].addresses[j].state+"</li>");
		}else{
			if(list[index].addresses[j].street != ""){
				$(".address").append("<li>"+list[index].addresses[j].street+"</li>");
			}else if(list[index].addresses[j].city != ""){
				$(".address").append("<li>"+list[index].addresses[j].city+"</li>");
			}else if(list[index].addresses[j].state != ""){
				$(".address").append("<li>"+list[index].addresses[j].state+"</li>");
			}
		}

	}

	

}