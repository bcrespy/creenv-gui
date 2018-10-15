/**
 * @license MIT 
 * @author Baptiste Crespy <baptiste.crespy@gmail.>
 * 
 * The abstract class Controller represents any sort of control the user can 
 * have over a property. It implements the required properties and declares
 * the required members so that the GUI can interract with the controller.
 * 
 * A controller needs: 
 *  - to create and have a .dom member after its construstor is called 
 * 
 * @abstract 
 */
class Controller {
  /**
   * A controller has a control a @param property from an @param object
   * 
   * @param {object} object the objet in which @param property is stored, as object.property
   * @param {string} property the key of the property from @param object
   * @param {string} name the name of the controller. if not specified @param property will be used
   * @param {function} onChange called when the user triggers a change over the controller
   * @param {function} onChangeFinished called when the change is finished
   */
  constructor (object, property, name, onChange = ()=>{}, onChangeFinished = () => {}) {
    /**
     * The dom element that will be added to the GUI
     * @type {HTMLElement}
     * @public
     */
    this.dom = null;

    /**
     * Function called when the user changes the value with the controller 
     * @type {function}
     * @private
     */
    this.onChange = onChange;

    /**
     * Function called when the user is finished with the controller
     * @type {function}
     * @private
     */
    this.onChangeFinished = onChangeFinished;

    /**
     * The object in which the property is stored 
     * @param {string}
     * @private
     */
    this.object = object;

    /**
     * The name of the key property within the object 
     * @type {string}
     * @private
     */
    this.property = property;

    /**
     * The name of the controller displayed in the GUI
     * @type {string}
     * @public  
     */
    this.name = this.generateName(name);
  }

  /**
   * @return {string} name of the controller. if name is undedefined, uses the 
   * property name as the name, after formatting
   */
  generateName () {
    return (this.name !== undefined) ? this.name : this.property.split(/(?=[A-Z])/).join(" ");
  }

  /**
   * Generates a dom object, used by the GUI to be displayed 
   * @return {HTMLElement}
   * @abstract
   */
  generateDOM() {}
}

export default Controller;