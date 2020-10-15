class GenericModel {

    constructor(metadata, img) {
        this.menus = this._createMenus();
        this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
        return createSubMenu("General information", [{
                    "id": "generalInformation",
                    "label": "General"
                },
                {
                    "id": "modelCategory",
                    "label": "Model category"
                },
                {
                    "id": "author",
                    "label": "Author"
                },
                {
                    "id": "creator",
                    "label": "Creator"
                },
                {
                    "id": "reference",
                    "label": "Reference"
                }
            ]) +
            createSubMenu("Scope", [{
                    "id": "scopeGeneral",
                    "label": "General"
                },
                {
                    "id": "product",
                    "label": "Product"
                },
                {
                    "id": "hazard",
                    "label": "Hazard"
                },
                {
                    "id": "population",
                    "label": "Population group"
                }
            ]) +
            createSubMenu("Data Background", [{
                    "id": "study",
                    "label": "Study"
                },
                {
                    "id": "studySample",
                    "label": "Study sample"
                },
                {
                    "id": "dietaryAssessmentMethod",
                    "label": "Dietary assessment method"
                },
                {
                    "id": "laboratory",
                    "label": "Laboratory"
                },
                {
                    "id": "assay",
                    "label": "Assay"
                }
            ]) +
            createSubMenu("Model math", [{
                    "id": "modelMath",
                    "label": "General"
                },
                {
                    "id": "parameter",
                    "label": "Parameter"
                },
                {
                    "id": "qualityMeasures",
                    "label": "Quality measures"
                },
                {
                    "id": "modelEquation",
                    "label": "Model equation"
                },
                {
                    "id": "exposure",
                    "label": "Exposure"
                }
            ]) +
            `<li role="presentation">
              <a id="plot-tab" href="#plot"
                aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
            </li>`;
    }

    _createPanels(metadata, img) {
        let schema = schemas.genericModel;
        return {
            generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
            modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.generalInformation.modelCategory),
            author: createComplexPanel("Author", schema.contact, metadata.generalInformation.author),
            creator: createComplexPanel("Creator", schema.contact, metadata.generalInformation.creator),
            reference: createComplexPanel("Reference", schema.reference, metadata.generalInformation.reference),
            scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
            product: createComplexPanel("Product", schema.product, metadata.scope.product),
            hazard: createComplexPanel("Hazard", schema.hazard, metadata.scope.hazard),
            population: createComplexPanel("Population", schema.populationGroup, metadata.scope.populationGroup),
            study: createSimplePanel("Study", schema.study, metadata.dataBackground.study),
            studySample: createComplexPanel("Study sample", schema.studySample, metadata.dataBackground.studySample),
            dietaryAssessmentMethod: createComplexPanel("Dietary assessment method", schema.dietaryAssessmentMethod, metadata.dataBackground.dietaryAssessmentMethod),
            laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.dataBackground.laboratory),
            assay: createComplexPanel("Assay", schema.assay, metadata.dataBackground.assay),
            modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
            parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
            qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
            modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
            exposure: createComplexPanel("Exposure", schema.exposure, metadata.modelMath.exposure),
            plot: createPlotPanel(img)
        };
    }
}
class DataModel {

    constructor(metadata, img) {
        this.menus = this._createMenus();
        this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
        return createSubMenu("General information", [{
                    "id": "generalInformation",
                    "label": "General"
                },
                {
                    "id": "author",
                    "label": "Author"
                },
                {
                    "id": "creator",
                    "label": "Creator"
                },
                {
                    "id": "reference",
                    "label": "Reference"
                }
            ]) +
            createSubMenu("Scope", [{
                    "id": "scopeGeneral",
                    "label": "General"
                },
                {
                    "id": "product",
                    "label": "Product"
                },
                {
                    "id": "hazard",
                    "label": "Hazard"
                },
                {
                    "id": "population",
                    "label": "Population group"
                }
            ]) +
            createSubMenu("Data Background", [{
                    "id": "study",
                    "label": "Study"
                },
                {
                    "id": "studySample",
                    "label": "Study sample"
                },
                {
                    "id": "dietaryAssessmentMethod",
                    "label": "Dietary assessment method"
                },
                {
                    "id": "laboratory",
                    "label": "Laboratory"
                },
                {
                    "id": "assay",
                    "label": "Assay"
                }
            ]) +
            createSubMenu("Model math", [{
                "id": "parameter",
                "label": "Parameter"
            }]) +
            `<li role="presentation">
              <a id="plot-tab" href="#plot"
                aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
            </li>`;
    }

