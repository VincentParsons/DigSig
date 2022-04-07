
import smtplib
from config import ApplicationConfig

class EmailHandler:
    def __init__(self) -> None:
        pass

    def send_email(self, email_address, subject, msg):
        try:
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.ehlo()
            server.starttls()
            server.login(ApplicationConfig.EMAIL_ADDRESS, ApplicationConfig.EMAIL_PASSWORD)
            message = "Subject: {}\n\n{}".format(subject, msg)
            server.sendmail(ApplicationConfig.EMAIL_ADDRESS, email_address, message)
            server.quit()
            print("Success: Email sent!")
        except Exception as e:
            print("Email failed to send. Error: {}".format(e))