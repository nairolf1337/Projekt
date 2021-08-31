const parserFunc = require('lSysParser.js').parse
const {LSystem, Production, ProductionApplication, LExpression} = require('lSysRep.js')

describe('Test des Parsers; einfaches L-System ohne Argumente: A; A->B;B->AB', ()=> {
    let lSys = parserFunc('A;A->B;B->AB', new LSystem())

    it("vor erster Iteration", ()=> {
        expect(lSys.readableState).toEqual([{lhs: 'A', args: []}])
    })

    it("nach erster Iteration", ()=> {
        lSys.iterate()
        expect(lSys.readableState).toEqual([{lhs: 'B', args: []}])
    })

    it("nach zweiter Iteration", ()=> {
        lSys.iterate()
        expect(lSys.readableState).toEqual([{lhs: 'A', args: []}, {lhs: 'B', args: []}])
    })
})

describe('einfaches L-System mit Argumenten: A(0); A(n)->B(n);B(n)->A(n+1)B(n)', ()=> {
    let lSys = parserFunc('A(0); A(n)->B(n);B(n)->A(n+1)B(n)', new LSystem())

    it("vor erster Iteration", ()=> {
        expect(lSys.readableState).toEqual([{lhs: 'A', args: [0]}])
    })

    it("nach erster Iteration", ()=> {
        lSys.iterate()
        expect(lSys.readableState).toEqual([{lhs: 'B', args: [0]}])
    })

    it("nach zweiter Iteration", ()=> {
        lSys.iterate()
        expect(lSys.readableState).toEqual([{lhs: 'A', args: [1]}, {lhs: 'B', args: [0]}])
    })
})