    _createPanels(metadata, img) {
        let schema = schemas.dataModel;
        return {
            generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
            author: createComplexPanel("Author", schema.contact, metadata.generalInformation.author),
            creator: createComplexPanel("Creator", schema.contact, metadata.generalInformation.creator),
            reference: createComplexPanel("Reference", schema.reference, metadata.generalInformation.reference),
            scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
            product: createComplexPanel("Product", schema.product, metadata.scope.product),
            hazard: createComplexPanel("Hazard", schema.hazard, metadata.scope.hazard),
            population: createComplexPanel("Population", schema.populationGroup, metadata.scope.populationGroup),
            study: createSimplePanel("Study", schema.study, metadata.dataBackground.study),
            studySample: createComplexPanel("Study sample", schema.studySample, metadata.dataBackground.studySample),
            dietaryAssessmentMethod: createComplexPanel("Dietary assessment method", schema.dietaryAssessmentMethod, metadata.dataBackground.dietaryAssessmentMethod),
            laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.dataBackground.laboratory),
            assay: createComplexPanel("Assay", schema.assay, metadata.dataBackground.assay),
            parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
            plot: createPlotPanel(img)
        };
    }
}

class PredictiveModel {

    constructor(metadata, img) {
        this.menus = this._createMenus();
        this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
        return createSubMenu("General information", [{
                    "id": "generalInformation",
                    "label": "General"
                },
                {
                    "id": "author",
                    "label": "Author"
                },
                {
                    "id": "creator",
                    "label": "Creator"
                },
                {
                    "id": "reference",
                    "label": "Reference"
                }
            ]) +
            createSubMenu("Scope", [{
                    "id": "scopeGeneral",
                    "label": "General"
                },
                {
                    "id": "product",
                    "label": "Product"
                },
                {
                    "id": "hazard",
                    "label": "Hazard"
                }
            ]) +
            createSubMenu("Data Background", [{
                    "id": "study",
                    "label": "Study"
                },
                {
                    "id": "studySample",
                    "label": "Study sample"
                },
                {
                    "id": "laboratory",
                    "label": "Laboratory"
                },
                {
                    "id": "assay",
                    "label": "Assay"
                }
            ]) +
            createSubMenu("Model math", [{
                "id": "parameter",
                "label": "Parameter"
            }]) +
            `<li role="presentation">
              <a id="plot-tab" href="#plot"
                aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
            </li>`;
    }

    _createPanels(metadata, img) {
        let schema = schemas.predictiveModel;
        return {
            generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
            author: createComplexPanel("Author", schema.contact, metadata.generalInformation.author),
            creator: createComplexPanel("Creator", schema.contact, metadata.generalInformation.creator),
            reference: createComplexPanel("Reference", schema.reference, metadata.generalInformation.reference),
            scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
            product: createComplexPanel("Product", schema.product, metadata.scope.product),
            hazard: createComplexPanel("Hazard", schema.hazard, metadata.scope.hazard),
            study: createSimplePanel("Study", schema.study, metadata.dataBackground.study),
            studySample: createComplexPanel("Study sample", schema.studySample, metadata.dataBackground.studySample),
            laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.dataBackground.laboratory),
            assay: createComplexPanel("Assay", schema.assay, metadata.dataBackground.assay),
            modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
            parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
            plot: createPlotPanel(img)
        };
    }
}

class OtherModel {

