package com.socialmedia.media.repository;

import com.socialmedia.media.model.Media;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media, Long> {

    List<Media> findByUserId(Long userId);
}