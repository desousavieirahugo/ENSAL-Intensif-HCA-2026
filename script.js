/**
* ==========================================================================
* 🧠 PROJET PÉDAGOGIQUE : LE CERVEAU DE L'APPLICATION (script.js)
* ==========================================================================
* 🧒 GUIDE FACILE À COMPRENDRE (MÊME POUR UN ENFANT OU UN DÉBUTANT) :
*
* 1. À QUOI SERT CE FICHIER "script.js" ?
*    Si le HTML est le corps et le CSS est le vêtement, le JAVASCRIPT EST LE CERVEAU !
*    - Sans lui, le site serait une simple feuille de papier immobile.
*    - Grâce à lui, quand tu cliques sur un résistant, la carte s'anime, se déplace
*      toute seule vers Lyon, dessine les itinéraires dans les rues et ouvre les photos !
*
* 2. CE QUE FAIT CONCRÈTEMENT CE FICHIER LIGNE PAR LIGNE :
*    - Il garde en mémoire l'histoire de Jean Moulin, Chaban-Delmas et Lucie Aubrac (noms, photos, citations).
*    - Il allume et éteint la carte géographique grâce à un outil magique appelé "Leaflet".
*    - Il gère l'interrupteur Jour / Nuit : soleil ☀️ pour le jour, lune 🌙 pour la nuit.
*    - Sur la carte des prisons et tribunaux, il affiche les points quand on est sur la
*      "Carte interactive", et les fait disparaître quand on admire les photos d'archives.
*    - Il sait calculer la distance et le temps de marche à pied ou à vélo dans Lyon !
*
* 3. SOMMAIRE DES 12 GRANDES PARTIES :
*    1. DONNÉES HISTORIQUES (les textes et coordonnées des étapes)
*    2. VARIABLES GLOBALES (les boîtes mémoires du programme)
*    3. MARQUEURS SUR LA CARTE (les petits drapeaux et épingles)
*    4. INITIALISATION & MODE CLAIR/SOMBRE (allumage de la carte)
*    5. LIEUX DE JUSTICE (prisons, tribunaux et QG de la Gestapo)
*    6. FENÊTRE FLOTTANTE D'ARCHIVE (zoom sur les photos historiques)
*    7. CHANGEMENT DE PAGE (Accueil ⟷ Carte interactive)
*    8. FILTRES DU MENU (tous les lieux, prisons, tribunaux)
*    9. MENU TIROIR SUR MOBILE & PC (ouverture et fermeture)
*    10. FICHES DES RÉSISTANTS (biographie et étapes)
*    11. CALCULATEUR D'ITINÉRAIRES GPS (chemins à pied et à vélo)
*    12. GESTE TACTILE SUR SMARTPHONE (glisser le doigt vers le bas)
* ==========================================================================
*/

// ==========================================================================
// 1. DONNÉES HISTORIQUES DES RÉSISTANTS (dataPersonnes)
// ==========================================================================
// Un "Objet" JavaScript (const dataPersonnes = {...}) regroupe les données de chaque figure.
// Les clés ("jean_moulin", "chaban_delmas", "lucie_aubrac") correspondent exactement aux
// identifiants passés dans l'attribut onclick="ouvrirCarte('jean_moulin')" du fichier index.html.
const dataPersonnes = {
// Fiche complète de Jean Moulin
"jean_moulin": {
nom: "Jean Moulin",
titre: "Président du Conseil National de la Résistance",
role: "Unificateur des réseaux de la Résistance",
img: "images/jean_moulin.jpg", // Chemin relatif vers la photo locale
color: "#e63946", // Couleur rouge attribuée pour ses marqueurs et sa ligne
quote: "« Je ne savais pas que c'était si difficile de ne pas céder. »",
bio: "Héros emblématique de la Résistance française, Jean Moulin est parachuté en France par le général de Gaulle début 1942. Établi à Lyon, capitale de la Résistance, il parvient à unifier les mouvements Combat, Libération et Franc-Tireur sous l'égide des M.U.R., avant de présider le Conseil National de la Résistance.",
// Liste ordonnée de ses étapes clandestines à Lyon
etapes: [
{
coords: [45.7578, 4.8320], // Coordonnées GPS : [Latitude, Longitude]
titre: "Place Bellecour & Galeries",
date: "1942 - 1943",
lieu: "Presqu'île, Lyon 2e",
desc: "Lieu privilégié pour les rendez-vous secrets et les contacts clandestins au cœur de la ville sous haute surveillance."
},
{
coords: [45.7705, 4.8315],
titre: "Traboules des Pentes de la Croix-Rousse",
date: "Printemps 1943",
lieu: "Pentes de la Croix-Rousse, Lyon 1er",
desc: "Les passages secrets des canuts servaient d'échappatoires aux filatures de la Gestapo et abritaient des imprimeries clandestines."
},
{
coords: [45.7950, 4.8465],
titre: "Maison du Dr Dugoujon à Caluire",
date: "21 juin 1943",
lieu: "Caluire-et-Cuire",
desc: "Réunion clandestine décisive des dirigeants de la Résistance. Trahi, Jean Moulin y est arrêté par Klaus Barbie et la Gestapo."
},
{
coords: [45.7508, 4.8625],
titre: "Prison Militaire de Montluc",
date: "Juin - Juillet 1943",
lieu: "Rue Jeanne Hachette, Lyon 3e",
desc: "Incarcéré dans la cellule 130, Jean Moulin endure de terribles tortures sans livrer le moindre secret avant son transfert."
}
],
// Suite de coordonnées utilisées pour dessiner la ligne reliant les étapes
traceline: [
[45.7578, 4.8320],
[45.7705, 4.8315],
[45.7950, 4.8465],
[45.7508, 4.8625]
]
},
"chaban_delmas": {
nom: "Jacques Chaban-Delmas",
titre: "Délégué Militaire National (DMN)",
role: "Général de Brigade & Coordination FFI",
img: "images/chaban_delmas.jpg",
color: "#3a86ff",
quote: "« Servir la patrie dans l'ombre pour la faire renaître dans la lumière. »",
bio: "Nommé général de brigade à seulement 29 ans, il coordonne pour le gouvernement provisoire à Londres les opérations militaires des Forces Françaises de l'Intérieur (FFI) et prépare la libération du territoire et de la métropole lyonnaise.",
etapes: [
{
coords: [45.7538, 4.8355],
titre: "Quais du Rhône & Pont de l'Université",
date: "1943",
lieu: "Quai Gailleton, Lyon 2e",
desc: "Point de ralliement stratégique pour échanger les dépêches militaires chiffrées avec le Bureau Central de Renseignements et d'Action."
},
{
coords: [45.7672, 4.8596],
titre: "Gare des Brotteaux",
date: "1943 - 1944",
lieu: "Place Jules Ferry, Lyon 6e",
desc: "Plaque tournante des liaisons ferroviaires secrètes vers Paris et Genève, assurant le passage des agents et du matériel radio."
},
{
coords: [45.7675, 4.8336],
titre: "Hôtel de Ville / Place des Terreaux",
date: "3 septembre 1944",
lieu: "Place des Terreaux, Lyon 1er",
desc: "Célébration de la libération de Lyon après le repli des troupes d'occupation allemandes et l'entrée conjointe des résistants et alliés."
}
],
traceline: [
[45.7538, 4.8355],
[45.7672, 4.8596],
[45.7675, 4.8336]
]
},
"lucie_aubrac": {
nom: "Lucie Aubrac",
titre: "Cofondatrice de Libération-Sud",
role: "Héroïne de la Résistance & Évasions",
img: "images/lucie_aubrac.jpg",
color: "#2a9d8f",
quote: "« Résister est un verbe qui se conjugue au présent. »",
bio: "Professeure d'histoire au lycée de jeunes filles de Lyon, Lucie Aubrac cofonde le mouvement Libération-Sud. Face aux arrestations, elle conçoit et mène avec un sang-froid légendaire des opérations armées audacieuses pour libérer ses camarades et son époux Raymond.",
etapes: [
{
coords: [45.7690, 4.8460],
titre: "Lycée Edgar Quinet (Édouard Herriot)",
date: "1941 - 1943",
lieu: "Boulevard des Belges, Lyon 6e",
desc: "Elle y enseigne l'histoire tout en recrutant des agents de liaison et en fabriquant des faux papiers d'identité dans la clandestinité."
},
{
coords: [45.7485, 4.8270],
titre: "Prison Saint-Paul",
date: "Mai 1943",
lieu: "Quartier Perrache, Lyon 2e",
desc: "Elle affronte directement le procureur général sous une fausse identité et parvient à faire libérer Raymond Aubrac une première fois."
},
{
coords: [45.7592, 4.8217],
titre: "Coup de main du Bd des Hirondelles",
date: "21 octobre 1943",
lieu: "Fourvière / Antiquaille, Lyon 5e",
desc: "Attaque armée spectaculaire d'un fourgon de la Gestapo : elle libère son mari et 13 autres résistants condamnés à mort."
}
],
traceline: [
[45.7690, 4.8460],
[45.7485, 4.8270],
[45.7592, 4.8217]
]
}
};

// Données historiques des Lieux de Justice, de Police et Carcéraux à Lyon (1940-1944)
const dataLieuxJustice = {
carceraux: {
nomCategorie: "Lieux carcéraux",
icon: "⛓️",
color: "#9b5de5",
lieux: [
{
nom: "Prison Militaire de Montluc",
coords: [45.7508, 4.8625],
adresse: "4 rue Jeanne-Hachette, Lyon 3e",
role: "Principal lieu d'internement de la Gestapo sous Klaus Barbie et des autorités de Vichy. Près de 10 000 personnes (résistants, otages, juifs) y furent enfermées."
},
{
nom: "Prison Saint-Paul",
coords: [45.7485, 4.8270],
adresse: "Place des Archives / Perrache, Lyon 2e",
role: "Prison civile où le régime de Vichy incarcérait les opposants politiques et résistants (dont Raymond Aubrac et les militants de Libération-Sud)."
},
{
nom: "Prison Saint-Joseph",
coords: [45.7475, 4.8272],
adresse: "Quartier Perrache, Lyon 2e",
role: "Établissement pénitentiaire contigu à Saint-Paul, fortement surpeuplé sous l'Occupation, accueillant détenus politiques et de droit commun."
},
{
nom: "Fort de Côte-Lorette",
coords: [45.6980, 4.7930],
adresse: "Saint-Genis-Laval",
role: "Lieu du massacre tragique du 20 août 1944 : 120 prisonniers extraits de Montluc y furent abattus et brûlés par les nazis avant leur fuite."
}
]
},
juridiques: {
nomCategorie: "Lieux juridiques",
icon: "⚖️",
color: "#c5a059",
lieux: [
{
nom: "Palais de Justice (« Les 24 Colonnes »)",
coords: [45.7617, 4.8278],
adresse: "Quai Romain-Rolland, Lyon 5e",
role: "Siège de la Cour d'appel et des Sections Spéciales de Vichy instituées pour juger sans recours et condamner lourdement les résistants."
},
{
nom: "Tribunal Militaire de Lyon",
coords: [45.7550, 4.8480],
adresse: "Caserne de la Part-Dieu, Lyon 3e",
role: "Juridiction militaire d'exception jugeant les actes qualifiés de « terrorisme » par Vichy et les autorités d'occupation."
},
{
nom: "Cour Martiale de la Milice",
coords: [45.7675, 4.8336],
adresse: "Hôtel de Ville / Préfecture, Lyon",
role: "Instituée début 1944 par Joseph Darnand : trois juges miliciens anonymes prononçaient des peines de mort exécutées dans l'heure."
}
]
},
police: {
nomCategorie: "Lieux de police & répression",
icon: "🚨",
color: "#e63946",
lieux: [
{
nom: "École de Santé Militaire (QG Gestapo)",
coords: [45.7472, 4.8398],
adresse: "14 avenue Berthelot, Lyon 7e (Actuel CHRD)",
role: "Quartier général de la Gestapo (Sipo-SD) sous les ordres de Klaus Barbie dès le printemps 1943. Lieu sinistre de tortures et d'interrogatoires."
},
{
nom: "Hôtel Terminus",
coords: [45.7495, 4.8260],
adresse: "12 cours de Verdun, Lyon 2e",
role: "Premier quartier général de Klaus Barbie et de la section IV de la Gestapo lors de l'invasion de la zone sud en novembre 1942."
},
{
nom: "Siège de la Milice Française",
coords: [45.7562, 4.8318],
adresse: "Place Bellecour / Rue Sainte-Hélène, Lyon 2e",
role: "QG des miliciens sous le commandement de Paul Touvier : centre des dénonciations, des rafles et de la traque des résistants et des familles juives."
}
]
}
};

