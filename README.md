# ENSAL Intensif HCA 2026 : Lyon, mémoire et justice

Carte historique interactive de Lyon, réalisée dans le cadre d’un intensif de l’ENSAL (2026).

Le site fait découvrir des parcours de figures historiques lyonnaises ainsi que les lieux de justice et de mémoire de la ville : palais, prisons et mémoriaux. Il s’adresse aussi bien au grand public qu’aux visiteurs d’une présentation, notamment au palais de justice : page d’accueil, carte interactive Leaflet, recherche dans tout le patrimoine et filtres par époque cartographique (aujourd’hui, 1950, 1820–1866).

Le site est compilé en fichiers statiques et configuré avec une base relative, ce qui permet un hébergement sous un sous-chemin, notamment les pages de projet GitHub Pages. Les cartes, images et polices chargées depuis des services externes nécessitent une connexion réseau pour s’afficher.

## Utiliser l’application

### Prérequis

Pour consulter le site, vous avez besoin de :
- Docker Engine avec Docker Compose v2, ou Docker Desktop configuré pour les conteneurs Linux ;
- GNU Make ;
- Git, uniquement pour récupérer le projet.

Sur Windows, le fichier `setup-windows.bat` installe ces trois outils (voir « Windows pas à pas » ci-dessous). Sur Linux et macOS, installez Docker, Make et Git depuis les sources officielles adaptées à votre système.

Bun et les outils JavaScript sont fournis dans l’image du projet. Ils n’ont pas à être installés sur votre ordinateur.

## Windows pas à pas

Suivez ces étapes dans l’ordre. Aucune connaissance technique n’est requise.

1. Double-cliquez sur `setup-windows.bat` à la racine du projet et suivez les instructions affichées. Le script installe Git, Docker Desktop et GNU Make avec WinGet. Si WinGet est absent, installez « Programme d’installation d’application » depuis le Microsoft Store puis relancez le script.
2. Si Docker Desktop vient d’être installé, redémarrez l’ordinateur.
3. Démarrez « Docker Desktop » et attendez qu’il affiche un statut prêt, avec les conteneurs Linux activés (backend WSL 2).
4. Ouvrez un **nouveau** terminal dans le dossier du projet : dans l’Explorateur de fichiers, cliquez dans la barre d’adresse du dossier, tapez `powershell`, puis Entrée. Vérifiez les outils :

   ```powershell
   docker compose version
   make --version
   ```

5. Lancez le site avec `make up`, puis ouvrez <http://localhost:5173/>.
6. Pour arrêter le site : `make down`.

Si vous travaillez depuis une distribution WSL, placez de préférence le dépôt dans le système de fichiers Linux (par exemple sous `~/code`) pour éviter les ralentissements liés aux montages Windows. Docker Desktop pour Windows et ses prérequis sont détaillés dans la [documentation officielle Docker](https://docs.docker.com/desktop/setup/install/windows-install/).

## Récupérer le projet

Si le projet n’est pas encore sur votre ordinateur, clonez-le puis entrez dans son dossier :

```sh
git clone https://github.com/desousavieirahugo/ENSAL-Intensif-HCA-2026.git
cd ENSAL-Intensif-HCA-2026
```

## Lancer le site

Depuis le dossier du projet, lancez :

```sh
make up
```

Cette commande construit l’image si nécessaire et démarre le serveur dans un conteneur en arrière-plan. Ouvrez ensuite <http://localhost:5173/> dans votre navigateur.

Pour arrêter le site :

```sh
make down
```

Bon à savoir : le premier lancement peut prendre quelques minutes (construction de l’image). Depuis un autre appareil du même réseau local, utilisez l’adresse IP locale de l’ordinateur suivie du port `5173`, et autorisez ce port dans le pare-feu si nécessaire.

## Développer

### Environnement de développement

Le développement a lieu dans Docker : l’image fournit Bun `1.4.2` et toutes les dépendances JavaScript, verrouillées par `bun.lock`. Sur la machine hôte, seul GNU Make est nécessaire pour invoquer les commandes du projet.

- Linux et macOS : installez Docker avec Docker Compose v2, GNU Make et Git depuis les sources officielles de votre système.
- Windows : utilisez `setup-windows.bat`, ou une distribution WSL avec le dépôt dans le système de fichiers Linux.

Commandes courantes :

```sh
make up       # Démarrer le serveur avec hot reload (localhost:5173)
make restart  # Redémarrer les conteneurs existants
make sh       # Ouvrir un shell dans le conteneur web en cours d’exécution
make install  # Installer les dépendances dans le conteneur Bun
```

`make sh` nécessite que `make up` ait déjà démarré le conteneur. Après un premier clonage, `make install` installe explicitement les dépendances (le conteneur les installe aussi au démarrage). Les modifications des fichiers du projet sont servies avec le rechargement à chaud.

### Vérifier les changements

Toutes les vérifications s’exécutent dans Docker :

```sh
make format        # Formater le code
make format-check  # Vérifier le formatage sans modifier les fichiers
make lint          # Exécuter Oxlint avec les contrôles stricts des templates Vue
make test          # Lancer les tests Vitest
make build         # Générer le site de production dans dist/
make check         # Format check, lint, tests et build
```

Pour prévisualiser le build de production, utilisez `make preview`, puis ouvrez <http://localhost:4173/>. Après le build, Vite écrit les fichiers statiques dans `dist/`.

### Générer la documentation des commandes

Les cibles publiques du Makefile sont documentées dans `docs/MAKEFILE.md`. Pour générer ou actualiser cette référence :

```sh
make docs
```

La commande utilise `makefile2doc` `v0.1.3`, téléchargé depuis la release GitHub et vérifié par SHA-256 lors de la construction de l’image Docker. Cette release fournit un binaire Linux x86-64 ; l’image de développement reste constructible sur d’autres architectures, mais `make docs` nécessite une machine hôte x86-64.

### Organisation des fichiers

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
├── setup-windows.bat    # Installation des dépendances sur Windows
└── Makefile             # Commandes du projet
```

Fonctionnement : `index.html` est le point d’entrée de Vite. `src/main.js` démarre l’application et `src/App.vue` gère les vues (accueil, parcours, justice), la recherche, les sélecteurs d’époque et les filtres. `src/features/map/MapCanvas.vue` gère la carte Leaflet (fonds, marqueurs, popups). La logique de filtrage par date et de recherche est isolée dans `src/domain/` et testée dans `tests/`. `src/legacy/app.js` reste dans le dépôt comme référence de l’ancienne interface, sans être chargé par le site.

### Outils et versions

Le projet utilise Vue `3.5.43`, Vite `8.3.0`, Leaflet `1.9.4`, Vitest `5.0.1`, Oxlint `1.85.0`, Oxfmt `0.70.0` et `oxlint-vue` `0.3.2`. Bun `1.4.2` est épinglé dans l’image Docker et dans la CI. Les versions de dépendances sont verrouillées par `bun.lock`.

Oxlint est configuré en mode strict, avec vérification des templates Vue. Les règles génériques du plugin anti-slop conservé dans `tools/oxlint/anti-slop/` sont activées. Si une exception locale est nécessaire, utilisez une directive Oxlint limitée à la règle et à la ligne concernées, avec une explication à proximité. Ne désactivez pas une règle dans la configuration partagée pour un cas isolé.
