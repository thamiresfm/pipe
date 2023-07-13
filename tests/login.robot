*** Settings ***
Documentation       Testes de Criação de Clientes

Resource            ../resources/actions.robot

Test Setup          Start Browser
Test Teardown       Finish Browser

*** Test Cases ***
Senha incorreta
    Submit Credentials         papito    123456
    Toast Message Should Be    Oops! Credenciais inválidas :(

Usuário não cadastrado
    Submit Credentials         teste123    123456
    Toast Message Should Be    Oops! Credenciais inválidas :(

Usuário deve ser obrigatório
    Submit Credentials         ${EMPTY}    123456
    Toast Message Should Be    Informe o seu nome de usuário!

Senha deve ser obrigatória
    Submit Credentials         teste123    ${EMPTY}
    Toast Message Should Be    Informe a sua senha secreta!

Login com sucesso
    Submit Credentials        papito    rocks
    Modal Title Should Be     Tudo certo!