    constructor(metadata, img) {
        this.menus = this._createMenus();
        this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
        return createSubMenu("General information", [{
                    "id": "generalInformation",
                    "label": "General"
                },
                {
                    "id": "modelCategory",
                    "label": "Model category"
                },
                {
                    "id": "author",
                    "label": "Author"
                },
                {
                    "id": "creator",
                    "label": "Creator"
                },
                {
                    "id": "reference",
                    "label": "Reference"
                }
            ]) +
            createSubMenu("Scope", [{
                    "id": "scopeGeneral",
                    "label": "General"
                },
                {
                    "id": "product",
                    "label": "Product"
                },
                {
                    "id": "hazard",
                    "label": "Hazard"
                },
                {
                    "id": "population",
                    "label": "Population group"
                }
            ]) +
            createSubMenu("Data Background", [{
                    "id": "study",
                    "label": "Study"
                },
                {
                    "id": "studySample",
                    "label": "Study sample"
                },
                {
                    "id": "laboratory",
                    "label": "Laboratory"
                },
                {
                    "id": "assay",
                    "label": "Assay"
                }
            ]) +
            createSubMenu("Model math", [{
                    "id": "modelMath",
                    "label": "General"
                },
                {
                    "id": "parameter",
                    "label": "Parameter"
                },
                {
                    "id": "qualityMeasures",
                    "label": "Quality measures"
                },
                {
                    "id": "modelEquation",
                    "label": "Model equation"
                }
            ]) +
            `<li role="presentation">
              <a id="plot-tab" href="#plot"
                aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
            </li>`;
    }

    _createPanels(metadata, img) {
        let schema = schemas.otherModel;
        return {
            generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
            modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.generalInformation.modelCategory),
            author: createComplexPanel("Author", schema.contact, metadata.generalInformation.author),
            creator: createComplexPanel("Creator", schema.contact, metadata.generalInformation.creator),
            reference: createComplexPanel("Reference", schema.reference, metadata.generalInformation.reference),
            scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
            product: createComplexPanel("Product", schema.product, metadata.scope.product),
            hazard: createComplexPanel("Hazard", schema.hazard, metadata.scope.hazard),
            population: createComplexPanel("Population", schema.populationGroup, metadata.scope.populationGroup),
            study: createSimplePanel("Study", schema.study, metadata.dataBackground.study),
            studySample: createComplexPanel("Study sample", schema.studySample, metadata.dataBackground.studySample),
            laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.dataBackground.laboratory),
            assay: createComplexPanel("Assay", schema.assay, metadata.dataBackground.assay),
            modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
            parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
            qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
            modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
            plot: createPlotPanel(img)
        };
    }
}

class DoseResponseModel {

    constructor(metadata, img) {
        this.menus = this._createMenus();
        this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
        return createSubMenu("General information", [{
                    "id": "generalInformation",
                    "label": "General"
                },
                {
                    "id": "modelCategory",
                    "label": "Model category"
                },
                {
                    "id": "author",
                    "label": "Author"
                },
                {
                    "id": "creator",
                    "label": "Creator"
                },
                {
                    "id": "reference",
                    "label": "Reference"
                }
            ]) +
            createSubMenu("Scope", [{
                    "id": "scopeGeneral",
                    "label": "General"
                },
                {
                    "id": "hazard",
                    "label": "Hazard"
                },
                {
                    "id": "population",
                    "label": "Population group"
                }
            ]) +
            createSubMenu("Data Background", [{
                    "id": "study",
                    "label": "Study"
                },
                {
                    "id": "studySample",
                    "label": "Study sample"
                },
                {
                    "id": "laboratory",
                    "label": "Laboratory"
                },
                {
                    "id": "assay",
                    "label": "Assay"
                }
            ]) +
            createSubMenu("Model math", [{
                    "id": "modelMath",
                    "label": "General"
                },
                {
                    "id": "parameter",
                    "label": "Parameter"
                },
                {
                    "id": "qualityMeasures",
                    "label": "Quality measures"
                },
                {
                    "id": "modelEquation",
                    "label": "Model equation"
                },
                {
                    "id": "exposure",
                    "label": "Exposure"
                }
            ]) +
            `<li role="presentation">
              <a id="plot-tab" href="#plot"
                aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
            </li>`;
    }

    _createPanels(metadata, img) {
        let schema = schemas.doseResponseModel;
        return {
            generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
            modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.generalInformation.modelCategory),
            author: createComplexPanel("Author", schema.contact, metadata.generalInformation.author),
            creator: createComplexPanel("Creator", schema.contact, metadata.generalInformation.creator),
            reference: createComplexPanel("Reference", schema.reference, metadata.generalInformation.reference),
            scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
            hazard: createComplexPanel("Hazard", schema.hazard, metadata.scope.hazard),
            population: createComplexPanel("Population", schema.populationGroup, metadata.scope.populationGroup),
            study: createSimplePanel("Study", schema.study, metadata.scope.study),
            studySample: createComplexPanel("Study sample", schema.studySample, metadata.scope.studySample),
            laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.scope.laboratory),
            assay: createComplexPanel("Assay", schema.assay, metadata.scope.assay),
            modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
            parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
            qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
            modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
            exposure: createComplexPanel("Exposure", schema.exposure, metadata.modelMath.exposure),
            plot: createPlotPanel(img)
        };
    }
}

