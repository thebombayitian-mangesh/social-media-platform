package com.socialmedia.post.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class UserClient {

    private final RestClient restClient;

    public UserClient() {
        this.restClient = RestClient.builder()
                .baseUrl("http://localhost:8081")
                .build();
    }

    public boolean userExists(Long userId) {
        try {
            restClient.get()
                    .uri("/users/{id}", userId)
                    .retrieve()
                    .toBodilessEntity();

            return true;

        } catch (Exception e) {
            return false;
        }
    }
}