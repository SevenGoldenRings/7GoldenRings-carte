// Récupération des éléments HTML
const map = document.getElementById('map');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('location-title');
const modalInfo = document.getElementById('location-info');

let blocMarker; // Déclaration de blocMarker en dehors de la boucle forEach

// Création des marqueurs pour chaque localisation
data.locations.forEach(location => {
  const blocMarker = document.createElement('div');
  blocMarker.classList.add('BlocMarker'); // Ajout de la classe BlocMarker


  // Ajout d'une classe correspondant au type de lieu
  let typeClass = '';
  if (location.type === 'capitale') {
    typeClass = 'capitale';
  } else if (location.type === 'zone rp') {
    typeClass = 'zonerp';
  } else if (location.type === 'lieu d’intérêt') {
    typeClass = 'interest';
  } else if (location.type === 'texte') {
    typeClass = 'text';
  }

  
  blocMarker.classList.add(typeClass); // Ajout de la classe correspondant au type de lieu

  blocMarker.style.left = location.x + 'px';
  blocMarker.style.top = location.y + 'px';

  
  // Ajout d'un écouteur d'événements de clic à chaque marqueur
  blocMarker.addEventListener('click', () => {
    // Remplissage de la modal avec les détails de la localisation cliquée

  
    // Génération du contenu HTML personnalisé pour la modal
    const modalCustomContent = `<div class="Bg${location.royaume} carteTitre">
  <div class="titreEtLevelCorrupt">
    <div class="titre">${location.title}</div>
    <div class="balance">zone ${location.levelBalance}</div>
  </div>
  <a href="https://7goldenrings.forumactif.com/f${location.lien}-" target="_blank"/>s'y rendre</a>
</div><div class="modalContenu">
  <div class="carteDescription">
    <p>${location.description}</p>
  </div>
  <div class="carteImgDanger">
    <img src="${location.image}" class="carteIMGmodal"/>
    <div class="royaume_stats">
      <ul>
        <li>Danger</li>
        <li class="Bloc${location.royaume}">
          ${location.dangerIndicatorHTML}
        </li>
      </ul>
    </div>
  </div>
</div>
    `;
  
    // Affichage de la modal avec le contenu généré
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = modalCustomContent;
  
    // Affichage de la modal
    modal.style.display = 'block';
  });


    // Écouteur d'événement pour fermer la modal en cliquant en dehors de la modal
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });

  const marker = document.createElement('div');
  marker.classList.add('marker');

  if (location.type === 'capitale') {
    marker.classList.add('capital');
  } else if (location.type === 'zone rp') {
    marker.classList.add('zone-rp');
    const titleBelow = document.createElement('div');
    titleBelow.classList.add('title-below');
    titleBelow.textContent = location.title;
    blocMarker.appendChild(titleBelow);
  } else if (location.type === 'lieu d’intérêt') {
    marker.classList.add('interest');
    const titleBelow = document.createElement('div');
    titleBelow.classList.add('title-below');
    titleBelow.textContent = location.title;
    blocMarker.appendChild(titleBelow);
  } else if (location.type === 'texte') {
    marker.classList.add('text');
    marker.textContent = location.title;
  }

  blocMarker.appendChild(marker); // Ajout du marqueur à la div BlocMarker

  if (location.type === 'capitale') {
    const titleBelow = document.createElement('div');
    titleBelow.classList.add('title-below');
    titleBelow.textContent = location.title;

    blocMarker.appendChild(titleBelow); // Ajout du titre à l'intérieur de la div BlocMarker
  }

  map.appendChild(blocMarker); // Ajout de la div BlocMarker à la carte
});




// Fonction pour supprimer les titres des lieux en fonction du type
function removeLocationsByType(type) {
  const titles = document.querySelectorAll('.title-below');
  titles.forEach(title => {
    const titleLocation = data.locations.find(location => location.title === title.textContent && location.type === type);
    if (titleLocation) {
      map.removeChild(title); // Suppression du titre du DOM
    }
  });
}

// Récupération du bouton btnZoneRP
const btnZoneRP = document.getElementById('btnZoneRP');

