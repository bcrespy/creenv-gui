"use strict";


var injectCss = require('@creenv/inject-css');
var Slider = require('@creenv/slider');
var Cordelia = require('cordelia');

// need to transform HUDelement into @creenv/hud-element
var HUDelement = require("./hud-element");

function ___noop() {}

// gui styles 
var ___styleId = "creenv-slider-style";
var ___css = '';

var ___DEFAULT_POSITION = 1; // top-right


// @extends HUDelement
var GUI = function (controls, position, visible, parent) {
  if (position === undefined || Object.values(GUI.POSITION).indexOf(position) === -1) position = ___DEFAULT_POSITION;
  if (visible === undefined) visible = true;
  if (parent === undefined) parent = document.body;

  // inheritance pattern 
  HUDelement.call(this, visible);

  /**
   * The dom element containing the GUI
   * @type {HTMLElement}
   * @public
   */
  this.dom = GUI.createDomElement();

  /**
   * The position of the GUI
   * @type {number}
   * @public 
   */
  this.position = ___DEFAULT_POSITION;

  /**
   * The parent element of the GUI
   * @type {HTMLElement}
   * @public
   */
  this.parent = parent;

  /**
   * The config object where controlled variables are stored 
   * @type {Object}
   * @private
   */
  this.configObject = controls.object;

  this.setPosition(position);

  this.parseControls(controls.controls);

  this.parent.appendChild(this.dom);
}

// inheritance pattern 
GUI.prototype = Object.create(GUI.prototype);
GUI.prototype.constructor = GUI;


/**
 * Creates the DOM element which represents the GUI 
 * 
 * @return {HTMLElement} the dom element
 * 
 * @static
 */
GUI.createDomElement = function () {
  var element = document.createElement("div");
  element.classList.add("creenv-gui");

  return element;
}

/**
 * Generates a function that toggles the folder opening
 * 
 * @param {HTMLElement} domElem the folder dom element 
 * 
 * @static
 */
GUI.generateTogglingFolderFunc = function(domElem) {
  var neighboor = domElem.nextElementSibling;
  var height = neighboor.clientHeight;
  var ficon = domElem.getElementsByClassName("creenv-gui-folder-icon")[0];

  return function () {
    if (!neighboor.classList.contains("opened")) {
      ficon.innerHTML = "-";
      neighboor.style.height = height+"px";
      neighboor.classList.add("opened");
    } else {
      ficon.innerHTML = "+";
      neighboor.style.height = "0px";
      neighboor.classList.remove("opened");
    }
  }
}


/**
 * The position of the GUI, absolute
 * @enum {number}
 */
GUI.POSITION = {
  TOP_LEFT: 0, TOP_RIGHT: 1, BOTTOM_RIGHT: 2, BOTTOM_LEFT: 3
}

/**
 * Sets the position of the GUI, absolute to the page
 * 
 * @param {GUI.POSITION.TOP_LEFT} position the position of the GUI
 * 
 * @public
 */
GUI.prototype.setPosition = function (position) {
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
 * 
 * @param {*} controls Controls object
 * 
 * @private
 */
GUI.prototype.parseControls = function (controls) {
  for (let i =0, l = controls.length; i < l; i++) {
    let member = controls[i];
    console.log (member);
  }
}


/**
 * Generates the base template for the GUI 
 * 
 * @return {HTMLElement} the dom element 
 * 
 * @private
 */
GUI.prototype.generateBaseTemplate = function () {
  let domElement = document.createElement("div");
  domElement.innerHTML = '<div class="creenv-gui-title creenv-gui-item">Controls</div>';
  return domElement;
}

/**
 * Generates the dom of the folder given a name 
 * 
 * @param {string} folderName name of the folder
 * @return {HTMLElement} the dom element representing the folder
 * 
 * @private
 */
GUI.prototype.generateFolderDom = function (folderName) {
  var folderDom = document.createElement("div");
  folderDom.innerHTML = '<span class="creenv-gui-folder-icon">-</span><span class="creenv-gui-folder-title">'+folderName+'</span>';
  
  return folderDom;
}

/**
 * Generates a slider dom given the sliderObj
 * 
 * @param {*} sliderObj slider object
 * 
 * @private
 */
GUI.prototype.generateSliderDom = function (sliderObj) {

}


/**
 * https://cevadtokatli.github.io/cordelia/
 */
var cordelia = new Cordelia({
  elm: '#color-picker1',
  embed: false
});

var cordelia = new Cordelia({
  elm: '#color-picker2',
  embed: false
});

var slider = new Slider(0, 110, 15, 15, function (val) { console.log("changed: "+val)}, function (val) { console.log("finished: "+val)});
document.getElementById("slider").appendChild(slider.dom);




module.exports = GUI;