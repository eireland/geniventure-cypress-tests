class MeiosisObject {
    getYOUR_DRAKE() {
        return cy.get(".geniblocks .organism")
    }

    getHATCH_DRAKE_BUTTON() {
        return cy.get('.hatch-drake-button')
    }
    getFEMALE_LABEL() {
        return cy.get('.female-label')}
    getMALE_LABEL() {
        return cy.get('.male-label')
    }
    getDROPDOWN_TOGGLE() {
        return cy.get('.react-selectize-toggle-button-container')
    }
    getDROPDOWN_MENU_ITEM() {
        return cy.get('#mountNode .dropdown-menu  .fv-gene-option')
    }
    getTARGET_DRAKE_IMAGE() {
        return cy.get('#target-drake > img')
    }
    getSTABLE_DRAKE() {
        return cy.get('.stable-drake-overlay')
    }
  
    selectGender(gender) {
      if (gender=="female"){
        this.getFEMALE_LABEL().click();
      } else if (gender=='male') {
          this.getMALE_LABEL.click();
      }
    }
  
    selectTrait(trait) {
        this.getDROPDOWN_TOGGLE().click()
        this.getDROPDOWN_MENU_ITEM().contains(trait).click()
    }
  
    saveDrake() {
        this.getHATCH_DRAKE_BUTTON.click();
    }

  
    parseTargetDrakeLink(){
        //example link to parse https://geniverse-resources.concord.org/resources/drakes/images/st_f_noWing_fore_a5_flair_horn_noRostral_healthy.png
        var targetDrakeLink='', str=[], drakeInfo=[], drakeAttributes=[];

        return cy.get(this.getTARGET_DRAKE_IMAGE()).then(($img)=>{
            targetDrakeLink = $img.prop('src');
            str = targetDrakeLink.split('/');
            drakeInfo = str[str.length-1].split('.');
            drakeAttributes = drakeInfo[drakeInfo.length-1].split('_');
            return drakeAttributes;
        })
    }       

    //****** */Put this in the test spec
    // def verify_drake_in_stable
    //   puts "in verify drake in stable"
    //   stable_drakes = find_all(STABLE_DRAKE)
    //   return stable_drakes.length
    // end
}
export default MeiosisObject