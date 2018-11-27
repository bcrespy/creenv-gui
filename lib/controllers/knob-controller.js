/**
 * @license MIT 
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 * 
 * A knob controller should be used to connect a knob from a midi controller to the application and give control over 
 * a numerical property 
 */

import Controller from "./controller";

class MidiKnobController extends Controller {
  constructor (object, property, name, min = 0, max = 100, step = 0.1, onChange = () => {}) {
    super(object, property, name, onChange);

    this.min = min;
    this.max = max;
    this.step = step;

    this.updateValues = this.updateValues.bind(this);

    /**
     * @type {HTMLElement}
     */
    this.dom = this.generateDOM();
  }

  updateValues (val) {
    let relativePosition = val;
    let relativeValue = relativePosition*(this.max-this.min) + this.min;
    let rounded = Math.max(Math.min(this.max, Math.round(relativeValue/this.step)*this.step), this.min);
    
    let angle = -135 + 270*val;
    this.dom.getElementsByClassName("creenv-gui-knob-container")[0].style.transform = `rotate(${angle}deg)`;
    this.dom.getElementsByClassName("creenv-gui-knob-value")[0].innerHTML = rounded;

    this.object[this.property] = rounded;
    this.onChange(rounded);
  }

  generateDOM () {
    let dom = document.createElement("div");
    dom.classList.add("creenv-gui-item", "creenv-gui-property");
    dom.innerHTML = '<div class="creenv-gui-item-title">'+this.name+'</div><div class="creenv-gui-control-container"></div>';

    let knobDom = document.createElement("div");
    knobDom.classList.add("creenv-gui-knob-container");
    knobDom.innerHTML = '<div class="creenv-gui-knob"></div><div class="creenv-gui-knob-bar"></div>';

    let container = dom.getElementsByClassName("creenv-gui-control-container")[0];
    container.appendChild(knobDom);
    container.innerHTML+= `<span class="creenv-gui-knob-value">${this.object[this.property]}</span>`;


    return dom;
  }
}

export default MidiKnobController;