// ==========================================================================
// 2. VARIABLES GLOBALES DE GESTION & ÉTAT DU SITE
// ==========================================================================
// Ces variables conservent en mémoire l'état courant de l'application :
// quel résistant est affiché, quelle étape est sélectionnée, quel mode de transport est actif, etc.

let map = null;                    // Instance principale de la carte Leaflet (initialisée par initMap)
let coucheActuelle = null;         // Groupe de calques (L.layerGroup) contenant les étapes et la ligne du résistant
let marqueursActuels = [];         // Tableau mémorisant les marqueurs Leaflet créés pour pouvoir les cibler par clic
let personnageActifId = null;      // Identifiant du résistant actif ('jean_moulin', 'chaban_delmas', 'lucie_aubrac')
let etapeActiveIndex = null;       // Numéro de l'étape actuellement mise en surbrillance (0, 1, 2...)

// Variables dédiées au calcul et à l'affichage du routage GPS réel
let modeTransportActuel = 'foot';   // Mode de déplacement : 'foot' (marche à 4.5 km/h) ou 'bike' (vélo à 15.0 km/h)
let coucheLigneItineraire = null;   // Calque Leaflet contenant le tracé des routes réelles calculées
let itineraireEstVisible = true;   // Vrai si le tracé routier doit être affiché sur la carte, faux sinon
let trajetSelectionne = 'all';     // 'all' (parcours complet) ou '0-1', '1-2' (tronçon spécifique entre deux étapes)
let routesAlternativesRecues = []; // Tableau contenant les 3 variantes de route (Direct, Quais de Saône, Berges du Rhône)
let varianteActiveIndex = 0;       // Index de l'itinéraire choisi par l'utilisateur (0 = le plus rapide)

// Tuiles cartographiques Esri (fonds de carte haute performance)
let tileEsriLight = null;          // Fond clair officiel Esri World Light Gray Base
let tileEsriDark = null;           // Fond sombre officiel Esri World Dark Gray Base
let modeFondCarte = 'light';       // Mode actif par défaut ('light' selon les souhaits du projet)

// Groupes de calques Leaflet pour les Lieux de Justice & Répression (permet d'afficher/masquer par catégorie)
const calquesJustice = {
carceraux: null,               // Prisons (Montluc, Saint-Paul, Saint-Joseph, Fort de Côte-Lorette)
juridiques: null,              // Tribunaux (Palais des 24 Colonnes, Tribunal Militaire, Cour Martiale)
police: null                   // Centres de police et de torture (QG Gestapo Berthelot, Terminus, Milice)
};
window.calquesJustice = calquesJustice;

// ==========================================================================
// 3. GÉNÉRATEURS D'ICÔNES LEAFLET PERSONNALISÉES
// ==========================================================================

/**
* Crée une icône HTML personnalisée (L.divIcon) pour les étapes des parcours résistants.
* Utilise du code HTML et du CSS plutôt qu'une simple image statique pour afficher :
* - Le numéro de l'étape au centre (1, 2, 3...)
* - La couleur unique du résistant
* - Une onde radar pulsante (marker-pulse)
* 
* @param {string} couleur - Code couleur hexadécimal (ex: '#e63946')
* @param {number} numero - Numéro de l'étape à afficher (1, 2, 3...)
* @param {boolean} estActif - Si vrai, applique la classe 'marker-actif' pour agrandir le marqueur
* @returns {L.DivIcon} - Objet icône Leaflet prêt à être associé à un marqueur
*/
function creerIconeMarqueur(couleur, numero, estActif = false) {
return L.divIcon({
className: 'custom-marker-wrapper', // Classe conteneur sans bordure
html: `
<div class="custom-marker ${estActif ? 'marker-actif' : ''}" style="--marker-color: ${couleur};">
<span class="marker-number">${numero}</span>
<span class="marker-pulse"></span>
</div>
`,
iconSize: [34, 34],       // Taille en pixels [largeur, hauteur]
iconAnchor: [17, 17],     // Point d'ancrage physique au centre exact du marqueur
popupAnchor: [0, -20]     // Décalage pour ouvrir la bulle popup au-dessus du marqueur
});
}

/**
* Crée une icône pour les lieux de justice avec son emoji distinctif (⛓️, ⚖️, 🚨).
* 
* @param {string} iconEmoji - Emoji représentatif (ex: '⚖️' ou '⛓️')
* @param {string} couleur - Couleur thématique de la catégorie
* @returns {L.DivIcon}
*/
function creerIconeJustice(iconEmoji, couleur) {
return L.divIcon({
className: 'custom-marker-wrapper',
html: `
<div class="justice-marker" style="--justice-color: ${couleur};">
<span class="justice-emoji">${iconEmoji}</span>
</div>
`,
iconSize: [32, 32],
iconAnchor: [16, 16],
popupAnchor: [0, -18]
});
}

// ==========================================================================
// 4. INITIALISATION DE LA CARTE LEAFLET & FONDS ESRI (initMap)
// ==========================================================================

/**
* Initialise le moteur cartographique Leaflet au premier affichage.
* - Ne s'exécute qu'une seule fois grâce au test "if (map) return;".
* - Configure le centre sur Lyon [45.7600, 4.8357] et le niveau de zoom (13).
* - Prépare les tuiles Esri Canvas World Light Gray et Dark Gray.
*/
function initMap() {
if (map) return; // Si la carte existe déjà, on ne la réinitialise pas

// Création de l'instance Leaflet attachée à l'élément HTML <div id="map">
map = L.map('map', {
zoomControl: false // On désactive le zoom par défaut en haut à gauche pour éviter qu'il ne chevauche notre barre d'outils
}).setView([45.7600, 4.8357], 13); // [Latitude, Longitude] de Lyon, Zoom 13
window.map = map;

// Repositionnement des boutons de zoom [+] et [-] en haut à droite
L.control.zoom({ position: 'topright' }).addTo(map);

// Fond de carte clair officiel Esri World Light Gray (Mode par défaut)
tileEsriLight = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
maxZoom: 16
});

// Fond de carte sombre officiel Esri World Dark Gray (Mode nuit)
tileEsriDark = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
maxZoom: 16
});

// Écouteur de clic sur la carte : referme les panneaux d'options et le tiroir mobile
map.on('click', () => {
fermerTousModals();
fermerMenuMobile();
});

// Activation du fond de carte initial et synchronisation de l'interrupteur
if (modeFondCarte === 'dark') {
tileEsriDark.addTo(map);
} else {
tileEsriLight.addTo(map);
}
changerFondCarte(modeFondCarte);

// Initialisation des calques des Lieux de Justice (Prisons, Tribunaux, Gestapo)
initCalquesJustice();
}

/**
* Bascule entre le mode sombre et le mode clair à l'aide de l'interrupteur à bascule (Switch).
* 
* @param {boolean} estSombre - true si l'interrupteur est basculé sur Sombre, false sinon
*/
function basculerModeSombreClair(estSombre) {
const nouveauMode = estSombre ? 'dark' : 'light';
changerFondCarte(nouveauMode);
}

/**
* Active le fond cartographique Esri clair ou sombre sur la carte Leaflet.
* Synchronise également la position du switch, les icônes (soleil/lune) et l'étiquette texte.
* 
* @param {'light'|'dark'} mode - 'light' pour le mode clair (Esri Gray Light), 'dark' pour le mode sombre (Esri Gray Dark)
*/
function changerFondCarte(mode) {
if (!map) return;

if (mode === 'light') {
if (map.hasLayer(tileEsriDark)) map.removeLayer(tileEsriDark);
if (!map.hasLayer(tileEsriLight)) tileEsriLight.addTo(map);
modeFondCarte = 'light';
} else {
if (map.hasLayer(tileEsriLight)) map.removeLayer(tileEsriLight);
if (!map.hasLayer(tileEsriDark)) tileEsriDark.addTo(map);
modeFondCarte = 'dark';
}

// Synchronisation de l'interrupteur switch (#theme-map-switch)
const switchInput = document.getElementById('theme-map-switch');
if (switchInput) {
switchInput.checked = (mode === 'dark');
}

// Mise à jour visuelle des boutons verticaux (Soleil et Lune)
const btnSun = document.getElementById('theme-btn-sun');
const btnMoon = document.getElementById('theme-btn-moon');
if (btnSun) btnSun.classList.toggle('active', mode === 'light');
if (btnMoon) btnMoon.classList.toggle('active', mode === 'dark');

// Synchronisation des anciennes références pour compatibilité
const labelTexte = document.getElementById('theme-switch-label');
const iconSun = document.getElementById('theme-icon-sun');
const iconMoon = document.getElementById('theme-icon-moon');

if (labelTexte) {
labelTexte.textContent = (mode === 'dark') ? 'Sombre' : 'Clair';
}
if (iconSun) iconSun.classList.toggle('active', mode === 'light');
if (iconMoon) iconMoon.classList.toggle('active', mode === 'dark');

// Synchronisation du thème sur le body pour adapter dynamiquement les styles
document.body.setAttribute('data-theme', mode);
}

// ==========================================================================
// 5. GESTION DES CALQUES DE JUSTICE & RÉPRESSION
// ==========================================================================

