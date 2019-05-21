class EggBasketObject {
    getEggs(){
        return cy.get('.clutch-egg')
    }
    getBaskets(){
        return cy.get('.basket-hover')
    }
    getBasketLabels(){
        return cy.get('.basket-label')
    }
    getGeneLabelText(){
        return cy.get('.fv-gene-label-text')
    }
    getNotificationMessage() {
        return cy.get('.its-hint')
    }
    getScoreCount() {
        return cy.get('.score-count')
    }

}
export default EggBasketObject