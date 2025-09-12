package solid.backend.common;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MailManager {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    // 단일 팀 사용자
    public void sendHtml(String to, String subject, String html) throws MessagingException {
        var mime = mailSender.createMimeMessage();
        var helper = new MimeMessageHelper(mime, "UTF-8");
        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(html, true);
        mailSender.send(mime);
    }

    // 팀원 여러명
    public void sendHtmlBcc(List<String> bcc, String subject, String html) throws MessagingException {
        var mime = mailSender.createMimeMessage();
        var helper = new MimeMessageHelper(mime, "UTF-8");
        helper.setFrom(from);
        helper.setBcc(bcc.toArray(String[]::new));
        helper.setSubject(subject);
        helper.setText(html, true);
        mailSender.send(mime);
    }
}

