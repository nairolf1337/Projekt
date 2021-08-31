//Refactoring
const LExpression = {
    makeNum: (p) => (_)=>p,
    makeAdd: (p, q) => (env) => p(env)+q(env),
    makeSub: (p, q) => (env) => p(env)-q(env),
    makeMul: (p,q) => (env) => p(env)*q(env),
    makeDiv: (p,q) => (env) => p(env)/q(env),
    makeVarRef: (p) =>  (env) => env[p],
    makeEq: (p,q) => (env) => p(env)==q(env),
    makeLt: (p,q) => (env) => p(env)<q(env),
    makeGt: (p,q) => (env) => p(env)>q(env),
    makeNeq: (p,q) => (env) => p(env)!=q(env),
    makeAnd: (p, q) => (env) => p(env)&&q(env),
    makeOr: (p, q) => (env) => p(env)||q(env),
    makeNot: (p) => (env) => !p(env),
    makeTrue: () => () => true,
    makeFalse: () => () => false,
}

/** @class LSystem Repräsentation eines parametrisierten L-Systems */
class LSystem {
    /**
     * Erzeugt eine Instanz der LSystem-Klasse
     * @param {[ProductionApplication]} axiom 
     * @param {Object} productions 
     */
    constructor(axiom, productions={}) {
        this.axiom = axiom
        this.productions = productions
        this.state = axiom
    }

    iterate() {
        /*Vorgänger werden durch Nachfolger ersetzt*/
        let stateTemp = []
        for(let pApp of this.state) {
            stateTemp = [...stateTemp, ...pApp.evalApplication()]
        }

        this.state = stateTemp
        return this.state
    }

    getState() {
        return this.state
    }

    setProduction(production) {
        this.productions[production.lhs] = production
    }

    /**
     * 
     * @param {[ProductionApplication]} axiom 
     */
    setAxiom(axiom) {
        this.axiom = axiom.map(prodApp=>new ProductionApplication(prodApp.production(), prodApp.args))
        this.state = this.axiom
    }

    /**
     * Rückgabe einer Funktion, welche bei Aufruf die durch lhs angegebene Funktion zurückgibt
     * @param {string} lhs 
     * @returns Funktion 
     */
    makeGetProduction(lhs) {
        return () => { if(lhs in this.productions) return this.productions[lhs] 
                       else { this.setProduction(this.__idProduction__(lhs)); return this.productions[lhs] }
        }
    }

    __idProduction__(lhs) {
        return new Production(lhs, [new ProductionApplication(this.makeGetProduction(lhs), [])], [], LExpression.makeTrue(), this)
    }

    __getProduction__(lhs) {
        if(lhs in this.productions) {
            return this.production[lhs]
        }
    }

    get readableState() {
        return this.state.map(prodApp=>{
            let argsAux = (typeof prodApp.args !== 'undefined')?prodApp.args.map(argFun=>argFun()):[]
            return {lhs: prodApp.production.lhs, args: argsAux}
        })
    }
}

/** @class Production Repräsentation einer einzelnen,  ggf. parametrisierten Produktionsregel */
class Production {
    /**
     * 
     * @param {String} lhs 
     * @param {ProductionApplication[]} rhs 
     * @param {String[]} parameters 
     * @param {Function} predicate 
     * @param {LSystem} lsystem 
     */
    constructor(lhs, rhs, parameters = [], predicate = LExpression.makeTrue(), lsystem) { //wenn predicate = 'undefined', dann wird true angenommen
        this.lhs = lhs
        this.rhs = rhs //ProductionApplication(s)
        this.predicate = predicate
        this.parameters = parameters
        this.parameterNumber = this.parameters.length
        this.lsystem = lsystem
    }

    /**
     * Wertet Produktion im Hinblick auf übergebene Argumente aus
     * @param {Array} args Enthält die Auswertungsresultate der Ausdrücke
     * @param {Productions} productions Produktionsregeln des L-System, welchem diese Produktion angehört
     * @return {Array[ProductionApplication]}
     */
    evaluateProduction(args, productions) {
        let paramsToArgs = zip(this.parameters, args)

        if(this.predicate(paramsToArgs)) {
            for (let pApp of this.rhs) {
                pApp.evalArguments(paramsToArgs) // {argument: evaluatedParameter}
            }
        }
        else { //Identitätsproduktion
            return [this.lhs]
        }
    }

    /**
     * 
     * @returns {String[]} Parameterbezeichnungen der Produktionsregel
     */
    getParameters() {
        return this.parameters
    }

    /**
     * 
     * @returns {ProductionApplication[]} Nachfolger der Produktionsregel
     */
    getRHS() {
        return this.rhs
    }
}

/** @class ProductionApplication Repräsentation der Anwendung einer Produktionsregel */
class ProductionApplication {
    /**
     * Erzeugung einer ProductionApplication Instanz
     * @param {Production} production
     * @param {Function[]} args 
     */
    constructor(production, args) {
        this.production = production
        this.args = args
    }

    /**
     * Auswertung der einer einzelnen Produktion als Parameter übergebenen Ausdrücke anhand eines Environment-Objekts
     * @param {Object} environment Einfache Zuordnung von Variablennamen zu deren jeweiligem Wert, z.B. {'foo': 42, 'leet': true}
     * @return {Object} neues Environment
     */
    evalArguments(environment) {
        let evaluatedArguments = []

        if(typeof this.args !== 'undefined') {
            for(let expression of this.args) {
                evaluatedArguments.push(expression(environment))
            }
        }

        return zip(this.production.getParameters(), evaluatedArguments)
    }

    /**
     * Auswertung der der ProductionApplication als Parameter übergebenen Ausdrücke aus
     * @param {Object} oldEnvironment 
     * @returns {ProductionApplication[]}
     */
    evalArgumentsInRHS(oldEnvironment) {
        let newEnvironment = this.evalArguments(oldEnvironment)
        let productionRHS = this.production.getRHS()

        return productionRHS.map(prodApp => {
            return new ProductionApplication(prodApp.production(),
                                             prodApp.args.map(arg=>LExpression.makeNum(arg(newEnvironment))))
        })
    }

    /**
     * Alias für evalArgumentsInRHS()
     * @param {Object} environment 
     * @returns {ProductionApplication[]}
     */
    evalApplication(environment) {
        return this.evalArgumentsInRHS(environment)
    }
}

function zip(a,b) {
    let mapping = {}
    
    a.forEach((element, index) => {
        mapping[element] = b[index]
    });

    return mapping
}

//Problem: wechselseitige Rekursion

module.exports = {LSystem, Production, ProductionApplication, LExpression}