// Écouteur d'événement pour le clic sur btnZoneRP
btnZoneRP.addEventListener('click', () => {
  // Sélection des titres associés au type "zone rp"
  const titlesZoneRP = document.querySelectorAll('.BlocMarker.zonerp .title-below');

  // Parcours des titres pour basculer leur visibilité
  titlesZoneRP.forEach(title => {
    // Vérifier si le style display est actuellement "none"
    const isHidden = window.getComputedStyle(title).getPropertyValue('display') === 'none';

    // Basculer la visibilité : cacher si actuellement visible, afficher sinon
    title.style.display = isHidden ? 'block' : 'none';
  });
});


// Récupération du bouton btnLieuInteret
const btnLieuInteret = document.getElementById('btnLieuInteret');

// Écouteur d'événement pour le clic sur btnLieuInteret
btnLieuInteret.addEventListener('click', () => {
  // Sélection des titres associés au type "lieu d’intérêt"
  const titlesInteret = document.querySelectorAll('.BlocMarker.interest .title-below');

  // Parcours des titres pour basculer leur visibilité
  titlesInteret.forEach(title => {
    // Vérifier si le style display est actuellement "none"
    const isHidden = window.getComputedStyle(title).getPropertyValue('display') === 'none';

    // Basculer la visibilité : cacher si actuellement visible, afficher sinon
    title.style.display = isHidden ? 'block' : 'none';
  });
});

// Gestion du bouton pour cacher les marqueurs de type "capitale"
const btnHideCapitale = document.getElementById('btnHideCapitale');
btnHideCapitale.addEventListener('click', () => {
  const markers = document.querySelectorAll('.capital'); // Sélection des marqueurs de type "capitale"
  markers.forEach(capitalMarker => {
    const blocMarker = capitalMarker.parentElement; // Récupération du parent BlocMarker
    if (blocMarker.style.visibility !== 'hidden') {
      blocMarker.style.visibility = 'hidden'; // Cacher le BlocMarker associé au marqueur de type "capitale"
    } else {
      blocMarker.style.visibility = 'visible'; // Rendre le BlocMarker visible
    }
  });
});

// Gestion du bouton pour cacher les marqueurs de type "Zone RP"
const btnHideZoneRP = document.getElementById('btnHideZoneRP');
btnHideZoneRP.addEventListener('click', () => {
const markers = document.querySelectorAll('.zone-rp'); // Sélection des marqueurs de type "Zone RP"
markers.forEach(marker => {
  if (marker.style.visibility !== 'hidden') {
    marker.style.visibility = 'hidden'; // Cacher les marqueurs en utilisant la propriété visibility
  } else {
    marker.style.visibility = 'visible'; // Rendre les marqueurs visibles
  }
});

const titles = document.querySelectorAll('.title-below'); // Sélection de tous les titres
titles.forEach(title => {
  const titleLocation = data.locations.find(location => location.title === title.textContent);
  if (titleLocation.type === 'zone rp') { // Vérification du type du titre
    if (title.style.visibility !== 'hidden') {
      title.style.visibility = 'hidden'; // Cacher les titres associés à la "Zone RP"
    } else {
      title.style.visibility = 'visible'; // Rendre les titres visibles
    }
  }
});
});

// Gestion du bouton pour cacher les marqueurs de type "Lieu d'intérêt"
const btnHideLieuInteret = document.getElementById('btnHideLieuInteret');
btnHideLieuInteret.addEventListener('click', () => {
const markers = document.querySelectorAll('.interest'); // Sélection des marqueurs de type "Lieu d'intérêt"
markers.forEach(marker => {
  if (marker.style.visibility !== 'hidden') {
    marker.style.visibility = 'hidden'; // Cacher les marqueurs en utilisant la propriété visibility
  } else {
    marker.style.visibility = 'visible'; // Rendre les marqueurs visibles
  }
});

const titles = document.querySelectorAll('.title-below'); // Sélection de tous les titres
titles.forEach(title => {
  const titleLocation = data.locations.find(location => location.title === title.textContent);
  if (titleLocation.type === 'lieu d’intérêt') { // Vérification du type du titre
    if (title.style.visibility !== 'hidden') {
      title.style.visibility = 'hidden'; // Cacher les titres associés au type "Lieu d'intérêt"
    } else {
      title.style.visibility = 'visible'; // Rendre les titres visibles
    }
  }
});
});

