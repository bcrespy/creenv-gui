/**
 * @license MIT 
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 * 
 * A knob controller should be used to connect a knob from a midi controller to the application and give control over 
 * a numerical property 
 */

import Controller from "./controller";

class MidiButtonController extends Controller {
  constructor (object, property, name, onPress = () => {}) {
    super(object, property, name, onPress);

    this.updateValues = this.updateValues.bind(this);

    this.onPress = onPress;

    /**
     * @type {HTMLElement}
     */
    this.dom = this.generateDOM();
  }

  updateValues (val) {
    let elem = this.dom.getElementsByClassName("creenv-gui-button")[0];
    if (val) {
      elem.classList.add("active");
    } else {
      elem.classList.remove("active");
    }

    this.onPress(val);
  }

  generateDOM () {
    let dom = document.createElement("div");
    dom.classList.add("creenv-gui-item", "creenv-gui-property");
    dom.innerHTML = '<div class="creenv-gui-item-title">'+this.name+'</div><div class="creenv-gui-control-container"></div>';

    let button = document.createElement("div");
    button.classList.add("creenv-gui-button");
    if (this.object[this.property]) {
      button.classList.add("active");
    }
    dom.getElementsByClassName("creenv-gui-control-container")[0].appendChild(button);

    return dom;
  }
}

export default MidiButtonController;