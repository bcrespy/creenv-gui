"use strict";

/**
 * Represents an HUDelement. An HUDelement can be added to the HUD, but can 
 * only be inherited. Such a class must implement the show(toggle: boolean) 
 * method, an of course call super.show(toggle);
 * 
 * @param {boolean} visible if the HUD element is visible or hidden (=true)
 * @constructor
 * @abstract
 */
var HUDelement = function (visible) {
  if (this.constructor === HUDelement) {
    console.error("HUDelement() cannot be instanciated !");
  }

  if (visible === undefined) visible = true;

  /**
   * Weither the HUDelement is currently visible or not
   * @type {boolean}
   */
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
HUDelement.prototype.show = function (toggle) {
  if (toggle === undefined) toggle = !this.visible;
  this.visible = toggle;
}

module.exports = HUDelement;