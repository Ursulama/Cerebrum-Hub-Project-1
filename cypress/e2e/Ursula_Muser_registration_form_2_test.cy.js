beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})
const myEmail = 'glamor@gmal.ee'
let password = 'Passhere112'
function inputMandatoryData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('Hainz')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('112311281')
    cy.get('#password').type('MyPass2')
    cy.get('#confirm').type('MyPass2')
    cy.get('h2').contains('Password').click()
    
}

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        cy.get('#username').type('Hainz123')
        cy.get('#email').type(myEmail)
        cy.get('[data-cy="name"]').type('Hainz')
        cy.get('#lastName').type('Hainzberg')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#cars').type('audi')
        cy.get('input[name="password"]').type(password)
        cy.get('[name="confirm"]').type('123pass')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled') 
        cy.get('#success_message').should('not.be.visible') 
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        // Change the test, so the passwords would match
        cy.get('[name="confirm"]').clear().type(password);
        cy.get('h2').contains('Select').click()
        // Assert that submit button is now enabled and error message is not visible any more
        cy.get('.submit_button').should('be.enabled') 
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')

    });


    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
        cy.get('#username').type('Hainz123')
        cy.get('#email').type('glamor@gmal.ee')
        cy.get('[data-cy="name"]').type('Hainz')
        cy.get('#lastName').type('Hainzberg')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#cssFavLanguage').check('CSS')
        cy.get('#vehicle1').check('Bike')
        cy.get('#cars').select('audi')
        cy.get('#animal').select('hippo')
        cy.get('input[name="password"]').type('Passhere112')
        cy.get('[name="confirm"]').type('Passhere112')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    });

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message
        inputMandatoryData('HainzDoe')
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
        
        
    })

    it('User can not submit a form without an username', () => {
        inputMandatoryData('HainzDoe')
        //Assert that after removing the username submit button is disabled
        cy.get('input[data-testid="user"]').clear()
        cy.get('h2').contains('Select').click()
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        cy.get('#username').scrollIntoView()
        cy.get('.submit_button').should('be.disabled') 
        cy.get('#success_message').should('not.be.visible')

    });

    it('User can not submit a form without a first name', () => {
        inputMandatoryData('HainzDoe')
        //Assert that after removing the first name submit button is disabled
        cy.get('input[data-cy="name"]').clear()
        cy.get('h2').contains('Select').click()
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        cy.get('[data-cy="name"]').scrollIntoView()
        cy.get('.submit_button').should('be.disabled') 
        cy.get('#success_message').should('not.be.visible')

    });

    it('User can not submit a form without a last name', () => {
        inputMandatoryData('HainzDoe')
        //Assert that after removing the last name submit button is disabled
        cy.get('input[data-testid="lastNameTestId"]').clear()
        cy.get('h2').contains('Select').click()
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        cy.get('[data-testid="lastNameTestId"]').scrollIntoView()
        cy.get('.submit_button').should('be.disabled') 
        cy.get('#success_message').should('not.be.visible')

    });

    it('User can submit the form with all favourite transport options', () => {
        inputMandatoryData('HainzDoe')
        cy.get('#vehicle1').check('Bike')
        cy.get('#vehicle2').check('Car')
        cy.get('#vehicle3').check('Boat')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    });

    it('User can not submit the form with multiple Web languages', () => {
        inputMandatoryData('HainzDoe')
        cy.get('#htmlFavLanguage').check('HTML')
        cy.get('#cssFavLanguage').check('CSS')
        cy.get('#javascriptFavLanguage').check('JavaScript')
        cy.get('#phpFavLanguage').check('php')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    });

    it('User can choose a car, all given options are available to choose from', () => {
        inputMandatoryData('HainzDoe')
        cy.get('#cars').select('audi')
        cy.get('#cars').select('volvo')
        cy.get('#cars').select('saab')
        cy.get('#cars').select('opel')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    });

    it('User can select their favourite animal, all given options are available to choose from', () => {
        inputMandatoryData('HainzDoe')
        cy.get('#animal').select('dog')
        cy.get('#animal').select('cat')
        cy.get('#animal').select('snake')
        cy.get('#animal').select('hippo')
        cy.get('#animal').select('mouse')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    });

})



/*
Assignment 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('#logo').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('#logo').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100) 
    })

    it('My test for second picture', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height
        // it should be less than 168 and greater than 80
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 168)
            .and('be.greaterThan', 80)  
        // parameter width should be less than 117 and greater than 115
        cy.get('[data-cy="cypress_logo"]').invoke('width').should('be.greaterThan', 115).and('be.lessThan', 117)
    });

    it('Check navigation part1', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.url().should('contain', '/registration_form_2.html')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation part2', () => {
        cy.get('nav').children().should('have.length', 2)

        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
    
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.url().should('contain', '/registration_form_2.html')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checklist is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)

        // Verify labels of the radio buttons
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')

        //Verify default state of checkbox boxes
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        // Checking multiple boxes do not remove selection from the other checkboxes
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')

    })

    it('Car dropdown is correct', () => {
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Favourite animal dropdown is correct', () => {
        // Select third element and create screenshot for this area or full page
        cy.get('#animal').select(2).screenshot('Animal drop-down')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
        
        // Advanced level how to check the content of the Animals dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })

})