/**
* Construit les groupes de calques Leaflet (L.layerGroup) pour chaque catégorie :
* - Carcéraux (Prisons)
* - Juridiques (Tribunaux)
* - Police (QG Gestapo, Milice)
* Un LayerGroup permet d'afficher ou masquer tous les marqueurs d'une catégorie
* en une seule opération sans recharger la page.
*/
function initCalquesJustice() {
for (const catKey in dataLieuxJustice) {
const cat = dataLieuxJustice[catKey];
const group = L.layerGroup(); // Conteneur Leaflet pour cette catégorie

cat.lieux.forEach((lieu, idx) => {
// Création de l'icône personnalisée avec l'emoji de la catégorie
const icon = creerIconeJustice(cat.icon, cat.color);
const marker = L.marker(lieu.coords, { icon: icon });

// Contenu HTML de la bulle d'information popup
const popupContent = `
<div class="popup-bubble">
<div class="popup-badge" style="background: ${cat.color}">
${cat.icon} ${cat.nomCategorie}
</div>
<h3 class="popup-title">${lieu.nom}</h3>
<div class="popup-place">📍 ${lieu.adresse}</div>
<p class="popup-text">${lieu.role}</p>
</div>
`;

// Association du popup au marqueur
marker.bindPopup(popupContent, {
className: 'custom-leaflet-popup',
maxWidth: 320
});

// Au clic sur le marqueur sur la carte :
// Si le volet déroulant est fermé, la première chose à faire est de l'ouvrir,
// puis de mettre en avant le lieu dans la liste déroulante !
marker.on('click', () => {
    const etaitFerme = estVoletFerme();
    if (etaitFerme) {
        assurerVoletOuvert();
    }
    mettreEnValeurLieuJusticeDansListe(catKey, idx);

    // Défilement centré fluide (avec léger délai si le volet était en cours d'ouverture)
    const delai = etaitFerme ? 300 : 60;
    setTimeout(() => {
        const card = document.querySelector(`.lieu-justice-card[data-cat="${catKey}"][data-index="${idx}"]`);
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, delai);
});

lieu.marker = marker; // On mémorise la référence du marqueur pour pouvoir l'ouvrir depuis la liste
group.addLayer(marker);
});

calquesJustice[catKey] = group;
}
}

/**
* Affiche ou masque un calque de justice spécifique sur la carte Leaflet.
* 
* @param {'carceraux'|'juridiques'|'police'} categorie
* @param {boolean} activer - Vrai pour afficher, Faux pour masquer
*/
function basculerCalqueJustice(categorie, activer) {
if (!map || !calquesJustice[categorie]) return;

if (activer) {
if (!map.hasLayer(calquesJustice[categorie])) {
calquesJustice[categorie].addTo(map);
}
} else {
if (map.hasLayer(calquesJustice[categorie])) {
map.removeLayer(calquesJustice[categorie]);
}
}

mettreAJourBadgeJustice();
}

/**
* Action rapide : Activer ou désactiver simultanément tous les lieux de justice.
* 
* @param {boolean} activer
*/
function toutBasculerJustice(activer) {
['carceraux', 'juridiques', 'police'].forEach(cat => {
const checkbox = document.getElementById(`toggle-${cat}`);
if (checkbox) checkbox.checked = activer;
basculerCalqueJustice(cat, activer);
});
}

/**
* Met à jour le compteur / badge sur le bouton des Lieux de Justice
*/
function mettreAJourBadgeJustice() {
let count = 0;
['carceraux', 'juridiques', 'police'].forEach(cat => {
if (map && map.hasLayer(calquesJustice[cat])) count++;
});

const badge = document.getElementById('justice-active-count');
if (badge) {
if (count > 0) {
badge.textContent = `${count} actif${count > 1 ? 's' : ''}`;
badge.style.display = 'inline-block';
} else {
badge.style.display = 'none';
}
}
}

// ==========================================================================
// 6. GESTION DES FENÊTRES FLOTTANTES & GALERIE D'IMAGES
// ==========================================================================

/**
* Base de données des images consultables dans la fenêtre flottante.
* Chaque entrée contient un titre, le chemin de l'image locale et une légende explicative.
*/
const galerieImagesFlottantes = {
'aerienne': {
titre: "Photographie aérienne de Lyon",
src: "images/fond_lyon.jpg",
caption: "Vue aérienne haute résolution de Lyon, de la Presqu'île et de tous ses alentours"
},
'panorama': {
titre: "Panorama de Fourvière & la Saône",
src: "images/fond_lyon_panorama_saone.jpg",
caption: "Vue panoramique emblématique de la colline de Fourvière et des quais de Saône"
},
'justice': {
titre: "Palais de Justice historique de Lyon",
src: "images/palais_justice.jpg",
caption: "Les célèbres « 24 colonnes », haut lieu de justice et de répression durant l'Occupation"
},
'personnage': {
titre: "Portrait du résistant actif",
src: "images/jean_moulin.jpg",
caption: "Photographie d'archive du personnage historique sélectionné"
}
};

/**
* Ouvre ou ferme la fenêtre flottante d'image interactive (#modal-image-flottante).
* Pour les 3 figures de la Résistance (Jean Moulin, Chaban-Delmas, Lucie Aubrac) :
* - Ouvre une boîte modale parfaitement centrée au milieu de l'écran.
* - Affiche directement le portrait et la photographie d'archive du personnage actif.
*/
function toggleModalImageFlottante() {
    const modalImage = document.getElementById("modal-image-flottante");
    const modalBackdrop = document.getElementById("modal-backdrop");
    fermerMenuMobile();
    if (modalImage) {
        const estOuvert = modalImage.classList.toggle("open");
        if (modalBackdrop) modalBackdrop.classList.toggle("active", estOuvert);
        if (estOuvert) {
            const p = (personnageActifId && dataPersonnes[personnageActifId]) ? dataPersonnes[personnageActifId] : dataPersonnes["jean_moulin"];
            const titreEl = document.getElementById("floating-panel-title");
            const imgEl = document.getElementById("floating-image-display");
            const captionEl = document.getElementById("floating-image-caption-text");
            if (titreEl) titreEl.textContent = "Photographie d'archive — " + p.nom;
            if (imgEl) {
                imgEl.src = p.img;
                imgEl.alt = "Photographie d'archive de " + p.nom;
            }
            if (captionEl) captionEl.textContent = p.nom + " (" + p.role + ")";
        } else {
            modalImage.classList.remove("fullscreen");
            const btnZoom = document.querySelector(".btn-zoom-image");
            if (btnZoom) btnZoom.textContent = "🔍 Agrandir";
        }
    }
}

/**
* Bascule la fenêtre flottante d'image entre la taille standard et le mode grand format plein écran.
*/
function togglePleinEcranImage() {
    const modalImage = document.getElementById('modal-image-flottante');
    if (modalImage) {
        const estPleinEcran = modalImage.classList.toggle('fullscreen');
        const btnZoom = document.querySelector('.btn-zoom-image');
        if (btnZoom) {
            btnZoom.textContent = estPleinEcran ? '🗕 Réduire' : '🔍 Agrandir';
        }
    }
}

/**
* Ferme toutes les fenêtres flottantes et masque le voile semi-transparent.
*/
function fermerTousModals() {
    const modalImage = document.getElementById('modal-image-flottante');
    if (modalImage) {
        modalImage.classList.remove('open');
        modalImage.classList.remove('fullscreen');
        const btnZoom = document.querySelector('.btn-zoom-image');
        if (btnZoom) btnZoom.textContent = '🔍 Agrandir';
    }
    fermerModalMentionsLegales();
    document.getElementById('modal-backdrop')?.classList.remove('active');
    fermerDropdownFondsJustice();
}

/**
* Ouvre la boîte modale des Mentions Légales, de l'hébergeur et des sources.
*/
function ouvrirModalMentionsLegales() {
    const modal = document.getElementById('modal-mentions-legales');
    const backdrop = document.getElementById('legal-backdrop');
    if (modal) modal.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
}

/**
* Ferme la boîte modale des Mentions Légales.
*/
function fermerModalMentionsLegales() {
    const modal = document.getElementById('modal-mentions-legales');
    const backdrop = document.getElementById('legal-backdrop');
    if (modal) modal.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
}

/**
* Ouvre ou ferme le menu déroulant de sélection des fonds de plan (Mode Justice).
*/
function toggleDropdownFondsJustice() {
    const dropdown = document.getElementById('dropdown-fonds-justice');
    const wrapper = document.getElementById('justice-fond-wrapper');
    const btn = document.getElementById('btn-fond-justice');
    if (!dropdown) return;
    const estOuvert = dropdown.classList.toggle('open');
    if (wrapper) wrapper.classList.toggle('open', estOuvert);
    if (btn) btn.setAttribute('aria-expanded', estOuvert ? 'true' : 'false');
}

/**
* Ferme le menu déroulant de sélection des fonds de plan.
*/
function fermerDropdownFondsJustice() {
    const dropdown = document.getElementById('dropdown-fonds-justice');
    const wrapper = document.getElementById('justice-fond-wrapper');
    const btn = document.getElementById('btn-fond-justice');
    if (dropdown) dropdown.classList.remove('open');
    if (wrapper) wrapper.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
}

/**
* Modifie le fond de plan en mode Lieux de Justice & Répression :
* - 'esri' : Carte interactive vectorielle Esri (le commutateur clair/sombre réapparaît).
* - 'aerienne', 'panorama', 'justice' : L'image historique choisie devient le fond de plan de la carte
*   et le commutateur clair/sombre disparaît automatiquement.
* 
* @param {'esri'|'aerienne'|'panorama'|'justice'} fondKey
*/
function choisirFondPlanJustice(fondKey) {
    fermerDropdownFondsJustice();

    // Mise à jour de la surbrillance de l'option active dans le menu
    document.querySelectorAll('#dropdown-fonds-justice .fond-option').forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-fond') === fondKey);
    });

    const themeSwitchWrapper = document.getElementById('theme-switch-wrapper');
    const bgMapImg = document.getElementById('map-image-background');
    const btnText = document.getElementById('btn-fond-justice-text');
    const interactiveContent = document.getElementById('justice-interactive-content');
    const imageNotice = document.getElementById('justice-image-notice');

    // Renommage en "Carte interactive" selon la demande
    const labels = {
        'esri': 'Carte interactive',
        'aerienne': 'Vue aérienne',
        'panorama': 'Panorama Saône',
        'justice': 'Palais de Justice'
    };
    if (btnText && labels[fondKey]) {
        btnText.textContent = labels[fondKey];
    }

    if (fondKey === 'esri') {
        // ==================================================================
        // 1. MODE CARTE INTERACTIVE :
        // - Rétablissement du fond de carte Esri
        // - Réapparition des points (marqueurs) sur la carte
        // - Réapparition des lieux et filtres dans le menu déroulant
        // - Réapparition du switch clair/sombre
        // ==================================================================
        if (bgMapImg) bgMapImg.style.display = 'none';
        if (map) {
            if (modeFondCarte === 'dark') {
                if (map.hasLayer(tileEsriLight)) map.removeLayer(tileEsriLight);
                if (!map.hasLayer(tileEsriDark)) tileEsriDark.addTo(map);
            } else {
                if (map.hasLayer(tileEsriDark)) map.removeLayer(tileEsriDark);
                if (!map.hasLayer(tileEsriLight)) tileEsriLight.addTo(map);
            }
        }

        // Réapparition de la liste des lieux et filtres dans le volet
        if (interactiveContent) interactiveContent.style.display = 'block';
        if (imageNotice) imageNotice.style.display = 'none';

        // Réapparition des points (marqueurs) sur la carte Leaflet
        filtrerJustice('tous');

        // Réapparition de l'interrupteur clair / sombre
        if (themeSwitchWrapper) themeSwitchWrapper.style.display = 'flex';
        document.body.setAttribute('data-theme', modeFondCarte);
    } else {
        // ==================================================================
        // 2. MODE IMAGES D'ARCHIVES PHOTOGRAPHIQUES :
        // - Masquage des tuiles Esri et application de l'image de fond
        // - Disparition des points (marqueurs) sur la carte
        // - Disparition des lieux dans le menu déroulant
        // - Affichage de l'encart d'information
        // - Disparition de l'interrupteur clair/sombre
        // ==================================================================
        if (map) {
            if (map.hasLayer(tileEsriLight)) map.removeLayer(tileEsriLight);
            if (map.hasLayer(tileEsriDark)) map.removeLayer(tileEsriDark);

            // Les points sur la carte disparaissent selon la demande
            ['carceraux', 'juridiques', 'police'].forEach(cat => {
                if (calquesJustice[cat] && map.hasLayer(calquesJustice[cat])) {
                    map.removeLayer(calquesJustice[cat]);
                }
            });
        }

        // Les lieux dans le menu déroulant disparaissent selon la demande
        if (interactiveContent) interactiveContent.style.display = 'none';
        if (imageNotice) imageNotice.style.display = 'flex';

        const imagesFonds = {
            'aerienne': 'images/fond_lyon.jpg',
            'panorama': 'images/fond_lyon_panorama_saone.jpg',
            'justice': 'images/palais_justice.jpg'
        };

        if (bgMapImg && imagesFonds[fondKey]) {
            bgMapImg.style.backgroundImage = `url('${imagesFonds[fondKey]}')`;
            bgMapImg.style.display = 'block';
        }

        // Le switch clair / sombre disparaît comme demandé
        if (themeSwitchWrapper) themeSwitchWrapper.style.display = 'none';
        // Fond photographique d'archive sombre : texte blanc
        document.body.setAttribute('data-theme', 'dark');
    }
}

