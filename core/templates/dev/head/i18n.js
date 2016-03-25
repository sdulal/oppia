// Copyright 2015 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Translation functions for Oppia.
 *
 * @author milagro.teruel@gmail.com (Milagro Teruel)
 */

// Translations of strings that are loaded in the front page. They are listed
// here to be loaded synchronously with the script to prevent a FOUC or
// Flash of Untranslated Content.
// See http://angular-translate.github.io/docs/#/guide/12_asynchronous-loading
oppia.constant('DEFAULT_TRANSLATIONS', {
  I18N_GALLERY_PAGE_TITLE: 'Gallery',
  I18N_GALLERY_PAGE_SUBTITLE: 'Oppia',
  I18N_GALLERY_LOADING: 'Loading',
  I18N_SIGNUP_PAGE_SUBTITLE: 'Registration',
  I18N_SIGNUP_PAGE_TITLE: 'Oppia',
  I18N_GALLERY_SEARCH_PLACEHOLDER: 'What are you curious about?',
  I18N_GALLERY_ALL_LANGUAGES: 'All Languages',
  I18N_GALLERY_LANGUAGES_EN: 'English',
  I18N_GALLERY_ALL_CATEGORIES: 'All Categories',
  I18N_GALLERY_CREATE_EXPLORATION: 'Create exploration',
  I18N_SIDEBAR_HOME_LINK: 'Home',
  I18N_SIDEBAR_HOME_ABOUT: 'About',
  I18N_SIDEBAR_PARTICIPATION_PLAYBOOK: 'Participation Playbook',
  I18N_SIDEBAR_FORUM: 'Forum',
  I18N_SIDEBAR_FOLLOW_US: 'Follow Us',
  I18N_SIDEBAR_ADDITIONAL_LINK_SITE_FEEDBACK: 'Site Feedback',
  I18N_TOPNAV_SIGN_IN: 'Sign in',
  I18N_SIGNUP_REGISTRATION: 'Registration',
  I18N_SIGNUP_LOADING: 'Loading'
});

oppia.controller('I18nFooter', [
    '$rootScope', '$scope', '$translate',
    function($rootScope, $scope, $translate) {
  // Changes the language of the translations.
  $scope.supportedSiteLanguages = GLOBALS.SUPPORTED_SITE_LANGUAGES;
  $scope.changeLanguage = function(langCode) {
    $translate.use(langCode);
  };
  // After loading default translations, change the language for the stored
  // language if necessary.
  $rootScope.$on('$translateLoadingSuccess', function() {
    var currentLang = $translate.proposedLanguage() || $translate.use();
    $translate.use(currentLang);
  });
}]);

oppia.config([
    '$translateProvider', 'DEFAULT_TRANSLATIONS',
    function($translateProvider, DEFAULT_TRANSLATIONS) {
  var availableLanguageKeys = [];
  var availableLanguageKeysMap = {};
  for (var prop in GLOBALS.SUPPORTED_SITE_LANGUAGES) {
    availableLanguageKeys.push(prop);
    availableLanguageKeysMap[prop + '*'] = prop;
  }
  availableLanguageKeysMap['*'] = 'en';

  $translateProvider
    .registerAvailableLanguageKeys(
      availableLanguageKeys, availableLanguageKeysMap)
    .useStaticFilesLoader({
      prefix: '/i18n/locale-',
      suffix: '.json'
    })
    // The use of default translation improves the loading time when English is
    // selected
    .translations('en', DEFAULT_TRANSLATIONS)
    .fallbackLanguage('en')
    .determinePreferredLanguage()
    .useCookieStorage()
    // The strategy 'sanitize' does not support utf-8 encoding.
    // https://github.com/angular-translate/angular-translate/issues/1131
    // The strategy 'escape' will brake strings with raw html, like hyperlinks
    .useSanitizeValueStrategy('sanitizeParameters')
    .forceAsyncReload(true);
}]);

// Service to dynamically construct translation ids for i18n.
oppia.factory('i18nIdService', function() {
  return {
    // Construct a translation id for gallery from name and a prefix.
    // Ex: 'categories', 'art' -> 'I18N_GALLERY_CATEGORIES_ART'
    getGalleryId: function(prefix, name) {
      return (
        'I18N_GALLERY_' + prefix.toUpperCase() + '_' +
        name.toUpperCase().replace(' ', '_'));
    }
  };
});