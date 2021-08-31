/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var lSysParser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,4],$V1=[5,6],$V2=[5,6,16],$V3=[1,13],$V4=[1,19],$V5=[1,23],$V6=[1,18],$V7=[1,20],$V8=[1,21],$V9=[1,22],$Va=[1,24],$Vb=[11,14],$Vc=[1,32],$Vd=[1,33],$Ve=[11,19,23,30,31],$Vf=[2,23],$Vg=[1,34],$Vh=[1,35],$Vi=[1,36],$Vj=[1,37],$Vk=[1,38],$Vl=[1,39],$Vm=[1,40],$Vn=[11,19,23,27,28,29,30,31,36,37,38,39],$Vo=[1,45],$Vp=[1,53],$Vq=[1,65],$Vr=[11,19,23,27,28,29,30,31,36,37];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"input":3,"axiom":4,"EOF":5,";":6,"rules":7,"ruleApp":8,"module":9,"lhs":10,"->":11,"rhs":12,"prototype":13,"|":14,"lhsPredicate":15,"SYMBOL":16,"(":17,"parmList":18,")":19,"relExp":20,"argList":21,"variable":22,",":23,"VARIABLE":24,"booleanPrimary":25,"exp":26,">":27,"<":28,"==":29,"&&":30,"||":31,"!":32,"TRUE":33,"FALSE":34,"NUMBER":35,"+":36,"-":37,"*":38,"/":39,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:";",11:"->",14:"|",16:"SYMBOL",17:"(",19:")",23:",",24:"VARIABLE",27:">",28:"<",29:"==",30:"&&",31:"||",32:"!",33:"TRUE",34:"FALSE",35:"NUMBER",36:"+",37:"-",38:"*",39:"/"},
productions_: [0,[3,2],[3,3],[4,1],[4,2],[7,2],[7,3],[9,3],[10,1],[10,3],[13,1],[13,4],[15,1],[12,1],[12,2],[8,1],[8,4],[18,1],[18,3],[22,1],[21,1],[21,3],[20,1],[20,1],[20,3],[20,3],[20,3],[20,3],[20,3],[20,2],[20,3],[25,1],[25,1],[26,1],[26,1],[26,3],[26,3],[26,3],[26,3],[26,2],[26,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */, lSys) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 lSys.setAxiom($$[$0-1]); return lSys 
break;
case 2:
 lSys.setAxiom($$[$0-2]); return lSys 
break;
case 3:
 this.$ = [$$[$0]]
break;
case 4:
 this.$ = [$$[$0-1]].concat($$[$0])
break;
case 5:
 lSys.setProduction($$[$0-1]); this.$=$$[$0-1] 
break;
case 6:
 lSys.setProduction($$[$0-2]); this.$=$$[$0-2] 
break;
case 7:
 this.$ = new Production($$[$0-2]['lhs'], $$[$0], $$[$0-2]['parameters'], $$[$0-2]['predicate'], lSys) 
break;
case 8:
 $$[$0]['predicate'] = LExpression.makeTrue(); this.$ = $$[$0] 
break;
case 9:
 $$[$0-2]['predicate'] = $$[$0]; this.$ = $$[$0-2] 
break;
case 10:
 this.$ = {lhs: $$[$0], parameters: []} 
break;
case 11:
 this.$ = {lhs: $$[$0-3], parameters: $$[$0-1]} 
break;
case 12: case 19: case 22: case 23:
 this.$ = $$[$0] 
break;
case 13: case 17: case 20:
 this.$ = [$$[$0]] 
break;
case 14:
 this.$ = [$$[$0-1]].concat($$[$0]) 
break;
case 15:
 this.$ = new ProductionApplication(lSys.makeGetProduction($$[$0]), []) 
break;
case 16:
 this.$ = new ProductionApplication(lSys.makeGetProduction($$[$0-3]), $$[$0-1]) 
break;
case 18: case 21:
 this.$ = [$$[$0-2]].concat($$[$0]) 
break;
case 24:
 this.$ = LExpression.makeGt($$[$0-2], $$[$0]) 
break;
case 25:
 this.$ = LExpression.makeLt($$[$0-2], $$[$0]) 
break;
case 26:
 this.$ = LExpression.makeEq($$[$0-2], $$[$0]) 
break;
case 27:
 this.$ = LExpression.makeAnd($$[$0-2], $$[$0]) 
break;
case 28:
 this.$ = LExpression.makeOr($$[$0-2], $$[$0]) 
break;
case 29:
 this.$ = LExpression.makeNot($$[$0]) 
break;
case 30: case 40:
 this.$ = $$[$0-1] 
break;
case 31:
 this.$ = LExpression.makeTrue() 
break;
case 32:
 this.$ = LExpression.makeFalse() 
break;
case 33:
 this.$ = LExpression.makeNum(Number($$[$0])) 
break;
case 34:
 this.$ = LExpression.makeVarRef($$[$0]) 
break;
case 35:
 this.$ = LExpression.makeAdd($$[$0-2], $$[$0]) 
break;
case 36:
 this.$ = LExpression.makeSub($$[$0-2], $$[$0]) 
break;
case 37:
 this.$ = LExpression.makeMul($$[$0-2], $$[$0]) 
break;
case 38:
 this.$ = LExpression.makeDiv($$[$0-2], $$[$0]) 
break;
case 39:
 this.$ = LExpression.makeSub(0, $$[$0]) 
break;
}
},
table: [{3:1,4:2,8:3,16:$V0},{1:[3]},{5:[1,5],6:[1,6]},o($V1,[2,3],{8:3,4:7,16:$V0}),o($V2,[2,15],{17:[1,8]}),{1:[2,1]},{7:9,9:10,10:11,13:12,16:$V3},o($V1,[2,4]),{17:$V4,20:15,21:14,24:$V5,25:16,26:17,32:$V6,33:$V7,34:$V8,35:$V9,37:$Va},{1:[2,2]},{5:[1,25],6:[1,26]},{11:[1,27]},{11:[2,8],14:[1,28]},o($Vb,[2,10],{17:[1,29]}),{19:[1,30]},{19:[2,20],23:[1,31],30:$Vc,31:$Vd},o($Ve,[2,22]),o($Ve,$Vf,{27:$Vg,28:$Vh,29:$Vi,36:$Vj,37:$Vk,38:$Vl,39:$Vm}),{17:$V4,20:41,24:$V5,25:16,26:17,32:$V6,33:$V7,34:$V8,35:$V9,37:$Va},{17:$V4,20:42,24:$V5,25:16,26:43,32:$V6,33:$V7,34:$V8,35:$V9,37:$Va},o($Ve,[2,31]),o($Ve,[2,32]),o($Vn,[2,33]),o($Vn,[2,34]),{17:$Vo,24:$V5,26:44,35:$V9,37:$Va},{1:[2,5]},{7:46,9:10,10:11,13:12,16:$V3},{8:48,12:47,16:$V0},{15:49,17:$V4,20:50,24:$V5,25:16,26:17,32:$V6,33:$V7,34:$V8,35:$V9,37:$Va},{18:51,22:52,24:$Vp},o($V2,[2,16]),{17:$V4,20:15,21:54,24:$V5,25:16,26:17,32:$V6,33:$V7,34:$V8,35:$V9,37:$Va},{17:$V4,20:55,24:$V5,25:16,26:17,32:$V6,33:$V7,34:$V8,35:$V9,37:$Va},{17:$V4,20:56,24:$V5,25:16,26:17,32:$V6,33:$V7,34:$V8,35:$V9,37:$Va},{17:$Vo,24:$V5,26:57,35:$V9,37:$Va},{17:$Vo,24:$V5,26:58,35:$V9,37:$Va},{17:$Vo,24:$V5,26:59,35:$V9,37:$Va},{17:$Vo,24:$V5,26:60,35:$V9,37:$Va},{17:$Vo,24:$V5,26:61,35:$V9,37:$Va},{17:$Vo,24:$V5,26:62,35:$V9,37:$Va},{17:$Vo,24:$V5,26:63,35:$V9,37:$Va},o($Ve,[2,29]),{19:[1,64],30:$Vc,31:$Vd},o([30,31],$Vf,{19:$Vq,27:$Vg,28:$Vh,29:$Vi,36:$Vj,37:$Vk,38:$Vl,39:$Vm}),o($Vn,[2,39]),{17:$Vo,24:$V5,26:66,35:$V9,37:$Va},{1:[2,6]},o($V1,[2,7]),o($V1,[2,13],{8:48,12:67,16:$V0}),{11:[2,9]},{11:[2,12],30:$Vc,31:$Vd},{19:[1,68]},{19:[2,17],23:[1,69]},o([19,23],[2,19]),{19:[2,21]},o($Ve,[2,27]),o([11,19,23,31],[2,28],{30:$Vc}),o($Ve,[2,24],{36:$Vj,37:$Vk,38:$Vl,39:$Vm}),o($Ve,[2,25],{36:$Vj,37:$Vk,38:$Vl,39:$Vm}),o($Ve,[2,26],{36:$Vj,37:$Vk,38:$Vl,39:$Vm}),o($Vr,[2,35],{38:$Vl,39:$Vm}),o($Vr,[2,36],{38:$Vl,39:$Vm}),o($Vn,[2,37]),o($Vn,[2,38]),o($Ve,[2,30]),o($Vn,[2,40]),{19:$Vq,36:$Vj,37:$Vk,38:$Vl,39:$Vm},o($V1,[2,14]),o($Vb,[2,11]),{18:70,22:52,24:$Vp},{19:[2,18]}],
defaultActions: {5:[2,1],9:[2,2],25:[2,5],46:[2,6],49:[2,9],54:[2,21],70:[2,18]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

//Beginn Prolog
const { LExpression, LSystem, Production, ProductionApplication } = require('./lSysRep.js')
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/*Leerzeichen überspringen*/
break;
case 1:return 16
break;
case 2:return 33
break;
case 3:return 34
break;
case 4:return 24
break;
case 5:return 35
break;
case 6:return 6
break;
case 7:return 31
break;
case 8:return 14
break;
case 9:return 11
break;
case 10:return 23
break;
case 11:return yy_.yytext[0]
break;
case 12:return 28
break;
case 13:return 27
break;
case 14:return 29
break;
case 15:return 32
break;
case 16:return 30
break;
case 17:return 17
break;
case 18:return 19
break;
case 19:return 5
break;
case 20:return 'UNRECOGNIZED TOKEN'
break;
}
},
rules: [/^(?:\s+)/,/^(?:[A-Z\[\]\\])/,/^(?:true\b)/,/^(?:false\b)/,/^(?:[a-z]+\b)/,/^(?:[0-9]+\b)/,/^(?:;)/,/^(?:\|\|)/,/^(?:\|)/,/^(?:->)/,/^(?:,)/,/^(?:[+\-\*\/])/,/^(?:<)/,/^(?:>)/,/^(?:==)/,/^(?:!)/,/^(?:&&)/,/^(?:\()/,/^(?:\))/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = lSysParser;
exports.Parser = lSysParser.Parser;
exports.parse = function () { return lSysParser.parse.apply(lSysParser, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}