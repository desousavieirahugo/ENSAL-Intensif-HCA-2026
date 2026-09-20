/**
 * Moteur interactif cartographique — Parcours de la Résistance à Lyon (1940-1944)
 * Architecture modulaire : données patrimoniales, couches Leaflet, GPS et interface.
 */

// =============================================================================
// PARTIE 1 : DONNÉES HISTORIQUES (PERSONNAGES & LIEUX DE JUSTICE)
// =============================================================================

const dataPersonnes = {
    // Parcours Jean Moulin
    "jean_moulin": {
        nom: "Jean Moulin",
        titre: "« Rex » • « Max » — Délégué du Général de Gaulle",
        role: "Unificateur des mouvements de la Résistance (M.U.R.)",
        img: "images/jean_moulin.jpg",
        color: "#8b4513",
        quote: "« Au premier combat venu, le peuple français retrouvera sa grandeur et sa liberté. »",
        bio: "Préfet d'Eure-et-Loir révoqué par le régime de Vichy en 1940, Jean Moulin gagne Londres en 1941. Chargé par le général de Gaulle d'unifier la Résistance intérieure divisée, il choisit Lyon comme capitale clandestine de sa mission. Il y fonde les Mouvements Unis de la Résistance (M.U.R.) et orchestre la création du Conseil National de la Résistance (CNR), avant son arrestation dramatique à Caluire le 21 juin 1943.",
        etapes: [
            {
                coords: [45.7578, 4.8320],
                titre: "Place Bellecour & Galeries",
                date: "1942 - 1943",
                lieu: "Presqu'île, Lyon 2e",
                desc: "Cœur battant des liaisons clandestines lyonnaises. Jean Moulin y tenait des boîtes aux lettres discrètes et des rendez-vous sous la statue équestre ou sous les arcades.",
                sources: ["Archives nationales", "Musée de l'Ordre de la Libération"]
            },
            {
                coords: [45.7705, 4.8315],
                titre: "Traboules des Pentes de la Croix-Rousse",
                date: "Printemps 1943",
                lieu: "Pentes de la Croix-Rousse, Lyon 1er",
                desc: "Labyrinthe séculaire de cours et d'allées couvertes, essentiel pour semer les filatures de la Gestapo et acheminer le matériel d'imprimerie clandestine des journaux Combat et Franc-Tireur.",
                sources: ["Centre d'Histoire de la Résistance et de la Déportation (CHRD Lyon)", "Fonds Franc-Tireur"]
            },
            {
                coords: [45.7950, 4.8465],
                titre: "Maison du Dr Dugoujon à Caluire",
                date: "21 juin 1943",
                lieu: "Caluire-et-Cuire",
                desc: "Lieu de la réunion secrète des responsables de l'Armée Secrète. Barbie et la Gestapo y font irruption, capturant Jean Moulin et sept autres chefs de la Résistance.",
                sources: ["Mémorial de Caluire", "Archives départementales du Rhône"]
            },
            {
                coords: [45.7508, 4.8625],
                titre: "Prison Militaire de Montluc",
                date: "Juin - Juillet 1943",
                lieu: "Rue Jeanne Hachette, Lyon 3e",
                desc: "Incarcération dans la cellule 130 de Montluc. Jean Moulin y subit les tortures impitoyables de Klaus Barbie sans jamais trahir le moindre secret d'État avant son transfert fatal vers l'Allemagne.",
                sources: ["Mémorial National de la Prison de Montluc", "Archives du Ministère des Armées"]
            }
        ],
        traceline: [
            [45.7578, 4.8320],
            [45.7705, 4.8315],
            [45.7950, 4.8465],
            [45.7508, 4.8625]
        ]
    },

    // Parcours Klaus Barbie (étapes de guerre et événements d'après-guerre)
    "klaus_barbie": {
        nom: "Klaus Barbie",
        titre: "« Le Boucher de Lyon » — Capitaine SS (Hauptsturmführer)",
        role: "Chef de la section IV (Gestapo & Sipo-SD) à Lyon",
        img: "images/klaus_barbie.jpg",
        color: "#8b4513",
        quote: "« Quand je serai devant le trône de Dieu, je serai jugé innocent. » — Déclaration de Klaus Barbie à son procès en 1987",
        bio: "Arrivé à Lyon en novembre 1942, Klaus Barbie dirige avec une violence méthodique la traque impitoyable des résistants et la persécution antisémite. Responsable direct de la mort, de la torture et de la déportation de milliers d'innocents, il s'enfuit en Amérique du Sud après 1945. Retrouvé en Bolivie par les époux Klarsfeld, il est extradé à Lyon en 1983 pour le premier grand procès pour crimes contre l'humanité tenu en France.",
        etapes: [
            {
                coords: [45.7495, 4.8260],
                titre: "Hôtel Terminus — 1er QG de la Gestapo",
                date: "Novembre 1942 - Printemps 1943",
                lieu: "12 cours de Verdun, Lyon 2e",
                desc: "Dès l'occupation de la zone Sud, la Gestapo réquisitionne cet hôtel face à la gare de Perrache pour y établir ses premiers bureaux et cellules d'interrogatoire.",
                source: "Fonds d'archives CHRD Lyon"
            },
            {
                coords: [45.7687, 4.8336],
                titre: "Rafle de la rue Sainte-Catherine (UGIF)",
                date: "9 février 1943",
                lieu: "12 rue Sainte-Catherine, Lyon 1er",
                desc: "Coup de filet ordonné par Barbie dans les locaux de l'Union Générale des Israélites de France : 86 personnes arrêtées et déportées vers Auschwitz et Sobibor.",
                source: "Archives du Mémorial de la Shoah & Association des FILS"
            },
            {
                coords: [45.7472, 4.8398],
                titre: "École de Santé Militaire — Siège de la torture",
                date: "Printemps 1943 - Août 1944",
                lieu: "14 avenue Berthelot, Lyon 7e (Actuel CHRD)",
                desc: "Quartier général principal de la Gestapo et de la section IV. Les sous-sols abritaient les salles d'interrogatoire où Barbie torturait personnellement les résistants.",
                source: "Centre d'Histoire de la Résistance et de la Déportation"
            },
            {
                coords: [45.7950, 4.8465],
                titre: "Raid de Caluire — Capture de Jean Moulin",
                date: "21 juin 1943",
                lieu: "Maison du Dr Dugoujon, Caluire-et-Cuire",
                desc: "Intervention armée menée en personne par Barbie suite à une dénonciation, aboutissant à la capture du délégué général de la France Libre et des cadres de l'Armée Secrète.",
                source: "Archives départementales du Rhône (dossier d'instruction procès Barbie)"
            },
            {
                coords: [45.7508, 4.8625],
                titre: "Prison Militaire de Montluc — Internements de masse",
                date: "1943 - 1944",
                lieu: "4 rue Jeanne-Hachette, Lyon 3e",
                desc: "Sous tutelle nazie, la prison voit transiter plus de 10 000 hommes, femmes et enfants dans des conditions d'entassement inhumaines avant leur exécution ou les camps de la mort.",
                source: "Mémorial National de la Prison de Montluc"
            },
            {
                coords: [45.7478, 4.8395],
                titre: "Ordre de la rafle d'Izieu (Télégramme Gestapo)",
                date: "6 avril 1944",
                lieu: "Avenue Berthelot / Télétype Gestapo Lyon",
                desc: "Barbie ordonne et valide le télétype expédié aux autorités de sûreté rapportant la rafle de 44 enfants juifs et de leurs 7 éducateurs réfugiés dans la colonie d'Izieu (Ain).",
                source: "Pièce à conviction n°1 du Procès Barbie (Archives nationales)"
            },
            {
                coords: [45.6968, 4.7915],
                titre: "Massacre du Fort de Côte-Lorette",
                date: "20 août 1944",
                lieu: "Fort de Côte-Lorette, Saint-Genis-Laval",
                desc: "À quelques jours de la Libération de Lyon, Barbie et la police allemande extraient 120 détenus de Montluc pour les fusiller sommairement et incendier la maison du gardien.",
                source: "Mémorial du Fort de Côte-Lorette & Ville de Saint-Genis-Laval"
            },
            {
                coords: [45.7510, 4.8628],
                titre: "Arrestation en Bolivie (La Paz) & Extradition",
                date: "25 janvier - 5 février 1983",
                lieu: "La Paz (Bolivie) ➔ Écrou à Montluc (Lyon)",
                desc: "Démasqué sous le faux nom de Klaus Altmann par Serge et Beate Klarsfeld, Barbie est expulsé par la Bolivie vers la France et réincarcéré symboliquement à Montluc.",
                source: "Archives audiovisuelles de la Justice & INA"
            },
            {
                coords: [45.7617, 4.8278],
                titre: "Palais des 24 Colonnes — Procès historique",
                date: "11 mai - 4 juillet 1987",
                lieu: "Quai Romain-Rolland, Lyon 5e",
                desc: "Premier procès en France pour crimes contre l'humanité. Reconnue coupable de la déportation de centaines de Juifs et de résistants, la cour condamne Barbie à la réclusion criminelle à perpétuité.",
                source: "Cour d'Assises du Rhône & Archives nationales"
            },
            {
                coords: [45.7480, 4.8282],
                titre: "Prison Saint-Joseph — Fin de vie en détention",
                date: "25 septembre 1991",
                lieu: "Perrache, Lyon 2e",
                desc: "Incarcéré dans le quartier des détenus sous haute surveillance de la prison Saint-Joseph de Lyon, Barbie y meurt d'un cancer à l'âge de 77 ans.",
                source: "Administration pénitentiaire & État civil de Lyon"
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

    // Parcours Lucie Aubrac
    "lucie_aubrac": {
        nom: "Lucie Aubrac",
        titre: "Co-fondatrice du mouvement Libération-Sud",
        role: "Héroïne de la Résistance & Organisatrice d'évasions",
        img: "images/lucie_aubrac.jpg",
        color: "#8b4513",
        quote: "« Le verbe résister doit toujours se conjuguer au présent. »",
        bio: "Professeure agrégée d'histoire et militante antifasciste, Lucie Samuel (dite Aubrac) s'engage immédiatement dans la clandestinité dès 1940. Avec Emmanuel d'Astier de la Vigerie et son mari Raymond Aubrac, elle cofonde le mouvement Libération-Sud à Lyon. Elle accomplit des actes de bravoure inouïs pour délivrer son compagnon et ses camarades arrêtés par la police française et la Gestapo.",
        etapes: [
            {
                coords: [45.7690, 4.8460],
                titre: "Lycée Edgar Quinet (Lycée Édouard Herriot)",
                date: "1941 - 1943",
                lieu: "Boulevard des Belges, Lyon 6e",
                desc: "Lucie y enseigne l'histoire et la géographie tout en utilisant sa position pour recruter de jeunes résistants et cacher du matériel de propagande clandestine.",
                sources: ["Fonds CHRD Lyon", "Témoignages des réseaux Libération-Sud"]
            },
            {
                coords: [45.7485, 4.8270],
                titre: "Prison Saint-Paul — Premier sauvetage",
                date: "Mai 1943",
                lieu: "Quartier Perrache, Lyon 2e",
                desc: "Raymond Aubrac est arrêté par la police de Vichy. Faisant preuve d'un sang-froid extraordinaire, Lucie obtient un parloir et organise sa libération sous caution.",
                sources: ["Mémoires de Lucie Aubrac, « Ils partiront dans l'ivresse » (Seuil)"]
            },
            {
                coords: [45.7592, 4.8217],
                titre: "Coup de main du Bd des Hirondelles (Fourvière)",
                date: "21 octobre 1943",
                lieu: "Fourvière / Montée du Chemin-Neuf, Lyon 5e",
                desc: "Attaque armée spectaculaire d'un fourgon cellulaire allemand transportant Raymond Aubrac et 13 autres résistants condamnés à mort. Tous sont libérés sains et saufs.",
                sources: ["Archives de la Résistance intérieure (ANACR)", "CHRD Lyon"]
            }
        ],
        traceline: [
            [45.7690, 4.8460],
            [45.7485, 4.8270],
            [45.7592, 4.8217]
        ]
    }
};

// Rétrocompatibilité d'alias
dataPersonnes["chaban_delmas"] = dataPersonnes["klaus_barbie"];

// Lieux de Justice, de Répression et Carcéraux (1940-1944) - Données documentaires
const dataLieuxJustice = {
    juridiques: {
        nomCategorie: "Palais de Justice",
        color: "#7c3aed",
        lieux: [
            {
                nom: "Le Palais des 24 colonnes",
                coords: [45.76189589270587, 4.828363008769444],
                adresse: "1 Rue du Palais de Justice, 69005 Lyon",
                anneeDebut: 1847,
                anneeFin: null,
                dates: "1847 – Présent",
                role: "Architecte L.P. Baltard. Chef-d'œuvre néoclassique, siège de la cour d'assises du Rhône et cadre du procès historique de Klaus Barbie en 1987.",
                source: "Ministère de la Justice & Barreau de Lyon"
            },
            {
                nom: "Tribunal judiciaire",
                coords: [45.76050201468607, 4.847978429714767],
                adresse: "67 Rue Servient, 69003 Lyon",
                anneeDebut: 1995,
                anneeFin: null,
                dates: "1995 – Présent",
                role: "Architecte Yves Lion. Cité judiciaire moderne du quartier de la Part-Dieu.",
                source: "Ministère de la Justice"
            },
            {
                nom: "Tribunal militaire de Montluc",
                coords: [45.75040300306873, 4.860886715861802],
                adresse: "1 Rue du Général Mouton-Duvernet, 69003 Lyon",
                anneeDebut: 1921,
                anneeFin: 2009,
                dates: "1921 – 2009",
                role: "Architecte inconnu. Juridiction militaire d'exception ayant prononcé condamnations et sanctions sous les conflits du XXe siècle.",
                source: "Archives militaires"
            },
            {
                nom: "Tribunal administratif",
                coords: [45.76278161175385, 4.847875218440093],
                adresse: "184 Rue Duguesclin, 69003 Lyon",
                anneeDebut: 1974,
                anneeFin: null,
                dates: "1974 – Présent",
                role: "Architectes Cathelin, Lapernon, Boudeix. Juridiction administrative du Rhône.",
                source: "Conseil d'État"
            },
            {
                nom: "Tribunal de proximité",
                coords: [45.76447172095773, 4.883243473722828],
                adresse: "3 Rue Dr Fleury Pierre Papillon, 69100 Villeurbanne",
                anneeDebut: 2008,
                anneeFin: null,
                dates: "2008 – Présent",
                role: "Juridiction de proximité de l'agglomération lyonnaise.",
                source: "Ministère de la Justice"
            },
            {
                nom: "Greffe du Tribunal de commerce",
                coords: [45.76298613560997, 4.848640967629738],
                adresse: "44 Rue de Bonnel, Rue Servient Entrée 67, 69003 Lyon",
                anneeDebut: 1995,
                anneeFin: null,
                dates: "1995 – Présent",
                role: "Greffe de la juridiction consulaire et commerciale de Lyon.",
                source: "Tribunal de commerce de Lyon"
            },
            {
                nom: "Palais des juridictions locales",
                coords: [45.7610, 4.8490],
                adresse: "Part-Dieu, 69003 Lyon",
                anneeDebut: 1974,
                anneeFin: null,
                dates: "1974 – Présent",
                role: "Édifice dédié aux juridictions locales et administratives.",
                source: "Archives judiciaires"
            },
            {
                nom: "Conseil des Prud'hommes",
                coords: [45.762818563198756, 4.853597951502243],
                adresse: "20 Bd Eugène Deruelle, 69432 Lyon",
                anneeDebut: 1980,
                anneeFin: null,
                dates: "Présent",
                role: "Juridiction du travail et du règlement des litiges professionnels.",
                source: "Conseil de Prud'hommes de Lyon"
            },
            {
                nom: "Palais de justice de Roanne",
                coords: [46.039932567144156, 4.073077886845756],
                adresse: "1 Rue Fontenille, 42300 Roanne",
                anneeDebut: 1600,
                anneeFin: null,
                dates: "XVIe – XVIIIe siècle",
                role: "Édifice judiciaire historique du Roannais.",
                source: "Ministère de la Justice"
            }
        ]
    },
    carceraux: {
        nomCategorie: "Prisons",
        color: "#64748b",
        lieux: [
            {
                nom: "Prison de Montluc",
                coords: [45.750660420617706, 4.861926125808476],
                adresse: "4 Rue Jeanne Hachette, 69003 Lyon",
                anneeDebut: 1921,
                anneeFin: 2009,
                dates: "1921 – 2009",
                role: "Prison militaire tristement célèbre, réquisitionnée par la Gestapo sous Klaus Barbie. Plus de 10 000 internés (Jean Moulin, Marc Bloch, enfants d'Izieu).",
                source: "Mémorial National de la Prison de Montluc"
            },
            {
                nom: "Prison Saint-Paul",
                coords: [45.746655060298856, 4.8264608525043915],
                adresse: "Quartier Perrache, 69002 Lyon",
                anneeDebut: 1853,
                anneeFin: 2009,
                dates: "XIXe siècle – 2009",
                role: "Architectes A.G. Louvier / H. Moncorger. Prison cellulaire départementale où furent incarcérés de nombreux résistants.",
                source: "Archives départementales du Rhône"
            },
            {
                nom: "Prison Saint-Joseph",
                coords: [45.746234645605576, 4.8275878094022495],
                adresse: "Quartier Perrache, 69002 Lyon",
                anneeDebut: 1831,
                anneeFin: 2009,
                dates: "XIXe siècle – 2009",
                role: "Architectes A.G. Louvier / H. Moncorger. Établissement pénitentiaire où Klaus Barbie fut détenu sous haute surveillance jusqu'à sa mort en 1991.",
                source: "Archives départementales du Rhône"
            },
            {
                nom: "Maison d'arrêt Lyon-Corbas",
                coords: [45.67952347912901, 4.931819654289679],
                adresse: "40 Bd des Nations, 69960 Corbas",
                anneeDebut: 2009,
                anneeFin: null,
                dates: "2009 – aujourd'hui",
                role: "Établissement pénitentiaire contemporain moderne remplaçant les prisons historiques de Perrache.",
                source: "Administration pénitentiaire"
            },
            {
                nom: "Tribunal prison de Roanne",
                coords: [46.0399, 4.0731],
                adresse: "Centre historique, 42300 Roanne",
                anneeDebut: 1650,
                anneeFin: 1800,
                dates: "XVIIe – XVIIIe siècle",
                role: "Ancien siège judiciaire et geôles d'Ancien Régime du Roannais.",
                source: "Archives municipales de Roanne"
            },
            {
                nom: "Centre de détention de Roanne",
                coords: [46.054036543808216, 4.100876400827728],
                adresse: "Rue Georges Mandel, 42300 Roanne",
                anneeDebut: 2009,
                anneeFin: null,
                dates: "Contemporain – aujourd'hui",
                role: "Centre de détention moderne de la Loire.",
                source: "Administration pénitentiaire"
            },
            {
                nom: "Maison d'arrêt de Villefranche",
                coords: [45.99772414831627, 4.72540805150315],
                adresse: "260 Rue Lavoisier, 69400 Villefranche-sur-Saône",
                anneeDebut: 1990,
                anneeFin: null,
                dates: "1990 – aujourd'hui",
                role: "Maison d'arrêt départementale du Beaujolais.",
                source: "Administration pénitentiaire"
            }
        ]
    },
    memoire: {
        nomCategorie: "Lieux de mémoire",
        color: "#059669",
        lieux: [
            {
                nom: "CHRD : Centre d'Histoire de la Résistance et de la Déportation",
                coords: [45.74716069447433, 4.835835133868228],
                adresse: "14 Av. Berthelot, 69007 Lyon",
                anneeDebut: 1889,
                anneeFin: null,
                dates: "Bâtiment 1889-1894 / Musée 1992",
                role: "Bâtiment d'Abraham Hirsch (Ancienne École du Service de Santé Militaire), réquisitionné par Klaus Barbie comme QG de la Gestapo, inauguré comme musée mémorial en 1992.",
                source: "CHRD Lyon"
            },
            {
                nom: "L'Île du Souvenir",
                coords: [45.78076542024068, 4.851968229992367],
                adresse: "Parc de la Tête d'Or, 69006 Lyon",
                anneeDebut: 1930,
                anneeFin: null,
                dates: "1930",
                role: "Monument aux morts de Tony Garnier et Jean-Baptiste Larrivé, haut lieu mémorial sur le lac du parc.",
                source: "Ville de Lyon"
            },
            {
                nom: "Mémorial de la Shoah",
                coords: [45.75097628935953, 4.82710851202114],
                adresse: "24 Pl. Carnot, 69002 Lyon",
                anneeDebut: 2025,
                anneeFin: null,
                dates: "2025",
                role: "Mémorial dédié au souvenir des victimes de la Shoah et des convois de déportation partis de Lyon.",
                source: "Association Mémorial de la Shoah"
            },
            {
                nom: "Mémorial Jean Moulin",
                coords: [45.79948950162012, 4.846192917037429],
                adresse: "2 Pl. Jean Gouailhardou, 69300 Caluire-et-Cuire",
                anneeDebut: 1973,
                anneeFin: null,
                dates: "1973 (la statue)",
                role: "Statue et monument mémorial en hommage à Jean Moulin et à ses compagnons arrêtés à Caluire.",
                source: "Ville de Caluire-et-Cuire"
            },
            {
                nom: "Mémorial National de la Prison de Montluc",
                coords: [45.7506680276929, 4.86189622014912],
                adresse: "4 Rue Jeanne Hachette, 69003 Lyon",
                anneeDebut: 2010,
                anneeFin: null,
                dates: "2010 – aujourd'hui",
                role: "Haut lieu de la mémoire nationale (Ministère des Armées), préservant intactes les cellules de détention des résistants.",
                source: "ONaCVG & Ministère des Armées"
            },
            {
                nom: "Crypte des Brotteaux",
                coords: [45.764515549172536, 4.847161704227896],
                adresse: "147 Rue de Créqui, 69006 Lyon",
                anneeDebut: 1795,
                anneeFin: null,
                dates: "1795",
                role: "Chapelle expiatoire et crypte conservant les restes des victimes des massacres révolutionnaires de 1793.",
                source: "Association mémorielle des Brotteaux"
            }
        ]
    },
    execution: {
        nomCategorie: "Lieux d'exécution",
        color: "#dc2626",
        lieux: [
            {
                nom: "Place des Terreaux (Place de la guillotine vers 1700)",
                coords: [45.76763107435983, 4.833462491194966],
                adresse: "Pl. des Terreaux, 69001 Lyon",
                anneeDebut: 1700,
                anneeFin: null,
                dates: "vers 1700 – Révolution",
                role: "Lieu historique des exécutions capitales publiques sous l'Ancien Régime et de la guillotine lors de la Révolution.",
                source: "Archives municipales de Lyon"
            },
            {
                nom: "Prison de Montluc (Cour des exécutions)",
                coords: [45.750660420617706, 4.861926125808476],
                adresse: "4 Rue Jeanne Hachette, 69003 Lyon",
                anneeDebut: 1943,
                anneeFin: 1944,
                dates: "1943 – 1944",
                role: "Cour intérieure et chemin de ronde où eurent lieu les fusillades d'otages et résistants par les pelotons allemands.",
                source: "Mémorial National de la Prison de Montluc"
            },
            {
                nom: "La Doua – Butte des fusillés",
                coords: [45.785732103261545, 4.886703596561138],
                adresse: "30 Av. Albert Einstein, 69100 Villeurbanne",
                anneeDebut: 1943,
                anneeFin: 1944,
                dates: "1943 – 1944",
                role: "Terrain militaire où l'occupant fusilla de nombreux résistants clandestins, devenu aujourd'hui la Nécropole nationale de la Doua.",
                source: "Ministère des Armées"
            },
            {
                nom: "Plaine des Brotteaux (Mitraillades de 1793)",
                coords: [45.764515549172536, 4.847161704227896],
                adresse: "Plaine des Brotteaux, 69006 Lyon",
                anneeDebut: 1793,
                anneeFin: 1794,
                dates: "1793",
                role: "Lieu d'exécution de masse par 'mitraillades' (tirs de canon chargés de mitraille) sous la Terreur ordonnée par Collot d'Herbois et Fouché.",
                source: "Fonds historique Révolutionnaire"
            },
            {
                nom: "Place du Change (Pendaisons)",
                coords: [45.76458742670638, 4.828427476905882],
                adresse: "Place du Change, 69005 Lyon",
                anneeDebut: 1500,
                anneeFin: null,
                dates: "vers 1500",
                role: "Place médiévale et Renaissance du Vieux-Lyon où étaient érigés les gibets pour les pendaisons publiques.",
                source: "Archives de la Ville de Lyon"
            },
            {
                nom: "Place Carnot (Guillotine)",
                coords: [45.751084000596634, 4.826856276121871],
                adresse: "Place Carnot, 69002 Lyon",
                anneeDebut: 1850,
                anneeFin: null,
                dates: "XIXe siècle",
                role: "Emplacement où la guillotine de la place des Terreaux fut transférée pour les exécutions capitales du XIXe siècle.",
                source: "Archives judiciaires du Rhône"
            },
            {
                nom: "Place Bellecour (Massacre de la Gestapo)",
                coords: [45.757782494828106, 4.832158271072953],
                adresse: "Place Bellecour / Rue Gasparin, 69002 Lyon",
                anneeDebut: 1944,
                anneeFin: null,
                dates: "27 juillet 1944",
                role: "Massacre de 5 résistants fusillés en représailles par la Gestapo et la Milice, commémoré par le monument du Veilleur de Pierre.",
                source: "CHRD & Ville de Lyon"
            }
        ]
    }
};

/**
 * Extrait les années de début et de fin d'un élément (étape ou lieu) en tenant compte des siècles (chiffres romains et arabes).
 * @param {Object} item
 * @returns {{ debut: number|null, fin: number|null }}
 */
function extraireAnneesItem(item) {
    let debut = null;
    let fin = null;

    if (typeof item.anneeDebut === 'number') debut = item.anneeDebut;
    if (typeof item.anneeFin === 'number') fin = item.anneeFin;

    const dateStr = String(item.dates || item.date || '');

    if (debut === null || fin === null) {
        const romanToCentury = {
            'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
            'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10,
            'XI': 11, 'XII': 12, 'XIII': 13, 'XIV': 14, 'XV': 15,
            'XVI': 16, 'XVII': 17, 'XVIII': 18, 'XIX': 19, 'XX': 20, 'XXI': 21
        };

        // Intervalle de siècles en chiffres romains (ex: "XVI-XVIII", "XIXe - XXe siècle")
        const romanRange = dateStr.match(/\b(X[IVX]*|V?I{1,3})\s*(?:e|ème)?\s*[-–—àa]\s*(X[IVX]*|V?I{1,3})\s*(?:e|ème)?\s*siècle/i)
            || dateStr.match(/\b(XVI|XVII|XVIII|XIX|XX|XV|XIV)\s*[-–—]\s*(XVI|XVII|XVIII|XIX|XX|XV|XIV)\b/i);

        if (romanRange) {
            const c1 = romanToCentury[romanRange[1].toUpperCase()];
            const c2 = romanToCentury[romanRange[2].toUpperCase()];
            if (c1 && c2) {
                if (debut === null) debut = (c1 - 1) * 100 + 1;
                if (fin === null) fin = c2 * 100;
            }
        } else {
            // Siècle unique en chiffres romains (ex: "XIXe siècle", "XIXe", "vers le XVIIe siècle")
            const singleRoman = dateStr.match(/\b(X[IVX]*|V?I{1,3})\s*(?:e|ème)?\s*siècle/i)
                || dateStr.match(/\b(XVI|XVII|XVIII|XIX|XX|XV|XIV)e?\b/i);
            if (singleRoman) {
                const c = romanToCentury[singleRoman[1].toUpperCase()];
                if (c) {
                    if (debut === null) debut = (c - 1) * 100 + 1;
                    if (fin === null) fin = c * 100;
                }
            }
        }

        // Intervalle de siècles en chiffres arabes (ex: "16-18e siècle", "19e siècle")
        const arabicRange = dateStr.match(/\b(\d{1,2})\s*(?:e|ème)?\s*[-–—àa]\s*(\d{1,2})\s*(?:e|ème)?\s*siècle/i);
        if (arabicRange) {
            const c1 = parseInt(arabicRange[1], 10);
            const c2 = parseInt(arabicRange[2], 10);
            if (debut === null) debut = (c1 - 1) * 100 + 1;
            if (fin === null) fin = c2 * 100;
        } else {
            const singleArabic = dateStr.match(/\b(\d{1,2})\s*(?:e|ème)?\s*siècle/i);
            if (singleArabic) {
                const c = parseInt(singleArabic[1], 10);
                if (debut === null) debut = (c - 1) * 100 + 1;
                if (fin === null) fin = c * 100;
            }
        }

        // Années à 4 chiffres (ex: "1835", "1940-1944", "1793")
        const annees4 = dateStr.match(/\b(1[0-9]{3}|20[0-9]{2})\b/g);
        if (annees4 && annees4.length > 0) {
            const parsed = annees4.map(a => parseInt(a, 10));
            if (debut === null) debut = Math.min(...parsed);
            if (fin === null && parsed.length > 1) fin = Math.max(...parsed);
        }
    }

    return { debut, fin };
}

/**
 * Détermine si un point, une étape ou un lieu historique existait déjà à l'époque de la carte sélectionnée.
 * Prend en compte les siècles (romains et arabes) et les dates précises.
 * @param {Object} item - Étape de parcours ou lieu historique
 * @param {'esri'|'ign1950'|'etatmajor'} [fondKey] - Identifiant de la carte active (par défaut fondActif)
 * @returns {boolean}
 */
function pointExistePourFond(item, fondKey = fondActif) {
    if (!item) return true;

    // Flags manuels explicites
    if (fondKey === 'ign1950' && item.existeEn1950 !== undefined) {
        return Boolean(item.existeEn1950);
    }
    if (fondKey === 'etatmajor' && item.existeEnEtatMajor !== undefined) {
        return Boolean(item.existeEnEtatMajor);
    }

    const { debut, fin } = extraireAnneesItem(item);

    // Carte d'État-Major (1820-1866)
    if (fondKey === 'etatmajor') {
        if (debut !== null && debut > 1866) return false;
        if (fin !== null && fin < 1820) return false;
        return true;
    }

    // Époque 1950 : Carte IGN 1950
    if (fondKey === 'ign1950') {
        if (debut !== null && debut > 1950) return false;
        if (fin !== null && fin < 1950) return false;
        return true;
    }

    // Carte contemporaine (Aujourd'hui)
    if (fondKey === 'esri') {
        if (fin !== null && fin < 2026 && (item.anneeFin !== undefined && item.anneeFin !== null)) {
            return false;
        }
        return true;
    }

    return true;
}

/**
 * Détermine si un point ou une étape historique existait déjà en 1950 (rétrocompatibilité).
 * @param {Object} item - Étape ou lieu historique
 * @returns {boolean}
 */
function pointExisteEn1950(item) {
    return pointExistePourFond(item, 'ign1950');
}

// =============================================================================
// PARTIE 2 : ÉTAT GLOBAL DE L'APPLICATION
// =============================================================================

let map = null;                    // Instance principale Leaflet
let coucheActuelle = null;         // Calque Leaflet regroupant polyligne et marqueurs
let marqueursActuels = [];         // Références des marqueurs actifs pour le ciblage
let personnageActifId = null;      // Identifiant du personnage sélectionné
let etapeActiveIndex = null;       // Index de l'étape active

// Fonds contemporains Esri
let tileEsriLight = null;          // Esri World Light Gray Base
let tileEsriDark = null;           // Esri World Dark Gray Base
let modeFondCarte = 'light';       // Mode clair/sombre par défaut
let modeThemeContemporain = 'light'; // Mode clair/sombre mémorisé pour la carte contemporaine (Esri)

// Fonds historiques IGN (opacité 80%)
let tileIGN1950 = null;            // Topographie 1950
let tileEtatMajor = null;          // État-Major 1820-1866
let fondActif = 'esri';            // Époque active ('esri', 'ign1950', 'etatmajor')
let fondJusticeActif = 'esri';     // Alias
let filtreJusticeActif = 'tous';   // Filtre des lieux de justice

// Calques catégorisés des lieux de justice
const calquesJustice = {
    juridiques: null,
    carceraux: null,
    memoire: null,
    execution: null
};

let mapResizeObserver = null;

// =============================================================================
// PARTIE 3 : INITIALISATION DE LA CARTE & GESTION DU THÈME
// =============================================================================

/**
 * Force le recalcul de la taille de la carte Leaflet de façon échelonnée.
 */
function invaliderTailleCarte() {
    if (!map) return;
    map.invalidateSize();
    if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(() => {
            if (map) map.invalidateSize();
        });
    }
    setTimeout(() => {
        if (map) map.invalidateSize();
    }, 60);
    setTimeout(() => {
        if (map) map.invalidateSize();
    }, 250);
}

/**
 * Initialise l'instance Leaflet et configure les couches cartographiques.
 */
function initMap() {
    if (map) return;

    map = L.map('map', {
        zoomControl: false
    }).setView([45.7600, 4.8357], 13);
    window.map = map;

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Tuiles contemporaines Esri (opacité 100%)
    tileEsriLight = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
        opacity: 1.0
    });

    tileEsriDark = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
        opacity: 1.0
    });

    // Tuiles historiques IGN (opacité fixée à 80%)
    tileIGN1950 = L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN50.1950&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
        attribution: 'IGN &mdash; Carte 1950 (Après-guerre)',
        maxZoom: 18,
        minZoom: 6,
        opacity: 0.8
    });

    tileEtatMajor = L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.ETATMAJOR40&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
        attribution: 'IGN &mdash; Carte d’État-Major (1820-1866)',
        maxZoom: 18,
        minZoom: 6,
        opacity: 0.8
    });

    // Surveillance du redimensionnement du conteneur
    if (typeof ResizeObserver !== 'undefined' && !mapResizeObserver) {
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapResizeObserver = new ResizeObserver(() => {
                if (map) map.invalidateSize();
            });
            mapResizeObserver.observe(mapContainer);
        }
    }

    // Fermeture des modales et menus au clic sur la carte
    map.on('click', () => {
        fermerTousModals();
        fermerMenuMobile();
    });

    // Activation du fond initial
    if (modeFondCarte === 'dark') {
        tileEsriDark.addTo(map);
    } else {
        tileEsriLight.addTo(map);
    }
    changerFondCarte(modeFondCarte);

    // Initialisation des calques des Lieux de Justice
    initCalquesJustice();
}

