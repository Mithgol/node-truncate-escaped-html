var escapeHTML = require('lodash.escape');

module.exports = (limit, ending, source) => {
   if( typeof source === 'undefined' ){
      source = ending;
      ending = '';
   }
   if( limit <= 0 ) return '';
   if( limit < ending.length ) throw new Error(
      'truncate-escaped-html: limit < ending.length'
   );
   var escSource = escapeHTML(source);
   if( escSource.length <= limit ) return escSource;

   var realLimit = limit - ending.length;
   var desiredLimit = realLimit;
   while(
      escapeHTML( source.slice(0, desiredLimit) ).length > realLimit
   ) desiredLimit--;
   return escapeHTML( source.slice(0, desiredLimit) ) + ending;
};