/**
* Masque le volet latéral sur ordinateur (PC) lorsqu'on clique sur la croix ✕.
*/
function fermerSidebarDesktop() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    if (sidebar) sidebar.classList.add('desktop-collapsed');
    if (menuToggle) {
        menuToggle.classList.add('pc-visible');
        menuToggle.classList.remove('hidden');
    }
    setTimeout(() => {
        if (map) map.invalidateSize();
    }, 360);
}

/**
* Réaffiche le volet latéral sur PC après fermeture.
*/
function ouvrirSidebarDesktop() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    if (sidebar) sidebar.classList.remove('desktop-collapsed');
    if (menuToggle) {
        menuToggle.classList.remove('pc-visible');
    }
    setTimeout(() => {
        if (map) map.invalidateSize();
    }, 360);
}

/**
* Vérifie si le volet d'information (menu déroulant / tiroir) est actuellement fermé sur PC ou Mobile.
* 
* @returns {boolean} Vrai si le volet est masqué ou replié
*/
function estVoletFerme() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return false;
    if (window.innerWidth >= 768) {
        return sidebar.classList.contains('desktop-collapsed');
    } else {
        return !sidebar.classList.contains('open');
    }
}

/**
* Ouvre automatiquement le volet d'information s'il était fermé (PC ou mobile).
* Utilisé lorsqu'un utilisateur clique sur un lieu/étape depuis la carte.
*/
function assurerVoletOuvert() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    if (window.innerWidth >= 768) {
        if (sidebar.classList.contains('desktop-collapsed')) {
            ouvrirSidebarDesktop();
        }
    } else {
        if (!sidebar.classList.contains('open')) {
            ouvrirMenuMobile();
        }
    }
}

// Fermeture du menu déroulant de fond au clic à l'extérieur
document.addEventListener('click', (e) => {
    const wrap = document.getElementById('justice-fond-wrapper');
    if (wrap && !wrap.contains(e.target)) {
        fermerDropdownFondsJustice();
    }
});

// Écouteur global sur la touche Échap (Escape) pour fermer rapidement toute boîte ouverte
window.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
fermerTousModals();
}
});

// ==========================================================================
// 7. NAVIGATION & CHANGEMENT DE PAGE (ACCUEIL ⟷ CARTE)
// ==========================================================================

/**
* Ouvre l'application cartographique depuis la page d'accueil pour un résistant donné.
* Étapes détaillées :
* 1. Masque l'écran d'accueil (#landing display = 'none')
* 2. Affiche le conteneur applicatif (#app display = 'flex')
* 3. Initialise la carte Leaflet avec initMap()
* 4. Déclenche map.invalidateSize() (indispensable avec Leaflet après avoir affiché un div masqué)
* 5. Appelle selectionnerPersonne(id) pour charger les étapes et tracer la route.
* 
* @param {'jean_moulin'|'chaban_delmas'|'lucie_aubrac'} id
*/
function ouvrirCarte(id) {
    document.getElementById('landing').style.display = 'none';
    const appEl = document.getElementById('app');
    appEl.style.display = 'flex';

    // Configuration des commandes du header dynamique en mode Résistant
    const btnPortrait = document.getElementById('btn-image-personnage');
    const wrapFondJustice = document.getElementById('justice-fond-wrapper');
    const titleBadge = document.getElementById('header-context-title');
    const themeSwitchWrap = document.getElementById('theme-switch-wrapper');
    const bgImg = document.getElementById('map-image-background');

    if (btnPortrait) btnPortrait.style.display = 'flex';
    if (wrapFondJustice) wrapFondJustice.style.display = 'none';
    if (themeSwitchWrap) themeSwitchWrap.style.display = 'flex';
    if (bgImg) bgImg.style.display = 'none';
    if (id && dataPersonnes[id] && titleBadge) {
        titleBadge.textContent = dataPersonnes[id].nom;
    }

    initMap(); // S'assure que la carte Leaflet est créée

    // Par défaut, le volet d'informations est masqué d'office pour dégager la carte
    if (window.innerWidth >= 768) {
        fermerSidebarDesktop();
    } else {
        fermerMenuMobile();
    }

    document.body.setAttribute('data-theme', modeFondCarte);

    // Si des tuiles avaient été masquées par une image de fond en mode Justice, on les réactive :
    if (map) {
        if (modeFondCarte === 'dark') {
            if (map.hasLayer(tileEsriLight)) map.removeLayer(tileEsriLight);
            if (!map.hasLayer(tileEsriDark)) tileEsriDark.addTo(map);
        } else {
            if (map.hasLayer(tileEsriDark)) map.removeLayer(tileEsriDark);
            if (!map.hasLayer(tileEsriLight)) tileEsriLight.addTo(map);
        }
    }

    // Petit délai de 150ms pour laisser le navigateur terminer le recalcul de mise en page CSS
    setTimeout(() => {
        map.invalidateSize(); // Force Leaflet à recalculer la taille physique de l'écran

        // Masquer les calques de justice pour afficher exclusivement le résistant choisi
        ['carceraux', 'juridiques', 'police'].forEach(cat => {
            if (map && calquesJustice[cat] && map.hasLayer(calquesJustice[cat])) {
                map.removeLayer(calquesJustice[cat]);
            }
            const chk = document.getElementById(`toggle-${cat}`);
            if (chk) chk.checked = false;
        });
        mettreAJourBadgeJustice();

        if (id && dataPersonnes[id]) {
            if (titleBadge) titleBadge.textContent = dataPersonnes[id].nom;
            selectionnerPersonne(id);
        }
    }, 150);
}

/**
* Ouvre la carte directement en mode "Lieux de Justice & Répression" (4e carte de l'accueil).
*/
function ouvrirCarteJustice() {
    document.getElementById('landing').style.display = 'none';
    const appEl = document.getElementById('app');
    appEl.style.display = 'flex';

    // Configuration des commandes du header dynamique en mode Justice
    const btnPortrait = document.getElementById('btn-image-personnage');
    const wrapFondJustice = document.getElementById('justice-fond-wrapper');
    const titleBadge = document.getElementById('header-context-title');

    if (btnPortrait) btnPortrait.style.display = 'none';
    if (wrapFondJustice) wrapFondJustice.style.display = 'flex';
    if (titleBadge) titleBadge.textContent = "Lieux de Justice & Répression";

    initMap();

    // Par défaut, le menu est masqué d'office au lancement selon la demande
    if (window.innerWidth >= 768) {
        fermerSidebarDesktop();
    } else {
        fermerMenuMobile();
    }

    document.body.setAttribute('data-theme', modeFondCarte);

    setTimeout(() => {
        map.invalidateSize();

        // Nettoyer les éventuels tracés de résistant précédents
        if (coucheActuelle) {
            map.removeLayer(coucheActuelle);
            coucheActuelle = null;
            marqueursActuels = [];
        }
        if (coucheLigneItineraire) {
            map.removeLayer(coucheLigneItineraire);
            coucheLigneItineraire = null;
        }
        personnageActifId = null;
        etapeActiveIndex = null;

        // Basculer l'affichage du volet latéral sur la vue Justice
        const detailView = document.getElementById('sidebar-detail-view');
        const justiceView = document.getElementById('sidebar-justice-view');
        if (detailView) detailView.style.display = 'none';
        if (justiceView) justiceView.style.display = 'flex';

        // Mettre à jour le texte du bouton d'ouverture mobile (texte seul, sans icône)
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            menuToggle.textContent = 'Menu';
        }

        // Rétablir le fond vectoriel Esri standard par défaut avec switch visible
        choisirFondPlanJustice('esri');

        // Activer par défaut tous les lieux de justice
        filtrerJustice('tous');
    }, 150);
}

// ==========================================================================
// 8. MODULE DES LIEUX DE JUSTICE & RÉPRESSION
// ==========================================================================

/**
* Filtre les lieux de justice affichés sur la carte et dans la liste latérale :
* - 'tous' : Affiche simultanément les 10 lieux
* - 'carceraux' : Affiche les 4 prisons
* - 'juridiques' : Affiche les 3 tribunaux
* - 'police' : Affiche les 3 QG de la Gestapo et de la Milice
* 
* @param {'tous'|'carceraux'|'juridiques'|'police'} categorie
*/
function filtrerJustice(categorie) {
// Mettre à jour l'apparence des boutons pilules de filtre
document.querySelectorAll('.filter-pill').forEach(btn => {
btn.classList.toggle('active', btn.getAttribute('data-filter') === categorie);
});

// L.latLngBounds calcule la boîte géographique englobant tous les marqueurs à afficher
const bounds = L.latLngBounds([]);

if (categorie === 'tous') {
['carceraux', 'juridiques', 'police'].forEach(cat => {
basculerCalqueJustice(cat, true);
const chk = document.getElementById(`toggle-${cat}`);
if (chk) chk.checked = true;
});
} else {
['carceraux', 'juridiques', 'police'].forEach(cat => {
const activer = (cat === categorie);
basculerCalqueJustice(cat, activer);
const chk = document.getElementById(`toggle-${cat}`);
if (chk) chk.checked = activer;
});
}

// Régénérer les cartes de bâtiments dans le volet latéral
afficherLieuxJusticeDansListe(categorie);

// Calculer les limites pour recadrer la carte
const activeCats = (categorie === 'tous') ? ['carceraux', 'juridiques', 'police'] : [categorie];
activeCats.forEach(cat => {
if (dataLieuxJustice[cat]) {
dataLieuxJustice[cat].lieux.forEach(l => {
bounds.extend(l.coords);
});
}
});

// Ajuste automatiquement le zoom et le centrage de la carte
if (bounds.isValid() && map) {
map.fitBounds(bounds, {
padding: [50, 50],
maxZoom: 14
});
}
}

