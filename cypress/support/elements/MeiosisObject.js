class MeiosisObject {
    dominantTraits = ['Arms', 'Legs', 'Wings', 'Color', 'Shiny', 'Long tail', 'Deep', 'Spiked'];
    recessiveTraits = ['Horns','Albino','Dull','Short tail','Faded'];

    getYOUR_DRAKE_IMAGE() {
        return cy.get("#your-drake .geniblocks.organism img")
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
    getDROPDOWN_TEXT(){
        return cy.get('.fv-gene-option-value div')
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
  
    selectTrait(index, trait) { //position is the left or right side dropdown
        this.getDROPDOWN_TOGGLE().eq(index).click();
        this.getDROPDOWN_MENU_ITEM().contains(trait).click();
    }
  
    // saveDrake() {
    //     this.getHATCH_DRAKE_BUTTON.click();
    // }

    // getDrakeLink(drake){
    //     switch (drake) {
    //         case "target":
    //             el = this.getTARGET_DRAKE_IMAGE()
    //         case "current":
    //             el = this.getYOUR_DRAKE_IMAGE();
    //     }  

    //     return imageLink = el.then(($img)=>{
    //         console.log("drake link is: "+ $img.prop('src'))
    //          return drakeLink = $img.prop('src');
    //         })
    // }

    // parseDrakeLink(drake){
    //     //example link to parse https://geniverse-resources.concord.org/resources/drakes/images/st_f_noWing_fore_a5_flair_horn_noRostral_healthy.png
    //     var link='', str=[], drakeInfo=[], drakeAttributes=[];

    //     link = this.getDrakeLink(drake);
    //     str = link.split('/');
    //     drakeInfo = str[str.length-1].split('.');
    //     drakeAttributes = drakeInfo[drakeInfo.length-1].split('_');
    //     console.log('drakeAttributes: '+drakeAttributes);
    //     return drakeAttributes;
    // }

    getCurrentDropDownValues(){
        return this.getDROPDOWN_TEXT().each(($dropdown, index, $dropdownList)=>{
            var textArr = []
            $dropdown.invoke('text').then(($text)=>{
                textArr.push($text);
            })
            console.log ("Dropdown values are: "+textArr)
            return textArr;
        })
    }
    
    addTrait(trait){
        cy.log('in addTrait');
        var index = -1;
        var opp = (trait.slice(0,-1))+'less'
        var currentDrakeTraits = this.getCurrentDropDownValues();
        console.log("currentDrakeTraits: "+currentDrakeTraits)
        // if (!currentDrakeTraits.include(trait)) {
        //     index = currentDrakeTraits.indexOf(opp);
        // }
        // this.selectTrait(index, trait)
    }

    removeTrait(trait){
        cy.log('in removeTrait');
        var index = -1;
        var opp = (trait.slice(0,-1))+'less'
        var currentDrakeTraits = this.getCurrentDropDownValues();
        console.log("currentDrakeTraits: "+currentDrakeTraits)

        // if (!currentDrakeTraits.include(opp)) {
        //     index = currentDrakeTraits.indexOf(trait);
        // }
        // this.selectTrait(index, opp)
    }



    
    

    //****** */Put this in the test spec
    // def verify_drake_in_stable
    //   puts "in verify drake in stable"
    //   stable_drakes = find_all(STABLE_DRAKE)
    //   return stable_drakes.length
    // end
}
export default MeiosisObject