/**
 * Bascule le mode clair/sombre via le bouton d'en-tête.
 */
function basculerThemeUnique() {
    const nouveauMode = (modeFondCarte === 'light') ? 'dark' : 'light';
    if (fondActif === 'esri') {
        modeThemeContemporain = nouveauMode;
    }
    changerFondCarte(nouveauMode);
}

/**
 * Bascule le mode clair/sombre (interrupteur optionnel).
 * @param {boolean} estSombre
 */
function basculerModeSombreClair(estSombre) {
    const nouveauMode = estSombre ? 'dark' : 'light';
    if (fondActif === 'esri') {
        modeThemeContemporain = nouveauMode;
    }
    changerFondCarte(nouveauMode);
}

/**
 * Applique le thème clair ou sombre sur la carte et l'interface.
 * @param {'light'|'dark'} mode
 */
function changerFondCarte(mode) {
    modeFondCarte = mode;

    if (map) {
        const estFondHistoriqueActif = (fondActif === 'ign1950' || fondActif === 'etatmajor');

        if (!estFondHistoriqueActif) {
            if (mode === 'light') {
                if (map.hasLayer(tileEsriDark)) map.removeLayer(tileEsriDark);
                if (!map.hasLayer(tileEsriLight)) tileEsriLight.addTo(map);
            } else {
                if (map.hasLayer(tileEsriLight)) map.removeLayer(tileEsriLight);
                if (!map.hasLayer(tileEsriDark)) tileEsriDark.addTo(map);
            }
        }

        // Filtre sombre pour toutes les cartes historiques (permettant le mode sombre sur 100% des cartes)
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            if (estFondHistoriqueActif && mode === 'dark') {
                mapContainer.classList.add('map-dark-filter');
            } else {
                mapContainer.classList.remove('map-dark-filter');
            }
        }
    }

    // Mise à jour de l'icône du bouton de thème avec SVG sobre
    const iconSquare = document.getElementById('theme-toggle-icon');
    const btnSquare = document.getElementById('theme-toggle-btn');
    if (iconSquare) {
        if (mode === 'dark') {
            iconSquare.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        } else {
            iconSquare.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        }
    }
    if (btnSquare) {
        btnSquare.setAttribute('title', (mode === 'dark') ? 'Passer en mode clair' : 'Passer en mode sombre');
        btnSquare.setAttribute('aria-label', (mode === 'dark') ? 'Activer le mode clair' : 'Activer le mode sombre');
    }

    const switchInput = document.getElementById('theme-map-switch');
    if (switchInput) switchInput.checked = (mode === 'dark');

    document.body.setAttribute('data-theme', mode);
    actualiserVisibiliteBoutonTheme(fondActif);
}