class ToxicologicalModel {

    constructor(metadata, img) {
        this.menus = this._createMenus();
        this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
        return createSubMenu("General information", [{
                    "id": "generalInformation",
                    "label": "General"
                },
                {
                    "id": "modelCategory",
                    "label": "Model category"
                },
                {
                    "id": "author",
                    "label": "Author"
                },
                {
                    "id": "creator",
                    "label": "Creator"
                },
                {
                    "id": "reference",
                    "label": "Reference"
                }
            ]) +
            createSubMenu("Scope", [{
                    "id": "scopeGeneral",
                    "label": "General"
                },
                {
                    "id": "hazard",
                    "label": "Hazard"
                },
                {
                    "id": "population",
                    "label": "Population group"
                }
            ]) +
            createSubMenu("Data Background", [{
                    "id": "study",
                    "label": "Study"
                },
                {
                    "id": "studySample",
                    "label": "Study sample"
                },
                {
                    "id": "laboratory",
                    "label": "Laboratory"
                },
                {
                    "id": "assay",
                    "label": "Assay"
                }
            ]) +
            createSubMenu("Model math", [{
                    "id": "modelMath",
                    "label": "General"
                },
                {
                    "id": "parameter",
                    "label": "Parameter"
                },
                {
                    "id": "qualityMeasures",
                    "label": "Quality measures"
                },
                {
                    "id": "modelEquation",
                    "label": "Model equation"
                },
                {
                    "id": "exposure",
                    "label": "Exposure"
                }
            ]) +
            `<li role="presentation">
              <a id="plot-tab" href="#plot"
                aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
            </li>`;
    }

    _createPanels(metadata, img) {
        let schema = schemas.toxicologicalModel;
        return {
            generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
            modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.generalInformation.modelCategory),
            author: createComplexPanel("Author", schema.contact, metadata.generalInformation.author),
            creator: createComplexPanel("Creator", schema.contact, metadata.generalInformation.creator),
            reference: createComplexPanel("Reference", schema.reference, metadata.generalInformation.reference),
            scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
            product: createComplexPanel("Product", schema.product, metadata.scope.product),
            hazard: createComplexPanel("Hazard", schema.hazard, metadata.scope.hazard),
            population: createComplexPanel("Population", schema.populationGroup, metadata.scope.populationGroup),
            study: createSimplePanel("Study", schema.study, metadata.scope.study),
            studySample: createComplexPanel("Study sample", schema.studySample, metadata.scope.studySample),
            laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.scope.laboratory),
            assay: createComplexPanel("Assay", schema.assay, metadata.scope.assay),
            modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
            parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
            qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
            modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
            exposure: createComplexPanel("Exposure", schema.exposure, metadata.modelMath.exposure),
            plot: createPlotPanel(img)
        };
    }
}

class ExposureModel {

    constructor(metadata, img) {
        this.menus = this._createMenus();
        this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
        return createSubMenu("General information", [{
                    "id": "generalInformation",
                    "label": "General"
                },
                {
                    "id": "modelCategory",
                    "label": "Model category"
                },
                {
                    "id": "author",
                    "label": "Author"
                },
                {
                    "id": "creator",
                    "label": "Creator"
                },
                {
                    "id": "reference",
                    "label": "Reference"
                }
            ]) +
            createSubMenu("Scope", [{
                    "id": "scopeGeneral",
                    "label": "General"
                },
                {
                    "id": "product",
                    "label": "Product"
                },
                {
                    "id": "hazard",
                    "label": "Hazard"
                },
                {
                    "id": "population",
                    "label": "Population group"
                }
            ]) +
            createSubMenu("Data Background", [{
                    "id": "study",
                    "label": "Study"
                },
                {
                    "id": "studySample",
                    "label": "Study sample"
                },
                {
                    "id": "dietaryAssessmentMethod",
                    "label": "Dietary assessment method"
                },
                {
                    "id": "laboratory",
                    "label": "Laboratory"
                },
                {
                    "id": "assay",
                    "label": "Assay"
                }
            ]) +
            createSubMenu("Model math", [{
                    "id": "modelMath",
                    "label": "General"
                },
                {
                    "id": "parameter",
                    "label": "Parameter"
                },
                {
                    "id": "qualityMeasures",
                    "label": "Quality measures"
                },
                {
                    "id": "modelEquation",
                    "label": "Model equation"
                },
                {
                    "id": "exposure",
                    "label": "Exposure"
                }
            ]) +
            `<li role="presentation">
              <a id="plot-tab" href="#plot"
                aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
            </li>`;
    }

