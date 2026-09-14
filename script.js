/**
 * Moteur interactif cartographique — Parcours de la Résistance à Lyon (1940-1944)
 * Gestion des données patrimoniales, couches Leaflet, navigation GPS et interface utilisateur.
 */

// ==========================================================================
// 1. DONNÉES HISTORIQUES DES PARCOURS
// ==========================================================================
const dataPersonnes = {
    // Fiche Jean Moulin
    "jean_moulin": {
        nom: "Jean Moulin",
        titre: "Président du Conseil National de la Résistance",
        role: "Unificateur des réseaux de la Résistance",
        img: "images/jean_moulin.jpg",
        color: "#e63946",
        quote: "« Je ne savais pas que c'était si difficile de ne pas céder. »",
        bio: "Héros emblématique de la Résistance française, Jean Moulin est parachuté en France par le général de Gaulle début 1942. Établi à Lyon, capitale de la Résistance, il parvient à unifier les mouvements Combat, Libération et Franc-Tireur sous l'égide des M.U.R., avant de présider le Conseil National de la Résistance.",
        etapes: [
            {
                coords: [45.7578, 4.8320],
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
        traceline: [
            [45.7578, 4.8320],
            [45.7705, 4.8315],
            [45.7950, 4.8465],
            [45.7508, 4.8625]
        ]
    },

    // Fiche complète de Klaus Barbie (toutes étapes, arrestation et procès)
    "klaus_barbie": {
        nom: "Klaus Barbie",
        titre: "Chef de la Section IV (Gestapo) à Lyon",
        role: "Chef de la Gestapo & Répression",
        img: "images/klaus_barbie.jpg",
        color: "#dc2626",
        quote: "« Jugé à Lyon en 1987 lors du premier procès en France pour crimes contre l'humanité. »",
        bio: "Chef de la section IV de la Gestapo à Lyon dès novembre 1942, Klaus Barbie traque méthodiquement la Résistance et orchestre la déportation des Juifs. Responsable de tortures atroces et de massacres, il s'enfuit en Bolivie après-guerre sous la fausse identité de Klaus Altmann. Démasqué et traqué par Beate et Serge Klarsfeld, il est arrêté le 25 janvier 1983 à La Paz par les autorités boliviennes, extradé vers la France, écroué à Montluc et condamné à perpétuité aux 24 Colonnes en 1987.",
        etapes: [
            {
                coords: [45.7495, 4.8260],
                titre: "Hôtel Terminus — 1er QG de la Gestapo",
                date: "Novembre 1942 - Printemps 1943",
                lieu: "12 cours de Verdun, Lyon 2e",
                desc: "Premier centre opérationnel de Barbie à Lyon : réquisition de l'hôtel, premiers interrogatoires violents et mise en place de l'appareil répressif."
            },
            {
                coords: [45.7687, 4.8336],
                titre: "Rafle de la rue Sainte-Catherine (UGIF)",
                date: "9 février 1943",
                lieu: "12 rue Sainte-Catherine, Lyon 1er",
                desc: "Barbie organise une souricière au siège de l'Union générale des israélites de France : 86 personnes juives sont arrêtées puis déportées à Auschwitz et Sobibor."
            },
            {
                coords: [45.7472, 4.8398],
                titre: "École de Santé Militaire — Siège principal & tortures",
                date: "Printemps 1943 - Août 1944",
                lieu: "14 avenue Berthelot, Lyon 7e (CHRD)",
                desc: "Quartier général de la Gestapo lyonnaise. Barbie y dirige les interrogatoires et les tortures de résistants, dont Jean Moulin après sa capture."
            },
            {
                coords: [45.7950, 4.8465],
                titre: "Raid de Caluire — Capture de Jean Moulin",
                date: "21 juin 1943",
                lieu: "Maison du Dr Dugoujon, Caluire-et-Cuire",
                desc: "Opération menée directement par Barbie : encerclement de la maison et arrestation des principaux cadres de la Résistance unifiée."
            },
            {
                coords: [45.7508, 4.8625],
                titre: "Prison Militaire de Montluc — Internements de masse",
                date: "1943 - 1944",
                lieu: "4 rue Jeanne-Hachette, Lyon 3e",
                desc: "Principal centre d'internement de la Gestapo. Près de 10 000 détenus y sont incarcérés dans des conditions inhumaines avant déportation ou exécution."
            },
            {
                coords: [45.7478, 4.8395],
                titre: "Ordre de la rafle d'Izieu (Télégramme Gestapo)",
                date: "6 avril 1944",
                lieu: "Avenue Berthelot / Télétype Gestapo Lyon",
                desc: "Barbie ordonne et supervise par télex la déportation de 44 enfants juifs et 7 éducateurs de la maison d'Izieu vers les camps de la mort."
            },
            {
                coords: [45.6968, 4.7915],
                titre: "Massacre du Fort de Côte-Lorette",
                date: "20 août 1944",
                lieu: "Fort de Côte-Lorette, Saint-Genis-Laval",
                desc: "À la veille de la Libération de Lyon, 120 prisonniers extraits de Montluc sont fusillés et brûlés sur ordre exprès de la Gestapo."
            },
            {
                coords: [45.7510, 4.8628],
                titre: "Arrestation en Bolivie (La Paz) & Extradition",
                date: "25 janvier - 5 février 1983",
                lieu: "La Paz (Bolivie) ➔ Écrou à Montluc (Lyon)",
                desc: "Réfugié sous la fausse identité de Klaus Altmann, Barbie est localisé et démasqué en Bolivie par Beate et Serge Klarsfeld. Arrêté le 25 janvier 1983 à La Paz par les autorités boliviennes, il est expulsé le 4 février et extradé en France par vol militaire, avant d'être écroué à la prison de Montluc."
            },
            {
                coords: [45.7617, 4.8278],
                titre: "Palais des 24 Colonnes — Procès pour crimes contre l'humanité",
                date: "11 mai - 4 juillet 1987",
                lieu: "Quai Romain-Rolland, Lyon 5e",
                desc: "Premier procès filmé en France pour crimes contre l'humanité. Défendu par Me Vergès, Barbie est condamné à la réclusion criminelle à perpétuité."
            },
            {
                coords: [45.7480, 4.8282],
                titre: "Prison Saint-Joseph — Fin de vie en détention",
                date: "25 septembre 1991",
                lieu: "Perrache, Lyon 2e",
                desc: "Incarcéré au centre pénitentiaire de Lyon suite à sa condamnation définitive, Barbie y meurt en détention d'un cancer à l'âge de 77 ans."
            }
        ],
        traceline: [
            [45.7495, 4.8260],
            [45.7687, 4.8336],
            [45.7472, 4.8398],
            [45.7950, 4.8465],
            [45.7508, 4.8625],
            [45.7478, 4.8395],
            [45.6968, 4.7915],
            [45.7510, 4.8628],
            [45.7617, 4.8278],
            [45.7480, 4.8282]
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

// Alias de rétro-compatibilité au cas où un ancien appel pointerait vers chaban_delmas
dataPersonnes["chaban_delmas"] = dataPersonnes["klaus_barbie"];

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

// Tuiles cartographiques Esri (fonds contemporains haute performance)
let tileEsriLight = null;          // Fond clair officiel Esri World Light Gray Base
let tileEsriDark = null;           // Fond sombre officiel Esri World Dark Gray Base
let modeFondCarte = 'light';       // Mode actif par défaut ('light' selon les souhaits du projet)

// Tuiles cartographiques historiques IGN (Géoplateforme ouverte)
let tileIGN1950 = null;            // Carte topographique IGN 1950 (après-guerre)
let tileEtatMajor = null;          // Carte d'État-Major 1820-1866 (XIXe siècle)
let tileOrtho1950 = null;          // Photographies aériennes historiques 1950-1965
let fondJusticeActif = 'esri';     // Époque cartographique active ('esri', 'ign1950', 'etatmajor', 'ortho1950')

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

// Couches historiques IGN Géoplateforme ouverte (différentes époques pour les lieux de justice)
tileIGN1950 = L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN50.1950&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
attribution: 'IGN &mdash; Carte 1950 (Après-guerre)',
maxZoom: 18,
minZoom: 6
});

tileEtatMajor = L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.ETATMAJOR40&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
attribution: 'IGN &mdash; Carte d’État-Major (1820-1866)',
maxZoom: 18,
minZoom: 6
});

tileOrtho1950 = L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS.1950-1965&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
attribution: 'IGN &mdash; Vues aériennes historiques (1950-1965)',
maxZoom: 18,
minZoom: 6
});

window.tileIGN1950 = tileIGN1950;
window.tileEtatMajor = tileEtatMajor;
window.tileOrtho1950 = tileOrtho1950;
window.tileEsriLight = tileEsriLight;
window.tileEsriDark = tileEsriDark;

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
* Bascule entre le mode sombre et le mode clair à l'aide du bouton carré unique.
* Permute dynamiquement la couleur du bouton et son icône (☀️ / 🌙).
*/
function basculerThemeUnique() {
    const nouveauMode = (modeFondCarte === 'light') ? 'dark' : 'light';
    changerFondCarte(nouveauMode);
}

