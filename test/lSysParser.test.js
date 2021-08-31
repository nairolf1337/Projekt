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

describe('L-System ohne Produktionen; nur Axiom: A', ()=> {
    let lSys = parserFunc('AA', new LSystem())

    it("vor erster Iteration", ()=> {
        expect(lSys.readableState).toEqual([{lhs: 'A', args: []}, {lhs: 'A', args: []}])
    })

    it("nach erster Iteration", ()=> {
        lSys.iterate()
        expect(lSys.readableState).toEqual([{lhs: 'A', args: []}, {lhs: 'A', args: []}])
    })
})

describe('L-System mit expliziten und Identitätsproduktionen gemischt', ()=> {
    let lSys = parserFunc('A;A->CB;B->AB', new LSystem())

    it("vor erster Iteration", ()=> {
        expect(lSys.readableState).toEqual([{lhs: 'A', args: []}])
    })

    it("nach erster Iteration", ()=> {
        lSys.iterate()
        expect(lSys.readableState).toEqual([{lhs: 'C', args: []}, {lhs: 'B', args: []}])
    })

    it("nach zweiter Iteration", ()=> {
        lSys.iterate()
        expect(lSys.readableState).toEqual([{lhs: 'C', args: []}, {lhs: 'A', args: []}, {lhs: 'B', args: []}])
    })
})

describe('L-System mit expliziten und Identitätsproduktionen gemischt', ()=> {
    let lSys = parserFunc('F(10);F(n)->[F(n/2)F(n/5)]', new LSystem())

    it("vor erster Iteration", ()=> {
        expect(lSys.readableState).toEqual([{lhs: 'F', args: [10]}])
    })

    it("nach erster Iteration", ()=> {
        lSys.iterate()
        expect(lSys.readableState).toEqual([{lhs: '[', args: []}, {lhs: 'F', args: [5]}, {lhs: 'F', args: [2]}, {lhs: ']', args: []}])
    })
})