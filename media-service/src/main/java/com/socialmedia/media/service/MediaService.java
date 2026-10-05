package com.socialmedia.media.service;

import com.socialmedia.media.model.Media;
import com.socialmedia.media.repository.MediaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;

    public MediaService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    public Media saveMedia(Media media) {
        return mediaRepository.save(media);
    }

    public Media getMediaById(Long id) {
        return mediaRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Media not found"));
    }

    public List<Media> getMediaByUserId(Long userId) {
        return mediaRepository.findByUserId(userId);
    }

    public void deleteMedia(Long id) {
        mediaRepository.deleteById(id);
    }
}