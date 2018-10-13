"use strict";

/**
 * @creenv/gui 
 * 
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 *                         [https://crespy-baptiste.com]
 *                         [https://github.com/bcrespy]
 * 
 * @license MIT feel free to use and contribute :) 
 * 
 * 
 * Credits
 * 
 * - Cordelia
 *   color picker
 *   @author Cevad Tokatli
 *   [https://github.com/cevadtokatli/cordelia]
 * 
 * - color-string
 *   @author Heather Arthur
 *   [https://github.com/Qix-/color-string]
 * 
 * - uniqid 
 *   @author Halász Ádám
 *   [https://github.com/adamhalasz/uniqid]
 * 
 * 
 * 
 * KNOWN BUG :
 * 
 * when picker is opened, therefore the css property overflow: visible 
 * is set through the class .picker-opened to the folder container. If 
 * folder is then closed, folder container content is still displayed
 */


// css imports 
import 'cordelia/dist/css/cordelia.css';
import './gui-style.css';


import Slider from '@creenv/slider';
import Cordelia from 'cordelia';
import ColorString from 'color-string';
import uniqid from 'uniqid';

// need to transform HUDelement into @creenv/hud-element
import HUDelement from './hud-element';

// controllers 
import Controller from './controllers/controller';
import NumberController from './controllers/number-controller';
import BooleanController from './controllers/boolean-controller';
import ColorController from './controllers/color-controller';
import TextController from './controllers/text-controller';



class GUI extends HUDelement {
  /**
   * Creates a graphical user interface with controls defined by the controls
   * object. The GUI in then appended to the parent
   * 
   * @param {object} controls the object in which controls are defined
   * @param {?number} position the position of the hud, enum GUI.POSITION
   * @param {?boolean} visible weither if the hud is closed or not
   * @param {?HTMLElement} parent the container of the hud
   */
  constructor (controls, position = GUI.POSITION.TOP_RIGHT, visible = true, parent = document.body) {
    super(visible);

    // first we check if the controls object exists 
    if (typeof controls.object !== "object") {
      console.error("Your controls objet should have an object property pointing to an existing object.");
    }

    /**
     * The dom element containing the GUI
     * @type {HTMLElement}
     * @public
     */
    this.dom = GUI.createDomElement();
    this.dom.appendChild(GUI.generateBaseTemplate());

    /**
     * The position of the GUI
     * @type {number}
     * @public 
     */
    this.position = position;

    /**
     * The parent element of the GUI
     * @type {HTMLElement}
     * @public
     */
    this.parent = parent;

    /**
     * Will hold all the used parameters
     * @type {Array.<string>}
     * @private
     */
    this.params = [];

    /**
     * For each property within this.params array, a key named after the property 
     * will be stored in this array, pointing to the controller
     * @type {{keys: Controller}}
     * @private
     */
    this.controllers = {};

    /**
     * The config object where controlled variables are stored 
     * @type {Object}
     * @private
     */
    this.configObject = controls.object;

    this.setPosition(position);

    this.parseControls(controls.controls, this.dom);

    this.parent.appendChild(this.dom);
  }

  /**
   * Creates the DOM element which represents the GUI 
   * 
   * @return {HTMLElement} the dom element
   */
  static createDomElement () {
    let element = document.createElement("div");
    element.classList.add("creenv-gui");
    return element;
  }

  /**
   * Generates a function that toggles the folder opening
   * 
   * @param {HTMLElement} domElem the folder dom element 
   */
  static generateTogglingFolderFunc (domElem) {
    let neighboor = domElem.nextElementSibling;
    let height = neighboor.clientHeight;
    let ficon = domElem.getElementsByClassName("creenv-gui-folder-icon")[0];

    // would be proper somewhere else but well
    if (!neighboor.classList.contains("opened")) {
      neighboor.style.height = 0;
    } else {
      neighboor.style.height = height+"px";
    }

    return () => {
      if (!neighboor.classList.contains("opened")) {
        ficon.innerHTML = "-";
        neighboor.style.height = height+"px";
        neighboor.classList.add("opened");
      } else {
        ficon.innerHTML = "+";
        neighboor.style.height = 0;
        neighboor.classList.remove("opened");
      }
    }
  }

  /**
   * Returns the controller's name given the object properties 
   * 
   * @param {object} controller the object containing the controller params
   * 
   * @return {string} the controller's name
   */
  static getControllerName (controller) {
    if (controller.name !== undefined) return controller.name;
    else return controller.property.split(/(?=[A-Z])/).join(" ");
  }

  /**
   * Generates the base template for the GUI 
   * 
   * @return {HTMLElement} the dom element
   */
  static generateBaseTemplate () {
    let domElement = document.createElement("div");
    domElement.innerHTML = '<div class="creenv-gui-title creenv-gui-item">Controls</div>';
    return domElement;
  }

