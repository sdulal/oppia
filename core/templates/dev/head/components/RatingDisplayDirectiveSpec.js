// Copyright 2014 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Tests that ratings are being displayed correctly.
 */

describe('Rating display directive', function() {
  var elt, scope, $httpBackend, compiledElem, ctrlScope;

  beforeEach(module('oppia'));
  beforeEach(module('directiveTemplates'));
  beforeEach(inject(function(
      $rootScope, $compile, _$httpBackend_, $templateCache) {
    $httpBackend = _$httpBackend_;

    var templatesHtml = $templateCache.get(
      'core/templates/dev/head/components/rating_display.html');
    $compile(templatesHtml)($rootScope);
    $rootScope.$digest();

    scope = $rootScope.$new();
    elt = angular.element(
      '<rating-display rating-value="5" is-editable="true">' +
      '</rating-display>');
    compiledElem = $compile(elt)(scope);
    scope.$digest();
    ctrlScope = elt[0].isolateScope();
  }));

  it('should display the correct number of stars', function() {
    ctrlScope.ratingValue = 4.2;
    scope.$digest();
    // Note the array here is zero-indexed but ratings are one-indexed.
    expect(ctrlScope.stars[0].cssClass).toBe('fa-star');
    expect(ctrlScope.stars[1].cssClass).toBe('fa-star');
    expect(ctrlScope.stars[2].cssClass).toBe('fa-star');
    expect(ctrlScope.stars[3].cssClass).toBe('fa-star');
    expect(ctrlScope.stars[4].cssClass).toBe('fa-star-o');

    ctrlScope.ratingValue = 1.7;
    scope.$digest();
    expect(ctrlScope.stars[0].cssClass).toBe('fa-star');
    expect(ctrlScope.stars[1].cssClass).toBe('fa-star-half-o');
    expect(ctrlScope.stars[2].cssClass).toBe('fa-star-o');
    expect(ctrlScope.stars[3].cssClass).toBe('fa-star-o');
    expect(ctrlScope.stars[4].cssClass).toBe('fa-star-o');

    ctrlScope.ratingValue = 1.9;
    scope.$digest();
    expect(ctrlScope.stars[0].cssClass).toBe('fa-star');
    expect(ctrlScope.stars[1].cssClass).toBe('fa-star');
    expect(ctrlScope.stars[2].cssClass).toBe('fa-star-o');
    expect(ctrlScope.stars[3].cssClass).toBe('fa-star-o');
    expect(ctrlScope.stars[4].cssClass).toBe('fa-star-o');

    ctrlScope.ratingValue = 2.25;
    scope.$digest();
    expect(ctrlScope.stars[0].cssClass).toBe('fa-star');
    expect(ctrlScope.stars[1].cssClass).toBe('fa-star');
    expect(ctrlScope.stars[2].cssClass).toBe('fa-star-half-o');
    expect(ctrlScope.stars[3].cssClass).toBe('fa-star-o');
    expect(ctrlScope.stars[4].cssClass).toBe('fa-star-o');

    ctrlScope.ratingValue = 4.3;
    scope.$digest();
    expect(ctrlScope.stars[0].cssClass).toBe('fa-star');
    expect(ctrlScope.stars[1].cssClass).toBe('fa-star');
    expect(ctrlScope.stars[2].cssClass).toBe('fa-star');
    expect(ctrlScope.stars[3].cssClass).toBe('fa-star');
    expect(ctrlScope.stars[4].cssClass).toBe('fa-star-half-o');
  });
});
