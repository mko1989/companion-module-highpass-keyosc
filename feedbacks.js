const { combineRgb } = require('@companion-module/base')

module.exports = function (instance) {
    return {
        // Presentation state feedback
        presentationPlaying: {
            name: 'Presentation Playing',
            type: 'boolean',
            description: 'Indicates if a presentation is currently playing',
            defaultStyle: {
                bgcolor: combineRgb(0, 204, 0),
                color: combineRgb(255, 255, 255),
            },
            options: [],
            callback: (feedback) => {
                return instance.getVariableValue('state') === 'Playing'
            },
        },
        
        // Current slide feedback
        currentSlide: {
            name: 'Current Slide',
            type: 'boolean',
            description: 'Indicates if the presentation is on a specific slide',
            defaultStyle: {
                bgcolor: combineRgb(0, 102, 204),
                color: combineRgb(255, 255, 255),
            },
            options: [
                {
                    type: 'textinput',
                    label: 'Slide Number',
                    id: 'slide',
                    default: '1',
                    regex: '/^\\d+$/',
                },
            ],
            callback: (feedback) => {
                const currentSlide = instance.getVariableValue('currentSlide')
                return currentSlide === feedback.options.slide
            },
        },
        
        // Selected presentation feedback
        selectedPresentation: {
            name: 'Selected Presentation',
            type: 'boolean',
            description: 'Indicates if a specific presentation is selected in the browser',
            defaultStyle: {
                bgcolor: combineRgb(153, 102, 0),
                color: combineRgb(255, 255, 255),
            },
            options: [
                {
                    type: 'textinput',
                    label: 'Presentation Name',
                    id: 'name',
                    default: '',
                },
            ],
            callback: (feedback) => {
                const selectedName = instance.getVariableValue('selectedPresentation')
                return selectedName === feedback.options.name
            },
        },
        
        // Selected presentation index feedback
        selectedPresentationIndex: {
            name: 'Selected Presentation Index',
            type: 'boolean',
            description: 'Indicates if a specific presentation index is selected',
            defaultStyle: {
                bgcolor: combineRgb(102, 0, 102),
                color: combineRgb(255, 255, 255),
            },
            options: [
                {
                    type: 'textinput',
                    label: 'Index (1-based)',
                    id: 'index',
                    default: '1',
                    regex: '/^\\d+$/',
                },
            ],
            callback: (feedback) => {
                const selectedIndex = instance.getVariableValue('selectedIndex')
                return selectedIndex === feedback.options.index
            },
        },
        
        // Presentation at end
        presentationAtEnd: {
            name: 'Presentation At End',
            type: 'boolean',
            description: 'Indicates if the presentation is on the last slide',
            defaultStyle: {
                bgcolor: combineRgb(204, 0, 0),
                color: combineRgb(255, 255, 255),
            },
            options: [],
            callback: (feedback) => {
                const currentSlide = parseInt(instance.getVariableValue('currentSlide'))
                const totalSlides = parseInt(instance.getVariableValue('slideCount'))
                return currentSlide === totalSlides
            },
        },
        
        // Presentation at beginning
        presentationAtBeginning: {
            name: 'Presentation At Beginning',
            type: 'boolean',
            description: 'Indicates if the presentation is on the first slide',
            defaultStyle: {
                bgcolor: combineRgb(0, 128, 128),
                color: combineRgb(255, 255, 255),
            },
            options: [],
            callback: (feedback) => {
                const currentSlide = parseInt(instance.getVariableValue('currentSlide'))
                return currentSlide === 1
            },
        },
        
        // Presentations available
        presentationsAvailable: {
            name: 'Presentations Available',
            type: 'boolean',
            description: 'Indicates if any presentations are available in the browser',
            defaultStyle: {
                bgcolor: combineRgb(0, 128, 0),
                color: combineRgb(255, 255, 255),
            },
            options: [],
            callback: (feedback) => {
                const totalPresentations = parseInt(instance.getVariableValue('totalPresentations'))
                return totalPresentations > 0
            },
        }
    }
}