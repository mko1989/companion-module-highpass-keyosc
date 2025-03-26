const { combineRgb } = require('@companion-module/base')

module.exports = function (instance) {
    return {
        // Basic presentation control presets
        'keynote_next': {
            type: 'button',
            category: 'Slides',
            name: 'Next Slide',
            style: {
                text: 'NEXT',
                size: '24',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 100, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'next'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationAtEnd',
                    options: {},
                    style: {
                        bgcolor: combineRgb(100, 100, 100),
                        text: 'END'
                    }
                }
            ]
        },
        'keynote_previous': {
            type: 'button',
            category: 'Slides',
            name: 'Previous Slide',
            style: {
                text: 'PREV',
                size: '24',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(100, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'previous'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationAtBeginning',
                    options: {},
                    style: {
                        bgcolor: combineRgb(100, 100, 100),
                        text: 'BEGIN'
                    }
                }
            ]
        },

        // Presentation management
        'keynote_start': {
            type: 'button',
            category: 'Presentation',
            name: 'Start Slideshow',
            style: {
                text: 'START',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 100, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'start'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationPlaying',
                    options: {},
                    style: {
                        bgcolor: combineRgb(0, 150, 0),
                        text: 'PLAYING'
                    }
                }
            ]
        },
        'keynote_stop': {
            type: 'button',
            category: 'Presentation',
            name: 'Stop Slideshow',
            style: {
                text: 'STOP',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(100, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'stop'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationPlaying',
                    options: {},
                    style: {
                        bgcolor: combineRgb(150, 0, 0),
                        text: 'STOPPED'
                    }
                }
            ]
        },

        // Presentations browser presets
        'keynote_list_refresh': {
            type: 'button',
            category: 'Presentations Browser',
            name: 'Refresh Presentations List',
            style: {
                text: 'REFRESH\nLIST',
                size: '14',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 102)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'refreshList'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: []
        },
        'keynote_list_next': {
            type: 'button',
            category: 'Presentations Browser',
            name: 'Next Presentation',
            style: {
                text: 'NEXT\nPRESENTATION',
                size: '14',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 51, 102)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'nextPresentation'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationsAvailable',
                    options: {},
                    style: {
                        bgcolor: combineRgb(0, 80, 150)
                    }
                }
            ]
        },
        'keynote_list_previous': {
            type: 'button',
            category: 'Presentations Browser',
            name: 'Previous Presentation',
            style: {
                text: 'PREV\nPRESENTATION',
                size: '14',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 51, 102)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'previousPresentation'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationsAvailable',
                    options: {},
                    style: {
                        bgcolor: combineRgb(0, 80, 150)
                    }
                }
            ]
        },
        'keynote_list_open': {
            type: 'button',
            category: 'Presentations Browser',
            name: 'Open Selected',
            style: {
                text: 'OPEN\nSELECTED',
                size: '14',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 102, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'openSelectedPresentation'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationsAvailable',
                    options: {},
                    style: {
                        bgcolor: combineRgb(0, 150, 0)
                    }
                }
            ]
        },
        'keynote_list_open_and_start': {
            type: 'button',
            category: 'Presentations Browser',
            name: 'Open & Start',
            style: {
                text: 'OPEN\n& START',
                size: '14',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(153, 51, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'openAndStartSelectedPresentation'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationsAvailable',
                    options: {},
                    style: {
                        bgcolor: combineRgb(200, 70, 0)
                    }
                }
            ]
        },
        'keynote_close': {
            type: 'button',
            category: 'Presentation',
            name: 'Close Presentation',
            style: {
                text: 'CLOSE',
                size: '18',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(153, 0, 0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'close'
                        }
                    ],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationLoaded',
                    options: {},
                    style: {
                        bgcolor: combineRgb(200, 0, 0)
                    }
                }
            ]
        },
        'keynote_current_selection': {
            type: 'button',
            category: 'Presentations Browser',
            name: 'Current Selection Info',
            style: {
                text: '$(keyosc:selectedIndex)/$(keyosc:totalPresentations)\\n$(keyosc:selectedPresentation)',
                size: '14',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 0)
            },
            steps: [
                {
                    down: [],
                    up: []
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'presentationsAvailable',
                    options: {},
                    style: {
                        bgcolor: combineRgb(40, 40, 40)
                    }
                }
            ]
        }
    }
}