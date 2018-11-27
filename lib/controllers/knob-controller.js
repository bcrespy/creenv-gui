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
  }

  generateDOM () {
    let dom = document.createElement("div");
    dom.classList.add("creenv-gui-item", "creenv-gui-property");
    dom.innerHTML = '<div class="creenv-gui-item-title">'+this.name+'</div><div class="creenv-gui-control-container"></div>';

    let knobDom = document.createElement("div");
    knobDom.classList.add("creenv-gui-knob-container");
    knobDom.innerHTML = '<div class="creenv-gui-knob"></div><div class="creenv-gui-knob-bar"></div>';

    /**
     * 
     * @param {number} value [0; 1]
     */
    const updateKnob = (value) => {
      let angle = -135 + 270*value;
      knobDom.style.transform = `rotate(${angle}deg)`;

      this.onChange(value);
    }

    /**
     * when is this function sent to the midi controller ? 
     */

    dom.getElementsByClassName("creenv-gui-control-container")[0].appendChild(knobDom);
  }
}

export default MidiKnobController;