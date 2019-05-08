# Quiz_game

Quiz Game aplikacija

Opis: 
Kviz sa odredjenim brojem pitanja (ovde izabrano 10, ali postoji i mogucnost izmene broja pitanja). 
Pitanja su preuzeta preko API-ja generisanog sa sajta https://opentdb.com, a parametri koji se tu mogu menjati jesu: oblast, broj pitanja, tezina pitanja i tip pitanja.
Svaki tacan odgovor u ovom kvizu nosi 10 poena. Igraci se rangiraju i prikazuju u tabeli najboljih rezultata na kraju.

Tehnologija:
Aplikacija je izradjena u HTML-u, CSS-u (Flex, CSS animation za pozadinu) i Vanilla JavaScriptu. Rezultati kviza se cuvaju u JSON formatu u Local Storage-u i odatle se preuzimaju za High Scores tabelu.
 
**
Ako API ne radi, onda se mogu iskoristiti pitanja iz fajla question.json, ali onda u kodu smanjiti i broj max pitanja na 5.