/**
* Bascule entre le mode sombre et le mode clair à l'aide de l'interrupteur à bascule (Switch).
* Conservé pour rétro-compatibilité.
* 
* @param {boolean} estSombre - true si l'interrupteur est basculé sur Sombre, false sinon
*/
function basculerModeSombreClair(estSombre) {
const nouveauMode = estSombre ? 'dark' : 'light';
changerFondCarte(nouveauMode);
}

/**
* Active le fond cartographique Esri clair ou sombre sur la carte Leaflet.
* Synchronise également l'état du bouton carré unique (couleur et icône ☀️ / 🌙).
* 
* @param {'light'|'dark'} mode - 'light' pour le mode clair (Esri Gray Light), 'dark' pour le mode sombre (Esri Gray Dark)
*/
function changerFondCarte(mode) {
if (!map) return;
modeFondCarte = mode;

// Si un fond historique IGN est actif en mode Justice, on préserve l'époque cartographique
const estFondHistoriqueActif = (personnageActifId === null && (fondJusticeActif === 'ign1950' || fondJusticeActif === 'etatmajor' || fondJusticeActif === 'ortho1950'));

if (!estFondHistoriqueActif) {
    if (mode === 'light') {
        if (map.hasLayer(tileEsriDark)) map.removeLayer(tileEsriDark);
        if (!map.hasLayer(tileEsriLight)) tileEsriLight.addTo(map);
    } else {
        if (map.hasLayer(tileEsriLight)) map.removeLayer(tileEsriLight);
        if (!map.hasLayer(tileEsriDark)) tileEsriDark.addTo(map);
    }
}

// Mise à jour visuelle du bouton carré unique (#theme-toggle-btn)
const btnSquare = document.getElementById('theme-toggle-btn');
const iconSquare = document.getElementById('theme-toggle-icon');
if (iconSquare) {
    iconSquare.textContent = (mode === 'dark') ? '☀️' : '🌙';
}
if (btnSquare) {
    btnSquare.setAttribute('title', (mode === 'dark') ? 'Passer en mode clair (Soleil ☀️)' : 'Passer en mode sombre (Lune 🌙)');
    btnSquare.setAttribute('aria-label', (mode === 'dark') ? 'Activer le mode clair' : 'Activer le mode sombre');
}

// Synchronisation de l'interrupteur switch (#theme-map-switch)
const switchInput = document.getElementById('theme-map-switch');
if (switchInput) {
switchInput.checked = (mode === 'dark');
}

// Mise à jour visuelle des anciens boutons verticaux si présents
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
 * Affiche ou masque un calque thématique de justice spécifique sur la carte Leaflet.
 * 
 * @param {'carceraux'|'juridiques'|'police'} categorie - Identifiant de la catégorie de lieux à manipuler :
 *   - 'carceraux' : Prisons et camps (Montluc, Saint-Paul, Saint-Joseph, Fort de Côte-Lorette)
 *   - 'juridiques' : Tribunaux d'exception et cours martiales (24 Colonnes, Tribunal Militaire)
 *   - 'police' : Centres de répression et torture (QG Gestapo Berthelot, Terminus, Milice)
 * @param {boolean} activer - État souhaité : true pour ajouter le calque sur la carte, false pour le retirer
 */
function basculerCalqueJustice(categorie, activer) {
    // Vérification de sécurité : la carte et le groupe de calques doivent être initialisés
    if (!map || !calquesJustice[categorie]) return;

    if (activer) {
        // Ajoute le groupe de marqueurs à la carte s'il n'est pas déjà présent
        if (!map.hasLayer(calquesJustice[categorie])) {
            calquesJustice[categorie].addTo(map);
        }
    } else {
        // Retire le groupe de marqueurs de la carte s'il est affiché
        if (map.hasLayer(calquesJustice[categorie])) {
            map.removeLayer(calquesJustice[categorie]);
        }
    }

    // Actualise le badge indicateur du nombre de catégories actives
    mettreAJourBadgeJustice();
}

/**
 * Commande rapide pour activer ou désactiver simultanément l'ensemble des lieux de justice.
 * 
 * @param {boolean} activer - true pour afficher tous les lieux (10 lieux), false pour tous les masquer
 */
function toutBasculerJustice(activer) {
    // Parcourt les 3 catégories de lieux patrimoniaux
    ['carceraux', 'juridiques', 'police'].forEach(cat => {
        // Synchronise l'état de la case à cocher dans l'interface utilisateur
        const checkbox = document.getElementById(`toggle-${cat}`);
        if (checkbox) checkbox.checked = activer;
        // Applique l'état d'affichage sur la carte Leaflet
        basculerCalqueJustice(cat, activer);
    });
}

/**
 * Calcule et met à jour le badge numérique affichant le nombre de catégories actives.
 * Analyse les calques actuellement présents sur l'instance Leaflet et adapte le texte d'information.
 */
function mettreAJourBadgeJustice() {
    let count = 0;
    // Compte le nombre de calques actifs sur la carte
    ['carceraux', 'juridiques', 'police'].forEach(cat => {
        if (map && map.hasLayer(calquesJustice[cat])) count++;
    });

    // Cible l'élément HTML du badge dans la barre d'outils
    const badge = document.getElementById('justice-active-count');
    if (badge) {
        if (count > 0) {
            // Affichage avec accord grammatical au pluriel
            badge.textContent = `${count} actif${count > 1 ? 's' : ''}`;
            badge.style.display = 'inline-block';
        } else {
            // Masque le badge si aucune catégorie n'est visible
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
 * Ouvre ou ferme la fenêtre flottante d'archive (#modal-image-flottante).
 * 
 * Fonctionnement technique :
 * - Bascule la classe CSS 'open' sur la boîte modale centrée par-dessus la carte.
 * - Active le voile semi-transparent d'arrière-plan (#modal-backdrop).
 * - Préserve l'état du volet latéral (menu déroulant) qui reste ouvert en arrière-plan.
 * - Récupère les données historiques du résistant sélectionné (ou Jean Moulin par défaut).
 * - Injecte dynamiquement le titre patrimonial, la source de l'image (img.src) et la légende.
 */
function toggleModalImageFlottante() {
    // 1. Récupération des éléments du DOM
    const modalImage = document.getElementById("modal-image-flottante");
    const modalBackdrop = document.getElementById("modal-backdrop");
    
    // Le menu déroulant/volet latéral n'est pas fermé, il reste ouvert comme demandé
    if (modalImage) {
        // Basculement de l'état ouvert/fermé de la modale
        const estOuvert = modalImage.classList.toggle("open");
        // Synchronisation du voile d'obscurcissement avec la présence de la modale
        if (modalBackdrop) modalBackdrop.classList.toggle("active", estOuvert);
        
        if (estOuvert) {
            // Sélection du personnage actif ou repli sur Jean Moulin
            const p = (personnageActifId && dataPersonnes[personnageActifId]) ? dataPersonnes[personnageActifId] : dataPersonnes["jean_moulin"];
            const titreEl = document.getElementById("floating-panel-title");
            const imgEl = document.getElementById("floating-image-display");
            const captionEl = document.getElementById("floating-image-caption-text");
            
            // Mise à jour textuelle du titre d'en-tête
            if (titreEl) titreEl.textContent = "Photographie d'archive — " + p.nom;
            // Chargement de l'image d'époque haute définition
            if (imgEl) {
                imgEl.src = p.img;
                imgEl.alt = "Photographie d'archive de " + p.nom;
            }
            // Affichage de la légende avec identité et rôle historique
            if (captionEl) captionEl.textContent = p.nom + " (" + p.role + ")";
        }
    }
}

/**
 * Déclenche le téléchargement direct de la photographie d'archive du personnage actif.
 * 
 * @param {MouseEvent|Event} [event] - Événement natif du clic utilisateur :
 *   - event.preventDefault() : empêche tout comportement de lien natif indésirable
 *   - event.stopPropagation() : bloque le bouillonnement de l'événement vers les conteneurs parents
 */
function telechargerImageArchive(event) {
    // Interception et neutralisation du comportement de clic par défaut
    if (event) {
        if (typeof event.preventDefault === 'function') event.preventDefault();
        if (typeof event.stopPropagation === 'function') event.stopPropagation();
    }
    
    // Identification de la fiche patrimoniale ciblée
    const p = (personnageActifId && dataPersonnes[personnageActifId]) ? dataPersonnes[personnageActifId] : dataPersonnes["jean_moulin"];
    // Génération d'un nom de fichier propre sans espaces ni caractères spéciaux (ex: jean_moulin.jpg)
    const nomFichier = (p.nom ? p.nom.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'image_archive') + '.jpg';
    
    // Création dynamique d'un élément d'ancrage invisible pour ordonner le téléchargement par le navigateur
    const link = document.createElement('a');
    link.href = p.img;          // Chemin relatif vers l'image dans le dossier images/
    link.download = nomFichier;  // Attribut HTML5 ordonnant le téléchargement local du fichier
    document.body.appendChild(link);
    link.click();                // Simulation du clic de téléchargement
    document.body.removeChild(link); // Nettoyage immédiat du nœud temporaire dans le DOM
}

/**
 * Ferme simultanément toutes les fenêtres flottantes et sous-menus ouverts :
 * - Masque la modale d'archive photo (#modal-image-flottante)
 * - Masque la modale des mentions légales (#modal-mentions-legales)
 * - Désactive les voiles sombres d'arrière-plan (#modal-backdrop, #legal-backdrop)
 * - Replie le menu déroulant des fonds de carte historiques
 */
function fermerTousModals() {
    // 1. Réinitialisation de la modale d'archive photographique
    const modalImage = document.getElementById('modal-image-flottante');
    if (modalImage) {
        modalImage.classList.remove('open');
        modalImage.classList.remove('fullscreen');
    }

    // 2. Fermeture de la modale des mentions légales
    fermerModalMentionsLegales();

    // 3. Masquage du voile d'obscurcissement principal
    const backdrop = document.getElementById('modal-backdrop');
    if (backdrop) backdrop.classList.remove('active');

    // 4. Repliement du sélecteur d'époques cartographiques
    fermerDropdownFondsJustice();
}

/**
 * Déploie la boîte modale des Mentions Légales, de l'hébergeur et des crédits iconographiques.
 * Active également le voile sombre (#legal-backdrop) pour isoler la fenêtre d'information.
 */
function ouvrirModalMentionsLegales() {
    const modal = document.getElementById('modal-mentions-legales');
    const backdrop = document.getElementById('legal-backdrop');
    if (modal) modal.classList.add('open');        // Rend la modale visible au centre
    if (backdrop) backdrop.classList.add('active'); // Assombrit le fond de page
}

/**
 * Ferme la boîte modale des Mentions Légales et désactive son voile d'arrière-plan.
 */
function fermerModalMentionsLegales() {
    const modal = document.getElementById('modal-mentions-legales');
    const backdrop = document.getElementById('legal-backdrop');
    if (modal) modal.classList.remove('open');        // Masque la boîte d'information
    if (backdrop) backdrop.classList.remove('active'); // Restaure la luminosité de l'écran
}

/**
 * Déploie ou replie le menu déroulant accordéon de sélection des fonds de plan d'époque (Mode Justice).
 * Met à jour l'accessibilité ARIA (aria-expanded) pour les lecteurs d'écran.
 */
function toggleDropdownFondsJustice() {
    const dropdown = document.getElementById('dropdown-fonds-justice');
    const wrapper = document.getElementById('justice-fond-wrapper');
    const btn = document.getElementById('btn-fond-justice');
    if (!dropdown) return;

    // Bascule la classe 'open' et récupère l'état booléen résultant
    const estOuvert = dropdown.classList.toggle('open');
    if (wrapper) wrapper.classList.toggle('open', estOuvert);
    // Met à jour l'attribut d'accessibilité pour malvoyants
    if (btn) btn.setAttribute('aria-expanded', estOuvert ? 'true' : 'false');
}

/**
 * Referme immédiatement le menu déroulant de sélection des fonds de plan historiques.
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
 * Bascule dynamiquement l'époque cartographique affichée en mode Lieux de Justice & Répression :
 * 
 * @param {'esri'|'ign1950'|'etatmajor'|'ortho1950'} fondKey - Clé d'identification de l'époque cartographique :
 *   - 'esri' : Carte contemporaine vectorielle Esri Canvas (avec switch clair/sombre)
 *   - 'ign1950' : Carte topographique IGN 1950 de l'après-guerre et de la Libération de Lyon
 *   - 'etatmajor' : Carte d'État-Major militaire 1820-1866 gravée au XIXe siècle
 *   - 'ortho1950' : Mosaïque de photographies aériennes d'archive IGN 1950-1965
 * 
 * Avantage architectural :
 * Toutes les couches sont de véritables tuiles Leaflet déplaçables et zoomables.
 * Les marqueurs des lieux de justice restent superposés et cliquables au-dessus des cartes d'époque.
 */
function choisirFondPlanJustice(fondKey) {
    // 1. Fermeture du menu accordéon déroulant après sélection
    fermerDropdownFondsJustice();
    fondJusticeActif = fondKey; // Mémorisation de l'époque sélectionnée

    // 2. Mise à jour de la surbrillance visuelle de l'option active dans le menu
    document.querySelectorAll('#dropdown-fonds-justice .fond-option').forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-fond') === fondKey);
    });

    // 3. Récupération des éléments du DOM
    const btnText = document.getElementById('btn-fond-justice-text');
    const bgMapImg = document.getElementById('map-image-background');
    const themeSwitchWrapper = document.getElementById('theme-toggle-btn') || document.getElementById('theme-switch-wrapper');
    const interactiveContent = document.getElementById('justice-interactive-content');
    const imageNotice = document.getElementById('justice-image-notice');

    // 4. Libellés clairs affichés sur le bouton principal du sélecteur
    const labels = {
        'esri': 'Carte contemporaine',
        'ign1950': 'Carte IGN 1950',
        'etatmajor': 'Carte d\'État-Major',
        'ortho1950': 'Photos aériennes 1950'
    };
    if (btnText && labels[fondKey]) {
        btnText.textContent = labels[fondKey];
    }

    // 5. Masquage de tout arrière-plan statique au profit du moteur Leaflet
    if (bgMapImg) bgMapImg.style.display = 'none';

    // 6. Remplacement propre de la couche cartographique de base sur Leaflet
    if (map) {
        // Retrait des anciennes couches pour éviter toute superposition inutile en mémoire
        [tileEsriLight, tileEsriDark, tileIGN1950, tileEtatMajor, tileOrtho1950].forEach(couche => {
            if (couche && map.hasLayer(couche)) {
                map.removeLayer(couche);
            }
        });

        // Activation de la couche de tuiles sélectionnée
        if (fondKey === 'ign1950') {
            if (tileIGN1950) tileIGN1950.addTo(map);
        } else if (fondKey === 'etatmajor') {
            if (tileEtatMajor) tileEtatMajor.addTo(map);
        } else if (fondKey === 'ortho1950') {
            if (tileOrtho1950) tileOrtho1950.addTo(map);
        } else {
            // Carte contemporaine Esri (synchronisée avec le thème clair/sombre)
            if (modeFondCarte === 'dark') {
                if (tileEsriDark) tileEsriDark.addTo(map);
            } else {
                if (tileEsriLight) tileEsriLight.addTo(map);
            }
        }
    }

    // 7. Maintien des filtres et de la liste des lieux interactifs sur toutes les époques
    if (interactiveContent) interactiveContent.style.display = 'block';
    if (imageNotice) imageNotice.style.display = 'none';

    // 8. Préservation du bouton de thème UI dans le header
    if (themeSwitchWrapper) themeSwitchWrapper.style.display = 'inline-flex';
}

/**
 * Ferme le volet latéral sur ordinateur (PC) lorsqu'on clique sur la croix ✕.
 * 
 * Fonctionnement technique :
 * - Ajoute la classe 'desktop-collapsed' sur #sidebar pour le translater hors de l'écran.
 * - Rend visible le bouton central bas 'Menu' pour permettre sa réouverture à tout moment.
 * - Déclenche map.invalidateSize() après l'animation CSS (360ms) pour adapter la surface de la carte.
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
 * Réaffiche le volet latéral sur ordinateur (PC) après une fermeture.
 * 
 * Fonctionnement technique :
 * - Retire la classe 'desktop-collapsed' sur #sidebar pour réintégrer le volet latéral.
 * - Masque le bouton central bas 'Menu'.
 * - Recalcule la géométrie Leaflet (map.invalidateSize).
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
 * Détermine si le volet latéral d'informations est actuellement masqué ou replié.
 * 
 * @returns {boolean} true si le volet est fermé (sur PC via 'desktop-collapsed' ou sur mobile sans 'open')
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
 * Ouvre automatiquement le volet d'information s'il était fermé (sur PC ou smartphone).
 * Appelé automatiquement lorsqu'un marqueur d'étape ou de lieu de justice est cliqué sur la carte.
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
 * Ouvre l'application cartographique interactive depuis la page d'accueil pour une figure historique :
 * 
 * Séquence d'exécution :
 * 1. Masque l'écran d'accueil (#landing display: none)
 * 2. Rend visible l'application cartographique (#app display: flex)
 * 3. Configure la barre de navigation supérieure (titre du résistant, bouton portrait)
 * 4. Initialise ou réutilise l'instance Leaflet (initMap)
 * 5. Ferme le volet par défaut pour offrir une vue plein écran immédiate de la carte
 * 6. Nettoie les calques obsolètes et réactive le fond contemporain Esri
 * 7. Après un délai de 150ms pour le rendu CSS, force le recalcul dimensionnel (map.invalidateSize)
 * 8. Charge le résistant sélectionné (selectionnerPersonne)
 * 
 * @param {'jean_moulin'|'klaus_barbie'|'lucie_aubrac'} id - Identifiant unique de la personnalité historique
 */
function ouvrirCarte(id) {
    // 1. Transition d'écrans : masquage de l'accueil, affichage du conteneur cartographique
    document.getElementById('landing').style.display = 'none';
    const appEl = document.getElementById('app');
    appEl.style.display = 'flex';

    // 2. Configuration des contrôles supérieurs spécifiques au mode Résistant
    const btnPortrait = document.getElementById('btn-image-personnage');
    const wrapFondJustice = document.getElementById('justice-fond-wrapper');
    const titleBadge = document.getElementById('header-context-title');
    const themeSwitchWrap = document.getElementById('theme-toggle-btn') || document.getElementById('theme-switch-wrapper');
    const bgImg = document.getElementById('map-image-background');

    if (btnPortrait) btnPortrait.style.display = 'flex';
    if (wrapFondJustice) wrapFondJustice.style.display = 'none';
    if (themeSwitchWrap) themeSwitchWrap.style.display = 'flex';
    if (bgImg) bgImg.style.display = 'none';
    if (id && dataPersonnes[id] && titleBadge) {
        titleBadge.textContent = dataPersonnes[id].nom;
    }

    // 3. Initialisation de la carte Leaflet
    initMap();

    // 4. Par défaut, repliement initial du volet pour offrir une vue dégagée de Lyon
    if (window.innerWidth >= 768) {
        fermerSidebarDesktop();
    } else {
        fermerMenuMobile();
    }

    // Synchronisation de l'attribut de thème visuel
    document.body.setAttribute('data-theme', modeFondCarte);

    // 5. Nettoyage des couches historiques IGN au profit du fond contemporain Esri
    if (map) {
        [tileIGN1950, tileEtatMajor, tileOrtho1950].forEach(couche => {
            if (couche && map.hasLayer(couche)) map.removeLayer(couche);
        });
        if (modeFondCarte === 'dark') {
            if (map.hasLayer(tileEsriLight)) map.removeLayer(tileEsriLight);
            if (!map.hasLayer(tileEsriDark)) tileEsriDark.addTo(map);
        } else {
            if (map.hasLayer(tileEsriDark)) map.removeLayer(tileEsriDark);
            if (!map.hasLayer(tileEsriLight)) tileEsriLight.addTo(map);
        }
    }

    // 6. Délai d'attente pour stabilisation du flux DOM et recalcul Leaflet
    setTimeout(() => {
        map.invalidateSize(); // Recalcul obligatoire de la géométrie de la fenêtre

        // Masquage des calques de justice pour ne conserver que le résistant demandé
        ['carceraux', 'juridiques', 'police'].forEach(cat => {
            if (map && calquesJustice[cat] && map.hasLayer(calquesJustice[cat])) {
                map.removeLayer(calquesJustice[cat]);
            }
            const chk = document.getElementById(`toggle-${cat}`);
            if (chk) chk.checked = false;
        });
        mettreAJourBadgeJustice();

        // 7. Déploiement des données du résistant (étapes, marqueurs, tracé)
        if (id && dataPersonnes[id]) {
            if (titleBadge) titleBadge.textContent = dataPersonnes[id].nom;
            selectionnerPersonne(id);
        }
    }, 150);
}

/**
 * Ouvre la carte en mode thématique "Lieux de Justice & Répression" (4e tuile de l'accueil) :
 * - Active la vue latérale dédiée avec filtres par catégorie (Prisons, Tribunaux, Police)
 * - Déploie les sélecteurs de fonds cartographiques historiques (IGN 1950, État-Major 1820, Photos aériennes)
 * - Initialise la carte et active simultanément les 10 lieux historiques
 */
function ouvrirCarteJustice() {
    // 1. Transition d'écrans
    document.getElementById('landing').style.display = 'none';
    const appEl = document.getElementById('app');
    appEl.style.display = 'flex';

    // 2. Ajustement des éléments du bandeau supérieur
    const btnPortrait = document.getElementById('btn-image-personnage');
    const wrapFondJustice = document.getElementById('justice-fond-wrapper');
    const titleBadge = document.getElementById('header-context-title');

    if (btnPortrait) btnPortrait.style.display = 'none';
    if (wrapFondJustice) wrapFondJustice.style.display = 'flex';
    if (titleBadge) titleBadge.textContent = "Lieux de Justice & Répression";

    // 3. Initialisation de la carte Leaflet
    initMap();

    // 4. Repliement du volet par défaut à l'ouverture pour libérer la carte
    if (window.innerWidth >= 768) {
        fermerSidebarDesktop();
    } else {
        fermerMenuMobile();
    }

    document.body.setAttribute('data-theme', modeFondCarte);

    // 5. Initialisation des calques et des données après affichage CSS
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
 * Filtre les lieux de justice affichés sur la carte Leaflet et dans la liste latérale :
 * - 'tous' : Affiche simultanément l'ensemble des 10 lieux historiques
 * - 'carceraux' : Affiche exclusivement les 4 prisons et lieux d'internement
 * - 'juridiques' : Affiche exclusivement les 3 cours d'exception et tribunaux
 * - 'police' : Affiche exclusivement les 3 centres de torture et sièges répressifs
 * 
 * @param {'tous'|'carceraux'|'juridiques'|'police'} categorie - Identifiant du filtre sélectionné par l'utilisateur
 */
function filtrerJustice(categorie) {
    // 1. Mise à jour de l'apparence active des boutons pilules de filtre
    document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === categorie);
    });

    // 2. Initialisation de la boîte géographique Leaflet pour le recadrage automatique
    const bounds = L.latLngBounds([]);

    // 3. Activation ou désactivation des calques Leaflet selon le filtre
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

    // 4. Régénération des cartes de bâtiments dans le volet déroulant
    afficherLieuxJusticeDansListe(categorie);

    // 5. Calcul des limites géographiques pour ajuster la vue
    const activeCats = (categorie === 'tous') ? ['carceraux', 'juridiques', 'police'] : [categorie];
    activeCats.forEach(cat => {
        if (dataLieuxJustice[cat]) {
            dataLieuxJustice[cat].lieux.forEach(l => {
                bounds.extend(l.coords);
            });
        }
    });

    // 6. Recadrage fluide de la caméra Leaflet sur l'emprise des lieux sélectionnés
    if (bounds.isValid() && map) {
        map.fitBounds(bounds, {
            padding: [50, 50],
            maxZoom: 14
        });
    }
}

