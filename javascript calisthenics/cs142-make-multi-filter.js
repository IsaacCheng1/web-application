'use strict';

/*
 * Takes an array as parameter and returns a function that can be
 * used to filter the elements of this array.
 */
function cs142MakeMultiFilter(originalArray) {
	var currentArray = originalArray.slice();
	var arrayFilterer = function (filterCriteria, callback) {
		// If filterCriteria is not a function, immediately return 
		// the value of currentArray with no filtering performed.
		if (typeof filterCriteria !== 'function') {
			return currentArray;
		}
		currentArray = currentArray.filter(filterCriteria);

		// If callback is not a function, it should be ignored.
		if (typeof callback === 'function') {
			callback.call(originalArray, currentArray);
		}
		return arrayFilterer;
	};
	return arrayFilterer;
}