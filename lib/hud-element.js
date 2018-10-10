"use strict";

/**
 * @abstract
 */
class HUDelement {
  /**
   * Represents an HUDelement. An HUDelement can be added to the HUD, but can 
   * only be inherited. Such a class must implement the show(toggle: boolean) 
   * method, an of course call super.show(toggle);
   * 
   * @param {?boolean} visible if the HUD element is visible or hidden (=true)
   */
  constructor (visible = true) {
    if (this.constructor === HUDelement) {
      console.error("HUDelement cannot be instanciated and must be inherited ! @abstract pattern");
    }
    this.visible = visible;
  }

  /**
   * Show or Hide the HUD element 
   * 
   * @param {?boolean} toggle weither the element is displayed or not, if undefined,
   * the HUDelement will toggle to the opposite state 
   * 
   * @abstract
   */
  show (toggle) {
    if (toggle === undefined) toggle = !this.visible;
    this.visible = toggle;
  }
}


export default HUDelement;