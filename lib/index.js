"use strict";


/**
 * KNOWN BUG :
 * 
 * when picker is opened, therefore the css property overflow: visible 
 * is set through the class .picker-opened to the folder container. If 
 * folder is then closed, folder container content is still displayed
 */


var injectCss = require('@creenv/inject-css');
var Slider = require('@creenv/slider');
var Cordelia = require('cordelia');
var ColorString = require('color-string');

// need to transform HUDelement into @creenv/hud-element
var HUDelement = require("./hud-element");

function ___noop() {}

// gui styles 
var ___styleId = "creenv-slider-style";
var ___css = '';

var ___DEFAULT_POSITION = 1; // top-right


// @extends HUDelement
var GUI = function (controls, position, visible, parent) {
  // first we check if the controls object exists 
  if (typeof controls.object !== "object") {
    console.error("Your controls objet should have an object property pointing to an existing object.");
  }

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
  this.dom.appendChild(this.generateBaseTemplate());

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

  this.parseControls(controls.controls, this.dom);

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
GUI.generateTogglingFolderFunc = function (domElem) {
  var neighboor = domElem.nextElementSibling;
  var height = neighboor.clientHeight;
  var ficon = domElem.getElementsByClassName("creenv-gui-folder-icon")[0];

  // would be proper somewhere else but well
  if (!neighboor.classList.contains("opened")) {
    neighboor.style.height = 0;
  } else {
    neighboor.style.height = height+"px";
  }

  return function () {
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
 * TODO: handle the case where callback needs to be applied to config
 * 
 * @param {*} controls Controls object
 * @param {HTMLElement} parent the container for the generated controllers
 * 
 * @private
 */
GUI.prototype.parseControls = function (controls, parent) {
  for (let i = 0, l = controls.length; i < l; i++) {
    var member = controls[i];

    // it's a folder 
    if (Array.isArray(member) && typeof member[0] === "string") {

      var copy = member.slice(0);
      copy.shift();
      let folderElem = this.generateFolderDom(member[0]);
      let folderContainer = document.createElement("div");
      folderContainer.classList.add("creenv-gui-folder-container", "opened");
      parent.appendChild(folderElem);
      parent.appendChild(folderContainer);

      setTimeout(function () {
        let closeFolderFunc = GUI.generateTogglingFolderFunc(folderElem);

        folderElem.addEventListener("click", closeFolderFunc);
      }, 500);

      this.parseControls(copy, folderContainer);

    // it's a slider 
    } else if (typeof this.configObject[member.property] === "number") {

      var sliderElem = this.generateSliderDom(member);
      parent.appendChild(sliderElem);

    // it's a color 
    } else if(typeof this.configObject[member.property] === "string" && ColorString.get.rgb(this.configObject[member.property])) {

      var color = ColorString.get.rgb(this.configObject[member.property]);
      var colorStr = 'rgba('+color[0]+', '+color[1]+', '+color[2]+', '+color[3]+')';
      var identifier = "hello";

      parent.appendChild(this.generateColorDom(Object.assign({identifier: identifier}, member)));

      var that = this;

      // not clean but it's late and I can't find better workarround
      setTimeout(function(){
        var picker = new Cordelia({
          elm: '#'+identifier,
          embed: false,
          colorFormat: "RGB",
          color: colorStr
        });

        picker.el.addEventListener("save", function () {
          that.configObject[member.property] = 'rgba('+ColorString.get.rgb(picker.color).join(', ')+")";
          if (member.callbackFinished !== undefined) member.callbackFinished(picker.color);
        });

        picker.el.addEventListener("changed", function() {
          if (member.callbackFinished !== undefined) member.callbackFinished(picker.color);
        });

        // bugfix: allows picker to be visible 
        picker.el.addEventListener("open", function () {
          this.parentElement.parentElement.parentElement.classList.add("picker-opened");
        });

        picker.el.addEventListener("close", function () {
          this.parentElement.parentElement.parentElement.classList.remove("picker-opened");
        });

      }, 100);

    // boolean
    } else if (typeof this.configObject[member.property] === "boolean") {

      var domElem = this.generateBoolDom(member);
      parent.appendChild(domElem);

    // input text 
    } else if (typeof this.configObject[member.property] === "string") {

      parent.appendChild(this.generateInputDom(member));
      
    // property is invalid 
    } else {
      console.error("One of your properties is invalid:");
      console.error(member);
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
GUI.prototype.getControllerName = function (controller) {
  if (controller.name !== undefined) return controller.name;
  else return controller.property.split(/(?=[A-Z])/).join(" ");
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
  folderDom.classList.add("creenv-gui-item", "creenv-gui-folder");
  folderDom.innerHTML = '<span class="creenv-gui-folder-icon">-</span><span class="creenv-gui-folder-title">'+folderName+'</span>';
  
  return folderDom;
}

/**
 * Generates a slider dom given the sliderObj
 * 
 * @param {{min:number, max:number: step: number, value: number, callback:function, callbackFinished:function}} sliderObj slider object
 * 
 * @private
 */
GUI.prototype.generateSliderDom = function (sliderObj) {
  var that = this;
  var callback = function (val) {
    that.configObject[sliderObj.property] = val;
    if (sliderObj.callback !== undefined) sliderObj.callback(val);
  }
  var callbackFinished = function (val) {
    that.configObject[sliderObj.property] = val;
    if (sliderObj.callbackFinished !== undefined) sliderObj.callbackFinished(val);
  }
  var slider = new Slider(sliderObj.min, sliderObj.max, sliderObj.step, sliderObj.value, callback, callbackFinished);
  var sliderDom = document.createElement("div");
  sliderDom.classList.add("creenv-gui-item", "creenv-gui-property");
  sliderDom.innerHTML = '<div class="creenv-gui-item-title">'+this.getControllerName(sliderObj)+'</div><div class="creenv-gui-control-container"></div>';
  sliderDom.getElementsByClassName("creenv-gui-control-container")[0].appendChild(slider.dom);
  return sliderDom;
}

/**
 * Generates a colro dom given the colorObj
 * 
 * @param {{property:string, callback:function, callbackFinished:function}} colorObj The 
 * object containing the color controller 
 * 
 * @return {HTMLElement} the hud controller dom element
 */
GUI.prototype.generateColorDom = function (colorObj) {
  var colorDom = document.createElement("div");
  colorDom.classList.add("creenv-gui-item", "creenv-gui-property");
  colorDom.innerHTML = '<div class="creenv-gui-item-title">'+this.getControllerName(colorObj)+'</div><div class="creenv-gui-control-container"><div id="'+colorObj.identifier+'"></div></div>';
  return colorDom;
}

/**
 * Generates a boolean dom given the boolObj
 * 
 * @param {{property:boolean, callback:function}} boolObj The object
 * containing the boolean controller 
 * 
 * @return {HTMLElement}
 */
GUI.prototype.generateBoolDom = function (boolObj) {
  var boolDom = document.createElement("div");
  var id = "creenv-checkbox-"+Date.now();
  boolDom.classList.add("creenv-gui-item", "creenv-gui-property");
  boolDom.innerHTML = '<div class="creenv-gui-item-title"><label for="'+id+'">'+this.getControllerName(boolObj)+'</label></div>';

  var container = document.createElement("div");
  container.classList.add("creenv-gui-control-container");

  var label = document.createElement("label");
  label.setAttribute("for", id);

  var checkboxElem = document.createElement("input");
  checkboxElem.classList.add("creenv-gui-checkbox");
  checkboxElem.setAttribute("type", "checkbox");
  checkboxElem.setAttribute("id", id);
  checkboxElem.setAttribute("checked", this.configObject[boolObj.property]?"checked":"");
  var that = this;
  checkboxElem.addEventListener("change", function(){
    that.configObject[boolObj.property] = this.checked;
    if (boolObj.callback !== undefined) boolObj.callback(this.checked);
  });

  container.appendChild(checkboxElem);
  container.appendChild(label);

  boolDom.appendChild(container);

  return boolDom;
}


/**
 * Generates an input fom given the inputObj
 * 
 * @param {{property:string, callback:function}} inputObj the object
 * containing the input controller
 * 
 * @return {HTMLElement}
 */
GUI.prototype.generateInputDom = function (inputObj) {
  var domElem = document.createElement("div");
  domElem.classList.add("creenv-gui-item", "creenv-gui-property");
  domElem.innerHTML = '<div class="creenv-gui-item-title">'+this.getControllerName(inputObj)+'</div>';

  var container = document.createElement("div");
  container.classList.add("creenv-gui-control-container");

  var that = this;
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.classList.add("creenv-gui-input-control");
  input.addEventListener("keyup", function(event) {
    that.configObject[inputObj.property] = event.target.value;
    if (inputObj.callback !== undefined) inputObj.callback(event.target.value);
  });

  container.appendChild(input);
  domElem.appendChild(container);

  return domElem;
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