/**
 * Met à jour la visibilité du bouton de thème (Clair / Sombre) :
 * Désormais toujours visible et accessible sur toutes les cartes.
 * @param {'esri'|'ign1950'|'etatmajor'} [fondKey]
 */
function actualiserVisibiliteBoutonTheme(fondKey = fondActif) {
    const btnSquare = document.getElementById('theme-toggle-btn');
    if (btnSquare) {
        btnSquare.classList.remove('is-hidden');
        btnSquare.style.display = '';
    }
}

/**
 * Crée une icône Leaflet HTML numérotée pour les étapes d'un personnage.
 * @param {string} couleur
 * @param {number} numero
 * @param {boolean} estActif
 * @returns {L.DivIcon}
 */
function creerIconeMarqueur(couleur, numero, estActif = false) {
    return L.divIcon({
        className: 'custom-marker-wrapper',
        html: `
            <div class="custom-marker ${estActif ? 'marker-actif' : ''}" style="--marker-color: ${couleur};">
                <span class="marker-number">${numero}</span>
                <span class="marker-pulse"></span>
            </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -20]
    });
}

/**
 * Crée une icône Leaflet pour les lieux de justice avec emoji de catégorie.
 * @param {string} iconEmoji
 * @param {string} couleur
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

// =============================================================================
// PARTIE 4 : ÉPOQUES CARTOGRAPHIQUES & FONDS DE CARTE
// =============================================================================

function toggleDropdownFondsJustice() {
    const dropdown = document.getElementById('dropdown-fonds-justice');
    const wrapper = document.getElementById('justice-fond-wrapper');
    const btn = document.getElementById('btn-fond-justice');
    if (!dropdown) return;
    const estOuvert = dropdown.classList.toggle('open');
    if (wrapper) wrapper.classList.toggle('open', estOuvert);
    if (btn) btn.setAttribute('aria-expanded', estOuvert ? 'true' : 'false');
}

function fermerDropdownFondsJustice() {
    const dropdown = document.getElementById('dropdown-fonds-justice');
    const wrapper = document.getElementById('justice-fond-wrapper');
    const btn = document.getElementById('btn-fond-justice');
    if (dropdown) dropdown.classList.remove('open');
    if (wrapper) wrapper.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
}

function toggleDropdownFondsPersonne() {
    const dropdown = document.getElementById('dropdown-fonds-personne');
    const wrapper = document.getElementById('personne-fond-wrapper');
    const btn = document.getElementById('btn-fond-personne');
    if (!dropdown) return;
    const estOuvert = dropdown.classList.toggle('open');
    if (wrapper) wrapper.classList.toggle('open', estOuvert);
    if (btn) btn.setAttribute('aria-expanded', estOuvert ? 'true' : 'false');
}

function fermerDropdownFondsPersonne() {
    const dropdown = document.getElementById('dropdown-fonds-personne');
    const wrapper = document.getElementById('personne-fond-wrapper');
    const btn = document.getElementById('btn-fond-personne');
    if (dropdown) dropdown.classList.remove('open');
    if (wrapper) wrapper.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
}

function fermerTousDropdownsFonds() {
    fermerDropdownFondsJustice();
    fermerDropdownFondsPersonne();
}

/**
 * Change l'époque cartographique affichée sur Leaflet (Esri, IGN 1950, État-Major).
 * @param {'esri'|'ign1950'|'etatmajor'} fondKey
 */
function annoncerAccessibilite(texte) {
    const liveRegion = document.getElementById('a11y-live-region');
    if (liveRegion && texte) {
        liveRegion.textContent = '';
        setTimeout(() => {
            liveRegion.textContent = texte;
        }, 50);
    }
}

function choisirFondPlan(fondKey) {
    fermerTousDropdownsFonds();
    fondActif = fondKey;
    fondJusticeActif = fondKey;

    // Mise à jour visuelle des sélecteurs
    document.querySelectorAll('.fond-option').forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-fond') === fondKey);
    });

    // Synchronisation de la barre d'époque d'en-tête
    document.querySelectorAll('.epoch-pill').forEach(pill => {
        const estActif = (pill.getAttribute('data-fond') === fondKey);
        pill.classList.toggle('active', estActif);
        pill.setAttribute('aria-pressed', estActif ? 'true' : 'false');
    });

    const labels = {
        'esri': "Aujourd'hui",
        'ign1950': '1950',
        'etatmajor': '1820–1866'
    };

    const btnTextJustice = document.getElementById('btn-fond-justice-text');
    if (btnTextJustice && labels[fondKey]) btnTextJustice.textContent = labels[fondKey];

    const btnTextPersonne = document.getElementById('btn-fond-personne-text');
    if (btnTextPersonne && labels[fondKey]) btnTextPersonne.textContent = labels[fondKey];

    if (labels[fondKey]) {
        annoncerAccessibilite(`Époque cartographique active : ${labels[fondKey]}`);
    }

    // Application du thème sombre/clair choisi sur l'ensemble des cartes
    changerFondCarte(modeFondCarte);
    actualiserVisibiliteBoutonTheme(fondKey);

    // Permutation des couches Leaflet & Opacité à 80% sur toutes les cartes historiques
    if (map) {
        [tileEsriLight, tileEsriDark, tileIGN1950, tileEtatMajor].forEach(couche => {
            if (couche && map.hasLayer(couche)) map.removeLayer(couche);
        });

        if (fondKey === 'ign1950') {
            if (tileIGN1950) {
                tileIGN1950.setOpacity(0.8);
                tileIGN1950.addTo(map);
            }
        } else if (fondKey === 'etatmajor') {
            if (tileEtatMajor) {
                tileEtatMajor.setOpacity(0.8);
                tileEtatMajor.addTo(map);
            }
        } else {
            // Carte contemporaine Esri (opacité normale à 100%)
            if (modeFondCarte === 'dark') {
                if (tileEsriDark) {
                    tileEsriDark.setOpacity(1.0);
                    tileEsriDark.addTo(map);
                }
            } else {
                if (tileEsriLight) {
                    tileEsriLight.setOpacity(1.0);
                    tileEsriLight.addTo(map);
                }
            }
        }
    }

    // Mise à jour du filtrage temporel selon l'époque active sur le parcours de résistant
    if (personnageActifId && dataPersonnes[personnageActifId]) {
        if (etapeActiveIndex !== null) {
            const etape = dataPersonnes[personnageActifId].etapes[etapeActiveIndex];
            if (!pointExistePourFond(etape, fondKey)) {
                etapeActiveIndex = null;
                if (map) map.closePopup();
            }
        }
        afficherParcoursSurCarte(dataPersonnes[personnageActifId]);
        actualiserFiltreTemporelEtapes();
    } else if (map) {
        // En vue Justice : fermer la bulle popup si le lieu ciblé n'existait pas à l'époque choisie
        for (const catKey in dataLieuxJustice) {
            const cat = dataLieuxJustice[catKey];
            cat.lieux.forEach(l => {
                if (!pointExistePourFond(l, fondKey) && l.marker && l.marker.isPopupOpen && l.marker.isPopupOpen()) {
                    map.closePopup();
                }
            });
        }
    }

    // Mise à jour du filtrage temporel sur les lieux de justice
    actualiserMarqueursJustice();
    afficherLieuxJusticeDansListe(filtreJusticeActif);
    peuplerSelectGpsJustice(filtreJusticeActif);

    // Recentre la vue sur l'ensemble des points de la carte active
    setTimeout(() => {
        recentrerVuePage();
    }, 60);
}

// Fermeture des menus au clic extérieur
document.addEventListener('click', (e) => {
    const wrapJustice = document.getElementById('justice-fond-wrapper');
    const wrapPerso = document.getElementById('personne-fond-wrapper');
    const clicDansJustice = wrapJustice && wrapJustice.contains(e.target);
    const clicDansPerso = wrapPerso && wrapPerso.contains(e.target);
    if (!clicDansJustice && !clicDansPerso) {
        fermerTousDropdownsFonds();
    }
});

// =============================================================================
// PARTIE 5 : NAVIGATION PRINCIPALE (ACCUEIL ⟷ CARTE)
// =============================================================================

/**
 * Lance l'application cartographique sur le parcours d'un résistant.
 * @param {'jean_moulin'|'klaus_barbie'|'lucie_aubrac'} id
 */
function ouvrirCarte(id) {
    document.getElementById('landing').style.display = 'none';
    const appEl = document.getElementById('app');
    appEl.style.display = 'flex';

    const titleBadge = document.getElementById('header-context-title');
    const subBadge = document.getElementById('header-context-sub');
    if (subBadge) subBadge.textContent = "Parcours";
    if (id && dataPersonnes[id] && titleBadge) {
        titleBadge.textContent = dataPersonnes[id].nom;
    }

    initMap();

    const searchInput = document.getElementById('global-search-input');
    const searchResults = document.getElementById('search-results');
    if (searchInput) {
        searchInput.value = '';
        searchInput.placeholder = (id && dataPersonnes[id]) ? `Rechercher dans ce parcours...` : "Rechercher une étape...";
    }
    if (searchResults) searchResults.classList.remove('active');

    // Volet fermé d'office au lancement pour dégager la carte
    if (window.innerWidth >= 768) {
        fermerSidebarDesktop();
    } else {
        fermerMenuMobile();
    }

    document.body.setAttribute('data-theme', modeFondCarte);

    // Initialisation sur le fond contemporain par défaut
    choisirFondPlan('esri');

    setTimeout(() => {
        map.invalidateSize();

        // Désactivation des calques de justice pour isoler le résistant
        ['juridiques', 'carceraux', 'memoire', 'execution'].forEach(cat => {
            if (map && calquesJustice[cat] && map.hasLayer(calquesJustice[cat])) {
                map.removeLayer(calquesJustice[cat]);
            }
        });

        if (id && dataPersonnes[id]) {
            selectionnerPersonne(id);
        }
    }, 150);
}

/**
 * Lance l'application cartographique sur le mode Lieux de Justice.
 */
function ouvrirCarteJustice() {
    document.getElementById('landing').style.display = 'none';
    const appEl = document.getElementById('app');
    appEl.style.display = 'flex';

    const titleBadge = document.getElementById('header-context-title');
    const subBadge = document.getElementById('header-context-sub');
    if (subBadge) subBadge.textContent = "Patrimoine";
    if (titleBadge) titleBadge.textContent = "Lieux de Justice";
    annoncerAccessibilite("Affichage de la carte : Lieux de Justice");

    initMap();

    const searchInput = document.getElementById('global-search-input');
    const searchResults = document.getElementById('search-results');
    if (searchInput) {
        searchInput.value = '';
        searchInput.placeholder = "Rechercher parmi les lieux de justice...";
    }
    if (searchResults) searchResults.classList.remove('active');

    if (window.innerWidth >= 768) {
        fermerSidebarDesktop();
    } else {
        fermerMenuMobile();
    }

    document.body.setAttribute('data-theme', modeFondCarte);

    setTimeout(() => {
        map.invalidateSize();

        // Nettoyage des tracés de résistant
        if (coucheActuelle) {
            map.removeLayer(coucheActuelle);
            coucheActuelle = null;
            marqueursActuels = [];
        }
        personnageActifId = null;
        etapeActiveIndex = null;

        // Affichage de la vue Justice dans le volet
        const detailView = document.getElementById('sidebar-detail-view');
        const justiceView = document.getElementById('sidebar-justice-view');
        if (detailView) detailView.style.display = 'none';
        if (justiceView) justiceView.style.display = 'flex';

        actualiserTexteMenuToggle('Voir les lieux');

        choisirFondPlan('esri');
        filtrerJustice('tous');
        peuplerSelectGpsJustice('tous');
    }, 150);
}

/**
 * Retourne à la page d'accueil et réinitialise l'état temporaire.
 */
function retourAccueil() {
    document.getElementById('app').style.display = 'none';
    document.getElementById('landing').style.display = 'flex';

    fermerMenuMobile();
    fermerTousModals();
    fermerTousDropdownsFonds();

    const searchInput = document.getElementById('global-search-input');
    const searchResults = document.getElementById('search-results');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.classList.remove('active');
    toggleSearchHeader(false);

    const landingSearch = document.getElementById('landing-search-input');
    const landingResults = document.getElementById('landing-search-results');
    if (landingSearch) landingSearch.value = '';
    if (landingResults) landingResults.classList.remove('active');

    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('desktop-collapsed');

    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.classList.remove('active');
        actualiserTexteMenuToggle('Voir les étapes');
    }

    const detailView = document.getElementById('sidebar-detail-view');
    const justiceView = document.getElementById('sidebar-justice-view');
    if (detailView) detailView.style.display = 'none';
    if (justiceView) justiceView.style.display = 'none';

    // Nettoyage des calques actifs et réinitialisation du fond contemporain
    if (coucheActuelle && map) {
        map.removeLayer(coucheActuelle);
        coucheActuelle = null;
    }
    marqueursActuels = [];
    personnageActifId = null;
    etapeActiveIndex = null;
    choisirFondPlan('esri');
}

/**
 * Génère le bloc HTML des sources historiques pour une étape ou un lieu.
 * Supporte une ou plusieurs sources sous forme de tableau ou de chaîne de caractères.
 * @param {Object} item
 * @param {boolean} [estPopup=false]
 * @returns {string}
 */
function genererSourcesHtml(item, estPopup = false) {
    if (!item) return '';
    let sourcesList = [];

    if (Array.isArray(item.sources) && item.sources.length > 0) {
        sourcesList = item.sources;
    } else if (Array.isArray(item.source) && item.source.length > 0) {
        sourcesList = item.source;
    } else if (typeof item.source === 'string' && item.source.trim() !== '') {
        if (item.source.includes(';') || item.source.includes(' | ')) {
            sourcesList = item.source.split(/[;|]/).map(s => s.trim()).filter(Boolean);
        } else {
            sourcesList = [item.source.trim()];
        }
    } else if (typeof item.sources === 'string' && item.sources.trim() !== '') {
        sourcesList = [item.sources.trim()];
    }

    if (sourcesList.length === 0) return '';

    const prefixClass = estPopup ? 'popup' : 'point';
    const labelTexte = sourcesList.length > 1 ? 'Sources utilisées :' : 'Source utilisée :';

    let contenuSourcesHtml = '';
    if (sourcesList.length === 1) {
        contenuSourcesHtml = `<span class="${prefixClass}-source-text"><strong>${labelTexte}</strong> ${sourcesList[0]}</span>`;
    } else {
        const itemsHtml = sourcesList.map(s => `<li>${s}</li>`).join('');
        contenuSourcesHtml = `
            <div class="${prefixClass}-source-text">
                <strong>${labelTexte}</strong>
                <ul class="point-source-list">${itemsHtml}</ul>
            </div>
        `;
    }

    const boutonHtml = estPopup
        ? `<button type="button" class="btn-popup-source-link" onclick="ouvrirModalMentionsLegales('sources')" title="Consulter les mentions légales et sources">Consulter ↗</button>`
        : `<button type="button" class="btn-point-source-link" onclick="event.stopPropagation(); ouvrirModalMentionsLegales('sources')" title="Consulter les mentions légales et sources">Consulter ↗</button>`;

    return `
        <div class="${prefixClass}-source-box ${sourcesList.length > 1 ? 'multiple-sources' : ''}">
            ${contenuSourcesHtml}
            ${boutonHtml}
        </div>
    `;
}

// =============================================================================
// PARTIE 6 : MODULE PARCOURS RÉSISTANTS
// =============================================================================

/**
 * Configure et affiche le parcours complet d'une figure historique.
 * @param {'jean_moulin'|'klaus_barbie'|'lucie_aubrac'} id
 */
function selectionnerPersonne(id) {
    personnageActifId = id;
    etapeActiveIndex = null;
    const personne = dataPersonnes[id];
    if (!personne) return;

    // Mise à jour du bouton d'ouverture du volet
    actualiserTexteMenuToggle('Voir les étapes');

    // Remplissage du sélecteur GPS et des données du panneau
    peuplerSelectGpsPersonne(personne);
    afficherVueDetail(personne);
    afficherParcoursSurCarte(personne);
}

/**
 * Remplit la fiche détaillée et la liste des étapes dans le panneau latéral.
 * @param {Object} personne
 */
function afficherVueDetail(personne) {
    const justiceView = document.getElementById('sidebar-justice-view');
    const detailView = document.getElementById('sidebar-detail-view');
    if (justiceView) justiceView.style.display = 'none';
    if (detailView) detailView.style.display = 'flex';

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

    const listeEtapesEl = document.getElementById('liste-etapes');
    if (!listeEtapesEl) return;
    listeEtapesEl.innerHTML = '';

    personne.etapes.forEach((etape, index) => {
        const item = document.createElement('div');
        item.className = 'etape-card';
        item.setAttribute('data-index', index);
        item.setAttribute('data-existe-fond', pointExistePourFond(etape, fondActif) ? '1' : '0');

        const sourceEtapeHtml = genererSourcesHtml(etape, false);

        item.innerHTML = `
            <div class="etape-number" style="background-color: ${personne.color};">${index + 1}</div>
            <div class="etape-info">
                <div class="etape-header">
                    <span class="etape-titre">${etape.titre}</span>
                    <span class="etape-date">${etape.date}</span>
                </div>
                <span class="etape-lieu"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-1px;margin-right:3px;" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>${etape.lieu}</span>
                <p class="etape-desc">${etape.desc}</p>
                ${sourceEtapeHtml}
            </div>
        `;

        item.addEventListener('click', () => {
            focusSurEtape(index);
        });

        listeEtapesEl.appendChild(item);
    });

    actualiserFiltreTemporelEtapes();
}

/**
 * Actualise l'affichage des étapes et options GPS selon le filtre temporel de la carte active.
 */
function actualiserFiltreTemporelEtapes() {
    if (!personnageActifId || !dataPersonnes[personnageActifId]) return;
    const perso = dataPersonnes[personnageActifId];

    // Cartes d'étapes dans la barre latérale
    const cards = document.querySelectorAll('#liste-etapes .etape-card');
    cards.forEach((card, idx) => {
        const etape = perso.etapes[idx];
        const visible = etape ? pointExistePourFond(etape, fondActif) : true;
        card.style.display = visible ? '' : 'none';
    });

    // Sélecteur GPS
    const selPerso = document.getElementById('select-gps-point-personne');
    if (selPerso) {
        Array.from(selPerso.options).forEach((opt, idx) => {
            const etape = perso.etapes[idx];
            if (etape) {
                const visible = pointExistePourFond(etape, fondActif);
                opt.style.display = visible ? '' : 'none';
                opt.disabled = !visible;
            }
        });
        if (selPerso.selectedOptions.length && selPerso.selectedOptions[0].disabled) {
            const premierValide = Array.from(selPerso.options).find(o => !o.disabled);
            if (premierValide) selPerso.value = premierValide.value;
        }
    }
}

/**
 * Recentre la vue de la carte sur l'ensemble des points de la page active (au lieu d'un point isolé).
 */
function recentrerVuePage() {
    if (!map) return;
    if (personnageActifId && dataPersonnes[personnageActifId]) {
        const etapesAffichees = dataPersonnes[personnageActifId].etapes.filter(e => pointExistePourFond(e, fondActif));
        const coords = etapesAffichees.map(e => e.coords);
        if (coords.length > 0) {
            map.fitBounds(L.latLngBounds(coords), {
                padding: [60, 60],
                maxZoom: 15
            });
        }
    } else {
        const bounds = L.latLngBounds([]);
        const activeCats = (filtreJusticeActif === 'tous') ? ['carceraux', 'juridiques', 'police'] : [filtreJusticeActif];
        activeCats.forEach(cat => {
            if (dataLieuxJustice[cat]) {
                dataLieuxJustice[cat].lieux.forEach(l => {
                    if (pointExistePourFond(l, fondActif)) {
                        bounds.extend(l.coords);
                    }
                });
            }
        });
        if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
        }
    }
}

/**
 * Déplace la carte de manière fluide pour centrer la page flottante (popup) sur l'écran.
 * @param {L.Marker} marker
 */
function centrerCarteSurPopup(marker) {
    if (!map || !marker) return;

    // Si le marqueur est hors de la vue actuelle, amener d'abord la vue à proximité
    if (!map.getBounds().contains(marker.getLatLng())) {
        map.panTo(marker.getLatLng(), { animate: false });
    }

    if (!marker.isPopupOpen()) {
        marker.openPopup();
    }

    const ajusterCentrage = () => {
        const popup = marker.getPopup();
        const popupEl = popup ? popup.getElement() : null;
        if (!popupEl || !map) return;

        const mapRect = map.getContainer().getBoundingClientRect();
        const popupRect = popupEl.getBoundingClientRect();

        // Centre géométrique de la popup flottante
        const currentCenterX = popupRect.left + popupRect.width / 2;
        const currentCenterY = popupRect.top + popupRect.height / 2;

        // Centre géométrique de l'écran visible (conteneur de la carte)
        const targetCenterX = mapRect.left + mapRect.width / 2;
        const targetCenterY = mapRect.top + mapRect.height / 2;

        const deltaX = currentCenterX - targetCenterX;
        const deltaY = currentCenterY - targetCenterY;

        // Déplacement animé de la carte pour caler le centre de la popup au centre de l'écran
        if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
            map.panBy([deltaX, deltaY], {
                animate: true,
                duration: 0.45
            });
        }
    };

    requestAnimationFrame(() => {
        ajusterCentrage();
        setTimeout(ajusterCentrage, 120);
    });
}

/**
 * Positionne les marqueurs des étapes avec gestion du filtre temporel selon la carte active (sans lignes reliant les points).
 * @param {Object} personne
 */
function afficherParcoursSurCarte(personne) {
    if (!map) return;

    if (coucheActuelle) {
        map.removeLayer(coucheActuelle);
    }
    marqueursActuels = [];

    const etapesAffichees = personne.etapes.filter(etape => pointExistePourFond(etape, fondActif));
    const coordsTraces = etapesAffichees.map(e => e.coords);
    const groupeCalque = L.layerGroup();

    // Pas de pointillés reliant les points : seuls les marqueurs d'étapes sont affichés

    personne.etapes.forEach((etape, index) => {
        if (!pointExistePourFond(etape, fondActif)) return;

        const customIcon = creerIconeMarqueur(personne.color, index + 1, false);
        const marker = L.marker(etape.coords, { icon: customIcon });

        const sourceEtapePopupHtml = genererSourcesHtml(etape, true);

        const popupContent = `
            <div class="popup-bubble">
                <div class="popup-badge" style="background: ${personne.color}">Étape ${index + 1} • ${etape.date}</div>
                <h3 class="popup-title">${etape.titre}</h3>
                <div class="popup-place"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-1px;margin-right:4px;" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>${etape.lieu}</div>
                <p class="popup-text">${etape.desc}</p>
                ${sourceEtapePopupHtml}
            </div>
        `;

        // autoPan: false garantit que le clic sur le point ne décale pas la carte
        marker.bindPopup(popupContent, {
            className: 'custom-leaflet-popup',
            maxWidth: 300,
            autoPan: false
        });

        // Clic sur marqueur : la carte bouge de façon à centrer la page flottante (popup) sur l'écran
        marker.on('click', () => {
            mettreEnValeurEtapeDansListe(index);

            const selPerso = document.getElementById('select-gps-point-personne');
            if (selPerso) selPerso.value = index;

            centrerCarteSurPopup(marker);

            const sidebar = document.getElementById('sidebar');
            const estOuvert = sidebar && (window.innerWidth >= 768 ? !sidebar.classList.contains('desktop-collapsed') : sidebar.classList.contains('open'));
            if (estOuvert) {
                setTimeout(() => {
                    const carteActive = document.querySelector(`.etape-card[data-index="${index}"]`);
                    if (carteActive) carteActive.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 60);
            }
        });

        groupeCalque.addLayer(marker);
        marqueursActuels.push({ marker, coords: etape.coords, index });
    });

    groupeCalque.addTo(map);
    coucheActuelle = groupeCalque;

    if (coordsTraces.length > 0) {
        map.fitBounds(L.latLngBounds(coordsTraces), {
            padding: [60, 60],
            maxZoom: 15
        });
    }
}

/**
 * Affiche la bulle popup de l'étape et centre la page flottante sur l'écran.
 * @param {number} index
 */
function focusSurEtape(index) {
    const cible = marqueursActuels.find(m => m && m.index === index);
    if (!cible || !personnageActifId) return;

    etapeActiveIndex = index;
    const { marker } = cible;
    const personne = dataPersonnes[personnageActifId];

    marqueursActuels.forEach(item => {
        if (item && item.marker) {
            item.marker.setIcon(creerIconeMarqueur(personne.color, item.index + 1, item.index === index));
        }
    });

    mettreEnValeurEtapeDansListe(index);
    if (personne && personne.etapes && personne.etapes[index]) {
        annoncerAccessibilite(`Étape ${index + 1} : ${personne.etapes[index].titre} à ${personne.etapes[index].lieu}`);
    }

    if (window.innerWidth <= 768) {
        fermerMenuMobile();
    }

    // Déplace la carte de façon à centrer la page flottante (popup) sur l'écran
    centrerCarteSurPopup(marker);
}

/**
 * Met en valeur l'étape active dans la liste latérale.
 * @param {number} index
 */
function mettreEnValeurEtapeDansListe(index) {
    const cartes = document.querySelectorAll('.etape-card');
    cartes.forEach((carte, i) => {
        carte.classList.toggle('active', i === index);
    });

    const carteActive = document.querySelector(`.etape-card[data-index="${index}"]`);
    const sidebar = document.getElementById('sidebar');
    const estOuvert = sidebar && (window.innerWidth >= 768 ? !sidebar.classList.contains('desktop-collapsed') : sidebar.classList.contains('open'));
    if (carteActive && estOuvert) {
        carteActive.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// =============================================================================
// PARTIE 7 : MODULE LIEUX DE JUSTICE
// =============================================================================

/**
 * Initialise les groupes de calques des Lieux de Justice.
 */
function initCalquesJustice() {
    for (const catKey in dataLieuxJustice) {
        const cat = dataLieuxJustice[catKey];
        const group = L.layerGroup();

        cat.lieux.forEach((lieu, idx) => {
            const icon = creerIconeJustice(cat.icon, cat.color);
            const marker = L.marker(lieu.coords, { icon: icon });

            const nomEchappe = lieu.nom.replace(/'/g, "\\'");
            const sourceLieuPopupHtml = genererSourcesHtml(lieu, true);

            const popupContent = `
                <div class="popup-bubble">
                    <div class="popup-badge" style="background: ${cat.color}">
                        ${cat.nomCategorie}
                    </div>
                    <h3 class="popup-title">${lieu.nom}</h3>
                    ${lieu.dates ? `<div class="popup-date">${lieu.dates}</div>` : ''}
                    <div class="popup-place"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-1px;margin-right:4px;" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>${lieu.adresse}</div>
                    <p class="popup-text">${lieu.role}</p>
                    ${sourceLieuPopupHtml}
                    <div class="popup-gps-box">
                        <button type="button" class="btn-popup-gps" onclick="ouvrirPointDansGPS(${lieu.coords[0]}, ${lieu.coords[1]}, '${nomEchappe}')" title="Ouvrir ce lieu dans l'application GPS">
                            Ouvrir ce lieu dans le GPS →
                        </button>
                    </div>
                </div>
            `;

            // autoPan: false garantit que le clic sur le point ne décale pas la carte
            marker.bindPopup(popupContent, {
                className: 'custom-leaflet-popup',
                maxWidth: 320,
                autoPan: false
            });

            // Clic sur marqueur : la carte bouge de façon à centrer la page flottante (popup) sur l'écran
            marker.on('click', () => {
                mettreEnValeurLieuJusticeDansListe(catKey, idx);

                const selJustice = document.getElementById('select-gps-point-justice');
                if (selJustice) selJustice.value = `${catKey}_${idx}`;

                centrerCarteSurPopup(marker);

                const sidebar = document.getElementById('sidebar');
                const estOuvert = sidebar && (window.innerWidth >= 768 ? !sidebar.classList.contains('desktop-collapsed') : sidebar.classList.contains('open'));
                if (estOuvert) {
                    setTimeout(() => {
                        const card = document.querySelector(`.lieu-justice-card[data-cat="${catKey}"][data-index="${idx}"]`);
                        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 60);
                }
            });

            lieu.marker = marker;
            group.addLayer(marker);
        });

        calquesJustice[catKey] = group;
    }
}

/**
 * Met à jour les calques de lieux de justice pour n'afficher que les marqueurs existant à l'époque active.
 */
function actualiserMarqueursJustice() {
    if (!map) return;
    for (const catKey in dataLieuxJustice) {
        const cat = dataLieuxJustice[catKey];
        const group = calquesJustice[catKey];
        if (!group) continue;
        group.clearLayers();
        cat.lieux.forEach(lieu => {
            if (pointExistePourFond(lieu, fondActif) && lieu.marker) {
                group.addLayer(lieu.marker);
            }
        });
    }
}

/**
 * Active ou désactive un calque de justice spécifique.
 * @param {'carceraux'|'juridiques'|'police'} categorie
 * @param {boolean} activer
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
}

/**
 * Filtre les lieux de justice par catégorie ('tous', 'carceraux', 'juridiques', 'police').
 * @param {string} categorie
 */
function filtrerJustice(categorie) {
    filtreJusticeActif = categorie;

    document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === categorie);
    });

    actualiserMarqueursJustice();

    const bounds = L.latLngBounds([]);

    if (categorie === 'tous') {
        ['juridiques', 'carceraux', 'memoire', 'execution'].forEach(cat => basculerCalqueJustice(cat, true));
    } else {
        ['juridiques', 'carceraux', 'memoire', 'execution'].forEach(cat => basculerCalqueJustice(cat, cat === categorie));
    }

    afficherLieuxJusticeDansListe(categorie);
    peuplerSelectGpsJustice(categorie);

    const activeCats = (categorie === 'tous') ? ['juridiques', 'carceraux', 'memoire', 'execution'] : [categorie];
    activeCats.forEach(cat => {
        if (dataLieuxJustice[cat]) {
            dataLieuxJustice[cat].lieux.forEach(l => {
                if (pointExistePourFond(l, fondActif)) {
                    bounds.extend(l.coords);
                }
            });
        }
    });

    if (bounds.isValid() && map) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
}

/**
 * Génère les cartes des lieux de justice dans le panneau latéral.
 * @param {string} filtre
 */
function afficherLieuxJusticeDansListe(filtre) {
    const conteneur = document.getElementById('liste-lieux-justice');
    const titleEl = document.getElementById('justice-list-title');
    if (!conteneur) return;
    conteneur.innerHTML = '';

    const categories = (filtre === 'tous') ? ['juridiques', 'carceraux', 'memoire', 'execution'] : [filtre];

    let nbVisibles = 0;
    categories.forEach(catKey => {
        const cat = dataLieuxJustice[catKey];
        if (cat) {
            nbVisibles += cat.lieux.filter(l => pointExistePourFond(l, fondActif)).length;
        }
    });

    const titresFiltres = {
        'tous': `Tous les lieux historiques (${nbVisibles})`,
        'juridiques': `Palais de Justice (${nbVisibles})`,
        'carceraux': `Prisons (${nbVisibles})`,
        'memoire': `Lieux de mémoire (${nbVisibles})`,
        'execution': `Lieux d'exécution (${nbVisibles})`
    };

    if (titleEl && titresFiltres[filtre]) titleEl.textContent = titresFiltres[filtre];

    categories.forEach(catKey => {
        const cat = dataLieuxJustice[catKey];
        if (!cat) return;

        cat.lieux.forEach((lieu, idx) => {
            if (!pointExistePourFond(lieu, fondActif)) return;

            const card = document.createElement('div');
            card.className = 'lieu-justice-card';
            card.setAttribute('data-cat', catKey);
            card.setAttribute('data-index', idx);
            card.setAttribute('data-existe-fond', '1');

            const sourceLieuHtml = genererSourcesHtml(lieu, false);

            card.innerHTML = `
                <div class="lieu-badge" style="background-color: ${cat.color};">${idx + 1}</div>
                <div class="lieu-info">
                    <div class="lieu-header">
                        <span class="lieu-titre">${lieu.nom}</span>
                        <span class="lieu-cat-tag" style="color: ${cat.color};">${cat.nomCategorie}</span>
                    </div>
                    <div class="lieu-meta-row">
                        ${lieu.dates ? `<span class="lieu-dates-tag">${lieu.dates}</span>` : ''}
                        <span class="lieu-adresse"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-1px;margin-right:3px;" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>${lieu.adresse}</span>
                    </div>
                    <p class="lieu-desc">${lieu.role}</p>
                    ${sourceLieuHtml}
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
 * Centre la carte sur un lieu de justice et ouvre sa bulle popup.
 * @param {string} catKey
 * @param {number} idx
 */
function focusSurLieuJustice(catKey, idx) {
    const cat = dataLieuxJustice[catKey];
    if (!cat || !cat.lieux[idx]) return;
    const lieu = cat.lieux[idx];

    mettreEnValeurLieuJusticeDansListe(catKey, idx);
    annoncerAccessibilite(`Lieu de Justice sélectionné : ${lieu.nom}, ${lieu.adresse}`);

    if (!map.hasLayer(calquesJustice[catKey])) {
        basculerCalqueJustice(catKey, true);
    }

    if (window.innerWidth <= 768) {
        fermerMenuMobile();
    }

    // Déplace la carte de façon à centrer la page flottante (popup) sur l'écran
    if (lieu.marker) {
        centrerCarteSurPopup(lieu.marker);
    }
}

/**
 * Met en valeur un lieu de justice dans la liste latérale.
 * @param {string} catKey
 * @param {number} idx
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

    const sidebar = document.getElementById('sidebar');
    const estOuvert = sidebar && (window.innerWidth >= 768 ? !sidebar.classList.contains('desktop-collapsed') : sidebar.classList.contains('open'));
    if (activeCard && estOuvert) {
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// =============================================================================
// PARTIE 8 : VOLET LATÉRAL & MODALES FLOTTANTES
// =============================================================================

/**
 * Met à jour le texte du bouton de menu dans le dock inférieur sans détruire l'icône.
 * @param {string} texte
 */
function actualiserTexteMenuToggle(texte) {
    const menuToggle = document.getElementById('menu-toggle');
    if (!menuToggle) return;
    const textSpan = menuToggle.querySelector('.menu-text');
    if (textSpan) {
        textSpan.textContent = texte;
    } else {
        menuToggle.innerHTML = `<span class="menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></span> <span class="menu-text">${texte}</span>`;
    }
}

/**
 * Ouvre ou ferme le volet d'informations (desktop ou mobile).
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

function fermerSidebarDesktop() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    if (sidebar) sidebar.classList.add('desktop-collapsed');
    if (menuToggle) menuToggle.classList.remove('active');
    actualiserTexteMenuToggle(personnageActifId ? 'Voir les étapes' : 'Voir les lieux');
    invaliderTailleCarte();
    setTimeout(() => invaliderTailleCarte(), 360);
}

function ouvrirSidebarDesktop() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    if (sidebar) sidebar.classList.remove('desktop-collapsed');
    if (menuToggle) menuToggle.classList.add('active');
    actualiserTexteMenuToggle('Masquer');
    invaliderTailleCarte();
    setTimeout(() => invaliderTailleCarte(), 360);
}

function ouvrirMenuMobile() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    const menuToggle = document.getElementById('menu-toggle');

    if (sidebar) {
        sidebar.classList.add('open');
        sidebar.style.transform = '';
    }
    if (backdrop) backdrop.classList.add('active');
    if (menuToggle) menuToggle.classList.add('active');

    fermerTousModals();
}

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
    if (menuToggle) menuToggle.classList.remove('active');
}

/**
 * Indique si le volet est fermé (PC ou smartphone).
 * @returns {boolean}
 */
function estVoletFerme() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return false;
    return (window.innerWidth >= 768)
        ? sidebar.classList.contains('desktop-collapsed')
        : !sidebar.classList.contains('open');
}

/**
 * Ferme le volet latéral quelle que soit la taille d'écran.
 * Appelé depuis le bouton ✕ et la zone de poignée tactile.
 */
function fermerVolet() {
    if (window.innerWidth >= 768) {
        fermerSidebarDesktop();
    } else {
        fermerMenuMobile();
    }
}
window.fermerVolet = fermerVolet;



function ouvrirModalMentionsLegales(section) {
    const modal = document.getElementById('modal-mentions-legales');
    const backdrop = document.getElementById('legal-backdrop');
    if (modal) modal.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.classList.add('modal-open');
    annoncerAccessibilite("Ouverture des mentions légales et sources");

    if (section === 'sources') {
        setTimeout(() => {
            const sourcesSection = document.getElementById('legal-sources-section');
            if (sourcesSection) {
                sourcesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 120);
    }
}

function fermerModalMentionsLegales() {
    const modal = document.getElementById('modal-mentions-legales');
    const backdrop = document.getElementById('legal-backdrop');
    if (modal) modal.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
}

function fermerTousModals() {
    toggleSearchHeader(false);
    fermerModalMentionsLegales();
    document.getElementById('modal-backdrop')?.classList.remove('active');
    fermerTousDropdownsFonds();
}

// Touche Échap pour fermer les panneaux ouverts
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fermerTousModals();
});

// =============================================================================
// PARTIE 9 : INTÉGRATION GPS NATIVE (GOOGLE MAPS & APPLE MAPS)
// =============================================================================

/**
 * Ouvre un point précis dans le GPS natif (Apple Maps sur iOS, Google Maps ailleurs).
 * @param {number} lat
 * @param {number} lng
 * @param {string} [titre]
 */
function ouvrirPointDansGPS(lat, lng, titre) {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    const label = titre ? encodeURIComponent(titre) : `${lat},${lng}`;
    const url = isIOS
        ? `https://maps.apple.com/?daddr=${lat},${lng}&q=${label}&dirflg=w`
        : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;

    window.open(url, '_blank');
}

/**
 * Ouvre l'ensemble des étapes du parcours actif dans le GPS.
 */
function ouvrirTousPointsDansGPS() {
    if (!personnageActifId || !dataPersonnes[personnageActifId]) return;
    const etapesVisibles = dataPersonnes[personnageActifId].etapes.filter(e => pointExistePourFond(e, fondActif));
    const coords = etapesVisibles.map(e => e.coords);
    if (!coords || coords.length === 0) return;
    if (coords.length === 1) {
        ouvrirPointDansGPS(coords[0][0], coords[0][1], etapesVisibles[0].titre);
        return;
    }
    ouvrirItineraireMultiPointsDansGPS(coords);
}

/**
 * Ouvre l'ensemble des lieux de justice sélectionnés dans le GPS.
 */
function ouvrirTousLieuxJusticeDansGPS() {
    const lieuxCoords = [];
    const categories = (filtreJusticeActif && filtreJusticeActif !== 'tous')
        ? [filtreJusticeActif]
        : ['juridiques', 'carceraux', 'memoire', 'execution'];

    categories.forEach(catKey => {
        if (dataLieuxJustice[catKey]) {
            dataLieuxJustice[catKey].lieux.forEach(lieu => {
                if (pointExistePourFond(lieu, fondActif)) {
                    lieuxCoords.push(lieu.coords);
                }
            });
        }
    });

    if (lieuxCoords.length === 0) return;
    if (lieuxCoords.length === 1) {
        ouvrirPointDansGPS(lieuxCoords[0][0], lieuxCoords[0][1], 'Lieu de Justice');
        return;
    }
    ouvrirItineraireMultiPointsDansGPS(lieuxCoords);
}

/**
 * Construit l'URL d'itinéraire multi-points pour Google Maps ou Apple Maps.
 * @param {Array<[number, number]>} coords
 */
function ouvrirItineraireMultiPointsDansGPS(coords) {
    if (!coords || coords.length < 2) return;

    const origin = coords[0];
    const dest = coords[coords.length - 1];
    const intermediates = coords.slice(1, -1);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    let gpsUrl = '';

    if (isIOS) {
        let daddr = `${dest[0]},${dest[1]}`;
        if (intermediates.length > 0) {
            daddr = intermediates.map(c => `${c[0]},${c[1]}`).join('+to:') + '+to:' + daddr;
        }
        gpsUrl = `https://maps.apple.com/?saddr=${origin[0]},${origin[1]}&daddr=${daddr}&dirflg=w`;
    } else {
        let waypointsQuery = '';
        if (intermediates.length > 0) {
            const waypointsStr = intermediates.slice(0, 9).map(c => `${c[0]},${c[1]}`).join('|');
            waypointsQuery = `&waypoints=${encodeURIComponent(waypointsStr)}`;
        }
        gpsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin[0]},${origin[1]}&destination=${dest[0]},${dest[1]}${waypointsQuery}&travelmode=walking`;
    }

    window.open(gpsUrl, '_blank');
}

/**
 * Alias de compatibilité pour l'ouverture du parcours complet.
 */
function ouvrirDansAppGPS() {
    ouvrirTousPointsDansGPS();
}

/**
 * Remplit le sélecteur GPS avec les étapes du personnage actif.
 * @param {Object} personne
 */
function peuplerSelectGpsPersonne(personne) {
    const select = document.getElementById('select-gps-point-personne');
    if (!select || !personne || !personne.etapes) return;

    select.innerHTML = '';
    personne.etapes.forEach((etape, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = `Étape ${index + 1} : ${etape.titre}`;
        select.appendChild(opt);
    });

    if (etapeActiveIndex !== null && etapeActiveIndex !== undefined) {
        select.value = etapeActiveIndex;
    }

    select.onchange = function() {
        const idx = parseInt(this.value, 10);
        if (!isNaN(idx)) focusSurEtape(idx);
    };
}

function ouvrirPointSelectionneDansGPS() {
    if (!personnageActifId || !dataPersonnes[personnageActifId]) return;
    const personne = dataPersonnes[personnageActifId];
    const select = document.getElementById('select-gps-point-personne');
    const index = select ? parseInt(select.value, 10) : (etapeActiveIndex || 0);
    const etape = personne.etapes[index] || personne.etapes[0];
    if (etape) ouvrirPointDansGPS(etape.coords[0], etape.coords[1], etape.titre);
}

/**
 * Remplit le sélecteur GPS avec les lieux de justice.
 * @param {string} [filtre='tous']
 */
function peuplerSelectGpsJustice(filtre) {
    const select = document.getElementById('select-gps-point-justice');
    if (!select) return;

    select.innerHTML = '';
    const categories = (filtre && filtre !== 'tous') ? [filtre] : ['juridiques', 'carceraux', 'memoire', 'execution'];
    categories.forEach(catKey => {
        const cat = dataLieuxJustice[catKey];
        if (cat) {
            cat.lieux.forEach((lieu, idx) => {
                if (!pointExistePourFond(lieu, fondActif)) return;
                const opt = document.createElement('option');
                opt.value = `${catKey}_${idx}`;
                opt.textContent = `${lieu.nom} (${cat.nomCategorie})`;
                select.appendChild(opt);
            });
        }
    });

    select.onchange = function() {
        if (!this.value) return;
        const [catKey, idxStr] = this.value.split('_');
        const idx = parseInt(idxStr, 10);
        focusSurLieuJustice(catKey, idx);
    };
}

function ouvrirLieuJusticeSelectionneDansGPS() {
    const select = document.getElementById('select-gps-point-justice');
    if (!select || !select.value) return;
    const [catKey, idxStr] = select.value.split('_');
    const idx = parseInt(idxStr, 10);
    if (dataLieuxJustice[catKey] && dataLieuxJustice[catKey].lieux[idx]) {
        const lieu = dataLieuxJustice[catKey].lieux[idx];
        ouvrirPointDansGPS(lieu.coords[0], lieu.coords[1], lieu.nom);
    }
}

// =============================================================================
// PARTIE 10 : GESTES TACTILES & EXPORTS GLOBAUX
// =============================================================================

/**
 * Active le glissement tactile vers le bas (Swipe Down) pour rabattre le volet mobile.
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

    sidebar.addEventListener('touchstart', (e) => {
        if (window.innerWidth >= 768 || !sidebar.classList.contains('open')) return;
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
        dragInitiated = isHandle || isHeader || (sidebar.scrollTop <= 2);
    }, { passive: true });

    sidebar.addEventListener('touchmove', (e) => {
        if (window.innerWidth >= 768 || !dragInitiated) return;
        if (e.touches.length !== 1) return;

        const touch = e.touches[0];
        const deltaY = touch.clientY - touchStartY;
        const deltaX = touch.clientX - touchStartX;

        if (deltaY > 0 && Math.abs(deltaY) > Math.abs(deltaX)) {
            if (sidebar.scrollTop > 2 && !isDragging) return;

            isDragging = true;
            currentDeltaY = deltaY;
            if (e.cancelable) e.preventDefault();

            sidebar.style.transition = 'none';
            sidebar.style.transform = `translateY(${deltaY}px)`;

            if (backdrop) {
                const opacity = Math.max(0, 1 - (deltaY / 280));
                backdrop.style.opacity = opacity.toString();
            }
        } else if (deltaY < 0 && isDragging) {
            currentDeltaY = 0;
            sidebar.style.transform = 'translateY(0)';
        }
    }, { passive: false });

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
        const velocity = currentDeltaY / elapsedTime;

        if (currentDeltaY > 50 || (currentDeltaY > 25 && velocity > 0.35)) {
            fermerMenuMobile();
        } else {
            sidebar.style.transform = '';
        }
        currentDeltaY = 0;
    };

    sidebar.addEventListener('touchend', finGlissement, { passive: true });
    sidebar.addEventListener('touchcancel', finGlissement, { passive: true });
}

// Initialisation au chargement du DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGestesTiroirMobile);
} else {
    initGestesTiroirMobile();
}

// Exports pour les gestionnaires d'événements HTML inline et Leaflet
window.dataPersonnes = dataPersonnes;
window.dataLieuxJustice = dataLieuxJustice;
window.pointExisteEn1950 = pointExisteEn1950;
window.pointExistePourFond = pointExistePourFond;
window.actualiserMarqueursJustice = actualiserMarqueursJustice;
window.actualiserVisibiliteBoutonTheme = actualiserVisibiliteBoutonTheme;
window.ouvrirCarte = ouvrirCarte;
window.ouvrirCarteJustice = ouvrirCarteJustice;
window.retourAccueil = retourAccueil;
window.basculerThemeUnique = basculerThemeUnique;
window.basculerModeSombreClair = basculerModeSombreClair;
window.changerFondCarte = changerFondCarte;
window.toggleDropdownFondsPersonne = toggleDropdownFondsPersonne;
window.toggleDropdownFondsJustice = toggleDropdownFondsJustice;
window.choisirFondPlan = choisirFondPlan;
window.filtrerJustice = filtrerJustice;
window.focusSurLieuJustice = focusSurLieuJustice;
window.focusSurEtape = focusSurEtape;
window.toggleMenu = toggleMenu;
window.fermerSidebarDesktop = fermerSidebarDesktop;
window.ouvrirSidebarDesktop = ouvrirSidebarDesktop;
window.fermerMenuMobile = fermerMenuMobile;
window.ouvrirMenuMobile = ouvrirMenuMobile;
window.ouvrirModalMentionsLegales = ouvrirModalMentionsLegales;
window.fermerModalMentionsLegales = fermerModalMentionsLegales;
window.fermerTousModals = fermerTousModals;
window.ouvrirPointDansGPS = ouvrirPointDansGPS;
window.ouvrirTousPointsDansGPS = ouvrirTousPointsDansGPS;
window.ouvrirTousLieuxJusticeDansGPS = ouvrirTousLieuxJusticeDansGPS;
window.ouvrirPointSelectionneDansGPS = ouvrirPointSelectionneDansGPS;
window.ouvrirLieuJusticeSelectionneDansGPS = ouvrirLieuJusticeSelectionneDansGPS;
window.ouvrirDansAppGPS = ouvrirDansAppGPS;
window.estVoletFerme = estVoletFerme;
window.centrerCarteSurPopup = centrerCarteSurPopup;
window.actualiserTexteMenuToggle = actualiserTexteMenuToggle;

// =============================================================================
// NOUVELLES FONCTIONNALITÉS : RECHERCHE CONTEXTUELLE
// =============================================================================

// 1. Recherche Contextuelle (Page active : uniquement les éléments de la page affichée)
const searchInput = document.getElementById('global-search-input');
const searchResults = document.getElementById('search-results');

function toggleSearchHeader(forceState) {
    const modal = document.getElementById('header-search-modal');
    const btn = document.getElementById('header-search-toggle-btn');
    const input = document.getElementById('global-search-input');
    if (!modal) return;

    const isCurrentlyOpen = modal.style.display !== 'none';
    const willOpen = (typeof forceState === 'boolean') ? forceState : !isCurrentlyOpen;

    if (willOpen) {
        modal.style.display = 'flex';
        if (btn) btn.classList.add('active');
        if (input) {
            setTimeout(() => {
                input.focus();
                input.select();
            }, 60);
        }
    } else {
        modal.style.display = 'none';
        if (btn) btn.classList.remove('active');
        if (searchResults) searchResults.classList.remove('active');
    }
}
window.toggleSearchHeader = toggleSearchHeader;

if (searchInput && searchResults) {
    searchInput.addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = '';

        if (term.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        let results = [];

        // Contexte A : Un personnage résistant est actif -> On ne cherche QUE dans ses étapes
        if (personnageActifId && dataPersonnes[personnageActifId]) {
            const perso = dataPersonnes[personnageActifId];
            perso.etapes.forEach((etape, index) => {
                const titre = (etape.titre || '').toLowerCase();
                const lieu = (etape.lieu || '').toLowerCase();
                const desc = (etape.desc || '').toLowerCase();
                const date = (etape.date || '').toLowerCase();

                if (titre.includes(term) || lieu.includes(term) || desc.includes(term) || date.includes(term)) {
                    results.push({
                        type: 'etape-active',
                        index: index,
                        title: `Étape ${index + 1} : ${etape.titre}`,
                        desc: `📍 ${etape.lieu}${etape.date ? ' • ' + etape.date : ''}`
                    });
                }
            });
        } 
        // Contexte B : Page des Lieux de Justice -> On ne cherche QUE dans les lieux de justice
        else {
            for (const [catKey, cat] of Object.entries(dataLieuxJustice)) {
                cat.lieux.forEach((lieu, index) => {
                    const nom = (lieu.nom || '').toLowerCase();
                    const adr = (lieu.adresse || '').toLowerCase();
                    const role = (lieu.role || '').toLowerCase();
                    const dates = (lieu.dates || '').toLowerCase();

                    if (nom.includes(term) || adr.includes(term) || role.includes(term) || dates.includes(term)) {
                        results.push({
                            type: 'lieu-actif',
                            catKey: catKey,
                            index: index,
                            title: lieu.nom,
                            desc: `${cat.icon || '⚖️'} ${cat.nomCategorie}${lieu.dates ? ' • ' + lieu.dates : ''}`
                        });
                    }
                });
            }
        }

        if (results.length > 0) {
            results.slice(0, 8).forEach(res => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.innerHTML = `<span class="search-result-title">${res.title}</span><span class="search-result-desc">${res.desc}</span>`;
                div.addEventListener('click', () => {
                    if (res.type === 'etape-active') {
                        focusSurEtape(res.index);
                    } else if (res.type === 'lieu-actif') {
                        focusSurLieuJustice(res.catKey, res.index);
                    }
                    searchInput.value = '';
                    searchResults.classList.remove('active');
                    toggleSearchHeader(false);
                });
                searchResults.appendChild(div);
            });
            searchResults.classList.add('active');
        } else {
            searchResults.classList.remove('active');
        }
    });

    document.addEventListener('click', (e) => {
        const modal = document.getElementById('header-search-modal');
        const btn = document.getElementById('header-search-toggle-btn');
        if (modal && modal.style.display !== 'none') {
            if (!modal.contains(e.target) && (!btn || !btn.contains(e.target))) {
                toggleSearchHeader(false);
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleSearchHeader(false);
        }
    });
}

// 2. Recherche Globale sur la Page d'Accueil (Recherche dans TOUT le patrimoine historique)
const landingSearchInput = document.getElementById('landing-search-input');
const landingSearchResults = document.getElementById('landing-search-results');

if (landingSearchInput && landingSearchResults) {
    landingSearchInput.addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase().trim();
        landingSearchResults.innerHTML = '';

        if (term.length < 2) {
            landingSearchResults.classList.remove('active');
            return;
        }

        let results = [];

        // Recherche transversale parmi tous les personnages
        for (const [id, personne] of Object.entries(dataPersonnes)) {
            if (personne.nom.toLowerCase().includes(term) || (personne.role && personne.role.toLowerCase().includes(term))) {
                results.push({
                    type: 'personne',
                    id: id,
                    title: personne.nom,
                    desc: `Parcours • ${personne.role || 'Résistance'}`
                });
            }

            // Étapes de chaque personnage
            personne.etapes.forEach((etape, index) => {
                const titre = (etape.titre || '').toLowerCase();
                const lieu = (etape.lieu || '').toLowerCase();
                const desc = (etape.desc || '').toLowerCase();
                const date = (etape.date || '').toLowerCase();

                if (titre.includes(term) || lieu.includes(term) || desc.includes(term) || date.includes(term)) {
                    results.push({
                        type: 'etape',
                        id: id,
                        index: index,
                        title: etape.titre,
                        desc: `${personne.nom} • ${etape.date || etape.lieu}`
                    });
                }
            });
        }

        // Recherche transversale parmi tous les lieux de justice
        for (const [catKey, cat] of Object.entries(dataLieuxJustice)) {
            cat.lieux.forEach((lieu, index) => {
                const nom = (lieu.nom || '').toLowerCase();
                const adr = (lieu.adresse || '').toLowerCase();
                const role = (lieu.role || '').toLowerCase();
                const dates = (lieu.dates || '').toLowerCase();

                if (nom.includes(term) || adr.includes(term) || role.includes(term) || dates.includes(term)) {
                    results.push({
                        type: 'lieu',
                        catKey: catKey,
                        index: index,
                        title: lieu.nom,
                        desc: `${cat.icon || '⚖️'} ${cat.nomCategorie}${lieu.dates ? ' • ' + lieu.dates : ''}`
                    });
                }
            });
        }

        if (results.length > 0) {
            results.slice(0, 10).forEach(res => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.innerHTML = `<span class="search-result-title">${res.title}</span><span class="search-result-desc">${res.desc}</span>`;
                div.addEventListener('click', () => {
                    executeLandingSearchResult(res);
                    landingSearchInput.value = '';
                    landingSearchResults.classList.remove('active');
                });
                landingSearchResults.appendChild(div);
            });
            landingSearchResults.classList.add('active');
        } else {
            landingSearchResults.classList.remove('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!landingSearchInput.contains(e.target) && !landingSearchResults.contains(e.target)) {
            landingSearchResults.classList.remove('active');
        }
    });
}

function executeLandingSearchResult(res) {
    if (res.type === 'personne') {
        ouvrirCarte(res.id);
    } else if (res.type === 'etape') {
        ouvrirCarte(res.id);
        setTimeout(() => focusSurEtape(res.index), 600);
    } else if (res.type === 'lieu') {
        ouvrirCarteJustice();
        setTimeout(() => focusSurLieuJustice(res.catKey, res.index), 600);
    }
}