    _createPanels(metadata, img) {
        let schema = schemas.exposureModel;
        return {
            generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
            modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.generalInformation.modelCategory),
            author: createComplexPanel("Author", schema.contact, metadata.generalInformation.author),
            creator: createComplexPanel("Creator", schema.contact, metadata.generalInformation.creator),
            reference: createComplexPanel("Reference", schema.reference, metadata.generalInformation.reference),
            scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
            product: createComplexPanel("Product", schema.product, metadata.scope.product),
            hazard: createComplexPanel("Hazard", schema.hazard, metadata.scope.hazard),
            population: createComplexPanel("Population", schema.populationGroup, metadata.scope.populationGroup),
            study: createSimplePanel("Study", schema.study, metadata.dataBackground.study),
            studySample: createComplexPanel("Study sample", schema.studySample, metadata.dataBackground.studySample),
            dietaryAssessmentMethod: createComplexPanel("Dietary assessment method", schema.dietaryAssessmentMethod, metadata.dataBackground.dietaryAssessmentMethod),
            laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.dataBackground.laboratory),
            assay: createComplexPanel("Assay", schema.assay, metadata.dataBackground.assay),
            modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
            parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
            qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
            modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
            exposure: createComplexPanel("Exposure", schema.exposure, metadata.modelMath.exposure),
            plot: createPlotPanel(img)
        };
    }
}

class ProcessModel {

    constructor(metadata, img) {
        this.menus = this._createMenus();
        this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
        return createSubMenu("General information", [{
                    "id": "generalInformation",
                    "label": "General"
                },
                {
                    "id": "author",
                    "label": "Author"
                },
                {
                    "id": "creator",
                    "label": "Creator"
                },
                {
                    "id": "reference",
                    "label": "Reference"
                }
            ]) +
            createSubMenu("Scope", [{
                    "id": "scopeGeneral",
                    "label": "General"
                },
                {
                    "id": "product",
                    "label": "Product"
                },
                {
                    "id": "hazard",
                    "label": "Hazard"
                }
            ]) +
            createSubMenu("Data Background", [{
                    "id": "study",
                    "label": "Study"
                },
                {
                    "id": "studySample",
                    "label": "Study sample"
                },
                {
                    "id": "laboratory",
                    "label": "Laboratory"
                },
                {
                    "id": "assay",
                    "label": "Assay"
                }
            ]) +
            createSubMenu("Model math", [{
                    "id": "parameter",
                    "label": "Parameter"
                },
                {
                    "id": "qualityMeasures",
                    "label": "Quality measures"
                },
                {
                    "id": "modelEquation",
                    "label": "Model equation"
                }
            ]) +
            `<li role="presentation">
              <a id="plot-tab" href="#plot"
                aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
            </li>`;
    }

    _createPanels(metadata, img) {
        let schema = schemas.processModel;
        return {
            generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
            modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.generalInformation.modelCategory),
            author: createComplexPanel("Author", schema.contact, metadata.generalInformation.author),
            creator: createComplexPanel("Creator", schema.contact, metadata.generalInformation.creator),
            reference: createComplexPanel("Reference", schema.reference, metadata.generalInformation.reference),
            scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
            product: createComplexPanel("Product", schema.product, metadata.scope.product),
            hazard: createComplexPanel("Hazard", schema.hazard, metadata.scope.hazard),
            study: createSimplePanel("Study", schema.study, metadata.dataBackground.study),
            studySample: createComplexPanel("Study sample", schema.studySample, metadata.dataBackground.studySample),
            laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.dataBackground.laboratory),
            assay: createComplexPanel("Assay", schema.assay, metadata.dataBackground.assay),
            modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
            parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
            qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
            modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
            plot: createPlotPanel(img)
        };
    }
}

