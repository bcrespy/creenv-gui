# Creenv GUI

**@creenv/gui** is the gui used within the Creative Environment project. It is bundled with *Creenv* by default. The Creative Environment Graphical User Interace solves 2 issues you may have met trying to add controls to your projects: redundancy and too much of a trouble to setup. Using the strength of es6 files encapsulation, you will now be able to define a controllable config on your creative projects. 

## Show me how it's done

The idea behind this GUI is to have 2 objects:
- a config object: it will contain all the properties used in live by your application 
- a controls object: it will be used at the initialization to explain to the GUI the constraints over each controllable property

So, without splitting the objects into multiple files for readability (as it is in after you run the cli *create-creenv*), this is what the initialization of the GUI would look like:

```js
// the config 
var config = {
  strength: 13,
  background: new Color(255,25,255,0.8), // can also be a string, ex: #efef17
  isGlowActive: false,
  textToDisplay: "test"
};

var userControls = {
  object: config, 
  controls: [

    [
      "a folder name",
      {
        property: "strength",
        min: 0, max: 150, step: 30,
        callback: val => { console.log("number updated: "+val); }
      },
      {
        property: "background" // we leave full control to the user here 
      }
    ],

    [
      "another folder",
      {
        property: "isGlowActive",
        callback: val => { console.log("boolean changed: "+val) }
      },
      {
        property: "textToDisplay"
      }
    ]

  ]
}

var gui = new GUI(userControls);

```

**aaaaand... BOOM:**

[ici image]

As simple as that. Now, whenver you'll want to get the values of the *config* variable, they will match the one provided by the user.

## What you need to know 

There are a few things you need to know about the GUI if you want to use it wisely. 

### Structure of the controls object 

The controls object must match a specific structure, otherwise it won't be transformed into the desired UI.

```js
// the controls variable is an object, it must have at least 2 properties :
let controls = {

  // the variable, an object in which the properties are stored
  object: yourConfigObject,

  // an array with all the controls, in which all items follow a schema
  controls: [

    // if the item is an object, it will be considered as a controller
    {
      // a controller must have a "property" property. it will match the name of the
      // property in the config object, see the example above. must be a string
      property: "propertyName",

      /**
       * depending on the type of the property, the controller will either be: 
       * string: input text
       * boolean: checkbox 
       * string, css color format: color picker
       * number: slider
       * it's automatic. look at the example above
       * */

      // everything else is optional. look at the controls property below to learn
      // about the controllers properties you can use
    }

  ]

}
```

**The philosophy behind this architecture is to create you config object with default values, that will be used at the initialization of your app. In the render loop, the config values are used by algorithms, and because those values are changed in real time, the algorithms will use those new values. There is no need for callback mechanism, even though it is available, because required in some cases.**