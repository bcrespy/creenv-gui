/**
 * @license MIT
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 * 
 * The text input controller offers control over a text through an input. 
 * The callback finished will never we called because I consider there is 
 * no such a thing with the text (should I add it with the lose of focus ?)
 */

import Controller from './controller';


class TextController extends Controller {
  /**
   * @param {object} object the object in which the value is stored
   * @param {string} property key of the object
   * @param {?string} name the displayed name of the controller, if unset will 
   *                       name will use @param property 
   * @param {function} callback will be called on each input change
   * @param {?number} maxlength maxium length of the text within the input
   */
  constructor (object, property, name, callback = ()=>{}, maxlength = -1) {
    super(object, property, name, callback);
    
    /**
     * @type {number}
     * @public
     */
    this.maxlength = maxlength;

    this.dom = this.generateDOM();
  }

  /**
   * @return {HTMLElement} the dom element giving control over object.property 
   */
  generateDOM () {
    let domElem = document.createElement("div");
    domElem.classList.add("creenv-gui-item", "creenv-gui-property");
    domElem.innerHTML = '<div class="creenv-gui-item-title">'+this.name+'</div>';

    let container = document.createElement("div");
    container.classList.add("creenv-gui-control-container");

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("maxlength", this.maxlength);
    input.setAttribute("value", this.object[this.property]);
    input.classList.add("creenv-gui-input-control");
    input.addEventListener("keyup", (event) => {
      this.object[this.property] = event.target.value;
      this.onChange(event.target.value);
    });

    container.appendChild(input);
    domElem.appendChild(container);

    return domElem;
  }
}

export default TextController;