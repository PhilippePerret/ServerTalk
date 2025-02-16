'use strict';
/*
ServerTalk.js
VERSION: 1.0.0
Read README.md
*/

class ServerTalk {

  static dial(params) {
    // console.log("-> dial avec", params)
    fetch(...this.fetch_params(params))
    .then(retour => retour.json())
    .then(data => params.callback(data))
    .catch(erreur => {console.error(erreur);Flash.error("Une erreur est survenue, consulter la console.")})
  }

  static get CSRF(){ return document.querySelector("meta[name=\"csrf-token\"]").content }

  static fetch_params(params) {
    return [
        params.route
      , {
            method: params.method || (params.data && "POST" || "GET")
          , headers: {
                "Content-Type": "application/json"
              , "x-csrf-token": this.CSRF
            }
          , body: (params.data && JSON.stringify(params.data))
        }
    ]
  }
}

window.ServerTalk = ServerTalk
