package com.socialmedia.like.service;

import com.socialmedia.like.model.Like;
import com.socialmedia.like.repository.LikeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeService {

    private final LikeRepository likeRepository;

    public LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    // Like a post
    public Like likePost(Like like) {

        if (likeRepository.existsByUserIdAndPostId(
                like.getUserId(),
                like.getPostId())) {

            throw new RuntimeException("User has already liked this post");
        }

        return likeRepository.save(like);
    }

    // Get all likes of a post
    public List<Like> getLikesByPostId(Long postId) {
        return likeRepository.findByPostId(postId);
    }

    // Remove like
    public void removeLike(Long id) {
        likeRepository.deleteById(id);
    }

    // Get like by ID
    public Like getLikeById(Long id) {
        return likeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Like not found"));
    }
}