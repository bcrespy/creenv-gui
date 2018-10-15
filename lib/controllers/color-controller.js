/**
 * @license MIT 
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 */

import uniqid from 'uniqid';
import colorstring from 'color-string';
import Cordelia from 'cordelia';
import Color from '@creenv/color';
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
    this.setupCordelia = this.setupCordelia.bind(this);
  }

  /**
   * Generates the dom of the color controler -> a box that opens a window in 
   * which you can pick a color using advanced controls, or a list of colors 
   * 
   * @return {HTMLElement} a dom element implementing control over the property
   */
  generateDOM () {
    this.id = "creenv-color-picker-"+uniqid();

    let colorDom = document.createElement("div");
    colorDom.classList.add("creenv-gui-item", "creenv-gui-property");
    colorDom.innerHTML = '<div class="creenv-gui-item-title">'+this.name+'</div><div class="creenv-gui-control-container"><div id="'+this.id+'"></div></div>';

    return colorDom;
  }

  /**
   * Sets up Cordelia, the embeded color picker of @creenv/gui 
   */
  setupCordelia () {
    let colorStr;
    if (this.isCreenvColor)
      colorStr = this.object[this.property].string;
    else
      colorStr = `rgba(${colorstring.get.rgb(this.object[this.property]).join(', ')})`;

    this.pickerElement = new Cordelia({
      elm: '#'+this.id,
      embed: false,
      colorFormat: "RGB",
      color: colorStr
    });

    this.pickerElement.el.addEventListener("save",  () => {
      if (this.isCreenvColor) this.object[this.property].rgba = colorstring.get.rgb(this.pickerElement.color);
      else this.object[this.property] = `rgba(${colorstring.get.rgb(this.pickerElement.color).join(', ')})`;
      this.onChange(this.object[this.property]);
    });

    this.pickerElement.el.addEventListener("changed", () => {
      if (this.isCreenvColor) this.object[this.property].rgba = colorstring.get.rgb(this.pickerElement.color);
      else this.object[this.property] = `rgba(${colorstring.get.rgb(this.pickerElement.color).join(', ')})`;
      this.onChangeFinished(this.object[this.property]);
    });

    // bugfix: allows picker to be visible 
    this.pickerElement.el.addEventListener("open", function () {
      this.parentElement.parentElement.parentElement.classList.add("picker-opened");
    });

    this.pickerElement.el.addEventListener("close", function () {
      this.parentElement.parentElement.parentElement.classList.remove("picker-opened");
    });
  }
}

export default ColorController;