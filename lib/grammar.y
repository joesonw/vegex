/* Vegex Grammar */
/*
* @Author: Qiaosen Huang
* @Date:   2016-08-30 11:51:15
* @Last Modified by:   Joesonw
* @Last Modified time: 2016-08-30 11:53:02
*/

%lex
digit           [0-9]
char            [a-zA-Z]
alphanum        [0-9a-zA-Z]
int             [0-9]+
//string          \'([^']|\\[nt\\'])*\'
string          \'(?:[^'\\]*(?:\\.)?)*\'


%%
\s+             /* skip whitespace */
\/\/[^\n]*      /* skip comment */
\#[^\n]*        /* skip comment */
{string}        yytext = yytext.substr(1, yyleng - 2); return 'STRING';



[bB][eE][gG][iI][nN]                    return 'BEGIN';
[eE][nN][dD]                            return 'END';
[rR][eE][qQ][uU][iI][rR][eE][dD]        return 'REQUIRED';
[oO][rR]                                return 'OR';
[bB][eE][tT][wW][eE][eE][nN]            return 'BETWEEN';
[aA][nN][dD]                            return 'AND';
[mM][oO][rR][eE]                        return 'MORE';
[oO][nN][eE]                            return 'ONE';
[oO][fF]                                return 'OF';
[fF][oO][rR]                            return 'FOR';
[tT][oO]                                return 'TO';
[oO][nN][eE]                            return 'ONE';
[nN][eE][wW][lL][iI][nN][eE]            return 'NEWLINE';
[wW][hH][iI][tT][eE][sS][pP][aA][cC][eE]return 'WHITESPACE';
[gG][rR][oO][uU][pP]                    return 'GROUP';

{digit}+        return 'NUM';
{digit}         return 'DIGIT';
{alphanum}      return 'ALPHANUM';
{char}          return 'CHAR';


"("             return '(';
";"             return ';';
")"             return ')';


<<EOF>>         return 'EOF';







/lex

%%

start:
    line EOF { return $1; }
    ;

line:
    exp { $$ = [$1]; }
    | line ';' exp { $$ = $1.concat($3); }
    | GROUP '(' line ')' { $$ = [new yy.Group($3)]; }
    ;

exp:
    prefixgroup regex postfix_group {
        $2.posts = $3;
        $2.pres = $1;
        $$ = $2;
    }
    | prefix_group regex {
        $2.pres = $1;
        $$ = $2;
    }
    | regex postfix_group {
        $1.posts = $2;
        $$ = $1;
    }
    | regex { $$ = $1; }
    ;

regex:
    STRING {
        $$ = new yy.Rule($1);
    }
    | ALPHANUM TO ALPHANUM {
        $$ = new yy.Rule(yy.R.TO, [$1, $3]);
    }
    ;

postfix_group:
    postfix_group postfix {
        $$ = ($1.concat($2));
    }
    | postfix { $$ = [$1]; }
    ;

postfix:
    OPTIONAL { $$ = new yy.Postfix(yy.POST.OPTIONAL); }
    | ONE OR MORE { $$ = new yy.Postfix(yy.POST.ONE_OR_MORE); }
    | BETWEEN NUM AND NUM { $$ = new yy.Postfix(yy.POST.BETWEEN, [$2, $4]); } 
    | NUM OR MORE { $$ = new yy.Postfix(yy.POST.OR_MORE, $1); }
    | MORE { $$ = new yy.Postfix(yy.POST.MORE); }
    | FOR NUM { $$ = new yy.Postfix(yy.POST.FOR); }
    ;

prefix_group:
    prefix_gorup prefix {
        $$ = ($1.concat($2));
    }
    | prefix { $$ = [$1]; }
    ;

prefix:
    ONE OF { $$ = new yy.Prefix(yy.PRE.ONE_OF); }
    ;

