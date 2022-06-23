(function () {
    "use strict";

    angular.module('public')
    .controller("SignUpController",SignUpController);

    SignUpController.$inject = ["MenuService"];
    function SignUpController(MenuService) {
	    var signCtrl = this;
	    
        signCtrl.firstName = "";
	    signCtrl.lastName = "";
	    signCtrl.email = "";
	    signCtrl.phoneNumber = "";
	    signCtrl.favDish = "";
	    signCtrl.personalInfo = {};
	    signCtrl.showErrorMessageFlag = false;
	    signCtrl.showSuccessMessageFlag = false;
	    signCtrl.showProcessingMessageFlag = false;
	
	    signCtrl.onSubmit = function () {
		
            console.log("submitted");
            signCtrl.showErrorMessageFlag = false;
		
            if(signCtrl.favDish===""){
		    	signCtrl.showErrorMessageFlag = true;
			    return;
		    }

		    signCtrl.favDish = signCtrl.favDish.toUpperCase();
		    signCtrl.showProcessingMessageFlag = true;
		    var response = MenuService.getMenuItem(signCtrl.favDish);
		    
            response.then(function (response) {
			    signCtrl.showErrorMessageFlag=false;
			    signCtrl.showProcessingMessageFlag = false;
			    signCtrl.showSuccessMessageFlag = true;
			    signCtrl.personalInfo = {
				    firstName: signCtrl.firstName,
				    lastName: signCtrl.lastName,
				    email:signCtrl.email,
				    phoneNumber: signCtrl.phoneNumber,
				    favDish: signCtrl.favDish,
				    favDishInfo: response,
				    loaded: true
			};

			MenuService.savePersonalInfo(signCtrl.personalInfo);
			
		    },function (reason) {
			    signCtrl.showErrorMessageFlag = true;
			    signCtrl.showProcessingMessageFlag = false;
		    });

	    };



    }

})();
