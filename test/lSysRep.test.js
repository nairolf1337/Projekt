const {LExpression, LSystem, ProductionApplication, Production} = require('./lSysRep.js')

describe("Tests der einzelnen Funktionen zur Darstellung von Ausdrücken", ()=> {
    let environment
    let three;
    let four;
    let neg5;
    let six;

    beforeEach(()=> {
        environment = {
            "answer": 42,
            "leet": 1337,
            "truth": true,
            "a": 1
        }

        three = LExpression.makeNum(3)
        four = LExpression.makeNum(4)
        neg5 = LExpression.makeNum(-5)
        six = LExpression.makeNum(6)
    })

    it("varRef", ()=> {
        expect(LExpression.makeVarRef('leet')(environment)).toBe(1337)
        expect(LExpression.makeVarRef('truth')(environment)).toBe(true)
        expect(LExpression.makeVarRef('answer')(environment)).toBe(42)
        expect(LExpression.makeVarRef('a')(environment)).toBe(1)
    })

    it("makeNum", ()=> {
        expect(LExpression.makeNum(3)(environment)).toBe(3)
        expect(LExpression.makeNum(5)(environment)).toBe(5)
    })

    it("makeAdd", ()=> {
        expect(LExpression.makeAdd(three,four)()).toBe(7)
        expect(LExpression.makeAdd(neg5,six)()).toBe(1)
    })
})

describe("Tests komplexerer Ausdrücke", ()=> {
    let environment
    let three;
    let four;
    let neg5;
    let six;

    beforeEach(()=> {
        environment = {
            "answer": 42,
            "leet": 1337,
            "truth": true,
            "a": 1
        }

        three = LExpression.makeNum(3)
        four = LExpression.makeNum(4)
        neg5 = LExpression.makeNum(-5)
        six = LExpression.makeNum(6)
    })

    it("Expressions like 'answer+leet'", ()=> {
        expect(LExpression.makeAdd(LExpression.makeVarRef('answer'), LExpression.makeVarRef('leet'))(environment)).toBe(1379)
        expect(LExpression.makeAdd(LExpression.makeVarRef('a'), LExpression.makeVarRef('a'))(environment)).toBe(2)
    })

    it('Expression "leet+3*4"', ()=> {
        expect(LExpression.makeAdd(LExpression.makeVarRef('leet'), LExpression.makeMul(three, four))(environment)).toBe(1349)
    })
})

describe("Einfaches LSystem; G(3);G=>G(n+3)", ()=> {
    let lSys
    let pApp
    let prod

    beforeEach(()=> {
        lSys = new LSystem()
        pApp = new ProductionApplication(lSys.makeGetProduction('G'), [LExpression.makeAdd(LExpression.makeNum(3), LExpression.makeVarRef('n'))])
        prod = new Production('G', [pApp], ['n'], LExpression.makeTrue(), lSys)
        lSys.setAxiom([new ProductionApplication(prod,[LExpression.makeNum(3)])])
        lSys.setProduction(prod)
    })

    it("Axiom: G(3), Produktion: G(n)=>G(3+n), Zustand vor erster Iteration", ()=> {
        expect(lSys.readableState()).toEqual([{lhs: 'G', args: [3]}])
    })

    it("Axiom: G(3), Produktion: G(n)=>G(3+n), nach erster Iteration", ()=> {
        lSys.iterate()
        expect(lSys.readableState()).toEqual([{lhs: 'G', args: [6]}])
    })
})

describe("Einfaches LSystem, mehrere Parameter; F(3,5);F(n,m)=>F(n+3,m*2)", ()=> {
    let lSys
    let pApp
    let prod

    beforeEach(()=> {
        lSys = new LSystem()
        pApp = new ProductionApplication(lSys.makeGetProduction('F'), [LExpression.makeAdd(LExpression.makeNum(3),
                                                                       LExpression.makeVarRef('n')), LExpression.makeMul(LExpression.makeNum(2), LExpression.makeVarRef('m'))])
        prod = new Production('F', [pApp], ['n','m'], LExpression.makeTrue(), lSys)
        lSys.setAxiom([new ProductionApplication(prod,[LExpression.makeNum(3), LExpression.makeNum(5)])])
        lSys.setProduction(prod)
    })

    it("Axiom: F(3,5), Produktion: F(n,m)=>F(3+n,2*m), Zustand vor erster Iteration", ()=> {
        expect(lSys.readableState()).toEqual([{lhs: 'F', args: [3,5]}])
    })

    it("Axiom: F(3,5), Produktion: F(n,m)=>F(3+n,2*m), Zustand nach erster Iteration", ()=> {
        lSys.iterate()
        expect(lSys.readableState()).toEqual([{lhs: 'F', args: [6,10]}])
    })
})

describe("Einfaches LSystem, keine Parameter; P;P=>PP", ()=> {
    let lSys
    let pApp
    let prod

    beforeEach(()=> {
        lSys = new LSystem()
        pApp = new ProductionApplication(lSys.makeGetProduction('P'), [])
        prod = new Production('P', [pApp, pApp], [], LExpression.makeTrue(), lSys)
        lSys.setAxiom([new ProductionApplication(prod, [])])
        lSys.setProduction(prod)
    })

    it("Axiom: P, Produktion: P=>PP, Zustand vor erster Iteration", ()=> {
        expect(lSys.readableState()).toEqual([{lhs: 'P', args: []}])
    })

    it("Axiom: P, Produktion: P=>PP, Zustand nach erster Iteration", ()=> {
        lSys.iterate()
        expect(lSys.readableState()).toEqual([{lhs: 'P', args: []}, {lhs: 'P', args: []}])
    })
})

describe("Unparameterisiertes LSystem, zwei Produktionen; A;A=>B;B=>AB", () => {
    let lSys
    let prodA
    let rhsA
    let prodB
    let rhsB

    beforeEach(()=> {
        lSys = new LSystem()
        rhsA = [new ProductionApplication(lSys.makeGetProduction('B'), [])]
        prodA = new Production('A', rhsA, [], LExpression.makeTrue(), lSys)
        
        rhsB = [new ProductionApplication(lSys.makeGetProduction('A'), []), new ProductionApplication(lSys.makeGetProduction('B'), [])]
        prodB = new Production('B', rhsB, [], LExpression.makeTrue(), lSys)

        lSys.setProduction(prodA)
        lSys.setProduction(prodB)
        lSys.setAxiom([new ProductionApplication(prodA, [])])
    })

    it("Zustand vor erster Iteration", ()=> {
        expect(lSys.readableState()).toEqual([{lhs: 'A', args: []}])
    })

    it("Zustand nach erster Iteration", ()=> {
        lSys.iterate()
        expect(lSys.readableState()).toEqual([{lhs: 'B', args: []}])
    })

    it("Zustand nach zweiter Iteration", ()=> {
        lSys.iterate()
        lSys.iterate()
        expect(lSys.readableState()).toEqual([{lhs: 'A', args: []}, {lhs: 'B', args: []}])
    })

    it("Zustand nach dritter Iteration", ()=> {
        console.log(lSys)
        lSys.iterate()
        lSys.iterate()
        lSys.iterate()
        expect(lSys.readableState()).toEqual([{lhs: 'B', args: []}, {lhs: 'A', args: []}, {lhs: 'B', args: []}])
    })
})
 