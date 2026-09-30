package com.socialmedia.like.controller;

import com.socialmedia.like.model.Like;
import com.socialmedia.like.service.LikeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/likes")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    // Like a post
    @PostMapping
    public Like likePost(@RequestBody Like like) {
        return likeService.likePost(like);
    }

    // Get like by ID
    @GetMapping("/{id}")
    public Like getLikeById(@PathVariable Long id) {
        return likeService.getLikeById(id);
    }

    // Get all likes of a post
    @GetMapping("/post/{postId}")
    public List<Like> getLikesByPostId(@PathVariable Long postId) {
        return likeService.getLikesByPostId(postId);
    }

    // Remove like
    @DeleteMapping("/{id}")
    public String removeLike(@PathVariable Long id) {
        likeService.removeLike(id);
        return "Like removed successfully";
    }
}