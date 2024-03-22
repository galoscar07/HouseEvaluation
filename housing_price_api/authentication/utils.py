import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from string import Template
from housing_price_api.settings import EMAIL_HOST_USER, EMAIL_HOST_PASSWORD


SENDER = EMAIL_HOST_USER
SENDER_PASSWORD = EMAIL_HOST_PASSWORD

EMAIL_TEMPLATES = {
    'register':  Template('''
        <html>
            <body>
                <div style="margin-top: 40px; width: 100%; height: 100px; background-color: #1BB583; padding: 30px; color: white;">
                    <h1 style="color: #FFFFFF">Your account has been created.</h1>
                </div>
                <div style="margin-top: 30px;">
                    <p>To activate your account please click on the below button</p>
                    <a href="$link" style="padding: 10px; width: 300px; background-color: #17616C; color: white;"> ACCESS ACCOUNT</a>
                    <p>in case that doesn't work you have the link here: $link</p>
                    <p style="color: #17616C;">EvaluateHouse</p>
                </div>
            </body>
        </html>
    '''),
}


def send_email(message):
    email_message = MIMEMultipart()
    email_message['From'] = message['from_email']
    email_message['To'] = message['to_email']
    email_message['Subject'] = message['subject']

    email_message.attach(MIMEText(message['template'], "html"))

    email_string = email_message.as_string()

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(SENDER, SENDER_PASSWORD)
        server.sendmail(message['from_email'], message['to_email'], email_string)


class Util:
    @staticmethod
    def send_email(data, email_type):
        # Verify email to activate account
        if email_type == 'verify-email':
            template_processed = EMAIL_TEMPLATES['register'].substitute(link=data['url'])
            message = {
                "from_email": SENDER,
                "from_name": "Vreau Doctor",
                "to_email": data['email'],
                "subject": "Contul dumneavoastră a fost creat.",
                "template": template_processed,
            }
            send_email(message=message)

