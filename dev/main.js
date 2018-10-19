import GUI from '../lib/index';
import Color from '@creenv/color';



// usage 
var config = {
  paramName: 13,
  param2: new Color(50,20,50,0.5),
  param3: false,
  param4: "test",
  p: new Color(50,20,50,0.5)
};



var userControls = {
  object: config, 
  controls: [

    [
      "folder name",

      {
        // object: config,
        property: "paramName",
        min: 0, max: 150, step: 30,
        callback: val => { console.log("number updated: "+val); },
        callbackFinished: val => { console.log("number update finished "+val); },
        hudName: "Premier paramètre"
      },

      {
        property: "param2", 
        callback: val => { console.log("new rgba color: "+val.string); },
        callbackFinished: val => { console.log("new rgba color: "+val.string); }
      }
    ],

    [
      "other folder",

      {
        property: "param3",
        callback: val => { console.log("boolean changed: "+val) }
      },

      {
        property: "param4",
        callback: val => { console.log("string changed: "+val) }
      },

      {
        property: "p"
      }
    ]
  ]
}

let gui = new GUI(userControls, GUI.POSITION.BOTTOM_LEFT);


document.addEventListener("keypress", function(){
gui.getCurrentParams(); })



//https://www.npmjs.com/package/pickr-widget