class ConsumptionModel {

    constructor(metadata, img) {
        this.menus = this._createMenus();
        this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
        return createSubMenu("General information", [{
                    "id": "generalInformation",
                    "label": "General"
                },
                {
                    "id": "modelCategory",
                    "label": "Model category"
                },
                {
                    "id": "author",
                    "label": "Author"
                },
                {
                    "id": "creator",
                    "label": "Creator"
                },
                {
                    "id": "reference",
                    "label": "Reference"
                }
            ]) +
            createSubMenu("Scope", [{
                    "id": "scopeGeneral",
                    "label": "General"
                },
                {
                    "id": "product",
                    "label": "Product"
                },
                {
                    "id": "populationGroup",
                    "label": "Population group"
                }
            ]) +
            createSubMenu("Data Background", [{
                    "id": "study",
                    "label": "Study"
                },
                {
                    "id": "studySample",
                    "label": "Study sample"
                },
                {
                    "id": "laboratory",
                    "label": "Laboratory"
                },
                {
                    "id": "assay",
                    "label": "Assay"
                }
            ]) +
            createSubMenu("Model math", [{
                    "id": "parameter",
                    "label": "Parameter"
                },
                {
                    "id": "qualityMeasures",
                    "label": "Quality measures"
                },
                {
                    "id": "modelEquation",
                    "label": "Model equation"
                }
            ]) +
            `<li role="presentation">
              <a id="plot-tab" href="#plot"
                aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
            </li>`;
    }

    _createPanels(metadata, img) {
        let schema = schemas.consumptionModel;
        return {
            generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
            modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.generalInformation.modelCategory),
            author: createComplexPanel("Author", schema.contact, metadata.generalInformation.author),
            creator: createComplexPanel("Creator", schema.contact, metadata.generalInformation.creator),
            reference: createComplexPanel("Reference", schema.reference, metadata.generalInformation.reference),
            scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
            product: createComplexPanel("Product", schema.product, metadata.scope.product),
            population: createComplexPanel("Population", schema.populationGroup, metadata.scope.populationGroup),
            study: createSimplePanel("Study", schema.study, metadata.dataBackground.study),
            studySample: createComplexPanel("Study sample", schema.studySample, metadata.dataBackground.studySample),
            dietaryAssessmentMethod: createComplexPanel("Dietary assessment method", schema.dietaryAssessmentMethod, metadata.dataBackground.dietaryAssessmentMethod),
            laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.dataBackground.laboratory),
            assay: createComplexPanel("Assay", schema.assay, metadata.dataBackground.assay),
            modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
            parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
            qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
            modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
            plot: createPlotPanel(img)
        };
    }
}

class HealthModel {

    constructor(metadata, img) {
        this.menus = this._createMenus();
        this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
        return createSubMenu("General information", [{
                    "id": "generalInformation",
                    "label": "General"
                },
                {
                    "id": "modelCategory",
                    "label": "Model category"
                },
                {
                    "id": "author",
                    "label": "Author"
                },
                {
                    "id": "creator",
                    "label": "Creator"
                },
                {
                    "id": "reference",
                    "label": "Reference"
                }
            ]) +
            createSubMenu("Scope", [{
                    "id": "scopeGeneral",
                    "label": "General"
                },
                {
                    "id": "hazard",
                    "label": "Hazard"
                },
                {
                    "id": "populationGroup",
                    "label": "Population group"
                }
            ]) +
            createSubMenu("Data Background", [{
                    "id": "study",
                    "label": "Study"
                },
                {
                    "id": "studySample",
                    "label": "Study sample"
                },
                {
                    "id": "laboratory",
                    "label": "Laboratory"
                },
                {
                    "id": "assay",
                    "label": "Assay"
                }
            ]) +
            createSubMenu("Model math", [{
                    "id": "modelMath",
                    "label": "General"
                },
                {
                    "id": "parameter",
                    "label": "Parameter"
                },
                {
                    "id": "qualityMeasures",
                    "label": "Quality measures"
                },
                {
                    "id": "modelEquation",
                    "label": "Model equation"
                },
                {
                    "id": "exposure",
                    "label": "Exposure"
                }
            ]) +
            `<li role="presentation">
              <a id="plot-tab" href="#plot"
                aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
            </li>`;
    }

