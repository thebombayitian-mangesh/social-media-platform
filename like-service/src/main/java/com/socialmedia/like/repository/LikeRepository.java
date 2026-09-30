package com.socialmedia.like.repository;

import com.socialmedia.like.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {

    List<Like> findByPostId(Long postId);

    boolean existsByUserIdAndPostId(Long userId, Long postId);
}