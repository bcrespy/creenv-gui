## Members

<dl>
<dt><a href="#Slider">Slider</a></dt>
<dd></dd>
<dt><a href="#dom">dom</a> : <code>HTMLElement</code></dt>
<dd><p>The dom element containing the GUI</p>
</dd>
<dt><a href="#position">position</a> : <code>number</code></dt>
<dd><p>The position of the GUI</p>
</dd>
<dt><a href="#parent">parent</a> : <code>HTMLElement</code></dt>
<dd><p>The parent element of the GUI</p>
</dd>
<dt><a href="#cordelia">cordelia</a></dt>
<dd><p><a href="https://cevadtokatli.github.io/cordelia/">https://cevadtokatli.github.io/cordelia/</a></p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#GUI">GUI(controls, position, visible, parent)</a></dt>
<dd><p>Creates a graphical user interface with controls defined by the controls
object. The GUI in then appended to the parent</p>
</dd>
</dl>

<a name="Slider"></a>

## Slider
**Kind**: global variable  
**Creenv/gui**:   
**Author**: Baptiste Crespy <baptiste.crespy@gmail.com>
                        [https://crespy-baptiste.com]
                        [https://github.com/bcrespy]  
**Author**: Cevad Tokatli
  [https://github.com/cevadtokatli/cordelia]

- color-string  
**Author**: Heather Arthur
  [https://github.com/Qix-/color-string]

- uniqid  
**Author**: Halász Ádám
  [https://github.com/adamhalasz/uniqid]



KNOWN BUG :

when picker is opened, therefore the css property overflow: visible 
is set through the class .picker-opened to the folder container. If 
folder is then closed, folder container content is still displayed  
**License**: MIT feel free to use and contribute :) 


Credits

- Cordelia
  color picker  
<a name="dom"></a>

## dom : <code>HTMLElement</code>
The dom element containing the GUI

**Kind**: global variable  
**Access**: public  
<a name="position"></a>

## position : <code>number</code>
The position of the GUI

**Kind**: global variable  
**Access**: public  
<a name="parent"></a>

## parent : <code>HTMLElement</code>
The parent element of the GUI

**Kind**: global variable  
**Access**: public  
<a name="cordelia"></a>

## cordelia
https://cevadtokatli.github.io/cordelia/

**Kind**: global variable  
<a name="GUI"></a>

## GUI(controls, position, visible, parent)
Creates a graphical user interface with controls defined by the controls
object. The GUI in then appended to the parent

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| controls | <code>object</code> | the object in which controls are defined |
| position | <code>number</code> | the position of the hud, enum GUI.POSITION |
| visible | <code>boolean</code> | weither if the hud is closed or not |
| parent | <code>HTMLElement</code> | the container of the hud |


* [GUI(controls, position, visible, parent)](#GUI)
    * _instance_
        * [.setPosition(position)](#GUI+setPosition)
        * [.getCurrentParams()](#GUI+getCurrentParams) ⇒ <code>Object</code>
    * _static_
        * [.POSITION](#GUI.POSITION) : <code>enum</code>
        * [.createDomElement()](#GUI.createDomElement) ⇒ <code>HTMLElement</code>
        * [.generateTogglingFolderFunc(domElem)](#GUI.generateTogglingFolderFunc)
        * [.getControllerName(controller)](#GUI.getControllerName) ⇒ <code>string</code>
        * [.generateBaseTemplate()](#GUI.generateBaseTemplate) ⇒ <code>HTMLElement</code>
        * [.generateFolderDom(folderName)](#GUI.generateFolderDom) ⇒ <code>HTMLElement</code>
        * [.generateSliderDom(sliderObj, configObject)](#GUI.generateSliderDom) ⇒ <code>HTMLElement</code>
        * [.generateColorDom(colorObj)](#GUI.generateColorDom) ⇒ <code>HTMLElement</code>
        * [.generateBoolDom(boolObj, configObject)](#GUI.generateBoolDom) ⇒ <code>HTMLElement</code>
        * [.generateInputDom(inputObj, configObject)](#GUI.generateInputDom) ⇒ <code>HTMLElement</code>

<a name="GUI+setPosition"></a>

### guI.setPosition(position)
Sets the position of the GUI, absolute to the page

**Kind**: instance method of [<code>GUI</code>](#GUI)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| position | [<code>POSITION</code>](#GUI.POSITION) | the position of the GUI |

<a name="GUI+getCurrentParams"></a>

### guI.getCurrentParams() ⇒ <code>Object</code>
Returns the parameters at their current value. This will create 
a shallow copy of the config object, without the properties not 
used by the gui

**Kind**: instance method of [<code>GUI</code>](#GUI)  
<a name="GUI.POSITION"></a>

### GUI.POSITION : <code>enum</code>
The position of the GUI, absolute

**Kind**: static enum of [<code>GUI</code>](#GUI)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| TOP_LEFT | <code>number</code> | <code>0</code> | 
| TOP_RIGHT | <code>number</code> | <code>1</code> | 
| BOTTOM_RIGHT | <code>number</code> | <code>2</code> | 
| BOTTOM_LEFT | <code>number</code> | <code>3</code> | 

<a name="GUI.createDomElement"></a>

### GUI.createDomElement() ⇒ <code>HTMLElement</code>
Creates the DOM element which represents the GUI

**Kind**: static method of [<code>GUI</code>](#GUI)  
**Returns**: <code>HTMLElement</code> - the dom element  
<a name="GUI.generateTogglingFolderFunc"></a>

### GUI.generateTogglingFolderFunc(domElem)
Generates a function that toggles the folder opening

**Kind**: static method of [<code>GUI</code>](#GUI)  

| Param | Type | Description |
| --- | --- | --- |
| domElem | <code>HTMLElement</code> | the folder dom element |

<a name="GUI.getControllerName"></a>

### GUI.getControllerName(controller) ⇒ <code>string</code>
Returns the controller's name given the object properties

**Kind**: static method of [<code>GUI</code>](#GUI)  
**Returns**: <code>string</code> - the controller's name  

| Param | Type | Description |
| --- | --- | --- |
| controller | <code>object</code> | the object containing the controller params |

<a name="GUI.generateBaseTemplate"></a>

### GUI.generateBaseTemplate() ⇒ <code>HTMLElement</code>
Generates the base template for the GUI

**Kind**: static method of [<code>GUI</code>](#GUI)  
**Returns**: <code>HTMLElement</code> - the dom element  
<a name="GUI.generateFolderDom"></a>

### GUI.generateFolderDom(folderName) ⇒ <code>HTMLElement</code>
Generates the dom of the folder given a name

**Kind**: static method of [<code>GUI</code>](#GUI)  
**Returns**: <code>HTMLElement</code> - the dom element representing the folder  

| Param | Type | Description |
| --- | --- | --- |
| folderName | <code>string</code> | name of the folder |

<a name="GUI.generateSliderDom"></a>

### GUI.generateSliderDom(sliderObj, configObject) ⇒ <code>HTMLElement</code>
Generates a slider dom given the sliderObj

**Kind**: static method of [<code>GUI</code>](#GUI)  
**Returns**: <code>HTMLElement</code> - the dom element of the slider  

| Param | Type | Description |
| --- | --- | --- |
| sliderObj | <code>Object</code> | slider object |
| configObject | <code>object</code> | reference to the config object |

<a name="GUI.generateColorDom"></a>

### GUI.generateColorDom(colorObj) ⇒ <code>HTMLElement</code>
Generates a colro dom given the colorObj

**Kind**: static method of [<code>GUI</code>](#GUI)  
**Returns**: <code>HTMLElement</code> - the hud controller dom element  

| Param | Type | Description |
| --- | --- | --- |
| colorObj | <code>Object</code> | The  object containing the color controller |

<a name="GUI.generateBoolDom"></a>

### GUI.generateBoolDom(boolObj, configObject) ⇒ <code>HTMLElement</code>
Generates a boolean dom given the boolObj

**Kind**: static method of [<code>GUI</code>](#GUI)  

| Param | Type | Description |
| --- | --- | --- |
| boolObj | <code>Object</code> | The object containing the boolean controller |
| configObject | <code>object</code> | reference to the config object |

<a name="GUI.generateInputDom"></a>

### GUI.generateInputDom(inputObj, configObject) ⇒ <code>HTMLElement</code>
Generates an input fom given the inputObj

**Kind**: static method of [<code>GUI</code>](#GUI)  

| Param | Type | Description |
| --- | --- | --- |
| inputObj | <code>Object</code> | the object containing the input controller |
| configObject | <code>object</code> | reference to the config object |

