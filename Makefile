.PHONY: install up down restart sh build preview format format-check lint test check docs

## @category Développement
## @description Installer les dépendances dans le conteneur Bun.
install:
	docker compose run --rm --build web bun install

## @description Construire le site pour la production dans Docker.
build:
	docker compose run --rm --build web bun run build

## @description Prévisualiser le build de production sur le port 4173.
preview:
	docker compose run --rm --build -p 4173:4173 web bun run preview -- --host 0.0.0.0

## @category Qualité
## @description Appliquer le formatage Oxfmt dans Docker.
format:
	docker compose run --rm --build web bun run format

## @description Vérifier le formatage Oxfmt sans modifier les fichiers.
format-check:
	docker compose run --rm --build web bun run format:check

## @description Lancer Oxlint strict dans Docker.
lint:
	docker compose run --rm --build web bun run lint

## @description Lancer les tests Vitest dans Docker.
test:
	docker compose run --rm --build web bun run test

## @description Exécuter les vérifications de format, lint, tests et build.
## @depends format-check, lint, test, build
check: format-check lint test build

## @category Docker
## @description Démarrer le serveur avec hot reload, disponible sur localhost:5173.
up:
	docker compose up --build -d

## @description Arrêter les conteneurs du projet.
down:
	docker compose down

## @description Redémarrer les conteneurs du projet.
restart:
	docker compose restart

## @depends up
## @description Ouvrir un shell dans le conteneur Bun en cours d’exécution.
sh: up
	docker compose exec web sh

## @category Documentation
## @description Générer docs/MAKEFILE.md depuis les commentaires du Makefile.
docs:
	docker compose run --rm --build web makefile2doc -i Makefile -o docs/MAKEFILE.md
