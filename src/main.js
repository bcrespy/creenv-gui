var GUI = require('../lib/index');







// usage 
var config = {
  param1: 13,
  param2: "#17171717",
  param3: true,
  param4: "test"
};

var userControls = {
  object: config, 
  controls: [

    [
      "folder name",

      {
        // object: config,
        property: "param1",
        min: 0, max: 150, step: 30,
        callback: val => { console.log("number updated: "+val); },
        callbackFinished: val => { console.log("number update finished "+val); },
        hudName: "Premier paramètre"
      },

      {
        property: "param2", 
        callback: val => { console.log("new rgba color: "+val); },
        callbackFinished: val => { console.log("new rgba color: "+val); }
      }
    ],

    [
      "other folder",

      {

      }
    ]
  ]
}

let gui = new GUI(userControls);

let elem = document.getElementById("folder-test");
let f = GUI.generateTogglingFolderFunc(elem);
elem.addEventListener("click", f);




// il faut une fonction 
// GUI.printParams qui retourne 
// { param1: 13, param2: "#1818181" ... }

//https://www.npmjs.com/package/pickr-widget