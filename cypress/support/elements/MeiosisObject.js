class MeiosisObject {
    dominantTraits = ['Arms', 'Legs', 'Wings', 'Color', 'Shiny', 'Long tail', 'Deep', 'Spiked'];
    recessiveTraits = ['Horns','Albino','Dull','Short tail','Faded'];

    getYOUR_DRAKE_IMAGE() {
        return ("#your-drake .geniblocks.organism img")
    }
    getTARGET_DRAKE_IMAGE() {
        return ('#target-drake > img')
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
        // return cy.get('#mountNode .dropdown-menu')
        return cy.get('#mountNode .dropdown-menu .fv-gene-option')
    }
    getTARGET_DRAKE_IMAGE() {
        return ('#target-drake > img')
    }
    getSTABLE_DRAKE() {
        return cy.get('.stable-drake-overlay')
    }
  
    selectGender(gender) {
      if (gender=="f"){
        this.getFEMALE_LABEL().click();
      } else if (gender=='m') {
          this.getMALE_LABEL().click();
      }
    }
  
    selectTrait(index, trait) { //position is the left or right side dropdown
        this.getDROPDOWN_TOGGLE().eq(index).click();
        this.getDROPDOWN_MENU_ITEM().contains(trait).click();
    }
  
    // saveDrake() {
    //     this.getHATCH_DRAKE_BUTTON.click();
    // }

    parseDrakeLink(drake){
        var str=[], drakeInfo=[], drakeAttributes=[], el = '';
        if (drake == "target") {
            el = this.getTARGET_DRAKE_IMAGE();
        } else if (drake =='current') {
            el = this.getYOUR_DRAKE_IMAGE();
        }

        return cy.get(el)
            .then((img)=>{
                return img.prop('src')
            })
            .then((link)=>{
                    str = link.split('/');
                    drakeInfo = str[str.length-1].split('.');
                    drakeAttributes = drakeInfo[0].split('_');
                    console.log('drakeAttributes: '+drakeAttributes);
                    return drakeAttributes; 
            });

    }

    getCurrentDropDownValue(index){
        return this.getDROPDOWN_TEXT().eq(index).text()
    }
    
    addTrait(trait){
        cy.log('in addTrait. trait is: '+trait);
        var opp = (trait.slice(0,-1))+'less';

         cy.get('.geniblocks.genome').then(($geneBlock)=>{
            if (($geneBlock.text().includes(trait))) {
                cy.log('in if -- trait is already exist');
            } else {
                cy.log('in else -- need to change a trait')
                this.getDROPDOWN_TEXT().contains(opp).first().click();
                cy.wait(500);
                this.getDROPDOWN_MENU_ITEM().contains(trait).first()
                    .trigger('mousemove')
                    .trigger('mouseover')
                    .trigger('mousedown',{which:1}, {force:true})
                    .trigger('mouseup', {which:1}, {force:true});
                cy.wait(1000);
            }
        })
    }

    removeTrait(trait){
        cy.log('in removeTrait');
        var opp = (trait.slice(0,-1))+'less'

        cy.get('.geniblocks.genome').then(($geneBlock)=>{
            cy.log(($geneBlock.text().includes(trait)))
            if (($geneBlock.text().includes(trait))) {
                cy.log('in if -- trait exist so need to remove')
                this.getDROPDOWN_TEXT().contains(trait).first().click();
                this.getDROPDOWN_MENU_ITEM().contains(opp).first()//.click();
                .trigger('mousemove')
                .trigger('mouseover')
                .trigger('mousedown',{which:1}, {force:true})
                .trigger('mouseup', {which:1}, {force:true});
                cy.wait(1000);
            }
        }) 
        cy.get('.geniblocks.genome').then(($geneBlock)=>{
            cy.log(($geneBlock.text().includes(trait)))   
            if (($geneBlock.text().includes(trait))) { //because gene is dominant have to remove both
                cy.log('in if -- trait exist so need to remove')
                this.getDROPDOWN_TEXT().contains(trait).first().click();
                this.getDROPDOWN_MENU_ITEM().contains(opp).first()//.click();
                .trigger('mousemove')
                .trigger('mouseover')
                .trigger('mousedown',{which:1}, {force:true})
                .trigger('mouseup', {which:1}, {force:true});
                cy.wait(1000);
            } else {
                cy.log('in else -- trait is removed')
            }
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