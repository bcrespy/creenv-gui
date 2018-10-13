/**
 * @license MIT 
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 * 
 * The number controller is used to offer some control over numbers. It uses the
 * @creenv/slider package to display a slider
 */

import Slider from '@creenv/slider';

import Controller from './controller';


class NumberController extends Controller {
  /**
   * 
   * @param {object} object the object in which the variable is stored
   * @param {string} property key of the object
   * @param {?string} name the name of the controller. if not specified property will be used
   * @param {?number} min the lef-value of the slider
   * @param {?number} max the right-value of the slider
   * @param {?number} step the step between each possible value 
   * @param {?function} callback called when value changes
   * @param {?function} callbackFinished called when value has finished changing
   */
  constructor (object, property, name, min = 0, max = 100, step = 0.5, callback = ()=>{}, callbackFinished = ()=>{}) {
    super(object, property, name, callback, callbackFinished);

    /**
     * the left value of the slider
     * @type {number}
     * @public
     */
    this.min = min;

    /**
     * the right value of the slider
     * @type {number}
     * @public
     */
    this.max = max;

    /**
     * the step between each possible value
     * @type {number}
     * @public
     */
    this.step = step;

    this.dom = this.generateDOM();
  }

  /**
   * Generates the dom of the slider controller
   * 
   * @param {object} configObject reference to the config object 
   * 
   * @return {HTMLElement} a dom element implementing control over the property
   */
  generateDOM () {
    let callback = (val) => {
      this.object[this.property] = val;
      this.onChange(val);
    }
    let callbackFinished = (val) => {
      this.object[this.property] = val;
      this.onChangeFinished(val);
    }
    let slider = new Slider(this.min, this.max, this.step, this.object[this.property], callback, callbackFinished);

    let sliderDom = document.createElement("div");
    sliderDom.classList.add("creenv-gui-item", "creenv-gui-property");
    sliderDom.innerHTML = '<div class="creenv-gui-item-title">'+this.name+'</div><div class="creenv-gui-control-container"></div>';
    sliderDom.getElementsByClassName("creenv-gui-control-container")[0].appendChild(slider.dom);

    return sliderDom;
  }
}

export default NumberController;