  /**
   * Generates the dom of the folder given a name 
   * 
   * @param {string} folderName name of the folder
   * 
   * @return {HTMLElement} the dom element representing the folder
   */
  static generateFolderDom (folderName) {
    let folderDom = document.createElement("div");
    folderDom.classList.add("creenv-gui-item", "creenv-gui-folder");
    folderDom.innerHTML = '<span class="creenv-gui-folder-icon">-</span><span class="creenv-gui-folder-title">'+folderName+'</span>';  
    return folderDom;
  }

  /**
   * @param {object} member the config member to analyze
   * 
   * @return {string} a string identifier of the controller type
   */
  getControllerType (member) {
    if (typeof this.configObject[member.property] === "number") {
      return "number";
    } else if (typeof this.configObject[member.property] === "boolean") {
      return "boolean";
    } else if(typeof this.configObject[member.property] === "string" && ColorString.get.rgb(this.configObject[member.property])) {
      return "color";
    } else if (typeof this.configObject[member.property] === "string") {
      return "text";
    } else {
      return "none";
    }
  }

  /**
   * Sets the position of the GUI, absolute to the page
   * 
   * @param {GUI.POSITION} position the position of the GUI
   * 
   * @public
   */
  setPosition (position) {
    this.dom.classList.remove("top", "left", "right", "bottom");

    switch (position) {
      case GUI.POSITION.TOP_LEFT: 
        this.dom.classList.add("top", "left");
      break;

      case GUI.POSITION.TOP_RIGHT: 
        this.dom.classList.add("top", "right");
      break;
      
      case GUI.POSITION.BOTTOM_RIGHT: 
        this.dom.classList.add("bottom", "right");
      break;

      case GUI.POSITION.BOTTOM_LEFT: 
        this.dom.classList.add("bottom", "left");
      break;
    }

    this.position = position;
  }

  /**
   * Parse controls and generate the dom accordingly to those controls
   * TODO: handle the case where callback needs to be applied to config
   * 
   * @param {Array} controls Controls object
   * @param {HTMLElement} parent the container for the generated controllers
   * 
   * @private
   */
  parseControls (controls, parent) {
    controls.forEach(member => {

      // it's a folder 
      if (Array.isArray(member) && typeof member[0] === "string") {

        let copy = member.slice(0);
        copy.shift();
        let folderElem = GUI.generateFolderDom(member[0]);
        let folderContainer = document.createElement("div");
        folderContainer.classList.add("creenv-gui-folder-container", "opened");
        parent.appendChild(folderElem);
        parent.appendChild(folderContainer);

        // wait a bit until the element gets into the dom 
        setTimeout(function () {
          let closeFolderFunc = GUI.generateTogglingFolderFunc(folderElem);
          folderElem.addEventListener("click", closeFolderFunc);
        }, 150);

        this.parseControls(copy, folderContainer);

      // it's controller
      } else {
        let type = this.getControllerType(member),
            controller;

        switch (type) {
          case "number":
            controller = new NumberController(this.configObject, member.property, member.name, member.min, member.max, member.step, member.callback, member.callbackFinished);
            break;

          case "color":
            controller = new ColorController(this.configObject, member.property, member.name, member.callback, member.callbackFinished);
            break;

          case "boolean":
            controller = new BooleanController(this.configObject, member.property, member.name, member.callback);
            break;

          case "text": 
            controller = new TextController(this.configObject, member.property, member.name, member.callback, member.maxlength);
            break;

          default: 
            console.error("One of your properties is invalid:");
            console.error(member);
            return;
        }

        this.addController(controller, member.property, parent);

        if (type === "color") setTimeout(()=>{controller.setupCordelia()}, 200);
      }
    })
  }

  /**
   * Adds a controller to the list of current in used controllers
   * 
   * @param {Controller} controller the controller to add
   * @param {string} controllerID unique identifier of the controller
   * @param {HTMLElement} parent the dom element that will contain the controller
   */
  addController (controller, controllerID, parent) {
    this.controllers[controllerID] = controller;
    this.params.push(controllerID);
    parent.appendChild(controller.dom);
  }

  /**
   * Returns the parameters at their current value. This will create 
   * a shallow copy of the config object, without the properties not 
   * used by the gui 
   * 
   * @return {Object}
   */
  getCurrentParams () {
    let params = {};
    this.params.forEach( param => {
      params[param] = this.configObject[param];
    });
    return params;
  }
}


/**
 * The position of the GUI, absolute
 * @enum {number}
 */
GUI.POSITION = {
  TOP_LEFT: 0, TOP_RIGHT: 1, BOTTOM_RIGHT: 2, BOTTOM_LEFT: 3
}




export default GUI;