// Gestion du bouton pour cacher les marqueurs de type "texte"
const btnHideTexte = document.getElementById('btnHideTexte');
btnHideTexte.addEventListener('click', () => {
const markers = document.querySelectorAll('.text'); // Sélection des marqueurs de type "texte"
markers.forEach(marker => {
  if (marker.style.visibility !== 'hidden') {
    marker.style.visibility = 'hidden'; // Cacher les marqueurs en utilisant la propriété visibility
  } else {
    marker.style.visibility = 'visible'; // Rendre les marqueurs visibles
  }
});

const titles = document.querySelectorAll('.title-below'); // Sélection de tous les titres
titles.forEach(title => {
  const titleLocation = data.locations.find(location => location.title === title.textContent);
  if (titleLocation.type === 'texte') { // Vérification du type du titre
    if (title.style.visibility !== 'hidden') {
      title.style.visibility = 'hidden'; // Cacher les titres associés au type "texte"
    } else {
      title.style.visibility = 'visible'; // Rendre les titres visibles
    }
  }
});
});

















// Votre code pour gérer la visibilité des zones en JavaScript
const territoireButtons = [
{ buttonId: 'vollheimButton', zoneClass: 'vollheim' },
{ buttonId: 'arvandorButton', zoneClass: 'arvandor' },
{ buttonId: 'xingAldaButton', zoneClass: 'xingAlda' },
{ buttonId: 'cerahButton', zoneClass: 'cerah' },
{ buttonId: 'alMalaqButton', zoneClass: 'alMalaq' },
{ buttonId: 'claraNocteButton', zoneClass: 'claraNocte' },
{ buttonId: 'anandaButton', zoneClass: 'ananda' },
{ buttonId: 'nomadeButton', zoneClass: 'nomades' },

// ... Ajoutez d'autres boutons et classes de zone de la même manière
];

// Fonction pour gérer le clic sur un bouton et la visibilité des zones correspondantes
function toggleZoneVisibility(buttonId, zoneClass) {
const button = document.getElementById(buttonId);
const zones = document.querySelectorAll(`.zone.${zoneClass}`);

button.addEventListener('click', () => {
  zones.forEach(zone => {
    zone.classList.toggle('zoneVisible');
  });
});
}

// Gestion de la visibilité des différentes zones en utilisant la fonction pour chaque bouton
territoireButtons.forEach(({ buttonId, zoneClass }) => {
toggleZoneVisibility(buttonId, zoneClass);
});


// Sélection de tous les boutons avec la classe togglebtn
const toggleButtons = document.querySelectorAll('.togglebtn');

// Ajout d'un écouteur d'événements à chaque bouton
toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Toggle de la classe BtnActif pour activer ou désactiver le style du bouton
    button.classList.toggle('BtnActif');
  });
});



//////////////////////////////////////POUR LE GRAB ET LE ZOOM

document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner l'élément contenant la carte
  const mapElement = document.getElementById('map');

  // Activer Panzoom sur l'élément de la carte
  const panzoom = Panzoom(mapElement, {
    maxScale: 4, // Définir l'échelle maximale de zoom
    contain: 'outside', // Empêcher le débordement de la carte
  });

  // Écouter les événements de zoom avec la molette de la souris
  mapElement.addEventListener('wheel', panzoom.zoomWithWheel);

  // Activer le déplacement (drag) de la carte en maintenant le clic de la souris
  mapElement.addEventListener('mousedown', function(event) {
    if (event.target === mapElement) {
      panzoom.startPan(event);
    }
  });

  // Arrêter le déplacement de la carte lorsque le clic de la souris est relâché
  document.addEventListener('mouseup', panzoom.endPan);

  // Mettre à jour Panzoom lorsque la taille de la fenêtre change
  window.addEventListener('resize', () => {
    panzoom.resetDimensions();
  });

  // Bouton de zoom in
  document.getElementById('zoom-in').addEventListener('click', function() {
    panzoom.zoomIn();
  });

  // Bouton de zoom out
  document.getElementById('zoom-out').addEventListener('click', function() {
    panzoom.zoomOut();
  });
});
