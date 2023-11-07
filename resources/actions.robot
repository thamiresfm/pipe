*** Settings ***
Documentation       Componentes HTML

Library             Browser
Library             RequestsLibrary
Library             json

*** Variables ***
${base_url}     https://login-react-papito.vercel.app
${webhook_url}  https://sgapucminasbr.webhook.office.com/webhookb2/ba724b13-b93d-40be-ab26-4f5da514929a@14cbd5a7-ec94-46ba-b314-cc0fc972a161/IncomingWebhook/05c44a80412540f6aa2077b239e011c2/731643ab-a40b-4d6a-8652-86b66630967f
*** Keywords ***
Start Browser
    New Browser    browser=webkit    headless=True
    New Page    ${base_url}

Finish Browser
    Take Screenshot    fullPage=true
    Send Message To Teams   Os testes foram concluídos com sucesso!

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

Create Teams Session
    Create Session    teams    ${webhook_url}
    Log    Session 'teams' created with URL: ${webhook_url}
    Set Suite Variable    ${teams_session}

Send Message To Teams
   [Arguments]    ${message}
    ${headers}=    Create Dictionary    Content-Type=application/json
    ${body}=    Evaluate    json.dumps({"text": "${message}"})    json
    ${response}=    Run Keyword And Return Status    POST On Session    teams    url=${webhook_url}    data=${body}    headers=${headers}
    IF    ${response}
        Should Be Equal As Strings    ${response.status_code}    200
    ELSE
        Log    Failed to send message to Teams.
    END
