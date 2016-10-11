angular.module('jamesonart').service('primaryService', function($http,$state){

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  this.loginLocal = function(credentials) {
    return $http({
      method: "POST",
      url: '/auth/local',
      data: credentials
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log('ERROR LOGGING IN!', err);
    })
  };

  this.isLoggedIn = function() {
      return $http({
        method: 'GET',
        url: '/auth/status'
      })
      .then(function(res){
        return res.data
      })
      .catch(function(err){
        console.log('is logged in? error',err);
      })
    }

  this.logout = function() {
    return $http({
      method: 'GET',
      url: '/auth/logout'
    })
    .then(function(res) {
      $state.go('home')
    })
    .catch(function(err) {
      console.log('service logout error: ',err);
    })
  };

  this.getArt = function(type) {
    var url = type ? '/'+type : '/images'
    return $http({
      method: 'GET',
      url: url
    }).then(function(res){
      return shuffle(res.data);
    });
  };

  this.addImage = function(imageData) {
    return $http({
      method: 'POST',
      url: '/image',
      data: imageData
    }).then(function(res){
      return res.data;
    });
  };

  this.deleteImage = function(id) {
    return $http({
      method: 'DELETE',
      url: '/image/'+id
    }).then(function(res){
      return res.data;
    });
  };

  this.editTitle = function(id,title) {
    return $http({
      method: 'PUT',
      url: '/image/title/'+id,
      data: { title: title }
    }).then(function(res){
      return res.data;
    });
  };

  this.editType = function(id,type) {
    return $http({
      method: 'PUT',
      url: '/image/type/'+id,
      data: { type: type }
    }).then(function(res){
      return res.data;
    });
  };

    this.editDescription = function(id,description) {
      console.log(id,description);
      return $http({
        method: 'PUT',
        url: '/image/description/'+id,
        data: { description: description }
      }).then(function(res){
        return res.data;
      });
    };


});
