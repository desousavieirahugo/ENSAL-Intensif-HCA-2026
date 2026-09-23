# ENSAL Intensif HCA 2026

Carte historique interactive de Lyon. Le site présente des parcours liés à des
personnes et des lieux de l’histoire lyonnaise, avec une carte Leaflet, une
recherche et des filtres chronologiques. Il est conçu comme un site statique et
est progressivement migré vers Vue 3 et Vite.

## Prérequis

- Docker Engine avec Docker Compose v2, ou Docker Desktop configuré pour les conteneurs Linux
- GNU Make
- Git, si le projet doit être cloné

Bun et les outils JavaScript sont fournis dans l’image du projet. Ils n’ont pas
à être installés sur la machine hôte.

### Windows

1. Installe Git for Windows et Docker Desktop. Pendant la configuration de
   Docker Desktop, active le backend WSL 2 et vérifie que Docker utilise les
   conteneurs Linux. Démarre Docker Desktop avant d’utiliser le projet.
2. Dans PowerShell, installe GNU Make avec WinGet :

   ```powershell
   winget install --id ezwinports.make --exact
   ```

   Ferme puis rouvre le terminal pour actualiser le `PATH`. Tu peux aussi
   utiliser Make depuis une distribution WSL. Dans ce cas, place le dépôt dans
   le système de fichiers Linux (par exemple sous `~/code`) pour éviter les
   ralentissements liés aux montages Windows.
3. Ouvre PowerShell ou le terminal WSL dans le dossier du projet et vérifie les
   outils :

   ```powershell
   docker compose version
   make --version
   ```

Docker Desktop pour Windows et ses prérequis sont détaillés dans la
[documentation officielle Docker](https://docs.docker.com/desktop/setup/install/windows-install/).

### Linux et macOS

Installe Docker avec Docker Compose v2, GNU Make et Git depuis les sources
officielles adaptées à ton système. Le dépôt ne fournit pas de script
d’installation hôte ; Make invoque les commandes du projet et Docker fournit
l’environnement Bun.

## Récupérer le dépôt

Si tu n’as pas encore le projet, clone-le puis entre dans son dossier :

```sh
git clone https://github.com/desousavieirahugo/ENSAL-Intensif-HCA-2026.git
cd ENSAL-Intensif-HCA-2026
```


## Démarrer le projet

Depuis le dossier du dépôt, lance :

```sh
make up
```

Cette commande construit l’image si nécessaire et démarre le serveur Vite dans
un conteneur en arrière-plan. Le terminal affiche l’adresse locale
<http://localhost:5173/>. Les modifications des fichiers du projet sont servies
avec le rechargement à chaud. Pour y accéder depuis un autre appareil, utilise
l’adresse IP locale de l’ordinateur hôte suivie du port `5173`, et autorise ce
port dans le pare-feu si nécessaire.

Pour arrêter les conteneurs :

```sh
make down
```

Commandes Docker utiles :

```sh
make restart  # Redémarrer les conteneurs existants
make sh       # Ouvrir un shell dans le conteneur web en cours d’exécution
```

`make sh` nécessite que `make up` ait déjà démarré le conteneur.

Après un premier clonage, tu peux installer explicitement les dépendances avec
`make install`. Le conteneur les installe aussi au démarrage.

## Vérifier les changements

Les commandes de développement et de vérification s’exécutent dans Docker :

```sh
make format        # Formater le code
make format-check  # Vérifier le formatage sans modifier les fichiers
make lint          # Exécuter Oxlint avec les contrôles stricts des templates Vue
make test          # Lancer les tests Vitest
make build         # Générer le site de production dans dist/
make check         # Format check, lint, tests et build
```

Pour prévisualiser le build de production, utilise `make preview`, puis ouvre
<http://localhost:4173/>. Après le build, Vite écrit les fichiers statiques dans
`dist/`.

## Générer la documentation des commandes

Les cibles publiques du Makefile sont documentées dans `docs/MAKEFILE.md`.
Pour générer ou actualiser cette référence :

```sh
make docs
```

La commande utilise `makefile2doc` `v0.1.3`, téléchargé depuis la release
GitHub et vérifié par SHA-256 lors de la construction de l’image Docker. Cette
release fournit un binaire Linux x86-64 ; l’image de développement reste
constructible sur d’autres architectures, mais `make docs` nécessite une
machine hôte x86-64.

## Contenu et fonctionnement

La page d’accueil permet de choisir un parcours historique ou la vue des lieux
de justice. Les parcours s’appuient sur une carte Leaflet et des données
historiques intégrées à l’application. Les commandes de l’interface, les
sélecteurs de période et les filtres sont encore principalement gérés par
l’application historique dans `src/legacy/app.js`. Vue 3 sert de point d’entrée
à la migration progressive. La logique pure de filtrage par date est isolée
dans `src/domain/dateFilters.js` et testée dans `tests/`.

Les cartes, images et polices chargées depuis des services externes nécessitent
une connexion réseau pour s’afficher. La production est compilée en fichiers
statiques et configurée avec une base relative pour prendre en charge un
hébergement sous un sous-chemin, notamment les pages de projet GitHub Pages.

## Organisation des fichiers

```text
.
├── public/images/       # Images servies comme ressources statiques
├── src/
│   ├── domain/          # Logique métier sans dépendance à l’interface
│   ├── legacy/          # Interface Leaflet historique en cours de migration
│   ├── styles/          # Feuille de style principale
│   ├── App.vue          # Composant Vue racine
│   └── main.js          # Démarrage de l’application
├── tests/               # Tests Vitest
├── docs/MAKEFILE.md     # Référence générée des cibles Make
├── index.html           # Entrée de Vite et de l’hébergement statique
├── Dockerfile           # Image de développement Bun et makefile2doc
├── docker-compose.yml   # Service web et volumes de développement
└── Makefile             # Commandes du projet
```

## Outils et versions

Le projet utilise Vue `3.5.43`, Vite `8.3.0`, Leaflet `1.9.4`, Vitest `5.0.1`,
Oxlint `1.85.0`, Oxfmt `0.70.0` et `oxlint-vue` `0.3.2`. Bun `1.4.2` est épinglé
dans l’image Docker et dans la CI. Les versions de dépendances sont verrouillées
par `bun.lock`.

Oxlint est configuré en mode strict, avec vérification des templates Vue. Les
règles génériques du plugin anti-slop conservé dans `tools/oxlint/anti-slop/`
sont activées. Si une exception locale est nécessaire, utilise une directive
Oxlint limitée à la règle et à la ligne concernées, avec une explication à
proximité. Ne désactive pas une règle dans la configuration partagée pour un cas
isolé.