/**
 * Génère dynamiquement les fiches HTML de chaque lieu historique dans la liste du volet latéral.
 * 
 * @param {string} filtre - Identifiant de la catégorie affichée ('tous', 'carceraux', 'juridiques', 'police')
 */
function afficherLieuxJusticeDansListe(filtre) {
    // 1. Récupération du conteneur parent dans le DOM
    const conteneur = document.getElementById('liste-lieux-justice');
    const titleEl = document.getElementById('justice-list-title');
    if (!conteneur) return;
    conteneur.innerHTML = ''; // Réinitialisation propre de la liste avant réinsertion

    // 2. Sélection des catégories à parcourir
    const categories = (filtre === 'tous') ? ['carceraux', 'juridiques', 'police'] : [filtre];

    // 3. Dictionnaire des titres avec compteurs
    const titresFiltres = {
        'tous': 'Tous les lieux historiques (10)',
        'carceraux': 'Prisons & Lieux carcéraux (4)',
        'juridiques': 'Tribunaux & Lieux juridiques (3)',
        'police': 'Lieux de Police & Répression (3)'
    };

    if (titleEl && titresFiltres[filtre]) {
        titleEl.textContent = titresFiltres[filtre];
    }

    // 4. Création des cartes pour chaque lieu
    categories.forEach(catKey => {
        const cat = dataLieuxJustice[catKey];
        if (!cat) return;

        cat.lieux.forEach((lieu, idx) => {
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

            // Clic sur la carte : focalise la caméra et déploie le popup
            card.addEventListener('click', () => {
                focusSurLieuJustice(catKey, idx);
            });

            conteneur.appendChild(card);
        });
    });
}

