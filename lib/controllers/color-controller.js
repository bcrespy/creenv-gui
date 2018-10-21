/**
 * @license MIT 
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 */

import uniqid from 'uniqid';
import colorstring from 'color-string';
import Color from '@creenv/color';
import Colorpicker from '@creenv/colorpicker';
import Controller from './controller';


class ColorController extends Controller {
/**
   * 
   * @param {object} object the object in which the variable is stored
   * @param {string} property key of the object
   * @param {number} guiPosition the position of the GUI on the window 
   * @param {?string} name the name of the controller. if not specified property will be used
   * @param {?object} options options transmitted to @creenv/colorpicker
   * @param {?function} callback called when value changes
   * @param {?function} callbackFinished called when value has finished changing
   * @param {?function} callbackOpened will be called when colorpicker is opening
   */
  constructor (object, property, guiPosition, name, options = undefined, callback = ()=>{}, callbackOpened = () => {}, callbackClosed = () => {}) {
    super(object, property, name, callback);

    /**
     * the dom element of the picker
     * @type {Cordelia}
     * @private
     */
    this.pickerElement = null;

    /**
     * unique identifier used for the html id property
     * @type {string}
     * @public
     */
    this.id = "";

    /**
     * if the color is a @creenv/color object 
     * @type {boolean}
     * @private
     */
    this.isCreenvColor = object[property] instanceof Color;

    this.options = options;

    this.callback = callback;
    this.openCallback = callbackOpened;
    this.closeCallback = callbackClosed;
    this.guiPosition = guiPosition;

    this.dom = this.generateDOM();
  }

  /**
   * Generates the dom of the color controler -> a box that opens a window in 
   * which you can pick a color using advanced controls, or a list of colors 
   * 
   * @return {HTMLElement} a dom element implementing control over the property
   */
  generateDOM () {
    let colorDom = document.createElement("div");
    colorDom.classList.add("creenv-gui-item", "creenv-gui-property");
    colorDom.innerHTML = '<div class="creenv-gui-item-title">'+this.name+'</div>';
    
    let container = document.createElement("div");
    container.classList.add("control-container");
    colorDom.appendChild(container);

    let direction = getDirectionFromPosition(this.guiPosition);

    let picker = new Colorpicker(this.object[this.property].copy(), this.callback, { 
      direction: direction,
      openCallback: () => { this.openCallback(); },
      closeCallback: () => { this.closeCallback(); },
      ...this.options||{}
    });
    container.appendChild(picker.dom);

    return colorDom;
  }
}

/**
 * @param {number} position the identifier of the position 
 * 
 * @return {number} the direction of the colorpicker given the position
 *                  of the GUI
 */
const getDirectionFromPosition = (position) => {
  switch (position) {
    case 0: return Colorpicker.DIRECTION.BOTTOM_RIGHT;
    case 1: return Colorpicker.DIRECTION.BOTTOM_LEFT;
    case 2: return Colorpicker.DIRECTION.TOP_LEFT;
    case 3: return Colorpicker.DIRECTION.TOP_RIGHT;
  }
}

export default ColorController;