(function () {
    "use strict";

    angular.module('public').controller("MyInfoController", MyInfoController);

    MyInfoController.$inject = ["MenuService", "ApiPath"];
    function MyInfoController(MenuService, ApiPath) {
        var myInfoCtrl = this;
        myInfoCtrl.isLoaded = MenuService.isLogin();
        console.log(myInfoCtrl.isLoaded);
        myInfoCtrl.basePath = ApiPath;

        angular.element(document).ready(function () {
            if(MenuService.isLogin()) {
                myInfoCtrl.personalInfo = MenuService.getPersonalInfo();
            }
        });
    }

})();