/**
 * Centre la caméra Leaflet sur un lieu de justice et déploie sa bulle popup descriptive :
 * - Déplace la carte via une trajectoire aérienne fluide (map.flyTo)
 * - Assure l'ouverture automatique de l'infobulle (popup)
 * - Sur smartphone, replie le tiroir pour laisser admirer le bâtiment
 * 
 * @param {'carceraux'|'juridiques'|'police'} catKey - Catégorie du lieu sélectionné
 * @param {number} idx - Index du lieu au sein du tableau de sa catégorie
 */
function focusSurLieuJustice(catKey, idx) {
    const cat = dataLieuxJustice[catKey];
    if (!cat || !cat.lieux[idx]) return;
    const lieu = cat.lieux[idx];

    // Met en surbrillance la carte dans la liste déroulante
    mettreEnValeurLieuJusticeDansListe(catKey, idx);

    // Active automatiquement le calque s'il était masqué
    if (!map.hasLayer(calquesJustice[catKey])) {
        basculerCalqueJustice(catKey, true);
    }

    // Animation aérienne vers les coordonnées du lieu (zoom précis niveau 16)
    map.flyTo(lieu.coords, 16, {
        duration: 0.8
    });

    // Déploiement automatique du popup après la fin du vol de caméra (850ms)
    setTimeout(() => {
        if (lieu.marker) {
            lieu.marker.openPopup();
        }
    }, 850);

    // Sur smartphone, fermeture du tiroir pour libérer la vue cartographique
    if (window.innerWidth <= 768) {
        fermerMenuMobile();
    }
}