    _createPanels(metadata, img) {
        let schema = schemas.healthModel;
        return {
            generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
            modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.generalInformation.modelCategory),
            author: createComplexPanel("Author", schema.contact, metadata.generalInformation.author),
            creator: createComplexPanel("Creator", schema.contact, metadata.generalInformation.creator),
            reference: createComplexPanel("Reference", schema.reference, metadata.generalInformation.reference),
            scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
            hazard: createComplexPanel("Hazard", schema.hazard, metadata.scope.hazard),
            population: createComplexPanel("Population", schema.populationGroup, metadata.scope.populationGroup),
            study: createSimplePanel("Study", schema.study, metadata.dataBackground.study),
            studySample: createComplexPanel("Study sample", schema.studySample, metadata.dataBackground.studySample),
            dietaryAssessmentMethod: createComplexPanel("Dietary assessment method", schema.dietaryAssessmentMethod, metadata.dataBackground.dietaryAssessmentMethod),
            laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.dataBackground.laboratory),
            assay: createComplexPanel("Assay", schema.assay, metadata.dataBackground.assay),
            modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
            parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
            qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
            modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
            exposure: createComplexPanel("Exposure", schema.exposure, metadata.modelMath.exposure),
            plot: createPlotPanel(img)
        };
    }
}

class RiskModel {

    constructor(metadata, img) {
        this.menus = this._createMenus();
        this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
        return createSubMenu("General information", [{
                    "id": "generalInformation",
                    "label": "General"
                },
                {
                    "id": "modelCategory",
                    "label": "Model category"
                },
                {
                    "id": "author",
                    "label": "Author"
                },
                {
                    "id": "creator",
                    "label": "Creator"
                },
                {
                    "id": "reference",
                    "label": "Reference"
                }
            ]) +
            createSubMenu("Scope", [{
                    "id": "scopeGeneral",
                    "label": "General"
                },
                {
                    "id": "product",
                    "label": "Product"
                },
                {
                    "id": "hazard",
                    "label": "Hazard"
                },
                {
                    "id": "population",
                    "label": "Population group"
                }
            ]) +
            createSubMenu("Data Background", [{
                    "id": "study",
                    "label": "Study"
                },
                {
                    "id": "studySample",
                    "label": "Study sample"
                },
                {
                    "id": "dietaryAssessmentMethod",
                    "label": "Dietary assessment method"
                },
                {
                    "id": "laboratory",
                    "label": "Laboratory"
                },
                {
                    "id": "assay",
                    "label": "Assay"
                }
            ]) +
            createSubMenu("Model math", [{
                    "id": "modelMath",
                    "label": "General"
                },
                {
                    "id": "parameter",
                    "label": "Parameter"
                },
                {
                    "id": "qualityMeasures",
                    "label": "Quality measures"
                },
                {
                    "id": "modelEquation",
                    "label": "Model equation"
                },
                {
                    "id": "exposure",
                    "label": "Exposure"
                }
            ]) +
            `<li role="presentation">
              <a id="plot-tab" href="#plot"
                aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
            </li>`;
    }

    _createPanels(metadata, img) {
        let schema = schemas.riskModel;
        return {
            generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
            modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.generalInformation.modelCategory),
            author: createComplexPanel("Author", schema.contact, metadata.generalInformation.author),
            creator: createComplexPanel("Creator", schema.contact, metadata.generalInformation.creator),
            reference: createComplexPanel("Reference", schema.reference, metadata.generalInformation.reference),
            scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
            product: createComplexPanel("Product", schema.product, metadata.scope.product),
            hazard: createComplexPanel("Hazard", schema.hazard, metadata.scope.hazard),
            population: createComplexPanel("Population", schema.populationGroup, metadata.scope.populationGroup),
            study: createSimplePanel("Study", schema.study, metadata.dataBackground.study),
            studySample: createComplexPanel("Study sample", schema.studySample, metadata.dataBackground.studySample),
            dietaryAssessmentMethod: createComplexPanel("Dietary assessment method", schema.dataBackground.dietaryAssessmentMethod, metadata.dietaryAssessmentMethod),
            laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.dataBackground.laboratory),
            assay: createComplexPanel("Assay", schema.assay, metadata.dataBackground.assay),
            modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
            parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
            qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
            modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
            exposure: createComplexPanel("Exposure", schema.exposure, metadata.modelMath.exposure),
            plot: createPlotPanel(img)
        };
    }
}