/**
* Génère dynamiquement le code HTML des fiches de lieux de justice dans la barre latérale.
* 
* @param {string} filtre - Catégorie sélectionnée
*/
function afficherLieuxJusticeDansListe(filtre) {
const conteneur = document.getElementById('liste-lieux-justice');
const titleEl = document.getElementById('justice-list-title');
if (!conteneur) return;
conteneur.innerHTML = ''; // Réinitialisation de la liste

const categories = (filtre === 'tous') ? ['carceraux', 'juridiques', 'police'] : [filtre];

const titresFiltres = {
'tous': 'Tous les lieux historiques (10)',
'carceraux': 'Prisons & Lieux carcéraux (4)',
'juridiques': 'Tribunaux & Lieux juridiques (3)',
'police': 'Lieux de Police & Répression (3)'
};

if (titleEl && titresFiltres[filtre]) {
titleEl.textContent = titresFiltres[filtre];
}

categories.forEach(catKey => {
const cat = dataLieuxJustice[catKey];
if (!cat) return;

cat.lieux.forEach((lieu, idx) => {
// Création de la carte cliquable dans la liste
const card = document.createElement('div');
card.className = 'lieu-justice-card';
card.setAttribute('data-cat', catKey);
card.setAttribute('data-index', idx);
card.innerHTML = `
<div class="lieu-badge" style="background-color: ${cat.color};">
${cat.icon}
</div>
<div class="lieu-info">
<div class="lieu-header">
<span class="lieu-titre">${lieu.nom}</span>
<span class="lieu-cat-tag" style="color: ${cat.color};">${cat.nomCategorie}</span>
</div>
<span class="lieu-adresse">📍 ${lieu.adresse}</span>
<p class="lieu-desc">${lieu.role}</p>
</div>
`;

card.addEventListener('click', () => {
focusSurLieuJustice(catKey, idx);
});

conteneur.appendChild(card);
});
});
}

/**
* Centre la carte sur un lieu de justice et déploie sa bulle popup.
* - Utilise map.flyTo(...) pour une animation fluide de déplacement.
* - Ouvre automatiquement la bulle d'information du marqueur.
* - Sur mobile, referme le tiroir pour que l'utilisateur admire le bâtiment.
* 
* @param {string} catKey - Catégorie ('carceraux', 'juridiques', 'police')
* @param {number} idx - Index du lieu dans le tableau
*/
function focusSurLieuJustice(catKey, idx) {
const cat = dataLieuxJustice[catKey];
if (!cat || !cat.lieux[idx]) return;
const lieu = cat.lieux[idx];

mettreEnValeurLieuJusticeDansListe(catKey, idx);

// Si le calque de cette catégorie était masqué, on l'active automatiquement
if (!map.hasLayer(calquesJustice[catKey])) {
basculerCalqueJustice(catKey, true);
}

// map.flyTo : Déplacement aérien animé vers les coordonnées [latitude, longitude] avec zoom de niveau 16
map.flyTo(lieu.coords, 16, {
duration: 0.8
});

// On attend la fin du vol de caméra (850ms) pour ouvrir la bulle popup
setTimeout(() => {
if (lieu.marker) {
lieu.marker.openPopup();
}
}, 850);

// Sur smartphone, on rabat le tiroir pour laisser la carte dégagée
if (window.innerWidth <= 768) {
fermerMenuMobile();
}
}

/**
* Met en surbrillance la fiche correspondante dans le volet latéral
* et fait défiler la liste pour qu'elle apparaisse sous les yeux de l'utilisateur.
*/
function mettreEnValeurLieuJusticeDansListe(catKey, idx) {
    let activeCard = document.querySelector(`.lieu-justice-card[data-cat="${catKey}"][data-index="${idx}"]`);
    if (!activeCard) {
        afficherLieuxJusticeDansListe('tous');
        document.querySelectorAll('.filter-pill').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === 'tous');
        });
        activeCard = document.querySelector(`.lieu-justice-card[data-cat="${catKey}"][data-index="${idx}"]`);
    }

    document.querySelectorAll('.lieu-justice-card').forEach(card => {
        const match = (card.getAttribute('data-cat') === catKey && card.getAttribute('data-index') == idx);
        card.classList.toggle('active', match);
    });

    // scrollIntoView : défilement fluide centré dans la liste latérale
    if (activeCard) {
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
* Bouton "Retour à l'accueil" :
* 1. Masque l'application cartographique (#app display = 'none')
* 2. Réaffiche la page d'accueil d'introduction (#landing display = 'flex')
* 3. Nettoie la mémoire : supprime les tracés et marqueurs pour économiser les ressources.
*/
function retourAccueil() {
    document.getElementById('app').style.display = 'none';
    document.getElementById('landing').style.display = 'flex';
    fermerMenuMobile();
    fermerTousModals();
    fermerDropdownFondsJustice();

    const bgImg = document.getElementById('map-image-background');
    if (bgImg) bgImg.style.display = 'none';

    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('desktop-collapsed');

    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.classList.remove('pc-visible');
        menuToggle.classList.remove('hidden');
        menuToggle.textContent = 'Menu';
    }

const detailView = document.getElementById('sidebar-detail-view');
const justiceView = document.getElementById('sidebar-justice-view');
if (detailView) detailView.style.display = 'none';
if (justiceView) justiceView.style.display = 'none';

// Suppression propre des calques de la carte Leaflet
if (coucheActuelle && map) {
map.removeLayer(coucheActuelle);
coucheActuelle = null;
}
if (coucheLigneItineraire && map) {
map.removeLayer(coucheLigneItineraire);
coucheLigneItineraire = null;
}
personnageActifId = null;
etapeActiveIndex = null;
trajetSelectionne = 'all';
routesAlternativesRecues = [];
varianteActiveIndex = 0;
}

// ==========================================================================
// 9. GESTION DU TIROIR MOBILE (Bottom Sheet)
// ==========================================================================

/**
* Ouvre ou ferme le tiroir inférieur sur mobile au clic sur le bouton flottant.
*/
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    if (window.innerWidth >= 768) {
        if (sidebar.classList.contains('desktop-collapsed')) {
            ouvrirSidebarDesktop();
        } else {
            fermerSidebarDesktop();
        }
    } else {
        if (sidebar.classList.contains('open')) {
            fermerMenuMobile();
        } else {
            ouvrirMenuMobile();
        }
    }
}

/**
* Ouvre le tiroir sur smartphone :
* - Ajoute la classe 'open' au #sidebar (qui applique transform: translateY(0))
* - Affiche le voile sombre semi-transparent #sidebar-backdrop
* - Masque le bouton flottant #menu-toggle pour ne pas gêner
*/
function ouvrirMenuMobile() {
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('sidebar-backdrop');
const menuToggle = document.getElementById('menu-toggle');

if (sidebar) {
sidebar.classList.add('open');
sidebar.style.transform = '';
}
if (backdrop) backdrop.classList.add('active');
if (menuToggle) menuToggle.classList.add('hidden');

fermerTousModals();
}

/**
* Ferme le tiroir sur smartphone et rétablit l'état de repos.
*/
function fermerMenuMobile() {
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('sidebar-backdrop');
const menuToggle = document.getElementById('menu-toggle');

if (sidebar) {
sidebar.style.transform = '';
sidebar.style.transition = '';
sidebar.classList.remove('open');
}
if (backdrop) {
backdrop.classList.remove('active');
backdrop.style.opacity = '';
}
if (menuToggle) menuToggle.classList.remove('hidden');
}

// ==========================================================================
// 10. AFFICHAGE DES PARCOURS RÉSISTANTS
// ==========================================================================

/**
* Déploie tout le parcours d'une figure de la Résistance :
* 1. Mémorise l'identifiant du résistant
* 2. Nettoie les anciens tracés
* 3. Rétablit l'interrupteur d'itinéraire sur "actif"
* 4. Remplit le sélecteur déroulant des étapes
* 5. Affiche la fiche biographique dans le volet latéral (afficherVueDetail)
* 6. Trace les marqueurs et la ligne sur la carte (afficherParcoursSurCarte)
* 7. Lance le calcul automatique des 3 itinéraires routiers réels (calculerEtAfficherItineraire)
* 
* @param {'jean_moulin'|'chaban_delmas'|'lucie_aubrac'} id
*/
function selectionnerPersonne(id) {
personnageActifId = id;
etapeActiveIndex = null;
const personne = dataPersonnes[id];

// Nettoyer l'éventuel tracé d'itinéraire précédent
if (coucheLigneItineraire && map) {
map.removeLayer(coucheLigneItineraire);
coucheLigneItineraire = null;
}

// Réinitialiser les indicateurs d'itinéraire
const distEl = document.getElementById('itineraire-distance');
const dureeEl = document.getElementById('itineraire-duree');
const btnIti = document.getElementById('btn-calculer-itineraire');
const propList = document.getElementById('itineraire-propositions-list');
const toggleIti = document.getElementById('toggle-itineraire-actif');
const toggleLabel = document.getElementById('itineraire-toggle-label');

if (distEl) distEl.textContent = '-- km';
if (dureeEl) dureeEl.textContent = '-- min';
if (btnIti) btnIti.innerHTML = `🗺️ Calculer les itinéraires (${modeTransportActuel === 'foot' ? 'À pied' : 'À vélo'})`;
if (propList) propList.innerHTML = '';

// Navigation GPS désactivée d'office par défaut et module replié
itineraireEstVisible = false;
if (toggleIti) toggleIti.checked = false;
if (toggleLabel) {
toggleLabel.textContent = 'Tracé inactif';
toggleLabel.classList.remove('active');
}
const itiBox = document.getElementById('itineraire-box');
if (itiBox) itiBox.classList.add('minimized');

// Peupler la sélection des étapes/trajets pour ce personnage
peuplerSelectTrajets(personne);
varianteActiveIndex = 0;

// Mettre à jour le texte du bouton mobile (texte pur, sans icône)
const menuToggle = document.getElementById('menu-toggle');
if (menuToggle) {
menuToggle.textContent = 'Voir les étapes';
}

// Afficher la vue détaillée
afficherVueDetail(personne);

// Tracer le parcours sur la carte (marqueurs et ligne des étapes)
afficherParcoursSurCarte(personne);
}

/**
* Remplit la fiche détaillée et la liste des étapes dans le panneau latéral.
* - Injecte la photo, le rôle, la citation et la biographie.
* - Génère chaque carte d'étape numérotée dans l'élément #liste-etapes.
* 
* @param {Object} personne - Objet résistant issu de dataPersonnes
*/
function afficherVueDetail(personne) {
const justiceView = document.getElementById('sidebar-justice-view');
const detailView = document.getElementById('sidebar-detail-view');

// Masque la vue Justice et affiche la vue du résistant
if (justiceView) justiceView.style.display = 'none';
if (detailView) detailView.style.display = 'flex';

// Remplissage des données d'identité
const photoEl = document.getElementById('detail-photo');
const nomEl = document.getElementById('detail-nom');
const roleEl = document.getElementById('detail-role');
const quoteEl = document.getElementById('detail-quote');
const bioEl = document.getElementById('detail-bio');

if (photoEl) {
photoEl.src = personne.img;
photoEl.alt = personne.nom;
}
if (nomEl) nomEl.textContent = personne.nom;
if (roleEl) roleEl.textContent = personne.role;
if (quoteEl) quoteEl.textContent = personne.quote;
if (bioEl) bioEl.textContent = personne.bio;

// Construction dynamique de la liste des étapes cliquables
const listeEtapesEl = document.getElementById('liste-etapes');
if (!listeEtapesEl) return;
listeEtapesEl.innerHTML = ''; // Nettoyage de l'ancienne liste

personne.etapes.forEach((etape, index) => {
const item = document.createElement('div');
item.className = 'etape-card';
item.setAttribute('data-index', index);
item.innerHTML = `
<div class="etape-number" style="background-color: ${personne.color};">
${index + 1}
</div>
<div class="etape-info">
<div class="etape-header">
<span class="etape-titre">${etape.titre}</span>
<span class="etape-date">${etape.date}</span>
</div>
<span class="etape-lieu">📍 ${etape.lieu}</span>
<p class="etape-desc">${etape.desc}</p>
</div>
`;

// Au clic sur une étape de la liste, on centre la carte sur celle-ci
item.addEventListener('click', () => {
focusSurEtape(index);
});

listeEtapesEl.appendChild(item);
});
}

