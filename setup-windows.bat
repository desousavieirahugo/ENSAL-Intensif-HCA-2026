@echo off
rem ============================================================
rem  ENSAL Intensif HCA 2026 - Installation des dependances Windows
rem
rem  Double-cliquez ce fichier pour installer Git, Docker Desktop
rem  et GNU Make avec WinGet. Ensuite, demarrez Docker Desktop
rem  puis lancez "make up" dans le dossier du projet.
rem  Voir la section Windows du fichier README.md.
rem ============================================================
setlocal
cd /d "%~dp0"
chcp 65001 >nul

echo ================================================
echo  Installation des dependances - Windows
echo ================================================
echo.

where winget >nul 2>nul
if errorlevel 1 (
  echo [ERREUR] WinGet est introuvable sur cet ordinateur.
  echo Installez "Programme d'installation d'application" depuis
  echo le Microsoft Store, puis relancez ce fichier.
  echo Voir : https://learn.microsoft.com/windows/package-manager/
  pause
  exit /b 1
)

call :InstallIfMissing git "Git.Git" "Git"
if errorlevel 1 goto :Failure
call :InstallIfMissing docker "Docker.DockerDesktop" "Docker Desktop"
if errorlevel 1 goto :Failure
call :InstallIfMissing make "ezwinports.make" "GNU Make"
if errorlevel 1 goto :Failure

echo.
echo -----------------------------------------------
echo  Verification des outils deja disponibles
echo -----------------------------------------------
where make >nul 2>nul
if not errorlevel 1 make --version
where docker >nul 2>nul
if not errorlevel 1 docker compose version

echo.
echo -----------------------------------------------
echo  Prochaines etapes
echo -----------------------------------------------
echo  1. Si Docker Desktop vient d'etre installe, redemarrez l'ordinateur.
echo  2. Demarrez "Docker Desktop" et attendez qu'il affiche un statut pret.
echo  3. Fermez cette fenetre et ouvrez un NOUVEAU terminal dans le dossier du projet.
echo  4. Lancez le site avec :  make up
echo  5. Ouvrez http://localhost:5173/ dans le navigateur.
echo  6. Pour arreter le site :  make down
echo.
echo  En cas de probleme, lisez la section Windows du fichier README.md.
pause
exit /b 0

:Failure
echo.
echo [ERREUR] L'installation est incomplete. Relancez ce fichier ou
echo installez l'outil manquant a la main, voir README.md section Windows.
pause
exit /b 1

:InstallIfMissing
rem %~1 = commande attendue, %~2 = identifiant WinGet, %~3 = nom affiche
where %~1 >nul 2>nul
if not errorlevel 1 (
  echo [OK] %~3 est deja installe.
  exit /b 0
)
echo [INSTALLATION] %~3 ...
winget install --id %~2 -e --source winget --accept-package-agreements --accept-source-agreements
if errorlevel 1 (
  echo [ERREUR] Impossible d'installer %~3 avec WinGet.
  exit /b 1
)
echo [OK] %~3 installe.
exit /b 0
