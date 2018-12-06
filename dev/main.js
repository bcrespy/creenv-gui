import GUI from '../lib/index';
import Color from '@creenv/color';



// usage 
var config = {
  paramName: 13,
  param2: new Color(50,20,50,0.5),
  param3: false,
  param4: "test",
  p: new Color(50,20,50,0.5),
  t: 10,
  lol: true
};

var config2 = {
  prop1: 7,
  propLol: "lol"
}



var userControls = {
  object: config, 
  controls: [

    {
      property: "t",
      midi: true,
      onChange: val => { console.log(val); },
      min: 0, max: 100,
      step: 5,
      id: 16
    },

    {
      object: config2,
      property: "prop1",
      min: 0, max: 20,
      callback: console.log
    },

    {
      property: "lol",
      midi: true,
      onPress: val => { console.log(val); },
      active: config.lol,
      unique: false,
      id: 1
    },

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
        options: {
          suggestions: [
            new Color(255,20,50),
            new Color(255,0,0),
            new Color(20,50,250, 0.5)
          ]
        }
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