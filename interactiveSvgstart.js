document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});

// nedstående array (const) er sat ind efter jeg har lavet alt der der farve-knap-skift. infoen er fra museum.json filen
const prikker = [
  {
    land: "magasin",
    tekst: "Magasin",
    billede: "magasin",
  },
  {
    land: "dangleterre",
    tekst: "Hotel D'angleterre",
    billede: "dangleterre",
  },
  {
    land: "assistens",
    tekst: "Assistens Kirkegård",
    billede: "gravsted",
  },
  {
    land: "nyhavn",
    tekst: "Nyhavn",
    billede: "nyhavn",
  },
  {
    land: "havfrue",
    tekst: "Den Lille Havfrue",
    billede: "denlillehavfrue",
  },
  {
    land: "tivoli",
    tekst: "Tivoli",
    billede: "tivoli",
  },
];

// FYI: når man bruger async kan man så bruge await og fetch

async function runProgram() {
  let selected;
  // overstående linje er lavet EFTER det der står ved '2. Skift farve ved klik, og vis tekst' og hænger sammen med 2.4 opgaven
  let selectedId;
  // overstående linje er lavet efter 2.4 og hører sammen med 2.b opgaven
  let fillcolor;
  // overstående linje er lavet efter 2.b og hører sammen med 2.c opgaven
  let active;
  //overstående er lavet efter jeg lavede en if med at den skulle skifte farve (opgave: 'skift farve på det valgte')
  const popover = document.querySelector("#landinfo");
  // overstående er lavet efter opgave d.

  // 1. Load svg map
  //------------------------------------------------------------------------------------
  let rawSvg = await fetch("hcandersen-svg.svg");
  // overstående henter rå data

  let svg = await rawSvg.text();
  // overstående tolker dataen som tekst

  document.querySelector("#map").innerHTML = svg;
  // overstående: map refererer til ID'et i 'interactiveSvgstart.html' filen
  // inner.HTML fordi den henter HTML kode
  // '= svg' vi vil gerne loade svg dataen

  // 2. Skift farve ved klik, og vis tekst
  //-----------------------------------------------------------------------
  document.querySelector("#map #prikker").addEventListener("click", (evt) => clicked(evt));
  // overstående: '(evt) => clicked(evt))' betyder at det der skyder funktionen - altså click - afsted, så bliver de her parametre sendt med ned til 'function clicked'

  //function clicked
  //--------------------------------------------------------------------
  function clicked(evt) {
    //a. find det klikkede element
    selected = evt.target;
    console.log(selected);
    // overstående gør at når du åbner html op i live view og inspiserer og kigger på console log, så kan du se når du klikker på de røde prikker, så kommer id frem i console log

    //b. find det klikkede elements ID
    selectedId = selected.id;
    console.log(selectedId);
    // overstående gør at når du åbner html op i live view og inspiserer og kigger på console log, så kan du se når du klikker på de røde prikker, så kommer navnet på id frem som skrift, fx. 'bonde' eller 'ib' i det her tilfælde

    // c. find det klikkede elements fill farve
    fillcolor = selected.getAttribute("fill");
    // overstående: inde i koden ved Kunstpakhuset3 så kan man se at under ID til kunstnere der er en atribut der hedder 'fill' der siger farven i kode
    console.log(fillcolor);
    // overstående gør at når du åbner html op i live view og inspiserer og kigger på console log, så kan du se når du klikker på de røde prikker, så kommer farvekoden på fill/farven frem

    // d. vis info (opgaven laves efter array'et i toppen er sat ind)
    //--------------------------------------------
    prikker.forEach((land) => {
      if (land.land === selectedId) {
        document.querySelector("#landtekst").textContent = land.tekst;
        document.querySelector("#destinationbillede").src = "billeder/" + land.billede + ".webp";
      }
    });
    // overstående henter informationen omkring landtekst og destinationbillede fra artcile i html filen

    // 4. hvis der tidligere har været klikket skal det forige element skifte farve til original (laves efter 'gør det klikkede til det aktive' der står nedenunder)
    //------------------------------------------------------------------------------------

    if (active) {
      active.setAttribute("fill", fillcolor);
    }
    // hvis den er defineret så vil vi gerne have den skal få den der #123456 farve som den skiftes til når der klikkes. og så burde der kun være en blå cirkel ad gangen. altså når du trykker på den - der så er aktiv - så er det kun den der bliver farvet den blå farve

    //gør det klikkede til det aktive (laves efter 'skift farve på det valgte' der står nedenunder)
    //-------------------------------------------------------------------------
    active = selected;
    // overstående betyder at den der er valgt, det er den der er aktiv

    //skift farve på det valgte
    //-------------------------------------------------------------------------
    if (fillcolor == "#ff0000") {
      document.querySelector("#" + selectedId).setAttribute("fill", "#123456");
      // overstående 2 linjer: hvis fillcolor er #ff0000, og så bliver klikket på, så skifter attributen til #123456 og den hedder 'document.querySelector("#" + selectedId)' fordi vi tager fat i 'selectedId'. vi bliver nød til at sætte "#" + foran selectedId - jeg ved ikke hvorfor.
      // her sættes farven på selectedId
    }

    //reset farve og skjul tekst hvis valgt elementet allerede er aktivt
    //--------------------------------------------------------------------------
    else {
      document.querySelector("#" + selectedId).setAttribute("fill", "#ff0000");
      // overstående betyder at hvis den er den blå farve og man klikker på den, så skifter den tilbage til den originale røde farve aka #ff7bba
    }
    popover.togglePopover();
    // overstående er det der pop op vindue som  er linket med const op i toppen
  }
  document.addEventListener("click", () => {
    // lytter efter click så den ved hvornår den skal påvirkes
    if (!popover.matches(":popover-open")) {
      selected.setAttribute("fill", "#ff0000");
    }
    // hvis den her attribut ikke er der (altså den ikke åbner pop op boksen), så skal farve skifte tilbage til rød
  });
}
