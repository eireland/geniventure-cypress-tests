class GeniventureObject{

    getLOADING () {
        return cy.get('.loading-images')
    }

    //header
    getVentureMap(){
        return cy.get(".map-button")
    }
    getRoomLocation(){
        return cy.get('.location-label')
    }
    getChallengeHotspot(){
        return cy.get("#enter-challenge-hotspot")
    }

    //notification messages
    getNOTIFICATION_NEXT_ARROW(){
        return cy.get(".next-arrow")
    }
    getNOTIFICATION_CLOSE_BUTTON(){
        return cy.get('.close-button')
    }

    //footer
    getLEVEL_TEXT(){
        return cy.get('.level-indicator-text')
    }
    getMISSION_TEXT(){
        return cy.get('.mission-label-value')
    }
    getTRIAL_COUNT_TEXT(){ 
        return cy.get('.count-text')
    }
    getGEM_NUMBER_TEXT (){
        return cy.get('.gem-number-text')
    }
    getGem(num){
        var gemClass='.gem-fill-'+num;
        return cy.get(gemClass)
    }
    getScoreCount() {
        return cy.get('.score-count')
    }
    getNOTIFICATION_FOOTER () {
        return cy.get('.notification.raised')
    }
    getITSHint () {
        return cy.get('.its-hint')
    }
    closeNotification() {
        cy.log( "in close_notification")
        this.getNOTIFICATION_CLOSE_BUTTON().click()
    }

    //Venture Map
    getCONTINUE_BUTTON () {
        return cy.get('.continue-button')
    }
    getTRY_AGAIN_BUTTON (){
        return cy.get('try-again-button')
    }

    getCHALLENGE_ROOM(){
        return cy.get('.challenge-container')
    }
    gotoNext(){
        cy.log ("in goto_next")
        this.getNOTIFICATION_NEXT_ARROW().click();
    }

    //challenge complete view in the venture pad
    continueToNextLevel() {
        this.getCONTINUE_BUTTON().click();
    }

    tryAgain () {
        cy.log( "in try again")
        this.getTRY_AGAIN_BUTTON().click();
    }


    openMap(){
        cy.log("In get_map")
        this.getMap().click();
    }

    clickOnChallengeHotspot(challenge){
        cy.log("in click on challenge hotspot")
        if (challenge == "breeding barn") {
            element = getNOTIFICATION_FOOTER();
            cy.log ("challenge hotspot location is "+element.location+" challenge hotspot size is "+element.size);
            this.getNOTIFICATION_FOOTER().click(0,-25);
        } else {
            this.getChallengeHotspot().click();
        }
    }
}
export default GeniventureObject

// .gem-fill-0=blue gem, .gem-fill-1=yellow gem, .gem-fill-2=red gem, .gem-fill-3=black retry gem
