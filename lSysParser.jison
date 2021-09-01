%{
//Beginn Prolog
const { LExpression, LSystem, Production, ProductionApplication } = require('./lSysRep.js')
%}

%parse-param lSys

%lex
%s REC_SYMBOL
%s REC_OPERATOR
%%
\s+     /*Leerzeichen überspringen*/
<INITIAL>[A-Z\[\]\\\\/\+\-]    return 'SYMBOL'
"true"          return 'TRUE'
"false"         return 'FALSE'
/*"rand"          return 'RAND'
"iteration"     return 'ITERATION'*/
[a-z]+\b        return 'VARIABLE'
[0-9]+\b        return 'NUMBER'
";"             return ';'
"||"            return '||'
"|"             return '|'
<INITIAL>"->"            return '->'
","             return ','
<REC_OPERATOR>[+\-\*\/\\]       return yytext[0]
"<"             return '<'
">"             return '>'
"=="            return '=='
'!'             return '!'
"&&"            return '&&'
"("             return '('
")"             return ')'
<<EOF>>         return 'EOF'
.               return 'UNRECOGNIZED TOKEN'
/lex

/*Deklarationen, niedrigere Zeilennummer entspricht niedrigerer Assoziativität*/

%token NUMBER
%left '||'
%left '&&'
%left '<' '>' '=='
%left '+' '-'
%left '/' '*'
%right UMINUS NOT

%start input

%%
input:  axiom EOF { lSys.setAxiom($1); return lSys }
      | axiom ';' rules { lSys.setAxiom($1); return lSys };

axiom:  ruleApp { $$ = [$1]}
      | ruleApp axiom { $$ = [$1].concat($2)};


rules:  module EOF { lSys.setProduction($1); $$=$1 }
      | module ';' rules { lSys.setProduction($1); $$=$1 };

module: lhs '->' rhs { $$ = new Production($1['lhs'], $3, $1['parameters'], $1['predicate'], lSys) };

lhs: prototype                      { $1['predicate'] = LExpression.makeTrue(); $$ = $1 }
   | prototype '|' lhsPredicate     { $1['predicate'] = $3; $$ = $1 };

prototype: SYMBOL                   { $$ = {lhs: $1, parameters: []} }
         | SYMBOL '(' parmList ')'  { $$ = {lhs: $1, parameters: $3} };

lhsPredicate: relExp { $$ = $1 };

rhs: ruleApp         { $$ = [$1] }
   | ruleApp rhs     { $$ = [$1].concat($2) };

ruleApp: SYMBOL                  { $$ = new ProductionApplication(lSys.makeGetProduction($1), []) }
       | SYMBOL rec_operator '(' argList rec_symbol ')' { $$ = new ProductionApplication(lSys.makeGetProduction($1), $3) };

parmList: variable { $$ = [$1] }               
        | variable ',' parmList  { $$ = [$1].concat($3) }; //Parameter jeweils vorne anfügen

variable: VARIABLE { $$ = $1 };

argList: relExp { $$ = [$1] }
       | relExp ',' argList { $$ = [$1].concat($3) };

/*Algebraische Ausdrücke*/
relExp: booleanPrimary { $$ = $1 }
      | exp { $$ = $1 }
      | exp '>' exp { $$ = LExpression.makeGt($1, $3) }
      | exp '<' exp { $$ = LExpression.makeLt($1, $3) }
      | exp '==' exp { $$ = LExpression.makeEq($1, $3) }
      | relExp '&&' relExp { $$ = LExpression.makeAnd($1, $3) }
      | relExp '||' relExp { $$ = LExpression.makeOr($1, $3) }
      | '!'relExp %prec NOT { $$ = LExpression.makeNot($2) }
      | '(' relExp ')' { $$ = $2 }; //mehrdeutig

booleanPrimary: TRUE { $$ = LExpression.makeTrue() }
              | FALSE { $$ = LExpression.makeFalse() };

exp: NUMBER { $$ = LExpression.makeNum(Number($1)) }
   | VARIABLE { $$ = LExpression.makeVarRef($1) }
   | exp '+' exp { $$ = LExpression.makeAdd($1, $3) }
   | exp '-' exp { $$ = LExpression.makeSub($1, $3) }
   | exp '*' exp { $$ = LExpression.makeMul($1, $3) }
   | exp '/' exp { $$ = LExpression.makeDiv($1, $3) }
   | '-' exp %prec UMINUS { $$ = LExpression.makeSub(0, $2) }
   | '(' exp ')' { $$ = $2 }; //mehrdeutig

rec_operator:                 { yy.lexer.begin('REC_OPERATOR') };
rec_symbol:                   { yy.lexer.popState() };