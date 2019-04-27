// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'
// // import fs from 'fs-extra'
// // import path from 'path'

// addMatchImageSnapshotCommand({ //need to fine tune threshholds
//   failureThreshold: 0.5, // threshold for entire image
//   failureThresholdType: 'percent', // percent of image or number of pixels
//   customDiffConfig: { threshold: 0.9 }, // threshold for each pixel
//   capture: 'viewport' // capture viewport in screenshot
// })

Cypress.Commands.add('waitForLoadingImage', () => {
    // Lading can be long on TravisCI.
    cy.get('.loading-images', { timeout: 60000 }).should('not.exist')
})
Cypress.Commands.add('waitForTargetDrake', () => {
    // Lading can be long on TravisCI.
    cy.get('#target-drake > img', { timeout: 60000 }).should('exist')
})