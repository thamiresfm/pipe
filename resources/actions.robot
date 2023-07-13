*** Settings ***
Documentation       Componentes HTML

Library             Browser

*** Variables ***
${base_url}     https://login-react-papito.vercel.app


*** Keywords ***
Start Browser
    New Browser    browser=webkit    headless=True
    New Page    ${base_url}

Finish Browser
    Take Screenshot    fullPage=true

Submit Credentials
    [Arguments]    ${user}    ${pass}

    Fill Text    css=#user    ${user}
    Fill Text    css=#pass    ${pass}
    Click    css=#btnLogin

Toast Message Should Be
    [Arguments]    ${target}

    ${ele}    Set Variable    css=div[role=status]

    Wait For Elements State    ${ele}    visible    5
    Get Text    ${ele}    equal    ${target}

 Modal Title Should Be
    [Arguments]    ${target}

    ${ele}    Set Variable    css=#swal2-title

    Wait For Elements State    ${ele}    visible    5
    Get Text    ${ele}    equal    ${target}
