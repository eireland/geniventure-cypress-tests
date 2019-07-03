const gems=['blue','yellow','red','black'];

class MissionFooterObject {
    getLevelNumber() {
        return cy.get('.level-indicator-text')
    }
    getMissionNumber() {
        return cy.get('.mission-label-value')
    }
    getTutorialButton() {
        return cy.get('.tutorial-activate')
    }
    getGemSet() {
        return cy.get('.gem-container')
    }
    getGem(){
        return cy.get('.gem-fill')
    }
    getGemColor(color){
        return cy.get('.gem-fill-'+gems.indexOf(color))
    }
    //Moves left, Score
    getActionCounter() {
        return cy.get('.hud-text-area')
    }
    getActionColor(){
        var classArr = Cypress.$('.counter.moves-count')[0].className.split(/\s/);
        cy.log("color: "+classArr[classArr.length-1])
        return classArr[classArr.length-1]
    }

    //Tutorial Dialog elements -- putting it here since Tutorials can be launched from the Tutorial button
    getTutorialTitle(){
        return cy.get('#tutorial .tutorial-short');
    };
    clickBackButton(){
        cy.get('.tutorial-navigate.prev').click();
    }
    clickNextButton(){
        cy.get('.tutorial-navigate.next').click();
    }
    closeTutorialDialog(){
        cy.get('.tutorial-close').click();
    }
}
export default MissionFooterObject;