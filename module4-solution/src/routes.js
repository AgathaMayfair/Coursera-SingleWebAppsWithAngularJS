(function () {
    'use strict';
    
    angular.module('MenuApp').config(Routes);
    
    Routes.$inject = ['$stateProvider', '$urlRouterProvider'];
    function Routes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    
        $stateProvider.state('home', {
                url: '/',
                templateUrl: 'src/templates/home.template.html'
            }).state('categories', {
                url: '/categories',
                templateUrl: 'src/templates/categories.template.html',
                controller: 'CategoriesController',
                controllerAs: 'controller',
                resolve: {
                    categoriesList: ['MenuDataService',
                    function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            }).state('items', {
                url: '/items/{shortname}',
                templateUrl: 'src/templates/items.template.html',
                controller: 'ItemsController',
                controllerAs: 'controller',
                resolve: {
                    itemsList: ['$stateParams', 'MenuDataService',
                    function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.shortname);
                    }],
                }
            });
    }
    
})();