/**
 * @license MIT 
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 */

import uniqid from 'uniqid';
import colorstring from 'color-string';
import Cordelia from 'cordelia';
import Color from '@creenv/color';
import Colorpicker from '@creenv/colorpicker';
import Controller from './controller';


class ColorController extends Controller {
/**
   * 
   * @param {object} object the object in which the variable is stored
   * @param {string} property key of the object
   * @param {?string} name the name of the controller. if not specified property will be used
   * @param {?function} callback called when value changes
   * @param {?function} callbackFinished called when value has finished changing
   */
  constructor (object, property, name, callback = ()=>{}, callbackFinished = () => {}) {
    super(object, property, name, callback, callbackFinished);

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

    let picker = new Colorpicker(this.object[this.property].copy(), (color) => { console.log(color); });
    container.appendChild(picker.dom);

    return colorDom;
  }
}

export default ColorController;