/**
* Dessine sur la carte Leaflet le tracé du résistant et ses marqueurs numérotés :
* - Double polyligne (halo semi-transparent + ligne tiretée)
* - Marqueurs interactifs avec bulles descriptives
* - Cadrage automatique de la vue (map.fitBounds)
* 
* @param {Object} personne - Objet résistant issu de dataPersonnes
*/
function afficherParcoursSurCarte(personne) {
if (!map) return;

// Supprimer l'ancien calque de résistant s'il existe
if (coucheActuelle) {
map.removeLayer(coucheActuelle);
}
marqueursActuels = [];

const groupeCalque = L.layerGroup();

// 1. Halo lumineux de fond (ligne large semi-transparente)
const ligneFond = L.polyline(personne.traceline, {
color: personne.color,
weight: 8,
opacity: 0.35,
lineCap: 'round'
});
groupeCalque.addLayer(ligneFond);

// 2. Ligne principale nette et stylisée avec tirets
const polyline = L.polyline(personne.traceline, {
color: personne.color,
weight: 4,
opacity: 0.95,
dashArray: '8, 6', // Alternance de traits de 8px et d'espaces de 6px
lineCap: 'round'
});
groupeCalque.addLayer(polyline);

// 3. Placement des marqueurs numérotés pour chaque étape
personne.etapes.forEach((etape, index) => {
const customIcon = creerIconeMarqueur(personne.color, index + 1, false);
const marker = L.marker(etape.coords, { icon: customIcon });

// Bulle popup affichée lors du clic sur le marqueur
const popupContent = `
<div class="popup-bubble">
<div class="popup-badge" style="background: ${personne.color}">Étape ${index + 1} • ${etape.date}</div>
<h3 class="popup-title">${etape.titre}</h3>
<div class="popup-place">📍 ${etape.lieu}</div>
<p class="popup-text">${etape.desc}</p>
</div>
`;

marker.bindPopup(popupContent, {
className: 'custom-leaflet-popup',
maxWidth: 300
});

marker.on('click', () => {
const etaitFerme = estVoletFerme();
if (etaitFerme) {
assurerVoletOuvert();
}
mettreEnValeurEtapeDansListe(index);
const delai = etaitFerme ? 300 : 60;
setTimeout(() => {
const carteActive = document.querySelector(`.etape-card[data-index="${index}"]`);
if (carteActive) {
carteActive.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
}, delai);
});

groupeCalque.addLayer(marker);
marqueursActuels.push({ marker, coords: etape.coords, index });
});

groupeCalque.addTo(map);
coucheActuelle = groupeCalque;

// Cadrage automatique de la caméra sur l'ensemble de la ligne tracée
map.fitBounds(polyline.getBounds(), {
padding: [60, 60],
maxZoom: 15
});
}

/**
* Centre la caméra sur une étape spécifique lorsqu'on clique sur sa carte dans la liste latérale.
* 
* @param {number} index - Index de l'étape (0, 1, 2...)
*/
function focusSurEtape(index) {
if (!marqueursActuels[index] || !personnageActifId) return;

etapeActiveIndex = index;
const { marker, coords } = marqueursActuels[index];
const personne = dataPersonnes[personnageActifId];

// Agrandit le marqueur ciblé pour le faire ressortir visuellement
marqueursActuels.forEach((item, i) => {
item.marker.setIcon(creerIconeMarqueur(personne.color, i + 1, i === index));
});

mettreEnValeurEtapeDansListe(index);

// Animation de caméra vers les coordonnées de l'étape
map.flyTo(coords, 15, {
duration: 0.8
});

// Ouverture automatique du popup
setTimeout(() => {
marker.openPopup();
}, 850);

if (window.innerWidth <= 768) {
fermerMenuMobile();
}
}

/**
* Met en valeur la carte d'étape correspondante dans la liste latérale.
*/
function mettreEnValeurEtapeDansListe(index) {
const cartes = document.querySelectorAll('.etape-card');
cartes.forEach((carte, i) => {
carte.classList.toggle('active', i === index);
});

const carteActive = document.querySelector(`.etape-card[data-index="${index}"]`);
if (carteActive) {
carteActive.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
}

// ==========================================================================
// 11. MOTEUR D'ITINÉRAIRE ROUTIER RÉEL & MULTI-ROUTES
// ==========================================================================

/**
* Change le mode de transport : À pied ('foot') ou À vélo ('bike').
* Met à jour instantanément les durées et kilomètres calculés.
* 
* @param {'foot'|'bike'} mode
*/
function changerModeTransport(mode) {
modeTransportActuel = mode;

// Met à jour l'apparence des boutons pilules (classe 'active')
document.getElementById('mode-foot')?.classList.toggle('active', mode === 'foot');
document.getElementById('mode-bike')?.classList.toggle('active', mode === 'bike');

// Mettre à jour immédiatement les durées sur les itinéraires déjà calculés
if (routesAlternativesRecues && routesAlternativesRecues.length > 0) {
actualiserAffichageToutesRoutes();
} else if (personnageActifId && dataPersonnes[personnageActifId]) {
calculerEtAfficherItineraire();
}
}

/**
* Calcule la durée réaliste de marche ou vélo en fonction de la distance routière :
* - À pied : 4.5 km/h (vitesse piétonne moyenne en milieu urbain avec traversées et pentes des pentes de la Croix-Rousse)
* - À vélo : 15.0 km/h (vitesse cyclable moyenne à Lyon avec pistes cyclables et carrefours)
* 
* @param {number} distanceMetres - Distance totale en mètres
* @param {'foot'|'bike'} mode - Mode de transport
* @returns {Object} - { distKm, dureeTexte, totalMinutes }
*/
function calculerDureeSelonMode(distanceMetres, mode) {
const vitesseKmh = mode === 'bike' ? 15.0 : 4.5;
const distKm = distanceMetres / 1000;
const heures = distKm / vitesseKmh;
const totalMinutes = Math.max(1, Math.round(heures * 60));
const h = Math.floor(totalMinutes / 60);
const m = totalMinutes % 60;
const dureeTexte = h > 0 ? `${h}h ${m < 10 ? '0' : ''}${m} min` : `${m} min`;
return {
distKm: distKm.toFixed(1),
dureeTexte,
totalMinutes
};
}

/**
* Remplit le menu déroulant de choix du trajet :
* - Option "Parcours complet" (toutes les étapes)
* - Options segment par segment (Étape 1 ➔ Étape 2, etc.)
* 
* @param {Object} personne
*/
function peuplerSelectTrajets(personne) {
const select = document.getElementById('select-itineraire-trajet');
if (!select || !personne || !personne.etapes) return;

select.innerHTML = '';

// Option 1 : Parcours complet
const optAll = document.createElement('option');
optAll.value = 'all';
optAll.textContent = `🏁 Parcours complet (Toutes les étapes : 1 à ${personne.etapes.length})`;
select.appendChild(optAll);

// Options tronçon par tronçon (Étape i -> Étape i+1)
for (let i = 0; i < personne.etapes.length - 1; i++) {
const e1 = personne.etapes[i];
const e2 = personne.etapes[i + 1];
const opt = document.createElement('option');
opt.value = `${i}-${i + 1}`;
opt.textContent = `📍 Étape ${i + 1} ➔ ${i + 2} : ${e1.titre} ➔ ${e2.titre}`;
select.appendChild(opt);
}

trajetSelectionne = 'all';
select.value = 'all';
}

/**
* Récupère le sous-ensemble de coordonnées selon le trajet choisi (parcours complet ou tronçon).
* 
* @param {Object} personne
* @returns {Array} - Tableau de coordonnées [[lat, lon], ...]
*/
function obtenirCoordonneesTrajetActif(personne) {
if (!personne || !personne.etapes || personne.etapes.length === 0) return [];

if (trajetSelectionne === 'all') {
return personne.etapes.map(e => e.coords);
}

const parts = trajetSelectionne.split('-');
if (parts.length === 2) {
const i1 = parseInt(parts[0], 10);
const i2 = parseInt(parts[1], 10);
if (!isNaN(i1) && !isNaN(i2) && personne.etapes[i1] && personne.etapes[i2]) {
return [personne.etapes[i1].coords, personne.etapes[i2].coords];
}
}

return personne.etapes.map(e => e.coords);
}

/**
* Prise en compte du changement de trajet dans le sélecteur déroulant.
*/
function changerTrajetSelectionne(valeur) {
trajetSelectionne = valeur;
varianteActiveIndex = 0;
calculerEtAfficherItineraire();
}

/**
* Active ou désactive l'affichage du tracé de l'itinéraire sur la carte Leaflet
* via l'interrupteur switch On/Off.
*/
function basculerVisibiliteItineraire() {
const toggle = document.getElementById('toggle-itineraire-actif');
const label = document.getElementById('itineraire-toggle-label');
if (!toggle) return;

itineraireEstVisible = toggle.checked;

if (label) {
label.textContent = itineraireEstVisible ? 'Tracé actif' : 'Désactivé';
label.classList.toggle('active', itineraireEstVisible);
}

if (!itineraireEstVisible) {
// Retirer immédiatement le tracé de la carte
if (coucheLigneItineraire && map) {
map.removeLayer(coucheLigneItineraire);
coucheLigneItineraire = null;
}
} else {
// Réactiver et recalculer ou retracer
if (routesAlternativesRecues && routesAlternativesRecues.length > 0 && dataPersonnes[personnageActifId]) {
tracerLigneItineraireSurCarte(routesAlternativesRecues, varianteActiveIndex, dataPersonnes[personnageActifId].color);
} else {
calculerEtAfficherItineraire();
}
}
}

/**
* Réduit (minimise) ou agrandit la boîte d'itinéraire GPS :
* - Bascule la classe CSS '.minimized' sur l'élément #itineraire-box
* - Fait pivoter la flèche
* - Génère et affiche un résumé miniature (ex: 🚲 4.2 km • 17 min) lorsque la boîte est repliée
*/
function toggleMinimiserItineraire() {
const box = document.getElementById('itineraire-box');
const miniSummary = document.getElementById('itineraire-mini-summary');
if (!box) return;

// classList.toggle renvoie vrai si la classe a été ajoutée, faux si elle a été retirée
const estMinimise = box.classList.toggle('minimized');

if (miniSummary) {
if (estMinimise) {
// Récupère l'itinéraire actuellement choisi
const activeRoute = (routesAlternativesRecues && routesAlternativesRecues[varianteActiveIndex]) 
? routesAlternativesRecues[varianteActiveIndex] 
: null;
if (activeRoute) {
const iconMode = modeTransportActuel === 'bike' ? '🚲' : '🚶‍♂️';
miniSummary.textContent = `${iconMode} ${activeRoute.distKm} km • ${activeRoute.dureeTexte}`;
miniSummary.style.display = 'inline-block';
} else {
miniSummary.style.display = 'none';
}
} else {
// Si la boîte est dépliée, on masque le résumé compact
miniSummary.style.display = 'none';
}
}
}

/**
* Met à jour le texte du résumé compact si la boîte est actuellement repliée.
*/
function actualiserMiniSummarySiMinimise() {
const box = document.getElementById('itineraire-box');
const miniSummary = document.getElementById('itineraire-mini-summary');
if (!box || !miniSummary) return;

if (box.classList.contains('minimized')) {
const activeRoute = (routesAlternativesRecues && routesAlternativesRecues[varianteActiveIndex]) 
? routesAlternativesRecues[varianteActiveIndex] 
: null;
if (activeRoute) {
const iconMode = modeTransportActuel === 'bike' ? '🚲' : '🚶‍♂️';
miniSummary.textContent = `${iconMode} ${activeRoute.distKm} km • ${activeRoute.dureeTexte}`;
miniSummary.style.display = 'inline-block';
}
}
}

/**
* Recalcule et actualise les durées de toutes les propositions d'itinéraires
* lorsque l'utilisateur bascule entre mode 'À pied' et mode 'À vélo'.
*/
function actualiserAffichageToutesRoutes() {
if (!routesAlternativesRecues || routesAlternativesRecues.length === 0) return;

// Recalcule la durée de chaque proposition
routesAlternativesRecues.forEach(r => {
const dureeInfo = calculerDureeSelonMode(r.distanceMetres, modeTransportActuel);
r.dureeTexte = dureeInfo.dureeTexte;
r.distKm = dureeInfo.distKm;
});

// Mettre à jour les statistiques de la route actuellement active
const activeRoute = routesAlternativesRecues[varianteActiveIndex] || routesAlternativesRecues[0];
const distEl = document.getElementById('itineraire-distance');
const dureeEl = document.getElementById('itineraire-duree');
if (distEl) distEl.textContent = `${activeRoute.distKm} km`;
if (dureeEl) dureeEl.textContent = `~${activeRoute.dureeTexte}`;

// Met à jour les cartes d'itinéraires dans la liste
afficherCartesPropositions();
}

/**
* Génère les cartes interactives des 3 itinéraires proposés (façon Google Maps).
* Chaque carte affiche :
* - Le nom de l'itinéraire (ex: "Itinéraire 1 : Le plus rapide")
* - Un badge turquoise "Recommandé"
* - La description du trajet
* - La durée estimée et les kilomètres
*/
function afficherCartesPropositions() {
const container = document.getElementById('itineraire-propositions-list');
if (!container) return;

container.innerHTML = '';

routesAlternativesRecues.forEach((r, idx) => {
const estActif = idx === varianteActiveIndex;
const card = document.createElement('div');
card.className = `itineraire-proposition-card ${estActif ? 'active' : ''}`;
card.title = `Cliquer pour choisir ${r.nom}`;
// Au clic sur la carte, on active cette variante
card.onclick = () => selectionnerVarianteRoute(idx);

card.innerHTML = `
<div class="prop-info">
<div class="prop-title-row">
<span class="prop-name">${r.nom}</span>
${r.estRecommande ? '<span class="prop-badge-rec">Recommandé</span>' : ''}
</div>
<span class="prop-desc">${r.desc}</span>
</div>
<div class="prop-metrics">
<span class="prop-time">${r.dureeTexte}</span>
<span class="prop-distance">${r.distKm} km</span>
</div>
`;

container.appendChild(card);
});
}

/**
* Sélectionne l'une des propositions d'itinéraire :
* - Active la carte correspondante
* - Met à jour les statistiques globales
* - Trace la ligne principale avec halo sur la carte Leaflet
* 
* @param {number} index - Index de la route (0, 1, 2)
*/
function selectionnerVarianteRoute(index) {
if (!routesAlternativesRecues || !routesAlternativesRecues[index]) return;
varianteActiveIndex = index;

// Met à jour la classe active sur toutes les cartes de proposition
document.querySelectorAll('.itineraire-proposition-card').forEach((card, idx) => {
card.classList.toggle('active', idx === index);
});

const route = routesAlternativesRecues[index];
const distEl = document.getElementById('itineraire-distance');
const dureeEl = document.getElementById('itineraire-duree');
if (distEl) distEl.textContent = `${route.distKm} km`;
if (dureeEl) dureeEl.textContent = `~${route.dureeTexte}`;
actualiserMiniSummarySiMinimise();

if (itineraireEstVisible && dataPersonnes[personnageActifId]) {
tracerLigneItineraireSurCarte(routesAlternativesRecues, index, dataPersonnes[personnageActifId].color);
}
}

/**
* Calcule et propose simultanément 3 itinéraires routiers réels suivant le réseau de rues de Lyon :
* 1. "Itinéraire 1 : Le plus rapide" (axes centraux directs)
* 2. "Itinéraire 2 : Quais de Saône" (voie douce longeant la Saône)
* 3. "Itinéraire 3 : Berges du Rhône" (voie aérée le long du Rhône)
* 
* FONCTIONNEMENT TECHNIQUE DÉTAILLÉ (Pour les débutants) :
* - Le mot-clé 'async' permet d'exécuter des requêtes réseau sans jamais bloquer l'interface.
* - 'fetch()' contacte le serveur de routage Open Source OSRM (OpenStreetMap).
* - 'AbortController' annule la requête si le réseau met plus de 6.5 secondes à répondre.
* - 'Promise.allSettled' interroge les 3 variantes en parallèle pour un résultat quasi instantané.
* - En cas de panne réseau ou de mode hors-ligne, un bloc 'try...catch' bascule élégamment
*   vers un tracé patrimonial estimé (appliquerFallbackItineraire).
*/
async function calculerEtAfficherItineraire() {
if (!personnageActifId || !dataPersonnes[personnageActifId]) return;

const personne = dataPersonnes[personnageActifId];
const btn = document.getElementById('btn-calculer-itineraire');
const distEl = document.getElementById('itineraire-distance');
const dureeEl = document.getElementById('itineraire-duree');

// Indication visuelle de chargement sur le bouton
if (btn) {
btn.classList.add('loading');
btn.innerHTML = '⏳ Recherche des itinéraires...';
}

// Récupération des points de passage selon le trajet sélectionné (complet ou tronçon)
const baseCoords = obtenirCoordonneesTrajetActif(personne);
if (!baseCoords || baseCoords.length < 2) {
if (btn) btn.classList.remove('loading');
return;
}

// ======================================================================
// PRÉPARATION DES 3 VARIANTES D'ITINÉRAIRES DISTINCTS
// ======================================================================

// 1. Itinéraire direct / le plus rapide par les grands axes urbains
const planDirect = {
nom: "Itinéraire 1 : Le plus rapide",
desc: "Trajet le plus direct par les axes centraux",
estRecommande: true,
pts: baseCoords
};

// 2. Itinéraire via Quais de Saône (voie douce longeant les berges de la Saône)
let ptsSaone = [];
if (baseCoords.length === 2) {
const midLat = (baseCoords[0][0] + baseCoords[1][0]) / 2;
const saonePt = [midLat, Math.min(baseCoords[0][1], 4.8280)];
ptsSaone = [baseCoords[0], saonePt, baseCoords[1]];
} else {
ptsSaone = [baseCoords[0], [45.7680, 4.8280], ...baseCoords.slice(1)];
}
const planSaone = {
nom: "Itinéraire 2 : Quais de Saône",
desc: "Voie douce pittoresque le long de la Saône",
estRecommande: false,
pts: ptsSaone
};

// 3. Itinéraire via Berges du Rhône (voie large et cyclable)
let ptsRhone = [];
if (baseCoords.length === 2) {
const midLat = (baseCoords[0][0] + baseCoords[1][0]) / 2;
const rhonePt = [midLat, Math.max(baseCoords[0][1], 4.8430)];
ptsRhone = [baseCoords[0], rhonePt, baseCoords[1]];
} else {
ptsRhone = [baseCoords[0], [45.7620, 4.8420], ...baseCoords.slice(1)];
}
const planRhone = {
nom: "Itinéraire 3 : Berges du Rhône",
desc: "Parcours aéré par les voies des berges du Rhône",
estRecommande: false,
pts: ptsRhone
};

const plans = [planDirect, planSaone, planRhone];

/**
* Envoie une requête à l'API de routage OSRM pour un tracé donné
*/
async function fetchOsrmPlan(plan) {
// OSRM attend les coordonnées sous la forme "longitude,latitude" séparées par des points-virgules
const coordsStr = plan.pts.map(c => `${c[1]},${c[0]}`).join(';');
const url = `https://router.project-osrm.org/route/v1/driving/${coordsStr}?overview=full&geometries=geojson`;

// Timeout de sécurité : interrompt la requête après 6,5 secondes
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 6500);

try {
const resp = await fetch(url, { signal: controller.signal });
clearTimeout(timeoutId);
if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
const data = await resp.json();
if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) throw new Error('Pas de route');

const r = data.routes[0];
// Conversion GeoJSON [longitude, latitude] vers format Leaflet [latitude, longitude]
const latLngs = r.geometry.coordinates.map(coord => [coord[1], coord[0]]);
const dureeInfo = calculerDureeSelonMode(r.distance, modeTransportActuel);

return {
nom: plan.nom,
desc: plan.desc,
estRecommande: plan.estRecommande,
distanceMetres: r.distance,
distKm: dureeInfo.distKm,
dureeTexte: dureeInfo.dureeTexte,
latLngs: latLngs,
pointsWaypoints: plan.pts
};
} catch (e) {
clearTimeout(timeoutId);
throw e;
}
}

try {
// Exécute les 3 requêtes simultanément en parallèle
const resultats = await Promise.allSettled(plans.map(p => fetchOsrmPlan(p)));
const routesValides = [];

resultats.forEach(res => {
if (res.status === 'fulfilled' && res.value) {
routesValides.push(res.value);
}
});

if (routesValides.length > 0) {
routesAlternativesRecues = routesValides;
varianteActiveIndex = 0;

// Remplir les cartes de choix style Maps
afficherCartesPropositions();

// Mettre à jour les statistiques de l'itinéraire sélectionné
const activeRoute = routesValides[0];
if (distEl) distEl.textContent = `${activeRoute.distKm} km`;
if (dureeEl) dureeEl.textContent = `~${activeRoute.dureeTexte}`;

// Tracer la ligne sur la carte Leaflet si le tracé est activé
if (itineraireEstVisible) {
tracerLigneItineraireSurCarte(routesValides, 0, personne.color);
}

if (btn) {
const labelMode = modeTransportActuel === 'foot' ? 'à pied' : 'à vélo';
btn.innerHTML = `✅ ${routesValides.length} itinéraires trouvés (${labelMode})`;
setTimeout(() => {
if (btn) btn.innerHTML = '🗺️ Actualiser les itinéraires';
}, 2500);
}
} else {
throw new Error('Aucun itinéraire OSRM disponible');
}
} catch (err) {
console.warn('Routage OSRM indisponible ou hors-ligne, utilisation du tracé historique estimé :', err);
appliquerFallbackItineraire(personne);
} finally {
if (btn) btn.classList.remove('loading');
}
}

