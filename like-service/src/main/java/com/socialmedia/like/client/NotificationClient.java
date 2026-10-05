package com.socialmedia.like.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Component
public class NotificationClient {

    private final RestClient restClient;

    public NotificationClient() {
        this.restClient = RestClient.builder()
                .baseUrl("http://localhost:8085")
                .build();
    }

    public void createNotification(
            Long userId,
            String message) {

        restClient.post()
                .uri("/notifications")
                .body(Map.of(
                        "userId", userId,
                        "message", message,
                        "read", false
                ))
                .retrieve()
                .toBodilessEntity();
    }
}