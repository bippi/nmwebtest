# app  - React vefur
Þessi hluti innheldur ytri vef sem birtir allar upplýsingar um lið, leiki, riðla og velli.
Á slóðinni /admin er einfalt viðmót það sem hægt er að slá inn úrslit. Opna þarf á IP notanda til að fá aðgang að þessum hluta vefsins. 

Þarf nodejs og npm

Þegar kóði er sótttur þá þarf að byrja á
    
    npm install

Umhverfisbreytan **NM_REST_API_URL** þarf að vera sett ( td. http://localhost:3002 eða 
https://nmrestnew.azurewebsites.net)

Umhverfisbreytan **NM_IP_WHITELIST** þarf að vera sett með comma seperated streng með þeim IP tölum sem hafa aðgang að admin hluta.
Ef project er keyrt í **development** umhverfi þá er admin hlutinn opinn.

Til að keyra í dev umhverfi sem keyrir upp webpack og server.
    
    npm run dev 

Til að keyra í server (notar síðasta pakkaða kóðann, frá prod eða dev)

    npm start

Webpack

    npm run build

Buildar production kóða.

# SSL cert frá LetsEncruypt til að nota í Azure
https://dev.to/ope/securing-your-azure-web-app-with-let-s-encrypt-4g99
https://docs.microsoft.com/en-us/azure/app-service/configure-ssl-bindings
https://docs.microsoft.com/en-us/azure/app-service/configure-ssl-certificate#upload-a-private-certificate

* Þarf aðgang að DNS servernum fyrir kfia.is (1984.is - brandur)
* þarf linux vél command line
* Passa 

## Skipanir
$ sudo apt-get update
$ sudo apt-get install certbot
$ sudo certbot certonly --manual --preferred-challenges=dns --email brandur@kfia.is --agree-tos --domain "nm8.kfia.is"
$ mkdir /tmp/sandbox
$ cd /tmp/sandbox
$ SOURCE=/etc/letsencrypt/live/nm.kfia.is
$ sudo cp $SOURCE/{cert.pem,privkey.pem,chain.pem} .
$ sudo chown brandur *.pem
$ openssl pkcs12 -export -out nm2020.pfx -inkey privkey.pem -in cert.pem -certfile chain.pem

* Kópera svo nm2020.pfx og uploada í azure, muna passwordið sem var sett



#  Repo fyrir Norðurálsmót

* Þessi vefur - https://github.com/kfiadev/nmwebnew

* Node.js api - https://github.com/kfiadev/nm.rest

* Database project - https://github.com/kfiadev/nmdb

* Nokkrar skrár og fundargerðir - https://github.com/kfiadev/files

* Eldri vefur, ekki notaður lengur - https://github.com/kfiadev/nmweb



# Eldri repo sem eru ekki notuð lengur

* Skrár til að prenta út og lesa yfir - https://github.com/brandurs/norduralsmot-files-yfirlestur

* Windows forms forrit til að skrá úrslit á föstudegi - https://github.com/brandurs/nmeditor

* Gagnagrunnur, Sql Server - https://github.com/brandurs/nmdb

* Rest þjónustur sem lesa úr grunni og vefur notar, .net core 2.2 - https://github.com/brandurs/nmrest

* Vefkóði, react og express - https://github.com/brandurs/nmweb