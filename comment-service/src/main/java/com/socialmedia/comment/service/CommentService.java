package com.socialmedia.comment.service;

import com.socialmedia.comment.model.Comment;
import com.socialmedia.comment.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // Create comment
    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    // Get comment by ID
    public Comment getCommentById(Long id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
    }

    // Get all comments of a post
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    // Get all comments of a user
    public List<Comment> getCommentsByUserId(Long userId) {
        return commentRepository.findByUserId(userId);
    }

    // Delete comment
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}