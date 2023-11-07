import requests

def send_teams_notification(webhook_url, title, message):
    """Envia uma notificação para o Microsoft Teams."""
    headers = {
        "Content-Type": "application/json"
    }
    
    payload = {
        "@type": "MessageCard",
        "@context": "http://schema.org/extensions",
        "summary": title,
        "sections": [{
            "activityTitle": title,
            "text": message
        }]
    }
    
    response = requests.post(webhook_url, headers=headers, json=payload)
    response.raise_for_status()


# Use esta função no seu script Robot ou Python para enviar notificações
webhook_url = 'https://sgapucminasbr.webhook.office.com/webhookb2/ba724b13-b93d-40be-ab26-4f5da514929a@14cbd5a7-ec94-46ba-b314-cc0fc972a161/IncomingWebhook/302c8dc009b340c881655c00c24f1af9/731643ab-a40b-4d6a-8652-86b66630967f'
title = 'Resultado dos Testes da Pipeline'
message = 'Os testes foram concluídos com sucesso!'
send_teams_notification(webhook_url, title, message)
