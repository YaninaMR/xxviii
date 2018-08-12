
$(document).ready(function(){
    
    $('.slider').slider();

 	function loginfacebook(){
	    var provider = new firebase.auth.FacebookAuthProvider();	  
	    provider.addScope('public_profile');  
	   
		firebase.auth().signInWithPopup(provider).then(function(result) {		
		  // This gives you a Facebook Access Token. You can use it to access the Facebook API.		
		   var token = result.credential.accessToken;		
		  // The signed-in user info.		
		   var user = result.user;
          //var photo = result.photoURL;
          //var name = result.displayName;
          //console.log('user:'+ user + 'photo'+photo+'nombre:'+name); 
          	   var name = user.displayName;
			   console.log(name);
		      var icon = user.photoURL;
		       console.log(icon);
		      var userCode = user.uid;
		       console.log(userCode);
			  // save data user
		      var userRef = firebase.database().ref('users').child(userCode);
		      // guardando datos del usuario en la base datos
		      var firebasePostREsf = userRef.child('email');
		      firebasePostREsf.set(email);
		      var firebasePostREsfName = userRef.child('name');
		      firebasePostREsfName.set(name);
		      var firebasePostREsfIcon = userRef.child('icon');
		      firebasePostREsfIcon.set(icon); 			
		    initFirebase(user);		
	    }).catch(function(error) {		
		   		
		   var errorCode = error.code;		
		   var errorMessage = error.message;			
		   var email = error.email; // The email of the user's account used.		  
		   var credential = error.credential; // The firebase.auth.AuthCredential type that was used.		
			
		});		
    }

   $('#btn-facebook').on('click', loginfacebook);
});

                          //result.user
	function initFirebase(usuario) {
	  firebase.auth().onAuthStateChanged(function(usuario) {
		if (usuario) {
		  //var uid = user.uid;                            //result.user.uid 
		 // userConect = firebase.database().ref('/user/' + usuario.uid + '/data');
		  
	   firebase.database().ref('/user/' + usuario.uid + '/data').on('value', function(snapshot) {
			console.log(snapshot.val());
			if (snapshot.val() !== null) {
			  if (snapshot.val().uid === usuario.uid) {
				console.log('usuario ya registrado anteriormente');
				window.location.href = '../index.html';
			  }
			} else {
			  // conecto a la base de datos creo la referencia user y llamo a addUserDb
			  console.log('usuario nuevo' + usuario.uid + usuario.displayName + usuario.photoURL);
			 // addUserDb(usuario.uid, usuario.displayName, usuario.photoURL);
			  window.location.href = 'espacioFotos11.html'; // Por si acaso
			}
		  });
		}
	   });

	
	  var name = user.displayName;
	  console.log('nombre de usuario');
	  console.log(name);
      var icon = user.photoURL;
       console.log(icon);
      var userCode = user.uid;
       console.log(userCode);
	  // save data user
      var userRef = firebase.database().ref('users').child(userCode);
      // guardando datos del usuario en la base datos
      var firebasePostREsf = userRef.child('email');
      firebasePostREsf.set(email);
      var firebasePostREsfName = userRef.child('name');
      firebasePostREsfName.set(name);
      var firebasePostREsfIcon = userRef.child('icon');
      firebasePostREsfIcon.set(icon);

	}
   
    function addUserDb(uid, name, photo) {
	  userConect = firebase.database().ref('/user/' + uid + '/data');
	  var conect = userConect.set({
		uid: uid,
		name: name,
		photo: photo
	});
	  // console.log("Usuario nuevo REGISTRADO");

	  window.location.href = 'espacioFotos11.html';
	}  

    
      
    


