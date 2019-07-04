const HummusRecipe = require('hummus-recipe');
const pdfDoc = new HummusRecipe('input.pdf', 'output.pdf');
//const pdfDoc = new HummusRecipe('input.pdf', 'output.pdf');
pdfDoc
    .editPage(1)
    .text('Михаил Иосилевич', 170, 310, {
        color: '000000',
        fontSize: 20,
        font: 'Courier New',
    })
    .endPage()
    .endPDF();