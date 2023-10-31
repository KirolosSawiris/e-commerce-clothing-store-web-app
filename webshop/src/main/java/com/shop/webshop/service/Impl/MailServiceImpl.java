package com.shop.webshop.service.Impl;

import com.shop.webshop.models.User;
import com.shop.webshop.service.UserService;
import org.apache.commons.text.RandomStringGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
@Transactional
public class MailServiceImpl {

    private JavaMailSender javaMailSender;
    private String sentFrom;
    private String password;

    @Autowired
    private UserService userService;

    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername(sentFrom);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");
        props.put("mail.smtp.timeout", 5000);
        props.put("mail.smtp.connectiontimeout", 5000);

        return mailSender;
    }

    public MailServiceImpl(@Value("${spring.mail.username}") String username, @Value("${spring.mail.password}") String password, JavaMailSender javaMailSender) {
        this.sentFrom = username;
        this.password = password;
        this.javaMailSender = this.getJavaMailSender();
    }

    public void SendMessage(String sentTo, String subject, String body){

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(sentFrom);
        simpleMailMessage.setTo(sentTo);
        simpleMailMessage.setText(body);
        simpleMailMessage.setSubject(subject);
        javaMailSender.send(simpleMailMessage);
    }

    public void sendNewPassword(User user) throws MessagingException {

        RandomStringGenerator randomStringGenerator = new RandomStringGenerator.Builder().withinRange(48,122).build();
        String password = randomStringGenerator.generate(20);

        String body = "Dear Customer,\n\nYour new Password: " + password +
                      "\nPlease do not share it with anyone and make sure to change it" +
                      " as soon as you log in for the first time. \n\nThank you!";
        String subject = "Your WebShop account New Password";
        String sentTo = user.getEmail();

        SendMessage(sentTo, subject, body);

        user.setPassword(password);
        userService.saveUser(user);
    }
}
