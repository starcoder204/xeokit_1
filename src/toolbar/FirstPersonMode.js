import {Controller} from "../Controller.js";

/** @private */
class FirstPersonMode extends Controller {

    constructor(parent, cfg) {

        super(parent, cfg);

        if (!cfg.buttonElement) {
            throw "Missing config: buttonElement";
        }

        const buttonElement = cfg.buttonElement;

        this.on("enabled", (enabled) => {
            if (!enabled) {
                buttonElement.classList.add("disabled");
            } else {
                buttonElement.classList.remove("disabled");
            }
        });

        this.on("active", (active) => {
            if (active) {
                buttonElement.classList.add("active");
            } else {
                buttonElement.classList.remove("active");
            }
        });

        this.on("active", (active) => {
            if (active) {
                if(this.bimViewer._distanceMeasurements)
                this.bimViewer._distanceMeasurements.control.activate();
                if(this.bimViewer._addAnnotationMode) {
                    this.bimViewer._addAnnotationMode.setActive(false);
                }
            } else {
                if(this.bimViewer._distanceMeasurements) {
                    this.bimViewer._distanceMeasurements.control.deactivate();
                    this.bimViewer._distanceMeasurements.clear(); 
                }
            }
        });

        buttonElement.addEventListener("click", (event) => {
            if (!this.getEnabled()) {
                return;
            }
            const active = this.getActive();
            this.setActive(!active);
            event.preventDefault();
        });

        this.bimViewer.on("reset", ()=>{
            this.setActive(false);
        });
    }
}

export {FirstPersonMode};
