/**
* Author : Dan Masci
* Class : Advanced Web Programming
* Semester : 3
* Professor : Tom Tsiliopolous
* Purpose : Final Team Project - Incident Management
* Last Updated By : Dan Masci (12/7/2015)
*/

/**
* The follwing JS is used for all our jQuery. It takes care of 
* all of our functionality for the Incident Dashboard and Header.
* Included: 
*	TICKET FILTER - DASHBOARD
*		STATUS FILTER
*		VIEWS FILTER
	USER FILTER - DASHBOARD
*	TICKET ACCORDIAN - DASHBOARD
*	TICKET SINGLE VIEW - DASHBOARD
* 	USER ACCORDIAN - DASHBOARD
* 	DASHBOARD NAVIGATION (for mobile)
*	
*
*/

jQuery(document).ready(function($){

	
	/////////////////////////////////////////////////////////////
	/*
	*			Filtering - DASHBOARD (User and Ticket)
	*/
	/////////////////////////////////////////////////////////////
	if($('.filter-button').length > 0) {				
	/********** TICKET FILTER - DASHBOARD **********/
		//Show Open tickets on Tab View by default
		$('.ticket-view.Tab').addClass('active').fadeIn();
		$('.ticket-container.Open').addClass('active').fadeIn();
		//Show All users by default
		$('.user-container.All').addClass('active').fadeIn();

		/********** USER FILTER - DASHBOARD **********/
		function filterUsers() {
			//grab the trigger's id attribute
			var id = $(this).attr('id');
			//begin by hiding all users - then show only desired users
			$('.user-container').removeClass('active').hide();
			//Take care of appropriate Ticket-Filter animations
			$('.user-shield').removeClass("Client").removeClass("Admin").removeClass("All");			
			$('.user-shield').addClass(id);
			$('.user-filter .filter-button').removeClass('active');
			$('.user-filter .filter-button#' + id).addClass('active');		
			//Show appropriate users based on what filter was chosen
			if (id == 'All') {
				$('.user-container').addClass('active').fadeIn();
			}
			else {			
				$('.user-container.' + id).addClass('active').fadeIn();	
			}	
		}//filterUsers()

		/********** STATUS FILTER - DASHBOARD **********/
		function filterTickets() {
			//grab the trigger's id attribute
			var id = $(this).attr('id');
			//begin by hiding all tickets - then show only desired tickets
			$('.ticket-container').removeClass('active').hide();
			//Take care of appropriate Ticket-Filter animations
			$('.status-shield').removeClass("Open").removeClass("Closed").removeClass("All");			
			$('.status-shield').addClass(id);
			$('.ticket-filter .filter-button').removeClass('active');
			$('.ticket-filter .filter-button#' + id).addClass('active');		
			//Show appropriate tickets based on what filter was chosen
			if (id == 'All') {
				$('.ticket-container').addClass('active').fadeIn();
			}
			else {			
				$('.ticket-container.' + id).addClass('active').fadeIn();	
			}	
		}//filterTickets()
		
		/********** VIEWS FILTER - DASHBOARD **********/
		function filterViews(event) {
			//grab the trigger's id attribute
			var id = $(this).attr('id');
			
			var ticketNum;			
			if ($(this).hasClass('view-ticket')) {
				//If handling this event by clicking on the 'View Ticket' link...
				//Then grab the ticketNumber through the element's ID
				ticketNum = $(this).attr('id').split('-', 3)[2];
			}
			else {
				//If handling this event by clicking on the "Full View" filter...
				//Then set the default : 0
				ticketNum = event.data.ticketNum;		
			}
			
			//Uncomment below for debugging purposes
			// var viewId = 'view-ticket-' + ticketNum;
			// alert('id: ' + id + ' | ticketNum: ' + ticketNum + ' | viewId: ' + viewId);

			//Begin by hiding both views - then show only desired view
			$('.ticket-view').removeClass('active').hide();
			$('.ticket-container').removeClass('active').hide();
			//Take care of appropriate View-Filter animations
			$('.view-shield').removeClass('Full').removeClass("Tab");	
			$('.view-filter .filter-button').removeClass('active');		
			//Show the appropriate View
			if (id == 'Full' || id == ('view-ticket-' + ticketNum)) {
				//Cover the "Full View" button
				$('.view-shield').addClass('Full');
				$('.view-filter .filter-button#Full').addClass('active');
				//Show the Full View
				$('.ticket-view.Full').addClass('active').fadeIn();
				//Show the ticket based on what has been passed in to the function
				$('.ticket-view.Full' + ' #ticket-single-' + ticketNum).addClass('active').fadeIn();	
				//Disable the Ticket Filter
				$('.status-shield').addClass('Disabled');
			}			
			else {
				//Cover the "Tab View" button
				$('.view-shield').addClass('Tab');
				$('.view-filter .filter-button#Tab').addClass('active');
				//Show the Tab View
				$('.ticket-view.Tab').addClass('active').fadeIn();
				//Enable the Ticket Filter
				$('.status-shield').removeClass('Disabled');				
				if ($('.status-shield.Open').length > 0) {					
					//Show Open Tickets
					$('.ticket-container.Open').addClass('active').fadeIn();
				}
				else if ($('.status-shield.Closed').length > 0) {					
					//Show Closed Tickets
					$('.ticket-container.Closed').addClass('active').fadeIn();
				}
				else if ($('.status-shield.All').length > 0) {					
					//Show All Tickets
					$('.ticket-container.Open').addClass('active').fadeIn();
					$('.ticket-container.Closed').addClass('active').fadeIn();
				}
			}
		}//filterViews()
		//Event handler - on click
		$('.ticket-filter .filter-button').on('click', filterTickets);
		$('.view-filter .filter-button').click({ticketNum: 0}, filterViews);
		$('.user-filter .filter-button').on('click', filterUsers);
		//When clicking 'View Ticket' in Ticket Information
		$('.view-ticket').click({ticketNum: 0}, filterViews);
	}

	/////////////////////////////////////////////////////////////
	/*
	*				Ticket Dashboard - TAB VIEW
	*/
	/////////////////////////////////////////////////////////////
	if($('.ticket-view.Tab .ticket-container').length > 0) {
		/********** TICKET ACCORDIAN - DASHBOARD **********/
		function showTicketInfo() {
			var id = $(this).attr('id');
			
			if($('#' + id + '-content').hasClass('active')) {
				$('#' + id + '-content').removeClass('active').slideUp(300);
				$(this).find('.arrow').addClass('bot').removeClass('top');
			}
			else {				
				$('#' + id + '-content').addClass('active').slideDown(300);
				$(this).find('.arrow').addClass('top').removeClass('bot');
			}
		}//showTicketInfo()
		$('.ticket-trigger').on('click', showTicketInfo);
	}
	
	/////////////////////////////////////////////////////////////
	/*
	*				Ticket Dashboard - FULL VIEW
	*/
	/////////////////////////////////////////////////////////////
	if($('.ticket-view.Full .ticket-container').length > 0) {
		/********** TICKET SINGLE VIEW - DASHBOARD **********/
		function changeTicket() {
			var id = $(this).attr('id');
			var goTo = id.split('-', 3)[2];
			$('.ticket-full .ticket-container').removeClass('active').hide();
			$('#ticket-single-' + goTo).addClass('active').fadeIn();
		}
		if ($('.ticket-container').length > 2) {
			//As long as the Full-View shows more than 1 ticket ...
			//then enable the arrows for on-click event handling.
			$('.arrow-right').on('click', changeTicket);
			$('.arrow-left').on('click', changeTicket);	
		}		
	}
	
	/////////////////////////////////////////////////////////////
	/*
	*				User Dashboard - TAB VIEW
	*/
	/////////////////////////////////////////////////////////////
	if($('.user-container').length > 0) {
		/********** TICKET ACCORDIAN - DASHBOARD **********/
		function showUserInfo() {
			var id = $(this).attr('id');
			
			if($('#' + id + '-content').hasClass('active')) {
				$('#' + id + '-content').removeClass('active').slideUp(300);
				$(this).find('.arrow').addClass('bot').removeClass('top');
			}
			else {				
				$('#' + id + '-content').addClass('active').slideDown(300);
				$(this).find('.arrow').addClass('top').removeClass('bot');
			}
		}//showUserInfo()
		$('.user-trigger').on('click', showUserInfo);
	}

	/////////////////////////////////////////////////////////////
	/*
	*				Header Dashboard Button
	*/
	/////////////////////////////////////////////////////////////
	if ($('.sub-menu').length > 0) {
		/********** DASHBOARD NAVIGATION **********/
		function showNav() {
			$('.sub-menu').show();
		}//showNav()
		function hideNav() {
			$('.sub-menu').hide();
		}
		$('.dashboard-nav').on('click', showNav);
		$('.sub-menu .exit').on('click', hideNav);
	}

	/////////////////////////////////////////////////////////////
	/*
	*					Update Ticket - ADMIN
	*/
	/////////////////////////////////////////////////////////////
	if($('#update-ticket-admin').length > 0){
		//  Bind the event handler to the "submit" JavaScript event
		$('#update-ticket-form').submit(function () {
			//Get the status and resolution value and trim it
			var resolution = $.trim($('#resolution').val());
			var status = $.trim($('#status').val());
			// Check if empty of not
			if (status === 'Closed') {
				if(resolution === ''){
					// alert('To close a ticket you must have a resolution.');
					//Create a lightbox message and input it onto the page (hidden by default)
					$('#update-ticket-admin').append('<div class="lightbox"><div class="form"><div class="cancel-form"><i class="fa fa-times"></i></div><h3>To close a ticket you must have a resolution</h3><fieldset class="form-group"><textarea class="form-control" id="resolution-copy" name="resolution-copy" placeholder="Resolution..."></textarea></fieldset><div class="btn btn-primary" id="submit-resolution">Done</div></div></div>');
					//Display the lightbox immediately
					$('.lightbox').fadeIn();
					//Function that handles our lightbox form that is triggered from
					//the above functionality		
					function submitResolution() {
						//Grab the resolution inputted into the lightbox
						var resolutionBody = $.trim($('#resolution-copy').val());
						//if it's not empty...
						if(resolutionBody != ''){
							//set the form's hidden resolution input to the value inputted into the lightbox
							$('#resolution').val(resolutionBody);
							//hide the lightbox
							$('.lightbox').fadeOut();
						}	
						else {
							$('.lightbox .form h3').css('color', 'red');
						}
					}//submitResolution()
					function cancelResolution() {
					//hide the lightbox without taking resolution value
					$('.lightbox').fadeOut();						
					}//cancelResolution()
					//when clicking on the lightbox 'submit' button
					$('#submit-resolution').on('click', submitResolution);
					$('.lightbox .cancel-form').on('click', cancelResolution);	
					return false;	
				}
				else {
					 //if resolution is provided
					 //then tag the narrative with a '(TICKET CLOSED)'
					 $('#comment').val('(TICKET CLOSED) : ' + $('#comment').val());					
				}
			}
		});	
	}
	
	/////////////////////////////////////////////////////////////
	/*
	*					Delete User - ADMIN
	*/
	/////////////////////////////////////////////////////////////
	if($('#delete-user').length > 0){
		
		function showLightBox() {
			$('#update-ticket-admin').append('<div class="lightbox"><div class="form"><div class="cancel-form"><i class="fa fa-times"></i></div><h3>Are you sure you want to delete ' + $('#username').Text + '</h3><a href="/users/delete/<%= editUser._id %>" class="btn btn-primary" id="confirm-delete">Delete</a></div></div>');
			//Display the lightbox immediately
			$('.lightbox').fadeIn();
		}		
		$('#delete-user').on('click', showLightBox);	
	}

});