/**
 * Met en surbrillance visuelle la fiche d'un lieu de justice dans le volet latéral
 * et déclenche un défilement vertical centré fluide (scrollIntoView).
 * 
 * @param {'carceraux'|'juridiques'|'police'} catKey - Identifiant de la catégorie
 * @param {number} idx - Index numérique du lieu
 */
function mettreEnValeurLieuJusticeDansListe(catKey, idx) {
    let activeCard = document.querySelector(`.lieu-justice-card[data-cat="${catKey}"][data-index="${idx}"]`);
    // Si la carte n'est pas trouvée (ex: filtre restrictif), réinitialise sur 'tous'
    if (!activeCard) {
        afficherLieuxJusticeDansListe('tous');
        document.querySelectorAll('.filter-pill').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === 'tous');
        });
        activeCard = document.querySelector(`.lieu-justice-card[data-cat="${catKey}"][data-index="${idx}"]`);
    }

    // Applique la classe 'active' uniquement sur la carte ciblée
    document.querySelectorAll('.lieu-justice-card').forEach(card => {
        const match = (card.getAttribute('data-cat') === catKey && card.getAttribute('data-index') == idx);
        card.classList.toggle('active', match);
    });

    // Défilement automatique centré dans la zone visible
    if (activeCard) {
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Réinitialise l'application et opère le retour complet vers la page d'accueil :
 * - Masque l'interface cartographique (#app) et réaffiche l'écran d'accueil (#landing)
 * - Ferme l'ensemble des panneaux, tiroirs et modales ouverts
 * - Réinitialise les variables d'état (personnage actif, étape courante, itinéraires GPS)
 * - Libère la mémoire en retirant les calques et polylignes de Leaflet
 */
function retourAccueil() {
    // 1. Basculement des vues plein écran
    document.getElementById('app').style.display = 'none';
    document.getElementById('landing').style.display = 'flex';

    // 2. Fermeture des sous-menus et boîtes de dialogue
    fermerMenuMobile();
    fermerTousModals();
    fermerDropdownFondsJustice();

    const bgImg = document.getElementById('map-image-background');
    if (bgImg) bgImg.style.display = 'none';

    // 3. Réinitialisation de l'état du volet et du bouton Menu
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('desktop-collapsed');

    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.classList.remove('pc-visible');
        menuToggle.classList.remove('hidden');
        menuToggle.textContent = 'Menu';
    }

    // 4. Masquage des sections du volet latéral
    const detailView = document.getElementById('sidebar-detail-view');
    const justiceView = document.getElementById('sidebar-justice-view');
    if (detailView) detailView.style.display = 'none';
    if (justiceView) justiceView.style.display = 'none';

    // 5. Nettoyage de la mémoire et suppression des calques Leaflet
    if (coucheActuelle && map) {
        map.removeLayer(coucheActuelle);
        coucheActuelle = null;
    }
    if (coucheLigneItineraire && map) {
        map.removeLayer(coucheLigneItineraire);
        coucheLigneItineraire = null;
    }

    // 6. Remise à zéro des variables d'état globales
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
 * Ouvre ou ferme le volet latéral/tiroir inférieur selon le contexte (ordinateur ou smartphone) :
 * - Sur PC (largeur >= 768px) : alterne entre 'desktop-collapsed' et l'état déployé.
 * - Sur Mobile (largeur < 768px) : alterne entre 'open' et l'état replié en bas d'écran.
 */
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    if (window.innerWidth >= 768) {
        // Mode Ordinateur (PC)
        if (sidebar.classList.contains('desktop-collapsed')) {
            ouvrirSidebarDesktop();
        } else {
            fermerSidebarDesktop();
        }
    } else {
        // Mode Mobile (Smartphone / Tablette)
        if (sidebar.classList.contains('open')) {
            fermerMenuMobile();
        } else {
            ouvrirMenuMobile();
        }
    }
}

/**
 * Déploie le tiroir inférieur d'information sur smartphone :
 * - Ajoute la classe 'open' au conteneur #sidebar pour le translater vers le haut (translateY(0))
 * - Active le voile sombre semi-transparent #sidebar-backdrop
 * - Masque temporairement le bouton flottant d'ouverture #menu-toggle
 * - Ferme toutes les fenêtres modales superposées
 */
function ouvrirMenuMobile() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    const menuToggle = document.getElementById('menu-toggle');

    if (sidebar) {
        sidebar.classList.add('open');
        sidebar.style.transform = ''; // Réinitialise les styles inline résiduels des gestes tactiles
    }
    if (backdrop) backdrop.classList.add('active');
    if (menuToggle) menuToggle.classList.add('hidden');

    fermerTousModals();
}

/**
 * Referme le tiroir inférieur d'information sur smartphone et rétablit l'état de repos :
 * - Retire la classe 'open' du conteneur #sidebar
 * - Réinitialise les transitions CSS et la translation tactile
 * - Désactive le voile sombre d'arrière-plan
 * - Réaffiche le bouton flottant #menu-toggle
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
 * Active et configure l'intégralité du parcours d'une figure historique :
 * 
 * Étapes détaillées :
 * 1. Mémorise l'identifiant du personnage actif
 * 2. Nettoie les précédents tracés routiers et couches d'itinéraires
 * 3. Réinitialise les compteurs de distance, de durée et l'interrupteur GPS (désactivé par défaut)
 * 4. Remplit dynamiquement la liste des étapes et des tronçons disponibles
 * 5. Injecte la biographie et la description patrimoniale dans le volet latéral
 * 6. Trace sur Leaflet la ligne stylisée et les marqueurs numérotés
 * 
 * @param {'jean_moulin'|'klaus_barbie'|'lucie_aubrac'} id - Identifiant de la figure historique dans dataPersonnes
 */
function selectionnerPersonne(id) {
    personnageActifId = id;
    etapeActiveIndex = null;
    const personne = dataPersonnes[id];

    // 1. Suppression du tracé d'itinéraire précédent
    if (coucheLigneItineraire && map) {
        map.removeLayer(coucheLigneItineraire);
        coucheLigneItineraire = null;
    }

    // 2. Réinitialisation des indicateurs de la boîte de navigation
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

    // 3. Navigation GPS désactivée d'office par défaut et boîte repliée
    itineraireEstVisible = false;
    if (toggleIti) toggleIti.checked = false;
    if (toggleLabel) {
        toggleLabel.textContent = 'Tracé inactif';
        toggleLabel.classList.remove('active');
    }
    const itiBox = document.getElementById('itineraire-box');
    if (itiBox) itiBox.classList.add('minimized');

    // 4. Alimentation du menu déroulant des tronçons d'étapes
    peuplerSelectTrajets(personne);
    varianteActiveIndex = 0;

    // 5. Mise à jour du libellé du bouton mobile ("Voir les étapes")
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.textContent = 'Voir les étapes';
    }

    // 6. Affichage de la vue détaillée dans le volet (photo, bio, citation, étapes)
    afficherVueDetail(personne);

    // 7. Rendu visuel cartographique Leaflet (marqueurs radar, polylignes doubles)
    afficherParcoursSurCarte(personne);
}

/**
 * Construit et injecte les informations biographiques et les étapes dans le panneau latéral :
 * - Affiche la vue résistant (#sidebar-detail-view) et masque la vue justice
 * - Injecte la photographie, le titre officiel, la citation et la biographie
 * - Note ergonomique : La biographie est située AVANT la liste des étapes
 * - Crée dynamiquement chaque carte d'étape numérotée et cliquable
 * 
 * @param {Object} personne - Fiche biographique complète issue du registre dataPersonnes
 */
function afficherVueDetail(personne) {
    const justiceView = document.getElementById('sidebar-justice-view');
    const detailView = document.getElementById('sidebar-detail-view');

    // 1. Basculement de l'affichage des panneaux
    if (justiceView) justiceView.style.display = 'none';
    if (detailView) detailView.style.display = 'flex';

    // 2. Remplissage des champs d'identité et de médiation
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

    // 3. Construction dynamique de la liste des étapes cliquables
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

        // Au clic sur une étape : recentre la carte Leaflet et déploie le popup
        item.addEventListener('click', () => {
            focusSurEtape(index);
        });

        listeEtapesEl.appendChild(item);
    });
}

/**
 * Dessine sur la carte Leaflet le tracé patrimonial du résistant et ses marqueurs numérotés :
 * - Double polyligne : halo lumineux semi-transparent + ligne de guidage tiretée
 * - Marqueurs interactifs avec onde pulsante et popup d'information historique
 * - Recentrage automatique de la caméra sur l'emprise du parcours (map.fitBounds)
 * 
 * @param {Object} personne - Fiche historique du résistant contenant traceline et étapes
 */
