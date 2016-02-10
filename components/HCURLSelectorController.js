var getOtherURLSthatMatch = function(selectedURL, selectedURLs, allURLS){

  // all the urls that are not selected
  var unselectedURLs = allURLS.filter((url)=>{
    return selectedURLs.indexOf(url.url) === -1;
  });

  // has selectedURL already been shortened?
  var alreadyShortened = allURLS.filter((url)=>{
    return url.url === selectedURL;
  }).reduce((prev,curr, index, array)=>{
    return array[index].shortened;
  }, false);


  if(alreadyShortened){
    // return all the unselected urls that are in selectedURL
    return unselectedURLs.filter((url)=>{
      return selectedURL.indexOf(url.url) !== -1;
    }).map((url)=>{
      return url.url;
    });

  } else {
    // return all the unselected urls that have selectedURL in them
    return unselectedURLs.filter((url)=>{
      return url.url.indexOf(selectedURL) !== -1;
    }).map((url)=>{
      return url.url;
    });

  }
};



module.exports = {
  getOtherURLSthatMatch: getOtherURLSthatMatch
};


// if longURL is already shortened
//  - this means it is being selected for un-shortening
//  - get the list of unselected shortend urls that would also match longURL
//  - mark those as selected too


// if longURL is not shortened
//  - this means it is being selected for shortening
//  - get the list of unselected non-shortened urls that longURL will also match
//  - mark those as selected too

// console.log(JSON.stringify(urlsToAddToSelection.map((url)=>{
//   return url.url;
// })));

// dedupe urls
