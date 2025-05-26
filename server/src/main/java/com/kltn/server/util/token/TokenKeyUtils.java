package com.kltn.server.util.token;

import com.kltn.server.error.AppException;
import com.kltn.server.error.Error;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@Component
public class TokenKeyUtils {
    @Value("${spring.application.security.access-token.key.private-key}")
    private String accessPriKeyPlacingFile;
    @Value("${spring.application.security.access-token.key.public-key}")
    private String accessPubKeyPlacingFile;
    @Value("${spring.application.security.refresh-token.key.private-key}")
    private String refreshPriKeyPlacingFile;
    @Value("${spring.application.security.refresh-token.key.public-key}")
    private String refreshPubKeyPlacingFile;

    @Value("${spring.application.security.verify-token.key.private-key}")
    private String verifyPriKeyPlacingFile;
    @Value("${spring.application.security.verify-token.key.public-key}")
    private String verifyPubKeyPlacingFile;

    private RSAPublicKey accessPublicKey;
    private RSAPrivateKey accessPrivateKey;
    private RSAPublicKey refreshPublicKey;
    private RSAPrivateKey refreshPrivateKey;
    private RSAPublicKey verifyPublicKey;
    private RSAPrivateKey verifyPrivateKey;

    // Read a public key from a file
    private RSAPublicKey getPublicKey(String filePath) {
        try {
            String keyContent = new String(Files.readAllBytes((new ClassPathResource(filePath).getFile().toPath())))
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .replaceAll("\\s", ""); // Remove unnecessary spaces or new lines

            byte[] decodedKey = Base64.getDecoder().decode(keyContent);
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(decodedKey);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");

            return (RSAPublicKey) keyFactory.generatePublic(keySpec);
        } catch (IOException e) {
            throw AppException.builder().error(Error.PUBLIC_KEY_READ_ERROR).build();
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw AppException.builder().error(Error.PUBLIC_KEY_GENERATION_ERROR).build();
        }
    }

    // Read a private key from a file
    private RSAPrivateKey getPrivateKey(String filePath) {
        try {
            String keyContent = new String(Files.readAllBytes((new ClassPathResource(filePath).getFile().toPath())))
                    .replace("-----BEGIN PRIVATE KEY-----", "")
                    .replace("-----END PRIVATE KEY-----", "")
                    .replaceAll("\\s", ""); // Rem unnecessary spaces or new lines

            byte[] decodedKey = Base64.getDecoder().decode(keyContent);
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(decodedKey);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");

            return (RSAPrivateKey) keyFactory.generatePrivate(keySpec);
        } catch (IOException e) {
            throw AppException.builder().error(Error.PRIVATE_KEY_READ_ERROR).build();
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw AppException.builder().error(Error.PRIVATE_KEY_GENERATION_ERROR).build();
        }
    }

    public RSAPublicKey getAccessPublicKey() {
        if (accessPublicKey == null) {
            accessPublicKey = getPublicKey(accessPubKeyPlacingFile);
        }
        return accessPublicKey;
    }

    public RSAPrivateKey getAccessPrivateKey() {
        if (accessPrivateKey == null) {
            accessPrivateKey = getPrivateKey(accessPriKeyPlacingFile);
        }
        return accessPrivateKey;
    }

    public RSAPublicKey getRefreshPublicKey() {
        if (refreshPublicKey == null) {
            refreshPublicKey = getPublicKey(refreshPubKeyPlacingFile);
        }
        return refreshPublicKey;
    }

    public RSAPrivateKey getRefreshPrivateKey() {
        if (refreshPrivateKey == null) {
            refreshPrivateKey = getPrivateKey(refreshPriKeyPlacingFile);
        }
        return refreshPrivateKey;
    }

    public RSAPublicKey getVerifyPublicKey() {
        if (verifyPublicKey == null) {
            verifyPublicKey = getPublicKey(verifyPubKeyPlacingFile);
        }
        return verifyPublicKey;
    }

    public RSAPrivateKey getVerifyPrivateKey() {
        if (verifyPrivateKey == null) {
            verifyPrivateKey = getPrivateKey(verifyPriKeyPlacingFile);
        }
        return verifyPrivateKey;
    }
}
