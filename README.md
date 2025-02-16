# ServerTalk.js

Communication client <-> serveur par javascript.

## Installation de la librairie

Deux façons d’utiliser ce script dans Phoenix :

1. En tant que librairie indépendante

   1. Le copier dans `/priv/static/assets/js`

   2. ajouter la balise suivante dans le root

      ```
      <script 
      	defer
      	type="text/javascript"
      	src={~p"/assets/js/server_talk.js"}></script>
      ```

2. En tant que classe ajoutée à app.js :

   1. le copier dans `/assets/vendor`

   2. ajouter la ligne suivante dans `/assets/js/app.js`

      ```
      import "../vendor/server.talk.js";
      ```

   3. s’assurer que le fichier `config/config.ex`, dans la configuration de `:esbuild`, le fichier `app.js` soit bien construit (il doit se trouver dans la liste des `args`

## Utilisation de la librairie

Pour envoyer un message :

```
function envoyerUnMessage(){
	ServerTalk.dial({
			route: "/la/route"
		, method: "DELETE"
		, data: {id: "id-de-lelement"}
		, callback: this.fonctionRetour.bind(this)
	})
}
function fonctionRetour(dataReturned){
	if ( dataReturned.ok ) {
		// Traitement si OK
	} else {
		// traitement si pas OK
	}
}
```

Dans `router.ex`

~~~elixir
scope "/", MonAppWeb do

	DELETE "/la/route", MonController, :fonction
	
end
~~~

Dans le contrôleur

~~~elixir
defmodule MonApp.MonController do

	def fonction(conn, params) do
		IO.inspect(params)
		# => 	{
		#				...
		#				"id" => "id-de-lelement"
		#			}
		
		# Traitement
		
		retour = %{
			ok: true,
			error: "Si une erreur est survenue",
			autre: "Donnée"
		}
		
		conn
		|> json(retour)
		|> halt()
	end
end
~~~

