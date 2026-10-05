package com.socialmedia.like.service;

import com.socialmedia.like.client.NotificationClient;
import com.socialmedia.like.client.PostClient;
import com.socialmedia.like.client.PostResponse;
import com.socialmedia.like.model.Like;
import com.socialmedia.like.repository.LikeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final PostClient postClient;
    private final NotificationClient notificationClient;

    public LikeService(
            LikeRepository likeRepository,
            PostClient postClient,
            NotificationClient notificationClient) {

        this.likeRepository = likeRepository;
        this.postClient = postClient;
        this.notificationClient = notificationClient;
    }

    public Like likePost(Like like) {

        if (likeRepository.existsByUserIdAndPostId(
                like.getUserId(),
                like.getPostId())) {

            throw new RuntimeException(
                    "User has already liked this post"
            );
        }

        Like savedLike = likeRepository.save(like);

        // Get post owner
        try {

            PostResponse post =
                    postClient.getPost(like.getPostId());

            Long postOwnerId = post.getUserId();

            // Don't notify user if they like their own post
            if (!postOwnerId.equals(like.getUserId())) {

                notificationClient.createNotification(
                        postOwnerId,
                        "User " + like.getUserId()
                                + " liked your post"
                );
            }

        } catch (Exception e) {

            System.out.println(
                    "Notification could not be created: "
                            + e.getMessage()
            );
        }

        return savedLike;
    }

    public List<Like> getLikesByPostId(Long postId) {
        return likeRepository.findByPostId(postId);
    }

    public void removeLike(Long id) {
        likeRepository.deleteById(id);
    }

    public Like getLikeById(Long id) {
        return likeRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException("Like not found")
                );
    }
}