'use strict';
/**
 * A module that maintains the language change functions.
 * It holds the method to change the language, also holds the selected language.
 * @module Language
 */
module.exports = [
    '$translate',
    '$filter',
    '$rootScope',
    function($translate, $filter, $rootScope) {
        var lang = {};
        /**
         * @function setOptions
         * @description This method sets the list of the avaiable languages in the language dropdown.
         */
        lang.setOptions = function() {
            lang.options = [{
                key: 'en',
                name: $filter('translate')('english')
            }, {
                key: 'de',
                name: $filter('translate')('german')
            }, {
                key: 'ch',
                name: $filter('translate')('chinese')
            }];
        };
        /**
         * @function getLangOptions
         * @description This method returns the list of available language options.
         */
        lang.getLangOptions = function() {
            return lang.options;
        };
        /**
         * @function getLang
         * @description This method returns the selected language.
         */
        lang.getLang = function() {
            return lang.selectedData;
        };
        /**
         * @function setLang
         * @param {Object} data Required param {key:'en',name:'English'}
         * @description This method is called when language is selected.
         * Keeps the selected language in localstorage and use the selected language in the translate config
         */
        lang.setLang = function(data) {
            $translate.use(data.key);
            window.localStorage.setItem('lang', data.key);
            $rootScope.$broadcast('lang:changed');
            lang.setOptions();
            let selectedLangData = lang.options.find(function(langData) {
                return langData.key === data.key;
            });
            lang.selectedData = selectedLangData;
        };
        lang.setOptions();
        if (window.localStorage.getItem('lang')) {
            var selectedLang = lang.options.find(function(data) {
                return data.key === window.localStorage.getItem('lang');
            });
            if (selectedLang) {
                lang.selectedData = selectedLang;
            }
        }
        if (!lang.selectedData) {
            lang.selectedData = lang.options[0];
        }
        return lang;
    }
];