function afficherParcoursSurCarte(personne) {
    if (!map) return;

    // 1. Suppression de l'ancien calque de parcours s'il existe
    if (coucheActuelle) {
        map.removeLayer(coucheActuelle);
    }
    marqueursActuels = [];

    const groupeCalque = L.layerGroup();

    // 2. Ligne de fond lumineuse (halo large de 8px avec opacité douce)
    const ligneFond = L.polyline(personne.traceline, {
        color: personne.color,
        weight: 8,
        opacity: 0.35,
        lineCap: 'round'
    });
    groupeCalque.addLayer(ligneFond);

    // 3. Ligne principale nette et stylisée avec tirets (8px de trait, 6px d'espace)
    const polyline = L.polyline(personne.traceline, {
        color: personne.color,
        weight: 4,
        opacity: 0.95,
        dashArray: '8, 6',
        lineCap: 'round'
    });
    groupeCalque.addLayer(polyline);

    // 4. Placement des marqueurs numérotés pour chaque étape
    personne.etapes.forEach((etape, index) => {
        const customIcon = creerIconeMarqueur(personne.color, index + 1, false);
        const marker = L.marker(etape.coords, { icon: customIcon });

        // Bulle d'information popup Leaflet
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

        // Clic sur le marqueur sur la carte :
        // Ouvre le volet s'il était fermé, surligne l'étape et la fait défiler
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
 * Centre la caméra Leaflet sur une étape spécifique et déploie son infobulle :
 * - Agrandit l'icône du marqueur ciblé pour la faire ressortir visuellement (classe marker-actif)
 * - Met en valeur l'étape dans la liste latérale et déclenche un défilement automatique
 * - Anime le déplacement de caméra (map.flyTo) vers les coordonnées de l'étape
 * - Ouvre la bulle popup d'information historique
 * 
 * @param {number} index - Index numérique de l'étape (0 correspond à l'étape 1)
 */
function focusSurEtape(index) {
    if (!marqueursActuels[index] || !personnageActifId) return;

    etapeActiveIndex = index;
    const { marker, coords } = marqueursActuels[index];
    const personne = dataPersonnes[personnageActifId];

    // 1. Mise en valeur visuelle du marqueur sélectionné sur la carte
    marqueursActuels.forEach((item, i) => {
        item.marker.setIcon(creerIconeMarqueur(personne.color, i + 1, i === index));
    });

    // 2. Mise en surbrillance de la carte d'étape dans la liste
    mettreEnValeurEtapeDansListe(index);

    // 3. Vol de caméra animé vers le lieu historique (zoom niveau 15)
    map.flyTo(coords, 15, {
        duration: 0.8
    });

    // 4. Ouverture automatique du popup après l'atterrissage de la caméra
    setTimeout(() => {
        marker.openPopup();
    }, 850);

    // Sur smartphone, replie le tiroir pour laisser la vue sur le monument
    if (window.innerWidth <= 768) {
        fermerMenuMobile();
    }
}

/**
 * Met en valeur la carte d'étape correspondante dans la liste du volet latéral
 * et opère un défilement automatique pour l'amener dans le champ de vision.
 * 
 * @param {number} index - Index numérique de l'étape à surligner
 */
function mettreEnValeurEtapeDansListe(index) {
    // 1. Basculement de la classe CSS 'active' sur la carte sélectionnée
    const cartes = document.querySelectorAll('.etape-card');
    cartes.forEach((carte, i) => {
        carte.classList.toggle('active', i === index);
    });

    // 2. Défilement automatique fluide vers la carte active
    const carteActive = document.querySelector(`.etape-card[data-index="${index}"]`);
    if (carteActive) {
        carteActive.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ==========================================================================
// 11. MOTEUR D'ITINÉRAIRE ROUTIER RÉEL & MULTI-ROUTES
// ==========================================================================

/**
 * Modifie le mode de déplacement urbain actif (À pied ou À vélo) :
 * - Met à jour l'apparence des boutons de sélection
 * - Recalcule instantanément les estimations de temps et de distance
 * 
 * @param {'foot'|'bike'} mode - Mode de transport : 'foot' (marche piétonne) ou 'bike' (cyclable)
 */
function changerModeTransport(mode) {
    modeTransportActuel = mode;

    // 1. Synchronisation visuelle des boutons pilules (classe 'active')
    document.getElementById('mode-foot')?.classList.toggle('active', mode === 'foot');
    document.getElementById('mode-bike')?.classList.toggle('active', mode === 'bike');

    // 2. Actualisation des temps de parcours
    if (routesAlternativesRecues && routesAlternativesRecues.length > 0) {
        actualiserAffichageToutesRoutes();
    } else if (personnageActifId && dataPersonnes[personnageActifId]) {
        calculerEtAfficherItineraire();
    }
}

/**
 * Calcule la durée réaliste de déplacement selon la distance routière et le mode choisi :
 * - Mode 'foot' (À pied) : vitesse moyenne de 4.5 km/h (adaptée aux ruelles et dénivelés de Lyon)
 * - Mode 'bike' (À vélo) : vitesse moyenne de 15.0 km/h (réseau cyclable lyonnais et feux urbains)
 * 
 * @param {number} distanceMetres - Distance totale de l'itinéraire mesurée en mètres
 * @param {'foot'|'bike'} mode - Mode de locomotion ('foot' ou 'bike')
 * @returns {{ distKm: string, dureeTexte: string, totalMinutes: number }} Objet avec distance formatée, durée textuelle et total de minutes
 */
function calculerDureeSelonMode(distanceMetres, mode) {
    // Vitesse moyenne en km/h
    const vitesseKmh = mode === 'bike' ? 15.0 : 4.5;
    // Conversion en kilomètres
    const distKm = distanceMetres / 1000;
    // Temps théorique en heures
    const heures = distKm / vitesseKmh;
    // Durée arrondie en minutes (minimum 1 minute)
    const totalMinutes = Math.max(1, Math.round(heures * 60));
    // Extraction des heures et minutes pour affichage lisible
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
 * Alimente dynamiquement le menu déroulant de sélection des tronçons de route :
 * - Option globale : parcours complet (toutes les étapes consécutives)
 * - Options segmentées : étape par étape (ex: Étape 1 ➔ Étape 2)
 * 
 * @param {Object} personne - Fiche historique du résistant contenant sa liste d'étapes
 */
function peuplerSelectTrajets(personne) {
    const select = document.getElementById('select-itineraire-trajet');
    if (!select || !personne || !personne.etapes) return;

    select.innerHTML = ''; // Réinitialisation des options

    // 1. Option Parcours complet (Toutes les étapes)
    const optAll = document.createElement('option');
    optAll.value = 'all';
    optAll.textContent = `🏁 Parcours complet (Toutes les étapes : 1 à ${personne.etapes.length})`;
    select.appendChild(optAll);

    // 2. Options détaillées tronçon par tronçon (Étape i -> Étape i+1)
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
 * Extrait la liste des coordonnées géographiques correspondant au trajet actuellement sélectionné.
 * 
 * @param {Object} personne - Fiche historique du résistant avec étapes
 * @returns {Array<[number, number]>} Tableau de coordonnées géographiques [[latitude, longitude], ...]
 */
function obtenirCoordonneesTrajetActif(personne) {
    if (!personne || !personne.etapes || personne.etapes.length === 0) return [];

    // Si le parcours complet est demandé, extrait toutes les étapes
    if (trajetSelectionne === 'all') {
        return personne.etapes.map(e => e.coords);
    }

    // Si un tronçon spécifique est sélectionné (format "0-1", "1-2")
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
 * Gestionnaire d'événement déclenché lors d'un changement de sélection dans la liste des trajets.
 * 
 * @param {string} valeur - Valeur choisie dans le menu déroulant ('all' ou 'i-j')
 */
function changerTrajetSelectionne(valeur) {
    trajetSelectionne = valeur;
    varianteActiveIndex = 0; // Réinitialise sur la proposition principale (la plus rapide)
    calculerEtAfficherItineraire();
}

/**
 * Active ou désactive l'affichage du tracé d'itinéraire sur la carte Leaflet
 * via l'interrupteur switch On/Off de l'en-tête de boîte.
 */
function basculerVisibiliteItineraire() {
    const toggle = document.getElementById('toggle-itineraire-actif');
    const label = document.getElementById('itineraire-toggle-label');
    if (!toggle) return;

    itineraireEstVisible = toggle.checked;

    // Mise à jour de l'étiquette descriptive
    if (label) {
        label.textContent = itineraireEstVisible ? 'Tracé actif' : 'Désactivé';
        label.classList.toggle('active', itineraireEstVisible);
    }

    if (!itineraireEstVisible) {
        // Retrait immédiat de la couche routière de la carte Leaflet
        if (coucheLigneItineraire && map) {
            map.removeLayer(coucheLigneItineraire);
            coucheLigneItineraire = null;
        }
    } else {
        // Réaffichage immédiat de la route sélectionnée
        if (routesAlternativesRecues && routesAlternativesRecues.length > 0 && dataPersonnes[personnageActifId]) {
            tracerLigneItineraireSurCarte(routesAlternativesRecues, varianteActiveIndex, dataPersonnes[personnageActifId].color);
        } else {
            calculerEtAfficherItineraire();
        }
    }
}

/**
 * Réduit (minimise) ou déploie la boîte de contrôle de navigation GPS :
 * - Bascule la classe CSS '.minimized' sur le conteneur #itineraire-box
 * - Génère un badge compact de résumé (ex: 🚲 4.2 km • 17 min) lorsque la boîte est repliée
 */
function toggleMinimiserItineraire() {
    const box = document.getElementById('itineraire-box');
    const miniSummary = document.getElementById('itineraire-mini-summary');
    if (!box) return;

    const estMinimise = box.classList.toggle('minimized');

    if (miniSummary) {
        if (estMinimise) {
            // Affichage du résumé compact sur la ligne d'en-tête
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
            // Masque le résumé lorsque la boîte est déployée
            miniSummary.style.display = 'none';
        }
    }
}

/**
 * Met à jour le texte du résumé compact si la boîte GPS est actuellement repliée.
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
 * Recalcule et actualise les durées estimées de l'ensemble des propositions d'itinéraires
 * lors d'un changement de mode de locomotion (À pied ⟷ À vélo).
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
 * Construit dynamiquement les fiches interactives des 3 itinéraires proposés (style Google Maps) :
 * Chaque fiche présente :
 * - Le nom de l'itinéraire (ex: "Itinéraire 1 : Le plus rapide")
 * - Un badge "Recommandé" pour le trajet optimal
 * - La description du parcours (axes centraux, quais de Saône ou berges du Rhône)
 * - La distance en kilomètres et la durée estimée selon le mode actif
 */
function afficherCartesPropositions() {
    const container = document.getElementById('itineraire-propositions-list');
    if (!container) return;

    container.innerHTML = ''; // Nettoyage de la liste avant réinsertion

    // Parcourt les variantes calculées pour créer chaque carte
    routesAlternativesRecues.forEach((r, idx) => {
        const estActif = idx === varianteActiveIndex;
        const card = document.createElement('div');
        card.className = `itineraire-proposition-card ${estActif ? 'active' : ''}`;
        card.title = `Cliquer pour choisir ${r.nom}`;
        // Au clic sur la carte, active la variante correspondante
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
 * Sélectionne l'une des propositions d'itinéraire (0, 1 ou 2) :
 * - Active la carte correspondante dans l'interface latérale
 * - Met à jour les compteurs globaux (distance et durée)
 * - Redessine la ligne active sur la carte Leaflet avec halo lumineux
 * 
 * @param {number} index - Numéro d'index de la route choisie (0 = Rapide, 1 = Saône, 2 = Rhône)
 */
function selectionnerVarianteRoute(index) {
    if (!routesAlternativesRecues || !routesAlternativesRecues[index]) return;
    varianteActiveIndex = index;

    // 1. Mise à jour de la classe CSS active sur toutes les cartes
    document.querySelectorAll('.itineraire-proposition-card').forEach((card, idx) => {
        card.classList.toggle('active', idx === index);
    });

    // 2. Actualisation des indicateurs de la boîte
    const route = routesAlternativesRecues[index];
    const distEl = document.getElementById('itineraire-distance');
    const dureeEl = document.getElementById('itineraire-duree');
    if (distEl) distEl.textContent = `${route.distKm} km`;
    if (dureeEl) dureeEl.textContent = `~${route.dureeTexte}`;
    actualiserMiniSummarySiMinimise();

    // 3. Dessin sur la carte Leaflet si le tracé est actuellement visible
    if (itineraireEstVisible && dataPersonnes[personnageActifId]) {
        tracerLigneItineraireSurCarte(routesAlternativesRecues, index, dataPersonnes[personnageActifId].color);
    }
}

/**
 * Calcule et propose simultanément 3 itinéraires routiers réels suivant la voirie de Lyon :
 * 1. "Itinéraire 1 : Le plus rapide" (trajet direct par les grands axes urbains)
 * 2. "Itinéraire 2 : Quais de Saône" (voie douce longeant les berges de la Saône)
 * 3. "Itinéraire 3 : Berges du Rhône" (voie aérée et cyclable longeant le Rhône)
 * 
 * Fonctionnement technique :
 * - Fonction asynchrone (async/await) garantissant une interface fluide sans figer le navigateur
 * - Interroge l'API Open Source OSRM (OpenStreetMap)
 * - AbortController avec temporisation de 6.5s en cas de latence réseau
 * - Promise.allSettled pour exécuter les 3 variantes en parallèle
 * - Fallback géodésique automatique en cas de panne réseau ou de consultation hors-ligne
 */
async function calculerEtAfficherItineraire() {
    if (!personnageActifId || !dataPersonnes[personnageActifId]) return;

    const personne = dataPersonnes[personnageActifId];
    const btn = document.getElementById('btn-calculer-itineraire');
    const distEl = document.getElementById('itineraire-distance');
    const dureeEl = document.getElementById('itineraire-duree');

    // 1. Indication visuelle de chargement sur le bouton d'action
    if (btn) {
        btn.classList.add('loading');
        btn.innerHTML = '⏳ Recherche des itinéraires...';
    }

    // 2. Récupération des points de passage selon le trajet choisi (parcours complet ou tronçon)
    const baseCoords = obtenirCoordonneesTrajetActif(personne);
    if (!baseCoords || baseCoords.length < 2) {
        if (btn) btn.classList.remove('loading');
        return;
    }

    // 3. Préparation des 3 variantes d'itinéraires urbains
    // Variante 1 : Directe
    const planDirect = {
        nom: "Itinéraire 1 : Le plus rapide",
        desc: "Trajet le plus direct par les axes centraux",
        estRecommande: true,
        pts: baseCoords
    };

    // Variante 2 : Quais de Saône
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

    // Variante 3 : Berges du Rhône
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
     * Envoie une requête réseau HTTP à l'API OSRM pour un profil d'itinéraire donné :
     * 
     * @param {{ nom: string, desc: string, estRecommande: boolean, pts: Array<[number, number]> }} plan - Configuration de la route
     * @returns {Promise<Object>} Promesse résolue avec géométrie GeoJSON, distance et durée
     */
    async function fetchOsrmPlan(plan) {
        // Format OSRM : longitude,latitude séparées par des points-virgules
        const coordsStr = plan.pts.map(c => `${c[1]},${c[0]}`).join(';');
        const url = `https://router.project-osrm.org/route/v1/driving/${coordsStr}?overview=full&geometries=geojson`;

        // Interruption automatique après 6,5 secondes en cas de connexion lente
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6500);

        try {
            const resp = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const data = await resp.json();
            if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) throw new Error('Pas de route');

            const r = data.routes[0];
            // Conversion GeoJSON [longitude, latitude] vers coordonnées Leaflet [latitude, longitude]
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
        // 4. Exécution parallèle des 3 requêtes OSRM
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

            // 5. Génération des cartes de choix de routes
            afficherCartesPropositions();

            // 6. Mise à jour des statistiques de l'itinéraire sélectionné
            const activeRoute = routesValides[0];
            if (distEl) distEl.textContent = `${activeRoute.distKm} km`;
            if (dureeEl) dureeEl.textContent = `~${activeRoute.dureeTexte}`;

            // 7. Tracé sur la carte Leaflet si la visibilité est activée
            if (itineraireEstVisible) {
                tracerLigneItineraireSurCarte(routesValides, 0, personne.color);
            }

            // 8. Notification visuelle de confirmation sur le bouton
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
        // En cas de panne de serveur ou d'absence d'internet : bascule sur le calcul géodésique
        console.warn('Routage OSRM indisponible ou hors-ligne, utilisation du tracé historique estimé :', err);
        appliquerFallbackItineraire(personne);
    } finally {
        if (btn) btn.classList.remove('loading');
    }
}

/**
/**
 * Dessine sur la carte Leaflet la route active sélectionnée et les routes alternatives :
 * - Itinéraires alternatifs inactifs : polylignes grises tiretées discrètes, directement
 *   cliquables sur la carte Leaflet pour permuter d'itinéraire
 * - Itinéraire principal actif : tracé triple couche combinant une ombre sombre pour le contraste,
 *   un halo lumineux de couleur patrimoniale et un trait plein net
 * - Recentrage automatique de la vue cartographique sur l'emprise du tracé
 * 
 * @param {Array<Object>} routes - Tableau des objets routes issus du calcul OSRM ou du repli
 * @param {number} activeIndex - Index numérique de la route à mettre en surbrillance (0, 1 ou 2)
 * @param {string} couleur - Code hexadécimal de couleur associé au personnage actif
 */
function tracerLigneItineraireSurCarte(routes, activeIndex, couleur) {
    if (!map) return;

    // 1. Suppression du calque d'itinéraire précédent pour éviter toute superposition
    if (coucheLigneItineraire) {
        map.removeLayer(coucheLigneItineraire);
        coucheLigneItineraire = null;
    }

    if (!routes || routes.length === 0) return;

    const groupeLigne = L.layerGroup();

    // 2. Traçage des routes secondaires inactives (lignes grises tiretées cliquables)
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

            // Clic direct sur une route alternative sur la carte : la sélectionne immédiatement
            ligneInactive.on('click', () => {
                selectionnerVarianteRoute(idx);
            });

            groupeLigne.addLayer(ligneInactive);
        }
    });

    // 3. Traçage de l'itinéraire sélectionné avec effet visuel triple épaisseur
    const activeRoute = routes[activeIndex] || routes[0];
    if (activeRoute && activeRoute.latLngs && activeRoute.latLngs.length > 0) {
        // A. Ombre de contraste sombre (largeur 9px)
        const bordureFond = L.polyline(activeRoute.latLngs, {
            color: '#080a0f',
            weight: 9,
            opacity: 0.85,
            lineCap: 'round',
            lineJoin: 'round'
        });
        groupeLigne.addLayer(bordureFond);

        // B. Halo lumineux coloré (largeur 7px)
        const aura = L.polyline(activeRoute.latLngs, {
            color: couleur,
            weight: 7,
            opacity: 0.45,
            lineCap: 'round',
            lineJoin: 'round'
        });
        groupeLigne.addLayer(aura);

        // C. Trait central plein et net (largeur 4.5px)
        const lignePleine = L.polyline(activeRoute.latLngs, {
            color: couleur,
            weight: 4.5,
            opacity: 1,
            lineCap: 'round',
            lineJoin: 'round'
        });
        groupeLigne.addLayer(lignePleine);

        // 4. Recentrage fluide sur l'itinéraire principal
        map.fitBounds(lignePleine.getBounds(), {
            padding: [60, 60],
            maxZoom: 15
        });
    }

    groupeLigne.addTo(map);
    coucheLigneItineraire = groupeLigne;
}

/**
 * Lance le trajet dans l'application GPS native ou installée sur l'appareil de l'utilisateur :
 * - Sur appareils Apple (iOS / macOS) : génère une URL universelle pour Apple Maps (Plans)
 * - Sur Android et ordinateurs PC : génère une URL universelle pour Google Maps
 * - Intègre le point de départ, les étapes intermédiaires (waypoints) et le mode de déplacement (marche ou vélo)
 */
function ouvrirDansAppGPS() {
    if (!personnageActifId || !dataPersonnes[personnageActifId]) return;

    // 1. Récupération des points de coordonnées du trajet actif
    const activeRoute = (routesAlternativesRecues && routesAlternativesRecues[varianteActiveIndex]) 
        ? routesAlternativesRecues[varianteActiveIndex] 
        : null;

    let coords = activeRoute ? activeRoute.pointsWaypoints : obtenirCoordonneesTrajetActif(dataPersonnes[personnageActifId]);
    if (!coords || coords.length < 2) return;

    const origin = coords[0];                         // Premier point (départ)
    const dest = coords[coords.length - 1];           // Dernier point (arrivée)
    const intermediates = coords.slice(1, -1);        // Points intermédiaires de passage

    // 2. Détection de l'environnement matériel Apple (iPhone, iPad, Mac tactile)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    let gpsUrl = '';
    const travelmode = modeTransportActuel === 'bike' ? 'bicycling' : 'walking';

    // 3. Construction de l'URL spécifique au système d'exploitation
    if (isIOS) {
        // Paramètres Apple Maps : dirflg=w (piéton), dirflg=b (vélo)
        const dirflg = modeTransportActuel === 'bike' ? 'b' : 'w';
        let daddr = `${dest[0]},${dest[1]}`;
        if (intermediates.length > 0) {
            daddr = intermediates.map(c => `${c[0]},${c[1]}`).join('+to:') + '+to:' + daddr;
        }
        gpsUrl = `https://maps.apple.com/?saddr=${origin[0]},${origin[1]}&daddr=${daddr}&dirflg=${dirflg}`;
    } else {
        // Paramètres Google Maps
        let waypointsQuery = '';
        if (intermediates.length > 0) {
            const waypointsStr = intermediates.map(c => `${c[0]},${c[1]}`).join('|');
            waypointsQuery = `&waypoints=${encodeURIComponent(waypointsStr)}`;
        }
        gpsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin[0]},${origin[1]}&destination=${dest[0]},${dest[1]}${waypointsQuery}&travelmode=${travelmode}`;
    }

    // 4. Ouverture externe dans un nouvel onglet ou déclenchement de l'application native
    window.open(gpsUrl, '_blank');
}

/**
 * Calcul de secours (Fallback) activé lorsque le serveur OSRM est inaccessible ou sans connexion internet :
 * - Calcule la distance géodésique orthodromique cumulée entre les étapes (Haversine)
 * - Multiplie par un coefficient de détour urbain de 1.3
 * - Construit une proposition de substitution pour ne jamais laisser l'utilisateur bloqué
 * 
 * @param {Object} personne - Fiche historique du résistant concerné
 */
function appliquerFallbackItineraire(personne) {
    const distEl = document.getElementById('itineraire-distance');
    const dureeEl = document.getElementById('itineraire-duree');
    const btn = document.getElementById('btn-calculer-itineraire');

    const coords = obtenirCoordonneesTrajetActif(personne);
    if (!coords || coords.length < 2) return;

    // Somme des distances géodésiques avec facteur de correction voirie (1300 mètres par km à vol d'oiseau)
    let distMeters = 0;
    for (let i = 0; i < coords.length - 1; i++) {
        const c1 = coords[i];
        const c2 = coords[i + 1];
        distMeters += calculerDistanceHaversine(c1[0], c1[1], c2[0], c2[1]) * 1300;
    }

    const dureeInfo = calculerDureeSelonMode(distMeters, modeTransportActuel);

    if (distEl) distEl.textContent = `${dureeInfo.distKm} km (estimé)`;
    if (dureeEl) dureeEl.textContent = `~${dureeInfo.dureeTexte}`;

    // Création d'une route de repli directe
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
 * Calcule la distance géodésique à la surface de la Terre entre deux coordonnées géographiques :
 * Utilise la formule mathématique de Haversine pour tenir compte de la sphéricité terrestre.
 * 
 * @param {number} lat1 - Latitude du premier point (en degrés décimaux)
 * @param {number} lon1 - Longitude du premier point (en degrés décimaux)
 * @param {number} lat2 - Latitude du second point (en degrés décimaux)
 * @param {number} lon2 - Longitude du second point (en degrés décimaux)
 * @returns {number} Distance en kilomètres
 */
function calculerDistanceHaversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon moyen de la Terre en kilomètres
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
 * Initialise la reconnaissance des gestes tactiles de glissement (Swipe down) sur smartphone :
 * Permet à l'utilisateur de fermer intuitivement le tiroir inférieur en le tirant vers le bas,
 * à la manière des applications mobiles natives (Google Maps, Citymapper).
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

    // 1. Début du toucher sur écran tactile (touchstart)
    sidebar.addEventListener('touchstart', (e) => {
        if (window.innerWidth >= 768) return; // Désactivé sur ordinateur (PC)
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

        // Autorise le glissement si contact sur la poignée, l'en-tête, ou en haut du scroll
        dragInitiated = isHandle || isHeader || (sidebar.scrollTop <= 2);
    }, { passive: true });

    // 2. Déplacement du doigt vers le bas (touchmove)
    sidebar.addEventListener('touchmove', (e) => {
        if (window.innerWidth >= 768 || !dragInitiated) return;
        if (e.touches.length !== 1) return;

        const touch = e.touches[0];
        const deltaY = touch.clientY - touchStartY;
        const deltaX = touch.clientX - touchStartX;

        // Vérifie que le glissement est descendant (deltaY > 0) et principalement vertical
        if (deltaY > 0 && Math.abs(deltaY) > Math.abs(deltaX)) {
            if (sidebar.scrollTop > 2 && !isDragging) {
                return;
            }

            isDragging = true;
            currentDeltaY = deltaY;

            if (e.cancelable) e.preventDefault();

            // Translation temps réel du tiroir suivant le doigt
            sidebar.style.transition = 'none';
            sidebar.style.transform = `translateY(${deltaY}px)`;

            // Estompe le voile sombre proportionnellement au mouvement
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
        const velocity = currentDeltaY / elapsedTime; // Vitesse de déplacement

        // Ferme le tiroir si tiré de plus de 50px ou si geste rapide vers le bas
        if (currentDeltaY > 50 || (currentDeltaY > 25 && velocity > 0.35)) {
            fermerMenuMobile();
        } else {
            sidebar.style.transform = ''; // Effet de ressort rappelant le tiroir
        }

        currentDeltaY = 0;
    };

    sidebar.addEventListener('touchend', finGlissement, { passive: true });
    sidebar.addEventListener('touchcancel', finGlissement, { passive: true });

    // Raccourci accessibilité : la touche Échap referme le tiroir et les fenêtres modales
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
window.dataPersonnes = dataPersonnes;
window.dataLieuxJustice = dataLieuxJustice;
window.estVoletFerme = estVoletFerme;
window.assurerVoletOuvert = assurerVoletOuvert;