class QraModel {

    constructor(metadata, img) {
        this.menus = this._createMenus();
        this.panels = this._createPanels(metadata, img);
    }

    _createMenus() {
        return createSubMenu("General information", [{
                    "id": "generalInformation",
                    "label": "General"
                },
                {
                    "id": "modelCategory",
                    "label": "Model category"
                },
                {
                    "id": "author",
                    "label": "Author"
                },
                {
                    "id": "creator",
                    "label": "Creator"
                },
                {
                    "id": "reference",
                    "label": "Reference"
                }
            ]) +
            createSubMenu("Scope", [{
                    "id": "scopeGeneral",
                    "label": "General"
                },
                {
                    "id": "product",
                    "label": "Product"
                },
                {
                    "id": "hazard",
                    "label": "Hazard"
                },
                {
                    "id": "population",
                    "label": "Population group"
                }
            ]) +
            createSubMenu("Data Background", [{
                    "id": "study",
                    "label": "Study"
                },
                {
                    "id": "studySample",
                    "label": "Study sample"
                },
                {
                    "id": "dietaryAssessmentMethod",
                    "label": "Dietary assessment method"
                },
                {
                    "id": "laboratory",
                    "label": "Laboratory"
                },
                {
                    "id": "assay",
                    "label": "Assay"
                }
            ]) +
            createSubMenu("Model math", [{
                    "id": "modelMath",
                    "label": "General"
                },
                {
                    "id": "parameter",
                    "label": "Parameter"
                },
                {
                    "id": "qualityMeasures",
                    "label": "Quality measures"
                },
                {
                    "id": "modelEquation",
                    "label": "Model equation"
                },
                {
                    "id": "exposure",
                    "label": "Exposure"
                }
            ]) +
            `<li role="presentation">
              <a id="plot-tab" href="#plot"
                aria-controls="plot" role="tab" data-toggle="tab">Model Plot</a>
            </li>`;
    }

    _createPanels(metadata, img) {
        let schema = schemas.qraModel;
        return {
            generalInformation: createSimplePanel("General information", schema.generalInformation, metadata.generalInformation),
            modelCategory: createSimplePanel("Model category", schema.modelCategory, metadata.generalInformation.modelCategory),
            author: createComplexPanel("Author", schema.contact, metadata.generalInformation.author),
            creator: createComplexPanel("Creator", schema.contact, metadata.generalInformation.creator),
            reference: createComplexPanel("Reference", schema.reference, metadata.generalInformation.reference),
            scopeGeneral: createSimplePanel("General", schema.scope, metadata.scope),
            product: createComplexPanel("Product", schema.product, metadata.scope.product),
            hazard: createComplexPanel("Hazard", schema.hazard, metadata.scope.hazard),
            population: createComplexPanel("Population", schema.populationGroup, metadata.scope.populationGroup),
            study: createSimplePanel("Study", schema.study, metadata.dataBackground.study),
            studySample: createComplexPanel("Study sample", schema.studySample, metadata.dataBackground.studySample),
            dietaryAssessmentMethod: createComplexPanel("Dietary assessment method", schema.dataBackground.dietaryAssessmentMethod, metadata.dietaryAssessmentMethod),
            laboratory: createComplexPanel("Laboratory", schema.laboratory, metadata.dataBackground.laboratory),
            assay: createComplexPanel("Assay", schema.assay, metadata.dataBackground.assay),
            modelMath: createSimplePanel("Model math", schema.modelMath, metadata.modelMath),
            parameter: createComplexPanel("Parameter", schema.parameter, metadata.modelMath.parameter),
            qualityMeasures: createComplexPanel("Quality measures", schema.qualityMeasures, metadata.modelMath.qualityMeasures),
            modelEquation: createComplexPanel("Model equation", schema.modelEquation, metadata.modelMath.modelEquation),
            exposure: createComplexPanel("Exposure", schema.exposure, metadata.modelMath.exposure),
            plot: createPlotPanel(img)
        };
    }
}