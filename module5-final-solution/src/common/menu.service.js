(function () {
  "use strict";
  
  angular.module('common')
  .service('MenuService', MenuService);
  
  
  MenuService.$inject = ['$http', 'ApiPath','$q'];
  function MenuService($http, ApiPath,$q) {
    var service = this;
    service.personalInfo = {loaded:false};
  
    service.isLogin = function () {
      return service.personalInfo.loaded;
    }
  
    service.getPersonalInfo = function () {
      if(service.isLogin()){return service.personalInfo;}
  else{
    return {};
  }    
    }
  
    service.getCategories = function () {
      return $http.get(ApiPath + '/categories.json').then(function (response) {
        return response.data;
      });
    };
  
  
    service.getMenuItems = function (category) {
      var config = {};
      if (category) {
        config.params = {'category': category};
      }
  
      return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
        return response.data;
      });
    };
  
    service.getMenuItem = function (shortName) {
      
      var deffered = $q.defer();
      var path = ApiPath + "/menu_items/" + shortName + ".json";
      var rawResponse = $http({method: "GET",url:path,});
      rawResponse.then(function (response) {
        //on success
        deffered.resolve(response.data);  
      },function (reason) {
        //on fail
        console.log('Fail to retrive categories, reason:' + reason);
        deffered.reject('Fail to retrive categories, reason:' + reason);
      });
      return deffered.promise;
  
    };
  
    service.savePersonalInfo = function (personalInfo) {
      service.personalInfo = personalInfo;
    }
  }
  
  
  
  })();