/**
* Dessine sur la carte Leaflet la route active et les routes alternatives :
* - Itinéraires alternatifs : dessinés en lignes grises discrètes et tiretées,
*   CLIQUABLES directement sur la carte pour basculer dessus.
* - Itinéraire actif sélectionné : tracé avec une ombre de contraste, un halo lumineux
*   coloré et un centrage automatique de la carte.
* 
* @param {Array} routes - Tableau des routes calculées
* @param {number} activeIndex - Index de la route choisie (0, 1, 2)
* @param {string} couleur - Couleur du résistant
*/
function tracerLigneItineraireSurCarte(routes, activeIndex, couleur) {
if (!map) return;

// Supprimer l'ancien tracé d'itinéraire s'il existe
if (coucheLigneItineraire) {
map.removeLayer(coucheLigneItineraire);
coucheLigneItineraire = null;
}

if (!routes || routes.length === 0) return;

const groupeLigne = L.layerGroup();

// 1. Tracer d'abord les itinéraires alternatifs inactifs (lignes grises élégantes)
routes.forEach((r, idx) => {
if (idx !== activeIndex && r.latLngs && r.latLngs.length > 0) {
const ligneInactive = L.polyline(r.latLngs, {
color: '#64748b',
weight: 5,
opacity: 0.6,
lineCap: 'round',
lineJoin: 'round',
dashArray: '3, 6'
});

// Clic sur l'itinéraire alternatif directement sur la carte Leaflet
ligneInactive.on('click', () => {
selectionnerVarianteRoute(idx);
});

groupeLigne.addLayer(ligneInactive);
}
});

// 2. Tracer l'itinéraire principal actif sélectionné avec triple épaisseur
const activeRoute = routes[activeIndex] || routes[0];
if (activeRoute && activeRoute.latLngs && activeRoute.latLngs.length > 0) {
// A. Ombre de fond sombre pour détacher la ligne du fond de carte
const bordureFond = L.polyline(activeRoute.latLngs, {
color: '#080a0f',
weight: 9,
opacity: 0.85,
lineCap: 'round',
lineJoin: 'round'
});
groupeLigne.addLayer(bordureFond);

// B. Halo lumineux vibrant
const aura = L.polyline(activeRoute.latLngs, {
color: couleur,
weight: 7,
opacity: 0.45,
lineCap: 'round',
lineJoin: 'round'
});
groupeLigne.addLayer(aura);

// C. Trait central plein et net
const lignePleine = L.polyline(activeRoute.latLngs, {
color: couleur,
weight: 4.5,
opacity: 1,
lineCap: 'round',
lineJoin: 'round'
});
groupeLigne.addLayer(lignePleine);

// Centrage fluide de la caméra sur l'itinéraire actif
map.fitBounds(lignePleine.getBounds(), {
padding: [60, 60],
maxZoom: 15
});
}

groupeLigne.addTo(map);
coucheLigneItineraire = groupeLigne;
}

