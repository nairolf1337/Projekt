const {LExpression, LSystem, Production, ProductionApplication} = require('./lSysRep.js')

let lSys
let prodA
let rhsA
let prodB
let rhsB

lSys = new LSystem()
rhsA = [new ProductionApplication(lSys.makeGetProduction('B'), [])]
prodA = new Production('A', rhsA, [], LExpression.makeTrue(), lSys)

rhsB = [new ProductionApplication(lSys.makeGetProduction('A'), []), new ProductionApplication(lSys.makeGetProduction('B'), [])]
prodB = new Production('B', rhsB, [], LExpression.makeTrue(), lSys)

/*console.log(prodB)*/

lSys.setProduction(prodA)
lSys.setProduction(prodB)

/*console.log(prodA)
console.log(prodB)*/

lSys.setAxiom([new ProductionApplication(lSys.makeGetProduction('A'), [])])


