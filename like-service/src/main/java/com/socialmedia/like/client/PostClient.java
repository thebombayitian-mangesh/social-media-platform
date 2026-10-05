package com.socialmedia.like.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class PostClient {

    private final RestClient restClient;

    public PostClient(RestClient.Builder builder) {
        this.restClient = RestClient.builder()
                .baseUrl("http://localhost:8082")
                .build();
    }

    public PostResponse getPost(Long postId) {
        return restClient.get()
                .uri("/posts/{id}", postId)
                .retrieve()
                .body(PostResponse.class);
    }
}