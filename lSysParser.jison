%{
//Beginn Prolog
const { LExpression, LSystem, Production, ProductionApplication } = require('./lSysRep.js')

let parseResult;
%}

%lex
%%
\s+     /*Leerzeichen überspringen*/
[A-Z]           return 'SYMBOL'
"true"          return 'TRUE'
"false"         return 'FALSE'
/*"rand"          return 'RAND'
"iteration"     return 'ITERATION'*/
[a-z]+\b        return 'VARIABLE'
[0-9]+\b        return 'NUMBER'
";"             return ';'
"||"            return '||'
"|"             return '|'
"->"            return '->'
","             return ','
"*"             return '*'
"/"             return '/'
"+"             return '+'
"-"             return '-'
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

%start inputTwo

%%
input:  axiom EOF
      | axiom ';' rules;

axiom:  ruleApp
      | ruleApp axiom;

rules:  module EOF { $1["symbol"]=$1.left.symbol; $$=[$1]; console.log(JSON.stringify($$)) }
      | module ';' rules { $1["symbol"]=$1.left.symbol; $$=[$1].append($3) };

module: lhs '->' rhs { $$ = {left: $1, right: $3}};

lhs: prototype                      { $$ = $1 }
   | prototype '|' lhsPredicate     { $1['predicate'] = $3; $$=$1 };

prototype: SYMBOL                   { $$ = {symbol: $1} }
         | SYMBOL '(' parmList ')'  { $$ = {symbol: $1, parameters: $3} };

lhsPredicate: relExp { $$ = $1 };

rhs: ruleApp         { $$ = [$1] }
   | ruleApp rhs     { $$ = [$1].concat($2) };

ruleApp: SYMBOL                  { $$ = {application: $1} }
       | SYMBOL '(' argList ')' { $$ = {application: $1, arguments: $3}};

parmList: variable { $$ = [$1] }               
        | variable ',' parmList  { $$ = [$1].concat($3) }; //Parameter jeweils vorne anfügen

variable: VARIABLE { $$ = $1 };


inputTwo: argList EOF { return $1 };

argList: relExp      { $$ = [$1] }
       | relExp ',' argList  { $$ = [$1].concat($3) };

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