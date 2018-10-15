/**
 * @license MIT 
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 */

import uniqid from 'uniqid';
import Controller from './controller';



class BooleanController extends Controller {
/**
   * 
   * @param {object} object the object in which the variable is stored
   * @param {string} property key of the object
   * @param {?string} name the name of the controller. if not specified property will be used
   * @param {?function} callback called when value changes
   */
  constructor (object, property, name, callback = ()=>{}) {
    super(object, property, name, callback);
    this.dom = this.generateDOM();
  }

  /**
   * Generates the dom of the boolean controller -> a checkbox
   * 
   * @return {HTMLElement} a dom element implementing control over the property
   */
  generateDOM () {
    let boolDom = document.createElement("div");
    let id = "creenv-checkbox-"+uniqid();
    boolDom.classList.add("creenv-gui-item", "creenv-gui-property");
    boolDom.innerHTML = '<div class="creenv-gui-item-title"><label for="'+id+'">'+this.name+'</label></div>';

    let container = document.createElement("div");
    container.classList.add("creenv-gui-control-container");

    let label = document.createElement("label");
    label.setAttribute("for", id);

    let checkboxElem = document.createElement("input");
    checkboxElem.classList.add("creenv-gui-checkbox");
    checkboxElem.setAttribute("type", "checkbox");
    checkboxElem.setAttribute("id", id);
    checkboxElem.setAttribute("checked", this.object[this.property]?"checked":"");

    let that = this;

    // when the checkbox value changes, we update the config 
    checkboxElem.addEventListener("change", function(){
      that.object[that.property] = this.checked;
      that.onChange(this.checked);
    });

    container.appendChild(checkboxElem);
    container.appendChild(label);
    boolDom.appendChild(container);

    return boolDom;
  }
}

export default BooleanController;