/**
* Lance le trajet dans l'application GPS préférée / native de l'appareil :
* - Sur iPhone/iPad/Mac : Ouvre Apple Maps (Plans) avec les étapes et le mode (marche/vélo)
* - Sur Android/PC : Ouvre Google Maps avec le mode adapté
* Détecte automatiquement le système d'exploitation de l'utilisateur.
*/
function ouvrirDansAppGPS() {
if (!personnageActifId || !dataPersonnes[personnageActifId]) return;

// Récupérer les coordonnées de l'itinéraire actuellement sélectionné
const activeRoute = (routesAlternativesRecues && routesAlternativesRecues[varianteActiveIndex]) 
? routesAlternativesRecues[varianteActiveIndex] 
: null;

let coords = activeRoute ? activeRoute.pointsWaypoints : obtenirCoordonneesTrajetActif(dataPersonnes[personnageActifId]);
if (!coords || coords.length < 2) return;

const origin = coords[0];                         // Point de départ
const dest = coords[coords.length - 1];           // Destination finale
const intermediates = coords.slice(1, -1);        // Étapes intermédiaires éventuelles

// Détection des appareils Apple (iOS / macOS)
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

let gpsUrl = '';
const travelmode = modeTransportActuel === 'bike' ? 'bicycling' : 'walking';

if (isIOS) {
// Format universel Apple Maps :
// dirflg=w (marche) ou dirflg=b (vélo)
const dirflg = modeTransportActuel === 'bike' ? 'b' : 'w';
let daddr = `${dest[0]},${dest[1]}`;
if (intermediates.length > 0) {
daddr = intermediates.map(c => `${c[0]},${c[1]}`).join('+to:') + '+to:' + daddr;
}
gpsUrl = `https://maps.apple.com/?saddr=${origin[0]},${origin[1]}&daddr=${daddr}&dirflg=${dirflg}`;
} else {
// Format universel Google Maps :
let waypointsQuery = '';
if (intermediates.length > 0) {
const waypointsStr = intermediates.map(c => `${c[0]},${c[1]}`).join('|');
waypointsQuery = `&waypoints=${encodeURIComponent(waypointsStr)}`;
}
gpsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin[0]},${origin[1]}&destination=${dest[0]},${dest[1]}${waypointsQuery}&travelmode=${travelmode}`;
}

// Ouvre le lien dans un nouvel onglet ou lance directement l'application native
window.open(gpsUrl, '_blank');
}

/**
* Mode de repli (Fallback) en cas de coupure de connexion internet ou d'indisponibilité d'OSRM :
* Calcule une estimation mathématique basée sur la formule géodésique de Haversine
* et applique un facteur de détour urbain de 1.3.
* 
* @param {Object} personne
*/
function appliquerFallbackItineraire(personne) {
const distEl = document.getElementById('itineraire-distance');
const dureeEl = document.getElementById('itineraire-duree');
const btn = document.getElementById('btn-calculer-itineraire');

const coords = obtenirCoordonneesTrajetActif(personne);
if (!coords || coords.length < 2) return;

// Calcul de la distance à vol d'oiseau cumulée multipliée par 1.3 (détour urbain moyen)
let distMeters = 0;
for (let i = 0; i < coords.length - 1; i++) {
const c1 = coords[i];
const c2 = coords[i + 1];
distMeters += calculerDistanceHaversine(c1[0], c1[1], c2[0], c2[1]) * 1300;
}

const dureeInfo = calculerDureeSelonMode(distMeters, modeTransportActuel);

if (distEl) distEl.textContent = `${dureeInfo.distKm} km (estimé)`;
if (dureeEl) dureeEl.textContent = `~${dureeInfo.dureeTexte}`;

// Création d'une route de repli
routesAlternativesRecues = [{
nom: "Itinéraire estimé",
desc: "Tracé patrimonial direct",
estRecommande: true,
distanceMetres: distMeters,
distKm: dureeInfo.distKm,
dureeTexte: dureeInfo.dureeTexte,
latLngs: coords,
pointsWaypoints: coords
}];
varianteActiveIndex = 0;
afficherCartesPropositions();

if (itineraireEstVisible) {
tracerLigneItineraireSurCarte(routesAlternativesRecues, 0, personne.color);
}

if (btn) {
const labelMode = modeTransportActuel === 'foot' ? 'à pied' : 'à vélo';
btn.innerHTML = `🗺️ Tracé estimé (${labelMode})`;
}
}

/**
* Calcul géométrique de distance entre deux points géographiques (Formule de Haversine) :
* Prend en compte la courbure sphérique de la Terre (Rayon R = 6371 km).
* 
* @param {number} lat1 - Latitude point 1
* @param {number} lon1 - Longitude point 1
* @param {number} lat2 - Latitude point 2
* @param {number} lon2 - Longitude point 2
* @returns {number} Distance en kilomètres
*/
function calculerDistanceHaversine(lat1, lon1, lat2, lon2) {
const R = 6371; // Rayon moyen de la Terre en km
const dLat = (lat2 - lat1) * Math.PI / 180;
const dLon = (lon2 - lon1) * Math.PI / 180;
const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
Math.sin(dLon / 2) * Math.sin(dLon / 2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
return R * c;
}

// ==========================================================================
// 12. GESTES TACTILES DU TIROIR MOBILE (SWIPE DOWN TO CLOSE)
// ==========================================================================

/**
* Écoute les gestes du doigt sur écran tactile (smartphone) :
* Permet à l'utilisateur d'attraper la poignée ou l'en-tête du tiroir et
* de le faire glisser vers le bas pour le refermer naturellement comme dans une app native.
*/
function initGestesTiroirMobile() {
const sidebar = document.getElementById('sidebar');
const dragArea = document.getElementById('drawer-drag-area');
const backdrop = document.getElementById('sidebar-backdrop');
if (!sidebar) return;

let touchStartY = 0;
let touchStartX = 0;
let startTime = 0;
let currentDeltaY = 0;
let isDragging = false;
let dragInitiated = false;

// 1. Début du contact du doigt sur l'écran (touchstart)
sidebar.addEventListener('touchstart', (e) => {
if (window.innerWidth >= 768) return; // Uniquement sur écran tactile mobile
if (e.touches.length !== 1) return;

const touch = e.touches[0];
touchStartY = touch.clientY;
touchStartX = touch.clientX;
startTime = Date.now();
currentDeltaY = 0;
isDragging = false;

const target = e.target;
const isHandle = dragArea && (dragArea === target || dragArea.contains(target));
const isHeader = target.closest('.sidebar-header') !== null;

// On autorise le glissement si le doigt touche la poignée, l'en-tête, ou si la liste est tout en haut
dragInitiated = isHandle || isHeader || (sidebar.scrollTop <= 2);
}, { passive: true });

// 2. Déplacement du doigt vers le bas (touchmove)
sidebar.addEventListener('touchmove', (e) => {
if (window.innerWidth >= 768 || !dragInitiated) return;
if (e.touches.length !== 1) return;

const touch = e.touches[0];
const deltaY = touch.clientY - touchStartY;
const deltaX = touch.clientX - touchStartX;

// Si le mouvement est descendant (deltaY > 0) et principalement vertical
if (deltaY > 0 && Math.abs(deltaY) > Math.abs(deltaX)) {
if (sidebar.scrollTop > 2 && !isDragging) {
return;
}

isDragging = true;
currentDeltaY = deltaY;

// Empêche le rafraîchissement natif de la page du navigateur
if (e.cancelable) e.preventDefault();

// Le tiroir suit fidèlement la position du doigt en temps réel
sidebar.style.transition = 'none';
sidebar.style.transform = `translateY(${deltaY}px)`;

// Estompe progressivement le voile de fond proportionnellement au glissement
if (backdrop) {
const opacity = Math.max(0, 1 - (deltaY / 280));
backdrop.style.opacity = opacity.toString();
}
} else if (deltaY < 0 && isDragging) {
currentDeltaY = 0;
sidebar.style.transform = 'translateY(0)';
}
}, { passive: false });

// 3. Relâchement du doigt (touchend)
const finGlissement = () => {
if (!dragInitiated) return;
dragInitiated = false;

if (!isDragging) {
currentDeltaY = 0;
return;
}

isDragging = false;
sidebar.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
if (backdrop) backdrop.style.opacity = '';

const elapsedTime = Math.max(1, Date.now() - startTime);
const velocity = currentDeltaY / elapsedTime; // Vitesse de glissement en px/ms

// Si l'utilisateur a glissé de plus de 50px ou a fait un coup sec vers le bas (vitesse > 0.35)
if (currentDeltaY > 50 || (currentDeltaY > 25 && velocity > 0.35)) {
fermerMenuMobile(); // Fermeture du tiroir
} else {
sidebar.style.transform = ''; // Ressort de rappel en position ouverte
}

currentDeltaY = 0;
};

sidebar.addEventListener('touchend', finGlissement, { passive: true });
sidebar.addEventListener('touchcancel', finGlissement, { passive: true });

// Raccourci accessibilité : la touche Échap referme le tiroir et les modales
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
fermerMenuMobile();
fermerTousModals();
}
});
}

// Initialisation dès que le document HTML est prêt
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', initGestesTiroirMobile);
} else {
initGestesTiroirMobile();
}

// Variables et fonctions globales utiles pour tests et intégration
window.dataLieuxJustice = dataLieuxJustice;
window.estVoletFerme = estVoletFerme;
window.assurerVoletOuvert = assurerVoletOuvert;
